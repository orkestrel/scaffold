# Agent native declaration repair report

## Outcome

The owned documentation repair is complete. The Agent guide now carries explicit method groups for `StreamInterface`, `ConversationStoreInterface`, `MemoryConversationStore`, and `DatabaseConversationStore`. `MemoryConversationStore` now carries source method comments that match the interface semantics. Runtime code, public types, the native guide entry, and its guards are unchanged.

This report does not accept the repair. Root owns formatting, the native parity rerun, explicit rewrites, and repository gates.

## Owned changes

- `C:/Users/mikes/WebstormProjects/agent/guides/agent.md`
  - Extended the Methods introduction to name the newly covered contract and store classes.
  - Removed the redundant inline `StreamInterface.abort` description.
  - Added explicit `Method` / `Returns` / `Summary` tables for the stream contract, the store contract, and the memory and database store classes.
  - Kept the class tables explicit because their class names have no same-name interface contracts.
- `C:/Users/mikes/WebstormProjects/agent/src/core/conversations/stores/MemoryConversationStore.ts`
  - Added description, parameter, and return documentation to `get`, `set`, and `delete`.
  - Kept method signatures and executable statements unchanged.
- `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/d7n-agent-native-declarations-report.md`
  - Recorded this successor result.

The predecessor edit in `tests/guides.test.ts` and `d7n-agent-native-entry-report.md` remain unchanged.

## Source-to-cell mapping

| Guide group | Method | Returns cell | Summary source |
| --- | --- | --- | --- |
| `StreamInterface` | `abort` | `void` | `StreamInterface.abort`: “Cancels the in-flight operation — fires its bound signal.” |
| `ConversationStoreInterface` | `get` | `Promise<ConversationSnapshot \| undefined>` | `ConversationStoreInterface.get`: “Resolves the persisted snapshot for `id`, or `undefined` if none is stored.” |
| `ConversationStoreInterface` | `set` | `Promise<void>` | `ConversationStoreInterface.set`: “Inserts or replaces a snapshot under its own `snapshot.id` (no separate id param — mirroring `WorkspaceStoreInterface`'s `set`).” |
| `ConversationStoreInterface` | `delete` | `Promise<void>` | `ConversationStoreInterface.delete`: “Drops a snapshot by id; an absent id is a no-op (no throw).” |
| `MemoryConversationStore` | `get` | `Promise<ConversationSnapshot \| undefined>` | New method comment copied from `ConversationStoreInterface.get`. |
| `MemoryConversationStore` | `set` | `Promise<void>` | New method comment copied from `ConversationStoreInterface.set`. |
| `MemoryConversationStore` | `delete` | `Promise<void>` | New method comment copied from `ConversationStoreInterface.delete`. |
| `DatabaseConversationStore` | `get` | `Promise<ConversationSnapshot \| undefined>` | Existing `DatabaseConversationStore.get` comment: “Resolves the persisted snapshot for `id`, narrowing the opaque JSON column back to a `ConversationSnapshot`.” |
| `DatabaseConversationStore` | `set` | `Promise<void>` | Existing `DatabaseConversationStore.set` comment: “Inserts or replaces under the snapshot's own `id` (no separate id param) — the row is `{ id, snapshot }`.” |
| `DatabaseConversationStore` | `delete` | `Promise<void>` | Existing `DatabaseConversationStore.delete` comment: “Drops a snapshot by id; an absent id is a no-op (no throw).” |

## Existing example coverage

The existing TypeScript guide fence containing `agent.abort(...)` supplies the method-name example for `StreamInterface.abort` under Guide's presence check.

No existing TypeScript guide fence mentions `get`, `set`, or `delete`. The unresolved example gaps are therefore:

- `ConversationStoreInterface.get`
- `ConversationStoreInterface.set`
- `ConversationStoreInterface.delete`
- `MemoryConversationStore.get`
- `MemoryConversationStore.set`
- `MemoryConversationStore.delete`
- `DatabaseConversationStore.get`
- `DatabaseConversationStore.set`
- `DatabaseConversationStore.delete`

The writer did not invent unexecuted guide proof for these methods, as the successor brief requires.

## Scoped validation

- `git diff --check -- guides/agent.md src/core/conversations/stores/MemoryConversationStore.ts` completed with no diagnostics.
- `rg -n '�' guides/agent.md src/core/conversations/stores/MemoryConversationStore.ts` found no replacement characters.
- `rg -n "\.abort\(|\.get\(|\.set\(|\.delete\(" guides/agent.md` found the existing `agent.abort(...)` fence and no store-method call in a guide fence.
- `git diff --stat -- guides/agent.md src/core/conversations/stores/MemoryConversationStore.ts` reported `guides/agent.md | 40 +++++++++++++++++++++-` and `MemoryConversationStore.ts | 19 ++++++++++`.

Root gates were not run. No shared-file patch is required.
