# PROOF-RESOLVER (`pr`) — verification, checker

## Role and engine

`checker` on Sonnet, a native Claude subagent, read-only (Read, Grep, Glob). It writes nothing and runs nothing.

## Objective

Rule, claim by claim, whether the PROOF-RESOLVER delta in `/home/user/veneer-pr` (over `518faf0`) does what `proof-resolver-brief.md` specifies and nothing else, with the evidence the report names.

## Context

**Subject.** The worktree `/home/user/veneer-pr` (read the live `tests/setupServer.ts`, `tests/setupServer.test.ts`, and `guides/veneer.md`; never `tmp/`, `dist/`, or `node_modules/`); the base is read through the patch's context lines and the retained `pr.diff` (`git diff 518faf0`).

**Evidence, all under `/home/user/scaffold/.orkestrel/veneer/units/`.** `pr.diff`, `pr-status.txt`, `proof-resolver-report.md`, `proof-resolver-brief.md`.

**Law.** `AGENTS.md`; `.claude/rules/{tests,typescript,names,documentation,writing}.md`. Skill: none.

**Standing conditions.** `npm run build:src` is red on this base at the declaration rollup (the engine session's `Sanitizer` reference), so `dist/src/core/index.js` is absent in the worktree and the one `setupServer.test.ts` case and the one conformance case that read a built entry fail with `ENOENT` there; the report records both as the base's, reproduced against the unmodified file. The Orchestrator's landing runs those cases on the session checkout, where `dist/` exists. `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored and must be absent from the diff.

## Scope

Read-only over the evidence files and the worktree's owned files. No edit, no command.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Claims

1. **Delta and scope.** `pr-status.txt` lists exactly `guides/veneer.md`, `tests/setupServer.test.ts`, and `tests/setupServer.ts` as modified and nothing else; `pr.diff` touches only those; neither vendored file, `tests/conformance.test.ts`, nor any other file appears.
2. **The predicate.** `tests/setupServer.ts` exports `isProofFile(proof: string): boolean`, documented, returning whether `proof` matches `/^tests\/[^\s`]+\.test\.ts$/u`, and the module's exported surface case in `tests/setupServer.test.ts` lists it in sorted position.
3. **The resolver branch.** In `scanOracleObligation`, after the `row.proof === undefined` return and before the recording-step lookup: when `isProofFile(row.proof)` holds, a row whose `category` is not `plugin` returns `${label}: a file proof is a plugin row's`; a `plugin` row returns `undefined` when `existsSync(resolve(WORKSPACE_ROOT, row.proof))` holds and `${label}: missing proof file` otherwise; every other path through the function is unchanged (cite the diff's context lines); the function's `@returns` and `@remarks` state the file form.
4. **The proof.** `tests/setupServer.test.ts` adds cases named for what they prove: a `plugin` row naming `tests/setupServer.test.ts` reads `undefined`; a `plugin` row naming `tests/src/browser/absent.test.ts` reads the `missing proof file` finding with the label the resolver builds; a non-plugin row spread from the `button.click.toggle` row with a file proof reads the `a file proof is a plugin row's` finding; `isProofFile` accepts `tests/src/browser/Collapse.test.ts` and refuses `button.click.toggle`, `tests/setup.ts`, and `src/browser/Collapse.test.ts`. Name for each case the mutation of the resolver that would make it fail and whether the assertion distinguishes it (the branch removed; the category guard inverted; the `existsSync` check dropped; the pattern loosened to accept `tests/setup.ts`).
5. **The guide.** § Compatibility's prose gains, after "… the Button interaction recording cannot drive.", exactly "A `plugin` row's Proof cell names instead the test file that proves the obligation, as a path from the workspace root ending in `.test.ts`, after its engine unit ships; the conformance proof requires that file to exist, and a row of any other kind refuses the file form." and no table row changed.
6. **The report and the law.** The report records the failing-first command with its red (`6 failed | 95 passed (101)`, four of them the added cases) and green (`1 failed | 100 passed (101)`, the `ENOENT` case) result lines, each gate's command and result line, the scoped `oxfmt` deviation, and the `dist/`-dependent failures as the base's; the delta adds no `any`, `as` assertion beyond a const assertion, `!`, suppression, mock, or nested function beyond a callback passed directly; the prose carries no banned term and no count of a growable set (list every count the report states with its ruling).

## Output

Return, as the final message, one verdict per claim (`CONFIRMED`, `BROKEN`, `UNRESOLVED`, or `NOT-EVIDENCED`) with `file:line` evidence, findings outside the claims to the BROKEN standard, and the single terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. No process diary; rule every population whole rather than sampling it; state no count of a growable set.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Where an evidence file is missing or a claim's site cannot be located, rule the claim `NOT-EVIDENCED` and name what is missing rather than stopping; a sub-clause that needs a command is the Orchestrator's to settle, not a reason to fail the claim.

## Acceptance criteria

A verdict on every claim with evidence and the terminal line.

## Review evidence

The diff and status evidence named under Context.
