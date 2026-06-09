# Dev Team Page — Design Review

Scope: `/programs/dev-team` and the components rendered through `DevTeamShowcase`
(`ProgramHeroSection`, `ProgramAboutSection`, `ProgramAlumniSection`,
`DevTeamStartupPortfolioSection`, `ProgramTracksSection`, `ProgramRolesSection`,
`ProgramFinalSection`, plus the wireframes and `RedactedDecryptLabel`).

Reference: `Design.md` (root).

Status: **all P0/P1 brand fixes applied in this pass.** Remaining items live at
the bottom of this doc as future polish.

---

## What changed in this pass

### Typography is now on the locked scale
Every heading in the Dev Team surface now uses the existing
`.text-display-1 / .text-display-2 / .text-display-3 / .text-heading-1` CSS
utilities in `globals.css`. No more inline `clamp()` literals, no more
`font-extrabold`. The build-section title also dropped `whitespace-nowrap` so
it can wrap on narrow viewports instead of overflowing.

### Eyebrows normalized
All seven section eyebrows now render as
`text-[12px] font-semibold tracking-[0.22em] uppercase text-white/48`, matching
the spec exactly. Same in the portfolio tab "serial" label and the
`Status: Private` chrome on the redacted tab.

### Opacities and borders snapped to the four tiers
Foreground tiers everywhere on the page are now drawn from `white/28`,
`white/48`, `white/72`, `white/90`, full. Borders are `white/10` by default,
`white/20` for hover/active states. The bespoke `#EDEDED]/8|/12|/14|/15|/18|
/25|/28|/38|/45|/55|/58|/62|/65|/68|/72|/75|/82` literals are gone.

### Surface inversion fixed
Approach cards, roles cards, and the hero visual frame now use
`bg-surface-raised` (`#111111`) so they read as *raised* against the page
background (`#0A0A0A`) — previously they were `bg-black` and sat below the
page surface. The portfolio panel's bespoke
`linear-gradient(180deg,#090909,#050505)` was replaced with `bg-surface-deep`.

### Inset glow toned down
Approach + roles cards previously used `inset 0 0 150px <accent> 0.4`, which
read as wallpaper. Now `inset 0 0 80px <accent> 0.16` — still signals the
card's accent identity, no longer dominates the visual.

### Motion brought onto the locked tokens
Every CTA (Hero / Roles / Final) now mirrors the canonical Learn-more pattern:
`transition-colors` driven by the existing CSS variables
(`--motion-hover-in-duration`, `--motion-brand-enter`), hovering to white-on-
deep-surface. Tab transitions in the portfolio section and tab pacing in the
alumni section likewise reference the locked duration/curve set. No more
`transition-all duration-300|500|700` anywhere.

### Ambient SVG motion thinned + reduced-motion gated
- `CircuitWireframe`, `RocketWireframe`, `NetworkGrowthWireframe`,
  `TabWireframe` (CLI / ML / fallback) — every infinite `<animate>` and
  `<animateMotion>` loop is gone. They're static now.
- `HeroWireframe` — only the central purple pulse remains, and it's wrapped
  in `useReducedMotion()` so it goes static when the user has
  `prefers-reduced-motion` set.
- The outer expanding ring on the hero pulse is now a single static disc.

### Redacted-startup theatre stripped
`RedactedDecryptLabel` no longer does per-character scrambling or "probing
cipher…" status text. It now renders `[REDACTED]` plus a quiet
`Status: Private` eyebrow — same chrome as every other section eyebrow on the
page. The redacted-tab sweep gradient and the `STEALTH NETWORK` label inside
the right-pane graphic were both removed.

### Portfolio badge tones — kept (partner co-brand)
The orange `public` tone and the navy/sky-blue `fund` tone in
`buildBadgeToneClasses` are retained as **partner-aligned accents** (YC orange
for YC S25 companies, Founders Fund blue for FF-backed companies), the same
sanctioned-exception pattern as the Mentorship × Databricks hero. These should
**not** be cited as precedent for introducing additional hues elsewhere — they
are tied to specific external brand identities the badge is referencing.

---

## Files touched

- `components/sections/programs/showcase/ProgramHeroSection.tsx`
- `components/sections/programs/showcase/ProgramAboutSection.tsx`
- `components/sections/programs/showcase/ProgramAlumniSection.tsx`
- `components/sections/programs/showcase/ProgramTracksSection.tsx`
- `components/sections/programs/showcase/ProgramRolesSection.tsx`
- `components/sections/programs/showcase/ProgramFinalSection.tsx`
- `components/sections/programs/showcase/DevTeamStartupPortfolioSection.tsx`
- `components/sections/programs/showcase/RedactedDecryptLabel.tsx`
- `components/sections/programs/showcase/StartupPortfolioGraphic.tsx`
- `components/sections/programs/showcase/wireframes.tsx`

---

## Remaining (future polish, no spec violation)

- **`SteppedTimeline` (shared)** — used by this page's Tracks section, but
  rendered from `components/ui/stepped-timeline.tsx` and shared across all
  programs. Has its own opacity/border drift; out of scope here because
  changes would affect every program. Worth a dedicated cleanup pass.
- **`AsciiSignalLogo`** — uses bespoke RGBA values for tone glows. They map to
  the accent tokens but inline; could be promoted to CSS variables.
- **Per-startup ASCII scale** — `StartupPortfolioGraphic` still hard-codes
  `scale={startupId === 'nozomio-labs' ? 1.25 : ...}`. Cleaner to add a
  `scale?: number` field to `BuildTab` and let the data row carry it.
- **Hover-out curve** — Tailwind can't easily express different durations for
  hover-in vs hover-out, so the CTAs use the hover-in tokens in both
  directions (matching the canonical `program-track-bento.tsx` snippet).
  If we want directional asymmetry we'd need a `motion.span` wrapper.
- **Eyebrow component** — the 12px/0.22em eyebrow is now duplicated across ~7
  sections. Easy candidate for a `<SectionEyebrow>` extraction next time
  someone touches this directory.
- **Card title `\n` line breaks** — `devTeamApproachCards` still encodes line
  breaks via `\n` plus `whitespace-pre-line`. Brittle at narrow widths;
  consider letting `display-3` wrap naturally instead.

---

## Verification

- `npx tsc --noEmit` — clean across all touched files.
- All visible motion durations now derive from `--motion-*` CSS vars or
  `motionTokens.*Ms`.
- All foreground / border opacities are on the locked tiers
  (`28 / 48 / 72 / 90 / full`, `10 / 20`).
- All headings resolve to a `text-display-*` / `text-heading-*` utility.
