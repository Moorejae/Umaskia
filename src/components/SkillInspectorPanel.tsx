import React, { useState } from 'react';
import { WebsiteSkill } from '../types/skill';
import { compileSkillToMarkdown } from '../data/websiteSkillsData';
import {
  Check,
  Copy,
  Download,
  FileText,
  Sparkles,
  Code2,
  Layers,
  Palette,
  Compass,
  Play,
  Terminal,
} from 'lucide-react';

interface SkillInspectorPanelProps {
  skill: WebsiteSkill;
  onOpenAiExpand: (skill: WebsiteSkill) => void;
  onExportSingleSkillToDoc: (skill: WebsiteSkill) => void;
  onOpenLiveMotionDemo?: () => void;
}

type InspectorTab = 'all' | 'ux' | 'design' | 'engineering' | 'templates' | 'markdown';

export const SkillInspectorPanel: React.FC<SkillInspectorPanelProps> = ({
  skill,
  onOpenAiExpand,
  onExportSingleSkillToDoc,
  onOpenLiveMotionDemo,
}) => {
  const [activeTab, setActiveTab] = useState<InspectorTab>('all');
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);
  const [copiedYaml, setCopiedYaml] = useState(false);
  const [copiedTemplateIdx, setCopiedTemplateIdx] = useState<number | null>(null);

  const fullMarkdown = compileSkillToMarkdown(skill);

  const handleCopyMarkdown = async () => {
    await navigator.clipboard.writeText(fullMarkdown);
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 1800);
  };

  const handleCopyYaml = async () => {
    await navigator.clipboard.writeText(skill.yamlFrontmatter);
    setCopiedYaml(true);
    setTimeout(() => setCopiedYaml(false), 1800);
  };

  const handleCopyTemplate = async (code: string, idx: number) => {
    await navigator.clipboard.writeText(code);
    setCopiedTemplateIdx(idx);
    setTimeout(() => setCopiedTemplateIdx(null), 1800);
  };

  const handleDownloadSkillMd = () => {
    const blob = new Blob([fullMarkdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${skill.slug}-SKILL.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
      {/* Skill Header Block */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          {/* Unboxed Metadata Line (Zero-Pill Discipline) */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
            <span>Archetype {skill.indexNumber}</span>
            <span aria-hidden="true">·</span>
            <span className="font-sans font-medium text-slate-700 dark:text-slate-300">
              {skill.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>/skills/{skill.slug}/SKILL.md</span>
            {skill.isCustom && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-blue-600 dark:text-blue-400 font-sans font-semibold">
                  AI Synthesized Skill
                </span>
              </>
            )}
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {skill.hasLiveMotionDemo && onOpenLiveMotionDemo && (
              <button
                type="button"
                onClick={onOpenLiveMotionDemo}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Launch SELENE Motion Sandbox</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => onOpenAiExpand(skill)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Expand with AI</span>
            </button>

            <button
              type="button"
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {copiedMarkdown ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Copied SKILL.md</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy SKILL.md</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownloadSkillMd}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .md</span>
            </button>

            <button
              type="button"
              onClick={() => onExportSingleSkillToDoc(skill)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Send to Google Doc</span>
            </button>
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
          {skill.name}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-4xl leading-relaxed mb-4">
          {skill.summary}
        </p>

        {/* Sub-Archetypes Inline List (Unboxed Typography) */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            Sub-Archetypes Covered:
          </span>
          {skill.subArchetypes.map((sub, idx) => (
            <React.Fragment key={sub}>
              <span>{sub}</span>
              {idx < skill.subArchetypes.length - 1 && (
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">
                  ·
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Interactive Layer Filter Tabs */}
      <div className="px-6 py-2.5 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 overflow-x-auto">
        <div className="flex items-center gap-1 p-1 bg-slate-200/70 dark:bg-slate-800/80 rounded-lg">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'all'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Complete Spec</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ux')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'ux'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>01. UX & Motion Flow</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('design')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'design'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>02. Visual Design</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('engineering')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'engineering'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>03. Engineering & SEO</span>
          </button>

          {skill.codeTemplates && skill.codeTemplates.length > 0 && (
            <button
              type="button"
              onClick={() => setActiveTab('templates')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'templates'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>04. Motion Engine Code ({skill.codeTemplates.length})</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setActiveTab('markdown')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'markdown'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Raw SKILL.md Source</span>
          </button>
        </div>

        <span className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400 whitespace-nowrap shrink-0">
          {fullMarkdown.split('\n').length} lines · {fullMarkdown.length.toLocaleString()} chars
        </span>
      </div>

      {/* Main Inspector Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {activeTab === 'markdown' ? (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                Complete Agentic SKILL.md File (/skills/{skill.slug}/SKILL.md)
              </h2>
              <button
                type="button"
                onClick={handleCopyMarkdown}
                className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                {copiedMarkdown ? 'Copied to clipboard' : 'Copy entire file'}
              </button>
            </div>
            <pre className="p-5 bg-slate-950 text-slate-100 rounded-lg border border-slate-800 text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
              {fullMarkdown}
            </pre>
          </div>
        ) : (
          <>
            {/* YAML Frontmatter Block */}
            {(activeTab === 'all' || activeTab === 'ux') && (
              <section>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Agent Trigger & YAML Frontmatter
                  </h2>
                  <button
                    type="button"
                    onClick={handleCopyYaml}
                    className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    {copiedYaml ? 'Copied YAML' : 'Copy YAML'}
                  </button>
                </div>
                <pre className="p-4 bg-slate-950 text-emerald-300 rounded-lg border border-slate-800 text-xs font-mono leading-relaxed overflow-x-auto">
                  {skill.yamlFrontmatter}
                </pre>
              </section>
            )}

            {/* LAYER 1: UX & Conversion Architecture */}
            {(activeTab === 'all' || activeTab === 'ux') && (
              <section className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                  01. UX Architecture & Scroll / Conversion Blueprint
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-lg">
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Primary Conversion Objective
                    </div>
                    <p className="text-sm text-slate-900 dark:text-slate-100 leading-relaxed">
                      {skill.uxConversionFlow.primaryGoal}
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-lg">
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Above-the-Fold Viewport Contract (1440px Desktop)
                    </div>
                    <p className="text-sm text-slate-900 dark:text-slate-100 leading-relaxed">
                      {skill.uxConversionFlow.aboveTheFoldArchitecture}
                    </p>
                  </div>
                </div>

                {/* Deterministic Section Sequence Table */}
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3">
                    Deterministic Section-by-Section Sequence
                  </h3>
                  <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400">
                          <th className="py-2.5 px-4 w-12 font-mono tabular-nums">#</th>
                          <th className="py-2.5 px-4 w-1/4">Section Name</th>
                          <th className="py-2.5 px-4 w-1/3">Strategic Purpose</th>
                          <th className="py-2.5 px-4">Mandatory UI & Motion Mechanics</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
                        {skill.uxConversionFlow.sectionSequence.map((sec, idx) => (
                          <tr
                            key={sec.sectionName}
                            className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors"
                          >
                            <td className="py-3 px-4 font-mono tabular-nums text-slate-400 align-top">
                              {String(idx + 1).padStart(2, '0')}
                            </td>
                            <td className="py-3 px-4 font-semibold text-slate-900 dark:text-slate-100 align-top">
                              {sec.sectionName}
                            </td>
                            <td className="py-3 px-4 text-slate-600 dark:text-slate-300 align-top leading-relaxed">
                              {sec.purpose}
                            </td>
                            <td className="py-3 px-4 text-slate-600 dark:text-slate-300 align-top leading-relaxed">
                              {sec.requiredElements}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Conversion Psychology Rules */}
                <div>
                  <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2.5">
                    Conversion Psychology & Trust Mechanics
                  </h3>
                  <ul className="space-y-2">
                    {skill.uxConversionFlow.conversionPsychology.map((rule) => (
                      <li
                        key={rule}
                        className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-2.5"
                      >
                        <span className="font-mono text-blue-600 dark:text-blue-400 shrink-0">
                          →
                        </span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* LAYER 2: Visual Design Constitution */}
            {(activeTab === 'all' || activeTab === 'design') && (
              <section className="pt-6 border-t border-slate-200 dark:border-slate-800">
                <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                  02. Visual Design Constitution & Spatial Math
                </h2>

                <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-lg mb-6">
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Domain Aesthetic Direction
                  </div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {skill.designSystem.aestheticDirection}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {/* 60-30-10 Color Tokens */}
                  <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-4 space-y-3">
                    <h3 className="text-xs font-semibold text-slate-900 dark:text-white">
                      60-30-10 Color Token Allocation
                    </h3>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between gap-4 py-1.5 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-slate-500 dark:text-slate-400 shrink-0">
                          60% Dominant Canvas
                        </span>
                        <span className="font-mono text-right text-slate-900 dark:text-slate-100">
                          {skill.designSystem.colorPalette.dominantCanvas60}
                        </span>
                      </div>
                      <div className="flex justify-between gap-4 py-1.5 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-slate-500 dark:text-slate-400 shrink-0">
                          30% Structural Surface
                        </span>
                        <span className="font-mono text-right text-slate-900 dark:text-slate-100">
                          {skill.designSystem.colorPalette.structuralSurface30}
                        </span>
                      </div>
                      <div className="flex justify-between gap-4 py-1.5 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-slate-500 dark:text-slate-400 shrink-0">
                          10% Accent Budget
                        </span>
                        <span className="font-mono text-right text-slate-900 dark:text-slate-100">
                          {skill.designSystem.colorPalette.accentBudget10}
                        </span>
                      </div>
                      <div className="flex justify-between gap-4 pt-1">
                        <span className="text-slate-500 dark:text-slate-400 shrink-0">
                          Semantic Tokens
                        </span>
                        <span className="font-mono text-right text-slate-900 dark:text-slate-100">
                          {skill.designSystem.colorPalette.semanticTokens}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 2+1 Typography System */}
                  <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-4 space-y-3">
                    <h3 className="text-xs font-semibold text-slate-900 dark:text-white">
                      2+1 Typography & Tabular Numeral System
                    </h3>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between gap-4 py-1.5 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-slate-500 dark:text-slate-400 shrink-0">
                          Display / Hero Face
                        </span>
                        <span className="font-medium text-right text-slate-900 dark:text-slate-100">
                          {skill.designSystem.typography.displayFont}
                        </span>
                      </div>
                      <div className="flex justify-between gap-4 py-1.5 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-slate-500 dark:text-slate-400 shrink-0">
                          Body / Prose Face
                        </span>
                        <span className="font-medium text-right text-slate-900 dark:text-slate-100">
                          {skill.designSystem.typography.bodyFont}
                        </span>
                      </div>
                      <div className="flex justify-between gap-4 py-1.5 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-slate-500 dark:text-slate-400 shrink-0">
                          Monospace / Tabular
                        </span>
                        <span className="font-mono text-right text-slate-900 dark:text-slate-100">
                          {skill.designSystem.typography.monoFont}
                        </span>
                      </div>
                      <div className="flex justify-between gap-4 pt-1">
                        <span className="text-slate-500 dark:text-slate-400 shrink-0">
                          Scale & Measure
                        </span>
                        <span className="font-mono text-right text-slate-900 dark:text-slate-100">
                          {skill.designSystem.typography.scaleAndMeasure}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-lg">
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Spatial Math, Grid Architecture & Responsive Rules
                  </div>
                  <p className="text-xs font-mono text-slate-800 dark:text-slate-200 leading-relaxed">
                    {skill.designSystem.spatialMathAndGrid}
                  </p>
                </div>
              </section>
            )}

            {/* LAYER 3: Full-Stack Engineering & SEO */}
            {(activeTab === 'all' || activeTab === 'engineering') && (
              <section className="pt-6 border-t border-slate-200 dark:border-slate-800">
                <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                  03. Full-Stack Engineering, State & SEO Architecture
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  {/* Component Hierarchy */}
                  <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-4">
                    <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-3">
                      Modular Component Tree
                    </h3>
                    <ul className="space-y-2 text-xs font-mono text-slate-700 dark:text-slate-300">
                      {skill.engineeringSpec.componentHierarchy.map((comp) => (
                        <li key={comp} className="leading-relaxed">
                          • {comp}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* State & Data Entities */}
                  <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-4">
                    <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-3">
                      TypeScript State & Entities
                    </h3>
                    <ul className="space-y-2 text-xs font-mono text-slate-700 dark:text-slate-300">
                      {skill.engineeringSpec.stateAndDataEntities.map((entity) => (
                        <li key={entity} className="leading-relaxed">
                          • {entity}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* API Routes */}
                  <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-4">
                    <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-3">
                      Runtime & Asset Pipelines
                    </h3>
                    <ul className="space-y-2 text-xs font-mono text-slate-700 dark:text-slate-300">
                      {skill.engineeringSpec.apiEndpointsAndIntegrations.map((api) => (
                        <li key={api} className="leading-relaxed">
                          • {api}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* SEO & JSON-LD */}
                <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-lg mb-6">
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Technical SEO, Asset Preloading & Schema.org JSON-LD
                  </div>
                  <p className="text-xs font-mono text-slate-800 dark:text-slate-200 leading-relaxed">
                    {skill.engineeringSpec.seoAndJsonLdSchema}
                  </p>
                </div>

                {/* Anti-Slop Bans */}
                <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-4">
                  <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-3">
                    Domain Anti-Slop Bans & Verification Checklist
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    {skill.antiPatterns.map((ban) => (
                      <li key={ban} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-red-600 dark:text-red-400 font-mono shrink-0">
                          ✕
                        </span>
                        <span>{ban}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* LAYER 4: Load-Bearing Motion Engine & Reusable Reference Code Templates */}
            {skill.codeTemplates &&
              skill.codeTemplates.length > 0 &&
              (activeTab === 'all' || activeTab === 'templates') && (
                <section className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h2 className="text-base font-bold text-slate-900 dark:text-white">
                        04. Load-Bearing Motion Engine & Reusable Code Templates
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Included automatically in the SKILL.md export and Unified Master Google Doc so AI agents can replicate the single-rAF Lenis loop, 6-layer parallax stage, horizontal reel, and SVG path follower.
                      </p>
                    </div>
                    {skill.hasLiveMotionDemo && onOpenLiveMotionDemo && (
                      <button
                        type="button"
                        onClick={onOpenLiveMotionDemo}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-md cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>Test Live SELENE Motion Stages</span>
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    {skill.codeTemplates.map((tpl, idx) => (
                      <div
                        key={tpl.filename}
                        className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden"
                      >
                        <div className="px-4 py-2.5 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
                          <div>
                            <span className="text-xs font-mono font-semibold text-slate-900 dark:text-white">
                              {tpl.filename}
                            </span>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                              {tpl.description}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopyTemplate(tpl.code, idx)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded hover:border-blue-500 cursor-pointer shrink-0"
                          >
                            {copiedTemplateIdx === idx ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-500" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Code</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-4 bg-slate-950 text-slate-100 text-xs font-mono leading-relaxed overflow-x-auto">
                          {tpl.code}
                        </pre>
                      </div>
                    ))}
                  </div>
                </section>
              )}
          </>
        )}
      </div>
    </div>
  );
};
