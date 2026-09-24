# Audit claims — UTIL-SPACING (`usp`), round 2

Subject: round 2's record — `usp-2.diff` and `usp-2-status.txt` (the worktree `/home/user/veneer-usp`
against `2a3f223`), the revised shared patch `usp-shared-2.patch` (one unified diff against `2a3f223`
that supersedes `usp-shared.patch` whole), the report `b-utilities-usp-report-2.md`, and the round-2
records under `usp-instruments/` (`usp-mutations-2.log.txt`, `usp-mutate-2.sh`, `usp-cascade-2.mjs`,
`usp-cascade-controls-2.sh`, `usp-gates-2.sh`, `usp-gates-2.log.txt`, `usp-guides-2.log.txt`,
`usp-service-2.sh`, `usp-service-2.log.txt`, `usp-2-owned-interdiff.txt`, `usp-2-shared-interdiff.txt`)
— against the successor brief `b-utilities-usp-brief-2.md` (S1 to S7), the round-1 verdict
`usp-audit-verdict.md` and its lane verdicts, round 1's record (`usp.diff`, `usp-shared.patch`,
`b-utilities-usp-report.md`), and the notes `w2-w3-note-1.md` to `w2-w3-note-5.md`. The unit was written
by `opus` on Opus 5.5. Each claim is falsifiable; a lane rules CONFIRMED or BROKEN with `file:line`
evidence, and before confirming a claim about a proof names the mutation that would make the proof fail
and whether its assertions distinguish that mutation from the passing case.

Orchestrator rulings the lanes take as given, and rule wrong where the evidence says so: the round-1
verdict's rulings stand, and every claim it confirmed stays confirmed unless round 2 changed its
subject; the Orchestrator's apply check (`usp-shared-2.patch` on a fresh `2a3f223` extract) settles the
apply clause; the validation copy was deleted before the report, so a lane rules the gate and mutation
claims from the code's assertions and the retained logs, and names which it read.

1. **Scope and delta.** `usp-2-status.txt` lists round 1's owned paths and nothing else; against round
   1, the owned files change only at the S1, S3, and S4 sites, and the shared patch only at the S2 to S6
   sites and the re-flow of the paragraphs they touch; no shipped cascade byte and no specimen markup
   changes.
2. **S1: the derived auto-margin population.** `SpacingSection.test.ts` derives the auto-margin class
   names from `SPACING_SIDE_CASES` and the side order from the shorthand entry's `sides` field, and
   keeps a bespoke expectation per class; for each class, the retained run with that class's auto
   margin written as zero by a later important rule reddens the auto-margin case, and the case's
   assertions distinguish the mutation from the passing case (the `.my-auto` reading by its
   greater-than-zero expectation where the stretch default reads zero, the `.me-auto` reading by the
   card after it).
3. **S7: the census and its controls.** `usp-cascade-2.mjs` exits 1 when a recorded selector is missing,
   an unrecorded selector is present, a site repeats, a property declaration is normal, or a custom
   property appears, and 0 otherwise; the retained runs read 0 on the built cascade and 1 on each planted
   copy with the finding the report names; the census reads the unit's keys, not the whole cascade.
4. **S2 and S5: the guide wording.** The guide carries "with the `!important` flag", "writes those as
   the `pointer-events-none`, `pointer-events-auto`, and `select-*` utilities", the subjective lane's
   density sentence, "The `user-select` key", and "the `none` and `auto` value keys"; each sentence reads
   true against the partials and the proofs.
5. **S3: the token nouns.** The importance token in both proof comments, the `auto` field, and the
   boolean values in the `SPACING_*` TSDoc carry their nouns; no line rounds 1 and 2 added leaves a code
   token without its noun.
6. **S4: the rename.** The `SPACING_PROPERTY_CASES` table's `initial` field reads `prefix` in the table,
   its TSDoc, its binding case, and every reader, and no reader of an `initial` field remains in the
   owned files or the patched setup files; the retained run with the margin row's prefix written `'p'`
   reddens the binding case, whose assertion distinguishes it.
7. **S6, law, and report.** The `INTERACTION_COPY` sentence states what the Interaction section's
   hit-test case proves; no changed line adds an `any`, an `as` beyond a const assertion, a `!`, a
   suppression, or a nested function; the report states no temporal word and no tally, and writes each
   gate's command with its result line; the lane lists every count the report states, for the record.
