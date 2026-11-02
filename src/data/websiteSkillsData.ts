import { WebsiteSkill } from '../types/skill';

export const MACRO_CATEGORIES = [
  'All Categories',
  'E-Commerce & D2C Retail',
  'B2B SaaS & Enterprise Consoles',
  'Landing Pages & Conversion Funnels',
  'FinTech, Banking & Web3',
  'Healthcare, Clinics & Wellness',
  'Real Estate, PropTech & Architecture',
  'Hospitality, Dining & Travel',
  'Marketplaces, Directories & Aggregators',
  'Media, Editorial & Publishing',
  'EdTech, Courses & Simulations',
  'Creative Portfolios & Agency Showreels',
  'Legal, Consulting & Advisory',
  'DeepTech, Hardware & Industrial',
  'Community, Social & Events',
  'Non-Profit, Civic & Institutional',
  'Interactive 3D, WebGL & Casual Games',
  'Cinematic Scrollytelling & Motion Websites',
] as const;

export function compileSkillToMarkdown(skill: WebsiteSkill): string {
  const sectionsText = skill.uxConversionFlow.sectionSequence
    .map(
      (sec, idx) =>
        `### ${String(idx + 1).padStart(2, '0')}. ${sec.sectionName}\n- **Strategic Purpose**: ${sec.purpose}\n- **Mandatory UI & Content Elements**: ${sec.requiredElements}`
    )
    .join('\n\n');

  const psychologyList = skill.uxConversionFlow.conversionPsychology
    .map((item) => `- ${item}`)
    .join('\n');

  const componentList = skill.engineeringSpec.componentHierarchy
    .map((item) => `- \`${item}\``)
    .join('\n');

  const stateList = skill.engineeringSpec.stateAndDataEntities
    .map((item) => `- \`${item}\``)
    .join('\n');

  const apiList = skill.engineeringSpec.apiEndpointsAndIntegrations
    .map((item) => `- \`${item}\``)
    .join('\n');

  const antiPatternList = skill.antiPatterns
    .map((item) => `- ❌ ${item}`)
    .join('\n');

  return `${skill.yamlFrontmatter.trim()}

# ${skill.name} — Agentic Website Building Specification

> **Category**: ${skill.category} · **Sub-Archetypes Covered**: ${skill.subArchetypes.join(' · ')}

${skill.summary}

---

## Layer 1: UX Architecture & Conversion Funnel Blueprint

### Primary Conversion Objective
${skill.uxConversionFlow.primaryGoal}

### Above-the-Fold Viewport Contract (1440px Desktop / 390px Mobile)
${skill.uxConversionFlow.aboveTheFoldArchitecture}

### Deterministic Section-by-Section Sequence
${sectionsText}

### Conversion Psychology & Trust Triggers
${psychologyList}

---

## Layer 2: Visual Design Constitution & Spatial Math

### Aesthetic Direction
${skill.designSystem.aestheticDirection}

### 60-30-10 Color Token Allocation
- **60% Dominant Canvas**: ${skill.designSystem.colorPalette.dominantCanvas60}
- **30% Structural Surfaces**: ${skill.designSystem.colorPalette.structuralSurface30}
- **10% High-Intent Accent**: ${skill.designSystem.colorPalette.accentBudget10}
- **Semantic State Tokens**: ${skill.designSystem.colorPalette.semanticTokens}

### 2+1 Typography System & Tabular Discipline
- **Display / Headline Font**: ${skill.designSystem.typography.displayFont}
- **Body / Prose Font**: ${skill.designSystem.typography.bodyFont}
- **Monospace / Tabular Metrics Font**: ${skill.designSystem.typography.monoFont}
- **Type Scale & Line Measure**: ${skill.designSystem.typography.scaleAndMeasure}

### Spatial Math, Grid & Responsive Breakpoints
${skill.designSystem.spatialMathAndGrid}

---

## Layer 3: Full-Stack Engineering & SEO Architecture

### Modular Component Hierarchy
${componentList}

### Core TypeScript State & Data Entities
${stateList}

### Server-Side API Routes & External Integrations
${apiList}

### Technical SEO & Schema.org JSON-LD Specification
${skill.engineeringSpec.seoAndJsonLdSchema}

---

## Domain Anti-Slop Bans & Verification Guardrails
${antiPatternList}${
    skill.codeTemplates && skill.codeTemplates.length > 0
      ? `\n\n---\n\n## Layer 4: Load-Bearing Motion Engine & Reusable Reference Code Templates\n\n${skill.codeTemplates
          .map(
            (tpl) =>
              `### File: \`${tpl.filename}\`\n> ${tpl.description}\n\n\`\`\`tsx\n${tpl.code.trim()}\n\`\`\``
          )
          .join('\n\n')}`
      : ''
  }
`;
}

export const INITIAL_WEBSITE_SKILLS: WebsiteSkill[] = [
  {
    id: 'skill-01-ecommerce-d2c',
    slug: 'ecommerce-d2c-flagship-store',
    indexNumber: '01',
    name: 'E-Commerce & D2C Flagship Storefront',
    category: 'E-Commerce & D2C Retail',
    subArchetypes: [
      'Luxury Apparel & Streetwear',
      'Beauty, Skincare & Fragrance',
      'Specialty Food, Beverage & Coffee',
      'Home Goods, Furniture & Lighting',
      'Consumer Electronics & Audio Gear',
      'Subscription Box & Replenishment Store',
    ],
    summary:
      'Instructs AI agents to build high-AOV direct-to-consumer storefronts with editorial product storytelling, frictionless slide-over cart drawers, variant/bundle selectors, and instant checkout flows.',
    yamlFrontmatter: `---
name: "ecommerce-d2c-flagship-store"
description: >
  Production blueprint for building high-converting Direct-to-Consumer (D2C) e-commerce
  stores, luxury retail flagships, and subscription commerce websites. Enforces tactile
  product photography layouts, variant matrix state, slide-over cart drawers with free-shipping
  progress meters, and Schema.org Product JSON-LD.
triggers:
  - "online store, e-commerce, shop, D2C brand, product catalog, cart, checkout"
target_conversion_metric: "Add-to-Cart Rate (ATC >= 8.5%) & Average Order Value (AOV)"
---`,
    uxConversionFlow: {
      primaryGoal:
        'Maximize Add-to-Cart (ATC) velocity and Average Order Value (AOV) via bundle tiers, zero-page-reload cart drawers, and immediate tactile product proof.',
      aboveTheFoldArchitecture:
        '3-Zone Top Bar (Brand Wordmark — 4 Collection Links — Cart Trigger with Tabular Item Count) + 60/40 Asymmetric Hero Split featuring studio product showcase on the left and value proposition, star rating summary, price, and primary "Shop Flagship Collection" CTA on the right.',
      sectionSequence: [
        {
          sectionName: 'Editorial Hero & Immediate Buy Trigger',
          purpose: 'Anchor brand taste and drive immediate product discovery within 3 seconds.',
          requiredElements:
            'High-resolution studio product visual, 1-sentence category-defining headline, verified customer review count, primary CTA button, and 3 unboxed trust guarantees (e.g., Free 48h Shipping · 60-Day Trial · Small-Batch Crafted).',
        },
        {
          sectionName: 'Curated Featured Collection Grid (3 or 4 Columns)',
          purpose: 'Enable rapid browsing and comparison without visual overcrowding.',
          requiredElements:
            '3:4 aspect ratio product cards, quick-add hover affordance, swatch/size selector, tabular price (`$148.00`), and subtle hover image swap.',
        },
        {
          sectionName: 'Interactive Bundle / Subscribe-&-Save Configurator',
          purpose: 'Lift Average Order Value by 25–40% through tiered quantity discounts.',
          requiredElements:
            'Interactive 1-pack / 2-pack / 3-pack selector with real-time savings calculation, one-time vs. monthly auto-delivery toggle, and direct "Add Bundle to Bag" handler.',
        },
        {
          sectionName: 'Tactile Ingredient / Material Breakdown & Provenance',
          purpose: 'Justify premium pricing with transparent sourcing and technical specifications.',
          requiredElements:
            'Accordion or tab-driven specification matrix (Materials, Dimensions, Care/Usage, Sustainability Metrics) paired with macro texture close-ups.',
        },
        {
          sectionName: 'Verified Buyer Reviews with Attribute Filtering',
          purpose: 'Eliminate purchase hesitation at the bottom of the funnel.',
          requiredElements:
            'Rating distribution histogram, filter by verified buyer attribute (fit, skin type, use case), and concrete before/after customer testimonials.',
        },
      ],
      conversionPsychology: [
        'Dynamic Free-Shipping Progress Bar inside the slide-over cart drawer ("Add $22.00 more for complimentary express shipping").',
        'Zero-page-reload variant switching (size, color, subscription cadence) that updates SKU price and inventory status instantaneously.',
        'Cross-sell "Complete the Ritual / Pair With" 1-click upsell module inside the cart drawer.',
      ],
    },
    designSystem: {
      aestheticDirection:
        'Tactile Editorial Luxury & Architectural Minimalism — generous negative space, warm stone or crisp alabaster canvas, razor-sharp hairline dividers, and zero promotional clutter.',
      colorPalette: {
        dominantCanvas60: '#FAF8F5 (Warm Alabaster Stone) or #0C0C0E (Obsidian Gallery Dark)',
        structuralSurface30: '#F2EFE9 (Travertine Card Surface) with #E4DFD7 1px borders',
        accentBudget10: '#18181B (Deep Espresso Ink CTA) or #C2410C (Burnished Copper Accent)',
        semanticTokens: 'In-Stock #15803D · Low Stock #B45309 · Sold Out #71717A',
      },
      typography: {
        displayFont: 'Cormorant Garamond or Fraunces (Editorial Luxury) / Outfit (Modern Technical D2C)',
        bodyFont: 'Plus Jakarta Sans or DM Sans (400 Regular, 500 Medium)',
        monoFont: 'JetBrains Mono (strictly for SKU codes, weights, and tabular currency)',
        scaleAndMeasure: 'Hero Display clamp(2.5rem, 4.2vw, 4rem) · Product Title 18px · Body 15px (65ch max)',
      },
      spatialMathAndGrid:
        '1440px max container with 48px desktop horizontal padding; 12-column CSS Grid with 24px gap; Product cards use 0px or 8px border-radius consistently across the entire storefront.',
    },
    engineeringSpec: {
      componentHierarchy: [
        'StorefrontHeader (3-zone contract + live cart drawer badge)',
        'HeroShowcaseSplit (featured flagship SKU + instant variant buy box)',
        'ProductCollectionGrid (client-side category & sort controls + ProductCard[])',
        'InteractiveBundleBuilder (tier state machine + savings calculator)',
        'SlideOverCartDrawer (line items, quantity steppers, shipping threshold bar, checkout modal)',
        'ProductQuickViewModal (specification tabs, gallery zoom, review breakdown)',
      ],
      stateAndDataEntities: [
        'Product { id, sku, title, subtitle, priceCents, compareAtCents, variants[], specs, rating, reviewCount }',
        'CartItem { productId, variantId, quantity, isSubscription, unitPriceCents }',
        'CartState { items[], discountCode, subtotalCents, shippingThresholdCents, isDrawerOpen }',
      ],
      apiEndpointsAndIntegrations: [
        'GET /api/products (filterable by category, collection, price range, sort order)',
        'POST /api/cart/validate-promo (validates discount codes and returns updated totals)',
        'POST /api/checkout/session (creates Stripe/payment checkout session and order record)',
      ],
      seoAndJsonLdSchema:
        'Inject Schema.org `Product` and `AggregateOffer` JSON-LD with `priceCurrency`, `availability` (`https://schema.org/InStock`), and `aggregateRating` on every product view.',
    },
    antiPatterns: [
      'Never wrap product category tags or stock counts in colorful candy pill badges above product titles.',
      'Never show more than 1 promotional area + 1 featured collection + 1 secondary bundle section on the home view ("Everything Store" ban).',
      'Never use unverified external Unsplash URLs that break in sandboxed environments.',
      'Never require a full page reload to add an item to the cart or adjust item quantities.',
      'Never fire arrival popups or spin-the-wheel discount modals on initial page load.',
    ],
  },
  {
    id: 'skill-02-b2b-saas-dashboard',
    slug: 'b2b-saas-workspace-and-console',
    indexNumber: '02',
    name: 'B2B SaaS Platform & Enterprise Analytics Console',
    category: 'B2B SaaS & Enterprise Consoles',
    subArchetypes: [
      'AI Workflow & Automation Platform',
      'CRM, Pipeline & Revenue Intelligence',
      'Developer API & Cloud Observability Console',
      'Project, Issue & Sprint Management',
      'HRIS, Payroll & Team Operations Suite',
      'Data Spreadsheet & Batch Normalization Tool',
    ],
    summary:
      'Equips AI agents to architect dense, high-utility B2B SaaS applications featuring collapsible 260px navigation sidebars, tabular-numeral data grids, interactive command palettes, and full CRUD state completeness.',
    yamlFrontmatter: `---
name: "b2b-saas-workspace-and-console"
description: >
  Complete engineering and design specification for B2B SaaS web applications, enterprise
  dashboards, analytics consoles, and workflow automation tools. Enforces single-elevation
  1px border surfaces, strict tabular numerals, populated/empty/loading/filter state
  completeness, and interactive data mutation flows.
triggers:
  - "SaaS, dashboard, admin panel, analytics console, CRM, workflow tool, B2B platform"
target_conversion_metric: "Time-to-First-Value (TTFV < 60s) & Daily Active Workspace Retention"
---`,
    uxConversionFlow: {
      primaryGoal:
        'Deliver immediate operational clarity and sub-200ms interactive data manipulation without nested card clutter or decorative telemetry noise.',
      aboveTheFoldArchitecture:
        '260px Left Navigation Rail (Workspace Switcher, 5 Primary Views, Settings) + Contextual Breadcrumb Top Bar (`Workspace / Pipelines / Production`) with 1 Primary Action Button (`+ New Pipeline`) + 4-Column KPI Summary Strip above the primary Interactive Data Grid or Canvas.',
      sectionSequence: [
        {
          sectionName: 'Contextual Header & KPI Summary Strip',
          purpose: 'Surface top-level operational health with zero visual bloat.',
          requiredElements:
            '4 horizontal metric cells separated by 1px hairline dividers displaying Label, Tabular Value (`font-mono tabular-nums`), and explicit period comparison (`+14.2% vs last 30d`).',
        },
        {
          sectionName: 'Interactive Filter, Search & Segmented View Toolbar',
          purpose: 'Allow instant client-side slicing of complex datasets.',
          requiredElements:
            'Live search input (`Cmd+K` focus), segmented status tabs (`All · Active · Warning · Archived`), date range selector, and CSV/JSON export button.',
        },
        {
          sectionName: 'High-Density Interactive Data Grid / Workbench',
          purpose: 'Serve as the core operational surface for viewing, sorting, and mutating records.',
          requiredElements:
            'Compact 40px row heights, left-aligned text columns, right-aligned tabular numeric columns, sortable column headers, row-click inspector drawer, and inline status actions.',
        },
        {
          sectionName: 'Slide-Over Detail Inspector & Creation Modal',
          purpose: 'Enable record creation, editing, and audit log inspection without losing table scroll context.',
          requiredElements:
            'Validated form inputs, real-time state updates, destructive action confirmation dialog, and instant toast feedback.',
        },
      ],
      conversionPsychology: [
        'Mechanism-to-Outcome Chain: Every control visibly mutates the dataset or chart state in real time.',
        'Empty-State Actionability: When a filter returns 0 rows, render a clear explanation with a 1-click "Reset Filters" or "Create First Record" CTA.',
        'Keyboard-First Ergonomics: Visible shortcut hints and instant focus rings for power users.',
      ],
    },
    designSystem: {
      aestheticDirection:
        'Precision Technical Utility — flat single-elevation surfaces, crisp 1px structural borders, high-contrast scannable typography, and semantic status signaling.',
      colorPalette: {
        dominantCanvas60: '#0B0F19 (Deep Slate Console) or #F8FAFC (Crisp Light Slate)',
        structuralSurface30: '#111827 (Dark Panel) / #FFFFFF (Light Panel) with #1E293B / #E2E8F0 1px borders',
        accentBudget10: '#2563EB (Electric Cobalt Primary CTA & Active Selection)',
        semanticTokens: 'Nominal #16A34A · Warning #D97706 · Critical/Error #DC2626 (always paired with text label)',
      },
      typography: {
        displayFont: 'Plus Jakarta Sans or Manrope (600 SemiBold, tight tracking)',
        bodyFont: 'Public Sans or DM Sans (13px–14px for dense table/control legibility)',
        monoFont: 'JetBrains Mono or IBM Plex Mono (`tabular-nums` mandatory on all metrics, IDs, and timestamps)',
        scaleAndMeasure: 'Page Title 22px · Section Header 15px · Table Cell 13px · Micro Metadata 12px',
      },
      spatialMathAndGrid:
        'Full-viewport layout (`h-screen overflow-hidden flex`); Sidebar `w-64 shrink-0`; Main content `flex-1 overflow-y-auto p-6`; Minimum 16px internal padding on containers; Zero nested card-in-card shadows.',
    },
    engineeringSpec: {
      componentHierarchy: [
        'WorkspaceShell (SidebarNav + TopBreadcrumbBar + MainViewport)',
        'KpiMetricStrip (4-column hairline grid with tabular numerals)',
        'DatasetToolbar (live search input, segmented filter buttons, sort selector, export handler)',
        'HighDensityDataGrid (sortable headers, row selection, inline action menu, empty state)',
        'RecordInspectorDrawer (detail tabs, edit form, delete confirmation modal)',
      ],
      stateAndDataEntities: [
        'WorkspaceRecord { id, name, owner, status: "active" | "warning" | "archived", metricValue, updatedAt }',
        'FilterState { searchQuery, statusFilter, sortField, sortDirection: "asc" | "desc", dateRange }',
      ],
      apiEndpointsAndIntegrations: [
        'GET /api/records (supports query filtering, sorting, and pagination)',
        'POST /api/records (validates payload and persists new workspace entity)',
        'PATCH /api/records/:id & DELETE /api/records/:id (updates or deletes entity)',
      ],
      seoAndJsonLdSchema:
        'Schema.org `SoftwareApplication` JSON-LD with `applicationCategory: "BusinessApplication"`, `operatingSystem: "Web"`, and structured feature list.',
    },
    antiPatterns: [
      'Never invent hallucinated cockpit scoreboards like "92/100 INNOVATION SCORE" or fake latency tickers in the footer.',
      'Never nest bordered rounded cards inside larger bordered cards.',
      'Never prefix every table row with decorative pulsing green dots.',
      'Never leave filter tabs, search inputs, or "Export CSV" buttons unwired.',
      'Never use proportional fonts for numeric columns, financial figures, or timestamps.',
    ],
  },
  {
    id: 'skill-03-landing-marketing-funnel',
    slug: 'high-converting-landing-page-and-agency',
    indexNumber: '03',
    name: 'High-Converting Product Launch & B2B Agency Landing Page',
    category: 'Landing Pages & Conversion Funnels',
    subArchetypes: [
      'Venture-Backed Startup Product Launch',
      'B2B Design, Dev & Growth Agency',
      'Waitlist & Early-Access Lead Capture',
      'Commercial Industrial & Mobility Showcase',
      'SaaS Feature Tour & Interactive ROI Funnel',
    ],
    summary:
      'Guides AI agents in building narrative-driven marketing websites that pair bold typographic authority with interactive ROI/pricing calculators, claim-to-proof adjacency, and high-velocity lead capture.',
    yamlFrontmatter: `---
name: "high-converting-landing-page-and-agency"
description: >
  Architectural blueprint for high-converting product launch pages, B2B agency websites,
  and lead-generation funnels. Enforces strict claim-to-proof adjacency, interactive ROI
  or scope calculators, transparent pricing matrices, and balanced split-column hero layouts.
triggers:
  - "landing page, marketing site, agency website, product launch, lead generation, waitlist"
target_conversion_metric: "Visitor-to-Lead / Demo Booking Conversion Rate (>= 6.0%)"
---`,
    uxConversionFlow: {
      primaryGoal:
        'Convert cold and warm traffic into booked demos, qualified client inquiries, or waitlist signups through undeniable proof and interactive value demonstration.',
      aboveTheFoldArchitecture:
        'Strict 3-Zone Top Bar + 12-Column Hero Split (`items-stretch`): Left 7 columns contain category kicker, balanced display headline (`text-wrap: balance`), concrete value subheadline, and primary + secondary CTAs; Right 5 columns feature an interactive product preview or architectural visual, followed by a full-width 4-column quantitative proof strip.',
      sectionSequence: [
        {
          sectionName: 'Hero Split & Quantitative Proof Bar',
          purpose: 'Communicate what the product/agency does, who it is for, and measurable outcomes in one glance.',
          requiredElements:
            'Balanced headline, primary CTA ("Book Strategy Call" / "Start Free Trial"), and 4 adjacent proof metrics with explicit units and timeframes (e.g., "+142% Pipeline Velocity in 90 Days").',
        },
        {
          sectionName: 'Mechanism-to-Outcome Interactive Feature Walkthrough',
          purpose: 'Demonstrate how the product or service actually works rather than listing vague buzzwords.',
          requiredElements:
            '3-step interactive tab or Editorial Numbered sequence (`01. Audit & Ingestion`, `02. Automated Execution`, `03. Verified Output`) that updates a live interactive preview panel.',
        },
        {
          sectionName: 'Interactive ROI / Project Scope Calculator',
          purpose: 'Engage prospects actively and anchor the financial return of converting.',
          requiredElements:
            '2–3 interactive sliders or toggles (e.g., team size, monthly volume, service tier) computing real-time estimated savings or project timeline in tabular numerals.',
        },
        {
          sectionName: 'Attributable Case Studies & Client Proof',
          purpose: 'Substantiate claims with named decision-makers and concrete before/after metrics.',
          requiredElements:
            '2–3 case study cards with client organization, full name, role, challenge, intervention, and verified quantitative outcome.',
        },
        {
          sectionName: 'Transparent Tiered Pricing & Lead Capture Finale',
          purpose: 'Remove pricing ambiguity and capture high-intent leads immediately.',
          requiredElements:
            'Audience-named pricing tiers (`For Seed Teams`, `For Growth Orgs`, `Enterprise Custom`) with monthly/annual toggle in the section header (never in the top bar) + embedded booking/lead form.',
        },
      ],
      conversionPsychology: [
        'Claim-to-Proof Adjacency: Every bold performance claim is within 1 section of a verifiable metric or named case study.',
        'Interactive Value Anchoring: Users who manipulate an ROI or scope calculator convert at 2.4x higher rates than passive scrollers.',
        'Frictionless Lead Capture: Inline multi-step or 3-field qualification form with instant confirmation state.',
      ],
    },
    designSystem: {
      aestheticDirection:
        'Editorial Authority & Neo-Brutalist Swiss Precision — high-contrast structural grids, expressive display typography, and zero generic gradient fluff.',
      colorPalette: {
        dominantCanvas60: '#FFFFFF (Pure Swiss Paper) or #090D16 (Deep Midnight Ink)',
        structuralSurface30: '#F4F4F6 (Architectural Gray) with #E4E4E7 hairline dividers',
        accentBudget10: '#FF3E00 (International Signal Orange) or #2563EB (Cobalt Blueprint)',
        semanticTokens: 'Verified Outcome #15803D · Highlight Surface #FEF3C7',
      },
      typography: {
        displayFont: 'Bricolage Grotesque or Syne or Plus Jakarta Sans (700 Bold, tight tracking)',
        bodyFont: 'Public Sans or Manrope (400 Regular, 16px, line-height 1.65)',
        monoFont: 'Space Mono or JetBrains Mono (for index numbers `01`–`04` and ROI metrics)',
        scaleAndMeasure: 'Hero Headline clamp(2.5rem, 4.5vw, 4.25rem) · Section Heading 32px · Body 16px (68ch max)',
      },
      spatialMathAndGrid:
        '1280px–1440px container; generous 80px–112px vertical section rhythm; exposed 1px grid hairlines for architectural structure.',
    },
    engineeringSpec: {
      componentHierarchy: [
        'MarketingTopBar (3-zone contract: Wordmark, 4 Anchor Links, 1 Primary CTA)',
        'HeroSplitWithKPIStrip (7/5 grid split + 4-column quantitative proof bar)',
        'InteractiveMechanismShowcase (state-driven feature tabs + live UI preview)',
        'RoiAndScopeCalculator (range sliders + tabular output summary)',
        'PricingMatrixAndLeadModal (billing cadence switch + validated lead submission form)',
      ],
      stateAndDataEntities: [
        'CalculatorState { teamSize, monthlyVolume, selectedTier, billingCadence: "monthly" | "annual" }',
        'LeadSubmission { fullName, workEmail, companyName, projectScope, estimatedBudget, submittedAt }',
      ],
      apiEndpointsAndIntegrations: [
        'POST /api/leads (validates and stores qualified inbound lead or consultation request)',
        'POST /api/roi-estimate (optional server-side custom quote generator)',
      ],
      seoAndJsonLdSchema:
        'Schema.org `Organization`, `WebPage`, and `FAQPage` JSON-LD with OpenGraph social card metadata.',
    },
    antiPatterns: [
      'Never prefix section headings with code comments like `// 01_CAPABILITIES` or `>_ SERVICES`.',
      'Never place ghost low-opacity watermark words behind headings.',
      'Never use thick left borders (`border-l-4`) on callouts or testimonials.',
      'Never allow hero headlines in split grids to overflow or clip behind media containers.',
    ],
  },
  {
    id: 'skill-04-fintech-wealth-web3',
    slug: 'fintech-banking-and-wealth-platform',
    indexNumber: '04',
    name: 'FinTech, Neobank, Wealth Management & Institutional DeFi',
    category: 'FinTech, Banking & Web3',
    subArchetypes: [
      'Corporate Treasury & Spend Management',
      'Personal Wealth, Brokerage & Robo-Advisor',
      'Payment Gateway & Cross-Border FX Platform',
      'Institutional Crypto, RWA & DeFi Liquidity Protocol',
      'Accounting, Tax & Automated Bookkeeping',
    ],
    summary:
      'Directs AI agents to build high-trust financial applications with real-time ledger tables, multi-currency FX/yield calculators, portfolio allocation visualizations, and institutional compliance rigor.',
    yamlFrontmatter: `---
name: "fintech-banking-and-wealth-platform"
description: >
  Specification for building FinTech platforms, neobanks, corporate spend consoles, wealth
  management portals, and institutional DeFi protocols. Enforces decimal-aligned tabular
  accounting numerals, interactive yield/FX simulators, audit-grade ledger tables, and
  explicit regulatory trust disclosures.
triggers:
  - "fintech, banking, wealth management, portfolio, payments, treasury, DeFi, ledger, FX"
target_conversion_metric: "Account Onboarding Completion & Assets Under Management (AUM) Deposit Intent"
---`,
    uxConversionFlow: {
      primaryGoal:
        'Establish institutional security and mathematical transparency through interactive yield/FX modeling and audit-grade financial ledgers.',
      aboveTheFoldArchitecture:
        '3-Zone Top Bar + Split Hero with Live Interactive Treasury/Yield Simulator on the right and institutional value proposition + regulatory compliance disclosures on the left.',
      sectionSequence: [
        {
          sectionName: 'Institutional Hero & Live Yield / FX Calculator',
          purpose: 'Prove financial advantage immediately with user-adjustable capital inputs.',
          requiredElements:
            'Capital input field (`$100,000`–`$10,000,000`), currency/instrument selector, real-time APY or FX spread comparison against legacy banks, and tabular net return delta.',
        },
        {
          sectionName: 'Multi-Account Portfolio & Allocation Breakdown',
          purpose: 'Demonstrate multi-asset visibility across treasury, operating cash, and T-Bills/equities.',
          requiredElements:
            'Allocation bar or clean distribution chart paired with right-aligned tabular balances, APY rates, and liquidity settlement timeframes (`T+0 Instant`, `T+1 Wire`).',
        },
        {
          sectionName: 'Interactive Transaction Ledger & Virtual Card Controls',
          purpose: 'Showcase granular spend governance, categorization, and instant reconciliation.',
          requiredElements:
            'Filterable transaction ledger with counterparty, category, timestamp, and signed tabular currency (`-$1,420.00`, `+$25,000.00`) plus spend-limit policy drawer.',
        },
        {
          sectionName: 'Security Architecture, Custody & Regulatory Compliance',
          purpose: 'Address risk officers and CFO security requirements directly.',
          requiredElements:
            'SOC 2 Type II, FDIC pass-through insurance / custodian structure, encryption specs, and downloadable audit summary.',
        },
      ],
      conversionPsychology: [
        'Comparative Cost Transparency: Show exact basis-point (bps) fees and dollar savings side-by-side against traditional wire/brokerage benchmarks.',
        'Precision Decimal Alignment: Every currency figure aligns to the cent (`$1,248,500.00`) using `tabular-nums`.',
        'Risk-First Reassurance: Explicit custodian and regulatory footnotes placed directly beneath interactive calculators.',
      ],
    },
    designSystem: {
      aestheticDirection:
        'Institutional Swiss Banking & Bloomberg-Grade Clarity — deep forest or midnight slate paired with crisp parchment/white surfaces and emerald/gold financial accents.',
      colorPalette: {
        dominantCanvas60: '#070B12 (Institutional Midnight) or #F7F9FC (Clean Ledger White)',
        structuralSurface30: '#0F172A / #FFFFFF with #1E293B / #E2E8F0 1px borders',
        accentBudget10: '#10B981 (Sovereign Emerald) or #0284C7 (Treasury Blue)',
        semanticTokens: 'Credit/Inflow #16A34A · Debit/Outflow #0F172A (or #E2E8F0) · Flagged Anomaly #DC2626',
      },
      typography: {
        displayFont: 'Plus Jakarta Sans or Urbanist (600 SemiBold)',
        bodyFont: 'Public Sans (400/500)',
        monoFont: 'IBM Plex Mono or JetBrains Mono (mandatory for all balances, basis points, tickers, and dates)',
        scaleAndMeasure: 'Balance Display clamp(2rem, 3.5vw, 3.25rem) · Table Row 13px · Compliance Footnote 12px',
      },
      spatialMathAndGrid:
        '1440px workspace or marketing grid; 24px grid gaps; strict right-alignment on all numeric table headers and cells.',
    },
    engineeringSpec: {
      componentHierarchy: [
        'TreasurySimulatorWidget (principal input, term selector, benchmark delta table)',
        'PortfolioAllocationPanel (asset class breakdown + liquidity tier selector)',
        'AuditTransactionLedger (search, inflow/outflow filter, receipt drawer)',
        'SpendLimitPolicyModal (card creation, monthly cap slider, merchant category rules)',
      ],
      stateAndDataEntities: [
        'AccountBucket { id, name, type: "checking" | "treasury" | "vault", balanceCents, apyBps, settlementWindow }',
        'LedgerEntry { id, timestamp, counterparty, category, amountCents, direction: "credit" | "debit", status }',
      ],
      apiEndpointsAndIntegrations: [
        'GET /api/portfolio/summary (returns balances, weighted APY, and ledger transactions)',
        'POST /api/transfers/simulate (calculates FX spread, settlement time, and net payout)',
      ],
      seoAndJsonLdSchema:
        'Schema.org `FinancialProduct` and `FinancialService` JSON-LD with `feesAndCommissionsSpecification` and APR/APY metadata.',
    },
    antiPatterns: [
      'Never use neon cyberpunk purple/magenta glow on financial or Web3 interfaces.',
      'Never display currency numbers without two decimal places (`.00`) or without `tabular-nums`.',
      'Never omit regulatory/simulation disclaimers beneath yield calculators.',
    ],
  },
  {
    id: 'skill-05-healthcare-telemedicine',
    slug: 'healthcare-clinic-and-telemedicine-portal',
    indexNumber: '05',
    name: 'Healthcare, Private Clinic, Dental & Telemedicine Portal',
    category: 'Healthcare, Clinics & Wellness',
    subArchetypes: [
      'Modern Primary Care & Concierge Medicine',
      'Cosmetic Dentistry, Orthodontics & MedSpa',
      'Mental Health, Therapy & Telehealth Platform',
      'Diagnostic Lab, Longevity & Biomarker Clinic',
      'Physical Therapy & Sports Rehabilitation Center',
    ],
    summary:
      'Guides AI agents to build calming, HIPAA-conscious patient portals and clinic websites featuring interactive symptom/treatment finders, transparent insurance/cash pricing, practitioner credentials, and multi-step appointment scheduling.',
    yamlFrontmatter: `---
name: "healthcare-clinic-and-telemedicine-portal"
description: >
  Blueprint for building healthcare clinics, telemedicine platforms, dental practices,
  longevity centers, and patient portals. Enforces WCAG AA+ contrast, multi-step appointment
  slot booking, practitioner credential verification, and transparent treatment pricing.
triggers:
  - "healthcare, clinic, doctor, dentist, telemedicine, therapy, longevity, patient portal"
target_conversion_metric: "Completed Appointment Booking & Patient Intake Conversion"
---`,
    uxConversionFlow: {
      primaryGoal:
        'Reduce patient anxiety and friction by making specialist availability, insurance coverage, and appointment booking transparent and effortless.',
      aboveTheFoldArchitecture:
        '3-Zone Top Bar (Clinic Wordmark — Treatments · Specialists · Pricing · Patient Portal — "Book Visit" CTA) + Calm Split Hero with immediate Appointment Slot Finder (Specialty, Visit Type: In-Person vs. Video, Date) on the right.',
      sectionSequence: [
        {
          sectionName: 'Reassuring Hero & Instant Availability Widget',
          purpose: 'Let patients see real next-available appointment times within 5 seconds of landing.',
          requiredElements:
            'Empathetic, authoritative headline, board-certification trust strip, and interactive slot selector showing today/tomorrow availability.',
        },
        {
          sectionName: 'Treatment & Condition Explorer',
          purpose: 'Help patients self-identify the right care pathway without confusing medical jargon.',
          requiredElements:
            'Segmented care categories (`Preventive & Longevity`, `Acute Care`, `Specialist Consult`, `Diagnostics`) with duration, preparation notes, and transparent cost.',
        },
        {
          sectionName: 'Board-Certified Practitioner Directory',
          purpose: 'Build human trust through verifiable credentials and clinical specialties.',
          requiredElements:
            'Practitioner cards with MD/DO/DDS credentials, medical school/residency training, languages spoken, next available slot, and 1-click "Book with Dr. [Name]" button.',
        },
        {
          sectionName: 'Transparent Insurance & Membership Pricing Calculator',
          purpose: 'Eliminate surprise-billing fear before booking.',
          requiredElements:
            'Insurance carrier checker + self-pay / membership tier breakdown with HSA/FSA eligibility indicator.',
        },
      ],
      conversionPsychology: [
        'Next-Available Time Visibility: Displaying concrete time slots ("Today at 2:30 PM EDT") increases booking completion by over 40%.',
        'No-Surprise Pricing: Clear self-pay and insurance co-pay estimates remove the #1 barrier to private clinic bookings.',
        'Credential Prominence: Board certifications and hospital affiliations placed directly adjacent to practitioner portraits.',
      ],
    },
    designSystem: {
      aestheticDirection:
        'Clinical Serenity & Warm Humanist Trust — soft daylight surfaces, deep eucalyptus or navy authority, generous line-height, and WCAG AAA-grade legibility.',
      colorPalette: {
        dominantCanvas60: '#F9FBF9 (Soft Clinical Daylight) or #0D1514 (Deep Calm Pine)',
        structuralSurface30: '#FFFFFF with #DCE5E2 1px borders',
        accentBudget10: '#0F766E (Clinical Teal) or #1D4ED8 (Medical Trust Blue)',
        semanticTokens: 'Available Slot #15803D · Waitlist #B45309 · Urgent Triage #DC2626',
      },
      typography: {
        displayFont: 'Fraunces or Outfit (600 SemiBold, warm approachable curves)',
        bodyFont: 'Plus Jakarta Sans or Public Sans (16px minimum body size for all age groups)',
        monoFont: 'JetBrains Mono (for appointment times, NPI numbers, and biomarker ranges)',
        scaleAndMeasure: 'Hero Headline clamp(2.25rem, 3.8vw, 3.5rem) · Body 16px (1.65 line-height)',
      },
      spatialMathAndGrid:
        '1360px container; minimum 44px touch targets on all booking slots and date pickers; generous 24px card padding.',
    },
    engineeringSpec: {
      componentHierarchy: [
        'AppointmentSlotFinder (visit mode toggle, specialty filter, interactive time-slot grid)',
        'TreatmentPathwayTabs (condition details, biomarker panels, transparent fee schedule)',
        'PractitionerDirectoryGrid (filter by specialty/language + bio modal)',
        'PatientBookingModal (3-step intake: Slot Selection -> Patient Details & Insurance -> Confirmation)',
      ],
      stateAndDataEntities: [
        'Practitioner { id, name, credentials, specialty, hospitalAffiliation, availableSlots[], rating }',
        'AppointmentBooking { practitionerId, slotIso, visitType: "in-person" | "telehealth", patientName, insuranceCarrier }',
      ],
      apiEndpointsAndIntegrations: [
        'GET /api/clinic/slots (returns available time slots filtered by practitioner and visit type)',
        'POST /api/clinic/appointments (books appointment and returns confirmation code)',
      ],
      seoAndJsonLdSchema:
        'Schema.org `MedicalClinic`, `Physician`, and `MedicalBusiness` JSON-LD with `medicalSpecialty`, `availableService`, and `openingHoursSpecification`.',
    },
    antiPatterns: [
      'Never use cold, sterile hospital-error red or harsh neon colors as primary brand accents.',
      'Never hide appointment booking behind a generic "Contact Us" email form.',
      'Never use body font sizes smaller than 15px on patient-facing interfaces.',
    ],
  },
  {
    id: 'skill-06-real-estate-proptech',
    slug: 'real-estate-proptech-and-architecture',
    indexNumber: '06',
    name: 'Real Estate, Luxury Property Brokerage & PropTech Platform',
    category: 'Real Estate, PropTech & Architecture',
    subArchetypes: [
      'Luxury Residential Brokerage & Architectural Developments',
      'Commercial Real Estate (CRE) & Leasing Portal',
      'Property Management & Tenant Operations SaaS',
      'Short-Term Rental & Vacation Villa Collection',
      'Real Estate Investment Trust (REIT) & Fractional Ownership',
    ],
    summary:
      'Instructs AI agents to build spatial, photography-driven property platforms featuring multi-criteria listing filters, interactive mortgage/cap-rate calculators, floorplan switchers, and private viewing schedulers.',
    yamlFrontmatter: `---
name: "real-estate-proptech-and-architecture"
description: >
  Complete specification for building luxury real estate brokerages, PropTech listing
  platforms, architectural development showcases, and property investment portals.
  Enforces 16:9 and 4:3 architectural photography grids, tabular square-footage/price
  metrics, interactive mortgage & cap-rate calculators, and private tour scheduling.
triggers:
  - "real estate, property listings, brokerage, architecture firm, apartments, villas, PropTech"
target_conversion_metric: "Private Viewing Request & Property Inquiry Rate"
---`,
    uxConversionFlow: {
      primaryGoal:
        'Immerse buyers and tenants in architectural space while providing instant financial clarity (monthly payment, price/sq ft, cap rate) and 1-click private tour scheduling.',
      aboveTheFoldArchitecture:
        '3-Zone Top Bar + Full-Bleed Architectural Hero with Measured Contrast Scrim (`bg-gradient-to-t from-black/80 via-black/35 to-transparent`) and anchored Multi-Criteria Search Bar (Location, Property Type, Price Range, Beds/SqFt).',
      sectionSequence: [
        {
          sectionName: 'Architectural Hero & Multi-Criteria Property Search',
          purpose: 'Combine aspirational architectural imagery with immediate inventory filtering.',
          requiredElements:
            '16:9 architectural residence hero, live filter bar (Neighborhood, Price Cap, Bedrooms, Status), and featured listing callout.',
        },
        {
          sectionName: 'Curated Property Listing Grid & Split Map/Spec View',
          purpose: 'Allow effortless comparison of properties by spatial and financial metrics.',
          requiredElements:
            'Property cards leading with high-res photography, title, neighborhood, and unboxed tabular metadata (`4 BD · 4.5 BA · 3,840 SQ FT · $1,120/SQ FT`).',
        },
        {
          sectionName: 'Interactive Floorplan & Residence Specification Explorer',
          purpose: 'Give buyers spatial comprehension of room dimensions, exposure, and finishes.',
          requiredElements:
            'Interactive residence/floor selector (`Penthouse A`, `Residence 4B`, `Townhouse`) displaying dimensions, exposure direction,HOA/tax breakdown, and downloadable floorplan sheet.',
        },
        {
          sectionName: 'Live Mortgage, Carrying Cost & Cap-Rate Calculator',
          purpose: 'Enable instant financial qualification and investment yield modeling.',
          requiredElements:
            'Interactive down-payment %, interest rate, HOA, and property tax sliders calculating exact monthly carrying cost and rental cap rate.',
        },
      ],
      conversionPsychology: [
        'Price-Per-Square-Foot Transparency: Surfacing `$ / SQ FT` and total monthly carrying cost builds immediate credibility with sophisticated buyers.',
        'Dual Viewing Options: Offering both "In-Person Private Showing" and "Live Video Walkthrough" doubles lead capture from out-of-market buyers.',
      ],
    },
    designSystem: {
      aestheticDirection:
        'Architectural Monograph & Gallery Warmth — warm limestone neutrals, bronze/charcoal structural accents, editorial serif headlines, and unobstructed architectural photography.',
      colorPalette: {
        dominantCanvas60: '#F7F5F0 (Warm Limestone) or #111110 (Architectural Charcoal)',
        structuralSurface30: '#EFECE6 / #1C1B19 with #DFDBD2 1px borders',
        accentBudget10: '#854D0E (Aged Architectural Bronze) or #1E293B (Slate Steel)',
        semanticTokens: 'Active Listing #15803D · In Contract #D97706 · Sold #64748B',
      },
      typography: {
        displayFont: 'Playfair Display or Cormorant Garamond (Editorial Luxury) / Archivo (Modernist Architecture)',
        bodyFont: 'DM Sans or Plus Jakarta Sans',
        monoFont: 'JetBrains Mono (for SQ FT, lot sizes, prices, and cap-rate percentages)',
        scaleAndMeasure: 'Hero Headline clamp(2.5rem, 4.2vw, 4rem) · Property Title 20px · Specs 13px tabular',
      },
      spatialMathAndGrid:
        '1440px container; 3-column listing grid (`gap-8`); 4:3 aspect ratio listing thumbnails with subtle `scale-[1.02]` compositor hover transition.',
    },
    engineeringSpec: {
      componentHierarchy: [
        'PropertySearchFilterBar (neighborhood, price slider, bedroom selector, sort control)',
        'PropertyListingGrid (ListingCard[] with unboxed `·` metadata and favorite toggle)',
        'ResidenceFloorplanInspector (unit tabs, room dimension table, exposure specs)',
        'MortgageAndCapRateCalculator (principal, down payment %, rate, HOA, monthly breakdown)',
        'PrivateViewingModal (in-person vs. video tour toggle, date/time picker, agent assignment)',
      ],
      stateAndDataEntities: [
        'PropertyListing { id, title, neighborhood, price, beds, baths, sqft, pricePerSqft, status, images[], floorplanSpecs }',
        'TourRequest { listingId, tourType: "in-person" | "video", preferredDate, clientName, clientEmail, clientPhone }',
      ],
      apiEndpointsAndIntegrations: [
        'GET /api/properties (filters inventory by neighborhood, price range, beds, and status)',
        'POST /api/properties/tour-request (schedules private viewing with listing advisor)',
      ],
      seoAndJsonLdSchema:
        'Schema.org `RealEstateListing`, `SingleFamilyResidence`, or `ApartmentComplex` JSON-LD with `address`, `floorSize`, and `numberOfRooms`.',
    },
    antiPatterns: [
      'Never stack colorful pill badges ("NEW!", "HOT!", "LUXURY", "FEATURED") on top of property photography.',
      'Never place white text over bright interior photography without a measured contrast scrim.',
      'Never omit square footage or neighborhood context on listing cards.',
    ],
  },
  {
    id: 'skill-07-hospitality-dining-travel',
    slug: 'hospitality-fine-dining-and-boutique-hotel',
    indexNumber: '07',
    name: 'Hospitality, Fine Dining Restaurant, Culinary & Boutique Hotel',
    category: 'Hospitality, Dining & Travel',
    subArchetypes: [
      'Fine Dining Restaurant, Omakase & Tasting Menu',
      'Boutique Hotel, Eco-Resort & Luxury Ryokan',
      'Specialty Cafe, Roastery & Artisanal Bakery',
      'Private Event Venue, Winery & Sommelier Club',
      'Bespoke Travel Concierge & Expedition Operator',
    ],
    summary:
      'Trains AI agents to craft atmospheric hospitality experiences featuring interactive tasting/seasonal menus with dietary filters, real-time table/room reservation engines, and sensory editorial storytelling.',
    yamlFrontmatter: `---
name: "hospitality-fine-dining-and-boutique-hotel"
description: >
  Design and engineering blueprint for restaurants, cafés, bars, wineries, boutique hotels,
  and travel operators. Enforces HTML text menus (never PDF-only links), dietary restriction
  filtering, real-time table or suite reservation flows, and location/hours prominence.
triggers:
  - "restaurant, hotel, resort, cafe, bakery, winery, dining, booking, reservation, travel"
target_conversion_metric: "Completed Table Reservation / Room Booking & Direct Private Dining Inquiry"
---`,
    uxConversionFlow: {
      primaryGoal:
        'Capture sensory appetite and convert visitors directly into confirmed table reservations, suite bookings, or private event inquiries.',
      aboveTheFoldArchitecture:
        '3-Zone Top Bar (Venue Wordmark — Menu · Rooms/Spaces · Private Events · Hours & Location — "Reserve Table / Book Stay" CTA) + Atmospheric Split or Full-Bleed Hero with Horizontal Instant Booking Bar (Party Size / Guests, Date, Time / Check-in) anchored directly below.',
      sectionSequence: [
        {
          sectionName: 'Atmospheric Hero & Direct Reservation Strip',
          purpose: 'Establish culinary or hospitality mood while making booking possible in 2 clicks.',
          requiredElements:
            'High-contrast editorial food/interior photography, neighborhood & hours line (`Tuesday–Sunday · 5:30 PM – 11:00 PM · SoHo, NYC`), and live party-size/date/time reservation bar.',
        },
        {
          sectionName: 'Interactive HTML Culinary Menu / Suite Collection',
          purpose: 'Showcase seasonal dishes, tasting progressions, or hotel suites with live dietary/amenity filters.',
          requiredElements:
            'Course tabs (`Tasting Menu · À La Carte · Cellar & Pairings · Dessert`), dietary toggle (`Vegetarian · Gluten-Free · Dairy-Free`), dish descriptions, and right-aligned tabular pricing.',
        },
        {
          sectionName: 'Chef / Founder Provenance & Sourcing Story',
          purpose: 'Connect guests to the craft, local farms, or architectural heritage.',
          requiredElements:
            'Asymmetric 2-column editorial story with farm/purveyor partners and sommelier notes.',
        },
        {
          sectionName: 'Private Dining, Events & Location Concierge',
          purpose: 'Capture high-margin private buyouts and provide frictionless arrival logistics.',
          requiredElements:
            'Room capacity specs (`Seated 28 · Standing 50`), sample event menus, exact address, transit/valet instructions, and 1-click private dining inquiry modal.',
        },
      ],
      conversionPsychology: [
        'Never Hide the Menu in a PDF: Scannable HTML menus with dietary filtering keep mobile diners engaged and double reservation conversion.',
        'Immediate Hours & Address Visibility: Guests check location and opening hours before booking; surface them clearly in the hero and footer.',
      ],
    },
    designSystem: {
      aestheticDirection:
        'Candlelit Editorial & Tactile Terroir — rich espresso, warm linen, olive or burgundy accents, classic serif typography, and Leica-grade documentary food/interior imagery.',
      colorPalette: {
        dominantCanvas60: '#12100E (Candlelit Espresso) or #FAF6F0 (Warm Unbleached Linen)',
        structuralSurface30: '#1C1917 / #F3EDE2 with #292524 / #E5DEC9 1px borders',
        accentBudget10: '#B45309 (Warm Amber Gold) or #881337 (Cellar Burgundy)',
        semanticTokens: 'Table Available #15803D · Limited Seating #D97706 · Fully Booked #78716C',
      },
      typography: {
        displayFont: 'Fraunces or Playfair Display or Bodoni Moda (Expressive Editorial Serif)',
        bodyFont: 'Lora or Plus Jakarta Sans (15px–16px, warm readability)',
        monoFont: 'IBM Plex Mono (for menu prices, vintage years, and seating times)',
        scaleAndMeasure: 'Hero Title clamp(2.75rem, 4.8vw, 4.5rem) · Course Heading 24px · Dish Item 16px',
      },
      spatialMathAndGrid:
        '1280px container; Classic 2-column menu layout with dotted or hairline leaders between dish title and tabular price; generous 32px–48px padding.',
    },
    engineeringSpec: {
      componentHierarchy: [
        'InstantReservationBar (guests selector, date picker, seating area: Main Dining / Chef Counter / Patio, time slots)',
        'InteractiveCulinaryMenu (course tabs, dietary filter buttons, dish list with wine pairing notes)',
        'PrivateDiningShowcase (room capacity comparison + buyout inquiry form)',
        'ReservationConfirmationModal (guest details, dietary notes, instant booking reference code)',
      ],
      stateAndDataEntities: [
        'MenuItem { id, course, name, description, price, winePairing, dietaryTags: ("gf" | "v" | "vg" | "df")[] }',
        'ReservationRequest { partySize, dateIso, timeSlot, seatingZone, guestName, guestPhone, specialOccasion }',
      ],
      apiEndpointsAndIntegrations: [
        'GET /api/reservations/availability (returns open seating slots for date and party size)',
        'POST /api/reservations/book (creates confirmed table or suite reservation)',
      ],
      seoAndJsonLdSchema:
        'Schema.org `Restaurant` or `Hotel` JSON-LD with `servesCuisine`, `hasMenu`, `priceRange`, `address`, and `acceptsReservations: true`.',
    },
    antiPatterns: [
      'Never force users to download a static PDF to read the food or drink menu.',
      'Never use cold corporate SaaS blue on a fine dining or boutique hospitality website.',
      'Never omit physical address, neighborhood, and operating hours.',
    ],
  },
  {
    id: 'skill-08-marketplace-directory',
    slug: 'multi-sided-marketplace-and-directory',
    indexNumber: '08',
    name: 'Multi-Sided Marketplace, Booking Aggregator & Curated Directory',
    category: 'Marketplaces, Directories & Aggregators',
    subArchetypes: [
      'Talent, Freelancer & Expert Network Marketplace',
      'B2B Vendor, Software & AI Tool Directory',
      'Peer-to-Peer Equipment, Space or Vehicle Rental',
      'Local Home Services & Contractor Booking Platform',
      'Curated Job Board & Executive Recruiting Exchange',
    ],
    summary:
      'Equips AI agents to build liquidity-focused two-sided marketplaces featuring faceted multi-attribute search, verified provider profiles, side-by-side comparison trays, and escrow/booking flows.',
    yamlFrontmatter: `---
name: "multi-sided-marketplace-and-directory"
description: >
  Blueprint for building two-sided marketplaces, curated directories, job boards, and
  service aggregators. Enforces fast client-side faceted filtering, side-by-side comparison
  trays, verified vendor trust signals, and dual buyer/supplier onboarding flows.
triggers:
  - "marketplace, directory, job board, aggregator, vendor finder, hire talent, rental platform"
target_conversion_metric: "Search-to-Match Liquidity Rate & Provider Booking / Inquiry Completion"
---`,
    uxConversionFlow: {
      primaryGoal:
        'Minimize search-to-match friction for buyers while giving suppliers/listings clear visibility and instant booking/inquiry conversion.',
      aboveTheFoldArchitecture:
        '3-Zone Top Bar (Marketplace Brand — Browse Categories · Top Rated · How Escrow Works · Pricing — "List as Provider / Post Brief" CTA) + Compact Search & Category Filter Header leading directly into the Faceted Directory Workspace within the first viewport.',
      sectionSequence: [
        {
          sectionName: 'High-Intent Search Header & Category Quick-Switches',
          purpose: 'Get users into active inventory browsing within 2 seconds without bloated marketing heroes.',
          requiredElements:
            'Keyword + category/location search bar, interactive specialty filter buttons, and live count of verified active listings.',
        },
        {
          sectionName: 'Sidebar Faceted Filter + Scannable Listing Grid',
          purpose: 'Enable precision narrowing by rate, availability, verification tier, and skill/feature tags.',
          requiredElements:
            'Left 260px filter rail (Rate slider, Availability toggle, Rating threshold, Category checkboxes) + Right listing cards with tabular pricing (`$125/hr` or `$2,400/mo`), response time, and completed jobs count.',
        },
        {
          sectionName: 'Side-by-Side Comparison Tray (Up to 3 Listings)',
          purpose: 'Help buyers evaluate finalists across pricing, SLA, and reviews simultaneously.',
          requiredElements:
            'Floating bottom comparison bar when 2+ listings are selected, opening a structured comparison matrix modal.',
        },
        {
          sectionName: 'Provider Detail Drawer & Escrow Booking / Brief Submission',
          purpose: 'Convert buyer selection into a scoped engagement or instant booking.',
          requiredElements:
            'Portfolio/case examples, verified review history, deliverable packages, and 1-click "Book Discovery / Fund Milestone" modal.',
        },
      ],
      conversionPsychology: [
        'Inventory Above the Fold: Marketplaces win by showing real, filterable supply immediately rather than generic stock illustrations.',
        'Quantified Supplier Reliability: Display concrete trust metrics (`99.4% On-Time · < 2h Response · 48 Verified Engagements`) as clean inline text.',
      ],
    },
    designSystem: {
      aestheticDirection:
        'High-Liquidity Exchange & Structured Directory — crisp neutral surfaces, clear tabular pricing hierarchy, and fast scannability.',
      colorPalette: {
        dominantCanvas60: '#F8FAFC (Light Directory Canvas) or #0A0E17 (Dark Exchange)',
        structuralSurface30: '#FFFFFF / #111827 with #E2E8F0 / #1F2937 1px borders',
        accentBudget10: '#0F172A (High-Contrast Ink) + #2563EB (Action Blue)',
        semanticTokens: 'Verified Partner #15803D · Available Now #0D9488 · Booked Until Next Month #D97706',
      },
      typography: {
        displayFont: 'Plus Jakarta Sans or Bricolage Grotesque (600/700)',
        bodyFont: 'Public Sans or DM Sans (14px–15px)',
        monoFont: 'JetBrains Mono (for hourly/project rates, SLA metrics, and review counts)',
        scaleAndMeasure: 'Search Header 28px · Listing Title 17px · Metadata 12.5px',
      },
      spatialMathAndGrid:
        '1440px container; 260px left filter sidebar + 1fr main results grid; listing cards maintain uniform height and single-line action buttons.',
    },
    engineeringSpec: {
      componentHierarchy: [
        'MarketplaceSearchHeader (query input, category segmented buttons, result counter)',
        'FacetedFilterSidebar (price range slider, availability checkbox, rating filter, reset button)',
        'ListingDirectoryGrid (MarketplaceCard[] with compare checkbox and instant inquiry trigger)',
        'ComparisonMatrixModal (side-by-side comparison of selected providers/listings)',
        'SubmitListingOrBriefModal (dual-mode modal for buyers posting a brief or vendors joining)',
      ],
      stateAndDataEntities: [
        'MarketplaceListing { id, name, headline, category, rateNumber, rateUnit, rating, completedCount, responseTime, availability, skills[] }',
        'MarketplaceFilters { query, category, maxRate, onlyAvailableNow, minRating, comparedIds[] }',
      ],
      apiEndpointsAndIntegrations: [
        'GET /api/marketplace/listings (multi-facet filtering and sorting)',
        'POST /api/marketplace/inquiries (sends project brief or booking request to provider)',
        'POST /api/marketplace/listings (creates new verified supplier listing)',
      ],
      seoAndJsonLdSchema:
        'Schema.org `ItemList` and `Service` or `JobPosting` JSON-LD for programmatic SEO indexing.',
    },
    antiPatterns: [
      'Never wrap 10+ skill tags per card in brightly colored pill capsules (use clean inline text with `·` separators).',
      'Never push the actual directory listings below 2 full viewports of filler marketing text.',
    ],
  },
  {
    id: 'skill-09-media-editorial-publishing',
    slug: 'media-editorial-magazine-and-newsletter',
    indexNumber: '09',
    name: 'Digital Media, Editorial Publication, Research Journal & Newsletter',
    category: 'Media, Editorial & Publishing',
    subArchetypes: [
      'Independent Journalism & Cultural Magazine',
      'Paid Substack-Style Intelligence Newsletter',
      'Industry Research Institute & Think Tank',
      'Technical Engineering Blog & Documentation Hub',
      'Podcast Network & Multimedia Essay Platform',
    ],
    summary:
      'Instructs AI agents to build typographically masterful publications featuring multi-column broadsheet grids, distraction-free longform reading views, audio article players, and subscriber membership funnels.',
    yamlFrontmatter: `---
name: "media-editorial-magazine-and-newsletter"
description: >
  Architectural specification for digital magazines, paid newsletters, research publications,
  and editorial blogs. Enforces broadsheet asymmetric grids, 65ch longform reading measure,
  unboxed metadata lines, table-of-contents scroll spies, and reader subscription capture.
triggers:
  - "magazine, blog, newsletter, publication, editorial, news site, research journal"
target_conversion_metric: "Newsletter Subscription Rate & Paid Member Conversion"
---`,
    uxConversionFlow: {
      primaryGoal:
        'Maximize reading depth (scroll completion) and convert engaged readers into free or paid newsletter subscribers.',
      aboveTheFoldArchitecture:
        'Masthead Top Bar (Publication Wordmark — Essays · Briefings · Podcast · Archive — "Subscribe" CTA) + Asymmetric 3-Column Editorial Broadsheet Grid: Left column for Latest Dispatches, Center wide column for the Lead Cover Feature, Right column for Editor’s Picks & Briefing Signup.',
      sectionSequence: [
        {
          sectionName: 'Editorial Masthead & Asymmetric Cover Story Grid',
          purpose: 'Establish intellectual authority and editorial rhythm immediately.',
          requiredElements:
            'Issue/Date edition line (`Issue No. 48 · November 2026`), Lead Cover Story with 4:3 documentary visual, headline, deck, and unboxed byline (`By Elena Rostova · Macroeconomics · 9 min read`).',
        },
        {
          sectionName: 'Topic Filter Bar & Curated Essay Feed',
          purpose: 'Let readers explore vertical beats without leaving the front page.',
          requiredElements:
            'Interactive beat selector (`All Dispatches · AI & Compute · Geopolitics · Markets · Design`), article index with tabular issue numbers, and bookmark/save-for-later toggle.',
        },
        {
          sectionName: 'Longform Article Reader Drawer / View',
          purpose: 'Deliver a distraction-free 65ch reading experience with interactive footnotes and audio playback.',
          requiredElements:
            'Typography size/theme adjuster, estimated reading progress bar, inline pull-quotes with hairline top/bottom borders (no `border-l-4`), and key-takeaways summary.',
        },
        {
          sectionName: 'Subscriber Membership & Briefing Capture',
          purpose: 'Convert high-intent readers into recurring subscribers.',
          requiredElements:
            'Inline email capture with issue frequency guarantee + Free vs. Patron/Institutional tier breakdown.',
        },
      ],
      conversionPsychology: [
        'Reading Measure Discipline: Keeping body prose strictly between 60ch and 72ch prevents eye fatigue and increases article completion.',
        'Inline Contextual Subscription: Placing a quiet, high-value briefing signup directly after the lead essay summary converts 3x better than intrusive popups.',
      ],
    },
    designSystem: {
      aestheticDirection:
        'Financial Times / Monocle Broadsheet Precision — warm newsprint or crisp paper canvas, exposed `1px solid` column rules, authoritative serif headlines, and zero badge clutter.',
      colorPalette: {
        dominantCanvas60: '#FBF9F5 (Warm Editorial Paper) or #111113 (Night Reader Ink)',
        structuralSurface30: '#F3EFE6 / #18181B with #DCD6C8 / #27272A 1px hairlines',
        accentBudget10: '#991B1B (Editorial Crimson) or #1E3A8A (Oxford Ink Blue)',
        semanticTokens: 'Member Exclusive #B45309 · Saved to Reading List #15803D',
      },
      typography: {
        displayFont: 'Playfair Display or Fraunces (Editorial Headlines)',
        bodyFont: 'Source Serif 4 or Lora (Longform Article Prose) + Public Sans (UI & Metadata)',
        monoFont: 'JetBrains Mono (for Issue numbers, dates, and data tables)',
        scaleAndMeasure: 'Cover Headline clamp(2.25rem, 3.8vw, 3.5rem) · Article Prose 18px (1.75 line-height, 65ch)',
      },
      spatialMathAndGrid:
        '1380px broadsheet container; 12-column grid divided by vertical 1px hairlines; zero drop shadows on article cards.',
    },
    engineeringSpec: {
      componentHierarchy: [
        'EditorialMasthead (edition metadata + 3-zone navigation)',
        'BroadsheetFrontGrid (3-column asymmetric cover layout: Dispatches, Lead Essay, Briefing Box)',
        'ArticleReaderModalOrView (65ch prose container, font-size toggle, audio TTS/player bar, share citations)',
        'ReadingListDrawer (saved articles state + export citations)',
      ],
      stateAndDataEntities: [
        'Article { id, issueNumber, title, subtitle, author, authorRole, category, publishedDate, readTimeMinutes, contentParagraphs[], isSubscriberOnly }',
        'ReaderState { activeCategory, activeArticleId, savedArticleIds[], fontSize: "normal" | "large" }',
      ],
      apiEndpointsAndIntegrations: [
        'GET /api/articles (returns issue index and full article payloads)',
        'POST /api/newsletter/subscribe (registers reader email and tier preference)',
      ],
      seoAndJsonLdSchema:
        'Schema.org `NewsArticle` and `ScholarlyArticle` JSON-LD with `headline`, `author`, `datePublished`, and `publisher`.',
    },
    antiPatterns: [
      'Never wrap category names or read times in rounded pill chips.',
      'Never use thick left borders (`border-l-4`) on blockquotes; use top/bottom hairlines and italic serif display type.',
      'Never stretch article prose across a full 1200px width without a `max-w-[65ch]` constraint.',
    ],
  },
  {
    id: 'skill-10-edtech-lms-simulations',
    slug: 'edtech-interactive-learning-and-simulations',
    indexNumber: '10',
    name: 'EdTech, Cohort Academy, Interactive STEM Simulation & LMS',
    category: 'EdTech, Courses & Simulations',
    subArchetypes: [
      'Interactive STEM, Physics & Biology Simulation Lab',
      'Cohort-Based Executive & Coding Bootcamp',
      'Language Learning, Flashcard & Mastery App',
      'Academic Rubric, Grading & Curriculum Studio',
      'Certification Prep & Interactive Assessment Platform',
    ],
    summary:
      'Directs AI agents to build hands-on educational platforms and interactive simulations where learners manipulate variables on a live canvas, observe real-time mathematical/scientific outcomes, and track mastery.',
    yamlFrontmatter: `---
name: "edtech-interactive-learning-and-simulations"
description: >
  Specification for building EdTech platforms, interactive STEM simulations, cohort-based
  courses, and learning management systems (LMS). Enforces interactive variable manipulation
  canvases, real-time formula/graph feedback, rubric-driven mastery tracking, and zero
  passive walls of text.
triggers:
  - "education, EdTech, online course, LMS, simulation, bootcamp, quiz, STEM lab, learning"
target_conversion_metric: "Interactive Lab Completion Rate & Course Enrollment Conversion"
---`,
    uxConversionFlow: {
      primaryGoal:
        'Turn passive reading into active discovery through interactive parameter controls, live visual simulations, and structured mastery checkpoints.',
      aboveTheFoldArchitecture:
        '3-Zone Top Bar + Split Interactive Learning Workbench: Left 8 columns house the Live Interactive Simulation / Lesson Canvas; Right 4 columns house Parameter Sliders, Formula Readouts (`tabular-nums`), and Guided Challenge Checkpoints.',
      sectionSequence: [
        {
          sectionName: 'Interactive Simulation / Live Concept Sandbox',
          purpose: 'Let learners grasp the core mental model by manipulating variables directly.',
          requiredElements:
            'SVG/Canvas visualization, 3–4 live parameter sliders with units, preset scenario buttons (`Baseline`, `High Stress`, `Equilibrium`), and real-time formula output.',
        },
        {
          sectionName: 'Structured Curriculum & Module Progression Map',
          purpose: 'Show clear learning milestones, prerequisites, and completion state.',
          requiredElements:
            'Expandable syllabus modules with lesson duration, hands-on lab count, and completion status indicator.',
        },
        {
          sectionName: 'Interactive Knowledge Check & Rubric Evaluator',
          purpose: 'Verify comprehension immediately with constructive feedback.',
          requiredElements:
            'Scenario-based interactive problem with instant explanation of why an answer is correct or what variable shift resolves the edge case.',
        },
      ],
      conversionPsychology: [
        'Learn-by-Doing First: Allowing prospective students to try an interactive lesson module above the fold converts 3x better than static syllabus lists.',
        'Immediate Cause-and-Effect: Slider movements must update the visual model in <16ms (`60fps`).',
      ],
    },
    designSystem: {
      aestheticDirection:
        'Brilliant.org / Interactive Lab Clarity — tactile controls, high-contrast mathematical diagrams, semantic variable color-coding, and approachable academic authority.',
      colorPalette: {
        dominantCanvas60: '#F8FAFC (Lab Notebook Light) or #0B1120 (Dark Instrument Canvas)',
        structuralSurface30: '#FFFFFF / #111827 with #E2E8F0 / #1E293B 1px borders',
        accentBudget10: '#4F46E5 (Indigo Focus) + semantic variable colors (#0891B2 Cyan, #EA580C Amber)',
        semanticTokens: 'Mastered #16A34A · In Progress #2563EB · Needs Review #D97706',
      },
      typography: {
        displayFont: 'Outfit or Plus Jakarta Sans (600/700)',
        bodyFont: 'Public Sans or DM Sans (15px–16px)',
        monoFont: 'JetBrains Mono (for equations, variable readouts, and code sandboxes)',
        scaleAndMeasure: 'Module Title 24px · Control Label 13px · Formula Readout 15px tabular',
      },
      spatialMathAndGrid:
        '1440px workbench; 8/4 split between interactive visualization stage and parameter control rail; minimum 40px touch targets on sliders and steppers.',
    },
    engineeringSpec: {
      componentHierarchy: [
        'InteractiveSimulationStage (SVG/Canvas diagram reactive to parameter state + preset buttons)',
        'ParameterControlRail (range sliders with units, live equation readout, reset button)',
        'CurriculumSyllabusTree (module accordion, lesson switcher, progress tracker)',
        'InteractiveCheckpointQuiz (question state, immediate diagnostic feedback, mastery score)',
      ],
      stateAndDataEntities: [
        'SimulationParams { variableA, variableB, variableC, activePreset, isPlaying }',
        'CurriculumModule { id, index, title, durationMinutes, lessons[], isCompleted }',
      ],
      apiEndpointsAndIntegrations: [
        'GET /api/curriculum (loads modules, simulation presets, and checkpoint problems)',
        'POST /api/progress/checkpoint (records completed lab state and quiz score)',
      ],
      seoAndJsonLdSchema:
        'Schema.org `Course` and `LearningResource` JSON-LD with `educationalLevel`, `teaches`, and `hasCourseInstance`.',
    },
    antiPatterns: [
      'Never render a STEM or educational tool as a static wall of textbook paragraphs without interactive variable controls.',
      'Never label simulation buttons with roleplay jargon ("Initiate Quantum Matrix" instead of "Run Simulation").',
    ],
  },
  {
    id: 'skill-11-creative-portfolio-showreel',
    slug: 'creative-portfolio-and-architectural-monograph',
    indexNumber: '11',
    name: 'Creative Director Portfolio, Photography Gallery & Studio Monograph',
    category: 'Creative Portfolios & Agency Showreels',
    subArchetypes: [
      'Industrial Designer, Creative Director & Product Architect',
      'Fine Art Photography & Cinematography Showreel',
      'Independent Software Engineer & Design Technologist',
      'Architecture Studio & Interior Design Monograph',
      'University Cohort / Student Achievement Showcase',
    ],
    summary:
      'Trains AI agents to build gallery-grade portfolios where the work itself commands 85%+ of the viewport, supported by indexed project catalogs, exhibition lightbox inspection, and commission availability.',
    yamlFrontmatter: `---
name: "creative-portfolio-and-architectural-monograph"
description: >
  Design and engineering constitution for creative portfolios, photography galleries,
  architecture monographs, and design technologist showcases. Enforces work-first viewport
  dominance, clean tabular project indices, deep case-study drawers, and zero skill-bar clichés.
triggers:
  - "portfolio, photography gallery, creative director, designer site, showreel, case studies"
target_conversion_metric: "Commission Inquiry & Case Study Inspection Depth"
---`,
    uxConversionFlow: {
      primaryGoal:
        'Prove taste and execution caliber within 2 seconds by foregrounding curated project artifacts and deep process case studies.',
      aboveTheFoldArchitecture:
        'Minimal 3-Zone Top Bar (Creator/Studio Name — Selected Work · Index · About · Contact — "Commission / Inquire" CTA) + Restrained 2-line Manifesto Headline leading directly into the Selected Works Asymmetric Gallery.',
      sectionSequence: [
        {
          sectionName: 'Concise Identity Statement & Selected Works Gallery',
          purpose: 'Let visual craftsmanship speak immediately without self-congratulatory fluff.',
          requiredElements:
            '2-line positioning statement + asymmetric 2-column or full-bleed project showcase with tabular index numbers (`01`–`08`), client/title, discipline, and year.',
        },
        {
          sectionName: 'View-Mode Switcher (Visual Gallery vs. Archival Table Index)',
          purpose: 'Allow art directors and recruiters to scan 20+ projects rapidly or inspect visual plates deeply.',
          requiredElements:
            'Segmented view toggle (`Gallery Plates · Archival Index`), discipline filter (`All · Brand Systems · Spatial · Interactive`), and hover preview.',
        },
        {
          sectionName: 'Deep Case Study Lightbox / Monograph Drawer',
          purpose: 'Document the problem, architectural constraints, process artifacts, and shipped outcome.',
          requiredElements:
            'Project metadata table (Client, Role, Year, Deliverable, Live Link), high-res artifact plates, technical architecture notes, and Next/Previous project navigation.',
        },
        {
          sectionName: 'Exhibition / Recognition History & Commission Inquiry',
          purpose: 'Close high-value retainers, commissions, or senior roles.',
          requiredElements:
            'Chronological recognition/press index + direct commission scoping form (Timeline, Budget Band, Project Brief).',
        },
      ],
      conversionPsychology: [
        'Show, Never Self-Rate: Replace arbitrary percentage skill bars ("React 95%") with shipped project artifacts and concrete technical roles.',
        'Dual Browsing Modes: Pairing an editorial visual grid with a dense archival index satisfies both visual directors and technical hiring managers.',
      ],
    },
    designSystem: {
      aestheticDirection:
        'Kunsthalle Exhibition Catalogue & Swiss Studio Monograph — austere monochrome canvas, razor-sharp typography, and uncompromised aspect-ratio fidelity.',
      colorPalette: {
        dominantCanvas60: '#0A0A0A (Darkroom Matte Black) or #F6F5F2 (Archival Museum Rag)',
        structuralSurface30: '#141414 / #ECEAE4 with #262626 / #D6D3CD 1px hairlines',
        accentBudget10: '#FAFAFA / #111111 high-contrast ink',
        semanticTokens: 'Available for Q1 Commissions #16A34A',
      },
      typography: {
        displayFont: 'Syne or Bricolage Grotesque or Cormorant Garamond',
        bodyFont: 'Plus Jakarta Sans or Public Sans',
        monoFont: 'Space Mono or JetBrains Mono (for catalog numbers `01`–`12`, years, and dimensions)',
        scaleAndMeasure: 'Manifesto Display clamp(2rem, 3.8vw, 3.5rem) · Project Title 20px · Index Row 14px',
      },
      spatialMathAndGrid:
        '1440px container with 48px outer padding; 32px–64px vertical spacing between gallery plates; preserve native image aspect ratios (16:9, 4:3, 3:4).',
    },
    engineeringSpec: {
      componentHierarchy: [
        'StudioHeader (3-zone contract)',
        'WorkGalleryAndIndexSwitcher (Gallery View vs. Tabular Archive Row View + discipline filter)',
        'CaseStudyMonographModal (full project narrative, metadata strip, artifact gallery, next/prev controls)',
        'CommissionInquiryDrawer (scoped project inquiry handler)',
      ],
      stateAndDataEntities: [
        'PortfolioProject { id, indexNumber, title, client, discipline, year, summary, challenge, solution, outcomeMetrics, aspect: "16:9" | "4:3" | "3:4" }',
      ],
      apiEndpointsAndIntegrations: [
        'GET /api/portfolio/projects (returns curated works and archival index)',
        'POST /api/portfolio/inquire (submits commission or advisory inquiry)',
      ],
      seoAndJsonLdSchema:
        'Schema.org `ProfilePage`, `Person`, or `VisualArtwork` JSON-LD with `creator`, `dateCreated`, and `sameAs` links.',
    },
    antiPatterns: [
      'Never include percentage progress bars for skills (e.g., "TypeScript 92%, Figma 88%").',
      'Never wrap project years or disciplines in colored pill badges.',
      'Never crop vertical 3:4 editorial portraits into cramped 16:9 letterboxes.',
    ],
  },
  {
    id: 'skill-12-legal-consulting-advisory',
    slug: 'legal-consulting-and-executive-advisory',
    indexNumber: '12',
    name: 'Law Firm, M&A Investment Banking, Tax & Executive Advisory',
    category: 'Legal, Consulting & Advisory',
    subArchetypes: [
      'Corporate Law, Litigation & IP Practice',
      'Boutique M&A Advisory & Private Equity Firm',
      'CPA, International Tax & Family Office Advisory',
      'Management Strategy & AI Transformation Consultancy',
      'Cybersecurity Audit & Regulatory Compliance Firm',
    ],
    summary:
      'Guides AI agents in constructing high-authority professional services websites featuring practice-area matrices, representative transaction/verdict tombstones, partner dossiers, and confidential matter intake.',
    yamlFrontmatter: `---
name: "legal-consulting-and-executive-advisory"
description: >
  Architectural blueprint for law firms, M&A advisory boutiques, accounting practices,
  and management consultancies. Enforces authoritative editorial typography, representative
  transaction/case tombstones, partner credential dossiers, and confidential consultation intake.
triggers:
  - "law firm, attorney, legal, consulting, advisory, accounting, CPA, private equity, M&A"
target_conversion_metric: "Confidential Matter Consultation & Retainer Inquiry Conversion"
---`,
    uxConversionFlow: {
      primaryGoal:
        'Project institutional gravitas and domain mastery through verifiable transaction/case outcomes and direct partner access.',
      aboveTheFoldArchitecture:
        '3-Zone Top Bar (Firm Name — Practice Areas · Representative Matters · Partners · Insights — "Confidential Consultation" CTA) + Authoritative Split Hero paired with a 4-Column Representative Outcomes Bar (`$4.8B+ Transaction Volume · 94% Federal Appellate Record`).',
      sectionSequence: [
        {
          sectionName: 'Institutional Positioning & Quantitative Track Record',
          purpose: 'Establish immediate boardroom credibility with general counsels and C-suite buyers.',
          requiredElements:
            'Authoritative headline, jurisdictional/industry focus, primary consultation CTA, and 4-column verifiable track record bar.',
        },
        {
          sectionName: 'Practice Area & Sector Matrix',
          purpose: 'Allow prospective clients to locate their exact legal, financial, or strategic mandate.',
          requiredElements:
            'Editorial numbered index (`01. Cross-Border M&A`, `02. High-Stakes IP Litigation`, `03. AI Governance & Regulatory Defense`) with key deliverables and lead partners.',
        },
        {
          sectionName: 'Representative Matters & Transaction Tombstones',
          purpose: 'Substantiate capability with concrete deal sizes, courts, or strategic turnarounds.',
          requiredElements:
            'Filterable grid of structured tombstones displaying Client/Sector, Matter Type, Dollar Value / Outcome (`tabular-nums`), and Lead Partner.',
        },
        {
          sectionName: 'Partner Dossiers & Confidential Intake Protocol',
          purpose: 'Connect clients directly to senior partners rather than generic call centers.',
          requiredElements:
            'Partner profiles (Bar admissions / Licenses, Prior clerkships or executive roles, Publications) + conflict-check / confidential consultation form.',
        },
      ],
      conversionPsychology: [
        'Tombstone Specificity: Concrete deal figures (`$340M Series D Restructuring`) carry 10x more weight than generic "We fight for you" slogans.',
        'Confidentiality Assurance: Explicit privilege/NDA disclaimers next to the intake form increase executive submission rates.',
      ],
    },
    designSystem: {
      aestheticDirection:
        'Cravath / Lazard Institutional Gravitas — deep Oxford navy, charcoal, warm parchment, classic serif display type, and disciplined hairline grids.',
      colorPalette: {
        dominantCanvas60: '#0A1120 (Oxford Navy Ink) or #F9F8F6 (Chancery Parchment)',
        structuralSurface30: '#111C33 / #FFFFFF with #1E2D4A / #E2DFD7 1px borders',
        accentBudget10: '#B45309 (Sovereign Brass/Gold) or #1E40AF (Royal Counsel Blue)',
        semanticTokens: 'Confidential Channel Active #15803D',
      },
      typography: {
        displayFont: 'Cormorant Garamond or Playfair Display or Cinzel (600 SemiBold)',
        bodyFont: 'Public Sans or Source Serif 4 (15px–16px)',
        monoFont: 'IBM Plex Mono (for matter numbers, dollar tombstones, and bar admission years)',
        scaleAndMeasure: 'Hero Headline clamp(2.4rem, 4vw, 3.75rem) · Practice Heading 22px · Body 16px',
      },
      spatialMathAndGrid:
        '1360px container; structured 3-column tombstone grid with uniform 1px borders; generous 32px internal padding.',
    },
    engineeringSpec: {
      componentHierarchy: [
        'PracticeAreaAccordionOrGrid (interactive practice explorer with partner assignments)',
        'TransactionTombstoneGrid (filterable by sector and mandate type)',
        'PartnerDossierModal (credentials, bar admissions, representative cases, direct contact)',
        'ConfidentialMatterIntakeModal (conflict-check fields, urgency selector, encrypted submission confirmation)',
      ],
      stateAndDataEntities: [
        'PracticeArea { id, indexNumber, title, overview, keyMandates[], leadPartnerIds[] }',
        'RepresentativeMatter { id, valueDisplay, sector, mandateType, summary, year }',
      ],
      apiEndpointsAndIntegrations: [
        'GET /api/firm/matters (returns filterable representative tombstones and partner profiles)',
        'POST /api/firm/conflict-check (submits confidential consultation request)',
      ],
      seoAndJsonLdSchema:
        'Schema.org `LegalService`, `Attorney`, or `ProfessionalService` JSON-LD with `areaServed` and `knowsAbout`.',
    },
    antiPatterns: [
      'Never use cheesy gavel, handshake, or lady-justice stock clichés.',
      'Never use playful rounded-3xl bubble cards or casual emojis.',
    ],
  },
  {
    id: 'skill-13-deeptech-hardware-industrial',
    slug: 'deeptech-hardware-robotics-and-industrial',
    indexNumber: '13',
    name: 'DeepTech, Robotics, Aerospace, Defense & Precision Manufacturing',
    category: 'DeepTech, Hardware & Industrial',
    subArchetypes: [
      'Autonomous Robotics, Drones & Defense Systems',
      'Semiconductors, Photonics & Quantum Hardware',
      'ClimateTech, Grid Storage & Fusion Energy',
      'Precision CNC Machining & ISO-Certified Industrial Manufacturing',
      'Biotech Lab Instrumentation & Medical Devices',
    ],
    summary:
      'Instructs AI agents to build specification-first industrial and DeepTech websites featuring tolerance/datasheet tables, interactive CAD/bill-of-materials configurators, ISO certification proofs, and RFQ engineering pipelines.',
    yamlFrontmatter: `---
name: "deeptech-hardware-robotics-and-industrial"
description: >
  Specification for building DeepTech, robotics, aerospace, energy hardware, and industrial
  manufacturing websites. Enforces datasheet-grade tabular engineering specs, interactive
  system architecture explorers, ISO/AS9100 certification proofs, and Request-for-Quote (RFQ)
  workflows.
triggers:
  - "hardware, robotics, aerospace, manufacturing, industrial, biotech instrument, defense, energy"
target_conversion_metric: "Qualified Engineering RFQ & Datasheet Download Conversion"
---`,
    uxConversionFlow: {
      primaryGoal:
        'Satisfy systems engineers and procurement leads with exact physical tolerances, performance envelopes, and rapid RFQ scoping.',
      aboveTheFoldArchitecture:
        '3-Zone Top Bar (Brand Wordmark — Systems · Specifications · Facility · Certifications — "Request Engineering Quote" CTA) + Split Hero with high-precision isometric hardware visual on the right and tolerance/performance KPI strip below.',
      sectionSequence: [
        {
          sectionName: 'Precision Hardware Hero & Performance Envelope Strip',
          purpose: 'Communicate physical capabilities, operating range, and certification grade immediately.',
          requiredElements:
            'Regional/ISO trust line in Hero kicker (`Munich Facility · ISO 9001 & AS9100D Certified`), headline, primary RFQ CTA, and 4-column tabular performance metrics (`±0.002mm Tolerance · IP68 Sealed · 4,200W Peak Output`).',
        },
        {
          sectionName: 'Interactive Subsystem & BOM Architecture Explorer',
          purpose: 'Let engineers inspect internal subsystems, materials, and electrical/mechanical interfaces.',
          requiredElements:
            'Interactive subsystem selector (`Actuation Core · Sensor Array · Thermal Chassis · Telemetry Bus`) updating a specification table with metric/imperial unit toggle.',
        },
        {
          sectionName: 'Datasheet Comparison Matrix Across Hardware Models',
          purpose: 'Help procurement teams select the right model variant for their payload or throughput.',
          requiredElements:
            'Dense tabular comparison table (`Model Series S-100 vs. S-400 vs. S-900`) with right-aligned numerical specifications and downloadable spec sheet.',
        },
        {
          sectionName: 'Interactive RFQ & Volume Production Configurator',
          purpose: 'Capture structured engineering requirements (material, batch volume, lead time, compliance).',
          requiredElements:
            'Volume tier selector (`Prototype 1–10 · Pilot 50–500 · Full Production 1,000+`), lead-time estimator, and CAD/requirement submission modal.',
        },
      ],
      conversionPsychology: [
        'Engineers Buy Specs, Not Adjectives: Replacing vague words like "ultra-fast" with `0.4ms closed-loop response` builds instant engineering trust.',
        'Unit Toggle Utility: Allowing 1-click switching between Metric (`mm / kg / °C`) and Imperial (`in / lb / °F`) delights international procurement teams.',
      ],
    },
    designSystem: {
      aestheticDirection:
        'Anduril / Teenage Engineering / Braun Industrial Precision — anodized aluminum grays, matte carbon, high-visibility international orange or laser cyan accents, and exposed technical hairlines.',
      colorPalette: {
        dominantCanvas60: '#0C0E12 (Anodized Carbon) or #F3F4F6 (Machined Aluminum Light)',
        structuralSurface30: '#141820 / #FFFFFF with #222834 / #D1D5DB 1px borders',
        accentBudget10: '#EA580C (International Safety Orange) or #0284C7 (Blueprint Cyan)',
        semanticTokens: 'Within Tolerance #16A34A · Thermal Warning #D97706',
      },
      typography: {
        displayFont: 'Space Grotesk or Archivo or Barlow Condensed (600/700)',
        bodyFont: 'Public Sans or IBM Plex Sans (14px–15px)',
        monoFont: 'JetBrains Mono or IBM Plex Mono (mandatory for tolerances, dimensions, part numbers, and units)',
        scaleAndMeasure: 'Hero Headline clamp(2.25rem, 4vw, 3.75rem) · Spec Table 13px tabular',
      },
      spatialMathAndGrid:
        '1440px technical grid with exposed 1px cell borders; strict unit alignment in all specification tables.',
    },
    engineeringSpec: {
      componentHierarchy: [
        'SubsystemArchitectureExplorer (subsystem tabs + Metric/Imperial unit converter)',
        'HardwareDatasheetMatrix (model comparison table + spec sheet export)',
        'RfqVolumeConfigurator (batch quantity input, material/certification checkboxes, lead-time readout)',
      ],
      stateAndDataEntities: [
        'HardwareModel { id, partNumber, name, payloadKg, powerWatts, operatingTempC, protectionRating, leadTimeWeeks }',
        'RfqSubmission { modelId, quantity, unitSystem: "metric" | "imperial", requiredCertifications[], contactEmail }',
      ],
      apiEndpointsAndIntegrations: [
        'GET /api/hardware/models (returns full engineering datasheet matrices)',
        'POST /api/hardware/rfq (calculates estimated lead time and logs engineering quote request)',
      ],
      seoAndJsonLdSchema:
        'Schema.org `Product` and `Corporation` JSON-LD with `mpn`, `material`, and `additionalProperty` quantitative specs.',
    },
    antiPatterns: [
      'Never attach facility badges ("Munich Facility") inside the top navigation brand lockup—keep them in the Hero or Footer.',
      'Never invent fake sci-fi compiler statuses ("QUANTUM CORE: ONLINE // 99.9%") on real industrial hardware pages.',
    ],
  },
  {
    id: 'skill-14-community-events-conferences',
    slug: 'community-conference-and-event-ticketing',
    indexNumber: '14',
    name: 'Global Summit, Developer Conference, Festival & Community Hub',
    category: 'Community, Social & Events',
    subArchetypes: [
      'Tech & AI Developer Conference / Summit',
      'Music Festival, Cultural Biennale & Live Event',
      'Private Executive Membership Club & DAO Network',
      'Hackathon, Competition & Demo Day Hub',
      'Coworking Collective & Innovation Campus',
    ],
    summary:
      'Trains AI agents to build high-energy event and community platforms featuring multi-track interactive agenda builders, speaker lineups, venue logistics, and tiered pass registration.',
    yamlFrontmatter: `---
name: "community-conference-and-event-ticketing"
description: >
  Blueprint for building conferences, summits, festivals, hackathons, and membership
  communities. Enforces multi-track filterable schedule grids, personalized agenda saving,
  speaker dossier modals, and tiered ticket registration flows.
triggers:
  - "conference, summit, event, festival, tickets, schedule, speakers, community, hackathon"
target_conversion_metric: "Ticket / Pass Registration & Custom Agenda Builder Engagement"
---`,
    uxConversionFlow: {
      primaryGoal:
        'Drive ticket registration and attendee excitement through a tangible, filterable multi-track agenda and high-caliber speaker lineup.',
      aboveTheFoldArchitecture:
        '3-Zone Top Bar (Summit Brand — Speakers · Schedule · Venue · Passes — "Get Passes" CTA) + High-Impact Event Hero with exact Date, City/Venue, Attendee Capacity, and Pass Tier Quick-Select.',
      sectionSequence: [
        {
          sectionName: 'Event Identity Hero & Date/Venue Anchor',
          purpose: 'Communicate when, where, who is speaking, and remaining pass availability immediately.',
          requiredElements:
            'Unboxed event metadata (`November 14–16, 2026 · Moscone West, San Francisco · 2,500 Builders`), headline, and primary "Register Pass" CTA.',
        },
        {
          sectionName: 'Interactive Multi-Track Schedule & Personal Agenda Builder',
          purpose: 'Let attendees filter sessions by day, stage, and track, and bookmark their personal schedule.',
          requiredElements:
            'Day tabs (`Day 01 · Day 02 · Day 03`), Stage/Track filters (`Main Stage · Systems Track · Founder Workshops`), tabular session timestamps (`09:30 – 10:15`), and "Add to My Agenda" toggle.',
        },
        {
          sectionName: 'Keynote & Speaker Lineup Grid',
          purpose: 'Prove event caliber through recognizable domain leaders and session topics.',
          requiredElements:
            '1:1 speaker portraits, full name, role, organization, and linked session title.',
        },
        {
          sectionName: 'Tiered Pass Comparison & Group Registration',
          purpose: 'Convert individual and corporate team buyers with transparent pass perks.',
          requiredElements:
            '3 pass tiers (`Builder Pass`, `Executive All-Access`, `Team 5-Pack`), quantity stepper, and instant registration checkout modal.',
        },
      ],
      conversionPsychology: [
        'Personal Agenda Ownership: Once a visitor bookmarks 3+ sessions into "My Agenda", ticket conversion increases dramatically.',
        'Team Bundle Incentives: Explicit 5-pack / corporate invoice options capture B2B conference budgets.',
      ],
    },
    designSystem: {
      aestheticDirection:
        'Stripe Sessions / Figma Config Kinetic Editorial — bold architectural typography, structured timetable grids, and high-contrast stage color coding.',
      colorPalette: {
        dominantCanvas60: '#090A0F (Stage Midnight) or #FAF9F6 (Festival Poster Cream)',
        structuralSurface30: '#12151E / #FFFFFF with #222634 / #E4E2DD 1px borders',
        accentBudget10: '#3B82F6 (Main Stage Cobalt) or #F97316 (Keynote Signal Orange)',
        semanticTokens: 'Seats Available #16A34A · Filling Fast #D97706 · Stage Full #DC2626',
      },
      typography: {
        displayFont: 'Bricolage Grotesque or Syne or Oswald (700 Bold)',
        bodyFont: 'Plus Jakarta Sans (400/500)',
        monoFont: 'JetBrains Mono (for session timestamps `14:00 – 14:45`, room numbers, and pass prices)',
        scaleAndMeasure: 'Hero Title clamp(2.5rem, 5vw, 4.5rem) · Session Title 17px · Timestamp 13px tabular',
      },
      spatialMathAndGrid:
        '1440px container; Timetable grid uses fixed-width left timestamp column (`140px`) + flexible session detail column.',
    },
    engineeringSpec: {
      componentHierarchy: [
        'InteractiveScheduleTimetable (day switcher, track filter, bookmarked agenda filter)',
        'SpeakerLineupGrid (speaker cards + session link modal)',
        'TicketPassSelector (tier cards, group quantity calculator, registration modal)',
      ],
      stateAndDataEntities: [
        'ConferenceSession { id, day, startTime, endTime, stage, track, title, speakerName, speakerOrg, capacityStatus }',
        'PassRegistration { tierId, quantity, attendeeNames[], companyName, totalCents }',
      ],
      apiEndpointsAndIntegrations: [
        'GET /api/event/schedule (returns sessions, speakers, and pass tiers)',
        'POST /api/event/register (processes pass registration and returns badge ID)',
      ],
      seoAndJsonLdSchema:
        'Schema.org `Event` and `BusinessEvent` JSON-LD with `startDate`, `endDate`, `location`, `performer`, and `offers`.',
    },
    antiPatterns: [
      'Never render a conference schedule as a static, unfilterable image.',
      'Never wrap stage names and timestamps in competing neon pill badges.',
    ],
  },
  {
    id: 'skill-15-nonprofit-civic-institutional',
    slug: 'nonprofit-foundation-and-civic-institution',
    indexNumber: '15',
    name: 'Non-Profit Foundation, Museum, University & Civic Impact Portal',
    category: 'Non-Profit, Civic & Institutional',
    subArchetypes: [
      'Global Philanthropic Foundation & Humanitarian NGO',
      'Museum, Cultural Institution & Archival Exhibition',
      'Public Policy Institute & Open-Data Civic Portal',
      'Climate Conservation & Scientific Field Initiative',
      'Annual Impact Report & Shareholder Letter Microsite',
    ],
    summary:
      'Directs AI agents to build transparent, impact-driven institutional websites featuring interactive donation-to-outcome calculators, financial allocation breakdowns, field dispatches, and archival exhibitions.',
    yamlFrontmatter: `---
name: "nonprofit-foundation-and-civic-institution"
description: >
  Blueprint for building non-profit foundations, museums, civic institutions, and interactive
  annual impact reports. Enforces transparent fund-allocation breakdowns, interactive
  donation-to-impact calculators, documentary photography, and WCAG AA+ public accessibility.
triggers:
  - "non-profit, charity, foundation, NGO, museum, civic, impact report, donation"
target_conversion_metric: "Recurring Monthly Donor Conversion & Institutional Grant Inquiry"
---`,
    uxConversionFlow: {
      primaryGoal:
        'Inspire donor and public trust by tying every dollar contributed directly to verified, quantifiable field outcomes and audited financial transparency.',
      aboveTheFoldArchitecture:
        '3-Zone Top Bar (Institution Name — Mission · Impact Ledger · Field Reports · Financials — "Donate / Support" CTA) + Documentary Editorial Hero paired with an Interactive Donation-to-Outcome Widget (`$50`, `$150`, `$500`, `Custom` -> concrete unit impact).',
      sectionSequence: [
        {
          sectionName: 'Documentary Mission Hero & Direct Impact Calculator',
          purpose: 'Connect human or environmental urgency directly to a tangible contribution outcome.',
          requiredElements:
            'High-contrast documentary photography with measured scrim, mission headline, and interactive donation box showing exact tangible impact per dollar amount.',
        },
        {
          sectionName: 'Audited Financial Allocation & Transparency Ledger',
          purpose: 'Prove that contributions go directly to field programs rather than administrative overhead.',
          requiredElements:
            'Tabular breakdown (`89.4% Direct Field Programs · 6.2% Research & Ops · 4.4% Fundraising`), downloadable 990 / Audit Report summary, and regional fund distribution.',
        },
        {
          sectionName: 'Field Dispatches & Measurable Program Outcomes',
          purpose: 'Show verifiable progress across active regions or exhibitions.',
          requiredElements:
            'Region-filterable program cards with concrete baseline vs. current metrics, field lead attribution, and timeline.',
        },
      ],
      conversionPsychology: [
        'Tangible Unit Equivalence: Showing "$150 funds 12 clean-water sensor kits in Turkana County" converts 2.8x better than generic "Donate Now" boxes.',
        'Default Monthly Cadence with Clear Toggle: Offering a transparent "One-Time vs. Monthly Sustainer" switch lifts donor LTV.',
      ],
    },
    designSystem: {
      aestheticDirection:
        'MoMA / Charity:Water Documentary Editorial — warm archival stone, deep forest or terracotta accents, humanist serif headlines, and crystal-clear tabular accountability.',
      colorPalette: {
        dominantCanvas60: '#FAF8F5 (Archival Stone) or #0F1412 (Deep Forest Ink)',
        structuralSurface30: '#F1EDE4 / #18201D with #DED8CC 1px hairlines',
        accentBudget10: '#C2410C (Warm Terracotta Earth) or #15803D (Conservation Green)',
        semanticTokens: 'Fully Funded Initiative #16A34A · Active Field Deployment #2563EB',
      },
      typography: {
        displayFont: 'Fraunces or Source Serif 4 (600/700)',
        bodyFont: 'Public Sans or Plus Jakarta Sans (16px)',
        monoFont: 'IBM Plex Mono (for grant IDs, audited dollar allocations, and impact counters)',
        scaleAndMeasure: 'Hero Headline clamp(2.4rem, 4.2vw, 3.8rem) · Body 16px (68ch max)',
      },
      spatialMathAndGrid:
        '1360px container; 12-column editorial layout with generous 64px–96px vertical section pacing.',
    },
    engineeringSpec: {
      componentHierarchy: [
        'DonationImpactCalculator (cadence toggle, preset dollar buttons, tangible outcome readout)',
        'FinancialTransparencyLedger (program vs. overhead ratio bar + regional grant table)',
        'FieldProgramExplorer (filter by region/initiative + outcome metrics modal)',
      ],
      stateAndDataEntities: [
        'DonationState { amountDollars, cadence: "one-time" | "monthly", designatedProgramId, impactDescription }',
        'FieldInitiative { id, title, region, budgetAllocated, beneficiariesReached, status }',
      ],
      apiEndpointsAndIntegrations: [
        'GET /api/impact/programs (returns audited metrics and active field initiatives)',
        'POST /api/donations/pledge (processes donor contribution and issues tax-receipt reference)',
      ],
      seoAndJsonLdSchema:
        'Schema.org `NGO`, `NonprofitType`, or `Museum` JSON-LD with `nonprofitStatus` and `foundingDate`.',
    },
    antiPatterns: [
      'Never use manipulative guilt popups or fake countdown timers on charitable donation flows.',
      'Never obscure overhead percentages or financial governance details.',
    ],
  },
  {
    id: 'skill-16-interactive-3d-games-webgl',
    slug: 'interactive-3d-spatial-and-casual-web-games',
    indexNumber: '16',
    name: 'Interactive 3D Spatial Configurator, WebGL Showcase & 2D/3D Web Games',
    category: 'Interactive 3D, WebGL & Casual Games',
    subArchetypes: [
      '3D Product Configurator & Spatial Automotive/Hardware Viewer',
      'Interactive Three.js / WebGL Brand Experience',
      '2D Casual Card, Board & Strategy Web Game',
      'Word Puzzle, Trivia & Daily Cognitive Game',
      'Spatial Architecture & Virtual Showroom Walkthrough',
    ],
    summary:
      'Equips AI agents to build full-viewport interactive 3D scenes, spatial product configurators, and responsive 2D/3D web games with floating HUD overlays, 60fps render loops, and complete game-state lifecycles.',
    yamlFrontmatter: `---
name: "interactive-3d-spatial-and-casual-web-games"
description: >
  Engineering and UI constitution for Three.js / WebGL 3D scenes, spatial product
  configurators, and 2D/3D web games. Enforces 85%+ viewport canvas allocation, translucent
  floating HUD overlays, complete state lifecycles (Start -> Active -> Pause -> Game Over),
  and strict 60fps performance budgets.
triggers:
  - "3D, Three.js, WebGL, product configurator, game, card game, board game, puzzle, interactive canvas"
target_conversion_metric: "Session Engagement Duration, Configuration Save Rate & Replay Loop Completion"
---`,
    uxConversionFlow: {
      primaryGoal:
        'Deliver tactile, zero-latency spatial manipulation or game-loop satisfaction with unobtrusive HUD chrome.',
      aboveTheFoldArchitecture:
        'Full-Viewport Interactive Canvas (`100vw x 100vh` or `85%+` viewport height) with lightweight translucent HUD overlays (`backdrop-blur-md bg-slate-950/75 border border-white/10`) anchored to the perimeter corners so the center of the screen remains 100% unobstructed.',
      sectionSequence: [
        {
          sectionName: 'Full-Viewport Interactive Stage / Game Board',
          purpose: 'Put the 3D model, spatial scene, or playable game board immediately under the user’s cursor.',
          requiredElements:
            'Responsive WebGL/Canvas or interactive SVG board, camera preset buttons (`Orbit · Front · Exploded View · Interior`), and live material/configuration swatches.',
        },
        {
          sectionName: 'Perimeter HUD & Configuration / Score Telemetry',
          purpose: 'Provide score, turn state, or build price without obscuring the central playfield.',
          requiredElements:
            'Top-left Title & Mode indicator, Top-right Score/Build Price (`tabular-nums`) + Audio/Help controls, Bottom docked action bar (`48px–64px` height).',
        },
        {
          sectionName: 'Complete Lifecycle Modals (Rules / Pause / Summary / Share)',
          purpose: 'Ensure users never hit a dead end when a round finishes or a 3D build is completed.',
          requiredElements:
            'Clean rules drawer, end-of-round performance breakdown or saved 3D build specification sheet, and 1-click "Play Again / Export Build" CTA.',
        },
      ],
      conversionPsychology: [
        'Immediate Playability: Drop the user directly into an active or 1-click-start interactive canvas rather than burying the experience under marketing paragraphs.',
        'Endowment Effect in 3D Configurators: Updating paint, trim, and hardware options in real time with a live tabular price summary drives high-intent build reservations.',
      ],
    },
    designSystem: {
      aestheticDirection:
        'Tactile Spatial HUD & Crafted Tabletop — high-contrast translucent HUD panels over rich 3D lighting or textured felt/wood tabletop surfaces.',
      colorPalette: {
        dominantCanvas60: '#090D16 (Deep Studio Void) or #143326 (Tournament Felt Green)',
        structuralSurface30: 'rgba(15, 23, 42, 0.78) translucent HUD panels with rgba(255,255,255,0.12) 1px borders',
        accentBudget10: '#F59E0B (Tactile Gold Highlight) or #38BDF8 (Spatial Selection Cyan)',
        semanticTokens: 'Valid Move / Active Selection #22C55E · Invalid Action #EF4444',
      },
      typography: {
        displayFont: 'Outfit or Bricolage Grotesque (700 Bold)',
        bodyFont: 'Plus Jakarta Sans (500 Medium)',
        monoFont: 'JetBrains Mono (for frame/turn counters, timers, coordinates, and build totals)',
        scaleAndMeasure: 'HUD Metric 18px tabular · Control Button 13px single-line',
      },
      spatialMathAndGrid:
        'Canvas occupies 85%–100% of viewport; HUD panels occupy <15% total screen area pinned to corners with 16px–24px viewport margin.',
    },
    engineeringSpec: {
      componentHierarchy: [
        'InteractiveViewportCanvas (WebGL / Canvas / SVG stage with resize observer and pointer handlers)',
        'PerimeterHudOverlay (top status bar + bottom material/action dock)',
        'ConfigurationOrGameSummaryModal (build spec breakdown / round statistics + replay/save handler)',
      ],
      stateAndDataEntities: [
        'SceneOrGameState { status: "ready" | "active" | "paused" | "completed", cameraPreset, selectedFinish, scoreOrPrice, turnHistory[] }',
      ],
      apiEndpointsAndIntegrations: [
        'GET /api/configurator/presets (loads default 3D material/part presets or daily puzzle seed)',
        'POST /api/configurator/save (saves custom configuration or leaderboard score)',
      ],
      seoAndJsonLdSchema:
        'Schema.org `VideoGame` or `3DModel` / `WebApplication` JSON-LD with `applicationCategory` and `operatingSystem`.',
    },
    antiPatterns: [
      'Never trap a 3D scene or web game inside a tiny 400px box surrounded by generic SaaS marketing text.',
      'Never cover the center of the 3D viewport or game board with opaque persistent banners.',
      'Never omit `requestAnimationFrame` cleanup and window resize handlers.',
    ],
  },
  {
    id: 'skill-17-cinematic-scrollytelling-motion',
    slug: 'cinematic-scrollytelling-motion-website',
    indexNumber: '17',
    name: 'Cinematic Scrollytelling, Multi-Plane Parallax & Scroll-Choreographed Motion Website',
    category: 'Cinematic Scrollytelling & Motion Websites',
    subArchetypes: [
      'Aerospace, Lunar & Deep-Space Expedition (SELENE Archetype)',
      'Deep-Sea Submersible & Oceanographic Expedition',
      'Hypercar, EV & Autonomous Mobility Reveal',
      'Haute Horology & Mechanical Caliber Unveil',
      'Alpine Mountaineering & Extreme Gear Story',
      'Architectural Skyscraper & Cultural Monument Launch',
    ],
    summary:
      'Teaches AI agents to build zero-re-render, 60fps scroll-choreographed cinematic websites driven by a single requestAnimationFrame + Lenis loop, 6-plane alpha-cut photographic parallax stages, focal-line horizontal film reels, and scroll-inked SVG trajectory paths.',
    hasLiveMotionDemo: true,
    yamlFrontmatter: `---
name: "cinematic-scrollytelling-motion-website"
description: >
  Master specification for building cinematic scrollytelling and scroll-choreographed
  motion websites (modeled on the SELENE Lunar Expedition architecture). Enforces a single
  requestAnimationFrame loop advancing Lenis with direct ref style mutations (zero React
  useState re-renders during scroll), 6-layer alpha-cut photographic depth stages with
  desktop/mobile responsive cuts, focal-weighted horizontal film reels, scroll-inked SVG
  trajectories with getPointAtLength follower capsules, and corner-bracket telemetry HUDs.
triggers:
  - "motion website, scrollytelling, parallax website, cinematic launch, Lenis scroll, SELENE, earthrise, interactive story, expedition site"
target_conversion_metric: "100% Scroll Story Completion & Manifest / Waitlist Reservation Rate"
---`,
    uxConversionFlow: {
      primaryGoal:
        'Transform vertical scrolling into a continuous, 60fps physical camera move through depth planes, horizontal reels, and vector trajectories—culminating in a high-intent manifest/reservation capture.',
      aboveTheFoldArchitecture:
        'Fixed Minimal Hull Header (Brand Mark + Widely Tracked Wordmark `tracking-[0.36em]` — 4 Mono Anchor Links + 1 High-Contrast Reserve Button) over a Pinned `440svh` (`sticky top-0 h-[100svh]`) 6-Plane Depth Stage that opens behind a Canvas Particle Veil ("Scroll to clear the dust") and parts to reveal the rising subject, mid-plane tracked Hero Title, foreground silhouette, and Corner-Bracket Telemetry HUD.',
      sectionSequence: [
        {
          sectionName: 'Pinned 6-Plane Photographic Parallax Hero Stage (`STAGE_VH = 440svh`)',
          purpose: 'Create true cinema-grade z-depth without heavy WebGL or video buffering by sliding 6 alpha-cut layers past one another at distinct scroll velocities.',
          requiredElements:
            '`0.00–0.18`: Canvas dust particle veil clears upward (`translate3d` + `scale`). `0.04–0.50`: Primary background subject (e.g. Earth / Peak / Vessel) rises from behind the mid-plane horizon (`easeOutCubic`). `0.08–0.24`: Widely tracked Display Title resolves between planes (`letterSpacing: 0.6em -> 0.24em`, `blur(10px -> 0px)`). `0.28–0.62`: Foreground framing rim (`scale(1.6 -> 1.0)`), silhouette subject, and ground plane rise into place. `0.70–1.00`: Ground layer with an attached `110vh` solid `#05070c` apron climbs to swallow the frame cleanly into the next section.',
        },
        {
          sectionName: 'Pinned Horizontal Film-Reel Log (`SECTION_VH = 340svh`)',
          purpose: 'Present a chronological sequence of chapters or stills that slides sideways with vertical scroll while dynamically focusing the frame nearest the optical focal line.',
          requiredElements:
            'Left sticky 32vw narrative column with live `01 / 04` counter and `scaleX(k)` progress bar + Right horizontal `<ol>` track translating by `-k * travel`. Each card calculates its distance `off` from `vw * 0.62`: the nearest card renders at `opacity: 1, scale: 1`, while peripheral cards dim (`1 - a * 0.55`) and shrink (`1 - a * 0.07`), with inner `<img>` counter-panning (`translate3d(${off * -60}px, 0, 0) scale(1.15)`).',
        },
        {
          sectionName: 'Scroll-Inked Multi-Leg SVG Trajectory (`SECTION_VH = 380svh`)',
          purpose: 'Draw a physical route, engineering process, or expedition path directly from scroll progress rather than a passive timer.',
          requiredElements:
            'Pinned `1200x600` SVG stage with ghost dashed paths (`strokeOpacity="0.08"`) overlaid by inked paths (`pathLength={1}`, `strokeDasharray="1 1"`, `strokeDashoffset={1 - k}`). A rider/capsule `<g>` follows the active leg via `path.getPointAtLength(path.getTotalLength() * k)`, while a tabular counter ticks up total distance/output and a bottom bar transitions between leg descriptions.',
        },
        {
          sectionName: 'Generative SVG Orbit-Ring Tier / Mission Cards',
          purpose: 'Encode package duration, complexity, or tier depth visually using procedural SVG geometry.',
          requiredElements:
            '3-column tier grid (`[data-reveal]` staggered entrance) where each card renders procedural SVG elliptical rings proportional to its duration (`Math.ceil(days / 7)`), a large tabular duration/price figure, bulleted inclusions, and a deep-link CTA that pre-selects that tier in the reservation form below.',
        },
        {
          sectionName: 'Bookended Horizon Glow & Live Countdown Manifest Form',
          purpose: 'Close the narrative arc with a visual echo of the hero and capture committed reservations.',
          requiredElements:
            'Radial atmospheric glow at the bottom viewport edge bookending the hero + 2-column split: Left column features a 1Hz live launch-window countdown (`Days · Hrs · Min · Sec`) framed in `.brackets`; Right column houses a strict manifest form (`Name`, `Email`, `Selected Tier`) with native validity checking and instant status feedback.',
        },
      ],
      conversionPsychology: [
        'Zero Mid-Scroll Jank = Trust: Updating transforms and text nodes directly inside a single rAF loop keeps frame times under 4ms, making the product feel engineered like aerospace hardware.',
        'Physical Scroll Agency: Because the user’s scroll wheel directly clears the dust, raises the horizon, and inks the trajectory, engagement completion exceeds 85%.',
        'Pre-Populated Manifest Handoff: Clicking any tier card scrolls smoothly via Lenis and pre-selects that exact tier in the reservation `<select>` input.',
      ],
    },
    designSystem: {
      aestheticDirection:
        'Engineered Aerospace & Deep-Void Telemetry — deep vacuum blacks (`#05070c`), regolith silver-grays (`#c9ccd3`), sunlit parchment highlights (`#f2e6c9`), hull-stenciled wide display typography (`Michroma`), and 1px corner-bracket HUD overlays.',
      colorPalette: {
        dominantCanvas60: '#05070c (--color-void: Deep Space / Abyssal Black)',
        structuralSurface30: '#0b0f18 (--color-void-2: Card & Panel Surface) with rgba(255,255,255,0.10) 1px rings',
        accentBudget10: '#6fb6ff (--color-earth: Atmospheric Horizon Cyan) + #f2e6c9 (--color-sunlit: Trajectory Gold)',
        semanticTokens: 'Primary Text #c9ccd3 (--color-regolith) · Muted Telemetry #8b909b (--color-dust) · Invalid Ring #f87171',
      },
      typography: {
        displayFont: 'Michroma (wide engineered caps, tracked out `0.24em`–`0.50em` like hull stenciling; always pair wide tracking with negative `marginRight` optical compensation)',
        bodyFont: 'Manrope (300–700 weight, clean geometric legibility against dark void surfaces)',
        monoFont: 'IBM Plex Mono (400/500, `0.6875rem` uppercase with `0.16em` letter-spacing for telemetry clocks, coordinates, and HUD readouts)',
        scaleAndMeasure: 'Hero `--text-hero: clamp(2.25rem, 8.6vw, 9rem)` (`letter-spacing: 0.24em`) · Section `--text-display: clamp(1.75rem, 4vw, 3.75rem)` · Body `clamp(0.9375rem, 1.05vw, 1.0625rem)`',
      },
      spatialMathAndGrid:
        'Use `100svh` (`.h-screen-s`) for all sticky pinned viewports to avoid mobile browser bar jumps. Set `overflow-x: clip` on `body` and `history.scrollRestoration = "manual"` in `main.tsx`. Always provide both desktop (`d/`, `min-width: 768px`) and mobile (`m/`, `max-width: 767px`) layer cuts sharing a unified `object-cover` registration.',
    },
    engineeringSpec: {
      componentHierarchy: [
        'src/lib/scroll.ts (Singleton Lenis instance + single rAF loop `onFrame` pub/sub + `scrollToHash`)',
        'src/lib/math.ts (`clamp`, `lerp`, `range`, `easeOutCubic`, `pinProgress(el)`)',
        'src/hooks/useReducedMotion.ts & src/hooks/useReveals.ts (prefers-reduced-motion media listener + IntersectionObserver `[data-reveal]` trigger)',
        'Earthrise.tsx (440svh pinned 6-layer parallax stage + 2D canvas dust motes + telemetry HUD)',
        'MissionLog.tsx (340svh pinned horizontal focal-line reel with inner-image counter-parallax)',
        'Trajectory.tsx (380svh pinned SVG multi-leg path inker using `getPointAtLength` capsule tracking)',
        'Missions.tsx & Reserve.tsx (procedural SVG orbit-ring cards + 1Hz launch countdown + manifest form)',
      ],
      stateAndDataEntities: [
        'PinMetrics { p: number (0..1 clamped progress), rect: DOMRect, vh: number }',
        'LayerName = "sky" | "earth" | "moonscape" | "frame" | "astronaut" | "ground"',
        'Mote { x: number, y: number, r: number, s: number, a: number } (Canvas dust particle)',
        'TrajectoryLeg { day: string, title: string, body: string, svgPathD: string }',
      ],
      apiEndpointsAndIntegrations: [
        'Client-side deterministic rAF loop (zero network latency during scroll)',
        'Preloaded responsive `<picture>` WebP layer assets (`/layers/d/*.webp` and `/layers/m/*.webp`)',
        'Manifest submission handler (`mailto:` draft or `POST /api/manifest/reserve` waitlist endpoint)',
      ],
      seoAndJsonLdSchema:
        'Preload primary background layer (`<link rel="preload" as="image" href="/layers/d/sky.webp" media="(min-width: 768px)" fetchpriority="high" />`), set `<meta name="theme-color" content="#05070c" />`, and include Schema.org `Event` or `Product` JSON-LD.',
    },
    antiPatterns: [
      'NEVER call React `useState` setters on every scroll tick—all continuous scroll transforms, opacities, and telemetry counters MUST write directly to DOM refs (`el.style.transform`, `el.textContent`) inside `onFrame`.',
      'NEVER combine multiple competing scroll/animation libraries (do not mix GSAP ScrollTrigger + Framer Motion + Lenis); run ONE `requestAnimationFrame` loop that steps Lenis and notifies `onFrame` subscribers.',
      'NEVER forget negative right margin (`marginRight: "-0.24em"`) on centered text with wide `letter-spacing`, otherwise centered headings appear optically shifted to the left.',
      'NEVER omit the `prefers-reduced-motion: reduce` branch in `startScroll(reduced)` and particle loops.',
      'NEVER allow horizontal scrollbar overflow at 390px, 768px, 1280px, or 1920px viewports (`overflow-x: clip`).',
    ],
    codeTemplates: [
      {
        filename: 'src/lib/math.ts',
        description:
          'Pure arithmetic primitives for pinned scroll progress (`pinProgress`), sub-window range normalization (`range`), linear interpolation (`lerp`), and cubic easing.',
        code: `export const clamp = (v: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, v));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Maps value v from [a, b] into clamped [0, 1] progress. */
export const range = (v: number, a: number, b: number) =>
  clamp((v - a) / (b - a));

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - clamp(t), 3);

/**
 * Computes normalized 0..1 scroll progress for a sticky-pinned section
 * whose total height is > 100svh.
 */
export function pinProgress(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;
  const travel = Math.max(1, rect.height - vh);
  const p = clamp(-rect.top / travel);
  return { p, rect, vh };
}`,
      },
      {
        filename: 'src/lib/scroll.ts',
        description:
          'Single requestAnimationFrame loop that advances Lenis smooth scroll and dispatches frame timestamps to all scroll-driven components with zero React state overhead.',
        code: `import Lenis from 'lenis';

type FrameCallback = (time: number) => void;

const listeners = new Set<FrameCallback>();
let lenisInstance: Lenis | null = null;

export function onFrame(cb: FrameCallback): () => void {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

export function scrollToHash(hash: string) {
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { duration: 1.4 });
  } else {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

export function startScroll(reducedMotion: boolean): () => void {
  const lenis = reducedMotion
    ? null
    : new Lenis({
        lerp: 0.085,
        smoothWheel: true,
      });
  lenisInstance = lenis;

  let rafId = 0;
  const tick = (time: number) => {
    lenis?.raf(time);
    listeners.forEach((fn) => fn(time));
    rafId = requestAnimationFrame(tick);
  };
  rafId = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(rafId);
    lenis?.destroy();
    if (lenisInstance === lenis) lenisInstance = null;
  };
}`,
      },
      {
        filename: 'src/hooks/useReducedMotion.ts & src/hooks/useReveals.ts',
        description:
          'Accessibility hook for prefers-reduced-motion and IntersectionObserver hook that toggles `.is-in` on `[data-reveal]` elements.',
        code: `import { useEffect, useRef, useState } from 'react';

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

export function useReveals<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const targets = root.querySelectorAll<HTMLElement>('[data-reveal]');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return ref;
}`,
      },
      {
        filename: 'src/components/Earthrise.tsx (6-Plane Pinned Parallax Stage)',
        description:
          'Stacked 6-layer photographic parallax stage with seeded 2D canvas dust veil, mid-plane tracked title reveal, corner-bracket HUD clock, and black apron curtain transition.',
        code: `// Scroll-Window Choreography inside onFrame((time) => ...):
// 0.00 - 0.18: Dust veil clears upward
const veil = 1 - range(p, 0, 0.18);
const exit = range(p, 0.7, 1);
const settle = easeOutCubic(range(p, 0, 0.5));

// Far -> Near layers moving at distinct rates:
set('sky', lerp(0, -6, p), lerp(1.14, 1, settle));
const rise = easeOutCubic(range(p, 0.04, 0.5));
set('earth', lerp(34, 0, rise) - exit * 12, lerp(0.92, 1, rise));
set('moonscape', lerp(9, 0, settle) - exit * 26);
const rim = easeOutCubic(range(p, 0.28, 0.58));
set('frame', -exit * 44, lerp(1.6, 1, rim), rim);
const up = easeOutCubic(range(p, 0.36, 0.62));
set('astronaut', lerp(28, 0, up) - exit * 58, 1, clamp(up * 2));
const ground = easeOutCubic(range(p, 0.34, 0.6));
set('ground', lerp(36, 0, ground) - exit * 78);

// Mid-plane Title tracking condensation & blur clearing:
const tIn = easeOutCubic(range(p, 0.08, 0.24));
const tOut = range(p, 0.42, 0.52);
title.style.opacity = String(tIn * (1 - tOut));
title.style.letterSpacing = \`\${lerp(0.6, 0.24, tIn)}em\`;
title.style.transform = \`translate3d(0, \${-p * 6}vh, 0)\`;
title.style.filter = tIn < 0.99 ? \`blur(\${(1 - tIn) * 10}px)\` : '';`,
      },
      {
        filename: 'src/components/MissionLog.tsx & Trajectory.tsx (Horizontal Reel & SVG Path Inker)',
        description:
          'Focal-weighted horizontal film reel with inner-image counter-parallax and multi-leg SVG path drawing using `getPointAtLength`.',
        code: `// 1. Horizontal Reel Focal Proximity & Counter-Parallax:
const vw = window.innerWidth;
const k = range(p, 0.04, 0.96);
const travel = Math.max(0, track.offsetLeft + track.scrollWidth - vw * 0.94);
track.style.transform = \`translate3d(\${-k * travel}px, 0, 0)\`;

cardRefs.current.forEach((card, i) => {
  const r = card.getBoundingClientRect();
  const off = (r.left + r.width / 2 - vw * 0.62) / vw; // focus line right of centre
  const a = clamp(Math.abs(off) * 1.6);
  card.style.opacity = String(1 - a * 0.55);
  card.style.transform = \`scale(\${1 - a * 0.07})\`;
  imgRefs.current[i].style.transform = \`translate3d(\${off * -60}px, 0, 0) scale(1.15)\`;
});

// 2. Scroll-Inked SVG Trajectory & Capsule Follower:
const u = range(p, 0.06, 0.92) * LEGS.length;
const s = clamp(Math.floor(u), 0, LEGS.length - 1);
legRefs.current.forEach((path, i) => {
  const legProgress = easeOutCubic(clamp(u - i));
  path.style.strokeDashoffset = String(1 - legProgress);
  if (i === s) {
    const pt = path.getPointAtLength(path.getTotalLength() * legProgress);
    capsuleRef.current!.setAttribute('transform', \`translate(\${pt.x} \${pt.y})\`);
  }
});`,
      },
    ],
  },
];
