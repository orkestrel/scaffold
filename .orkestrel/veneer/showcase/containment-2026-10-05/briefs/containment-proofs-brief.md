# Unit containment-proofs — Proofs that the showcase holds one geometry under the three faces

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with `--sandbox danger-full-access` in the worktree `/home/user/.wave/veneer-containment`, rebased by the Orchestrator onto veneer main after the journey run-cost unit's landing and carrying the accepted markup unit's edits. Executor: BENCH_ENGINE. You are the sole writer in that worktree.

## Objective

Four proofs that fail on the 2026-10-05 showcase (veneer `737a2f4`) and pass on the candidate, plus the instruments they need with controls, so the containment ruling of `/home/user/veneer/tmp/units/containment/design-verdict.md` is pinned: every specimen stays inside its figure under every face at both widths, the z-index panels read half their stage, progress bars read their announced fraction, and the 16 percentage names appear only in the Sizing matrix and the Position utilities section.

## Context

- **Evidence.** The design verdict and its probes (`tmp/units/containment/design-verdict.md`, `respell-1.md`, `census-1.json` for the 2026-10-05 page, `tmp/units/containment/markup/census-2.json` for the candidate, `tmp/units/containment/markup/report.md`); the census instrument `tmp/units/containment/census.ts` (a Node Playwright probe, not a Vitest proof; its rule is the proof's rule: a descendant of a `figure.card` whose border box leaves the figure by more than 1 px on any edge, skipping `position: fixed`, unrendered elements, and elements under an ancestor with non-visible overflow). On the 2026-10-05 page the `tailwindcss` face reads 13 such elements at 1280 px and 46 at 390 px; on the candidate every face reads 0 at both widths (`tmp/units/containment/markup/census-2.json`).
- **The 16 names.** `w-25`, `w-50`, `w-75`, `w-100`, `h-25`, `h-50`, `h-75`, `h-100`, `top-50`, `top-100`, `bottom-50`, `bottom-100`, `start-50`, `start-100`, `end-50`, `end-100`: the shared names (`tests/fixtures/tailwindcss/comparison.json` `shared`) whose rule in `dist/src/bootstrap/index.css` declares a percentage value and whose Tailwind rule declares a spacing multiple (`tmp/units/journey-cost/runs/containment-fractions-1/stdout.log`).
- **Proof placement.** Instruments live in `tests/setupBrowser.ts` with a control from outside the population (`/home/user/scaffold/.claude/rules/tests.md`); a selector over a population with no role is declared in the setup module with its reason; a per-variant journey case uses `it.skipIf(VARIANT !== …)` over `light-1280`, `dark-1280`, `light-390`, `dark-390` (`tests/app/browser/integration.test.ts`, `configs/app/vite.journey.config.ts`); section proofs live in `tests/app/browser/sections/integration.test.ts`; Showcase proofs in `tests/app/browser/Showcase.test.ts`. Reuse `applyFace`, `applyTheme`, `buildJourney`, `readStyle`, `resolveSpecimen`, `isRendered` from the installed `@orkestrel/test` where their semantics match; never wrap one to rename it. The journey suites' placement table `JOURNEY_PLACEMENTS` names each case's host project; add the two journey cases to `dark-1280` with a comment stating why (the containment reading reads both widths itself in the dark color mode the screenshots used).
- **Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/tests.md`; `/home/user/scaffold/.claude/rules/typescript.md`; `/home/user/scaffold/.claude/rules/names.md`; `/home/user/scaffold/.claude/rules/writing.md` for TSDoc and comments; the `orkestrel-journey` skill for a journey case's shape.
- **Host.** As the markup brief states: queue every Chromium or CPU-loading command through `flock -w 1800 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/containment-proofs-NAME --kind command --cwd /home/user/.wave/veneer-containment -- COMMAND`, npm 11 first on PATH inside the command (`env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH`), never `cd`, no shell scripts.
- **Standing conditions.** The journey run-cost unit has landed on veneer main before you start (the Orchestrator says so in the launch message and names the commit); its placement table and instruments in `tests/setupBrowser.ts` are the base you extend. The 2026-10-05 page for the red readings is `/home/user/veneer/showcase/browser.html` at `737a2f4` (`tmp/units/containment/census-1.json` holds its census); the candidate page is the worktree's rebuilt `showcase/browser.html`.

## Unknowns

- Whether the journey cases' wall time changes `test:journey` beyond host noise: report the two cases' durations; the Orchestrator reads them under the journey-cost unit's rules.

## Scope

- **Owned.** `tests/setupBrowser.ts` (the added instruments, `PERCENTAGE_NAMES`, the declared selectors, the placement rows), `tests/setupBrowser.test.ts` (instrument proofs), `tests/app/browser/integration.test.ts` (the two added journey cases), `tests/app/browser/Showcase.test.ts` (the z-index case), `tests/app/browser/sections/integration.test.ts` (the section case and the chrome guard extension), `guides/veneer.md` § Variant placement only where the placement table gains rows.
- **Shared (report-only).** none.
- **Off-limits.** `app/**` (the markup unit's edits are final), `src/**`, `tests/fixtures/**`, `tests/integration.test.ts`, `tests/conformance.test.ts`, every other guide section.
- **Made false by this change.** The journey registration count (92 on the base; the two cases raise it) read by the journey-cost unit's compare registration gate: report the new count; the Orchestrator re-baselines.
- **Tools and limits.** Read, edit, queued commands; no commit; no tree-wide mutating command.

## Proofs

1. **`collectOverflows(root)` instrument** in `tests/setupBrowser.ts`: for each `figure.card`, every descendant whose border box leaves the figure's by more than 1 px on any edge, skipping `position: fixed`, unrendered elements, and descendants under an ancestor with non-visible overflow; returns readonly records `{ figure, index, edges }` (`figure` the `aria-labelledby` value or `SECTION#N`, `index` the element's position in `figure.querySelectorAll('*')`, `edges` sorted edge names). Declare the `figure.card` selector beside it with its reason. Proof in `tests/setupBrowser.test.ts` with a planted overflowing child, a clipped child, a fixed child, and a hidden child as controls.
2. **Journey case `keeps every specimen inside its figure under every face at both widths`** in `tests/app/browser/integration.test.ts`, hosted in `dark-1280`: for each width (1280, 390), `buildJourney({ ...OWN, width }, true)`, then under each face through `applyFace`, `collectOverflows(document.body)` reads `[]` (no exemption: the candidate reads none under any face; a residual the Orchestrator has not named is a failure). Red on the 2026-10-05 page: 13 and 46 entries under `tailwindcss`, 1 and 13 under `bootstrap`.
3. **Showcase case `holds each z-index panel at half its stage under every face`** in `tests/app/browser/Showcase.test.ts`: under each face, the three `#z-index-stack` panels read width and height equal to half the stage's within 1 px, the z-2 panel's center equals the stage center within 1 px, the z-3 panel sits at the stage origin and the z-1 panel at its bottom end corner; control: restore `w-50 h-50 top-50 start-50` on the panels under the `tailwindcss` face and read the failure. Red on the 2026-10-05 page: 200 × 200 px panels in a 400 × 171 px stage.
4. **Journey case `paints progress bars at their announced fraction under every face`** hosted in `dark-1280`: for every `.progress[role="progressbar"]` in the page, the bar's width equals `(valuenow − valuemin) / (valuemax − valuemin)` of the track's content width within 1 px; for every `.progress-stacked > .progress`, its width equals that fraction of the stack; control: restore `w-25` on one bar under the `tailwindcss` face. Red on the 2026-10-05 page under `tailwindcss` (100 px bars).
5. **Section case `spells the percentage names only in the sizing matrix and the position section`** in `tests/app/browser/sections/integration.test.ts`: every element carrying a `PERCENTAGE_NAMES` member sits in the `sizing` or `position-utilities` section; guard: `PERCENTAGE_NAMES` equals the `comparison.json` shared names whose rule in `dist/src/bootstrap/index.css` declares a percentage value; control: plant `w-100` on an alert. Extend the chrome guard at `:229-259` so a card body never carries one of the 16 names. Red on the 2026-10-05 page: `alerts.html` carries `w-100`.

## Execution

Perform the assignment yourself and spawn nothing.

## Output

Report file `/home/user/veneer/tmp/units/containment/proofs/report.md`: each proof's title, its red reading on the 2026-10-05 page (the command, the folder, the failing count or value) and its green reading on the candidate, each control's red and restored result, the instrument proofs' results, the new journey registration count, the two journey cases' durations, every queued command with its folder and exit; `git diff > /home/user/veneer/tmp/units/containment/proofs/candidate.patch` and `git status --porcelain`. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when a proof passes on the 2026-10-05 page, when the candidate reads a residual overflow under any face, or when an installed primitive's semantics differ from the brief's description. Settle naming, comment wording, and the placement comment yourself and record them.

## Acceptance criteria

1. Through the queue: `./node_modules/.bin/vitest run --config vite.config.ts --project setup:browser tests/setupBrowser.test.ts` exit 0 (instrument proofs with controls).
2. `npm run check`, `npm run lint:check`, `npm run format:check` exit 0.
3. Red readings on the 2026-10-05 page for proofs 2 to 5 (the showcase and section cases run against a mount of the old page's sections through the repository at `737a2f4`; where a case cannot mount the old page, run it in a scratch worktree the Orchestrator provides on request and record the command), each with exactly the named failure.
4. Green on the candidate: `npm run test:app:browser` exit 0; the two journey cases through the queue filtered to the `dark-1280` project with `-t`, exit 0.
5. `npm run test:setup:browser` exit 0.

**Observations, not criteria.** `test:journey` wall time and the registration count; the Orchestrator re-runs and re-baselines.

**Measurement.** The 1280 px and 390 px widths in the dark color mode; readings through the queue, never beside another Chromium run.

## Review evidence

The diff, `git status --porcelain`, and the report.
