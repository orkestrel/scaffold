Every command ran through the detached host queue. Folder root: `/home/user/veneer/tmp/units/journey-cost/runs/`. `WT=/home/user/.wave/veneer-audit-spacing`. Each command receives `env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH`; the exact expanded argv and all exits are in [gate-results.json](gate-results.json).

| Folder | Command | Exit | Bare result |
| --- | --- | --- | --- |
| as3-build-1 | `npm run build` | 0 | Build completed |
| as3-build-2 | `npm run build` | 0 | Build completed |
| as3-build-final-1 | `npm run build` | 0 | Build completed |
| as3-capture-1280-1 | `node /tmp/claude-0/-home-user/4338f304-4fe6-5169-89e8-36562d885cad/scratchpad/faces/capture-faces.ts /home/user/.wave/veneer-audit-spacing/tmp/captures/as3 1280 light /home/user/.wave/veneer-audit-spacing/showcase/browser.html` | 0 | 72 sections per face; browser/errors [] |
| as3-capture-390-1 | `node /tmp/claude-0/-home-user/4338f304-4fe6-5169-89e8-36562d885cad/scratchpad/faces/capture-faces.ts /home/user/.wave/veneer-audit-spacing/tmp/captures/as3 390 light /home/user/.wave/veneer-audit-spacing/showcase/browser.html` | 0 | 72 sections per face; browser/errors [] |
| as3-check-1 | `npm run check` | 0 | No TypeScript diagnostics |
| as3-check-2 | `npm run check` | 0 | No TypeScript diagnostics |
| as3-check-3 | `npm run check` | 0 | No TypeScript diagnostics |
| as3-compare-1 | `node /home/user/veneer/tmp/units/journey-cost/compare.ts --baseline /home/user/veneer/tmp/units/journey-cost/runs/landing-867f3b4-journey --candidate /home/user/veneer/tmp/units/journey-cost/runs/as3-journey-1 --host-bound /home/user/veneer/tmp/units/journey-cost/host-bound.json --registration 98/0 --moves /home/user/veneer/tmp/units/journey-cost/redesign-moves.json --out /home/user/.wave/veneer-audit-spacing/tmp/units/as3/journey-compare.md` | 67 | Different: 1 differences; see /home/user/.wave/veneer-audit-spacing/tmp/units/as3/journey-compare.md |
| as3-compare-2 | `node /home/user/veneer/tmp/units/journey-cost/compare.ts --baseline /home/user/veneer/tmp/units/journey-cost/runs/landing-867f3b4-journey --candidate /home/user/veneer/tmp/units/journey-cost/runs/as3-journey-2 --host-bound /home/user/veneer/tmp/units/journey-cost/host-bound.json --registration 98/0 --moves /home/user/veneer/tmp/units/journey-cost/redesign-moves.json --out /home/user/.wave/veneer-audit-spacing/tmp/units/as3/journey-compare-final.md` | 67 | Different: 49 differences; see /home/user/.wave/veneer-audit-spacing/tmp/units/as3/journey-compare-final.md |
| as3-format-check-1 | `npm run format:check` | 0 | All matched files use the correct format |
| as3-format-check-2 | `npm run format:check` | 0 | All matched files use the correct format |
| as3-format-check-3 | `npm run format:check` | 0 | All matched files use the correct format |
| as3-journey-1 | `npm run test:journey -- --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/as3-journey-1/report.json` | 65 | Test Files  4 passed (4); Tests  98 passed (98) |
| as3-journey-2 | `CAPTURE=0 npm run test:journey -- --reporter=dot --reporter=json --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/as3-journey-2/report.json` | 0 | Test Files  4 passed (4); Tests  98 passed (98) |
| as3-lint-check-1 | `npm run lint:check` | 1 | Lint diagnostics; see deviations |
| as3-lint-check-2 | `npm run lint:check` | 1 | Lint diagnostics; see deviations |
| as3-lint-check-3 | `npm run lint:check` | 1 | Lint diagnostics; see deviations |
| as3-lint-check-4 | `npm run lint:check` | 1 | Lint diagnostics; see deviations |
| as3-lint-check-5 | `npm run lint:check` | 0 | No diagnostics |
| as3-records-1 | `node_modules/.bin/vitest run --config tmp/units/as3/vite.writers.config.ts --no-cache --reporter=dot` | 0 | Test Files  2 passed (2); Tests  2 passed (2) |
| as3-regression-after-1 | `npm run test:conformance -- -t maps spacer steps consistently` | 0 | Test Files  1 passed (1); Tests  1 passed \| 130 skipped (131) |
| as3-regression-before-2 | `npm run test:conformance -- -t maps spacer steps consistently` | 1 | Test Files  1 failed (1); Tests  1 failed \| 130 skipped (131) |
| as3-regression-before-3 | `npm run test:conformance -- -t maps spacer steps consistently` | 1 | Test Files  1 failed (1); Tests  1 failed \| 130 skipped (131) |
| as3-showcase-1 | `npm run build:showcase` | 0 | Build completed |
| as3-showcase-2 | `npm run build:showcase` | 0 | Build completed |
| as3-spacer-proof-1 | `npm run test:setup:browser -- -t maps spacer utilities` | 0 | Test Files  1 passed \| 1 skipped (2); Tests  1 passed \| 205 skipped (206) |
| as3-test-app-browser-1 | `npm run test:app:browser` | 0 | Test Files  8 passed (8); Tests  245 passed (245) |
| as3-test-config-1 | `npm run test:config` | 0 | Test Files  1 passed (1); Tests  227 passed \| 1 skipped (228) |
| as3-test-conformance-1 | `npm run test:conformance` | 0 | Test Files  1 passed (1); Tests  131 passed (131) |
| as3-test-guides-1 | `npm run test:guides` | 1 | Test Files  1 failed (1); Tests  1 failed \| 19 passed (20) |
| as3-test-integration-1 | `npm run test:integration` | 0 | Test Files  1 passed (1); Tests  60 passed (60) |
| as3-test-policy-1 | `npm run test:policy` | 0 | Test Files  1 passed (1); Tests  119 passed \| 1 skipped (120) |
| as3-test-setup-1 | `npm run test:setup` | 1 | Test Files  1 failed \| 1 passed (2); Tests  1 failed \| 185 passed (186) |
| as3-test-setup-2 | `npm run test:setup` | 0 | Test Files  2 passed (2); Tests  186 passed (186) |
| as3-test-setup-browser-1 | `npm run test:setup:browser` | 0 | Test Files  2 passed (2); Tests  206 passed (206) |
| as3-test-src-bootstrap-1 | `npm run test:src:bootstrap` | 0 | Test Files  1 passed (1); Tests  14 passed (14) |
| as3-test-src-styles-1 | `npm run test:src:styles` | 0 | Test Files  2 passed (2); Tests  15 passed \| 1 todo (16) |
| as3-test-src-tailwindcss-1 | `npm run test:src:tailwindcss` | 1 | Test Files  1 failed (1); Tests  1 failed \| 12 passed (13) |
| as3-test-src-tailwindcss-2 | `npm run test:src:tailwindcss` | 0 | Test Files  1 passed (1); Tests  13 passed (13) |
