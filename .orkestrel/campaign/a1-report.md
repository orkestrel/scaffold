# Unit A1 report

## Touched files

- `tmp/units/a1-report.md`: records the required stop report.
- No source, test, or configuration files changed.

`git diff --stat` exited 0 with empty output.

## Contract

No additions were made to `src/core/types.ts`; there is no added contract to reproduce.

## Red then green

The `isMessage`, `joinThinking`, bounded error-read, and unresolved-header-hook tests were not written or run. Failing and passing counts are unavailable because the unit stopped before implementation.

## Scoped validation

The following commands were not run after the contract conflict was identified. Exit codes and test counts are unavailable.

- `npm run lint:check`
- `npm run check:src:core`
- `npm run check`
- `npm run test:src:core`
- `npm run test:setup`

## Observations

- `npm run test:guides` was not run.
- Vitest worker spawning was not measured.
- The `prove` tool was called with `configs/src/tsconfig.core.json`, the brief's message shape, a case asserting type inequality, and a control asserting the required equality. The call was blocked before execution with this exact response: `MCP tool call requires approval, but approval policy is never`. No receipt or compiler diagnostic was produced. The finding below rests on declarations, not an executed compiler proof.
- No `contracts.ts` values were created. The inspected lint rule permits camelCase there: `configs/policy.ts:976` confines its UPPER_SNAKE_CASE check to `constants.ts`; `contracts.ts` belongs to `DATA_SOURCE_FILES`. `.oxlintrc.json` enables that rule.
- `git status --porcelain` exited 0 with empty stdout and emitted the following warning twice: `warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied`.

## Deviation

Stopped under the brief's deviation contract: the required exact shape/domain type equality conflicts with the installed declarations.

**Expected:** Each prescribed JSON shape's `Infer` equals its authoritative domain type, while tool-call arguments, tool parameters, and request schemas use `recordShape(jsonShape())`.

**Found:** The authoritative domain types admit non-JSON values at those fields. A JSON-only shape narrows them, so its inferred type cannot equal the domain type as written.

**Exact evidence:**

- `src/core/types.ts:32` declares `Message.calls?: readonly ToolCall[]`.
- `node_modules/@orkestrel/tool/dist/src/core/index.d.ts:126` declares `ToolCall.arguments: Readonly<Record<string, unknown>>`; line 128 declares `caller?: unknown`, which the brief deliberately excludes from the shape.
- The same declaration file at line 143 declares `ToolDefinition.parameters?: Readonly<Record<string, unknown>>`.
- `src/core/types.ts:121` declares `ProviderStreamOptions.schema?: Readonly<Record<string, unknown>>`.
- `node_modules/@orkestrel/contract/dist/src/core/index.d.ts:5440` declares `recordShape` as returning `ObjectShape<Record<never, never>, S>`. Its `Infer`, `InferIndex`, and `InferObject` declarations at lines 1931, 2008, and 2035 resolve the JSON-valued record to JSON values. `JSONValue` at line 3731 excludes values such as `undefined` and functions, which `unknown` admits.
- The lockfile resolves `@orkestrel/contract` to `0.0.17` and `@orkestrel/tool` to `0.0.14`.

**Done or not done:** Dependency declarations and the conflicting requirement were inspected. Implementation, regression proofs, and acceptance gates are not done. No assertions, type narrowing, or dependency changes were introduced to conceal the conflict.

**Hypothesis:** The brief conflates domain types with their JSON projections. Distinct wire types and equality checks against those projections would preserve the wider domain contracts while keeping the wire JSON-only; that requires a revised ruling.

## Status

`git status --porcelain` stdout was empty, verbatim:

```text
```

