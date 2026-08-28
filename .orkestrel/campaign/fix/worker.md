# Fix dossier: worker

Verified fix-producing findings for the `worker` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s17-23 — DRIFT

23. package=`worker` file=`worker/src/server/validators.ts:15` rule=`.claude/rules/patterns.md` § Validation and contracts (`validators.ts` holds "Total `is*` guards: `(unknown) => value is T`") + `.claude/rules/architecture.md` § Kind purity ("Wrong file, right name → move it") verdict=CONFIRMED
    wrong: `isReply(value: unknown, id: string): value is Reply` takes a second correlation argument, so it is not the total single-argument `Guard<T>` `validators.ts` is defined to hold — it is a correlated predicate, the same class as the rule's own `isVacant` example, which the rule sends to `helpers.ts`.
    repair: Move `isReply` to `worker/src/server/helpers.ts` and delete `validators.ts` with its barrel row, or keep the file and give it a genuine `Guard<Reply>`. The barrel star-exports `helpers.js` already, so the published surface is unchanged either way.

