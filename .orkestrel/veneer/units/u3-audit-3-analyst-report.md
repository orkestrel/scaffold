Fix round. The scanner still misclassifies valid selectors, and the diff retains rule violations.

I read the live diff over `b661142`, status, reported untracked files, retained records, and scaffold law. All commands were read-only. Executed evidence covers the scanner, in-memory Sass compilation, and artifact comparisons. Browser substitutions below are counterfactual rulings from the installed implementations, not fresh browser runs.

Paths below resolve against `C:/Users/mikes/WebstormProjects/veneer` unless marked **scaffold**.

| Claim | Ruling | Deciding evidence |
|---|---|---|
| **1 — Alpha form** | **CONFIRMED** | `guides/veneer.md:88`, `:164`, and `:281` use `rgba(var(--vn-color-primary-rgb), 0.5)`. No offending slash form remains. The guide’s CSS fence equals `CUSTOMIZATION_RECIPE` after line-ending normalization, checked in memory. |
| **2 — Deferred section** | **CONFIRMED** | `guides/veneer.md:237` places `interpolate-size` with motion. The section beginning at `:336` contains the undeclared names and their consumers. |
| **3 — Factor rows** | **CONFIRMED** | `guides/veneer.md:109–112` supplies `1` and identifies the space scale, radius scale, shadow scale, or durations. |
| **4 — Source sentence** | **CONFIRMED** | `guides/veneer.md:90`: “A table with a `Source` column…” explicitly excludes the tier and departures tables in the following sentence. |
| **5 — Coupling sentence** | **REFUTED as located** | The integration proof has no TSDoc. The required instruction instead accompanies the constant at `tests/setupStyles.ts:1014`: “Copy this string from that fence, and change it with the fence. Nothing compares this string with that fence…” The substantive requirement is satisfied; correct the claim’s location. |
| **6 — Inset shadow** | **CONFIRMED** | `src/styles/_tokens.scss:230` multiplies the nonzero lengths by the elevation factor. `guides/veneer.md:220` publishes the corresponding geometry. `tests/src/styles/tokens.test.ts:170` asserts neutral geometry, rescaling, and restoration. |
| **7 — Selector scanner** | **REFUTED** | The named readings pass, but nested alternatives and quotation handling fail. Executed counterexamples follow. The deciding implementation is `tests/setupStyles.ts:764`, `:800`, and `:809`. |
| **8 — Value maps** | **CONFIRMED for the stated relocation and artifact properties** | The asset values occupy `$dark` at `src/styles/_tokens.scss:83`; `_theme.scss:15–17` supplies the dark scope and includes. The literal-color sweep outside `_tokens.scss` finds only token-based `color-mix()` expressions. Retained asset snapshots are byte-identical, and every live asset declaration occurs byte-exact in the earlier snapshot. The artifact’s dark partition and additions checks pass; removing `--bs-primary` in memory makes the comparison fail. The emitter’s separate rule violation is finding **16**. |
| **9 — Proof data and registry** | **CONFIRMED** | The TypeScript AST sweep finds no module-scope data declarations in the U3 proof files. Constants are exported from the setup modules. `tests/setupBrowser.ts:122` owns `#nodes`, with `mount`, `load`, and `clear`; `:193` exports the shared instance. Old free-function names have no callers under `src`, `tests`, or `guides`. Bootstrap text is read at case scope at `tests/setupStyles.test.ts:394`, `:403`, and `:451`. D1’s raw-import result remains a retained observation, not a rerun here. |
| **10 — Writing sweep** | **REFUTED** | The specifically named phrases are gone, but unnamed tallies remain: `tests/setupStyles.ts:333`, “both selectors”; `tests/src/styles/fixtures/mixins.scss:24`, “both surfaces”. **Scaffold** `AGENTS.md:174` requires naming the members or removing that tally. |
| **11 — Member shape** | **CONFIRMED** | `src/core/constants.ts:135`, `:136`, and `:146` hold the flattened leaves. Fresh in-memory Sass compilation and the retained built CSS each declare them under `:root`, light, and dark. No obsolete `-base` spelling remains under `src`, `tests`, or `guides`. The convention is documented at `guides/veneer.md:83–87`. |
| **12 — Rival cleanup** | **CONFIRMED** | The rival containers at `tests/setupBrowser.test.ts:149` and `:161` are removed in `finally`, including assertion failure paths. |
| **13 — Exclusions** | **CONFIRMED** | `tests/setupStyles.ts:579–583` names the font stack and gradient image, explains why neither the painted-channel nor pixel reading measures them, and identifies their Veneer tokens. |
| **14 — Law over the diff** | **REFUTED** | The inspected TypeScript introduces no forbidden assertions, `any`, hidden module data, or nested function declarations/assignments. Public collection shapes are readonly. However, claim **10** supplies writing violations, and finding **17** supplies false TSDoc. The blanket conformance claim therefore fails. |
| **15 — Gates** | **UNDECIDABLE** | The retained `units/u3-gate-report-2.md` covers the earlier tree. Report 4 and its writer logs do not replace an independent gate report for this round. I found no retained successor verifier report establishing this claim. |

The scanner readings came from the live functions extracted with TypeScript and executed in memory.

| Input | Required | Actual |
|---|---:|---:|
| `:is(h1, p)` | `false` | `false` |
| `:where(h1, p)` | `false` | `false` |
| `:is(.title,h1)+p` | `true` | `true` |
| `h1, p` | `false` | `false` |
| `details + summary` | `true` | `true` |
| `:is(h1)+:is(p)` | `true` | `true` |
| `:is(h1,:where(.title))+p` | `true` | **`false`** |
| `[title=':is(h1)'] + p` | `false` | **`true`** |

At [the compound reader](/C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:805), the `[^()]*` pattern misses the outer nested list and scans pseudo-class-looking text inside attribute strings. At [the splitter](/C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:772), an escaped quote closes quotation state: `[title="a\" b"] p` returns as a single compound, swallowing the descendant separator. The promoted cases at `tests/setupStyles.test.ts:315–382` omit these inputs.

For your additional claim-8 instruction, these are the installed-export substitutions. Installed runtime evidence is in `node_modules/@orkestrel/test/dist/src/browser/index.js`.

| Local behavior → installed rival | Would the named case redden? |
|---|---|
| `specimens.mount` → `render` | **Yes.** The recorded container stays connected after `clear`; the case at `tests/setupBrowser.test.ts:149` requires removal. Installed `render` at `index.js:1299` records nothing. |
| `specimens.load` → `mount(build('style', …))` | **Yes.** The stylesheet lands in `body`, failing the head assertion at `:161`. Installed `mount` at `index.js:1295` appends to `document.body`. |
| `specimens.clear` → installed attachment helpers | **No callable equivalent exists.** Removing the local removal behavior would fail the disconnection assertions at `:107` and `:119`; that is a removal control, not an installed-export substitution. |
| `readPaintedColor` → `parseCSSColor` | **Yes.** The modern-color case at `:175` requires channels; installed `parseCSSColor` at `index.js:1475` passes the computed expression to `parseColor`, which cannot read that `oklab()` form. |
| `matchesPaintedColor` → `matchesColor` | **Yes.** The case at `:137` requires `true` for the mix and recording; installed `matchesColor` at `index.js:1510` returns `false` when either parsed side is absent. |
| `readCascadeSheet` → `readRules` | **Yes, but not as a signature-compatible replacement.** The installed return is a rule array, not a stylesheet; the identity assertion at `:191` fails. Report 3’s `document.styleSheets[0]` control is a separate substitution, not an installed export. |
| `collectNestedRules` → `readRules` | **Yes.** The sequence at `:213` requires children immediately after their grouping rule. Installed `readRules` at `index.js:1867` appends descendants breadth-first and ignores the supplied scope. |
| `collectScopeProperties` → properties of `findRule(selector)` | **Yes.** The union assertion at `:253` requires `--vn-probe-two`; installed `findRule` at `index.js:1902` returns the earlier matching rule without it. |
| `collectLayer` → filtered `readRules` | **Yes.** The unloaded-cascade case at `:204` requires a throw; filtering returns an empty array. |

`readContrast`, `blendColor`, and `extractStyles` are not interchangeable rivals. Their installed declarations return a contrast ratio, a composited color, and style-escape strings respectively (`index.d.ts:1747`, `:53`, and `:898`).

The additional findings are:

**16 — The asset emitter violates the single-caller mixin rule.**  
[The `theme-assets` declaration](/C:/Users/mikes/WebstormProjects/veneer/src/styles/_mixins.scss:142) has its sole include at [_theme.scss:17](/C:/Users/mikes/WebstormProjects/veneer/src/styles/_theme.scss:17). [Scaffold’s styles rule](/C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/styles.md:46) states: “A one-partial pattern stays inline; do not create a mixin for one caller.” Report 4 explains the dark-only requirement but does not exempt this rule. Preserve that requirement while consolidating emission into the existing theme mechanism.

**17 — The selector normalizer changes text its TSDoc promises to preserve.**  
[The documentation](/C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:732) says whitespace inside parentheses and brackets is left alone. The unconditional replacement at `:747` contradicts it. Executed readings change `[title="a  b"] + p` to `[title="a b"] + p` and collapse the internal spacing of `:is(h1,  p)+p`. The attribute example changes the selector’s meaning. Preserve quoted content and add a case that distinguishes these values.

Verdict: fix round — claims 7, 10, 14, 16, 17.