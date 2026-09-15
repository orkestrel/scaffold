# Unit A1-fix-2 — close audit round A1-R2's claim 12 and referral (c) on the `AgentProvider` base

Draft written while unit A2 writes the checkout; dispatched serially after A2 lands. The
Orchestrator amends § Measurements at dispatch.

## Role and engine

`implementer` on Claude Opus 5, native, with Read, Grep, Glob, Edit, Write, and Bash. Perform the
assignment directly and spawn nothing. You are the sole writer in
`C:\Users\mikes\WebstormProjects\agent` for the life of this unit. The subject was written by GPT 6
Astra, so this unit routes to the other engine; its auditor is a mutation probe by the
Orchestrator plus a `checker` pass, because every item adopts the reviewer's prescription verbatim.

## Objective

Close the five coherence items the A1-R2 deciding lane found and the one referral the
Orchestrator adopted, with no behavioural change beyond one added `cause` field, keeping every
gate green.

## Context

**Record.** `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\campaign\a1-r2-audit-subjective.md`
(claim 12 and referral (c), quoted here) and `design-reconciliation.md` § "Audit round A1-R2".

**Law.** `C:\Users\mikes\WebstormProjects\scaffold\AGENTS.md`;
`C:\Users\mikes\WebstormProjects\scaffold\.claude\rules\{names,typescript,architecture,tests,writing}.md`.

**Host.** Windows 11, Git Bash. Never `npm install`, `git add`, `commit`, `stash`, `checkout`,
`restore`, `reset`, `clean`, or `git mv`. Never edit a vendored file.

**Measurements (Orchestrator, host, 2026-09-14).** Agent HEAD `c50aee6` (A2 landed: the relay);
tree clean at launch; `npm run format:check`, `lint:check`, `check`, `build` exit 0;
`npm run test:src:core` 23 files / 731 tests; `npm run test:setup` 54. The line numbers quoted
under § Items were read at `573ba71`; A2 added lines to `AgentProvider.test.ts` and `tests/setup.ts`
below the regions those items name, so locate each item by the quoted text, not the number.
Audit round A2-R1 is reading the isolated worktree `agent-audit` while you write; nothing you
change is read by it.

**Control identifiers.** None.

**Standing conditions.** `test:guides` is red until A3; the API Extractor notice is not a defect.

## Items

1. **One behaviour, one block** (`tests/src/core/AgentProvider.test.ts`). Deadline clearing is
   proved at `:86`, `:99` and again at `:560`, `:574`, `:833`; the error-body bound at `:114` and
   `:789`; concurrency isolation at `:405`, `:705`, `:819`; cancellation at `:325-366`, then in
   `AgentProvider — cancellation and partial results` (`:435`), then at `:636`, `:662`, `:846`.
   Give the first block a subject name and move each behaviour under the block that names it, so
   a reader asking where cancellation is proved reads one block. Keep the
   `removes abort listeners after …` family together under a name that says so. Move tests; do
   not rewrite assertions.
2. **`ProviderError.code`'s member line** (`src/core/errors.ts:233`). Write it in the sibling form
   `ConversationError` (`:136`) and `AgentError` (`:193`) use — each arm bound to the condition
   that raises it on that line — so a `catch` branching on `error.code` learns what each arm
   covers without opening `types.ts`.
3. **One home for the `headers` fact** (`src/core/types.ts:2174-2176` and `:2181`). Keep the
   `@remarks` sentence; delete the member doc that restates it.
4. **A helper named for what it is** (`tests/setup.ts:999-1002`). Rename `acceptHostileArray` to
   `approveEvery`, document it as the hostile own `every` an array carries, and update its two
   call sites in `tests/src/core/validators.test.ts`.
5. **An extension example a consumer can configure** (`src/core/AgentProvider.ts:32-62`). Change
   the example's constructor to take an options parameter extending `ProviderOptions` and forward
   it: `constructor(options: TextOptions) { super({ ...options, path: '/generate' }) }` with
   `interface TextOptions extends ProviderOptions { readonly url: string }` declared inside the
   fence — the shape every other subclass in the campaign takes.
6. **The abort error keeps the original throw** (referral (c)). Give `ProviderAbortError` a
   constructor `(partial, options?: ErrorOptions)` that passes `options` to `super`, so `cause` is
   carried; in `AgentProvider.stream`'s catch, when the combined signal is aborted and the caught
   value is not itself the signal's reason, construct the abort error with `{ cause: error }`;
   document on the class that `cause` holds the failure the cancel superseded when there was one.
   Test, failing first: `read` throws `ProviderError('PROTOCOL')` in the turn the deadline fires;
   the caller receives `ProviderAbortError` whose `cause` is that `ProviderError`; a plain deadline
   with no competing throw leaves `cause` `undefined`. The guide row for `ProviderAbortError` is
   A3's; leave `guides/**` alone.

## Scope

**Owned.** `src/core/AgentProvider.ts`, `src/core/errors.ts`, `src/core/types.ts` (item 3 only),
`tests/setup.ts`, `tests/src/core/AgentProvider.test.ts`, `tests/src/core/validators.test.ts`,
`tests/src/core/errors.test.ts` (if it exists; else the `ProviderAbortError` case lives in
`AgentProvider.test.ts`).

**Shared (report-only).** None.

**Off-limits.** Everything else: `helpers.ts`, `validators.ts`, `shapers.ts`, `contracts.ts`,
`factories.ts`, `index.ts`, `providers/**`, `RelayStream.ts`, `guides/**`, `README.md`,
`tests/guides.test.ts`, configuration, the vendored set, `package.json`, `package-lock.json`,
`AGENTS.md`, `CLAUDE.md`, `.claude/**`, `scripts/**`, `dist/**`, `node_modules/**`.

**What asserts the state this change ends.** The tests named per item; nothing else.

**Tools and limits.** Bash for `npm run lint:check`, `check:src:core`, `check`, `test:src:core`,
`test:setup`, `test:probe`; never `lint`, `format`, `build`, or the whole `test` chain; never
install, commit, or read a credential.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Write the report to `C:\Users\mikes\WebstormProjects\scaffold\tmp\units\a1-fix-2-report.md` and
return the same text: `Touched files` with `git diff --stat`; `Red then green` for item 6;
`Scoped validation`; `Observations`; `Deviation`; `Status`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one short hypothesis — when
an item needs a file outside Owned or would change a ruled behaviour. Decide, record, and carry on
from block names and test order.

## Acceptance criteria

1. `npm run lint:check`, `npm run check:src:core`, and `npm run check` exit 0.
2. `npm run test:src:core` and `npm run test:setup` exit 0; the count rises by item 6's tests and
   falls by none.
3. `grep -n "acceptHostileArray" tests` returns nothing; `grep -c "describe(" tests/src/core/AgentProvider.test.ts`
   is reported with each block's name and the behaviours it holds.
4. Item 6's test was red before and green after; `ProviderAbortError`'s constructor accepts
   `ErrorOptions`.
5. No `any`, assertion, non-null assertion, suppression, access modifier, parameter property, or
   nested function declaration in the diff.

**Observations, not criteria.** `test:guides`; `build`; the whole `test` chain.

## Review evidence

A code change: `git diff --stat` and `git status --porcelain`; the Orchestrator takes the full
diff and runs the mutation probe on item 6.
