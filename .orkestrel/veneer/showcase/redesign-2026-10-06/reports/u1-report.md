**Unit incomplete: the brief’s toast exemption conflicts with its required header assertion.** The probe is deleted. Nothing was committed.

The mounted census measured 328 card bodies at each viewport. The table includes every qualifying body, every exempt body, and the proposal entries rejected by the measurements. Other bodies remained unchanged.

Paths are relative to `app/browser/sections/`. Values match at both widths unless stated.

| File:line | Section | Greatest z-index | Exempting descendant | `z-0` added |
|---|---|---:|---|---|
| accordion.html:4,96,144 | Accordion | auto | none | No |
| input-group.html:8,81,154 | Input group | auto | none | No |
| input-group.html:117 | Input group | 2 | none | No |
| validation.html:8,40 | Validation | auto | none | No |
| validation.html:73 | Validation | 5 | none | Yes |
| validation.html:109 | Validation | 4 | none | Yes |
| dropdowns.html:5,33,60 | Dropdowns | 1000 | none | Yes |
| dropdowns.html:87,120,152,181,210,239,286,345 | Dropdowns | 1000 | Live dropdown trigger/menu | No |
| modal.html:4 | Modal | 1055 | Live modal triggers/fixed panels | No |
| modal.html:191,240 | Modal | 1055 | none | Yes |
| navbar.html:76 | Navbar | 1000 | Live dropdown trigger | No |
| offcanvas.html:4,340 | Offcanvas | 1045 | Live offcanvas triggers/fixed panels | No |
| offcanvas.html:156,206,252,295 | Offcanvas | 1045 | none | Yes |
| pagination.html:5,32,65,94 | Pagination | 3 | none | Yes |
| popovers.html:48,73,96,119,142 | Popovers | 1070 | none | Yes |
| toasts.html:88 | Toasts | 1090 | `.toast-container.position-static` | **No; blocks the test** |
| toasts.html:163 | Toasts | 1090 | `.toast-container.position-fixed` | No |
| tooltips.html:53,109 | Tooltips | 1080 | none | Yes |
| position-helpers.html:8 | Position helpers | 1030 | Fixed top/bottom descendants | No |
| position-helpers.html:40 | Position helpers | 1020 | none | Yes |
| position-helpers.html:78 | Position helpers | 1020 wide; auto narrow | none | Yes |
| position-utilities.html:277 | Position utilities | auto | Fixed descendant | No |
| z-index.html:4 | Z-index | 3 | none | Yes |
| engine-states.html:123,159 | Engine states | 1045 | none | Yes |
| live-components.html:150 | Live components | auto | Live modal/offcanvas triggers | No |

The complete diff is available in [redesign-u1.diff](/home/user/.wave/veneer-isolation/tmp/units/redesign-u1.diff). It contains only the card-body class additions and the added test case.

`git status --porcelain` returned:

```text
 M app/browser/sections/dropdowns.html
 M app/browser/sections/engine-states.html
 M app/browser/sections/modal.html
 M app/browser/sections/offcanvas.html
 M app/browser/sections/pagination.html
 M app/browser/sections/popovers.html
 M app/browser/sections/position-helpers.html
 M app/browser/sections/tooltips.html
 M app/browser/sections/validation.html
 M app/browser/sections/z-index.html
 M tests/app/browser/Showcase.test.ts
```

For the command tables, these substitutions identify the exact paths and arguments:

```text
WT = /home/user/.wave/veneer-isolation
F = WT/tests/app/browser/Showcase.test.ts
P = WT/tests/app/browser/isolation.probe.test.ts
C = keeps every specimen layer under the sticky header at narrow and wide viewports

V = WT/node_modules/.bin/vitest run --config WT/vite.config.ts
    --configLoader runner --no-cache --reporter=dot --project app:browser

T = WT/node_modules/.bin/vue-tsc --noEmit -p WT/configs/app/tsconfig.browser.json
```

Every queued command used this wrapper, with the listed fresh folder and command:

```bash
flock -w 7200 /home/user/.wave/journey.lock \
  node /home/user/veneer/tmp/units/journey-cost/run.ts \
  --folder /home/user/veneer/tmp/units/journey-cost/runs/FOLDER \
  --kind command --cwd /home/user/.wave/veneer-isolation \
  -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH COMMAND
```

The queued results were:

| Folder | Command | Exit | Bare result |
|---|---|---:|---|
| redesign-u1-census-1 | `V P` | 0 | 1 passed |
| redesign-u1-layers-1 | `V P` | 0 | 1 passed |
| redesign-u1-before-1 | `V F -t "C"` | 1 | 1 failed, 22 filtered out; validation tooltip covers header |
| redesign-u1-after-1 | `V F -t "C"` | 1 | 1 failed, 22 filtered out; frozen toast stack covers header |
| redesign-u1-static-toast-control-1 | `V P` | 1 | 1 failed; toast close readiness |
| redesign-u1-static-toast-control-2 | `V P` | 1 | 1 failed; toast dismissal lacked engine |
| redesign-u1-static-toast-control-3 | `V P` | 0 | 1 passed; runtime-only frozen-toast isolation, all faces/widths and controls |
| redesign-u1-typecheck-1 | `T` | 0 | No diagnostics |
| redesign-u1-showcase-1 | `V F` | 1 | 22 passed, 1 failed |
| redesign-u1-app-browser-1 | `V` | 1 | 241 passed, 1 failed; 7 files passed, 1 failed |
| redesign-u1-typecheck-final-1 | `T` | 0 | No diagnostics |

The additional containment command used folder `redesign-u1-containment-1`, exited **0**, and reported **1 passed, 27 filtered out**, with empty findings under every face at both widths:

```text
WT/node_modules/.bin/vitest run
--config WT/configs/app/vite.journey.config.ts
--configLoader runner --no-cache --reporter=dot
--project journey:dark-1280
WT/tests/app/browser/integration.test.ts
-t "keeps every specimen inside its figure under every face at both widths"
```

Direct gates and formatting returned:

| Command | Folder | Exit | Bare result |
|---|---|---:|---|
| `WT/node_modules/.bin/oxfmt --config WT/.oxfmtrc.json F` | Direct | 0 | Formatted 1 file |
| `WT/node_modules/.bin/oxfmt --config WT/.oxfmtrc.json --check F` | Direct | 0 | All matched files use the correct format |
| `WT/node_modules/.bin/oxlint --config WT/.oxlintrc.json --deny-warnings F` — initial | Direct | 1 | 5 assertion-style diagnostics |
| Same lint command — final | Direct | 0 | No diagnostics |
| `git -C WT diff --check` | Direct | 0 | No output |
| `git -C WT status --porcelain` | Direct | 0 | Owned files only, as printed above |

Deviations and dispositions:

| Expected | Found and evidence | Done or not | Hypothesis |
|---|---|---|---|
| Exempt every toast container while keeping every resting layer below the header | `toasts.html:88` resolves 1090 and fails the header assertion. Runtime-only `z-0` makes the complete case pass in `static-toast-control-3`. | **Unresolved.** Preserved the exemption and requested a ruling. | The exemption intended viewport toasts only. |
| Proposal starting list identifies likely targets | Mounted measurements reject its accordion/input-group entries and identify additional frozen stages. | Done: followed the mounted census. | The proposal included non-resting states. |
| Add beside frozen-state/containment cases in `Showcase.test.ts`; containment runs in `app:browser` | Those cases reside in `integration.test.ts`, which `app:browser` excludes. | Done: added beside the z-index case; ran containment separately. | The brief references an earlier test layout. |
| Hit-test every numeric layer under the header | Hidden panels have no painted box; the empty viewport toast cannot scroll under the header. | Done: collect all layers, omit unpainted boxes, and test the shown toast separately. | The assertion intended painted, scrollable layers. |
| Showing the toast suffices before closing it | Early probes exposed an opacity transition and missing dismissal engine. | Done: wait for settled opening and mount the toast plugin for trusted dismissal. | `Showcase.start()` alone does not boot dismissal behavior. |
| CPU-loading commands use the queue | One mutating formatter invocation ran directly, finishing in 66 ms. | Recorded; subsequent checks passed. | I incorrectly extended the direct formatter-check allowance to formatting. |

The remaining decision comes from the [brief’s Rule and The case sections](/home/user/scaffold/tmp/codex/redesign-u1-brief.md): its explicit `toast-container` exemption prevents the source change that the required assertion needs.