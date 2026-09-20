# Unit U7-rule — the runtime-entry clause admits a published `auto` entry

## Role and engine

`builder` on native Sonnet. You are a native subagent: perform the assignment directly and spawn
nothing. Sole writer in `C:/Users/mikes/WebstormProjects/scaffold` for this unit; commit nothing;
install nothing; no tree-wide `format` or lint `--fix`; no `git checkout`, `git restore`,
`git stash`, `git reset`, `git clean`, or `git add`. Law: `AGENTS.md` § Instruction files and
`.claude/rules/writing.md` (an instruction file is written for an executing agent: directives,
no rationale, no history).

## Objective

Extend the runtime-entry clause of `.claude/rules/architecture.md` § Declaration placement so a
published side-effect entry `src/<environment>/auto.ts` is a runtime entry under the same
constraint as the three it names, and nothing else changes.

## Context

The clause reads today (`.claude/rules/architecture.md`, § Declaration placement):

> A runtime entry—`src/bin/main.ts`, `app/browser/main.ts`, `app/server/main.ts`—is a fixed
> name, not a centralized kind file. Both the data rule and the function rule reach it, so it
> declares no module-scope constant and no module-scope function: it imports what it needs and
> runs. The preceding self-contained exception covers only an entrypoint that cannot import
> siblings.

Veneer publishes `./browser/auto` from `src/browser/auto.ts`: a module that imports a class from
its sibling barrel and constructs it on the document, exporting nothing, so importing the subpath
installs the data API. `tests/policy.test.ts` in this checkout sweeps the rule files for the
writing law, and `npm run test:policy` is the gate.

## Scope

**Owned.** `.claude/rules/architecture.md` (that one clause), the report. **Off-limits.**
Everything else.

## Execution

Perform the assignment directly and spawn nothing.

1. Replace the clause's enumeration so it reads: "A runtime entry—`src/bin/main.ts`,
   `app/browser/main.ts`, `app/server/main.ts`, and a published side-effect entry
   `src/<environment>/auto.ts` that installs a document-level behaviour when imported—is a fixed
   name, not a centralized kind file." Keep the two sentences that follow it unchanged. Change no
   other line.
2. Run `npm run test:policy` and `npm run format:check`; record each command's final lines.

## Output

Write `u7-rule-report.md` and return its content: the diff; each command's final lines;
`git status --porcelain` for the file; deviations in the usual shape.

## Deviation contract

Stop and report on: a gate red; a need to edit any other line. Nothing is left to decide.

## Acceptance criteria

1. The clause reads as item 1 states and no other line of the file changed.
2. `test:policy` and `format:check` exit 0.

## Review evidence

The actual `git diff` at return; the report.
