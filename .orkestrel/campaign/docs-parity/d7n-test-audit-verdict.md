# Audit verdict — test, over P.1 `8f0aa71` and P.2 `92a50c9`

## Round 1 (2026-09-07, Workflow `wf_01e9496d-36e`)

Lanes: subjective `reviewer` (Opus 5), objective `reviewer` (Opus 5, the recorded substitution for the dark Sol bench), `checker` (Sonnet). Brief: `d7n-test-audit-brief.md` (generated before Ruling 11 reached the template, so its claim 9 still names the narrow scope). Returns: `d7n-test-audit-{subjective,objective,checker}.md`.

### Rulings per claim

- **Claim 4 — FAIL on the convention sentence's placement.** The brief said "under that table"; the pilot and the guide place it above. Ruled: above the table, one sentence per table shape (the template corrected). Carried to the fix round with the subjective F2 (a constant's declared type heads `Shape` in every Constants table).
- **Claim 8 — CANNOT RULE by the checker, ruled PASS.** `ROOT_FILES` is a pilot constant; test's drop-in reaches `README.md` through `readInventory`'s named files, which the README case reads. The claim's letter named the mechanism, not the requirement.
- **Claim 9 — FAIL by the objective lane and the checker on the old scope, ruled PASS under Ruling 11.** The `@throws` on `requireValue` is true and inside the doc block.
- **Claim 11 — CANNOT RULE**, referred to the `verifier` (P.4) after the fix round.
- **Claim 12 — FAIL, annotated.** Counts in prose in both reports; every citation held.
- **Every other claim — PASS.**

### Findings carried

| Finding | Source | Carrier |
| --- | --- | --- |
| The `Shape` convention sentence sits under three tables and above one | subjective F1 | fix round: above every table, one sentence per shape |
| A constant's declared type heads `Signature` in core and browser and `Shape` in server | subjective F2 | fix round: `Shape` in all three; the template rules it |
| § Tests does not name the titled fence | subjective F3 | fix round; the template names the title |
| The report's flattening proof skipped single-line blocks | subjective F4, objective R1 | ruled on the diff: `FrameOptions`, `CaptureVariant`, and `RetryOptions` carried no `{@link}` before the change, so nothing was flattened |
| Server Types option rows carry bare summaries where browser rows name members | subjective F5 | observation; no change |
| The titled example sits on the first factory by file glob rather than a flagship | subjective F6 | observation; Ruling 3 stands (the primary factory where one exists) |
| The baseline-cell comparator was not retained | objective R3 | `instruments/d7/pass/cells/compare-cells.mjs` retained and run by the Orchestrator over `8f0aa71` → `92a50c9`: 234 rows before and after, none missing or added, every changed non-`Summary` cell in `Shape` (the em-dash clause moved out) or under the renamed `Behavior` header, no escaped pipe lost (`test-8f0aa71.json`) |

Round 1 closes as `VERDICT: FAIL 4 9 12` reconciled: 9 passes under Ruling 11, 12 is annotated, 4 and the findings carry into `d7n-test-converge-fix`, closed by `checker` and the `verifier`.
