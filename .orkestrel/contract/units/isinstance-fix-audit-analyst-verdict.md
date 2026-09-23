# ISINSTANCE-FIX audit — the subjective lane's verdict, held by analyst on GPT-6 Astra

Thread `01a0d024-7f09-7080-b396-083fd0e15414`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/isinstance-fix-audit.jsonl` (launch copy under `tmp/codex/`); 35 commands; 283 s; usage {"input_tokens":1162769,"cached_input_tokens":1040640,"cache_write_input_tokens":0,"output_tokens":7387,"reasoning_output_tokens":2053}. Retained verbatim from the exec's last message.

---

Subjective lane.

1. **BROKEN.** The false-branch promise at [validators.ts:380](C:/Users/mikes/WebstormProjects/contract/src/core/validators.ts:380) exceeds what the signature provides. With `class Base { readonly base = true }`, `class Derived extends Base {}`, and a parameter `value: Base | null`, the false branch of `isInstance(value, Derived)` has type **`null`**. The installed TypeScript 6.0.3 compiler rejected equality with `Base | null` (`TS2344`) and accepted equality with `null`. The control subclass adding `readonly derived = true` preserved `Base | null`.

   The comment at [validators.ts:401](C:/Users/mikes/WebstormProjects/contract/src/core/validators.ts:401) also gives an incorrect justification for this signature: `holds(() => value instanceof ctor)` compiles with the constructor constraint intact. The unconstrained control fails with `TS2359`; moreover, [holds at helpers.ts:970](C:/Users/mikes/WebstormProjects/contract/src/core/helpers.ts:970) is not generic.

   Smallest fix: qualify false-branch preservation by structural assignability and replace the comment’s compiler-necessity explanation with the requirement to preserve runtime behavior. Keep the signature and executable body.

2. **CONFIRMED.** Attacked whether the narrowing cases were runtime-empty, asserted only assignability, or lacked an observed failure against the old signature. The [validator cases](C:/Users/mikes/WebstormProjects/contract/tests/src/core/validators.test.ts:694) pair runtime assertions with exact type assertions, including the parameter constraint; the [combinator case](C:/Users/mikes/WebstormProjects/contract/tests/src/core/combinators.test.ts:1002) checks each guarded branch independently. The recorded command execution—not merely the writer’s report—contains the red `npm.cmd run check` result and its ten diagnostics at [isinstance-fix.jsonl:37](C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/isinstance-fix.jsonl:37). The Orchestrator independently recorded the green typecheck and 1357 passing tests in 19 files at [gates:12](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/contract/units/isinstance-fix-gates.log.txt:12) and [gates:30](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/contract/units/isinstance-fix-gates.log.txt:30).

3. **BROKEN.** The claim includes the truth of the remark’s sentences, so the false-branch counterexample in claim 1 falsifies it. The guide itself holds: [contract.md:126](C:/Users/mikes/WebstormProjects/contract/guides/contract.md:126) carries `InstanceType<C>` and the unchanged description; its section contains only the table. README contains no `isInstance` reference, and [gates:44](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/contract/units/isinstance-fix-gates.log.txt:44) records 48 passing guide tests. Correct the remark; no guide-row change is required.

4. **CONFIRMED.** Attacked constructor compatibility through the bare `AnyConstructor`, inaccessible constructors, `Function`-typed values, and unknown-returning constructors. The parameter constraints are identical at [validators.ts:397](C:/Users/mikes/WebstormProjects/contract/src/core/validators.ts:397) and [combinators.ts:260](C:/Users/mikes/WebstormProjects/contract/src/core/combinators.ts:260); the retained refuter probes support the documented refusals. The [consumer probe](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/contract/units/contract-isinstance-probe-fixed.ts:10) exercises the accepted patterns, and [gates:75](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/contract/units/isinstance-fix-gates.log.txt:75) records only the expected non-constructor `TS2345`. The guide’s actual [URL ternary](C:/Users/mikes/WebstormProjects/guide/src/server/helpers.ts:62) matches that coverage.

5. **CONFIRMED.** Attacked scope creep, compatibility scaffolding, and prohibited TypeScript constructs through the supplied diff and live status. Only the specified source and test files are modified; the [diff](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/contract/units/isinstance-fix.diff:1) adds no alias, overload, shim, suppression, assertion, or accessibility modifier. The [Orchestrator’s gate record](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/contract/units/isinstance-fix-gates.log.txt:3) supports the status, checks, tests, build, and emitted declaration.

**Findings fitting no claim:** none.

**Attacked and held:** Moving the narrowing explanation into `@returns` is unnecessary: the existing return text states the boolean behavior, while `@remarks` carries constraints and limitations. The separate narrowing block remains adjacent to the hostile-input cases and retains runtime assertions inside its cases. Its titles describe the behavior each fixture proves.

**Referrals:** Refer claim 1’s structural-subclass counterexample and constrained-RHS compiler result to the objective lane for reproduction. No additional objective defect is asserted against claims 2 or 4.

**Bounds:** Remark length and test grouping are editorial bounds, not findings. Claim 5’s prohibited words are interpreted as code constructs; its required TSDoc necessarily mentions `public`, `private`, and `protected`. The compiler probe used the built declaration and root compiler options with ambient `types: []`, entirely in memory. Its controls established the stated type distinctions; it executed no runtime test or build. Runtime results remain the Orchestrator’s recorded evidence.

VERDICT: FAIL 1, 3; outside the claims: none
