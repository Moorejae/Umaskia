# Agentic Website Skill Foundry & Google Docs Exporter

An engineering studio and master repository of production-grade agentic `SKILL.md` specifications covering every major website archetype in existence—built so your AI coding agents can autonomously design, architect, and ship commercial-grade websites on the fly for clients to buy or replicate, with one-click synchronization to a single unified Master Google Doc.

## User Review & Critical Decisions

> [!IMPORTANT]
> Your Phase 1 preferences have been locked into the product architecture below. Review the plan and click **Proceed** to start building.

- **Confirmed Decision 1 — Unified Master Google Doc Export**: All website-building skills compile and export into a **single, structured Master Google Doc** (complete with table-of-contents indexing, formatted headings, and copy-ready `SKILL.md` blocks). You can either generate a brand-new Master Google Doc in one click or paste an existing Google Doc link/ID to update it (protected by a confirmation dialog before modifying existing document contents).
- **Confirmed Decision 2 — Tri-Layer Skill Specification Depth**: Every website archetype skill combines all three requested layers of engineering rigor:
  1. **Agentic YAML Frontmatter & UX Conversion Blueprint**: Trigger conditions, conversion funnel psychology, section-by-section narrative flow, and copywriting frameworks.
  2. **Visual Design Constitution**: Domain-specific color tokens (60-30-10 ratios), display + body + mono typography pairings, spatial math, and anti-AI-slop guardrails.
  3. **Engineering & SEO Architecture**: Component hierarchy trees, state/data schemas, API endpoint patterns, Schema.org JSON-LD structured data, and performance checklists.
- **Confirmed Decision 3 — Core Workspace Capabilities**: Includes a **Server-Side AI Custom Niche Skill Generator & Expander** (to synthesize new sub-niches or deepen existing skills on demand) alongside **One-Click Master Google Doc Export** and **Downloadable `.md` / Bundle Exports**.

---

## 1. Overview & Core Concept

- **What It Does**: Provides an exhaustive, searchable encyclopedia of ready-to-deploy `SKILL.md` files spanning 16 universal website macro-domains (and 60+ sub-archetypes), paired with an AI Skill Synthesizer that generates bespoke skills for any hyper-specific niche (e.g., *"Luxury Yacht Charter Marketplace"* or *"AI Legal Contract Reviewer SaaS"*) and exports the entire collection into a single unified Google Doc or downloadable Markdown files.
- **Target Audience / Persona**: AI agency founders, automation architects, and developer teams building autonomous website-generation agents for commercial resale or rapid client replication.
- **Key Value**: Eliminates generic "AI-slop" websites by equipping AI agents with deterministic, domain-native design systems, conversion engineering rules, and full-stack component architectures for any website category on earth.

---

## 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Browse & Inspect Universal Skill Taxonomy**: Filter across 16 macro website categories in the left navigation rail (E-Commerce & D2C, B2B SaaS & Consoles, High-Converting Landing Pages, FinTech & Banking, Healthcare & Clinics, Real Estate & PropTech, Hospitality & Dining, Media & Editorial, EdTech & LMS, Multi-Sided Marketplaces, Creative Portfolios, Legal & Advisory, DeepTech & Hardware, Community & Events, Non-Profit & Civic, Interactive 3D & WebGL).
  2. **Inspect Tri-Layer `SKILL.md` Specification**: View any skill's complete YAML frontmatter, Visual Design Constitution, UX Conversion Flow, and Engineering/SEO Schema, with instant one-click copy or individual `.md` file download.
  3. **Synthesize or Expand Custom Niche Skills**: Enter any niche business type, reference style, or target audience into the **AI Skill Generator**, or click **"Deepen Skill with AI"** on any existing archetype to generate specialized conversion rules, component trees, and edge-case instructions.
  4. **One-Click Unified Google Docs Sync**: Authenticate via **Sign in with Google** and click **"Export All Skills to Master Google Doc"** to either create a new unified Master Handbook in Google Docs or append/sync into an existing Google Doc ID (with a mandatory confirmation prompt before modifying an existing document).

- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Precision technical developer console and specification foundry—clean, high-density, zero-clutter architectural workspace.
  - *Color Palette & Mood*: 60-30-10 discipline with a crisp light/dark adaptive slate canvas (`#F8FAFC` light / `#0B0F19` dark), structured surface panels (`#FFFFFF` / `#111827`) separated by `1px solid` hairline dividers, and a high-intent electric cobalt accent (`#2563EB` / `#3B82F6`) alongside semantic emerald (`#16A34A`) for Google Docs sync status.
  - *Typography & Hierarchy*:
    - **Display & Navigation**: `Plus Jakarta Sans` (SemiBold/Bold, tight tracking, balanced headlines).
    - **Body & Documentation**: `Public Sans` (14px–15px, comfortable 65–75ch measure for readable specifications).
    - **Code, YAML Frontmatter & Metrics**: `JetBrains Mono` with `tabular-nums` for vertical numerical alignment and clean Markdown/YAML inspection.
  - *Component Styling & Layout*:
    - Full-viewport 1440px desktop SaaS layout: `260px` collapsible domain taxonomy sidebar + single-row Top Bar adhering to the strict 3-zone contract + split main workspace (Skill Catalog & Inspector + Google Docs Sync & AI Synthesizer Drawer).
    - Zero static pill badges: Domain categories, token counts, and section indices render as clean inline typography with subtle `·` separators.

- **Interactive Feedback & Motion**:
  - Fast `150ms` micro-interactions on category filtering, tab switching, and clipboard copy actions.
  - Streaming / progressive skeleton feedback during AI custom skill generation and batch Google Docs `batchUpdate` formatting.
  - Explicit confirmation modal before mutating or appending to any existing user-specified Google Doc.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Pre-Engineered Universal Taxonomy + Live Gemini AI Synthesis**
  - *Chosen Approach*: Ship a rich, deeply written baseline library of 16 foundational website archetype skills immediately available offline/on-load, augmented by a server-side `gemini-3.8-flash` endpoint that synthesizes brand-new niche skills or expands existing ones.
  - *Why*: Gives the user an immediate, comprehensive library covering every major website category in existence while allowing infinite depth for micro-niches without waiting on LLM generation for basic browsing.
  - *Alternatives Considered*: Pure on-demand generation (too slow to populate a full master Google Doc) or static-only templates (cannot adapt to custom client niches).

- **Decision 2: Google Docs `documents.batchUpdate` Structured Formatting**
  - *Chosen Approach*: Format the unified Master Google Doc using the Google Docs REST API (`POST /v1/documents` and `POST /v1/documents/{documentId}:batchUpdate`) with structured document headings, executive index, and cleanly delimited `SKILL.md` blocks.
  - *Why*: Ensures the resulting Google Doc is immediately navigable by humans (via Google Docs outline tabs) and easily parsed by AI agents reading the document.
  - *Alternatives Considered*: Raw unformatted text dump (hard to navigate across 16+ comprehensive skills).

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Architecture & Component Diagram**:

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                        Top Bar (3-Zone Contract)                             │
│  [SkillFoundry]     [Catalog · AI Generator · Doc Sync · Export]    [Google] │
└───────────────────┬──────────────────────────────────────┬───────────────────┘
                    │                                      │
        ┌───────────▼───────────┐              ┌───────────▼───────────┐
        │   Taxonomy Sidebar    │              │  Main Workspace View  │
        │  (16 Macro Domains &  │─────────────▶│                       │
        │    Search Filter)     │              │  ┌─────────────────┐  │
        └───────────────────────┘              │  │ Skill Inspector │  │
                                               │  │ (YAML / Design /│  │
        ┌───────────────────────┐              │  │  UX / Code /    │  │
        │  Client State Store   │◀────────────▶│  │  Raw SKILL.md)  │  │
        │ (Built-in + Custom AI │              │  └────────┬────────┘  │
        │  Skills + Auth Token) │              └───────────┼───────────┘
        └───────┬───────┬───────┘                          │
                │       │                                  ▼
                │       │                      ┌───────────────────────┐
                │       │                      │ Action & Export Bar   │
                │       │                      │ • Copy / Download .md │
                │       │                      │ • Bundle All (.md)    │
                │       │                      │ • Sync Master GDoc    │
                │       │                      └───────────────────────┘
                │       │
     ┌──────────▼──┐ ┌──▼──────────────────────────────────────────────────────┐
     │ Express API │ │ Google Workspace Client Auth & Docs REST Integration    │
     │ /api/skills │ │ • Firebase Auth (GoogleAuthProvider + documents scope)  │
     │ (Gemini 3.8 │ │ • POST docs.googleapis.com/v1/documents (Create Master) │
     │  Flash SDK) │ │ • POST .../v1/documents/{id}:batchUpdate (Write Skills) │
     └─────────────┘ └─────────────────────────────────────────────────────────┘
```

- **Data Model & State**:
  - `WebsiteSkill`: `{ id, slug, name, category, subArchetypes, summary, yamlFrontmatter, designSystem, uxConversionFlow, engineeringSpec, seoAndSchema, antiPatterns, fullMarkdown, isCustom }`.
  - `GoogleDocsSyncState`: `{ isAuthenticated, user, accessToken (in-memory only), lastSyncedDocId, lastSyncedDocUrl, syncStatus, pendingConfirmAction }`.

- **Interactive Component & State Mapping**:
  - **Domain Filter & Search**: Real-time filtering across skill titles, sub-archetypes, and architectural tags; updates the active `WebsiteSkill` selection.
  - **AI Custom Skill Generator Modal / View**: Accepts niche name, target conversion goal, aesthetic direction, and tech stack; sends `POST /api/generate-skill` to the Express backend; validates structured JSON/Markdown output from `gemini-3.8-flash` and adds the newly synthesized skill directly into the active catalog and Master Google Doc queue.
  - **Google Docs Master Exporter**:
    - *Create New Master Doc*: Calls `POST https://docs.googleapis.com/v1/documents` with title `"Master Agentic Website Building Skills Library"`, then populates the complete multi-skill specification via `batchUpdate` and provides a direct link to open the document.
    - *Append to Existing Google Doc*: Parses a pasted Google Doc URL or Document ID, presents a **mandatory confirmation modal** detailing how many skill files will be appended to the document, and executes `batchUpdate` upon user confirmation.
