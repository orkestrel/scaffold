Wrote [run.ts](/home/user/veneer/tmp/units/journey-cost/run.ts), [measure.ts](/home/user/veneer/tmp/units/journey-cost/measure.ts), [mutations.ts](/home/user/veneer/tmp/units/journey-cost/mutations.ts), [compare.ts](/home/user/veneer/tmp/units/journey-cost/compare.ts), [README.md](/home/user/veneer/tmp/units/journey-cost/README.md), and [report-tools.md](/home/user/veneer/tmp/units/journey-cost/report-tools.md), plus fixtures and proof logs.

Acceptance command: `node tmp/units/journey-cost/fixtures/prove.ts` — **exit 0**. The report records every exact child command and exit.

| Item | Command/proof | Exit |
|---|---|---|
| 1 | Each tool with absent or malformed arguments | 64 |
| 2 | `compare.ts`: identical fixtures | 0 |
| 3 | `compare.ts`: tampered rows, lines, causes, registration | 67 |
| 4 | `mutations.ts`: red → green; duplicate search | 0; 66 |
| 5 | `run.ts`: command and verified hashes; reused folder; stale artifact | 0; 65; 65 |
| 6 | `measure.ts`: sample, then SIGTERM and summary | 0 |
| 7 | Retained complete-record comparison; truncated or changed evidence | 0; 67 |
| 8 | `node --version` | 0 — v22.22.2 |
| 9 | Queued `oxfmt --write`, owned files only | 0 |

Deviations and limits are documented: Chromium uses the permitted fallback observation; the manifest excludes itself; JSON is validated in its final folder. Missing historical stdout and truncated dumps required labeled derived fixtures. File-backed capture avoids sandbox pipe failures. Row ordering is conservatively strict; cgroup v2 and live renderer sampling were not exercised.

All writes stayed under `tmp/units/journey-cost/`. No Vitest suite, build, install, commit, push, or browser session ran.