# Audit verdict: unit conform-reason

Subject: the uncommitted unit in `/home/user/fleet/reason` (brief `briefs/conform-reason-brief.md`, audit brief `briefs/conform-reason-audit-brief.md`, fix briefs `briefs/conform-reason-fix1-brief.md` and `briefs/conform-reason-fix2-brief.md`, report `reports/conform-reason-report.md`, evidence `units/conform-reason.diff.txt` and `units/conform-reason.status.txt`), workflow `wf_4b849c0d-459` (L2a) for the reconcile and implement stages, then the Grok-first pipeline.

## Lanes

| Round | Lane | Role, engine | Terminal |
| --- | --- | --- | --- |
| 1 | absorption | `grok` on Cursor Grok 4.6 fast, then GPT-5.6 Luna after the Grok quota spent (`units/l2a/reason-r1-distillate-luna.md`) | distillate |
| 1 | objective | `reviewer` on Claude Opus 5, the recorded substitution for the dark Sol bench, reading the distillate (`units/l2a/reason-objective-r1.md`) | FAIL 4 (reason-obj-2 without a failing-first proof; the parser suite never red); F-1 to F-5; R-1 to R-3 |
| 1 | checker | `checker` on GPT-5.6 Luna (`units/l2a/reason-r1-checker-luna.md`) | PASS |
| 2 | absorption | `grok` on GPT-5.6 Luna (`units/l2a/reason-r2-distillate-luna.md`) | distillate |
| 2 | objective | `reviewer` on Claude Opus 5, reading the distillate (`units/l2a/reason-objective-r2.md`) | every claim held; F-6 to F-9 on the report; R-1 to R-3 |
| 2 | checker | `checker` on GPT-5.6 Luna (`units/l2a/reason-r2-checker-luna.md`) | PASS; F-1, F-3, F-5; R-1 to R-4 |

Subjective lane: not run in the audit rounds, by the round's design. The Sol bench is dark this session; Opus holds the objective lane as the recorded substitution. Absorption ran on GPT-5.6 Luna, the tedious-work ladder's second rung, after Grok 4.6 answered `resource_exhausted` on both model ids at 14:33 and 14:46 UTC (session ledger).

Fix rounds: round 1 (`briefs/conform-reason-fix1-brief.md`, `builder` on Claude Sonnet) captured the reason-obj-2 red (`reason-proofs/reason-obj-2-before.txt`, 1 failed) and green, planted and captured the parser control (`reason-obj-1-parsers-control.txt`, 3 failed) and its green, and closed F-1 to F-4. Round 2 (`briefs/conform-reason-fix2-brief.md`, `builder` on Claude Sonnet, `units/l2a/reason-fix2-report.md`) closed the four report findings both lanes raised: the banned count in § Shared-file patches, the four sweep blocks missing from `sweeps.txt`, the dropped Collection clause recorded under § Deviations, and the reason-obj-3 note.

## Rulings on the referrals

- R-1 (`SubjectBuilderInterface.remove` declares the id forms beside its own `clear` while the managers carry the no-argument `remove()`): a reason follow-on unit on Opus, types first, adds the `remove(): void` row or states the divergence in the interface's `@remarks`; recorded in `ledgers/followons.md`.
- R-2 (`defaults to` in `src/core/factories.ts` prose, `via` in `tests/**` titles and comments, `simplest` at `tests/setup.ts:159`): `briefs/followon/reason-prose-brief.md`, with F-5 (`tests/setup.ts:3` names an absent `setupBrowser.ts`) and the checker's R-3 ("seven" managers at `guides/reason.md:86-89` and `src/core/factories.ts:279`, a count over a growable set, ruled under `AGENTS.md` § Writing).
- R-4 (the `guides/reason.md` mirrors in program, interpret, rater, qualifier, and brief): the byte copy at each consumer's landing.
- Round 1's R-3 (an instruction injected into a tool result, refused by the writer): a harness finding in the session ledger.

## Structural claims

Claim 4's counts are read from the capture files, not the report's table; claim 8's gate reading is NOT-EVIDENCED by every read-only lane and settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/reason`, recorded in `units/land-conform.log` and `units/conform-reason.audit.txt`, and the landing commit named in the state table.

## Terminal

PASS (round 2, objective and checker), the deciding run at landing read every gate exit 0 (landed as reason `803e4f6`).
