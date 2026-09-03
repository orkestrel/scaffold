# Audit verdict: unit conform-console

Subject: the uncommitted unit in `/home/user/fleet/console` (brief `briefs/conform-console-brief.md`, audit brief `briefs/conform-console-audit-brief.md`, fix briefs `briefs/conform-console-fix1-brief.md` to `conform-console-fix4-brief.md`, report `reports/conform-console-report.md`, evidence `units/conform-console.diff.txt` and `units/conform-console.status.txt`), workflow `wf_4b849c0d-459` (L2a) for the reconcile and implement stages, then the Grok-first pipeline.

## Lanes

| Round | Lane | Role, engine | Terminal |
| --- | --- | --- | --- |
| 1 | absorption | `grok` on GPT-5.6 Luna (`units/l2a/console-r1-distillate-luna.md`); the lane's launch replaced the staged closure (the vendored SessionStart hook, session ledger), re-staged 15:13 UTC | distillate |
| 1 | checker | `checker` on Claude Sonnet (the workflow's node) | PASS |
| 1 | objective | `reviewer` on Claude Opus 5, the recorded substitution for the dark Sol bench, reading the distillate (`units/l2a/console-objective-r1.md`) | FAIL 2, 3, 4, 5; F1, F2 |
| 2 | absorption | `grok` on GPT-5.6 Luna (`units/l2a/console-r2-distillate-luna.md`) | distillate |
| 2 | checker | `checker` on GPT-5.6 Luna (`units/l2a/console-r2-checker-luna.md`) | PASS |
| 2 | objective | `reviewer` on Claude Opus 5, reading the distillate (`units/l2a/console-objective-r2.md`) | FAIL 3 (five prose sites carrying the old target words; a sweep pattern that could not reach prose) |
| 3 | checker | `checker` on GPT-5.6 Luna (`units/l2a/console-r3-checker-luna.md`) | PASS |
| 3 | objective | `reviewer` on Claude Opus 5 (`units/l2a/console-objective-r3.md`) | FAIL 3 (one title); F3-1 to F3-3; R3-A, R3-B |
| 4 | checker | `checker` on GPT-5.6 Luna (`units/l2a/console-r4-checker-luna.md`) | PASS |
| 4 | objective | `reviewer` on Claude Opus 5 (`units/l2a/console-objective-r4.md`) | FAIL 3 (one comment); F4-1, F4-2; R4-A, R4-B |
| 5 | checker | `checker` on GPT-5.6 Luna (`units/l2a/console-r5-checker-luna.md`), the audit of record for claim 3 after the Orchestrator ruled the full hit list | PASS |

Subjective lane: not run in the audit rounds, by the round's design. The Sol bench is dark this session; Opus holds the objective lane as the recorded substitution. Absorption and the later checkers ran on GPT-5.6 Luna, the tedious-work ladder's second rung, while Grok 4.6's quota was spent (session ledger).

Fix rounds: round 1 (Opus `implementer`, `units/l2a/console-fix1-result.md`) transcribed and executed the flagship fences, recorded the sweeps, added `normalizeVisible`, and closed the `i.e.` sites, the § Breaking row, and the split example; rounds 2 to 4 (`builder` on Claude Sonnet, `units/l2a/console-fix2-result.md` to `console-fix4-result.md`) replaced the old target words at every declaration, comment, title, and example the objective lanes named, made the `selectWriter` example the server sink's folded set with its `warn` line, and made the sweep capture the Grep tool's own output. Round 5 broke the one-site-per-round loop: the Orchestrator read the full `\b(out|err)\b` hit list itself and ruled every remaining hit permitted (a local binding, a comment or value referring to it, ordinary English, or the generic `WriterSet` sample strings), so the checker alone audited the fourth fix.

## Rulings on the referrals

- R3-A (the round-2 objective verdict was not on disk): retained as `units/l2a/console-objective-r2.md` before landing; every later round's verdict is retained on return.
- R3-B and R4-A (further titles and one comment naming the targets with the old words; the fix-round scope): every site landed on one vocabulary in fix rounds 3 and 4.
- F4-1 (the example's `warn` branch): the line added in fix round 4.
- Round 1's R3 and R4 (writing-rule hits in `README.md` and test titles; `@src/core` in published TSDoc examples): `briefs/followon/console-prose-brief.md`, a `builder` unit after landing, as `ledgers/followons.md` records.
- `configs/browsers.ts` stale in the offline audit: the vendored file's refresh by `scaffold repair` at landing, with the manifest floors restored.

## Structural claims

Claim 4's counts are read from the capture files under `/home/user/work/evidence/console-proofs/`; claim 8's gate reading is NOT-EVIDENCED by every read-only lane and settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/console`, recorded in `units/land-conform.log` and `units/conform-console.audit.txt`, and the landing commit named in the state table.

## Terminal

PASS (round 5 checker on claim 3; rounds 2 to 4 objective on every other claim), accepted on the deciding run at landing: every gate exit 0 and the audit clean after the vendored `configs/browsers.ts` refresh, landed as `cac35cd`.
