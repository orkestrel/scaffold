# Fix dossier: queue

Verified fix-producing findings for the `queue` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s16-19 — DRIFT-RESHAPE

19. package=queue file=src/core/Queue.ts:141-205 and 76-99 rule=.claude/rules/architecture.md § System constraints ("Centralize any pattern repeated twice"); § Functions and orchestration (extract pure leaves) verdict=CONFIRMED
    wrong: `enqueue` repeats one 16-line block four times — read the option inside a try/catch, throw a coded `QueueError` on a throwing getter, then run a guard and throw a second coded error — for `id`, `retries`, `timeout`, and `signal`; the constructor repeats a three-line default-then-guard-then-throw block three times for `concurrency`, `retries`, and `timeout`.
    repair: add `src/core/helpers.ts` (barrelled from `index.ts`) with two exported leaves — one that reads a named option from a foreign options object and throws the coded read failure, and one that applies a guard and throws the coded invalid-value failure — and call them from both sites.

### Verification

**Judge (DRIFT-RESHAPE/high):** The duplication is real at both sites, but the subjective lane's decisive evidence checks out and the objective lane's does not cover it: the constructor reads its options BARE while `enqueue` wraps every read in try/catch, so the finding's repair sentence 'call them from both sites' would convert a

**Lane DRIFT/high:** stands

**Lane DRIFT-RESHAPE/high:** amend: extract the guard-then-throw leaf and call it from both sites; scope the read-and-catch leaf to `enqueue` alone and leave the constructor's bare reads unchanged. Add the new `src/core/helpers.ts` row to `src/core/index.ts` and the helper rows plus `@example` fences to `guides/queue.md`, since a centralized file's declarations are exported and barrelled.

## s16-20 — DRIFT-RESHAPE

20. package=queue file=src/core/Queue.ts:61-62,66-67,330-331,371-372 rule=AGENTS.md § Design laws (Derive state) verdict=CONFIRMED
    wrong: `#aborted` duplicates `#abortPromise !== undefined` and `#destroyed` duplicates `#destroyPromise !== undefined` — each pair is assigned on adjacent lines in the only method that sets it (`abort` at 330-331, `destroy` at 371-372) and nowhere else, so both are second flags that can drift from the latch they mirror. (`#stopped` is genuinely independent: `abort` sets it without a `#stopPromise`.)
    repair: delete the `#aborted` and `#destroyed` fields and read `this.#abortPromise !== undefined` / `this.#destroyPromise !== undefined` at their nineteen read sites, or keep the flags and delete the latches — one fact, one field.

### Verification

**Lane DRIFT-RESHAPE/high:** amend: delete only the `#aborted` and `#destroyed` fields and read `this.#abortPromise !== undefined` / `this.#destroyPromise !== undefined` at their read sites. Strike the offered alternative of deleting the latches: `stop` (290-291), `abort` (328), and `destroy` (369) return those promises as the stable reentrant barrier, so removing them breaks lifecycle idempotency.

**Lane DRIFT-RESHAPE/high:** amend: take only the first branch - delete `#aborted` and `#destroyed` and read `this.#abortPromise !== undefined` / `this.#destroyPromise !== undefined` at their read sites. Strike the 'or keep the flags and delete the latches' alternative; the latches are the returned barriers. Keep `#stopped`, which the finding itself concedes is independent.

## s16-22 — DRIFT-RESHAPE

22. package=queue file=src/core/types.ts:207-211; src/core/Queue.ts:113-131 rule=.claude/rules/typescript.md § Comments and API documentation verdict=CONFIRMED
    wrong: the five public data members `emitter`, `count`, `active`, `paused`, and `stopped` carry no TSDoc on the interface and none on the class, while every call-signature member beside them does (`types.ts:212-229`); a consumer reading the type learns nothing about what `count` tallies versus `active`, which is exactly the distinction `.claude/rules/names.md` § Tallies makes this pair carry.
    repair: add a one-line TSDoc to each of the five interface members stating the fact each reports (`count` = reserved live entries, `active` = claimed in flight, `stopped` = stopped or aborted), and add `@returns` to `restore`, `stop`, `abort`, `clear`, and `destroy` on the class.

### Verification

**Judge (DRIFT-RESHAPE/high):** Both lanes verified the same facts and reached the same substance; only the objective lane's label contradicts its own repair field, which reads 'amend'. The omission is real on both the interface and the class, the sibling that carries the identical tally pair documents every data member, and the r

**Lane DRIFT/medium:** amend: add the one-line TSDoc to the five interface members and the five class getters as proposed, and add `@returns` to `restore`, `stop`, `clear`, and `destroy` only. Strike `abort` from that list, it already carries `@param` and `@returns` at Queue.ts:321-325.

**Lane DRIFT-RESHAPE/medium:** amend: add a one-line TSDoc to each of the five interface data members, and add `@returns` to `restore`, `stop`, `clear`, and `destroy` on the class. Strike `abort` from that list - `Queue.ts:325` already carries `@returns The stable abort barrier`.

## s16-23 — DRIFT-RESHAPE

23. package=queue file=src/core/Queue.ts:251; src/core/stores/MemoryQueueStore.ts:42 rule=.claude/rules/architecture.md § System constraints ("Centralize any pattern repeated twice"); .claude/rules/patterns.md § Validation and contracts verdict=CONFIRMED
    wrong: the stored-entry validity test `!isString(id) || !isQueueRetries(attempts)` is written out in two files against the same `StoredEntry` contract, so a change to what a valid stored entry is has two homes; `validators.ts` holds no guard for the package's own `StoredEntry` type even though it is the type crossing the store boundary.
    repair: add `isStoredEntry` to `src/core/validators.ts` as a total guard over `StoredEntry<unknown>` and route both sites through it.

### Verification

**Lane DRIFT-RESHAPE/high:** amend: add `isStoredEntry` to `src/core/validators.ts` as a total guard over `StoredEntry<unknown>`, but route each site through it by materializing the single reads first, `const candidate = { id, input, attempts }` built from the locals each site already holds, and guarding that owned copy. Never pass the caller's object to the guard, `.claude/rules/patterns.md` § Foreign contracts and `tests/src/core/stores/MemoryQueueStore.test.ts:234` both fix the foreign read count at one.

**Lane DRIFT-RESHAPE/high:** amend: add `isStoredEntry` to `src/core/validators.ts` as a total guard over `StoredEntry<unknown>`, and apply it to the locally captured one-read snapshot inside the existing `try` at `Queue.ts:245-256` and to the locals at `MemoryQueueStore.ts:39-41` - never to the foreign object itself.

## s16-24 — DRIFT-RESHAPE

24. package=queue file=src/core/Queue.ts:77,85,93; src/core/validators.ts:48 rule=.claude/rules/architecture.md § Centralized-file pattern (Constants/data → `*/constants.ts`); § Kind purity verdict=CONFIRMED
    wrong: the queue's published defaults (`concurrency` 1, `retries` 0, `timeout` 0) and the native timer ceiling `2_147_483_647` are bare literals in a class body and a guard, and are restated in prose at `types.ts:139-141` and `164-168`, so the documented default and the enforced default are two independent facts.
    repair: add `src/core/constants.ts` (barrelled) with `DEFAULT_CONCURRENCY`, `DEFAULT_RETRIES`, `DEFAULT_TIMEOUT`, and `MAX_TIMEOUT`, and read them from the constructor and `isQueueTimeout`.

### Verification

**Lane DRIFT-RESHAPE/high:** amend: import `MAX_TIMEOUT_MS` from `@orkestrel/timeout` in `src/core/validators.ts` and read it in `isQueueTimeout`; do not declare a local `MAX_TIMEOUT`. Drop the `DEFAULT_CONCURRENCY` / `DEFAULT_RETRIES` / `DEFAULT_TIMEOUT` half, the cited rule governs module-scope constants and these are inline literals in a constructor body.

**Lane DRIFT-RESHAPE/high:** amend: add `src/core/constants.ts` (barrelled) with `DEFAULT_CONCURRENCY`, `DEFAULT_RETRIES`, and `DEFAULT_TIMEOUT`, and read them from the constructor. Do NOT declare `MAX_TIMEOUT`; import `MAX_TIMEOUT_MS` from `@orkestrel/timeout` in `isQueueTimeout`, and reference the named constants from the `types.ts:163-168` prose.

## s16-26 — DRIFT-RESHAPE

26. package=queue file=src/core/validators.ts:4,20,36,52; src/core/errors.ts:31; src/core/Queue.ts:71,134,239,280,288,308,314,321,348,367; src/core/stores/MemoryQueueStore.ts:28,36,61,67,89; src/core/stores/DatabaseQueueStore.ts:37,46,51,56,61 rule=.claude/rules/typescript.md § Comments and API documentation verdict=CONFIRMED
    wrong: the TSDoc first sentence of the public guards, methods, and constructors is imperative ("Determine whether…", "Create a queue.", "Reserve and submit one FIFO entry.", "Upsert a validated…") rather than third person with an `-s` verb.
    repair: rewrite each first sentence in third person ("Determines whether…", "Creates a queue.", "Reserves and submits…", "Upserts…").

### Verification

**Judge (DRIFT-RESHAPE/high):** Both lanes confirm the violation and correctly refuse an EXCEPTION for fleet-wide uniformity, which AGENTS.md § Authority and loading settles. The subjective lane's addition is the one I could falsify and could not: `src/core/types.ts:212-228` carries the identical imperative first sentences on ever

**Lane DRIFT/high:** stands

**Lane DRIFT-RESHAPE/high:** amend: rewrite each listed first sentence in third person AND extend the sweep to `src/core/types.ts:212-229`, so the package converts as a whole.

