# Verify report — D4 scaffold-gate (scaffold), second run

This is the second verify run of `tmp/units/docs-d4-verify-brief.md`. Report also written to `/home/user/scaffold/tmp/units/docs-d4-verify-2-report.md`.

**1.** `grep -n "findDrift\|tagline" tests/guides.test.ts` — exit 0. Matches the `findDrift` import (line 7), its use at line 173, and the tagline case (lines 178-189, including `it('opens the README with the guide tagline', ...)`).
`grep -c "map((method) => method.name)" tests/guides.test.ts` — exit 0, count 5.

**2.** `grep -n "findDrift\|tagline\|locateComment" node_modules/@orkestrel/guide/dist/src/core/index.d.ts | head -5` — exit 0. Matches at lines 154, 826, 915, 928, 930. The head start is present.

**3.** `npm run format:check` — exit 0. Last lines:
```
Checking formatting...
All matched files use the correct format.
Finished in 9376ms on 222 files using 4 threads.
```

**4.** `npm run lint:check` — exit 0. No warnings.

**5.** `npm run check` — exit 0. All four `tsc --noEmit` projects clean.

**6.** `npm run test:policy` — exit 0. Last lines: `Test Files 1 passed (1)`, `Tests 91 passed (91)`.

**7.** `npm run build` — exit 0. Last lines: `build-inventory: staged 121 file(s) into host.json`.

**8.** `sha256sum host.json && npm run build:inventory && sha256sum host.json` — exit 0. Digest before: `589ebebe834c2df5c6a96074be2547d1036a8b1ed1a8282b9db7bd51f3c822b1`. Digest after: identical.

**9.** `npm run test:guides` — exit 1. Failing cases, exactly the two named:
- `guides > keeps every compared summary and example equal to its source`
- `guides > opens the README with the guide tagline`

17 other tests passed. Last lines: `Test Files 1 failed (1)`, `Tests 2 failed | 17 passed (19)`. Per the brief, this reading is GREEN for this brief's purpose.

**10.** `git status --short` — exit 0. Output:
```
 M .claude/rules/documentation.md
 M .claude/rules/tests.md
 M .claude/rules/workspace.md
 M host.json
 M tests/guides.test.ts
```

Anomalies: none.

GATES: GREEN
