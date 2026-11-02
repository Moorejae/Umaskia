export interface SkillSectionSpec {
  sectionName: string;
  purpose: string;
  requiredElements: string;
}

export interface UXConversionFlow {
  primaryGoal: string;
  aboveTheFoldArchitecture: string;
  sectionSequence: SkillSectionSpec[];
  conversionPsychology: string[];
}

export interface SkillColorPalette {
  dominantCanvas60: string;
  structuralSurface30: string;
  accentBudget10: string;
  semanticTokens: string;
}

export interface SkillTypography {
  displayFont: string;
  bodyFont: string;
  monoFont: string;
  scaleAndMeasure: string;
}

export interface SkillDesignSystem {
  aestheticDirection: string;
  colorPalette: SkillColorPalette;
  typography: SkillTypography;
  spatialMathAndGrid: string;
}

export interface SkillEngineeringSpec {
  componentHierarchy: string[];
  stateAndDataEntities: string[];
  apiEndpointsAndIntegrations: string[];
  seoAndJsonLdSchema: string;
}

export interface SkillCodeTemplate {
  filename: string;
  description: string;
  code: string;
}

export interface WebsiteSkill {
  id: string;
  slug: string;
  indexNumber: string;
  name: string;
  category: string;
  subArchetypes: string[];
  summary: string;
  yamlFrontmatter: string;
  uxConversionFlow: UXConversionFlow;
  designSystem: SkillDesignSystem;
  engineeringSpec: SkillEngineeringSpec;
  antiPatterns: string[];
  codeTemplates?: SkillCodeTemplate[];
  hasLiveMotionDemo?: boolean;
  isCustom?: boolean;
  updatedAt?: string;
}

export interface GoogleDocSyncRecord {
  documentId: string;
  title: string;
  url: string;
  skillCount: number;
  syncedAt: string;
  mode: 'created' | 'appended';
}
