# Unit m4-retention-prose — publish the retention rule and the eager-bundle reason

## Role and engine

`implementer` on Opus 5, native Claude subagent. Documentation-voice work; the native route, no
substitution.

## Objective

The retention rule the compiler's code holds — and the reason the `createContract` bundle stays
eager — appear where their readers look: the `ContractCompilerInterface` TSDoc, the compiler
passage of `guides/contract.md`, and the `createContract` TSDoc, with an executed fence proving
the artifact-outlives-compiler claim.

## Context

**Evidence.** The design reconciliation in `/home/user/scaffold/.orkestrel/contract/plan.md`
§ Reconciled design. The measured facts behind the prose: a compiler retains its owned graph,
node index, and plan arrays until every family exists (`#collect`,
`src/core/ContractCompiler.ts:347-352`), so a compiler held for one artifact retains its working
set for its whole life, while a compiled artifact is self-contained and outlives its compiler
(`tests/src/core/ContractCompiler.test.ts:112-136` proves every root works after release). The
guide's advice at `guides/contract.md:939-941` ("Reach for `ContractCompiler` directly when you
want ONE of the six artifacts") leads a reader into exactly the held-compiler case. The lazy
bundle was excluded on recorded grounds (containment, snapshot anchor, retention inversion, the
frozen-instance `defineProperty` throw measured in
`/home/user/scaffold/.orkestrel/contract/zod-pattern.out`).

**Carried finding (from the m2-sentinels unit's report, its named carrier is this unit).** After
the m2 change, the release sentence at `guides/contract.md:491` over-claims for one member: the
node index is no longer released through a preconstructed peer — release drops it to
`undefined`, because freezing does not reach a `WeakMap`'s writes — while the other working
collections release through shared frozen class-owned peers. Rewrite that sentence to match the
changed source (the m2 report at
`/home/user/scaffold/tmp/units/m2-sentinels-report.md` carries a replacement draft; its facts
are verified, its wording is yours, and the writing rules bind it — the draft's `because`
clause survives only if you verify it reads true against the source comments). The m2 audit
adds one instruction its round carried to this unit: the guide sentence must not write
`frozen` about the class-owned peers as a bare promise — a reader cannot check a `#` static's
frozenness, and the freeze holds under a module-evaluation-order qualification stated in the
source. Drop the word from the guide sentence, or carry the qualification with it.

**Law.** `AGENTS.md` § Writing, `.claude/rules/writing.md`, `.claude/rules/documentation.md`,
`.claude/rules/typescript.md` § Comments and API documentation, `.claude/rules/tests.md`
(guides project). Skill: none. Guide: `/home/user/contract/guides/contract.md` — the subject.

**Host.** Linux, repository `/home/user/contract`, dependencies installed. Scoped commands only.

**Measurements.** Baseline gates green (`/home/user/scaffold/tmp/units/baseline-gates.log`).
Take the pre-change `npx vitest run tests/guides.test.ts --config vite.config.ts --no-cache`
count before editing.

**Control identifiers.** none.

**Standing conditions.** `dist/` may be stale against edited source from an earlier unit; not
yours to rebuild. `tests/guides.test.ts` executes flagship fences; a fence you add must execute
there or be a plain illustration the parity test only name-checks — prefer the executed form for
the artifact-outlives-compiler claim.

## Unknowns

- Whether `tests/guides.test.ts` transcribes fences automatically or requires a manual
  transcription beside the fence. Read the test first and follow its established mechanism;
  report which it was.

## Scope

**Owned.** `/home/user/contract/guides/contract.md` (the compiler and `createContract`
sections, and the release sentence the carried finding names), `/home/user/contract/src/core/types.ts`
(TSDoc on `ContractCompilerInterface` only — no member, signature, or type change of any kind),
`/home/user/contract/src/core/compilers.ts` (TSDoc on `createContract` only),
`/home/user/contract/tests/guides.test.ts` (only what the fence mechanism requires).

**Shared (report-only).** none.

**Off-limits.** Every other file. In `types.ts`, every non-TSDoc line.

**What asserts the state this change ends.** `tests/guides.test.ts` (parity and fence
execution); the policy sweep does not read prose. No other file goes false.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash` (scoped npm and vitest).
No commit, no push, no install, no `git checkout`/`restore`/`stash`/`reset`/`clean`.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Return as the final message: the exact diff, the pre-change and post-change guides-project
counts with commands, which fence mechanism the test uses, and any claim you flag as unproved.
No process diary.

## Deviation contract

Stop and report on: a guide parity failure your prose cannot close without touching an
off-limits file; the fence mechanism requiring a change outside your owned files. Where a
paragraph sits, its exact wording, and the fence's example values are yours to decide and
record.

## Acceptance criteria

1. `npm run lint:check` exits 0.
2. The prose changes carry no numeral from the probe report, follow the writing rules (no
   `should`, no counts, code tokens in backticks followed by a noun), and state: that a
   compiler read for one artifact and kept retains its working set until every family exists;
   that a compiled artifact outlives its compiler, so the pattern for one artifact is to hold
   the artifact and drop the compiler; and, on `createContract`, that the bundle is eager by
   intent — data properties that destructure and spread, refusal at the door.
3. `npx vitest run tests/guides.test.ts --config vite.config.ts --no-cache` is green, with the
   added fence executed by the mechanism the test uses.
4. `npm run check` exits 0 (TSDoc edits cannot move types; this proves it).
5. The diff touches no line outside the owned files and, in `types.ts`, no line outside TSDoc
   comments.

## Review evidence

The actual diff and the actual `git status --porcelain` output, returned in the final message.
