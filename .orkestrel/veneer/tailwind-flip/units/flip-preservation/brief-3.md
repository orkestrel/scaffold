# Unit flip-preservation-3 — finish the preservation gate after the dependent-color stop

## Role and engine

astra on GPT-6 Astra (effort high), `codex exec` at `danger-full-access` in `/home/user/veneer`, the sole writer of tracked files. Commit nothing.

## Launch state

Veneer `bc35a3e` on `ccr-d15a48b1-yyyll6` with the second run's uncommitted edits in place (`tests/app/browser/integration.test.ts`, `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`). Continue from them. The two earlier briefs, `/home/user/scaffold/tmp/codex/flip-preservation-brief.md` (with its appended rulings) and `/home/user/scaffold/tmp/codex/flip-preservation-2-brief.md`, stay in force except where this brief rules otherwise; the second run's report is `tmp/units/flip-preservation/report-2.md`.

## The stop and the ruling

The gate reads zero unattributed departures and rejects 14 dependent readings per width: the seven dependent color longhands (`caret-color`, `column-rule-color`, `outline-color`, `text-decoration-color`, `text-emphasis-color`, `-webkit-text-fill-color`, `-webkit-text-stroke-color`) on the carousel indicator buttons (`.carousel-indicators [data-bs-target]`, with and without `active`), whose `color` reads `rgb(0, 0, 0)` under Bootstrap and `rgb(33, 37, 41)` under the layer (preflight's `button { color: inherit }`), so the dependents take `preflight` through `color`.

1. **An exclusion propagates to the dependents of the longhand it excludes.** The `color` departure of a textless carousel indicator is excluded as invisible (`matchesInvisibleDeparture`, the first fold's ruling for `:where(.carousel-indicators) button`). A dependent color longhand whose anchor `color` departure is excluded is excluded with it, under the same kind and counted in the same exclusion, before attribution; it reaches `attributeDeparture` only when its anchor does. The report names the count of dependents excluded this way per width. The gate then reads zero `preflight` and zero `unattributed`.
2. **A dependent whose anchor is attributed keeps the anchor's cause** (the second brief's ruling 2), and a dependent whose value differs from the element's `color` stays its own departure. Prove the propagation in `tests/setupStyles.test.ts`: a textless element with an excluded `color` departure excludes its dependents; an element with text keeps them as dependents of the attributed `color`.
3. After the gate passes, run the production controls (the first brief: stripped curation, planted preflight, and the rest, each failing alone and restored), add the caption `TAILWIND_READINGS` rows (the first brief's item 3), and report the guide sentence for the `Tailwind + layer` row (item 4). Fold nothing; edit no fragment, caption, or guide prose.

## Acceptance (in order, exits recorded)

`npm run check`; `npm run lint:check`; `npm run format:check` (format the owned files first); the focused gate with its wall time (`npx vitest run --config configs/app/vite.journey.config.ts --project journey:light-1280 -t "attributes every component departure" tests/app/browser/integration.test.ts`); `npm run test:setup:browser`; `npm run test:app:browser`; `npm run test:journey` (every failing title in § Host-bound set of `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/lanes.md`: J8 and accordion motion=false at light-390; tooltip motion=true, collapse motion=false, navbar-390 motion=false at dark-390; record the gate's wall time inside the full run); `git diff --check`; `sha256sum dist/src/bootstrap/index.css dist/src/tailwindcss/index.css` (`7932f7a5…`, `b946eefe…`, both unchanged); `git status --porcelain` (only the owned files).

## Report (write `tmp/units/flip-preservation/report-3.md`, then return it)

Finding first: the gate's counts per width (elements, signatures, utility, resolved, dependent, dependents excluded with their anchor, admitted, excluded chrome, preflight, unattributed), the controls' failing lines, the caption rows with their three readings, the guide sentence, the acceptance table with the gate's focused and in-journey wall times, the digests, and `git status --porcelain`.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when: a sandbox write is rejected; a departure remains `preflight` or `unattributed` after ruling 1 and the admitted set (report its element, classes, longhand, and both readings); a journey title outside § Host-bound set fails; either digest changes.
