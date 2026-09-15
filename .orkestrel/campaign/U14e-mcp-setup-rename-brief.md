# Unit U14e — `@orkestrel/mcp`: rename the conformance input schema before the scaffold re-pin

## Role and engine

`builder` on Sonnet, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/mcp` checkout while this unit runs. Every edit is fully
specified; make exactly those edits and no other.

## Objective

`tests/setupConformance.ts:788` exports `CONFORMANCE_SCHEMA`, a bare name `@orkestrel/database`'s
guide already claims (`Holds the fixed users and posts schema every driver-conformance phase
opens`, a `readonly TableSchema[]`). The scaffold release that carries the `surface` policy rule
grandfathers no root `tests/setup*.ts` export (`.claude/rules/names.md` § Fleet name ownership),
so this export must clear before mcp re-pins that release. The Orchestrator ruled: the contracts
differ (a JSON Schema document that becomes a tool's advertised `inputSchema` against a table
schema list), so rule 2 applies — the database package keeps the name, and this constant is
renamed for what it is: `CONFORMANCE_INPUT_SCHEMA`.

## Carriers

1. Rename the export `CONFORMANCE_SCHEMA` in `tests/setupConformance.ts` (near `:788`) to
   `CONFORMANCE_INPUT_SCHEMA`, keeping its TSDoc, its value, and its position; adjust the TSDoc's
   own name if it repeats it. Update its one use in the same file (near `:936`,
   `parameters: CONFORMANCE_SCHEMA`).
2. Nothing else changes. No other file under `src/**`, `tests/**`, or `guides/**` references the
   name (checked on 2026-09-15); the name `CONFORMANCE_INPUT_SCHEMA` appears in no hosted guide.

## Context, law, host, and bench

`AGENTS.md`, `.claude/rules/names.md` § Fleet name ownership, `.claude/rules/tests.md`, and
`.claude/rules/writing.md` in the scaffold checkout govern. The mcp checkout's state at launch is
named in the dispatch message (the commit and a clean tree). Windows host: Git Bash for the Bash
tool; no heredocs, no `node -e`. Run only scoped Vitest projects and the non-mutating checks;
never tree-wide `format` or `lint --fix`. Do not commit, stash, checkout, restore, reset, clean,
or run `npm install`.

## Scope

**Owned.** `tests/setupConformance.ts` (the one export and its one use). **Off-limits.**
Everything else, including `package.json`, `package-lock.json`, `src/**`, `guides/**`, and the
`scaffold repair` set (`tests/setupPolicy.ts`, `tests/policy.test.ts`).

## Deviation contract

Stop and report (expected, found, evidence, done or not) if the name has a reference outside the
owned file, or if a scoped run is red. Decide and record nothing else; the edit is fixed.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0.
2. `npm run test:conformance` exits 0.
3. A search over `src/**`, `tests/**`, and `guides/**` for `CONFORMANCE_SCHEMA` (as a whole word)
   finds nothing; a search for `CONFORMANCE_INPUT_SCHEMA` finds the export and its one use.
4. `git status --short` names exactly `tests/setupConformance.ts`.

## Output

Touched file with line pointers; the before and after; the acceptance readings (command, exit,
reading); the search results for criterion 3; deviation state.
