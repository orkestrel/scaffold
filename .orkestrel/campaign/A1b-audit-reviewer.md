<!-- A1b-S — reviewer (Opus 5, native), subjective and cross-engine lane on U1c, blind. Retained from the completion notification, 2026-09-15 (560 s, 35 tool uses); transcript consumed on first read. Abridged to verdict lines, findings, and attacked-and-held; the full reasoning was read by the Orchestrator at reconciliation. -->

I hold the SUBJECTIVE lane of audit A1b, and the cross-engine lane for a unit written on GPT-6 Astra.

1. R-coercion implemented as ruled and nowhere else — CONFIRMED (`Tool.ts:64-80`; attacked a stable input reaching `: parse` through the wider `!isRecord(parsed)` door: `isRecord` accepts null-prototype records, the DSL has no category parsing a record to a non-record; guide states coercion and dropped keys in the main flow at `guides/tool.md:342-348`, `:195-196`). Residual: `:353-354` states the changing-read case as the branch's only trigger while the code's condition is any non-record parse.
2. Batch-abort semantics stated as measured; tests named for what they pin — CONFIRMED (`guides/tool.md:326-333`; `ToolManager.ts:73`, `:105`, `:114`; tests at `ToolManager.test.ts:560`, `:586`, `:620`).
3. Constraint message carries its bound; only that arm changed — CONFIRMED (`Tool.ts:71-72`; pinned `Tool.test.ts:178-239`). Residual: the `limit !== undefined` half has no executed proof.
4. Typed error context exact — CONFIRMED (`types.ts:25-28`; `errors.ts:15-17`; guide row `:61`; parity `tests/guides.test.ts:99-105`; `expectTypeOf` at `Tool.test.ts:172-174`). See F6.
5. Migration hazard named where a consumer reads — CONFIRMED (`guides/tool.md:304-306`; `types.ts:127-128`, `:168-169`; executed at `Tool.test.ts:69-83`). See F7.
6. The three weak tests now bind — CONFIRMED, misses named: (a) blind to the contract branch; (b) the identity read discriminates only a recomputing accessor; (c) binds both directions; (d) one recorder shared across arms mislabels which arm entered.
7. Registry transcription complete — CONFIRMED (`tests/guides.test.ts:316-328`); blind spot of the byte-equality instrument: an edit mirrored into the literal list but not into the executing transcription passes.
8. Guide transcript coherent — CONFIRMED (`guides/tool.md:300` declares the later sections independent; Anatomy, registry, Calls fences intact; Tests rows `:441-442`). See F10.
9. Direct aborted execution stated — CONFIRMED (`types.ts:129-130`; `Tool.test.ts:85-101`).
10. Nothing regressed, nothing else moved — CONFIRMED.
11. Coherent as tool 0.0.15; ship? — BROKEN. Not as it stands: fix F5 and F6 before the bump; F7–F11 are successor work. Nothing found reaches the runtime.

Findings outside the claims:
- F5 (blocking) — `isToolError` sits in `validators.ts:45` importing `ToolError`; the kind table routes error guards to `errors.ts` (fleet: `agent/src/core/errors.ts`, `mcp/src/core/errors.ts:55`; `guides/contract.md:365-370`). Fix: move guard and doc block to `errors.ts`, drop the import, restore the Validators lead sentence, list `isToolError` under `### ToolError`, move its describe block to `tests/src/core/errors.test.ts`, correct the Tests rows.
- F6 (blocking) — `tests/guides.test.ts:102-105` `documents the exported error context with its faults member` never reads `faults`; emptying the Shape cell `{ faults? }` at `guides/tool.md:61` leaves it green. Fix: assert the Shape cell carries `faults`, or rename.
- F7 — past-tense migration note in two published `@remarks` (`types.ts:127-128`, `:168-169`) with no removal trigger. Fix: keep the guide paragraph with the version; reduce each `@remarks` to the present-tense fact.
- F8 — `: parse` invents a fault reason (`Tool.ts:77`); carries no `context.faults`; the Orchestrator's own prescription. Fix: a message that is plainly not a fault line, such as `Arguments did not parse`; restate `guides/tool.md:353-354` as the code's condition (a non-record parse result).
- F9 — `variant` and `oneOf` messages drop `variants`/`matched`, the arms' only informative members. Fix (successor): append `; variants <n>` and `; matched <n>`; restate `guides/tool.md:351`.
- F10 — `guides/tool.md:330` runs 112 columns; the paragraph at `:349-354` is mis-broken. Fix: reflow.
- F11 — `toolToDefinition`'s description names only the parameter schema as carried by reference while `annotations` is too (`helpers.ts:4-6`, `:31`; guide Summary `:84`). Fix: name both; regenerate the Summary cell.

Attacked and held: a type-conforming input reaching `: parse`; `parse` throwing `ContractError` on a failed required read (contained by the manager; the direct-boundary fence anticipates a non-`ToolError`); `expect.assertions(9)` at `tests/guides.test.ts:411` is the control that makes the catch block mandatory; the abort check inside `#run`'s `try` below the not-found branch is what makes the unknown-tool sentence true; `ToolError.context` absent rather than `undefined` when omitted; the barrel reorder resolves through real imports.

VERDICT: FAIL 11; outside the claims: F5, F6, F7, F8, F9, F10, F11
