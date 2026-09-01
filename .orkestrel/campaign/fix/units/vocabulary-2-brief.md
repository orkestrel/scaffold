# Unit vocabulary-2 — fix round for the names.md vocabulary (supersedes `vocabulary-brief.md` for the lines it names)

## Role and engine

`implementer` on Claude Opus 5, reached as a native subagent (the Sol bench is dark; substitution
recorded). You perform the assignment directly and spawn nothing.

## Objective

The four defects the objective audit lane found in the landed vocabulary text are closed in
`.claude/rules/names.md`, with every other line of the first round's edit left as it is.

## Context

**Evidence.** The landed text is at `/home/user/scaffold/.claude/rules/names.md:91-104` (the
prefix list in § Standalone helpers) and `:119-120` (the external-mirror pair in § General
vocabulary); the first round's brief, report, and diff sit beside this file as
`vocabulary-brief.md`, `vocabulary-report.md`, and `vocabulary.diff`. The audit verdict that
carries each finding: `/home/user/scaffold/.orkestrel/campaign/fix/units/vocabulary-audit-verdict.md`.

**Findings to close, each with the ruling.**

1. `describe*` (line 100) and `render*` (line 103) overlap: every message producer satisfies both.
   Ruling: make the triggers disjoint by input. `describe*` takes a finding and produces the
   message that names it; `render*` produces text or markup from a value that is not a finding.
   Write each line so a reader with a message producer in hand lands on exactly one prefix.
2. `build*` (line 96) is not separated from `create*` (line 171) and `*Of` (line 172). Ruling:
   `build*` constructs a plain composite value (a record, a row, a worksheet) from parts, reads no
   host, is never an entity factory (an entity factory is `create*` and lives in `factories.ts`),
   and is never a shape combinator named for its constituents (`*Of`). State the exclusions in the
   `build*` line; do not edit lines 171-172.
3. `read*` (line 97) restates the `parse*` contract that § Fixed derivation/construction forms
   (line 170) already owns. Ruling: keep the exclusion ("never coerces") and refer the coercing
   case to that section by name instead of restating "coercion to `T | undefined`".
4. `resolve*` (line 98) does not license `resolveColor` for a helper that coerces a CSS color
   expression through a live probe to `Color | undefined`. Ruling: the vocabulary stands as
   written and the row's name changes (the Orchestrator renamed that target to `parseCSSColor`);
   no edit to line 98 for this finding.

**Law.** `AGENTS.md` § Writing and § Instruction files; `.claude/rules/writing.md`. Every line a
directive; no count; no rationale written to persuade; one home per rule.

**Host.** `/home/user/scaffold`, branch `claude/orkestrel-npm-audit-deps-14ibta`, committed clean
at launch. `.orkestrel/**` and `tmp/**` are the Orchestrator's record; not yours.

## Unknowns

none.

## Scope

**Owned.** `.claude/rules/names.md`, lines 91-104 only.

**Off-limits.** Every other line and every other file.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, stage, push, install, or discarding
`git` command. Non-mutating checks only.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Edit the three lines the
findings name, then run:

```text
npm run format:check && npm run lint:check && npm run test:policy
```

## Output

Return, as data: the changed lines verbatim (before and after) in a fenced Markdown block; each
command with its exit code; `git diff --stat`; `git status --short`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when a ruling above cannot be written as one directive without a second home, or
when the policy sweep rejects the edit. Decide, record, and carry on from the exact wording.

## Acceptance criteria

1. A message producer over a finding matches only `describe*`; a text or markup producer over a
   non-finding value matches only `render*` (read both lines together and state why they are
   disjoint in the report).
2. The `build*` line names the `create*` and `*Of` exclusions.
3. The `read*` line refers coercion to § Fixed derivation/construction forms and does not restate
   `T | undefined`.
4. `npm run format:check`, `npm run lint:check`, `npm run test:policy` exit 0.
5. `git status --short` lists `.claude/rules/names.md` only.

## Review evidence

The actual diff and the actual status output at return.
