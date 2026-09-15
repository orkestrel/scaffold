# Unit U1c — `@orkestrel/tool` fix round after audit A1 — successor of U1b

## Successor note

U1b landed the contract (report `.orkestrel/campaign/U1-tool-contract-report.md`); audit A1 ran
three blind lanes (`A1-audit-reviewer.md`, `A1-audit-analyst.md`, `A1-audit-checker.md`) and the
Orchestrator reproduced the sharp findings (`P3-coercion-probe.md`, `P4-a1-reproduction.md`).
This unit carries every retained finding, each named below with its carrier, plus one Orchestrator
ruling (R-coercion). Nothing else changes: the contract shape from U1b stays.

## Role and engine

`sol` route on GPT-6 Astra (objective implementer; your engine wrote U1b), reached as a
`workspace-write` `codex exec` rooted at `C:/Users/mikes/WebstormProjects/tool`. Perform the
assignment directly and spawn nothing. You are the sole writer in this checkout. The tree already
carries U1b's uncommitted edits (13 modified files plus the untracked `src/core/errors.ts`); build
on them.

## Objective

Close the A1 findings and the R-coercion ruling in the tool checkout with tests that would fail
for each defect, the guide corrected, and every gate green.

## Context

**Law, Host, Standing conditions, Scope, Tools and limits.** Identical to
`C:/Users/mikes/WebstormProjects/tool/tmp/codex/U1b-tool-contract-brief.md`; read that file's
sections and apply them unchanged. `npm.cmd run <script>`; no `prove`; no installs; no git
mutations; no version bump; no new package; no edits to the `scaffold repair` set.

**Evidence.** The three verdicts and the two probes named in the successor note, all under
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/`. Line references below are to the
U1b tree as audited.

## The findings and their fixes (each numbered item is a carrier; close every one)

1. **Claim 2 — batch abort semantics (reviewer, reproduced in P4).** The manager checks the
   signal as it dispatches each call in one synchronous pass, so an abort raised after dispatch
   reaches only handlers that observe the signal. (a) In `guides/tool.md` § Execution context,
   state that exactly. (b) Rename `checks the signal again before entering each batch handler` to
   name the case it pins (a synchronous abort inside the dispatch pass). (c) Add an executed test for
   the asynchronous case (an earlier handler awaits `waitForDelay(1)` from `@orkestrel/test` and
   then aborts; the later sibling's handler enters and succeeds) recording the real result, and a
   sibling test that a handler observing `context.signal` after that abort sees `aborted === true`.
   Constraint: do not serialize the batch and do not re-check the signal after the `await` in
   `ToolManager.#run`.
2. **Claim 10 — three weak tests (reviewer; analyst named the same mutations).** (a) `requires
   execution context and excludes caller from the call envelope`: keep the `expectTypeOf` pins and
   add a runtime assertion that the handler received the exact context object. (b) `derives
   advertised parameters from the supplied contract at construction`: add the control that the
   independently computed projection is defined and carries `type: 'object'`, and assert two reads
   of `tool.parameters` return the same reference. (c) The coercion test is rewritten under item 9
   below; it must assert that the contract's own `explain(args)` is empty for the input and that the
   handler received the parsed value (so deleting the `explain` call or the `parse` forward each
   reddens it). (d) `reports missing, constraint, variant, and oneOf faults without inventing absent
   members`: per arm assert `isToolError`, `code === 'ARGUMENTS'`, and that the handler was not
   entered (a recorder with count `0`).
3. **Claim 11 — registry fence transcription (analyst, reproduced by reading).** In
   `tests/guides.test.ts` the registry transcription must execute `tools.tool('add')` (asserting
   the exact registered instance by reference) and `tools.definitions()` (asserting order and the
   projected fields), as the fence at `guides/tool.md:218-220` claims.
4. **Claim 12 — the silent caller migration (reviewer and analyst).** Add one paragraph to
   `guides/tool.md` § Execution context stating that `caller` moved off `ToolCall` onto
   `ToolContext`; that a handler whose second parameter is annotated `unknown` still compiles and
   now receives the context object rather than the caller value; and that such a handler re-points
   at `context.caller`. Put a one-sentence `@remarks` on `ToolOptions.execute` and
   `ToolInterface.execute` saying the same. No shim, no runtime detection.
5. **F1 — constraint message drops the bound (reviewer).** In the message builder, when the fault
   arm carries `constraint` (and `limit`), append them (for example `amount: constraint; expected
   number; received 0; constraint min; limit 1` — choose the exact form and pin it). Do not change
   the `type`, `missing`, `variant`, or `oneOf` messages. Extend the guide sentence at the
   contract section accordingly.
6. **F2 — stale guide Tests rows (reviewer).** Extend the `validators.test.ts` and
   `helpers.test.ts` rows in `guides/tool.md` § Tests to name the `isToolError` proofs and the
   title/annotations forwarding. Change no other row.
7. **F3 — untyped error context (reviewer).** Declare `export interface ToolErrorContext { readonly
   faults?: readonly Fault[] }` in `src/core/types.ts` (import `Fault` as a type from
   `@orkestrel/contract`; never re-export it), type `ToolError.context` as `ToolErrorContext`, add its
   row to the guide's Types table and to the barrel-parity proof, and declare the class name as a
   field (`readonly name = 'ToolError' as const`) rather than an imperative assignment. Keep the
   constructor `(code, message, context?)`: the Orchestrator rules that `typescript.md`'s
   "machine-readable `code` and optional `context`" is satisfied and that mirroring `ContractError`'s
   `(message, options)` shape buys nothing a consumer can use.
8. **F4 — the guide's running transcript (reviewer).** Give the three new fences their own
   identifiers so no top-level `const` re-declares one bound earlier in the guide (`tools`,
   `context`, `tool`), or add one sentence before § Execution context stating that the sections that
   follow are independent examples — choose one, apply it consistently, and keep every transcription
   in `tests/guides.test.ts` byte-equal to its fence. Re-wrap the paragraphs at `guides/tool.md:15`
   and `:114` to the guide's column width. Do not rewrite the Anatomy, registry, or calls fences.
9. **R-coercion — Orchestrator ruling (P3, P4).** With `contract`, `Tool.execute` validates with
   `explain` and then forwards `contract.parse(args)` — the owned, normalized copy in the schema's
   types, with undeclared keys dropped — to the handler; without `contract`, the raw record is
   forwarded unchanged. Rewrite the guide sentences at the contract section (the "passes the original
   arguments unchanged" and "Handlers still narrow" sentences) to state the new behaviour and the
   dropped-keys consequence; update the `ToolInterface.execute` TSDoc; rewrite the coercion test as
   item 2(c) requires (a numeric string is accepted and arrives as a number; an undeclared key is
   absent in the handler's arguments; an unrelated valid record arrives as an equal but distinct
   object). The `parse` result of a contract that reported no fault is never `undefined` by the
   installed declaration; if it is, throw `ToolError` code `ARGUMENTS` naming the path `''` and
   reason `parse`, and pin that with a test only if you can construct such an input (otherwise state
   in the report that no input reaches it).
10. **Attacked-and-held wording (analyst vectors).** Add one sentence to `ToolInterface.execute`'s
    TSDoc: `Tool.execute` refuses nothing on an aborted signal; the manager checks the signal before
    entry, and a direct caller who passes an aborted signal gets a handler that observes it.

## Output

Final message: touched files with one-line summaries; `git diff --stat` (against `main`);
`git status --porcelain`; for each carrier 1–10 the test title(s) that pin it, with the exact
`npm.cmd run test:src:core -- -t '<title>'` command; the acceptance commands with exit codes and
counts; deviation state. No process diary.

## Deviation contract

Stop and report only when a cited primitive is absent from the installed declaration, when a
vendored or off-limits file would have to change, or when a rule forbids a named member. Decide,
record, and carry on for message text, test placement, fence identifiers, and wording.

## Acceptance criteria

1. `npm.cmd run lint:check` exit 0; `npm.cmd run check` exit 0.
2. `npm.cmd run test:src:core` exit 0 with the tests items 1, 2, 5, 7, 9 name.
3. `npm.cmd run test:guides` exit 0 with the transcription of item 3 and every fence byte-equal to
   its transcription.
4. `npm.cmd run test:policy`, `test:config`, `test:setup` exit 0.
5. `npm.cmd run format:check` exit 0.
6. `git diff --check` exit 0.

**Observations, not criteria.** `npm.cmd test` as a whole: report the reading.

## Review evidence

The Orchestrator captures `git diff` and `git status --porcelain` after you exit and runs the
mutation probes the reviewer named (remove the `explain` call; remove the `parse` forward; force
`parameters` unassigned) to confirm the strengthened tests redden.
