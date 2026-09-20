**The objective audit requires a fix round.** I read the live diff against `b661142`, porcelain status, untracked files, installed declarations and implementations, and the requested retained records. I ran only read-only inspections and in-memory probes. Paths below are relative to Veneer; retained-record paths are relative to scaffold.

**1 — CONFIRMED.** `guides/tokens.md` is absent. [guides/veneer.md:74](C:/Users/mikes/WebstormProjects/veneer/guides/veneer.md:74) contains the reference map, retained variables, customization, departures, and deferred names. The moved relative links resolve. `guides/README.md:17`, `guides/README.md:31`, and `README.md:26` point to the consolidated guide.

**2 — CONFIRMED.** `guides/veneer.md:208` gives the derived spacing expression; `:228` names the Bootstrap `$zindex-*` sources; `:192` explains retained link decoration. Derived rows identify their expression or target reading, including the focus-color calibration at `:225`.

**3 — REFUTED as written.** The elevation shadows use the required triplet, `rem` geometry, and elevation multiplier at `src/styles/_tokens.scss:204`. However, [the inset shadow at :219](C:/Users/mikes/WebstormProjects/veneer/src/styles/_tokens.scss:219) has **no elevation multiplier**:
`inset 0 0.0625rem 0.125rem rgba(var(--vn-palette-black-rgb), 0.075)`.

The guide and report accurately publish that exception. Narrow the claim to the elevation ladder if retaining this behavior is intended. Focus width and the sans-family departure are correct at `_tokens.scss:227` and `guides/veneer.md:302`.

**4 — REFUTED.** The lead alpha example was corrected, but [guides/veneer.md:160](C:/Users/mikes/WebstormProjects/veneer/guides/veneer.md:160) still teaches `rgb(var(--vn-color-primary-rgb) / 0.5)`, incompatible with the comma-separated triplet. `_theme.scss:5` still says “Both modes” without naming the members, contrary to the explicit writing rule. The recipe, integration assertions, agreement text, deferred scope, and `interpolate-size` bound are otherwise present.

**5 — REFUTED.** The oracle implementation and equality assertions are present at `tests/setupStyles.ts:265`, `:293`, and `tests/setupStyles.test.ts:372`. My in-memory oracle reading matched the retained name lists and table values. Browser comparisons and dark-partition equality are present in `tests/src/styles/tokens.test.ts:60` and `:99`.

The promised exclusion documentation is missing. [tests/setupStyles.ts:548](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:548) and `:600` do not explain omissions such as `--vn-font-mono` and `--vn-surface-gradient`, despite `units/u3-report-2.md:328` explicitly claiming those explanations exist. The tables therefore cannot support the unqualified “each retained token” statement.

**6 — CONFIRMED for the stated assertions and retained control record.** `tests/src/styles/tokens.test.ts:245` sets the invalid factor on the document element and expects `6px`. Shadow comparisons use parsed parts at `:153`; factor cases restore their changes. `tests/src/styles/mixins.test.ts:65` compares painted colors, and `:69` checks tier paint after declaration-presence guards. `units/u3-report-2.md:92` records the named control failures and `:118` records restoration. The live source contains the restored implementations. This does not establish claim 15.

**7 — CONFIRMED.** The mirrored proof files contain no module-scope helper functions. `collectTokenNodes` lives at `tests/setup.ts:17`, with cases in `tests/setup.test.ts:9`. The setup project discovers that file. DOM readers live in `tests/setupBrowser.ts:244`, `:273`, `:300`, and `:331`, with behavioral cases in its sibling proof. `setupStyles.ts` has no prohibited browser imports or `document` reference. The obsolete `fixtures/colors.ts` is absent.

**8 — REFUTED.** Export names do not collide with installed `@orkestrel/test/browser` version `0.0.18`, and `CDPSession` is gone. However, the overlap explanations appear under `@remarks`, **not in the opening TSDoc paragraph**: see [tests/setupBrowser.ts:95](C:/Users/mikes/WebstormProjects/veneer/tests/setupBrowser.ts:95), `:118`, `:141`, `:160`, and `:200`.

My in-memory substitutions give these results. “Red” here describes the deciding assertion under substitution, not a fresh browser run.

| Local helper → installed substitute | Named case outcome and deciding evidence |
|---|---|
| `mountSpecimen` → `render` | **Red.** “takes out a recorded container…” expects disconnection at `setupBrowser.test.ts:172`; installed `render` never records the container. |
| `loadStylesheet` → `build` | **Red.** The head-parent assertion at `:180` receives a detached element. |
| `loadStylesheet` → `mount(build(...))` | **Red.** The same assertion receives `document.body`; the removal assertion at `:183` also lacks registration. |
| `clearSpecimens` → installed equivalent | **No equivalent exists.** Report 3’s `CLEAR-REGISTRY` empties local state without removing nodes. That mutation reddens `:130`, but it is not an installed-export substitution. |
| `readPaintedColor` → `parseCSSColor` | **Red.** “reads the channels a modern color function paints…” fails `requireValue` at `:192`: the installed parser does not decode the computed `oklab()` value. Direct `parseColor` has the same missing-format limitation. |
| `matchesPaintedColor` → `matchesColor` | **Red.** At `:159`, the expected `true` becomes `false`; the next assertion explicitly demonstrates the installed result. |
| `readCascadeSheet` → `readRules` | **Not a type-compatible replacement:** rules are not a stylesheet. If evaluated without that contract, the identity assertion at `:207` fails. Report 3 instead plants `document.styleSheets[0]`, which is not this installed export. |
| `collectNestedRules` → `readRules` | **Red.** The depth-first expectation at `:237` receives breadth-first ordering. The empty-input assertion at `:253` also loses its scoped-input meaning. |
| `collectScopeProperties` → `findRule` | **Red with the necessary result adaptation** to the returned rule’s property names. The split-scope assertion at `:270` receives only `--vn-probe-one`, missing `--vn-probe-two`. Raw `findRule` has a different return contract. |
| `collectLayer` → filtered `readRules` | **Red.** The missing-cascade assertion at `:220` expects a throw; the substitute returns an empty list. |

Installed implementation sites are `node_modules/@orkestrel/test/dist/src/browser/index.js:1295`, `:1299`, `:1475`, `:1510`, `:1867`, and `:1902`.

`extractStyles` extracts embedded style content; `readContrast` measures contrast; `blendColor` composites colors. None is an interchangeable implementation of the local helpers, so no honest substitution case exists for those exports.

Reduced motion uses installed staging and release. Forced colors uses the protocol directly. Its explicit reset follows an assertion at `mixins.test.ts:66`; failure cleanup is nevertheless covered by `afterEach` calling installed `releaseMedia` at `:17`, whose unstaged path resets media. I found no pseudo-element read requiring correction.

**9 — REFUTED.** The physical-property additions and cases exist. The selector scanner still mishandles functional selector lists. Executing the live functions in memory produced:

| Input | Required | Actual |
|---|---:|---:|
| `:is(h1, p)` | `false` | `true` |
| `:where(h1, p)` | `false` | `true` |
| `:is(.title,h1)+p` | `true` | `false` |
| `h1, p` | `false` | `false` |

[tests/setupStyles.ts:750](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:750) splits on whitespace without respecting parentheses. The extraction at `:734` also misses a tag appearing after another functional-list alternative. The existing cases do not cover these counterexamples.

**10 — CONFIRMED.** The renamed cases describe their selector forms at `tests/setupStyles.test.ts:225` and `:241`. `role-each` agrees across declaration, include, and fixture. No `palette-each` remains under the named roots. Cleanup uses `clearSpecimens`. The inspected helper prefixes match their operations; `readPaintedColor` obtains its result from the live canvas pixel buffer.

**11 — CONFIRMED.** `tests/src/styles/integration.test.ts:12` and `guides/veneer.md:278` say the proof executes the displayed recipe. Neither retains the byte-for-byte claim.

**12 — REFUTED.** [src/styles/_theme.scss:22](C:/Users/mikes/WebstormProjects/veneer/src/styles/_theme.scss:22) embeds literal SVG colors, including `%23dee2e6`; `:25` embeds `%236ea8fe`. The applicable styles rule permits literal colors only in `_tokens.scss`. Encoding them inside a data URL does not relocate their value authority. The core barrels, mirrored partial proofs, and SCSS-only fixture directory otherwise follow the claimed placement.

**13 — REFUTED.** Module-scope proof declarations remain:

- `tests/setupBrowser.test.ts:41`: `CASCADE`.
- `tests/setupStyles.test.ts:40`: `PINNED_VERSION`, followed by `PINNED_DIGEST` and `CASCADE`.
- `tests/src/styles/integration.test.ts:19`: `RECIPE`.
- `tests/src/core/index.test.ts:7`: `TOKEN_PREFIX`.

These contradict the claim and the setup-file placement rules. `tests/setupBrowser.ts:92` also hides module-scope mutable state despite the centralized-declaration export rule. Writing violations include “both modes” at `tests/setupStyles.ts:537` and “two projects” at `:556`.

**14 — CONFIRMED as a record claim.** `units/u3-report-2.md:144` records shadow readings, `:156` tier readings, and `:175` the guide section-set answer. `units/u3-report-3.md:95` records overlap decisions and substitution results; `:276` contains the placement table. Their presence does not validate every conclusion they contain.

**15 — UNDECIDABLE.** No retained U3 verifier gate report establishes the requested chain. Author reports are not that report. Report 3 explicitly leaves `test:distribution` to the Orchestrator at `units/u3-report-3.md:337`.

**16 — Additional finding: registry shape contradicts its published rule.** `guides/veneer.md:83` says a member is grouped exactly when it represents multiple cascade properties. [src/core/constants.ts:128](C:/Users/mikes/WebstormProjects/veneer/src/core/constants.ts:128) groups `text.secondary` around only `base`; `:129` does the same for `text.tertiary`, and `:139` for `surface.raised`. Reconcile the contract and implementation explicitly.

**17 — Additional finding: rival fixtures leak after assertion failure.** In [tests/setupBrowser.test.ts:168](C:/Users/mikes/WebstormProjects/veneer/tests/setupBrowser.test.ts:168) and `:177`, installed `render`/`mount` create unregistered rivals. Their `remove()` calls occur after assertions at `:174` and `:185`, without `finally`. A failed assertion skips removal, and `clearSpecimens` cannot recover those nodes. This violates `tests.md:339`, which requires cleanup after assertion failure. Report 3 acknowledges resulting cross-case contamination at `:157`; such contaminated controls also fail the rule requiring the named defect case to fail in isolation.

Verdict: fix round — claims 3, 4, 5, 8, 9, 12, 13; additional findings 16, 17.