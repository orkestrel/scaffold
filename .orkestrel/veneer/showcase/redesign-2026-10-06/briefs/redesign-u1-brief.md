# Unit redesign-U1 — paint isolation of the showcase specimens

## Role and engine

`astra` implementation unit on `gpt-6-astra` (effort high) through the Codex CLI. You are the sole writer in the checkout `/home/user/.wave/veneer-isolation` (a detached veneer worktree at `9fb2be1`; `node_modules` copied from the main checkout; `dist` built). Owned files: `app/browser/sections/*.html` (class additions on specimen card bodies only; no other markup change) and `tests/app/browser/Showcase.test.ts` (one added case). You may create one scratch probe file `tests/app/browser/isolation.probe.test.ts` and you must delete it before reporting. Commit nothing. Edit nothing under `src/`, nothing in any other test, nothing under `/home/user/veneer`.

## Objective

Ruling 4 of `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/showcase/redesign-2026-10-06/design-verdict.md`: specimens whose descendants resolve a z-index of 3 or more at rest and have no stacking ancestor paint over the showcase's sticky header (`header.position-sticky.top-0.z-3`) when scrolled under it, and will paint over the Contents drawer (z-index 1045) that unit U2 adds. The fix is the stage convention the fragments already use (`engine-states.html:125`, `offcanvas.html:158`, `modal.html:192`): `z-0` on the specimen card body. `.card` is a flex container, so a card body carrying `z-0` is a flex item with a z-index, which forms a stacking context that caps every descendant layer.

## Rule

Add the class `z-0` to every specimen card body (`figure.card > .card-body`) in which some descendant resolves a computed `z-index` of 3 or more at rest in the mounted page, **unless** the card body holds an element that leaves the card's box when shown or at rest: a live dropdown (`[data-bs-toggle="dropdown"]` or a `.dropdown-menu` the engine positions), a live modal or offcanvas opener or panel, a `toast-container`, or any descendant with computed `position: fixed`. The reason for the exemption: a stacking context caps a fixed descendant at layer 0, and every later card then paints over it (the live toast at `toasts.html:161-168` is the proven case; the `toast` table's `Show the upload toast` rows click the toast's close control with a trusted click, which refuses a covered target).

Derive the set from the mounted page, never from a reading of the sources alone: mount the showcase (`new Showcase(document)` and `start()`, the way `tests/app/browser/Showcase.test.ts` does; read its helpers and the `adoptSheet`, `mount`, and `requireValue` usage) at 1280 × 800 and at 390 × 844 under the Bootstrap face, walk every `figure.card > .card-body` in `main`, and record for each the greatest resolved z-index among its descendants and whether an exempting descendant exists. Proposal 2's starting list (in `proposals.json` beside the verdict): `accordion.html:4, :96, :144`; `pagination.html:5, :32, :65, :94`; `input-group.html:8, :81, :117, :154`; `validation.html:8, :40, :73, :109`; `popovers.html:48, :73, :96, :119, :142`; `tooltips.html:53`; `position-helpers.html:40`; `z-index.html:4`. The mounted reading decides; include every `sticky-*` specimen in `position-helpers.html` in the walk. Record the final set with each card body's greatest z-index in your report.

Keep every added class in the class order the fragment already uses (append `z-0` at the end of the card body's class list). The section census (`tests/app/browser/sections/integration.test.ts`) and `carries only registry, engine marker, icon, and Tailwind class tokens, no style attribute, and unique ids` (factories.test.ts) must pass unedited; `z-0` is a registry name.

## The case

Add to `tests/app/browser/Showcase.test.ts`, beside the frozen-state and containment cases, the case titled exactly:

`keeps every specimen layer under the sticky header at narrow and wide viewports`

For each of the three faces (`bootstrap`, `unexcluded`, `tailwindcss`, selected through the header buttons as the neighbouring cases do) at 390 × 844 and 1280 × 800, in the light color mode:

1. Collect every element inside `main` whose computed `z-index` is a number of 3 or more at rest.
2. For each, scroll the document so the element's box overlaps the header's box (scroll it to the top, then adjust so at least a 4 px band of the element lies under the header), wait one rendering frame, and hit-test (`document.elementFromPoint`) a point inside both boxes. Expect the hit to be the header or a descendant of it. Name the failing element's section, figure, and class list in the assertion message.
3. The toast control: click `Show the upload toast`, wait for the toast's `show`, and expect `elementFromPoint` at the center of its close control to be that control or a descendant of the toast. Then close it.
4. The removal control: remove `z-0` from the tooltips placements card body (`tooltips.html:53`, the frozen `.tooltip.show.position-relative` holder), repeat step 2 for that card's frozen tooltip, and expect the hit to land inside the tooltip; restore the class. The control proves the case can fail.

Use the project's wait helpers (`waitForFrame`, `waitForCondition` with `COMPONENT_WAIT`) as the neighbouring cases do; no fixed sleeps. Keep the case inside the existing timeout conventions of the file.

## Gates

`WT` is `/home/user/.wave/veneer-isolation`. Direct: `WT/node_modules/.bin/oxfmt --config WT/.oxfmtrc.json --check` and `WT/node_modules/.bin/oxlint --config WT/.oxlintrc.json --deny-warnings` on `tests/app/browser/Showcase.test.ts`; `git -C WT diff --check`; `git -C WT status --porcelain` lists only owned files at the end (the probe deleted). Through the host queue, a fresh folder each (`flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/redesign-u1-NAME --kind command --cwd WT -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH COMMAND`):

1. the probe file alone while you derive the set (`WT/node_modules/.bin/vitest run --config WT/vite.config.ts --configLoader runner --no-cache --reporter=dot --project app:browser WT/tests/app/browser/isolation.probe.test.ts`);
2. typecheck `WT/node_modules/.bin/vue-tsc --noEmit -p WT/configs/app/tsconfig.browser.json`;
3. `tests/app/browser/Showcase.test.ts` alone (same vitest form); every case in the file passes;
4. the whole `app:browser` project (`WT/node_modules/.bin/vitest run --config WT/vite.config.ts --configLoader runner --no-cache --reporter=dot --project app:browser`); every case passes, including the section census and `keeps every specimen inside its figure under every face at both widths`.

Never `cd`; never run vitest outside the queue; a reused folder exits 65. One re-run for a Vite optimizer import failure before any test body; a second failure is real.

## Output

Final message: the derived set as a table (file:line, section, greatest resolved z-index, exempting descendant or none, `z-0` added or not); the diff; `git status --porcelain`; each gate's command, folder, exit, and bare result; every deviation (expected, found, evidence, done or not, one hypothesis). No process diary.
