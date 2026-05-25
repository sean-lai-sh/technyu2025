# Tech@NYU Design Direction

This document defines the working visual direction for the `technyu2025` site so future homepage and section changes stay coherent.

It is not only a style guide. It is a positioning guide.

Tech@NYU should feel like:

- the best tech club at the university
- a center of gravity for technical ambition at NYU
- a real system for building technical talent over time
- student-led, but held to serious standards

The site should make that legible through structure, hierarchy, proof, and taste, not through empty bragging.

## Core Positioning

Tech@NYU should feel:

- technical
- active
- credible
- serious
- ambitious
- student-led, but sharp
- structured rather than playful
- culturally alive rather than institutionally sterile

The site should not read like:

- a soft lifestyle brand
- a generic campus org
- a random collection of events
- a club that is friendly but low-standard

It should feel closer to:

- a proving ground
- a live system
- a campus-native technical publication
- a place ambitious students naturally want to be inside

## Intended Impression

Every major page, section, and component should reinforce the same impression:

- high standards
- seriousness
- momentum
- continuity
- visible outcomes
- cultural gravity

The site should imply that Tech@NYU is where technical students go when they want:

- real peers
- real pressure
- real opportunities
- real proof of growth

The goal is not to feel exclusive for its own sake. The goal is to feel consequential.

## Prestige Without Exclusion

Tech@NYU should feel elite in standards, but not exclusionary in tone.

That means:

- approachable to newcomers
- credible to advanced builders
- not visually beginner-coded
- not visually elitist in a brittle or performative way

A first-year student should feel:

- this is serious
- I can grow into this

A strong builder should feel:

- this room has standards
- these people are worth being around

If a design choice makes the club feel softer but more welcoming, or more prestigious but colder, the preferred middle ground is:

- serious first
- welcoming through clarity, not softness

## Shape Language

Primary guidance:

- prefer blocky over squircle
- prefer crisp frames over soft blobs
- prefer rectangles, hard edges, and restrained rounding

This does not mean every surface must be fully sharp-cornered. It means the default bias should be:

- larger sections: square or lightly rounded
- cards: firm corners, not pillowy
- buttons: controlled rounding, not overly soft
- pills/badges: allowed where semantic, but not as the dominant aesthetic

Recommended radius bias:

- section shells: `20px` to `32px` max when a section needs separation
- cards/panels: `16px` to `24px`
- buttons: `999px` only when the interaction benefits from a strong CTA feel
- avoid excessive all-over rounded treatments that make the interface feel consumer-soft

If choosing between:

- `blocky + technical`
- `smooth + friendly`

Choose `blocky + technical`.

## Visual Personality

The visual system should lean toward:

- dark surfaces
- strong contrast
- sparse but intentional accent color
- editorial hierarchy
- visible structure and framing
- technical restraint

It should avoid:

- overly bubbly UI
- excessive gradients
- soft SaaS polish
- whimsical shapes
- generic startup minimalism

The design should feel like a club for builders with standards, not a generic student organization trying to look trendy.

## Typography

Typography does most of the heavy lifting. Headlines should feel assertive and directional; body copy should stay clean and readable. Headings should create strong scan hierarchy before color or decoration does.

Good typography choices should make the club feel more serious before any image or accent is added.

Use typography to create urgency, technical confidence, momentum, and progression through the page.

### Font System — Locked

Two fonts. No others.

| Role | Font | Weights in use |
| --- | --- | --- |
| **Display / headings** | Satoshi | 400 Regular, 500 Medium (heading-1/2) |
| **Body / UI** | Inter | 400 Regular, 500 Medium, 600 SemiBold |

CSS variables: `--font-satoshi` (display), `--font-inter` (body).

**Allowed:**
- `Satoshi` — all display headings (`display-1` through `heading-2`), card titles
- `Inter` — body copy, eyebrows, CTAs, pills, labels, captions, meta text, any UI chrome

**Not allowed:**
- `Darker Grotesque` — superseded. Remove remaining `font-[family-name:var(--font-darker-grotesque)]` overrides on next cleanup pass.
- `HK Grotesque` — superseded by Satoshi. Remove from display headings and component overrides on next cleanup pass.
- Any other typeface without explicit approval in this document.

### Heading Scale

Five steps. Encode as Tailwind utilities (`text-display-1` through `text-heading-2`). Do not use raw `text-[Xvw]` or arbitrary `clamp()` literals in new code — always use the token.

| Token | Size | Weight | Tracking | Leading |
| --- | --- | --- | --- | --- |
| `display-1` | `clamp(52px, 8vw, 108px)` | 400 Regular | `−0.02em` | `1.0` |
| `display-2` | `clamp(38px, 5.5vw, 80px)` | 400 Regular | `−0.015em` | `1.05` |
| `display-3` | `clamp(28px, 4vw, 54px)` | 400 Regular | `−0.01em` | `1.1` |
| `heading-1` | `clamp(20px, 2.4vw, 30px)` | 500 Medium | `−0.005em` | `1.2` |
| `heading-2` | `clamp(16px, 1.6vw, 22px)` | 500 Medium | `0em` | `1.3` |

### Opacity Tiers — Locked

Four tiers. No arbitrary values.

| Token | Value | Used for |
| --- | --- | --- |
| `--fg` | `#EDEDED` / `text-white` | Full foreground — headings, active labels |
| `--fg-body` | `white/90` | Hero lede, primary body copy |
| `--fg-muted` | `white/72` | Card body, paragraph text, nav links |
| `--fg-faint` | `white/48` | Eyebrows, step labels, captions, pill text |
| `--fg-ghost` | `white/28` | Outcome labels, credits, chrome metadata |

Border tiers: `white/10` (default line, 50+ uses), `white/20` (hover/active state).
Background tiers: `white/5` (pill chip fill), `white/10` (card hover fill).

Do not introduce new opacity values. Round to the nearest tier.

### Body and UI Text

| Role | Font | Size | Weight | Notes |
| --- | --- | --- | --- | --- |
| Lede paragraph | Inter | `19px` | 400 | `line-height: 1.55`, `color: white/72` |
| Body copy | Inter | `15px` / `17px md` | 400 | `line-height: 1.55`, `color: white/72` |
| Eyebrow | Inter | `12px` | 600 | `uppercase`, `tracking: 0.22em`, `color: white/48` |
| CTA / button | Inter | `13px` | 600 | `uppercase`, `tracking: 0.16em` |
| Caption / meta | Inter | `11–13px` | 600 | `uppercase`, `tracking: 0.18em`, `color: white/28–48` |

## Color and Accent Use

Base palette:

- black / near-black backgrounds
- white / off-white text
- muted gray support text

Surface — locked:

| Token | Hex | Role |
| --- | --- | --- |
| `--surface-base` | `#0A0A0A` | Page background. Confirmed on retina and IPS. |
| `--surface-raised` | `#111111` | Cards, panels, elevated surfaces |
| `--surface-deep` | `#050505` | Inset areas, code blocks, deep recesses |

Core accent colors — locked:

| Token | Hex | RGB | Role |
| --- | --- | --- | --- |
| `--accent-purple` | `#B300FF` | `179,0,255` | Primary accent — stage markers, glows, status |
| `--accent-green` | `#4DFF94` | `77,255,148` | **Dark surfaces only.** Washes out on light. |
| `--accent-green-light` | `#00994D` | `0,153,77` | Light surfaces only — darkened for legibility |

Two accent hues. No others. `--accent-green` and `--accent-green-light` are the same brand green at different luminosity for their surface context. This is the D1 decision (chosen May 2026).

**Documented partner co-brand exception.** The Mentorship × Databricks hero (`MentorshipAsciiHeroSection.tsx`) renders in Databricks orange (`#FFB194` / `#FF6836`). This is a sanctioned co-brand exception scoped to that one program hero and must not be cited as precedent for introducing additional accent hues elsewhere. New partner co-brands require explicit approval and the same scoped containment.

These are brand signals and should remain the dominant accent language across the site.

Accent colors should be used as signals, not wallpaper.

Good uses:

- section markers
- status signals
- stage indicators
- subtle glow or radial emphasis
- progression cues

Bad uses:

- flooding large surfaces
- decorative rainbow usage
- gradients without information value
- section color changes with no semantic purpose

Accent should feel like system state, not decoration.

## Retro-Futurist Systems Layer

The site should carry a subtle professional retro-futurist layer.

Reference feeling:

- Marathon-style systems aesthetics

But this should remain an influence, not a costume.

It should show up through:

- framing lines
- stage markers
- status dots
- small system labels
- sparse grid logic
- signal color usage
- interface-like cues around structure and navigation

It should not show up through:

- overt sci-fi cosplay
- novelty-first HUD clutter
- lore-heavy visual references
- heavy game-like ornamentation

Rule:

- professional first
- retro-futurist second

If the retro layer becomes the main thing users notice, it is too strong.

## Imagery

Default image treatment should be:

- documentary + editorial

That means:

- real event photos
- strong crops
- controlled overlays
- typography-led framing
- images used as proof, not filler

Avoid:

- overly cinematic effects by default
- stock-photo energy
- overprocessed stylization
- decorative image use without narrative or proof value

Images should make the club feel active, inhabited, and real.

## Motion

Motion should support scan and feedback, not spectacle.

Default motion bar:

- restrained
- precise

Use motion for:

- fast hover response
- small lift on interactive cards
- precise arrow/icon shifts
- restrained image scaling
- helping content enter in an intentional order

Avoid:

- slow UI transitions
- repeated theatrical animation
- motion that competes with reading
- ambient motion with no hierarchy or feedback purpose

Default rule:

- homepage sections may feel cinematic in composition
- UI interactions should still feel immediate

## Homepage Guidance

The homepage should sell the system in this order:

1. hero
2. spotlight
3. club identity
4. credibility
5. experience/values
6. program progression
7. conversion CTA

Important:

- hero should keep users on-site
- homepage should imply standards before it implies friendliness
- spotlight should show what we are actively cooking
- proof and outcomes should feel structural, not decorative
- programs should be introduced as a progression, not a random list
- Discord should be a later commitment CTA, not the first exit

The homepage should make it clear that Tech@NYU is not just active. It is formative.

## Program Presentation

Programs should feel like structured steps inside one ecosystem.

Current framing:

- Tech Treks: Find Your Role
- Mentorship: Hone Your Role
- Dev Team: Practice Your Role
- Startup Week: Contribute and Network Back

When presenting programs:

- lead with stage meaning first
- then explain audience fit
- then explain payoff
- make the ladder feel like a talent-development system, not four unrelated offers

Do not default to generic marketing cards if a stronger narrative structure is available.

## Component Bias

When designing new components, prefer:

- framed containers
- visible borders
- layered dark surfaces
- restrained glow
- asymmetry when it improves hierarchy
- strong title-to-body contrast

Avoid:

- floating soft cards everywhere
- over-rounding all components equally
- decorative elements with no structural purpose
- surfaces that feel casual when they should feel important

## What This Is Not

Tech@NYU should not feel like:

- soft campus marketing
- generic startup SaaS
- overt sci-fi skinning
- messy builder chaos
- polished but culturally empty institutional branding

If a direction feels:

- too soft
- too playful
- too institutional
- too themed
- too unserious

it is off-brand.

### Patterns explicitly banned

These patterns have been called out by name as off-brand:

**Section annotation boxes** — bordered or backgrounded cards placed at the top of a section that narrate what the section is ("Our Programs · Stage Overview · Here's what each stage means"). This looks like an AI-generated design system spec, not editorial UI. Sections should be self-evident from heading hierarchy, eyebrows, and content. Never add a small labeled box to explain the section to the reader.

**Stage/color legend cells** — a grid of labeled squares showing stage names, hex values, or descriptions ("Stage 01 / Tech Treks / #B300FF — Pure Purple"). These are design documentation, not site UI. Color identity should be communicated through application, not declaration.

## Decision Rule

When unsure between two valid options, choose the one that feels:

- more technical
- more structured
- more editorial
- more blocky
- more serious
- more like a high-standard room people want to earn their way into
- less soft

That should be the default Tech@NYU bias unless a specific section has a strong reason to deviate.
