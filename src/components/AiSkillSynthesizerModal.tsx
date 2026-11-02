import React, { useState, useEffect } from 'react';
import { WebsiteSkill } from '../types/skill';
import { MACRO_CATEGORIES } from '../data/websiteSkillsData';
import { Sparkles, X, Loader2 } from 'lucide-react';

interface AiSkillSynthesizerModalProps {
  isOpen: boolean;
  initialMode: 'create' | 'expand';
  targetSkillForExpand: WebsiteSkill | null;
  onClose: () => void;
  onSkillCreated: (newSkill: WebsiteSkill) => void;
  onSkillUpdated: (updatedSkill: WebsiteSkill) => void;
}

const NICHE_PRESETS = [
  {
    label: 'Luxury Yacht & Private Jet Charter',
    niche: 'Luxury Yacht & Private Aviation Charter Marketplace',
    category: 'Hospitality, Dining & Travel',
    targetAudience: 'UHNW charter clients, family offices, and executive travel concierges',
    conversionGoal: 'Instant charter itinerary calculation & private broker hold request',
  },
  {
    label: 'AI Automated Legal Contract SaaS',
    niche: 'AI Legal Contract Redlining & Procurement Review Workbench',
    category: 'B2B SaaS & Enterprise Consoles',
    targetAudience: 'In-house General Counsels, Legal Ops leads, and enterprise procurement',
    conversionGoal: 'Interactive clause risk audit & enterprise workspace trial',
  },
  {
    label: 'Bespoke Mechanical Watch Atelier',
    niche: 'Independent Swiss Horology & Custom Mechanical Watch Storefront',
    category: 'E-Commerce & D2C Retail',
    targetAudience: 'Horology collectors and luxury mechanical timepiece buyers',
    conversionGoal: 'Caliber specification inspection & serialized edition allocation order',
  },
  {
    label: 'Solar & Battery Microgrid Installer',
    niche: 'Commercial & Residential Solar + Battery Storage Configurator',
    category: 'DeepTech, Hardware & Industrial',
    targetAudience: 'Homeowners, commercial facility managers, and sustainability directors',
    conversionGoal: 'Interactive roof kW / payback period calculation & site audit booking',
  },
];

export const AiSkillSynthesizerModal: React.FC<AiSkillSynthesizerModalProps> = ({
  isOpen,
  initialMode,
  targetSkillForExpand,
  onClose,
  onSkillCreated,
  onSkillUpdated,
}) => {
  const [mode, setMode] = useState<'create' | 'expand'>(initialMode);
  const [niche, setNiche] = useState('');
  const [category, setCategory] = useState<string>(MACRO_CATEGORIES[1]);
  const [targetAudience, setTargetAudience] = useState('');
  const [conversionGoal, setConversionGoal] = useState('');
  const [techStack, setTechStack] = useState(
    'React 19, TypeScript, Tailwind CSS v4, Express Full-Stack API'
  );
  const [extraNotes, setExtraNotes] = useState('');
  const [expandFocus, setExpandFocus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMode(initialMode);
    setError(null);
  }, [initialMode, targetSkillForExpand, isOpen]);

  if (!isOpen) return null;

  const handleApplyPreset = (preset: (typeof NICHE_PRESETS)[number]) => {
    setNiche(preset.niche);
    setCategory(preset.category);
    setTargetAudience(preset.targetAudience);
    setConversionGoal(preset.conversionGoal);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (mode === 'create') {
        if (!niche.trim()) {
          throw new Error('Please enter a website niche or archetype to synthesize.');
        }
        const res = await fetch('/api/skills/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            niche,
            category,
            targetAudience,
            conversionGoal,
            techStack,
            extraNotes,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to synthesize skill.');
        }

        const generated = data.skill;
        const newSkill: WebsiteSkill = {
          id: `custom-${Date.now()}`,
          slug: generated.slug || niche.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          indexNumber: 'AI',
          name: generated.name || niche,
          category: generated.category || category,
          subArchetypes: generated.subArchetypes || [niche],
          summary: generated.summary || '',
          yamlFrontmatter: generated.yamlFrontmatter || '',
          uxConversionFlow: generated.uxConversionFlow,
          designSystem: generated.designSystem,
          engineeringSpec: generated.engineeringSpec,
          antiPatterns: generated.antiPatterns || [],
          isCustom: true,
          updatedAt: new Date().toISOString(),
        };
        onSkillCreated(newSkill);
        onClose();
      } else {
        if (!targetSkillForExpand) return;
        const res = await fetch('/api/skills/expand', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            existingSkill: targetSkillForExpand,
            focusArea: expandFocus,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to expand skill.');
        }

        const upgraded = data.skill;
        const updatedSkill: WebsiteSkill = {
          ...targetSkillForExpand,
          name: upgraded.name || targetSkillForExpand.name,
          subArchetypes: upgraded.subArchetypes || targetSkillForExpand.subArchetypes,
          summary: upgraded.summary || targetSkillForExpand.summary,
          yamlFrontmatter: upgraded.yamlFrontmatter || targetSkillForExpand.yamlFrontmatter,
          uxConversionFlow: upgraded.uxConversionFlow || targetSkillForExpand.uxConversionFlow,
          designSystem: upgraded.designSystem || targetSkillForExpand.designSystem,
          engineeringSpec: upgraded.engineeringSpec || targetSkillForExpand.engineeringSpec,
          antiPatterns: upgraded.antiPatterns || targetSkillForExpand.antiPatterns,
          updatedAt: new Date().toISOString(),
        };
        onSkillUpdated(updatedSkill);
        onClose();
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-xs p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg max-w-2xl w-full overflow-hidden shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {mode === 'create'
                ? 'AI Custom Niche Website Skill Generator'
                : `Expand & Customize Skill: ${targetSkillForExpand?.name}`}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-md cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Switcher */}
        <div className="px-6 pt-4 flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <button
              type="button"
              onClick={() => setMode('create')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                mode === 'create'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Synthesize New Website Niche Skill
            </button>
            {targetSkillForExpand && (
              <button
                type="button"
                onClick={() => setMode('expand')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  mode === 'expand'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Deepen Current Skill ({targetSkillForExpand.indexNumber})
              </button>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {mode === 'create' ? (
            <>
              <div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                  Quick-Fill Niche Presets:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {NICHE_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => handleApplyPreset(preset)}
                      className="px-2.5 py-1 text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md transition-colors cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Website Niche / Archetype Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    placeholder="e.g., Veterinary Clinic & Pet Pharmacy Portal"
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Macro Taxonomy Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                  >
                    {MACRO_CATEGORIES.filter((c) => c !== 'All Categories').map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Target Buyer / End-User Persona
                  </label>
                  <input
                    type="text"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    placeholder="e.g., Pet owners & emergency veterinary triage"
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Primary Conversion Mechanism
                  </label>
                  <input
                    type="text"
                    value={conversionGoal}
                    onChange={(e) => setConversionGoal(e.target.value)}
                    placeholder="e.g., Instant urgent-care slot booking & Rx refill"
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Target Tech Stack & Special Agent Instructions
                </label>
                <textarea
                  rows={2}
                  value={extraNotes}
                  onChange={(e) => setExtraNotes(e.target.value)}
                  placeholder="Optional: Specify custom APIs, payment flows, 3D configurators, or branding constraints..."
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                />
              </div>
            </>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                How should AI deepen or customize "{targetSkillForExpand?.name}"?
              </label>
              <textarea
                rows={4}
                value={expandFocus}
                onChange={(e) => setExpandFocus(e.target.value)}
                placeholder="e.g., Add specific instructions for high-ticket enterprise B2B upsells, interactive pricing calculators, and multi-language localization rules..."
                className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
              />
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 rounded-md text-xs text-red-700 dark:text-red-300">
              {error}
            </div>
          )}

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-60 rounded-md transition-colors cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Synthesizing Complete Tri-Layer SKILL.md...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {mode === 'create'
                      ? 'Generate Complete SKILL.md Blueprint'
                      : 'Upgrade Skill Blueprint'}
                  </span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
