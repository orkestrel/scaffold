## 1. `assertBrief`

**Verdict: RETAIN IDENTITY.**

`assertBrief` is a narrowing operation. It neither retains the value nor performs later reads. Applying ownership here would contradict its documented identity contract and its pinned behavior. Callers needing stable subsequent reads must cross `snapshotBrief`.

**Owned sentence:** “`assertBrief` narrows by identity and transfers no ownership. Call `snapshotBrief` before any later read that must be stable against caller getters or mutation.”

**Carriers:** the `assertBrief` remarks in [helpers.ts](/home/user/orkestrel/brief/src/core/helpers.ts:818) and the Helpers or Practices text in [brief.md](/home/user/orkestrel/brief/guides/brief.md:433).

**Pin:** `returns the same value by identity once the guard passes` in [helpers.test.ts](/home/user/orkestrel/brief/tests/src/core/helpers.test.ts:837). The existing invalid-input tests retain the narrowing boundary.

## 2. `parseBrief`

**Verdict: CLOSED BY CONSTRUCTION.**

`parseBrief` receives a string, and `parseJSONAs` constructs the candidate through the captured JSON decoder before applying `isBrief`. JSON text carries no caller object identity, accessors, or shared aliases. No residual ownership door exists.

A getter-free traversal test would duplicate the JSON parser’s construction guarantee. The design rationale belongs in prose; the parser’s observable contract remains pinned by round-trip and guard-soundness tests.

**Owned sentence:** “A successful `parseBrief` result is owned by construction: JSON text carries no caller identity, accessors, or shared aliases into the parsed object graph.”

**Carriers:** the `parseBrief` remarks in [parsers.ts](/home/user/orkestrel/brief/src/core/parsers.ts:5) and the Parsers section in [brief.md](/home/user/orkestrel/brief/guides/brief.md:537).

**Pins:** `round-trips a pinned brief through JSON` and `is sound against its guard in both directions` in [parsers.test.ts](/home/user/orkestrel/brief/tests/src/core/parsers.test.ts:6).

## 3. Seal-live arms

**Verdict: DEFECT — CLOSE IN CODE.**

Freezing does not stabilize accessors. A frozen getter can return different values on successive reads. The seal-live paths therefore contradict:

- the foreign-contract rule requiring ownership at arrival and one foreign read in [patterns.md](/home/user/orkestrel/brief/.claude/rules/patterns.md:132);
- the public option contract in [types.ts](/home/user/orkestrel/brief/src/core/types.ts:433);
- the within-call invariant in [brief.md](/home/user/orkestrel/brief/guides/brief.md:693).

The current generic `#own` method in [BriefCompiler.ts](/home/user/orkestrel/brief/src/core/BriefCompiler.ts:244) cannot close the invariant. Its fallback returns the accessor-bearing container, after which the guard, `#draft`, and `#blockage` observe it again.

Close this without narrowing by replacing the generic fallback with contract-specific capture:

- Read every published `Interpretation` or `LogicalResult` member once into an owned data view.
- Capture inherited accessors as data, so conforming class instances remain admitted.
- Copy captured branches where supported.
- Seal a captured uncloneable leaf without refusing the containing result.
- Ignore unknown extra members for validation; they must not cause refusal.
- Apply the originating package’s guard to the owned view.
- Make later compilation, stage records, and blockage rendering read only that view.
- Capture a supplied `interpretation` before cloning the remaining `BriefInput`; remove the raw-object fallback read.
- Remove the second `isLogicalResult` observation from `#blockage`; `gate` must return an already validated owned result.

**Owned sentences:** “`BriefCompiler` captures every published member of a borrowed result into an owned data view on arrival; validation and every later read use that view. A member the copy mechanism cannot clone is sealed in the view and does not cause refusal of the containing result.”

**Carriers:** `BriefCompilerOptions` remarks in [types.ts](/home/user/orkestrel/brief/src/core/types.ts:420), ownership comments in [BriefCompiler.ts](/home/user/orkestrel/brief/src/core/BriefCompiler.ts:244), and the deterministic and borrowed-engine invariants in [brief.md](/home/user/orkestrel/brief/guides/brief.md:686).

**Pins required:**

- A supplied prototype-accessor `Interpretation` whose members shift must produce the same briefing as its captured data answers.
- An engine `Interpretation` carrying an uncloneable admitted leaf and shifting declared getters must produce the captured answers.
- A `LogicalResult` carrying an uncloneable unknown member and shifting declared getters must use the captured `conclusion` and `rules`.
- The existing class-instance acceptance test in [BriefCompiler.test.ts](/home/user/orkestrel/brief/tests/src/core/BriefCompiler.test.ts:590) remains the refusal-widening control.
- The existing non-JSON `Entity.value` comparison in [BriefCompiler.test.ts](/home/user/orkestrel/brief/tests/src/core/BriefCompiler.test.ts:522) remains the foreign-contract control.
- The existing counting-verdict test in [BriefCompiler.test.ts](/home/user/orkestrel/brief/tests/src/core/BriefCompiler.test.ts:469) remains the clone-arm control.

## 4. `deriveTask` vocabulary maps

**Verdict: DEFECT WITH LIVE-BETWEEN-CALLS RETAINED.**

The live-option contract permits mutation between `compile` calls. It does not permit one lookup to combine separate ownness and value observations.

For an ordinary accessor, `Object.hasOwn` does not invoke the getter, so the current code invokes that getter once. The defect remains real because `Readonly<Record<…>>` structurally admits a `Proxy`: `Object.hasOwn` invokes the descriptor trap, and indexed access then invokes the get trap. Those observations can disagree.

Replace the `Object.hasOwn` plus indexed read in [helpers.ts](/home/user/orkestrel/brief/src/core/helpers.ts:1239) with one own-property descriptor capture. Use its data value directly, or invoke its getter once. Do not perform a later indexed read. Inherited keys remain refused.

**Owned sentence:** “`actions` and `domains` remain live between `compile` calls; within a call, each requested own mapping is captured once, inherited mappings do not resolve, and later use reads the captured value.”

**Carriers:** `BriefCompilerOptions` remarks in [types.ts](/home/user/orkestrel/brief/src/core/types.ts:444), `deriveTask` remarks in [helpers.ts](/home/user/orkestrel/brief/src/core/helpers.ts:1218), and the mechanism invariant in [brief.md](/home/user/orkestrel/brief/guides/brief.md:755).

**Pins required:**

- A proxy whose descriptor trap and get trap disagree must derive from the descriptor capture and never invoke the get trap.
- An accessor-backed mapping must be evaluated once.
- Mutating an ordinary `actions` or `domains` record between compiler calls must affect the later call.
- The inherited-key test in [helpers.test.ts](/home/user/orkestrel/brief/tests/src/core/helpers.test.ts:984) remains the ownership control.

## 5. Unit decomposition and ROADMAP

**Foreign-result capture — GPT-5.6 Sol implementer.**

Owned files:

- `src/core/cloners.ts`
- `src/core/BriefCompiler.ts`
- `tests/setup.ts`
- `tests/src/core/BriefCompiler.test.ts`

This unit replaces seal-live containers with contract-specific owned data captures and lands the seal-arm pins.

**Vocabulary own-read — GPT-5.6 Sol implementer.**

Owned files:

- `src/core/helpers.ts`
- `tests/src/core/helpers.test.ts`

This unit captures one own mapping value while retaining live-between-call behavior. It also lands the `assertBrief` ownership-division remarks.

**Contract prose and parity — Opus 5 implementer.**

Owned files:

- `src/core/types.ts`
- `src/core/parsers.ts`
- `guides/brief.md`
- `tests/src/core/parsers.test.ts`
- `tests/guides.test.ts` only if a presence pin is needed

This unit removes the false seal-live universal, states the capture invariant, documents `assertBrief`, records JSON construction ownership, and states the live-map boundary.

**ROADMAP carrier — Sol Orchestrator after audit and gates.**

Delete the `brief` row in [ROADMAP.md](/home/user/scaffold/ROADMAP.md:32). No replacement text remains. Identity narrowing and JSON construction are intentional boundaries, while seal-live and vocabulary lookup close in code. They are not continuing debt.

LANE: objective COMPLETE.