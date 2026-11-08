"use client";

import { useRef } from "react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";
import styles from "./Preloader.module.css";

gsap.registerPlugin(useGSAP, DrawSVGPlugin);

/* ─── Konfigurasi (warna ada di Preloader.module.css) ──────────────────── */

/** Set ke false untuk mematikan preloader sepenuhnya. */
export const PRELOADER_ENABLED = true;

const TIMING = {
  minFull: 2, // detik — durasi minimum kunjungan pertama (intro tidak terpotong)
  minShort: 0.6, // detik — durasi minimum kunjungan berikutnya dalam sesi yang sama
  max: 8, // detik — fallback: paksa selesai walau aset belum termuat
  breathe: 1.1, // detik — setengah siklus napas logo
  counter: 0.5, // detik — tween angka persentase ke target baru
};

const SESSION_KEY = "gapless:preloader-seen";
export const PRELOADER_DONE_EVENT = "preloader:done";

/* ─── Sinyal selesai untuk animasi lain di halaman ─────────────────────── */

let preloaderDone = false;

/** Jalankan `cb` setelah preloader selesai (langsung, jika sudah selesai). */
export function whenPreloaderDone(cb: () => void): () => void {
  if (preloaderDone) {
    cb();
    return () => {};
  }
  window.addEventListener(PRELOADER_DONE_EVENT, cb, { once: true });
  return () => window.removeEventListener(PRELOADER_DONE_EVENT, cb);
}

/* ─── Pelacak progres loading nyata ────────────────────────────────────── */

/**
 * Melapor progres 0–1 dari: document.readyState, gambar non-lazy,
 * document.fonts.ready, dan window `load`. Mengembalikan fungsi cleanup.
 */
function trackLoadProgress(onProgress: (value: number) => void): () => void {
  let alive = true;
  const cleanups: Array<() => void> = [];
  const listen = (target: EventTarget, type: string, fn: () => void) => {
    target.addEventListener(type, fn, { once: true });
    cleanups.push(() => target.removeEventListener(type, fn));
  };

  const pending = Array.from(document.images).filter(
    (img) => img.loading !== "lazy" && !img.complete,
  );
  const state = {
    dom: document.readyState !== "loading",
    fonts: false,
    load: document.readyState === "complete",
    imagesDone: 0,
  };

  const emit = () => {
    if (!alive) return;
    if (state.load) return onProgress(1);
    const images = pending.length ? state.imagesDone / pending.length : 1;
    // Bobot: dasar 10%, DOM 20%, font 20%, gambar 30%; sisa 20% menunggu `load`.
    onProgress(0.1 + (state.dom ? 0.2 : 0) + (state.fonts ? 0.2 : 0) + images * 0.3);
  };

  if (!state.dom) listen(document, "DOMContentLoaded", () => ((state.dom = true), emit()));
  if (!state.load) listen(window, "load", () => ((state.load = true), emit()));
  pending.forEach((img) => {
    const done = () => {
      state.imagesDone += 1;
      emit();
    };
    listen(img, "load", done);
    listen(img, "error", done);
  });

  if (document.fonts?.ready) {
    document.fonts.ready.then(() => {
      state.fonts = true;
      emit();
    });
  } else {
    state.fonts = true;
  }

  emit();
  return () => {
    alive = false;
    cleanups.forEach((fn) => fn());
  };
}

/* ─── Komponen ─────────────────────────────────────────────────────────── */

type Mode = "full" | "short" | "reduced";

export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const root = rootRef.current;
      if (!root || !contextSafe) return;

      const q = gsap.utils.selector(root);
      const [logo] = q("[data-logo]");
      const [arc] = q("#g-arc");
      const [block] = q("#g-block");
      const [glow] = q("[data-glow]");
      const [grain] = q("[data-grain]");
      const [meta] = q("[data-meta]");
      const [fill] = q("[data-fill]");
      const [percent] = q("[data-percent]");
      const [panelTop] = q("[data-panel='top']");
      const [panelBottom] = q("[data-panel='bottom']");
      const reveal = gsap.utils.toArray<HTMLElement>("[data-preloader-reveal]");

      const finish = () => {
        preloaderDone = true;
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {}
        window.dispatchEvent(new CustomEvent(PRELOADER_DONE_EVENT));
      };

      // Navigasi client-side kembali ke halaman ini: preloader sudah pernah jalan.
      if (preloaderDone) {
        gsap.set(root, { display: "none", attr: { "data-preloader": "done" } });
        finish();
        return;
      }

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let seen = false;
      try {
        seen = sessionStorage.getItem(SESSION_KEY) === "1";
      } catch {}
      const mode: Mode = reduced ? "reduced" : seen ? "short" : "full";

      gsap.set([arc, block], { transformOrigin: "50% 50%" });
      gsap.set(meta, { y: 8 });

      /* ── Timeline utama: Intro → (pause: Loading) → Outro ── */
      const master = gsap.timeline({ defaults: { ease: "power2.out" } });

      /* ── FASE 1 · INTRO ───────────────────────────────────── */
      if (mode === "full") {
        master
          .set(arc, { fillOpacity: 0, strokeOpacity: 1, drawSVG: "0%" })
          .set(block, { autoAlpha: 0, x: 40, y: 40, rotation: 14 })
          .to(logo, { autoAlpha: 1, duration: 0.2 }, 0)
          .fromTo(glow, { opacity: 0, scale: 0.8 }, { opacity: 0.35, scale: 0.9, duration: 0.8 }, 0)
          // Lengkungan "ditarik" sebagai garis, lalu fill memudar masuk
          .to(arc, { drawSVG: "100%", duration: 0.85, ease: "power2.inOut" }, 0.05)
          .to(arc, { fillOpacity: 1, strokeOpacity: 0, duration: 0.35, ease: "power1.out" }, 0.65)
          // Blok meluncur dari kanan bawah dan mengunci huruf G
          .to(block, { autoAlpha: 1, x: 0, y: 0, rotation: 0, duration: 0.45, ease: "back.out(1.7)" }, 0.7)
          // Bump saat terkunci + pulse glow
          .to(logo, { scale: 1.06, duration: 0.12, yoyo: true, repeat: 1 }, 1.0)
          .to(glow, { opacity: 1, scale: 1.15, duration: 0.18, yoyo: true, repeat: 1 }, 1.0)
          .to(meta, { autoAlpha: 1, y: 0, duration: 0.4 }, 0.8);
      } else if (mode === "short") {
        master
          .fromTo(logo, { autoAlpha: 0, scale: 0.92 }, { autoAlpha: 1, scale: 1, duration: 0.35 }, 0)
          .fromTo(
            block,
            { autoAlpha: 0, x: 20, y: 20, rotation: 8 },
            { autoAlpha: 1, x: 0, y: 0, rotation: 0, duration: 0.4, ease: "back.out(1.7)" },
            0.1,
          )
          .to(glow, { opacity: 0.35, duration: 0.4 }, 0)
          .to(meta, { autoAlpha: 1, y: 0, duration: 0.3 }, 0.1);
      } else {
        // Reduced motion: cukup fade in, tanpa gambar garis / gerakan.
        master
          .to(logo, { autoAlpha: 1, duration: 0.3 }, 0)
          .to(glow, { opacity: 0.35, duration: 0.3 }, 0)
          .to(meta, { autoAlpha: 1, y: 0, duration: 0.3 }, 0);
      }

      /* ── FASE 2 · LOADING (idle loop) ─────────────────────── */
      const breathe = gsap.timeline({
        paused: true,
        repeat: -1,
        yoyo: true,
        defaults: { duration: TIMING.breathe, ease: "sine.inOut" },
      });
      if (mode !== "reduced") {
        breathe
          .to(logo, { scale: 1.03 }, 0)
          .to(glow, { opacity: 0.6, scale: 1.05 }, 0)
          .to(block, { x: 3, y: 3 }, 0); // blok "menyambung" sinkron dengan napas
      }

      const setFill = gsap.quickSetter(fill, "scaleX");
      const counter = { value: 0 };
      const renderCounter = () => {
        percent.textContent = `${Math.round(counter.value)}%`;
        setFill(counter.value / 100);
      };

      let loaded = false;
      let minPassed = false;
      let introDone = false;
      let outroStarted = false;
      let target = 0;

      const tryOutro = contextSafe(() => {
        if (outroStarted || !loaded || !minPassed || !introDone || counter.value < 100) return;
        outroStarted = true;
        breathe.kill();
        master.play();
      });

      const setProgress = contextSafe((value: number) => {
        const next = Math.min(100, Math.max(target, value * 100));
        if (value >= 1) loaded = true;
        if (next === target && !loaded) return;
        target = next;
        gsap.to(counter, {
          value: target,
          duration: TIMING.counter,
          ease: "power2.out",
          snap: { value: 1 },
          overwrite: true,
          onUpdate: renderCounter,
          onComplete: tryOutro,
        });
      });

      master.addPause(">", () => {
        introDone = true;
        breathe.play();
        tryOutro();
      });

      /* ── FASE 3 · OUTRO ───────────────────────────────────── */
      const slide = mode === "reduced" ? 0 : 1;
      master.addLabel("outro");
      master
        .to(logo, { scale: 1, duration: 0.2 }, "outro")
        .to(block, { x: 0, y: 0, duration: 0.2 }, "outro")
        .to(meta, { autoAlpha: 0, y: 12 * slide, duration: 0.3, ease: "power2.in" }, "outro")
        // Logo berpisah: lengkungan ke kiri-atas, blok ke kanan-bawah
        .to(arc, { x: -36 * slide, y: -36 * slide, scale: slide ? 0.6 : 1, autoAlpha: 0, duration: 0.45, ease: "power3.in" }, "outro+=0.12")
        .to(block, { x: 36 * slide, y: 36 * slide, scale: slide ? 0.6 : 1, autoAlpha: 0, duration: 0.45, ease: "power3.in" }, "outro+=0.18")
        .to([glow, grain], { autoAlpha: 0, duration: 0.4 }, "outro+=0.12")
        .set(root, { pointerEvents: "none" }, "outro+=0.4");

      if (slide) {
        // Split reveal: panel atas naik, panel bawah turun
        master
          .to(panelTop, { yPercent: -100, duration: 0.8, ease: "power4.inOut" }, "outro+=0.4")
          .to(panelBottom, { yPercent: 100, duration: 0.8, ease: "power4.inOut" }, "outro+=0.4");
      } else {
        master.to([panelTop, panelBottom], { autoAlpha: 0, duration: 0.3 }, "outro+=0.3");
      }

      if (reveal.length) {
        master.from(
          reveal,
          {
            y: 24 * slide,
            autoAlpha: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.08,
            clearProps: "transform,opacity,visibility",
          },
          slide ? "outro+=0.65" : "outro+=0.3",
        );
      }

      master
        .set(root, { display: "none", attr: { "data-preloader": "done" } })
        .call(finish);

      /* ── Pemicu: progres nyata + durasi minimum/maksimum ──── */
      const stopTracking = trackLoadProgress(setProgress);
      gsap.delayedCall(mode === "full" ? TIMING.minFull : TIMING.minShort, () => {
        minPassed = true;
        tryOutro();
      });
      gsap.delayedCall(TIMING.max, () => setProgress(1));

      return () => stopTracking();
    },
    { scope: rootRef },
  );

  if (!PRELOADER_ENABLED) return null;

  return (
    <div ref={rootRef} className={styles.root} data-preloader="active" aria-busy="true">
      {/* Tanpa JS: sembunyikan overlay supaya halaman tetap bisa dipakai */}
      <noscript>
        <style>{`[data-preloader]{display:none!important}html,body{overflow:auto!important}`}</style>
      </noscript>

      <div className={`${styles.panel} ${styles.panelTop}`} data-panel="top" />
      <div className={`${styles.panel} ${styles.panelBottom}`} data-panel="bottom" />
      <div className={styles.grain} data-grain aria-hidden="true" />

      <span className={styles.srOnly} role="status" aria-live="polite">
        Memuat…
      </span>

      <div className={styles.stage} aria-hidden="true">
        <div className={styles.glow} data-glow />
        <svg className={styles.logo} data-logo viewBox="0 0 120 120" fill="none">
          <path
            id="g-arc"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeOpacity={0}
            strokeLinejoin="round"
            d="M100 8H32A24 24 0 0 0 8 32V88A24 24 0 0 0 32 112H60V84H44A8 8 0 0 1 36 76V44A8 8 0 0 1 44 36H100A14 14 0 0 0 100 8Z"
          />
          <path
            id="g-block"
            fill="currentColor"
            d="M70 54H96A16 16 0 0 1 112 70V96A16 16 0 0 1 96 112H70A6 6 0 0 1 64 106V60A6 6 0 0 1 70 54Z"
          />
        </svg>

        <div className={styles.meta} data-meta>
          <div className={styles.track}>
            <div className={styles.fill} data-fill />
          </div>
          <span className={styles.percent} data-percent>
            0%
          </span>
        </div>
      </div>
    </div>
  );
}

export default Preloader;
