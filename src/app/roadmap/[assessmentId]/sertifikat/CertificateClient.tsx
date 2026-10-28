'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { 
  Award, 
  Download, 
  Share2, 
  Check, 
  Copy, 
  ArrowLeft, 
  ShieldCheck, 
  ExternalLink,
  Sparkles,
  Building2
} from 'lucide-react';
import Link from 'next/link';

function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v7.6h2.8v-7.6h-2.8M7.86 6.5a1.63 1.63 0 0 0-1.63 1.62c0 .9.73 1.63 1.63 1.63a1.63 1.63 0 0 0 1.63-1.63A1.63 1.63 0 0 0 7.86 6.5Z" />
    </svg>
  );
}

interface Props {
  assessmentId: string;
  userName: string;
  userEmail: string;
  careerTitle: string;
  companyName: string;
  badgeLabel: string;
  skillsValidated: string[];
  credentialId: string;
  issueDate: string;
}

export default function CertificateClient({
  assessmentId,
  userName,
  userEmail,
  careerTitle,
  companyName,
  badgeLabel,
  skillsValidated,
  credentialId,
  issueDate,
}: Props) {
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showCaptionModal, setShowCaptionModal] = useState(false);
  const [isCaptionModalRendered, setIsCaptionModalRendered] = useState(false);

  const certContainerRef = useRef<HTMLDivElement>(null);
  const certCardRef = useRef<HTMLDivElement>(null);
  const captionBackdropRef = useRef<HTMLDivElement>(null);
  const captionModalRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (certCardRef.current) {
      gsap.fromTo(
        certCardRef.current,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, { scope: certContainerRef });

  useEffect(() => {
    if (showCaptionModal) {
      setIsCaptionModalRendered(true);
    } else if (isCaptionModalRendered && captionBackdropRef.current && captionModalRef.current) {
      gsap.killTweensOf([captionBackdropRef.current, captionModalRef.current]);
      gsap.to(captionBackdropRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
      });
      gsap.to(captionModalRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => setIsCaptionModalRendered(false),
      });
    }
  }, [showCaptionModal]);

  useGSAP(() => {
    if (isCaptionModalRendered && showCaptionModal && captionBackdropRef.current && captionModalRef.current) {
      gsap.killTweensOf([captionBackdropRef.current, captionModalRef.current]);
      gsap.fromTo(
        captionBackdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: 'power2.out' }
      );
      gsap.fromTo(
        captionModalRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.25, ease: 'back.out(1.4)' }
      );
    }
  }, [isCaptionModalRendered, showCaptionModal]);

  const linkedinCaption = `🎉 Proud to announce that I have successfully completed the Virtual Job Simulation for ${careerTitle} in collaboration with ${companyName} via Gapless! 🚀

During this simulation, I tackled real-world industry scenarios and validated my core competencies in:
${skillsValidated.map((s) => `• ${s}`).join('\n')}

Big thanks to Gapless and ${companyName} for providing this immersive learning experience! Ready to apply these skills to create real impact.

#Gapless #CareerReady #JobSimulation #${companyName.replace(/ /g, '')} #${careerTitle.replace(/[^a-zA-Z0-9]/g, '')} #VirtualInternship`;

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(linkedinCaption);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 3000);
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShareToLinkedIn = () => {
    if (typeof window !== 'undefined') {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Action Bar (Hidden when printing) */}
      <div className="print:hidden flex flex-wrap items-center justify-between gap-4 bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl border border-slate-700">
        <Link
          href={`/roadmap?assessmentId=${assessmentId}`}
          className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Roadmap</span>
        </Link>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={() => setShowCaptionModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 text-xs md:text-sm font-bold transition-all cursor-pointer"
          >
            <LinkedInIcon className="w-4 h-4 text-blue-400" />
            <span>Format Post LinkedIn</span>
          </button>

          <button
            onClick={handleShareToLinkedIn}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white text-xs md:text-sm font-bold transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Bagikan ke LinkedIn</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs md:text-sm font-bold transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF / Cetak</span>
          </button>
        </div>
      </div>

      {/* Certificate Frame (Printable Container) */}
      <div ref={certContainerRef} className="certificate-container flex justify-center">
        <div
          ref={certCardRef}
          className="w-full max-w-4xl bg-[#FCFBF7] text-slate-900 rounded-3xl p-8 sm:p-14 border-8 border-double border-[#D4AF37] shadow-2xl relative overflow-hidden print:border-4 print:p-8 print:shadow-none print:m-0"
          style={{
            backgroundImage: 'radial-gradient(rgba(212, 175, 55, 0.04) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        >
          {/* Subtle Background Watermark Logo */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <Award className="w-96 h-96 text-slate-900" />
          </div>

          {/* Certificate Corner Ornaments */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]" />

          {/* Header Logos */}
          <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-6 mb-8 relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-sm">
                G
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-slate-900">Gapless</span>
                <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400">Career Intelligence</span>
              </div>
            </div>

            <div className="text-right">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold">
                <Building2 className="w-3.5 h-3.5 text-amber-600" />
                <span>In Collaboration with {companyName}</span>
              </div>
            </div>
          </div>

          {/* Certificate Content */}
          <div className="text-center space-y-4 my-8 relative z-10">
            <span className="text-xs md:text-sm font-extrabold uppercase tracking-[0.25em] text-[#A67C00]">
              Certificate of Completion
            </span>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-900 tracking-wide">
              VIRTUAL JOB SIMULATION
            </h1>

            <p className="text-xs md:text-sm text-slate-500 font-medium max-w-md mx-auto pt-2">
              Sertifikat ini secara resmi dianugerahkan kepada:
            </p>

            <div className="py-2">
              <span className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-slate-950 border-b-2 border-slate-300 px-8 py-1 inline-block">
                {userName}
              </span>
            </div>

            <p className="text-xs md:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed pt-2">
              Telah berhasil menyelesaikan simulasi proyek industri nyata dan memvalidasi penguasaan kompetensi profesional untuk posisi:
            </p>

            <div className="py-1">
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-blue-700 bg-blue-50/80 px-6 py-2 rounded-2xl border border-blue-200 inline-block shadow-2xs">
                {careerTitle}
              </span>
            </div>

            {/* Skills Badges Grid */}
            <div className="pt-4 max-w-2xl mx-auto">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Kompetensi Praktis yang Teruji:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {skillsValidated.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Certificate Footer / Signatures & Seal */}
          <div className="grid grid-cols-3 items-end pt-8 mt-10 border-t border-[#D4AF37]/30 text-center relative z-10">
            {/* Left: Verification QR / ID */}
            <div className="text-left space-y-1">
              <p className="text-[10px] uppercase font-bold text-slate-400">ID Kredensial:</p>
              <p className="text-xs font-mono font-bold text-slate-800">{credentialId}</p>
              <p className="text-[10px] text-slate-400">Diterbitkan: {issueDate}</p>
            </div>

            {/* Center: Gold Foil Badge Seal */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-linear-to-tr from-[#996515] via-[#D4AF37] to-[#FFDF73] p-1 shadow-lg flex items-center justify-center relative">
                <div className="w-full h-full rounded-full border-2 border-dashed border-[#FFF8DC] flex flex-col items-center justify-center bg-linear-to-b from-[#B8860B] to-[#805A00] text-white p-1 text-center shadow-inner">
                  <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-amber-200" />
                  <span className="text-[8px] sm:text-[9px] font-extrabold uppercase tracking-tighter">VERIFIED</span>
                </div>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#996515] mt-2">
                Official Validation
              </span>
            </div>

            {/* Right: Partner & Program Signatures */}
            <div className="text-right space-y-1">
              <div className="h-9 flex items-center justify-end font-serif italic text-base text-slate-800 font-bold">
                Gapless &times; {companyName}
              </div>
              <div className="w-36 ml-auto border-b border-slate-300" />
              <p className="text-[10px] font-bold text-slate-700">Industry Program Board</p>
              <p className="text-[9px] text-slate-400">Gapless Career Network</p>
            </div>
          </div>
        </div>
      </div>

      {/* LINKEDIN CAPTION MODAL */}
      {isCaptionModalRendered && (
        <div
          ref={captionBackdropRef}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
        >
          <div
            ref={captionModalRef}
            className="bg-slate-900 border border-slate-700 p-6 sm:p-8 rounded-3xl max-w-lg w-full shadow-2xl text-slate-100 relative"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#0A66C2] text-white flex items-center justify-center">
                <LinkedInIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Template Postingan LinkedIn</h3>
                <p className="text-xs text-slate-400">Siap dipaste langsung ke feed LinkedIn kamu</p>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs font-mono text-slate-300 whitespace-pre-line max-h-60 overflow-y-auto mb-6">
              {linkedinCaption}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleCopyCaption}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition-all shadow-md cursor-pointer"
              >
                {copiedCaption ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Teks Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Salin Caption LinkedIn</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setShowCaptionModal(false)}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
