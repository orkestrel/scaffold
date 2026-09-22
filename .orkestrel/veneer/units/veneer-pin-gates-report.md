<!-- Unit VENEER-PIN-GATES (F3): `verifier` on Sonnet, native, returned 2026-09-22. Brief: veneer-pin-gates-brief.md. Retained verbatim. -->

Gate Report — /home/user/veneer, branch `claude/inspiring-allen-t4qzv1`, HEAD `4a58ee2de3d14e808ba8a662f9a775783a16614a`, npm 11.19.1.

Preliminary: `git status --porcelain` → ` M package-lock.json`, ` M package.json` (expected, F3 re-pin). `npm --version` → `11.19.1`.

1. `npm run format:check` → PASS (exit 0).
2. `npm run lint:check` → PASS (exit 0).
3. `npm run check` → PASS (exit 0). Runs `tsc --noEmit` root, `check:src:core`, `check:src:browser`, `check:src:styles`, `check:app:browser` (vue-tsc) — all clean.
4. `npm run build` → PASS (exit 0). `build:src:core`, `build:src:browser`, `build:src:styles`, `build:app:browser` all built. (Non-fatal API Extractor notice: "target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine" — informational, not an error.)
5. `npm run test:src:core` → PASS (exit 0). Test Files: 2 passed (2). Tests: 8 passed (8).
6. `npm run test:src:browser` → FAIL (exit 1). Test Files: 2 failed | 4 passed (6). Tests: 2 failed | 41 passed (43).
   - `tests/src/browser/Button.test.ts:132:24` — "Button > dispatches the completed state once as a bubbling non-cancelable event": `expect(event?.target).toBe(host)` received `null`, expected `<button class="active" …>`.
   - `tests/src/browser/helpers.test.ts:24:23` — "emitEvent > dispatches the supplied type and detail synchronously through the parent": `expect(event.target).toBe(host)` received `null`, expected `<button></button>`.
   - Matches the retained baseline (`.orkestrel/veneer/units/veneer-baseline-2.log.txt`) exactly, same two cases, same failure shape — the known host-dependent Chromium 141 defect (carrier: roadmap unit F4 HOST-OBSERVATIONS).
7. `npm run test:src:styles` → PASS (exit 0). Test Files: 58 passed (58). Tests: 411 passed (411).
8. `npm run test:app` → PASS (exit 0). Test Files: 10 passed (10). Tests: 26 passed (26).
9. `npm run test:journey` → PASS (exit 0). Test Files: 4 passed (4). Tests: 88 passed | 4 skipped (92).
10. `npm run test:policy` → PASS (exit 0). Test Files: 1 passed (1). Tests: 109 passed | 1 skipped (110).
11. `npm run test:config` → PASS (exit 0). Test Files: 1 passed (1). Tests: 173 passed | 1 skipped (174).
12. `npm run test:setup` → PASS (exit 0). Test Files: 3 passed (3). Tests: 156 passed (156).
13. `npm run test:setup:browser` → PASS (exit 0). Test Files: 1 passed (1). Tests: 42 passed (42).
14. `npm run test:conformance` → PASS (exit 0). Test Files: 1 passed (1). Tests: 10 passed (10).
15. `npm run test:guides` → PASS (exit 0). Test Files: 1 passed (1). Tests: 18 passed (18).
16. Final `git status --porcelain` → ` M package-lock.json`, ` M package.json` (unchanged from preliminary; only the two expected dirty manifests, no other path).

Overall verdict: NOT GREEN. `format:check`, `lint:check`, `check`, and `build` are all green, and every test project past `test:src:browser` is green. `test:src:browser` is the sole red gate, failing on the same two cases and the same assertion shape as the retained baseline: `event.target` reads `null` instead of the dispatching host element in `tests/src/browser/Button.test.ts:132` and `tests/src/browser/helpers.test.ts:24`. First place to look: `src/browser` event-dispatch code path exercised by `emitEvent` and `Button`'s toggle handler, cross-referenced against the host-dependent Chromium 141 note (roadmap F4 HOST-OBSERVATIONS) — this run does not diagnose root cause, only confirms reproduction.

Anomalies: none. No flakes observed on rerun; each command ran once and the `test:src:browser` failure reproduced identically to the retained baseline reading.
