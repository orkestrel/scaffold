# Fix dossier: abort

Verified fix-producing findings for the `abort` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s18-28 — DRIFT

28. package=abort file=`src/core/factories.ts:24` rule=`.claude/rules/documentation.md` § Guide examples verdict=CONFIRMED
    wrong: The `createAbort` `@example` imports from `@src/core` while the same package's `helpers.ts:101` and `validators.ts:15` examples import from `@orkestrel/abort`. One package publishes two contradictory import conventions in its own declarations.
    repair: Change `@src/core` to `@orkestrel/abort` at `factories.ts:24`. (The `@src/*` examples in `emitter/src/core/helpers.ts:16`, `emitter/src/core/factories.ts:19`, and `sse/src/core/errors.ts:41`, `sse/src/core/factories.ts:27` are recorded as EXEMPT in finding 40 — those packages are internally consistent and the rule reserves the alias "for source/tests".)

## s18-36 — DRIFT

36. package=abort file=`src/core/types.ts:22-27` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: `AbortInterface`'s members carry no TSDoc: `id` (23), `signal` (24), `aborted` (25), and `abort(reason?)` (26) have no descriptions and `abort` has no `@param` documenting that a defined reason is kept verbatim while `undefined` defaults to an `AbortError`. `AbortOptions` documents its members (`types.ts:11`) and `timeout` and `budget` document every interface member, so this is drift within the same fleet convention.
    repair: Add a one-line description to each member and a `@param reason` to `abort` at `types.ts:26`, stating the defined-reason and `undefined`-default behavior the class TSDoc at `Abort.ts:10-13` already describes.

