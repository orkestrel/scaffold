# Unit vocabulary-4 — exact-text fix for the `build*`/`create*`/`*Of` lines (supersedes `vocabulary-3-brief.md`)

## Role and engine

`builder` on Claude Sonnet, a native subagent. You perform the assignment directly and spawn
nothing.

## Objective

Lines 96, 171, and 172 of `/home/user/scaffold/.claude/rules/names.md` carry exactly the text
below, so that each form's contract has one home, no cross-reference restates another line's
discriminator, and placement stays with `.claude/rules/architecture.md` § Kind purity (which
states that placement follows what a function is and the name form follows placement).

## Context

**The three lines as they stand** (the round-3 objective lane broke them for naming files in a
naming rule, for restating the `create*` and `*Of` glosses on line 96, and for a caller clause
that decides nothing):

```text
  - `build*` is the assembly step inside the package's own computation that composes parts the package computed, sits in `helpers.ts`, and reads no host; a factory a consumer calls is `create*` and a combinator named for its constituents is `*Of`, both in § Fixed derivation/construction forms.
- `create*`: factory in `factories.ts` that a consumer calls to obtain an entity or a value it then holds; a package-internal assembly step is `build*` in § Standalone helpers.
- `*Of`: combinator named for its constituents, combining them into a container/guard/value, such as `arrayOf(guard)` or `boundsOf(min, max)`.
```

**The ruled replacement text**, verbatim (keep each line's indentation and bullet exactly as the
file has it):

```text
  - `build*` assembles a composite value from parts and is not a factory; see `create*` and `*Of` in § Fixed derivation/construction forms.
- `create*`: factory constructing an entity; `.claude/rules/architecture.md` § Kind purity decides what a factory is and where it lives.
- `*Of`: combinator combining constituent parts into a container/guard/value, such as `arrayOf(guard)` or `boundsOf(min, max)`.
```

**Law.** `AGENTS.md` § Instruction files (one home per rule); `.claude/rules/writing.md`.

**Host.** `/home/user/scaffold`, branch `claude/orkestrel-npm-audit-deps-14ibta`, committed clean
at launch. `.orkestrel/**` and `tmp/**` are the Orchestrator's record and may be dirty.

## Scope

**Owned.** `.claude/rules/names.md`, lines 96, 171, and 172 only.

**Off-limits.** Every other line and every other file.

**Tools and limits.** Read, Grep, Edit, Bash. No commit, stage, push, install, or discarding
`git` command.

## Execution

Replace the three lines with the ruled text, then run:

```text
npm run format:check && npm run lint:check && npm run test:policy
```

## Output

Return, as data: the three lines after the edit, verbatim; each command with its exit code;
`git diff --stat`; `git status --short`.

## Deviation contract

Stop and report when a line does not match the "as they stand" text above, or when the policy
sweep rejects the edit.

## Acceptance criteria

1. `sed -n '96p;171p;172p' .claude/rules/names.md` prints the ruled text exactly.
2. `npm run format:check`, `npm run lint:check`, `npm run test:policy` exit 0.
3. `git status --short` lists `.claude/rules/names.md` only.
