import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ComprehensiveReportData } from './report_generator';
import { getDetailedSoftSkillAnalysis, SoftSkillDetailReport } from '@/data/sjtAnalysisData';

// McKinsey / BCG inspired subtle executive palette
const colors = {
  primary: '#1a1a2e',      // Dark executive navy
  secondary: '#2d4a8a',    // Deep classic blue
  accent: '#0e7490',       // Teal / Slate accent
  textDark: '#1e293b',     // Slate 800
  textMuted: '#64748b',    // Slate 500
  textLight: '#94a3b8',    // Slate 400
  border: '#cbd5e1',       // Slate 300
  borderLight: '#e2e8f0',  // Slate 200
  bgLight: '#f8fafc',      // Slate 50
  badgeRedBg: '#ffe4e6',
  badgeRedText: '#9f1239',
  badgeAmberBg: '#fef3c7',
  badgeAmberText: '#92400e',
  badgeGreenBg: '#dcfce7',
  badgeGreenText: '#166534',
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 40,
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: colors.textDark,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerOrg: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
    letterSpacing: 0.5,
  },
  headerMeta: {
    fontSize: 8,
    color: colors.textMuted,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  footerText: {
    fontSize: 7.5,
    color: colors.textLight,
  },
  sectionBadge: {
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    color: colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Times-Bold', // Serif for executive feel
    color: colors.primary,
    marginBottom: 4,
  },
  divider: {
    width: 32,
    height: 2,
    backgroundColor: colors.secondary,
    marginBottom: 14,
  },
  card: {
    backgroundColor: colors.bgLight,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: 5,
    paddingHorizontal: 6,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingVertical: 4.5,
    paddingHorizontal: 6,
  },
  tableRowAlt: {
    flexDirection: 'row',
    backgroundColor: colors.bgLight,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingVertical: 4.5,
    paddingHorizontal: 6,
  },
  thText: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: colors.textDark,
  },
  tdText: {
    fontSize: 8,
    color: colors.textDark,
  },
});

interface PdfDocumentProps {
  report: ComprehensiveReportData;
}

export function PdfDocument({ report }: PdfDocumentProps) {
  const TOTAL_PAGES = 11;

  // Fallback defensif untuk actionPlan & list
  const day30 = report.actionPlan?.day30 || {
    phaseTitle: 'Fondasi Esensial & Penutupan Gap Kritis',
    focusSkills: [],
    weeksFirstHalf: 'Mempelajari modul teoretis dan framework kerja standar industri.',
    weeksSecondHalf: 'Pengerjaan latihan mandiri terstruktur dan telaah studi kasus nyata.',
    milestone: 'Mampu mereplikasi 1 studi kasus industri standar dengan benar secara mandiri.',
  };

  const day60 = report.actionPlan?.day60 || {
    phaseTitle: 'Pengembangan Kompetensi Lanjutan & Integrasi',
    focusSkills: [],
    weeksFirstHalf: 'Eksplorasi teknik lanjutan dan praktik integrasi lintas-fitur.',
    weeksSecondHalf: 'Membangun mini-proyek mandiri untuk memvalidasi pemahaman teknis.',
    milestone: 'Menghasilkan 1 mini-proyek teruji yang mendemonstrasikan skill target.',
  };

  const day90 = report.actionPlan?.day90 || {
    phaseTitle: 'Konsolidasi & Kesiapan Kerja Profesional',
    focusSkills: [],
    weeksFirstHalf: 'Simulasi skenario kerja tim dan pemecahan kendala (troubleshooting).',
    weeksSecondHalf: 'Dokumentasi portofolio komprehensif dan persiapan wawancara teknis.',
    milestone: 'Portofolio siap presentasi dengan bukti kesiapan kerja level entry-level.',
  };

  const skillInterpretations = Array.isArray(report.skillInterpretations) ? report.skillInterpretations : [];
  const priorityList = Array.isArray(report.priorityList) ? report.priorityList : [];
  const skillResources = report.skillResources || {};

  // Soft Skills Analysis Data
  const softSkills: SoftSkillDetailReport[] =
    report.softSkillsAnalysis && report.softSkillsAnalysis.length > 0
      ? report.softSkillsAnalysis
      : getDetailedSoftSkillAnalysis({}, report.targetRole);

  const topSoftStrengths = softSkills.filter((s) => s.level >= 2).slice(0, 2);
  const softDevPriorities = softSkills.filter((s) => s.level <= 2).sort((a, b) => a.level - b.level).slice(0, 2);

  const Header = () => (
    <View style={styles.headerRow}>
      <Text style={styles.headerOrg}>GAPLESS ADVISORY • LAPORAN KESIAPAN KARIER</Text>
      <Text style={styles.headerMeta}>{report.reportNumber} • {report.generatedAt}</Text>
    </View>
  );

  const Footer = ({ page }: { page: number }) => (
    <View style={styles.footerRow}>
      <Text style={styles.footerText}>Rahasia &amp; Eksklusif untuk {report.userName}</Text>
      <Text style={styles.footerText}>Halaman {page} dari {TOTAL_PAGES}</Text>
    </View>
  );

  return (
    <Document title={`Gapless-Laporan-${report.careerSlug}-${report.reportNumber}`}>

      {/* ── HALAMAN 1: COVER ── */}
      <Page size="A4" style={[styles.page, { paddingVertical: 60, paddingHorizontal: 50 }]}>
        <View style={{ alignItems: 'center', marginTop: 30 }}>
          <Text style={{ fontSize: 13, fontFamily: 'Helvetica-Bold', color: colors.secondary, letterSpacing: 2, marginBottom: 4 }}>
            GAPLESS ADVISORY
          </Text>
          <Text style={{ fontSize: 9, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 1 }}>
            Career Readiness &amp; Competency Advisory
          </Text>
        </View>

        <View style={{ alignItems: 'center', marginVertical: 'auto', paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 24, fontFamily: 'Times-Bold', color: colors.primary, textAlign: 'center', marginBottom: 6 }}>
            Laporan Analisis Kesiapan Karier
          </Text>
          <Text style={{ fontSize: 11, color: colors.textMuted, textAlign: 'center', marginBottom: 20 }}>
            Penilaian Komprehensif Kompetensi Industri, Evaluasi Soft Skills &amp; Rencana Aksi Terarah
          </Text>

          <View style={{ width: 60, height: 1.5, backgroundColor: colors.secondary, marginBottom: 20 }} />

          <Text style={{ fontSize: 9, color: colors.textLight, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
            Disusun Khusus Untuk
          </Text>
          <Text style={{ fontSize: 20, fontFamily: 'Helvetica-Bold', color: colors.primary, marginBottom: 2 }}>
            {report.userName}
          </Text>
          {report.userEmail ? (
            <Text style={{ fontSize: 9, color: colors.textMuted, marginBottom: 12 }}>{report.userEmail}</Text>
          ) : null}

          <View style={{ backgroundColor: colors.bgLight, borderWidth: 1, borderColor: colors.borderLight, borderRadius: 16, paddingVertical: 6, paddingHorizontal: 16, marginTop: 10 }}>
            <Text style={{ fontSize: 10, color: colors.secondary, fontFamily: 'Helvetica-Bold' }}>
              Target Peran: {report.targetRole}
            </Text>
          </View>
        </View>

        <View style={{ borderTopWidth: 1, borderTopColor: colors.borderLight, paddingTop: 14 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={{ fontSize: 8, color: colors.textMuted }}>No: {report.reportNumber}</Text>
            <Text style={{ fontSize: 8, color: colors.textMuted }}>Diterbitkan: {report.generatedAt}</Text>
          </View>
          <Text style={{ fontSize: 6.5, color: colors.textLight, textAlign: 'justify', lineHeight: 1.3 }}>
            Disclaimer: Dokumen konsultasi ini di-generate berdasarkan hasil uji studi kasus industri, tes Situational Judgement (SJT 40 skenario), dan standar kompetensi O*NET (U.S. Department of Labor). Hasil merupakan analisis kesiapan kerja edukatif dan bukan instrumen psikotes klinis.
          </Text>
        </View>
      </Page>

      {/* ── HALAMAN 2: RINGKASAN EKSEKUTIF ── */}
      <Page size="A4" style={styles.page}>
        <View>
          <Header />
          <Text style={styles.sectionBadge}>Bagian 1</Text>
          <Text style={styles.sectionTitle}>Ringkasan Eksekutif</Text>
          <View style={styles.divider} />

          {/* Kartu Skor Kesiapan */}
          <View style={[styles.card, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14, marginBottom: 14 }]}>
            <View style={{ width: '60%' }}>
              <Text style={{ fontSize: 8, color: colors.textMuted, textTransform: 'uppercase', marginBottom: 2 }}>
                Skor Kesiapan Karier Keseluruhan
              </Text>
              <Text style={{ fontSize: 28, fontFamily: 'Helvetica-Bold', color: colors.secondary }}>
                {report.readinessScore}%
              </Text>
              <Text style={{ fontSize: 8.5, color: colors.textDark, marginTop: 4 }}>
                Status: <Text style={{ fontFamily: 'Helvetica-Bold' }}>{report.overallStatus}</Text>
              </Text>
            </View>

            <View style={{ width: '38%', borderLeftWidth: 1, borderLeftColor: colors.borderLight, paddingLeft: 12 }}>
              <Text style={{ fontSize: 7.5, color: colors.textMuted }}>Target Peran:</Text>
              <Text style={{ fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: colors.primary, marginBottom: 4 }}>
                {report.targetRole}
              </Text>
              <Text style={{ fontSize: 7.5, color: colors.textMuted }}>Archetype Dominan:</Text>
              <Text style={{ fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: colors.accent }}>
                {report.dominantTrait}
              </Text>
            </View>
          </View>

          {/* 3 Temuan Kunci */}
          <View style={styles.card}>
            <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: colors.primary, marginBottom: 6 }}>
              3 Temuan Kunci Asesmen:
            </Text>

            <View style={{ marginBottom: 4 }}>
              <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#15803d' }}>
                • Kekuatan Utama:
              </Text>
              <Text style={{ fontSize: 8, color: colors.textDark, marginLeft: 8 }}>
                {report.keyStrengths.length > 0 ? report.keyStrengths.join(', ') : 'Fondasi kepribadian kerja yang baik.'}
              </Text>
            </View>

            <View style={{ marginBottom: 4 }}>
              <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#b91c1c' }}>
                • Gap Prioritas:
              </Text>
              <Text style={{ fontSize: 8, color: colors.textDark, marginLeft: 8 }}>
                {report.priorityGaps.length > 0 ? report.priorityGaps.join(', ') : 'Tidak ada gap kritis terdeteksi.'}
              </Text>
            </View>

            <View>
              <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: colors.secondary }}>
                • Rekomendasi Pertama:
              </Text>
              <Text style={{ fontSize: 8, color: colors.textDark, marginLeft: 8 }}>
                {report.firstActionRecommendation}
              </Text>
            </View>
          </View>

          {/* Estimasi Jam */}
          <View style={[styles.card, { backgroundColor: '#1a1a2e', padding: 12 }]}>
            <Text style={{ fontSize: 8, color: '#93c5fd', textTransform: 'uppercase', marginBottom: 2 }}>
              Estimasi Waktu Menuju Siap Kerja
            </Text>
            <Text style={{ fontSize: 18, fontFamily: 'Helvetica-Bold', color: '#ffffff', marginBottom: 3 }}>
              {report.totalEstHoursMin} – {report.totalEstHoursMax} Jam Pembelajaran
            </Text>
            <Text style={{ fontSize: 7.5, color: '#cbd5e1', lineHeight: 1.3 }}>
              Setara dengan ~{report.totalEstWeeksMin} – {report.totalEstWeeksMax} minggu pembelajaran terstruktur dengan asumsi komitmen 5 jam/minggu (modul teori, latihan soft skills, dan proyek terapan).
            </Text>
          </View>
        </View>

        <Footer page={2} />
      </Page>

      {/* ── HALAMAN 3: ANALISIS SKILL GAP DETAIL (HARD SKILLS) ── */}
      <Page size="A4" style={styles.page}>
        <View>
          <Header />
          <Text style={styles.sectionBadge}>Bagian 2</Text>
          <Text style={styles.sectionTitle}>Analisis Kesenjangan Kompetensi (Skill Gap)</Text>
          <View style={styles.divider} />

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.thText, { flex: 3 }]}>Kompetensi Teknis</Text>
              <Text style={[styles.thText, { flex: 1.2, textAlign: 'center' }]}>Level Kamu</Text>
              <Text style={[styles.thText, { flex: 1.2, textAlign: 'center' }]}>Level Target</Text>
              <Text style={[styles.thText, { flex: 0.9, textAlign: 'center' }]}>Gap</Text>
              <Text style={[styles.thText, { flex: 1.2, textAlign: 'center' }]}>Prioritas</Text>
              <Text style={[styles.thText, { flex: 1.3, textAlign: 'right' }]}>Est. Waktu</Text>
            </View>

            {report.skillGapTable.map((item, idx) => (
              <View key={item.name} style={idx % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
                <Text style={[styles.tdText, { flex: 3, fontFamily: 'Helvetica-Bold' }]}>{item.name}</Text>
                <Text style={[styles.tdText, { flex: 1.2, textAlign: 'center' }]}>Level {item.current}</Text>
                <Text style={[styles.tdText, { flex: 1.2, textAlign: 'center', color: colors.textMuted }]}>Level {item.required}</Text>
                <Text style={[styles.tdText, { flex: 0.9, textAlign: 'center', fontFamily: 'Helvetica-Bold', color: item.gap < 0 ? '#b91c1c' : '#15803d' }]}>
                  {item.gap > 0 ? `+${item.gap}` : item.gap}
                </Text>
                <Text style={[styles.tdText, { flex: 1.2, textAlign: 'center', fontFamily: 'Helvetica-Bold' }]}>
                  {item.priority === 'Kritis' ? '[Kritis]' : item.priority === 'Penting' ? '[Penting]' : '[Sesuai]'}
                </Text>
                <Text style={[styles.tdText, { flex: 1.3, textAlign: 'right', color: colors.textMuted }]}>
                  {item.hoursMin > 0 ? `${item.weeksMin}–${item.weeksMax} minggu` : 'Tercapai'}
                </Text>
              </View>
            ))}
          </View>

          <View style={[styles.card, { marginTop: 4 }]}>
            <Text style={{ fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: colors.primary, marginBottom: 4 }}>
              Keterangan Penilaian Prioritas:
            </Text>
            <Text style={{ fontSize: 7.5, color: colors.textMuted, marginBottom: 2 }}>
              • [Kritis]: Selisih gap &gt;= 2 level atau skill dengan bobot esensial tinggi di industri.
            </Text>
            <Text style={{ fontSize: 7.5, color: colors.textMuted, marginBottom: 2 }}>
              • [Penting]: Selisih gap 1 level pada target menengah yang perlu ditingkatkan untuk efisiensi kerja.
            </Text>
            <Text style={{ fontSize: 7.5, color: colors.textMuted }}>
              • [Sesuai]: Telah memenuhi standar minimum yang dipersyaratkan peran entry-level.
            </Text>
          </View>
        </View>

        <Footer page={3} />
      </Page>

      {/* ── HALAMAN 4: EVALUASI 8 SOFT SKILLS & MATRIKS PERILAKU (SJT) ── */}
      <Page size="A4" style={styles.page}>
        <View>
          <Header />
          <Text style={styles.sectionBadge}>Bagian 3</Text>
          <Text style={styles.sectionTitle}>Evaluasi 8 Soft Skills &amp; Situational Judgement</Text>
          <View style={styles.divider} />

          <Text style={{ fontSize: 8, color: colors.textMuted, marginBottom: 8, lineHeight: 1.3 }}>
            Hasil pemetaan psikometri perilaku alami terhadap 40 skenario industri nyata untuk peran {report.targetRole}.
          </Text>

          {/* Tabel Matriks 8 Dimensi Soft Skills */}
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.thText, { flex: 2.5 }]}>Dimensi Soft Skill (SJT)</Text>
              <Text style={[styles.thText, { flex: 1.8, textAlign: 'center' }]}>Kematangan</Text>
              <Text style={[styles.thText, { flex: 1, textAlign: 'center' }]}>Skor %</Text>
              <Text style={[styles.thText, { flex: 3.5 }]}>Karakteristik Respon Alami di Dunia Kerja</Text>
            </View>

            {softSkills.map((item, idx) => (
              <View key={item.skill} style={idx % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
                <Text style={[styles.tdText, { flex: 2.5, fontFamily: 'Helvetica-Bold' }]}>{item.shortLabel}</Text>
                <Text style={[styles.tdText, { flex: 1.8, textAlign: 'center', fontSize: 7.5 }]}>{item.maturityStatus}</Text>
                <Text style={[styles.tdText, { flex: 1, textAlign: 'center', fontFamily: 'Helvetica-Bold' }]}>{item.scorePercentage}%</Text>
                <Text style={[styles.tdText, { flex: 3.5, fontSize: 7, color: colors.textDark, lineHeight: 1.25 }]}>
                  {item.behavioralTendency.slice(0, 140)}...
                </Text>
              </View>
            ))}
          </View>

          {/* 2 Kekuatan Utama */}
          <View style={[styles.card, { marginTop: 4 }]}>
            <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#15803d', marginBottom: 4 }}>
              Analisis 2 Kekuatan Perilaku Terverifikasi di Tempat Kerja:
            </Text>
            {topSoftStrengths.map((str) => (
              <View key={str.skill} style={{ marginBottom: 6 }}>
                <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: colors.primary }}>
                  • {str.label} ({str.scorePercentage}% — {str.levelLabel})
                </Text>
                <Text style={{ fontSize: 7.5, color: colors.textDark, marginLeft: 8, lineHeight: 1.25 }}>
                  {str.behavioralTendency}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <Footer page={4} />
      </Page>

      {/* ── HALAMAN 5: BLIND SPOTS & PANDUAN INTERVIEW STAR METHOD ── */}
      <Page size="A4" style={styles.page}>
        <View>
          <Header />
          <Text style={styles.sectionBadge}>Bagian 4</Text>
          <Text style={styles.sectionTitle}>Mitigasi Risiko Kerja (Blind Spots) &amp; Interview STAR</Text>
          <View style={styles.divider} />

          {/* Peringatan Blind Spots */}
          <View style={[styles.card, { backgroundColor: '#fff1f2', borderColor: '#fecdd3', marginBottom: 10 }]}>
            <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#9f1239', marginBottom: 4 }}>
              Peringatan Dini: 2 Area Pengembangan Prioritas &amp; Blind Spots:
            </Text>
            {softDevPriorities.map((dev) => (
              <View key={dev.skill} style={{ marginBottom: 6 }}>
                <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: colors.primary }}>
                  • {dev.label} ({dev.levelLabel})
                </Text>
                <Text style={{ fontSize: 7.5, color: '#881337', marginLeft: 8 }}>
                  Risiko: {dev.blindSpotsAndRisks.join(' ')}
                </Text>
                <Text style={{ fontSize: 7.5, color: colors.secondary, marginLeft: 8, marginTop: 1 }}>
                  Latihan Mingguan: {dev.actionableCoaching}
                </Text>
              </View>
            ))}
          </View>

          {/* Simulasi Jawaban Interview STAR Method */}
          <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: colors.primary, marginBottom: 6 }}>
            Simulasi Jawaban Wawancara Perilaku (Metode STAR untuk {report.targetRole}):
          </Text>

          {softSkills.slice(0, 2).map((item) => (
            <View key={item.skill} style={[styles.card, { marginBottom: 8 }]}>
              <Text style={{ fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: colors.secondary, marginBottom: 2 }}>
                Dimensi: {item.label}
              </Text>
              <Text style={{ fontSize: 7.5, color: colors.textMuted, fontStyle: 'italic', marginBottom: 4 }}>
                Pertanyaan HRD: &quot;{item.interviewTalkingPoint.promptQuestion}&quot;
              </Text>

              <View style={{ backgroundColor: '#ffffff', borderWidth: 1, borderColor: colors.borderLight, borderRadius: 4, padding: 6 }}>
                <Text style={{ fontSize: 7.5, color: colors.textDark, marginBottom: 2 }}>
                  <Text style={{ fontFamily: 'Helvetica-Bold', color: colors.primary }}>S (Situation): </Text>
                  {item.interviewTalkingPoint.starStory.situation}
                </Text>
                <Text style={{ fontSize: 7.5, color: colors.textDark, marginBottom: 2 }}>
                  <Text style={{ fontFamily: 'Helvetica-Bold', color: colors.primary }}>T (Task): </Text>
                  {item.interviewTalkingPoint.starStory.task}
                </Text>
                <Text style={{ fontSize: 7.5, color: colors.textDark, marginBottom: 2 }}>
                  <Text style={{ fontFamily: 'Helvetica-Bold', color: colors.primary }}>A (Action): </Text>
                  {item.interviewTalkingPoint.starStory.action}
                </Text>
                <Text style={{ fontSize: 7.5, color: colors.textDark }}>
                  <Text style={{ fontFamily: 'Helvetica-Bold', color: colors.primary }}>R (Result): </Text>
                  {item.interviewTalkingPoint.starStory.result}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <Footer page={5} />
      </Page>

      {/* ── HALAMAN 6: INTERPRETASI MENDALAM PER SKILL (HARD SKILLS) ── */}
      <Page size="A4" style={styles.page}>
        <View>
          <Header />
          <Text style={styles.sectionBadge}>Bagian 5</Text>
          <Text style={styles.sectionTitle}>Interpretasi Mendalam Kompetensi Teknis</Text>
          <View style={styles.divider} />

          {skillInterpretations.map((item) => (
            <View key={item.skillName} style={[styles.card, { marginBottom: 8 }]}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: colors.primary }}>{item.skillName}</Text>
                <Text style={{ fontSize: 8, color: colors.secondary, fontFamily: 'Helvetica-Bold' }}>
                  Level {item.currentLevel} dari Target Level {item.targetLevel}
                </Text>
              </View>

              <Text style={{ fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: '#15803d', marginTop: 2 }}>
                Di Level {item.currentLevel} Sudah Mampu:
              </Text>
              {item.canDo.map((c, i) => (
                <Text key={i} style={{ fontSize: 7.5, color: colors.textDark, marginLeft: 6 }}>• {c}</Text>
              ))}

              <Text style={{ fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: '#b91c1c', marginTop: 4 }}>
                Kebutuhan Level {item.targetLevel} (Belum Dikuasai):
              </Text>
              {item.cannotDo.map((c, i) => (
                <Text key={i} style={{ fontSize: 7.5, color: colors.textDark, marginLeft: 6 }}>• {c}</Text>
              ))}

              <View style={{ backgroundColor: '#f1f5f9', padding: 4, borderRadius: 3, marginTop: 4 }}>
                <Text style={{ fontSize: 7.5, color: colors.textDark }}>
                  <Text style={{ fontFamily: 'Helvetica-Bold' }}>Contoh Tugas di Industri:</Text> {item.industryExample}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <Footer page={6} />
      </Page>

      {/* ── HALAMAN 7: URUTAN PRIORITAS DENGAN ALASAN ── */}
      <Page size="A4" style={styles.page}>
        <View>
          <Header />
          <Text style={styles.sectionBadge}>Bagian 6</Text>
          <Text style={styles.sectionTitle}>Urutan Prioritas Pengembangan</Text>
          <View style={styles.divider} />

          {priorityList.map((item) => (
            <View key={item.rank} style={[styles.card, { marginBottom: 8 }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <View style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: colors.secondary, alignItems: 'center', justifyContent: 'center', marginRight: 8 }}>
                  <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#ffffff' }}>{item.rank}</Text>
                </View>
                <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: colors.primary }}>{item.skillName}</Text>
              </View>

              <Text style={{ fontSize: 8, color: colors.textDark, marginBottom: 2 }}>
                <Text style={{ fontFamily: 'Helvetica-Bold' }}>Alasan Prioritas:</Text> {item.reason}
              </Text>
              <Text style={{ fontSize: 8, color: '#b91c1c' }}>
                <Text style={{ fontFamily: 'Helvetica-Bold' }}>Risiko Jika Tidak Ditutup:</Text> {item.consequenceIfNotClosed}
              </Text>
            </View>
          ))}
        </View>

        <Footer page={7} />
      </Page>

      {/* ── HALAMAN 8: ESTIMASI WAKTU BELAJAR REALISTIS ── */}
      <Page size="A4" style={styles.page}>
        <View>
          <Header />
          <Text style={styles.sectionBadge}>Bagian 7</Text>
          <Text style={styles.sectionTitle}>Estimasi Waktu Belajar Realistis</Text>
          <View style={styles.divider} />

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.thText, { flex: 3 }]}>Kompetensi</Text>
              <Text style={[styles.thText, { flex: 1.5, textAlign: 'center' }]}>Gap</Text>
              <Text style={[styles.thText, { flex: 2, textAlign: 'center' }]}>Rentang Jam Belajar</Text>
              <Text style={[styles.thText, { flex: 2, textAlign: 'right' }]}>Durasi (5 Jam/Mgg)</Text>
            </View>

            {report.skillGapTable.map((item, idx) => (
              <View key={item.name} style={idx % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
                <Text style={[styles.tdText, { flex: 3, fontFamily: 'Helvetica-Bold' }]}>{item.name}</Text>
                <Text style={[styles.tdText, { flex: 1.5, textAlign: 'center' }]}>
                  {item.gap < 0 ? `${Math.abs(item.gap)} Level` : '0 Level'}
                </Text>
                <Text style={[styles.tdText, { flex: 2, textAlign: 'center' }]}>
                  {item.hoursMin > 0 ? `${item.hoursMin} – ${item.hoursMax} Jam` : 'Tercapai'}
                </Text>
                <Text style={[styles.tdText, { flex: 2, textAlign: 'right', fontFamily: 'Helvetica-Bold' }]}>
                  {item.weeksMin > 0 ? `${item.weeksMin} – ${item.weeksMax} Minggu` : 'Siap Kerja'}
                </Text>
              </View>
            ))}
          </View>

          <View style={[styles.card, { backgroundColor: '#1a1a2e', padding: 12, marginTop: 10 }]}>
            <Text style={{ fontSize: 8, color: '#93c5fd', textTransform: 'uppercase', marginBottom: 2 }}>
              Total Jam Belajar yang Dibutuhkan
            </Text>
            <Text style={{ fontSize: 20, fontFamily: 'Helvetica-Bold', color: '#ffffff', marginBottom: 4 }}>
              {report.totalEstHoursMin} – {report.totalEstHoursMax} Jam Pembelajaran
            </Text>
            <Text style={{ fontSize: 8, color: '#cbd5e1' }}>
              Estimasi kalender: ~{report.totalEstWeeksMin} – {report.totalEstWeeksMax} minggu dengan komitmen disiplin 5 jam per minggu.
            </Text>
          </View>
        </View>

        <Footer page={8} />
      </Page>

      {/* ── HALAMAN 9: RENCANA TINDAKAN 30/60/90 HARI ── */}
      <Page size="A4" style={styles.page}>
        <View>
          <Header />
          <Text style={styles.sectionBadge}>Bagian 8</Text>
          <Text style={styles.sectionTitle}>Rencana Tindakan 30 / 60 / 90 Hari</Text>
          <View style={styles.divider} />

          {/* 30 Hari */}
          <View style={[styles.card, { marginBottom: 10 }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
              <Text style={{ fontSize: 9.5, fontFamily: 'Helvetica-Bold', color: colors.secondary }}>
                Hari 1 – 30: {day30.phaseTitle}
              </Text>
              <Text style={{ fontSize: 7.5, color: colors.textMuted }}>Fase Fondasi</Text>
            </View>
            <Text style={{ fontSize: 7.5, color: colors.textDark, marginBottom: 2 }}>
              <Text style={{ fontFamily: 'Helvetica-Bold' }}>Minggu 1–2:</Text> {day30.weeksFirstHalf}
            </Text>
            <Text style={{ fontSize: 7.5, color: colors.textDark, marginBottom: 3 }}>
              <Text style={{ fontFamily: 'Helvetica-Bold' }}>Minggu 3–4:</Text> {day30.weeksSecondHalf}
            </Text>
            <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: colors.accent }}>
              Milestone Akhir 30 Hari: {day30.milestone}
            </Text>
          </View>

          {/* 60 Hari */}
          <View style={[styles.card, { marginBottom: 10 }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
              <Text style={{ fontSize: 9.5, fontFamily: 'Helvetica-Bold', color: colors.secondary }}>
                Hari 31 – 60: {day60.phaseTitle}
              </Text>
              <Text style={{ fontSize: 7.5, color: colors.textMuted }}>Fase Integrasi</Text>
            </View>
            <Text style={{ fontSize: 7.5, color: colors.textDark, marginBottom: 2 }}>
              <Text style={{ fontFamily: 'Helvetica-Bold' }}>Minggu 5–6:</Text> {day60.weeksFirstHalf}
            </Text>
            <Text style={{ fontSize: 7.5, color: colors.textDark, marginBottom: 3 }}>
              <Text style={{ fontFamily: 'Helvetica-Bold' }}>Minggu 7–8:</Text> {day60.weeksSecondHalf}
            </Text>
            <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: colors.accent }}>
              Milestone Akhir 60 Hari: {day60.milestone}
            </Text>
          </View>

          {/* 90 Hari */}
          <View style={[styles.card, { marginBottom: 10 }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
              <Text style={{ fontSize: 9.5, fontFamily: 'Helvetica-Bold', color: colors.secondary }}>
                Hari 61 – 90: {day90.phaseTitle}
              </Text>
              <Text style={{ fontSize: 7.5, color: colors.textMuted }}>Fase Kesiapan Kerja</Text>
            </View>
            <Text style={{ fontSize: 7.5, color: colors.textDark, marginBottom: 2 }}>
              <Text style={{ fontFamily: 'Helvetica-Bold' }}>Minggu 9–10:</Text> {day90.weeksFirstHalf}
            </Text>
            <Text style={{ fontSize: 7.5, color: colors.textDark, marginBottom: 3 }}>
              <Text style={{ fontFamily: 'Helvetica-Bold' }}>Minggu 11–12:</Text> {day90.weeksSecondHalf}
            </Text>
            <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#15803d' }}>
              Milestone Akhir 90 Hari: {day90.milestone}
            </Text>
          </View>
        </View>

        <Footer page={9} />
      </Page>

      {/* ── HALAMAN 10: REKOMENDASI SUMBER BELAJAR TERKURASI ── */}
      <Page size="A4" style={styles.page}>
        <View>
          <Header />
          <Text style={styles.sectionBadge}>Bagian 9</Text>
          <Text style={styles.sectionTitle}>Rekomendasi Sumber Belajar Terkurasi</Text>
          <View style={styles.divider} />

          {Object.entries(skillResources).map(([skill, resources]) => (
            <View key={skill} style={[styles.card, { marginBottom: 8 }]}>
              <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: colors.primary, marginBottom: 4 }}>
                Materi untuk: {skill}
              </Text>

              {resources.length > 0 ? (
                resources.map((res, i) => (
                  <View key={i} style={{ marginBottom: 3 }}>
                    <Text style={{ fontSize: 8, color: colors.textDark }}>
                      • <Text style={{ fontFamily: 'Helvetica-Bold' }}>{res.title}</Text> ({res.provider} — {res.isFree ? 'Gratis' : 'Berbayar'})
                    </Text>
                    <Text style={{ fontSize: 7, color: colors.secondary, marginLeft: 8 }}>
                      {res.url}
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={{ fontSize: 7.5, color: colors.textMuted, fontStyle: 'italic' }}>
                  Akses modul kurikulum terpandu pada Learning Roadmap Gapless.
                </Text>
              )}
            </View>
          ))}

          <Text style={{ fontSize: 7.5, color: colors.textMuted, fontStyle: 'italic', marginTop: 6 }}>
            Catatan: Sumber belajar diperbarui berkala. Akses platform Gapless di gapless.id/roadmap untuk modul interaktif.
          </Text>
        </View>

        <Footer page={10} />
      </Page>

      {/* ── HALAMAN 11: PENUTUP & METODOLOGI ── */}
      <Page size="A4" style={styles.page}>
        <View>
          <Header />
          <Text style={styles.sectionBadge}>Bagian 10</Text>
          <Text style={styles.sectionTitle}>Penutup &amp; Metodologi Asesmen</Text>
          <View style={styles.divider} />

          <View style={[styles.card, { marginBottom: 10 }]}>
            <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: colors.primary, marginBottom: 4 }}>
              Ringkasan Kesimpulan
            </Text>
            <Text style={{ fontSize: 8, color: colors.textDark, textAlign: 'justify', lineHeight: 1.3 }}>
              Berdasarkan asesmen menyeluruh ini, keunggulan kariermu sebagai {report.targetRole} bertumpu pada perpaduan penguasaan skill teknis dan kematangan respon psikometri 8 dimensi soft skills. Mengintegrasikan kekuatan utama sembari menutup celah blind spots melalui latihan terstruktur akan menempatkanmu di jajaran talenta paling siap kerja.
            </Text>
            <Text style={{ fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: colors.secondary, marginTop: 6 }}>
              Lanjutkan perjalanan kariermu di: gapless.id/roadmap
            </Text>
          </View>

          <View style={[styles.card, { marginBottom: 12 }]}>
            <Text style={{ fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: colors.primary, marginBottom: 4 }}>
              Metodologi Asesmen Lengkap
            </Text>
            <Text style={{ fontSize: 7.5, color: colors.textMuted, textAlign: 'justify', lineHeight: 1.35, marginBottom: 3 }}>
              Laporan ini disusun berdasarkan: (1) evaluasi studi kasus industri dan Situational Judgement Test (SJT 40 skenario) yang memetakan kecenderungan respon kerja alami, (2) data rujukan O*NET (Occupational Information Network) dari U.S. Department of Labor sebagai acuan taksonomi kompetensi standar industri, dan (3) analisis inferensi kecerdasan buatan terverifikasi.
            </Text>
            <Text style={{ fontSize: 7.5, color: colors.textMuted, textAlign: 'justify', lineHeight: 1.35 }}>
              Laporan ini merupakan instrumen akselerasi edukatif dan bukan pengganti psikotes klinis medis. Data O*NET diselaraskan dengan kebutuhan bursa kerja modern oleh tim kurikulum Gapless.
            </Text>
          </View>

          <View style={{ borderTopWidth: 1, borderTopColor: colors.borderLight, paddingTop: 10 }}>
            <Text style={{ fontSize: 8, color: colors.textDark }}>Nomor Laporan: {report.reportNumber}</Text>
            <Text style={{ fontSize: 8, color: colors.textDark }}>Diterbitkan: {report.generatedAt}</Text>
          </View>
        </View>

        <View>
          <Text style={{ fontSize: 7.5, color: colors.textLight, textAlign: 'center', marginBottom: 4 }}>
            © {new Date().getFullYear()} Gapless. Laporan ini dibuat khusus untuk {report.userName} dan tidak untuk disebarluaskan.
          </Text>
          <Footer page={11} />
        </View>
      </Page>

    </Document>
  );
}
