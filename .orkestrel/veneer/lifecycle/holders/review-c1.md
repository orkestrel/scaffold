# Review of C1 (browser `main` at `e8aa649`, uncommitted, unit `contexts-c1b`), Opus 5.5 reviewer, 2026-10-05

Objective lane on concurrency, the contract, accounting, and test sufficiency. Terminal: **FAIL**, with three correctness defects (changes 1, 2, and 3).

## Claims

- **Claim 1, admission:** CONFIRMED. Admission is `size × contexts` with the shared holder counted, reserved synchronously.
- **Claim 2, prepared contexts:** REFUTED.
  - No holderless lease exists.
  - A prepared generation has no crash watch until `#hold` calls `#track`.
  - An idle spare's blank page can crash unseen, and its first holder gets a dead page (the shared holder for the life of the server).
- **Claim 3, generation checks:** CONFIRMED in code; the pin is UNVERIFIED.
  - The ledger's control anchor (`contexts-mutations.json:109`) no longer exists in the source.
  - The case at `BrowserMCPServer.test.ts:2781` has no barrier.
- **Claim 4, loss scoping:** CONFIRMED.
- **Claim 5, retirement accounting:** accounting CONFIRMED; the race REFUTED.
  - With a co-holder, release-then-declare lets `release()` pump the freed place to a waiting acquire before `#lose` (`:673` and `:674`, `:854` and `:855`).
  - That waiter answers `BROWSER_SERVER_UNAVAILABLE` instead of waiting for the refill.
- **Claim 6, destroy order:** CONFIRMED. Finding: `BrowserContextDisposal` admits `{ confirmed: true, error }`, and `confirmed` is computed from another field (`BrowserContext.ts:388`).
- **Claim 7, teardown during construction:** CONFIRMED in code. The pin is weak: removing the `#closing` check after `#build` fails nothing.
- **Claim 8, tests:** partly REFUTED.
  - `BrowserContext.test.ts:1641` cannot fail on its stated claim.
  - `main.test.ts:35` spends 3,443 ms on 7 child processes for 2 claims.
  - `BROWSE_SOURCE_ENTRY` duplicates `SOURCE_HOOK`'s resolver.
  - The two changed expectations follow the rulings (ruling 10, Q4); the title at `:750` is stale.
- **Claim 9, no stored status label, timer, or polling:** CONFIRMED.
- **Outside the claims:** any construction failure (`mkdir`, the stores, `toolset.start()`) retires the whole browser, beyond ruling 8's `Target.createBrowserContext`.

## Required changes

1. Watch a prepared generation's pages from `#warm`. On a crash, clean it and drop it from `#prepared`.
2. Release before declaring loss only when no other browse lease or pending build sits on the slot. Otherwise declare without releasing.
3. Retire the browser only for an `isolate` or `context.create` failure. Any other construction failure cleans the generation, releases the lease, and answers `BROWSER_SERVER_UNAVAILABLE`.
4. Make `BrowserContextDisposal` a union: `{ confirmed: true } | { confirmed: false; error: unknown }`.
5. Make the `BrowserContext.test.ts:1641` case fail on its claim.
6. Assert that the late page carries no `crash` listener after teardown.
7. Put a barrier in the generation case, and rerun its control against the final source.
8. Cut `main.test.ts:35` to two child processes, and build `BROWSE_SOURCE_ENTRY` on `SOURCE_HOOK`.

## Orchestrator rulings on the referred questions (2026-10-05)

- **The new server types** (`BrowserServerContext`, `BrowserServerLease`, `BrowserServerLoss`, `BrowserServerWatch`) stay in `src/server/types.ts` and are documented. This follows the precedent of `BrowserSlot` and `BrowserServerMirror`, which the barrel exports and the guide documents. Narrowing the server barrel is a separate change.
- **The private `#size`** in `BrowserMCPServer.ts` holds the admission bound, while `pool.size` counts browsers. Rename it to a single word that names admission.
- **Change 5, restated** after the first fix attempt stopped on it: no failure can reach `#closeResources` before disposal.
  - `BrowserPage.close()` catches its target-close and cleanup failures (`BrowserPage.ts:961-994`), and `#settle()` cannot reject (`BrowserContext.ts:397-400`).
  - The case pins the reachable claim: a refused `Target.closeTarget` still disposes, and the receipt reads confirmed.
  - The `settleBrowserTeardown` wrapper around `#settle()` goes.
  - Synthesis ruling 4's premise (a page-close failure after a successful disposal) does not arise with the page's present `close()`. The disposal receipt still separates a refused `Target.disposeBrowserContext`.
