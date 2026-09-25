# J-SAMEWAY — the writer's report (opus on Opus 5.5, native; retained from its final message, 2026-09-24)

E24 and its J-REENTRY-SWEEP amendment are implemented in `Modal`, `Offcanvas`, and `Backdrop`; the full acceptance chain exits 0, the whole browser suite included. Committed by the Orchestrator as Veneer `622181f` on `unit/integration` over `4b62bca` (J-INTEGRATION's round 4; `10 files changed, 2835 insertions(+), 396 deletions(-)`). Two choices ask for the Orchestrator's ruling (§ Deviation state, points 1 and 2).

## Files touched

- `src/browser/Modal.ts` and `src/browser/Offcanvas.ts`: each call carries its own change identity, and the pre-dispatch identity comparison tells a nested call from a direct token write; after the pre-change event a host token at the call's end is agreement, and the token step writes only when the host has not; the returning steps are bounded by what the call wrote and read the carried identity; the backdrop's show gets the owner read, and the closing backdrop destruction has a door after it; the lock-construction takeover branch is deleted; the class TSDoc door paragraph is rewritten.
- `src/browser/Backdrop.ts`: `show(owned?)` calls the owner after the insertion; the class TSDoc gains a sentence.
- `src/browser/types.ts`: the `BackdropInterface.show` signature and TSDoc, and the Modal and Offcanvas `show` and `hide` `@returns`.
- `guides/veneer.md`: in `#### Modal`, the resolve paragraph, the `Backdrop` bullet, and the door paragraphs (now three); in `#### Offcanvas`, the resolve paragraph, the composition paragraph, and the door paragraphs.
- `tests/src/browser/Modal.test.ts` (nine cases added, one struck, one comment adjusted), `Offcanvas.test.ts` (nine added, one struck, rows struck from two matrices), `Backdrop.test.ts` (one added).
- Shared: `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts`, nine row tables and their export-list names (`units/j-sameway-setup-browser.patch`).
- `tmp/j-sameway/**`: `acceptance.sh`, `mutations.py`, `mutations.log.txt`, `base-red.sh`, `alternative.log.txt` (retained as `units/j-sameway-*`).

## Measurements

The unchanged-value `class` write (a temporary case, removed): Chromium `HeadlessChrome/153.0.8010.12` runs `attributeChangedCallback` and queues a mutation record for `classList.add` of a present token and `classList.remove` of an absent one, so skipping the token write is observable (`MEASURE add=["modal show -> modal show"] remove=["modal show -> modal show"] toggle=[] records=["modal show -> modal show","modal show -> modal show"]`). Red on the base, first run, sources untouched: `npm run test:src:browser -- tests/src/browser/Modal.test.ts tests/src/browser/Offcanvas.test.ts tests/src/browser/Backdrop.test.ts` gave `Tests  15 failed | 105 passed (120)`. Red on the base with the final test files (`bash tmp/j-sameway/base-red.sh` writes the base bytes of the four sources, runs the command, restores): `Tests  17 failed | 103 passed (120)`, `restored byte for byte`. Green on the same three files: `Tests  120 passed (120)`.

## Obligations

- **A1 agreement:** Modal and Offcanvas "completes a show whose shown token the host adds first at each door before its token step, skipping that write" (Modal rows event, lock, open, adjust, backdrop, append, display, aria-hidden, aria-modal, role; Offcanvas rows event, lock, insertion, aria-modal, role, showing) and "completes a hide whose shown token the host removes first at each door before its token step, skipping that write" (Modal rows event and isolation, each with and without `fade`; Offcanvas event, isolation, hiding). Red: every row `+ "resolved": false` and no completed event.
- **A2 the expected end:** "returns a show whose shown token the host adds early to the hidden state when the host removes it at a later door" (rows: early at the event then back at `role`; early at `role` then back on focus) and "keeps the shown state of a hide whose shown token the host removes at its hide event and adds back at a later door before its token step", both engines. Red, for example, Modal `- "display": "none" / + "display": ""` and `+ "open": false`; Modal hide `+ "shown": false`; Offcanvas hide `+ "visibility": "hidden"`.
- **A3 refusal, prevention, supersession:** Modal "writes nothing for a change a listener to its pre-change event supersedes or prevents, and refuses a show on a shown host" (rows completed, stopped, hidden, prevented, refused); Offcanvas "writes nothing for a show a listener to its show event supersedes or prevents, and refuses a show on a shown host". Red from the stopped row (`+ "outer": true` plus `shown.vn.*`); the completed row (the planner's guard) passes on the base and the A3 mutation rows redden it.
- **A4 one identity per change:** "writes nothing of a stopped show's returning step after a reaction inside the isolation's release starts a change of its own", both engines, rows from `RELEASE_REENTRIES` (sweep MS-1 to MS-4, MS-68, OS-1, OS-5, OS-84). Red: Modal `+ "rewrites": ["style","aria-hidden","aria-modal","role","backdrop"]` with `"backdrops": []`; Offcanvas flight `[null, null, 0]`.
- **A5 the backdrop's show stops with its owner:** "writes no backdrop shown token after a hide a reaction inside the returning step's insertion starts", both engines (MH-S1 to S5 and MH-57; OH-1, OH-2, OH-76, OH-81), and Backdrop "writes no shown token when its owner no longer holds the change after the insertion, and reads the owner only after an insertion". Red: `+ "modal-backdrop -> modal-backdrop show"`, `+ "modal-backdrop fade -> modal-backdrop fade show"`, `+ "offcanvas-backdrop fade -> offcanvas-backdrop fade show"`; Backdrop `expected true to be false`.
- **A6 the closing destruction is a door:** "reads its door after the hide's closing destruction of a backdrop a consumer put back", both engines (OH-92, OH-93). Red: `+ "hidden.vn.*"` after the engine was destroyed; `+ "outer": true` with `"modal": null`. The Modal's closing destruction runs consumer code as the Offcanvas's does; the Modal red reading shows it.

## `types.ts` changes

`BackdropInterface.show(): Promise<boolean>` becomes `show(owned?: () => boolean): Promise<boolean>`, with `@param owned - Reports whether the owner still holds the change that asked for the show, read after the insertion and before the token write. Default: the owner holds it throughout.`, its `@returns` adding "or `owned` returned `false` after the insertion", and remarks naming the owner read. `ModalInterface.show` `@returns`: "Resolves true after the `shown` event, also when the host added the `shown` token before the call wrote it; false when the modal was shown, a change was in flight, a listener prevented `show` or started a change of its own inside it, the modal is destroyed, or the host removed the token after the call found it added and before the call dispatched its completed event." `hide` likewise ("also when the host removed the `shown` token before the call removed it … or the host added the token back after the call found it removed …"); `OffcanvasInterface.show` and `hide` the same with "panel".

## The A5 mechanism

An owner read: `Backdrop.show(owned?)` calls `owned` after the insertion and writes no `shown` token when it returns `false`; both engines pass `() => this.#owns(change)` in the forward show and in the returning step. The alternative, a `Backdrop.hide` that takes over a show in flight, was rejected on a case: under `fade` the owner's nested hide waits for the host's fade before it calls `backdrop.hide()`, so the interrupted show still writes its token; planted as the instrument row `A5-alternative`, it fails only the `["removal", true]` row (`+ "modal-backdrop fade -> modal-backdrop fade show"`, `alternative.log.txt`).

## Reversed expectations rewritten

Each struck door has one home in an agreement row: the Offcanvas "stops each write sequence at the door after a write whose reaction takes the change over…" rows show/aria-modal, show/role, show/showing present, and hide/hiding present (the first read `resolved: true` after the fix); the Offcanvas "writes only the return to the state the host chose after a reaction to a backdrop write…" row show/insertion/token (read `resolved: true` with `["shown.vn.offcanvas"]`); the Modal and Offcanvas "releases the scroll lock it constructed when a reaction inside the construction takes the show over" cases, whose door is now the agreement case's `lock` row (originals in `tmp/j-sameway/struck-*.ts.txt`). No other expectation reversed.

## `tests/setupBrowser.ts` hunk

Nine frozen tables after `mountFrameDocument`, each with a doc comment: `MODAL_SHOW_DOORS`, `OFFCANVAS_SHOW_DOORS`, `MODAL_HIDE_DOORS` (`{ door, fade }`), `OFFCANVAS_HIDE_DOORS`, `SHOW_REVERSALS` (`{ early, late }`), `RELEASE_REENTRIES` (`{ source, nested, backdrop }`), `MODAL_REINSERTIONS` (`{ door, animated }`), `OFFCANVAS_REINSERTIONS`, `CLOSING_REACTIONS`; the `tests/setupBrowser.test.ts` hunk adds the nine names to the sorted export list (`units/j-sameway-setup-browser.patch`).

## Mutation table (`mutations.log.txt`, retained as `j-sameway-mutations.log.txt`)

KILLED: A1-modal-show, A1-modal-hide, A1-offcanvas-show, A1-offcanvas-hide (doors before the token step require the start state again); A1-skip-modal-show, A1-skip-modal-hide, A1-skip-offcanvas-show, A1-skip-offcanvas-hide (the token written or removed unconditionally); A2-modal-show, A2-modal-hide, A2-offcanvas-show, A2-offcanvas-hide (the call forgets the end it found after the dispatch); A3-modal-show, A3-modal-hide, A3-offcanvas-show, A3-offcanvas-hide (the pre-dispatch identity comparison dropped); A4-modal, A4-offcanvas (the returning step re-reads the identity at each write); A5-backdrop, A5-modal, A5-offcanvas (the owner read dropped); A5-alternative (the rejected mechanism); A6-modal, A6-offcanvas (the closing destruction reads no door). HELD: CONTROL (Modal's ownership read tests the identity before the lifetime). `restored byte for byte`; `rows 25, missed 0`.

## Acceptance (`bash tmp/j-sameway/acceptance.sh`)

`check-src-browser`, oxlint, oxfmt, `check` exit 0; `test-guides` 20; `test-policy` 109 and 1 skipped; the owned files (with `Delegate.test.ts`) 259; observations: `test-setup-browser` 83, `test-src-browser` 915.

## Deviation state

1. **When a call finds its end** (asks for a ruling): a call reads the token only right after its pre-change event or at its own token step, so a host that adds the token partway through the show and removes it again before the token step goes unread, and the call writes the token itself and completes.
2. **A hide stopped at the closing destruction** (asks for a ruling): the call writes the host's `display` and ARIA back but cannot bring back the backdrop it just destroyed; treated like E22's amendment 3 lock limit and stated in the TSDoc and the guide; it matches the sweep's OH-93 expected state.
3. Cases beyond the brief's list: the hide-side reversal cases and the Modal `hidden` row, so each hide mechanism has a case its mutation reddens; `RELEASE_REENTRIES` also runs the host-inert and no-backdrop rows on the Offcanvas.
4. A stray `python -` heredoc hung and was killed by its PIDs; a second (Windows PID 43320, its shell 58600) was found by the Orchestrator and stopped after it was traced to this unit's worktree shell.
5. Splice scripts first wrote CRLF; a scoped oxfmt restored LF on the touched files.
6. The planner's "no entrance motion" sentence was not written, because nothing measured it.
