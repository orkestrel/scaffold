# Unit A1-fix-2-check — mechanical conformance of unit A1-fix-2

## Role and engine

`checker`, native Claude (Sonnet), read-only, clean context. Perform the assignment directly and
spawn nothing. You cannot write: return the verdict as your final message.

## Objective

Rule on each numbered claim from the diff and the files at the agent commit named in § Context,
per the `orkestrel-falsify` value set: `CONFIRMED`, `BROKEN`, or `UNRESOLVED`, each with
`file:line` evidence, then findings outside the claims, then one terminal `VERDICT:` line.

## Context

- Checkout: `C:/Users/mikes/WebstormProjects/agent`, read only, at commit `0fa4090` with a clean
  tree (the Orchestrator's `git status --porcelain` printed nothing).
- Unit brief: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/a1-fix-2-brief.md`
  (its acceptance criteria are the claims' source).
- Unit report: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/a1-fix-2-report.md`.
- Diff: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/a1-fix-2-diff.txt`, the
  committed diff `git diff c50aee6 HEAD` after the Orchestrator's lint and format converge.
- Baseline file for claim 2: `git show c50aee6:tests/src/core/AgentProvider.test.ts` (run with
  `git -C C:/Users/mikes/WebstormProjects/agent show ...` through your Bash-less tools by reading
  the copy the Orchestrator staged at
  `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/a1-fix-2-baseline-test.ts.txt`).
- Law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/typescript.md`
  (TSDoc), `.claude/rules/tests.md`, `.claude/rules/names.md`, and `.claude/rules/writing.md`
  (substitution table, code tokens) under the same root.
- A test is named for what it proves, never for the control that specified it; the brief's item
  numbers are control identifiers and appear in no test name.

## Claims

1. The diff touches exactly `src/core/AgentProvider.ts`, `src/core/errors.ts`,
   `src/core/types.ts`, `tests/setup.ts`, `tests/src/core/AgentProvider.test.ts`, and
   `tests/src/core/validators.test.ts`, and no other path.
2. Every `it(` title present in the baseline `AgentProvider.test.ts` is present at HEAD, and the
   titles present at HEAD but absent from the baseline are the two `cause` tests only
   (`carries a decoder failure that raced the cancel as the abort error cause` and
   `leaves the cause undefined when the cancel is the only failure`).
3. Every `describe(` name in that file has the `AgentProvider — <subject>` form naming the
   behaviour the block holds, and the `removes abort listeners after …` family sits in one block
   and in its baseline order.
4. `acceptHostileArray` appears nowhere under `tests/`; `approveEvery` is exported from
   `tests/setup.ts` with a doc block and used at the `validators.test.ts` call sites that used the
   old name.
5. `ProviderAbortError`'s constructor reads `(partial: ProviderResult, options?: ErrorOptions)`
   and forwards `options` to `super`; the catch in `AgentProvider.stream` passes `{ cause: error }`
   only when the thrown value differs from the combined signal's reason.
6. `ProviderOptions.headers` in `types.ts` carries one doc block whose signal semantics appear
   once, in the `@remarks` paragraph.
7. The `code` member of `ProviderError` in `errors.ts` is documented in the same
   arm-by-condition form its sibling members use.
8. The `@example` on `AgentProvider` declares `TextOptions extends ProviderOptions`, takes it in
   the constructor, and forwards it to `super`.
9. The diff's added lines carry no `any`, no `as` assertion, no `!` non-null assertion, no
   `@ts-` directive, no `eslint-disable` or `oxlint-disable`, no access modifier, no parameter
   property, and no nested function declaration.
10. The added prose (TSDoc and comments) carries no term from the substitution table in
    `writing.md` in a banned sense, writes each code token in backticks followed by a noun, and
    describes behaviour in the third person present.
11. `ScriptedWireOptions.abort` is optional, and no `ScriptedWire` construction outside
    `AgentProvider.test.ts` changed.

## Output

Per-claim verdicts with evidence, findings outside the claims, and one line
`VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <labels or none>`, as
your final message.
