# Verify report — D4 scaffold-gate (scaffold)

## 1. `grep -n "findDrift\|tagline" tests/guides.test.ts`
Exit: 0. Import at line 7 and both target cases present (`opens the README with the guide tagline` at line 179; the drift comparison test block earlier). `grep -c "map((method) => method.name)" tests/guides.test.ts` — Exit: 0, output `5` (matches expected).

## 2. `grep -n "findDrift\|tagline\|locateComment" node_modules/@orkestrel/guide/dist/src/core/index.d.ts | head -5`
Exit: 0. Lines present (154, 826, 915, 928, 930). Head start intact, not RED.

## 3. `npm run format:check`
Exit: 0. Last lines: `All matched files use the correct format.` / `Finished in 8941ms on 222 files using 4 threads.`

## 4. `npm run lint:check`
Exit: 0. No warnings reported.

## 5. `npm run check`
Exit: 0. Last lines end with `check:src:bin` invocation, no errors.

## 6. `npm run test:policy`
Exit: 0. Last lines: `Test Files 1 passed (1)` / `Tests 91 passed (91)`.

## 7. `npm run build`
Exit: 0. Last lines: `build-inventory: staged 121 file(s) into host.json`.

## 8. `sha256sum host.json && npm run build:inventory && sha256sum host.json`
Exit: 0. Before: `5c98381e91404aa6fd211a4f0394d481fe69756d68ef6b1a753cada59365280d host.json`. After: same digest. Match.

## 9. `npm run test:guides`
Exit: 1. Failing cases: `keeps every compared summary and example equal to its source` (drift assertion at tests/guides.test.ts:173) and `opens the README with the guide tagline` (tests/guides.test.ts:186, `expected undefined not to be undefined`). Last lines: `Test Files 1 failed (1)` / `Tests 2 failed | 17 passed (19)`. Per brief step 9, red on exactly these two named cases with every other case green is GREEN for this brief's purpose.

## 10. `git status --short`
Exit: 0. Output:
```
 M .claude/rules/documentation.md
 M .claude/rules/tests.md
 M .claude/rules/workspace.md
 M host.json
 M tests/guides.test.ts
```

Report written to /home/user/scaffold/tmp/units/docs-d4-verify-report.md.

Anomalies: none observed; no reruns performed.

GATES: GREEN
