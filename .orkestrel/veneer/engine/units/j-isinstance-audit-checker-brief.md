# J-ISINSTANCE audit — the checker's brief

## Role and lane

`checker` on Sonnet, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; mechanical conformance only. State that in your first line. This unit is a fully specified swap with no design load; its audit is this checker plus the Orchestrator's gates.

## Subject

The J-ISINSTANCE unit on Veneer `main` (`C:/Users/mikes/WebstormProjects/veneer`, tip `e24e2c3`, the unit's edits uncommitted), briefed by `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-isinstance-brief.md`. Review evidence under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`: the diff `j-isinstance.diff` and status `j-isinstance-status.txt`, the report `j-isinstance-report.md`, the Orchestrator's run `j-isinstance-gates.log.txt` (written after you launch; record its clause `UNRESOLVED` where it is absent), and the checkout's `src/browser/*.ts`; `node_modules/@orkestrel/contract/dist/src/core/index.d.ts` for the `isInstance` and `instanceOf` declarations. Seven other units write in worktrees under `tmp/worktrees/`, which are not this subject.

## Items

Rule each item met or not met with one piece of evidence (`file:line` or the grep and its hits):

1. The status lists exactly `src/browser/Button.ts`, `Collapse.ts`, `Delegate.ts`, `parsers.ts`, `validators.ts`, all `M`, and no other file.
2. `grep -rn "instanceOf(HTMLElement)(" src/browser tests/src/browser` hits nothing; `grep -rn "isInstance(" src/browser` hits `Button.ts` (the host check), `Collapse.ts` (the host check), `Delegate.ts` (four sites: `#conflicts` twice, `#routeButton`, `#routeCollapse`), `parsers.ts` (the element branch), and `validators.ts` (the two event guards), and nothing else.
3. The four predicate-passed sites are unchanged: `Collapse.ts` `#triggers` and `#siblings` `.filter(instanceOf(HTMLElement))`, `helpers.ts` `readTargets` `.filter(instanceOf(HTMLElement))`, `parsers.ts` `.find(instanceOf(HTMLElement))`; `helpers.ts` is untouched.
4. Every file that imports `instanceOf` still uses it, and every file that uses `isInstance` imports it from `@orkestrel/contract` (name each import line); no import of a name a file no longer uses remains.
5. The two event guards read `isInstance(value, CustomEvent)` inside their existing `try`, and the `isButtonEvent` remark carries no sentence naming `object` as what `isInstance` narrows to; its new sentence names `CustomEvent<unknown>` and `unknown` for `detail`, which the installed declaration `isInstance<C extends abstract new (...args: never) => object>(value: unknown, ctor: C): value is InstanceType<C>` supports.
6. The diff carries no other change: every hunk is one of the swaps in item 2, a guard's class half in item 5, or the remark's sentences; no test file changed.
7. The added lines carry no `any`, `as `, non-null `!`, `@ts-`, `eslint-disable`, `public`, `protected`, `private`, a parameter property, a default export, or a nested function declaration; the remark's added prose carries no term `writing.md` § Substitutions bans unconditionally.
8. The report records that no `prove` call was made and that a throwaway probe file under `tmp/` was removed; `git status` shows no such file.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/typescript.md`, `writing.md`; E6 and E10 in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md`; skill: `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: the checklist of items (met or not met with evidence), referrals, and exactly one terminal line, `VERDICT: PASS` or `VERDICT: FAIL <item numbers>; outside the claims: <finding ids>`.
