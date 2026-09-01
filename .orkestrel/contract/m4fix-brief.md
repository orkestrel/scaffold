# Unit m4fix — carry the m4-audit findings

Successor of `m4-retention-prose-brief.md` and its audit round (`m4-audit-brief.md`; reconciled
in `.orkestrel/contract/m4-audit-verdict.md` — read it first; the lane returns beside it carry
the full evidence).

## Role and engine

`implementer` on Opus 5, native Claude subagent (documentation-voice unit with prose judgment
inside supplied bounds; Sol recorded dark for the objective half, recorded).

## Objective

The three falsified sentences say what the source does, the fence guard binds the value-claiming
lines, and every flagship fence that asserts a value is transcribed — nothing else moves.

## Context

**Evidence.** The verdict file carries each finding with its source pointers. The load-bearing
facts, each verified by an audit lane against the live tree: the auditor and reporter plans
capture the owned nodes they read bounds from (leaf and array cases of `#auditOf` and
`#reportOf`), while the GUARD family captures no owned node — the guide's guard-centred advice
and fence are correct and stay; settlement through `#fail` releases the working set before any
family exists; `contain` adopts a `ContractError` by identity, so a refusal carries the
authoring door's diagnosis rather than this door's name; the presence guard binds only the
fence's construction line; the guide's compiling-a-contract fences
(`guides/contract.md:927-937` and `943-954`) assert values no test transcribes.

**Law.** `AGENTS.md` § Writing, `.claude/rules/writing.md`, `.claude/rules/documentation.md`,
`.claude/rules/typescript.md` § Comments, `.claude/rules/tests.md` (guides project). Skill:
none. Guide: `/home/user/contract/guides/contract.md` — the subject.

**Host.** Linux, `/home/user/contract` at fcdd4d0 plus the uncommitted m4 diff, dependencies
installed.

**Measurements.** Guides project at `Tests 61 passed (61)` on the m4 tree (writer-run
2026-09-01).

**Control identifiers.** none.

**Standing conditions.** The m4 diff is uncommitted in the tree; your diff lands on top of it
and both commit together. `dist/` is stale against the TSDoc edits; not yours to rebuild.

## Unknowns

none.

## Scope

**Owned.** `/home/user/contract/src/core/compilers.ts` (the `createContract` TSDoc paragraph
only), `/home/user/contract/src/core/types.ts` (the `ContractCompilerInterface` TSDoc paragraph
only), `/home/user/contract/guides/contract.md` (the sentence at the end of § Compiling a
contract that over-claims, and nothing else), `/home/user/contract/tests/guides.test.ts` (the
`flagship fences` block only).

**Shared (report-only).** none. **Off-limits.** every other file and every non-TSDoc line of
the source files.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Bash` (scoped commands in the acceptance
criteria and the mutation probe). No commit, no push.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## The changes

1. In the `createContract` TSDoc: replace the sentence "A malformed declaration refuses at this
   call rather than at the first read of whichever member a caller happens to touch, so the
   refusal stays inside this function's own error attribution." with: "A malformed declaration
   refuses at this call rather than at the first read of whichever member a caller happens to
   touch, so the failure arrives at the call the caller made — carrying the authoring door's
   own diagnosis, which this door adopts rather than rewraps." Replace the final sentence
   ("Every member is self-contained, so the compiler this call builds releases its working set
   before the call returns and nothing the caller keeps holds the owned graph.") with a
   statement of what holds: every member is self-contained and the compiler's working set is
   released before the call returns; the auditor and reporter plans close over the owned leaf
   and array nodes they read their bounds from, so a kept contract retains those nodes and,
   through an array node's `items`, the subgraph beneath them; nothing the caller keeps reaches
   back into the compiler. Wording is yours within the writing rules.
2. In the `ContractCompilerInterface` TSDoc paragraph: delete the sentence "Nothing is released
   before then." and change "for as long as you keep it" to name the noun ("for as long as you
   keep the compiler").
3. In the guide: correct "which is why a contract it returns holds nothing but its own six
   values" so it does not deny the diagnostics' node retention — align it with the corrected
   TSDoc; wording is yours within the writing rules.
4. In `tests/guides.test.ts`, inside the `flagship fences` block: extend the presence guard
   with exactly `expect(guideText).toContain("isTicket({ id: 'T-1' }) // true")` and
   `expect(guideText).toContain("isTicket({ id: '' }) // false")` (adjust quoting to the
   file's style); add transcriptions for the guide's compiling-a-contract fences — the
   `createContract` example (`contract.is(value)` false, `contract.parse(value)` equal to
   `{ id: 'a' }`, `contract.audit(value)` equal to `[{ reason: 'extra', path: ['debug'] }]`,
   `contract.explain(value)` empty) and the compiler example (`compiler.guard({ id: 'a' })`
   true, `compiler.guard === compiler.guard`, `compiler.contract.is === compiler.guard`), each
   with presence guards binding the value-claiming comment lines. Do not assert any whole fence
   block as one substring.

## Deviation contract

Stop and report on: a transcription failing against the live code (that is a guide-truth defect
this unit must not paper over); any change needed outside the owned surfaces. Exact wording
within the stated bounds and assertion grouping are yours to decide and record.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0.
2. `npm run check` exits 0.
3. `npx vitest run tests/guides.test.ts --config vite.config.ts --no-cache` is green, counts
   recorded pre-change and post-change.
4. Mutation probe, recorded in the report: flip the guide's `// false` claim line on the
   `isTicket` fence to `// true`; the guides run reddens; restore; it greens. Repeat once for
   one transcribed value of the `createContract` example (flip its `// false` comment); redden,
   restore, green. Leave the tree unflipped.
5. The corrected sentences carry no numeral from the probe reports and follow the writing
   rules.

## Output

Return as the final message: the exact diff, the counts with commands, the mutation-probe
evidence, and any claim you flag as unproved. No process diary.

## Review evidence

The actual diff and the actual `git status --porcelain` output, returned in the final message.
