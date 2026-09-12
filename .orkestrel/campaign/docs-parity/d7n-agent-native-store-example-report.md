# Agent native store example report

## Outcome

The owned store workflow example and its native flagship transcription are ready for root verification. The guide now demonstrates the same snapshot through the real memory store and the database store over `createMemoryDriver()`. The package-owned test drives that workflow and pins the guide lines it transcribes.

This report does not accept the repair. Root owns the native rerun, formatting, explicit rewrites, and repository gates.

## Reproduced baseline

Root's retained action under `scaffold/tmp/pass/d7n-agent-native-declarations-green` exited `1`. The method-example assertion named missing `get` and `set` examples for `ConversationStoreInterface`, `MemoryConversationStore`, and `DatabaseConversationStore`.

The predecessor report also identified `delete` from a static guide-fence scan. Root's executed result did not report `delete`. This successor preserves that distinction. The new workflow still calls `delete` and confirms the following read is absent because the brief requires the complete store lifecycle.

## Owned changes

- `C:/Users/mikes/WebstormProjects/agent/guides/agent.md`
  - Added “Persisting a conversation through either store” with a full lead-in sentence.
  - Creates a real conversation and takes its generated snapshot without hard-coding its id.
  - Builds `createMemoryConversationStore()` and `createDatabaseConversationStore(createMemoryDriver())`.
  - Runs `set(snapshot)`, `get(conversation.id)`, deep JSON equality, `delete(conversation.id)`, and the missing read through each store.
  - Preserved the existing method tables and source-derived summaries.
- `C:/Users/mikes/WebstormProjects/agent/tests/guides.test.ts`
  - Imports the database driver and Agent factories inside the existing `GuideCommand` worker callback.
  - Added a flagship case that drives the guide workflow through the real memory and database stores.
  - Asserts the stored snapshot equals the conversation snapshot and the read after deletion is `undefined`.
  - Added the adjacent guide-text case that pins each relevant transcription line.
- `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/d7n-agent-native-store-example-report.md`
  - Recorded this successor result.

The native entry, missing-Summary guard, generic report assertions, existing flagship assertions, declaration tables, Memory store comments, and predecessor reports remain unchanged.

## Scoped validation

`git diff --check -- guides/agent.md tests/guides.test.ts` completed with no diagnostics.

Root gates and the native parity rerun were not run in the writer. The post-fix passing measurement therefore remains root-owned. No shared-file patch is required.
