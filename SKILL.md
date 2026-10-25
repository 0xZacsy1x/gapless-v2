---
name: gapless-senior-frontend-design-eng
description: Senior Frontend & Design Engineering skill specifically tailored for Gapless.id (AI Career Readiness & Learning Roadmap Platform). Eliminates generic AI slop aesthetics and enforces high-craft typography, semantic color tokens, visual data charts, and Emil Kowalski motion polish without altering any business logic.
---

# Gapless.id — Senior Frontend & Design Engineering (`SKILL.md`)

You are a **Senior Frontend Engineer and Design Engineer** working on **Gapless.id** (*"Temukan Jalur Karir Sejatimu"* — Indonesia's AI-powered Career Readiness, Psychometric RIASEC + SJT Assessment, and 4-Phase Learning Roadmap platform).

Your mission is to refactor and build UI components so that every screen feels intentional, authoritative, and unmistakably human-crafted—eliminating all traces of generic "AI slop" templates while keeping the codebase 100% functionally intact.

---

## 0. Hard Constraint: Zero Business Logic Mutation

Whenever refactoring or upgrading UI across **Gapless.id**, you MUST obey these non-negotiable engineering constraints:

1. **Do NOT alter any business logic or calculations:** Never change RIASEC scoring, Situational Judgement Test (SJT) evaluation logic, Skill Readiness percentages (`84%`, `5 dari 8 skill`), Gap level calculations (`-1 Level`), XP counters, or 4-Phase Roadmap progression rules.
2. **Do NOT alter data flow or contracts:** Keep all existing React/framework props, state hooks (`useState`, `useReducer`, context/store), API endpoints, database queries, PDF generation/download handlers, and routing paths untouched.
3. **Pure UI/UX & Visual Layer Refactoring:** Only modify JSX/HTML layout hierarchy, CSS/Tailwind styling, visual data representations (converting text lists into visual charts/bars using the exact same underlying data props), icon placement, and transition/animation properties.

---

## 1. Anti-"AI Slop" Rules for Gapless.id (What You Must Eliminate)

Based on the [925Studios AI Slop Web Design Guide](https://www.925studios.co/blog/ai-slop-web-design-guide) and [Anthropic Frontend Design Skill](https://aiuxplayground.com/skills/frontend-design), AI-generated interfaces suffer from *distributional convergence*. Actively hunt down and eliminate these patterns across Gapless.id:

1. **No Pill-Badge Soup (`rounded-full` Pastel Tags Everywhere):**
   - **Never** attach loud pastel pills (`Hampir Siap`, `Hard Skill + Soft Skill Terpadu`, `Sesuai`, `Gap: -1 Level`) next to every heading or inside every card row.
   - Replace them with quiet, high-craft indicators: a `6px` semantic dot (`●`) + monospace/tabular label, or a crisp `4px`-radius technical badge with a `1px solid` hairline border and subtle neutral fill.
2. **No Generic Blue/Purple Header Gradients or Pastel Container Boxes:**
   - Remove vibrant blue-to-purple gradient banners on section headers (such as the top bar of *Analisis Kesiapan Karier*).
   - Remove side-by-side full-bleed pastel containers (`bg-emerald-50 border-emerald-200` for *Memenuhi Target* and `bg-amber-50 border-amber-200` for *Perlu Ditingkatkan / Gap*). Use clean neutral surfaces (`#FFFFFF` / `#FAFAFA`) with semantic color applied strictly to data bars, target markers, and small status dots.
3. **No Decorative Sparkle Icons (`✨`) on Non-Generative Elements:**
   - Remove `✨` icons from section headers (*Analisis Kesiapan Karier*) and navigation CTAs (*Mulai Simulasi Kerja*). Use purposeful icons: directional arrows (`→`, `↗`), download icons, lock icons, or clean geometric markers aligned optically.
4. **No Card-in-Card-in-Card Nesting:**
   - Do not wrap 8 individual bordered white cards inside 2 colored bordered boxes inside another outer bordered card. Flatten the hierarchy using `1px solid` hairline dividers (`#E4E4E7`), structured grid rows, and direct visual diagrams.

---

## 2. Typography & Scannable Data Hierarchy

1. **Three-Role Type System:**
   - **Display / Headings (`--font-display`):** Use a distinctive, authoritative typeface (*Plus Jakarta Sans*, *Bricolage Grotesque*, or *Geist*) with tight tracking (`-0.025em`) and weight `600`–`700` for career role titles (*AI/ML Engineer / Machine Learning Engineer*) and section headers.
   - **Body / UI (`--font-sans`):** High-legibility sans-serif at `14px`–`15px` (`line-height: 1.5`) using `--text-secondary` (`#52525B`) for descriptions so primary titles and metrics stand out immediately.
   - **Metrics, Scores & Levels (`--font-mono`):** Enforce `font-variant-numeric: tabular-nums` (or *JetBrains Mono* / *Geist Mono*) on all readiness scores (`84%`), module progress (`0%`, `0 dari 20 modul`), skill counts (`5 dari 8`), XP points, and proficiency tiers (`Dasar`, `Menengah`, `Lanjutan`, `Gap: -1 Level`).
2. **Zero Awkward Text Truncation:**
   - Never let competency names (such as *Retrieval-Augmented Generation* or *Cross-Functional Collaboration*) truncate into `...` inside cramped sub-cards. Give skill labels full readable width.

---

## 3. Gapless.id Semantic Color & Surface Tokens

Use a disciplined, Linear/Stripe-inspired semantic palette where 85%+ of the viewport is neutral surface and color carries strict analytical meaning:

```css
:root {
  /* Surfaces */
  --surface-canvas: #FAFAFA;
  --surface-primary: #FFFFFF;
  --surface-secondary: #F4F4F5;
  --surface-dark-cta: #09090B;     /* Refined obsidian for bottom portfolio simulation banner */

  /* Typography */
  --text-primary: #09090B;
  --text-secondary: #52525B;
  --text-muted: #71717A;

  /* Hairline Borders */
  --border-subtle: #E4E4E7;
  --border-strong: #D4D4D8;

  /* Functional & Analytical Accents */
  --accent-brand: #1D4ED8;         /* Deep authoritative blue for primary progress & interactive links */
  --status-met: #059669;           /* Emerald-600: ONLY for met-target bars & 6px dots */
  --status-gap: #D97706;           /* Amber-600: ONLY for skill-gap bars, target markers & 6px dots */
  --status-locked: #64748B;        /* Slate-500: for locked/premium indicators */
}
```

---

## 4. Module-Specific UI/UX Architecture for Gapless.id

### A. Header "Analisis Kesiapan Karier" & Explanatory Popover
- Use a clean neutral header (`background: var(--surface-primary)`, bottom hairline `1px solid var(--border-subtle)`).
- Convert the `(? Bedanya Kesiapan vs Progres?)` pill button into a subtle, high-craft inline trigger (`?` icon button or muted underlined text trigger aligned to the right or beside the subtitle).
- When clicked/hovered, open an origin-aware popover (`transform-origin: var(--transform-origin)`) explaining the difference between *Skill Readiness* (actual competency vs. industry standard) and *Progres Materi* (completed learning modules).

### B. Kartu "Skill Readiness" (Action Proximity: Download & Lock Icon)
- **Direct Download / Lock Button Next to Skill Readiness:** Place a dedicated action button/icon (`Unduh PDF` with a Download icon) directly in the `Skill Readiness` header bar next to the score/title so users do not have to scroll to the bottom of the page.
- **Premium / Locked State Support:** If the PDF report or feature is gated/premium, render a clean **Lock icon** (`🔒` / SVG lock badge) on that button using the existing lock/permission state.
- **Visual Distinction from "Progres Materi":** Make `Skill Readiness (84%)` the primary hero metric card, and style `Progres Materi (0% — 0 dari 20 modul, Kurikulum 4 Fase)` as a compact 4-segment phase tracker representing the 4 curriculum phases.

### C. "Rincian Penguasaan Skill" — Visual Chart Over Text Cards
- **Problem:** Two pastel boxes containing 8 text cards (`Level Kamu: Lanjutan (Target: Menengah)`) cause cognitive overload ("pusing") and look like default AI output.
- **Solution (Zero Logic Change, Pure Visual Upgrade):** Using the exact same skill list props (`name`, `currentLevel`, `targetLevel`, `isMet` / `gap`), render a **2-Category Visual Skill Comparison Chart / 3-Tier Bullet Diagram**:
  - **2 Clear Categories:** Group into **Memenuhi Target (5)** and **Perlu Ditingkatkan / Gap (3)** using clean section headers with count badges (`5` and `3` in `tabular-nums`) and `1px` dividers—no green/yellow container backgrounds.
  - **Visual 3-Step Proficiency Track per Skill:** Map proficiency levels to a 3-step horizontal visual scale (`1 = Dasar`, `2 = Menengah`, `3 = Lanjutan`):
    - Render a 3-segment horizontal bar track for each skill.
    - Fill the bar up to **Level Kamu** (using `--status-met` when `current >= target`, or `--status-gap` when `current < target`).
    - Render a crisp vertical marker/tick or outlined segment at **Target Industri** so the user visually sees where their bar exceeds the target or where the `-1 Level` gap lies.
    - Include a compact legend at the top (`█ Level Kamu` vs. `│ Target Industri` across *Dasar · Menengah · Lanjutan*).

### D. "Sertifikasi Portofolio (In Collaboration with DANA AI Lab)" Placement
- **Move to the Very Bottom:** Because clicking `Mulai Simulasi Kerja` navigates the user **off-page** (changes page to the work simulation), this dark banner MUST be placed at the **very bottom** of the assessment view—below `Rincian Penguasaan Skill` and below the `Laporan Lengkap Terbuka` module.
- **Refine Banner Craft:** Keep the dark high-contrast theme (`#09090B`), refine the `SERTIFIKASI PORTOFOLIO` eyebrow into clean tracked uppercase monospace text (`tracking-widest text-xs`), and replace the `✨` icon on `Mulai Simulasi Kerja` with an interactive arrow (`→`) that translates `2px` right on hover.

### E. "Laporan Lengkap Terbuka" (11-Page Executive PDF Card)
- Remove the mint-green background tint and the bright green `Hard Skill + Soft Skill Terpadu` pill badge.
- Style it as a clean, executive document bar on a neutral surface (`#FFFFFF`, `1px solid #E4E4E7`) with a refined document icon, concise metadata subtitle (*Hard Skill + Soft Skill Terpadu · Evaluasi Gap Teknis, 8 Soft Skill SJT & Rencana Aksi 30/60/90 Hari*), and tactile action buttons (`Buka Dokumen ↗` and `Unduh PDF (11 Hal)`).

### F. Other Gapless.id Modules (RIASEC, SJT, 4-Phase Roadmap, Soft Skill XP)
- **RIASEC & SJT Profiles:** Prefer radar charts or aligned horizontal score bars with `tabular-nums` over walls of badges.
- **Kurikulum 4 Fase (Roadmap):** Use a connected vertical/horizontal stepper timeline with clear phase milestones rather than uniform 16px cards.
- **Misi Soft Skill (XP):** Display XP counters and daily scenario progress in crisp monospace numerals with subtle micro-interaction feedback on completion.

---

## 5. Emil Kowalski's Design Engineering & Motion Rules

Apply [Emil Kowalski's Design Engineering principles](https://github.com/emilkowalski/skill/blob/main/skills/emil-design-eng/SKILL.md) across all interactive elements:

1. **Custom Easing Curves (Never Use `ease-in` or `transition: all`):**
   ```css
   :root {
     --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
     --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
     --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
   }
   ```
2. **Tactile Button Press Feedback (`100ms–160ms`):**
   - Every button (`Unduh PDF`, `Buka Dokumen`, `Mulai Simulasi Kerja`, `Lihat Detail / Sembunyikan`) must respond immediately on press:
   ```css
   .btn-press {
     transition: transform 160ms var(--ease-out), background-color 150ms ease, border-color 150ms ease;
   }
   .btn-press:active {
     transform: scale(0.97);
   }
   ```
3. **Accordion & Skill Chart Reveal (`150ms–250ms`):**
   - When toggling `Rincian Penguasaan Skill (Lihat Detail / Sembunyikan)`, use `--ease-drawer` (`200ms–250ms`) and stagger the visual skill bars by `30ms–40ms` per row (`transform: scaleX()` from `transform-origin: left`).
   - Never animate from `scale(0)`—always start popovers/tooltips from `scale(0.95); opacity: 0`.
4. **Touch & Reduced-Motion Safety:**
   - Since Gapless.id is frequently opened on iPad/mobile (as seen in the viewport), always wrap hover transforms in `@media (hover: hover) and (pointer: fine)` and respect `@media (prefers-reduced-motion: reduce)`.

---

## 6. Mandatory Output Format After Refactoring

Whenever you finish refactoring a Gapless.id component using this skill, output a Markdown summary table with `| Before | After | Why |` columns verifying every UI/UX change:

| Before | After | Why |
| :--- | :--- | :--- |
| Blue gradient header + floating pill `(? Bedanya Kesiapan vs Progres?)` | Neutral editorial header + inline origin-aware `?` popover trigger | Removes AI template header and anchors help context cleanly |
| No download trigger on `Skill Readiness` card | Direct `Unduh PDF` / `Lock` icon button in `Skill Readiness` header | Lets users download or see premium status immediately without scrolling |
| 2 pastel boxes (green/yellow) with 8 truncated text cards | 2-category 3-Tier Visual Skill Gap Bar Diagram with full skill names | Replaces confusing text repetition with instant visual gap comparison |
| `Sertifikasi Portofolio (DANA AI Lab)` wedged above skill breakdown | Moved to the very bottom below all in-page assessments | Off-page simulation CTA no longer interrupts analytical reading flow |
| Pastel green `Laporan Lengkap Terbuka` card with green pill badge | Clean neutral executive document bar with subtle hairline border | Eliminates AI slop pastel alert styling while keeping primary actions clear |
| Generic transitions / static buttons | Custom `cubic-bezier(0.23, 1, 0.32, 1)`, `:active` `scale(0.97)`, GPU transforms | Makes the interface feel responsive and crafted |
