<!-- reviewer on Claude Opus 5, native, read-only, deciding lane, on the isolated worktree agent-audit at 573ba71; returned 2026-09-14 ~21:34Z after 666 s; immutable blind verdict, condensed from the returned text with every ruling, finding, referral, and held attack kept -->

Lane: subjective (reviewer, Claude Opus 5)

1. CONFIRMED. `AgentProvider.ts:199-211` carries one branch and an unconditional rethrow; no second door into the wrap; a remote `ProviderAbortError` with a clean signal keeps its identity (`AgentProvider.test.ts:485-501`); the deadline, mid-body cancel, early `return()`, `strict`, and non-OK pins stand unweakened.
2. CONFIRMED. `helpers.ts:835-843` and `:889-897` register one listener scoped to a local `cleanup` controller removed in `finally` before `cancel` and `releaseLock`; late abort, suspended-at-yield abort, rejecting `cancel`, and already-aborted cases pinned; no-signal behaviour unchanged; no `pipeThrough`/`TransformStream` under `src` or `tests`; post-loop check at `:180`, post-error-read check at `:270`.
3. CONFIRMED. The hook receives the combined signal (`AgentProvider.ts:290-294`), `types.ts:2174-2176` names the purpose; zero-argument hooks still work; `RelayProviderOptions` inherits unchanged; `RecordedHeaders` records the signal; no `RecordedSignals`, `AbortSignal.any`, or `node:` in `tests/setup.ts`. Bound: `OllamaOptions` is outside the worktree.
4. CONFIRMED. `arrayOf` for both fields; per `contract.md:135` and `:290` it is total and reads the array itself; hostile-`every`, throwing-proxy, and revoked-proxy cases refused; positive fixtures intact.
5. CONFIRMED. `Agent.ts:480` mirrors `:508`; nothing else in that file changed.
6. CONFIRMED. Three arms each documented; `ProviderError` remarks and members; `'LIMIT'` gone; `types.ts:2247` names 413. The member line's own defect is under claim 12.
7. CONFIRMED. `parser` option, `frame()` method, `RelayFrame` record; no `frame:` member.
8. CONFIRMED. The example declares `TextProvider` with the five members and `super({ url, path })`; remarks name the members and switches; what it teaches beyond that is under claim 12.
9. CONFIRMED. The 2048 pin; the single-chunk case asserts the decoded excerpt equality, `count === 1`, cancelled, unlocked; the overshoot is named and documented.
10. CONFIRMED. One `joinThinking` block; the three blocks renamed; no assertion weakened; no skip/todo/retry. Where the renamed blocks still fail to partition is under claim 12.
11. CONFIRMED. `types.ts:2144-2263` matches the amended ruled contract member for member; every A1-R1 CONFIRMED claim still has its proof; no forbidden syntax; the module-scope additions sit in `tests/setup.ts`.
12. BROKEN — five items, each with its fix:
   - Sibling behaviours split across blocks whose names both claim them (`AgentProvider.test.ts`: deadline clearing at `:86`, `:99` and again at `:560`, `:574`, `:833`; the error-body bound at `:114` and `:789`; isolation at `:405`, `:705`, `:819`; cancellation at `:325-366`, `:435`, `:636`, `:662`, `:846`). Fix: give the first block a subject name and move each behaviour under the block that names it, or keep one block; keep the `removes abort listeners after …` family together.
   - `ProviderError.code`'s member line (`errors.ts:233`) names the arms without their conditions while both sibling coded errors bind arm to condition on that line. Fix: write it in the sibling form.
   - `ProviderOptions.headers` documented twice (`types.ts:2174-2176` and `:2181`). Fix: keep the `@remarks` sentence, drop the member doc.
   - `acceptHostileArray` (`tests/setup.ts:999-1002`) is named for the control that specified it and takes no array. Fix: name it `approveEvery` and document it as the hostile own `every`.
   - The base's example constructor `constructor(url: string) { super({ url, path: '/generate' }) }` drops `timeout`, `fetch`, `headers`, `format`, and both switches; every other subclass forwards its options. Fix: `constructor(options: TextOptions) { super({ ...options, path: '/generate' }) }` with `TextOptions extends ProviderOptions`.

Findings outside the claims: none.

Referrals: (a) to the Orchestrator — `a1-fix-report-3.md` quotes a diffstat that does not match `a1-fix-diffstat.txt` (e.g. `AgentProvider.test.ts` 289 vs 349); reconcile and confirm nothing landed between the report and the commit. (b) to the objective lane — the `getEventListeners(signal, 'abort')).toEqual([])` assertions in `helpers.test.ts` (`:930`, `:938`, `:946`, `:961`, `:1028`, `:1037`, `:1054`, `:1062`) run against a signal that never aborts and may be unable to fail; vector: delete the `addEventListener` at `helpers.ts:835` and read which cases stay green. (c) to the objective lane — `AgentProvider.ts:200` converts every caught value into `ProviderAbortError` when the signal is aborted, and that error carries no `cause`, so a `ProviderError('PROTOCOL')` thrown by `read` in the turn the deadline fires is erased and `Agent.ts:478` commits a partial instead of rejecting; decide whether the abort error takes the original as `cause`.

Answer to the Unknown: the fixture hook's signal and the transport's signal are the same object (`AgentProvider.test.ts:608-609`).

Attacked and held: the ruled rule at a second door (hook rejection, transport rejection with a clean signal — both propagate; a foreign `ProviderAbortError` abort reason replaced by the local partial is the ruled behaviour); the readers' asymmetry on an already-aborted source (identical outcomes, `count === 0` pinned); `isConversationSnapshot`'s `messages.every` (booked as A1-R1 F7 for the next change; one file now spells the check two ways); the remote-abort cases at `:485` and `:833` (open vs closed body, neither subsumes the other); no stale pipe prose; the `400` budgets tighten rather than relax.

VERDICT: FAIL 12; outside the claims: none
