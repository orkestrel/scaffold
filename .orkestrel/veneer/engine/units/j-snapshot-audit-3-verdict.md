# J-SNAPSHOT round 3 — the Orchestrator's closure record (2026-09-24)

Subject: the J-SNAPSHOT round-3 tree in `tmp/worktrees/snapshot`, per `j-snapshot-brief-3.md` and `j-snapshot-report-3.md`, committed on `unit/snapshot` as `df258a1` and merged with `main` `f22f02c` (no conflicts; the lockfile moved with J-TESTPIN, so the worktree reinstalled before the landing gates).

## Why no fresh audit round

Round 3 adopted the round-2 objective lane's prescription for its one open finding (claim 1 of `j-snapshot-audit-2-verdict.md`: the same-snapshot take-back leaves `class=""`) and carried the subjective lane's sentence and fixture findings. Under `.claude/rules/quality.md` § Rounds and verdicts, a fix that adopts the auditor's prescription verbatim closes with a mutation probe in place of a fresh audit round: disable the load-bearing line, watch the adopted pin fail, restore it, and keep the pin as the regression guard. The probe is the instrument's two S1'' rows and the Orchestrator's replay of the whole instrument.

## The Orchestrator's probe (`j-snapshot-mutations-3-orchestrator.log.txt`)

The replay of `j-snapshot-mutations-3.py` in the worktree reproduced every row of the writer's log: the `LANDED` row against round 2's source (1 failed of 33, the S1'' case), the two S1'' rows "the taken-back record is not read" and "round 2 cleanup restored" (`EXACT`, the S1'' case reddening with `expected true to be false`), the round-1 and round-2 rows (the last-holder rule `EXACT`; the withdrawn-early, reads-again, restore-time, take-back, hand-off, and negative-control rows `JOINED` or `EXACT` as logged; "the written mark not read" `EXACT` at 44 writes where 1 is expected), the `GREEN?` rows at 0 failed for `HostSnapshot.test.ts` (33), `Dropdown.test.ts` (35), and `Modal.test.ts` (40), the instrument's `receipt: restored byte for byte`, and the Orchestrator's own digest: every source restored byte for byte. The controls run read `MISSED` for the late write against round 1's proof shape, the expected reading. This settles claim 5 of rounds 1 and 2 (the replay clause every lane left UNRESOLVED).

## The Orchestrator's read of round 3's diff

- `restore` captures the records it holds when its writes begin and walks them through `#absent`, which departs a record still leaving through `#leave` and reads `present` without departing for a record a re-entrant save took back; the class and style loops remove the attribute when the reading is absent and the list is empty; the `finally` leaves the remaining records.
- The S2'' finding: `Dropdown.test.ts` has no destroy-inside-restoration case (its destroy-inside-destroy case runs the nested destroy from `beforetoggle`, before the restoration); the variant added in `HostSnapshot.test.ts` drives `dropdown.destroy()` with the recorder assertions, and the hand-off row and the late-write control redden it. The `#### Dropdown` sentence therefore rests on a run path.
- The contract sentences carry the record's lifetime; the Tab clause is scoped to tabs; the three fixtures are renamed; the wording bounds the sentence edits touched are folded.

## Deviations

- The writer's first `--controls` run left one mutation in the source; the writer reversed exactly that edit (digest matched), fixed the runner to record originals before the first edit, and reran both logs. Recorded from the report; the Orchestrator's replay confirms the restore.
- No fresh lanes this round, per the rule above; the reviewer's remaining wording bounds not touched by a sentence edit (the Carousel restatement, the Modal "presence record" term, the `written` name, the array spelling, the Dropdown antecedent) are carried to J-INTEGRATION's prose pass in `plan.md`.

RULING: accepted for landing on the probe and the landing chain's green
