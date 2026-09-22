# Audit lane — `analyst` on GPT-6 Astra, objective lane, F6 FOUNDATION fix round

## Role and lane

`analyst` route on GPT-6 Astra (`gpt-6-astra`), reached through `codex exec --sandbox read-only`
rooted at `/home/user/veneer-f6`. You hold the **objective** lane over the F6 fix round, which `opus`
wrote from `/home/user/veneer-f6/tmp/units/f6-brief-2.md`; you are the engine that did not write it.
Perform the audit directly and spawn nothing. Bound: rule within 20 minutes.

## Subject and evidence

The worktree carries the F6 unit's first-round writes, the Orchestrator's three integration patches,
and the fix round's writes, all uncommitted over `07fc3c3`; the Orchestrator also regenerated
`package-lock.json` with `npm install` after the unit returned. `/home/user/scaffold/tmp/audit/f6-fix.diff`
is the whole diff against `07fc3c3` and `f6-fix-status.txt` the status; the fix round's own report
`/home/user/scaffold/tmp/audit/f6-report-2.md` names the files it touched and its measurements; the
round-1 verdicts `/home/user/scaffold/tmp/audit/f6-audit-{analyst,reviewer,checker}-verdict.md` name
the findings it closes. The gate chain over this tree is being written to
`/home/user/scaffold/tmp/audit/f6-fix-gates.log.txt`, complete when its last line reads
`=== gates done`; read it last.

## Claims

1. **The guard adoption is real and behaviour-preserving.** `isColorModeState` is
   `literalOf('light', 'dark')`, `isButtonHost` returns `isInstance(value, HTMLElement)`, `isAppError`
   returns `isInstance(value, AppError)`; no local `instanceof` or literal membership check remains
   beside them; every pinned case in `tests/src/browser/validators.test.ts` and
   `tests/src/core/errors.test.ts` (the hostile-prototype and revoked-proxy cases included) still
   binds (name the mutation each catches); `@orkestrel/contract` sits under `dependencies` and not
   `devDependencies` in `package.json`, and the regenerated `package-lock.json` records it as a
   runtime dependency of the root; the `isButtonEvent` exception's measured reason (the `isInstance`
   return type collapsing to `object`) is true.
2. **The `.disabled`-first case binds.** `tests/src/browser/Delegate.test.ts` "acquires and toggles
   a host already carrying the disabled class, and restores it" builds the host with the class before
   the delegate exists, and a refusal keyed on the class in the acquisition branch would fail it and
   only it.
3. **The three theme-attribute readings are mode-based and order-independent.**
   `tests/setupBrowser.test.ts` (the repetition case) and `tests/app/browser/integration.test.ts` (the
   section case and the matrix case) read `getAttribute('data-bs-theme') === 'dark'` against the
   requested mode; none pins `'light'` or `null`.
4. **The reviewer's findings are closed as ruled.** `SHOWCASE_CONTROL` in `app/browser/constants.ts`
   is set by `Showcase.ts` and listed in `tests/app/browser/index.test.ts`; the `TEXT_DL_CASES` remark
   states the fact and `dl.test.ts` names its local `dd`; the layer-order sentence sits in § Styles
   ahead of the important-utility paragraph with a § Tests pointer; the § Surface engine paragraph
   names B-COLLAPSE; the counts are gone; the § Compatibility preamble names the actor and the
   obligation cell text is unchanged (state whether `scanOracleObligation` matches by exact string
   equality, as the report says).
5. **The remaining prose is true.** The § Helper classes departure bullet no longer describes a
   reversing stylesheet; the § Files mirror sentence states what `inspectPolicyMirrorPaths` proves and
   no more.
6. **Scope is honest.** The status lists the first round's files, the three integration files, and
   exactly the fix round's owned additions (`package.json`, `package-lock.json`,
   `app/browser/constants.ts`, `tests/app/browser/index.test.ts`, `tests/setupBrowser.test.ts`,
   `src/core/errors.ts`, `src/browser/validators.ts`, `tests/src/browser/Delegate.test.ts`,
   `tests/setupStyles.ts`, `tests/src/styles/elements/dl.test.ts`, `guides/veneer.md`,
   `tests/app/browser/integration.test.ts`, `app/browser/Showcase.ts`); no probe remains.
7. **The gate chain is green** (UNRESOLVED if the log lacks `=== gates done` when you read it).

## What you can execute

Read-only in the worktree: `grep`, `sed -n`, `cat`, `git diff`, `git show 07fc3c3:<path>`, and
`node -e` that writes nothing, with npm 11 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`).
No browser project (the sandbox denies the loopback listener); `npm run check` and
`npm run test:src:core` are allowed. Never edit.

## Output

The `orkestrel-falsify` verdict shape and nothing else: numbered verdicts with `file:line`, findings
outside the claims to the `BROKEN` standard, and one terminal line `VERDICT: PASS` or
`VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
