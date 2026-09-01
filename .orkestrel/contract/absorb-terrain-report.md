# Unit absorb-terrain — returned distillate

Question: Where does `@orkestrel/contract` allocate per-compile/per-instance heap, and what pins the bundle's observable eager surface?

Allocation map:
- `ContractCompiler` constructor (`/home/user/contract/src/core/ContractCompiler.ts:189-219`) allocates one instance per compile: `#stack`/`#emptyStack` (empty arrays, lines 192-193), `#nodes`/`#emptyNodes` (194-195), `#index`/`#emptyIndex` `WeakMap`s (196-197), `#order`/`#emptyOrder` (198-199), and the six per-node plan arrays `#schemas` (200-201), `#guards` (202-203), `#parsers` (204-205), `#audits` (206-207), `#reports` (208-209), `#seeds` (210-211).
- `#buildSchema` (586) fills `this.#schemas[index] = this.#schemaOf(index)` at 593, one closure per node.
- `#buildGuard` (743) fills `this.#guards[index] = ...` at 751.
- `#buildParser` (916) fills `this.#parsers[index] = this.#parserOf(index)` at 924; line 920 shows it eagerly triggers `#buildGuard()` when `#unions()` is true.
- `#buildAuditor` (1212) fills `this.#audits[index]` at 1220.
- `#buildReporter` (1478) fills `this.#reports[index]` at 1487; line 1482 also triggers `#buildGuard()` on union presence.
- `#buildGenerator` (1740) fills `this.#seeds[index]` at 1748; line 1744 also triggers `#buildGuard()` on union presence.
- `#buildContract` (1986-2007) is the eager point: calls all six `#build*` in fixed order (1991-1996), then `INTRINSICS.freeze` allocates one plain object with own keys `schema, is, parse, audit, explain, generate` (1997-2004), stored at `this.#bundle` (2005).
- `#collect` (347-352) releases the working set once every root exists (`#schema`…`#generator` all defined), calling `#release()` (351); `#release` (357-369) reassigns `#source`, `#stack`, `#nodes`, `#index`, `#order`, and all six plan arrays to their frozen-empty siblings, dropping the node graph and plan arrays but keeping the six built roots and the optional `#bundle`.

Pinned surface (each would go false under a lazy bundle):
- `/home/user/contract/tests/src/core/ContractCompiler.test.ts:94-99` — `expect(compiler.schema).toBe(compiler.schema)` … through `expect(compiler.generator).toBe(compiler.generator)`: pins per-root replay identity.
- `tests/src/core/ContractCompiler.test.ts:100` — `expect(compiler.contract).toBe(bundle)`: pins bundle replay identity.
- `tests/src/core/ContractCompiler.test.ts:102` — `expect(Object.keys(bundle)).toEqual(['schema', 'is', 'parse', 'audit', 'explain', 'generate'])`: pins own enumerable keys and their order.
- `tests/src/core/ContractCompiler.test.ts:103` — `expect(Object.isFrozen(bundle)).toBe(true)`: pins freeze.
- `tests/src/core/ContractCompiler.test.ts:104-109` — `expect(bundle.schema).toBe(compiler.schema)` through `expect(bundle.generate).toBe(compiler.generator)`: pins that the bundle holds the exact per-getter values (eager compile of all six, not lazy proxies).
- `tests/src/core/ContractCompiler.test.ts:181-182` — `expect(captureContractError(() => compiler.guard)).toBe(error)` and `... compiler.contract)).toBe(error)`: pins that a refusal at `schema` (172) replays identically through `contract`, meaning `contract` must reach the same eager failure point without new getter-order behavior.
- `tests/src/core/ContractCompiler.test.ts:47-56` — `Object.getOwnPropertyNames(ContractCompiler.prototype)).toEqual(['constructor','schema','guard','parser','auditor','reporter','generator','contract'])`: pins the getter set including `contract`.
- `guides/contract.md:953` — `compiler.contract.is === compiler.guard // true — the bundle holds these exact six values`: prose pin on bundle-member identity with the individual getters.
- `guides/contract.md:906` — `` `createContract` is the typed entry point — one shape in, the six lockstep outputs out, on a single object. `` and line 941 `` `createContract` is that class with all six requested `` pin eager production of all six artifacts.
- `guides/contract.md:349` (TSDoc-adjacent guide text on `ownShape`) and `src/core/ContractCompiler.ts:270-277` TSDoc — `` /** ... Own enumerable keys `schema`, `is`, `parse`, `audit`, `explain`, `generate`, in that order, each holding the exact value the corresponding getter publishes. */ `` pins own-key order and per-key identity with the getter.
- `src/core/ContractCompiler.ts:1989-1990` comment — `// Getter order, so a declaration that refuses refuses at the same artifact whether the caller reads the six one at a time or asks for the bundle.` pins getter-order-on-refusal (`schema` before `guard` before `parser`…) as an observable contract.
- `src/core/compilers.ts:349-352` TSDoc on `createContract` — `` All six artifacts are precompiled, so `audit`, `explain` and `generate` no longer re-walk and re-gate the declaration on every call the way they used to; `contract.audit` and `compileAuditor` are the same compiled function reached two ways. `` pins eager precompilation as documented behavior (a lazy bundle would move this).

Consumers: no in-repository site destructures, spreads, enumerates, or re-exports a contract bundle. Searched `tests/`, `src/`, `guides/` for `...contract`, `...bundle`, and `const { } = (contract|bundle|createContract)` — no matches. `Object.keys(bundle)` (test line 102 above) enumerates the bundle but only for the identity assertion, not as a consumption pattern.

Instrumentation: `package.json:69-70` — `"test:probe": "vitest run --config vite.config.ts --no-cache --reporter=verbose --project probe"` and `"test:bench": "vitest bench --config vite.config.ts --no-cache --project probe"`. `vite.config.ts:111-126` — the `probe` Vitest project comment (111-114) and its config: `include: ['tmp/probe/**/*.test.ts']` (120), `benchmark: { include: ['tmp/probe/**/*.test.ts', 'tests/**/*.test.ts'] }` (126) — so a bench block can live inside any file under `tests/**/*.test.ts`, not only `tmp/probe/`. No existing `bench` block was found under `tests/src/core/ContractCompiler.test.ts` in the excerpts read; a full-repository sweep for `bench(` under `tests/` was not run — record this as an unknown.

Unknowns:
- Whether any file under `tests/**/*.test.ts` already declares a Vitest `bench(...)` block against `ContractCompiler` or `createContract` (searched only the files listed above, not a `bench(` grep across the tree).
- The exact TSDoc block for `get contract()` beyond lines 270-277 (already read fully) is the complete pin; no further TSDoc elsewhere claims eagerness beyond what is quoted.

Deviation: none. The repository was readable throughout.
