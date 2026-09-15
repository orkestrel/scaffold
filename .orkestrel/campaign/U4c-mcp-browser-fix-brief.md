# Unit U4c — `@orkestrel/mcp`: reuse the installed `@orkestrel/test` and `@orkestrel/contract` exports across the campaign's mcp work, then finish the browser face

Successor to `tmp/units/U4-mcp-browser-brief.md` and `U4b-mcp-browser-brief.md`. Read both in
full first; they stay the brief for the surface, the tests, and the guide. This file carries what
changed and wins over any sentence it amends.

## Role and engine

`implementer` on Opus 5, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/mcp` checkout while this unit runs.

## Why a successor

The Orchestrator stopped U4 on 2026-09-15 on the user's report that it re-declared
`waitForCondition` in `tests/setupBrowser.ts` although `@orkestrel/test` 0.0.14 (a declared
devDependency, installed at `node_modules/@orkestrel/test`) exports it and the same file already
imports `waitForDelay` from that package. The user's instruction, verbatim and authoritative:

> for some reason the agent keeps adding `waitForCondition` back to `tests/setupBrowser.ts` when
> it already exists in the orkestrel test package. Make sure that you and your agents are fully
> aware of the test and contract packages that orkestrel have and clean up the work that is done
> with them.

U4 stopped while writing the `document.modelContext` row of `## Declared conformance gaps`;
every other file it owned is in the tree as it left it (its diff, with the added files' full
text: `C:/Users/mikes/WebstormProjects/scaffold/tmp/cursor/G6/mcp-browser.diff`). A read-only
sweep (G6) then read every campaign diff against both packages' surfaces; its rows for this
checkout are carried under Amendments and are the primary objective of this unit.

## Installed primitives (read before editing anything)

- `@orkestrel/test` 0.0.14: `C:/Users/mikes/WebstormProjects/scaffold/guides/test.md` § Surface
  (`### Core`, `### Browser`, `### Server`) and § Patterns; the declaration at
  `node_modules/@orkestrel/test/dist/src/core/index.d.ts` (and `browser/`, `server/`). The wait
  family: `waitForCondition(description, condition, options?: WaitOptions)` (default budget 1000
  ms, interval 10 ms; `WaitOptions { budget?, interval?, signal? }`), `waitForEvent(subscribe,
  description, options?)` → the delivered argument tuple, `waitForAbort(signal)` → `void`
  (already-aborted resolves at once; parks on a one-shot listener), `waitForDelay(ms?)`,
  `retryUntil(description, produce, satisfied, options?)`; `createRecorder()`, `createRecorders()`;
  `createSignal()` → `{ controller, signal, count }`; `createTeardown()`; `collect`,
  `collectStream`; `requireValue(value, message?)`, `readProperty`, `captureError`;
  `createHostileValues()`.
- `@orkestrel/contract` 0.0.17: `C:/Users/mikes/WebstormProjects/scaffold/guides/contract.md`
  § Surface — the guards (`isRecord`, `isObject`, `isString`, `isBoolean`, `isFunction`,
  `isUndefined`, …), the combinators (`objectOf(shape, open?)` keeps extra keys when open, reads
  inherited members through `Reflect.get`, returns `false` on a hostile read; `recordOf`;
  `arrayOf`; `unionOf`; `optionalOf`), the parsers, `attempt`, and the shape builders; the
  declaration at `node_modules/@orkestrel/contract/dist/src/core/index.d.ts`.
- The rule: scaffold `.claude/rules/tests.md` § "Shared test infrastructure" and § Condition;
  `.claude/rules/patterns.md` lines 10–25 and 118–130.

A helper, guard, wait, recorder, or deferred declared in this checkout whose job one of those
exports does is a defect, whichever file declares it first. Where you keep a helper, the report
names the export you considered and what it lacks.

## Amendments (each G6 row is a carrier; close every one)

1. **Row 1 — the duplicate.** Delete `waitForCondition` from `tests/setupBrowser.ts:188` and its
   TSDoc; import it from `@orkestrel/test` wherever a test needs it. The export takes
   `options.budget`, not a positional budget; update every call site.
2. **Rows 2 and 3 — parked handlers.** `createParkedTool` (`tests/setupBrowser.ts:231`) and
   `createParkedRegistration` (`:276`) resolve a `Promise.withResolvers<boolean>` from an `abort`
   listener. Replace the abort arm with `waitForAbort(signal)`: the handler `await`s
   `waitForAbort(context.signal)` (or `options.signal`) after resolving `entered`, and `aborted`
   becomes the `Promise<void>` that `waitForAbort` returns (or the handler's own promise).
   Rewrite the assertions at `tests/src/browser/factories.test.ts:1147`, `:1181`, `:1191`,
   `:1197` and `tests/src/browser/ModelContext.test.ts:175`, `:183`, `:186`, `:225`, `:230`,
   `:234` against `void` (`await parked.aborted` resolving is the proof; a still-parked handler
   is proven with a `waitForDelay` race or `waitForCondition` on an `entered`/`aborted` flag,
   whichever the test needs). Keep the `entered` latch: no export provides it (G6 Clean).
3. **Row 4 — `createAbortTools` (core, granted).** `tests/setup.ts:1004-1016` observes the
   handler abort with an `abort` listener plus `Promise.withResolvers<void>` raced against a
   release latch. Replace the abort arm with `waitForAbort(context.signal)`; keep the `release`
   latch (no export). Call sites `tests/src/core/MCPClient.test.ts:2907`, `:2935`,
   `tests/src/core/MCPServer.test.ts:2817`, `:2839` change only if the fixture's interface
   changes; prefer keeping `AbortToolsInterface` as declared.
4. **Row 7 — the change counter.** `tests/src/browser/ModelContext.test.ts:249-258` and
   `tests/src/browser/factories.test.ts:1232-1241` count `change` emissions and poll the counter.
   Replace with `waitForEvent((listener) => bridge.emitter.on('change', listener), 'the change
   event', { budget })` (the `on` hook returns its cleanup where the emitter offers one; pass
   the listener through `options.on.change` where the test's claim is about initial hooks, per
   G6's Unknowns). Where a test must prove a SECOND emission or the absence of one after
   `destroy`, use `createRecorder()` on the listener and assert `count`.
5. **Rows 8, 9, 10 — guards through `objectOf`.**
   - `src/core/validators.ts:699-709` `isMCPToolAnnotations` (core, granted): build it with
     `objectOf({ readOnlyHint: optionalOf(isBoolean), destructiveHint: optionalOf(isBoolean) },
     true)` or the equivalent combinator the guide § Surface names for optional members; the wire
     value is parsed JSON, so `objectOf`'s acceptance of class instances changes nothing on this
     path. Keep the existing tests at `tests/src/core/validators.test.ts:2560-2575` green
     (extra keys kept, malformed unconsumed hint ignored, non-boolean consumed hint refused).
     The sibling guards in that file that predate the campaign are outside this unit: report
     them as a finding for the mcp owner, do not edit them.
   - `src/browser/validators.ts:28-37` `isWebMCPRegistry`: `objectOf({ registerTool: isFunction,
     getTools: isFunction, executeTool: isFunction, addEventListener: isFunction,
     removeEventListener: isFunction })` (open; inherited members read through `Reflect.get`).
   - `src/browser/validators.ts:56-62` the document guard: `objectOf({ modelContext:
     isWebMCPRegistry })`.
   Drop the `try/catch` wrappers the combinator makes redundant. Keep the tests at
   `tests/src/browser/validators.test.ts` and add the hostile-read case through
   `createHostileValues()` from `@orkestrel/test` if it is not already there.
6. **Row 11 — `requireValue`.** Replace each `if (value === undefined) throw new Error(…)` after a
   lookup (`tests/src/browser/factories.test.ts:1187`, `tests/src/browser/ModelContext.test.ts:28`,
   `tests/src/browser/helpers.test.ts:62`, `tests/src/core/MCPClient.test.ts:2927`) with
   `requireValue(value, message)` from `@orkestrel/test`.
7. **Row 12 — placement.** Move `createBridge`, `createDescribedTools`, and `readOne` from
   `tests/src/browser/ModelContext.test.ts:21-33` and `:333` into `tests/setupBrowser.ts` (or
   `tests/fixtures/modelContext.ts` where the helper is the double's) as exported, documented
   helpers; a test file declares no fixture factory (`tests.md` § Shared test infrastructure).
   Where `readOne` exists only to assert `length === 1` and return the element, build it on
   `requireValue`.
8. **Everything else U4 declared.** For `recordRequests`, `recordPort`, `createScopeCarrier`,
   `drainRecorded`, `installModelContext`, and the WebMCP helpers in `src/browser/helpers.ts`,
   G6 found no export; keep them, and put the per-helper ruling (export considered, what it
   lacks) in the report's table.
9. **Finish U4.** Write the `document.modelContext` row under `## Declared conformance gaps` as U4
   specifies; complete guide parity (`## Surface`, `## Methods`, the transcriptions in
   `tests/guides.test.ts`); then re-run every U4 acceptance criterion and report the readings.

## Scope

**Owned.** U4's Owned list, plus (granted for rows 3 and 5): `src/core/validators.ts`,
`tests/setup.ts`, `tests/src/core/validators.test.ts`, `tests/src/core/MCPClient.test.ts`,
`tests/src/core/MCPServer.test.ts`. **Shared (report-only).** The rest of `src/core/**`.
**Off-limits.** As U4 (the `scaffold repair` set, `package.json`, `package-lock.json`,
`src/server/**`, other guide mirrors, `dist/**`).

**Baseline.** Dirty with U4's work at launch, on checkpoint `b9ff0b9`; `git diff HEAD` plus the
untracked files is your diff for review. Do not revert U4's work; correct it.

## Acceptance criteria (in addition to U4's, which all stand)

1. No `export (async )?(function|const|class) NAME` in `src/**` or `tests/**` where NAME is an
   export of the installed `@orkestrel/test` (any entry) or `@orkestrel/contract`; run the
   equivalent `grep` over every helper you declare (the Orchestrator re-runs its probe after you
   exit).
2. `grep -rn "Promise.withResolvers\|addEventListener('abort'" tests src/browser` returns no test
   or setup line that observes an abort or an event to resolve a deferred; every such wait goes
   through `waitForAbort`, `waitForEvent`, or `waitForCondition`.
3. `grep -rn "performance.now()" tests` returns no deadline read in a test or setup module.
4. `src/browser/validators.ts` and `isMCPToolAnnotations` are built from `@orkestrel/contract`
   combinators; their tests stay green and include the hostile-read case.
5. The report carries the per-helper ruling table and lists each G6 row as closed with the
   `file:line` of the closing edit.

## Output

U4's Output shape, plus the per-helper ruling table, the G6 rows closed with `file:line`, and the
finding for the mcp owner about the pre-campaign sibling guards.
