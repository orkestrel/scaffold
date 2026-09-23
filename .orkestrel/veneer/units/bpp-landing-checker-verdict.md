# B-PASSIVE-PROSE (`bpp`) landing check — `checker` on Sonnet verdict (2026-09-23)

**Claim 1 — BROKEN on the brief's attribution, every sentence present.** `/home/user/veneer/tests/setupServer.ts:532` (`collectImportantNames`): "the input the proofs of the {@link collectImportantNames} helper pass as the longhands each name has to cover." — matches. `:1990-1991` (the `@remarks` of `indexRecordingKeys`, declared at `:1994`): "The {@link attributeSelector} helper answers one rule at a time and the cascade carries many," — matches. `:2019` opens "The {@link LAYER_COMPONENTS} constant answers first," — the text matches, but the block is the `@remarks` of `attributeSelector` (declared at `:2036`), not of `matchShippedKey` (declared at `:1497`, no `@remarks`). `bpp-integration.diff` changes only these three sites, as the verdict `bpp-audit-3-verdict.md:12` names them.

**Claim 2 — CONFIRMED.** `bpp-tests-integration.diff` touches only `guides/veneer.md` in two hunks: the style-proof list gains the card, button-group, pagination, placeholder, progress, spinner, list-group, and validation links after the select link (`guides/veneer.md:4168-4175`); the application-proofs list gains one link per section proof from Badge through Validation plus the specimen table before `, and [showcase journeys]` (`:4055-4075`). Every linked file exists (Glob over `tests/app/browser/sections/*.test.ts` and `tests/src/styles/components/*.test.ts`); each phrase is descriptive and follows `see`.

**Claim 3 — CONFIRMED.** The changed lines carry no count and no unconditionally banned term; every code token in them is followed by a noun.

Findings outside the claims: none.

VERDICT: FAIL 1; outside the claims: none

Orchestrator ruling: claim 1's break is the brief's own misattribution of the third block (`attributeSelector`, not `matchShippedKey`); the tree carries every sentence as ruled, so the landing stands and the brief fault is recorded here.
