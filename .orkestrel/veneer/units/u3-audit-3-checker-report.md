| Claim | Check | PASS/FAIL | Site |
|---|---|---|---|
| 1 | Guide sweep for `rgb(var(` form | PASS | `grep -n "rgb(var(" guides/veneer.md` — no match; only `rgba(var(--vn-color-primary-rgb), 0.5)` at `guides/veneer.md:88,164,281` and `rgba(var(--vn-palette-black-rgb), α)` at `guides/veneer.md:219-220` |
| 9 | No module-scope `const` in any proof file U3 owns; moved constants exported `UPPER_SNAKE_CASE` | PASS | `grep -n "^(const|let|var|function|class|interface|type) "` over `tests/setup.ts`, `tests/setupBrowser.ts`, `tests/setupStyles.ts` — no match; `tests/setup.ts:4 export const TOKEN_PREFIX`, `tests/setupBrowser.ts:101 export const PROBE_CASCADE`, `tests/setupStyles.ts:271 export const BOOTSTRAP_VERSION`, `tests/setupStyles.ts:274 export const BOOTSTRAP_DIGEST`, `tests/setupStyles.ts:1018 export const CUSTOMIZATION_RECIPE`; registry is `tests/setupBrowser.ts:122 export class SpecimenManager { readonly #nodes... }` and `:193 export const specimens = new SpecimenManager()`; no `mountSpecimen`/`loadStylesheet`/`clearSpecimens` free function remains anywhere under `tests/*.ts` |
| 7 | `splitTopLevelCompounds`/`extractCompoundTags`/`extractSelectorCompounds`/`matchesLooseTagPair` tokenize and group correctly; no old names survive | PASS | `tests/setupStyles.ts:765,804,831,867` read and traced by hand against `normalizeComplexSelector` (`:736`): `:is(h1, p)` → one compound, tags `[h1,p]`, no predecessor → `false`; `:where(h1, p)` → same → `false`; `:is(.title,h1)+p` → normalized to `:is(.title,h1) + p`, compounds `[{tags:[h1]},{tags:[p],combinator:'+'}]` → sibling combinator → `true`; `h1, p` → two one-tag lists each with no predecessor → `false`. `grep -rn "extractCompoundTag\b|extractSelectorTags\b|SelectorTag\b"` under `veneer/**/*.ts` — no match |
| 8 | Export set of `tests/setupBrowser.ts` vs installed `@orkestrel/test` browser/core/server `.d.ts` | PASS | `tests/setupBrowser.ts` exports `mountShowcase, recordListeners, applyTheme, PROBE_CASCADE, SpecimenManager, specimens, readPaintedColor, matchesPaintedColor, readCascadeSheet, collectNestedRules, collectScopeProperties, collectLayer` (`^export` sweep, lines 27–367); none of those twelve names appear in `node_modules/@orkestrel/test/dist/src/{browser,core,server}/index.d.ts` (three separate greps, no matches); installed version `0.0.18` per `node_modules/@orkestrel/test/package.json:3`, matching report 3's reading |
| 10 | `palette-each`, `resetSpecimens`, `readBootstrapVariables` absent; no "lane"-named cases | PASS | `grep -rn "palette-each|resetSpecimens|readBootstrapVariables"` over `veneer/**/*.{ts,scss,md}` — no match; `grep -rn "lane"` over `veneer/tests/**/*.ts` — no match |
| 12 | Every owned file against the placement rows | PASS (see placement table) | rule citations below |
| 14 (scope-honesty half) | Verifier's retained status readings in `units/u3-gate-report-3.md`, compared against briefs 4/5's owned/granted/integrated files | UNRESOLVED | `Glob u3-gate-report-3.md` under scaffold — no file found; the checker holds no shell and no `git status`/`git diff` tool, so it cannot independently derive the tree's actual status to compare against brief 4 (`.orkestrel/veneer/units/u3-brief-4.md` § Scope) and brief 5 (`.orkestrel/veneer/units/u3-brief-5.md:41-42`, "Owned: everything brief 4 owns, plus `tests/setup.test.ts`"). Only the writer's own reports supply the status readings, and a writer's self-report does not confirm a claim per dispatch rule |

Placement table (owned files, one per line):

| Owned file | Placing rule |
|---|---|
| `guides/veneer.md` | `documentation.md` § Authority and workflow — one guide per package, `guides/<package>.md` |
| `guides/README.md` (line 17, `src/styles` row at line 31) | `documentation.md` § Authority and workflow — `guides/README.md` is the map |
| `README.md` (line 27) | `documentation.md` § Authority and workflow — README pitch parity |
| `src/core/index.ts` | module barrel, unchanged placement |
| `src/core/constants.ts` | `architecture.md:19` — "Constants/data | `*/constants.ts`" |
| `src/core/types.ts` | `architecture.md:18` — "Interfaces/types | `*/types.ts`" |
| `src/styles/_mixins.scss`, `_theme.scss`, `_tokens.scss` | `styles.md` centralized token/theme/mixin partials |
| `src/styles/index.scss` | `styles.md:25` — sole compilation barrel loading tokens, theme, output partials |
| `src/styles/elements/_html.scss`, `_body.scss` | `styles.md:25` output partials `@use`d from `index.scss:3-4` |
| `tests/setup.ts` | `tests.md:195` — "`tests/setup.ts`: host-independent" |
| `tests/setupBrowser.ts` | `tests.md:197` — "`tests/setupBrowser.ts`: DOM/Vue/browser helpers" |
| `tests/setupStyles.ts` | `tests.md:198` — "`tests/setupStyles.ts`: CSS/style helpers and compiled cascade" |
| `tests/setup.test.ts`, `tests/setupStyles.test.ts` | `tests.md:59,63` — `tests/setup*.test.ts` cross-cutting row, Node `setup` project |
| `tests/setupBrowser.test.ts` | `tests.md:62` — browser-enabled `setup:browser` project |
| `tests/src/core/index.test.ts`, `tests/src/styles/index.test.ts`, `tests/src/styles/mixins.test.ts`, `tests/src/styles/theme.test.ts`, `tests/src/styles/tokens.test.ts`, `tests/src/styles/elements/html.test.ts`, `tests/src/styles/elements/body.test.ts` | `tests.md:14,19-20` — mirror `tests/{src,app}/[environment]/[domain]/[module].test.ts`, Sass partial resolved through leading underscore |
| `tests/src/styles/integration.test.ts` | `tests.md:75-76` — `integration.test.ts` reserved filename, scope is its directory |
| `tests/src/styles/fixtures/mixins.scss` | `tests.md:183` — fixture extracted as soon as it serves another test |

No file the tree holds reads as unowned by any brief: `guides/tokens.md` and `tests/src/styles/fixtures/colors.ts`, the two paths brief 4 required removed, are both confirmed absent (`Glob` — no match), and the retired probes sit under `veneer/tmp/u3/`, which git ignores and no brief claims as owned source. This checker cannot independently confirm the negative (no untracked stray file anywhere in the tree) because it holds no `git status` tool; that gap is the same one recorded against claim 14.
