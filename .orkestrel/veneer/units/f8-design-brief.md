# Design brief — F8 TAILWIND, the standalone profile and the supported Tailwind profiles

## Role and lane

This brief reaches two blind lanes on the same text: `planner` on Opus (subjective: the shape a
consumer meets, the naming, the guide's contract) and `analyst` on GPT-6 Astra through
`codex exec --sandbox read-only` rooted at `/home/user/veneer` (objective: what the cascade, the
build, and the proofs permit). Say which lane you hold. Perform the design directly, spawn nothing,
edit nothing. You are read-only.

## Objective

Propose the unit plan for F8 TAILWIND: how Veneer proves, in the browser, its standalone profile
and each supported combination with Tailwind CSS 4.3, with Bootstrap winning every shared class
name, while declaring no Tailwind dependency in its runtime requirements.

## Context

**Terrain (the measurements; this brief restates none).**
`/home/user/scaffold/tmp/units/f8-terrain-report.md` (§ A the fleet's Tailwind wiring in Elements
and Mailbox — `tests/setup.css`, the PostCSS plugin, the setup files, the proofs, the guide
sentences; § B scaffold's rules on `tests/setup.css` and layer order; § C Veneer today — the layer
declaration, the barrel, the styles config, the projects, the browser setup, the layer-order case,
the guide's Tailwind sentences, and the roadmap lines); `/home/user/scaffold/tmp/units/f8-tailwind-intersection.json`
(the Orchestrator's measurement with the installed `tailwindcss` 4.3.3 compiler: 209 of the oracle
inventory's class names also generate a Tailwind utility, listed under `sharedClassNames`; 31
elements both Tailwind's preflight and Bootstrap's reboot style, listed under
`preflightRebootOverlap`; the probe is `f8-tailwind-intersection.mjs` beside it in the campaign
folder); `/home/user/scaffold/tmp/units/f8-terrain-3-report.md` (Tailwind 4.3.3's installed files:
`index.css` declares `@layer theme, base, components, utilities` and inlines theme, preflight, and
the utilities directive; `theme.css`, `preflight.css`, `utilities.css` are the composable parts; the
per-element preflight declarations; what the installed files do not state and the documentation
pages that do). Where this brief and the terrain disagree, the terrain and the tree win.

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/styles.md` (the
layer-order line: declare cascade-layer order once in the consumer entry before `@import
'tailwindcss'`), `workspace.md` (`tests/setup.css` declares cascade-layer order before `@import
'tailwindcss'` and its `@source`; browser setup wires `setup.css`; styles setup loads `setup.css`
and the compiled cascade), `tests.md`, `documentation.md`, `writing.md`. Guide:
`/home/user/veneer/guides/veneer.md` § Styles (the important-utility contract as unit F6 landed it
in `/home/user/veneer-f6/guides/veneer.md` § Styles: every Bootstrap utility ships with Bootstrap's
own `!important`; the consumer escape re-opens the utility's own layer; where a class name exists in
Bootstrap and in Tailwind, Bootstrap's declaration wins). Plan of record: `/home/user/veneer/ROADMAP.md`
(§ Tenets: "Remain compatible with Tailwind CSS without requiring it … Prove the supported
combinations in the browser. Veneer must also work independently of Tailwind"; § Rulings D2 and
D6; the F8 row; § Carriers "Tailwind tooling"; the exit criterion's Tailwind line).

**Installed.** `tailwindcss` 4.3.3 and `@tailwindcss/postcss` 4.3.3 under `/home/user/veneer/node_modules/`
(development dependencies, commit `104a573`); `@orkestrel/test` browser exports (`scene`, the
cascade readers, `readLayers`, `readRules`, `findRule`); Veneer's own `@layer theme, reset, base,
elements, components, utilities` in `src/styles/_tokens.scss`.

**Host.** Linux, bash, Node 22, npm 11 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`);
Chromium 141 at `/opt/pw-browsers`. The analyst's sandbox denies the loopback listener, so it runs
no browser project.

## Questions the lanes answer

1. **What a profile is.** Define "the standalone profile" and "a supported Tailwind profile" as
   things the tree can build and a browser proof can mount: which stylesheet entry each is, which
   layer order it declares, whether Tailwind's preflight is in or out of each supported profile (the
   31 overlapping elements decide what a profile with preflight does to Bootstrap's reboot), and
   which of Tailwind's composable imports (`theme.css`, `preflight.css`, `utilities.css`) each
   profile takes. Name each profile.
2. **Where the profile lives.** `tests/setup.css` per the scaffold rule (the workspace row says it
   declares layer order ahead of `@import 'tailwindcss'` and `@source`): whether one `setup.css`
   carries the Tailwind profile for the proofs while the standalone profile is the existing
   `src/styles/index.scss` build, or whether a consumer-facing entry under `src/styles/` (or a
   documented consumer recipe in the guide) is the product. The tenet says Veneer must not require
   Tailwind, so rule where the Tailwind side is proved without shipping it.
3. **Bootstrap wins.** For each of the 209 shared class names, what "Bootstrap's declaration wins"
   means concretely when both stylesheets are loaded (Veneer's utilities carry `!important`; Tailwind's
   sit in its `utilities` layer without it; layer order and importance decide), how one proof over
   the whole shared set is written (drive the list from the measured JSON or from a probe the proof
   runs itself, never a literal copy), and what the proof reads through the installed readers so a
   wrong winner fails.
4. **The reboot under preflight.** For the 31 overlapping elements, whether the profile with
   preflight keeps Bootstrap's reboot values (which layer order makes that true and what the proof
   asserts per element), or whether the supported profile is preflight-free and the guide says so.
5. **The build and the projects.** How the Tailwind side is compiled for the proofs (`@tailwindcss/postcss`
   in a Vite project's `css.postcss`, or the `@tailwindcss/vite` plugin, or a `node` probe compiling
   through `@tailwindcss/node` the way the intersection probe did) without touching the published
   build; which Vitest project owns the profile proofs (`src:styles`, a new `src:tailwind` project
   in `vite.config.ts`, or the journey); and what the `@source` rule scans in this tree.
6. **The guide.** The rows and paragraphs § Styles and § Compatibility owe: the named profiles, the
   layer-order recipe a consumer copies, the shared-class rule, the preflight ruling, and the
   sentence the guide already carries about `tests/setup.css` arriving with the Tailwind unit
   (`guides/veneer.md` around line 448).
7. **Risks.** What a unit is likeliest to get wrong, and the acceptance criterion that catches it.

## Output

A proposal, not a decision: for each question, the ruling you argue for and the evidence behind it
(`file:line`), then a unit table (unit, owned files, shared files, depends on, acceptance criteria,
risks), and one terminal line `PROPOSAL: <one sentence>`. Cite the terrain by its section and the
tree by `file:line`. No process diary.
