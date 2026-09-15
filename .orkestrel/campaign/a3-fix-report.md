# Unit A3-fix — report

## Failing names before

`npm run test:guides`: 1 failed, 38 passed. The single failure was
`Agent, AgentProvider, RelayProvider, RelayStream > documents every barrel export`, with
`AssertionError: expected [ 'class AgentProvider' ] to deeply equal []` — the missing row, nothing
else failed.

## Row added

In `guides/agent.md` § Surface → Classes, inserted before the `RelayProvider` row (matching that
table's existing `API | Kind | Summary` column form, no `Shape` column exists for this table):

```
| `AgentProvider`             | class | Implements bounded HTTP streaming and result assembly behind concrete wire seams.                                                                                                                                                                                                                                                                                                                                                                                                                      |
```

The Summary cell equals the description paragraph of the doc block on
`export abstract class AgentProvider` in `src/core/AgentProvider.ts` (the `@remarks` and
`@example` are excluded, matching what `findDrift` compares).

## Sentence removed

From § Contract, clause 1 (**Doc ↔ source bijection**), removed:

> An `abstract class` sits outside the reflection grammar that gate reads, so `AgentProvider`
> carries no Surface row of its own: its contract `AgentProviderInterface` carries one and its
> members are documented under [`## Methods`](#methods).

The remainder of clause 1 (the bijection statement) is unchanged.

## Green run

`npm run test:guides`: 1 test file passed, 39 tests passed (up from 38 passed / 1 failed).

## Gate exit codes

- `npm run format:check`: exit 0 ("All matched files use the correct format.").
- `npm run lint:check`: exit 0 (no output, no warnings/errors).

## Deviation

None. The row and the sentence were the only edits required; no change was needed outside
`guides/agent.md`.

## Status

```
 M guides/agent.md
```
