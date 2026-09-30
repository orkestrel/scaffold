# foundation-audit — round 1 verdict (2026-09-30)

Subject: `@orkestrel/veneer` at `ec25f9e`. Claims: `tmp/units/foundation-audit-claims.md` (27 claims). Lanes, blind, same claims file, clean contexts:

| Lane | Role | Engine | Transport | Report |
| --- | --- | --- | --- | --- |
| objective | `analyst` | GPT-6 Astra (`gpt-6-astra`, effort high) | `codex exec` from `tmp/codex/foundation-audit-analyst-brief.md`, session `01a0f3b9-0691-7c93-8caf-e4b1c3c0a897`, 788 s | `tmp/units/foundation-audit-analyst-verdict.md` (199 citations, 197 resolve; the two unresolved cite line 1 of two empty built files) |
| subjective | `reviewer` | Claude Opus 5.5, native Agent dispatch with `model: opus` | native | `tmp/units/foundation-audit-reviewer-verdict.md` (123 citations; every unresolved one is a scaffold rule or log path that resolves against the scaffold checkout or `veneer/tmp`) |

A Claude CLI lane was launched first and discarded: `Start-Process` split its prompt, it answered the word `Read` in 8 s, and the user ruled that Anthropic models run natively here. No lane wrote a tracked file in either checkout (`git status --porcelain` empty before and after each run; `veneer/tmp/probes/` empty after the Astra lane).

## Per-claim rulings

| Claim | Analyst | Reviewer | Ruling | Reproduction |
| --- | --- | --- | --- | --- |
| 1 exports resolve and are proved | BROKEN | BROKEN | **BROKEN** | `tests/distribution.test.ts` files stylesheet targets under `excluded` and checks existence only; no proof compiles a `*/scss` export. Reproduced by reading `tests/distribution.test.ts:730-747, 892-899`. |
| 2 `sideEffects: false` keeps CSS imports | BROKEN (webpack rule; no bundler run) | BROKEN (same) | **BROKEN, bounded** | Both lanes rule from webpack's documented decision tree; Vite's CSS plugin marks CSS `no-treeshake`. Fix is `"sideEffects": ["**/*.css", "**/*.scss"]`, as the old package declared. A webpack probe stays an observation for the distribution proof. |
| 3 SCSS subpaths compile in a consumer | BROKEN | BROKEN | **BROKEN** | Astra compiled all three faces through `pkg:` from copied shipped partials and found equality only after stripping Vite's `/*$vite$:1*/` marker; a `node_modules` load path cannot resolve the export map. The unshipped `index.ts` and `sheet.ts` add nothing for Sass. |
| 4 no runtime import outside the package | CONFIRMED | CONFIRMED | **CONFIRMED** | Both read `dist/src/*/index.js`. Carried finding: `isCoreBuildExternal` externalizes every `@orkestrel/*` import whether or not `dependencies` declares it; only the release-mode distribution drive would catch a devDependency shipped as a bare import. |
| 5 gate chain green | BROKEN | BROKEN | **BROKEN** | Orchestrator-measured: format 1, lint 0, check 2, build 0, test 1. Both lanes rule the stub-face red inadmissible: `tests/src/bootstrap/index.test.ts:8` asserts the next chunk's output where `it.todo()` is the rule's form. |
| 6 `check` independent of `build` | BROKEN | BROKEN | **BROKEN** | `tests/setupVue.ts:7` and `tests/src/vue/index.test.ts:3` import `dist/`; the missing-build guard in `setupVue.ts` is unreachable. |
| 7 `.vue` imports typecheck | BROKEN | BROKEN | **BROKEN** | Root `tsc` has no `*.vue` declaration. Scaffold's generator shares the latent defect (root check is plain `tsc`; `vue-tsc` only in the app scope). |
| 8 each test file collected once | BROKEN | BROKEN | **BROKEN** | The four `tests/setup*.test.ts` proofs are collected by the root `setup` project and again by each face wrapper (`gates-c.log:353`). |
| 9 `src/vue` fenced like `src/browser` | BROKEN | BROKEN | **BROKEN** | No `src/vue/**` lint block; no `environmentBoundary('src/vue')` (the owner union does not admit it). Both lanes correct the claim's stylesheet premise: browser-side scopes admit stylesheets. |
| 10 `vue` cannot enter `./vue` | CONFIRMED (attack: `vue`, `vue/dist/…`, relative control) | BROKEN (`@vue/reactivity` passes; peer contradiction) | **SPLIT: 10a CONFIRMED, 10b BROKEN, 10c OPEN** | 10a: `isVueBuildExternal` throws on `vue` and `vue/*` (both lanes). 10b: `@vue/*` returns `false` and would bundle (Orchestrator re-read `configs/helpers.ts:335-351`; reviewer right on the mechanism). 10c: the tenet "not a peer dependency" against pnpm strict and Yarn PnP resolution of a bare `vue` import from `dist/src/vue/index.js` is a design question for the user (both lanes name it). |
| 11 `@layer bootstrap` preserves override behaviour | BROKEN (Chromium run: a yes, b no, c yes) | BROKEN (spec reading, same) | **BROKEN** | Astra measured in Chromium; layered `!important` beats a later unlayered `!important`, and an unlayered low-specificity normal declaration beats a layered high-specificity one. Contract question for the design round. |
| 12 cross-face layer order deterministic | BROKEN (Chromium run: order flips) | BROKEN | **BROKEN** | Astra measured the flip with the actual preludes. |
| 13 "the same output" is provable | BROKEN | BROKEN | **BROKEN** | Current proof is a substring check. Both lanes prescribe a structural comparison after unwrapping the layer and stripping build metadata; the reviewer names the browser CSSOM (no second parser), Astra the existing toolchain's parser. Design round decides the instrument. |
| 14 theme pack applies to islands | BROKEN (Chromium confirmed; both selector bodies empty) | BROKEN | **BROKEN** | Compound selector needs both attributes on one element. Astra bounds it: requiring `data-vn-theme` is an opt-in, not a defect; the island case is. |
| 15 CSS-only consumer can load the pack | BROKEN | BROKEN | **BROKEN** | No built theme CSS; `./styles/themes` is SCSS only. |
| 16 `TOKEN_NAMES` pinned to a declaration | BROKEN | BROKEN | **BROKEN** | No two-way proof; the `veneer` group has no consumer; the marker properties are public globals read only by tests; the doc comment is false today. |
| 17 vendored edits have a durable home | BROKEN | BROKEN | **BROKEN** | Both enumerate the same eight behaviours and the scaffold change each needs; `isVueBuildExternal` (product policy) has no home under the three-leaf rule. Carried to the scaffold propagation plan. |
| 18 `probe` project arms | CONFIRMED (Astra ran a probe through it) | CONFIRMED | **CONFIRMED** | Astra collected and ran `tmp/probes/foundation-analyst.test.ts` with controls and deleted it. |
| 19 `test` reaches every project once | BROKEN | BROKEN | **BROKEN** | Duplicate collection (8), three faces built twice, `test:src:vue` builds nothing before reading `dist/`. `distribution` in `prepublishOnly` alone is correct. |
| 20 public exports documented | BROKEN | BROKEN | **BROKEN** | No guide, no guides proof, placeholder README pitch. |
| 21 showcase outputs gated | BROKEN | BROKEN | **BROKEN** | No freshness gate; a timestamp stamp changes on every rebuild; the browser page has an empty body. |
| 22 journeys drive the application | BROKEN | BROKEN | **BROKEN** | Both suites assert an empty barrel; emptying `main.ts` leaves them green. |
| 23 Vue declarations ship | CONFIRMED | CONFIRMED | **CONFIRMED** | Astra compiled a consumer against the shipped tree and reddened it by deleting the composables declaration. Carried: S8 (no declaration rewrite for a future `@src/browser` import). |
| 24 style kind files obey `styles.md` | BROKEN | BROKEN | **BROKEN** | Literal checks hold; the rule (`_theme.scss` loaded by `index.scss`, one order statement in the consumer entry, each partial in its folder's layer) conflicts with the roadmap (`themes/`, per-face orders, one `bootstrap` layer). Rule and roadmap both need an amendment; the design round drafts it. |
| 25 placement laws on added TypeScript | BROKEN | BROKEN | **BROKEN** | Three near-duplicate sheet-loader pairs plus a module loader; a duplicated alias record; a duplicated throw. The showcase plugin object methods match scaffold's own template (a scaffold finding, not a veneer defect). |
| 26 bootstrap pin enforced | NOT-EVIDENCED (no artifact-identity baseline) | CONFIRMED (pin, integrity, version assertion) | **SPLIT: 26a CONFIRMED, 26b carried** | 26a: the pin and lockfile integrity hold and the version assertion distinguishes a changed version. 26b: no proof reads the artifact's identity; carried into the recreation proof (claim 13), which compares against the installed `bootstrap.css` and pins its digest. |
| 27 would you ship this | BROKEN | BROKEN | **BROKEN** | Both name the same refusal: the layer-wrapped Bootstrap face under an unqualified "same output" promise. |

## Outside findings

| Id | Finding | Ruling |
| --- | --- | --- |
| S1 | Alphabetical folder barrels replace Bootstrap's authored order (`text-bg-*` versus `bg-*`, `card-img-top` versus `img-thumbnail`). | **Accepted.** Orchestrator reproduced from `src/bootstrap/*/_index.scss` and Bootstrap's `scss/bootstrap.scss` import order. Fix in the cascade chunk's barrel order; the foundation's barrels are placeholders that must already carry Bootstrap's order. |
| S2 | Vue face comments say "re-export of browser" while the code and the test say the opposite. | **Accepted.** Reproduced from `configs/src/vite.vue.config.ts:8-9,26` and `tests/setupVue.ts:14`. |
| S3 | `readVueSurface` returns one static namespace; the cache proof cannot fail. | **Accepted**, also found by Astra under "attacked and held". Closes with the dynamic-import fix of claim 6. |
| S4 | Setup proofs rename shipped `dist` files in the same parallel project as the face tests. | **Accepted.** Closes with claim 8 (setup proofs leave the face projects) and a scratch copy for the loader proof. |
| S5 | `tests/src/styles/index.test.ts` refuses `--bs-` and `.btn` in the styles sheet, which contradicts "records additions against the Bootstrap pin". | **Accepted as a design note** for the styles chunk; the foundation assertion is a placeholder that the styles chunk replaces. Carried. |
| S6 | `TOKEN_NAMES.bootstrap` keys drop Bootstrap's own words (`subtle` for `bg-subtle`, `line` for `line-height`, `base` for `box-shadow`). | **Carried to the design round** with claim 16: the registry's key scheme is a naming decision. |
| S7 | The CSS-face proofs run in Node on text; the rule matrix puts `src:styles` in Chromium. | **Carried to the design round**: which proofs are text (byte and structure equality) and which are rendered, and which project each runs in. |
| S8 | The Vue build has no declaration rewrite for a future `@src/browser` import. | **Accepted.** Reuse `declarationRollup` with the core specifier rewrite as the browser wrapper does. |
| S9 | The tarball carries the `/*$vite$:1*/` marker and three empty `index.js` stubs no export names. | **Accepted.** Strip the marker in the equality proof; exclude the stubs from `files` or stop emitting them. |
| O1 | Core and server target classification does not treat `src/vue` as browser-side, so a protected environment can import the Vue face. | **Accepted.** Reproduced from `configs/helpers.ts:437-470` (`targetBrowser` names `app/browser` and `src/browser` only). |

## What the round decides

The foundation is **not accepted** as the base for the successor chunks. Two groups of work follow:

1. **Fix units with no open shape** (dispatched now, `astra` on Codex, one writer in the veneer checkout): gates green (format, `dist/` imports, `.vue` declaration), single collection of every proof, `src/vue` fences and the O1 classification, one Node loader family in `tests/setupServer.ts`, `sideEffects` for stylesheets, `test:src:vue` build prefix, the `@vue/*` refusal, S2, S3, S4, S8, S9, the two-way `TOKEN_NAMES.bootstrap` proof with a control, `it.todo` for the deferred cascade assertion, guide and guides proof and README pitch, journey suites that mount the applications, the showcase stamp from a content hash with a freshness proof.
2. **A blind design round** (`planner` on Opus 5.5 native, `analyst` on Astra) after the absorption lanes return, on: the `./bootstrap` layer contract (11, 27), the cross-face layer order (12), the equality instrument and the proof environments (13, S7), the theme pack selectors and a built theme export (14, 15), the token registry's scope and keys (16, S6, S5), the Vue peer question (10c, a tenet, for the user), the styles kind-file rule against the roadmap (24), and the scaffold propagation list (17).

Claims that passed: 4, 10a, 18, 23, 26a. The round did not run a `checker` lane: every mechanical criterion was measured by the Orchestrator's gate runs before the round.
