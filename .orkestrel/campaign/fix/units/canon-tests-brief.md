# Unit canon-tests — move the style-primitives sentence in `.claude/rules/tests.md` with the `test` rename

## Role and engine

`builder` on Claude Sonnet, reached as a native subagent. You perform the assignment directly and
spawn nothing.

## Objective

`.claude/rules/tests.md` § Shared test infrastructure names the browser style helpers
`@orkestrel/test` exports after the `test` unit renamed them, and names no symbol that no longer
exists.

## Context

**Evidence.** The sentence at `/home/user/scaffold/.claude/rules/tests.md:245-249`:

```text
Browser/style setup exposes shared assertions/builders:

`mount`, `render`, `build`, `style`, `token`, `rootToken`, `pixels`, `rgba`, `colorEqual`, `findRule`.

`findRule` proves a declaration exists in the cascade; `style()` reads the resolved result.
```

The renames the `test` unit landed (its report at
`/home/user/scaffold/tmp/units/breaking/test-report.md` is authoritative; read it first and use the
names it reports, which are expected to be): `style` → `readStyle`, `token` → `readToken`,
`rootToken` → `readRootToken`, `pixels` → `readPixels`, `rgba` → `parseCSSColor`,
`colorEqual` → `matchesColor`. `mount`, `render`, `build`, and `findRule` did not move. The exported
surface to check against: `/home/user/fleet/test/src/browser/index.ts`.

**Law.** `AGENTS.md` § Writing and § Instruction files; `.claude/rules/writing.md`. Change the
sentence and nothing else.

**Host.** Linux, bash. Repository `/home/user/scaffold` on branch
`claude/orkestrel-npm-audit-deps-14ibta`, `node_modules` installed. `.claude/rules/*` is scaffold's
published host inventory, so this edit moves scaffold's published surface; you do not bump.

**Standing conditions.** `.orkestrel/**` and `tmp/**` are the Orchestrator's record and may be
dirty; they are not yours.

## Unknowns

none.

## Scope

**Owned.** `.claude/rules/tests.md` (the § Shared test infrastructure style-primitives sentence
and the sentence after it only).

**Off-limits.** Every other line of that file and every other file.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, stage, push, install, or discarding
`git` command. Non-mutating checks only.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Replace each renamed symbol
in the list with the name the `test` report gives, rewrite `style()` in the following sentence to
the new name, and run:

```text
npm run format:check && npm run lint:check && npm run test:policy
```

## Output

Return, as data: the changed lines verbatim; each command with its exit code and an excerpt for
any failure; `git diff --stat`; `git status --short`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when the `test` report names a symbol the exported surface does not carry, or when
the policy sweep rejects the edit.

## Acceptance criteria

1. Every backticked name in the sentence resolves to an export of
   `/home/user/fleet/test/src/browser/index.ts`.
2. `rg -n 'rootToken|colorEqual|\brgba\b' .claude/rules/tests.md` returns no hit.
3. `npm run format:check`, `npm run lint:check`, and `npm run test:policy` exit 0.
4. `git status --short` lists `.claude/rules/tests.md` and nothing else of yours.

## Review evidence

The actual diff and the actual status output at return.
