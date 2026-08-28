# Fix dossier: ndjson

Verified fix-producing findings for the `ndjson` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s18-03 — DRIFT

3. package=ndjson file=`src/core/types.ts:14` (and `src/core/NDJSONParser.ts:46`) rule=`.claude/rules/names.md` § Fixed lifecycle vocabulary verdict=CONFIRMED
   wrong: `reset()` drops the buffered partial line without destroying the entity, which is exactly the fixed meaning of `clear`; the rule names `reset` as a banned synonym.
   repair: Rename the method to `clear()` in `types.ts:14` and `NDJSONParser.ts:46`, and update the four `reset()` mentions in `guides/ndjson.md` (lines 15, 38, 45, 92) and the tests that call it.

## s18-22 — DRIFT

22. package=ndjson file=`src/core/NDJSONParser.ts:50-52` rule=`.claude/rules/architecture.md` § Wrapper test, `.claude/rules/names.md` § Value-level identifiers verdict=CONFIRMED
    wrong: `#line(line)` is a one-line delegate whose entire body is `return parseJSONAs(line, isRecord)`. It adds no boundary, invariant, composition, or translation, and it is named with a noun where the rule fixes methods as verbs.
    repair: Delete `#line` and inline `parseJSONAs(line, isRecord)` at the single call site `NDJSONParser.ts:38`.

## s18-38 — DRIFT

38. package=ndjson file=`src/core/types.ts:12` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: `parse(chunk)` is the package's entire public behavior and its TSDoc carries no `@param` and no `@returns`; `reset()` at `types.ts:14` carries neither a `@returns` nor a note that it never throws. The class's `parse` at `NDJSONParser.ts:31` has no TSDoc at all.
    repair: Add `@param chunk` and `@returns` to `types.ts:8-11`, and a `@returns Nothing` to `types.ts:13`, matching the form `timeout/src/core/types.ts:43-54` uses.

### Verification

**Judge (DRIFT/high):** Both lanes reached the same substance and I confirmed every part of it, so the split is a classification error rather than a factual one. The interface half is real drift: types.ts:7-11 documents `parse` with a description only and types.ts:13 documents `reset` with one line, while the rule requires

**Lane DRIFT/high:** amend: add `@param chunk` and `@returns` to the `parse` block at types.ts:7-11 and `@returns Nothing` to the `reset` doc at types.ts:13, matching timeout/src/core/types.ts:43-54. Drop the observation about NDJSONParser.ts:31 - an undocumented class member under a documented interface is the fleet norm, not drift.

**Lane DRIFT-RESHAPE/high:** amend: add `@param chunk` and `@returns` to types.ts:7-12 and `@returns Nothing` to types.ts:13, following the timeout/src/core/types.ts:42-54 form. Drop the third claim — leave `NDJSONParser.parse` at NDJSONParser.ts:31 without method TSDoc, because budget/src/core/Budget.ts:69,75 and sse/src/core/SSEParser.ts:101 show the fleet documents implementing methods on the interface only. Sequence this after s18-03, which renames `reset` to `clear`.

