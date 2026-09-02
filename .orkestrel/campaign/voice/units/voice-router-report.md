# Unit voice-router — report

Every TSDoc block under `src/` of `/home/user/fleet/router` now opens with a third-person `-s` verb
sentence, and the one boolean `@returns` reads `True if …; false otherwise`. The gate chain exits 0
at every step. The tree carries no `app/` directory, so the sweep covered `src/` alone.

## Blocks rewritten, by kind

- First sentence from the imperative: 22
- First sentence given a verb (bare noun phrase): 35
- First sentence reworded to drop the symbol's name: 0
- Boolean `@returns`: 1

61 blocks were scanned. 57 were rewritten; 4 already satisfied the rule (`METHOD_LIST`,
`parseMethod`, `PathParams`, `StateFunction`).

## Files touched

Each entry lists the file and the blocks it changed.

- `/home/user/fleet/router/src/browser/Navigator.ts` — the `Navigator` class block.
- `/home/user/fleet/router/src/browser/factories.ts` — `createNavigator`.
- `/home/user/fleet/router/src/browser/helpers.ts` — `computeNavigationKey`, `extractHashPath`,
  `resolveLocationPath`, `findAnchor`.
- `/home/user/fleet/router/src/browser/types.ts` — `NavigatorEventMap`, `NavigatorOptions`,
  `NavigatorInterface`.
- `/home/user/fleet/router/src/core/DispatchGroup.ts` — the `DispatchGroup` class block.
- `/home/user/fleet/router/src/core/Dispatcher.ts` — the `Dispatcher` class block.
- `/home/user/fleet/router/src/core/Group.ts` — the `Group` class block.
- `/home/user/fleet/router/src/core/Router.ts` — the `Router` class block.
- `/home/user/fleet/router/src/core/constants.ts` — `METHODS`, `TIER_LITERAL`, `TIER_PARAM`,
  `TIER_WILDCARD`.
- `/home/user/fleet/router/src/core/factories.ts` — `createRouter`, `createDispatcher`.
- `/home/user/fleet/router/src/core/helpers.ts` — `escapeRegExp`, `canonicalizePath`,
  `computeDispatchKey`, `compilePath`, `decodeParam`, `matchPath`, `classifySegment`,
  `computeSpecificity`, `compareSpecificity`, `joinPaths`, `route`.
- `/home/user/fleet/router/src/core/types.ts` — `IdentifierStartChar`, `IdentifierChar`,
  `PathParamsRaw`, `CompiledPath`, `RouteEntry`, `RouterMatch`, `AnswerHandler`, `RouterOptions`,
  `RouterInterface`, `GroupInterface`, `Method`, `RouteContext`, `RouteHandler`, `RouteInput`,
  `RouteRecord`, `DispatchResult`, `DispatcherEventMap`, `DispatcherOptions`, `DispatcherInterface`,
  `DispatchGroupInterface`.
- `/home/user/fleet/router/src/server/handlers.ts` — `handleListenerRequest`, `createListener`.
- `/home/user/fleet/router/src/server/helpers.ts` — `buildRequest`, `sendResponse`.
- `/home/user/fleet/router/src/server/types.ts` — `RequestOptions`, `ListenerFunction`.
- `/home/user/fleet/router/src/server/validators.ts` — `isEncryptedSocket` (first sentence and the
  boolean `@returns`).

## Gates

Each command ran from `/home/user/fleet/router`.

| Command                | Exit | Excerpt                                                         |
| ---------------------- | ---- | --------------------------------------------------------------- |
| `npm run format:check` | 0    | `All matched files use the correct format.` (73 files)          |
| `npm run lint:check`   | 0    | No diagnostic reported                                          |
| `npm run check`        | 0    | Root project plus the core, browser, and server scoped projects |
| `npm run build`        | 0    | `✓ built in 2.14s` for the last of the three builds             |
| `npm test`             | 0    | Every project passed; the guides project reported 28 passed     |

No mutating `lint` or `format` run was needed: `format:check` passed on the first attempt.

## Evidence

- `/home/user/scaffold/tmp/units/voice/voice-router.diff` — 591 lines, 62 insertions and 62
  deletions across 16 files, every changed line a `*` comment line.
- `/home/user/scaffold/tmp/units/voice/voice-router.status` — 16 modified files, all under `src/`.

## Wording decisions

- A class or an interface whose first sentence was a bare noun phrase takes `Represents …`, matching
  the landed `@orkestrel/timeout` unit.
- A constant takes the verb its value calls for: `Holds` for the `METHODS` set, `Names` for each
  `TIER_*` tier and for the `Method` and identifier-character unions.
- Where the first sentence coordinated a second imperative verb after an em dash, a colon, or an
  `and`, that verb moved to the `-s` form too, so the sentence keeps one voice: `strip` → `strips`
  in `extractHashPath` and `canonicalizePath`, `write` → `writes` in `handleListenerRequest`, and
  `convert`/`hand`/`write` → `converts`/`hands`/`writes` in the `createListener` colon list.
- `route` in `src/core/helpers.ts` took `Provides an identity pass-through …`, which keeps the
  original noun phrase and every referent the trailing `so …` clause depends on.
- The boolean `@returns` on `isEncryptedSocket` keeps its `undefined` case, reading
  "True if `socket` carries a truthy `encrypted` property (a `tls.TLSSocket`); false otherwise,
  including for `undefined`".

## Observation on the acceptance instrument

`voice-scan.mjs` still reports `verbless=1` for this package, at
`src/core/helpers.ts:165` — `URL-decodes one captured param value, …`. The sentence satisfies the
rule; the classifier's `THIRD` pattern is `[A-Z][a-z]+(?:-[a-z]+)*s`, which requires a lowercase
letter after the leading capital, so an all-caps initialism such as `URL` cannot match it. The
rewrite is the wave's ruled imperative transform (`URL-decode` → `URL-decodes`), so the block was
left as written rather than reworded to fit the pattern. Expect
`imperative=0 verbless=1 returnsBad=0` from the acceptance run.

## Deviations

none.
