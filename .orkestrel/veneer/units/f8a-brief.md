# Unit F8a PROFILES — brief

## Role and engine

`opus` on Opus (native Claude subagent; the CLI serves Opus 5 for the alias), sole writer in
`/home/user/veneer-f8`, a git worktree detached at `6e74ec9` (the session branch after F6 landed).
Perform the assignment directly and spawn nothing.

## Objective

A package-owned `src:tailwind` browser project proves the shape of Veneer's three stylesheet
profiles: the `tailwind` and `preflight` profiles compile through the installed `@tailwindcss/postcss`
plugin and declare the one layer-order line, the Veneer sheet reader identifies Veneer's sheet while a
Tailwind sheet is loaded, the standalone `src:styles` document is proved Tailwind-free, and the guide
carries the profile table, the two consumer recipes, and the two workspace departure rows.

## Context

- **Ruling.** `/home/user/scaffold/.orkestrel/veneer/f8-design-verdict.md` is the design. Read it
  first; its rulings 1 to 8, 10, and 11 bind this unit, and ruling 9 belongs to F8b. Where this
  brief and the verdict disagree, the verdict wins; where the verdict and the tree disagree, stop and
  report.
- **Measurements.** `/home/user/scaffold/.orkestrel/veneer/units/f8p-probe-readings.md` records what
  the installed compiler does (the composable `layer()` imports, `source(none)`, the CSS-file ignore,
  the text-file scan, the `@source not inline(...)` exclusion, the 17 shipped shared names); the
  instruments are `f8p-probe.mjs`, `f8p-probe-2.mjs`, and `f8p-probe-3.mjs` beside it. The terrain
  is `units/f8-terrain-report.md` (the fleet's wiring in Elements and Mailbox, scaffold's rules,
  Veneer's projects) and `units/f8-terrain-3-report.md` (Tailwind 4.3.3's installed files).
- **Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,workspace,tests,typescript,architecture,names,documentation,writing,portability}.md`.
  `workspace.md` around line 188 states the `tests/setup.css` rows this unit departs from, and the
  guide already records the departure as a deferral bullet.
- **Guide.** `guides/veneer.md` § Styles: the important-utility paragraph and its sentence
  `Where a class name exists in Bootstrap and in Tailwind, the declaration Veneer ships is Bootstrap's`
  (around line 152), `### Files` (around line 172), `### Departures from the workspace rows` (around
  line 458) with the bullet `**The \`tests/setup.css\` file arrives with the Tailwind unit.**` (around
  line 495), and § Tests. Locate each by heading and text, never by number.
- **Patterns in the tree.** `configs/src/vite.styles.config.ts` spreads the browser configuration
  and replaces the differing fields by assignment; read its comment for why, and its imports for where
  `outputBoundary` lives, which is where a config-layer plugin belongs. `package.json` scripts
  `test:src`, `test:src:styles`, and `build:src` (around lines 61 to 78). `tests/setupBrowser.ts`:
  `readCascadeSheet` (around line 847) selects the first sheet with a `theme` layer block, and
  `scene.load` (around line 778) appends a `<style>` element and records its removal;
  `tests/src/styles/index.test.ts` walks layer statements and blocks for the order case and plants a
  sheet with `scene.load`. The fleet attaches the plugin as `css: { postcss: { plugins: [tailwindcss()] } }`
  with `import tailwindcss from '@tailwindcss/postcss'` (`/home/user/elements/vite.config.ts` around
  lines 8, 164, and 185; read-only reference, never a source of names or logic).
- **Host.** npm 11.19.1 on `PATH`
  (`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`),
  Chromium 141 at `/opt/pw-browsers` (`export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`),
  `node_modules` installed from this worktree's lockfile. `tailwindcss` and `@tailwindcss/postcss`
  4.3.3 are development dependencies already (D2); add no package. Other worktrees' gate chains run
  beside you; a journey timing failure is the Orchestrator's reading.
- **Standing conditions.** Three sibling units (F5c, F7, F5b) land on the session branch while you
  work, and your tree is integrated afterwards by cherry-pick. Keep your edits to `guides/veneer.md`,
  `tests/setupBrowser.ts`, and `tests/setupBrowser.test.ts` localized: a new subsection, a new
  function or a new parameter with its own cases appended, never a reflow of surrounding text.
  `tmp/` is gitignored and is where the candidates file lives.

## Unknowns

- Whether a `?inline` import of a profile file runs the PostCSS chain under the browser project.
  Settle it first, by a throwaway case under `tmp/probe/` (delete it before reporting). If it does
  not, the fallback is one Vitest project per Tailwind profile with the profile as a setup file;
  record the measurement and the fallback as a deviation, then take it.
- Whether a plugin hook in the config runs before Tailwind compiles the profile. Settle it by the
  unexcluded instrument emitting `.container` and `.table` (the candidates file's names). If no hook
  precedes the compile, the fallback is a committed `tests/fixtures/tailwind/candidates.txt`
  regenerated in the ledger's refresh loop and drift-gated against the built cascade; record it as a
  deviation, then take it.

## Obligations

### Obligation 1 — the project and the scripts

`configs/src/vite.tailwind.config.ts` spreads the browser configuration the way the styles wrapper
does, attaches `@tailwindcss/postcss` under `css.postcss`, names the project `src:tailwind`, includes
`tests/src/tailwind/**/*.test.ts`, and mirrors the styles project's setup files ending in the built
cascade. A config-layer plugin writes `tmp/tailwind/candidates.txt` — every class name the built
cascade `dist/src/styles/index.css` declares, one per line, read the way the probe reads them — before
Tailwind compiles. `package.json` gains `test:src:tailwind` (`npm run build:src:styles && vitest run
--config configs/src/vite.tailwind.config.ts --no-cache --reporter=dot`) and `test:src` gains it after
`test:src:styles`. The root `vite.config.ts` is not edited.

### Obligation 2 — the profile files

`tests/setup.css` carries the `tailwind` profile as the test executes it: the order line
`@layer theme, reset, base, elements, components, utilities;`, `@import 'tailwindcss/theme.css' layer(theme);`,
`@import 'tailwindcss/utilities.css' layer(utilities) source(none);`, `@source '../tmp/tailwind/candidates.txt';`,
and the exclusion line `@source not inline("caption-bottom caption-top col-auto col-1 col-2 col-3 col-4 col-5 col-6 col-7 col-8 col-9 col-10 col-11 col-12 container table");`
written without brace ranges. `tests/fixtures/tailwind/preflight.css` is the same with
`@import 'tailwindcss' source(none);` in place of the two composable imports.
`tests/fixtures/tailwind/unexcluded.css` is `tests/setup.css` without its exclusion line. None of
them imports the cascade; the project loads it as a setup file.

### Obligation 3 — `tests/src/tailwind/profiles.test.ts`

Each case loads a profile through `scene.load` after the built cascade and clears in `afterEach`.
Prove, with `file:line`-citable assertions:

- each Tailwind profile's sheet opens with the order line and the document's effective layer order
  stays `theme, reset, base, elements, components, utilities` (extract the order walk from
  `tests/src/styles/index.test.ts` into `tests/setupBrowser.ts` as an exported reader if both need
  it, and test it);
- the `tailwind` profile's sheet carries `theme` and `utilities` layer blocks and no `base`; the
  `preflight` profile's carries `base`;
- the `unexcluded` instrument's sheet declares `.container` and `.table` (the candidates reached the
  compiler) while the `tailwind` profile's declares neither (the exclusion held);
- the Veneer sheet reader returns Veneer's sheet while a Tailwind sheet is loaded, and refuses a
  planted sheet `@layer theme { :root { --tw-probe: 1 } }`; give `readCascadeSheet` a Veneer-only
  signature (its `--vn-` declaration at `:root` inside the `theme` block, or the signature you
  measure) and pin it in `tests/setupBrowser.test.ts` with that plant.

### Obligation 4 — the standalone case

`tests/src/styles/index.test.ts` gains a case proving no Tailwind sheet reaches the standalone
document (no stylesheet declares a custom property with the `--tw-` prefix, and exactly one sheet
carries the Veneer signature; refine the signature from what you measure). Record the plant that
reddens it: loading `tests/setup.css?inline` into that document. That import must not stay in the
`src:styles` project; take the plant's reading from a throwaway run and record the command.

### Obligation 5 — the guide

§ Styles gains `### Tailwind` after `### Files`: the profile table (profile, entry, layers, Tailwind
parts, proof file); one recipe fence per Tailwind profile in the consumer's form (the order line, the
imports without `source(none)`, `@source './src';` for the consumer's markup, the exclusion line, then
`@import '@orkestrel/veneer/styles';`), with the sentence that the order line never changes between
profiles; the sentence that the exclusion line is the one home of the excluded names and that
`tests/src/tailwind/profiles.test.ts` reads it from `tests/setup.css`; the supported Tailwind version
(4.3) and the command `npm run test:src:tailwind`. The deferral bullet in § Departures from the
workspace rows becomes the two landed rows the verdict's ruling 3 names. § Tests names the proof file.
The F6 sentence about shared class names points at the subsection. Leave the shared-name rule's proof
prose and the preflight departure table to F8b; write nothing as a placeholder.

## Scope

- Owned: `configs/src/vite.tailwind.config.ts`, `package.json` (scripts only), `tests/setup.css`,
  `tests/fixtures/tailwind/preflight.css`, `tests/fixtures/tailwind/unexcluded.css`,
  `tests/src/tailwind/profiles.test.ts`, `tests/src/styles/index.test.ts`, `tests/setupBrowser.ts`,
  `tests/setupBrowser.test.ts`, `guides/veneer.md`, and the file `outputBoundary` lives in if the
  candidates plugin belongs beside it.
- Shared, report-only: `ROADMAP.md` (return the patch for the F8 row and § Carriers), `vite.config.ts`.
- Off-limits: `src/**`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/src/styles/**`
  other than `index.test.ts`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `package-lock.json`,
  every other file. No git command that discards a working-tree change.

## Execution

Perform the assignment directly and spawn nothing. Do not run tree-wide `format`, `lint --fix`, or
`build` beyond `npm run build:src:styles`; validate with `npm run format:check`, `npm run lint:check`,
`npm run check`, `npm run test:src:tailwind`, `npm run test:src:styles`, `npm run test:setup:browser`,
`npm run test:guides`, and `npm run test:policy`, then `npm test` once as an observation.

## Output

Write `tmp/units/f8a-report.md` and return the same text: the two unknowns' measurements with their
commands, every red-then-green reading with its command and count, the touched files, the guide
wording added, the `ROADMAP.md` patch, `git status --porcelain`, `git diff --stat`, the gate exits,
deviations per § Deviation protocol in `/home/user/scaffold/.agents/orchestration.md`, and the
claims you flag unverified. No process diary.

## Deviation contract

§ Deviation protocol governs. Ancillary choices this unit settles itself: the Veneer signature the
reader keys on, where the candidates plugin lives among the config-layer files, the case titles,
the profile table's column order, and the wording of the two departure rows. Stop and report when a
vendored policy sweep refuses a file this brief names or when the compiled profile cannot be loaded in
the browser project by either path the unknowns name.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
2. `npm run test:src:tailwind` exits 0 with the cases obligation 3 names present.
3. `npm run test:src:styles` exits 0 with the standalone case present, and its plant's red reading is
   recorded.
4. `npm run test:setup:browser` exits 0 with the reader's plant present.
5. `npm run test:guides` and `npm run test:policy` exit 0.
6. `grep -n 'tailwind' package.json` matches only the two development dependencies and the scripts;
   `grep -c -- '--tw-' dist/src/styles/index.css` prints 0 after `npm run build:src:styles`.
7. `git status --porcelain` lists only owned files.

## Review evidence

The report, `git diff 6e74ec9 --stat`, `git status --porcelain`, and the diff of every owned file.
