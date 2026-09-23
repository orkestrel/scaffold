# B-FORMS-GROUP, round 3 — `checker` on Sonnet

Subject: the round-3 prose fixes (`b-forms-group-brief-4.md`, `b-forms-group-report-4.md`). Read-only.

1. **CONFIRMED** for all four replacements: `tests/app/browser/integration.test.ts:1165-1169` (the source clause absent, the replacement present); `tests/app/browser/sections/InputGroupSection.test.ts:45-47` ("the journey reaches the control beside the grouped button by name through keyboard traversal, which a shared name would resolve to another control."); `guides/veneer.md:812-815` ("a grouped control keeps the browser's own border and focus outline, which the element layer leaves in place, and the group's rules; where that border is wider than `--bs-border-width`, the pull-back covers only its outer column."); `guides/veneer.md:793-796` (the added clause present verbatim).
2. **BROKEN** for sentence 1, CONFIRMED for sentences 2 to 4. After the round-3 edit `integration.test.ts:1165-1169` reads "At rest the button sits one step above the control on the group's stacking levels, and it pulls its own leading border back over the control's trailing border, so the button and it pulls back by one border width over the control's trailing border, so the button's leading border paints over the outer column of that border until the control is lifted past it.": it repeats "over the control's trailing border" for one fact, restates the pull-back twice in one run-on joined by two "so" clauses, and is ungrammatical at "so the button and it pulls back" (the brief's literal clause splice left "so the button" dangling). Sentences 2 to 4 read cleanly, one idea per clause, no banned term, no count, every code token followed by a noun or quoted as an identifier.
3. **CONFIRMED.** `b-forms-group-report-4.md:53-61` restates the ROADMAP patch with the B-FORMS-CONTROL row verbatim and no audit clause in the B-FORMS row; `ROADMAP.md` itself untouched.
4. **CONFIRMED.** Only the named passages changed (`integration.test.ts:1160-1174`, `InputGroupSection.test.ts:40-49`, `guides/veneer.md:788-817` read against their surroundings); the hunks match the brief's Owned list.

Findings outside the claims: none beyond claim 2.

VERDICT: FAIL 2; outside the claims: none
