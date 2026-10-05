# Containment proofs — 2026-10-05

The containment proofs are implemented and locally verified on detached `7e2792bd8eb4541371616d5ce11edb42482a5b83` with the accepted markup edits. Every requested candidate gate passed. The archived `737a2f4` source mount fails exactly the named geometry and inventory cases. No candidate residual overflow was found.

Executor: GPT-6 Astra, sole writer. No agents spawned and no commit made. Browser evidence covers Chromium 141.0.7390.37, dark color mode, 1280 px and 390 px widths; see [browser resolution](/home/user/.wave/veneer-containment/configs/browsers.ts). Full journey wall-time impact was not measured.

## Proof readings

The command table supplies the exact command for each run suffix. Every folder is under `/home/user/veneer/tmp/units/journey-cost/runs/containment-proofs-`.

| Proof title | Red on 737a2f4 | Green on candidate |
| --- | --- | --- |
| `collectOverflows(root)` instrument | Independent 100 × 100 px figure with a child extending 2 px over every edge returns one record, index 0, edges bottom/left/right/top. | `instruments-1`: 126 setup-browser tests passed. Final `setup-1`: 174 tests passed, including the instrument. |
| keeps every specimen inside its figure under every face at both widths | `red-journey-2`, exit 1: Bootstrap and unexcluded each read 1 finding at 1280 px and 13 at 390 px; Tailwind reads 13 and 56 after paint settles. The unchanged original census on committed HTML, `old-census-1`, reproduces the brief's Tailwind 13 and 46 readings. | `green-journey-2`, exit 0: zero findings for every face at both widths. `candidate-census-1` independently reads zero across the same face/width combinations on the supplied rebuilt HTML, walking 328 figures per reading. |
| holds each z-index panel at half its stage under every face | `red-app-2`, exit 1: Tailwind panels are 200 × 200 px. At 1280 px the stage is 400 × 171.421875 px, so expected height is 85.7109375 px; z-2's vertical center is wrong by 114.2890625 px. At 390 px the stage is 324 × 138.84375 px, so expected panels are 162 × 69.421875 px. | `app-1`, exit 0: all panel dimensions and all origin/center/end-corner readings are within 1 px under every face at both widths. Maximum error is 0.0078125 px. |
| paints progress bars at their announced fraction under every face | `red-journey-2`, exit 1: Tailwind has 12 incorrect fill readings at 1280 px, including 100 px instead of 104 px; at 390 px it has 4 incorrect fills and 3 incorrect stacked segments, including 100 px instead of 81 px. Bootstrap and unexcluded have no fraction failures. | `green-journey-2`, exit 0: each reading walks 12 fills and 3 stacked segments. All match their announced fraction under every face at both widths. Tailwind quarter fills read 104 px at 1280 px and 81 px at 390 px. |
| spells the percentage names only in the sizing matrix and the position section | `red-app-2`, exit 1: 1015 elements outside the allowed sections carry 1028 matching class tokens; the alerts section includes 14 `w-100` carriers. | `app-1`, exit 0: the inventory is empty outside sizing and position-utilities. The CSSOM/shared-name guard matches the declared 16-name set. The extended card-body chrome guard passes. |

The archived configuration loads application TypeScript, JSON, and HTML directly through `git -C /home/user/veneer show 737a2f4:PATH`. Its logs identify each archived source. The working candidate files are never replaced. The reproduction configuration remains at `tmp/containment-red.config.ts`, with an evidence copy in [archived.config.ts](archived.config.ts). No scratch worktree was needed.

The old-page overflow count depends on reading time. The original census waits two frames and reads 46 at 390 px. Its copy with an additional finite-animation wait reads 56 on the same committed HTML in `old-settled-1`, matching the journey. This establishes the timing explanation without changing the census population or adding exemptions. The diagnostic source is preserved as [census-settled.ts](census-settled.ts); its temporary worktree copy was removed.

## Controls and instrument proofs

The controls use the same readers as their page assertions.

| Control | Red reading | Restored reading |
| --- | --- | --- |
| Overflow child outside an independent figure | One finding with all four sorted edges; painted `aria-hidden` decoration remains in the geometric population. | At exactly 1 px beyond each edge: empty. After removal: empty. |
| Clipped, fixed, and hidden independent children | None is reported while the planted unclipped child is detected. | Removing the planted child leaves the controls and still reads empty. The unlabeled figure fallback reads `control#1`. |
| Progress reader with nonzero minimum and padded/bordered containers | Changing the independent fill from 50 px to 75 px disagrees with its required 50 px. Invalid ranges and missing fills throw the asserted messages. | Restored 50 px fill and 100 px stacked segment match their independent expectations. Empty population returns an empty reading. |
| Independent z-index stage | Moving the center panel 10 px right produces only an x-position disagreement. Missing stage throws the asserted message. | Restoring the center yields exact dimension and anchor agreement. |
| Restored `w-50 h-50` panels and `top-50 start-50` center under Tailwind | `app-1`: 8 failed geometry fields at each width; panels become 200 × 200 px instead of 208 × 89.140625 px at 1280 px and 162 × 69.421875 px at 390 px. | The original classes restore all readings within 1 px. |
| Restored `w-25` fill under Tailwind | `green-journey-2`: 100 px versus required 104 px at 1280 px; 100 px versus required 81 px at 390 px. Reads wait for the CSS transition to finish. | Restoring `col-3` and settling paint leaves no failed progress reading. |
| Planted `w-100` on an alert | `app-1`: the inventory includes the planted alert. | Restoring its classes leaves the outside-section population empty. |
| Card-body chrome names | Each planted forbidden class is detected by the extended chrome assertion. | Removing each planted class restores the empty population. |

The setup file owns `SPECIMEN_SELECTOR`, `PROGRESS_FILL_SELECTOR`, `PROGRESS_STACK_SELECTOR`, `Z_INDEX_SELECTORS`, and `PERCENTAGE_SELECTOR`, each with its population reason. The overflow reader follows the supplied geometric census rather than the accessibility predicate: painted `aria-hidden` decoration is in scope. Existing `buildJourney`, `applyFace`, `applyTheme`, and `resolveSpecimen` are reused; `readStyle` comes from the installed browser entry.

The percentage guard uses the brief's complete contextual definition: shared name, Bootstrap percentage declaration, and Tailwind spacing declaration. The percentage-only clause selects 30 names, also including `col-1` through `col-12`, `container`, and `table`, as `green-app-1` records. Adding the stated Tailwind-spacing condition makes the independently derived set equal the named 16; no class name was removed from the declared set.

## Placement, cost, and gates

The placement comment is: “Geometry reads both widths itself in the dark color mode used by the containment captures.” The `containment` and `progress` rows select `dark-1280`; both cases restore the host viewport. The guide change is confined to § Variant placement.

Vitest's compare-gate registration is **100 total / 6 placement skips / 0 todo**, leaving **94 runnable cases**. The supplied base has 92 total; each added `it.skipIf` registers in every variant, so the total grows by 8 while runnable cases grow by 2. `registration-1` lists the 94 runnable cases. `registration-all-1` uses an intentionally unmatched title to obtain all 100 assertion records without executing the suite; its 100 pending records belong to that filter, not the normal placement count.

The passing filtered run `green-journey-2` records:

| Case | Duration |
| --- | --- |
| Containment | 5629.2 ms |
| Progress, including controls | 6731.6 ms |

These are observations under the host queue, not a full-suite performance ruling. The Orchestrator must re-baseline its compare registration as `100/6` for a normal non-capture run.

The final gates are:

| Gate | Run | Result |
| --- | --- | --- |
| Exact setup-browser instrument command | instruments-1 | Exit 0; 126 passed |
| `npm run check` | check-2 | Exit 0 |
| `npm run lint:check` | lint-2 | Exit 0 |
| `npm run format:check` | format-check-1 | Exit 0 |
| `npm run test:app:browser -- --silent=false` | app-1 | Exit 0; 241 passed |
| Filtered `dark-1280` journey cases | green-journey-2 | Exit 0; 2 passed |
| `npm run test:setup:browser` | setup-1 | Exit 0; 174 passed |

## Queued commands

Every command uses this queue prefix, with the row's suffix replacing `NAME` and its command replacing `COMMAND`:

```text
flock -w 1800 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/containment-proofs-NAME --kind command --cwd /home/user/.wave/veneer-containment -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH COMMAND
```

Each folder contains its exact expanded argv, stdout, stderr, and recorded exit.

| NAME | COMMAND | Exit | Reading |
| --- | --- | --- | --- |
| format-1 | `./node_modules/.bin/oxfmt --config .oxfmtrc.json --write tests/setupBrowser.ts tests/setupBrowser.test.ts tests/app/browser/integration.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/sections/integration.test.ts` | 0 | Formats only the owned TypeScript files. |
| instruments-1 | `./node_modules/.bin/vitest run --config vite.config.ts --project setup:browser tests/setupBrowser.test.ts` | 0 | 126 passed, including the planted controls. |
| check-1 | `npm run check` | 0 | Passed. |
| green-app-1 | `./node_modules/.bin/vitest run --config vite.config.ts --project app:browser -t 'holds each z-index panel\|spells the percentage names'` | 1 | Z-index passed; the percentage-only guard selected 30 names rather than the 16 spacing conflicts. |
| green-journey-1 | `npm run test:journey -- --project journey:dark-1280 -t 'keeps every specimen inside\|paints progress bars' --reporter=verbose --reporter=json --outputFile=tmp/containment-green-journey.json` | 1 | Containment passed; progress control was read before its width transition settled. |
| red-app-1 | `./node_modules/.bin/vitest run --config tmp/containment-red.config.ts --project app:browser -t 'holds each z-index panel\|spells the percentage names'` | 1 | Z-index red; section guard red before the inventory assertion. |
| red-journey-1 | `./node_modules/.bin/vitest run --config tmp/containment-red.config.ts --project journey:dark-1280 -t 'keeps every specimen inside\|paints progress bars' --reporter=verbose --reporter=json --outputFile=tmp/containment-red-journey.json` | 1 | Both named geometry cases red. |
| format-2 | `./node_modules/.bin/oxfmt --config .oxfmtrc.json --write tests/app/browser/sections/integration.test.ts tests/app/browser/integration.test.ts` | 0 | Formats the corrected guard and settled control. |
| green-journey-2 | `npm run test:journey -- --project journey:dark-1280 -t 'keeps every specimen inside\|paints progress bars' --reporter=json --outputFile=tmp/containment-green-journey-2.json` | 0 | Both named cases passed; control and restoration passed. |
| red-app-2 | `./node_modules/.bin/vitest run --config tmp/containment-red.config.ts --project app:browser -t 'holds each z-index panel\|spells the percentage names' --reporter=verbose --silent=false` | 1 | Exactly the named z-index and section cases failed. |
| lint-1 | `npm run lint:check` | 1 | Required explicit messages on two toThrow assertions; corrected. |
| app-1 | `npm run test:app:browser -- --silent=false` | 0 | 241 passed in 8 files. |
| old-census-1 | `node /home/user/veneer/tmp/units/containment/census.ts --page /home/user/.wave/veneer-containment/tmp/containment-737a2f4.html --out /home/user/.wave/veneer-containment/tmp/containment-old-census.json --executable /opt/pw-browsers/chromium` | 0 | Committed HTML: Tailwind overflow counts 13 and 46. |
| registration-1 | `./node_modules/.bin/vitest list --config configs/app/vite.journey.config.ts --json=tmp/containment-registration.json` | 0 | 94 runnable registrations. |
| setup-1 | `npm run test:setup:browser` | 0 | 174 passed in 2 files. |
| format-check-1 | `npm run format:check` | 0 | Passed. |
| lint-2 | `npm run lint:check` | 0 | Passed. |
| check-2 | `npm run check` | 0 | Passed. |
| red-journey-2 | `./node_modules/.bin/vitest run --config tmp/containment-red.config.ts --project journey:dark-1280 -t 'keeps every specimen inside\|paints progress bars' --reporter=json --reporter=dot --outputFile=tmp/containment-red-journey-2.json --silent=false` | 1 | Exactly the named containment and progress cases failed. |
| old-settled-1 | `node tmp/containment-census-settled.ts --page /home/user/.wave/veneer-containment/tmp/containment-737a2f4.html --out /home/user/.wave/veneer-containment/tmp/containment-old-settled.json --executable /opt/pw-browsers/chromium` | 0 | Committed HTML after finite animations: Tailwind counts 13 and 56. |
| candidate-census-1 | `node /home/user/veneer/tmp/units/containment/census.ts --page /home/user/.wave/veneer-containment/showcase/browser.html --out /home/user/.wave/veneer-containment/tmp/containment-candidate-census.json --executable /opt/pw-browsers/chromium` | 0 | Zero overflows for every face at both widths. |
| registration-all-1 | `./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts -t '^$' --reporter=json --outputFile=tmp/containment-registration-all.json` | 0 | 100 total registrations; all deliberately filtered out for this collection-only reading. |

## Diff and status

The complete uncommitted diff is [candidate.patch](candidate.patch). It includes the supplied markup unit plus the proof unit. Comparing the diff of `app/**`, `showcase/**`, and `tests/app/browser/factories.test.ts` with the accepted markup patch returned exit 0. This unit edits only the owned setup/proof files and § Variant placement.

The artifacts were written with:

```text
git diff > /home/user/veneer/tmp/units/containment/proofs/candidate.patch
git status --porcelain > /home/user/veneer/tmp/units/containment/proofs/status.txt
```

The final `git status --porcelain` reading is:

```text
 M app/browser/factories.ts
 M app/browser/sections/accordion.html
 M app/browser/sections/alerts.html
 M app/browser/sections/badge.html
 M app/browser/sections/breadcrumb.html
 M app/browser/sections/buttons.html
 M app/browser/sections/card.html
 M app/browser/sections/carousel.html
 M app/browser/sections/checks-radios.html
 M app/browser/sections/clearfix.html
 M app/browser/sections/collapse.html
 M app/browser/sections/color-background.html
 M app/browser/sections/colored-links.html
 M app/browser/sections/containers.html
 M app/browser/sections/dropdowns.html
 M app/browser/sections/engine-states.html
 M app/browser/sections/floating-labels.html
 M app/browser/sections/form-controls.html
 M app/browser/sections/form-layout.html
 M app/browser/sections/icon-link.html
 M app/browser/sections/input-group.html
 M app/browser/sections/list-group.html
 M app/browser/sections/modal.html
 M app/browser/sections/navbar.html
 M app/browser/sections/navs-tabs.html
 M app/browser/sections/offcanvas.html
 M app/browser/sections/pagination.html
 M app/browser/sections/placeholders.html
 M app/browser/sections/popovers.html
 M app/browser/sections/position-helpers.html
 M app/browser/sections/position-utilities.html
 M app/browser/sections/progress.html
 M app/browser/sections/range.html
 M app/browser/sections/ratio.html
 M app/browser/sections/select.html
 M app/browser/sections/stacks.html
 M app/browser/sections/stretched-link.html
 M app/browser/sections/tables.html
 M app/browser/sections/tailwindcss.html
 M app/browser/sections/text-truncation.html
 M app/browser/sections/tooltips.html
 M app/browser/sections/typography.html
 M app/browser/sections/validation.html
 M app/browser/sections/visibility.html
 M app/browser/sections/visually-hidden.html
 M app/browser/sections/z-index.html
 M guides/veneer.md
 M showcase/browser.html
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/factories.test.ts
 M tests/app/browser/integration.test.ts
 M tests/app/browser/sections/integration.test.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
```

## Fix pass — 2026-10-05

All requested fixes are applied, and every required final gate exited 0 on detached `7e2792b`. No commit or sub-agent was created. The full journey was not run.

The findings are resolved as follows:

- **Instrument controls:** the overflow fixture includes an outlying `visibility: hidden` 300 × 300 px child and a visible zero-size child at `left: -50px; top: -50px`. The assertion requires exactly the original planted finding.
- **Proof placement:** the overflow, progress, and panel instrument proofs moved from `consumer plugin recorder` to `specimen readings`.
- **TSDoc:** `PERCENTAGE_NAMES` states both the Bootstrap percentage and Tailwind spacing conditions; `readProgressLengths` documents one reading per track (`fill` standalone, `segment` inside a stack); the overflow summary uses `1 px`; `JOURNEY_PLACEMENTS` names containment and progress.
- **Coercion:** `parseProgressFraction` sits beside the reader, composes the installed `parseNumber` helper, returns `undefined` for invalid ranges, and has a direct proof covering valid fractions, endpoints, and invalid input. `readProgressLengths` contains no coercion and uses the installed `readPixels` helper for border and padding contributions.
- **Journal:** `Containment`, `Progress`, and `Progress control` entries carry `variant: VARIANT`; the filtered journey log records `dark-1280` on each.
- **Budgets:** both cases pass `120_000` as the explicit timeout argument, matching the file’s existing 120 s budgets, including J7. The contended readings and headroom are recorded below.
- **Guide:** Variant placement states, “The containment case requires every rendered, unclipped, non-fixed descendant's border box to stay within 1 px of its figure's.” The Reduced motion table includes the containment and progress cases in its Default row.

The Orchestrator’s `it.each` placement expressions, frozen placement rows, and paragraph opening remain intact. Its supplied registration reading, **94 runnable / 0 skipped**, supersedes the earlier report’s 100/6 account; this pass did not remeasure full registration. Comparing the initial and final diffs confirms changes only in the authorized setup files, journey file, and guide paragraphs. The prose unit’s Showcase sentence, Specimen geometry section, and ROADMAP row are unchanged.

The single-clause deletion readings are:

| Run suffix | Change under test | Reading | Exit |
| --- | --- | --- | --- |
| `visibility-red-1` | Delete only `visibility === 'hidden'` | Exactly the overflow proof failed; 126 passed. Received 2 findings instead of 1: the extra record is index 5 with bottom/left/right/top edges. | 1 |
| `zero-rect-red-1` | Restore visibility; delete only the descendant zero-rect clause | The filtered overflow proof failed. Received 2 findings instead of 1: the extra record is index 6 with left/top edges. | 1 |
| `restored-1` | Restore both clauses | The same filtered overflow proof passed; exactly the planted record remains. | 0 |
| `instruments-1` | Restored complete file | All 127 tests passed, including the parser proof. | 0 |

The budgets use the all-project contended run at `/home/user/veneer/tmp/units/journey-cost/runs/containment-gates-journey-1/report.json`, rather than this pass’s isolated readings:

| Case | Contended reading | Explicit budget | Budget / reading | Filtered fix reading |
| --- | --- | --- | --- | --- |
| Containment | 8590.1 ms | 120000 ms | 14.0× | 5781.3 ms |
| Progress | 9832.8 ms | 120000 ms | 12.2× | 7133.1 ms |

The budgets retain the generous contention headroom of the file’s existing budgets. The filtered fix run covers Chromium 141.0.7390.37, dark color mode, 1280 px and 390 px, under every face. Containment reads no overflow. Progress matches every announced fraction; its restored `w-25` control reads 100 px against 104 px at 1280 px and 81 px at 390 px, and restoration passes. These durations do not measure full-suite cost.

Every queued command and exit follows. Each suffix expands to `/home/user/veneer/tmp/units/journey-cost/runs/containment-proofs-fix-NAME`. Each folder preserves `start.json` with exact arguments, `stdout.log`, `stderr.log`, and `end.json`. Commands use this prefix:

```text
flock -w 1800 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/containment-proofs-fix-NAME --kind command --cwd /home/user/.wave/veneer-containment -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH COMMAND
```

| Folder suffix | Command | Exit | Reading |
| --- | --- | --- | --- |
| `visibility-red-1` | `./node_modules/.bin/vitest run --config vite.config.ts --project setup:browser tests/setupBrowser.test.ts` | 1 | Intended deletion failure; 1 failed, 126 passed. |
| `zero-rect-red-1` | `./node_modules/.bin/vitest run --config vite.config.ts --project setup:browser tests/setupBrowser.test.ts -t 'reports overflowing edges'` | 1 | Intended deletion failure; 1 failed, 126 filtered out. |
| `format-write-1` | `./node_modules/.bin/oxfmt --config .oxfmtrc.json --write tests/setupBrowser.ts tests/setupBrowser.test.ts tests/app/browser/integration.test.ts` | 0 | Scoped TypeScript formatting. |
| `restored-1` | `./node_modules/.bin/vitest run --config vite.config.ts --project setup:browser tests/setupBrowser.test.ts -t 'reports overflowing edges'` | 0 | 1 passed, 126 filtered out. |
| `instruments-1` | `./node_modules/.bin/vitest run --config vite.config.ts --project setup:browser tests/setupBrowser.test.ts` | 0 | 127 passed. |
| `format-check-1` | `npm run format:check` | 1 | Guide table spacing; repaired within the authorized paragraphs. |
| `guide-format-1` | `node --input-type=module -e` with the inline formatter program preserved in [exact arguments](/home/user/veneer/tmp/units/journey-cost/runs/containment-proofs-fix-guide-format-1/start.json) | 0 | Reads oxfmt output and writes only the authorized guide blocks. |
| `format-check-2` | `npm run format:check` | 0 | Passed. |
| `lint-check-1` | `npm run lint:check` | 0 | Passed. |
| `check-1` | `npm run check` | 0 | All configured type checks passed. |
| `guides-1` | `npm run test:guides` | 0 | 20 passed; 234 cited spans resolved. |
| `policy-1` | `npm run test:policy` | 0 | 119 passed, 1 skipped. |
| `setup-1` | `npm run test:setup:browser` | 0 | 175 passed. |
| `app-1` | `npm run test:app:browser` | 0 | 241 passed. |
| `journey-1` | `npm run test:journey -- --project journey:dark-1280 -t 'keeps every specimen inside\|paints progress bars' --reporter=verbose --reporter=json --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/containment-proofs-fix-journey-1/report.json` | 0 | 2 passed; 26 unrelated cases filtered out. |

The journey filter’s pipe is a regex alternation; its Markdown table escape is not part of the argument. The filtered skips are not placement skips.

`git diff --check` exited 0. Regenerated [candidate.patch](/home/user/veneer/tmp/units/containment/proofs/candidate.patch) with `git diff` and [status.txt](/home/user/veneer/tmp/units/containment/proofs/status.txt) with `git status --porcelain`.
