# Audit claims — TOAST (`to`), round 2

Subject: round 2's record — `to-2.diff` and `to-2-status.txt` (the worktree `/home/user/veneer-to`
against `2a3f223`, captured as round 1 captured them), the revised shared patch `to-shared-2.patch`
(one unified diff against `2a3f223` that supersedes `to-shared.patch` whole), the report
`b-modal-to-report-2.md`, and the retained round-2 instruments and logs under `to-instruments/`
(`to-mutations-2.log.txt`, `to-mutate-2.py`, `to-patch-2.sh`, `to-setup-when-idle.sh`,
`to-gate-2-*.log.txt`) — against the successor brief `b-modal-to-brief-2.md`, the round-1 verdict
`to-audit-verdict.md` and its lane verdicts, round 1's record (`to.diff`, `to-shared.patch`,
`b-modal-to-report.md`), and the mid-campaign note `w2-w3-note-1.md`. The unit was written by `opus`
on Opus 5.5. Each claim is falsifiable; a lane rules CONFIRMED or BROKEN with `file:line` evidence, and
before confirming a claim about a proof names the mutation that would make the proof fail and whether
its assertions distinguish that mutation from the passing case.

Orchestrator rulings the lanes take as given, and rule wrong where the evidence says so: the round-1
verdict's rulings stand, and every claim it confirmed stays confirmed unless round 2 changed its
subject; where the verdict quotes a replacement sentence, that sentence is the fix; the re-padded
§ Compatibility table is formatter output that T2's wider row forces, and integrates by re-running the
formatter over the landed rows; the validation copy was deleted before the report, as the brief
requires, so a lane rules the gate and mutation claims from the code's assertions and the retained
logs, and names which it read; the `test:setup` timeouts the report records under load are the
Orchestrator's reading.

1. **Scope and delta.** `to-2-status.txt` lists exactly round 1's four owned paths and nothing else;
   `to-shared-2.patch` applies with `git apply --check` to a fresh extract of `2a3f223`; against
   `to-shared.patch` it changes only `app/browser/constants.ts` (T1), `tests/setup.ts` (T4),
   `tests/setupStyles.test.ts` (T6), and `guides/veneer.md` (T1 to T4), and in the guide only the
   `### Toast classes` sentences, the toast compatibility rows, the Toast `plugin` row, and the
   formatter's re-padding (every other shared file is byte-identical after both patches apply);
   against `to.diff`, the owned files change only at the sites T3, T5, and the container case name.
2. **T1 and T3: the specimen record and the stacking sentences.** The `TOAST_SPECIMENS` TSDoc and the
   guide's region paragraph carry the T1 sentences verbatim; the guide's rung sentence, the `toast`
   variable row, and the `_toast.scss` opening comment carry the T3 text, which says the container
   applies the level and a toast outside a container declares the slot and applies none, and that the
   engine writes the `showing` class for each fade, in and out alike; the guide's proof sentence
   changed with them states what the stacking case reads; no cascade rule changed.
3. **T2: the Toast `plugin` row.** The row carries the brief's class clause and ends "; no key or ARIA
   handling. Owner: J-ENGINE."; each clause matches `node_modules/bootstrap/js/src/toast.js` at the
   worktree (`show`, `hide`, `dispose`, `_setListeners`); the behaviours the report says the row
   leaves out (the `show` method removing the deprecated `hide` class, the `dispose` method clearing
   the timer) make no clause of the row false.
4. **T4: nouns after code tokens.** Every code token round 2's added or changed guide text, TSDoc,
   and comments carry is followed by its noun, or is a member of a series sharing one noun, or has
   its noun at the start of the next line; the `showing` class name in the `CASCADE_KEYS` TSDoc is in
   backticks.
5. **T5: the framed populations.** The framed-geometry case and the container case in
   `ToastSection.test.ts` derive their specimen populations from `TOAST_SPECIMENS` with no inline
   specimen-name list, cross-check the derivation against the rendered frames, and read each placement
   class as the edge or center the container must meet; `to-mutations-2.log.txt` retains the runs
   where a framed specimen dropped from each derivation, a container moved outside its frame, a
   centering class changed, and an unshipped class added each redden the case the report names, and
   the case's assertions distinguish each mutation.
6. **T6: the token binding.** The `toast case tables` case binds each `TOAST_SLOT_CASES` row's token by
   derivation from the compiled token partial rather than a restated literal list; the retained runs
   show a single-row token edit reddening the binding case or, where two tokens declare the same
   length (the `--vn-space-12` token and the `--vn-gutter-x` token), the style proof; together those
   two proofs distinguish every single-row token edit the table admits, or a lane names the edit
   neither proof distinguishes.
7. **The container-case extension and the round-1 confirmations.** Deriving the container case's
   population goes beyond T5's letter and fixes the class note 1's second rule names, within the
   owned file and the brief's deviation contract; the contract case's exact name order is the region
   contract rather than an iterated case list; the claims round 1 confirmed (the partial against the
   oracle, the proof matrix, the close combinator's move, the registries) still hold on round 2's
   files.
8. **Law and report.** The owned files and the patch add no `any`, no `as` beyond a const assertion,
   no `!`, no suppression, no mock, spy, or fake, and no nested function beyond a callback passed
   directly; the round-2 report follows the writing rule (no banned term, no count of a growable set,
   no list item named by its position, each code token followed by a noun, no temporal `new`, `now`,
   or `currently`, no cross-reference `above` or `below`); the report records each gate's command
   with its result line; a lane lists every count the report states as a finding outside the claims
   for the record.
