<!-- A8-O — analyst (GPT-6 Astra, codex exec read-only -C tool), objective lane of audit A8; journal tmp/codex/A8-audit.jsonl. Retained verbatim from --output-last-message, 2026-09-15. Immutable. -->

OBJECTIVE lane — analyst, GPT-6 Astra; source review with supplied Orchestrator execution evidence.

1. **CONFIRMED — Pattern conformance.** The attack for inheritance, delegation, missing options, or premature emitter destruction failed. [types.ts:177](C:/Users/mikes/WebstormProjects/tool/src/core/types.ts:177) declares the event-map alias, options, and interface member. [ToolManager.ts:47](C:/Users/mikes/WebstormProjects/tool/src/core/tools/ToolManager.ts:47) owns the readonly emitter, forwards hooks and error handling, exposes its getter, emits directly, and destroys it last. Conditional omission of absent options preserves the installed optional-property contract.

2. **UNRESOLVED — Publication ordering under listener re-entry.** [ToolManager.ts:71](C:/Users/mikes/WebstormProjects/tool/src/core/tools/ToolManager.ts:71) installs the replacement, emits `remove(previous)`, then unconditionally emits `add(replacement)`.

   **Vector:** Register `previous` under `echo`. Attach event recorders, then `once('remove', () => manager.remove('echo'))`. Call `manager.add(replacement)` with the same name. Record the registry lookup inside the subsequent `add` listener.

   **Expected reading, unexecuted:** `remove(previous)`, `remove(replacement)`, `add(replacement)`; the `add` listener reads `undefined`, and the final registry is empty. A subscriber replaying these events retains a tool absent from the registry.

   Have the Orchestrator materialize this vector as `tmp/probe/ToolManager.test.ts`, titled `replacement reentry preserves publication consistency`. Exact command:

   `npm.cmd run test:probe -- tmp/probe/ToolManager.test.ts -t "replacement reentry preserves publication consistency"`

   Expected assertion failure: the added instance differs from the contemporaneous registry lookup. Include the same replacement without the reentrant listener as the passing comparison. Preserve registration position when resolving this seam; deleting and reinserting every replacement changes the existing ordering contract.

3. **UNRESOLVED — Destruction under listener re-entry.** Ordinary repeated destruction and later silent additions have tests. The following interleavings lack supplied execution evidence.

   - **Repopulation during teardown:** Register a tool, attach `once('clear', () => manager.add(tool))`, then call `destroy()`. [ToolManager.ts:122](C:/Users/mikes/WebstormProjects/tool/src/core/tools/ToolManager.ts:122) clears before invoking listeners and never empties the map afterward. Expected reading: `emitter.destroyed === true`, but `count === 1`. Proposed probe title: `destroy finishes with an empty registry`. Exact command: `npm.cmd run test:probe -- tmp/probe/ToolManager.test.ts -t "destroy finishes with an empty registry"`. Expect the final empty-registry assertion to fail; without the reentrant listener, expect it to pass.
   - **Listener reached after teardown returns:** Register an `add` listener that calls `manager.destroy()`, followed by a listener recording `manager.emitter.destroyed`. Add a tool. The installed emitter snapshots listeners and checks destruction only before its loop at [index.js:107](C:/Users/mikes/WebstormProjects/tool/node_modules/@orkestrel/emitter/dist/src/core/index.js:107). Expected reading: the sibling runs with `destroyed === true`. Proposed probe title: `destroy prevents subsequent listener delivery`. Exact command: `npm.cmd run test:probe -- tmp/probe/ToolManager.test.ts -t "destroy prevents subsequent listener delivery"`. Expect the no-subsequent-delivery assertion to fail.

   The latter vector needs a ruling against the emitter’s documented synchronous fan-out contract. Silence for a fresh `emit` after destruction does not establish cancellation of an emission already underway.

4. **CONFIRMED — Initial hooks and listener isolation.** The attack for dropped constructor options or a skipped sibling failed. [factories.test.ts:8](C:/Users/mikes/WebstormProjects/tool/tests/src/core/factories.test.ts:8) checks initial hooks; its listener-error test checks sibling delivery, error identity, event name, and committed registry state. The installed emitter catches each listener separately. The [Orchestrator gate log](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/U8b-tool-gates-orchestrator.log.txt:22) records the `npm run test` chain exiting zero; that chain includes the core suite. Its retained excerpt does not provide an individual core-test tally.

5. **CONFIRMED — Execution remains unchanged.** The checkpoint diff attack found no changes in `Tool.ts`, `errors.ts`, `helpers.ts`, or `validators.ts`; the manager’s `execute` and `#run` bodies also remain unchanged. [ToolManager.test.ts:332](C:/Users/mikes/WebstormProjects/tool/tests/src/core/tools/ToolManager.test.ts:332) checks silent single and batch execution. A handler explicitly calling a registry mutation legitimately produces that mutation’s event; execution itself adds none.

6. **UNRESOLVED — Guide truth; mechanical parity holds.** The attack for missing declarations, missing `destroy`, or an unequal observation fence failed. [guides.test.ts:289](C:/Users/mikes/WebstormProjects/tool/tests/guides.test.ts:289) contains the fence transcription, and [guides.test.ts:473](C:/Users/mikes/WebstormProjects/tool/tests/guides.test.ts:473) executes its operations and assertions. The Orchestrator log records `31 passed` for guides.

   The unconditional publication and destruction prose at [tool.md:431](C:/Users/mikes/WebstormProjects/tool/guides/tool.md:431) remains subject to the unexecuted vectors in claims 2 and 3. Their exact commands and expected readings also settle this claim. Fence parity does not settle those interleavings.

7. **CONFIRMED — Installed primitives are reused.** The attack for a local recorder, deferred, poll, or guard failed over the changed files. Recording imports the installed `createRecorder<TArgs>(): RecorderInterface<TArgs>` and `createRecorders<TMap, TName>(source, events): RecorderMap<TMap, TName>`. Existing narrowing imports contract primitives directly. Installed versions are test `0.0.14` and contract `0.0.17`; the supplied [export-name probe](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/P5c-collide-after-u8b.log.txt:1) reports no tool collision.

8. **CONFIRMED — Scope remains bounded.** The scope-escape attack failed against the supplied patch/status and the checkpoint diff. Changes are confined to owned source, tests, and guide files, plus U8a’s manifest and lockfile changes. The manifest retains version `0.0.14`; README is unchanged. No vendored-file edit appears.

9. **UNRESOLVED — Historical red evidence and mutation adequacy.** Source inspection found no introduced forbidden assertions, suppressions, nested function declarations, or mocks. The Orchestrator records successful lint and typecheck exits. Historical red readings remain writer-report-only; the report does not provide a red reading for the added observation-fence test. Original execution records must establish that history; a green rerun cannot.

   These weakest isolated proofs admit the following mutations. Each prediction is **UNRESOLVED**, not an executed mutation result:

   - `emits add for each batch tool in array order and nothing for an empty batch`: move the absent-name `add` emission before `Map.set`. The test observes final state, not state during delivery. Command: `npm.cmd run test:src:core -- -t "emits add for each batch tool in array order"`. Expected: green.
   - `emits batch removals in requested order and reports missing or repeated names`: move `remove` emission before deletion. Command: `npm.cmd run test:src:core -- -t "emits batch removals in requested order"`. Expected: green.
   - `emits one empty clear event for every clear of an empty registry`: always emit an empty clear payload. Command: `npm.cmd run test:src:core -- -t "emits one empty clear event for every clear"`. Expected: green.

   Neighboring tests target these defects; these predictions concern the named tests individually. Apply each mutation independently and restore it before the next measurement.

10. **UNRESOLVED — Shipping recommendation.** Do not accept U8b for downstream consumption yet. Resolve the publication and teardown vectors and obtain the missing historical evidence. The supplied gate log contains no build reading. The remaining artifact command is `npm.cmd run build`, expected to exit zero and emit the updated ESM, CommonJS, and declaration surfaces before downstream packing and installation. Leaving the version unchanged during this unit is correct.

## Findings fitting no claim

None.

## Attacked and held

- Replacement retains its registration position because it overwrites the existing map entry. Seeing the replacement during `remove(previous)` is consistent with that design.
- Empty batch removal returns `true` under the existing all-names-succeeded contract.
- A later addition updating the map after destruction is explicitly documented and tested. That behavior alone is not a defect.

VERDICT: FAIL 2, 3, 6, 9, 10; outside the claims: none