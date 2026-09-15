<!-- A1b-C — checker (Sonnet, native), mechanical lane on U1c, blind. Retained from the completion notification, 2026-09-15 (161 s, 5 tool uses); transcript consumed on first read. Abridged. -->

Lane: checker (MECHANICAL), audit A1b.

1. R-coercion — CONFIRMED (`Tool.execute`: `explain` first; `parse` forwarded when `isRecord`; `: parse` otherwise; the `undefined` branch reached only through a changing getter; guide states coercion and dropped keys in the main flow).
2. Batch-abort semantics — CONFIRMED (no post-`await` re-check, no serialization; renamed synchronous test; asynchronous cases execute and record entry and success).
3. Constraint message; only that arm changed — UNRESOLVED (the `min: 1` message matches; byte-equality of the other arms against U1b cannot be checked because the supplied diff spans U1b and U1c; the U1b-only builder text would settle it).
4. Typed error context — CONFIRMED (`ToolErrorContext { readonly faults?: readonly Fault[] }`; `Fault` type-imported, never re-exported; `override readonly name = 'ToolError' as const`; guide row; parity test present).
5. Migration hazard named — CONFIRMED (guide paragraph; both `@remarks`; the executed test drives an `unknown`-annotated handler).
6. Weak tests bind — CONFIRMED (runtime context identity; `expected?.type === 'object'` control and reference identity; `explain` empty plus parsed value; per-arm `isToolError`, code, non-entry).
7. Registry transcription — CONFIRMED (`tools.tool('add')` by reference and `tools.definitions()` order and fields execute; the byte-equality instrument's only blind spot is a same-direction mirrored edit).
8. Guide transcript coherent — BROKEN as stated: the brief said the Calls fence is unchanged, but the diff against `main` modifies it (`tools.add(add)` restoration added; the `caller: { subject: 'user-42' }` line removed) — internally consistent with its transcription and necessitated by the `caller` removal in U1b, so the claim's wording, not the tree, is false. The independence sentence and the two Tests rows are present.
9. Direct aborted execution — CONFIRMED.
10. Nothing regressed — UNRESOLVED (scope, manifests, `any`/`as`/`!`, nested functions, TSDoc verbs all check out; the behavioural half rests on the in-flight gate run).
11. Ship — UNRESOLVED (judgment; referred).

Findings outside the claims: none. Attacked and held: `Fault` re-export path (none); the transcription instrument's same-direction blind spot; the "refuses nothing" wording versus the manager's pre-entry check (explicitly separated).

VERDICT: FAIL 3, 8, 10, 11; outside the claims: none

<!-- Orchestrator: claim 3's baseline is `A1-diff.patch.txt` (U1b's builder had only the expected/received lines; U1c appended constraint/limit after them — settled by reading both diffs); claim 8 is a brief-wording defect (the Calls fence change is U1b's, not U1c's) — recorded, no fix; claim 10's gates are green on the Orchestrator's run (`U1c-tool-gates-orchestrator.log.txt`). -->
