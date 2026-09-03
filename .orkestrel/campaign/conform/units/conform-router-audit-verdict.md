# Audit verdict: unit conform-router

Subject: the uncommitted unit in `/home/user/fleet/router` (brief `briefs/conform-router-brief.md`, audit brief `briefs/conform-router-audit-brief.md`, fix briefs `briefs/conform-router-fix1-brief.md`, `-fix2-brief.md`, and `-fix3-brief.md`, report `reports/conform-router-report.md`, evidence `units/conform-router.diff.txt` and `units/conform-router.status.txt`), implemented by a direct Opus `implementer` (`units/l2b/router-implement-direct.md`) on the L2 closure — router was found unplanned at 18:22 UTC and run as the last L2 unit — from the Luna-reconciled rulings (`units/l3/router-reconcile-luna.md`: router-subj-13 folded into router-subj-19; router-obj-1, router-subj-1, and router-subj-2 breaking with no source consumer), audited through the Grok-first pipeline.

## Lanes

| Round | Lane | Role, engine | Terminal |
| --- | --- | --- | --- |
| 1 | absorption | `grok` on GPT-5.6 Luna (`units/l2b/router-r1-distill-luna.result.md`) | distillate |
| 1 | checker | `checker` on GPT-5.6 Luna (`units/l2b/router-r1-checker-luna.result.md`) | FAIL 5 on `AGENTS §` citations no row owned |
| 1 | objective | `reviewer` on Claude Opus 5, the recorded substitution for the dark Sol bench, reading the distillate (`units/l2b/router-objective-r1.md`) | FAIL 4, 5 with F1, F2 |
| 2 | absorption | `grok` on GPT-5.6 Luna (`units/l2b/router-r2-distill-luna.result.md`), after fix round 1 | distillate |
| 2 | checker | `checker` on GPT-5.6 Luna (`units/l2b/router-r2-checker-luna.result.md`) | PASS |
| 2 | objective | `reviewer` on Claude Opus 5 (`units/l2b/router-objective-r2.md`) | FAIL 4 on a dropped permitted hit; F1 to F5; R1, R2 |
| 3 | checker | `checker` on GPT-5.6 Luna (`units/l2b/router-r3-checker-luna.result.md`), after fix rounds 2 and 3 | PASS |

Subjective lane: not run in the audit rounds, by the round's design. The Sol bench is dark this session; Opus holds the objective lane as the recorded substitution. Absorption and the checkers ran on GPT-5.6 Luna, the tedious-work ladder's second rung. The round-3 objective lane did not run: fix rounds 2 and 3 changed prose sites alone (comments, a fence comment, doc sentences) and the round-3 checker read every one against the tree; the objective lane's own findings named the exact replacement text.

Fix round 1, a `builder` on Claude Sonnet (`units/l2b/router-fix1-result.md`): every `AGENTS §N` citation stated inline or deleted, the `below` pointer at `src/browser/types.ts:65`, the test substitutions, the two sweep rows. Fix round 2 (`units/l2b/router-fix2-result.md`): the two `below` pointers the unit itself added, the temporal `once` in the hash-mode fence comment, the sweep row listing every hit by sense, the report's file accounting; its widened sweep found ten more banned-sense sites. Fix round 3 (`units/l2b/router-fix3-result.md`): those ten sites, and the one it found outside its Owned files — `tests/setup.test.ts:20` — applied by the Orchestrator as the exact returned patch and recorded in the report.

## Rulings

- The guard-message rewrite in router-obj-1 is ratified on the abort precedent.
- Round 2, R1: the derived-`OPTIONS` `match` payload now emits the registered pattern where it emitted the request pathname; the contract at `src/core/types.ts:497-499` already promised the pattern, so this is a defect fix, not a breaking entry; the landing message states it as a behaviour correction.
- Round 2, R2: the fix-round briefs and the round-1 lane records sit under `.orkestrel/campaign/conform/`, which the report cites by relative path; no retention gap.
- Round 2, F4 (the `U1`, `U3`, `U6` unit citations) and F5 (`three faces` at `tests/guides.test.ts:38`) predate the round and are the router-prose follow-on (`ledgers/followons.md`).
- The offline audit's one drift row, `configs/browsers.ts` stale, is the vendored baseline on scaffold 0.0.60 that the landing repairs with `scaffold repair` and a manifest restore, as database's and console's landings did.

## Structural claims

Claim 8's gate reading is NOT-EVIDENCED by every read-only lane and settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/router`, recorded in `units/land-conform.log` and `units/conform-router.audit.txt`, and the landing commit named in the state table.

## Terminal

PASS (round 1's refutations closed by fix round 1; round 2 checker; round 2 objective's refutation and findings closed by fix rounds 2 and 3; round 3 checker), pending the deciding run at landing.
