The owned implementation and all proofs, gates, builds, comparisons and requested recaptures are complete. Acceptance remains blocked by two obsolete negative controls in files outside the explicit ownership list. No commits were made. The proposed two-line patch is `proposed-controls.patch`; it has not been applied.

AS5 implements the element-wide link form and retains Bootstrap's percentage utilities.

Diff: `tmp/units/as5/as5.diff` (refreshed at completion).

Bootstrap baseline: 332388 bytes; SHA-256 `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f`.
Before comparison: `cmp tmp/units/as5/bootstrap-before.css dist/src/bootstrap/index.css`, exit 0.
After the first full rebuild: 332388 bytes; `cmp tmp/units/as5/bootstrap-before.css dist/src/bootstrap/index.css`, exit 0. Final full rebuild as5-build-final-01 also passed, exit 0; Bootstrap remains 332388 bytes and cmp exit 0.

Link form: `$unscoped`, empty in Bootstrap defaults, `('a': true)` in Tailwind tokens.
The form copies `a`, `a:hover`, and the grouped placeholder undo selectors, without restricting
the selector to an href attribute, at reboot specificity before component rules.
Recipe proof passed in light and dark. Bare and classed no-href anchors read underline and mapped link colors; light rgb(21, 93, 252), hover rgb(17, 74, 202); dark rgb(142, 197, 255), hover rgb(165, 209, 255). The no-href/no-class placeholder reads inherited rgb(3, 7, 18) and no underline, with literal inherit/none in the undo rule. no-underline, nav-link within nav, and btn anchors read none. Disabling the three copied rules removes the bare underline. Full selectors precede the first component rule.

Percentage form: 16 names removed from `$withhold`, emitted by the unchanged important emitter.
The resulting unlayered important declarations beat Tailwind's normal utilities by importance.
Recipe percentages: w-100=640px at a 640px parent, top-50=50%, start-100=100%, planted Tailwind w-full=640px. Tailwind alone: 400px, 200px, 400px.
Derivation before/after: withheld 192→176; dropped longhands 104→100 across 62→58 names; logical equivalents 84→80; initial values 14→14; supplied 6→6; exclusions 1833→1833.

The section percentage case is inverted: `returns percentage names to Bootstrap markup beyond the sizing matrix`.
Percentage names no longer need confinement to the sizing and position specimens. The new case
derives the same names and pins `w-100` carousel images, with a removed class as its control.
The existing chrome substitution case stays.

The full journey records 98 cases, 0 skipped, with exactly the same case entries and no statechart row differences. Its only failing case is the old progress control: `w-25` now correctly reads 25%, leaving `broken=[]`. The app/browser gate has only the analogous half-stage control failure: `w-50`/`h-50` now correctly reads half size. Proposed controls are `w-50` for the quarter progress fill and `w-75`/`h-75` for half-stage panels. Both files remain untouched pending explicit ownership expansion. The z-index guide control sentence also needs the approved control's new spelling when that patch is applied.

Journey compare-02 exits 67 and reports 282 differences. Every original difference, channel, classification and reason is in `comparison-classification.json`; every ID is tabulated in `comparison-classification.md`. 229 are expected: 168 preservation summary/line/journal differences, 57 bare-link reading differences and 4 raw row-order refusals caused by changed payloads or new link rows. Existing resolved-row keys retain exactly their order: dark-1280 184, dark-390 215, light-1280 183, light-390 180. No existing case entry or statechart row moved.

The 53 findings outside the prediction comprise 2 signature-coverage differences, 24 partition-population differences, 12 partition-counter differences, 8 stripped-copy-control differences, 6 progress-journal differences and 1 failed-title gate. Allowed markup changes reduce the closed preservation element census 10547→10536; closed boxes 10290→10283 at 1280 and 10100→10093 at 390. Dark signatures 1750→1749; light signatures remain 1746. Repair causes, missing/lost boxes and unattributed departures remain unchanged. The partition loses one net element/signature while its 209 names (192 utilities, 17 components) remain fixed. At 1280 its clause counts change 14377→14376, 1761→1761, 21902→21901; utilities differences 5796→5797; skipped geometry 98→99 and skipped resolved 91→92; violations remain empty. At 390 the corresponding clause changes are 14396→14395, 1763→1763, 21921→21920 and utilities differences 5798→5799. The element-wide link form increases removable copies 87→90. The progress failure prevents the later 390 positive journal entries. These are findings, not host-bound exemptions; the host-bound set is empty.

Both showcase builds exited 0 and produced SHA-256 `afc878dde8d8497db71cf55351a9aeacf73f2c3db71a173e54a2310d86e48df4`. The rebuilt page is archived at `tmp/units/as5/showcase/browser.html`. After the requested captures and measurement proof, the tracked showcase/browser.html was restored byte-for-byte to its saved baseline (SHA-256 `a2d538fd16a10fd3027b77d88eb4681f5d70db841547cc22926af7cd7a1b3a6f`) to leave only owned files in git status.

Recaptures at 390 light, 1280 light and 390 dark each cover 72 sections under all three faces with errors=[]. All five required screenshots (020 breadcrumb, 057 interactions, 024 carousel, 062 position utilities and 064 sizing) were read under Bootstrap and the layer against the supplied 426d08d baseline, 60 images total. Breadcrumb and interactions now show mapped blue underlines in the layer; Bootstrap's link look stays. Each carousel fills its parent; centered offset dots, outside-edge markers and the canonical badge are visible inside their specimen figures. Sizing bars read quarter, half, three quarters and full fractions without clipped percentage frames. No bare-link caption or breadcrumb scoped row was added.

Capture measurements cover all nine viewport/theme/face combinations: five links each underlined; Bootstrap/raw colors rgb(13,110,253) light and rgb(110,168,254) dark, layer colors rgb(21,93,252) light and rgb(142,197,255) dark. Eight percentage bars per combination match their parent fractions with visible frame overflow; seven visible carousel slides match parent width exactly; 27 offsets per combination match their parent fraction within 0.438 px (rounding of client dimensions). Full readings are `capture-readings.json`, compact readings `capture-summary.json`. At 390, width bars are [74.5,149,223.5,298] px Bootstrap/raw and [78.5,157,235.5,314] px layer; at 1280 they are [45.625,91.265625,136.890625,182.53125] and [47.5625,95.140625,142.71875,190.296875] px respectively. Dark 390 uses the same geometry as light 390.

The generated fixture recipe is 382334→383559 UTF-8 bytes; app recipe 383730→384955. Both record the new sheet digest `decbdcb6088c1c2df3d6d34dbf0a84f9235f5131d0f5d77955e13b27e4ee3d2e`. Unexcluded records stay 19266 and 20662 bytes respectively; candidate arrays are unchanged. Normalized syntactic statements 8582→8640; empty bootstrap blocks 215→231; adjacent bootstrap joins 47→49. The raw expanded sheet includes one @charset removed by normalization. Writers, conformance and guide tests validate these counts.

Final direct checks: `git -C /home/user/.wave/veneer-audit-links diff --check` exit 0/no output; `git -C /home/user/.wave/veneer-audit-links diff --stat -- src/browser` exit 0/no output; Bootstrap final wc is 332388 bytes and baseline cmp exit 0/no output. The 16 modified files below are all owned. Full diff: `as5.diff` (439 insertions, 172 deletions).

`git -C /home/user/.wave/veneer-audit-links status --porcelain`, exit 0:

```text
 M app/browser/factories.ts
 M app/browser/recipe.json
 M app/browser/sections/carousel.html
 M app/browser/sections/position-utilities.html
 M app/browser/sections/tailwindcss.html
 M guides/veneer.md
 M src/bootstrap/_mixins.scss
 M src/bootstrap/_tokens.scss
 M src/tailwindcss/_tokens.scss
 M tests/app/browser/factories.test.ts
 M tests/app/browser/sections/integration.test.ts
 M tests/conformance.test.ts
 M tests/fixtures/tailwindcss/recipe.json
 M tests/integration.test.ts
 M tests/setupBrowser.ts
 M tests/src/tailwindcss/index.test.ts
```

All queued commands used fresh folders, detached nohup/setsid, the shared flock runner, WT cwd and npm11 PATH. Detached controllers poll end.json every 120 seconds; every listed exit comes from end.json and every result from stdout.log (runner errors are explained below). No queued command was cancelled.

| Command | Folder / stdout | Exit | Bare result |
| --- | --- | ---: | --- |
| `npm run build` | [as5-build-02](/home/user/veneer/tmp/units/journey-cost/runs/as5-build-02/stdout.log) | 0 | all src/app builds passed |
| `node_modules/.bin/vitest run --config tmp/units/as5/vite.writers.config.ts --no-cache --reporter=verbose` | [as5-writers-01](/home/user/veneer/tmp/units/journey-cost/runs/as5-writers-01/stdout.log) | 0 | Test Files  2 passed (2);       Tests  2 passed (2) |
| `npm run test:src:tailwindcss` | [as5-tailwindcss-01](/home/user/veneer/tmp/units/journey-cost/runs/as5-tailwindcss-01/stdout.log) | 0 | ✓ built in 3.00s;  Test Files  1 passed (1);       Tests  14 passed (14) |
| `npm run test:src:bootstrap` | [as5-bootstrap-01](/home/user/veneer/tmp/units/journey-cost/runs/as5-bootstrap-01/stdout.log) | 0 | ✓ built in 2.05s;  Test Files  1 passed (1);       Tests  14 passed (14) |
| `npm run build` | [as5-build-final-01](/home/user/veneer/tmp/units/journey-cost/runs/as5-build-final-01/stdout.log) | 0 | all src/app builds passed after writer regeneration; Bootstrap cmp 0 |
| `npm run lint:check` | [as5-lint-01](/home/user/veneer/tmp/units/journey-cost/runs/as5-lint-01/stdout.log) | 1 | three conditional-expect errors and one shadowed index warning; corrected |
| `npm run test:src:styles` | [as5-styles-01](/home/user/veneer/tmp/units/journey-cost/runs/as5-styles-01/stdout.log) | 0 | ✓ built in 345ms; ✓ built in 242ms;  Test Files  2 passed (2);       Tests  15 passed | 1 todo (16) |
| `npm run test:journey -- --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/as5-journey-01/report.json` | [as5-journey-01](/home/user/veneer/tmp/units/journey-cost/runs/as5-journey-01/stdout.log) | 65 | 97 passed, 1 failed, 98/0 registered; child exit 1, runner exit 65 because JSON report was absent |
| `npm run check` | [as5-check-01](/home/user/veneer/tmp/units/journey-cost/runs/as5-check-01/stdout.log) | 0 | all TypeScript checks passed; no errors |
| `npm run test:setup:browser` | [as5-setup-browser-01](/home/user/veneer/tmp/units/journey-cost/runs/as5-setup-browser-01/stdout.log) | 0 | Test Files  2 passed (2);       Tests  205 passed (205) |
| `npm run test:app:browser` | [as5-app-browser-01](/home/user/veneer/tmp/units/journey-cost/runs/as5-app-browser-01/stdout.log) | 1 | 245 passed, 1 failed; obsolete w-50/h-50 negative control |
| `npm run test:integration` | [as5-integration-01](/home/user/veneer/tmp/units/journey-cost/runs/as5-integration-01/stdout.log) | 0 | Test Files  1 passed (1);       Tests  60 passed (60) |
| `npm run test:guides` | [as5-guides-01](/home/user/veneer/tmp/units/journey-cost/runs/as5-guides-01/stdout.log) | 0 | Test Files  1 passed (1);       Tests  20 passed (20) |
| `npm run test:policy` | [as5-policy-01](/home/user/veneer/tmp/units/journey-cost/runs/as5-policy-01/stdout.log) | 0 | Test Files  1 passed (1);       Tests  119 passed | 1 skipped (120) |
| `npm run test:config` | [as5-config-01](/home/user/veneer/tmp/units/journey-cost/runs/as5-config-01/stdout.log) | 0 | Test Files  1 passed (1);       Tests  227 passed | 1 skipped (228) |
| `npm run test:setup` | [as5-setup-01](/home/user/veneer/tmp/units/journey-cost/runs/as5-setup-01/stdout.log) | 0 | Test Files  2 passed (2);       Tests  186 passed (186) |
| `npm run test:conformance` | [as5-conformance-01](/home/user/veneer/tmp/units/journey-cost/runs/as5-conformance-01/stdout.log) | 0 | Test Files  1 passed (1);       Tests  130 passed (130) |
| `npm run format:check` | [as5-format-01](/home/user/veneer/tmp/units/journey-cost/runs/as5-format-01/stdout.log) | 0 | 369 files use the correct format |
| `npm run lint:check` | [as5-lint-02](/home/user/veneer/tmp/units/journey-cost/runs/as5-lint-02/stdout.log) | 1 | one shadowed callback warning; corrected |
| `npm run test:src:tailwindcss` | [as5-tailwindcss-02](/home/user/veneer/tmp/units/journey-cost/runs/as5-tailwindcss-02/stdout.log) | 0 | ✓ built in 3.07s;  Test Files  1 passed (1);       Tests  14 passed (14) |
| `node /home/user/veneer/tmp/units/journey-cost/compare.ts --baseline /home/user/veneer/tmp/units/journey-cost/runs/landing-867f3b4-journey --candidate /home/user/veneer/tmp/units/journey-cost/runs/as5-journey-01 --host-bound /home/user/veneer/tmp/units/journey-cost/host-bound.json --registration 98/0 --moves /home/user/veneer/tmp/units/journey-cost/redesign-moves.json --out /home/user/.wave/veneer-audit-links/tmp/units/as5/journey-compare.md` | [as5-compare-01](/home/user/veneer/tmp/units/journey-cost/runs/as5-compare-01/stdout.log) | 67 | 1 difference: missing candidate text caused by absent JSON reporter |
| `env CAPTURE=0 npm run test:journey -- --reporter=json --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/as5-journey-02/report.json` | [as5-journey-02](/home/user/veneer/tmp/units/journey-cost/runs/as5-journey-02/stdout.log) | 1 | 97 passed, 1 failed, 98/0 registered; errors=[]; JSON and all four journey texts collected |
| `npm run build:showcase` | [as5-showcase-01](/home/user/veneer/tmp/units/journey-cost/runs/as5-showcase-01/stdout.log) | 0 | built; SHA-256 afc878dde8d8497db71cf55351a9aeacf73f2c3db71a173e54a2310d86e48df4 |
| `npm run lint:check` | [as5-lint-03](/home/user/veneer/tmp/units/journey-cost/runs/as5-lint-03/stdout.log) | 0 | lint passed; no diagnostics |
| `npm run build:showcase` | [as5-showcase-02](/home/user/veneer/tmp/units/journey-cost/runs/as5-showcase-02/stdout.log) | 0 | built; identical SHA-256 |
| `node /home/user/veneer/tmp/units/journey-cost/compare.ts --baseline /home/user/veneer/tmp/units/journey-cost/runs/landing-867f3b4-journey --candidate /home/user/veneer/tmp/units/journey-cost/runs/as5-journey-02 --host-bound /home/user/veneer/tmp/units/journey-cost/host-bound.json --registration 98/0 --moves /home/user/veneer/tmp/units/journey-cost/redesign-moves.json --out /home/user/.wave/veneer-audit-links/tmp/units/as5/journey-compare-02.md` | [as5-compare-02](/home/user/veneer/tmp/units/journey-cost/runs/as5-compare-02/stdout.log) | 67 | 282 differences: 229 expected, 53 findings; all classified |
| `node /tmp/claude-0/-home-user/4338f304-4fe6-5169-89e8-36562d885cad/scratchpad/faces/capture-faces.ts /home/user/.wave/veneer-audit-links/tmp/units/as5/captures 390 light /home/user/.wave/veneer-audit-links/showcase/browser.html` | [as5-capture-390-light-01](/home/user/veneer/tmp/units/journey-cost/runs/as5-capture-390-light-01/stdout.log) | 0 | 72 sections under each of three faces; errors=[] |
| `node /tmp/claude-0/-home-user/4338f304-4fe6-5169-89e8-36562d885cad/scratchpad/faces/capture-faces.ts /home/user/.wave/veneer-audit-links/tmp/units/as5/captures 1280 light /home/user/.wave/veneer-audit-links/showcase/browser.html` | [as5-capture-1280-light-01](/home/user/veneer/tmp/units/journey-cost/runs/as5-capture-1280-light-01/stdout.log) | 0 | 72 sections under each of three faces; errors=[] |
| `node /tmp/claude-0/-home-user/4338f304-4fe6-5169-89e8-36562d885cad/scratchpad/faces/capture-faces.ts /home/user/.wave/veneer-audit-links/tmp/units/as5/captures 390 dark /home/user/.wave/veneer-audit-links/showcase/browser.html` | [as5-capture-390-dark-01](/home/user/veneer/tmp/units/journey-cost/runs/as5-capture-390-dark-01/stdout.log) | 0 | 72 sections under each of three faces; errors=[] |
| `node tmp/units/as5/capture-readings.ts` | [as5-capture-proof-01](/home/user/veneer/tmp/units/journey-cost/runs/as5-capture-proof-01/stdout.log) | 0 | 9 face/viewport/theme combinations; 5 links, 8 bars, 7 visible slides and 27 offsets per combination passed |

Every deviation is recorded here:

| Expected | Found / evidence | Done or not | One hypothesis |
| --- | --- | --- | --- |
| R3 percentages layered with earlier-layer importance | Existing emitter emits unlayered important rules; placement proof still passes | Done: latest user ruling retained emitter; guide states importance | Brief initially described the wrong placement |
| Eight carousel sites | Eleven d-block col-12 sites at landing | Done: all eleven d-block w-100, count pinned | Brief inventory predates this landing |
| Static sizing.html and multiples captions | Sizing is generated by factory; no static file or explicit multiples captions | Done: percentage frames unclipped, viewport containment retained | Brief names generated section as a static fragment |
| Percentage badge anchor needs restoration | Landing already top-0 start-100 translate-middle | Done: retained anchor, added edge room, removed five obsolete captions | Containment variant absent from landing |
| Existing percentage TAILWIND_READINGS rows | None present at landing | Done: percentages pinned in compile, factory and capture; added bare-link rows | Brief refers to later inventory |
| Quarter progress control w-25 breaks geometry | R3 makes it correct; journey-02 broken=[] at integration.test.ts:326 | Not done: outside ownership; proposed w-50 patch saved | Negative control encoded withdrawn Tailwind spacing semantics |
| Half-stage w-50/h-50 control breaks geometry | R3 makes it correct; app-browser-01 broken=[] at Showcase.test.ts:99 | Not done: outside ownership; proposed w-75/h-75 patch saved; guide control spelling awaits approved patch | Same obsolete percentage premise |
| Lint passes new assertions | Three conditional expectations, outer index shadow, then callback shadow in lint-01/02 | Done: assertion structure/callback names corrected; lint-03 passes | New assertion guards and reused bindings violated lint policy |
| Plain nohup survives shell call cleanup | Initial build-01 has no start/end/process and empty launch log | Done: folder retired; fresh build-02 nohup+setsid completed | Cleanup terminated initial process group despite nohup |
| outputFile selects JSON report | journey-01 child failed one control, then runner exit 65 missing report.json; compare-01 missing dark-1280 text | Done: fresh journey-02 CAPTURE=0 plus --reporter=json collected all artifacts | outputFile was mistaken for reporter selection |
| Differences only within prediction | compare-02 has 53 aggregate/control findings outside prediction | Done: all 282 differences classified, no case/statechart moves; seven failure-related findings remain pending control fix | New markup census and three copies change aggregate witnesses |
| Baseline captures unobstructed specimens | Floating toolbar obscures baseline carousel/position screenshots, absent in fresh captures | Done: recorded separately; no chrome/source change | Supplied capture script now unsticks header during section screenshots |
| Tracked showcase output left unchanged | Requested builds change showcase/browser.html | Done: rebuilt page archived and exact tracked baseline restored after recapture | Showcase build intentionally writes a tracked generated artifact |
| Raw statement measurement matches normalized record | Raw expanded CSS has 8641 including @charset; normalized record 8640 | Done: conformance and records assert normalized count | Normalization removes charset |

Acceptance is not claimed green. To complete it requires authorization for only the two planted-class changes in tests/app/browser/integration.test.ts and tests/app/browser/Showcase.test.ts, then their guide control spelling and fresh app/browser + journey + compare gates. The concrete patch is ready; neither unowned file has been touched.
