# Unit J-lloyds — prove lloyds' primary surface on `@orkestrel/test/browser`

## Role and engine

`implementer` on Opus 5, native Claude Code subagent, standing in for the Sol implementer (Codex
bench dark). Sole writer in `C:\Users\mikes\WebstormProjects\lloyds`. Perform the assignment
directly and spawn nothing.

## Objective

Write the browser-project journey suite `orkestrel-prove-journey` requires for lloyds' schedule
surface — journey, refusal, matrix, statechart, transport, and capture families on the published
layer — with the harness gate, the per-variant artifact, and the setup proofs the audit asks
for, the way terrain's suite does it.

## Context

Skill, read in full first: `C:\Users\mikes\WebstormProjects\scaffold\.agents\skills\orkestrel-prove-journey\SKILL.md`
and every reference (`layer.md`, `captures.md`, `styles.md`, `statechart.md`, `decide.md`).
Reference implementation to instantiate: terrain's `tests/app/browser/integration.test.ts`,
`tests/app/browser/setup.ts`, `tests/setup.test.ts`, and `tests/setupBrowser.test.ts` at
`C:\Users\mikes\WebstormProjects\terrain` (its journey block, families, variants, capture proof,
transport block, harness gate, artifact writer, and the `DeleteDriverInterface` seam that lets
one table serve the page and the suite). What transfers: `page.viewport` for the variant, never a
stage-and-release pair; close every dialog a journey opens before the test ends; take the
`extractStyles` reading before any journey drives the surface; append the census (an SVG element
carrying an undeclared token) and escape negative controls to the read root; read the variant
once; put the placement proof last; declare `transport` because the schedule persists through
IndexedDB. What lloyds re-derives: its variants and heights (read `LG_MEDIA` and Halfmoon's
breakpoint in `app/browser`), the class floor, the refusal voices the surface actually throws,
the budgets, the capture registry, and its own copy (`Add building`, not terrain's).

The surface's names: `C:\Users\mikes\WebstormProjects\lloyds\tmp\units\chrome-lloyds-report.md`
lists every accessible name the chrome unit changed, the harness route, and the table module in
`app/browser/constants.ts`. The absorption (`.orkestrel/scaffold/absorb-consumers-report.md`
§ lloyds) names the intents: add, select, delete through its confirmation, import, export,
template download, ZIP retry; the refusals (Delete disabled with a reason until a row is
selected, Import disabled while processing, Results disabled with nothing rated, a non-CSV file
refused); the transport (IndexedDB schedule and settings; `failBootDriver`-class drivers already
in `tests/app/browser/setup.ts`).

Standing conditions: chrome is committed; `git status --porcelain` shows the user's lockfile
pair; never stage, restore, or rewrite it. `node_modules/@orkestrel/test` is the registry's
0.0.12. Commit nothing; no `npm install`. `npx vitest run --config vite.config.ts --no-cache
--reporter=dot --project app:browser <file>` with `VITE_VARIANT` and `VITE_CAPTURE=true` as
terrain uses them.

## Work

1. `tests/app/browser/integration.test.ts` with `FAMILIES` declared and every family proved;
   `tests/app/browser/setup.ts` extended with the scenarios over the constants module's table, the
   portfolio, the journey driver, and the fixtures; the harness gate through the interface; the
   artifact per variant under `tmp/journeys/`; `tests/setup.test.ts` and
   `tests/setupBrowser.test.ts` covering their modules in a browser-enabled `setup` project
   registered as terrain did (record that `vite.config.ts` will read stale to the audit, owned by
   scaffold per `ROADMAP.md`), with the `test:setup` script and its place in the `test` chain.
2. Re-point every journey-path call site off the local `querySelector` helpers in
   `tests/app/browser/setup.ts` onto the layer's verbs; count and report the call sites that
   remain on component tests.
3. Runs: the four variants, the four capture runs, the harness gate, the setup project; scoped
   gates (`format:check`, `lint:check`, `check`); `npm test` as an observation.

## Scope

**Owned.** `tests/**` except the vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`,
`tests/config.test.ts`; `vite.config.ts` for the setup project only, recorded; `package.json`
scripts region for `test:setup` only, recorded; `guides/README.md` for the changed surface.
**Off-limits.** `app/**` (stop and report a seam the suite cannot reach), `configs/**`, the
lockfile pair, vendored files.

## Output

Write `tmp/units/journey-lloyds-report.md` and return it: the families and their proofs; the
variants and the readings per variant (contrast, ring, census floor); the refusal voices asserted;
the transport proofs; the capture readings per frame; the harness gate reading; the artifact
filenames; the setup proofs' counts; the duplicate-verb call sites re-pointed and remaining;
the run summaries; `git diff --stat`; `git status --porcelain`; claims not closed.

## Deviation contract

Stop and report when a family needs an `app/**` change, when a 390 frame reads the runner's
floor (a layer defect, never a workaround), when a name the chrome report lists does not resolve,
or when a run is red outside the suite. Decide and record names, budgets, and fixture shapes.

## Acceptance criteria

1. Every family declared is proved and no proof sits outside the declaration; every journey path
   imports the layer and reaches no selector, instance, or store.
2. Every run green at every variant and under the capture flag, with every frame ending on the
   surface's floor; the harness gate reads `passed` with a zero failure tally.
3. One artifact per variant; the setup proofs pass; scoped gates green.

## Findings from the chrome unit, carried

- The Delete table is five rows: `idle × select → armed`, `armed × deselect → idle`,
  `armed × delete → confirming`, `confirming × cancel → armed` (through `Keep selection`),
  `confirming × confirm → idle` (through `Delete selection`). The scenario phases already exist
  as leaves in `app/browser/helpers.ts` over `DeleteDriverInterface` (`select`, `delete`,
  `confirm`, `cancel`, `armed`, `confirming`, `scheduled`, `settle`); implement the driver over
  the layer's verbs in the test setup, as terrain does.
- Names: row checkbox `Select building for deletion — Location {location} – Building {number}`;
  the drop zone's button `Add the first building`; the toolbar's `Add building`,
  `Delete selected buildings`, `Import buildings from CSV`, `Export buildings to CSV`,
  `Download CSV template`, `Smart Default: copy the last building when adding`, `Tips`,
  `Carrier guidelines`, `Quick reference`, `Switch to dark mode` / `Switch to light mode`; the
  dialog's `Delete selection` and `Keep selection`; the harness's `Play every transition` and
  `Play {transition name}`; the retry `Couldn't resolve ZIP code — tap to retry`.
- The Quick Reference modal opens by itself on a wide empty schedule until "Do not show" is set;
  a journey entering at `md` or wider dismisses it first through its footer `Close` (the icon
  control is now `Close quick reference`, so `Close` resolves alone).
- The helper leaves `nameSelection`, `nameTransition`, `readQuery`, `resultToBadge`, and the
  seven scenario phases owe their describes in `tests/app/browser/helpers.test.ts`; write them.
- The armed reading is reachability, not a rendered word, because the rail hides labels below
  `lg`; assert what the surface renders at each variant rather than a label string.
