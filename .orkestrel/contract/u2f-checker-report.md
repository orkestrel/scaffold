# U2f checker report (checker / Sonnet; immutable)

**Verdict: PASS**

1. `preview` TSDoc qualified, guide parity — met (`helpers.ts:1795-1820`; superseded sentence absent; every encoder mention reads `JSON.stringify` followed by "call" at `:1811,1813,1819`; guide row `:602` states the same structure).
2. `readValue` single-read discipline — met (`helpers.ts:785` reads `subject` once inside the eager `attempt`, used at `:803`; `:784` reads `code` once; the own-only spread stays at `:774-783`; `owned`/`context`/`ContractError` built only inside the refusal branch `:819-836`).
3. Test pins present — met (the read-once pin at `helpers.test.ts:690` asserting `ContractError`, the message, and one read; the three U2 `readValue` pins and four `preview` pins present; the margin comment beside the timing threshold).
4. No pre-existing test edited or removed — met (test diff carries only `+` hunks).
5. Names, forbidden syntax, writing — met (no `any`/`as`/`@ts-`/mock/spy in the added code; no `above`/`below` cross-reference in the added blocks; code tokens followed by nouns).
6. Scope honesty — met (status and diff agree on the three files).
7. Guide parity — met (one guide hunk; the `readValue` and `PREVIEW_LIMIT` rows remain true).

Referrals: none.
