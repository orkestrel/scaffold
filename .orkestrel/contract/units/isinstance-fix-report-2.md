# ISINSTANCE-FIX round 2 — the unit's report (sol on GPT-6 Astra)

Thread `01a0d02a-ebe7-7c12-9116-98688d4a5cfa`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/isinstance-fix-2.jsonl` (launch copy under `tmp/codex/`); 24 commands; 287 s; usage {"input_tokens":1533358,"cached_input_tokens":1441024,"cache_write_input_tokens":0,"output_tokens":6539,"reasoning_output_tokens":1283}. Retained verbatim from the exec's last message.

---

Stopped under the brief’s deviation contract: G3 and acceptance criterion 6 contradict the compiler reading.

Expected: the `=> unknown` mutation fails all three constraint assertions. Found: it fails the parity and bare `AnyConstructor` assertions; the `Function` refusal assertion passes. Hypothesis: the criterion conflates an unknown instance type with an absent construct signature.

The edits remain uncommitted:

- **G1:** Replaced the internal comment with the runtime reason. Preserved the body and round-1 signature.
- **G2:** Qualified false-branch narrowing, limited the primitive warning to `Object`, and separated the `Function` interface from its constructor.
- **G3:** Added the requested constraint assertions and the structurally identical subclass case beside the existing `Derived` case. Each case includes a runtime assertion. Recorded red and restored green compiler readings in a scratch copy.
- **G4:** Left the description and guide row unchanged. Guide parity was not run after the stop condition.

The exact internal comment is:

```ts
// Keep the published runtime behaviour: `isFunction` makes a non-callable
// right-hand side return `false` without consulting its own `Symbol.hasInstance`
// or causing a contained `TypeError`.
```

The exact remark is:

```ts
 * @remarks
 * The low-level total helper every `instanceof`-based guard in this file (and
 * the `instanceOf` combinator) routes through. A bare `value instanceof X` is
 * NOT total, which `.claude/rules/patterns.md` § Validation and contracts
 * requires: it invokes `getPrototypeOf` on `value` — which a
 * revoked `Proxy` or a `getPrototypeOf`-trap `Proxy` throws from — and, when
 * `X[Symbol.hasInstance]` is user-defined, can throw from arbitrary code. This
 * wraps the check in {@link holds} (see ./helpers.js) so any such throw
 * yields `false` instead of escaping.
 *
 * Narrows `value` to `InstanceType<C>`, which reads the constructor's last
 * construct signature. Accepts the same constructors as `instanceOf`: a public
 * or abstract construct signature returning an object. A class with a private
 * or protected constructor and the bare `AnyConstructor` are refused at the call.
 * A value typed `Function` cannot be passed because the `Function` interface has
 * no construct signature. The constructor `Function` can be passed through
 * `FunctionConstructor`'s construct signature and narrows to `Function`.
 * The false branch drops each member of the declared union that is assignable
 * to the instance type and keeps the rest, so a subclass that adds no member
 * narrows its base out as well. A constructor whose instance type admits
 * primitives structurally, such as `Object`, makes the false branch unsound;
 * use `isObject` for that check.
```

The G3 red reading ran `npm.cmd run check` in `C:\Users\mikes\WebstormProjects\contract\tmp\isinstance-fix-2-sFzHLf`, with only the scratch signature’s constraint changed to `=> unknown`. Exit code: `1`. Output verbatim:

```text
npm notice run @orkestrel/contract@0.0.17 check
npm notice run tsc --noEmit --project tsconfig.json && npm run check:src
tests/src/core/validators.test.ts(776,11): error TS2344: Type 'false' does not satisfy the constraint 'true'.
tests/src/core/validators.test.ts(777,21): error TS2344: Type 'true' does not satisfy the constraint '"Expected: literal boolean: true, Actual: literal boolean: false"'.
tests/src/core/validators.test.ts(783,11): error TS2344: Type 'false' does not satisfy the constraint 'true'.
tests/src/core/validators.test.ts(784,21): error TS2344: Type 'true' does not satisfy the constraint '"Expected: literal boolean: true, Actual: literal boolean: false"'.
```

Line 776 is the parity assertion; line 783 is the bare `AnyConstructor` assertion. Lines 777 and 784 are their enclosing equality checks. The `Function` assertion at line 790 produced no diagnostic.

After restoring the scratch constraint to `=> object`, the same `npm.cmd run check` command exited `0`. Output verbatim:

```text
npm notice run @orkestrel/contract@0.0.17 check
npm notice run tsc --noEmit --project tsconfig.json && npm run check:src
npm notice run @orkestrel/contract@0.0.17 check:src
npm notice run npm run check:src:core
npm notice run @orkestrel/contract@0.0.17 check:src:core
npm notice run tsc --noEmit -p configs/src/tsconfig.core.json
```

**Unknown answered:** The parameter types compare equal under `Equal` exactly as requested. The restored green reading accepts that assertion; no literal-constraint fallback was needed. It also accepts the `Same` true-branch and `null` false-branch assertions.

The checkout formatting command was:

```text
npx.cmd oxfmt --config .oxfmtrc.json --check src/core/validators.ts tests/src/core/validators.test.ts tests/src/core/combinators.test.ts
```

It exited `0`. Output verbatim:

```text
npm notice run @orkestrel/contract@0.0.17 npx
npm notice run oxfmt --config .oxfmtrc.json --check src/core/validators.ts tests/src/core/validators.test.ts tests/src/core/combinators.test.ts
Checking formatting...

All matched files use the correct format.
Finished in 6ms on 3 files using 16 threads.
```

Acceptance remains incomplete. The checkout’s `npm.cmd run check`, scoped Oxlint, `test:src`, `test:guides`, and `build:src:core` were not run after the stop condition. No emitted declaration is claimed.

The `git status --short` output was:

```text
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
 M src/core/validators.ts
 M tests/src/core/combinators.test.ts
 M tests/src/core/validators.test.ts
```

The `git diff --stat` output includes the pre-existing round-1 edits:

```text
 src/core/validators.ts             |  25 ++++++---
 tests/src/core/combinators.test.ts |   9 ++++
 tests/src/core/validators.test.ts  | 105 ++++++++++++++++++++++++++++++++++++-
 3 files changed, 131 insertions(+), 8 deletions(-)
```

Tool policy rejected the scratch cleanup command with “blocked by policy.” The restored scratch directory `tmp/isinstance-fix-2-sFzHLf` and its creation script `tmp/isinstance-fix-2-scratch.cjs` remain in the checkout’s ignored temporary directory.

## The Orchestrator's ruling on the stop (2026-09-23)

The stop was correct and the brief was wrong: acceptance criterion 6 said the `=> unknown` constraint must fail all three constraint assertions, but the `Function` refusal rests on the absence of a construct signature on the `Function` interface, which any constraint with a construct signature refuses, so that assertion passes under `=> unknown` as under `=> object`. The two assertions that do fail under the mutation (the parity with `instanceOf` and the bare `AnyConstructor` refusal) are the ones that pin the `=> object` constraint; the `Function` assertion stays as the proof of the construct-signature requirement. The unit's edits are complete as briefed. The Orchestrator's own run over the final tree (`isinstance-fix-2-gates.log.txt`) reads `npm run check`, the scoped oxlint and oxfmt checks, `npm run test:src` (19 files, 1361 tests), `npm run test:guides` (48 of 48), and `npm run build:src:core` green, the emitted declaration unchanged from round 1, the `=> unknown` mutation failing exactly the parity and `AnyConstructor` assertions (two diagnostics each) with `validators.ts` restored byte for byte, the consumer probe compiling every accepted line and refusing the non-constructor once, and the structural probe compiling clean. The audit runs on this tree.
