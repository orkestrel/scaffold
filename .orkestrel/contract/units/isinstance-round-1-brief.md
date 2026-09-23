# CONTRACT-ISINSTANCE — round 1 brief: read, refute, sweep (2026-09-23)

## Objective

Settle, before the fix unit is briefed, whether the candidate `isInstance` signature is the right one and what the fix must touch: the `@orkestrel/contract` package (`C:/Users/mikes/WebstormProjects/contract`, version 0.0.17, `main` clean at `743e4a3`) declares

```ts
export function isInstance<C>(value: unknown, ctor: C): value is InstanceType<C & AnyConstructor<object>>
```

(`src/core/validators.ts` around line 387, `AnyConstructor<T> = new (...args: unknown[]) => T` in `src/core/types.ts`), and its guide row (`guides/contract.md` around line 126) says the return narrows to `InstanceType<C>`. The Orchestrator's probe (`C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/contract-isinstance-probe.ts`, run with TypeScript 6.0.3 through the Veneer checkout) shows the published signature narrowing `Element | null` to `Element` alone (`TS2740` when the narrowed value is assigned to `HTMLElement`), and the candidate

```ts
export function isInstance<C extends abstract new (...args: never) => object>(value: unknown, ctor: C): value is InstanceType<C>
```

narrowing to `HTMLElement`, to an abstract class, to a class with required constructor arguments, and to `Date`, and refusing a non-constructor argument at the call (`TS2345`). The package's own `instanceOf` combinator (`src/core/combinators.ts` around line 260) already carries that constraint and calls `isInstance(value, ctor)` after `isConstructor(ctor)`.

## The nodes

- **Read** (`grok`, the Cursor bench; falls back down the tedious-work ladder): distill, with `file:line` pointers, everything in the contract repository the fix must touch or respect: the `isInstance` declaration and its internal comment about `holds` and `isFunction`; every test that names `isInstance` in `tests/src/core/validators.test.ts` and `tests/src/core/combinators.test.ts`; the compile-time assertion idiom `tests/setup.ts` provides around line 3397 to 3420 (the `expectTypeOf` oracle and the "fails to typecheck unless `T` is exactly `true`" helper) and one example of each in use; the guide's `isInstance` row and any prose naming it (`guides/contract.md`), the README's mentions; the package's gate scripts (`package.json` `scripts`) and the release preparation the last three commits performed (`252488e`, `89a8f1b`, `743e4a3`: which files a release bump touches); `ROADMAP.md` if present. Return the distillate, never a design.
- **Refute** (three native refuters on Opus 5.5, each blind to the others, each with one lens; each writes its scratch probes only under the scratchpad directory named above and runs them with the exact command the Orchestrator used: `cd C:/Users/mikes/WebstormProjects/veneer && npx tsc --ignoreConfig --noEmit --strict --exactOptionalPropertyTypes --lib ESNext,DOM --target ESNext --module preserve --moduleResolution bundler --allowImportingTsExtensions <probe>`; the published `isInstance` and `instanceOf` import from `C:/Users/mikes/WebstormProjects/veneer/node_modules/@orkestrel/contract/dist/src/core/index.js`; the candidate is declared locally in the probe as the brief shows): try to refute the claim "the candidate signature narrows `value` to `InstanceType<C>` for every constructor a caller can pass, refuses every non-constructor at the call, and changes no runtime behaviour":
  - lens A, the compiler's semantics: why the published intersection collapses (which construct signature `InstanceType`'s `infer` picks over an intersection), and whether any constructor shape (a class with a private constructor, a generic class, a mixin factory's return, `Function`, `Object`, `Proxy`, a constructor typed `new (...args: any[]) => unknown`) narrows wrongly or fails the constraint under the candidate;
  - lens B, the callers: the fleet's call sites (the Orchestrator's sweep found every one wrapped in an explicit `value is X` predicate or a boolean context: `agent`, `brief`, `browser`, `console`, `csv`, `database`, `form`, `guide` (`isInstance(root, URL) ? fileURLToPath(root) : root`), `indexeddb`, `interpret`, `mcp`, `middleware` (`isInstance(state, Map)`), `msg`, `pool`, `program`, `qualifier`, `queue`, `rater`, `reason`, `relation`, `scaffold`, `sea`, `server`, and the contract's own `isDate`, `isError`, `isPromise`, and `instanceOf`); name any caller the new constraint or the new narrowing breaks, with a probe;
  - lens C, the package's own contract: whether the guide row, the README, the `Guard` type, `isConstructor`, and `instanceOf`'s documented relation to `isInstance` stay true under the candidate, and whether a stronger form exists (for example narrowing `value` from its declared type rather than from `unknown`, or accepting `AnyConstructor` shapes the constraint refuses); state the strongest candidate you can defend and the probe that defends it.
  Each refuter returns: the probes it ran with their diagnostics verbatim, the refutation it found or "none", and the one sentence it would change in the candidate.
- **Sweep** (`scout` on Sonnet): for each fleet call site the Orchestrator's sweep lists, quote the enclosing statement and classify it: explicit predicate wrapper, boolean context, or direct narrowing relied on; name any site outside those three.

## Output

Each node returns its result as text to the workflow; the Orchestrator writes the round's synthesis to `isinstance-round-1-synthesis.md` beside this brief and briefs the fix unit from it.
