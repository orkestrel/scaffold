# J-SANITIZER round 4 — the writer's report (opus on Opus 5.5, native; retained from its final message, 2026-09-24)

Round 4 done: the walk no longer breaks when a connected element named `implementation` shadows the document, and the D2 comparisons are pinned. Every acceptance step exits 0 on Chromium 153.0.8010.12; every mutation row reddens its named case and the control row reads `HELD`. No `prove` call.

## D1

`ConfigSanitizer.write` reads `implementation` through the `Document.prototype` accessor applied to `document`, narrowed with `isInstance(…, DOMImplementation)`, and copies the target with `Document.prototype.importNode.call(inert, element, false)`, narrowed with `isInstance(…, Element)`; `createTreeWalker` in `collectChildren` already went through `Document.prototype`; the class TSDoc says the document is read through its prototype. Each narrowing throws `SANITIZER_TARGET_INVALID` on failure, which a real document cannot trigger (the narrowing TypeScript needs), so no case covers those two throws. Case "writes after a kept element named implementation joins this document, through the walk" (writes `<img name="implementation" alt="Named">` under `{}` into a connected walk target, checks `document.implementation` is no longer a `DOMImplementation`, then writes `<b onclick="alert(1)">x</b><script>alert(2)</script>` into a second walk target and expects `<b>x</b>`). Red on the round-3 code: `TypeError: document.implementation.createHTMLDocument is not a function`, `Tests 1 failed | 65 passed (66)`. Green `Tests 66 passed (66)`.

## D2 (Chromium 153 native readings; the walk agrees on each, no `walked` literal needed, no red because the cases are new)

- `{}` `<svg><template><g onclick="alert(1)"></g></template></svg>` → `<svg><template><g></g></template></svg>`.
- `{}` `<math><template><mi onclick="alert(1)">x</mi></template></math>` → `<math><template><mi>x</mi></template></math>`.
- `{}` `<style>b { color: red }</style><b style="color: red">x</b>` → the same markup.
- the allowlist, the same markup → `<b>x</b>`.
- `{}` `<meta http-equiv="refresh" content="0;url=/help"><b>x</b>` → the same markup (a relative URL; the slot is detached and `content` is not a `urls` attribute).
- No unknown-namespace `href` case: the HTML parser's foreign-attribute adjustment namespaces only `xlink:*`, `xml:lang`, `xml:space`, `xmlns`, and `xmlns:xlink`; any other prefixed name stays in the null namespace under its prefixed local name, so XLink `href` is the only non-null-namespace `href`, which the SVG link case pins; the floor reads the local name whatever the namespace.

## D3

Rows 13, 14, and 23 re-anchored to the round-4 text; row 24 "the document implementation read through the property" reddens its named case (1 of 66); row 25, the control, passed 0 of 66, `HELD`. One whole run after the acceptance chain; digests restored (`helpers.ts` 2c45970d…0508, `ConfigSanitizer.ts` b2a34d7b…33c2); "Rows whose verdict differs from the expected one or that did not restore: 0". Retained as `j-sanitizer-mutations-4.py` and `j-sanitizer-mutations-4.log.txt`.

## Acceptance

`check-src-browser`, oxlint, oxfmt, `check` exit 0; sanitizer 66 of 66; reached 234 of 234; `src-browser` 876 of 876; guides 20; policy 109 and 1 skipped; the three builds; conformance 26; setup 319; no retired names. Files this round: `ConfigSanitizer.ts`, its test, `tests/setupBrowser.ts` (patch `j-sanitizer-setupBrowser-4.patch`), the instrument; no `types.ts` change. Status as round 3; `git diff HEAD -M --stat`: 16 files, 1967 insertions, 260 deletions. Deviation state: none.
