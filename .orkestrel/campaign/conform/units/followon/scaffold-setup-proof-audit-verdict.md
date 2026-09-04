# Audit verdict: follow-on unit scaffold-setup-proof

Subject: the canon repository's own `setup` proofs (brief `briefs/followon/scaffold-setup-proof-brief.md`, fix brief `briefs/followon/scaffold-setup-proof-fix1-brief.md`, report `reports/followon/scaffold-setup-proof-report.md`, scout distillate `units/followon/scaffold-setup-proof-scout-grok.result.md`, evidence `units/followon/followon-scaffold-setup-proof.diff.txt` and `.status.txt` from the landing commit `1da0a353`, captures under `units/followon/scaffold-setup-proof/`), implemented by an Opus `implementer` (`units/followon/scaffold-setup-proof-opus-result.md`) from the Grok scout's export map; the one-line parity patch for `tests/src/core/compilers.test.ts` was the unit's exact reported patch, applied by the Orchestrator and proved green alone before the landing.

## Lanes

| Round | Lane | Role, engine | Terminal |
| --- | --- | --- | --- |
| 1 | checker | `checker` on Cursor Grok 4.6 (`units/followon/scaffold-setup-proof-checker-grok.result.md`), Luna being dark | FAIL 1, 9 |
| 1 | objective | `reviewer` on Claude Opus 5 (`units/followon/scaffold-setup-proof-objective-r1.md`), Sol being dark | FAIL 1, 5, 9 with O-1 to O-3, R-1 |

Subjective lane: not run, by the round's design for a follow-on. Both lanes ran on substitute engines, the Cursor account's usage limit having darkened Sol and Luna; both were blind to each other (the objective brief's reference to the checker's result was struck before dispatch). The round ran on the landed commit's diff rather than on an uncommitted tree, the unit having landed at 10:07 UTC before its round was briefed.

Fix round 1, a Sonnet `builder` (`units/followon/scaffold-setup-proof-fix1-sonnet-result.md`): the held-connection case's body wrapped in a `try` whose `finally` destroys the loopback server; the scratch-prefix case asserting the constant's own property (no path separator; the allocated directory's basename starts with it) with a planted separator read red (9 failed of 69, `fix1-prefix-planted-red.txt`) and green restored (`fix1-prefix-green.txt`); the report's coverage table re-derived with each case's title beside its line; the report's counted and positional sentences rewritten.

## Rulings

- Claim 1 (both lanes): the coverage table's `tests/setupServer.test.ts` rows cited lines 11 short of their cases; closed by fix round 1, which re-derives every row and adopts R-1 (the case title beside the line, so the next edit cannot silently drift the record).
- Claim 5 (objective): one loopback listener released only on the happy path; closed by fix round 1's `finally`, verified by the Orchestrator on the tree.
- Claim 9 (both lanes): the report's counts and one `below` pointer; closed by fix round 1. The report's `:108` and `:160` are permitted: each states a rule or a behaviour and names no list item by position.
- O-1: the retained result did not carry the report; the report is retained under `units/followon/` and `reports/followon/` after fix round 1. O-2: the tautological prefix case; closed by fix round 1. O-3: the `setup` project's git children run under the default per-test budget with a measured margin (`setup-green.txt`, 1.98 s for the project); an observation, no change.
- The landing's own `scaffold audit --offline` step exited 127 (no `node_modules/.bin/scaffold` link in the canon checkout); the `1d0` reading rests on the unit's captures through `node dist/bin/main.js audit --offline`, and the canon rows the audit reports (`AGENTS.md` and `CLAUDE.md` stale, `.codex/**` and `.cursor/**` foreign) are the canon repository's own shape, not a gate.

## Structural claims

Claim 8's gate reading is NOT-EVIDENCED by every read-only lane and settled on the Orchestrator's deciding runs: the landing at `1da0a353` (`units/followon/land-scaffold-setup-proof.log.txt`: `format:check`, `lint:check`, `check`, `build`, `test` exit 0) and the fix round's landing (`units/followon/land-scaffold-setup-proof-fix1.log.txt`).

## Terminal

PASS (round 1's refutations closed by fix round 1, verified on the tree and the captures), pending the fix round's deciding run at landing.
