Lane held: verifier test

**Report** (also written to `/home/user/scaffold/tmp/units/d7n-test-verify-report.md`)

Standing condition: installed `@orkestrel/guide` version is `0.0.18` (packed tip, `--no-save`; `package.json` declares `^0.0.17`, the recorded head-start state).

Commands, exit codes, last lines, run in `/home/user/fleet/test`:

1. `git rev-parse --short HEAD && git status --short` — exit 0. HEAD `1b6ce04`; status clean (no output).
2. `node -p ".../guide/package.json").version"` — exit 0. `0.0.18`.
3. `npm run format:check` — exit 0. `All matched files use the correct format. Finished in 1753ms on 60 files using 4 threads.`
4. `npm run lint:check` — exit 0. No warnings printed.
5. `npm run check` — exit 0. Root tsc plus `check:src:core`, `check:src:browser`, `check:src:server` all completed with no errors.
6. `npm run build` — exit 0. All sub-builds completed; API Extractor's standing TypeScript 6.0.3-vs-bundled-compiler notice only, no errors.
7. `npm run docs` — exit 0. `rows read: 1, disagreements found: 0`.
8. `PATH=/opt/npm11/bin:$PATH npm test` — exit 0. Per-project totals:
   - `test:src`: Test Files 7 passed (7); Tests 496 passed | 8 skipped (504); Duration 21.53s.
   - `test:policy`: Test Files 1 passed (1); Tests 90 passed | 1 skipped (91); Duration 618ms.
   - `test:config`: Test Files 1 passed (1); Tests 172 passed | 1 skipped (173); Duration 4.58s.
   - `test:setup`: Test Files 3 passed (3); Tests 24 passed (24); Duration 389ms.
   - `test:guides`: Test Files 1 passed (1); Tests 95 passed (95); Duration 1.04s.
9. `grep -n '"test:distribution"' package.json` — present at line 81. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — exit 0. Test Files 1 passed (1); Tests 11 passed | 4 skipped (15); Duration 22.58s.

Anomalies:

- `npm run build` and `test:config` each print API Extractor's standing "TypeScript 6.0.3 newer than bundled compiler" notice — informational, no gate failure.
- `test:src` prints `[Unhandled error]`/`[Unhandled rejection]` console lines from `tests/src/browser/factories.test.ts:453` and `:462` (`Boom`, `Refused`, `Ignored`) — these are the test's own dispatched `ErrorEvent`/`PromiseRejectionEvent` fixtures exercising journal error capture, not failures; the file's 7-passed count confirms this.

GATES: GREEN
