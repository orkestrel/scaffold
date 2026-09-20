# U6-gate report, round 4 (verifier, native Sonnet, 2026-09-20, 163 s)

Test checkout, HEAD `f49bc7f`, cumulative U6 diff (six files, 1129 insertions, 78 deletions).

| Step | Command | Exit | Final lines |
|---|---|---|---|
| 1 | `git status --porcelain` / `git diff --stat` | 0 | the six owned files |
| 2 | `npm run format:check` | 0 | `All matched files use the correct format.` / `Finished in 1147ms on 60 files using 16 threads.` |
| 3 | `npm run lint:check` | 0 | no findings |
| 4 | `npm run check` | 0 | no errors |
| 5 | `npm run build` | 0 | `Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts` |
| 6 | `npm test` | 0 | chain green; last project `Tests 50 passed | 1 skipped (51)` |
| 7 | `PLAYWRIGHT_CHANNEL=msedge npm run test:src:browser` | 0 | `Test Files 2 passed (2)` / `Tests 349 passed | 2 expected fail (351)` / `Duration 28.39s` |
| 7b | the same command again | 0 | `Tests 349 passed | 2 expected fail (351)` / `Duration 28.38s` |
| 8 | `node ../scaffold/dist/bin/main.js audit --target .` | 1 | the checkout's standing terrain (pin `^0.0.73`, stale vendored paths, mirror, `setup:browser` gate), unchanged across every round; the Test release visit owns it |
| 9 | `ls dist/src/browser` | 0 | `index.d.ts`, `index.js`, `index.js.map` |
| 10 | `grep -c` over the new names in `dist/src/browser/index.d.ts` | 0 | `21` |
| 11 | `git status --porcelain` (final) | 0 | identical to step 1 |

The two Edge readings agree; the dot reporter prints no user-agent line.
