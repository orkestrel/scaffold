# Unit A3-fix-3 report — type imports first in every guide fence

## Fences found (heading, guide line of the value import that preceded a type import)

1. `## Surface` — line 24 (`import { createAbort } ...` before line 25 `import type { ProviderInterface }`)
2. `## Surface` — line 75 (`import { createAgentContext } ...` before line 76 `import type { ProviderInterface }`)
3. `## Surface` — line 98 (`import { createAgent } ...` before line 99 `import type { ProviderInterface }`)
4. `### Conversations & compaction` (titled `@example`) — line 219 (`import { createConversation } ...` before line 220 `import type { ProviderInterface }`)
5. `### Shapes and contracts` — line 534 (`import { providerRequestContract, relayFrameContract } ...` before line 535 `import type { ProviderInterface }`)
6. `### Helpers` — line 587 (`import { agentResultToJSON } ...` before line 588 `import type { AgentResult }`)
7. `### Helpers` — line 599 (`import { handleAgentQueueJob, handleAgentRunnerJob, sanitizeToken } ...` before line 600 `import type { AgentRegistryInterface }`)
8. `### Running the loop (instead of driving the provider by hand)` — line 1170 (`import { createAgent } ...` before line 1171 `import type { ProviderInterface }`)
9. `### Observing an agent (push vs. pull)` — line 1208 (`import { createAgent } ...` before line 1209 `import type { ProviderInterface }`)
10. `### Pulling context from another conversation (with provenance)` — line 1236 (`import { createAgent, createConversationManager } ...` before line 1237 `import type { ProviderInterface }`)
11. `### Running many durable agents as jobs` — line 1298 (`import { createAgentQueue, createAgentRegistry } ...` before line 1299 `import type { AgentJobInput }`)
12. `### Giving the model documents to read` — line 1337 (`import { createAgent } ...` before line 1338 `import type { ProviderInterface }`)
13. `### Switching which workspace the model sees` — line 1357 (`import { createAgent, createScope } ...` before line 1358 `import type { ProviderInterface }`)
14. `### Removing / clearing entries, and the less-common accessors` — line 1384 (multi-line `import { createAgent, createAgentContext, createAgentRegistry, createAuthority, createConversationManager, createInstructionManager, createScopeManager, createThinkSplitter } ...` before line 1394 `import type { ProviderInterface }`)

Sites checked and found already type-first (no change, not counted as violations): the `Writing a
provider for a new wire` example (`AgentProvider.ts:32`, guide near line 1050), the `Mounting the
relay on your server` example (`factories.ts:80`, guide near line 1100), and the `Reaching the
relay from the browser` example (`factories.ts:141`, guide near line 1125).

## Source twins reordered

Of the fourteen fences, only item 4 (`Conversations & compaction`, heading at guide line 218) has
a titled `@example` twin: `src/core/factories.ts` around line 184. Its `import { createConversation
} from '@orkestrel/agent'` / `import type { ProviderInterface } from '@orkestrel/agent'` pair was
reordered identically, keeping the fence byte-equal to the guide. No other reordered fence has a
matching titled source `@example`, so no other source file changed.

## Gate commands and counts

- `npm run test:guides` — exit 0, `43 passed (43)` (same count named in the brief).
- `npm run format:check` — exit 0, "All matched files use the correct format."
- `npm run lint:check` — exit 0, no findings.
- `npm run check` — exit 0 (`tsc --noEmit` across the root and `check:src:core` project both
  clean).

## Deviation

None. Every reorder was a same-fence, same-line-count swap; no presence guard in
`tests/guides.test.ts` quotes any of the reordered import lines, and the one parity pair
(`Conversations & compaction`) stayed byte-equal after mirroring the reorder in
`src/core/factories.ts`.

## Status

```
git status --porcelain
 M guides/agent.md
 M src/core/factories.ts
```
