# Falsify verdict: unit F over the integrated hardening of `@orkestrel/agent` at `7f259c3`

Claims file: `tmp/units/harden-F-claims.md` in the agent checkout, 25 claims. Two lanes ran on 2026-10-13 in clean contexts, blind to each other: the objective lane as `analyst` and the subjective lane as `reviewer`, both on GPT-6 Astra through the Codex transport (session `01a13605-43be-72b3-aab1-f8a79aff2829`, exit 0 uncapped in 1198626 ms; session `01a13605-5924-7ee3-b26e-3f6a5e1ad886`, exit 0 uncapped in 809314 ms), after two Claude Opus 5.5 lanes died at the Claude session limit with no verdict. Every citation of both verdicts resolves (`cite.ts`: 11 and 24 citations, 0 unresolved); `git status --porcelain` was empty before and after each lane. Both lanes returned `VERDICT: FAIL`; root reproduced every `BROKEN` by reading the cited source before ruling.

## Rulings by claim

| Claim | Objective | Subjective | Ruling |
| --- | --- | --- | --- |
| 1, 3, 4, 6, 8, 9, 10, 12, 13, 15, 16, 17, 18, 20 | CONFIRMED | CONFIRMED | held |
| 2 | BROKEN | BROKEN | the claim overstated: a `clear()` during an overflow merge does not undo the initial fold, which has committed; the method contract already says so. Claim narrowed; the guide sentence repaired under G6 and G7 |
| 5 | BROKEN | BROKEN | code: `isJudgment` admits members outside the declared shape while hydration clones the record through JSON; carried into `harden-G` as G1 |
| 7 | NOT-EVIDENCED | BROKEN | instrument gap: the golden probe records judge question keys and tool names, so a changed question body passes. Root wrote the complete-capture probe `tmp/probes/ledger-golden-full.test.ts` with two negative controls and recorded its baseline in a worktree at `9e84294` (source identical to `ee734c3`); the tip is compared against it after the fix unit lands |
| 11 | BROKEN | BROKEN | the claim overstated: the projection reads each declared member as the request presents it, so an inherited declared member crosses; the clone of the projection consults no getter, prototype, or `toJSON`. No code change; the guide sentence repaired under G7 |
| 14 | BROKEN | BROKEN | the claim overstated: `renderToolValue(Symbol('route'))` renders `Symbol(route)` by the campaign's own ruling. No change |
| 19 | BROKEN | BROKEN | documented limitation: a `return()` on a parked `drain` reader settles after the next push, close, or fail, and the parked read takes that value; stated in the TSDoc under G5; no mechanism change, because the agent never returns a parked reader |
| 21 | BROKEN | BROKEN | inventory: the `handleAgentRunnerJob(registry, partial, spawned, controller)` signature is a public breaking change the plan did not list; added to `harden.md` § Risks |
| 22 | BROKEN | CONFIRMED | the objective lane's reading is right on the golden instrument's question content (vacuous for instructions); closed with claim 7 |
| 23 | BROKEN | BROKEN | documentation: guide lines 258, 1662, 1768 overstate cancellation and invalidation, and line 1781 conflates projection with cloning; repaired under G6 and G7 |
| 24 | BROKEN | BROKEN | code and documentation: `Classifier.#collectNear` renders arguments through `JSON.stringify` while the stub and estimate paths accept the same arguments (G3); the `CompactOptions` TSDoc contradicts the `compact` method contract (G6) |
| 25 | BROKEN | BROKEN | code and documentation: `identifyLookup` collapses every uncanonicalizable call to one identity so readings replace each other (G4); `save` promises never to throw while a store failure propagates (G6). The audit's refutation of the `save` finding rested on a rule citation, not on the behavior |
| O1 (outside) | BROKEN | none | code: `Classifier` converts a non-Error fault through `String(error)`, which throws on a null-prototype object, so `classify` rejects instead of resolving with its fault (G2) |

Advisories (no fix): the channel's copy-on-write buffer cost and the dense-chain placement test's timeout-based detection; neither has a measurement under a representative load. The external-exposure unknown (consumers calling `scopes.create` or depending on `createRelayProvider` returning `RelayProvider`) stays `UNRESOLVED` until a downstream call-site inventory runs against the candidate.

## Carried into the fix round

`harden-G` on GPT-6 Astra, brief `tmp/codex/harden-G-brief.md`: G1 (`isJudgment` exact membership), G2 (fault conversion), G3 (`renderJSON` in `#collectNear`), G4 (no identity for an uncanonicalizable lookup), G5 (`drain` limitation TSDoc), G6 (`CompactOptions` and `save` TSDoc), G7 (guide and guides-test patches, report-only). The re-audit covers the repaired claims only: each repair returns the exact command red with the repair reverted and green after, and root re-runs one mutation itself before accepting.
