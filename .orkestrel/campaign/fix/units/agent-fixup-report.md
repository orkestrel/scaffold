# Report — unit agent-fixup (builder, Sonnet)

Every finding closed. 1: `src/core/factories.ts:393` `chunk.category === 'token'`. 2:
`src/core/helpers.ts:159,171` `consumer`. 3: `guides/agent.md:260` "consumer = a token
estimator". 4: `src/core/helpers.ts:667-668` `// ['<payload>']`. 5: `guides/agent.md:508` "when a
job ended partial and the `partial` policy is `false`". 6: `guides/agent.md:751` "the `snapshot`
seam". 7: `guides/agent.md:739` "the `snapshot` option". 8: `src/core/types.ts:841-842` the
`RunOutcome` remark reads "the settled outcome one run returns, before the agent folds it into
the `AgentResult` its `stream`'s `result` promise resolves". Ancillary decision: the `<base64>`
sweep also matched the self-consistent placeholders at `src/core/helpers.ts:598-599`
(`attachImages` example) and `guides/agent.md:189`; both take `<payload>` so the criterion's
zero-hit sweep holds under one convention.

Sweeps over `src`, `tests`, `guides/agent.md`, `README.md`: `chunk.type|delta.type` no hit;
`` `consume` `` survives only as the method (`src/core/Agent.ts:614`, `guides/agent.md:783,1101`);
`seed seam|analogue of the seed`, `<base64>`, `INTERNAL precursor` no hit.

Gates: lint 0 and format 0 to converge (table alignment only); format:check 0, lint:check 0,
check 0, build 0, test 0 (src 606; policy 111; config 46; setup 34; guides 83).
`git status --short`: `guides/agent.md`, `src/core/factories.ts`, `src/core/helpers.ts`,
`src/core/types.ts`.
