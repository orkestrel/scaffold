# Unit U3 report — the token contract

Role `opus` on native Opus 5, in `C:/Users/mikes/WebstormProjects/veneer`, from the clean baseline
`b661142`. The token contract landed. Every gate is green except `test:policy`, which refuses
`guides/tokens.md` for a reason no owned file can fix; the exact evidence and the patch are in
§ Deviations, D1.

## Files created

| Path                                     | What it holds                                                                                            |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `src/core/constants.ts`                  | `TOKEN_NAMES`, frozen at every level, one literal per canonical custom property                          |
| `src/core/types.ts`                      | `TokenLeaf`, `TokenMap`, `TokenName`                                                                     |
| `src/styles/elements/_html.scss`         | `interpolate-size` and `text-size-adjust` on the document element                                        |
| `src/styles/elements/_body.scss`         | The body's canvas, copy color, family, size, weight, and rhythm                                          |
| `tests/src/styles/tokens.test.ts`        | Parity over both directions, the calibrated tiers, the triplets, the factors, invalidity, and nesting    |
| `tests/src/styles/theme.test.ts`         | The mode switch on the document element, `color-scheme`, and the dark-only assets                        |
| `tests/src/styles/mixins.test.ts`        | `transition`, `reduced-motion`, `forced-colors`, and `palette-each`, through a compiled fixture          |
| `tests/src/styles/integration.test.ts`   | The guide's customization recipe, transcribed                                                            |
| `tests/src/styles/elements/html.test.ts` | The document baseline                                                                                    |
| `tests/src/styles/elements/body.test.ts` | The body baseline                                                                                        |
| `tests/src/styles/fixtures/mixins.scss`  | The fixture stylesheet Vite compiles for the mixin proof                                                 |
| `tests/src/styles/fixtures/colors.ts`    | `matchesPaintedColor`, the painted-color comparison the style proofs share                               |
| `guides/tokens.md`                       | The reference map, the customization recipe, the departures, and the deferred names                      |

## Files changed

| Path                            | What changed                                                                                                  |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `src/core/index.ts`             | Star-exports `constants.js` and `types.js`                                                                    |
| `src/styles/_tokens.scss`       | The `$light` and `$dark` value maps, the role lists, the `@property` registrations, `:root`, and the alias pass |
| `src/styles/_theme.scss`        | Both attribute blocks, `color-scheme`, and Bootstrap's dark-only component assets                             |
| `src/styles/_mixins.scss`       | Adds `palette-each` and `theme-tokens`                                                                        |
| `src/styles/index.scss`         | Loads `tokens`, `theme`, `elements/html`, `elements/body`                                                     |
| `tests/setupStyles.ts`          | The Bootstrap oracle, the calibration table, the cascade readers, the tag predicates, `normalizeValueToken`   |
| `tests/setupStyles.test.ts`     | The new export set, the carried U1 cases, the oracle's shape, and the pinned Bootstrap identity               |
| `tests/src/core/index.test.ts`  | The export set, the freeze, the path law, uniqueness, and the listener-free import                            |
| `tests/src/styles/index.test.ts` | The effective layer order, the bare-tag rule, and the direction-neutrality sweep                             |
| `guides/veneer.md`              | The four core rows of `## Surface`, its intro sentence, and the core link under `## Tests`                    |
| `guides/README.md`              | A directory-index row and a paragraph naming the token reference                                              |
| `README.md`                     | One sentence naming the token reference                                                                       |

Diffstat over tracked files, at return:

```text
 README.md                      |   4 +-
 guides/README.md               |   8 +
 guides/veneer.md               |  32 ++-
 src/core/index.ts              |   2 +
 src/styles/_mixins.scss        | 114 +++++++++
 src/styles/_theme.scss         |  28 ++-
 src/styles/_tokens.scss        | 327 +++++++++++++++++++++++-
 src/styles/index.scss          |   2 +
 tests/setupStyles.test.ts      |  94 ++++++-
 tests/setupStyles.ts           | 554 ++++++++++++++++++++++++++++++++++++++++-
 tests/src/core/index.test.ts   |  73 +++++-
 tests/src/styles/index.test.ts |  60 ++++-
```

## Planted controls

Every control was planted alone, run, and removed. No planted file was tracked before this unit, so
`git diff --exit-code` over one cannot separate the plant from the unit's own authored content;
removal is proved by the absent text and by the same command running green.

| Control          | Plant                                                            | Assertion that turned red                                                                                | Red reading                                                                    | Removal                                                              |
| ---------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `PLANT-LISTENER` | `globalThis.addEventListener('resize', …)` in `src/core/constants.ts` | `tests/src/core/index.test.ts:40` `expect(recorder.calls).toStrictEqual([])`                          | `expected [ [ 'resize', [Function] ] ] to strictly equal []`; 1 failed, 4 passed | `grep addEventListener src/core/` finds nothing; 5 passed             |
| `PLANT-GHOST`    | `--vn-ghost: 1` in `_tokens.scss` at `:root`                     | `tests/src/styles/tokens.test.ts:84` and `:95`, the canonical partition in each direction                | `expected [ …(157) ] to deeply equal [ …(156) ]`, extra `--vn-ghost`             | `grep vn-ghost src/ tests/ guides/` finds nothing; 32 passed          |
| `PLANT-DROP`     | `--vn-breakpoint-md` deleted from `_tokens.scss`, kept in the registry | `tests/src/styles/tokens.test.ts:84`                                                                 | `expected [ …(155) ] to deeply equal [ …(156) ]`, missing `--vn-breakpoint-md`   | `--vn-breakpoint-md` declared at `_tokens.scss:232`; 32 passed        |
| `PLANT-SCOPE`    | `--vn-border-width` moved from `:root` into the light block alone | `tokens.test.ts:84`, `:95`, and `:112` (the light-scope name absent from the dark scope)                 | `expected [ '--vn-border-width' ] to deeply equal []` at `:112`                  | declared at `_tokens.scss:194`, absent from `_theme.scss`; 32 passed  |
| `PLANT-PAIR`     | `h1 + p` rule added to `elements/_body.scss`                     | `tests/src/styles/index.test.ts:45`, the bare-tag rule in the elements layer                             | `expected [ 'h1 + p' ] to deeply equal []`; 1 failed, 2 passed                   | `grep 'h1 + p' src/` finds nothing; 3 passed                          |
| `PLANT-PHYSICAL` | `margin-left: 0` added to `elements/_body.scss`                  | `tests/src/styles/index.test.ts:55`, the direction-neutrality sweep over the shipped cascade              | `expected [ [ 'margin-left', '0px' ] ] to deeply equal []`; 1 failed, 2 passed   | `grep margin-left src/` finds nothing; 3 passed                       |

## The two unknowns

**`box-shadow` collapses a registered-factor `calc()`.** It collapses on both engines, and the
resolved string equals the calibration row. A specimen carrying `box-shadow: var(--bs-box-shadow-lg)`
resolves `rgba(0, 0, 0, 0.07) 0px 4px 8px 0px, rgba(0, 0, 0, 0.22) 0px 24px 44px -8px`, which is the
Elevation table's dialog pair. The elevation factor stays on the shadow tokens' geometry, where the
verdict put it. A first reading took it further: an unregistered custom property collapses the same
`calc()`, so registration is not what makes the collapse happen.

**`interpolate-size` resolves through `getComputedStyle`.** It resolves on both engines.
`readStyle(document.documentElement, 'interpolate-size')` returns `allow-keywords`. Lightning CSS
also emits `-webkit-text-size-adjust` and `-moz-text-size-adjust` beside the unprefixed property, and
Chromium reports the reading on `-webkit-text-size-adjust`, which is the property
`tests/src/styles/elements/html.test.ts` reads.

## Fleet name checks

Re-checked on 2026-09-20 against `node_modules/@orkestrel/scaffold/dist/host/guides/*.md`, which is
the hosted guide set this checkout installs. Each name below returned no file.

| Name           | Result                                                            |
| -------------- | ------------------------------------------------------------------ |
| `TOKEN_NAMES`  | free                                                              |
| `TokenLeaf`    | free                                                              |
| `TokenMap`     | free                                                              |
| `TokenName`    | free                                                              |

The bare word `Token` appears in `budget.md`, `ollama.md`, `supervisor.md`, and `terminal.md`, in the
names `TokenScope`, `TokenUsage`, `TokenBudgetOptions`, `createTokenBudget`, `createTokenConsumer`,
`isTokenScope`, and `isTokenUsage`. A bare name is the whole identifier, so none of those collides.

The `tests/setupStyles.ts` exports this unit adds were checked the same way and each returned no
file: `BOOTSTRAP_ROOT_VARIABLES`, `BOOTSTRAP_DARK_VARIABLES`, `THEME_DARK_ADDITIONS`,
`CALIBRATED_TIERS`, `MANDATED_TAG_PAIRS`, `collectNestedRules`, `collectScopeProperties`,
`collectTokenNames`, `extractSelectorTags`, `matchesLooseTagPair`, `normalizeSelectorText`,
`normalizeValueToken`, `readCascadeSheet`, `readPaintedColor`.

## Gate evidence

Managed Chromium `1243` is the default provider. The Edge runs set `PLAYWRIGHT_CHANNEL=msedge`.

| Command                       | Exit | Final lines                                                             |
| ----------------------------- | ---- | ------------------------------------------------------------------------- |
| `npm run format:check`        | 0    | `All matched files use the correct format.` / `Finished in 747ms on 84 files using 16 threads.` |
| `npm run lint:check`          | 0    | no diagnostic printed                                                   |
| `npm run check`               | 0    | `vue-tsc --noEmit -p configs/app/tsconfig.browser.json`                 |
| `npm run build`               | 0    | `dist/app/browser/assets/index-CifwewKG.css  31.41 kB` / `✓ built in 312ms` |
| `npm run test:src`            | 0    | `Test Files  5 passed (5)` / `Tests  17 passed (17)`                    |
| `npm run test:src:styles`     | 0    | `Test Files  7 passed (7)` / `Tests  32 passed (32)`                    |
| `npm run test:app`            | 0    | `Test Files  2 passed (2)` / `Tests  3 passed (3)`                      |
| `npm run test:journey`        | 0    | `Test Files  4 passed (4)` / `Tests  32 passed \| 4 skipped (36)`       |
| `npm run test:policy`         | 1    | `Test Files  1 failed (1)` / `Tests  2 failed \| 107 passed \| 1 skipped (110)` |
| `npm run test:config`         | 0    | `Test Files  1 passed (1)` / `Tests  173 passed \| 1 skipped (174)`     |
| `npm run test:setup`          | 0    | `Test Files  2 passed (2)` / `Tests  41 passed (41)`                    |
| `npm run test:setup:browser`  | 0    | `Test Files  1 passed (1)` / `Tests  5 passed (5)`                      |
| `npm run test:conformance`    | 0    | `Test Files  1 passed (1)` / `Tests  7 passed (7)`                      |
| `npm run test:guides`         | 0    | `Test Files  1 passed (1)` / `Tests  18 passed (18)`                    |

On Edge:

| Command                                             | Exit | Final lines                                                       |
| --------------------------------------------------- | ---- | ------------------------------------------------------------------- |
| `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles` | 0    | `Test Files  7 passed (7)` / `Tests  32 passed (32)`              |
| `PLAYWRIGHT_CHANNEL=msedge npm run test:src`        | 0    | `Test Files  5 passed (5)` / `Tests  17 passed (17)`              |
| `PLAYWRIGHT_CHANNEL=msedge npm run test:journey`    | 0    | `Test Files  4 passed (4)` / `Tests  32 passed \| 4 skipped (36)` |

Acceptance criterion 2, read from the built artifact rather than from the source: the `:root` rule of
`dist/src/styles/index.css` carries 284 declarations, which is every one of the registry's 157 leaves
and every one of the inventory's 127 `--bs-*` root variables, with nothing missing on either side and
no third partition.

Observations, not criteria: `test:journey` passes on Edge, recorded above. The `distribution` project
fails one case for a reason this unit caused and cannot fix inside its owned files; see § Deviations,
D3.

## Bootstrap values retained, with their reason

Each of these takes Bootstrap 5.3.8's own value because no Elements specimen measures it. The value
and the reason are in `guides/tokens.md` § Reference map beside each row.

| Token or variable                                                                                   | Reason                                                              |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `--vn-palette-blue` through `--vn-palette-cyan`, `--vn-palette-black-*`, `--vn-palette-white-*`     | No Elements specimen renders a hue outside the semantic roles       |
| `--vn-gray-100` through `--vn-gray-900`                                                             | The same                                                            |
| `--vn-color-light-base`, `--vn-color-light-rgb`, `--vn-color-dark-base`, `--vn-color-dark-rgb`      | Bootstrap's `light` and `dark` roles have no Elements counterpart   |
| `--vn-text-heading`                                                                                 | Headings take the body color, which is Bootstrap's `inherit`        |
| `--vn-text-highlight`                                                                               | The highlight's copy is the body color in both projects             |
| `--vn-surface-secondary-base`, `-rgb`                                                               | No Elements specimen renders the secondary body tier                |
| `--vn-surface-gradient`                                                                             | Bootstrap's own gradient; no Elements specimen renders one          |
| `--vn-font-mono`                                                                                    | No Elements specimen renders code                                   |
| `--vn-border-translucent`                                                                           | Bootstrap's own translucent edge; no Elements specimen renders one  |
| `--vn-radius-xlarge`, `--vn-radius-xxlarge`, `--vn-radius-pill`                                     | The measured radius scale stops at 8 px                             |
| `--vn-shadow-inset`                                                                                 | No Elements specimen renders an inset shadow                        |
| `--vn-form-valid`, `--vn-form-invalid`                                                              | Bootstrap's own pairing of the success and danger roles             |
| `--vn-breakpoint-xs` through `--vn-breakpoint-xxl`                                                  | Breakpoints are Bootstrap's documented wire vocabulary              |
| `--vn-stack-*`                                                                                      | The ladder is Bootstrap's own component z-index order               |
| `--bs-btn-close-filter`, `--bs-carousel-indicator-active-bg`, `--bs-carousel-caption-color`, `--bs-carousel-control-icon-filter` | Each paints a component U3 does not own       |
| `--bs-form-select-bg-img`, `--bs-form-switch-bg`, `--bs-navbar-toggler-icon-bg`, `--bs-accordion-btn-icon`, `--bs-accordion-btn-active-icon` | The same, and each is dark-only  |

`--vn-text-code` dark, `--vn-surface-tertiary-base` dark, `--vn-surface-highlight`, `--vn-link-base`
dark, and `--vn-link-hover-base` are authored as the mix Bootstrap itself derives, over Veneer's own
tokens, so each reproduces Bootstrap's value where the underlying token is Bootstrap's and carries
Veneer's identity where it is not.

## Deviations

### D1 — `guides/tokens.md` trips the vendored prose policy. Not done.

**Expected.** `guides/tokens.md` lands at the path the brief names, and `test:policy` exits 0.

**Found.** The vendored policy admits a top-level guide only when it is the package's own guide, the
guide index, or a row of the package catalog. `guides/tokens.md` is none of those, so it reports as a
stray guide.

**Exact evidence.** `npm run test:policy`, exit 1:

```text
 FAIL  |policy| tests/policy.test.ts > prose policy > accounts for every top-level guide as this package, the index, or a catalog row
AssertionError: expected [ 'guides/tokens.md' ] to deeply equal []
 ❯ tests/policy.test.ts:671:62

 FAIL  |policy| tests/policy.test.ts > repository policy > enforces the workspace policy laws including surface ownership
AssertionError: expected [ { rule: 'prose', …(2) } ] to deeply equal []
+     "message": "guide is the package's own, the map, or a catalog row",
+     "path": "guides/tokens.md",
+     "rule": "prose",
 ❯ tests/policy.test.ts:758:49

 Test Files  1 failed (1)
      Tests  2 failed | 107 passed | 1 skipped (110)
```

The refusing code is `inspectPolicyProse` in `tests/setupPolicy.ts`, through `isPolicyStray`, which
reads `readPolicyGuide` against `POLICY_MIRROR_PATTERN = /^guides\/([^/]+)\.md$/u`. Both
`tests/policy.test.ts` and `tests/setupPolicy.ts` are vendored by `@orkestrel/scaffold` and off-limits
to this unit, and `.claude/agents/orkestrel.md` is regenerated from the registry, so adding a
`tokens` row there would be a false entry the next `scaffold catalog` run removes.

I probed this before writing anything else, with a placeholder `guides/tokens.md` carrying a heading
and a blockquote, and got the same result, so it is the file's existence rather than its content.

**Two resolutions, and the recommendation.** Amend the vendored rule to admit a top-level guide the
workspace's own `guides/README.md` registers, which is the evidence the rule already trusts for the
index and which no other package can claim. That is a change in the scaffold checkout at
`tests/setupPolicy.ts`, and it also unblocks every fleet package whose source tree has more than one
module directory. The alternative is to move the reference to `guides/tokens/README.md`, which the
pattern does not match, at the cost of a guide path no reader predicts and a link target the guides
parity suite never reads.

**Hypothesis.** The rule was written when a package published one library face, and the case it
misses is a package that publishes a stylesheet face beside its declaration face.

### D2 — a density factor set on a subtree does not rescale a scale declared at `:root`. Done.

**Expected.** The design brief's test row: an island setting `--vn-factor-density: 2` doubles the used
`padding` of a descendant carrying `padding: var(--vn-space-3)`.

**Found.** The descendant keeps `6px`. A custom property's computed value carries its `var()`
references already substituted, so `--vn-space-3` is fixed to `calc(0.375rem * 1)` at `:root` and a
deeper island cannot reach back into it. The reading is the same mechanism
`research/tokens.md` records for registering a resolved color.

**Exact evidence.** First run of `tests/src/styles/tokens.test.ts`, before the correction:

```text
 FAIL  |src:styles (chromium)| tokens.test.ts > scales a descendant inside a density island and leaves a neighbour outside it alone
AssertionError: expected 6 to be 12 // Object.is equality
```

**What landed.** The authoring is unchanged, and the proof now states what is true and what a
consumer can do. `tests/src/styles/tokens.test.ts` reads `6px`, then `12px` after
`--vn-factor-density: 2` is set on the document element, then `6px` after it is removed; a second
case reads `6px` on a subtree that sets the factor alone and `12px` on a subtree that declares the
factor and the scale together. `guides/tokens.md` § Factors states the rule and the subtree recipe.

### D3 — `tests/distribution.test.ts` reads the layer order from a statement rule alone. Not done.

**Expected.** The `distribution` project stays green.

**Found.** Lightning CSS splits the authored `@layer theme, reset, base, elements, components,
utilities;` statement once layers have blocks, emitting `@layer theme{…}`, `@layer reset,base;`,
`@layer elements{…}`, `@layer components,utilities;`. The order is unchanged and complete, and no
single statement rule lists every name any more.

**Exact evidence.** `npm run test:distribution`, exit 1:

```text
 FAIL  |distribution| tests/distribution.test.ts > installed package consumer > loads standalone styles with the declared cascade order [requires the registry]
AssertionError: expected 'reset' to be 'theme' // Object.is equality
 ❯ tests/distribution.test.ts:920:30
      Tests  1 failed | 9 passed | 3 skipped (13)
```

`tests/distribution.test.ts` is off-limits to this unit. The same reading broke the landed layer-order
proof in `tests/src/styles/index.test.ts`, which this unit owns and rewrote to read the effective
order across both rule kinds; the patch below is that same correction.

**Patch, for serial integration.** In `tests/distribution.test.ts`, replace lines 705 through 707:

```ts
				layers: Array.from(element.sheet.cssRules).flatMap((rule) =>
					rule instanceof CSSLayerStatementRule ? Array.from(rule.nameList) : [],
				),
```

with:

```ts
				layers: Array.from(element.sheet.cssRules)
					.flatMap((rule) => {
						if (rule instanceof CSSLayerStatementRule) return Array.from(rule.nameList)
						return rule instanceof CSSLayerBlockRule ? [rule.name] : []
					})
					.filter((name, index, names) => names.indexOf(name) === index),
```

The assertion at `:920` and `:921` stays as written: the patched reader returns
`['theme', 'reset', 'base', 'elements', 'components', 'utilities']` from the built stylesheet.

### D4 — `guides/veneer.md` § Showcase now states something false. Not done.

**Expected.** Every sentence the unit's change reaches is true at return.

**Found.** The paragraph under `## Showcase` reads "The styles entry declares the cascade order
`theme, reset, base, elements, components, utilities`. It ships no tokens or component treatments.
The shell uses native system colors to make a mode change visible; this foundation makes no
appearance or component-compatibility claim." The cascade now ships tokens and a document baseline.

**Exact evidence.** `guides/veneer.md` § Showcase, second paragraph, at return. The brief grants this
unit "the core rows of `## Surface` and the `## Tests` links only" in that file, so the paragraph is
report-only.

**Patch, for serial integration.** Replace that paragraph with:

```markdown
The styles entry declares the cascade order `theme, reset, base, elements, components, utilities`,
every `--vn-*` token, every `--bs-*` root alias Bootstrap 5.3.8 declares, and the document and body
baseline. It ships no component treatments. See the [Tokens guide](tokens.md) for each token's value
and source.
```

### D5 — the guides parity suite refuses a concept-index row for a stylesheet guide. Decided and recorded.

**Expected.** `guides/README.md` § By concept gains a row for the token reference.

**Found.** That table is the manifest `GuideCommand` drives, and every row must carry a `## Surface`
section, a `## Methods` section, and a `ts` fence importing the package. A token reference names no
TypeScript surface, so the row fails three of the suite's own checks.

**Exact evidence.** `npm run test:guides` with the row present:

```text
 FAIL  guides tests/guides.test.ts > Tokens > documents populated method groups
+     "text": "guides/tokens.md has no ## Surface section.",
+     "text": "guides/tokens.md has no ## Methods section.",
+     "text": "guides/tokens.md has no documented method groups.",
 FAIL  guides tests/guides.test.ts > Tokens > imports only real exports in every ```ts fence
+     "text": "guides/tokens.md has no mapped self import.",
      Tests  2 failed | 31 passed (33)
```

**What landed.** The token reference sits in § By directory with the `src/styles` row, and a paragraph
in `guides/README.md` names it, says what it covers, and says why it is outside the concept index.
`npm run test:guides` returns `18 passed (18)`.

### D6 — the styles build config carries a comment the change makes stale. Not done.

**Expected.** No comment in the tree describes a state the change ends.

**Found.** `configs/src/vite.styles.config.ts:27` reads `// This cascade declares only layer order;
logical declarations share the RTL bytes.` The cascade now declares treatments, and the reason the
bytes are shared is that every declaration is direction-neutral.

**Exact evidence.** The line is at `configs/src/vite.styles.config.ts:27`, inside the
`veneer-logical-rtl` plugin's `generateBundle`. `configs/**` is off-limits to this unit.

**Patch, for serial integration.** Replace that line with:

```ts
				// Every declaration is authored on the logical axis, which `tests/src/styles/index.test.ts`
				// proves over the shipped cascade, so the two directions share one byte stream.
```

### D7 — `--vn-surface-raised-base` is declared, and the planner's table did not name it. Decided and recorded.

**Expected.** Every token traces to the verdict's tables.

**Found.** The verdict's Tiers ruling requires each role's dark border tier to reproduce the run 6
reading, and that reading is a 50% mix against Elements' raised surface rather than against the
canvas. The primary's dark border reads `oklab(0.4675 -0.0467086 -0.0662046)`, which is
`color-mix(in oklab, oklch(0.7 0.15 233) 50%, oklch(0.235 0.013 256))` and nothing else.

**What landed.** `--vn-surface-raised-base` takes the Colour table's popover and drawer surface,
`oklch(0.984 0.003 247.858)` light and `oklch(0.235 0.013 256)` dark, carries no `--bs-*` alias, and
has one consumer, the dark border tier. The verdict's Component surfaces ruling still holds: no
component surface is mapped onto a Bootstrap body tier. `guides/tokens.md` names the token and its
reason.

### D8 — `THEME_DARK_ADDITIONS` is a third setup constant, and the brief named two. Decided and recorded.

**Found.** Veneer's primary fill retunes by mode and Bootstrap's does not, so Veneer's dark scope
declares `--bs-primary`, `--bs-primary-rgb`, and `--bs-focus-ring-color`, which Bootstrap's dark
scope does not. Without a name for that set, the dark-scope assertion could only be a subset check,
which would accept any further addition silently.

**What landed.** `tests/setupStyles.ts` exports `THEME_DARK_ADDITIONS`;
`tests/setupStyles.test.ts` proves each member is outside `BOOTSTRAP_DARK_VARIABLES` and inside
`BOOTSTRAP_ROOT_VARIABLES`; `tests/src/styles/tokens.test.ts` requires the dark scope's `--bs-`
partition to be exactly the Bootstrap dark list plus that set.

### D9 — `matchesPaintedColor` lives beside the style proofs rather than in `tests/setupStyles.ts`. Decided and recorded.

**Found.** `@orkestrel/test/browser` imports `vitest/browser`, which refuses to load outside browser
mode, and `tests/setupStyles.ts` is imported by `tests/setupStyles.test.ts` in the Node `setup`
project. Putting the comparison there reddened that project outright:

```text
Error: vitest/browser can be imported only inside the Browser Mode. Your test is running in forks pool.
 ❯ tests/setupStyles.ts:1:1
```

**What landed.** `tests/src/styles/fixtures/colors.ts` holds `matchesPaintedColor` and imports
`readPaintedColor` from `tests/setupStyles.ts`, which uses DOM globals alone and loads in both
projects. The style proofs import the comparison from there.

### D10 — the registry walk is declared twice. Decided and recorded.

**Found.** `tests/src/core/index.test.ts` runs in the Node `src:core` project, which loads no style
setup and must not, because `tests/setupStyles.ts` imports the built cascade and would make
`test:src` depend on a styles build. `tests/setup.ts` would be the shared home and is not in this
unit's owned list.

**What landed.** The core proof declares `collectNodes`, which walks the registry with each node's
path and answers the path law; `tests/setupStyles.ts` exports `collectTokenNames`, which answers the
flat name list the parity proof compares. Each names its own job, and the TSDoc on
`collectTokenNames` names the other walk and why it exists.

### D11 — the stacking ladder landed, and the brief's deferred list did not name it. Decided and recorded.

**Found.** The brief defers `scroll-padding`, the hover and active tints, `focus-ring`, and
`breakpoint-down`, and names none of the stacking rungs. The planner's contract carries them and the
objective names `_tokens.scss` as the value authority for every `--vn-*` token.

**What landed.** `--vn-stack-dropdown`, `-sticky`, `-fixed`, `-drawer-backdrop`, `-drawer-base`,
`-dialog-backdrop`, `-dialog-base`, `-popover`, `-hint`, and `-toast` take Bootstrap's component
z-index order with Veneer's own component words, and `guides/tokens.md` records the mapping: `drawer`
is Bootstrap's offcanvas, `dialog` its modal, and `hint` its tooltip. None carries a `--bs-*` alias,
because Bootstrap declares none at root scope.

### D12 — Bootstrap's dark-only component assets have no light counterpart. Decided and recorded.

**Found.** `inventory.json` records five image-valued variables in its `dark` bucket, and Bootstrap
declares each on a component selector nested under `[data-bs-theme=dark]` rather than in the theme
block: `[data-bs-theme=dark] .form-select`, `[data-bs-theme=dark] .form-switch .form-check-input`,
`[data-bs-theme=dark] .navbar-toggler-icon`, and `[data-bs-theme=dark] .accordion-button::after`.
Bootstrap's own light values live on those component rules, which this unit does not own.

**What landed.** The verdict's Bootstrap-only retunes ruling is followed: each is declared in Veneer's
dark scope with Bootstrap's own value, and the light scope declares none. A light island nested
inside a dark one therefore inherits the dark asset. `guides/tokens.md` § Bootstrap variables Veneer
retains names the limit and names the component unit that closes it.

## Review evidence

`git status --porcelain` at return lists modified `README.md`, `guides/README.md`, `guides/veneer.md`,
`src/core/index.ts`, `src/styles/_mixins.scss`, `src/styles/_theme.scss`, `src/styles/_tokens.scss`,
`src/styles/index.scss`, `tests/setupStyles.test.ts`, `tests/setupStyles.ts`,
`tests/src/core/index.test.ts`, `tests/src/styles/index.test.ts`; and untracked `guides/tokens.md`,
`src/core/constants.ts`, `src/core/types.ts`, `src/styles/elements/`, `tests/src/styles/elements/`,
`tests/src/styles/fixtures/`, `tests/src/styles/integration.test.ts`,
`tests/src/styles/mixins.test.ts`, `tests/src/styles/theme.test.ts`, and
`tests/src/styles/tokens.test.ts`. Every path is in the owned list. The built
`dist/src/styles/index.css` is the artifact the acceptance reading above was taken from.
