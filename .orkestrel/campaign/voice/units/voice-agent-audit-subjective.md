# Audit lane output — voice-agent, subjective lane (FAIL 1, 2)

## Verdicts

1. BROKEN — two rewritten first sentences change meaning rather than voice. /home/user/fleet/agent/src/core/conversations/Conversation.ts:21 "Groups messages ABOVE a flat message store — a live uncompacted tail it OWNS DIRECTLY …": deleting the old subject "A conversation" orphaned "it", whose nearest antecedent is now "a flat message store", inverting the class's central claim that the conversation owns the tail above the store. /home/user/fleet/agent/src/core/Channel.ts:4 and /home/user/fleet/agent/src/core/types.ts:918 "Buffers chunks/values in a(n) (minimal) unbounded async stream": the symbol's name was removed by renaming the concept into a term this package already uses for a different one (StreamInterface at types.ts:957, AgentStreamInterface, agent.stream(), provider.stream()), and the block contradicts itself — types.ts:931 "@typeParam T - The value type the channel carries" and types.ts:940 "Ends the channel normally".

2. BROKEN — the "never repeats the symbol's name" half holds everywhere; the verb half does not. types.ts:1731 "Folds … , regenerates the rollup, and emit `summary` then `compact`." leaves the third verb imperative on an untouched line, so one sentence carries two voices. types.ts:1080, types.ts:1443, types.ts:1465 open "If `true`, …" with no verb at all (defensible under the same rule section's boolean-parameter clause, but an unrecorded exception and applied inconsistently). AgentContext.ts:31 "Holds the richer turn context …" on a class that IS that context, while its untouched interface at types.ts:638 says "Assembles a turn's provider input from …". types.ts:821 "Sums the {@link TokenUsage} …" on a field that IS the sum.

3. CONFIRMED — every boolean @returns reads "True if …; false otherwise" with the original condition kept: errors.ts:35, errors.ts:91, errors.ts:142, errors.ts:191, types.ts:1717, types.ts:2040, validators.ts:25, validators.ts:56, validators.ts:92. types.ts:2040 keeps both no-store and unknown-id cases; types.ts:1717 keeps "any was removed". Searches of src/ for "@returns `true`", "@returns `false`", and "@returns Whether" return nothing; the surviving "Whether" hits (ThinkSplitter.ts:45, ThinkSplitter.ts:47) are // field comments, outside the population.

4. CONFIRMED — a pattern over every added and removed diff line for @param, @remarks, @example, @throws, @typeParam, and @deprecated returns no hits, so only @returns tag lines moved. Every added and removed line is comment text (pattern ^[+-][^+\-\t *] matches only types.ts:683-684, itself a /** … */ line). Already-compliant sentences survive as unchanged diff context: "/** Paces the loop — `yield`ed between turns so the host regains control. */" and "/** Overrides the manager's default `sections` cap for this conversation. */". src/core/index.ts is the only source file the status omits and it carries no TSDoc block.

## Findings outside the claims

Lane held: SUBJECTIVE (voice, wording, meaning kept, guide voice), on Opus 5, run on the writer's engine because the Sol bench is dark.

Required changes:
- Conversation.ts:21 — restore the antecedent: "… — a live uncompacted tail the conversation OWNS DIRECTLY plus …".
- Channel.ts:4 and types.ts:918 — keep the concept and drop only the name, for example "Buffers values for an unbounded async producer/consumer handoff — a producer WRITES them in (`push`) …". "stream" belongs to StreamInterface.
- types.ts:1732 — "and emits `summary` then `compact`."
- AgentContext.ts:31 — "Represents the richer turn context the agent loop assembles a provider request from — …".
- types.ts:821 — "Holds the summed {@link TokenUsage} across the turn's provider calls (present when any reported it)."

Findings outside the claims:
1. Boolean options now read four ways: types.ts:118 (`think`) "Overrides …", types.ts:1617 (`summary`) "Includes …", types.ts:1080/1443/1465 "If `true`, …", types.ts:1683 (`summarizable`) "Reports whether". The options bag is the most-read surface, and a reader comparing AgentOptions with AgentQueueOptions meets the same switch described two incompatible ways. Pick one form for a boolean option and apply it to think, summary, fault, and both partial entries; leave summarizable on "Reports whether" because it is a readonly state property.
2. types.ts:388 — "One context section's optional format override" became "Overrides one context section's format": "optional" is gone, and the remarks at types.ts:394 restate that the members are optional, a different fact. Right: "Holds one context section's optional format override — an `open` / `render` / `close` trio …".
3. constants.ts describes constants of one kind with four idioms: constants.ts:2 "Caps …", constants.ts:19 "Sets …", constants.ts:74 "Estimates …", constants.ts:82 "Names …" — the last two are adjacent token-cost estimates introduced differently. A number does not cap or estimate; the loop and estimateMessages do. Use "Names" or "Holds" throughout the file, keeping the rest of each sentence.
4. errors.ts:58 — "the job's `partial` policy is `false`" became "under a `partial` policy of `false`", dropping a possessive the writer's brief told the unit to keep. Right: "under the job's `partial` policy of `false`".
5. types.ts:1473 — "Summarizes a conversation, provider-agnostically" coins an adverb; right: "Summarizes a conversation without importing a provider — the seam the agent RUNTIME supplies …".
6. types.ts:1080 is scope creep: the only change is "When `true`" to "If `true`", which neither of the wave's transforms produced and which leaves the sentence non-compliant with the first-sentence clause before and after. Record it as a decision.
7. Low priority: ragged wrapping where only a block's first line was edited — types.ts:689-690 and types.ts:1846-1847 leave a widened opener over a two-word orphan. Rewrapping the first sentence is in scope.

Referrals to the Orchestrator (the objective lane is dark):
- I ran no gate and treat the writer's gate results as non-evidence. The rewrites at types.ts:1443 and types.ts:1465 materially lengthen single-line comment blocks; confirm format:check on the authoritative landing chain.
- Completeness against the launch scan (voice-scan.mjs) is mechanical and belongs to the checker. My sampling found no leftover imperative or verbless block opener in src/, but I sampled rather than enumerated.
