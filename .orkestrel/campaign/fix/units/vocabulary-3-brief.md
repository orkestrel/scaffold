# Unit vocabulary-3 — fix round for the `build*`/`create*` boundary (supersedes `vocabulary-2-brief.md` for line 96 and grants § Fixed derivation/construction forms)

## Role and engine

`implementer` on Claude Opus 5, a native subagent (the Sol bench is dark; substitution recorded).
You perform the assignment directly and spawn nothing.

## Objective

A reader holding a helper that assembles a composite lands on exactly one of `build*` and
`create*` from the text of `.claude/rules/names.md` alone.

## Context

**Evidence.** `/home/user/scaffold/.claude/rules/names.md:96` (the `build*` line in § Standalone
helpers) and `:167-175` (§ Fixed derivation/construction forms; `:171` reads "`create*`: factory
constructing an entity/value"). The audit finding: `units/vocabulary-audit-verdict.md` round 2,
claim 2 — a plain composite matches both lines because line 171 admits a value and `entity` is
defined nowhere in the file.

**Ruling.** The axis is who calls it and where it lives, not the shape of the result. `create*`
is the factory a consumer calls to obtain an entity or a value it then holds; it lives in
`factories.ts` (the vendored policy sweep gates that file to `create*`). `build*` is an assembly
step inside the package's own computation that composes parts the package computed into an
intermediate, exported for its tests; it lives in `helpers.ts`. Write line 171 so it names the
consumer-facing factory and refers a package-internal assembly step to `build*` in § Standalone
helpers; write line 96 so it names the package-internal assembly step and refers a
consumer-facing factory to `create*` in § Fixed derivation/construction forms, keeping the `*Of`
exclusion. Keep the `(a record, a row, a worksheet)` examples only if they still disambiguate
after the rewrite. The fleet's own rows this must decide: rater's `buildWorksheet` and
`buildLineResult` (assembly steps inside the rating computation) → `build*`; reason's bare-noun
value constructors that consumers call (`createFactor`) → `create*`; program's
`buildProgramDefinition` (assembles the definition from parsed parts inside the compiler) →
`build*`.

**Law.** `AGENTS.md` § Writing and § Instruction files; `.claude/rules/writing.md`. One home per
rule: the `create*` contract stays on line 171 and the `build*` contract on line 96; each refers to
the other by section name without restating it.

**Host.** `/home/user/scaffold`, branch `claude/orkestrel-npm-audit-deps-14ibta`, committed clean
at launch. `.orkestrel/**` and `tmp/**` are the Orchestrator's record.

## Unknowns

none.

## Scope

**Owned.** `.claude/rules/names.md`, line 96 and lines 167-175 only.

**Off-limits.** Every other line and every other file.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, stage, push, install, or discarding
`git` command. Non-mutating checks only.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Edit the two lines, then run:

```text
npm run format:check && npm run lint:check && npm run test:policy
```

## Output

Return, as data: the changed lines verbatim (before and after) in a fenced Markdown block; for each
of `buildWorksheet`, `createFactor`, and `buildProgramDefinition`, the one line of the file that
decides it; each command with its exit code; `git diff --stat`; `git status --short`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when the ruling cannot be written without a third home or contradicts another line in
§ Fixed derivation/construction forms. Decide, record, and carry on from the exact wording.

## Acceptance criteria

1. Line 171 names the consumer-facing factory and `factories.ts`, and refers a package-internal
   assembly step to `build*` in § Standalone helpers.
2. Line 96 names the package-internal assembly step and refers a consumer-facing factory to
   `create*` in § Fixed derivation/construction forms, keeping the `*Of` exclusion.
3. No changed line states a count or uses `should`.
4. `npm run format:check`, `npm run lint:check`, `npm run test:policy` exit 0.
5. `git status --short` lists `.claude/rules/names.md` only.
