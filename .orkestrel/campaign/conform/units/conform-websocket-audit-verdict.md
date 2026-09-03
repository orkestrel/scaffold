# Audit verdict: unit conform-websocket

Subject: the uncommitted unit in `/home/user/fleet/websocket` (brief `briefs/conform-websocket-brief.md`, audit brief `briefs/conform-websocket-audit-brief.md`, fix briefs `briefs/conform-websocket-fix1-brief.md` and `briefs/conform-websocket-fix2-brief.md`, report `reports/conform-websocket-report.md`, evidence `units/conform-websocket.diff.txt` and `units/conform-websocket.status.txt`), implemented by a direct Opus `implementer` (`units/l2b/websocket-implement-direct.md`) after workflow `wf_075a2bf5-dad` (L2b) was stopped, audited through the Grok-first pipeline.

## Lanes

| Round | Lane | Role, engine | Terminal |
| --- | --- | --- | --- |
| 1 | absorption | `grok` on GPT-5.6 Luna (`units/l2b/websocket-r1-distillate-luna.md`); the first launch, from the old launcher, replaced the staged closure (the vendored SessionStart hook, session ledger), re-staged 16:50 UTC | distillate |
| 1 | checker | `checker` on GPT-5.6 Luna (`units/l2b/websocket-r1-checker-luna.md`) | PASS; F1 to F4 (prose sites) |
| 1 | objective | `reviewer` on Claude Opus 5, the recorded substitution for the dark Sol bench, reading the distillate (`units/l2b/websocket-objective-r1.md`) | FAIL 4 (one control count false against its file); F1 (a header comment claiming a purity the helpers no longer have) |
| 2 | objective | `reviewer` on Claude Opus 5 (`units/l2b/websocket-objective-r2.md`) | PASS; F1, F2 on the record |
| 2 | checker | `checker` on GPT-5.6 Luna (`units/l2b/websocket-r2-checker-luna.md`) | PASS |

Subjective lane: not run in the audit rounds, by the round's design. The Sol bench is dark this session; Opus holds the objective lane as the recorded substitution. Absorption and the checkers ran on GPT-5.6 Luna, the tedious-work ladder's second rung, while Grok 4.6's quota was spent (session ledger).

Fix rounds: round 1 (`builder` on Claude Sonnet, `units/l2b/websocket-fix1-result.md`) corrected the `websocket-obj-7` integration control to the count its capture carries and re-read every other count, rewrote the header comments at `tests/setup.ts:39-42` and `tests/integration.test.ts:3-4` to claim only what the helpers carry, repaired the `should`, `currently`, `now`, and `new` sites, and recorded the sweep; round 2 (`units/l2b/websocket-fix2-result.md`) dropped the last `pure` at `tests/setup.ts:3` and corrected two report citations.

## Rulings on the referrals

- The `guides/websocket.md` mirrors in mcp and browser carry the old constant names and the old parser row: the byte copy at those consumers' landings.
- The fleet-shared `tests/guides.test.ts` drop-in wording (`constants below`, `second assertion below`): scaffold's L3 unit, already carried from html's round 4.
- The `obj-7-control-integration.txt` capture carries a NUL byte from the 2 MB payload case, so a directory-wide ripgrep skips it as binary: the capture stays as the runner wrote it, and a sweep over that directory runs per file; recorded here so the next reader does not re-derive it.

## Structural claims

Claim 4's counts are read from the capture files under `/home/user/work/evidence/websocket-proofs/`; claim 8's gate reading is NOT-EVIDENCED by every read-only lane and settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/websocket`, recorded in `units/land-conform.log` and `units/conform-websocket.audit.txt`, and the landing commit named in the state table.

## Terminal

PASS (round 2, objective and checker), accepted on the deciding run at landing: every gate exit 0 and the audit's summary clean beside its integration-seed advisory, landed as `472381f`.
