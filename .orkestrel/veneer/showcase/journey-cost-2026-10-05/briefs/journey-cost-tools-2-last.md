Wrote [report-tools-2.md](/home/user/veneer/tmp/units/journey-cost/report-tools-2.md) with every proof’s exact command and exit code, plus dispositions for all 27 findings.

Updated the four tools, README, proof/report harnesses, and historical report correction. Added the renderer fixture and generated evidence. All writes stayed under `tmp/units/journey-cost/`.

`node tmp/units/journey-cost/fixtures/prove.ts` exited **0**, recording 61 proofs:

| Acceptance | Observed exits |
|---|---|
| Missing/malformed arguments | 64 |
| Identical fixtures | 0 |
| Tampered comparison gates | 67 |
| Mutation red/green; duplicate search | 0; 66 |
| Command capture; reused/stale folders | 0; 65 |
| Sampler with SIGTERM and retitled renderer | 0 |
| Raw A/B/landing identical copies | 0 |
| A versus B; B versus landing | 67—failure differences only |
| Ruled output, interleaving, permitted moves | 0 |
| Added refusal controls | Expected 64, 66, 67, or 127 |
| Formatting through the lock | 0 |

`node --version` exited **0**: `v22.22.2`.  
`node tmp/units/journey-cost/fixtures/report.ts` exited **0**.

Deviations: historical JSON reports were reconstructed from raw logs; run A uses retained run-B artifacts because no separate A snapshot was found. The authorized Chromium fallback remains; cgroup v2 was not live-tested. These limits are documented in the report.