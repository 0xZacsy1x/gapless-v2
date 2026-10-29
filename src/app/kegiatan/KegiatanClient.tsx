'use client';

import { useState } from 'react';
import {
  Calendar, Award, Bookmark, ExternalLink, Filter,
  CheckCircle2, Clock, Target, Lock, ArrowUpRight,
  Search, Users, Trophy, HeartHandshake, Building2, MapPin, Tag, GraduationCap, Star
} from 'lucide-react';
import Link from 'next/link';

export interface ActivityItem {
  id: string;
  title: string;
  type: string;
  organizer?: string | null;
  description: string | null;
  competencyTags: string[] | null;
  skillTags: string[] | null;
  relevantRoles?: string[] | null;
  fee?: string | null;
  semester?: string | null;
  location?: string | null;
  deadline: Date | string | null;
  registrationUrl: string | null;
  matchPercent: number | null;
  isSample: boolean;
  isRoleMatch?: boolean;
}

interface EvidenceItem {
  id: string;
  activityId: string;
  evidenceUrl: string;
  status: string;
  confirmedAt: Date | string | null;
  isSampleConfirmation: boolean | null;
}

interface Props {
  activities: ActivityItem[];
  savedIds: string[];
  evidenceMap: Record<string, EvidenceItem>;
  isPro: boolean;
  lockedCount: number;
  monthlyQuota: number;
  userCareerTitle?: string | null;
}

export function KegiatanClient({
  activities,
  savedIds: initialSavedIds,
  evidenceMap,
  isPro,
  lockedCount,
  monthlyQuota,
  userCareerTitle,
}: Props) {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set(initialSavedIds));

  const toggleSave = async (activityId: string) => {
    const isSaved = savedIds.has(activityId);
    const nextSaved = new Set(savedIds);
    if (isSaved) {
      nextSaved.delete(activityId);
    } else {
      nextSaved.add(activityId);
    }
    setSavedIds(nextSaved);

    try {
      await fetch(`/api/activities/${activityId}/save`, {
        method: isSaved ? 'DELETE' : 'POST',
      });
    } catch (e) {
      console.error('Failed to toggle save', e);
    }
  };

  const handleRegisterClick = (activityId: string, url: string | null) => {
    if (!url) return;
    // Log affiliate / outgoing click
    fetch(`/api/activities/${activityId}/click`, { method: 'POST' }).catch(() => {});
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Filter list
  const filtered = activities.filter((act) => {
    if (selectedType === 'saved' && !savedIds.has(act.id)) return false;
    if (selectedType === 'role_match' && !act.isRoleMatch) return false;
    if (
      selectedType !== 'all' &&
      selectedType !== 'saved' &&
      selectedType !== 'role_match' &&
      act.type !== selectedType
    ) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = act.title.toLowerCase().includes(q);
      const matchDesc = act.description?.toLowerCase().includes(q) || false;
      const matchOrganizer = act.organizer?.toLowerCase().includes(q) || false;
      const matchLocation = act.location?.toLowerCase().includes(q) || false;
      const matchTags =
        act.competencyTags?.some((t) => t.toLowerCase().includes(q)) ||
        act.skillTags?.some((t) => t.toLowerCase().includes(q)) ||
        act.relevantRoles?.some((r) => r.toLowerCase().includes(q));
      return matchTitle || matchDesc || matchOrganizer || matchLocation || matchTags;
    }
    return true;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'development_program':
      case 'program':
        return <GraduationCap className="w-4 h-4 text-slate-700" />;
      case 'organisasi':
        return <Users className="w-4 h-4 text-slate-700" />;
      case 'lomba':
        return <Trophy className="w-4 h-4 text-slate-700" />;
      case 'volunteer':
        return <HeartHandshake className="w-4 h-4 text-slate-700" />;
      default:
        return <Calendar className="w-4 h-4 text-slate-700" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'development_program':
      case 'program':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'organisasi':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'lomba':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'volunteer':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'development_program':
      case 'program':
        return 'Development Program';
      case 'organisasi':
        return 'Organisasi';
      case 'lomba':
        return 'Lomba / Kompetisi';
      case 'volunteer':
        return 'Volunteer';
      default:
        return type;
    }
  };

  const formatDeadline = (d: Date | string | null) => {
    if (!d) return 'Pantau Berkala';
    const date = new Date(d);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Jumlah kegiatan yang cocok role
  const roleMatchCount = activities.filter((a) => a.isRoleMatch).length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-blue-50 text-[#0066FF]">
              <Calendar className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-slate-900">Rekomendasi Kegiatan</h1>
          </div>
          <p className="text-sm text-slate-600">
            Katalog kegiatan terkurasi (Development Program, Lomba, dan Volunteer) untuk mengasah kepemimpinan, kompetensi industri, dan portofolio nyata.
          </p>
        </div>

        {isPro && userCareerTitle ? (
          <div className="px-3.5 py-2 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
            <Target className="w-4 h-4 text-amber-700 shrink-0" />
            <div>
              <span className="font-bold text-slate-900">Pro Rekomendasi Aktif:</span> Dikalibrasi untuk{' '}
              <span className="font-semibold text-blue-700">{userCareerTitle.split(' / ')[0]}</span>
            </div>
          </div>
        ) : null}
      </div>

      {/* Filter Bar & Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin text-xs">
          {[
            { id: 'all', label: 'Semua' },
            ...(userCareerTitle && roleMatchCount > 0
              ? [{ id: 'role_match', label: `Sesuai Karier (${roleMatchCount})`, isHighlight: true }]
              : []),
            { id: 'development_program', label: 'Development Program' },
            { id: 'lomba', label: 'Lomba / Kompetisi' },
            { id: 'volunteer', label: 'Volunteer' },
            { id: 'organisasi', label: 'Organisasi' },
            { id: 'saved', label: `Tersimpan (${savedIds.size})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedType(tab.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedType === tab.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tab.isHighlight && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari kegiatan, role, skill, atau kota..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
          />
        </div>
      </div>

      {/* Grid of Activities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((act) => {
          const isSaved = savedIds.has(act.id);
          const evidence = evidenceMap[act.id];

          return (
            <div
              key={act.id}
              className={`bg-white rounded-2xl p-5 border shadow-sm flex flex-col justify-between transition-all group ${
                act.isRoleMatch
                  ? 'border-blue-200 hover:border-blue-300 ring-1 ring-blue-100'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${getTypeBadge(
                        act.type
                      )}`}
                    >
                      {getTypeIcon(act.type)}
                      <span>{getTypeLabel(act.type)}</span>
                    </span>

                    {act.isRoleMatch ? (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                        <Target className="w-3 h-3 text-amber-600" />
                        Rekomendasi Role
                      </span>
                    ) : null}

                    {act.matchPercent && act.matchPercent > 0 ? (
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-blue-50 text-[#0066FF] border border-blue-200/60 font-mono tabular-nums flex items-center gap-1">
                        {act.matchPercent}% Cocok
                      </span>
                    ) : null}

                    {act.fee && (
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-200">
                        {act.fee}
                      </span>
                    )}

                    {evidence && (
                      <span
                        className={`text-[11px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1 ${
                          evidence.status === 'confirmed'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {evidence.status === 'confirmed' ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Dikonfirmasi Penyelenggara
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3 text-amber-600" />
                            Bukti Terkirim (Verifikasi)
                          </>
                        )}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => toggleSave(act.id)}
                    title={isSaved ? 'Hapus dari simpanan' : 'Simpan kegiatan'}
                    className={`p-1.5 rounded-lg border transition ${
                      isSaved
                        ? 'bg-blue-50 text-blue-600 border-blue-200'
                        : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-600'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-blue-600 transition">
                  {act.title}
                </h3>

                {act.organizer && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-2.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{act.organizer}</span>
                    {act.location ? (
                      <>
                        <span className="text-slate-300">•</span>
                        <span className="flex items-center gap-1 text-slate-500">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {act.location}
                        </span>
                      </>
                    ) : null}
                  </div>
                )}

                <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-2">
                  {act.description}
                </p>

                {/* Info Kualifikasi Semester */}
                {act.semester && (
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-3 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{act.semester}</span>
                  </div>
                )}

                {/* Skill & Competency Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3.5">
                  {act.competencyTags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-50 text-slate-700 border border-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                  {act.skillTags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-blue-50/70 text-blue-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Panduan Unggah Sertifikat untuk Kegiatan yang Disimpan */}
                {isSaved && (
                  <div className="mb-3.5 p-3 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-start gap-2.5 text-xs text-blue-900">
                    <Award className="w-4 h-4 text-[#0066FF] shrink-0 mt-0.5" />
                    <div className="leading-relaxed">
                      Sudah ikut kegiatan ini? Unggah sertifikat di{' '}
                      <Link
                        href="/passport#sertifikat"
                        className="font-semibold text-blue-700 underline hover:text-blue-800 transition"
                      >
                        Skill Passport → Sertifikat & Portofolio
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer: Deadline & Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Tenggat: <strong className="text-slate-700 font-semibold">{formatDeadline(act.deadline)}</strong></span>
                </div>

                <button
                  onClick={() => handleRegisterClick(act.id, act.registrationUrl)}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs flex items-center gap-1 transition shadow-sm"
                >
                  Daftar
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h4 className="font-semibold text-slate-800 mb-1">Tidak ada kegiatan yang cocok</h4>
          <p className="text-xs text-slate-500">
            Coba ubah filter atau kata kunci pencarian.
          </p>
        </div>
      )}

      {/* Locked Teaser for Free Users */}
      {!isPro && lockedCount > 0 && (
        <div className="relative rounded-2xl p-6 md:p-8 bg-slate-900 text-white overflow-hidden border border-slate-800">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 pl-2.5 border-l-2 border-slate-600 mb-2.5">
                <Lock className="w-3.5 h-3.5 text-slate-300" />
                <span>+{lockedCount} Kegiatan Terkurasi Lainnya di Gapless Pro</span>
              </div>
              <h3 className="text-xl font-bold">Buka Seluruh Rekomendasi Kegiatan & Urutan Gap</h3>
              <p className="text-xs text-slate-300 max-w-xl mt-1.5 leading-relaxed">
                Di paket Gapless Pro, kamu bisa melihat seluruh katalog kegiatan aktif, diurutkan berdasarkan kecocokan terbesar terhadap target kariermu beserta filter lengkap.
              </p>
            </div>
            <Link
              href="/pricing"
              className="px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold transition whitespace-nowrap shrink-0"
            >
              Mulai Gapless Pro (Rp29.000)
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
