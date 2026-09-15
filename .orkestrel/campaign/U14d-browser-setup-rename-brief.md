# Unit U14d — `@orkestrel/browser`: rename the fake CDP transport helper before the scaffold re-pin

## Role and engine

`builder` on Sonnet, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/browser` checkout while this unit runs. Every edit is fully
specified; make exactly those edits and no other.

## Objective

`tests/setup.ts:84` exports `createCDPTransport`, a fake in-memory transport returning
`CDPTestTransportInterface`, under the same bare name as the package's own public export
`createCDPTransport` (`src/server/factories.ts`, the `WebSocket`-backed transport the guide
claims at `guides/browser.md:291`). The scaffold release that carries the `surface` policy rule
grandfathers no root `tests/setup*.ts` export (`.claude/rules/names.md` § Fleet name ownership),
so this export must clear before browser re-pins that release. The Orchestrator ruled: the
contracts differ (a fake recorder against a real socket transport), so rule 2 applies — the
package's export keeps the name, and the test helper is renamed for what it is:
`createCDPTestTransport`, after the interface it returns.

## Carriers

1. Rename the export `createCDPTransport` in `tests/setup.ts` (near `:84`) to
   `createCDPTestTransport`, keeping its body, its TSDoc (adjust the summary's own name if it
   repeats it), and its position.
2. Update every test caller: `tests/setup.test.ts` (the import near `:23`, the `describe` title
   near `:48`, and the calls inside), `tests/src/core/BrowserCodegen.test.ts`,
   `tests/src/core/BrowserFrame.test.ts`, `tests/src/core/BrowserPage.test.ts`,
   `tests/src/core/BrowserWorker.test.ts`, `tests/src/core/CDPClient.test.ts`,
   `tests/src/core/factories.test.ts`, `tests/src/server/factories.test.ts` — the import and each
   call. Where a test file ALSO imports the real `createCDPTransport` from the package (likely
   `tests/src/server/factories.test.ts`), keep that import and rename only the helper's.
3. Nothing else changes. `src/**` and `guides/**` keep `createCDPTransport` (the real export).
   The name `createCDPTestTransport` appears in no hosted guide (checked against every
   `guides/*.md` in the scaffold checkout on 2026-09-15).

## Context, law, host, and bench

`AGENTS.md`, `.claude/rules/names.md` § Fleet name ownership, `.claude/rules/tests.md`, and
`.claude/rules/writing.md` in the scaffold checkout govern. The browser checkout is at `1acadb4`,
clean. Windows host: Git Bash for the Bash tool; no heredocs, no `node -e`. Run only scoped
Vitest projects and the non-mutating checks; never tree-wide `format` or `lint --fix`. Do not
commit, stash, checkout, restore, reset, or clean. Do not run `npm install`.

## Scope

**Owned.** `tests/setup.ts` (the one export) and the eight test files carrier 2 names (imports
and calls only). **Off-limits.** Everything else, including `package.json`,
`package-lock.json`, `src/**`, `guides/**`, and the `scaffold repair` set (`tests/setupPolicy.ts`,
`tests/policy.test.ts`).

## Deviation contract

Stop and report (expected, found, evidence, done or not) if the helper has a caller outside the
owned files, if a real-export import would be renamed by a plain search-and-replace (report the
site and rename by hand instead), or if a scoped run is red. Decide and record nothing else.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0.
2. `npm run test:setup`, `npm run test:src:core`, and `npm run test:src:server` exit 0.
3. A search over `tests/**` for `createCDPTransport` finds only imports from the package's own
   modules (`@src/server` or `../../src/...`) and their calls in `tests/src/server/factories.test.ts`
   (or nothing, if no test drives the real transport); a search over `src/**` and `guides/**`
   finds the real export unchanged; a search for `createCDPTestTransport` finds the helper and
   every renamed caller.
4. `git status --short` names only the owned files.

## Output

Touched files with line pointers; the helper's before and after; the acceptance readings
(command, exit, reading); the search results for criterion 3; deviation state.
