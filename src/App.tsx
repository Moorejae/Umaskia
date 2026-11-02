import React, { useState, useEffect, useMemo } from 'react';
import { User } from 'firebase/auth';
import {
  INITIAL_WEBSITE_SKILLS,
  MACRO_CATEGORIES,
  compileSkillToMarkdown,
} from './data/websiteSkillsData';
import { WebsiteSkill, GoogleDocSyncRecord } from './types/skill';
import {
  initAuth,
  googleSignIn,
  logout,
  buildUnifiedGoogleDocContent,
} from './services/googleDocsService';
import { SkillInspectorPanel } from './components/SkillInspectorPanel';
import { AiSkillSynthesizerModal } from './components/AiSkillSynthesizerModal';
import { GoogleDocsExportModal } from './components/GoogleDocsExportModal';
import { SeleneMotionPreviewModal } from './components/SeleneMotionPreviewModal';
import { GoogleSignInButton } from './components/GoogleSignInButton';
import {
  Search,
  Sparkles,
  FileText,
  Download,
  ExternalLink,
  Sun,
  Moon,
  RotateCcw,
  Play,
} from 'lucide-react';

export default function App() {
  const [skills, setSkills] = useState<WebsiteSkill[]>(INITIAL_WEBSITE_SKILLS);
  // Default to the newly added Cinematic Scrollytelling & Motion Website skill (Skill 17)
  const [selectedSkillId, setSelectedSkillId] = useState<string>(
    'skill-17-cinematic-scrollytelling-motion'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState<string>('All Categories');

  // Theme state synced with <html class="dark">
  const [isDark, setIsDark] = useState<boolean>(true);

  // Google Auth state (token kept strictly in memory via googleDocsService)
  const [user, setUser] = useState<User | null>(null);
  const [needsAuth, setNeedsAuth] = useState<boolean>(true);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [syncHistory, setSyncHistory] = useState<GoogleDocSyncRecord[]>([]);

  // Modal states
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiModalMode, setAiModalMode] = useState<'create' | 'expand'>('create');
  const [skillToExpand, setSkillToExpand] = useState<WebsiteSkill | null>(null);

  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [singleSkillForDoc, setSingleSkillForDoc] =
    useState<WebsiteSkill | null>(null);

  const [isMotionDemoOpen, setIsMotionDemoOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      (authedUser) => {
        setUser(authedUser);
        setNeedsAuth(false);
      },
      () => {
        setUser(null);
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setNeedsAuth(false);
      }
    } catch (err) {
      console.error('Google Sign-In failed:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGoogleLogout = async () => {
    await logout();
    setUser(null);
    setNeedsAuth(true);
  };

  const filteredSkills = useMemo(() => {
    return skills.filter((s) => {
      const matchesCat =
        selectedCategory === 'All Categories' || s.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesCat;
      const inName = s.name.toLowerCase().includes(q);
      const inCategory = s.category.toLowerCase().includes(q);
      const inSummary = s.summary.toLowerCase().includes(q);
      const inSubs = s.subArchetypes.some((sub) =>
        sub.toLowerCase().includes(q)
      );
      return matchesCat && (inName || inCategory || inSummary || inSubs);
    });
  }, [skills, selectedCategory, searchQuery]);

  const activeSkill = useMemo(() => {
    return (
      skills.find((s) => s.id === selectedSkillId) ||
      filteredSkills[0] ||
      skills[0]
    );
  }, [skills, selectedSkillId, filteredSkills]);

  const totalSubArchetypesCount = useMemo(() => {
    return skills.reduce((acc, s) => acc + s.subArchetypes.length, 0);
  }, [skills]);

  const handleOpenCreateSkillModal = () => {
    setAiModalMode('create');
    setSkillToExpand(activeSkill);
    setIsAiModalOpen(true);
  };

  const handleOpenExpandSkillModal = (skill: WebsiteSkill) => {
    setAiModalMode('expand');
    setSkillToExpand(skill);
    setIsAiModalOpen(true);
  };

  const handleOpenMasterDocModal = () => {
    setSingleSkillForDoc(null);
    setIsDocModalOpen(true);
  };

  const handleOpenSingleSkillDocModal = (skill: WebsiteSkill) => {
    setSingleSkillForDoc(skill);
    setIsDocModalOpen(true);
  };

  const handleDownloadMasterBundle = () => {
    const content = buildUnifiedGoogleDocContent(
      'Master Agentic Website Building Skills Library (All Archetypes)',
      skills
    );
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Master-Agentic-Website-Skills-All-${skills.length}-Archetypes.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadJsonRegistry = () => {
    const payload = skills.map((s) => ({
      path: `/skills/${s.slug}/SKILL.md`,
      category: s.category,
      name: s.name,
      subArchetypes: s.subArchetypes,
      markdown: compileSkillToMarkdown(s),
    }));
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'agentic-website-skills-registry.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="flex items-center justify-between gap-8 px-6 py-3.5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#catalog"
          onClick={(e) => {
            e.preventDefault();
            setSelectedCategory('All Categories');
            setSearchQuery('');
          }}
          className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 font-display"
        >
          SkillFoundry
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All Categories');
              setSearchQuery('');
            }}
            className="hover:text-slate-900 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Skill Catalog
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedSkillId('skill-17-cinematic-scrollytelling-motion');
              setIsMotionDemoOpen(true);
            }}
            className="hover:text-slate-900 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            SELENE Motion Sandbox
          </button>
          <button
            type="button"
            onClick={handleOpenCreateSkillModal}
            className="hover:text-slate-900 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            AI Niche Generator
          </button>
          <button
            type="button"
            onClick={handleOpenMasterDocModal}
            className="hover:text-slate-900 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Google Docs Sync
          </button>
          <button
            type="button"
            onClick={handleDownloadMasterBundle}
            className="hover:text-slate-900 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Download All (.md)
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleOpenMasterDocModal}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Export Master Google Doc
          </button>
        </div>
      </header>

      {/* Workspace Toolbar & 4-Column Quantitative Summary Strip */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* 4-Column Tabular Metrics Strip */}
          <div className="flex flex-wrap items-center gap-6 text-xs">
            <div>
              <span className="text-slate-500 dark:text-slate-400">
                Macro Archetypes:{' '}
              </span>
              <span className="font-mono font-semibold tabular-nums text-slate-900 dark:text-white">
                {skills.length} Skills
              </span>
            </div>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">
              ·
            </span>
            <div>
              <span className="text-slate-500 dark:text-slate-400">
                Sub-Niches Covered:{' '}
              </span>
              <span className="font-mono font-semibold tabular-nums text-slate-900 dark:text-white">
                {totalSubArchetypesCount} Website Types
              </span>
            </div>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">
              ·
            </span>
            <div>
              <span className="text-slate-500 dark:text-slate-400">
                Motion Engine:{' '}
              </span>
              <button
                type="button"
                onClick={() => {
                  setSelectedSkillId('skill-17-cinematic-scrollytelling-motion');
                  setIsMotionDemoOpen(true);
                }}
                className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
              >
                <Play className="w-3 h-3" />
                <span>SELENE 6-Layer Scrollytelling Included</span>
              </button>
            </div>
            {syncHistory.length > 0 && (
              <>
                <span
                  aria-hidden="true"
                  className="text-slate-300 dark:text-slate-700"
                >
                  ·
                </span>
                <a
                  href={syncHistory[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium hover:underline"
                >
                  <span>Last Synced Google Doc ({syncHistory[0].syncedAt})</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </>
            )}
          </div>

          {/* Workspace Utility Controls (Google Auth, JSON Export, Theme Switch) */}
          <div className="flex items-center gap-3">
            <GoogleSignInButton
              user={user}
              needsAuth={needsAuth}
              isLoggingIn={isLoggingIn}
              onSignIn={handleGoogleLogin}
              onSignOut={handleGoogleLogout}
            />

            <button
              type="button"
              onClick={handleDownloadJsonRegistry}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              title="Download machine-readable JSON bundle for AI agent pipelines"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Agent JSON Bundle</span>
            </button>

            <button
              type="button"
              onClick={() => setIsDark((prev) => !prev)}
              className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-md transition-colors cursor-pointer"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle color theme"
            >
              {isDark ? (
                <Sun className="w-3.5 h-3.5" />
              ) : (
                <Moon className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main 1440px+ Split SaaS Workspace */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Navigation & Taxonomy Rail (4 Columns on lg, 3 on xl) */}
        <aside className="lg:col-span-4 xl:col-span-3 flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
          {/* Search & Category Filter Header */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-900 dark:text-white">
                Website Archetype Taxonomy
              </h2>
              <button
                type="button"
                onClick={handleOpenCreateSkillModal}
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                <Sparkles className="w-3 h-3" />
                <span>+ New Niche Skill</span>
              </button>
            </div>

            {/* Live Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 86+ website types (e.g. motion, SaaS, store)..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-600"
              />
            </div>

            {/* Macro Category Select */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                aria-label="Filter by website macro category"
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md text-slate-700 dark:text-slate-300 focus:outline-none focus:border-blue-600"
              >
                {MACRO_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Skill Catalog List */}
          <div className="divide-y divide-slate-100 dark:divide-slate-800/70 max-h-[680px] overflow-y-auto">
            {filteredSkills.length === 0 ? (
              <div className="p-6 text-center space-y-3">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  No pre-built skills matched "{searchQuery}". You can reset filters or synthesize this exact niche with AI.
                </p>
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All Categories');
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-md cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleOpenCreateSkillModal}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-md cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Synthesize with AI</span>
                  </button>
                </div>
              </div>
            ) : (
              filteredSkills.map((skill) => {
                const isSelected = skill.id === activeSkill?.id;
                return (
                  <button
                    key={skill.id}
                    type="button"
                    onClick={() => setSelectedSkillId(skill.id)}
                    className={`w-full text-left px-4 py-3 transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50/70 dark:bg-blue-950/40'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 text-xs font-mono tabular-nums text-slate-400 dark:text-slate-500 mb-0.5">
                      <span>
                        {skill.indexNumber}. {skill.category}
                      </span>
                      <span>{skill.subArchetypes.length} variants</span>
                    </div>
                    <div
                      className={`text-xs font-semibold leading-snug ${
                        isSelected
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-slate-900 dark:text-slate-100'
                      }`}
                    >
                      {skill.name}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-1">
                      {skill.subArchetypes.slice(0, 3).join(' · ')}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Bottom Master Export Callout inside Sidebar */}
          <div className="p-4 bg-slate-50 dark:bg-slate-950/70 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <div className="text-xs font-semibold text-slate-900 dark:text-white">
              Unified Master Google Doc
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Export all {skills.length} website-building SKILL.md blueprints (including the SELENE Motion Engine) into a single indexed Google Doc.
            </p>
            <button
              type="button"
              onClick={handleOpenMasterDocModal}
              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 rounded-md transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Sync All {skills.length} Skills to Google Docs</span>
            </button>
          </div>
        </aside>

        {/* Right Skill Specification Inspector (8 Columns on lg, 9 on xl) */}
        <section className="lg:col-span-8 xl:col-span-9">
          {activeSkill && (
            <SkillInspectorPanel
              skill={activeSkill}
              onOpenAiExpand={handleOpenExpandSkillModal}
              onExportSingleSkillToDoc={handleOpenSingleSkillDocModal}
              onOpenLiveMotionDemo={() => setIsMotionDemoOpen(true)}
            />
          )}
        </section>
      </main>

      {/* AI Custom Skill Generator & Expander Modal */}
      <AiSkillSynthesizerModal
        isOpen={isAiModalOpen}
        initialMode={aiModalMode}
        targetSkillForExpand={skillToExpand}
        onClose={() => setIsAiModalOpen(false)}
        onSkillCreated={(newSkill) => {
          setSkills((prev) => [newSkill, ...prev]);
          setSelectedSkillId(newSkill.id);
        }}
        onSkillUpdated={(updatedSkill) => {
          setSkills((prev) =>
            prev.map((s) => (s.id === updatedSkill.id ? updatedSkill : s))
          );
          setSelectedSkillId(updatedSkill.id);
        }}
      />

      {/* Unified Master Google Doc Exporter Modal */}
      <GoogleDocsExportModal
        isOpen={isDocModalOpen}
        onClose={() => setIsDocModalOpen(false)}
        allSkills={skills}
        preselectedSkill={singleSkillForDoc}
        user={user}
        needsAuth={needsAuth}
        isLoggingIn={isLoggingIn}
        onSignIn={handleGoogleLogin}
        onSignOut={handleGoogleLogout}
        onSyncSuccess={(record) => {
          setSyncHistory((prev) => [record, ...prev]);
        }}
      />

      {/* Live SELENE Motion Engine Interactive Sandbox Modal */}
      <SeleneMotionPreviewModal
        isOpen={isMotionDemoOpen}
        onClose={() => setIsMotionDemoOpen(false)}
      />
    </div>
  );
}
