# J-SANITIZER audit — the subjective lane's verdict (reviewer on Opus 5.5, native; retained from its notification 2026-09-24)

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| 1 | Selection per write | CONFIRMED | `ConfigSanitizer.ts` `write` (~103–106) reads `isSanitizeTarget(element)` each call; only `#config` stored (~49). The "calls the setHTML method…" case (~146) distinguishes always-native (the forced-walk slot's own `setHTML` is `undefined`, so the call throws) and always-walk (no recorder call; `native.textContent` changes), through own properties, so it behaves the same on Chromium 141. |
| 2 | The context parse | CONFIRMED | ~109–115: inert `createHTMLDocument('')` from the target's `ownerDocument.implementation`, `createElementNS(namespaceURI, localName)`, `innerHTML`; a `template` context reads `content`; `replaceChildren` into a `template` target's content; nothing reserialized. The table-part cases (`tests/setupBrowser.ts` ~2461–2471) distinguish row 13. "Nothing loads" has no case (R4). |
| 3 | The safety floor | FAIL | `matchesBaselineAttribute` (~661–667) tests `urls.includes(attribute.value)`, and `urls` holds `action`, `formaction`, `href`, `xlink:href`, so the walk also removes an animation's `attributeName="action"` or `"formaction"`, which the platform rule E21 records keeps: `{}` with `<svg><animate attributeName="action"></animate></svg>` walks to `<svg><animate></animate></svg>`. A third walk-only removal with no `walked` case. Smallest fix: the matrix case with `walked` and the removal named in the `SanitizerBaseline` remarks. |
| 4 | Configuration semantics | CONFIRMED | `matchesKeptElement` (~687), `matchesKeptAttribute` (~717–736), `#clean` (~123–128); the matrix `it.for` (~120) checks one literal through both routes; row 1 distinguished; gap R3. |
| 5 | Construction | CONFIRMED | ~63–84: one `structuredClone`, the clone validated, `SANITIZER_OPTION_INVALID` in the constructor, each level frozen; rows distinguished; the refusal-agreement case (~301) has a both-values control. Adverse input R1. |
| 6 | Destination refusal | CONFIRMED | ~94–102 before the route; the case (~186) covers native and walk, HTML and SVG, asserting `textContent === 'Kept'`. |
| 7 | Another window's element | CONFIRMED | The foreign inert document's nodes fail this window's `isInstance(node, Element)` (~122) and fall to the node-type branch: elements removed with content, top-level text kept, comments removed. The case (~212) pins `'<b>Bold</b> text'` → `' text'`. A `template` target keeps nothing (R2). |
| 8 | The conditional proofs | CONFIRMED | The only `skipIf` calls (~257, ~301), guarded by `Reflect.get` on `Sanitizer` or `setHTML` with comments; every other case adjusts from a runtime check or forces the walk. |
| 9 | Tooltip default and the other reds | CONFIRMED | Two `Tooltip.ts` hunks; the `Tooltip.test.ts` case (~389) shadows `Element.prototype.setHTML` and asserts the sanitized markup; the validator case (~645) uses `Object.create({ setHTML() {} })`. |
| 10 | Scope and law | CONFIRMED | Owned files plus `tests/setupBrowser.ts`; no retired names; no prohibited construct (one permitted `as const`); the prototype shadow restored in `onTestFinished`. |
| 11 | The instrument | UNRESOLVED | Structurally sound (anchors exact, statuses from the JSON report, uncollected cases count as failures, digests checked), but only the writer ran it and no row shows it can report `SURVIVED`. Settles it: the Orchestrator runs it on the host with one control row whose mutation must survive. |

## Shape rulings

`ConfigSanitizer`: CONFIRMED (states the promise; `Config` sanctioned; `Sanitizer` would shadow the platform global; `DefaultSanitizer` names a role). The five `matches*` predicates exported: CONFIRMED (pure leaves belong in `helpers.ts` and the barrel star-exports it; the walk is the first consumer), with the name defect F2. `SanitizerBaseline` with `handlers: string`: CONFIRMED (each member names a threat category). `SanitizerElementNamespace`: CONFIRMED (mirrors the platform's `removeElements` entry). `SANITIZER_OPTION_INVALID` and `SANITIZER_TARGET_INVALID`: CONFIRMED (`{ENTITY}_{NOUN}_INVALID`). The destination refusal on the native route: CONFIRMED (a route-dependent refusal would break the rename's promise; moving text into an unstarted connected `script` runs it).

## Findings outside the claims

- **F1** — the class TSDoc (~33–34) says "a node from another window's document is removed"; the code keeps top-level text, and the case asserts `' text'`. State that an element from another window's document is removed with its content and its top-level text stays.
- **F2** — `matchesScriptURL` (~615): in Trusted Types, "script URL" means an external script resource's URL, and the same TSDoc discusses Trusted Types; rename to `matchesJavaScriptURL` (the declaration, two TSDoc references, `helpers.test.ts`, the `index.test.ts` export list, the guide's Surface row).

## Referrals

- **R1** — the constructor validates only the clone, and `structuredClone` copies only own enumerable properties: `new ConfigSanitizer({ config: Object.create(SANITIZER_ALLOWLIST) })`, a class instance with getter fields, and a non-enumerable own `elements` all clone to `{}`, which passes and keeps every element the floor leaves, on both routes. `NativeSanitizer` passed the caller's object.
- **R2** — a `template` target from another window: the foreign context fails `isInstance(context, HTMLTemplateElement)`, the destination check fails too, so `replaceChildren()` clears the template's direct children and leaves its `content`; no throw, no replacement, no case.
- **R3** — no case checks native agreement for an `attributes` list without `dataAttributes` over a `data-*` attribute (`{ attributes: ['title'] }` with `<b data-x="1" title="t">`).
- **R4** — nothing pins "nothing loads during the parse": parsing in the owner document leaves every case green, and a live-document `<img src>` starts fetching before the floor runs.

VERDICT: FAIL 3, 11; outside the claims: F1, F2
