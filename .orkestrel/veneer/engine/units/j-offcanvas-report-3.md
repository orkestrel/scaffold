# J-OFFCANVAS round 3 report: the `opus` unit on Opus 5.5, worktree `tmp/worktrees/offcanvas`

Retained 2026-09-24 from the writer's returned report (agent a502a18f5baae1a22, round 3 under `j-offcanvas-brief-3.md`). The instrument table the report carried is retained beside it as `j-offcanvas-mutations-3.log.txt`, copied byte for byte from the worktree, and the report's copy is replaced by that pointer; nothing else is changed.

Round 3 is done and every scoped gate is green. With two panels shown side by side, the second panel's backdrop now stays clickable and a real press on it hides that panel. Modal's suite passes unchanged (40 of 40).

- **O6, the fix:** an isolation now marks each element in its `spare` list as not inert, the same way it treats the panel's own ancestor chain. That mark sits in the shared claim stack, so the newest claim wins and each claim is undone in order.
- **O7, the sentences:** folded in, with one scope note under Deviation state.
- **O8, listener lifetime:** each backdrop's press listener ends when that backdrop is removed.
- **O9, inside press:** the inside-panel press now has its own assertion and its own instrument row.
- **Instrument:** `mutations-3.py` ran 68 rows. Every row is EXACT or JOINED with its first failure line, the `GREEN?` rows read 0 failed, and the log ends with `receipt: restored byte for byte`.

I made no call to the `prove` MCP server.

## Files touched this round (all owned)

- **`src/browser/Isolation.ts`:** spared elements that are connected get a not-inert claim at construction. The observer claims an inserted element as `!this.#spare.has(node)`. The walk over the chain's siblings still skips spared elements. The class remarks and the constructor summary and `@param options` now name `spare`.
- **`src/browser/Offcanvas.ts`:** a new `#listening` controller. The press listener is bound under `AbortSignal.any([signal, listening.signal])`. The hide's removal step and `destroy` abort that controller before removing the backdrop.
- **`src/browser/types.ts`:** the `IsolationOptions.spare` sentence, the false branch of `BackdropOptions.animated`, and the `OffcanvasClassMap.host` verb (diff below).
- **`guides/veneer.md`:**
  - the Isolation bullet under `#### Modal`;
  - in `#### Offcanvas`: the press paragraph, the door paragraph scoped to the backdrop's append and token writes, and the focus and press departures limited to HTML elements.
- **`tests/src/browser/Isolation.test.ts`:** the rewritten spared case and the new precedence case.
- **`tests/src/browser/Offcanvas.test.ts`:**
  - the two-panel case;
  - the listener-lifetime case;
  - the container and inside probes split into their own case, each with its own assertion;
  - `beside` is now `{ x: 407 }` with a corrected comment.
- **`tmp/j-offcanvas/mutations-3.py`, `acceptance-3.sh`**, and their logs.

## Obligations

- **O6.** New case: "keeps the backdrop of a panel shown beside another shown panel interactive, so a trusted press on it hides that panel".
  - Panel A (start edge) is shown, then panel B (end edge). The case asserts B's backdrop reads `inert` false.
  - A trusted `sendProtocol` press at (7, 200) targets B's backdrop, and B hides while A stays shown.
  - `Isolation.test.ts` has "claims each spared element as not inert at construction and at each observer delivery, and restores it on destruction". It covers an already-inert spared sibling, a spared element inserted after construction, and the copied list.
  - It also has "keeps an element another live isolation claimed inert interactive while a sparing isolation lives, and hands it back when that isolation ends".
- **O7.**
  - The focus and press departures now say the isolation claims every HTML element beside the host's ancestor chain, with its descendants, except the backdrop. A non-HTML sibling is outside that claim.
  - The press departure keeps the proven cases: an inert HTML element painted above the backdrop lets the press fall through; an SVG painted beneath it leaves the press to the backdrop.
  - `BackdropOptions.animated` false branch: "adds and removes its `shown` token with no wait for an animation. Either way the element leaves only on `destroy`."
  - The door paragraph now reads "no reaction runs inside its append or its token writes".
  - `OffcanvasClassMap.host` now says "hides from inside", matching the guide table.
  - The `Isolation` constructor summary and `@param options` name the spared elements.
- **O8.** New case: "ends each backdrop press listener with its backdrop, so a press on a removed backdrop hides nothing". It runs three show and hide rounds. `mousedown` on each removed backdrop records no `hide` event, and a press on the live backdrop records one.
- **O9.** New case: "counts no press on a container of the backdrop and no press inside the panel". The container dispatch and the trusted inside click each have their own assertion.
  - Binding the listener on the host reddens only the inside assertion.
  - Binding it on the parent, or restoring the containment check, reddens only the container assertion.

## Red readings against round 2's source

| Test file | Result | Failures |
|---|---|---|
| `Offcanvas.test.ts` | `Tests  2 failed \| 44 passed (46)` | two-panel case: `AssertionError: expected true to be false` at B's backdrop `inert` check; listener-lifetime case: `expected [ [ 'hide.vn.offcanvas' ] ] to deeply equal []` |
| `Isolation.test.ts` | `Tests  2 failed \| 7 passed (9)` | spared case and precedence case, each `expected true to be false` |

## Green readings (`acceptance-3.sh`)

| Gate | Result |
|---|---|
| Offcanvas | `Tests  46 passed (46)` |
| Backdrop | `Tests  7 passed (7)` |
| Isolation | `Tests  9 passed (9)` |
| Modal | `Tests  40 passed (40)` |
| Delegate | `Tests  138 passed (138)` |
| whole `test:src:browser` | `Test Files  23 passed (23)`, `Tests  710 passed (710)` |
| `test:guides` | `Tests  19 passed (19)` |
| `test:policy` | `Tests  109 passed \| 1 skipped (110)` |

## `types.ts` diff (round-3 hunks)

```diff
-	/** Lists the elements beside the host's ancestor chain the isolation leaves as they are, at construction and at each observer delivery, such as the backdrop an offcanvas panel paints beside itself. Default: none. */
+	/** Lists the elements the isolation claims as not inert, as it claims the host's ancestor chain, at construction when connected and at each observer delivery that inserts one beside the chain, so each stays interactive while the isolation lives whatever another live isolation claims, such as the backdrop an offcanvas panel paints beside itself. Default: none. */
 	readonly spare?: readonly HTMLElement[]
```
```diff
-	/** If `true`, fades the backdrop in and out through its `fade` token; if `false`, adds and removes it at once. Default: `false`. */
+	/** If `true`, fades the backdrop in and out through its `fade` token; if `false`, adds and removes its `shown` token with no wait for an animation. Either way the element leaves only on `destroy`. Default: `false`. */
```
```diff
-	/** Marks the panel, which a dismiss trigger naming no target closes from inside. Default: `offcanvas`. */
+	/** Marks the panel, which a dismiss trigger naming no target hides from inside. Default: `offcanvas`. */
```

The `IsolationOptions` summary and its § Surface row stay as they were ("…the elements it spares…"), because the sentence is still accurate.

## Instrument table

Retained as `j-offcanvas-mutations-3.log.txt` (68 rows each `EXACT` or `JOINED` with its first failure line, among them the round-3 rows "the press listener sits on the backdrop parent" (`JOINED`), "the press listener sits on the host" (`JOINED`), "the press listener lives with the panel" (`EXACT`), "the isolation spares no backdrop" (`JOINED`), "the sibling walk claims a spared element inert" (`JOINED`), "the spared element is skipped, not claimed" (`EXACT`), "the observer skips a spared insertion" (`EXACT`), "the observer claims a spared insertion inert" (`EXACT`); `GREEN?` rows at 0 failed for the seven files (Offcanvas 46, Delegate 138, validators 26, index 3, Backdrop 7, Isolation 9, Modal 40); matching digests; `receipt: restored byte for byte`). The source files the acceptance chain ran against match the digests; nothing changed after the instrument ran.

## Scoped chain (`tmp/j-offcanvas/acceptance-3.log.txt`, retained as `j-offcanvas-acceptance-3.log.txt`)

```
check-src-browser exit=0 :: npm run check:src:browser
check exit=0 :: npm run check
oxlint exit=0 :: npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser
oxfmt exit=0 :: npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md
offcanvas exit=0 :: npm run test:src:browser -- tests/src/browser/Offcanvas.test.ts
backdrop exit=0 :: npm run test:src:browser -- tests/src/browser/Backdrop.test.ts
isolation exit=0 :: npm run test:src:browser -- tests/src/browser/Isolation.test.ts
modal exit=0 :: npm run test:src:browser -- tests/src/browser/Modal.test.ts
delegate exit=0 :: npm run test:src:browser -- tests/src/browser/Delegate.test.ts
test-src-browser exit=0 :: npm run test:src:browser
test-guides exit=0 :: npm run test:guides
test-policy exit=0 :: npm run test:policy
```

## Status and diffstat

```
 M guides/veneer.md
 M src/browser/Backdrop.ts
 M src/browser/Delegate.ts
 M src/browser/Isolation.ts
 A src/browser/Offcanvas.ts
 M src/browser/constants.ts
 M src/browser/index.ts
 M src/browser/parsers.ts
 M src/browser/types.ts
 M src/browser/validators.ts
 M tests/src/browser/Backdrop.test.ts
 M tests/src/browser/Delegate.test.ts
 M tests/src/browser/Isolation.test.ts
 A tests/src/browser/Offcanvas.test.ts
 M tests/src/browser/index.test.ts
 M tests/src/browser/validators.test.ts
 16 files changed, 3526 insertions(+), 86 deletions(-)
```

This is the cumulative `git diff HEAD` for rounds 1 to 3. This round's files are `Isolation.ts`, `Offcanvas.ts`, `types.ts`, `guides/veneer.md`, `Isolation.test.ts`, and `Offcanvas.test.ts`.

## Deviation state

I did not stop; the Modal suite stayed green and the two-panel case went red against round 2's source. These choices I settled myself:

- **Fixture and names.**
  - The two-panel fixture uses start- and end-edge sibling panels with the tokens loaded, and a trusted press at (7, 200).
  - Row names: the round-2 "the isolation claims a spared element" row is now "the sibling walk claims a spared element inert". That skip still matters: without it the walk would add a newer inert claim on top.
  - The round-2 row "the press counts a target inside the panel" is renamed "the press listener sits on the backdrop parent". Its first failure is the container assertion.
- **Two `types.ts` edits outside the listed declarations.**
  - The `OffcanvasClassMap.host` verb change (B5) sits outside the round's owned `types.ts` declarations; I made it because O7 names it.
  - I also narrowed the `BackdropOptions.animated` sentence, which is owned.
- **Guide sections outside the departures.** The press paragraph and the door paragraph are in `#### Offcanvas` but not in its departures list. O7 names the door paragraph. I edited the press paragraph because it said "the isolation spares the backdrop" and needed to say the backdrop is claimed not inert and the listener ends with it.
- **Spare claims only connected elements at construction.** A spared element that is not connected is claimed only if the observer later sees it inserted at a level beside the chain. If it is inserted anywhere the isolation does not observe, it is never claimed.
