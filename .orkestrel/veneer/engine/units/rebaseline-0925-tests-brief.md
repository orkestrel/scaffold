# Grok lane RECON-TESTS — the engine tests against the test rules (read-only)

You are the Cursor Grok lane in ask mode, holding a mechanical conformance job. Read only; edit nothing; make no decision or recommendation. Return evidence with `file:line` pointers and no raw file dumps.

**Workspace.** The working directory is `C:/Users/mikes/WebstormProjects`. The subject is `veneer/tests/src/browser/**`, `veneer/tests/src/core/**`, `veneer/tests/setupBrowser.ts`, and `veneer/tests/setupBrowser.test.ts`. It is Veneer `origin/main` `0865c67` checked out in `veneer/`. Never read `veneer/tmp/**`.

**Law.** Read `scaffold/.claude/rules/tests.md` whole first, and `scaffold/AGENTS.md` § Non-negotiable rules.

**Find and list, with `file:line`, every occurrence of the following.**
1. A mock, behavioural fake, module replacement, framework spy, or fake clock: `vi.fn`, `vi.mock`, `vi.spyOn`, `vi.useFakeTimers`, `vi.stubGlobal`, and any hand-written replacement of a project-owned function or prototype method. Distinguish a recorder that calls through to the original, such as `recordCalls` in `tests/setupBrowser.ts`, and say which each hit is.
2. A data table or case matrix, meaning an array or object literal of rows that cases iterate, declared in a test file rather than a `tests/setup*.ts` module.
3. A fixture factory, DOM builder, recorder, wait, or helper declared in a test file that could serve another test, with its name.
4. A timer wait (`setTimeout`, a sleep, a fixed delay) used to wait for engine behaviour, rather than an event, a frame, or an animation promise.
5. `describe`, `it`, or `expect` in a `tests/setup*.ts` file.
6. A test title that names its control identifier, such as "A1", "C2", "D1", or "R1", rather than what it proves.

**Return exactly:**
- `Question`
- `Evidence`: per item 1 to 6, the occurrences with `file:line`, or "none found" with the search you used
- `Distillate`
- `Unknowns`: including any item you could not search exhaustively, and why
- `Journal`
- `Deviation`
