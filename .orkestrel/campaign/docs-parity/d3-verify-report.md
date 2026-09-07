# Gate report — D3 scaffold-policy verify

## 1. grep wiring lines
Command: `grep -n "no-imperative-summary\|no-banned-term" .oxlintrc.json configs/policy.ts tests/setupPolicy.ts`
Exit: 0
```
.oxlintrc.json:61:		"policy/no-imperative-summary": "error",
.oxlintrc.json:62:		"policy/no-banned-term": "error"
configs/policy.ts:1391:		'no-imperative-summary': VOICE_RULE,
configs/policy.ts:1392:		'no-banned-term': TERM_RULE,
tests/setupPolicy.ts:162:	'policy/no-imperative-summary',
tests/setupPolicy.ts:163:	'policy/no-banned-term',
```
PASS — both wiring lines, both register rows, both wiring-rule entries present.

## 2. npm run format:check
Exit: 0 — `All matched files use the correct format.` PASS

## 3. npm run lint:check
Exit: 0 — no output (deny-warnings clean). PASS

## 4. npm run check
Exit: 0 — root and scoped `tsc --noEmit` (core, server, bin) clean. PASS

## 5. npm run test:config
Exit: 0 — `Tests 172 passed | 1 skipped (173)`. PASS

## 6. npm run test:policy
Exit: 0 — `Tests 90 passed (90)`. PASS

## 7. npm run build
Exit: 0 — build completed, `build-inventory: staged 121 file(s) into host.json`. PASS

## 8. sha256sum host.json && npm run build:inventory && sha256sum host.json
Before: `90b22787dc69423f06227b667fa1df181f311ab22e051d9cd4724b0d59e33eb6  host.json`
After: `90b22787dc69423f06227b667fa1df181f311ab22e051d9cd4724b0d59e33eb6  host.json`
Exit: 0 — digest unchanged. PASS

## 9. npm test
Exit: 0 — every project reported passed (`9 passed (9)`, `5 passed (5)`, `3 passed (3)`, `1 passed (1)` ×3, `2 passed (2)`). PASS

## 10. PATH=/opt/npm11/bin:$PATH npm run test:distribution
Exit: 1 — FAIL
```
FAIL  |distribution| tests/distribution.test.ts > installed package consumer > installs the packed scaffold and passes one generated core/server workspace through prepublish [requires a reachable npm registry]
AssertionError: expected 1 to be +0 // Object.is equality
- Expected: 0
+ Received: 1
 ❯ tests/distribution.test.ts:935:26
    935|     expect(gates.status).toBe(0)

Test Files  1 failed (1)
     Tests  1 failed | 4 passed (5)
```
Not a plain test timeout (no timeout message; a non-zero subprocess `gates.status`), so per the brief it is reported as-is with no re-run. Owning file: `/home/user/scaffold/tests/distribution.test.ts:935`.

## 11. p10b-voice.mjs
Exit: 0 — `FILES 58 BLOCKS 708 FLAGGED 0 NODOC 35`. PASS (`FLAGGED 0`).

## 12. p9d-terms.mjs
Exit: 0 — `FILES 80 HITS 0`. PASS (`HITS 0`).

## 13. git status --short
Exit: 0
```
 M .claude/rules/typescript.md
 M .claude/rules/writing.md
 M .oxlintrc.json
 M configs/policy.ts
 M guides/scaffold.md
 M host.json
 M tests/config.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
```
Pre-existing working-tree state; unaffected by this verify run.

## Overall verdict

RED — `PATH=/opt/npm11/bin:$PATH npm run test:distribution` fails at `tests/distribution.test.ts:935` (`expect(gates.status).toBe(0)`, received `1`).

## Anomalies

- `npm test` printed one `failed to load config from /home/user/scaffold/tmp/scaffold-e2-peers-a2grKU/malformed/vite.config.ts` line, from a fixture test that intentionally exercises a malformed config; all test files in that run still reported passed.

Report written to `/home/user/scaffold/tmp/units/docs-d3-verify-report.md`.

GATES: RED npm run test:distribution