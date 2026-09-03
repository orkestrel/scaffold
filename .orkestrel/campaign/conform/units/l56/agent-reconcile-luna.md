## Question

Map every `CONFIRMED` ruling against the four reconciliation rules and sweep breaking identifiers for fleet consumers.

## Evidence

### agent-obj-1 — breaking: false

Ground: “Programmer error or invalid argument” must “Throw an `AppError`.” Evidence: `src/core/AgentRegistry.ts:132-136`.

1. Fold candidate: none.
2. Off-limits repair: none.
3. Consumer-only repair: none.
4. Breaking sweep: not applicable.

### agent-obj-2 — breaking: false

Ground: “Derive state. Compute facts from existing fields.” Evidence: `src/core/Agent.ts:108-147`.

1. Fold candidate: none.
2. Off-limits repair: none.
3. Consumer-only repair: none.
4. Breaking sweep: not applicable.

### agent-obj-3 — breaking: false

Ground: “Transcribe each flagship fence and assert the values its comments claim.” Evidence: `tests/guides.test.ts`, `guides/agent.md:61-63`.

1. Fold candidate: none.
2. Off-limits repair: none.
3. Consumer-only repair: none.
4. Breaking sweep: not applicable.

### agent-obj-4 — breaking: false

Ground: “Mirror module/application structure.” Evidence: `src/core/validators.ts:35-102`, missing `tests/src/core/validators.test.ts`.

1. Fold candidate: none.
2. Off-limits repair: none.
3. Consumer-only repair: none.
4. Breaking sweep: not applicable.

### agent-obj-5 — breaking: false

Ground: “No nested functions.” Evidence: `tests/setup.ts:140-204,316-319`.

1. Fold candidate: none.
2. Off-limits repair: none.
3. Consumer-only repair: none.
4. Breaking sweep: not applicable.

### agent-obj-6 — breaking: false

Ground: “Export every reusable helper, fixture type, factory, constant, and guard from setup files.” Evidence: `tests/setup.ts:110-118`.

1. Fold candidate: none.
2. Off-limits repair: none.
3. Consumer-only repair: none.
4. Breaking sweep: not applicable.

### agent-obj-7 — breaking: false

Ground: “Test files import shared infrastructure rather than declaring local fixture factories.” Evidence: `tests/src/core/Agent.test.ts:715-786`, `tests/src/core/AgentContext.test.ts:585-860`.

1. Fold candidate: none.
2. Off-limits repair: none.
3. Consumer-only repair: none.
4. Breaking sweep: not applicable.

### agent-obj-8 — breaking: false

Ground: “Reuse the originating package directly when semantics match.” Evidence: `src/core/Agent.ts:673-676`, `node_modules/@orkestrel/workflow/dist/src/core/index.d.ts:1013-1019`.

1. Fold candidate: none.
2. Off-limits repair: none.
3. Consumer-only repair: none.
4. Breaking sweep: not applicable.

### agent-obj-9 — breaking: false

Ground: “Do not write [ `as const` ] on a value whose contract is already declared.” Evidence: `src/core/errors.ts:21,76`.

1. Fold candidate: none.
2. Off-limits repair: none.
3. Consumer-only repair: none.
4. Breaking sweep: not applicable.

### agent-obj-10 — breaking: true

Ground: “`*/types.ts` is authoritative for public APIs.” Evidence: `src/core/scopes/ScopeManager.ts:45`, `src/core/types.ts:553-561`.

1. Fold candidate: carrier `agent-obj-10`; `agent-subj-2` states, “Carry it as the single row written under agent-obj-10.”
2. Off-limits repair: none.
3. Consumer-only repair: none.
4. Breaking sweep: the constructor shape changes, but no public identifier is renamed or removed. No source consumer.

### agent-subj-1 — breaking: false

Ground: “An id list applies to those items and returns true only when all succeed.” Evidence: the four array branches at `InstructionManager.ts:114-119`, `ScopeManager.ts:80-85`, `Conversation.ts:159-164`, and `ConversationManager.ts:151-156`.

1. Fold candidate: none.
2. Off-limits repair: none.
3. Consumer-only repair: none.
4. Breaking sweep: not applicable.

### agent-subj-2 — breaking: true

Ground: “`*/types.ts` is authoritative for public APIs.” Evidence: `src/core/scopes/ScopeManager.ts:45`, `src/core/types.ts:553-561`.

1. Fold candidate: `agent-obj-10` — “Carry it as the single row written under agent-obj-10.”
2. Off-limits repair: none.
3. Consumer-only repair: none.
4. Breaking sweep: the constructor shape changes, but no public identifier is renamed or removed. No source consumer.

### agent-subj-3 — breaking: false

Ground: “Claim only what the reader can check” and “NEVER state a count.” Evidence: `src/core/factories.ts:270-280`, `src/core/types.ts:474-515`.

1. Fold candidate: none.
2. Off-limits repair: none.
3. Consumer-only repair: none.
4. Breaking sweep: not applicable.

### agent-subj-4 — breaking: false

Ground: “Do not document speculative future product behavior unless requested.” Evidence: `src/core/types.ts:1216-1217,1277-1279,1662`.

1. Fold candidate: none.
2. Off-limits repair: none.
3. Consumer-only repair: none.
4. Breaking sweep: not applicable.

### agent-subj-5 — breaking: false

Ground: “`AGENTS.md` and its linked rules are the sole convention source.” Evidence: `guides/agent.md:54,485,1103,1139`, `guides/README.md:3,105`.

1. Fold candidate: none; the overlap with `agent-subj-13` is a different token class and operative change.
2. Off-limits repair: none.
3. Consumer-only repair: none.
4. Breaking sweep: not applicable.

### agent-subj-6 — breaking: false

Ground: “NEVER name a list item by its position.” Evidence: `src/core/Agent.ts:365,553`, `src/core/types.ts:685`, `guides/agent.md:766-792`.

1. Fold candidate: none.
2. Off-limits repair: none.
3. Consumer-only repair: none.
4. Breaking sweep: not applicable.

### agent-subj-7 — breaking: false

Ground: “A guide tagline and a Surface-row description are noun phrases.” Evidence: `guides/agent.md:379-513`.

1. Fold candidate: none.
2. Off-limits repair: none.
3. Consumer-only repair: none.
4. Breaking sweep: not applicable.

### agent-subj-12 — breaking: false

Ground: “`e.g.` → `for example`; `i.e.` → `that is`; `via` → `through`, `by using`.” Evidence: `src/core/types.ts:1227`, `src/core/factories.ts:304`, `guides/agent.md:763`.

1. Fold candidate: none.
2. Off-limits repair: none.
3. Consumer-only repair: none.
4. Breaking sweep: not applicable.

### agent-subj-13 — breaking: false

Ground: “Word every sentence so the reader understands it on the first read.” Evidence: `src/core/errors.ts:121`, `src/core/Agent.ts:90,98,161,176,354,427,478,499,546,566,582,600,648`.

1. Fold candidate: none; `agent-subj-5` owns the broader `§` citation sweep, while this ruling owns campaign identifiers.
2. Off-limits repair: none.
3. Consumer-only repair: none.
4. Breaking sweep: not applicable.

### agent-subj-14 — breaking: true

Ground: “One concept, one term. Do not alternate synonyms.” Evidence: `src/core/types.ts:277-302,739`, `src/core/helpers.ts:570-576`.

1. Fold candidate: none.
2. Off-limits repair: none.
3. Consumer-only repair: none.
4. Breaking sweep: `InstructionInterface.format` and `InstructionInput.format` rename to `override`. No fleet source consumer uses that per-item member. Mirror hits are:
   - `/home/user/fleet/toolbox/guides/agent.md:167,179,194,337,341,342,343,344,346,353,365,373,404,494,499,500,502,503,592,623,715,1049` — mirror
   - `/home/user/fleet/ollama/guides/agent.md:167,179,194,337,341,342,343,344,346,353,365,373,404,494,499,500,502,503,592,623,715,1049` — mirror

## Distillate

Confirmed ids: `agent-obj-1`, `agent-obj-2`, `agent-obj-3`, `agent-obj-4`, `agent-obj-5`, `agent-obj-6`, `agent-obj-7`, `agent-obj-8`, `agent-obj-9`, `agent-obj-10`, `agent-subj-1`, `agent-subj-2`, `agent-subj-3`, `agent-subj-4`, `agent-subj-5`, `agent-subj-6`, `agent-subj-7`, `agent-subj-12`, `agent-subj-13`, `agent-subj-14`.

Rule 1 flagged `agent-subj-2`, folded into carrier `agent-obj-10`. Rule 2 flagged none. Rule 3 flagged none.

Breaking source consumers: none. Mirror checkouts: `toolbox`, `ollama`.

Sweep sites not readable: none.

## Unknowns

None.

## Journal

Left for the driver.

## Deviation

none