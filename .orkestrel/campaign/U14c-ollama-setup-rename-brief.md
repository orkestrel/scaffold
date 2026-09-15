# Unit U14c — `@orkestrel/ollama`: clear the `isAbortError` setup export before the scaffold re-pin

## Role and engine

`builder` on Sonnet, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/ollama` checkout while this unit runs. Every edit is fully
specified; make exactly those edits and no other.

## Objective

`tests/setupServer.ts:317` exports `isAbortError`, a bare name `@orkestrel/terminal`'s guide
already claims (`Checks whether a caught value is an AbortError`). The scaffold release that
carries the `surface` policy rule grandfathers no root `tests/setup*.ts` export
(`.claude/rules/names.md` § Fleet name ownership), so this export must clear before ollama re-pins
that release. The Orchestrator ruled: rule 1 (reuse) is refused because ollama declares no
`@orkestrel/terminal` dependency and no new dependency is authorized; rule 2 applies — the terminal
package keeps the name, and this helper is renamed for its own contract, which its remark states:
"Narrows a fetch rejection to an abort error".

## Carriers

1. Rename the export `isAbortError` in `tests/setupServer.ts` to `isFetchAbort`, keeping its body,
   its remark, and its position. Update its one caller in the same file (near `:408`).
2. Update `tests/setup.test.ts`: the import (near `:45`), the `describe('isAbortError', …)` title
   (near `:130`) to `describe('isFetchAbort', …)`, and every call and message inside that block
   (near `:133-159`, including the `unreachable: isAbortError narrowed true earlier` message).
3. Nothing else changes. The name `isFetchAbort` appears in no hosted guide (checked against every
   `guides/*.md` in the scaffold checkout on 2026-09-15).

## Context, law, host, and bench

`AGENTS.md`, `.claude/rules/names.md` § Fleet name ownership, `.claude/rules/tests.md`, and
`.claude/rules/writing.md` in the scaffold checkout govern. The ollama checkout is at `058e86a`,
clean, with `@orkestrel/tool` 0.0.14 and `@orkestrel/agent` 0.0.22 tarballs installed
`--no-save` (do not run `npm install`). Windows host: Git Bash for the Bash tool; no heredocs,
no `node -e`. Run only scoped Vitest projects and the non-mutating checks; never tree-wide
`format` or `lint --fix`. Do not commit, stash, checkout, restore, reset, or clean.

## Scope

**Owned.** `tests/setupServer.ts` (the one export and its one caller), `tests/setup.test.ts`
(the import, the describe title, the calls and messages inside that block). **Off-limits.**
Everything else, including `package.json`, `package-lock.json`, `src/**`, `guides/**`, and the
`scaffold repair` set (`tests/setupPolicy.ts`, `tests/policy.test.ts`).

## Deviation contract

Stop and report (expected, found, evidence, done or not) if `isAbortError` has a caller outside
the two owned files, or if a scoped run is red. Decide and record nothing else; the edits are
fixed.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0.
2. `npm run test:setup` exits 0.
3. A search over `src/**`, `tests/**`, and `guides/**` for `isAbortError` finds nothing; a search
   for `isFetchAbort` finds the export, its caller, the import, the describe title, and the calls
   inside that block.
4. `git status --short` names exactly the two owned files.

## Output

Touched files with line pointers; each carrier's before and after; the acceptance readings
(command, exit, reading); the search results for criterion 3; deviation state.
