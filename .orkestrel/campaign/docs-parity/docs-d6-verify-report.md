Lane held: verifier

## Gate report — D6 scaffold-converge (scaffold)

1. `npm run docs; echo EXIT $?` — EXIT 0. Last lines: `rows read: 1, disagreements found: 0`. One closing line, no drift line, no pitch line.

2. `grep -n "findDrift\|tagline\|locateComment" node_modules/@orkestrel/guide/dist/src/core/index.d.ts | head -3` — non-empty (3 lines returned), head start present:
```
154: * and {@link locateComment} matches a caller's key against the whole map. A change to the head
826: * so {@link findDrift} reports the absence.
915: * table without it leaves every row's summary absent, which {@link findDrift} reports.
```

3. `head -6 README.md; head -6 guides/scaffold.md` — both open with an H1 and a blockquote.
   - `README.md` blockquote: "A compiler that turns a workspace specification into an ordered list of files, compares that list to a real directory, and writes the difference."
   - `guides/scaffold.md` blockquote: same text — "A compiler that turns a workspace specification into an ordered list of files, compares that list to a real directory, and writes the difference."

4. `npm run format:check` — EXIT 0. Last lines: "All matched files use the correct format. Finished in 9039ms on 223 files using 4 threads."

5. `npm run lint:check` — EXIT 0. No warnings or errors printed.

6. `npm run check` — EXIT 0. `tsc --noEmit` for root, core, server, and bin projects all clean.

7. `npm run test:policy` — EXIT 0. Test Files 1 passed (1); Tests 91 passed (91).

8. `npm run test:guides` — EXIT 0. Test Files 1 passed (1); Tests 20 passed (20) — every case green.

9. `npm run test:src:core` — EXIT 0. Test Files 9 passed (9); Tests 402 passed (402).

9a. `npm run test:src:bin` — EXIT 0. Test Files 3 passed (3); Tests 245 passed (245).

10. `npm run test:src:server` — EXIT 0. Test Files 5 passed (5); Tests 432 passed (432).

11. `npm run test:config` — EXIT 0. Test Files 1 passed (1); Tests 172 passed | 1 skipped (173).

12. `npm run build` — EXIT 0. `build:src:core`, `build:src:server`, `build:src:bin` all succeeded; `build:host` staged 122 files; `build:inventory` staged 122 files into `host.json`.

13. `sha256sum host.json && npm run build:inventory && sha256sum host.json` — same digest before and after:
```
fcaad03c498bcf70baa172aa94c96bf69aef1738c142b7de51b4805800906084  host.json
fcaad03c498bcf70baa172aa94c96bf69aef1738c142b7de51b4805800906084  host.json
```

14. `PATH=/opt/npm11/bin:$PATH npm --version` — `11.19.1` (npm 11.x, as required).

    `PATH=/opt/npm11/bin:$PATH npm test` — EXIT 0. Totals across the whole suite: `test:src:core` 402 passed, `test:src:server` 432 passed, `test:src:bin` 245 passed, `test:policy` 91 passed, `test:config` 172 passed | 1 skipped, `test:setup` 74 passed, `test:guides` 20 passed. Sum: 1436 passed, 1 skipped. Duration across the run's projects ranged roughly 1.7s–20.6s each, total wall time approximately 58s (start 09:35:45, last project finished at 09:36:43 + 7.91s duration).

    `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — EXIT 1, expected RED confined to exactly the named case. Test Files 1 failed (1); Tests 1 failed | 4 passed (5). Failing case: `installed package consumer > installs the packed scaffold and passes one generated core/server workspace through prepublish [requires a reachable npm registry]`. Last lines:
```
FAIL  |distribution| tests/distribution.test.ts > installed package consumer > installs the packed scaffold and passes one generated core/server workspace through prepublish [requires a reachable npm registry]
AssertionError: expected 2 to be +0 // Object.is equality
- Expected: 0
+ Received: 2
 ❯ tests/distribution.test.ts:938:26
    expect(gates.status).toBe(0)
 Test Files  1 failed (1)
      Tests  1 failed | 4 passed (5)
```
    Per the brief's standing condition, this reading is GREEN for this brief's purpose — no other red case appeared in the project.

15. `git status --short` — dirty tree as expected, no discard performed:
```
 M .claude/rules/documentation.md
 M .claude/rules/tests.md
 M .claude/rules/workspace.md
 M README.md
 M guides/scaffold.md
 M host.json
 M package.json
 M src/core/Compiler.ts
 M src/core/compilers.ts
 M src/core/constants.ts
 M src/core/errors.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M src/server/Materializer.ts
 M src/server/Upstream.ts
 M src/server/helpers.ts
 M tests/distribution.test.ts
 M tests/guides.test.ts
 M tests/setupServer.ts
 M tests/src/core/Compiler.test.ts
 M tests/src/core/compilers.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/server/helpers.test.ts
 M tsconfig.json
?? scripts/docs.ts
```

## Anomalies

- None. `templates.test.ts` under `test:src:core` prints an expected stderr trace for a deliberate malformed-config case (`refuses a non-object peer dependency declaration at config load`); the test still passes.

GATES: GREEN
