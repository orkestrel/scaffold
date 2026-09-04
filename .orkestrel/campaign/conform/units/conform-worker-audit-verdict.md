# Audit verdict: unit conform-worker

Subject: the uncommitted unit in `/home/user/fleet/worker` (brief `briefs/conform-worker-brief.md` with its addendum, audit brief `briefs/conform-worker-audit-brief.md`, fix briefs `briefs/conform-worker-fix1-brief.md` to `conform-worker-fix4-brief.md`, report `reports/conform-worker-report.md`, evidence `units/conform-worker.diff.txt` and `units/conform-worker.status.txt`, proofs under `/home/user/work/evidence/worker-proofs/`), implemented by a direct Opus `implementer` (`units/l4/worker-implement-direct.md`) from the Luna-reconciled rulings (`units/l4/worker-reconcile-luna.md`) with queue's `QueueExecution` → `QueueContext` consumer edit taken first.

## Lanes

| Round | Lane | Role, engine | Terminal |
| --- | --- | --- | --- |
| 1 | absorption | `grok` on Cursor Grok 4.6 (`units/l4/worker-r1-distill-grok.result.md`) | distillate |
| 1 | checker | `checker` on GPT-5.6 Luna (`units/l4/worker-r1-checker-luna.result.md`) | FAIL 5 |
| 1 | objective | GPT-5.6 Sol through the Cursor bench, read-only (`units/l4/worker-objective-r1-sol.md`) | FAIL 3, 4, 5 with R1, R2 |
| 2 | absorption | `grok` on Cursor Grok 4.6 (`units/l4/worker-r2-distill-grok.result.md`) | distillate |
| 2 | checker | `checker` on Luna (`units/l4/worker-r2-checker-luna.result.md`) | PASS |
| 2 | objective | Sol through the Cursor bench (`units/l4/worker-objective-r2-sol.md`) | FAIL 2, 4 |
| 3 | absorption | `grok` on Cursor Grok 4.6 (`units/l4/worker-r3-distill-grok.result.md`) | distillate |
| 3 | checker | `checker` on Luna (`units/l4/worker-r3-checker-luna.result.md`) | FAIL 9 |
| 3 | objective | Sol through the Cursor bench (`units/l4/worker-objective-r3-sol.md`) | FAIL 4 with O1 to O3, R1, R3 |
| 4 | absorption | `grok` on Cursor Grok 4.6 (`units/l4/worker-r4-distill-grok.result.md`) | distillate |
| 4 | checker | `checker` on Cursor Grok 4.6 (`units/l4/worker-r4-checker-grok.result.md`), Luna being dark | PASS |
| 4 | objective | `reviewer` on Claude Opus 5 (`units/l4/worker-objective-r4.md`), Sol being dark | FAIL none with O1 to O4, R1 to R3 |

Subjective lane: not run in the audit rounds, by the round's design. The objective lane ran on Sol through the Cursor bench in rounds 1 to 3 and on the Opus `reviewer` in round 4 after the Cursor account's usage limit darkened the API models; the checker moved from Luna to Grok 4.6 for the same reason.

Fix round 1, a Sol writer (`units/l4/worker-fix1-sol-result.md`): isolated failing-first controls, the section citations, the nested callbacks, the `@param` rows, the report's pointers. Fix round 2, a Sol writer (`units/l4/worker-fix2-sol-result.md`): the `Default:` form, same-command greens, the worker-obj-10 ruling stated, three prose sites, the pointers. Fix round 3, an Opus `implementer` (`units/l4/worker-fix3-opus-result.md`): literal commands in the report, the regenerated inventory, the tally words, the pre-existing prose sites (`above`, `below`, temporal `now`, `guarantee`). Fix round 4, an Opus `implementer` (`units/l4/worker-fix4-opus-result.md`): the added `(§8)` deleted from `src/server/types.ts:76`, `legacy or` deleted from `src/server/handlers.ts:85`, every guide pointer in the report re-derived from the tree, and the fixtures paragraph of `guides/worker.md` stating what the test configuration does; its two observations (a `via` rewrite at `guides/worker.md:228` outside its row, and the brief's off-by-one at criterion 3) are in `ledgers/followons.md`.

## Rulings

- Round 1 claims 3, 4, 5 and checker claim 5; round 2 claims 2, 4; round 3 claim 4 and checker claim 9: closed by fix rounds 1 to 3; round 4 confirms every claim on the tree.
- worker-obj-10 (`performance.now()` for an elapsed interval) is a rule-driven rewrite with no reachable test vector: claim 4's failing-first conjunct excludes it, its evidence is the `Date\.now` sweep and the green run, and the audit brief carries that amendment from round 3.
- Round 4 O1 to O4: closed by fix round 4. O4 is ruled to state what the configuration does — the Vitest projects supply no flag, the `src:server` and `guides` suites run on Node 22.18+ and 23.6+ — and to claim nothing about an earlier Node version no run on this host can check.
- Round 4 R1 and R2: the landing's deciding run executes the full gate chain on the final tree, and the evidence is regenerated after fix round 4 before the commit. R3: the pre-existing bare `§` citations are a next-matrix row for worker (`ledgers/followons.md`).
- Round 1 R2 (consumers outside `/home/user/fleet`): recorded as unknown in `ledgers/followons.md`; the catalog names every fleet consumer.
- Breaking rows (`spawnThread` → `createThread` with optional `workerData`, `dispatch` → the barrelled `Dispatch` class, the handler context type `QueueExecution` → `QueueContext`): no fleet consumer; the bump ruling carries them for the registry's consumers.

## Structural claims

Claim 8's gate reading is NOT-EVIDENCED by every read-only lane and settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/worker`, recorded in `units/land-worker.log` and `units/conform-worker.audit.txt`, and the landing commit named in the state table.

## Terminal

PASS (each round's refutations closed by the fix round that followed; round 4's checker and objective confirm the tree), pending the deciding run at landing.
