# Fix dossier: router

Verified fix-producing findings for the `router` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s15-01 — DRIFT

1. package=router file=`/home/user/fleet/router/src/core/helpers.ts:363` rule=`.claude/rules/architecture.md` § Centralized-file pattern / § Kind purity verdict=CONFIRMED
   wrong: `parseMethod(value: string): Method | undefined` is a coercer — the exact `parse*` form the rules define as "coercion producing `T | undefined`" — but it sits in `helpers.ts`, and the kind table places coercers in `*/parsers.ts`.
   repair: create `/home/user/fleet/router/src/core/parsers.ts`, move `parseMethod` there unchanged, add `export * from './parsers.js'` to `src/core/index.ts`, and update the import at `Dispatcher.ts:19`. This is the "wrong file, right name → move it" repair; the barrel star-export keeps the published surface identical.

## s15-02 — DRIFT-RESHAPE

2. package=router file=`/home/user/fleet/router/src/core/helpers.ts:364-374` rule=`.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
   wrong: `parseMethod` re-lists the seven registrable HTTP methods as a chain of `===` comparisons, duplicating `METHODS` at `constants.ts:24`; adding a method to `METHODS` silently leaves `parseMethod` unable to narrow it, and `Dispatcher.handle` then reports a registrable verb as `miss`.
   repair: declare `export const METHODS: ReadonlySet<Method>` in `constants.ts:24` (the widened `ReadonlySet<string>` is what forced the duplicate), then implement `parseMethod` by consulting `METHODS` so the method set has one home.

### Verification

**Lane DRIFT-RESHAPE/high:** amend: put one frozen `as const` tuple of the seven verbs in `constants.ts`, derive `export type Method = (typeof METHODS_LIST)[number]` in `types.ts`, keep the published `METHODS: ReadonlySet<string>` built from that tuple so `has(string)` and the documented `METHODS.has('TRACE')` example still compile, and implement `parseMethod` as `isMethod(value) ? value : undefined` over `literalOf(METHODS_LIST)` from the already-declared `@orkestrel/contract`.

**Lane DRIFT-RESHAPE/high:** amend: declare the method set in constants.ts as a frozen ordered tuple — `export const METHODS: readonly Method[] = Object.freeze(['GET','POST','PUT','PATCH','DELETE','HEAD','OPTIONS'] as const)` — implement `parseMethod` as `METHODS.find((method) => method === value)`, and route Dispatcher.ts:147's registration check through `parseMethod(input.method) === undefined` so the set has exactly one home. Keep `[...METHODS].join(', ')` at Dispatcher.ts:149 and the `Allow` derivation working off the same tuple.

## s15-03 — DRIFT

3. package=router file=`/home/user/fleet/router/src/server/helpers.ts:32` rule=`.claude/rules/architecture.md` § Centralized-file pattern (Guards → `*/validators.ts`) verdict=CONFIRMED
   wrong: `isEncryptedSocket(socket: unknown): socket is { readonly encrypted: true }` is a total type guard — not the `isVacant`-style bare predicate the rule exempts — but it lives in `helpers.ts`.
   repair: create `/home/user/fleet/router/src/server/validators.ts`, move the function there, add `export * from './validators.js'` to `src/server/index.ts`, and import it at `helpers.ts:81`.

## s15-04 — DRIFT-RESHAPE

4. package=router file=`/home/user/fleet/router/src/server/helpers.ts:218,271` rule=`.claude/rules/architecture.md` § Centralized-file pattern / § Kind purity verdict=CONFIRMED
   wrong: `src/server/helpers.ts` mixes four kinds in one file — a guard (line 32), two conversion leaves (78, 157), a request handler `handleListenerRequest` (218), and a value factory `createListener` (271) that returns a `ListenerFunction` closure over a dispatcher. `handlers.ts` owns request handlers and `factories.ts` owns value factories.
   repair: move `handleListenerRequest` to `/home/user/fleet/router/src/server/handlers.ts` and `createListener` to `/home/user/fleet/router/src/server/factories.ts`, leave `buildRequest` and `sendResponse` in `helpers.ts`, and add both barrel rows to `src/server/index.ts`.

### Verification

**Lane DRIFT-RESHAPE/medium:** amend: move `handleListenerRequest` AND `createListener` together into `/home/user/fleet/router/src/server/handlers.ts`, move `isEncryptedSocket` to `validators.ts` per s15-03, leave `buildRequest` and `sendResponse` in `helpers.ts`, and add one `handlers.js` and one `validators.js` row to `src/server/index.ts`.

**Lane DRIFT-RESHAPE/medium:** amend: create `/home/user/fleet/router/src/server/handlers.ts` and move BOTH `handleListenerRequest` and `createListener` into it, leave `isEncryptedSocket` to validators.ts (s15-03) and `buildRequest`/`sendResponse` in `helpers.ts`, and add one `export * from './handlers.js'` row to `src/server/index.ts`. Do not create a `factories.ts` in this environment.

## s15-05 — DRIFT

5. package=router file=`/home/user/fleet/router/src/core/Dispatcher.ts:61` rule=`.claude/rules/architecture.md` § Class order verdict=CONFIRMED
   wrong: the child `Router` is held as a public assignable field `readonly router: RouterInterface<...>`, while the sibling child `#emitter` (line 62) correctly uses a `#` field plus a getter (line 83). The rule is "Store child managers in `#` fields and expose readonly getters typed as their interfaces", and `Navigator` already does it that way at `browser/Navigator.ts:59,109`.
   repair: rename the field to `#router`, assign it in the constructor, and add `get router(): RouterInterface<RouteRecord<TState>> { return this.#router }` after the `emitter` getter; update the four internal uses at lines 70, 99, 102, 152, 166.

## s15-06 — DRIFT

6. package=router file=`/home/user/fleet/router/src/core/helpers.ts:13,37,65,85,166,195,233,268,303,342,378`; `core/factories.ts:11,38`; `browser/helpers.ts:11,31,60,103`; `browser/factories.ts:5`; `server/helpers.ts:16,37,126,195,239` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
   wrong: every exported function's TSDoc opens with a bare imperative ("Escape", "Canonicalize", "Compute", "Compile", "Create", "Determine", "Build", "Write", "Handle", "Join", "Narrow", "Classify", "Compare", "Extract", "Resolve", "Find"). The rule requires the first sentence to state what the symbol does in the third person with an `-s` verb. `/home/user/fleet/lsp/src/core/helpers.ts:8,46,74,108,136,274,318` is the compliant form in the same fleet, and `/home/user/fleet/router/guides/router.md:72,79` already writes the guide cells the other way.
   repair: rewrite each first sentence in `-s` form — "Escapes every regex metacharacter…", "Creates a `RouterInterface`…", "Narrows a raw `request.method` string…".

