CL3's owned implementation is present, and every prescribed gate passed. Calibration acceptance remains open for the anchor colors and the muted text of `address` and `dd`, whose required token values are outside this brief's grant. The `pre`, `samp`, and `var` surfaces retain transparent backgrounds under the code-family retention option. The following tables report these limits; the green gates do not establish full calibration parity.

Assignment: `cl3-brief-3.md`, with the unchanged portions of `cl3-brief-2.md`. Role: `sol` on Astra, sole writer, no agents spawned. Baseline and return HEAD: `9f5ffda`. Host: Windows, 2026-09-21. Bench journal: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl3-2.jsonl`; thread: `01a0c397-fde9-7752-a904-3d76bff7ba31`. No commit or dependency installation was performed.

The token ruling was implemented through the existing theme maps. The `code` value in `$light` and `$dark` is `var(--vn-text-body-base)`; the existing `--vn-text-code` closure line still reads that map entry. This keeps the map as the value authority without leaving unused pink entries. `--bs-code-color` still aliases `--vn-text-code`. The closure emits `--vn-surface-code: color-mix(in oklab, var(--vn-text-body-base) 12%, transparent)` beside the highlight surface, and the registry adds `surface.code`. The guide records the expressions, Elements provenance, and the departure from Bootstrap's code color.

The resolved token consumers produced these readings in the final styles gates. The text-token equality assertion also passed in each mode.

| Receipt | Mode | `--vn-text-code` as color | `--vn-surface-code` as background color |
| --- | --- | --- | --- |
| Managed Chromium | light | `oklch(0.208 0.042 265.755)` | `oklab(0.208 -0.00310889 -0.0418848 / 0.12)` |
| Managed Chromium | dark | `oklch(0.929 0.013 255.508)` | `oklab(0.929 -0.00325318 -0.0125864 / 0.12)` |
| Edge | light | `oklch(0.208 0.042 265.755)` | `oklab(0.208 -0.00310889 -0.0418848 / 0.12)` |
| Edge | dark | `oklch(0.929 0.013 255.508)` | `oklab(0.929 -0.00325318 -0.0125864 / 0.12)` |

The source for the following bindings is `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/calibration-content.md`, unless the row names Bootstrap retention. Every added partial has a mirrored browser proof; the existing body proof was extended. The elements and physical-axis guards passed without an edit, and the layer order remains `theme, reset, base, elements, components, utilities`.

| Partial | Values and source |
| --- | --- |
| `_reset.scss` | Bootstrap's universal and pseudo-element `border-box`, important `[hidden]` suppression, and motion-qualified root scrolling; placed in `reset` after the theme load. Resolved scrolling is `smooth` for no preference and `auto` for reduced motion. Hidden wins against normal component paint, unlayered normal paint, and important utility-layer paint; removing the attribute restores those displays. |
| `_html.scss` | Unchanged: existing intrinsic-size interpolation and text-size adjustment remain. Its existing proofs passed in the complete styles runs. |
| `_body.scss` | Reads the compatible body font, size, weight, line height, text, and background variables; adds margin zero, the `start` alignment fallback, text-size adjustment, and transparent tap highlight. Default typography remains 14px/21px/400. A body island overrides every compatible knob and the proof reads the paragraph consumer while the outer body remains unchanged. |
| `_heading.scss` | `heading-h1` through `heading-h6`: 36/30/24/20/18/16px through size steps 8 through 3; heading weight 600 and line height 1.2 through their tokens; zero margins. Reads `--bs-heading-color`, with an island override proof. |
| `_p.scss` | `paragraph-first`: zero margins and inherited 14px/21px body typography. The contextual `paragraph-second` spacing and section layout are not imported as bare-tag selectors. |
| `_hr.scss` | `hr`: zero margins, inherited text color, 1px solid block-start border through `--vn-border-width`, opacity 0.2. |
| `_a.scss` | Required link RGB tokens and `--bs-link-opacity` fallback 1; token underline; hover RGB token. No-href, classless anchors inherit text and remove decoration at rest and hover. The existing link-token values differ from the record, as detailed in the calibration limits table. |
| `_ul.scss` | `list-ul-outer`: zero margins, 32px inline-start padding as twice space step 8, disc markers. Contextual nested-list values are not imported. |
| `_ol.scss` | `list-ol-outer`: zero margins, the same 32px token-derived indentation, decimal markers. Contextual nested-list values are not imported. |
| `_dl.scss` | `list-dl`: zero margin, a 1:2 grid, gaps from space steps 4 and 8. At the record's 520px width, columns read 168px/336px. `dt` reads heading weight 600; `dd` has zero margins. The muted `dd` color remains unbound. |
| `_blockquote.scss` | `blockquote`: zero start/inline margins, 16px end margin and inline-start padding through space step 8, 4px current-color border through step 2, italic text. |
| `_address.scss` | `address`: normal font style, inherited line height, 14px end margin through space step 7. Its calibrated muted color remains unbound. |
| `_abbr.scss` | `abbr` and retained Bootstrap `abbr[title]`: dotted underline, help cursor, and no ink skipping. |
| `_strong.scss` | Bootstrap's retained `bolder` weight, resolving to 700 over the body weight. |
| `_small.scss` | `small`: 87.5%, resolving to 12.25px and 18.375px line height. |
| `_mark.scss` | `mark`: zero block padding and 0.1875em inline padding, resolving to 2.625px. The browser's native black text and yellow background match the record on Chromium and Edge; no literal paint color is authored in this partial. |
| `_sub.scss` | `sub`, agreeing with Bootstrap retention: relative positioning, 75% size (10.5px), zero line height, baseline alignment, logical block-end offset -0.25em (-2.625px). |
| `_sup.scss` | `sup`, agreeing with Bootstrap retention: the same typography and logical block-start offset -0.5em (-5.25px). |
| `_code.scss` | `code-inline`: `ui-monospace` followed by the existing mono token; 90% size (12.6px), 18.9px line height, 0.125em/0.25em padding (1.575px/3.15px), code text and surface tokens. Small-radius token and Bootstrap's retained break-word wrapping. |
| `_kbd.scss` | `kbd`: the same mono family, 87.5% size (12.25px), 18.375px line height, 0.0625em/0.375em padding (0.765625px/4.59375px), code text and surface tokens, 1px border at 22% of code text, small-radius token. The record has no text inversion. |
| `_pre.scss` | `pre`: the same mono family, 87.5% size, line height 1.6 (19.6px), zero margin, 14px/16px padding through space steps 7/8, code text, and the calibrated border token. Retains Bootstrap's block/auto-overflow behavior and transparent background; uses the base-radius token. |
| `_samp.scss` | `samp`: the inline-code font, size, line height, and padding readings; text through the code token. Transparent background retained because its distinct measured raised surface is not granted. |
| `_var.scss` | `var`: the record's shorter `ui-monospace, SFMono-Regular, Menlo, monospace` stack, 95% size (13.3px), italic style, 19.95px line height, and 0.25em inline padding (3.325px); text through the code token. Transparent background retained. |

No size-ramp step equals 12.6px, 12.25px, or 13.3px. No space-ramp step equals 1.575px, 3.15px, 0.765625px, 4.59375px, or 3.325px. The code-family partials therefore use the record's relative sizes and padding. The mono token lacks the record's leading `ui-monospace`, so the matching members prepend it. The `var` stack differs from that token and is written as recorded. No token was added for these absent ramp steps.

The narrowed deviation clause permitted continuation on the remaining members. These calibration limits require a subsequent ruling or grant; no matching value was fabricated.

| Member | Required record reading | Available value and returned treatment |
| --- | --- | --- |
| `address`, `dd` | Color rows 2934 and 1000: light `oklch(0.446 0.043 257.281)`, dark `oklch(0.704 0.04 256.788)`. The record calls its source `--color-text-muted`. | Veneer has no equivalent muted-text token. `--vn-text-secondary` is body text at 75% alpha, and the secondary role does not supply the dark reading. These members keep inherited text; their calibrated color is not proved. Geometry is implemented and proved. |
| Linked `a` | Rest row 1215: light `oklab(0.3984 -0.019591 -0.190088)`, dark `oklab(0.7458 -0.0728685 -0.0983535)`. Hover row 1280: `color(srgb 0.0407929 0.170295 0.538144)` / `color(srgb 0.248988 0.580565 0.745237)`. | The required `--vn-link-rgb` reads `8, 65, 234` / `85, 205, 243`; hover reads `6, 52, 187` / `119, 215, 246`. The grant does not permit retuning the link map entries or closure. The proof verifies the required token consumption, opacity, and no-href behavior, not equality with the differing calibration colors. |
| `pre`, `samp`, `var` | Background rows 2379, 2586, and 2655: light `oklch(0.968 0.007 247.896)`, dark `oklch(0.265 0.014 256)`. The record calls its source `--color-surface-raised`. | Existing `--vn-surface-raised` is `oklch(0.984 0.003 247.858)` / `oklch(0.235 0.013 256)`. The granted code surface is a different 12% tint. These backgrounds are explicitly retained as transparent, as the code-family clause permits. |

The pinned inventory's `reboot.selectors` supplied the selector census. Its `b` selector has no owned `_b.scss` partial in this brief and was not added to `_strong.scss`, whose owner is the `strong` tag. Whole-Reboot presence remains for the CL4 census; this report claims the named CL3 partial population, not all Reboot text selectors. No contextual compound selector was added.

`ContentSection` implements `SectionInterface` and renders the frozen `CONTENT_SPECIMENS` table in order. Each row is frozen and carries a name and trusted application markup through `ContentSpecimen`. The section includes the scoped heading and text specimens, lists, description terms, code members, linked and placeholder anchors, and titled abbreviation/address/subscript/superscript markup. The shell mounts Content after Buttons. Its proof observes real DOM removals and requires Content to leave before `main`. Section proofs cover table order, markup, release, preserved neighboring content, and repeated destruction. The app barrel export inventory and shell region inventory were updated together.

The guide adds the partial rows, the fixed-heading, hidden-layer, alignment-fallback, and code-color departure rows, the token rows, and the Content region sentence. The Compatibility table and `tests/conformance.test.ts`'s `listed = ['btn']` remain unchanged. No setup module, setup proof, fixture, configuration, component partial, browser library file, or manifest was edited.

The scroll-behavior probe was not repeated. The retained brief-2 report records managed Chromium exit 0 with `Test Files 4 passed (4)` and `Tests 84 passed | 4 skipped (88)`, and Edge exit 0 with the same counts. Its temporary rule was removed and the restored build exited 0. The implemented rule passed the post-implementation journey gates on Chromium and Edge. Those runs expose no CL11 reduced-motion staging bound. The existing capture-only journey case remains disabled in ordinary runs; no Content portfolio capture is claimed.

Real red/green runs supplied falsification because the brief declares the `prove` tool blocked. The following counts are run measurements, separately observed on Chromium and Edge. Every red run exited 1; every restored run exited 0.

| Instrument and executed command | Chromium red → green | Edge red → green |
| --- | --- | --- |
| `cmd.exe /d /c tmp\units\cl3-proofs.cmd`; its styles invocation is `node_modules\.bin\vitest.cmd run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot %FILES%`, with the exact partial/body/reset file list in the launcher | Files: 22 failed → 22 passed. Tests: 47 failed, 2 passed → 49 passed. | Files: 22 failed → 22 passed. Tests: 47 failed, 2 passed → 49 passed. |
| `cmd.exe /d /c tmp\units\cl3-token-proofs.cmd`; `tokens.test.ts -t "code calibration tokens"`, text-token plant | Files: 1 failed → 1 passed. Tests: 2 failed → 2 passed; 23 filtered out. | The same independently recorded counts. |
| The same token command, surface-token plant | Files: 1 failed → 1 passed. Tests: 2 failed → 2 passed; 23 filtered out. | The same independently recorded counts. |
| `node_modules\.bin\vitest.cmd run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/elements/a.test.ts`; Edge and restoration runs in `cl3-nohref.cmd` | Files: 1 failed → 1 passed. Tests: 2 failed, 1 passed → 3 passed. | The same independently recorded counts. |
| `cmd.exe /d /c tmp\units\cl3-shell-proof.cmd`, running `npm.cmd run test:app:browser` against the final section and shell proofs | Files: 2 failed, 2 passed → 4 passed. Tests: 3 failed, 10 passed → 13 passed. | The same independently recorded counts. |

The earlier section-only app control, also retained under `cl3-app-*-*.log`, produced 2 failed/11 passed tests and then 13 passed on each browser. The later shell control supersedes it for the removal-order claim. The token runs' filtered tests are a consequence of the explicit test-name filter; the complete styles gates have no skipped tests.

The plants and their removals were as follows.

| Plant | Observed failure and removal |
| --- | --- |
| Per-partial white text, plus reset `content-box`, visible hidden elements, and `auto` scrolling | Every targeted partial file failed. The reset box, hidden, and scroll tests failed. The body island consumer failed. Exact saved file contents were restored and the cascade rebuilt before green runs. |
| Theme-map code values changed to pink | The mode-specific code-token equality cases failed on Chromium and Edge. The maps were restored and the cascade rebuilt. |
| Code surface alpha changed from 12% to 24% | The mode-specific painted-surface cases failed on Chromium and Edge. The closure was restored and the cascade rebuilt. |
| No-href color changed to white and decoration to underline | The no-href assertions failed on Chromium and Edge. The partial was restored and the cascade rebuilt. |
| Content order reversed and destruction replaced by an attribute write | Section order/release and the final shell removal-order proof failed. The implementation was restored before each green app run. |

`cl3-plants.mjs` refuses restoration if a file differs from its recorded planted content. Its final `cl3-plant-state.json` is `[]`. No plant remains. The SCSS plant and restoration builds all exited 0. The final implementation had passed the ordered gates before the last app control, and that control restored the exact source bytes those gates judged.

The prescribed gates ran in order through `cl3-gates.cmd`; the driver log records each exit. Host-only gates run once. Browser gates carry the receipts shown here. Edge conformance and journeys were also run through `cl3-edge-final.cmd` after the prescribed sequence.

| Command | Receipt | Exit | Final output |
| --- | --- | --- | --- |
| `npm.cmd run format:check` | Host | 0 | `All matched files use the correct format.` |
| `npm.cmd run lint:check` | Host | 0 | `npm notice run oxlint --config .oxlintrc.json --deny-warnings .`; no diagnostics. |
| `npm.cmd run check` | Host | 0 | `npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json`; no diagnostics. |
| `npm.cmd run build` | Host | 0 | `✓ built in 436ms` after the application build. |
| `npm.cmd run test:src:styles` | Managed Chromium | 0 | `Test Files 30 passed (30)`; `Tests 157 passed (157)`; `Duration 21.76s`. |
| `npm.cmd run test:conformance` | Managed Chromium/default | 0 | `Test Files 1 passed (1)`; `Tests 8 passed (8)`; `Duration 3.88s`. |
| `npm.cmd run test:app:browser` | Managed Chromium | 0 | `Test Files 4 passed (4)`; `Tests 13 passed (13)`; `Duration 2.26s`. |
| `npm.cmd run test:journey` | Managed Chromium | 0 | `Test Files 4 passed (4)`; `Tests 84 passed \| 4 skipped (88)`; `Duration 21.16s`. |
| `npm.cmd run test:guides` | Host | 0 | `Test Files 1 passed (1)`; `Tests 18 passed (18)`; `Duration 578ms`. |
| `npm.cmd run test:policy` | Host | 0 | `Test Files 1 passed (1)`; `Tests 109 passed \| 1 skipped (110)`; `Duration 2.06s`. |
| `npm.cmd run test:setup` | Host | 0 | `Test Files 3 passed (3)`; `Tests 126 passed (126)`; `Duration 6.56s`. |
| `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:styles` | Edge, set by `.cmd` launcher | 0 | `Test Files 30 passed (30)`; `Tests 157 passed (157)`; `Duration 29.66s`. |
| `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:app:browser` | Edge, set by `.cmd` launcher | 0 | `Test Files 4 passed (4)`; `Tests 13 passed (13)`; `Duration 8.51s`. |
| `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:conformance` | Edge, additional run | 0 | `Test Files 1 passed (1)`; `Tests 8 passed (8)`; `Duration 4.30s`. |
| `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:journey` | Edge, additional run | 0 | `Test Files 4 passed (4)`; `Tests 84 passed \| 4 skipped (88)`; `Duration 28.22s`. |

The ordinary journey skips are the capture-only case in each registered variant. The policy skip is the existing substitution-table case conditioned on the canon policy file being present. No skip or test timeout was added. The initial development lint run found an unused `matchesColor` import in the mark proof; that import was removed before the ordered green lint gate.

CL12 must keep the final guide's calibration claims within the measured bindings and any later ruling on the unbound colors and retained surfaces. The inventory's `b` selector remains a whole-Reboot census obligation. No failing post-implementation journey creates a CL11 bound. Independent audit and final acceptance remain with the Orchestrator.

The actual return diff is retained in `cl3-return.diff`. The following `git diff --stat` output covers tracked modifications; added, unstaged files appear in the status output rather than in this stat.

```text
 app/browser/Showcase.ts                |  3 +-
 app/browser/constants.ts               | 56 +++++++++++++++++++++++++++++++++-
 app/browser/index.ts                   |  1 +
 app/browser/types.ts                   |  8 +++++
 guides/veneer.md                       | 51 +++++++++++++++++++++++--------
 src/core/constants.ts                  |  1 +
 src/styles/_mixins.scss                |  1 +
 src/styles/_tokens.scss                |  4 +--
 src/styles/elements/_body.scss         | 16 ++++++----
 src/styles/index.scss                  | 21 +++++++++++++
 tests/app/browser/Showcase.test.ts     | 19 ++++++++++--
 tests/app/browser/index.test.ts        |  3 ++
 tests/src/styles/elements/body.test.ts | 26 ++++++++++++++++
 tests/src/styles/tokens.test.ts        | 35 +++++++++++++++++++++
 14 files changed, 221 insertions(+), 24 deletions(-)
```

The actual `git status --porcelain --untracked-files=all` output is:

```text
 M app/browser/Showcase.ts
 M app/browser/constants.ts
 M app/browser/index.ts
 M app/browser/types.ts
 M guides/veneer.md
 M src/core/constants.ts
 M src/styles/_mixins.scss
 M src/styles/_tokens.scss
 M src/styles/elements/_body.scss
 M src/styles/index.scss
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/index.test.ts
 M tests/src/styles/elements/body.test.ts
 M tests/src/styles/tokens.test.ts
?? app/browser/sections/ContentSection.ts
?? src/styles/_reset.scss
?? src/styles/elements/_a.scss
?? src/styles/elements/_abbr.scss
?? src/styles/elements/_address.scss
?? src/styles/elements/_blockquote.scss
?? src/styles/elements/_code.scss
?? src/styles/elements/_dl.scss
?? src/styles/elements/_heading.scss
?? src/styles/elements/_hr.scss
?? src/styles/elements/_kbd.scss
?? src/styles/elements/_mark.scss
?? src/styles/elements/_ol.scss
?? src/styles/elements/_p.scss
?? src/styles/elements/_pre.scss
?? src/styles/elements/_samp.scss
?? src/styles/elements/_small.scss
?? src/styles/elements/_strong.scss
?? src/styles/elements/_sub.scss
?? src/styles/elements/_sup.scss
?? src/styles/elements/_ul.scss
?? src/styles/elements/_var.scss
?? tests/app/browser/sections/ContentSection.test.ts
?? tests/src/styles/elements/a.test.ts
?? tests/src/styles/elements/abbr.test.ts
?? tests/src/styles/elements/address.test.ts
?? tests/src/styles/elements/blockquote.test.ts
?? tests/src/styles/elements/code.test.ts
?? tests/src/styles/elements/dl.test.ts
?? tests/src/styles/elements/heading.test.ts
?? tests/src/styles/elements/hr.test.ts
?? tests/src/styles/elements/kbd.test.ts
?? tests/src/styles/elements/mark.test.ts
?? tests/src/styles/elements/ol.test.ts
?? tests/src/styles/elements/p.test.ts
?? tests/src/styles/elements/pre.test.ts
?? tests/src/styles/elements/samp.test.ts
?? tests/src/styles/elements/small.test.ts
?? tests/src/styles/elements/strong.test.ts
?? tests/src/styles/elements/sub.test.ts
?? tests/src/styles/elements/sup.test.ts
?? tests/src/styles/elements/ul.test.ts
?? tests/src/styles/elements/var.test.ts
?? tests/src/styles/reset.test.ts
```

The status contains only owned paths. The report and instruments are under ignored ``. `git diff --check` exited 0 with empty output. A UTF-8 scan of every path in this status found no replacement character, unintended control character, or tested mojibake sequence (`Ã.`, `Â[U+0080–U+00FF]`, `â€`). Git emitted its existing warning that `C:\Users\mikes/.config/git/ignore` was inaccessible because permission was denied.
