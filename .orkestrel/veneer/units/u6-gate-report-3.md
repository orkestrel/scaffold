# U6-gate report, round 3 (verifier, native Sonnet, 2026-09-20, 236 s)

Test checkout, HEAD `f49bc7f`, cumulative U6 diff (six files, 997 insertions, 78 deletions).

| Step | Command | Exit | Final lines |
|---|---|---|---|
| 1 | `git status --porcelain` / `git diff --stat` | — | the six owned files |
| 2 | `npm run format:check` | 0 | `All matched files use the correct format.` / `Finished in 1268ms on 60 files using 16 threads.` |
| 3 | `npm run lint:check` | 0 | no findings |
| 4 | `npm run check` | 0 | no output |
| 5 | `npm run build` | 0 | `Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts` |
| 6 | `npm test` | 0 | chain green; last project `Tests 50 passed | 1 skipped (51)` |
| 7a | `PLAYWRIGHT_CHANNEL=msedge npm run test:src:browser` | 0 | `Test Files 2 passed (2)` / `Tests 347 passed | 2 expected fail (349)` / `Duration 34.82s` |
| 7b | the same command again | 0 | `Test Files 2 passed (2)` / `Tests 347 passed | 2 expected fail (349)` / `Duration 35.25s` |
| 8 | `node ../scaffold/dist/bin/main.js audit --target .` | 1 | the checkout's standing terrain, unchanged across all three rounds |
| 9 | `ls dist/src/browser` | 0 | `index.d.ts`, `index.js`, `index.js.map` |
| 10 | `grep -c` over the new names in `dist/src/browser/index.d.ts` | 0 | `21` |
| 11 | `git status --porcelain` (final) | — | identical to step 1 |

The two Edge readings agree on outcome and count, so the result does not depend on machine load.

The dot reporter prints no user-agent line; the verifier reported that rather than filling the row,
which is the right call. The Edge run is identified by the `PLAYWRIGHT_CHANNEL=msedge` variable the
config's `resolveBrowser` reads.

## Orchestrator's ruling on step 8

The `audit` red is the Test checkout's standing terrain, none of it touched by U6: the
`@orkestrel/scaffold` pin at `^0.0.73` against the published `^0.0.75`, and with it the stale
vendored `vite.config.ts`, `configs/browsers.ts`, `tests/setupPolicy.ts`, `tests/policy.test.ts`,
and `tests/config.test.ts`; the `guides/scaffold.md` mirror that a `catalog` run refreshes; and
the `test:setup:browser` script and its `setup:browser` project, which arrived in scaffold 0.0.75.
The Test release visit owns every row: re-pin, `repair`, `catalog`, declare the script, then
re-run the gates. U6 is not its carrier, and the verifier was right to refuse the
`dependencies`-only exception the brief gave.
