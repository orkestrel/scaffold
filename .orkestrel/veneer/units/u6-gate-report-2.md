# U6-gate report, round 2 (verifier, native Sonnet, 2026-09-20, 149 s)

Test checkout, HEAD `f49bc7f`, cumulative U6 diff (six files, 804 insertions, 10 deletions).

| Step | Command | Exit | Final lines |
|---|---|---|---|
| 1 | `git status --porcelain` / `git diff --stat` | 0 | the six owned files |
| 2 | `npm run format:check` | 0 | `All matched files use the correct format.` / `Finished in 1150ms on 60 files using 16 threads.` |
| 3 | `npm run lint:check` | 0 | no diagnostics |
| 4 | `npm run check` | 0 | no diagnostics |
| 5 | `npm run build` | 0 | `Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts` |
| 6 | `npm test` | 0 | chain green; last project `Tests 50 passed | 1 skipped (51)` |
| 7 | `PLAYWRIGHT_CHANNEL=msedge npm run test:src:browser` | 0 | `Test Files 2 passed (2)` / `Tests 344 passed | 2 expected fail (346)` / `Duration 27.88s` |
| 8 | `node ../scaffold/dist/bin/main.js audit --target .` | 1 | the checkout's standing terrain (`^0.0.73` pin, stale vendored paths, `test:setup:browser` gate), unchanged from round 1 |
| 9 | `ls dist/src/browser` | 0 | `index.d.ts`, `index.js`, `index.js.map` |
| 10 | `grep -c "hoverAccessible\|holdAccessible\|releasePointer\|stageMedia\|releaseMedia\|sendProtocol" dist/src/browser/index.d.ts` | 0 | `21` |
| 11 | `git status --porcelain` (final) | 0 | identical to step 1 |

The dot reporter prints no user-agent line; the Edge run is identified by the
`PLAYWRIGHT_CHANNEL=msedge` variable the config's `resolveBrowser` reads.
