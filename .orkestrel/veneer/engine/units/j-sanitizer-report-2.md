# J-SANITIZER round 2 — the writer's report (opus on Opus 5.5, native; retained from its final message, 2026-09-24)

Round 2 done, nothing blocked: the walk parses in the target's context (E21 as amended), closing the round-1 stop. Every acceptance step exits 0 on Chromium 153.0.8010.12; all instrument rows redden their named cases and restore byte for byte. No `prove` call.

## Files touched this round

- `src/browser/sanitizers/ConfigSanitizer.ts`: the walk creates an inert document from `element.ownerDocument.implementation.createHTMLDocument('')`, an element through `createElementNS(element.namespaceURI, element.localName)`, and assigns the markup to its `innerHTML`; a `template` context reads its `content`; the walk cleans the parsed children and calls `destination.replaceChildren(...Array.from(parsed.childNodes))`; a `template` target writes into its content. The class TSDoc states the context parse and, beside the Trusted Types limit, that a declarative shadow root stays a `template` whose content is walked and attaches no shadow root when inserted.
- `tests/setupBrowser.ts`: three `SANITIZER_CASES` entries (the patch, report-only, retained as `j-sanitizer-setupBrowser-2.patch`).
- `tests/src/browser/sanitizers/ConfigSanitizer.test.ts`: the shadow-root case.
- `tmp/j-sanitizer/mutations.py` (retained as `j-sanitizer-mutations-2.py`): row 13; a row can name several cases; row 7's anchor updated (its mutation `element.innerHTML = context.innerHTML`).
- Ruling: one inert document per write, no instance state, because the target's document can differ between writes and the target's own `implementation` keeps the round-1 cross-window behaviour. No `types.ts` change.

## New cases

- **R1** "an empty dictionary keeps the text of table parts a div context drops" (`{}`) and "the allowlist keeps the text of table parts a div context drops": markup `<tr><td>x</td></tr><td>y</td><caption>c</caption>`, expected `xyc`. Red on the round-1 walk: `expected '<tr><td>x</td></tr><tr><td>y</td></tr…' to be 'xyc'`, `expected 'c' to be 'xyc'`, `Tests 2 failed | 39 skipped (41)`. Green `Tests 2 passed | 41 skipped (43)`.
- **R2** the matrix case "a declarative shadow root stays a template element on the walk, where the platform attaches it" under `{}` (host route `<div></div>`; walk `<div><template shadowrootmode="open"><b>s</b></template></div>`), and the case "walks the content of a declarative shadow root template and attaches no shadow root on the walk" (the host `div`'s `shadowRoot` null; an `onclick` and a `<script>` in the content leave `<b>s</b>`; `shadowRoot` still null after insertion). No red reading: the round-1 parse already behaved so. The sanitizer file 43 of 43.
- **R3** instrument row 13 "the walk parses in a template context": both R1 cases failed, 2 / 43, reddened, restored byte for byte. Rows 1 to 12 reddened and restored (row 8 now 38 / 43). Digests after restore: `helpers.ts` a4095bd6…77e5, `ConfigSanitizer.ts` 96903d70…6dbf. "Rows that did not redden their named case or did not restore: 0".

## Acceptance (`tmp/j-sanitizer/acceptance.log.txt`)

`check-src-browser`, oxlint, oxfmt, `check` exit 0; sanitizer 43 of 43; reached files 205 of 205 (5 files); `src-browser` 847 of 847 (25 files); guides 20; policy 109 and 1 skipped; the three builds exit 0; conformance 26; setup 319; the site search exits 1 (no match in `src`, `tests`, `guides`).

## Status

As round 1: the owned files, `tests/setupBrowser.ts`, and the two staged renames. `git diff HEAD -M --stat`: 16 files, 1375 insertions, 260 deletions. Deviation state: none. Observation: the Chromium 141 reading of `src:browser` is for the styles session after landing.
