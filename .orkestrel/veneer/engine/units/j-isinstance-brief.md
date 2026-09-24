# Unit J-ISINSTANCE — the `isInstance` call sites after the contract 0.0.18 re-pin

## Role and engine

`builder` on Sonnet, reached as a native Claude subagent (Read, Grep, Glob, Edit, Write, Bash), the sole writer in the checkout `C:/Users/mikes/WebstormProjects/veneer` on `main`, dispatched after J-COLLAPSE lands there and before any other writing unit opens.

## Objective

Every immediately invoked `instanceOf(HTMLElement)(x)` guard in `src/browser/` reads `isInstance(x, HTMLElement)`, the event guards' class half reads `isInstance(value, CustomEvent)`, the `isButtonEvent` remark states the true reason for the guard's own detail half, and the scoped gates stay green; nothing else changes.

## Context

**Evidence.** `@orkestrel/contract` 0.0.18 narrows `isInstance` to the constructor's instance type (the contract's `src/core/validators.ts` at `014c2d2`: `export function isInstance<C extends abstract new (...args: never) => object>(value: unknown, ctor: C): value is InstanceType<C>`), and `instanceOf(ctor)` returns `Guard<InstanceType<C>>` (`src/core/combinators.ts`). Veneer `main` pins `@orkestrel/contract` `^0.0.18` and `@orkestrel/test` `^0.0.22` (the baseline's `95dcb95`, merged as `217d12b`), and the checkout's `node_modules/@orkestrel/contract/package.json` reads `"version": "0.0.18"` (measured 2026-09-24 after `npm install --ignore-scripts`; `git status` clean). The sites, measured in the collapse worktree at its round-2 tree, which is what `main` carries after the J-COLLAPSE landing (`grep -rn "instanceOf(" src/browser tests/src/browser guides/veneer.md`):

```text
src/browser/Button.ts:41:		if (!instanceOf(HTMLElement)(host)) {
src/browser/Collapse.ts:86:		if (!instanceOf(HTMLElement)(host)) {
src/browser/Collapse.ts:320:			.filter(instanceOf(HTMLElement))
src/browser/Collapse.ts:336:			.filter(instanceOf(HTMLElement))
src/browser/Delegate.ts:141:		if (!instanceOf(HTMLElement)(host) || !this.#root.contains(host)) return
src/browser/Delegate.ts:154:		if (!instanceOf(HTMLElement)(trigger) || !this.#root.contains(trigger)) return
src/browser/helpers.ts:164:	return Array.from(trigger.ownerDocument.querySelectorAll(escaped)).filter(instanceOf(HTMLElement))
src/browser/parsers.ts:24:	if (instanceOf(HTMLElement)(value)) return value
src/browser/parsers.ts:27:		return Array.from(document.querySelectorAll(value)).find(instanceOf(HTMLElement))
```

No test file and no guide line names `instanceOf`. The event guards read `value instanceof CustomEvent` inside a `try` (`src/browser/validators.ts`, `isButtonEvent` and `isCollapseEvent`), and the `isButtonEvent` remark states "The class half does not route through `isInstance` either: that helper narrows a generic constructor to `object`, which drops the payload this guard goes on to read", a sentence 0.0.18 makes false. Re-measure the site list with the same grep before editing; the line numbers move with the landing.

**Law.** `AGENTS.md` (reuse a declared primitive whose semantics match; do not wrap merely to rename; E6 greenfield), `.claude/rules/typescript.md`, `names.md`, `architecture.md`, `tests.md`, `writing.md`; skill: none; guide: `guides/veneer.md` (no line changes expected); decisions E6 and E10 in `.orkestrel/veneer/engine/decisions.md`.

**Installed primitives.** `@orkestrel/contract` 0.0.18 (`node_modules/@orkestrel/contract/dist/src/core/index.d.ts`: `isInstance`, `instanceOf`, `Guard`); `@orkestrel/test` 0.0.22 (`tests/setupBrowser.ts` reads it). A guard the unit writes that `isInstance` already performs is a defect; the checker probes the diff for a new `instanceof` expression outside the two event guards' containment.

**Host.** Git Bash on Windows 11 (`npm.cmd`/`npx.cmd` resolve as `npm`/`npx` in this shell); the checkout `C:/Users/mikes/WebstormProjects/veneer`; network open; no sandbox; Playwright's managed Chromium 153.0.8010.12 runs the browser project.

**Measurements.** Taken 2026-09-24 in the collapse worktree at its round-2 tree (the site list above) and in `main` (installed versions). The unit re-takes the site grep first.

**Control identifiers.** none; a test is named for what it proves.

**Standing conditions.** WebStorm holds `node_modules/@tailwindcss/oxide-win32-x64-msvc/*.node` in this checkout, so `npm ci` fails `EPERM`; do not run it (the packages are installed; run no install at all). `npm run test:src:browser` prints one reported `SyntaxError` diagnostic from the landed `HostSnapshot` case "withdraws an overlapping earliest recording when its restoration throws inside a reaction" while passing; it is by design. The `prove` MCP server is not reachable to a subagent; record the refused call.

## Unknowns

1. Whether `InstanceType<typeof CustomEvent>` resolves to `CustomEvent<unknown>` under the checkout's TypeScript, so `isInstance(value, CustomEvent)` narrows `value.detail` to `unknown`: the unit reads the typecheck's answer (a red on `detail` or an `any` leak the lint rule catches) and reports it; where it resolves to `CustomEvent<any>`, keep the guards' `value instanceof CustomEvent` and rewrite the remark to say the class half stays native because the platform's generic constructor loses the detail type through `InstanceType`, and report that reading.

## Scope

**Owned.** `src/browser/Button.ts`, `src/browser/Collapse.ts`, `src/browser/Delegate.ts`, `src/browser/parsers.ts`, `src/browser/validators.ts` (the two event guards and the `isButtonEvent` remark), `tests/src/browser/validators.test.ts` only where an assertion the change makes false needs its expectation moved (none is expected).

**Shared (report-only).** none.

**Off-limits.** `src/browser/helpers.ts` (its `.filter(instanceOf(HTMLElement))` stays), `src/browser/types.ts`, `src/browser/index.ts`, `src/browser/HostSnapshot.ts`, `src/browser/ColorMode.ts`, `src/browser/constants.ts`, `tests/setupBrowser.ts`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `guides/veneer.md`, `ROADMAP.md`, `package.json`, `package-lock.json`, every file outside `src/browser/` and `tests/src/browser/`.

**What asserts the state this change ends.** No test asserts the guard's mechanism; `tests/src/browser/index.test.ts` lists the export set, which does not change. Search bound: `grep -rn "instanceOf" src tests guides` before and after; after the change the hits are the four predicate-passed sites (`Collapse.ts` twice, `helpers.ts`, `parsers.ts`) and the `instanceOf` import lines those files keep.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash for `npm run check:src:browser`, `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser`, `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser`, `npm run test:src:browser`, and the greps; no install, no build, no commit, no `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; `git add -N` only to render a diff.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

Return as your final message: the site table (file, symbol, before, after), the Unknown's answer with the typecheck output behind it, the remark's new sentences verbatim, `git status --short` and `git diff --stat`, and the verbatim output of every acceptance command; no process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short hypothesis — on a site the grep finds outside the owned files, a typecheck red the Unknown does not cover, or a test that goes red. Decide, record, and carry on from the wording of the rewritten remark and the import ordering the formatter fixes.

## Acceptance criteria

1. `grep -rn "instanceOf(HTMLElement)(" src/browser tests/src/browser` returns no hit, and `grep -rn "isInstance(" src/browser` hits `Button.ts`, `Collapse.ts`, `Delegate.ts` (twice), `parsers.ts`, and, unless the Unknown rules otherwise, `validators.ts` (twice); the four predicate-passed `instanceOf(HTMLElement)` sites are unchanged; no file imports `instanceOf` it no longer uses.
2. `npm run check:src:browser` exit 0; `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser` exit 0; `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser` exit 0.
3. The `isButtonEvent` remark carries no sentence that names what `isInstance` narrows to as `object`, and its sentences are true of the code as changed.
4. `npm run test:src:browser` green (the browser proofs, on Chromium 153.0.8010.12).

**Observations, not criteria.** The tree-wide `npm run check` and `npm run test:guides`, which the Orchestrator runs after the unit exits.

## Review evidence

The actual diff (`git diff HEAD`) and `git status --short` of the checkout, captured by the Orchestrator as `j-isinstance.diff` and `j-isinstance-status.txt`, and the returned report; the audit is one `checker` lane on the mechanical criteria plus the Orchestrator's gates, the unit being a fully specified swap with no design load.
