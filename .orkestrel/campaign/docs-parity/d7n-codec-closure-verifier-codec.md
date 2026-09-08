GATES: RED npm test

**Command 1** — `git rev-parse --short HEAD && git status --short`
Exit 0. HEAD `8c20e15`. `git status --short` returned no output — the tree is clean, not carrying uncommitted edits as the brief's standing condition states. **Anomaly.**

**Command 2** — `node -p "require('./node_modules/@orkestrel/guide/package.json').version"`
Exit 0. `0.0.18`.

**Command 3** — `npm run format:check`
Exit 0. Last lines: `All matched files use the correct format.` / `Finished in 2674ms on 33 files using 4 threads.`

**Command 4** — `npm run lint:check`
Exit 0. No output beyond the invoked command line.

**Command 5** — `npm run check`
Exit 0. Last line: `> tsc --noEmit -p configs/src/tsconfig.core.json`, no diagnostics.

**Command 6** — `npm run build`
Exit 0. Last lines: `> npm run copy dist/src/core/index.d.ts dist/src/core/index.d.cts` / `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts`.

**Command 7** — `npm run docs`
Exit 0. Last line: `rows read: 1, disagreements found: 0`.

**Command 8** — `PATH=/opt/npm11/bin:$PATH npm test`
Exit 1. Per-project totals:
- `src:core`: Test Files 2 passed (2); Tests 157 passed (157).
- `policy`: Test Files 1 passed (1); Tests 90 passed | 1 skipped (91).
- `config`: Test Files 1 failed (1); Tests 1 failed | 171 passed | 1 skipped (173).
- `guides`: not run — the `&&` chain (`test:src && test:policy && test:config && test:guides`) stopped at the `config` failure.

Failing test excerpt, `tests/config.test.ts:2370`:
```
FAIL  |config| tests/config.test.ts > configuration helpers > rolls one face into a single declaration and rewrites its core specifier
AssertionError: expected false to be true // Object.is equality
- true
+ false
 ❯ tests/config.test.ts:2370:55
    2368|      entry.startsWith('orkestrel-declarations-'),
    2369|     )
    2370|     expect(after.every((entry) => before.has(entry))).toBe(true)
```
The assertion checks that no unexpected `orkestrel-declarations-*` scratch-tree entry exists after the operation under test; one exists that wasn't there before. This reads as leftover-scratch-directory state rather than a pure timing race — the Orchestrator's re-run alone is the deciding read per the long-running-commands law.

**Command 9** — `grep -n '"test:distribution"' package.json` found the script at `package.json:70`; ran `PATH=/opt/npm11/bin:$PATH npm run test:distribution`.
Exit 0. Test Files 1 passed (1); Tests 9 passed (9).

**Anomalies**
- `git status --short` reported a clean tree though the brief's standing condition states the working tree carries the closing unit's uncommitted edits.
- `tests/config.test.ts:2370` failed with a leftover `orkestrel-declarations-*` entry surviving into the `after` snapshot; not re-run here per the permission floor.
- `test:guides` (part of `npm test`'s chain) did not execute because the preceding `test:config` step failed and short-circuited the `&&` chain.

GATES: RED npm test
