// AUTO-GENERATED from scripts/ingest_job_market.ts
// Based on 702 total real job postings
// Generated: 2026-10-11T04:14:33.435Z

export interface SkillRequirementDraft {
  name: string;
  required: number;
}

export const JOB_MARKET_SKILLS: Record<string, SkillRequirementDraft[]> = {
  // ── AI/ML Engineer / Machine Learning Engineer (ai-ml-engineer) ──
  // Source: 55 real job postings from ai_ml_engineer_hasil_ekstraksi_skill.xlsx
  'ai-ml-engineer': [
    { name: 'Large Language Models', required: 3 }, // 60% market demand
    { name: 'Agentic AI', required: 2 }, // 45.5% market demand
    { name: 'Machine Learning', required: 2 }, // 45.5% market demand
    { name: 'Python', required: 2 }, // 41.8% market demand
    { name: 'Retrieval-Augmented Generation', required: 2 }, // 41.8% market demand
    { name: 'Generative AI', required: 2 }, // 34.5% market demand
    { name: 'Cross-Functional Collaboration', required: 3 }, // 69.1% market demand
    { name: 'Communication Skills', required: 3 }, // 52.7% market demand
  ],

  // ── Business Development / Account Executive (hr-business-partner) ──
  // Source: 53 real job postings from bd_account_executive_hasil_ekstraksi.xlsx
  'hr-business-partner': [
    { name: 'Sales Pipeline Management', required: 3 }, // 69.8% market demand
    { name: 'Lead Generation', required: 3 }, // 66% market demand
    { name: 'B2B Sales', required: 3 }, // 66% market demand
    { name: 'Sales Target Achievement', required: 3 }, // 66% market demand
    { name: 'Account Management', required: 3 }, // 64.2% market demand
    { name: 'Business Development', required: 3 }, // 62.3% market demand
    { name: 'Relationship Building', required: 3 }, // 83% market demand
    { name: 'Communication Skills', required: 3 }, // 83% market demand
  ],

  // ── Content Creator / Social Media Specialist (content-strategist) ──
  // Source: 78 real job postings from contentcreator_hasil_ekstraksi_skill.xlsx
  'content-strategist': [
    { name: 'TikTok', required: 3 }, // 65.4% market demand
    { name: 'Copywriting', required: 2 }, // 41% market demand
    { name: 'Content Calendar', required: 2 }, // 30.8% market demand
    { name: 'Content Performance Analysis', required: 2 }, // 30.8% market demand
    { name: 'Community Management', required: 2 }, // 28.2% market demand
    { name: 'Content Ideation', required: 1 }, // 24.4% market demand
    { name: 'Creative Thinking', required: 3 }, // 62.8% market demand
    { name: 'Cross-Functional Collaboration', required: 3 }, // 59% market demand
  ],

  // ── Data Analyst / Business Intelligence (data-scientist) ──
  // Source: 57 real job postings from data_analyst_bi_hasil_ekstraksi_skill.xlsx
  'data-scientist': [
    { name: 'SQL', required: 3 }, // 73.7% market demand
    { name: 'Dashboard Development', required: 3 }, // 64.9% market demand
    { name: 'Microsoft Excel', required: 3 }, // 59.6% market demand
    { name: 'Python', required: 3 }, // 57.9% market demand
    { name: 'Power BI', required: 3 }, // 56.1% market demand
    { name: 'Tableau', required: 2 }, // 45.6% market demand
    { name: 'Analytical Thinking', required: 3 }, // 70.2% market demand
    { name: 'Cross-Functional Collaboration', required: 3 }, // 57.9% market demand
  ],

  // ── DevOps Engineer / QA Automation Engineer (product-manager) ──
  // Source: 43 real job postings from devops_qa_hasil_ekstraksi.xlsx
  'product-manager': [
    { name: 'CI/CD Pipeline', required: 3 }, // 83.7% market demand
    { name: 'AWS', required: 3 }, // 67.4% market demand
    { name: 'Docker', required: 3 }, // 65.1% market demand
    { name: 'Kubernetes', required: 3 }, // 55.8% market demand
    { name: 'Google Cloud Platform', required: 3 }, // 53.5% market demand
    { name: 'Infrastructure as Code', required: 2 }, // 46.5% market demand
    { name: 'Cross-Functional Collaboration', required: 2 }, // 46.5% market demand
    { name: 'Communication Skills', required: 2 }, // 32.6% market demand
  ],

  // ── Digital Marketing Specialist (community-manager) ──
  // Source: 100 real job postings from digitalmarketing_hasil_ekstraksi_skills.xlsx
  'community-manager': [
    { name: 'Google Ads', required: 3 }, // 50% market demand
    { name: 'Meta Ads', required: 2 }, // 42% market demand
    { name: 'A/B Testing', required: 2 }, // 36% market demand
    { name: 'SEO', required: 2 }, // 36% market demand
    { name: 'ROAS', required: 2 }, // 35% market demand
    { name: 'Conversion Rate', required: 2 }, // 35% market demand
    { name: 'Cross-Functional Collaboration', required: 3 }, // 66% market demand
    { name: 'Analytical Thinking', required: 3 }, // 59% market demand
  ],

  // ── E-Commerce Specialist / Dropshipper (ecommerce-specialist) ──
  // Source: 32 real job postings from ecommerce_dropship_hasil_ekstraksi.xlsx
  'ecommerce-specialist': [
    { name: 'TikTok Shop Operations', required: 2 }, // 31.3% market demand
    { name: 'Shopee Operations', required: 2 }, // 28.1% market demand
    { name: 'Lazada Operations', required: 1 }, // 18.8% market demand
    { name: 'Conversion Rate Optimization', required: 1 }, // 15.6% market demand
    { name: 'Inventory Management', required: 1 }, // 15.6% market demand
    { name: 'Tokopedia Operations', required: 1 }, // 15.6% market demand
    { name: 'Analytical Thinking', required: 3 }, // 65.6% market demand
    { name: 'Cross-Functional Collaboration', required: 3 }, // 62.5% market demand
  ],

  // ── Graphic Designer / Visual Designer (graphic-designer) ──
  // Source: 86 real job postings from graphicdesign_hasil_ekstraksi.xlsx
  'graphic-designer': [
    { name: 'Adobe Photoshop', required: 3 }, // 66.3% market demand
    { name: 'Adobe Illustrator', required: 3 }, // 65.1% market demand
    { name: 'Branding', required: 3 }, // 62.8% market demand
    { name: 'Ad Creative Design', required: 3 }, // 50% market demand
    { name: 'Art Direction', required: 2 }, // 43% market demand
    { name: 'Adobe Creative Suite', required: 2 }, // 38.4% market demand
    { name: 'Creative Thinking', required: 3 }, // 54.7% market demand
    { name: 'Time Management', required: 3 }, // 54.7% market demand
  ],

  // ── Data Researcher / Strategy Analyst (research-scientist) ──
  // Source: 50 real job postings from researcher_strategy_hasil_ekstraksi.xlsx
  'research-scientist': [
    { name: 'Microsoft Excel', required: 3 }, // 70% market demand
    { name: 'Data Analysis', required: 3 }, // 58% market demand
    { name: 'Corporate Strategy', required: 3 }, // 56% market demand
    { name: 'Process Improvement', required: 2 }, // 44% market demand
    { name: 'Competitive Analysis', required: 2 }, // 40% market demand
    { name: 'Market Research', required: 2 }, // 38% market demand
    { name: 'Analytical Thinking', required: 3 }, // 74% market demand
    { name: 'Communication Skills', required: 3 }, // 72% market demand
  ],

  // ── Software Engineer (Front/Back/Full-Stack) (startup-founder) ──
  // Source: 83 real job postings from software_engineer_hasil_ekstraksi_skill.xlsx
  'startup-founder': [
    { name: 'Golang', required: 3 }, // 50.6% market demand
    { name: 'REST API', required: 2 }, // 41% market demand
    { name: 'Java', required: 2 }, // 30.1% market demand
    { name: 'Python', required: 2 }, // 28.9% market demand
    { name: 'PostgreSQL', required: 2 }, // 27.7% market demand
    { name: 'SQL', required: 2 }, // 27.7% market demand
    { name: 'Cross-Functional Collaboration', required: 3 }, // 50.6% market demand
    { name: 'Problem Solving', required: 2 }, // 38.6% market demand
  ],

  // ── UI/UX Designer (ux-designer) ──
  // Source: 65 real job postings from uiux_hasil_ekstraksi.xlsx
  'ux-designer': [
    { name: 'Figma', required: 3 }, // 72.3% market demand
    { name: 'Prototyping', required: 3 }, // 53.8% market demand
    { name: 'User Research', required: 2 }, // 36.9% market demand
    { name: 'Wireframing', required: 2 }, // 35.4% market demand
    { name: 'Design System', required: 2 }, // 35.4% market demand
    { name: 'Visual Design', required: 2 }, // 33.8% market demand
    { name: 'Cross-Functional Collaboration', required: 3 }, // 66.2% market demand
    { name: 'Communication Skills', required: 3 }, // 60% market demand
  ],

};
