OBJECTIVE lane — analyst; this engine wrote U1b. This is a source review, with behavioral probes unresolved.

1. **UNRESOLVED — Context delivery.** `Tool.ts:72` forwards the supplied context; `ToolManager.ts:71–74` creates one default context and shares it across the batch. Runtime confirmation failed: `npm.cmd run test:src:core` exited **1** before collection because Vite’s config write under `node_modules/.vite-temp` was denied with `EPERM`.

   Settling command: `npm.cmd run test:src:core -- -t 'context|non-aborted signal'`. Expected: direct and supplied contexts retain identity, omitted contexts contain live non-aborted signals, and batch siblings receive the same object.

2. **UNRESOLVED — Cancellation at handler entry.** The source exposes entry points that need probes:

   - **Direct execution:** abort a controller, then call a contract-free `Tool.execute({}, context)` with a recording handler. `src/core/tools/Tool.ts:59–72` contains no abort check. Expected from the source: the handler runs.
   - **Abort during argument access:** pass the manager `{ id: 'late', name: 'capture', get arguments() { controller.abort('argument read'); return {} } }`. The check at `ToolManager.ts:105` precedes argument access at `:114`. Expected from the source: the handler receives an aborted signal.
   - **Abort during validation:** use `objectShape({ amount: numberShape() })` and an argument getter that aborts the controller and consistently returns `3`. The manager checks before `explain`; `Tool.ts:72` enters the handler without checking afterward.

   Have the Orchestrator create these cases in `tmp/probe/A1-objective.test.ts`; that file was **not created here**. Settling command: `npm.cmd run test:probe -- tmp/probe/A1-objective.test.ts -t 'C2 cancellation'`. Include live-signal controls and the existing synchronous batch-abort case. Required reading: aborted calls never enter handlers; manager refusals retain their correlation fields. Direct refusal must preserve the direct-call exception boundary.

3. **UNRESOLVED — Call envelope and unread extra fields.** Inspection found no source read of `call.caller`. `src/core/validators.ts:24–29` reads only the required envelope members; the installed record guard inspects record branding rather than extra values.

   Settling command: `npm.cmd run test:src:core -- tests/src/core/validators.test.ts`. Expected: the throwing extra `caller` accessor remains unread and the guard returns `true`; a throwing required-field accessor returns `false`.

   “Plain JSON” also needs a boundary clarification: `ToolCall.arguments` remains `Readonly<Record<string, unknown>>`, which admits non-JSON members. A proposed `C3 serialization` case using `{ arguments: { value: 1n } }` must distinguish envelope validity from JSON serializability. Command: `npm.cmd run test:probe -- tmp/probe/A1-objective.test.ts -t 'C3 serialization'`.

4. **UNRESOLVED — Parameter derivation.** `src/core/tools/Tool.ts:43–55` places conflict rejection and projection in construction. The test independently computes the installed projection at `tests/src/core/tools/Tool.test.ts:81–85`.

   Settling command: `npm.cmd run test:src:core -- tests/src/core/tools/Tool.test.ts -t 'derives advertised|rejects simultaneous'`. Expected: independent projection equality, retained parameter identity, and a guarded `SCHEMA` error.

   The installed declaration at `index.d.ts:5809–5815` states that compiled contract schemas are records. Its `undefined` projection example concerns a foreign schema class instance, not a shape compiled by `createContract`. Do not fabricate that branch by replacing the dependency.

5. **UNRESOLVED — Validation and fault containment.** `Tool.ts:63–70` validates before invocation and conditionally reads diagnostic members. The installed union confirms that `missing` lacks `received`, while `variant` and `oneOf` lack `expected` and `received`.

   Settling command: `npm.cmd run test:src:core -- -t 'refuses invalid arguments|reports missing|contains contract refusal'`. Expected: direct `ARGUMENTS` errors, correlated manager failures, correct fault messages, and no handler entry.

   Extend the manager cases to the missing, constraint, variant, and overlapping-oneOf inputs already constructed at `Tool.test.ts:131–158`. Command: `npm.cmd run test:probe -- tmp/probe/A1-objective.test.ts -t 'C5 fault arms'`. Assert the error class and code at the direct boundary as well as each contained message.

6. **UNRESOLVED — Coercion reachability; disclosure is present.** The installed `ContractInterface` declaration at `index.d.ts:1413–1422` explicitly gives `explain` parse/coercion semantics. Its number reporter calls `parseNumber` at `index.js:8499`. The guide expressly states acceptance of numeric strings and unchanged argument forwarding at `guides/tool.md:330–332`.

   Settling command: `npm.cmd run test:src:core -- tests/src/core/tools/Tool.test.ts -t 'uses explain coercion'`. Strengthen the reading to assert that `{ amount: '3' }` produces no explain faults, advertises a number, and reaches the handler with `typeof args.amount === 'string'`. Use `{ amount: 'invalid' }` as the refusal control. The identified gap is documented; its runtime reading was not independently obtained here.

7. **UNRESOLVED — Advertising projection.** `src/core/helpers.ts:24–33` constructs a fresh outer object with the requested fields. It shares the annotations reference. The guide discloses retained identities at `:232–235`, demonstrates annotation identity at `:396`, and declares properties readonly at `:41`.

   Settling command: `npm.cmd run test:src:core -- tests/src/core/helpers.test.ts`. Expected: exact advertising keys, summary substitution, fresh outer objects, and shared annotation identity. This source review does not substantiate an undisclosed-reference defect.

8. **UNRESOLVED — Preserved behavior.** The supplied diff leaves the map operations, missing-tool message, exception conversion, fallback message, and ordered `Promise.all` results intact. Existing hostile-throw and ordering assertions remain.

   Settling command: `npm.cmd run test:src:core`. Expected: the registry, exception-isolation, batch-order, removal, clear, and count tests execute and pass. The attempted run collected nothing, so neither the writer’s passing report nor this unchanged-source comparison establishes runtime preservation.

9. **CONFIRMED — Types, names, and placement.** The attack was to inspect changed declarations and their surrounding modules for compound entity members, mutable public collections, assertions, nested declarations, misplaced helpers, and malformed export summaries. It found no violation of the listed requirements. The class files contain their classes and imports; `errors.ts` contains the error class; validators remain guards; the projection remains a pure helper. The error codes distinguish construction conflict from argument refusal.

10. **UNRESOLVED — Test adequacy.** The tests use real implementations and the declared delay helper. The following mutation attacks remain unexecuted:

    - **Construction test**, `Tool.test.ts:80`: defer compilation and projection until the first parameter read, then cache them. Its assertions begin by reading parameters, so the source suggests it remains green. Command after the controlled mutation: `npm.cmd run test:src:core -- tests/src/core/tools/Tool.test.ts -t 'derives advertised parameters'`. Add an observation that distinguishes construction work from first-read work.
    - **Original-arguments test**, `Tool.test.ts:161`: mutate `args.amount` to `3` in place before forwarding. Its sole assertion checks object identity, so the source suggests it remains green. Command: `npm.cmd run test:src:core -- tests/src/core/tools/Tool.test.ts -t 'uses explain coercion'`. Assert the retained string value and type.
    - **Fault-arm test**, `Tool.test.ts:131`: construct ordinary `Error` instances with the same diagnostic text for missing, constraint, variant, and oneOf faults. Its regex-only assertions appear unable to distinguish them from `ToolError`. Command: `npm.cmd run test:src:core -- tests/src/core/tools/Tool.test.ts -t 'reports missing'`. Assert `isToolError`, `ARGUMENTS`, and handler non-entry for each arm.

    Each mutation needs an isolated run followed by restoration. These are predicted surviving mutations, not measured survivors.

11. **BROKEN — The guide transcription is incomplete.** The registry fence evaluates `tools.tool('add')` and `tools.definitions()` at `guides/tool.md:218–220`. Its claimed transcription at `tests/guides.test.ts:184–204` executes neither operation. Thus it does not execute exactly what the fence claims, independently of whether those methods work elsewhere.

    **Smallest fix:** add the missing lookup and definition-projection calls and assert their documented identity, ordering, and fields in that transcription. Preserve the existing assertions. The Methods tables contain the interface method names, and the README pitch matches the guide tagline; those are not the defect.

12. **BROKEN — The silent caller migration is unnamed.** An existing handler typed `(args, caller?: unknown)` compiles unchanged because `unknown` admits `ToolContext`. At `src/core/tools/Tool.ts:72`, that parameter receives the context object, not its `caller` member.

    Reading the guide, public TSDoc, and writer report found no warning that this old signature remains assignable while changing meaning. `guides/tool.md:192–196` describes the required context but does not identify this migration hazard. The campaign design names it; the claim requires a consumer-facing location.

    **Smallest fix:** document the hazard on the public execution contract and in the guide. Show the migration to `(args, context) => …context.caller`, and require adoption units to inspect handlers rather than treating a green typecheck as migration proof. The unchanged package version `0.0.14` follows U1b’s prohibition on bumping; that is not a finding. **I would not ship this unit yet.**

## Findings outside the claims

None substantiated.

## Attacked and held

- The fault-union review found no unconditional read of missing diagnostic members.
- The coercion-disclosure attack failed: the guide explicitly states the behavior.
- Annotation sharing is disclosed and readonly in the public contract.
- Concurrent batches need not refuse siblings that entered before an asynchronous abort. Cancellation after entry remains cooperative.

VERDICT: FAIL 1,2,3,4,5,6,7,8,10,11,12; outside the claims: none