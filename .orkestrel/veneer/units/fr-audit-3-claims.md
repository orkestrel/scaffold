# Audit claims — FORMS-FRAMES (`fr`), round 3

Subject: FORMS-FRAMES round 3 — `fr-3.diff` and `fr-3-status.txt` (the worktree `/home/user/veneer-fr` against
`e4a6d7c`, all rounds), the shared patch `fr-shared-3.patch` (superseding `fr-shared-2.patch` whole), the report
`b-forms-frames-report-3.md`, and the round-3 records under `fr-instruments/` — against the successor brief
`b-forms-frames-brief-3.md` and the round-2 verdict `fr-audit-2-verdict.md`. The unit was written by `opus` on
Opus 5.5. Each claim is falsifiable; a lane rules CONFIRMED or BROKEN with `file:line` evidence, and before confirming
a claim about a proof names the mutation that would make the proof fail and whether its assertions distinguish that
mutation from the passing case.

1. **The section mutations (claim 5).** Each of the trailing-corner squaring removed, the leading-corner squaring
   removed, the sized-group select end room removed, and the toolbar group width restored to 100% ran alone and
   reddens the toolbar-and-corners case in `InputGroupSection.test.ts` and no other (`fr-mutations-3.log.txt`), and the
   section proof passes on the round-3 tree.
2. **The typed table (R3).** `VALIDATION_HOST_CASES` rows are objects the compiler checks against
   `ValidationHostCase`, with narrowed `tag`, `type`, and `feedback` fields and `holder` absence as `undefined`; the
   planted column swap fails `npm run check` (`fr3-plant-check.log.txt`), and the validation proof reads the `holder`
   absence correctly.
3. **The specimens and prose (claims 4 and 6, F1, R1).** The sized plaintext specimens read `Small reader email` and
   `Large reader email`; the empty-plaintext focus prose describes the content box moving and nothing painted; the
   toolbar prose states the width rule and the room it depends on; the `@remarks` tag sits on its own line.
4. **Scope and law.** `fr-3-status.txt` lists only files the briefs own; `fr-shared-3.patch` touches
   `guides/veneer.md` alone; no changed line adds an `any`, an `as` beyond a const assertion, a `!`, a suppression, a
   nested function, or a mock; every round-3 gate log opens with its command.
