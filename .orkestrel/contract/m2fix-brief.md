# Unit m2fix — carry the m2-audit prose findings

Successor of `m2-sentinels-brief.md` and its audit round (`m2-audit-brief.md`; reconciled in
`.orkestrel/contract/m2-audit-verdict.md`). Comment-only: no executable line moves anywhere.

## Role and engine

`builder` on Sonnet, native Claude subagent — both replacements are fully specified in this
brief.

## Objective

The sentinel comment in `src/core/ContractCompiler.ts` and the isolation-case comment in
`tests/src/core/ContractCompiler.test.ts` say what the audit round proved, verbatim as this
brief specifies.

## Context

**Evidence.** The audit broke the current sentinel comment (imprecise "every writer"; an
unqualified freeze promise) and the isolation-case comment (it promises discrimination the case
does not have — the Orchestrator reproduced a neutralized release leaving it green). The
replacement texts below are adopted from the audit lanes' prescriptions.

**Law.** `AGENTS.md` § Writing, `.claude/rules/writing.md`, `.claude/rules/typescript.md`
§ Comments. Skill: none. Guide: none.

**Host.** Linux, `/home/user/contract` at commit 7e762ab, tree clean, dependencies installed.

**Measurements.** `npx vitest run tests/src/core/ContractCompiler.test.ts --config
vite.config.ts --no-cache` reports `Tests 23 passed (23)` at 7e762ab (Orchestrator-run
2026-09-01).

**Control identifiers.** none.

**Standing conditions.** `dist/` is current with 7e762ab; do not rebuild.

## Unknowns

none.

## Scope

**Owned.** `src/core/ContractCompiler.ts` (the one comment block ahead of the
`static readonly #emptyStack` declaration — comment lines only) and
`tests/src/core/ContractCompiler.test.ts` (the one comment block inside the case
`keeps two released compilers answering their own declaration and settles a later one alone` —
comment lines only).

**Shared (report-only).** none. **Off-limits.** every other file and every non-comment line.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Bash` (the two scoped commands in the
acceptance criteria only). No commit, no push.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## The replacements

Replace the comment block that begins `// The released state, shared by every compiler` and ends
`// a node of one compiler's graph into every other compiler's release.` with exactly:

```text
// The released state, shared by every compiler this class ever builds.
// `#release` assigns these in place of the working collections, so an instance
// allocates one collection per family instead of two and construction carries
// no empty peer of its own. Sharing them is safe because nothing MUTATES a
// released collection: every element write — `#discover`, `#schedule`, and the
// six family loops — runs behind `#prepare`, which refuses after `#release`
// clears `#source`; the constructor and `#release` assign the field and never
// touch a sentinel's elements. The static block beneath freezes them, so a
// write that did reach one fails at its own line rather than leaking a node of
// one compiler's graph into every other compiler's release — under the same
// qualification `#weakMap` carries earlier: `INTRINSICS.freeze` is captured
// while this module evaluates, so a consumer module ordered before
// `constants.ts` defeats it, and that limit is stated there rather than
// defended.
```

Replace the comment block inside the named test case (the lines beginning `// Release hands
every working collection` through `// answers intact.`) with exactly:

```text
// A preservation pin, not a discriminator: release mechanics are `#` private
// and publish nothing, so no assertion here can observe a sentinel or bind to
// the freeze — the heap baseline instrument in the campaign record is what
// discriminates the sentinel design. What this case pins is that two
// compilers driven past release keep answering for their own declaration,
// and that a compiler built afterwards settles alone with its own coded
// error while those answers stand.
```

## Deviation contract

Stop and report if either anchor text is absent or ambiguous. Nothing else is yours to decide.

## Acceptance criteria

1. `npm run format:check` exits 0.
2. `npx vitest run tests/src/core/ContractCompiler.test.ts --config vite.config.ts --no-cache`
   reports `Tests 23 passed (23)`.
3. `git diff` shows only comment-line changes in the two named blocks.

## Output

Return the exact diff and the gate outputs. No process diary.

## Review evidence

The diff and `git status --porcelain`, returned in the final message.
