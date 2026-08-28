# Fix dossier: sse

Verified fix-producing findings for the `sse` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s18-04 — DRIFT-RESHAPE

4. package=sse file=`src/core/types.ts:89` (and `src/core/SSEParser.ts:147`) rule=`.claude/rules/names.md` § Fixed lifecycle vocabulary verdict=CONFIRMED
   wrong: Same banned synonym — `reset()` resets parser state without destroying the entity, which is `clear`.
   repair: Rename the public method to `clear()` at `types.ts:89` and `SSEParser.ts:147`; the private `#clear()` at `SSEParser.ts:250` then collides, so rename it `#drop()` (it discards the in-progress accumulator) and update its two call sites at `SSEParser.ts:152` and `SSEParser.ts:246`. Update `guides/sse.md` lines 12, 34, 119, 128, 145, 146, 156, 157, 170.

### Verification

**Judge (DRIFT-RESHAPE/high):** The violation is real and neither lane disputes it: `reset()` drops buffered state and leaves the parser usable, which is the fixed meaning of `clear`, and the rule names `reset` as a banned synonym. No deliberate-reason evidence exists — the guide argues nothing for the name, the WHATWG framing in

**Lane DRIFT/high:** amend: rename `reset()` to `clear()` at types.ts:89 and SSEParser.ts:147, rename the private `#clear()` at SSEParser.ts:250 to `#drop()` with call sites :152 and :246, and update guides/sse.md at 12, 34, **42**, 119, 128, 146, 156, 157, 170 (not 145).

**Lane DRIFT-RESHAPE/high:** amend: rename the public method to `clear()` at types.ts:89 and SSEParser.ts:147 and STOP there on the private side — keep `#clear()` at SSEParser.ts:250 and its call sites at :152 and :246 exactly as they are, because a public `clear` and a private `#clear` do not collide (proven by tsc). Then update the prose the finding omits — factories.ts:17,36; errors.ts:17,46; SSEParser.ts:29,84; types.ts:82,85,88 — plus guide lines 12, 34, 42, 119, 128, 146, 156, 157, 170 and the tests at tests/src/core/factories.test.ts:23,27 and tests/src/core/SSEParser.test.ts:392-950.

## s18-05 — DRIFT

5. package=sse file=`src/core/types.ts:79` (and `src/core/SSEParser.ts:135`) rule=`AGENTS.md` § Non-negotiable rules ("ALWAYS make interface properties and public return collections readonly"), `.claude/rules/typescript.md` § Types verdict=CONFIRMED
   wrong: `flush(): SSEEvent[]` returns a mutable array from a public interface, while the sibling `parse` on the same interface correctly returns `readonly SSEEvent[]` (`types.ts:68`). A caller can mutate the returned array.
   repair: Change the return type to `readonly SSEEvent[]` at `types.ts:79` and `SSEParser.ts:135`; the local `events` accumulator inside `flush` stays `SSEEvent[]` and widens on return. Update the `flush` row in `guides/sse.md`.

## s18-35 — DRIFT

35. package=sse file=`src/core/errors.ts:21` rule=`.claude/rules/architecture.md` § Barrel exports ("A row obliges a documented, runnable example"), `.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: `SSEError` is barrelled (`index.ts:3`) and is thrown at a consumer, but its class TSDoc carries no `@example` and its constructor at `errors.ts:25` carries no `@param` for `code`, `message`, or `context`. `pool/src/core/errors.ts:6` and `sqlite/src/server/errors.ts:21` both do carry one, so this is drift rather than a package convention.
    repair: Add an `@example` showing a `catch` narrowed with `isSSEError` on `error.code === 'OVERFLOW'`, and add the three `@param` tags at `errors.ts:25`.

