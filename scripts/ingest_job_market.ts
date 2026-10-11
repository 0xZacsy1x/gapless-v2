/**
 * ingest_job_market.ts
 * 
 * Parses 11 scraped job-portal Excel files and generates:
 * 1. A comprehensive JSON with all extracted market data
 * 2. Updated skill arrays for each CareerProfile in gaplessData.ts
 * 3. A market enrichment data file (careerMarketData.ts)
 * 
 * Usage:
 *   npx tsx scripts/ingest_job_market.ts
 */

import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

// ─── Types ───────────────────────────────────────────────
interface SkillFrequency {
  skill: string;
  count: number;
  percentage: number;
}

interface JobPosting {
  company: string;
  title: string;
  hardSkills: string[];
  softSkills: string[];
}

interface CareerMarketData {
  fileSource: string;
  careerProfileId: string;
  careerTitle: string;
  totalPostings: number;
  hardSkills: SkillFrequency[];
  softSkills: SkillFrequency[];
  jobPostings: JobPosting[];
  skillRequirements: { name: string; required: number; marketPercentage: number; isHardSkill: boolean }[];
}

// ─── File → Career Profile Mapping ──────────────────────
const FILE_CAREER_MAP: Record<string, { id: string; title: string }> = {
  'ai_ml_engineer_hasil_ekstraksi_skill.xlsx': { id: 'ai-ml-engineer', title: 'AI/ML Engineer / Machine Learning Engineer' },
  'data_analyst_bi_hasil_ekstraksi_skill.xlsx': { id: 'data-scientist', title: 'Data Analyst / Business Intelligence' },
  'researcher_strategy_hasil_ekstraksi.xlsx': { id: 'research-scientist', title: 'Data Researcher / Strategy Analyst' },
  'uiux_hasil_ekstraksi.xlsx': { id: 'ux-designer', title: 'UI/UX Designer' },
  'contentcreator_hasil_ekstraksi_skill.xlsx': { id: 'content-strategist', title: 'Content Creator / Social Media Specialist' },
  'digitalmarketing_hasil_ekstraksi_skills.xlsx': { id: 'community-manager', title: 'Digital Marketing Specialist' },
  'bd_account_executive_hasil_ekstraksi.xlsx': { id: 'hr-business-partner', title: 'Business Development / Account Executive' },
  'software_engineer_hasil_ekstraksi_skill.xlsx': { id: 'startup-founder', title: 'Software Engineer (Front/Back/Full-Stack)' },
  'devops_qa_hasil_ekstraksi.xlsx': { id: 'product-manager', title: 'DevOps Engineer / QA Automation Engineer' },
  'graphicdesign_hasil_ekstraksi.xlsx': { id: 'graphic-designer', title: 'Graphic Designer / Visual Designer' },
  'ecommerce_dropship_hasil_ekstraksi.xlsx': { id: 'ecommerce-specialist', title: 'E-Commerce Specialist / Dropshipper' },
};

// ─── Parsing Logic ──────────────────────────────────────

function parseSkillSheet(ws: XLSX.WorkSheet): SkillFrequency[] {
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1 }) as unknown[][];
  if (rows.length < 2) return [];

  const header = (rows[0] as string[]).map(h => String(h || '').trim().toLowerCase());
  const numCols = header.length;

  // Detect layout. Some files have a "No" column in data but not in header.
  // Strategy: look at the first data row to figure out which column is the skill name.
  const firstRow = rows[1] as unknown[];

  // Heuristic: if first data column is a number AND second is a string → col0=No, col1=skill
  const col0IsNum = typeof firstRow[0] === 'number';
  const col1IsString = typeof firstRow[1] === 'string' && isNaN(Number(firstRow[1]));

  let skillCol: number;
  let countCol: number;
  let pctCol: number;

  if (col0IsNum && col1IsString) {
    // Layout: [No, SkillName, Count/Pct, Pct/Count]
    skillCol = 1;
    // Determine which remaining column is count vs percentage
    if (numCols >= 4 || firstRow.length >= 4) {
      countCol = 2;
      pctCol = 3;
    } else {
      // Only 3 effective columns: No, Skill, Pct (no separate count)
      countCol = -1; // will estimate
      pctCol = 2;
    }
  } else {
    // Standard layout: [Skill, Count, Pct]
    skillCol = header.findIndex(h => h.includes('skill'));
    if (skillCol === -1) skillCol = 0;
    countCol = header.findIndex(h => h.includes('jumlah'));
    if (countCol === -1) countCol = 1;
    pctCol = header.findIndex(h => h === '%' || h.includes('dari') || h.includes('percent'));
    if (pctCol === -1) pctCol = 2;
  }

  const results: SkillFrequency[] = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i] as unknown[];
    if (!row || !row[skillCol]) continue;

    const skill = String(row[skillCol]).trim();
    if (!skill || !isNaN(Number(skill))) continue; // skip if skill is a number (row index)

    let count: number;
    if (countCol >= 0 && row[countCol] !== undefined) {
      count = typeof row[countCol] === 'number' ? row[countCol] as number : parseInt(String(row[countCol] || '0'));
    } else {
      count = 0;
    }

    let pctVal: number;
    const rawPct = row[pctCol];
    if (typeof rawPct === 'string' && rawPct.includes('%')) {
      pctVal = parseFloat(rawPct.replace('%', ''));
    } else if (typeof rawPct === 'number') {
      pctVal = rawPct;
      // If 0-1 range, convert to percentage
      if (pctVal > 0 && pctVal <= 1) pctVal = pctVal * 100;
    } else {
      pctVal = parseFloat(String(rawPct || '0'));
      if (pctVal > 0 && pctVal <= 1) pctVal = pctVal * 100;
    }

    results.push({
      skill,
      count,
      percentage: Math.round(pctVal * 10) / 10,
    });
  }

  return results.sort((a, b) => b.percentage - a.percentage);
}

function parseRawPostings(ws: XLSX.WorkSheet): { postings: JobPosting[]; totalCount: number } {
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1 }) as unknown[][];
  if (rows.length < 2) return { postings: [], totalCount: 0 };

  const header = (rows[0] as string[]).map(h => String(h || '').trim().toLowerCase());
  const companyCol = header.findIndex(h => h.includes('perusahaan') || h.includes('company'));
  const titleCol = header.findIndex(h => h.includes('title') || h.includes('judul'));
  const hardCol = header.findIndex(h => h.includes('hard'));
  const softCol = header.findIndex(h => h.includes('soft'));

  const postings: JobPosting[] = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i] as unknown[];
    if (!row || row.length < 3) continue;

    const company = String(row[companyCol >= 0 ? companyCol : 1] || '').trim();
    const title = String(row[titleCol >= 0 ? titleCol : 2] || '').trim();
    if (!company && !title) continue;

    const hardRaw = String(row[hardCol >= 0 ? hardCol : 3] || '');
    const softRaw = String(row[softCol >= 0 ? softCol : 4] || '');

    postings.push({
      company,
      title,
      hardSkills: hardRaw.split(',').map(s => s.trim()).filter(Boolean),
      softSkills: softRaw.split(',').map(s => s.trim()).filter(Boolean),
    });
  }

  return { postings, totalCount: postings.length };
}

/**
 * Convert market frequency % to required level (0-3):
 *  >= 50%  → Level 3 (Lanjutan)
 *  >= 25%  → Level 2 (Menengah)
 *  >= 10%  → Level 1 (Dasar)
 *  <  10%  → Level 0
 */
function percentageToLevel(pct: number): number {
  if (pct >= 50) return 3;
  if (pct >= 25) return 2;
  if (pct >= 10) return 1;
  return 0;
}

// ─── Main ───────────────────────────────────────────────
function main() {
  const DATA_DIR = path.resolve(__dirname, '../data/job_market');
  const OUTPUT_DIR = path.resolve(__dirname, '../data');

  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.xlsx'));
  console.log(`📂 Found ${files.length} Excel files in ${DATA_DIR}\n`);

  const allCareerData: CareerMarketData[] = [];

  for (const filename of files) {
    const mapping = FILE_CAREER_MAP[filename];
    if (!mapping) {
      console.warn(`⚠️  No mapping for file: ${filename}, skipping.`);
      continue;
    }

    const filepath = path.join(DATA_DIR, filename);
    const wb = XLSX.readFile(filepath);

    console.log(`━━━ Processing: ${filename} → ${mapping.id} ━━━`);
    console.log(`    Sheets: ${wb.SheetNames.join(', ')}`);

    const rawSheetName = wb.SheetNames.find(s => s.toLowerCase().includes('hasil') || s.toLowerCase().includes('raw')) || wb.SheetNames[0];
    const hardSheetName = wb.SheetNames.find(s => s.toLowerCase().includes('hard')) || wb.SheetNames[1];
    const softSheetName = wb.SheetNames.find(s => s.toLowerCase().includes('soft')) || wb.SheetNames[2];

    const hardSkills = parseSkillSheet(wb.Sheets[hardSheetName]);
    const softSkills = parseSkillSheet(wb.Sheets[softSheetName]);
    const { postings, totalCount } = parseRawPostings(wb.Sheets[rawSheetName]);

    // Top 6 hard + top 2 soft = 8 skill requirements per career
    const topHard = hardSkills.slice(0, 6);
    const topSoft = softSkills.slice(0, 2);

    const skillRequirements = [
      ...topHard.map(s => ({
        name: s.skill,
        required: percentageToLevel(s.percentage),
        marketPercentage: s.percentage,
        isHardSkill: true,
      })),
      ...topSoft.map(s => ({
        name: s.skill,
        required: percentageToLevel(s.percentage),
        marketPercentage: s.percentage,
        isHardSkill: false,
      })),
    ];

    // Ensure at least level 1 for all top skills
    skillRequirements.forEach(s => {
      if (s.required === 0) s.required = 1;
    });

    const careerData: CareerMarketData = {
      fileSource: filename,
      careerProfileId: mapping.id,
      careerTitle: mapping.title,
      totalPostings: totalCount,
      hardSkills,
      softSkills,
      jobPostings: postings,
      skillRequirements,
    };

    allCareerData.push(careerData);

    console.log(`    📊 ${totalCount} postings | ${hardSkills.length} hard skills | ${softSkills.length} soft skills`);
    console.log(`    🎯 Top requirements:`);
    const levelNames = ['Tidak Ada', 'Dasar', 'Menengah', 'Lanjutan'];
    skillRequirements.forEach(s => {
      console.log(`       ${s.isHardSkill ? '🔧' : '🤝'} ${s.name}: Level ${s.required} (${levelNames[s.required]}) — ${s.marketPercentage}% demand`);
    });
    console.log();
  }

  // ─── Output 1: Full JSON ───
  const jsonPath = path.join(OUTPUT_DIR, 'job_market_compiled.json');
  const jsonOutput = allCareerData.map(c => ({
    ...c,
    jobPostings: c.jobPostings.slice(0, 5),
  }));
  fs.writeFileSync(jsonPath, JSON.stringify(jsonOutput, null, 2), 'utf-8');
  console.log(`✅ Full JSON written to: ${jsonPath}`);

  // ─── Output 2: TypeScript skill arrays reference ───
  let tsOutput = `// AUTO-GENERATED from scripts/ingest_job_market.ts\n`;
  tsOutput += `// Based on ${allCareerData.reduce((s, c) => s + c.totalPostings, 0)} total real job postings\n`;
  tsOutput += `// Generated: ${new Date().toISOString()}\n\n`;
  tsOutput += `export interface SkillRequirementDraft {\n  name: string;\n  required: number;\n}\n\n`;
  tsOutput += `export const JOB_MARKET_SKILLS: Record<string, SkillRequirementDraft[]> = {\n`;

  for (const career of allCareerData) {
    tsOutput += `  // ── ${career.careerTitle} (${career.careerProfileId}) ──\n`;
    tsOutput += `  // Source: ${career.totalPostings} real job postings from ${career.fileSource}\n`;
    tsOutput += `  '${career.careerProfileId}': [\n`;
    for (const skill of career.skillRequirements) {
      tsOutput += `    { name: '${skill.name.replace(/'/g, "\\'")}', required: ${skill.required} }, // ${skill.marketPercentage}% market demand\n`;
    }
    tsOutput += `  ],\n\n`;
  }
  tsOutput += `};\n`;

  const tsPath = path.join(OUTPUT_DIR, 'job_market_skills.ts');
  fs.writeFileSync(tsPath, tsOutput, 'utf-8');
  console.log(`✅ TS skill arrays written to: ${tsPath}`);

  // ─── Output 3: Market data enrichment file ───
  let marketTs = `// ──────────────────────────────────────────────────────────────\n`;
  marketTs += `// Market Data Enrichment — AUTO-GENERATED\n`;
  marketTs += `// Provides real market insights per career profile\n`;
  marketTs += `// Generated: ${new Date().toISOString()}\n`;
  marketTs += `// ──────────────────────────────────────────────────────────────\n\n`;
  marketTs += `export interface MarketSkillData {\n  skill: string;\n  count: number;\n  percentage: number;\n}\n\n`;
  marketTs += `export interface CareerMarketInsight {\n  careerProfileId: string;\n  totalPostings: number;\n  topHardSkills: MarketSkillData[];\n  topSoftSkills: MarketSkillData[];\n  topCompanies: string[];\n  commonJobTitles: string[];\n}\n\n`;
  marketTs += `export const CAREER_MARKET_DATA: Record<string, CareerMarketInsight> = {\n`;

  for (const career of allCareerData) {
    const companies = [...new Set(career.jobPostings.map(p => p.company))].slice(0, 10);
    const titles = [...new Set(career.jobPostings.map(p => p.title))].slice(0, 8);

    marketTs += `  '${career.careerProfileId}': {\n`;
    marketTs += `    careerProfileId: '${career.careerProfileId}',\n`;
    marketTs += `    totalPostings: ${career.totalPostings},\n`;
    marketTs += `    topHardSkills: [\n`;
    career.hardSkills.slice(0, 10).forEach(s => {
      marketTs += `      { skill: '${s.skill.replace(/'/g, "\\'")}', count: ${s.count}, percentage: ${s.percentage} },\n`;
    });
    marketTs += `    ],\n`;
    marketTs += `    topSoftSkills: [\n`;
    career.softSkills.slice(0, 8).forEach(s => {
      marketTs += `      { skill: '${s.skill.replace(/'/g, "\\'")}', count: ${s.count}, percentage: ${s.percentage} },\n`;
    });
    marketTs += `    ],\n`;
    marketTs += `    topCompanies: [${companies.map(c => `'${c.replace(/'/g, "\\'")}'`).join(', ')}],\n`;
    marketTs += `    commonJobTitles: [${titles.map(t => `'${t.replace(/'/g, "\\'")}'`).join(', ')}],\n`;
    marketTs += `  },\n`;
  }

  marketTs += `};\n`;

  const marketPath = path.join(OUTPUT_DIR, 'careerMarketData.ts');
  fs.writeFileSync(marketPath, marketTs, 'utf-8');
  console.log(`✅ Market enrichment data written to: ${marketPath}`);

  // ─── Summary ───
  console.log('\n' + '═'.repeat(60));
  console.log('📋 INGESTION SUMMARY');
  console.log('═'.repeat(60));
  console.log(`Files processed: ${allCareerData.length}`);
  console.log(`Total job postings parsed: ${allCareerData.reduce((s, c) => s + c.totalPostings, 0)}`);
  console.log(`Careers with data: ${allCareerData.map(c => c.careerProfileId).join(', ')}`);
  console.log('═'.repeat(60));
}

main();
