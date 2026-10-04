# Unit flip-preservation-2 — continue the preservation gate after the deviation stop

## Role and engine

astra on GPT-6 Astra (effort high), `codex exec` at `danger-full-access` in `/home/user/veneer`, the sole writer of tracked files. Commit nothing.

## Launch state

Veneer `bc35a3e` on `ccr-d15a48b1-yyyll6` with the first run's uncommitted edits in place (`tests/app/browser/integration.test.ts`, `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`; the patch is `tmp/units/flip-preservation/unit.patch`). Continue from them. The first run's brief, `/home/user/scaffold/tmp/codex/flip-preservation-brief.md`, with its appended rulings, stays in force except where this brief rules otherwise; its report is `tmp/units/flip-preservation/report.md` and its readings `tmp/units/flip-preservation/readings.json`.

## The stop and the rulings

The focused gate read 3,304 unattributed departures at 1280 px and 3,246 at 390 px. By longhand at 1280: `border-block-end-color`, `border-inline-end-color`, `border-inline-start-color` 408 each and `border-block-start-color` 407; `border-end-end-radius`, `border-end-start-radius`, `border-start-end-radius`, `border-start-start-radius` 375 each; `margin-inline-start` 58, `margin-block-end` 27, `padding-block-start` 15, `padding-block-end` 13, `padding-inline-end` 12, `padding-inline-start` 12, `margin-inline-end` 8, `margin-block-start` 4; `caret-color`, `column-rule-color`, `outline-color`, `text-emphasis-color`, `-webkit-text-fill-color`, `-webkit-text-stroke-color` 3 each; `margin-bottom` 3; `text-decoration-color` 2; `z-index` 1. The signatures are utility carriers (`border rounded bg-body-tertiary …`, the `ratio` boxes, the containers, `carousel-inner rounded border`).

1. **Logical longhands attribute through their physical twins.** Under `horizontal-tb` and `ltr`, `block-start` is `top`, `block-end` is `bottom`, `inline-start` is `left`, `inline-end` is `right`; `border-start-start-radius` is `border-top-left-radius`, `border-start-end-radius` is `border-top-right-radius`, `border-end-start-radius` is `border-bottom-left-radius`, and `border-end-end-radius` is `border-bottom-right-radius`. The partition already reads a declared value through this correspondence (`collectDeclaredLonghands` and the resolved-value reading in `tests/setupBrowser.ts`, from the journeys unit); give the mapping one home (a `PHYSICAL_LONGHANDS` or equivalent record in `tests/setupStyles.ts`, exported with TSDoc, proven in `tests/setupStyles.test.ts`) and make `attributeDeparture` and the partition read it. A logical departure takes the cause of its physical twin on the same element; the gate reports the two as one departure counted once under the physical name, with the logical names listed.
2. **Dependent color longhands follow the element's `color`.** When an element's `color` departs and `caret-color`, `column-rule-color`, `outline-color`, `text-emphasis-color`, `text-decoration-color`, `-webkit-text-fill-color`, or `-webkit-text-stroke-color` reads equal to the element's `color` under each face, the dependent takes the `color` departure's cause (kind `dependent`, or the same cause with a `through: 'color'` field; choose one and name it in the report). A dependent whose value differs from `color` is its own departure.
3. **The chrome is outside the population.** Elements inside the banner, the skip link, and the Contents region are excluded (their neutrality is the header unit's case); the population is the main region's component carriers. Report the count excluded.
4. **The admitted description-list set stays as the first brief's ruling 1 states**: `dl.row` and `dd.col-sm-*` of the `typography-documented-description` figure, `margin-bottom` (with its logical twin under ruling 1), attributed to the consumer-owned departure by listing; the first run read them as `preflight` and `unattributed`, which the gate must now classify as `admitted` with the figure's id as the reason.
5. **Everything that remains unattributed after rulings 1 to 4 is a finding**: report each remaining departure (element, classes, longhand, both readings) grouped by signature and longhand, with the three `margin-bottom`, the two `text-decoration-color`, and the one `z-index` departure of the first run named explicitly whatever becomes of them; stop after the gate's run if any remains outside the rules and the admitted set. Fold nothing.
6. **The production controls** (stripped curation, planted preflight, and the others the first brief names) run after the gate passes, each failing the assertion alone, each restored.
7. **Caption readings** (the first brief's item 3) and **the guide sentence** (item 4) proceed after the gate passes; the Faces row is `Tailwind + layer`.

## Acceptance (in order, exits recorded)

`npm run check`; `npm run lint:check`; `npm run format:check` (format the owned files first with `npx oxfmt --config .oxfmtrc.json --write FILES`); the focused gate (`npx vitest run --config configs/app/vite.journey.config.ts --project journey:light-1280 -t "attributes every component departure" tests/app/browser/integration.test.ts`) with its wall time; `npm run test:setup:browser`; `npm run test:app:browser`; `npm run test:journey` (every failing title must be in § Host-bound set of `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/lanes.md`: J8 and accordion motion=false at light-390; tooltip motion=true, collapse motion=false, navbar-390 motion=false at dark-390); `git diff --check`; `sha256sum dist/src/bootstrap/index.css dist/src/tailwindcss/index.css` (`7932f7a5…`, `b946eefe…`, both unchanged); `git status --porcelain` (only the owned files).

## Report (write `tmp/units/flip-preservation/report-2.md`, then return it)

Finding first: the gate's counts per width (elements, signatures, utility, resolved, dependent, admitted, excluded chrome, preflight, unattributed), the remaining groups if any, the controls' failing lines, the caption rows added with their three readings, the guide sentence, the acceptance table, the digests, and `git status --porcelain`.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when: a sandbox write is rejected; a departure remains unattributed after rulings 1 to 4 and outside the admitted set (report the groups; do not widen the rules); a journey title outside § Host-bound set fails; either digest changes.
