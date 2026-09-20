# Token, AST, and browser-proof evidence

Git porcelain before inspection: scaffold `?? .orkestrel/`; elements, mailbox, veneer, markdown, and html empty. After this read-only session: scaffold still `?? .orkestrel/`; elements empty. Remaining neighbor trees were not re-sampled after a rejected batch command; this session wrote nothing.

Facts below are tagged **declared**, **locked**, **installed**, or **inferred**.

---

## Token representation and real consumers

| Package                             | Public carrier                                                                                                                                                                                                                                            | CSS-variable-name form                                                                                                                                                                       | Value authority                                                                                                                                                                                                                                                                                                                                | Groups / semantic roles                                                                                                              | Browser reader                                                                                                                                                                                                                                                        | Real consumer                                                                                                                                                                                                                                                                                                                                                                     |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| elements                            | `tokens` const object, barrel-exported from `src/browser/index.ts:4`. No `Token*` type in `src/browser/types.ts`.                                                                                                                                         | Leaf is the custom-property **name** string (`tokens.color.primary === '--color-primary'` at `src/browser/tokens.ts:24`). `--set-*` for framework chrome; `--color-*` for semantic variants. | `_tokens.scss` for `--set-*`; `_theme.scss` for `--color-*` (`--color-primary: oklch(48% 0.255 264)` at `src/styles/_theme.scss:103`). Named cores retune under `[data-theme]` (`src/styles/themes/_core.scss`).                                                                                                                               | Nested object groups: `color`, `zIndex`, `focus`, `boxShadow`, `icon`, per-element `button`, …                                       | Test-local `style` / `token` / `rootToken` (`tests/setupStyles.ts:89-102`) wrap `getComputedStyle().getPropertyValue()`. Not `@orkestrel/test`.                                                                                                                       | Used-property: `tests/src/styles/elements/_button.test.ts:96-100` compares `background-color` on `button.primary` to `:root` `--color-primary` via `colorEqual`. Presence-only: `tests/src/browser/tokens.test.ts:155-156` asserts every TS leaf non-empty on `:root` or a host. Source regex: same file `DECL_REGEX` at line 54.                                                 |
| mailbox                             | Same `tokens` name-map, barrel-exported `src/browser/index.ts:2`. No token type in `src/browser/types.ts`.                                                                                                                                                | Leaf is `--bs-*` name (`tokens.color.primary === '--bs-primary'` at `src/browser/tokens.ts:37`).                                                                                             | `_tokens.scss` plus `alias-palette` (`src/styles/_mixins.scss:256-264` emits `--bs-#{$alias}: var(--bs-#{$source})`). Default `:root` `@include mixins.alias-palette('primary', 'blue')` at `src/styles/_tokens.scss:1077`. `@property` registers `--bs-radius-factor`, `--bs-density-factor`, `--bs-elevation-factor` (`_tokens.scss:61-77`). | Connector groups (`factor`, `color`, `radius`, `font`, `motion`, `focusRing`, `zIndex`) plus per-component bags (`btn`, `modal`, …). | Same local `style` / `token` / `rootToken` / `assertTokens` (`tests/setupStyles.ts:80-106`).                                                                                                                                                                          | Used-property: `tests/src/styles/integration.test.ts:198-202` compares `.text-body` `color` to `var(--bs-body-color)`. Custom-property: `tests/src/styles/_tokens.test.ts:40-41` non-empty `--bs-primary` + `-hsl`. Source-level TS↔SCSS regex: `tests/src/browser/tokens.test.ts:131-181` (explicitly chosen because `inherit` computes empty at `:root`).                       |
| veneer (carrier the plan must keep) | `TokenGroup` (`src/styles/types.ts:4-9`): `title`, optional `selector`, `entries: Readonly<Record<string, string>>`. `tokenGroups`, derived `tokens` (name→**value**), `tokenNames` (`src/styles/tokens.ts:42`, `464-473`). Barrel `src/styles/index.ts`. | Registry **keys** are `--vn-*` names. `--bs-*` is a documented binding target, not this map’s keys.                                                                                          | TypeScript registry is the value authority; `renderTokensCss` (`src/styles/helpers.ts:17-26`) emits `tokens.css`. Plan at scaffold `.orkestrel/veneer-plan/plan.md:51` requires deriving the emitted registry from that authority.                                                                                                             | Groups are titled blocks with optional non-`:root` selectors (theme, `[data-vn-radius]`, `[data-vn-density]`).                       | Test-local `rootToken` / `style` / `pixels`. `tests/src/styles/tokens.test.ts:11-16` `resolve()` paints `var(--token)` through a **used** property because, in that file’s words, `getComputedStyle` var-substitutes a custom property and does not calc-evaluate it. | Used-property: `tokens.test.ts:28` `resolve('color', 'var(--vn-blue)')` → `'rgb(13, 110, 253)'`. Presence: `tokens.test.ts:19-24` every non-`inherit` name non-empty on `:root`. Self-snapshot: `tests/src/styles/rendered.test.ts:54-59` showcase computed-style matrix; `tests/src/styles/cascade.node.test.ts:18-23` writes a missing declaration fixture during a normal run. |

**Typed-token-to-render example (elements, no new API).** Representation: `tokens.color.primary` is `'--color-primary'` (`src/browser/tokens.ts:24`). Declaration: `_theme.scss:103`. State: `.primary` sets `--set-variant-background-color: var(--color-primary)` (`src/styles/modifiers/_variants.scss:51`). Consumption: `button { background-color: var(--set-button-background-color); }` with fallback into that variant token (`src/styles/elements/_button.scss:33-36`, `:98`). Observation: mount `button.primary`, read used `background-color`, compare to `:root` `--color-primary` (`tests/src/styles/elements/_button.test.ts:96-100`). Mailbox’s parallel used path is `.btn { background-color: var(--bs-btn-bg); }` (`src/styles/_buttons.scss:55`) with `--bs-btn-bg: var(--bs-#{$color})` at line 159; the public `tokens.color.primary` leaf is not the assertion in `tokens.test.ts`.

**Inheritance / state / pseudo / override evidence.** Nested theme island: mailbox `tests/src/styles/themes/_modes.test.ts:126-133` (`[data-bs-theme="dark"]` retunes `--bs-body-bg`). Factor override: mailbox `integration.test.ts:145-150`; veneer `tokens.test.ts:41-50`. Per-instance custom-property override: elements `_button.test.ts:285-290`; mailbox `_tokens.test.ts:155-167` (`--bs-icon-chevron-down` flows into `::after` `mask-image`). Pseudo-element **used** read: `getComputedStyle(el, '::after')` in elements `_button.test.ts:261-262` and mailbox `_tokens.test.ts:148-152`. Pseudo-element **gap**: elements `_backdrop.test.ts:43` and `:108` comment that the suite cannot read the pseudo’s computed style. Hover **gap**: elements `_reveal.test.ts:9` and `:115` state `:hover` cannot be synthesised; those cases use `findRule`. Disabled used-property: elements `_button.test.ts:75-78` (`cursor`).

**Self-derived oracles.** Elements and mailbox token parity scan the same SCSS the implementation authored. Veneer cascade snapshot compares the bundle to its own fixture and can write that fixture when missing (`cascade.node.test.ts:18-20`). Veneer rendered matrix snapshots its own showcase (`rendered.test.ts:54-59`).

**Inspector (HTML content-model, not CSS).** elements `src/browser/inspector/Inspector.ts` and mailbox `src/browser/inspector/Inspector.ts`: `Walker`, frozen `rules`, `FindingManager`, `inspect()`. Useful for markup/content-model discovery. It does not read cascade, tokens, or paint.

---

## Markdown / HTML AST map and limits

**Declared (manifests).** `@orkestrel/markdown` `0.0.15` depends on `@orkestrel/html` `^0.0.10` and `@orkestrel/contract` `^0.0.17`. `@orkestrel/html` `0.0.10` depends on `@orkestrel/contract` `^0.0.17`. Core-only; no `./browser` export.

**Locked / installed.** markdown lock: html `0.0.10`, contract `0.0.17`. html lock: contract `0.0.17`.

**Public mechanisms (reusable, host-independent).** Discriminated readonly trees (`element` on markdown, `category` on html). Handle APIs: `document`, `walk`, `find`, `filter`, `reduce`, `map`, `fold`, `stream`, `span`. html adds `sanitize` and `distill`. Factories: `createMarkdown`, `createHTML`. Parsers: `parseDocument` / `parseProvenance`. Serializers: `renderHTML`, `renderText`, markdown `renderMarkdown`. html→markdown: `htmlToMarkdown`.

**Domain grammars (not CSS reuse).** CommonMark/GFM constructs; html recovery table, `VOID_ELEMENTS`, raw/literal text, URL floor. Roundtrip laws prove **source AST ↔ canonical string**, not layout.

**Concrete consumers.** markdown `tests/src/core/Markdown.test.ts:359+` spreads `walk()`; `compilers.test.ts:20` `renderHTML(parseDocument(...))`. html `tests/src/core/HTML.test.ts:84+` walks spans; `:283` `sanitize()`; `:987+` `distill()`. Cross-package: markdown `htmlToMarkdown(parseDocument(...))` (`helpers.test.ts:2830`). Scaffold installed consumer: `src/server/helpers.ts:1582` `createMarkdown(catalog).filter(isTableNode)`.

**Limits.** Neither package ships a CSS parser, visitor over stylesheets, or computed-style reader. An HTML AST is source markup. It is not the live DOM, not CSSOM, not cascade, not paint, not hit-testing. Adopting these packages as a CSS-test runtime would be an unsolicited dependency and still would not prove render. The reusable idea is the **handle over an immutable tree** (`walk` / `fold` / roundtrip), not the grammar.

---

## Exact available browser-proof primitives

**Declared / locked / installed in scaffold:** `@orkestrel/test` `^0.0.18` → lock and `node_modules/@orkestrel/test` **0.0.18**. Browser entry: `dist/src/browser/index.d.ts`. Core statechart: `dist/src/core/index.d.ts`. Sibling checkout `WebstormProjects/test` matches those names; installed declarations are the consumer contract.

**No Typed OM.** No `attributeStyleMap`, `CSSStyleValue`, or `CSS.px` in the test package, elements, or mailbox.

### Representation (token / color values)

- `readToken`, `readRootToken` — custom-property strings; absent and empty are `''` (`helpers.ts:2186-2208`; skill `styles.md` Tokens).
- `readStyle` — `getComputedStyle(element).getPropertyValue(property).trim()` (`helpers.ts:2158`).
- `parseColor`, `parseCSSColor`, `matchesColor`, `Color`.
- `CANVAS_COLOR`.

### Discovery (stylesheet / markup, not paint)

- `readRules`, `findRule`, `findKeyframes` — CSSOM rule membership. `findRule` remarks: proves a declaration exists; another rule may still win (`helpers.ts:2001-2004`).
- `readCascade`, `readClasses`, `readCensus`, `buildCensus`.
- `extractStyles`, `extractOrphans`, `buildEscapes`.
- Local elements/mailbox `findRule` is a boolean substring walk of `document.styleSheets` (`elements/tests/setupStyles.ts:157-175`).

### Geometry

- `isOutsideViewport`, `isReachable` (`getBoundingClientRect` + `checkVisibility` + focus order), `isRendered` (announced/visible, no box).
- `readPixels`, `readHit`, `measureContent`.

### Perception

- `readPerception`, `readPage`, `readText`, `readName`, `role` via `readRole`, `readStates`, `readFocus`, `describeTree`, `describeFocus`, `readValue`, `readRefusal`.

### Style observation (resolved / composited)

- `readContrast`, `readLayers`, `readBackdrop`, `blendColor`, `measureLuminance`, `measureContrast`, `buildContrast`.
- `readRing` after real focus (`:focus-visible`; `undefined` for UA ring).
- `waitForAnimations`, `waitForFrame`.

### State driving (interaction)

- `resolveAccessible`, `resolveRendered`, `clickAccessible`, `clickAccessibleWithin`, `clickDisclosure`, `pressKeys`, `fillAccessible`, `typeAccessible`, `traverseAccessible`, `typeInput`, `commitInput`, `waitForState`.
- `build`, `mount`, `render`.
- `createPointerEvent`, `createDragEvent` — constructed events; journey skill forbids them as the drive for a journey.

### Capture / journal / storage / statechart

- `createPortfolio` / `place`, `captureFrame`, `readFrame`, `expandCaptures`, `CaptureVariant.apply`.
- `createJournal`, `describeTree`/`describeFocus` for decide-artifacts.
- `createStorage`, `clearStorage`, `removeDatabase`.
- Core: `StateTransition`, `StateScenario`, `executeScenario`, `executeScenarios`, `STATECHART_ATTRIBUTES`, `STATECHART_STATUSES`. Browser: `createHarness`, `readStates`.

**elements and mailbox do not import this package.** Their `style`/`token`/`pixels`/`findRule` are workspace-local.

**`prove` cannot judge a browser project** (skill `decide.md`): pinned threads pool, project-name lookup, probe guide. Rendered claims go to matrix / capture / harness artifacts.

---

## CSS AST / tooling availability

- **No `@orkestrel/css`.** Absent from scaffold tree and inspected neighbors.
- **Veneer declared:** `postcss` `^8.5.15` (`package.json:60`). **Used:** `import { parse } from 'postcss'` in `tests/setupServer.ts:8`, `cascade.node.test.ts`, `layers.node.test.ts`, `treeshake.node.test.ts`, `scale-audit.node.test.ts`. That AST is **source declarations**, not computed/used values.
- **Veneer lock (inferred transitive):** `lightningcss` `1.32.0` via Vite `cssMinify: 'lightningcss'` (`vite.config.ts:157`). Not a public Veneer CSS API.
- **elements/mailbox declared:** `sass`, `tailwindcss`, `@tailwindcss/postcss` as **devDependencies**. No CSS parser in published runtime.
- Plan `plan.md:134` already names “existing CSS toolchain parser or browser CSS Object Model” and forbids writing a second CSS parser.

A Postcss/Lightning tree can confirm a selector and declaration exist. It cannot determine cascade winner on a mounted node, `var()` + `calc()` used length, inheritance through a nested theme, `:hover` / `:focus-visible` paint, pseudo-element used style, compositing, or pointer reachability.

---

## Research citations (external tools unavailable)

`WebSearch` and `WebFetch` were rejected in this session. Primary pages were not retrieved. Canonical sources for the later design, unread here:

- https://www.w3.org/TR/css-variables-1/ (inheritance, fallback, invalid-at-computed-value-time)
- https://drafts.csswg.org/css-cascade-5/ (specified / computed / used / actual)
- https://www.w3.org/TR/cssom-1/ (`getComputedStyle`, `getPropertyValue`, `CSSStyleDeclaration`)
- https://drafts.csswg.org/cssom-view/ (geometry)
- https://drafts.css-houdini.org/css-typed-om-1/ (Typed OM; no usage in inspected trees)
- https://html.spec.whatwg.org/multipage/ (rendering / `::backdrop` host)

**Bounded conclusions from inspected code and the prove-journey skill, not from a live spec fetch:**

- Reading a custom property and reading the used property that `var()`-consumes it are different instruments. Veneer `tokens.test.ts:8` records that custom-property `getComputedStyle` is var-substituted and not calc-evaluated; used lengths go through `pixels` / a consuming declaration.
- `inherit` / `currentColor` at `:root` can compute empty (mailbox `tokens.test.ts:9-10`).
- Mailbox `_tokens.scss:51-55`: registering resolved color tokens as `@property <color>` would resolve at declaration site and break nested `[data-bs-theme]` `var()` chains.
- `findRule` / Postcss membership is discovery. `readStyle` / used `background-color` is observation. A syntax tree has no box tree, no cascade winner, no pointer hit, no compositing.

---

## Browser-proof gaps the amended plan must address

The accepted plan (`plan.md:189-198`) already names journey-derived style matrix and captures, then still treats source/generated structure and self-snapshots as nearby evidence. These gaps are what a revision that makes **rendered interactive browser result** decide component acceptance has to close:

- **Token-name presence is not paint.** elements/mailbox `tokens.test.ts` non-empty custom properties, and veneer `:root` non-empty names, can pass while `background-color` / `color` / `padding` are wrong.
- **Custom-property read is not used-value read.** Plan CSS-conformance row (`plan.md:134`) must not let CSSOM custom-property text or Postcss declaration equality stand in for used `background-color`, resolved length, or contrast.
- **`findRule` / cascade snapshot / SCSS regex are discovery.** They do not prove the winning rule on a mounted host, nested theme, or utility override.
- **Self-oracles.** Veneer `cascade.node.test.ts` can write its missing fixture in a normal run. `rendered.test.ts` goldens the package’s own showcase. elements/mailbox token parity re-derives from the same SCSS.
- **State that CSSOM will not enter unaided.** `:hover` cases in elements use `findRule`. `:focus-visible` needs real keyboard/pointer (`readRing` contract). `:disabled` / `[open]` / `aria-*` need driven DOM state.
- **Pseudo-elements.** Some suites read `getComputedStyle(el, '::after')`; backdrop tests record they cannot. Acceptance must say when a pseudo used-value is required versus when only the host token is observed.
- **Geometry and contrast are unpublished in current Veneer style tests.** `isReachable`, `readPixels`, `readContrast`, `readRing` exist in installed `@orkestrel/test/browser` and are unused by elements/mailbox/veneer token suites.
- **Journey layer unused as the acceptance door.** elements/mailbox drive via `render` + `getComputedStyle`, not `pressKeys` / `clickAccessible`. Plan journey row exists; component closure still needs used-style + interaction on the same driven surface.
- **Engine bound.** Matrix/contrast/capture results are one engine (`styles.md` The engine bound). Chromium-only cannot close a public range.
- **Inspector and markdown/html ASTs are the wrong tree** for CSS acceptance.
- **`prove` cannot close a rendered claim.**

Preserve, unchanged: dependency-free CSS/JS; strict tag-only defaults; class components; Elements look; Bootstrap/Tailwind compatibility; component-by-component units; `TokenGroup` / `tokenGroups` / `renderTokensCss` / `--vn-*` with documented `--bs-*` bindings.

---

## Evidence limits and untouched inputs

- External W3C/WHATWG/Houdini pages were not fetched.
- Neighbor git status after inspection: scaffold and elements only; mailbox, veneer, markdown, html after-status not re-read.
- elements/mailbox `node_modules` versions not lockfile-traced beyond manifests (no `@orkestrel/test` there).
- Veneer `lightningcss` version is lock-inferred, not a declared dependency.
- Inspector rule bodies, every component token group, Bootstrap oracle fixtures, and journey integration files in veneer app tests were not absorbed.
- Typed OM browser-support tables were not retrieved; inspected code uses none of it.
- No tests, builds, or servers were run.
