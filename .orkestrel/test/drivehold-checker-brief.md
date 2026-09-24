# Unit TEST-DRIVEHOLD audit — the checker lane over the 0.0.23 diff

## Role and engine

`checker` on Sonnet, a native Claude subagent (Read, Grep, Glob), read-only. Perform the assignment directly and spawn nothing.

## Objective

Rule per numbered claim, with evidence, on the TEST-DRIVEHOLD unit's diff in the checkout `C:/Users/mikes/WebstormProjects/test` (uncommitted on `main` at `a5d7af3`), against its brief and its report.

## Context

- The brief: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/test/drivehold-brief.md` (obligations D1, D2, D3; the owned files; the acceptance criteria).
- The report: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/test/drivehold-report.md`.
- The tree: `C:/Users/mikes/WebstormProjects/test` — `src/browser/helpers.ts` (`driveHold`, around line 640 to 710), `tests/src/browser/helpers.test.ts` (`describe('driveHold')`, around line 1250 to 1290), `guides/test.md` (the paragraph around line 450; the errors table around line 1136; the `driveHold` § Surface row around line 311), `package.json`, `package-lock.json`, and the unit's logs under `tmp/drivehold/` (`acceptance.log.txt`, any red and green logs).
- You cannot run git or tests. The diff is the tree against `HEAD`: read each owned file and compare with the report's diff; where the report and the tree disagree, the tree wins and the disagreement is a finding.
- Law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` § Non-negotiable rules and § Writing; `.claude/rules/tests.md` (an inert stub on a platform object is permitted; a mock, spy, or module replacement of project-owned behaviour is not); `.claude/rules/typescript.md` (TSDoc); `.claude/rules/documentation.md` (a guide Summary cell equals the doc description paragraph; the errors table names every thrown message); `.claude/rules/writing.md` (the substitution table).

## Claims

1. **Scope.** The changed files are exactly `src/browser/helpers.ts`, `tests/src/browser/helpers.test.ts`, `guides/test.md`, `package.json`, and `package-lock.json`, and in the manifests only the three version fields the brief names read `0.0.23` (root `version` in each, and `packages[""].version` in the lock).
2. **D1 in the source.** After the `POINTER_HOLD` marker write, `driveHold` runs `await waitForFrame()` and the `:active` read inside one `try`; the `catch` releases through `releasePointer()`, rethrows the original error where the release succeeds, and where the release rejects throws `new Error(<original message>, { cause })`; the missed-press message is `Interactive target "<name>" did not enter the pressed state` unchanged; no `as`, `any`, non-null `!`, `@ts-` directive, `eslint-disable`, nested function declaration, or access modifier is added.
3. **D1 in the doc block.** The `@throws` names the frame wait and the pressed-state read as failures that release before the refusal and the release rejection as the cause where the release fails too; the `@remarks` no longer says only the read-back releases; the description paragraph (the first paragraph of the block) is unchanged, so the § Surface row's Summary still equals it.
4. **D1 in the guide.** The paragraph around line 450 states the release-before-refusal for the frame wait and the read in one sentence; the two errors-table rows naming `driveHold` are unchanged and still name every message the function throws; no substitution-table term (`should`, `simply`, `just`, `via`, `in order to`, `e.g.`, `etc.`, `please`) is added.
5. **D2 the proof.** `describe('driveHold')` carries the case named in the report; the hostile read is a data property `matches` defined on the real fixture button (an inert stub on a platform object), not a mock or spy of a project function; the case asserts the rejection with `read refused`, the absence of the `POINTER_HOLD` attribute afterwards, and a following successful hold and release; the report records the red reading (the count of failures before the fix and the assertion that failed) and the green reading with the same command.
6. **The chain.** The report records exit 0 for `format:check`, `lint:check`, `check`, `build`, and `npm test`, and `tmp/drivehold/acceptance.log.txt` agrees with the report's exit lines.

## Execution

Perform the assignment directly and spawn nothing. Cite each finding by file and approximate line.

## Output

The final message: a per-claim table (claim, CONFIRMED or FAIL, evidence), a checklist of the brief's acceptance criteria, referrals, and one terminal line `VERDICT: PASS` or `VERDICT: FAIL <claims>`.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Stop only when a file named here does not resolve.

## Acceptance criteria

Every claim has a ruling with evidence; the terminal line is present.
