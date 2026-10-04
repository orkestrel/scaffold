# Review of item 11 (`9ef60f9`), objective lane, Opus, 2026-10-03

VERDICT: FAIL 1, 4, 7; outside: O1 to O7. Items 2 (inertness), 3 (parity), 5 (declared limits), 6 (proofs), and 8 (rules) PASS.

## 1. Privacy: FAIL

The walk skips the children of any element named `input`, `textarea`, `select`, `option`, or `optgroup` (`src/browser/helpers.ts:126`, `src/core/compilers.ts:491`) and replaces that element only when an `instanceof view.HTML*Element` check passes (`helpers.ts:173-199`, `compilers.ts:538-562`); otherwise `lines` stays `undefined` and `helpers.ts:266` / `compilers.ts:628` keeps the copy with the unvisited children. Input (both placements): `const box = document.createElementNS('urn:example', 'select'); box.innerHTML = '<input type="password" value="prefilled-secret">'; document.body.append(box)` yields `<select><input type="password" value="prefilled-secret"></select>` in `capture.html`, and parsing `reading.html` moves the input out of the `select`. An XHTML page can produce the same markup. DOM placement only: a `select` created in a same-origin iframe and adopted into the page keeps its iframe-realm prototype and fails the check the same way. Fix: before `capture.html = root?.outerHTML` (`helpers.ts:283`, `compilers.ts:645`), remove every descendant of `root` matching `input[type="password" i],input[type="hidden" i]`, and skip children only for elements the lowering actually replaces. Pin both placements with the namespaced-`select` case.

## 4. Lowering: FAIL on SVG

- Nested SVG: in `<svg><svg><text y="20">Inner label</text></svg></svg>` the inner `svg` is lowered first; the outer `twin.querySelectorAll('text')` (`helpers.ts:247`, `compilers.ts:609`) finds nothing and `Inner label` disappears.
- `foreignObject`: in `<svg><foreignObject><p>Legend prose</p></foreignObject></svg>` the painted HTML text is dropped.
- Fix: leave an `svg` with an `svg` ancestor unlowered so the outermost reads every `text`; carry the lowered `foreignObject` children into the carrier; add both to `CAPTURE_CASES`.

## 7. Cost: FAIL

- Quadratic re-walk (`helpers.ts:131-158`, `compilers.ts:497-523`): each `mirror.parentNode?.removeChild` resets Chromium's index cache on `twin.childNodes` and `twin.children`, so the next indexed read walks the list again (a hidden `ul` with 5,000 visible rows, a closed `details` with many children, a shadow host with no default slot). Snapshot `Array.from(...)` of both lists first, or walk `lastChild`/`previousSibling` pairs.
- `innerText` on every visible button (`helpers.ts:258`, `compilers.ts:620`): read `aria-label` first and compute `innerText` only when needed.
- Slot chain (`helpers.ts:141-147`, `compilers.ts:507-513`): `getComputedStyle` per slotted child; store once per slot.
- Optgroup style (`helpers.ts:216-219`, `compilers.ts:580-583`): recomputed per option row; compute once per group.
- About eight literal arrays per node (`helpers.ts:81-97`, `:122`, `:126`, `:163`, `:175`, `:188`, `:256`); hoist into `Set`s.
- Rerun the bench with the 5,000-row fixture after the fix.

## Outside the claims

- O1: the root ancestor check looks only at `display: none` (`helpers.ts:61-73`, `compilers.ts:430-442`), so a direct element read inside a closed `details`, a `content-visibility: hidden` ancestor, canvas/video/audio fallback, or an unassigned shadow-host child returns text the page-level read removes.
- O2: `tests/service/document.test.ts:248-251, 268, 280` use `expect.poll` and `waitForDelay(100)` against `.claude/rules/tests.md` § Delay and § Condition; use `waitForCondition` and bound the window with a sentinel request issued after the capture.
- O3: branches no test fails without: the placeholder `color` and `visibility` checks (`helpers.ts:181-183`), the horizontal client-area check (`:237-238`), image-input `aria-hidden` (`:191`), and the button `!invisible` check (`:258`).
- O4: no privacy fixture puts a password inside a `form`, a `dialog`, a slot of an open shadow host, or a child frame (`tests/setup.ts:126`, `helpers.test.ts:513-540`).
- O5: an empty `textarea` paints its placeholder but the capture emits nothing (`helpers.ts:193`), and the declared limits do not say so.
- O6: `guides/browser.md:1845` "may select" (`.claude/rules/writing.md` § Voice: `might` or `can`).
- O7: the capture adds `br` separators inside every block `div`, `summary`, and `details` (`helpers.ts:162-170`), changing the `html` handle beyond the lowered elements, undeclared in `types.ts:2299-2324` and the guide.
- Caveat on item 2: the DOM placement runs in the page's world, so a page-defined getter on a customized built-in (`value`, `href`, `label`, `innerText`) does run; "nothing runs" covers the copy only.
