# Gate report — roughnotes acceptance run

Checkout: C:\Users\mikes\WebstormProjects\roughnotes. Working tree is dirty by design (uncommitted
changes to vite.config.ts, tests/conformance.test.ts, tests/setup.ts, package.json, new
tests/setup.test.ts, plus untracked .orkestrel/roughnotes/ campaign records). Nothing was cleaned
or fixed.

## Gate 1: npm run format:check — PASS (exit 0)

All matched files use the correct format. Finished in 951ms on 123 files.

## Gate 2: npm run lint:check — PASS (exit 0)

oxlint --config .oxlintrc.json --deny-warnings . reported no output and exit 0.

## Gate 3: npm run check — PASS (exit 0)

tsc --noEmit --project tsconfig.json, check:app:core, and check:app:browser (vue-tsc) all
completed with no diagnostics.

## Gate 4: npm run build — PASS (exit 0)

vite build (configs/app/vite.browser.config.ts) produced 139 transformed modules.
dist/app/browser/assets/index-hhVhdyP4.css measured 323.24 kB (gzip 48.09 kB) — matches the
required 323.24 kB. A chunk-size advisory ("Some chunks are larger than 500 kB after
minification") is expected non-failing informational output, not a failure.

## Gate 5: npm test — PASS (exit 0)

All six projects ran; none silently matched zero files.

| Project      | Files      | Tests                  |
| ------------ | ---------- | ----------------------- |
| app          | 43 passed  | 186 passed               |
| journey      | 4 passed   | 76 passed, 4 skipped (80) |
| policy       | 1 passed   | 111 passed                |
| config       | 1 passed   | 46 passed                 |
| setup        | 1 passed   | 3 passed                  |
| conformance  | 1 passed   | 12 passed                 |

The `setup` project (new in this change) ran and collected its file: 1 test file, 3 tests, all
passed, 208ms duration. It did not silently match zero files.

Non-failing stderr during the `app` project run — Vue's own `[Vue warn]` lines from
`useApplication.test.ts` ("injection \"Symbol(application)\" not found", "Unhandled error during
execution of setup function") — are expected assertions-under-test output: that test explicitly
exercises the throw-when-missing-injection path.

## Post-gate checks

- `git status --short`: dirty as expected — the four modified files, the new
  `tests/setup.test.ts`, and the untracked `.orkestrel/roughnotes/` campaign records. No other
  drift.
- `git diff --check`: exit 0, no whitespace-conflict markers.

## Extra checks

- `grep -ci 'deprecat' tmp/audit/4-build.log`: 0 matching lines in the complete build output.
- `grep -ci 'deprecat' tmp/audit/5-test.log`: 0 matching lines in the complete test output.
- Built CSS asset size: `dist/app/browser/assets/index-hhVhdyP4.css` is 323.24 kB — matches the
  required value.
- `grep -inE '\b(above|below)\b' vite.config.ts tests/conformance.test.ts tests/setup.ts tests/setup.test.ts`:
  0 matches.

## Anomalies

None observed. No flakes, no cache oddities.

## Overall verdict

GREEN — every gate passed on its own exit code, the `setup` project ran with real tests collected,
the CSS asset size matches, and the `deprecat` and `above`/`below` sweeps returned zero.

GATES: GREEN
