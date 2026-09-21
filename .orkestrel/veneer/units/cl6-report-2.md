CL6 is implemented at HEAD `c1c81a4`. The ordered gates and the required Edge suites pass. The `link` key is shipped and listed. No off-limits file changed, and no unapproved consumer moved. Execution was direct, with no agents spawned.

This report follows `cl6-brief-3.md`, with briefs 2 and 1 beneath it. It supersedes the earlier stopped report, not its retained evidence.

The hover binding follows the measurement in `cl6-hover-mechanism.md`: the recorded hover channels are the rest channels multiplied by 0.8 in sRGB. The retained scout transcribes the calibration's rest row 1215, hover row 1280, and unchanged specimen-property rows 1272 and 1337. The binding uses the recorded primary-over-body-text mix at 70% in light and 80% in dark, then `color-mix(in srgb, var(--vn-link-base) 80%, black)` in each mode.

The following readings come from `node cl6-readings.mjs before` and the same command with `after`, each exiting 0. Chromium and Edge agree. Full root-token readings are retained in `cl6-before.json` and `cl6-after.json` beside the instrument.

| Mode | Retuned base | Retuned hover | Agreement with record |
| --- | --- | --- | --- |
| Light | `oklab(0.3984 -0.019591 -0.190088)` | `color(srgb 0.0407929 0.170295 0.538144)` | Each matches the recorded serialization |
| Dark | `oklab(0.7458 -0.0728685 -0.0983535)` | `color(srgb 0.248988 0.580565 0.745237)` | Each matches the recorded serialization |

The anchor uses relative `rgb()` over the base tokens to retain calibrated precision while applying `--bs-link-opacity`. Its rest serialization differs by colour space; the browser proof compares it with the recorded oklab colour. The public channel tokens retain rounded integer channels.

The blast-radius readings follow. “Base” includes `--vn-link-base`, `--bs-link-color`, and the link button's resolved resting colour. “Hover” includes `--vn-link-hover-base`, `--bs-link-hover-color`, and the link button's resolved hover and active colours.

| Consumer | Mode | Before | After |
| --- | --- | --- | --- |
| Base | Light | `oklch(0.48 0.255 264)` | `oklab(0.3984 -0.019591 -0.190088)` |
| Base | Dark | `color(srgb 0.335148 0.805142 0.954563)` | `oklab(0.7458 -0.0728685 -0.0983535)` |
| Hover | Light | `color(srgb 0.0253761 0.203206 0.73286)` | `color(srgb 0.0407929 0.170295 0.538144)` |
| Hover | Dark | `color(srgb 0.468118 0.844113 0.963651)` | `color(srgb 0.248988 0.580565 0.745237)` |
| Anchor rest | Light | `rgb(8, 65, 234)` | `color(srgb 0.0509911 0.212869 0.672679)` |
| Anchor rest | Dark | `rgb(85, 205, 243)` | `color(srgb 0.311235 0.725706 0.931546)` |
| Anchor hover | Light | `rgb(6, 52, 187)` | `color(srgb 0.0407929 0.170295 0.538144)` |
| Anchor hover | Dark | `rgb(119, 215, 246)` | `color(srgb 0.248988 0.580565 0.745237)` |
| Rest triplet and Bootstrap alias | Light | `8, 65, 234` | `13, 54, 172` |
| Rest triplet and Bootstrap alias | Dark | `85, 205, 243` | `79, 185, 238` |
| Hover triplet and Bootstrap alias | Light | `6, 52, 187` | `10, 43, 137` |
| Hover triplet and Bootstrap alias | Dark | `119, 215, 246` | `63, 148, 190` |
| Decoration and its Bootstrap alias | Light and dark | `underline` | `underline` |

The triplet aliases are `--bs-link-color-rgb` and `--bs-link-hover-color-rgb`. Every other root `--vn-*` and `--bs-*` reading stayed unchanged. The registry and the Bootstrap root/dark name tables are names-only consumers and stayed unchanged. The anchor case table takes the recorded colours. The button proof changes only its authorized rest and hover assertions to the measured light values; `_button.scss` is untouched. Dark button rest, hover, and active readings are retained in the measurement artifacts.

The component partial ships the following complete selector families in the components layer. Here, `role` means `primary`, `secondary`, `success`, `info`, `warning`, `danger`, `light`, and `dark`; every listed expansion is covered by the inventory presence scan.

| Selectors | Value source |
| --- | --- |
| `.link-{role}`, each `:hover` and `:focus` | Veneer role channels in every state; independent Bootstrap text and underline opacity variables |
| `.link-body-emphasis`, `:hover`, `:focus` | Veneer emphasis channels; Bootstrap's opaque rest and 0.75 state fallbacks |
| `.link-opacity-{10,25,50,75,100}`, each `-hover:hover` twin | Bootstrap's 0.1, 0.25, 0.5, 0.75, and 1 scale |
| `.link-offset-{1,2,3}`, each `-hover:hover` twin | Bootstrap's 0.125em, 0.25em, and 0.375em scale |
| `.link-underline-{role}` and `.link-underline` | Veneer role or link channels, with underline opacity initialized to 1 |
| `.link-underline-opacity-{0,10,25,50,75,100}`, each `-hover:hover` twin | Bootstrap's underline alpha scale |

No inventory selector is excluded. Bootstrap's important colour, decoration, and offset declarations are retained. The role-state departure is recorded in the compatibility row and bound by browser tests that exercise rest, hover, focus, and token overrides.

The opacity behaviour proof reads the same anchor opaque, applies `.link-opacity-50`, reads alpha 0.5 at rest and hover, removes the class, and reads opaque hover again in light and dark modes. Component proofs resolve every opacity variable value and hover twin, every offset, role channel override, and underline colour independently of text. Underline alpha includes the transparent endpoint.

`collectShippedComponents` requires variable coverage because the inventory properties are nonempty. The guide therefore receives a shipped selector row and shipped variable rows for `--bs-link-opacity` and `--bs-link-underline-opacity`. Their resolved-value proofs live in `a.test.ts` and `link.test.ts`; the guide's Proof cells remain dashes under the CSS-row contract.

The presence scan's negative control removed `.link-opacity-10-hover:hover` from the built cascade. `npm run test:conformance -- -t "carries every shipped component"` exited 1 with `Shipped component link is missing selector .link-opacity-10-hover:hover` and `Tests 1 failed | 8 skipped (9)`. Restoring the selector and running the identical command exited 0 with `Tests 1 passed | 8 skipped (9)`. The instrument and logs are `cl6-mutation.mjs`, `cl6-selector-red.log.txt`, and `cl6-selector-green.log.txt`. A permanent conformance case also asserts the omitted-selector finding.

The shared-block sweep returned an empty shared-block set. Underline colours and opacity assignments stay inline: they do not share a complete declaration block, and the style rules prohibit a mixin for a pattern confined to one partial. No mixin edit was needed.

`LinkSection` extends `SpecimenSection`. Its table groups role links, link opacity, underline offsets, underline colours, and underline opacity. Each specimen uses a paragraph of anchors targeting `#main`; the table includes the utility hover twins. Its proof checks rendering, class-family membership, distinct link labels, frozen data, and repeated destruction that preserves neighboring content. Showcase and barrel proofs include the section.

Development runs found and closed these issues within owned files:

- The initial scoped style run reported `18 failed | 110 passed`: custom-property serialization used `.5` where assertions expected `0.5`. Numeric value assertions fixed the mismatch; the same scoped population passed `128 passed`.
- The initial full chain exited 1 with `12 failed | 72 passed | 4 skipped` in journeys because link labels collided with button names. Distinct link labels fixed the ambiguity; journeys passed `84 passed | 4 skipped`.
- A later full chain exited 1 on the real-ledger case at `tests/setupConformance.test.ts:932`. Contrary to brief 2's terrain statement, this case also reads the compatibility table. The brief grants that file for moved populations, so its expected set gained `link`; its focused rerun exited 0. Synthetic deciding-function cases stayed unchanged.

The guide owner's remaining bounds are the calibrated link-token values and source labels; the dark hover direction change; the link button's derived colour changes; the anchor's precision-preserving opacity expression; the role-state departure from Bootstrap literals; and the link partial, showcase section, and proof references. Existing link-decoration provenance also needs the record's measured underline rows. No guide text outside the link compatibility rows changed.

The final gates ran from the checkout root on Windows. `cl6-run.mjs` invokes npm's installed JavaScript CLI and preserves its exit status; PowerShell blocked the `npm.ps1` shim, so the work used `npm.cmd` or that runner. Logs use the `cl6-*.log.txt` paths.

| Command or reading | Engine | Exit | Final result |
| --- | --- | --- | --- |
| `build:src:styles` | Build | 0 | LTR and RTL CSS emitted; final artifact 66.90 kB each |
| Before/after instrument | Chromium and Edge | 0 | Readings retained in JSON |
| Shared-block sweep | Node | 0 | `Tests 1 passed`, shared set empty |
| `format:check` | Node | 0 | `All matched files use the correct format.` |
| `lint:check` | Node | 0 | No diagnostics |
| `check` | Node | 0 | Completed through `vue-tsc --noEmit -p configs/app/tsconfig.browser.json` |
| `build` | Build | 0 | Final app build: `built in 556ms` |
| `npm test` | Node and Chromium | 0 | Completed through guides: `Test Files 1 passed (1)`, `Tests 18 passed (18)` |
| Styles within `npm test` | Chromium | 0 | `Test Files 51 passed (51)`, `Tests 310 passed (310)` |
| Browser setup within `npm test` | Chromium | 0 | `Test Files 1 passed (1)`, `Tests 33 passed (33)` |
| Application within `npm test` | Chromium | 0 | `Test Files 8 passed (8)`, `Tests 22 passed (22)` |
| `test:src:styles` | Edge | 0 | `Test Files 51 passed (51)`, `Tests 310 passed (310)` |
| `test:setup:browser` | Edge | 0 | `Test Files 1 passed (1)`, `Tests 33 passed (33)` |
| `test:app:browser` | Edge | 0 | `Test Files 8 passed (8)`, `Tests 22 passed (22)` |
| `git diff --check` | Git | 0 | No output |

The Edge runs set `PLAYWRIGHT_CHANNEL=msedge`. Existing conditional skips remain unchanged; no scope proof was skipped.

The actual `git diff --stat` follows; untracked additions appear in the status output rather than this tracked diff.

```text
 app/browser/Showcase.ts                    |  2 ++
 app/browser/constants.ts                   | 36 ++++++++++++++++++++++
 app/browser/index.ts                       |  1 +
 guides/veneer.md                           |  3 ++
 src/styles/_tokens.scss                    | 16 +++++-----
 src/styles/elements/_a.scss                |  4 +--
 src/styles/index.scss                      |  1 +
 tests/app/browser/Showcase.test.ts         |  5 +--
 tests/app/browser/index.test.ts            |  3 ++
 tests/conformance.test.ts                  | 14 +++++++++
 tests/setupConformance.test.ts             |  1 +
 tests/setupStyles.test.ts                  | 49 ++++++++++++++++++++++++++++++
 tests/setupStyles.ts                       | 44 +++++++++++++++++++++++++--
 tests/src/styles/components/button.test.ts |  7 ++---
 tests/src/styles/elements/a.test.ts        | 25 +++++++++++++--
 15 files changed, 189 insertions(+), 22 deletions(-)
```

The actual `git status --porcelain --untracked-files=all` follows. Git also warned that the sandbox could not read the user-level ignore file; the command exited 0.

```text
 M app/browser/Showcase.ts
 M app/browser/constants.ts
 M app/browser/index.ts
 M guides/veneer.md
 M src/styles/_tokens.scss
 M src/styles/elements/_a.scss
 M src/styles/index.scss
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/index.test.ts
 M tests/conformance.test.ts
 M tests/setupConformance.test.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/src/styles/components/button.test.ts
 M tests/src/styles/elements/a.test.ts
?? app/browser/sections/LinkSection.ts
?? src/styles/components/_link.scss
?? tests/app/browser/sections/LinkSection.test.ts
?? tests/src/styles/components/link.test.ts
```

The automatic approval system rejected `probe.prove` with `MCP tool call requires approval, but approval policy is never`. It produced no receipt. The reported evidence comes from the executed browser suites, gate chain, and selector mutation control.
