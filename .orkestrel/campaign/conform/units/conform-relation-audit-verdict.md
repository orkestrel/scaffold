# Audit verdict: unit conform-relation

Subject: the uncommitted unit in `/home/user/fleet/relation` (brief `briefs/conform-relation-brief.md`, audit brief `briefs/conform-relation-audit-brief.md`, fix brief `briefs/conform-relation-fix1-brief.md`, report `reports/conform-relation-report.md`, evidence `units/conform-relation.diff.txt` and `units/conform-relation.status.txt`), implemented by a direct Opus `implementer` (`units/l3/relation-implement-direct.md`) on the closure staged 18:37 UTC, from the Luna-reconciled rulings (`units/l3/relation-reconcile-luna.md`: relation-subj-12 folded into relation-obj-4, relation-subj-11 into relation-obj-5, relation-subj-7 into relation-obj-6, relation-subj-10 and relation-subj-15 into relation-subj-3; relation-subj-4 and relation-subj-6 breaking with no source consumer), audited through the Grok-first pipeline.

## Lanes

| Round | Lane | Role, engine | Terminal |
| --- | --- | --- | --- |
| 1 | absorption | `grok` on GPT-5.6 Luna (`units/l3/relation-r1-distill-luna.result.md`) | distillate |
| 1 | checker | `checker` on GPT-5.6 Luna (`units/l3/relation-r1-checker-luna.result.md`) | PASS; one referral |
| 1 | objective | `reviewer` on Claude Opus 5, the recorded substitution for the dark Sol bench, reading the distillate (`units/l3/relation-objective-r1.md`) | PASS; F1 to F3; R1 to R3 |
| 2 | checker | `checker` on GPT-5.6 Luna (`units/l3/relation-r2-checker-luna.result.md`), after fix round 1 | PASS |

Subjective lane: not run in the audit rounds, by the round's design. The Sol bench is dark this session; Opus holds the objective lane as the recorded substitution. Absorption and the checkers ran on GPT-5.6 Luna, the tedious-work ladder's second rung. The round-2 objective lane did not run: fix round 1 changed test shape in two files on the objective lane's own prescription, and the round-2 checker read the tree with it in place.

Fix round 1, a `builder` on Claude Sonnet (`units/l3/relation-fix1-result.md`): the three parsed descriptors in `tests/src/core/helpers.test.ts` bind `unknown`, the wrong-typed-member throw case gives way to the guard's refusal (the `resolveRelation` signature admits no wrong-typed member) and an empty-descriptor throw case, the unused `Relation` import is dropped, the guard's member-type check was planted out and captured red and green with `src/core/validators.ts` restored byte for byte, and the `§` sweep row states the pattern that proves the old form gone beside the retained named citations.

## Rulings

- R1: relation-subj-7's amendment (folded into relation-obj-6) asks for `@param` rows beside the class `@example`; the unit documented the constructor parameters on the constructor, where TSDoc reads a parameter. Satisfied.
- R2: how a test drives a typed API with input the type forbids without `as`, `any`, or a mock — bind the parse `unknown`, prove the refusal at the guard, reach the throwing call only with a value the signature admits — is a sentence for `.claude/rules/tests.md`, a scaffold host-inventory row (`ledgers/followons.md`).
- F3: `guarantee` at `guides/relation.md:339`, `:356`, and `tests/src/core/Model.test.ts:261` predates the round; the relation-prose follow-on.
- The checker's referrals: the `guarantee` sentences' behaviour is pinned by `tests/src/core/Model.test.ts:349` and `:362`, and the follow-on rewrites the word; the `isBrowserVuePath` helper in workflow's and program's `tests/setup.ts` is each of those units' fleet-F1 row.

## Structural claims

Claim 8's gate reading is NOT-EVIDENCED by every read-only lane and settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/relation`, recorded in `units/land-conform.log` and `units/conform-relation.audit.txt`, and the landing commit named in the state table.

## Terminal

PASS (round 1 checker; round 1 objective; F1 and F2 closed by fix round 1; round 2 checker), the deciding run at landing read every gate exit 0 (landed as relation `5914505`).
