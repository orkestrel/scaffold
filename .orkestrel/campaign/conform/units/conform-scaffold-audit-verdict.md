# Audit verdict: unit conform-scaffold

Subject: the uncommitted unit in `/home/user/scaffold`, the orchestrator's own checkout (brief `briefs/conform-scaffold-brief.md` with its scope amendment, audit brief `briefs/conform-scaffold-audit-brief.md`, fix briefs `briefs/conform-scaffold-fix1-brief.md` and `briefs/conform-scaffold-fix2-brief.md`, report `reports/conform-scaffold-report.md`, evidence `units/conform-scaffold.diff.txt` and `units/conform-scaffold.status.txt`, proofs under `/home/user/work/evidence/scaffold-proofs/`), implemented by a direct Opus `implementer` (`units/l3/scaffold-implement-direct.md`) from the Luna-reconciled rulings (`units/l3/scaffold-reconcile-luna.md`), with the Orchestrator's adoption of guide's renamed `fenceImports` and `missingSymbols` in `tests/guides.test.ts` and its `host.json` regeneration read as the unit's.

## Lanes

| Round | Lane | Role, engine | Terminal |
| --- | --- | --- | --- |
| 1 | absorption | `grok` on GPT-5.6 Luna (`units/l3/scaffold-r1-distill-luna.result.md`) | distillate |
| 1 | checker | `checker` on GPT-5.6 Luna (`units/l3/scaffold-r1-checker-luna.result.md`) | FAIL 7 (`host.json` outside Owned) |
| 1 | objective | `reviewer` on Claude Opus 5, the recorded substitution for the dark Sol bench (`units/l3/scaffold-objective-r1.md`) | FAIL 2, 4 with O1 to O3, R1 to R3 |
| 2 | absorption | `grok` on GPT-5.6 Luna (`units/l3/scaffold-r2-distill-luna.result.md`) | distillate |
| 2 | checker | `checker` on GPT-5.6 Luna (`units/l3/scaffold-r2-checker-luna.result.md`) | PASS |
| 2 | objective | GPT-5.6 Sol through the Cursor bench, read-only (`units/l3/scaffold-objective-r2-sol.md`) | FAIL 2 with O1, R1, R2 |
| 3 | absorption | `grok` on Cursor Grok 4.6 (`units/l3/scaffold-r3-distill-grok.result.md`) | distillate |
| 3 | checker | `checker` on GPT-5.6 Luna (`units/l3/scaffold-r3-checker-luna.result.md`) | FAIL 7 (the round-1 scope ruling, restated) |
| 3 | objective | GPT-5.6 Sol through the Cursor bench, read-only (`units/l3/scaffold-objective-r3-sol.md`) | FAIL 3, 9 on the record, R1 |

Subjective lane: not run in the audit rounds, by the round's design. Round 1's objective lane ran on Opus as the recorded substitution; from round 2 the objective lane runs on Sol through the Cursor bench, and round 3's absorption ran on Grok 4.6 after the bench came back.

Fix round 1, Orchestrator-owned (`briefs/conform-scaffold-fix1-brief.md`): `README.md` reflowed, the vendored-set sentence named by kind, the scaffold-subj-1 sweep row added, the retained result's statement about `documentation.md` corrected to the harness-appended reading, `host.json` ruled the generated inventory. Fix round 2, a Sol writer (`briefs/conform-scaffold-fix2-brief.md`, `units/l3/scaffold-fix2-sol-result.md`): each target carries the paths it selects, the policy register, proof, and plugin named separately at the README and both guide passages, the `HOST_PATHS` TSDoc's universal sentence replaced; the Orchestrator aligned the TSDoc's member list afterwards. Fix round 3, Orchestrator-owned and record-only (report § Fix round 3): the adopted-name sweep row and the refreshed pointers, and R1 answered by one phrase in the `HOST_PATHS` TSDoc ("the bench and MCP wiring"). No round-4 lane ran: fix round 3 changed the report and one TSDoc phrase, and the round-3 objective lane confirmed every tree conjunct.

## Rulings

- Rounds 1 and 3, claim 7 (the checkers): `host.json` is the generated inventory `build:inventory` rewrites because `guides/scaffold.md` is a `HOST_PATHS` member, so the landing's `build` regenerates it last and stages it; `.orkestrel/**` is the campaign's record and outside the unit. The brief's amendment carries both.
- Round 1, claim 2 (the reflow) and claim 4 (the sweep row): closed by fix round 1. Round 1 R1 (the set's membership) and round 2 claim 2 (the selection and the three policy kinds): closed by fix round 2, confirmed by round 3's objective lane. Round 2 O1 and R2: the TSDoc twin, owned by fix round 2 and aligned by the Orchestrator.
- Round 1 O1: the retained result's statement was corrected to what the sweep shows (the harness appends its auto-mode note to loaded rule content; the file carries none). O2: `units/l3/scaffold-implement-direct.md` is the unit's returned result and `reports/conform-scaffold-report.md` its report file, the retention pair every unit keeps; the report file is the audit subject. O3: `supportsMode` at collection time is an exposure `createScratch` already carries; no change.
- Round 1 R2, the fleet-wide `lint` script drift: the wave's manifest alignment step (`ledgers/followons.md`). R3, the deciding run's ordering: the landing instrument reads the status after `build`.
- Round 3, claims 3 and 9: closed on the record by fix round 3. R1: answered by the one-phrase TSDoc edit.
- Deviation against round 3: the fix rounds' pattern discipline — a `§ ?[0-9]+` sweep in server's fix round 3 reached RFC section pointers — is recorded in server's verdict, not here.

## Structural claims

Claim 8's gate reading is NOT-EVIDENCED by every read-only lane and settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/scaffold`, recorded in `units/land-scaffold.log.txt`, with `host.json` regenerated by that `build`, and the landing commit named in the state table. The vendored surface moved, so scaffold bumps at the wave and every target re-pins and runs `repair`.

## Terminal

PASS (round 1's refutations closed by fix round 1, round 2's by fix round 2, round 3's record refutations by fix round 3; the checkers' claim-7 refutations ruled by the brief's amendment), pending the deciding run at landing.
