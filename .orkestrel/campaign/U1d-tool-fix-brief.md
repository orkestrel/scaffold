# Unit U1d — `@orkestrel/tool` fix round after audit A1b — successor of U1c

## Successor note

U1c closed every A1 carrier (`U1c-tool-fix-report.md`); the Orchestrator's gates are green and
its three mutation probes reddened the strengthened tests (`U1c-mutation-probes.log.txt`). Audit
A1b (`A1b-audit-reviewer.md`, `A1b-audit-checker.md`) confirmed claims 1–10 and blocked the ship
on two placement and instrument findings, with five successor findings. This unit carries all of
them. The contract shape is unchanged.

## Role and engine

`sol` route on GPT-6 Astra, reached as a `workspace-write` `codex exec` rooted at
`C:/Users/mikes/WebstormProjects/tool`. Perform the assignment directly and spawn nothing. Sole
writer. The tree carries U1b and U1c's uncommitted edits; build on them.

## Context

**Law, Host, Standing conditions, Scope, Tools and limits.** As in
`C:/Users/mikes/WebstormProjects/tool/tmp/codex/U1b-tool-contract-brief.md`, plus: Owned adds
`tests/src/core/errors.test.ts` (new). `npm.cmd run <script>`; no `prove`; no installs; no git
mutations; no version bump; no new package; no edits to the `scaffold repair` set.

**Evidence.** The two A1b verdicts under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/`.
Line references are to the U1c tree.

## Carriers (close every one)

1. **F5 — `isToolError` belongs in `errors.ts`.** Move the guard and its doc block from
   `src/core/validators.ts` to `src/core/errors.ts` (the kind table routes error guards there;
   `agent/src/core/errors.ts` and `mcp/src/core/errors.ts` keep the same shape); drop the
   `ToolError` import from `validators.ts`; in `guides/tool.md` restore the Validators lead
   sentence to the call-envelope guard alone and list `isToolError` under the `### ToolError`
   heading the way `guides/contract.md:365-370` lists `isContractError`; move the `isToolError`
   describe block from `tests/src/core/validators.test.ts` to `tests/src/core/errors.test.ts`
   (the mirror rule admits it because it proves the guard's behaviour, not the class definition);
   correct the Tests rows. The barrel keeps both files, so the published surface does not move.
2. **F6 — the parity test's name outruns it.** `tests/guides.test.ts` `documents the exported
   error context with its faults member` must assert that the guide's Shape cell for
   `ToolErrorContext` carries `faults` (read the row), or be renamed to what it asserts.
3. **F7 — migration note wording.** Reduce the `@remarks` on `ToolInterface.execute` and
   `ToolOptions.execute` to the present-tense fact (the second parameter is the execution context;
   caller identity is `context.caller`); keep the guide's migration paragraph and name the version
   it applies from ("from 0.0.15").
4. **F8 — the `: parse` message.** Replace `new ToolError('ARGUMENTS', ': parse')` with a message
   that is plainly not a fault line — `Arguments did not parse` — with no `context`; restate
   `guides/tool.md` (the sentence about the changing getter) as the code's actual condition: a
   parse result that is not a record after a clean explanation. Keep the test that reaches it.
5. **F9 — `variant` and `oneOf` messages.** Append `; variants <n>` when the arm carries
   `variants` and `; matched <n>` when it carries `matched`; pin both in the fault-arm test with
   the exact strings; restate the guide sentence that says those arms carry neither expected nor
   received to say what they do carry. The `type`, `missing`, and `constraint` messages stay
   byte-identical.
6. **F10 — reflow.** `guides/tool.md:330` and the paragraph at `:349-354` to the guide's column.
7. **F11 — `toolToDefinition` description.** Name both members carried by reference (parameters
   and annotations) in the description paragraph; the guide Summary cell follows (parity).

## Output

Final message: touched files; `git diff --stat main`; `git status --porcelain`; for carriers
1, 2, 5 the test titles and exact commands; acceptance commands with exit codes and counts;
deviation state. No process diary.

## Deviation contract

Stop only when a cited primitive is absent, a vendored or off-limits file must change, or a rule
forbids a named member. Decide, record, carry on for wording and placement of tests.

## Acceptance criteria

1. `npm.cmd run lint:check` exit 0; `npm.cmd run check` exit 0.
2. `npm.cmd run test:src:core` exit 0 including `tests/src/core/errors.test.ts`.
3. `npm.cmd run test:guides` exit 0 with every fence byte-equal to its transcription.
4. `npm.cmd run test:policy`, `test:config`, `test:setup` exit 0 (the mirror sweep must accept
   `errors.test.ts` beside `errors.ts`).
5. `npm.cmd run format:check` exit 0; `git diff --check` exit 0.

**Observations, not criteria.** `npm.cmd test` as a whole.
