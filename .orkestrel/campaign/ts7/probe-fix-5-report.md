# Unit ts7-probe-fix-5 — report

## Edits

1. `src/core/types.ts:453` — replaced "Names the tool versions resolved from the workspace at construction." with "Names the tool versions the target workspace's installed manifests publish, read at construction."
2. `tests/setupServer.test.ts:71-72` — replaced the comment "Every selection at once, in a second workspace inside the same scratch, which is how a proof that branches on the installation carries both cases." with "Every selection at once: the workspace a proof that branches on the installation reaches for its equipped case." The comment's line width is unchanged after `npm run format`.

## Gates

- `npm run format` — exit 0 (converge)
- `npm run format:check` — exit 0
- `npm run lint:check` — exit 0
- `npm run check` — exit 0
- `npm run build` — exit 0
- `npm run test:setup` — exit 0 (2 test files, 11 tests passed)

No whole-suite test was run.

## `git status --short`

```
 M guides/probe.md
 M package-lock.json
 M package.json
 M src/core/types.ts
 M src/server/Probe.ts
 M src/server/helpers.ts
 M src/server/stages/TypeStage.ts
 M src/core/validators.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/src/core/errors.test.ts
 M tests/src/server/Probe.test.ts
 M tests/src/server/helpers.test.ts
 M tests/src/server/stages/TypeStage.test.ts
```

Fourteen files, matching the earlier units' set. No other files modified.

## Deviations

None.
