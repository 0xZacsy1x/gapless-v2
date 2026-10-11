import * as XLSX from 'xlsx';
import * as path from 'path';
import { db } from '../src/db';
import { activities } from '../src/db/schema';
import { eq } from 'drizzle-orm';

function parseExcelDate(val: any): Date | null {
  if (!val) return null;
  if (typeof val === 'number') {
    return new Date((val - 25569) * 86400 * 1000);
  }
  if (typeof val === 'string') {
    const s = val.trim();
    if (s.toLowerCase().includes('pantau') || s.toLowerCase().includes('berkala') || s === '-') {
      return null;
    }
    const d = new Date(s);
    if (!isNaN(d.getTime())) return d;
  }
  return null;
}

function normalizeUrl(url?: string | null): string | null {
  if (!url) return null;
  const s = url.trim();
  if (!s || s === '-') return null;
  if (s.startsWith('http://') || s.startsWith('https://')) return s;
  return `https://${s}`;
}

async function main() {
  const filePath = path.join(process.cwd(), 'data/activities/rekomendasi_kegiatan.xlsx');
  console.log(`📖 Reading Excel file from: ${filePath}`);
  
  const wb = XLSX.readFile(filePath);
  const sheetName = wb.SheetNames[0];
  const ws = wb.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json<any>(ws);

  console.log(`📊 Total rows found: ${rows.length}`);

  // Hapus sample dummy activities terdahulu agar bersih
  const deletedOld = await db.delete(activities).where(eq(activities.isSample, true));
  console.log(`🧹 Cleaned up sample placeholder activities`);

  let insertedCount = 0;

  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    const rawCategory = (r['Kategori'] || '').toString().trim().toLowerCase();
    
    let type = 'development_program';
    if (rawCategory.includes('lomba') || rawCategory.includes('kompetisi') || rawCategory.includes('hackathon')) {
      type = 'lomba';
    } else if (rawCategory.includes('volunteer') || rawCategory.includes('sukarelawan')) {
      type = 'volunteer';
    } else if (rawCategory.includes('organisasi')) {
      type = 'organisasi';
    } else if (rawCategory.includes('development') || rawCategory.includes('program') || rawCategory.includes('bootcamp')) {
      type = 'development_program';
    }

    const title = (r['Nama kegiatan'] || '').toString().trim();
    if (!title) continue;

    const organizer = (r['Penyelenggara'] || '').toString().trim();
    const description = (r['Deskripsi singkat'] || '').toString().trim();

    // Soft skill tags
    const competencyTags = (r['Kompetensi soft skill yang diasah'] || '')
      .toString()
      .split(/,|\n/)
      .map((s: string) => s.trim())
      .filter(Boolean);

    // Hard skill tags (cleaning bullets)
    const skillTags = (r['Hard skill yang diasah'] || '')
      .toString()
      .split(/\n|•/)
      .map((s: string) => s.replace(/^[•\-\*\s]+/, '').trim())
      .filter(Boolean);

    // Relevant roles
    const relevantRoles = (r['Role yang relevan'] || '')
      .toString()
      .split(/,|\n/)
      .map((s: string) => s.trim())
      .filter(Boolean);

    const fee = (r['Biaya'] || 'Gratis').toString().trim();
    const semester = (r['Semester'] || '').toString().trim();
    const location = (r['Lokasi / cakupan'] || 'Nasional').toString().trim();
    const deadline = parseExcelDate(r['Deadline pendaftaran']);
    const registrationUrl = normalizeUrl(r['Link pendaftaran']);
    const organizerContactServer = (r['Kontak penyelenggara'] || '').toString().trim();
    const isFeatured = (r['Featured listing?'] || '').toString().trim().toLowerCase() === 'yes';

    await db.insert(activities).values({
      title,
      type,
      organizer,
      description,
      competencyTags,
      skillTags,
      relevantRoles,
      fee,
      semester,
      location,
      deadline,
      registrationUrl,
      matchPercent: isFeatured ? 96 : 88,
      isSample: false,
      isActive: true,
      sortOrder: i + 1,
      organizerContactServer,
    });

    insertedCount++;
    console.log(`  ✅ [${type}] ${title} (${organizer})`);
  }

  console.log(`\n🎉 Berhasil mengimpor ${insertedCount} kegiatan riil ke database!`);
}

main().then(() => process.exit(0)).catch(err => {
  console.error('❌ Error during ingestion:', err);
  process.exit(1);
});
