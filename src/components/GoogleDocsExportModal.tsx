import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { WebsiteSkill, GoogleDocSyncRecord } from '../types/skill';
import {
  createMasterGoogleDoc,
  getExistingGoogleDocInfo,
  appendSkillsToExistingGoogleDoc,
  buildUnifiedGoogleDocContent,
} from '../services/googleDocsService';
import { GoogleSignInButton } from './GoogleSignInButton';
import {
  FileText,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Download,
  X,
} from 'lucide-react';

interface GoogleDocsExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  allSkills: WebsiteSkill[];
  preselectedSkill: WebsiteSkill | null;
  user: User | null;
  needsAuth: boolean;
  isLoggingIn: boolean;
  onSignIn: () => void;
  onSignOut: () => void;
  onSyncSuccess: (record: GoogleDocSyncRecord) => void;
}

export const GoogleDocsExportModal: React.FC<GoogleDocsExportModalProps> = ({
  isOpen,
  onClose,
  allSkills,
  preselectedSkill,
  user,
  needsAuth,
  isLoggingIn,
  onSignIn,
  onSignOut,
  onSyncSuccess,
}) => {
  const [exportScope, setExportScope] = useState<'all' | 'single'>(
    preselectedSkill ? 'single' : 'all'
  );
  const [destinationMode, setDestinationMode] = useState<'new' | 'existing'>('new');
  const [newDocTitle, setNewDocTitle] = useState(
    'Master Agentic Website Building Skills Library (All Archetypes)'
  );
  const [existingDocInput, setExistingDocInput] = useState('');

  // Mandatory confirmation dialog state before modifying an existing Google Doc
  const [pendingConfirmDoc, setPendingConfirmDoc] = useState<{
    documentId: string;
    title: string;
    endIndex: number;
  } | null>(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSyncedResult, setLastSyncedResult] = useState<GoogleDocSyncRecord | null>(
    null
  );

  if (!isOpen) return null;

  const skillsToExport =
    exportScope === 'single' && preselectedSkill ? [preselectedSkill] : allSkills;

  const handleDownloadUnifiedMarkdown = () => {
    const content = buildUnifiedGoogleDocContent(newDocTitle, skillsToExport);
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Master-Agentic-Website-Skills-${skillsToExport.length}-Archetypes.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCreateNewMasterDoc = async () => {
    setError(null);
    setIsProcessing(true);
    try {
      const titleToUse =
        exportScope === 'single' && preselectedSkill
          ? `Agentic Website Skill — ${preselectedSkill.name}`
          : newDocTitle.trim() || 'Master Agentic Website Building Skills Library';

      const res = await createMasterGoogleDoc(titleToUse, skillsToExport);
      const record: GoogleDocSyncRecord = {
        documentId: res.documentId,
        title: res.title,
        url: res.url,
        skillCount: skillsToExport.length,
        syncedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mode: 'created',
      };
      setLastSyncedResult(record);
      onSyncSuccess(record);
    } catch (err: any) {
      setError(err.message || 'Failed to create Google Doc.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Step 1 for existing doc: Verify document & trigger Mandatory User Confirmation before mutating
  const handleVerifyExistingDoc = async () => {
    setError(null);
    setIsProcessing(true);
    try {
      const info = await getExistingGoogleDocInfo(existingDocInput);
      setPendingConfirmDoc(info);
    } catch (err: any) {
      setError(err.message || 'Could not verify existing Google Doc.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Step 2 for existing doc: Execute mutation ONLY after explicit user confirmation
  const handleConfirmAppendToExistingDoc = async () => {
    if (!pendingConfirmDoc) return;
    setError(null);
    setIsProcessing(true);
    try {
      const res = await appendSkillsToExistingGoogleDoc(
        pendingConfirmDoc.documentId,
        pendingConfirmDoc.title,
        pendingConfirmDoc.endIndex,
        skillsToExport
      );
      const record: GoogleDocSyncRecord = {
        documentId: res.documentId,
        title: res.title,
        url: res.url,
        skillCount: skillsToExport.length,
        syncedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mode: 'appended',
      };
      setPendingConfirmDoc(null);
      setLastSyncedResult(record);
      onSyncSuccess(record);
    } catch (err: any) {
      setError(err.message || 'Failed to append skills to Google Doc.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-xs p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg max-w-2xl w-full overflow-hidden shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Export Website Skills to Unified Master Google Doc
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

        <div className="p-6 space-y-5">
          {/* Authentication Banner */}
          <div className="p-4 bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-lg flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white">
                Google Docs Connection Status
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {!needsAuth && user
                  ? `Connected as ${user.email || user.displayName}. Ready to write skill files to Google Docs.`
                  : 'Sign in with Google to create or update your Master Agentic Skills Google Doc.'}
              </p>
            </div>
            <GoogleSignInButton
              user={user}
              needsAuth={needsAuth}
              isLoggingIn={isLoggingIn}
              onSignIn={onSignIn}
              onSignOut={onSignOut}
            />
          </div>

          {/* Scope Selection: All Skills (Unified Master Doc) vs Current Skill */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              1. Select Skill Export Scope
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setExportScope('all');
                  setPendingConfirmDoc(null);
                }}
                className={`p-3.5 text-left border rounded-lg transition-colors cursor-pointer ${
                  exportScope === 'all'
                    ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/30'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  All Website Archetype Skills ({allSkills.length} Skills)
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Compiles every website category in existence + TOC index into one Master Doc.
                </div>
              </button>

              <button
                type="button"
                disabled={!preselectedSkill}
                onClick={() => {
                  setExportScope('single');
                  setPendingConfirmDoc(null);
                }}
                className={`p-3.5 text-left border rounded-lg transition-colors cursor-pointer disabled:opacity-50 ${
                  exportScope === 'single'
                    ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/30'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  Active Skill Only ({preselectedSkill?.name || 'None'})
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Exports only the currently inspected SKILL.md specification.
                </div>
              </button>
            </div>
          </div>

          {/* Destination Mode: Create New Master Doc vs Append to Existing Doc */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              2. Target Google Doc Mode
            </label>
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg mb-3">
              <button
                type="button"
                onClick={() => {
                  setDestinationMode('new');
                  setPendingConfirmDoc(null);
                }}
                className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  destinationMode === 'new'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Create New Master Google Doc
              </button>
              <button
                type="button"
                onClick={() => {
                  setDestinationMode('existing');
                  setPendingConfirmDoc(null);
                }}
                className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  destinationMode === 'existing'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Append to Existing Google Doc URL / ID
              </button>
            </div>

            {destinationMode === 'new' ? (
              <div>
                <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                  Master Google Doc Title
                </label>
                <input
                  type="text"
                  value={newDocTitle}
                  onChange={(e) => setNewDocTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                  Paste Existing Google Doc URL or Document ID
                </label>
                <input
                  type="text"
                  value={existingDocInput}
                  onChange={(e) => {
                    setExistingDocInput(e.target.value);
                    setPendingConfirmDoc(null);
                  }}
                  placeholder="https://docs.google.com/document/d/1aBcDeFgHiJkLmNoPqRsTuVwXyZ/edit"
                  className="w-full px-3 py-2 text-xs font-mono bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                />
              </div>
            )}
          </div>

          {/* Mandatory Confirmation Box before modifying an existing Google Doc */}
          {pendingConfirmDoc && (
            <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 rounded-lg space-y-3">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                  <div className="font-bold mb-1">
                    Confirm Update to Existing Google Doc
                  </div>
                  You are about to append{' '}
                  <strong className="font-mono tabular-nums">
                    {skillsToExport.length}
                  </strong>{' '}
                  complete agentic website <code className="font-mono">SKILL.md</code>{' '}
                  specification(s) to the end of your Google Doc{' '}
                  <strong>"{pendingConfirmDoc.title}"</strong>. Do you want to proceed?
                </div>
              </div>
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setPendingConfirmDoc(null)}
                  disabled={isProcessing}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmAppendToExistingDoc}
                  disabled={isProcessing}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 rounded-md cursor-pointer"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Updating Document...</span>
                    </>
                  ) : (
                    <span>Confirm & Append to "{pendingConfirmDoc.title}"</span>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Success Result Box */}
          {lastSyncedResult && (
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg flex items-center justify-between gap-4">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-900 dark:text-emerald-200">
                  <div className="font-bold">
                    Successfully {lastSyncedResult.mode === 'created' ? 'created' : 'updated'}{' '}
                    Google Doc!
                  </div>
                  <div className="mt-0.5">
                    {lastSyncedResult.title} · {lastSyncedResult.skillCount} skill
                    blueprint(s) synced at {lastSyncedResult.syncedAt}
                  </div>
                </div>
              </div>
              <a
                href={lastSyncedResult.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-md whitespace-nowrap shrink-0"
              >
                <span>Open Google Doc</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 rounded-md text-xs text-red-700 dark:text-red-300">
              {error}
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleDownloadUnifiedMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Master Handbook (.md)</span>
            </button>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                Close
              </button>

              {destinationMode === 'new' ? (
                <button
                  type="button"
                  disabled={needsAuth || !user || isProcessing}
                  onClick={handleCreateNewMasterDoc}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-md transition-colors cursor-pointer"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Writing {skillsToExport.length} Skills to Google Docs...</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-3.5 h-3.5" />
                      <span>
                        Create Master Google Doc ({skillsToExport.length} Skills)
                      </span>
                    </>
                  )}
                </button>
              ) : (
                !pendingConfirmDoc && (
                  <button
                    type="button"
                    disabled={needsAuth || !user || isProcessing || !existingDocInput.trim()}
                    onClick={handleVerifyExistingDoc}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-md transition-colors cursor-pointer"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Verifying Document...</span>
                      </>
                    ) : (
                      <span>Verify & Prepare Google Doc Update</span>
                    )}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
