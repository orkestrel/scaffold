# J-INTEGRATION round 2 — the writer's report (opus on Opus 5.5, native; retained from its final message, 2026-09-24)

H1, H2, and H3 are implemented with proofs; every mutation reddens its target; the acceptance chain reads 809 of 809 browser tests on Chromium 153.0.8010.12. One ruling asked: the returning step reads the engine's lifetime before each write. `HostSnapshot.ts` untouched (INT4). Evidence retained under `j-integration-evidence-2/`; the diff `j-integration-2.diff`, the status `j-integration-2-status.txt`.

## What changed

`git diff --stat`: `guides/veneer.md` 93, `Backdrop.ts` 36, `Modal.ts` 116, `Offcanvas.ts` 130, `types.ts` 5 (round 1's remarks only), `Backdrop.test.ts` 83, `Delegate.test.ts` 40, `Modal.test.ts` 395, `Offcanvas.test.ts` 542; 1270 insertions, 170 deletions.

- `Modal.ts`: `#reshow(written, backdrop)` writes back the host values a hide the host took over had changed (`display: block`, no `aria-hidden`, `aria-modal="true"`, `role="dialog"`) and calls `backdrop.show()`, re-inserting a backdrop the hide already removed; `#rehide()` returns a show the host took over (`display: none`, `aria-hidden="true"`, `aria-modal` and `role` removed, the backdrop hidden and removed); `#revert(write)` runs one write only while the modal is live; the hide removes the backdrop with `backdrop.element.remove()` then a door, keeping the `Backdrop` object alive until the hide completes, so it can be re-inserted.
- `Offcanvas.ts`: the same three methods (`#reshow` removes `hiding`, restores `aria-modal` and `role`, shows or re-inserts the backdrop; `#rehide(showing)` removes `showing` if the show still holds it, `aria-modal`, `role`, and the backdrop with its press listener); round 1's `#halt` gone; the backdrop and its press listener live until the hide completes.
- The guide's takeover paragraphs in `#### Modal` and `#### Offcanvas` and the class TSDoc rewritten; round 1's held-backdrop cases replaced by H1; existing cases whose assertions E22 made false expect the returning step's writes (four in `Offcanvas.test.ts`, two in `Modal.test.ts`).

## Cases (red logs `r2-modal-red.log.txt`, `r2-offcanvas-red.log.txt`)

- **H1 Modal** "returns the host and its backdrop to the shown state when the host takes a hide over at each door after the shown token leaves" (rows: during the host fade, at `aria-hidden`, at `role`, during the backdrop fade with and without `fade`, inside the backdrop removal). Red: every row after the `display` write read `display: "none"`, `hidden: "true"`, `target: false`; later rows `modal: null`, `role: null`; the removal row `tokens: undefined`. Green.
- **H2 Modal** "returns the host to the hidden state and removes the backdrop when the host drops the shown token at each door after the show writes it" (the token write, the transition, isolation, focus). Red: every row `backdrops: 1`, `display: "block"`, `hidden: null`, `modal: "true"`, `role: "dialog"`, `target: true`. Green.
- **Modal lifetime** "writes nothing more of the returning step after a reaction inside it destroys the modal". Red on `Modal.find` (no step yet); bound by its mutation (moved to the `role` door after the first run showed the step had nothing left to write at the earlier door).
- **H1 Offcanvas** (rows: `show` removal, the wait, `hiding` removal, `aria-modal`, `role`, inside the removal). Red: the first two rows `hiding` present, `transform: "matrix(1, 0, 0, 1, -401, 0)"`, `target: false`; `aria-modal` row `modal: null`; `role` row `modal: null, role: null`; removal row `backdrop: undefined, beside: false`. Green.
- **H2 Offcanvas** (rows: token, wait, `showing`, isolation, focus). Red: every row `backdrops: 1`, `modal: "true"`, `role: "dialog"`; token and wait rows `showing` present, `visibility: "visible"`, `target: true`. Green.
- **Offcanvas lifetime** "writes nothing more of the returning step after a reaction inside it destroys the panel". Green; bound by its mutation.
- **H3 Backdrop** "writes no shown token after a reaction inside its insertion starts later calls, resolving false". A proof of existing behaviour, no pre-fix red (a backdrop without `fade` resolves its inner show at once, so `[true, true]`); the identity mutation reddens it.
- Each case also reads the scroll-lock or `open`-token state: held in every row.

## Mutations (each against its whole test file; digests match before and after: `Modal.ts` `49d548dc…c98b29`, `Offcanvas.ts` `64cd5e42…fd83418`, `Backdrop.ts` `f332c331…104e`)

Modal `#reshow` dropping `display`, `aria-hidden`, `aria-modal`, `role`, the backdrop show, and the re-insertion each redden H1 Modal (display also the lifetime case); `#rehide` dropping each host write reddens H2 Modal and the show-token case; dropping the backdrop hide and removal reddens H1 and H2 Modal among five; the lifetime read dropped reddens "abandons a show in flight on destruction…" and the Modal lifetime case. Offcanvas `#reshow` dropping `hiding`, `aria-modal`, `role`, the backdrop show, and the re-insertion each redden H1 Offcanvas among others; `#rehide` dropping `showing`, `aria-modal`, `role`, or the backdrop removal each redden H2 Offcanvas among others; the lifetime read dropped reddens the Offcanvas lifetime case among five. Backdrop: the identity half of the post-insertion read dropped reddens H3 alone. Summaries: `mutations-2.summary.log.txt`, `mutations-2b.summary.log.txt`.

## Acceptance (re-run once at the end)

`check-src-browser`, oxlint, oxfmt, `check` exit 0; guides 20; policy 109 and 1 skipped; the owned files 274 of 274 (5 files); `test:src:browser` 809 of 809 (25 files, 86.23 s). Status: the nine owned files; no shared-file patch.

## For the Orchestrator's ruling

1. The returning step reads the engine's lifetime before each write (a reaction inside one of its writes can destroy the engine; without it the step writes after the snapshot restored the host, and "abandons a show in flight on destruction" fails in both engines); it never re-reads the host's token.
2. Writes E22 did not list: a stopped Modal show also returns `display: none` and its ARIA state; a stopped Offcanvas show removes `aria-modal` and `role`.
3. A hide stopped after it released the lock and removed the host padding leaves the padding off (the lock's compensation, treated like the lock under E13).
4. A takeover in the change's own direction (an Offcanvas hide stopped at its `hiding` write because the host dropped `show`; a Modal show stopped before its `shown` write because the host added `show`) still stops as before; a successor unit rules on it.
