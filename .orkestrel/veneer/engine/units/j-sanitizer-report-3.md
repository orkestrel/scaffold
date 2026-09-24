# J-SANITIZER round 3 — the writer's report (opus on Opus 5.5, native; retained from its final message, 2026-09-24)

Round 3 done: every clobbering case walks clean, every acceptance step exits 0 on Chromium 153.0.8010.12, every instrument row reddened and the control row reads `HELD`. One ruling for the Orchestrator (claim 7, first). No `prove` call. Worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/sanitizer`.

## The ruling that changes claim 7

Before: the walk parsed in an inert document from the target document's `implementation`, so an element of another window lost every element and kept top-level text. Now: the walk parses in an inert document from this window's `document.implementation.createHTMLDocument('')` (the E21 amendment's wording) and imports a shallow copy of the target into it, so every parsed node belongs to this window, the prototype reads work, and R2 closes. Markup written into an element of another window is sanitized as in this window. The round-2 case asserting `' text'` is replaced by "sanitizes markup written into an element of another window as it does in this one"; the class TSDoc states it (F1). Going back to text-only would need an explicit realm check.

## Files touched this round

- `ConfigSanitizer.ts`: the context is `inert.importNode(element, false)` (the target's attributes); children through `collectChildren`, names through `readElementName`, attributes through `collectAttributes`; removal through `Node.prototype.removeChild.call` and `Element.prototype.removeAttributeNode.call`; a `template` target recognised by name, its content read through the `HTMLTemplateElement.prototype` accessor and committed through `Reflect.apply(DocumentFragment.prototype.replaceChildren, …)`; other targets through `Element.prototype.replaceChildren.call`; the destination refusal reads the name the same way; the constructor validates the caller's object before `structuredClone`; the TSDoc states the other-window behaviour and two limits (form ancestry; no-quirks mode).
- `helpers.ts`: `matchesScriptURL` renamed `matchesJavaScriptURL` (F2); `readElementName`, `collectChildren` (a `TreeWalker`), `collectAttributes` (`getAttributeNames` and `getAttributeNode` through `Element.prototype`), `matchesPlainData`; the four element and attribute predicates take a `SanitizerElementNamespace` value.
- `constants.ts`: `SANITIZER_NAMESPACE`; the HTML entries of `SANITIZER_BASELINE` use it.
- `validators.ts`: `isSanitizerConfig` checks `matchesPlainData` on the record, its lists, and each entry before reading any member.
- `types.ts`: the `SanitizerBaseline` remarks list the three places the walk removes more than the platform (the `on` prefix; a `javascript:` URL in a `urls` attribute on any element; an animation's `attributeName` naming any `urls` attribute, read on Chromium 153 where native keeps `attributeName="action"`).
- `guides/veneer.md`: the renamed row and the new exports' rows; `test:guides` green.
- Tests: `ConfigSanitizer.test.ts` (new cases, `afterEach(scene.clear)`), `helpers.test.ts` (new signatures), `validators.test.ts` (plain-data rows), `index.test.ts`; `tests/setupBrowser.ts` (shared: new matrix cases, `shadowSetHTML`, which `buildWalkTarget` uses, and `mountFrameDocument`; the patch retained as `j-sanitizer-setupBrowser-3.patch`).
- `tmp/j-sanitizer/mutations.py` rewritten (multi-edit rows; a control row expected to survive); retained as `j-sanitizer-mutations-3.py`, log `j-sanitizer-mutations-3.log.txt`.

## Cases

Red on the round-2 code (`Tests 11 failed | 49 passed (60)`): C1 shadowed `attributes` (under `{}` and a form-keeping configuration: `expected '<form onclick="alert(1)" action="java…' to be '<form><input name="attributes"><butto…'`), shadowed `childNodes` (both: `expected '<form><input name="childNodes"><ifram…' to be '<form><input name="childNodes"></form>'`), shadowed `localName` (`expected '' to be '<form><input name="localName"></form>'`), shadowed `remove` (`TypeError: node.remove is not a function`), shadowed `removeAttributeNode` (`TypeError: node.removeAttributeNode is not a function`); another window's element (`expected ' text' to be '<b>Bold</b> text'`); C2 another window's `template` (`expected '' to be '<b>x</b>'`) and `annotation-xml` (`expected '' to be '<a>kept</a>'`); C3 plain data (`expected { success: true, …(1) } to match object { error: { …(2) } }`). Cases green on the round-2 code, whose red shows only through their mutation rows: shadowed `nodeType`, `namespaceURI`, `removeChild`, and `content`; R3 `data-*`; C4 animation; R4 "nothing loads". Green `Tests 60 passed (60)`; the host route checks every new matrix literal against native `setHTML`.

## Readings

C1: the walk classifies nodes with `isInstance` (the prototype chain, which a named control cannot change) and reads a kept template's `content` as a property (`HTMLTemplateElement` has no named properties), each still with a case. C2: native keeps an HTML `<a>kept</a>` inside `annotation-xml encoding="text/html"`, and so does the walk now; limits stated: no ancestors (a nested `<form>` stays on the walk where native drops it) and no-quirks mode always. C4: native `setHTML` under `{}` keeps `<svg><animate attributeName="action"></animate></svg>`; the walk removes the attribute, pinned as a `walked` literal.

## Mutation table (run once after the acceptance chain)

Rows 1 to 23 reddened their named cases and restored byte for byte: the element list, the floor element set, the `on` rule, the URL check as a regex, the animation rule, template content, reserialization, always-native (matrix and tooltip), always-walk, validation removed, the caller's reference, the template context parse, the bare context element, and each clobber-safe read reverted (`childNodes`, `attributes`, `localName` and `namespaceURI`, `removeAttributeNode`, `removeChild`), the template target by this window's constructor, the plain-data refusal removed, an unlisted `data-*` kept beside an attribute list, and the parse in the live document. Row 24, the control (a local variable renamed), passed 0 of 60 and reads `HELD`. Digests after restore: `helpers.ts` 2c45970d…0508, `ConfigSanitizer.ts` 18e0348b…d43a. "Rows whose verdict differs from the expected one or that did not restore: 0".

## Acceptance

`check-src-browser`, oxlint, oxfmt, `check` exit 0; sanitizer 60 of 60; reached 228 of 228 (5 files); `src-browser` 870 of 870 (25 files); guides 20; policy 109 and 1 skipped; the three builds; conformance 26; setup 319; no retired names. Status: the owned files, `tests/setupBrowser.ts`, and the two staged renames; `git diff HEAD -M --stat`: 16 files, 1908 insertions, 260 deletions.

## For the Orchestrator's ruling

Claim 7's behaviour change; the new exports (`SANITIZER_NAMESPACE`, `readElementName`, `collectChildren`, `collectAttributes`, `matchesPlainData`) and the predicates' new signatures; the plain-data check inside `isSanitizerConfig`. The Chromium 141 reading of `src:browser` is for the styles session after landing.
