<!-- A1-S — reviewer (Opus 5, native), subjective lane and the cross-engine lane for a unit written on Astra, blind. Retained verbatim from the completion notification, 2026-09-15 (700 s, 28 tool uses). Transcript consumed on first read; this copy is the record. -->

I hold the **SUBJECTIVE** lane of audit A1, adjudicating objective defects directly as the cross-engine lane for a unit written on GPT-6 Astra.

# Numbered verdicts

**1. Every handler invocation receives a context with a live `AbortSignal`. — CONFIRMED**
Attacks that failed: (a) `manager.execute(call, undefined)` — a JavaScript default parameter fires on `undefined`, so `ToolManager.ts:71` still mints a controller; (b) batch identity — the default at `ToolManager.ts:71` is evaluated once per `execute` entry and `:73` closes `map` over that one binding, so every sibling receives the identical object; (c) `Tool.ts:72` forwards `context` unconditionally; (d) a contract fault throws at `Tool.ts:70` before any handler runs. `ToolInterface.execute` (`types.ts:123`) declares the parameter required.

**2. An already-aborted signal never enters a handler, and the check is per call. — BROKEN**
Interleaving: a batch whose signal is aborted asynchronously by an earlier call (`abort` handler awaits `waitForDelay(1)` then aborts; `later` handler records entry). Claim predicts `entered.count === 0` and a failure naming `batch ended`; actual: `entered.count === 1`, success. `ToolManager.ts:73` dispatches with `map`, which invokes `#run` for every call synchronously; `#run`'s first `await` is at `:114`, after the abort check at `:105` and after `Tool.execute` entered the handler, so every member's check and entry happen in one synchronous pass. The test `checks the signal again before entering each batch handler` pins only the synchronous-abort special case; its name promises the general property. Bounded: the runtime matches its own documentation (`ToolManager.ts:21-23`, `guides/tool.md:318-321`). Smallest fix: state in the guide that a batch dispatches in one pass so an abort raised after dispatch reaches only handlers that observe the signal; rename the test for the case it pins; add the asynchronous case recording the real result. Constraint: do not serialize the batch and do not re-check after the `await` at `:114`.

**3. `ToolCall` is plain JSON and nothing reads `caller`. — CONFIRMED** — every `caller` hit under `src/` is prose or the `ToolContext.caller` declaration; `#run` reads `name`, `id`, `arguments` only; `isToolCall` reads the three members inside `holds`, pinned with a throwing `caller` getter.

**4. Contract-derived `parameters` are correct and derived once. — CONFIRMED** — data field assigned once in the constructor (`Tool.ts:39, 53-54`); `undefined` projection guarded; conflict throws before any assignment (`:43-45`); derivation is exactly `schemaToParameters(createContract(shape).schema)`.

**5. Validation precedes the handler and its failure is contained correctly. — CONFIRMED** — every `Fault` arm walked through the builder at `Tool.ts:63-71`; `in` narrows; `FieldPath` both forms handled; `explain` before the handler; throw lands in `#run`'s try. See F1.

**6. The coercion gap is either closed or stated. — CONFIRMED** — reachable (`explain` mirrors `parse`; `parse` coerces `'36'` → `36`), pinned by `Tool.test.ts:161-170`, and stated at `guides/tool.md:330-332` and `types.ts:116-117`.

**7. Advertising projection is exact. — CONFIRMED** — one fresh literal; `execute`/`summary` never written; `contract` is the private `#contract`; `''` summary advertised (nullish, not falsy); shared `annotations` identity is stated at `guides/tool.md:234` and pinned at `:396`.

**8. Every pre-existing behaviour is unchanged. — CONFIRMED** — not-found branch and position byte-identical; `Unknown thrown value` path untouched; `Promise.all` over `map`; `add`/`remove`/`clear`/`count` untouched; a throwing `id` accessor under the new abort branch still rejects. Two tests were replaced, not weakened.

**9. The types and names obey the rules. — CONFIRMED** — one-word members; `ToolErrorCode` names two irreducible categories; fixed type forms; `readonly` throughout; no `any`/`as`/`!`; only anonymous callbacks in bodies; kind files pure; barrel order canonical; TSDoc opens with `-s` verbs. See F3 for the constructor shape.

**10. The tests prove what they name. — UNRESOLVED** — no mock, spy, fake clock, or module replacement; `waitForAbort`/`waitForDelay` used; the derived-`parameters` test computes the projection itself. Not settled: red-on-defect. Weakest tests and the mutation that leaves each green: `Tool.test.ts:53-61` carries no runtime assertion (binds only through the typecheck); `Tool.test.ts:80-89` `toEqual(expected)` is vacuous when `expected` is `undefined` (needs a control that `expected` carries `type: 'object'`); `Tool.test.ts:161-170` cannot tell "no validation" from "validation that coerces" (delete the `explain` call and it stays green; assert `explain(args)` empty and `parse(args)?.amount === 3`). Settle with the Orchestrator's runs and a mutation probe per test.

**11. The guide is true. — CONFIRMED** — fences transcribed and executed with asserted values; Methods tables match; tagline and README pitch identical; coercion, pre-abort refusal, batch-shared context, and the substitution stated. F2 and F4 are guide defects outside the claim's list.

**12. The package is coherent as tool 0.0.15 and adoptable. — BROKEN** — an old handler annotated `(args, caller?: unknown)` is assignable to the new `execute` (contravariance; `ToolContext` assignable to `unknown`), compiles unchanged, and receives the context as its "caller"; a `isRecord(caller) && isString(caller.subject)` narrow silently fails and treats every call as anonymous. Bounded: an unannotated `(args, caller)` gets `caller` contextually typed as `ToolContext`, so reads are compile errors. Unnamed in the guide, the TSDoc, and the report. Smallest fix: one guide paragraph stating `caller` moved onto `ToolContext`, that an `unknown`-annotated second parameter still compiles and now receives the context, and that such a handler re-points at `context.caller`; no shim, no runtime detection. Would not ship until that paragraph lands and F3 is ruled.

# Findings outside the claims

**F1** — a `constraint` fault's message drops `constraint` and `limit` (`Tool.ts:63-71` appends only `expected`/`received`; the arm carries `constraint: FaultConstraint`, `limit?`). Through the manager the message is the only channel (`guides/tool.md:367-368`), so a model told `constraint` cannot correct the argument. Fix: append constraint and limit when the arm carries them; extend the guide. Constraint: do not serialize the whole report; do not change the other arms' messages.

**F2** — the guide's Tests rows for `validators.test.ts` (`:423`) and `helpers.test.ts` (`:422`) went stale (the `isToolError` block and the title/annotations forwarding are not mentioned) while the sibling rows were refreshed. Fix: extend those two rows only.

**F3** — `ToolError` diverges from the ecosystem shape and types `context` as an untyped bag: `guides/tool.md:335` promises `context.faults` holds the report, but a consumer reading it gets `unknown` and must hand-write a guard for a shape `@orkestrel/contract` already exports (`Fault`). Fix: declare `ToolErrorContext { readonly faults?: readonly Fault[] }` in `types.ts`, type `ToolError.context` as it, add the guide row; reference `Fault` in type position only (no re-export). The constructor `(code, message, context?)` versus `ContractError`'s `(message, options)` and the imperative `this.name` are the same divergence for the Orchestrator to rule on together.

**F4** — the new guide fences re-declare `const tools` (`:306`), `const context` (`:305`/`:351`), and `const tool` (`:346`/`:385`) at top level, breaking the running transcript the guide establishes (the unit itself added `tools.add(add)` at `:245` to keep continuity); lines `:15` and `:114` were edited without re-wrapping. Fix: unique identifiers or one sentence declaring the sections independent; re-wrap. Constraint: do not rewrite the Anatomy, registry, or calls fences.

# Attacked and held

Claim 2's stronger half (no handler enters after an abort that fired inside the dispatch pass); a hostile context object (contained as a `ToolFailure`); `explain` throwing a `ContractError` on a failed required read (contained by the manager; the fence anticipates a non-`ToolError` at the direct boundary); whether `explain` reads an undeclared key's value (settle with a throwing getter probe); `Tool` instances and own-property absence under `useDefineForClassFields` (pre-existing prose; settle with `Object.keys(new Tool(...))`); `untrusted` naming (a property of the value, documented; ruled correct); `isToolError` reusing the installed `isInstance` (correct reuse).

VERDICT: FAIL 2, 10, 12; outside the claims: F1, F2, F3, F4
