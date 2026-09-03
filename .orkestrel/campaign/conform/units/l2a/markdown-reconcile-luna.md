## Question

Map every `CONFIRMED` refuter ruling against the reconciliation rules and sweep breaking identifiers for consumers.

## Evidence

### `markdown-subj-1`

- Breaking: `true`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: Rename `MarkdownHandlers` to `MarkdownHandlerMap`. No source consumer found in the requested fleet and scaffold paths.
- Evidence: `MarkdownHandlers<T>` is declared at `/home/user/fleet/markdown/src/core/types.ts:453` and referenced by the package's source, guide, and tests.

### `markdown-subj-2`

- Breaking: `false`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable.
- Evidence: The stale citation is at `/home/user/fleet/markdown/guides/markdown.md:897`; `/home/user/fleet/markdown/AGENTS.md:1` has no numbered sections.

### `markdown-subj-3`

- Breaking: `false`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable.
- Evidence: The stale citations are at `/home/user/fleet/markdown/guides/README.md:3` and `/home/user/fleet/markdown/guides/README.md:51`.

### `markdown-subj-4`

- Breaking: `false`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable.
- Evidence: The invalid `guides/src` row is at `/home/user/fleet/markdown/guides/README.md:16`.

### `markdown-subj-5`

- Breaking: `false`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable.
- Evidence: The nonconforming boolean parameter documentation is at `/home/user/fleet/markdown/src/core/helpers.ts:2170-2171`.

### `markdown-obj-1`

- Breaking: `false`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable.
- Evidence: The duplicated whitespace normalization is at `/home/user/fleet/markdown/src/core/helpers.ts:2356-2360` and `/home/user/fleet/markdown/src/core/helpers.ts:2548`; the matching dependency primitive is imported from `@orkestrel/html` at `/home/user/fleet/markdown/src/core/helpers.ts:41-49`.

### `markdown-obj-2`

- Breaking: `false`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable.
- Evidence: The guide parity suite is at `/home/user/fleet/markdown/tests/guides.test.ts:63-168`; executable value claims remain in `/home/user/fleet/markdown/guides/markdown.md:820-882`.

### `markdown-obj-3`

- Breaking: `false`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable.
- Evidence: The wall-clock interval is at `/home/user/fleet/markdown/tests/src/core/parsers.test.ts:623-627`.

### `markdown-obj-4`

- Breaking: `false`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: not applicable.
- Evidence: The anonymous public return types are at `/home/user/fleet/markdown/src/core/helpers.ts:906` and `/home/user/fleet/markdown/src/core/helpers.ts:1008`.

## Distillate

- Confirmed ids: `markdown-subj-1`, `markdown-subj-2`, `markdown-subj-3`, `markdown-subj-4`, `markdown-subj-5`, `markdown-obj-1`, `markdown-obj-2`, `markdown-obj-3`, `markdown-obj-4`
- Fold candidates: none
- Off-limits repairs: none
- Consumer-only repairs: none
- Breaking-sweep source consumers: none
- Sites the sweep could not read: none

## Unknowns

none

## Journal

Leave for the driver.

## Deviation

none