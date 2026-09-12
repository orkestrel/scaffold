# Report — Toolbox native guides entry

## Changed responsibilities

`tests/guides.test.ts` delegates inventory, manifest parsing, generic parity, native checking, and explicit rewrite handling to `GuideCommand`. The entry supplies Toolbox's root, inventory patterns, module map, admitted fence language, host reader, and Vitest runner.

The module scope imports `GuideCommand`, `readInventory`, and `createVitest`. The `execute` callback imports the Vitest assertions, Toolbox aliases, and runtime dependencies. Native execution no longer resolves `@src/core` before the command selects its path.

The package assertion callback binds the README pitch through the `@orkestrel/toolbox` name in `package.json`. It also carries the missing-`Summary` guard from the accepted native pattern.

The explicit internal inventory still names `TerminalBridge` and `TerminalConnection`.

## Preservation mapping

| Package responsibility | Preserved assertion |
| --- | --- |
| Workflow and agent lineage | `tagWorkflow`, `tagAgent`, `normalizeLineage`, `extendLineage`, `isWorkflowLineage`, `deriveWorkflowDepth`, and `isAgentFunction` retain their prior expected values. |
| Draft completion | `createWorkflowDraftContract` still accepts the documented draft, and `completeTaskDraft` still fills the documented identity and behavior fields. |
| Relation includes | `expandInclude` still expands the documented dot paths into the expected tree. |
| Query limit probing | `clampQuery` still retains the effective limit and probes past it as documented. |
| Endpoint bridge | `createEndpointTool` and `createToolManager` still execute the documented call and return the expected row. |

## Touched paths

- `C:/Users/mikes/WebstormProjects/toolbox/tests/guides.test.ts`
- `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/d7n-toolbox-native-entry-report.md`

Shared-file patches: none.

## Scoped validation

`git diff --check -- tests/guides.test.ts` exited `0`.

The top-level import scan returned:

```text
5:import { GuideCommand } from '@orkestrel/guide/server'
6:import { readInventory } from '@orkestrel/test/server'
7:import { createVitest } from 'vitest/node'
```

The alias-import scan found `@src/core` only inside the `execute` callback:

```text
63: } = await import('@src/core')
```

The forbidden-pattern scan covered `any`, TypeScript ignore directives, lint suppressions, spies, and module mocks in `tests/guides.test.ts`. It returned no matches with exit `1`.

`git status --short` in Toolbox returned:

```text
 M tests/guides.test.ts
```

The owned diffstat returned:

```text
tests/guides.test.ts | 445 +++++++++++++++++++--------------------------------
1 file changed, 164 insertions(+), 281 deletions(-)
```

## Root-owned validation

The writer did not run the native guides command, format gate, lint gate, typecheck, build, or test suite. Root owns those runs.

No deviation occurred.
