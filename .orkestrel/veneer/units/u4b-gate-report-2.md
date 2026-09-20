<!-- workflow wf_25acd99b-3df, agent ac87b9f8a74941c5c, retained 2026-09-20 -->

All steps ran and passed. Everything is exit 0, and the two status readings are identical.

## Gate report — U4b-gate 2, `veneer` checkout at `ef1a563`

| Step | Command | Exit | Final lines |
|---|---|---|---|
| 1 | `git status --porcelain \| grep -v '^?? tmp/'` + `git log --oneline -1` | 0 | see verbatim status below; log: `ef1a563 Record the styles axis in the guide (U-styles-guide)` |
| 2 | `npm run format:check` | 0 | `All matched files use the correct format. Finished in 764ms on 82 files using 16 threads.` |
| 3 | `npm run lint:check` | 0 | `npm notice run oxlint --config .oxlintrc.json --deny-warnings .` (no violations reported) |
| 4 | `npm run check` | 0 | `npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json` (no errors) |
| 5 | `npm run build` | 0 | `dist/app/browser/assets/index-D2JnOl_e.js 2.31 kB │ gzip: 0.96 kB` / `✓ built in 306ms` |
| 6 | `npm run test:conformance` (Chromium) | 0 | `Test Files 1 passed (1)` / `Tests 8 passed (8)` / `Duration 3.58s` |
| 7 | `npm run test:setup` | 0 | `Test Files 3 passed (3)` / `Tests 96 passed (96)` / `Duration 5.91s` |
| 8 | `npm run test:guides` | 0 | `Test Files 1 passed (1)` / `Tests 18 passed (18)` / `Duration 516ms` |
| 9 | `npm run test:policy` | 0 | `Test Files 1 passed (1)` / `Tests 109 passed \| 1 skipped (110)` / `Duration 2.02s` |
| 10 | `npm test` (whole chain, backgrounded) | 0 | `Test Files 1 passed (1)` / `Tests 18 passed (18)` / `Duration 492ms` (final `test:guides` sub-run) / `EXIT:0` |
| 11 | `npm run test:distribution` | 0 | `Test Files 1 passed (1)` / `Tests 11 passed \| 3 skipped (14)` / `Duration 10.67s` |
| 12 | `PLAYWRIGHT_CHANNEL=msedge npm run test:conformance` | 0 | `Test Files 1 passed (1)` / `Tests 8 passed (8)` / `Duration 4.12s` |
| 13 | `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --target .` | 0 | `0 of 48 planned paths drifted from the plan. Audit compared bytes at 29, existence at 5, and nothing at 14.` |
| 14 | `git status --porcelain \| grep -v '^?? tmp/'` (second reading) | 0 | Identical to step 1's reading (`diff` reports no difference) |

No non-zero exit occurred; no failure excerpts to report.

**Step 6 case titles and states (Chromium, `conformance` project):**
- `Bootstrap reference identity > installs the exact Bootstrap release this package tracks` — passed
- `Bootstrap reference identity > pins the installed CSS, RTL CSS, and bundled JavaScript bytes` — passed
- `Bootstrap component oracle > carries every shipped component selector and custom property in the built cascade` — passed
- `Bootstrap component oracle > records official Button behavior and matches each named fixture step` — passed
- `runtime boundaries > declares no forbidden runtime dependency or peer` — passed
- `runtime boundaries > imports no forbidden runtime package from source, application, or tests` — passed
- `runtime boundaries > keeps relative module imports inside the workspace` — passed
- `runtime boundaries > keeps every published entry closure inside source` — passed

**Step 12 case titles and states (Edge, `conformance` project, `PLAYWRIGHT_CHANNEL=msedge`) — same eight cases, all passed:**
- `Bootstrap reference identity > installs the exact Bootstrap release this package tracks` — passed
- `Bootstrap reference identity > pins the installed CSS, RTL CSS, and bundled JavaScript bytes` — passed
- `Bootstrap component oracle > carries every shipped component selector and custom property in the built cascade` — passed
- `Bootstrap component oracle > records official Button behavior and matches each named fixture step` — passed
- `runtime boundaries > declares no forbidden runtime dependency or peer` — passed
- `runtime boundaries > imports no forbidden runtime package from source, application, or tests` — passed
- `runtime boundaries > keeps relative module imports inside the workspace` — passed
- `runtime boundaries > keeps every published entry closure inside source` — passed

**Step 13 audit full output:**
```
setup: The target at . carries a test setup module that no proof covers: tests/setupListeners.ts. Add tests/setupListeners.test.ts to cover it. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: @vitest/browser-playwright declares major 4, while the registry serves major 5.
dependencies: typescript declares major 6, while the registry serves major 7.
dependencies: vitest declares major 4, while the registry serves major 5.
0 of 48 planned paths drifted from the plan. Audit compared bytes at 29, existence at 5, and nothing at 14.
```

**Both status readings, verbatim (step 1 and step 14, identical):**
```
 M guides/veneer.md
 M package-lock.json
 M package.json
 M tests/conformance.test.ts
 M tests/setupConformance.test.ts
 M tests/setupConformance.ts
?? tests/fixtures/
```
