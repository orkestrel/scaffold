# J-SANITIZER design round — the subjective lane's proposal (planner on Opus 5.5, native, retained verbatim from its notification 2026-09-24)

**Lane held: subjective** (shape, naming, ergonomics, design fit). `planner` on Opus 5.5; brief `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-sanitizer-design-brief.md`. Nothing edited, nothing run.

## 1. The mechanism

**Recommendation: one sanitizer class that checks each write.** It writes through `setHTML` when the target element has that method. Otherwise it parses the markup inert through the platform, walks the parsed tree against the same `SanitizerConfig`, and moves the result in. The current throw branch becomes the fallback branch.

The defect, read from the source:
- `NativeSanitizer.write` throws `SANITIZER_UNSUPPORTED` when `isSanitizeTarget(element)` fails (`src/browser/sanitizers/NativeSanitizer.ts:37-44`, read).
- The tooltip's default is `new NativeSanitizer()` (`src/browser/Tooltip.ts:265`, read).
- `buildTip` writes the template through the sanitizer on every show (`src/browser/helpers.ts:516-518`, read). So a text-only tooltip throws on Chromium 141 as well.
- The Chromium 141 log shows 48 Tooltip failures with that `AppError` or its downstream "No tip" and timeouts (`scaffold/.orkestrel/veneer/units/main-attr-src-browser.log.txt:210-933`, read).

Options considered:

| Option | Cost | Ruling |
|---|---|---|
| **A. Proof-only gate.** Skip the native proofs where `setHTML` is absent, as `plan.md:160-162` suggests. | Leaves the product broken on a floor browser: every tooltip and popover show throws. The Tooltip proofs would be skipped as a current-scope requirement, which AGENTS.md forbids. | Refused. |
| **B. Trusted-template bypass.** Write the template without the sanitizer. | Reverses R10's template clause (`j-engine-design-verdict.md:91`). Bootstrap sanitizes the template too (`template-factory.js:86,142`, read). `html: true` still throws on 141. | Refused: partial fix. |
| **C. Two backend classes plus a selecting factory.** Keep `NativeSanitizer`, add a walking sibling, and add `createSanitizer()` in a new `factories.ts`. | Three public names. A consumer who writes `new NativeSanitizer({ config })` still breaks on 141, so they must learn the factory to get a portable writer. It adds a `factories.ts` file the environment does not have (Glob of `src/browser/*.ts`, read). Selection is read once per construction and stored. | The runner-up; see Alternatives. |
| **D. One class, checked per write (recommended).** | Renames `NativeSanitizer`. Adds a walk, a baseline constant, a config guard, and pure leaf helpers. | Adopted. |

Why D wins on fit:
- It is the AGENTS.md shape exactly: "one shared engine, allowing native backend overrides only for genuine faster paths". The walk is the engine and `setHTML` is the native override.
- Tooltip and Popover keep a one-line default, so their default logic does not change.
- A consumer learns one name that works on every Chromium.
- The capability is derived at each write from the element being written, so no flag is stored that can drift (AGENTS.md "Derive state").
- Checking per write is what lets every selection proof run on both hosts (see Question 3).

**This reverses part of R10 as amended** (`j-engine-design-verdict.md:91`, read). R10 says the default "means `NativeSanitizer` … written through the guarded `setHTML`". The reason for the reversal: E11 sets the floor at the Chromium family (`decisions.md:49`, read), and a writer that fails on a family member is the defect.

What stands: no engine file constructs or names the `Sanitizer` global; `sanitize: false` and `sanitizeFn` still have no option; `@orkestrel/html` is still unused. The walk adds no second HTML parser: the parse is the platform's fragment parser, and the walk filters a DOM tree, as Bootstrap's `sanitizeHtml` does (`util/sanitizer.js:93-115`, read).

## 2. The recommendation in detail

### Names and files
- **Class:** `ConfigSanitizer` in `src/browser/sanitizers/ConfigSanitizer.ts`, renamed from `NativeSanitizer.ts`. It stays the one class in the `sanitizers/` extension category (R13 amended, `verdict:94`, read). The name says what the class honours on both paths: the standard's `SanitizerConfig` dictionary. It keeps the family's naming axis as "policy language", so a later `@orkestrel/html` adapter (R14 amended, `verdict:95`) varies on the same axis. "Native" would be false on Chromium 141.
- **Options:** `ConfigSanitizerOptions { readonly config?: SanitizerConfig }`, renamed from `NativeSanitizerOptions` (`types.ts:650-654`, read).
- **New plain data type:** `SanitizerBaseline` in `types.ts`, beside `SanitizerConfig` (inferred placement): `readonly elements: readonly string[]` (elements removed with their content in any namespace) and `readonly urls: readonly string[]` (attribute names whose `javascript:` value is removed).
- **Unchanged:** `SanitizerInterface` (`types.ts:632-648`), `SanitizerConfig` (`types.ts:679-686`), `SanitizerElementNamespaceWithAttributes`, `SetHTMLOptions`, and `SanitizeTargetInterface` (read). Only the TSDoc of `SanitizeTargetInterface` changes, because its remark names "the native sanitizer adapter" (`types.ts:706-707`, read).
- **Error codes:** `SANITIZER_UNSUPPORTED` is struck, because no element is refused any more. `SANITIZER_OPTION_INVALID` is added, following the existing `{ENTITY}_OPTION_INVALID` form (`src/browser/Alert.ts:71`, read).

### Construction
1. The constructor validates `options.config` with a new total guard, `isSanitizerConfig`, in `validators.ts`. It throws `AppError` `SANITIZER_OPTION_INVALID` before any write.
2. The guard refuses what the platform refuses for the mirrored subset. At minimum that is `dataAttributes` without `attributes` (`types.ts:684`, read). The objective lane pins the rest of the refusal list.
3. The class holds a frozen owned copy of the config, so a later mutation of the caller's object cannot bypass the validation. An absent config selects `SANITIZER_ALLOWLIST` (`constants.ts:586`, read), which is already frozen.

Validating at construction makes the refusal identical on both paths.

### `write(element, html)`
1. When `isSanitizeTarget(element)` is true, call `element.setHTML(html, { sanitizer: config })` (unchanged path).
2. Otherwise, parse: `const template = element.ownerDocument.createElement('template')`, `template.innerHTML = html`. This is the HTML fragment parsing algorithm `setHTML` itself runs, with the context document's scripting mode. Template contents are inert: no script runs, no image fetches, no custom element upgrades. Refused parse routes: `Document.parseHTMLUnsafe` (attaches declarative shadow roots a light-tree walk never enters); `innerHTML` on a detached live-document element (starts image fetches, so `onerror` fires); `DOMParser`, ranked second (scripting disabled, so `<noscript>` diverges from `setHTML`; inferred).
3. Walk `template.content` with a `#clean(parent)` private method over a snapshot of `childNodes`:
   - **Element in `SANITIZER_BASELINE.elements`:** remove it with its content, regardless of the config.
   - **`config.elements` present and the element not listed:** remove it with its content. A list entry matches an element in the HTML namespace by `localName`, compared through `namespaceURI`. Bootstrap's `nodeName.toLowerCase()` (`sanitizer.js:98`) would accept an SVG `a` as HTML `a`, so it is refused.
   - **Attributes:** remove every attribute whose name starts with `on`, regardless of the config (a superset of the platform's event-handler list); remove an attribute in `SANITIZER_BASELINE.urls` whose value parses, through `URL.parse(value, element.baseURI)`, to protocol `javascript:`, keeping the element; otherwise keep an attribute by the rules at `types.ts:682-684`. A namespaced attribute matches a list entry only when its namespace is null.
   - **A surviving `template` element:** recurse into its `.content`.
   - **Comments:** keep or remove them exactly as the platform does for a config with no `comments` field (needs a reading).
4. Call `element.replaceChildren(template.content)`. Nothing is serialized again, so the serialize-and-reparse mutation XSS Bootstrap's `innerHTML` round trip (`template-factory.js:134`) is exposed to cannot occur. A throw during the walk leaves the target unchanged.

### Where the "always removed" set is declared
`constants.ts`: `SANITIZER_BASELINE: SanitizerBaseline = Object.freeze({ elements: ['embed', 'frame', 'iframe', 'object', 'script', 'use'], urls: ['action', 'formaction', 'href', 'xlink:href'] })`, mirroring the standard's built-in safe baseline (inferred from the spec, not read). The `on` prefix rule lives in a leaf helper. The set is proven a superset of the platform's baseline on 153.

### Pure leaves (`helpers.ts`, each exported and unit-tested)
`matchesScriptURL(value, base)`, `matchesKeptElement(element, config)`, `matchesKeptAttribute(element, attribute, config)`.

### Default selection
Unchanged in shape at `Tooltip.ts:265`: `options?.sanitizer ?? new ConfigSanitizer()`; Popover inherits it. The capability read is `isSanitizeTarget(element)` on the element being written, at every `write` call; nothing is stored.

## 3. The proofs

The case matrix lives in `tests/setupBrowser.ts` as `SANITIZER_CASES` (`{ config?, markup, expected }`), a report-only patch. A `buildWalkTarget` helper builds a slot whose own `setHTML` is `undefined`, forcing the walk on every host (the idiom at `NativeSanitizer.test.ts:171-172`).

**Both hosts, no skip:**
1. **Matrix twice:** each case through a plain slot (the host's own route) and a forced-walk slot, both equal to `expected`. Contents: the existing cases at `NativeSanitizer.test.ts:111,131,140,149,159`, plus `java&#9;script:` and `JAVASCRIPT:` href, `<svg><script>`, `<svg><use>`, `<iframe>`, `<object>`, `<embed>`, `on*` under `{}`, `<img onerror>` under `{}`, a kept `<template>` with an unsafe child, a comment, `<noscript>`. Mutations: the walk ignores the element list, the baseline, the URL check, or `dataAttributes`; skips template contents; uses a regex without tab stripping.
2. **Selection proof:** a slot with an own `setHTML` built from `createRecorder` receives exactly one call, `[markup, { sanitizer: config }]`, and its previous child is untouched; a forced-walk slot receives the walked markup. "Always walk" gives a recorder count of 0; "always native" throws on the forced-walk slot; both redden on both hosts.
3. **Construction refusal:** `new ConfigSanitizer({ config: { dataAttributes: true } })` throws `SANITIZER_OPTION_INVALID` before any write.
4. **Owned copy:** mutating the caller's config after construction changes no write.
5. **Existing checks:** the allowlist-constant proof (`NativeSanitizer.test.ts:60`) and the Tooltip default proof (`Tooltip.test.ts:371-387`) are unchanged.
6. **Leaf helpers:** `matchesScriptURL` covers whitespace, case, tab, relative, and unparseable values.

**Host-conditional, the mechanism cited in the guard comment (tests.md:39):**
- **(a) Baseline superset**, where `Reflect.get(globalThis, 'Sanitizer')` is a function: every element and attribute the platform baseline (`new Sanitizer({}).removeUnsafe().get()`) removes is removed by the walk.
- **(b) Refusal agreement**, where `setHTML` exists on a created `div`: for each config in a validity table, `setHTML` accepting it equals `isSanitizerConfig` admitting it.

## 4. The other two Chromium 141 reds

- **`validators.test.ts` "isSanitizeTarget > accepts an object whose setHTML member is a function and refuses every other value"** (`:642`, `:643`): a host-varying proof to rewrite. Replace `isSanitizeTarget(document.createElement('div'))` with `isSanitizeTarget(Object.create({ setHTML() {} }))`; rewrite the TSDoc example `// true on Chromium` (`validators.ts:425`).
- **`Placement.test.ts` "Placement > flips to the opposite side when the preferred side overflows, and tries the listed fallbacks instead when given"** (`:196`, `:222`; received `[986, false, true]`, expected `[896, true, true]`): host-varying platform behaviour. With `position-try-fallbacks: none`, Chromium 153 shifts the overflowing element into the viewport and Chromium 141 leaves it overflowing; the contract is "no fallback, no flip". Rewrite `:218-226`: assert `box.bottom > anchor.top`, keep the computed `none`, drop the `innerHeight` and overlap literals, name both builds in the comment. Mutation: `flip-block` for an empty list reddens it.

## 5. Units

- **J-SANITIZER**, `opus` on Opus 5.5 (native; the browser proofs cannot run in the bench sandbox), audited by `analyst` on Astra, `reviewer` on Opus 5.5, and `checker`. Owns the renamed class and test, the sanitizer block of `types.ts` and the `TooltipOptions.sanitizer` TSDoc, `SANITIZER_BASELINE`, the leaf helpers and the `buildTip` example, `isSanitizerConfig` and the `isSanitizeTarget` TSDoc and rows, `index.ts` and `index.test.ts`, `Tooltip.ts:46,265`, the guide's sanitizer rows and sections; report-only `tests/setupBrowser.ts`. Hand-off if it lands before Popover: `Tooltip.ts:46` imports `ConfigSanitizer`, `Tooltip.ts:265` defaults to `new ConfigSanitizer()`.
- **J-PLACEMENT-HOST**, `builder` on Sonnet, after J-POPOVER (which owns `Placement.test.ts`): the `:196` case only; a planted `flip-block` reddens exactly that case.

## Alternatives, tensions, risks

- Option C loses on surface size, on ergonomics (`new NativeSanitizer({ config })` is a trap on 141), and on derived state; its selection proof is host-conditional. `DOMParser` ranks second to the `template` parse.
- Tensions: the class name (`ConfigSanitizer`; `StandardSanitizer` and `AllowlistSanitizer` the alternatives); the recorder stub as a platform-boundary stub; validation at construction; the baseline `urls` set limited to navigating attributes (Bootstrap also strips `src`, `cite`, `poster`); the unit order; E11's wording ("available on every gate host's Chromium"); readings the dispatch did not supply (`setHTML` output for a comment, `<noscript>`, `<svg><use>` on 153; `removeUnsafe().get()`; the configs `setHTML` refuses; a Chromium 141 run).
- Risks: `template.innerHTML` is a Trusted Types sink, so a page enforcing `require-trusted-types-for 'script'` gets a `TypeError` on the walk path (inferred; the guide states the limit); hidden walk-versus-native divergence beyond the matrix; the Chromium 141 gap is unmeasurable on this host.

PROPOSAL: Rename `NativeSanitizer` to `ConfigSanitizer`, which writes through `setHTML` when the target element has it and otherwise parses the markup inert through a `template`, walks it against the same `SanitizerConfig` plus a declared `SANITIZER_BASELINE`, and moves the result in; prove it on both hosts by running every case through a plain slot and a forced-walk slot; and rewrite the `isSanitizeTarget` and `Placement` fallback proofs to properties that hold on both Chromium 141 and 153.
