# Audit verdict: unit conform-interpret

Subject: the uncommitted unit in `/home/user/fleet/interpret` (brief `briefs/conform-interpret-brief.md`, audit brief `briefs/conform-interpret-audit-brief.md`, fix brief `briefs/conform-interpret-fix1-brief.md`, report `reports/conform-interpret-report.md`, evidence `units/conform-interpret.diff.txt` and `units/conform-interpret.status.txt`), implemented by a direct Opus `implementer` (`units/l3/interpret-implement-direct.md`) on the closure staged 18:36 UTC with reason's landed tip — stopped by the API spend limit at its gate chain and resumed at 19:11 UTC on the same tree — from the Luna-reconciled rulings (`units/l3/interpret-reconcile-luna.md`, `complete` and `describeSubject` breaking with brief as the one consumer of `complete`), audited through the Grok-first pipeline.

## Lanes

| Round | Lane | Role, engine | Terminal |
| --- | --- | --- | --- |
| 1 | absorption | `grok` on GPT-5.6 Luna (`units/l3/interpret-r1-distill-luna.result.md`) | distillate |
| 1 | checker | `checker` on GPT-5.6 Luna (`units/l3/interpret-r1-checker-luna.result.md`) | FAIL 3 on `complete` hits, ruled absence assertions and the English adjective; F-VIA, F-CITATIONS, F-FENCE, F-STAGES carried |
| 1 | objective | `reviewer` on Claude Opus 5, the recorded substitution for the dark Sol bench, reading the distillate (`units/l3/interpret-objective-r1.md`) | FAIL 4 on the record; F-1 |
| 2 | checker | `checker` on GPT-5.6 Luna (`units/l3/interpret-r2-checker-luna.result.md`), after fix round 1 | PASS |

Subjective lane: not run in the audit rounds, by the round's design. The Sol bench is dark this session; Opus holds the objective lane as the recorded substitution. Absorption and the checkers ran on GPT-5.6 Luna, the tedious-work ladder's second rung. The round-2 objective lane did not run: fix round 1 changed the report alone and no file in the tree.

Fix round 1, a `builder` on Claude Sonnet (`units/l3/interpret-fix1-result.md`), report-only: the interpret-obj-6 sweep row and the `complete` sweep's full population with its inflection pass ruled by sense.

## Rulings

- Round 1, claim 3: `expect(Object.hasOwn(x, 'complete')).toBe(false)` asserts the member's absence, and the derivation sentence is the row's own repair; a removed member whose name is an English word never reads empty under a word-boundary sweep, and the claim is ruled on its operative sense.
- The unit's findings outside its rows — `via` and `e.g.` in the tests, `design §N` and `ledger N` citations, the `as const` in the `scoreTemplate` fence, and the fixed-cardinality `stages` prose at `src/core/types.ts:278-279`, `guides/interpret.md:65`, and `:77` — are the interpret prose follow-on (`ledgers/followons.md`).
- Brief's consumer patches for the removed `complete` member ride brief's L4 unit brief; the `@orkestrel/interpret` bump is the wave's.

## Structural claims

Claim 8's gate reading is NOT-EVIDENCED by every read-only lane and settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/interpret`, recorded in `units/land-conform.log` and `units/conform-interpret.audit.txt`, and the landing commit named in the state table.

## Terminal

PASS (round 1 checker's refutation ruled; round 1 objective's record refutation closed by fix round 1; round 2 checker), the deciding run at landing read every gate exit 0 (landed as interpret `b2cd68e`).
