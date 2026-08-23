# Gate evidence — after the fix round

Run by an independent `verifier` at commit `2610c7a`, working tree clean, no writer live.

| Gate                        | Exit |
| --------------------------- | ---- |
| `npm run format:check`       | 0    |
| `npm run lint:check`         | 0    |
| `npm run check`              | 0    |
| `npm run build`              | 0    |
| `npm test`                   | 0    |
| `npm run test:distribution`  | 0    |

Per-project counts from `npm test`: `src:core` 8 files and 329 tests; `src:server` 5 files and 408
tests; `src:bin` 3 files and 189 tests; `policy` 1 file and 93 tests; `config` 1 file and 44 tests;
`guides` 1 file and 14 tests.

`npm run test:distribution` ran this repository's own bespoke proof: 5 tests in 53.12s, completing
the pack-and-install cycle against the npm registry. `git diff --quiet HEAD --
tests/distribution.test.ts` exits 0, so that proof is byte-untouched at this commit.

That pairing is the presence-ownership evidence the design rests on: scaffold now plans a proof at
that path for every publishing workspace, and the workspace that replaced it keeps its replacement
and still passes.

No anomaly, no rerun, no flake.
