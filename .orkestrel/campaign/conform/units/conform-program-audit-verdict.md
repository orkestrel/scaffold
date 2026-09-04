# Audit verdict: unit conform-program

Subject: the uncommitted unit in `/home/user/fleet/program` (brief `briefs/conform-program-brief.md` with its addendum, audit brief `briefs/conform-program-audit-brief.md`, fix briefs `briefs/conform-program-fix1-brief.md` to `conform-program-fix4-brief.md`, report `reports/conform-program-report.md`, evidence `units/conform-program.diff.txt` and `units/conform-program.status.txt`, proofs under `/home/user/work/evidence/program-proofs/`), implemented by a direct Opus `implementer` (`units/l4/program-implement-direct.md`) from the Luna-reconciled rulings (`units/l4/program-reconcile-luna.md`) with the addendum's qualifier, rater, and guide renames applied first.

## Lanes

| Round | Lane | Role, engine | Terminal |
| --- | --- | --- | --- |
| 1 | absorption | `grok` on GPT-5.6 Luna (`units/l4/program-r1-distill-luna.result.md`) | distillate |
| 1 | checker | `checker` on GPT-5.6 Luna (`units/l4/program-r1-checker-luna.result.md`) | FAIL none with F-1 to F-7 |
| 1 | objective | GPT-5.6 Sol through the Cursor bench, read-only (`units/l4/program-objective-r1-sol.md`) | FAIL 2, 4 with O1, O2, R1 |
| 2 | absorption | `grok` on Cursor Grok 4.6 (`units/l4/program-r2-distill-grok.result.md`) | distillate |
| 2 | checker | `checker` on Luna, twice (`units/l4/program-r2-checker-luna.result.md` FAIL 7 on stale evidence; `program-r2b-checker-luna.result.md` PASS on the regenerated evidence) | PASS |
| 2 | objective | Sol through the Cursor bench (`units/l4/program-objective-r2-sol.md`) | FAIL 2, 3, 4, 9 with O1 to O6, R1 to R3 |
| 3 | absorption | `grok` on Cursor Grok 4.6 (`units/l4/program-r3-distill-grok.result.md`) | distillate |
| 3 | checker | `checker` on Luna (`units/l4/program-r3-checker-luna.result.md`) | PASS |
| 3 | objective | Sol through the Cursor bench (`units/l4/program-objective-r3-sol.md`) | FAIL 2, 4 |
| 4 | absorption | `grok` on Cursor Grok 4.6 (`units/l4/program-r4-distill-grok.result.md`) | distillate |
| 4 | checker | `checker` on Cursor Grok 4.6 (`units/l4/program-r4-checker-grok.result.md`), Luna being dark | PASS |
| 4 | objective | `reviewer` on Claude Opus 5 (`units/l4/program-objective-r4.md`), Sol being dark | FAIL 9 on the record with O1, O2, R1, R2 |

Subjective lane: not run in the audit rounds, by the round's design. The objective lane ran on Sol through the Cursor bench in rounds 1 to 3 and on the Opus `reviewer` in round 4 after the Cursor account's usage limit darkened the API models; the checker moved from Luna to Grok 4.6 for the same reason.

Fix round 1, a Sol writer (`units/l4/program-fix1-sol-result.md`): six isolated failing-first controls, the presence guard's setup, one `@throws` row per code, the temporal `new` sentences, the transcription's `finally`, the guide's tally sentence. Fix round 2, a Sol writer (`units/l4/program-fix2-sol-result.md`): every `@throws` row in the "Thrown when" form, the report's inflection sweep and per-row sweeps, the refreshed pointers, the six prose sites (folding the program prose follow-on). Fix round 3, an Opus `implementer` (`units/l4/program-fix3-opus-result.md`): the overload notes moved out of public TSDoc into single-line comments, the whole TSDoc surface swept against `.claude/rules/typescript.md` § Comments and API documentation with a bullet-by-sites table (three rounds had each found a new form defect through a new door), and the destroy-count case calling `destroy` twice with red `1 failed, 84 passed` and green `85 passed` under one command. Fix round 4, a Sonnet `builder`, record only (`units/l4/program-fix4-sonnet-result.md`): the report's pointers re-derived from the final tree, the `src/core/factories.ts` row, the regenerated diffstat, the counts deleted. No round-5 lane ran: round 4's objective lane confirmed every tree conjunct and refuted the record alone, which the builder closed from the tree.

## Rulings

- Rounds 1 to 3 on claims 2 and 4: closed by fix rounds 1 to 3; round 4 confirms both on the tree and attacked the closures at every entry point the rule reaches.
- Round 2 claims 3 and 9, round 4 claim 9: the report's records, closed by fix rounds 2 and 4.
- Round 1 checker F-1 to F-7 and round 2 objective O1 to O6: the prose sites folded into fix round 2, closing the program prose follow-on before landing (`ledgers/followons.md`).
- program-obj-9 stays `noop`, EXEMPT by the refuter's ruling: the group-key collapse is a documented limit, and reopening it changes `AggregateGroup.key` in its own breaking unit.
- Round 4 O1: the report's § Gates chain predates the final tree; the landing's deciding run executes the full chain on it. O2: the report's counts deleted by fix round 4.
- Round 4 R1 (`@src/core` in the guide tagline) and R2 (imperative Surface and helper-table descriptions): next-matrix rows for program (`ledgers/followons.md`).
- Breaking rows (`STATUS_PRECEDENCE`, `ProgramManagerInterface.size` → `count`, `by` → `partition`, `buildNotices` and `buildLimits` → `*Determinations`, `tallyProgram` → `tallySubject`): no fleet consumer; the bump ruling carries them for the registry's consumers.

## Structural claims

Claim 8's gate reading is NOT-EVIDENCED by every read-only lane and settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/program`, recorded in `units/land-program.log.txt` and `units/conform-program.audit.txt`, and the landing commit named in the state table.

## Terminal

PASS (each round's refutations closed by the fix round that followed; round 4's checker and objective confirm the tree); landed as be4e5a3 with the full chain green and the offline audit clean.
