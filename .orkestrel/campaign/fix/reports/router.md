# Fix report: router

## Dispositions

- **s15-01** applied (src/core/parsers.ts, src/core/helpers.ts, src/core/index.ts, src/core/Dispatcher.ts, tests/src/core/parsers.test.ts, tests/src/core/helpers.test.ts, guides/router.md): Re-verified: parseMethod still sat in src/core/helpers.ts. Created src/core/parsers.ts, moved parseMethod there, added `export * from './parsers.js'` to src/core/index.ts, and split Dispatcher.ts's import so computeDispatchKey comes from helpers.js and parseMethod from parsers.js. The barrel star-export keeps the published name and signature identical (dist/src/core/index.d.ts still declares `parseMethod(value: string): Method | undefined`). Moved the parseMethod describe block from tests/src/core/helpers.test.ts to a new tests/src/core/parsers.test.ts so the test mirrors the module it proves, and added the matching guide Tests row.
- **s15-02** applied (src/core/constants.ts, src/core/types.ts, src/core/parsers.ts, tests/src/core/parsers.test.ts, guides/router.md): Re-verified: parseMethod still re-listed the seven verbs as an === chain against METHODS at constants.ts. Applied what both lane corrections share — one frozen ordered tuple in constants.ts as the single home, with parseMethod derived from it. Declared `export const METHOD_LIST = Object.freeze([...] as const)`, derived `export type Method = (typeof METHOD_LIST)[number]` in types.ts, and rebuilt `METHODS` as `Object.freeze(new Set<string>(METHOD_LIST))`. The lanes conflict on METHODS's own type: lane B's `readonly Method[]` removes `.has` from a published const and breaks the documented `METHODS.has('TRACE')` example, so the breaking test defers that half and lane A's shape (METHODS stays ReadonlySet<string>) is what landed. Two ancillary choices, both mine: named the tuple METHOD_LIST rather than lane A's METHODS_LIST, because names.md fixes the constant form as {QUALIFIER}_{NOUN}; and implemented the body as `METHOD_LIST.find((method) => method === value)` (lane B's body) rather than lane A's `literalOf(METHOD_LIST)` guard, because find needs no per-call guard allocation and no added import while reaching the same single home. Did not route Dispatcher's registration check through parseMethod (lane B only, not shared) — METHODS is now derived from METHOD_LIST, so `METHODS.has` and `[...METHODS].join(', ')` consult that same home and no duplicate remains. METHOD_LIST is an additive export: added its Constants row to guides/router.md and a test pinning that parseMethod accepts exactly the verbs METHOD_LIST declares.
- **s15-03** applied (src/server/validators.ts, src/server/helpers.ts, src/server/index.ts, tests/src/server/validators.test.ts, tests/src/server/helpers.test.ts, guides/router.md): Re-verified: isEncryptedSocket still sat in src/server/helpers.ts. Created src/server/validators.ts, moved the guard there verbatim (its TSDoc first sentence is untouched, since the voice fix is s15-06's deferred wave), added `export * from './validators.js'` to src/server/index.ts, and imported it into helpers.ts for buildRequest's scheme derivation. Moved its describe block to tests/src/server/validators.test.ts and added the guide Tests row.
- **s15-04** applied (src/server/handlers.ts, src/server/helpers.ts, src/server/index.ts, tests/src/server/handlers.test.ts, tests/src/server/helpers.test.ts, guides/router.md): Re-verified: helpers.ts still mixed the kinds. Applied the shared lane correction rather than the finding's original repair line: created src/server/handlers.ts holding BOTH handleListenerRequest and createListener, left buildRequest and sendResponse in helpers.ts, created no factories.ts, and added one `export * from './handlers.js'` barrel row. Both functions moved verbatim. helpers.ts's header comment lost its stale 'no listener ownership beyond the handler function createListener returns' clause because that function no longer lives there. Moved the two describe blocks to tests/src/server/handlers.test.ts; helpers.test.ts still imports createListener from handlers.js as the driver for its response-side disconnect test.
- **s15-05** applied (src/core/Dispatcher.ts): Re-verified: `readonly router` was still a public assignable field at Dispatcher.ts:61 while #emitter used the field-plus-getter shape. Renamed the field to #router, assigned it in the constructor, and added `get router(): RouterInterface<RouteRecord<TState>>` ahead of the emitter getter, matching Navigator. Updated all four internal uses (match, the HEAD fallback match, #register's add, #allow's entries). The published type is unmoved: DispatcherInterface still declares `readonly router: RouterInterface<RouteRecord<TState>>` and the emitted class declaration satisfies it as a getter, so no consumer-visible signature changes.
- **s15-06** deferred_wave (none): The finding's only repair is rewriting each exported function's TSDoc first sentence from a bare imperative into the -s third-person form. The fleet ruling puts that in a later dedicated wave, so nothing was applied here. The imperative first sentences of every function I moved (isEncryptedSocket, handleListenerRequest, createListener) were carried across verbatim so the wave still finds them. The TSDoc I did write or rewrite for another reason uses the third-person form: METHOD_LIST ('Lists the HTTP methods…'), the rewritten METHODS and Method remarks, and parseMethod ('Narrows a raw request.method string…'), whose remarks had to change anyway because its implementation changed under s15-02.

## Gates

- npm run format:check: pass — All matched files use the correct format.
Finished in 1953ms on 73 files using 4 threads.
- npm run lint:check: pass — oxlint --config .oxlintrc.json --deny-warnings . — no output, exit 0
- npm run check: pass — tsc --noEmit --project tsconfig.json, then check:src:core, check:src:browser, check:src:server — all clean, exit 0
- npm run build: pass — ✓ built in 2.11s / ✓ built in 1.83s / ✓ built in 2.45s; Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts
- npm test: pass — src: Test Files 13 passed (13), Tests 258 passed (258); policy: 111 passed; config: 46 passed; setup: 9 passed; guides: 28 passed
- npm run test:distribution (observation, outside the required chain): pass — Test Files 1 passed (1), Tests 11 passed | 4 skipped (15) — run because the applied changes reach src/ and so the packed dist/

## Diffstat

```text
 guides/router.md                 |  86 +++++++++++++--------
 src/core/Dispatcher.ts           |  19 +++--
 src/core/constants.ts            |  43 +++++++++--
 src/core/helpers.ts              |  36 ---------
 src/core/index.ts                |   1 +
 src/core/types.ts                |  16 ++--
 src/server/helpers.ts            | 119 ++---------------------------
 src/server/index.ts              |   2 +
 tests/src/core/helpers.test.ts   |  21 -----
 tests/src/server/helpers.test.ts | 160 ++-------------------------------------
 10 files changed, 129 insertions(+), 374 deletions(-)

Untracked (new files, not counted above; `git status --short`):
?? src/core/parsers.ts            (35 lines)
?? src/server/handlers.ts         (97 lines)
?? src/server/validators.ts       (28 lines)
?? tests/src/core/parsers.test.ts (32 lines)
?? tests/src/server/handlers.test.ts (135 lines)
?? tests/src/server/validators.test.ts (22 lines)
```

- dist moves: true

## Deviations

Three items, none of which stopped a unit.

1. Lane conflict on s15-02, resolved by the breaking test rather than escalated. Lane one keeps the published `METHODS` as `ReadonlySet<string>` built from a new tuple; lane two replaces it with `readonly Method[]`. Those cannot both hold. Lane two's shape removes `.has` from a published const and falsifies the `METHODS.has('TRACE')` example the constant's own TSDoc and the guide carry, so it fails the brief's breaking test and is deferred; lane one's shape landed. The part the lanes share — one frozen ordered tuple as the single home, with `parseMethod` derived from it — landed whole.

2. Test files split to mirror the new source modules. The brief allows creating tests where a repair requires it. Moving `parseMethod`, `isEncryptedSocket`, `handleListenerRequest`, and `createListener` out of their `helpers.ts` files left their proofs in a test file named for a module that no longer declares them, so the describe blocks moved verbatim into `tests/src/core/parsers.test.ts`, `tests/src/server/validators.test.ts`, and `tests/src/server/handlers.test.ts`. No assertion was added, removed, or edited in the move; the one added assertion is the `METHOD_LIST` membership pin named in s15-02's disposition. The mechanical mirror rule in `tests/setupPolicy.ts` is one-directional and would have passed either way.

3. The guide's `### Helpers` table split into `### Helpers`, `### Parsers`, `### Guards`, and `### Handlers`. The single table listed every function across all three faces, so after the moves it grouped a coercer, a guard, and two request handlers under a helpers heading. Every row moved verbatim; no summary text changed. This is a guide content change inside the owned scope, and the guides project still passes.

No repair needed an off-limits file, and `git status --short` lists no file outside `src/`, `tests/`, and `guides/router.md`. The tree is uncommitted and nothing is staged.
