# Fix dossier: process

Verified fix-producing findings for the `process` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s13-15 — DRIFT

15. package=process file=`src/server/types.ts:27` rule=`.claude/rules/names.md` § Type-level identifiers verdict=CONFIRMED
    wrong: `ProcessChild` declares call-signature members (`kill`, `once`, `off`), so it is a behavioral interface and the table requires the `{Entity}Interface` form; `guides/process.md:208` and `:1398` describe it without stating an exception.
    repair: Rename to `ProcessChildInterface` and update `helpers.ts:8`, `:586`, `:611`, `:674`, `:700`, `:739` and the guide rows.

## s13-16 — DRIFT-RESHAPE

16. package=process file=`src/server/helpers.ts:100` rule=`.claude/rules/architecture.md` § Centralized-file pattern — "Owned snapshots | `*/cloners.ts`" verdict=CONFIRMED
    wrong: `snapshotCommand` takes one owned frozen snapshot of a caller's value — the cloners row verbatim — but sits in `helpers.ts`, which has no `cloners.ts` sibling to sit beside.
    repair: Add `src/server/cloners.ts`, move `snapshotCommand` there unchanged, add the barrel row to `src/server/index.ts`, and update the importers at `Supervisor.ts:17`, `Process.ts:9`, `Session.ts`, and `execution/execute.ts:18`; the star-export keeps the published surface identical.

### Verification

**Judge (DRIFT-RESHAPE/high):** The objective lane's verdict label is right; the subjective lane ruled DRIFT while issuing an amend that rewrites three of the finding's four importers, which is DRIFT-RESHAPE by definition. The placement violation is real and unregistered — the function's own TSDoc uses the rule row's words verbati

**Lane DRIFT-RESHAPE/high:** amend: add `src/server/cloners.ts`, move `snapshotCommand` there from `helpers.ts:157` unchanged, add `export * from './cloners.js'` to `src/server/index.ts` so the star-export keeps the published surface identical, and update the real importers — `Supervisor.ts:17`, `Process.ts:9`, and the three in-file call sites now left in `helpers.ts` at `:899`, `:1090`, `:1163`. Drop `Session.ts` and `execution/execute.ts:18` from the list; neither imports it and the latter does not exist.

**Lane DRIFT/high:** amend: add src/server/cloners.ts and move the function as stated, but correct the citations — the declaration is at src/server/helpers.ts:157 with its TSDoc from :138, not :100; the importers are Supervisor.ts:17 and Process.ts:9 plus three call sites inside helpers.ts itself at :899, :1090, and :1163; Session.ts does not reference it and src/server/execution/execute.ts no longer exists (removed in d511f75). Add the barrel row, move the cases at tests/src/server/helpers.test.ts:32 to a tests/src/server/cloners.test.ts, and move the guide rows at guides/process.md:105 and :762.

## s13-17 — DRIFT

17. package=process file=`src/server/Supervisor.ts:107` rule=`.claude/rules/typescript.md` § Types verdict=CONFIRMED
    wrong: The `face` callback bundle is declared as an inline structural type in the constructor signature, yet both `Process.ts:113` and `Session.ts` construct one, so it is a reusable type living outside `types.ts`.
    repair: Declare it in `src/server/types.ts` as `SupervisorFace` with the same six readonly members and reference it from the constructor.

## s13-18 — DRIFT

18. package=process file=`src/core/errors.ts:11` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: `ProcessError` is barrelled and consumer-constructible but carries no `@example`, while `isProcessError`, `createInvalidError`, `Retention`, `Process`, and `ProcessManager` in the same package all carry one.
    repair: Add an `@example` constructing a `ProcessError` with a code and context.

## s13-19 — DRIFT

19. package=process file=`src/core/types.ts:588` (also `:614`, `:615`) rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: `ExecuteResult.signal` and `ExecuteInput.code`/`signal` are the only members of those interfaces with no documentation line, so a reader learns the `null` semantics for `code` and not for `signal`.
    repair: Add the one-line description each carries elsewhere — "The terminating signal name, or `null` when the process exited on its own."

