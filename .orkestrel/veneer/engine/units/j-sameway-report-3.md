<!-- The J-SAMEWAY round-3 writer's final message (opus on Opus 5.5, native subagent aaf263011dec77d13), retained verbatim; brief: units/j-sameway-brief-3.md; worktree tmp/worktrees/integration on unit/integration over dc838aa. -->

Round 3 is done in the same worktree, and nothing is committed. The returning step now records every backdrop write as its own entry and returns exactly those, which closes the lane's witness in both engines. The instrument now refuses a broken plant, and every row, re-run, reads as expected. The acceptance chain exits 0; the whole browser suite passes at 926.

## Files touched
All paths are under `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/integration/`.

- **`src/browser/Modal.ts`**:
  - The backdrop's connection and its token are now two separate entries in what the returning step receives.
  - The show records `'connection'` when it finds the backdrop outside the page and `'token'` when it finds it without the token.
  - The hide records `'token'` when it finds the backdrop with the token and `'connection'` when the backdrop has a parent at the removal step. It passes that parent (`place`) to the returning step.
  - The hide-side returning step (`#reshow`) puts the element back into `place` for `'connection'`, and calls `show` for `'token'`.
  - The show-side returning step (`#rehide`) destroys the backdrop for `'connection'`, and otherwise calls `hide` for `'token'`.
  - The class TSDoc states the two-write rule.
- **`src/browser/Offcanvas.ts`**: the same changes. Its `'connection'` return on the show side also ends the press listener.
- **`guides/veneer.md`**: the returning-step paragraphs in `#### Modal` and `#### Offcanvas` state the two-write rule.
- **Tests**: `tests/src/browser/Modal.test.ts` and `Offcanvas.test.ts` get two new cases each.
- **Unchanged this round**: `types.ts` (its contract sentence names no entries) and `tests/setupBrowser.ts`.
- **Instruments**, under `tmp/j-sameway/`: `mutations-3.py`, `base-red-4.sh`, `acceptance-3.sh`, plus helper scripts (`r3-anchors.py`, `r3-record.py`, `r3-prose.py`).

Diffstat: `5 files changed, 344 insertions(+), 141 deletions(-)`

## D1's table
In the Case column, "hidden-state case" and "shown-state case" are round 1's return matrices:
- **Hidden-state case**: "returns the host (panel) to the hidden state and removes the backdrop when the host drops the shown token at each door after the show writes it".
- **Shown-state case**: "returns the host (panel) and its backdrop to the shown state when the host takes a hide over at each door after the shown token leaves".

"Acquisition (E13)" means the call keeps it and a later change or destruction releases it. "E22 amendment 3" means a release stays released. The hide's host writes return to the values the show wrote.

**Modal show**

| Write | Entry | Return | Case (plus the `D1-*` instrument rows) |
| --- | --- | --- | --- |
| Scroll lock construction | — | Acquisition (E13) | "releases the scroll lock and the open token a show the host took over held at a later show and its hide…" |
| Body `open` token | — | Acquisition (E13) | same case |
| Host padding (`#adjust`) | — | The lock's scrollbar compensation, governed with the lock (E22 amendment 3) | "pads the host by the scrollbar width…" |
| Backdrop connection, when found outside the page | `connection` | Destroys the backdrop, which disconnects it | hidden-state case (`backdrops: 0`) |
| Backdrop token, when found without it | `token` | Removes the token only; the backdrop stays in the page | **new**: "removes only the backdrop token the show added…"; with no entry: "leaves a backdrop the show did not write where it is…" |
| Host appended to the body | — | Kept, not returned: no exit removes it, not a completed hide and not destruction, and the guide states it stays. Returning it would make a stopped show undo what a completed show and its hide keep. | — |
| `display: block` | `display` | `display: none` | hidden-state case |
| `aria-hidden` removed | `aria-hidden` | `aria-hidden="true"` | hidden-state case |
| `aria-modal="true"` | `aria-modal` | Removed | hidden-state case |
| `role="dialog"` | `role` | Removed | hidden-state case |
| `scrollTop` resets | — | Not returned: a scroll position that no exit restores | — |
| The `shown` token step | — | This is the token the host moves; its reversal is the takeover itself | — |
| Isolation | — | Acquisition (E13) | hidden-state case, `focus` row (`inert: true`) |
| Focus move | — | Not returned: the isolation's release returns focus | — |

**Modal hide**

| Write | Entry | Return | Case (plus the `D1-*` instrument rows) |
| --- | --- | --- | --- |
| Isolation release | — | E22 amendment 3 | "keeps the shown state of a hide whose shown token…" |
| `shown` token removed | — | The host's move | — |
| `display: none`, `aria-hidden="true"`, `aria-modal` and `role` removed | Each its own entry | Each back to the value the show wrote | shown-state case |
| Backdrop token, when found with it | `token` | `backdrop.show(owned)`, which adds it back | shown-state case, `backdrop` rows; with no entry: "shows no backdrop the hide did not write…" |
| Backdrop connection, when it has a parent | `connection` | The element is put back into that parent | **new**: "puts back a backdrop the hide removed, adding no token it never removed…" (the lane's witness); also the shown-state case, `removal` row |
| `open` release, padding removal, lock release | — | E22 amendment 3 | — |
| Closing backdrop destruction | — | Not rebuilt (E24's J-SAMEWAY amendment, item 2) | "dispatches no hidden event and resolves false when … destroys the modal or adds the shown token back" |

**Offcanvas show**

| Write | Entry | Return | Case (plus the `D1-*` instrument rows) |
| --- | --- | --- | --- |
| Lock | — | Acquisition (E13) | — |
| Backdrop connection | `connection` | Ends the press listener and destroys the backdrop | panel hidden-state case |
| Backdrop token | `token` | Removes the token; the backdrop and its listener stay | **new**: "removes only the backdrop token the show added…" |
| `aria-modal`, `role`, `showing` | Each its own entry | Removed | panel hidden-state case |
| `shown` token step | — | The host's move | — |
| `showing` removed after the wait | Drops the `showing` entry | The show has undone its own write, so later lists omit it | — |
| Isolation, focus | — | As in Modal | — |

**Offcanvas hide**

| Write | Entry | Return | Case (plus the `D1-*` instrument rows) |
| --- | --- | --- | --- |
| Isolation release | — | E22 amendment 3 | — |
| `hiding` added | `hiding` | Removed | panel shown-state case |
| Backdrop token | `token` | Added back | panel shown-state case, `wait` row |
| `shown` token removed | — | The host's move | — |
| `hiding` removed | Drops the `hiding` entry | The hide has undone its own write | — |
| A leftover `showing` removed | — | Not returned: cleanup of a token a stopped show left behind, not a write of this change's state | — |
| `aria-modal`, `role` removed | Each its own entry | Written back | panel shown-state case |
| Backdrop connection | `connection` | Put back into its parent | **new** witness case; panel shown-state case, `removal` row |
| Lock release | — | E22 amendment 3 | — |
| Listener ended and closing destruction | — | Not rebuilt (E24's J-SAMEWAY amendment, item 2) | closing-destruction case |

## The cases
- **Red** (`bash tmp/j-sameway/base-red-4.sh`: the final test files against HEAD `dc838aa`'s source bytes, then restored): `Tests  4 failed | 127 passed (131)`, `restored byte for byte`.
  - Modal and Offcanvas "puts back a backdrop the hide removed, adding no token it never removed, when the host takes that hide over": `-   "parent": true, / +   "parent": false,`
  - Modal "removes only the backdrop token the show added when the host takes that show over": `-   "parent": true, / +   "parent": false, / +     "show",`
  - Offcanvas, same case: `+     "show", / -   "hid": true, / -   "parent": true, / +   "hid": false, / +   "parent": false,`
- **Green** (the same three owned test files): `Tests  131 passed (131)`.

## The instrument's refusal rule
A failing case is refused when its failure message names any of these; it then reads `REFUSED` rather than `KILLED`:
- a `ReferenceError` or `SyntaxError`;
- an identifier that "is not defined";
- a binding read "before initialization";
- a failed transform.

The instrument reads each case's `failureMessages` from the JSON report and logs the first line as the row's Cause.

Round 2's A1 and A2 plants are corrected: they now write `const expected = false`, `const expected = true`, or `const expected = undefined`. The re-run confirms it: every A1 and A2 kill's cause is an `AssertionError`.

The demonstration row re-plants round 2's broken form (`const agreed = false`) and passes only if the rule refuses it:
`| D2-planted-unbound | D2 | … | Modal completes a show … | refused | REFUSED | ReferenceError: expected is not defined | REFUSED AS PLANTED |`

## Mutation table (`tmp/j-sameway/mutations-3.log.txt`)
The Cause column is omitted. Every killed row's cause is an `AssertionError`, and the D2 row's cause is `ReferenceError: expected is not defined`.

| Row | Obligation | Case | Verdict |
| --- | --- | --- | --- |
| A1-modal-show, A1-skip-modal-show | A1 | Modal completes a show … | KILLED, KILLED |
| A1-modal-hide, A1-skip-modal-hide | A1 | Modal completes a hide … | KILLED, KILLED |
| A1-offcanvas-show, A1-skip-offcanvas-show | A1 | Offcanvas completes a show … | KILLED, KILLED |
| A1-offcanvas-hide, A1-skip-offcanvas-hide | A1 | Offcanvas completes a hide … | KILLED, KILLED |
| A2-modal-show / A2-offcanvas-show | A2 | … returns a show to the hidden state … | KILLED |
| A2-modal-hide / A2-offcanvas-hide | A2 | … keeps the shown state of a hide … | KILLED |
| A3-modal-show, A3-modal-hide | A3 | Modal writes nothing for a change … | KILLED |
| A3-offcanvas-show | A3 | Offcanvas writes nothing for a show … | KILLED |
| A3-offcanvas-hide | A3 | Offcanvas runs one hide and one hidden event … | KILLED |
| A4-modal / A4-offcanvas | A4 | … writes nothing of a stopped show's returning step … | KILLED |
| A5-backdrop | A5 | Backdrop writes no shown token when its owner no longer holds … | KILLED |
| A5-owner-lifetime | A5 | Backdrop writes no shown token when its owner read destroys it … | KILLED |
| A5-modal / A5-offcanvas / A5-alternative | A5 | … writes no backdrop shown token after a hide … | KILLED |
| A6-modal / A6-offcanvas | A6 | … dispatches no hidden event and resolves false when … | KILLED |
| B4-equivalent | B4 | Offcanvas writes only the return to the state the host chose … | HELD |
| B5-modal / B5-offcanvas | B5 | … releases its claim and its listeners … | KILLED |
| D1-rec-modal-show-token / D1-rec-offcanvas-show-token | D1 | … leaves a backdrop the show did not write … | KILLED |
| D1-rec-modal-show-connection / D1-rec-offcanvas-show-connection | D1 | hidden-state case (Modal / panel) | KILLED |
| D1-rec-modal-hide-token / D1-rec-offcanvas-hide-token | D1 | … shows no backdrop the hide did not write … | KILLED |
| D1-rec-modal-hide-connection / D1-rec-offcanvas-hide-connection | D1 | … puts back a backdrop the hide removed … | KILLED |
| D1-ret-modal-show-connection / D1-ret-offcanvas-show-connection | D1 | hidden-state case (Modal / panel) | KILLED |
| D1-ret-modal-show-token / D1-ret-offcanvas-show-token | D1 | … removes only the backdrop token the show added … | KILLED |
| D1-ret-modal-hide-connection / D1-ret-offcanvas-hide-connection | D1 | … puts back a backdrop the hide removed … | KILLED |
| D1-ret-modal-hide-token / D1-ret-offcanvas-hide-token | D1 | shown-state case (Modal / panel) | KILLED |
| D1-ret-modal-show-display, -aria-hidden, -aria-modal, -role | D1 | Modal hidden-state case | KILLED ×4 |
| D1-ret-modal-hide-display, -aria-hidden, -aria-modal, -role | D1 | Modal shown-state case | KILLED ×4 |
| D1-ret-offcanvas-show-showing, -aria-modal, -role | D1 | panel hidden-state case | KILLED ×3 |
| D1-ret-offcanvas-hide-hiding, -aria-modal, -role | D1 | panel shown-state case | KILLED ×3 |
| D2-planted-unbound | D2 | Modal completes a show … | REFUSED AS PLANTED |
| CONTROL | control | Modal writes nothing of a stopped show's returning step … | HELD |

The log ends with `restored byte for byte` and `rows 60, missed 0`.

## Acceptance output (`bash tmp/j-sameway/acceptance-3.sh`)
```
check-src-browser exit 0
oxlint exit 0
oxfmt exit 0
check exit 0
test-guides exit 0 |      Tests  20 passed (20)
test-policy exit 0 |      Tests  109 passed | 1 skipped (110)
owned-files exit 0 |      Tests  270 passed (270)
test-setup-browser exit 0 |      Tests  83 passed (83)
test-src-browser exit 0 |      Tests  926 passed (926)
done
```

## `git status --short`
```
 M guides/veneer.md
 M src/browser/Modal.ts
 M src/browser/Offcanvas.ts
 M tests/src/browser/Modal.test.ts
 M tests/src/browser/Offcanvas.test.ts
```

## Deviation state
No stop. These need your attention:

1. **Where the A5 stop now lives.** The returning step now reconnects the backdrop itself (`place.append`), so it no longer reconnects through `Backdrop.show`. The A5 stop in the returning step is now the call's identity read before the separate token write. `A5-modal` and `A5-offcanvas` are re-anchored to that: they route the reconnection back through a `show` with no owner read, and both redden. The owner read inside the token return still fires, but only when a consumer took the backdrop out of the page between the removal and the return.
2. **A limit in how the connection is detected.**
   - The show counts a backdrop found connected anywhere in the page as connected.
   - A backdrop a consumer moved to another parent is moved back by the backdrop's own show. That move is not recorded, so the returning step leaves the backdrop in its own parent rather than moving it back.
3. **Two rulings in D1's table are mine:** the host's insertion into the body is kept rather than returned, and Offcanvas's removal of a leftover `showing` token is not returned. The reasons are in the table.
4. **I broke the brief's rule once, before the instrument ran.** One command carried a stray `python -` (with `/dev/null` as input). It hung, read and wrote nothing, and I killed it by PID (24504, parent 24501).
5. **Line endings:** every touched file reads LF.
