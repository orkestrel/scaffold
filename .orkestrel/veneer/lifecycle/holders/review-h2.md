# Review of H2 (browser `b7f2aa1`), Opus 5.5 reviewer, 2026-10-04

Objective lane on the concurrency seam and the contract, read at browser HEAD `0e787ac`. Terminal: **FAIL** on claims 6 and 8, plus F1 to F3.

- Claims 1 to 5 and 7: **CONFIRMED.** Admission is synchronous (`BrowserMCPServer.ts:319-330`) and retired only after disposal (`:415-424`). A cancelled acquire is caught in the pool, in `#hold` (`:564-570`), or by `throwIfAborted` (`:336`). Continuations compare holder and token (`:488`, `:603`, `:611`, `:654`, `:903`, `:915`). Notices are per holder (`:657-659`). Unknown, ended, and `shared` handles are refused (`:356`). Names and kind files obey the laws.
- Claim 6: **UNRESOLVED** at review. The named tools' behavior rested on the writer's run, and no case proved teardown with several holders live. Settled since by the post-merge run (the server project green at `0e787ac`), with the teardown proof owed by H3.
- Claim 8: **BROKEN.** `tests/src/server/BrowserMCPServer.test.ts:350` pins the private `Pool.#commit` in a stack; drop it, since `:348` and `:351` already pin the claim.
- F1: the length assertion at `:220` (`launcher.browsers` of 2) cannot fail, because the pool's `max` defaults to `min`; delete it, since `:219` pins the claim.
- F2: `tests/setupServer.test.ts:198` asserts `BROWSE_VOCABULARY` against a literal copy of itself; delete it, since the listing case near `BrowserMCPServer.test.ts:1887` compares the real `tools/list`.
- F3: a pool cleanup failure makes `destroy` answer an error on every call after the holder has ended (`:402-407`, `:415-425`), and replaces the original error in `#acquire`'s catch (`:347`). Fix: settle the disposal, record the failure in `#faults` for teardown, and answer success; `.catch` `#retire` in `#acquire`.
- Proof gaps: no case pins that a successful acquire detaches the request's cancellation (`:350`), and none cancels a call during the refill wait.
- Referral: four types and three constants export through the barrel with no guide rows; `npm run test:guides` is red until H5.
- Advisory: `#disposals` grows by one entry per acquire for the session, the cost of the repeated-success contract.
