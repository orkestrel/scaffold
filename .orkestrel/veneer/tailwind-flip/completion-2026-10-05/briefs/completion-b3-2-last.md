B3 stopped on an open-popover residual at 390 px in both color modes. The ruled nested-declaration parity repair is implemented and browser-proven; the preservation gate is unchanged.

Expected: every condition admitted to the widened gate has zero `preflight` and zero `unattributed`. Found in the mapped-sheet matrix:

| Theme | Width | State | Element and classes | Longhand | Before | After | Cause |
| --- | ---: | --- | --- | --- | --- | --- | --- |
| light | 390 | popover | `div.popover.bs-popover-auto.fade.show` | `translate` | `50px` | `37px` | unattributed |
| dark | 390 | popover | `div.popover.bs-popover-auto.fade.show` | `translate` | `50px` | `37px` | unattributed |

Evidence: [first matrix](/home/user/.wave/veneer-containment/tmp/probes/flip-b3/out/before.json) and [copy-baseline rerun](/home/user/.wave/veneer-containment/tmp/probes/flip-b3/out/before-copy.json). The probe requires the engine-built `h3.popover-header` in every popover condition. All conditions report no lost boxes.

Hypothesis: the popover placement engine changes its horizontal correction when the face changes the available geometry. This is not yet a ruling to exclude `translate`, change attribution, or add curation.

The following table is before the cause split. `curated` is absent from the implemented cause union, shown as —. No after-split matrix exists because the residual triggered the stop contract. Copy hits use the separate mapped Bootstrap baseline without copies in the queued rerun.

| Theme | Width | State | preflight | unattributed | resolved | curated | Copy hits |
| --- | ---: | --- | ---: | ---: | ---: | ---: | ---: |
| light | 1280 | closed | 0 | 0 | 99 | — | 0 |
| light | 1280 | tooltip | 0 | 0 | 99 | — | 0 |
| light | 1280 | popover | 0 | 0 | 99 | — | 0 |
| light | 1280 | dropdown | 0 | 0 | 99 | — | 0 |
| light | 1280 | modal | 0 | 0 | 99 | — | 0 |
| light | 1280 | offcanvas | 0 | 0 | 99 | — | 0 |
| light | 1280 | toast | 0 | 0 | 99 | — | 0 |
| dark | 1280 | closed | 0 | 0 | 102 | — | 0 |
| dark | 1280 | tooltip | 0 | 0 | 102 | — | 0 |
| dark | 1280 | popover | 0 | 0 | 102 | — | 0 |
| dark | 1280 | dropdown | 0 | 0 | 102 | — | 0 |
| dark | 1280 | modal | 0 | 0 | 102 | — | 0 |
| dark | 1280 | offcanvas | 0 | 0 | 102 | — | 0 |
| dark | 1280 | toast | 0 | 0 | 102 | — | 0 |
| light | 390 | closed | 0 | 0 | 28 | — | 0 |
| light | 390 | tooltip | 0 | 0 | 28 | — | 0 |
| light | 390 | popover | 0 | 1 | 28 | — | 0 |
| light | 390 | dropdown | 0 | 0 | 28 | — | 0 |
| light | 390 | modal | 0 | 0 | 28 | — | 0 |
| light | 390 | offcanvas | 0 | 0 | 28 | — | 0 |
| light | 390 | toast | 0 | 0 | 28 | — | 0 |
| dark | 390 | closed | 0 | 0 | 31 | — | 0 |
| dark | 390 | tooltip | 0 | 0 | 31 | — | 0 |
| dark | 390 | popover | 0 | 1 | 31 | — | 0 |
| dark | 390 | dropdown | 0 | 0 | 31 | — | 0 |
| dark | 390 | modal | 0 | 0 | 31 | — | 0 |
| dark | 390 | offcanvas | 0 | 0 | 31 | — | 0 |
| dark | 390 | toast | 0 | 0 | 31 | — | 0 |

The mapped copy check records 0 hits and 0 eligible forcing trials across the matrix, versus probe-4’s 1,960 hits before the token map. The first matrix also recorded zero hits, but it used the tuned sheet on both sides and tested no candidates; those numbers are not evidence of a reduction. The queued rerun changes the copy-check baseline to `mapTokenSheet(lifted, record, 'band')`; the preservation reading still compares the mapped tuned sheet with the recipe. The requested planted-copy control and `curated` split remain unimplemented, so this is a diagnostic copy reading, not acceptance of resolved-copies.

No curation rows were derived or folded. The residual rows preceding the table are returned for ruling. No `JOURNEY_PLACEMENTS.preservation` edit was made or established as necessary; no shared-symbol patch is proposed.

Done: the index and uncached filter accept `CSSStyleRule` and `CSSNestedDeclarations` only with a defined `SheetEntry.selector`, and match that selector. The index TSDoc explains why the B2 walk surfaces nested declarations and why relative selectors cannot reach it. The browser proof reads the same `preflight` cause through direct, uncached, and indexed attribution for a nested media declaration and a flat control. Its deliberate red run reports one failing test before the repair; its green run passes the same test. The extracted-reader control reports a recipe-only planted opacity reset on `div.cargo-probe` as `preflight` (`1` → `0.37`).

Not done after the stop: the `curated` union and attribution split, its planted-copy control, the committed witness baseline, gate widening, and the after journey cost run. `npm run check`, the full setup acceptance, and `npm run test:src:tailwindcss` were not run. There is no after cost to compare or unexplained added gate cost.

The before journey passed with 94 registered, 94 passed, and 0 skipped in 493.962 seconds. The preservation sections took 8.2146 seconds at 1280 px and 6.7213 seconds at 390 px. J-B1 references `jb1-1` and `jb1-2` took 525.014 and 528.234 seconds, a 3.220-second spread. No journey failure was admitted; the journey host-bound set is empty. All browser readings use Chromium 141.0.7390.37; see the engine bound in [configs/browsers.ts](/home/user/.wave/veneer-containment/configs/browsers.ts).

Every queued command used this wrapper, with the folder named in the table and npm 11 first on PATH:

```text
flock -w 1800 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder FOLDER --kind KIND --cwd /home/user/.wave/veneer-containment -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH COMMAND
```

| Queue folder | Kind | Command after the wrapper | Result |
| --- | --- | --- | --- |
| [completion-b3-parity-red](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-parity-red) | command | `npm run test:setup:browser -- tests/setupBrowser.test.ts -t 'reads nested media declarations'` | Exit 1; 16.55 s; intended regression failure |
| [completion-b3-parity-green](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-parity-green) | command | `npm run test:setup:browser -- tests/setupBrowser.test.ts -t 'reads nested media declarations'` | Exit 0; 21.227 s |
| [completion-b3-probe-before](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-probe-before) | command | `node tmp/probes/flip-b3/run.ts before` | Exit 1; 26.735 s; instrument bundle omitted isDefined, before any matrix reading |
| [completion-b3-journey-before](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-journey-before) | journey | `CAPTURE=0 ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --configLoader runner --no-cache --reporter=dot --reporter=json --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-journey-before/report.json` | Exit 0; 493.962 s |
| [completion-b3-probe-before-2](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-probe-before-2) | command | `node tmp/probes/flip-b3/run.ts before` | Exit 0; 409.249 s |
| [completion-b3-probe-control](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-probe-control) | command | `node tmp/probes/flip-b3/control.ts` | Exit 0; 0.917 s |
| [completion-b3-probe-before-copy](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-probe-before-copy) | command | `node tmp/probes/flip-b3/run-copy.ts before-copy` | Exit 0; 488.282 s |
| [completion-b3-format](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-format) | command | `./node_modules/.bin/oxfmt --config .oxfmtrc.json --write tests/setupBrowser.ts tests/setupBrowser.test.ts` | Exit 0; 0.309 s |
| [completion-b3-lint](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-lint) | command | `./node_modules/.bin/oxlint --config .oxlintrc.json --deny-warnings tests/setupBrowser.ts tests/setupBrowser.test.ts` | Exit 0; 0.467 s |

Unqueued format check: `./node_modules/.bin/oxfmt --config .oxfmtrc.json --check tests/setupBrowser.ts tests/setupBrowser.test.ts` initially found formatting in the added proof; the scoped queued format command repaired it. The same final check passed.

Ancillary choices: `flip-b3` holds the rebuilt Node Playwright probe; it compiles the checkout’s Sass, extracts real reader declarations through the installed TypeScript parser, and retains probe-4’s separate copy audit. It reads the full main-region population at both widths, with body-level tooltip and popover nodes included. No per-width population restriction or curation iteration is applied. `run-copy.ts` is the successor that adds the mapped copy-free baseline without editing the running probe. The bundle dependency omission was repaired only in the probe and rerun in a fresh folder. No `curated` internals were chosen because implementation stopped before that step.

`git status --porcelain` is:

```text
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
```

The report is saved as [report.md](/home/user/veneer/tmp/units/completion-b3/report.md), with [candidate.patch](/home/user/veneer/tmp/units/completion-b3/candidate.patch) and [status.txt](/home/user/veneer/tmp/units/completion-b3/status.txt) beside it. No commit or sub-agent was created. No tracked file outside the ruled parity scope changed.