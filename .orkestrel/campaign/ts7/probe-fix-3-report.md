# Unit ts7-probe-fix-3 — report

## `npm run check` readings

- Before edits: exit 1. `src/server/helpers.ts(443,61): error TS2322: Type 'Record<string, unknown>' is not assignable to type 'typeof ts | typeof import(".../vitest/dist/node")'. Type 'Record<string, unknown>' is missing the following properties from type 'typeof ts': tokenToString, getPositionOfLineAndCharacter, getLineAndCharacterOfPosition, isWhiteSpaceLike, and 553 more.`
- After edits: exit 0.

## Edits applied

`src/server/helpers.ts:431-444`:
1. `const loaded = outcome.value` → `const loaded: unknown = outcome.value`.
2. `return loaded` (inside the first `if`) → `return outcome.value`.
3. `const served = bridged.value` → `const served: unknown = bridged.value`.
4. `return served` → `return bridged.value`.
5. Extended the first comment with: "Each branch reads its value through an `unknown` alias and returns the value `require` produced, because the guard narrows the alias to a record carrying `createProgram` rather than to the compiler's module type the overloads return."

## Gate exit codes

- `npm run format` (converge): exit 0.
- `npm run format:check`: exit 0.
- `npm run lint:check`: exit 0.
- `npm run check`: exit 0.
- `npm run build`: exit 0.
- `npx vitest run --config vite.config.ts --no-cache --project src:server tests/src/server/helpers.test.ts tests/src/server/stages/TypeStage.test.ts`: exit 0.

## `git status --short`

```
 M guides/probe.md
 M package-lock.json
 M package.json
 M src/core/types.ts
 M src/server/Probe.ts
 M src/server/helpers.ts
 M src/server/stages/TypeStage.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/src/core/errors.test.ts
 M tests/src/server/Probe.test.ts
 M tests/src/server/helpers.test.ts
 M tests/src/server/stages/TypeStage.test.ts
```

All listed files predate this unit (earlier units' uncommitted edits); this unit touched only `src/server/helpers.ts`.

## Deviations

None. No commit, push, or discarding git command was run.
