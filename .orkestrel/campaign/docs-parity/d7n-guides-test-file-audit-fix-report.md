# Guides test-file audit correction

## Outcome

Implemented the accepted audit correction in the direct test-file entry.

- Worker mode now requires `process.env.VITEST === 'true'`; `false` and other values run native argument handling.
- Each ordered Guide disagreement now carries a readonly `summary` or `example` category before either writer chooses a replacement.
- The entry derives example disagreements with `collectTitles`, first-title fence traversal and `computeDrift`, then verifies their full values against the authoritative `findDrift` suffix before writing.
- Reason identity includes the category, so colliding summary and example keys retain separate outcomes.
- Manifest name parsing now narrows through Contract's `isRecord`.
- The passing-result helper is now `matchesPassed`, and reason writes no longer pass through a forwarding helper.
- The real-command fixture links Contract and covers the false environment value, concurrent colliding drift, repeated titles and absent fence languages.
- The guide and vendored documentation rule now state the package-author adoption requirement and the explicit-direction preflight boundary.
- The generated predecessor prose now describes direct Vitest project invocation.

## Touched paths

- `tests/guides.test.ts`
- `tests/src/core/compilers.test.ts`
- `guides/scaffold.md`
- `.claude/rules/documentation.md`
- `src/core/compilers.ts`
- `tmp/units/d7n-guides-test-file-audit-fix-report.md`

## Permanent defect proof

Exact command:

```text
node node_modules/vitest/vitest.mjs run tests/src/core/compilers.test.ts --config vite.config.ts --no-cache --reporter=dot --project src:core -t 'runs the native command when VITEST is false|keeps summary and example namespaces distinct'
```

Red evidence retained by root at `tmp/pass/guides-test-file-audit-red/regression.log.txt` and `regression.exit.txt`:

```text
exit 1
Test Files  1 failed (1)
Tests  3 failed | 109 skipped (112)
```

The false environment value incorrectly selected worker mode. A colliding example key was classified from summary membership, so guide direction wrote example text into the Summary cell and source direction wrote guide example text into the description paragraph.

Green evidence:

```text
exit 0
Test Files  1 passed (1)
Tests  3 passed | 110 skipped (113)
```

## Scoped validation

- The complete `the guides entry` fixture selection exited 0:

```text
Test Files  1 passed (1)
Tests  15 passed | 98 skipped (113)
```

- `npm run test:guides` exited 0:

```text
Test Files  1 passed (1)
Tests  20 passed (20)
```

- `npx --no-install tsc --noEmit --project tsconfig.json --pretty false` exited 0.
- Scoped Oxlint with warnings denied exited 0.
- Scoped Oxfmt check exited 0.
- `git diff --check` exited 0.

## Deviation and remaining work

The required Probe call did not execute its case. The MCP transport returned `Legacy protocol 2025-11-25 cannot represent a stream result`. The retained real-process regressions supply the scoped executable evidence; no Probe receipt is claimed.

Root retains final affected gates, campaign evidence and independent review. No product item remains open in this unit.
