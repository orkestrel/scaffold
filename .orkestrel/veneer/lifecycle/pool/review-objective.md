**Lane:** objective. I checked correctness under adverse orderings, whether the tests can fail for the defects they name, and the letter of the rules. I read `aea3bda` at the tip, `tmp/codex/review-floor/diff.patch`, the brief, the report, the ruling, and the 0.0.13 engine that worker installs at `C:\Users\mikes\WebstormProjects\worker\node_modules\@orkestrel\pool\dist\src\core\index.js`. I ran nothing.

## Verdicts

1. **HOLDS at runtime.** Without `min`, `watch` or a token `destroy`, every changed path behaves as 0.0.13:
   - `#clean` (`Pool.ts:734-737`) still deletes the record on either outcome.
   - The `#pump()` inside `#clean` is gated on `min` (`:744`).
   - `#fill` returns at once (`:383`).
   - The `#commit()` added to `#pump` (`:372`) does nothing. 0.0.13 commits after every `#ready.set` and every head removal, so no uncommitted ready entry ever sits at the head.
   - The guards at `:554-562`, `:629-639` and `:687-688` need a record that is destroying or retained while validating or ready. Only `watch`, a token `destroy`, or `min` can produce that.
   - The test hunk in the diff (`@@ -7,8 +7,650 @@`) only adds cases; the original ones are untouched.
   - Worker's `Worker.ts:81-89` forwards only named keys. Worker's tests would break on a re-pin (see "Findings outside the claims").

2. **HOLDS.**
   - Validation at `Pool.ts:86-104` matches the brief. Refusing `restarts` without `min` is stricter than the brief; lifting it later adds nothing breaking.
   - `start()` resolves through `:386-389`, rejects with `create` and `#cause` through `:402-408`, resets a spent bound at `:156`, and resolves at once without `min` (`:151`).

3. **FAILS.** "A watch that settles after disposal does nothing" is false for a rejection.
   - `Pool.ts:437-440` calls `this.#error?.(error, 'watch')` every time a watch rejects. It does this even when `#lose` returns early because disposal already began (`:448-454`), and after teardown, where `#error` is the raw option and bypasses the emitter's own `destroy()`.
   - Breaking input: the idiomatic watch `once(browser, 'disconnected', { signal })` from `node:events` rejects with an `AbortError` when the signal aborts. With that watch:
     - every `clear()`, failed validation and `token.destroy()` sends a spurious `error(AbortError, 'watch')`;
     - every pool `destroy()` sends one per record.
   - The only test on this path, `Pool.test.ts:364-380`, makes the watch resolve on abort, so this path is never exercised.
   - The rest of the claim holds:
     - `watch` is called once per record inside `#insert` (`:428-442`).
     - `#lose` (`:448-454`) runs the loss once.
     - Every disposal path goes through `#dispose`, which aborts the signal before the hook (`:710`).

4. **HOLDS.**
   - Each token gets its own `lease` object (`:281`), and `#settled` (`:291`, `:299`) ties release and destroy to that token, not to the record.
   - Mutation check: remove `#settled.has(lease)` from `#createDestroy`. The test at `Pool.test.ts:348-362` then fails, because `destroyed.length` becomes 1.

5. **HOLDS.**
   - The strike rules are at `:417`, `:467-471` and `:571`; the grant reset is at `:651`.
   - The owed credit is added at `:463` and spent at `:390-391`.
   - The pinned case (`Pool.test.ts:78-110`) fails under `>=` at the race on `:100`. It also fails under a late refusal: there are 3 create calls and `:106` expects 2.
   - There is an advisory edge in how the owed credit is counted (see Advisory).

6. **HOLDS.**
   - With `min` set, a failed destroy adds the record to `#survivors` and records the failure (`:734-736`).
   - `#fill` refills only while `resources.size < min` (`:390`), and survivors stay in `#resources`.
   - `#finish` rejects the barrier with the retained failures (`:808-810`).
   - Without `min`, cleanup is 0.0.13's.

7. **HOLDS.**
   - With `min` set, the waiter branch (`:349-362`) never reaches `#startCreate`.
   - A lost record cannot get through validation (`:554-562`) or the ready barrier (`:629-639`), and `#recycle` refuses one (`:687`).

8. **FAILS.** One ordering leaves a pending promise that nothing can ever wake.
   - Steps: `min: 1, restarts: 1`, a destroy hook that rejects, `acquire()`, then `token.destroy()`, which rejects with `cleanup`.
   - The record is now retained, so `resources.size === min` and `#fill` never refills (`:390`).
   - The next `acquire()` reaches `:349-362` with nothing idle and the bound not spent, so it stops at `break`.
   - No release, refill or cleanup can ever wake it; only the pool's `destroy()` or the caller's signal settles it.
   - `start()` rejects with `cleanup` in this state (`:402-407`), but `acquire` hangs.
   - This is browse with no spares (`min` 1) on ruling V1's input: Chromium outlives SIGKILL, so the session's next tool call never returns.
   - It also makes the guide's claim at `guides/pool.md:6-7` false: there, every wait "wakes when a settlement reaches it".
   - The other named orderings hold (see "Attacked and held").

9. **HOLDS by reading; the gate runs are UNRESOLVED** because the writer's report is their only evidence.
   - No `as`, `!`, `any`, directive or suppression appears in `src/core/*`, `tests/setup*.ts`, `tests/guides.test.ts` or `Pool.test.ts`.
   - Every nested function sits in a position `architecture.md:175` allows, including the getter in the object `createFloorFixture` returns.
   - The new types are in `src/core/types.ts`.
   - The guide's Summary cells match their TSDoc for `start`, `acquire`, `clear`, `PoolToken.destroy` and `PoolOptions`.
   - The README pitch equals the guide tagline.
   - A case-insensitive sweep of `diff.patch` for the writing.md substitution terms (should, simply, just, currently, now, new, via, e.g., since, once, above, below, ensure, guarantee, and the rest) finds no banned prose. "once" appears only as "one time", and "new" only as the operator.
   - All seven C controls fail for the mutation they name: strike, abort, reset, used, retained, demand and owed (traced in "Attacked and held").
   - The B and D reds come from the missing `start` on the old engine, not from each rule. Read directly, though, the assertions do separate the rules: token keys, empty event tuples, and old-token destroy.

## Findings outside the claims

- **Worker re-pin (for the Orchestrator, W1).** Worker's tests build `Required<PoolOptions<number>>` objects. On a re-pin to 0.0.14 they stop typechecking, because `watch`, `min` and `restarts` become required there. The places are `C:\Users\mikes\WebstormProjects\worker\tests\setup.ts:60`, `:64`, `:101` and `tests\src\core\Worker.test.ts:377` and `:399`. Worker's runtime is unaffected.
- **Idle spare policy (for the Orchestrator).** With `restarts: 1`, a spare that dies idle twice, hours apart, spends the bound for good. The second refill never runs. A browse session never grants a second lease, so the server runs with no spare until someone calls `start()`. This is the first half of ruling V5's breaking input; the brief encodes it, so it is a policy question, not a defect.

## Attacked and held

- **Capacity:**
  - refills run one at a time, gated on `#refilling` (`:384`) and on `resources.size < min` (`:390`);
  - the on-demand create path cannot be reached with `min` set;
  - so nothing launches past `max`.
- **Two tokens destroyed in one turn:** each loss adds an owed credit after its cleanup, and the refills spend both credits in order.
- **`destroy()` during `start()`:** `start()` rejects with `destroyed` (`:236`). The barrier waits for the refill operation, and the late record is disposed through `#recycle` (`:689-691`).
- **`start()` during `destroy()`:** rejects at `:150`.
- **`clear()` during a refill:** `#fill` returns early while a refill runs, the completion pumps again, and `clear()` adds no strike.
- **Acquire with an aborted signal while the floor is short:** an already aborted signal rejects before the acquire is queued (`:181-184`). A later abort detaches the listener at `:311`.
- **Watch settling during validation:** the guard at `:554-562` catches it, and the record gets no second strike.
- **Hidden ordering dependency in `#clean`:** removing `#clean`'s `#pump()` under `min` (`:744`) leaves `start()` pending forever, which the test at `Pool.test.ts:635-652` catches.

## REQUIRED

- **`Pool.ts:435-441`**
  - Wrong: a watch that rejects after disposal began, or after teardown, still calls `#error`.
  - Right: in both handlers, return when `controller.signal.aborted` is already true, and report to `error` only a rejection that declares the loss of a live record.
  - Make `types.ts:79-80` and `guides/pool.md:120` say "while the record is live".
  - Add a case: a watch that rejects on abort, then `clear()` and `destroy()`; assert `errors.calls` stays empty.
- **`Pool.ts:349-362`**
  - Wrong: with `min` set, an acquire parks forever once retained records fill the whole floor (`#survivors.size >= #min`, nothing destroying, no refill running).
  - Right: in that state, reject the waiter with `this.#cleanupError(this.#failures)`, the same error `start()` gets at `:403-407`.
  - Add a case: `min: 1`, a failing destroy hook, `token.destroy()`, then `acquire()` rejects with `cleanup`.
  - Fix `guides/pool.md:6-7` and `:144`, which state that every wait wakes and say nothing about `acquire` in this state.

## ADVISORY

- **`Pool.ts:412-415`:** `#refill` calls `create` without checking `#ending`.
  - `void pool.start(); void pool.destroy()` in one turn launches a browser after teardown has begun, and the barrier waits for that launch and its disposal.
  - Check `#ending` before calling `create`.
- **`Pool.ts:395-398`:** the refill operation has no rejection handler, unlike `#startCreate` (`:477-480`).
  - By reading, `#refill` cannot reject today, but if it ever did, `#refilling` would stay true and `#operations` would keep the operation forever.
- **`Pool.ts:463` with `:390-391`:** the owed credit is added only after cleanup.
  - Interleaving: a consumer microtask pumps between `resources.delete` (`:737`) and `#lose` resuming (`:463`), for example another holder's `release()`. A refill started there fills the leased record's slot, and the credit stays as a stale extra attempt beyond the bound.
  - Fix: add the credit at `#lose` entry and withdraw it in the catch.
- **`Pool.ts:554-562`:** removing only the validation guard is not caught by any test. `never grants a` removes both guards together.
  - Without the guard, a never-leased record lost during validation that then validates `false` takes two strikes.
  - Add a case with validation returning `false` and `restarts: 1` that asserts a refill still happens.
- **`Pool.test.ts:147-148`:** the second `reject` on an already settled promise never reaches the pool, so that step proves nothing about dedup.
  - The dedup is proven by `Pool.test.ts:364-380`.
- **`Pool.ts:448-454`:** no test covers a watch that settles after its record became retained.
  - The `#survivors` check in `#lose` can be removed without any test failing. Without it, a never-leased retained record would take a strike.
- **Refills run one at a time:** browse's three browsers would launch serially at server start. No run measures the cost, so this stays advisory.

VERDICT: FAIL 3, 8