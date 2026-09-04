# Audit verdict: unit conform-browser

Subject: the uncommitted unit in `/home/user/fleet/browser` (brief `briefs/conform-browser-brief.md`, audit brief `briefs/conform-browser-audit-brief.md`, fix brief `briefs/conform-browser-fix1-brief.md`, report `reports/conform-browser-report.md`, evidence `units/conform-browser.diff.txt` and `units/conform-browser.status.txt`), implemented by a direct Opus `implementer` (`units/l3/browser-implement-direct.md`) on the closure staged 18:36 UTC — stopped by the API spend limit at 19:0x UTC and resumed at 19:11 on its tree — from the Luna-reconciled rulings (`units/l3/browser-reconcile-luna.md`: browser-obj-8, browser-obj-9, and browser-subj-15 ruled exceptions; six published helpers renamed or removed with no source consumer), audited through the Grok-first pipeline.

## Lanes

| Round | Lane | Role, engine | Terminal |
| --- | --- | --- | --- |
| 1 | absorption | `grok` on GPT-5.6 Luna (`units/l3/browser-r1-distill-luna.result.md`) | distillate |
| 1 | checker | `checker` on GPT-5.6 Luna (`units/l3/browser-r1-checker-luna.result.md`) | PASS |
| 1 | objective | `reviewer` on Claude Opus 5, the recorded substitution for the dark Sol bench, reading the distillate (`units/l3/browser-objective-r1.md`) | PASS; F1 to F3, R1 to R3 |

Subjective lane: not run in the audit round, by the round's design. The Sol bench is dark this session; Opus holds the objective lane as the recorded substitution. Absorption and the checker ran on GPT-5.6 Luna, the tedious-work ladder's second rung.

Fix round 1, a `builder` on Claude Sonnet (`units/l3/browser-fix1-result.md`), report-only: the `Date.now()` and `localhost` sweep rows with every hit ruled, the controls sentence stating why browser-obj-2 and browser-obj-3 admit no red, the `windowsRoots` row over the widened population, and the moved case's title rename recorded as an ancillary decision. No round-2 lane ran: the fix round changed the report alone and no file in the tree, and both round-1 lanes passed every claim.

## Rulings

- R1: `createAttachedPage` and `readCDPParams` entered `tests/setup.ts` under browser-obj-4 with green-only proofs; browser-obj-4 is a placement row carried by the mirror-inventory sweep, and the shared fixtures it needed are its ancillary decision, recorded.
- R2: the untested `buildInstallPaths`, `buildWindowsRoots`, and `buildStoreBases` predate the round; the server-discovery capability's row for the next matrix (`ledgers/followons.md`).
- R3: the vendored `service` project comment names `scripts/service.sh`, which the package does not carry; a scaffold host-inventory row.
- The unit's `service` project block matches the scaffold plan byte for byte; its `setupFiles` follow the vendored `tests/config.test.ts` canon, a recorded correction over the finder's list.
- The `via` in a `tests/setupServer.ts` TSDoc block is the browser-prose follow-on (`ledgers/followons.md`).

## Structural claims

Claim 8's gate reading is NOT-EVIDENCED by every read-only lane and settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/browser`, recorded in `units/land-conform.log` and `units/conform-browser.audit.txt`, and the landing commit named in the state table. `test:service` ran against a real Chromium inside the unit's own exec (14 passed) and is not in the `test` chain; the wave's `prepublishOnly` runs it.

## Terminal

PASS (round 1 checker; round 1 objective; record findings closed by fix round 1), the deciding run at landing read every gate exit 0 (landed as browser `81a580c`).
