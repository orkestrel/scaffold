# Remaining-cell driver preparation

The temporary driver is prepared for root review and native verifier checks. Syntax checks passed. Every allowed dry invocation returned exit 0 and preserved the watched measured output, log, and sequence paths. The invalid-cell control returned exit 1 without stdout, inference, or new driver artifacts. No live use occurred.

All commands ran on Windows PowerShell with explicit cwd `C:/Users/mikes/WebstormProjects/scaffold`, using Node v24.21.0. The verifier owns released HEAD measurement separately; the driver reports only the actual frozen source/build seals. This unit ran no Git command. The full emitted `readBuild` and `readFrozen` readers validated custody during each dry invocation. Build manifest SHA256 is `d361e9d8ec607ae7e21bcee966904effa2be9a0ccaa972eef8d25b540e977c54`. Deployment SHA256 is `c20472169bc4a0767cfa9882d7674825d84fa4be338b9bab1de386425c743eed`.

The driver composes the frozen emitted resource, full, and pilot operators. Resource validation uses `readResource`. Full and pilot validation composes the existing matrix validators, `readAttempt`, `verifyMatrixFeasibility`, `readExecution`, and the emitted bound, pair, and exposure helpers. Resource refusal ends the cell. Valid full refusal permits the released strict pilot. Operational exits or failed custody/evidence validation stop dependent work. Each original stage result remains in a create-only sequence receipt; a measured refusal remains a nonzero driver result even if a subsequent permitted stage succeeds. A reader fault after operator exit 0 or 3 returns operational exit 1, retaining the original exit in the receipt. Other operational exits, including 124, are preserved. Closure revalidates frozen custody.

Root explicitly authorized the fit seam choice: dry preflight hashes the released fit bytes and describes prospective operator admission. It makes no independent accepted-fit claim. The emitted operator owns strict admission, and post-pilot `readExecution` validates the actual execution. Released fit hashes are g2 `515ba2af23418808f425177a534d40c36c5f57943ee5697da6e1a3baf5f53d8f` and q4 `f694c01ffd924c8c59a17a3e190c4a2e90f4bcc89b4c82024a281f4954f1be56`. The q2 and g4 cells receive resource and full only. Exploratory development stays a separate root decision.

The exact validation commands were:

```text
node --check C:/Users/mikes/WebstormProjects/scaffold/tmp/units/aggregate-final-cell-driver.ts
node --check C:/Users/mikes/WebstormProjects/scaffold/tmp/units/aggregate-final-cell-driver-validation.ts
node C:/Users/mikes/WebstormProjects/scaffold/tmp/units/aggregate-final-cell-driver-validation.ts
node C:/Users/mikes/WebstormProjects/scaffold/tmp/units/aggregate-final-cell-driver.ts q9-think0
node --check C:/Users/mikes/WebstormProjects/scaffold/tmp/units/aggregate-final-cell-driver-validation.ts
node C:/Users/mikes/WebstormProjects/scaffold/tmp/units/aggregate-final-cell-driver-validation.ts --negative
node --check C:/Users/mikes/WebstormProjects/scaffold/tmp/units/aggregate-final-cell-driver.ts
node --check C:/Users/mikes/WebstormProjects/scaffold/tmp/units/aggregate-final-cell-driver-validation.ts
node C:/Users/mikes/WebstormProjects/scaffold/tmp/units/aggregate-final-cell-driver-validation.ts --revision-2
```

The validation utility executed dry argv using the resolved executable `C:/Users/mikes/scoop/apps/nodejs-lts/current/node.exe` and driver path `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/aggregate-final-cell-driver.ts`, followed by the table's cell. The following readings belong to the corrected driver and successor `plan-CELL-2.json` artifacts. The successor validation wrapper exited 0, including its expected invalid-cell refusal. Both generations of resolved plans were written under the owned prefix with `wx`.

| Positional cell | Exit | Wall ms | Watched paths unchanged |
| --- | --- | --- | --- |
| q4-think0 | 0 | 1207 | true |
| q4-think1 | 0 | 1180 | true |
| g2-think1 | 0 | 1207 | true |
| g4-think0 | 0 | 1201 | true |
| g4-think1 | 0 | 1178 | true |
| q2-think1 | 0 | 1170 | true |

The original validation utility returned exit 1 after successful original dry invocations because its negative-control predicate expected `usage:` but the existing `describeError` helper emits `Error: usage:`. The driver rejected the invalid cell correctly. The predicate was repaired, and the negative-only validation returned exit 0 with expected child exit 1, empty stdout, exact usage error, and unchanged driver artifact directory in `aggregate-final-cell-driver-validation-negative.json`. Root's complete-file review then required removal of the unmeasured HEAD literal and operational exit 1 on reader faults following exit 0 or 3. Those fixes prompted the corrected-driver dry validation in the preceding table. Original artifacts remain intact; no plan was overwritten. `aggregate-final-cell-driver-validation.json` was not created by the failed original wrapper.

The prospective live form follows the outer argv printed in each plan. Substitute an allowed cell for `CELL`; root and verifier must review before use.

```text
node .agents/skills/orkestrel-dispatch/scripts/launch.ts --journal tmp/units/aggregate-final-cell-driver-CELL-live.jsonl --errors tmp/units/aggregate-final-cell-driver-CELL-live.err --cap 25920 --status -- node tmp/units/aggregate-final-cell-driver.ts CELL --live
```

Nested resource and full caps are 7200 seconds each. Pilot cap is 10800 seconds. Every nested argv uses dispatch `launch.ts --status`, distinct cell-stage log/error paths, and native Node with `shell: false`, inherited stdio, explicit scaffold cwd, and no detached process. Before launch, the driver refuses existing phase outputs, log sidecars, or the cell sequence receipt. It never resumes, retries, materializes policy, or grades a run. The frozen protocol budgets are unchanged.

The owned artifacts have these SHA256 identities. The report's own hash is returned separately after writing to avoid a self-reference.

| File under tmp/units | SHA256 |
| --- | --- |
| aggregate-final-cell-driver.ts | feef1e8b51e5fa21b46f6be74d11b5f5fb0533e3e4027a6bcc0ea4df8b5f050c |
| aggregate-final-cell-driver-validation.ts | ab594fc012a15cdd34999e88a751f08affee9234a1dbef225321cf13896a998c |
| aggregate-final-cell-driver-validation-2.json | 3486afc65f82bdfbd6ec0ba06bcd88e0035bdd29c35ad87f17c4987e8efdb39f |
| aggregate-final-cell-driver-plan-q4-think0-2.json | 6410adb67855e29237c7c036f2356663a95174d84c950e4967981f305add8079 |
| aggregate-final-cell-driver-plan-q4-think1-2.json | 07fb035c63d00cd8c65ebc943d654c3bf5b6ee5a55ed4c9e8dd47ccbf06e711a |
| aggregate-final-cell-driver-plan-g2-think1-2.json | f279c410dbc36725bf0b38f92d017f0cdfc6334bc975e88fe47f3779b8008140 |
| aggregate-final-cell-driver-plan-g4-think0-2.json | f1242eed07bd759fac020909b09398d9fedc73ad22e0fd9387226d82c961be24 |
| aggregate-final-cell-driver-plan-g4-think1-2.json | c2800567f805f5cdde64124bbc2254a5d6870a2e0806e6504e98236d7a0e1104 |
| aggregate-final-cell-driver-plan-q2-think1-2.json | 677fa06a83e5550499257203ba859ae821b14468f9efad3b231fc29af4e62940 |
| aggregate-final-cell-driver-validation-negative.json | eebca360b393e0ebd37117097266428f36348982de88026771c8119ba8ce1538 |
| aggregate-final-cell-driver-plan-q4-think0.json | c6b14259a008567e7c2d786f3c361f37b9cfaab1e6f931042ca47245567529b8 |
| aggregate-final-cell-driver-plan-q4-think1.json | 4cac589e827a5ec48bc5def8ca99c4d65b6ca4520492be9e4223882c8a39ae82 |
| aggregate-final-cell-driver-plan-g2-think1.json | 108764fcd9123e82e99f873d0fb6be046bd71b5343fa05ca19518ea06a1da5d7 |
| aggregate-final-cell-driver-plan-g4-think0.json | b4c8edb6387e71857e474be36b61a04104feb264832db20deca37b327ce53e9a |
| aggregate-final-cell-driver-plan-g4-think1.json | 2c7992b59aa96af1a361ba94eb246cea80222d29d62c612f2ed4f3f05a129fa3 |
| aggregate-final-cell-driver-plan-q2-think1.json | f2a83c8620e2ad66ae0724ac766a0cac28016ff13748fe1ed2adec6b133caa44 |

Zero model requests were sent by this unit. It changed no harness source/build, campaign prose, existing measured artifact, service, corpus, or Git state. These checks cover syntax, actual frozen dry preflight, and invalid argument refusal; they make no live performance or successful live-path claim.
