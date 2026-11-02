import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SKILL_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    name: {
      type: Type.STRING,
      description: 'Human-readable title of the website building skill (e.g., Luxury Yacht Charter & Marine Marketplace).',
    },
    slug: {
      type: Type.STRING,
      description: 'Kebab-case identifier for the skill folder and YAML name field (e.g., luxury-yacht-charter-marketplace).',
    },
    category: {
      type: Type.STRING,
      description: 'Macro website category (e.g., E-Commerce & D2C Retail, B2B SaaS & Dashboards, Marketplaces & Directories, etc.).',
    },
    subArchetypes: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: '4 to 6 specific sub-niches or website variants covered by this skill.',
    },
    summary: {
      type: Type.STRING,
      description: 'Concise 1-2 sentence description of when an AI agent should load this skill and what it builds.',
    },
    yamlFrontmatter: {
      type: Type.STRING,
      description: 'Valid YAML frontmatter block enclosed in --- with name, description, triggers, and target_conversion_metric.',
    },
    uxConversionFlow: {
      type: Type.OBJECT,
      properties: {
        primaryGoal: { type: Type.STRING },
        aboveTheFoldArchitecture: { type: Type.STRING },
        sectionSequence: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              sectionName: { type: Type.STRING },
              purpose: { type: Type.STRING },
              requiredElements: { type: Type.STRING },
            },
            required: ['sectionName', 'purpose', 'requiredElements'],
          },
        },
        conversionPsychology: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
      },
      required: ['primaryGoal', 'aboveTheFoldArchitecture', 'sectionSequence', 'conversionPsychology'],
    },
    designSystem: {
      type: Type.OBJECT,
      properties: {
        aestheticDirection: { type: Type.STRING },
        colorPalette: {
          type: Type.OBJECT,
          properties: {
            dominantCanvas60: { type: Type.STRING },
            structuralSurface30: { type: Type.STRING },
            accentBudget10: { type: Type.STRING },
            semanticTokens: { type: Type.STRING },
          },
          required: ['dominantCanvas60', 'structuralSurface30', 'accentBudget10', 'semanticTokens'],
        },
        typography: {
          type: Type.OBJECT,
          properties: {
            displayFont: { type: Type.STRING },
            bodyFont: { type: Type.STRING },
            monoFont: { type: Type.STRING },
            scaleAndMeasure: { type: Type.STRING },
          },
          required: ['displayFont', 'bodyFont', 'monoFont', 'scaleAndMeasure'],
        },
        spatialMathAndGrid: { type: Type.STRING },
      },
      required: ['aestheticDirection', 'colorPalette', 'typography', 'spatialMathAndGrid'],
    },
    engineeringSpec: {
      type: Type.OBJECT,
      properties: {
        componentHierarchy: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        stateAndDataEntities: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        apiEndpointsAndIntegrations: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        seoAndJsonLdSchema: { type: Type.STRING },
      },
      required: ['componentHierarchy', 'stateAndDataEntities', 'apiEndpointsAndIntegrations', 'seoAndJsonLdSchema'],
    },
    antiPatterns: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: '5 to 7 strict domain-specific anti-slop rules and banned UI clichés.',
    },
  },
  required: [
    'name',
    'slug',
    'category',
    'subArchetypes',
    'summary',
    'yamlFrontmatter',
    'uxConversionFlow',
    'designSystem',
    'engineeringSpec',
    'antiPatterns',
  ],
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '5mb' }));

  // Endpoint 1: Generate a brand-new custom niche website-building skill
  app.post('/api/skills/generate', async (req, res) => {
    try {
      const { niche, category, targetAudience, conversionGoal, techStack, extraNotes } = req.body;
      if (!niche || typeof niche !== 'string') {
        res.status(400).json({ error: 'Please provide a website niche or archetype name.' });
        return;
      }

      const prompt = `Create an exhaustive, production-grade Agentic Website Building Skill (SKILL.md specification) for autonomous AI coding agents.
Target Website Niche / Archetype: ${niche}
Macro Category: ${category || 'Custom / Specialized Website'}
Target Audience / Buyer Persona: ${targetAudience || 'High-intent commercial buyers and end users'}
Primary Conversion Mechanism: ${conversionGoal || 'Direct purchase, booking, or qualified lead capture'}
Target Tech Stack: ${techStack || 'React 19, TypeScript, Tailwind CSS v4, Express / Full-Stack API'}
Additional Instructions: ${extraNotes || 'Ensure complete Tri-Layer coverage: 1. YAML & UX Conversion Flow, 2. Visual Design Constitution (60-30-10 color tokens, non-default font pairings, spatial math), and 3. Engineering Component Tree, State Schema & JSON-LD SEO.'}

Make every instruction concrete, deterministic, and immediately executable by an AI coding agent building a commercial website for resale or client replication.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction:
            'You are a Principal Design Systems Architect and Autonomous Agent Skill Engineer. You write deterministic, zero-slop SKILL.md blueprints that instruct AI agents how to build world-class websites across every domain. Never recommend generic fonts like Inter or Roboto; always specify distinctive Google Fonts pairings, concrete hex codes, exact spatial math, working state flows, and Schema.org JSON-LD types.',
          responseMimeType: 'application/json',
          responseSchema: SKILL_SCHEMA,
        },
      });

      const rawText = (response.text ?? '{}').trim();
      const parsed = JSON.parse(rawText);
      res.json({ skill: parsed });
    } catch (error: any) {
      console.error('Error generating custom skill:', error);
      res.status(500).json({
        error: error?.message || 'Failed to synthesize custom website skill with Gemini API.',
      });
    }
  });

  // Endpoint 2: Expand or customize an existing website skill with AI
  app.post('/api/skills/expand', async (req, res) => {
    try {
      const { existingSkill, focusArea } = req.body;
      if (!existingSkill) {
        res.status(400).json({ error: 'Missing existingSkill payload.' });
        return;
      }

      const prompt = `Deepen and upgrade the following Agentic Website Building Skill with richer, more granular specifications.
Current Skill Name: ${existingSkill.name}
Current Category: ${existingSkill.category}
Current Sub-Archetypes: ${(existingSkill.subArchetypes || []).join(', ')}
Requested Expansion / Customization Focus: ${
        focusArea ||
        'Add deeper conversion psychology, more granular section-by-section UI mechanics, richer state/API schemas, and stricter anti-slop visual rules.'
      }

Current Skill JSON Summary:
${JSON.stringify(existingSkill, null, 2)}

Return the complete, upgraded skill object matching the exact schema.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction:
            'You are a Principal Design Systems Architect and Autonomous Agent Skill Engineer. Upgrade the provided website building skill with deeper conversion architecture, concrete UI micro-mechanics, exact typography/color tokens, and production full-stack engineering patterns.',
          responseMimeType: 'application/json',
          responseSchema: SKILL_SCHEMA,
        },
      });

      const rawText = (response.text ?? '{}').trim();
      const parsed = JSON.parse(rawText);
      res.json({ skill: parsed });
    } catch (error: any) {
      console.error('Error expanding skill:', error);
      res.status(500).json({
        error: error?.message || 'Failed to expand website skill with Gemini API.',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*all', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
