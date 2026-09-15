# Unit U8c — `@orkestrel/tool`: emitter fix round after audit A8

Successor to `U8-tool-emitter-brief.md` and `U8b-tool-emitter-brief.md` (staged beside this file).
Read both first; they stay the brief for the surface and the pattern. This file carries the
findings A8 reconciled and the Orchestrator's rulings on each, and wins over any sentence it
amends.

## Role and engine

`sol` route: GPT-6 Astra, a `workspace-write` `codex exec` rooted at
`C:/Users/mikes/WebstormProjects/tool`. Perform the assignment directly and spawn nothing. You are
the sole writer in this checkout while this unit runs. Your engine wrote U8b; an Opus reviewer
and a checker audit this round.

## What A8 found (three blind lanes) and what the Orchestrator reproduced

Reviewer (Opus): `FAIL 1, 2, 6, 9, 10; outside: F1`. Analyst (Astra): `FAIL 2, 3, 6, 9, 10`.
Checker (Sonnet): `FAIL 9, 10` (1–8 confirmed mechanically). The Orchestrator's probe P8
(`tmp/probe/ToolManager.test.ts` in this checkout, run with
`npm.cmd run test:probe -- tmp/probe/ToolManager.test.ts`) reproduced the analyst's re-entry
vectors: 3 failed, 1 passed. The full lane reports are staged beside this brief as
`A8-audit-reviewer.md`, `A8-audit-analyst.md`, `A8-audit-checker.md`; read them.

## Carriers (close every one; each names its ruling)

1. **Constructor form (reviewer claim 1).** Replace the spread reconstruction in `ToolManager`'s
   constructor with `this.#emitter = new Emitter<ToolManagerEventMap>(options)`. If `npm.cmd run
   check` refuses that form under this checkout's `exactOptionalPropertyTypes`, keep the spread
   and paste the exact diagnostic in the report; the reviewer named `npm run check` as the settling
   command.
2. **Replacement re-entry (reviewer claim 2, analyst claim 2, P8 red).** After a replacement
   emits `remove(previous)`, publish `add(tools)` only when the map still holds that exact
   instance (`this.#tools.get(tools.name) === tools`); a listener that removed the name mid-
   replacement gets no `add`, and the registry and the stream agree. This is one state check that
   makes the published fact true, not a guarded-notify layer; add no other guard. Then state the
   bound the reviewer asked for, on `ToolManagerEventMap`'s TSDoc and in the guide's Patterns
   prose: each event describes the registry at the moment it is published; a listener that
   mutates the registry re-enters synchronously and its own events publish before the outer
   call resumes. Promote P8's `replacement reentry preserves publication consistency` into
   `tests/src/core/tools/ToolManager.test.ts` (it is red today — P8 is the red reading; record
   the green).
3. **Destroy re-population (analyst claim 3a, P8 red).** After `this.#emitter.destroy()`, empty
   the map once more without publishing (the emitter is destroyed; `emit` does nothing), so
   `destroy` returns with an empty registry even when a `clear` listener re-added a tool. Promote
   P8's `destroy finishes with an empty registry` (red today; record the green).
4. **Mid-emit destruction (analyst claim 3b).** No code change: the installed emitter fans out
   synchronously over a snapshot, so a listener that destroys the registry does not stop its
   siblings. State that in `destroy`'s TSDoc `@remarks` and the guide. Promote the P8 probe
   `destroy prevents subsequent listener delivery` inverted, as the pinning test
   `a listener destroying the registry mid-emit does not stop its siblings` (the reading P8 took:
   the sibling ran with `destroyed === true`).
5. **The `destroy` summary (reviewer claim 6).** Replace the description paragraph on
   `ToolManagerInterface.destroy` in `src/core/types.ts` and the mirrored `## Methods` cell in
   `guides/tool.md` with `Removes every tool and releases the emitter's listeners.`; keep the
   `@remarks` that states the after-destroy contract (later additions update the map and publish
   nothing). Parity (`npm.cmd run test:guides`) proves both sides moved together.
6. **F1 (reviewer).** On `ToolManagerEventMap.remove` and in the guide's Patterns prose, state
   that a replacement's `remove` publishes with the replacement already installed, so a listener
   must not read absence from the map to confirm a removal. Pin it: in the replacement test, read
   `manager.tool(name)` inside the `remove` listener and assert it is the replacement; in the
   standalone-remove test, assert it is `undefined`.
7. **Weak tests (reviewer and analyst claim 9).** Strengthen so each named mutation goes red:
   - the add-ordering tests read `manager.tool(tool.name) === tool` inside the `add` listener
     (the analyst's move-emission-before-set mutation);
   - the batch-remove test reads `manager.tool(name)` inside the `remove` listener and asserts
     `undefined` (the emission-before-deletion mutation);
   - the empty-clear test gains a populated sibling assertion that the `clear` payload is the
     instances the registry held, by identity (the snapshot-after-emptying mutation);
   - the hooks test records one shared sequence across `add`, `remove`, and `clear` and asserts
     its order (the swap mutation);
   - the guide fence stays as it is (consumer prose); its executed transcription is unchanged.
8. **Red evidence captured, not summarized (claim 9, both lanes).** Run the red and the green of
   every promoted and strengthened test with `npm.cmd run test:src:core -- -t "<title>"` and
   capture the runner's per-test output to `tmp/codex/U8c-red.log.txt` and
   `tmp/codex/U8c-green.log.txt` in this checkout (append; one heading line per test). The report
   points at those files; an auditor reads the files, not the report.
9. **Probe cleanup.** Delete `tmp/probe/ToolManager.test.ts` after promoting its cases; the
   probe project must find no file.
10. **Recorder ceremony (reviewer, noted, not a defect).** Where `createRecorders(manager.emitter,
    ['add', 'remove', 'clear'])` infers without explicit type arguments, drop the arguments; if it
    does not infer, keep them and say so in one sentence.

## Scope

**Owned.** As U8: `src/core/types.ts`, `src/core/tools/ToolManager.ts`, `src/core/factories.ts`,
`tests/src/core/tools/ToolManager.test.ts`, `tests/src/core/factories.test.ts`,
`tests/guides.test.ts`, `guides/tool.md`; plus `tmp/probe/**` (delete) and `tmp/codex/U8c-*.log.txt`
(write). **Off-limits.** As U8 (`package.json`, `package-lock.json`, the `scaffold repair` set,
`dist/**`, `Tool.ts`, `errors.ts`, `helpers.ts`, `validators.ts`).

**Baseline.** The tree is dirty with U8a and U8b at launch; `git diff` against `8f2ad5d` is your
diff for review. Do not revert U8b; correct it.

## Acceptance criteria

1. `npm.cmd run lint:check`, `npm.cmd run check` exit 0.
2. `npm.cmd run test:src:core` exit 0; the promoted P8 cases and the strengthened tests are
   green, with their red readings captured in `tmp/codex/U8c-red.log.txt`.
3. `npm.cmd run test:guides` exit 0 with the `destroy` summary and the new prose in parity.
4. `npm.cmd run test:setup`, `test:policy`, `test:config`, `format:check` exit 0.
5. `tmp/probe/` holds no test file.
6. Only owned files changed beyond the U8a manifest and lockfile.

**Observation, not criterion.** `npm.cmd run build` — attempt it once and report the reading; the
Orchestrator takes the authoritative build on the host.

## Output

U8's Output shape, plus: one line per carrier naming the closing `file:line`; the paths of the
red and green logs with the titles they contain; the constructor-form reading.
