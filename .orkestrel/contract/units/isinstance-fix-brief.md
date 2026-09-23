# Unit ISINSTANCE-FIX — the `isInstance` narrowing in `@orkestrel/contract`

## Role and engine

`sol` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec --sandbox workspace-write -C C:/Users/mikes/WebstormProjects/contract` from this file. The executor that opens this brief is the Astra engine inside its CLI: the sole writer in that checkout (`main` at `743e4a3`, version 0.0.17, clean, installed from the lockfile with `npm ci --ignore-scripts`, TypeScript 6.0.3, Vitest 4.1.11).

## Objective

Make `isInstance` narrow `value` to the constructor's instance type, as its guide row already promises, with compile-time proofs and the guide in parity, and nothing else changed in the package.

## Context

**Evidence.** The Orchestrator's synthesis `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/contract/units/isinstance-round-1-synthesis.md` (every ruling), the probe `contract-isinstance-probe.ts` beside it (the diagnostics of the published and the candidate signature under TypeScript 6.0.3), the Grok read `isinstance-round-1-read.md` (every site with `file:line`: the declaration and its internal comment at `src/core/validators.ts` around lines 374 to 395; the `instanceOf` combinator at `src/core/combinators.ts` around lines 248 to 271; the runtime tests at `tests/src/core/validators.test.ts` around lines 673 to 689 and 987 and `tests/src/core/combinators.test.ts` around line 1113; the compile-time oracle `Equal` and `Expect` in `tests/setup.ts` around lines 3397 to 3420 and the `expectTypeOf(...).toEqualTypeOf<...>()` idiom the two test files use; the guide row at `guides/contract.md` around line 126 under `### Function & constructor guards`), and the three refuters' probes (`isinstance-round-1-refute-A.md`, `-B.md`, `-C.md`) for the edge constructors and the caller patterns.

**The ruling this unit lands.** The signature becomes

```ts
export function isInstance<C extends abstract new (...args: never) => object>(
	value: unknown,
	ctor: C,
): value is InstanceType<C>
```

the body unchanged (`const target: unknown = ctor; return holds(() => isFunction(target) && value instanceof target)`), so runtime behaviour is unchanged. The constraint is `instanceOf`'s, so the two functions accept and refuse the same constructors: a private- or protected-constructor class, a value typed `Function`, and the bare `AnyConstructor<unknown>` are refused at the call, as `instanceOf` refuses them today; the false branch keeps the declared type; `InstanceType` reads the constructor's last construct signature (a typed-array or `DataView` constructor narrows to the `ArrayBuffer`-backed view); a constructor whose instance type admits primitives structurally (`Object`, `Function`) leaves the false branch unsound, and `isObject` and `isFunction` are the guards for those. `value is InstanceType<C> & object` and a `=> unknown` constraint are declined (the synthesis says why).

**Law.** The checkout's own `AGENTS.md` and every rule it links under `.claude/rules/` (read them; they are this package's law), in particular the TSDoc rules, the test rules (a proof binds a behaviour; a compile-time assertion is a proof), the documentation parity rules (`tests/guides.test.ts` compares each guide `Summary` cell with the description paragraph); E6 of the Veneer engine session applies here too: no alias, overload, `@deprecated` tag, or compatibility shim; break and fix outright. Skill: none.

**Host and standing conditions.** Windows 11; inside the bench's sandbox `npm.cmd` is the npm entry and `npx.cmd` the npx entry, script execution is disabled for `.ps1` files, the sandbox denies the network (no install; the checkout is installed), Vitest forks run, and the `prove` MCP tool is not reachable. Read the source with `Get-Content` or the exec's own file reads. `npm run check` runs the root project and `check:src:core`; `npm run test:src` runs the core project (19 files, 1350 tests green at `743e4a3`, the Orchestrator's baseline `contract-baseline-gates.log.txt`); `npm run build:src:core` writes `dist/src/core/`, which is expected and ignored, and `dist/src/core/index.d.ts` is where the published declaration reads from. `tests/policy.test.ts` and `tests/setupPolicy.ts` are vendored and off-limits. `package.json` is off-limits: the version bump is the Orchestrator's release step.

## The edits

- **F1 (the signature).** In `src/core/validators.ts`, the signature above, the body verbatim. Rewrite the internal comment: its sentence that a constraint "would reject combinators.ts's `instanceOf`" is false (`instanceOf` carries the same constraint and calls `isInstance` after `isConstructor`); keep the true part, that `ctor` is narrowed through `isFunction` inside the `holds` callback because a generic right-hand side loses TypeScript's `instanceof` leniency nested in another generic call. The TSDoc's description paragraph stays a description; add a `@remarks` paragraph stating the narrowing (`InstanceType<C>`, the last construct signature), the constraint in words (every constructor `instanceOf` accepts: a public or abstract construct signature returning an object; a private or protected constructor, a `Function`-typed value, and the bare `AnyConstructor` are refused at the call), that the false branch keeps the declared type, and the `Object` and `Function` limit with the guards to use instead. Keep the example.
- **F2 (the proofs).** In `tests/src/core/validators.test.ts`, beside the runtime `isInstance` cases, add compile-time proofs in the idiom the file uses (`expectTypeOf(value).toEqualTypeOf<...>()` inside the guarded branch; `Expect<Equal<...>>` from `tests/setup.ts` where a hand-written type reads better): the true branch narrows `unknown` to `Date`, to an abstract class, to a class with required constructor arguments, and to a generic built-in (`Map`) at the exact type `InstanceType` gives; a declared `Base | null` narrows to `Derived` in the true branch and stays `Base | null` in the false branch; the parameter constraint refuses a non-constructor (`Expect<Equal<{} extends Parameters<typeof isInstance>[1] ? true : false, false>>` or the equivalent). Each compile-time proof has one runtime assertion beside it in the same case so the case is not empty at run time. In `tests/src/core/combinators.test.ts`, one compile-time proof that `instanceOf(Date)` and `isInstance(value, Date)` narrow `value` to the same type.
- **F3 (the guide).** In `guides/contract.md`, the `isInstance` row's Summary stays equal to the description paragraph (parity), and the `### Function & constructor guards` prose gains one sentence on the narrowing and the shared constraint with `instanceOf` if that section carries prose; where the row's Shape column reads `InstanceType<C>`, leave it. `npm run test:guides` proves the parity.

## Unknowns

1. Whether `expectTypeOf(value).toEqualTypeOf<Map<unknown, unknown>>()` or `Map<any, any>` is what `InstanceType<MapConstructor>` gives under this package's compiler settings: measure it and use the exact type, and report.
2. Whether the root `npm run check` project (`tsconfig.json`, which typechecks the tests) accepts a compile-time proof that uses `Parameters<typeof isInstance>[1]` on a generic function: measure and, where it does not, use the `instanceOf` parity proof form instead, and report.

## Scope

**Owned.** `src/core/validators.ts`, `tests/src/core/validators.test.ts`, `tests/src/core/combinators.test.ts`, `guides/contract.md` (the `isInstance` row and its section's prose). **Off-limits.** Every other file, `package.json`, `package-lock.json`, `README.md`, and the vendored files included. **Tools and limits.** `npm.cmd run check`, `npm.cmd run test:src`, `npm.cmd run test:guides`, `npm.cmd run build:src:core`, and `npx.cmd oxlint --config .oxlintrc.json --deny-warnings <owned files>` and `npx.cmd oxfmt --config .oxfmtrc.json --check <owned files>`; no install, no commit, no push, no discarding git command, no tree-wide `format` or `lint --fix`.

## Execution

**The Astra engine inside its CLI:** perform the assignment directly and spawn nothing; write only under the checkout and the system temporary directory.

## Output

Your final message is the report (the Orchestrator captures it from the exec's last-message file): per edit F1 to F3, what changed; the exact new signature and TSDoc; the answers to the Unknowns with the diagnostics you measured; the red-first record (the compile-time proofs against the published signature must fail `npm run check`: record that reading before F1, then the green reading after); the output of every acceptance command verbatim; `git status --short` and `git diff --stat`. No process diary.

## Deviation contract

Follow the deviation protocol in `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md` § Deviation protocol: report expected, found, evidence, done or not done, and one hypothesis; investigate nothing beyond it. Ancillary choices you settle yourself: the exact wording of the comment and the remark, the proof case titles, the placement of the compile-time assertions within the existing cases. Stop and report when the signature cannot compile with the body unchanged, when a runtime test turns red, when the guide parity needs a change outside the owned row and section, or when an off-limits file must change.

## Acceptance criteria

1. `npm run check` exits 0 (the root project and `check:src:core`).
2. `npx oxlint --config .oxlintrc.json --deny-warnings` and `npx oxfmt --config .oxfmtrc.json --check` over the four owned files exit 0.
3. `npm run test:src` passes every test (1350 at the baseline plus the new cases), the compile-time proofs among them.
4. `npm run test:guides` exits 0.
5. `npm run build:src:core` exits 0 and `dist/src/core/index.d.ts` declares `isInstance` with the new signature (quote the line).
6. The red-first reading: with the proofs in place and the signature unchanged, `npm run check` reports the narrowing diagnostics; record them.

## Review evidence

The actual diff and `git status --short`, captured by the Orchestrator as `isinstance-fix.diff` and `isinstance-fix-status.txt`, and the report.
