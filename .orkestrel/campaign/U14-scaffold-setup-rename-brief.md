# Unit U14-scaffold — `@orkestrel/scaffold`: the setup helper the `surface` rule fires on

## Role and engine

`builder` on Sonnet, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/scaffold` checkout while this unit runs.

## Objective

`tests/setupServer.ts:1083` exports `readErrorCode(call: () => unknown): ScaffoldErrorCode | undefined`
— it runs a thunk and returns the `code` of a thrown `ScaffoldError`. The installed
`@orkestrel/test/server` exports `readErrorCode(error: unknown): string | undefined` — it reads a
Node error's `code` from an error VALUE. Different jobs, one name: the vendored `surface` policy
rule (D4-3) now fails this checkout's `npm run test:policy` on it (`surface name belongs to one
package: readErrorCode (test)`), and the fleet rule (`.claude/rules/tests.md` § Condition, last
paragraph; `plan.md` § Re-baseline 3 R2) says the other names what its thing is.

Rename it to `captureScaffoldCode` and build it on the installed `captureError` from
`@orkestrel/test` (`captureError(thunk)` returns the thrown value or `undefined`), so the helper
becomes one narrowing over an installed capture: `const error = captureError(call); return
isScaffoldError(error) ? error.code : undefined`. Update every caller (`tests/setupServer.test.ts:68,
412, 424, 433`; `tests/src/server/helpers.test.ts:92` and its uses). Keep the TSDoc's voice.

## Context

The checkout is dirty with the Orchestrator's rule edits and units D4-1b, D4-2b, D4-3 (all
accepted so far; leave every other file as it is); `.orkestrel/` is untracked campaign state;
`guides/supervisor.md` is an untracked mirror. `npm run test:policy` is red at launch on exactly
this one violation (D4-3's reading: 101 passed, 1 failed). The installed primitives:
`node_modules/@orkestrel/test/dist/src/core/index.d.ts` (`captureError`), `.../server/index.d.ts`
(`readErrorCode`). Confirm the new name collides with nothing:
`grep -n "captureScaffoldCode" node_modules/@orkestrel/*/dist/src/*/index.d.ts` must be empty.

## Scope

**Owned.** `tests/setupServer.ts` (that one function and its TSDoc), `tests/setupServer.test.ts`,
`tests/src/server/helpers.test.ts` (callers only). **Off-limits.** Everything else.

## Output

Final message: the old and new declarations verbatim with `file:line`; every caller edited with
`file:line`; `git diff --stat` for the three files; the readings of `npm run test:policy`
(expected green), `npm run test:setup -- tests/setupServer.test.ts`, `npm run test:src:server --
--testNamePattern 'captureScaffoldCode|readErrorCode'` (adjust the pattern to the tests that
call it), `npm run lint:check`, `npm run format:check`; deviation state.

## Acceptance criteria

1. `npm run test:policy` exit 0 (the `surface` violation gone; no other change).
2. The setup and server tests that call the helper pass; `lint:check` and `format:check` exit 0.
3. No `readErrorCode` declaration remains in `tests/**`; the new name matches no installed export.
4. Only the three owned files changed.
