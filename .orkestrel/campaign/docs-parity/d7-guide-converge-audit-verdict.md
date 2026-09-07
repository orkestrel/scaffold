# Audit verdict — D7.guide R2, over U2 `d7-guide-converge`

## Round 1 (2026-09-07, Workflow `wf_cdda9239-220`)

Lanes: subjective `reviewer` (Opus 5), objective `reviewer` (Opus 5, the recorded substitution for the dark Sol bench), `checker` (Sonnet). All three ran and returned verdicts. Brief: `d7-guide-converge-audit-brief.md` with its amendment for the unit's deviation. Returns: `d7-guide-converge-audit-subjective.md` (`VERDICT: FAIL 9 12`), `d7-guide-converge-audit-objective.md` (`VERDICT: FAIL 9 12`), `d7-guide-converge-audit-checker.md` (`VERDICT: FAIL 12`).

### Rulings per claim

- **Claims 1, 2, 4, 6, 8, 10 — PASS** on every lane that ruled them: the header set, the class rows before the H3s, the `examples` cell byte-equal to the first overload's paragraph, the blockquote and the pitch one text with `## API` kept, § Tests, and scope.
- **Claim 3 — PASS** (objective, sampled against the tree; the checker could not rule): no fact a cell carried is absent from both its data column and its block.
- **Claim 5 — PASS as amended.** The pairs are `createGuide`, `createSource`, `createSourceManager`, `extractSourceLines`, and the `GuideInterface.tagline` member block; no class block is titled; the restored `findDrift` block is byte-identical to `2acd50e`'s. The deviation's hypothesis holds on the subjective lane's reading: the fence's subject is a doc block, so its body must carry `*/`, and the only escapes are quoting tricks a flagship fence must not teach. The fence stays unpaired. The checker's note that "verbatim" in the claim means the heading's flattened text is recorded.
- **Claim 7 — PASS** on the shape and the internal consistency of the red-first readings (objective); the readings themselves and claim 11's gate readings are the writer's, and the fix round's closure `verifier` takes them independently.
- **Claim 9 — FAIL.** Two blocks changed outside the description paragraph or the `@example`: the `EXPORT_KEYWORDS` `@remarks` body (unflagged, and now stating a count, subjective F2) and the `Source` class block's split into a description and an `@remarks` (flagged). Ruling on the split, referred by the objective lane: accepted, and generalised as Ruling 7 in `rulings.md` — a description paragraph is the summary a table cell carries, and reference material belongs in `@remarks`, which the comparison leaves unread. The fix round applies the same split to the widest cells the subjective lane names (F1) and rewrites the `EXPORT_KEYWORDS` remark to name its members.
- **Claim 12 — FAIL, corrected.** The stale citation (`tests/guides.test.ts:50-81`, which the unit's own insert moved to `:55-86`) and the counts in the report's prose are corrected in the retained report with annotations.

### Findings carried

| Finding | Source | Carrier |
| --- | --- | --- |
| `replaceExample` guards backtick runs and not `*/`; the doc block, the guide's refusal sentence, and § Tests state the refusal set as if complete | U2's deviation; subjective, objective F2 | U2-fix item 1 |
| § Tests names no exclusion class for a body carrying the comment terminator | subjective F3, objective F1 | U2-fix item 2 |
| `EXPORT_KEYWORDS`'s remark states a count and changed unflagged | claim 9; subjective F2 | U2-fix item 3 |
| The widest cells are reference paragraphs in a table; the `Source` split is the treatment | subjective F1; the unit's flag 1 and 2 | U2-fix item 4, under Ruling 7 |
| `exists` lost its orientation clause with no home in the block | subjective F4; the unit's flag 8 | U2-fix item 5 |
| The opening paragraph's packaging sentence interrupts; ragged wrap | subjective F5 | U2-fix item 6 |
| `Shape` carries two notations across Types and Shapers with nothing telling the reader | subjective F6 | U2-fix item 7 |
| The pin's population is the head blocks alone, narrower than `findDrift`'s | objective F3 | recorded; no change — the pin binds through the head titles and stays conservative |
| The report's citation and counts | claim 12 | annotated in the retained report |
| The gate readings and the red-first counts rest on the writer's report | claims 7, 11 | the closure `verifier` |
| `manifestEntryShape`'s authored `Shape` cell; the README `## Checks` row; the dropped `escapeRegExp` and `SourceInterface` clauses | the unit's flags 3, 4, 8 | accepted on the lanes' readings (claim 3 PASS; the `## Checks` row follows § Tests) |

VERDICT: FAIL 9, 12
