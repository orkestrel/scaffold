# J-INTEGRATION round 3 — the writer's report (opus on Opus 5.5, native; retained from its final message, 2026-09-24)

R1 to R4 closed; every mutation row reddens its target; the acceptance chain reads 826 of 826 browser tests. One recorded deviation (R4's case needed one change before its mutation could redden it). The work sits uncommitted on `55a3b11`; `HostSnapshot.ts` untouched.

## R1: the mechanism

Each engine gains a `#change: object` field; `show` and `hide` set it to a fresh object right after taking `#changing`; `#reshow` and `#rehide` capture that identity when they begin; every returning write runs through `#revert(change, write)`, which writes only while the engine is live and the identity is unchanged. A `show` or `hide` a reaction starts inside the step replaces the identity, so the stale step writes nothing more, whether the nested call completes at once or waits. `#changing` still refuses; E22's lifetime read stays. The shape follows the existing `#change` identity in `Carousel`, `Dropdown`, and `Tooltip`. The Offcanvas case has no synchronous-completion row: every Offcanvas change waits on its slide, so it reads the panel mid-change and after the nested call finishes.

## Cases

- Modal "yields the returning step to a change a reaction inside it starts, ending in the state of that change" (a nested hide and a nested show, each with and without a backdrop). Red `1 failed | 1 passed | 43 skipped`, all four rows: the hide rows left `aria-modal="true"` and `role="dialog"` on a hidden host; the show row without a backdrop `aria-hidden="true"` and no modal semantics on a shown host; with a backdrop `backdrops: []`. Green.
- Offcanvas "yields the returning step to a change a reaction inside it starts, reading the state of that change in flight and at its end". Red `1 failed | 49 skipped`: the hide row mid-change `role: "dialog"`, backdrop `offcanvas-backdrop fade show`; the show row at the end a shown panel with `aria-modal: null`, `role: null`, no backdrop. Green.
- R4 restored: "writes and dispatches nothing more after a reaction inside the backdrop removal destroys the modal". The destruction's lifetime is read again by the next door, so a mutation at the removal door alone landed nothing the case could see; the host carries a consumer `padding-left: 5px`, which the snapshot restores and the padding step after the removal door would have removed; the removal-door mutation reddens it.
- R3: isolation readings added to H1 and H2 in both engines: H1 rows read the sibling not inert and reachable (the hide released the isolation at its first step, per E13); H2 reads inert and unreachable only in the `focus` row, the one row where the show acquired the isolation.

## R2: the proofs' grain

Removed as superfluous (recorded in the source and the guide): `backdrop.hide()` before `destroy()` in both `#rehide` steps (the element leaves the page, so its token is invisible), and `this.#listening = undefined` in Offcanvas `#rehide` (the next show that builds a backdrop reassigns it, and aborting an aborted controller does nothing). Every remaining returning write has its own mutation row. Offcanvas H2 shows the panel again after the stop and presses the old, detached backdrop, proving the stopped show unassigned its backdrop and ended the press listener.

## Mutations (one end run of every row, each against its whole test file; digests matched before and after every row and across the run: `Modal.ts` `ea7d5bf1…`, `Offcanvas.ts` `55b57803…`, `Backdrop.ts` `f332c331…104e`)

Modal `#reshow` (`display`, `aria-hidden`, `aria-modal`, `role`, backdrop show, re-insertion), `#rehide` (`display`, `aria-hidden`, `aria-modal`, `role`, unassign, destroy), lifetime, identity (the Modal R1 case), removal-door lifetime (the R4 case); Offcanvas `#reshow` (`hiding`, `aria-modal`, `role`, backdrop show, re-insertion), `#rehide` (`showing`, `aria-modal`, `role`, unassign, listener abort, destroy), lifetime, identity (the Offcanvas R1 case); Backdrop identity (H3). Round 2's combined "rehide backdrop" row is replaced by the unassign and destroy rows. Summary `tmp/j-integration/mutations-3.summary.log.txt`.

## Acceptance (after the mutation run)

`check-src-browser`, oxlint, oxfmt, `check` exit 0; guides 20; policy 109 and 1 skipped; the owned files 277 of 277 (5 files); `test:src:browser` 826 of 826 (26 files, 89.34 s). Status: `guides/veneer.md`, `Modal.ts`, `Offcanvas.ts`, `Modal.test.ts`, `Offcanvas.test.ts` modified; 5 files, 472 insertions, 57 deletions against `55a3b11`; the guide edits confined to the takeover paragraphs of `#### Modal` and `#### Offcanvas`.

## Deviation state

No stop. Recorded: R4's case change above; the Offcanvas R1 rows are waiting-only; H1 asserts the isolation stays released (E13 does not restore it).
