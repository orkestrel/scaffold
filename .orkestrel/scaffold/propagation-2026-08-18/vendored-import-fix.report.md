## Findings

- F1: Renamed the vendored pair to `createPolicyScratch` and `PolicyScratchInterface`. Updated all 5 call sites. The required grep exited 0 and returned only Policy-prefixed names.
- F2: Limited the guard to `.ts`, `.mts`, `.cts`, `.js`, `.mjs`, and `.cjs` modules. Renamed the test to state that population and documented that vendored directories contain 0 eligible modules.
- F3: Restricted detection to `from`, `import()`, and `require()` syntax with single, double, or backtick delimiters. Added resident static and backtick controls.
- F4: Added a policy test proving a relative write succeeds and `write('../escape', '')` throws.
- F5: Set both config timeouts to `45_000` and updated both comments. The byte-identity test passed: 1 passed, 52 skipped.

## Mutation probes

Matcher probe:

- Static import red:
  `npx vitest run --project src:server tests/src/server/helpers.test.ts -t "keeps every vendored JavaScript and TypeScript module independent of Orkestrel packages"`
  Exit 1: 1 failed, 155 skipped. Reported `tests/config.test.ts`.
- Static import restored: exit 0, 1 passed, 155 skipped.
- Backtick dynamic import red using the same command: exit 1, 1 failed, 155 skipped. Reported `tests/config.test.ts`.
- Backtick import restored: exit 0, 1 passed, 155 skipped.

Containment probe:

- With the throw disabled:
  `npx vitest run --project policy tests/policy.test.ts -t "contains every write within its root"`
  Exit 1: 1 failed, 85 skipped.
- Throw restored: exit 0, 1 passed, 85 skipped.

## Acceptance commands

- `grep -rn "createScratch\|ScratchInterface" tests/setupPolicy.ts tests/config.test.ts`
  Exit 0. Only `PolicyScratchInterface` and the `createPolicyScratch` signature matched.
- `npx vitest run --project src:server`
  Exit 1, sandbox-blocked: 326 passed, 31 blocked of 357. The blocked cases were the expected loopback `listen EPERM` and `spawnSync git EPERM`; 0 real failures.
- `npx vitest run --project config`
  Exit 1, sandbox-blocked: 27 passed, 1 blocked by the expected `spawnSync oxlint EPERM`; 0 real failures.
- `npx vitest run --project policy`
  Exit 0: 86/86 passed.
- `npm run check`
  Exit 0.
- `npx oxlint --config .oxlintrc.json --deny-warnings tests/`
  Exit 0.
- `npx oxfmt --config .oxfmtrc.json --check tests/setupPolicy.ts tests/config.test.ts tests/policy.test.ts tests/src/server/helpers.test.ts vite.config.ts src/core/templates.ts`
  Exit 0; all 6 files matched formatting.
- `git diff --check`
  Exit 0. Only the 6 owned files changed.