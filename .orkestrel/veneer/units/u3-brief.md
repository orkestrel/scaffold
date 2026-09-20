# Unit U3 — the token contract

## Role and engine

`opus` on native Opus 5. You are a native subagent: perform the assignment directly and spawn
nothing. You are the sole writer in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`)
for the life of this unit.

## Objective

Land Veneer's token contract: `src/styles/_tokens.scss` as the value authority for every
`--vn-*` token and every `--bs-*` root alias Bootstrap 5.3.8 declares, `src/styles/_theme.scss` as
the theme authority with nesting islands, the declaration-only mixins, the document baseline
partials, the typed name registry `TOKEN_NAMES` in `src/core`, the browser proofs that bind the
cascade to the registry and to the calibrated readings on managed Chromium and Edge, and
`guides/tokens.md`; with `check`, `build`, and every test project green.

## Context

**The design.** Implement the subjective lane's proposal,
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-design-planner-report.md`,
as amended by the Orchestrator's rulings in
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u3-design-verdict.md`. Where the two
disagree, the verdict wins. The objective lane's report
(`u3-design-analyst-report.md`) lists the risks the verdict rules on; read its § Risks once.

**Values.** `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/calibration.md`
(runs 5 and 6 of 2026-09-20: type, space, colour including § Semantic roles and canvas,
interaction states, elevation, motion, departures), `u2-run-6-extract.md` (every
per-variant string), and `research/instruments.md` (the sRGB triplets, including the painted dark
primary `0, 172, 236`). For the subtle tiers' mix percentages you may read Elements' token
source at `C:/Users/mikes/WebstormProjects/elements/src/styles/_tokens.scss` and its variant
partials (read only; import nothing from it); the proof compares the resolved tier colours
against the run 6 strings through parsed colours. Every value in `_tokens.scss` traces to a row there, or
to `research/inventory.json` (`root` and `dark`) as a retained Bootstrap value with its reason in
the guide, or is not declared. `research/ledger.md` § Token rows is the alias obligation list.

**The checkout.** Clean at the commit the dispatch message names, after U1 landed: the styles axis
(`src/styles/index.scss` loads `tokens` and `theme`; `_tokens.scss` holds the layer statement and an
empty `:root`; `_theme.scss` an empty dark scope; `_mixins.scss` `reduced-motion`, `transition`,
`forced-colors`), the `src:styles` browser project (`configs/src/vite.styles.config.ts`, run through
`npm run test:src:styles`, which builds first), `tests/setupStyles.ts` loading the built cascade,
`tests/src/styles/index.test.ts` proving the layer order, the ColorMode engine in `src/browser`
(`COLOR_MODE_ATTRIBUTE` is `data-bs-theme`; `apply('light')` removes the attribute), and the
guides parity suite. `src/core/index.ts` is empty and `tests/src/core/index.test.ts` asserts that.

**Law.** `AGENTS.md`; `.claude/rules/styles.md`, `names.md`, `typescript.md`, `architecture.md`,
`tests.md`, `documentation.md`, `writing.md`; the skill
`.agents/skills/orkestrel-harden-package/SKILL.md` on its capability lane with
`references/contract.md` and `references/hardening.md`; the skill
`.agents/skills/orkestrel-prove-journey/SKILL.md` with `references/styles.md` for the style
readers. All under `C:/Users/mikes/WebstormProjects/scaffold/`.

**Installed primitives.** `@orkestrel/test/browser`: `readRules`, `findRule`, `readRootToken`,
`readStyle`, `readPixels`, `mount`, `build`, `extractStyles`, `buildEscapes`, `waitForAnimations`;
`@orkestrel/test`: `createRecorder`, `requireValue`; `vitest/browser`: `cdp()` for
`Emulation.setEmulatedMedia` (proved in `instruments.md`). A helper whose job an installed export
does is a defect.

**Host.** Windows, Git Bash. `npm run <name>`; managed Chromium `1243` by default, Edge through
`PLAYWRIGHT_CHANNEL=msedge`. No install. Do not run `scaffold repair`; do not run tree-wide
`format` or lint `--fix` (run `npm run format` by path on files you own).

**Fleet name ownership.** Before declaring any public TypeScript name, read
`node_modules/@orkestrel/scaffold/dist/host/guides/*.md` for a `Surface` row carrying it.
`TokenMap`, `TokenName`, `TokenLeaf`, and `TOKEN_NAMES` were free on 2026-09-20; check again and
record each check in the report.

**Control identifiers.** `PLANT-GHOST` (a `--vn-ghost` declaration added to `_tokens.scss`),
`PLANT-DROP` (a mapped name deleted from `_tokens.scss` and kept in `TOKEN_NAMES`), `PLANT-SCOPE`
(`--vn-border-width` relocated from `:root` into the light block alone), `PLANT-PAIR` (an
`h1 + p` rule added to an elements partial), `PLANT-PHYSICAL` (a `margin-left` declaration added to
an elements partial), `PLANT-LISTENER` (a `globalThis.addEventListener('resize', …)` in
`src/core/constants.ts`). Name each test for what it proves, never for the control; remove every
plant and prove removal with `git diff --exit-code -- <file>` for each planted file.

**Carried from U1's audit (documented obligations that become reachable once this unit lands
declarations).** In `tests/setupStyles.ts`, `scanPhysicalDeclaration` guards the byte-copied RTL
cascade; extend its cascade case in `tests/setupStyles.test.ts` to require at least one
declaration once `_tokens.scss` declares tokens; normalize whitespace inside a parenthesized
token before the edge comparison so `calc( 1px )` equals `calc(1px)` (U1 round-6 N17); make the
scanner's limit sentence name the value form — a side-keyword property is scanned for a `left`
or `right` token only, so a percentage or length side is not scanned (N18); and reflow the
wrapped clause in `matchesRadiusShorthand`'s `@returns` (N19). Those files join this unit's
owned list for these edits only.

## Unknowns

- Whether `box-shadow` collapses a registered-factor `calc()` into the calibration's exact string
  on both engines. Read it in the values proof; if it does not collapse, move the elevation factor
  off `box-shadow` onto the shadow tokens' geometry and record the reading.
- Whether `interpolate-size: allow-keywords` resolves through `getComputedStyle` on both engines;
  record the raw reading either way.

## Scope

**Owned.** `src/styles/**`, `src/core/types.ts`, `src/core/constants.ts`, `src/core/index.ts`,
`tests/src/styles/**`, `tests/src/core/index.test.ts`, `tests/setupStyles.ts`,
`tests/setupStyles.test.ts`, `guides/tokens.md`, `guides/veneer.md` (the core rows of `## Surface`
and the `## Tests` links only), `guides/README.md` (an index line for the token reference only),
`README.md` (one sentence naming the token reference).

**Shared (report-only).** `package.json`; `tests/guides.test.ts` (return a patch if `MODULES`
needs a change). **Off-limits.** Every vendored and content-owned path, `src/browser/**`,
`app/**`, `tests/app/**`, `tests/src/browser/**`, `configs/**`, `tests/setupBrowser*.ts`,
`tests/setupConformance*.ts`, `tests/conformance.test.ts`, `tests/distribution.test.ts`.

**What asserts the state this change ends.** `tests/src/core/index.test.ts` (asserts an empty
barrel today), `tests/src/styles/index.test.ts` (layer order; gains the tag-pair and
physical-property proofs), `tests/guides.test.ts` (the new core exports must be documented),
`tests/conformance.test.ts` (the closure from `src/styles/index.ts` must stay under `src/`;
the built declarations must carry no foreign specifier).

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash` for the scoped gates. No
`git` command that writes the index or discards a change.

## Execution

Perform the assignment directly and spawn nothing. Types first, then the cascade, then the proofs,
then the guide; run the narrowest project after each step.

1. **Registry.** `src/core/constants.ts` declares `TOKEN_NAMES` (frozen at every level, `as const`
   on each literal, a path is its name); `src/core/types.ts` declares `TokenLeaf`, `TokenMap`,
   `TokenName` as the planner wrote them; `src/core/index.ts` star-exports both. Extend
   `tests/src/core/index.test.ts`: the export set; every group frozen; every leaf equals `--vn-`
   plus its joined path (derived by walking the tree, never restated); a dynamic import of the
   barrel registers no listener on `globalThis` (recorder installed before the import, with the
   deliberate-listener control) and touches no DOM (the Node project fails the import outright).
2. **Cascade.** `_tokens.scss` and `_theme.scss` per the verdict's Theme layering, Factors,
   Semantic roles, Tiers, `-rgb`, Naming, and Bootstrap-only retune rulings, with a `palette-each`
   mixin in `_mixins.scss` emitting the role tiers, and a `theme-tokens` mixin emitting the
   theme-dependent closure into `:root` and both attribute blocks. `elements/_html.scss` and
   `elements/_body.scss` per the verdict; `index.scss` loads `tokens`, `theme`, and the two element
   partials in that order and never `mixins`. Author logical properties only.
3. **Setup.** `tests/setupStyles.ts` gains the exported `BOOTSTRAP_ROOT_VARIABLES` constant
   (the `root` key names of `inventory.json`, copied as a frozen array with the Bootstrap version
   and digest in its TSDoc) and `BOOTSTRAP_DARK_VARIABLES` likewise; `tests/setupStyles.test.ts`
   proves both against the inventory's counts and the pinned identity.
4. **Proofs** in `tests/src/styles/`, named for their partials, exactly the planner's § 5 rows as
   the verdict amends them: `tokens.test.ts` (parity over LTR and RTL, values against the
   calibration through consuming properties, island and geometry, invalid and cycle, nesting),
   `theme.test.ts`, `mixins.test.ts` (through a fixture stylesheet under
   `tests/src/styles/fixtures/` compiled by Vite, and `cdp()` media emulation), `index.test.ts`
   (layer order, no two-bare-tag selector in the elements layer outside HTML-mandated pairings,
   no physical inline-axis property anywhere in the shipped cascade), `elements/html.test.ts`,
   `elements/body.test.ts`, and `integration.test.ts` executing the guide's recipe. Colour
   assertions compare through parsed colours, never strings. Run each planted control red, record
   the exact assertion, remove it.
5. **Guides.** `guides/tokens.md`: the reference map (group, token, value, source — `elements`
   with the calibration row, `bootstrap` retained with reason, or `derived` with the expression —
   and the `--bs-*` aliases), the customization recipe as one `ts`-free `css` fence the
   integration proof transcribes, the Elements departures table, and the deferred names
   (`scroll-padding`, the hover and active tints, `focus-ring`, `breakpoint-down`).
   `guides/veneer.md` documents the four core exports in `## Surface` with `Summary` cells equal to
   their TSDoc description paragraphs and links the core proof under `## Tests`. Keep
   `test:guides` green.
6. **Gates.** `npm run format:check`, `lint:check`, `check`, `build`, then `test:src`,
   `test:src:styles`, `test:app`, `test:journey`, `test:policy`, `test:config`, `test:setup`,
   `test:setup:browser`, `test:conformance`, `test:guides`; then `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles`
   and `PLAYWRIGHT_CHANNEL=msedge npm run test:src`. Record each command's final lines.

## Output

Write `u3-report.md` in the Veneer checkout and return its content: the files created
and changed; every planted control with its red assertion and green removal; the two unknowns'
readings; the name checks; each gate command's final lines on both browsers; every value you
declared that traces to a Bootstrap retained value, with its reason; and every deviation with
expected, found, exact evidence, done or not done, and at most one hypothesis. No process diary.

## Deviation contract

Stop and report on: a rule that forbids a declaration the verdict requires; a gate that stays red
after your own fix inside owned files; a need to edit an off-limits file; a browser reading that
contradicts a calibration row on both engines (report the row, do not adjust the token). Decide,
record, and carry on from: helper and mixin names, table order in the guide, the fixture
stylesheet's shape, and the wording of TSDoc.

## Acceptance criteria

1. `format:check`, `lint:check`, `check` exit 0.
2. `build` exits 0 and `dist/src/styles/index.css` declares every `--vn-*` leaf of `TOKEN_NAMES`
   and every `--bs-*` root variable of the inventory.
3. Every test project exits 0 on managed Chromium, and `test:src:styles` and `test:src` exit 0 on
   Edge.
4. Each of the six planted controls turned its named assertion red and every plant is removed.
5. `git status --porcelain` shows only owned files changed or added, and the report.

**Observations, not criteria.** `test:journey` on Edge; the `distribution` project under
`--mode release`.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report; the built
`dist/src/styles/index.css`.
