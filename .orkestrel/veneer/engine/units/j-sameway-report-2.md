# J-SAMEWAY round 2 (J-INTEGRATION round 5) — the writer's report (opus on Opus 5.5, native, the round-1 writer resumed; retained from its final message, 2026-09-24)

B1 to B6 closed; every new proof reads red on `622181f`'s sources and green after; the acceptance chain exits 0, the whole browser suite at 922; `types.ts` unchanged this round (digest `4626c941…`). Committed by the Orchestrator as Veneer `dc838aa` over `622181f` (`8 files changed, 570 insertions(+), 228 deletions(-)`).

## Files touched

- `src/browser/Modal.ts` and `Offcanvas.ts`: B1, the returning step gets the backdrop only when this call wrote it (`#rehide` takes `(change, written, backdrop)`, the shape of `#reshow`; the `'backdrop'` list entry is gone); B2 "supersede" wording in the class TSDoc, the `#change` comment, the `#reshow` comment; B3 the local `agreed` renamed `expected`; B5 the constructor releases its claim when an option getter throws; B6 the `destroy()` comment "joins the records".
- `src/browser/Backdrop.ts`: B2 the class sentence "A show also calls `owned` after the insertion and writes no `shown` token when it returns `false`."; the show calls `owned` first and reads its own lifetime and identity after it returns (deviation 2).
- `guides/veneer.md`: `#### Modal` and `#### Offcanvas` returning-step paragraphs (B1's accounting, B2's "supersedes the step"); "a later `show` call, which reuses the held resources" replaces "takes the held resources over"; "an isolation whose construction the host took the show over in" replaces "another write took … over from"; B6 "share one record of it"; paragraphs reflowed to 100 columns.
- Tests: `Modal.test.ts` and `Offcanvas.test.ts` three cases each (B1 show, B1 hide, B5) plus B3's renames and retitles; `Backdrop.test.ts` one case (the callback that destroys the backdrop); shared `tests/setupBrowser.ts` the B3 table change (`units/j-sameway-setup-browser-2.patch`).
- `tmp/j-sameway/`: `mutations-2.py` (generated from round 1's by `r2-instrument.py`), `base-red-3.sh`, `acceptance-2.sh`; round 1's log kept as `mutations-1.log.txt`.

## Red and green

Red (`bash tmp/j-sameway/base-red-3.sh`, the three owned test files against `622181f`'s source bytes): `Tests  7 failed | 120 passed (127)`, `restored byte for byte`. Green (the same three files, final sources): `Tests  127 passed (127)`.

- **B1:** "leaves a backdrop the show did not write where it is when the host takes that show over" and "shows no backdrop the hide did not write when the host takes that hide over", each engine. Red, Modal show `- "connected": true / + "connected": false`; Offcanvas show `- "connected": true, - "hid": false / + "connected": false, + "hid": true` (`hid` reads the press listener); Modal and Offcanvas hide `+     "show",` (a backdrop token the hide never removed, shown again). Mechanism: before calling the backdrop, each call reads whether the backdrop already carries the `shown` token; the show returns only a backdrop it found without it; the hide shows again only a backdrop it found with it. A backdrop the hide removed from the page without fading it is not put back, because showing it would add a token the hide never removed (a documented limit).
- **B2:** prose only; the only "take over" uses left in both engines and both guide sections describe the host moving the token against the change; a later call "supersedes". The reviewer's exact wording was not on disk (the verdict summarized it); the writer worded each site to E24's one meaning, including two guide phrases the reviewer did not list.
- **B3:** renames and retitles only; the Modal reinsertion table's `animated` member is `fade` and its rows run in the hide's order (removal, open, padding, lock); the instrument finds its cases under the new titles.
- **B4:** kept the forward pass and recorded why no reaction reaches it: the owner read reports `false` only when the engine is destroyed or a later call started; nested `show` and `hide` are refused while `#changing` is true, which is set before the backdrop step and cleared only by a failed door or destruction, with no door read between setting it and the insertion; `destroy()` destroys the backdrop, so its own lifetime check fails first. Row `B4-equivalent` removes the forward pass and runs the Offcanvas case whose rows destroy the panel or call the opposite method inside the forward insertion: HELD.
- **B5:** "releases its claim and its listeners when an option getter throws after the claim", both engines, rows throwing from an `on` getter and a `signal` getter. Red `- "claimed": true, - "found": false / + "claimed": false, + "found": true`, the `signal` row also `+ "heard": 1`. Fix: `this.#host = host` before the claim; everything after it in `try { … } catch (error) { this.destroy(); throw error }`.
- **B6:** prose only ("its snapshot joins the records this one has still to write back"; "share one record of it").
- **The objective lane's callback trace:** "writes no shown token when its owner read destroys it, resolving false". Red `expected [ 'modal-backdrop', 'show' ] to deeply equal [ 'modal-backdrop' ]`.

## `tests/setupBrowser.ts` hunk

`MODAL_REINSERTIONS`: the remarks read "Each door follows, in the order the hide runs them, the backdrop's removal, the body's `open` token release, the host's `padding-right` removal, or the scroll lock's release."; the rows become `{ door: 'removal', fade: false }`, `{ door: 'removal', fade: true }`, `{ door: 'open', fade: false }`, `{ door: 'padding', fade: false }`, `{ door: 'lock', fade: false }`. `tests/setupBrowser.test.ts` unchanged.

## Mutation table (`mutations-2.log.txt`)

KILLED: the 24 round-1 rows re-anchored (A1 to A6); B1-modal-show, B1-modal-hide, B1-offcanvas-show, B1-offcanvas-hide (the call returns a backdrop it found already in the state); B5-modal, B5-offcanvas (the constructor rethrows without destroying itself); R2-owner-lifetime (the backdrop show reads its own lifetime before the owner's function). HELD: B4-equivalent (the forward show passes no owner read), CONTROL. `restored byte for byte`; `rows 33, missed 0`.

## Acceptance (`acceptance-2.sh`)

`check-src-browser`, oxlint, oxfmt, `check` exit 0; `test-guides` 20; `test-policy` 109 and 1 skipped; the owned files 266; `test-setup-browser` 83; `test-src-browser` 922.

## Deviation state

1. B2's wording is the writer's, because the reviewer's prescribed sentences were not on disk; two further guide phrases that used "take over" for something other than the host's token move were reworded.
2. Work the brief did not carry: the objective lane's out-of-claims finding (an `owned` callback that destroys the backdrop and returns `true` still got a `shown` token written) is closed by one reordered line in the backdrop's show, pinned by a case and the row `R2-owner-lifetime`.
Also: the B1 limit (a backdrop the hide removed unfaded is not put back); every script writes LF; no heredoc into `python -`.
