# Unit voice-server — report

Every TSDoc first sentence under `src/` of `/home/user/fleet/server` now opens with a third-person
`-s` verb, and every boolean `@returns` reads `True if …; false otherwise`. The gate chain exits 0
at every step. The tree is uncommitted; `git status --short` lists only files under `src/`.

## Counts by kind

| Kind                                            | Blocks |
| ----------------------------------------------- | ------ |
| First sentence from the imperative               | 39     |
| First sentence given a verb (verbless opener)    | 45     |
| First sentence reworded to drop the symbol's name | 0     |
| Boolean `@returns` rewritten                     | 10     |

First sentences rewritten: 84. The boolean `@returns` rewrites all sit in blocks whose first
sentence was also rewritten.

These are linguistic classifications. They reconcile with the launch instrument's buckets
(`imperative=43`, `verbless=42`) as follows: `voice-scan.mjs` reads the first word alone, so it
bucketed `Must be a SINGLE-LINE value …` (2 blocks), `Content negotiation over …` (1), and
`Rank + quality of one candidate …` (1) as imperative where they carry no imperative verb —
39 + 4 = 43. Its verbless bucket holds the other 41 rewritten blocks plus the untouched
`@remarks`-only block described under Observations — 41 + 1 = 42.

## Files touched

- `/home/user/fleet/server/src/server/constants.ts` — 8 constant descriptions given a verb
  (`Names`, `Holds`, `Defines`, `Lists`); `DEFAULT_DRAIN_MS` becomes a wrapped block because the
  one-line form crosses 100 columns.
- `/home/user/fleet/server/src/server/errors.ts` — `HTTPError`, `ContentTooLargeError`, and
  `ServerError` open with `Represents`; `isHTTPError` opens with `Narrows` and its boolean
  `@returns` is rewritten.
- `/home/user/fleet/server/src/server/factories.ts` — `createNegotiator` and `createServer` open
  with `Creates`.
- `/home/user/fleet/server/src/server/helpers.ts` — 26 imperative openers moved to third person,
  7 `Whether …` openers moved to `Checks whether …`, `matchMediaType` given `Reports the rank +
  quality of …`, and 7 boolean `@returns` rewritten.
- `/home/user/fleet/server/src/server/types.ts` — 23 noun-phrase openers given a verb
  (`Represents`, `Holds`, `Reports whether`, `Requires`), 10 interface-member openers moved from
  the imperative, and 2 boolean `@returns` rewritten.
- `/home/user/fleet/server/src/server/Negotiator.ts` — class description opens with `Represents`.
- `/home/user/fleet/server/src/server/Server.ts` — class description opens with `Represents`.
- `/home/user/fleet/server/src/server/Stream.ts` — class description opens with `Represents`.

`app/` does not exist in this checkout.

## Gates

| Command                | Exit | Result                                                              |
| ---------------------- | ---- | ------------------------------------------------------------------- |
| `npm run format:check` | 0    | All matched files use the correct format (51 files)                  |
| `npm run lint:check`   | 0    | No diagnostic                                                        |
| `npm run check`        | 0    | Root project and `configs/src/tsconfig.server.json` both clean       |
| `npm run build`        | 0    | `dist/src/server/index.cjs` 88.25 kB, declarations copied            |
| `npm test`             | 0    | src 258 passed / 1 skipped, policy 111, config 46, setup 14, guides 28 |

No failure excerpt: no gate failed. The mutating `lint` and `format` scripts were not needed —
`format:check` passed on the first run.

`npm test` timing is an observation, not a criterion: the run above happened inside this unit's
own exec.

## Evidence

- `/home/user/scaffold/tmp/units/voice/voice-server.diff` (854 lines, 8 files, 107 insertions,
  104 deletions)
- `/home/user/scaffold/tmp/units/voice/voice-server.status` (8 modified files, all under
  `src/server/`)

Checks run against the diff:

- Every changed line is a comment line: `git diff -U0` filtered to added and removed lines that do
  not start with `*`, `/**`, or `*/` returns nothing.
- No `@param`, `@example`, `@remarks`, `@throws`, or `@typeParam` line changed: 0 hits.
- Backticked tokens removed versus added differ only by 10 `` `true` `` and 2 `` `false` ``, the
  drops the boolean `@returns` rewrite makes by design.
- `voice-scan.mjs` after the sweep: `files=9 blocks=105 imperative=0 verbless=1 returnsBad=0`.

## Observations

- The one remaining `verbless` hit is `src/server/Negotiator.ts:71`, a member block that carries
  only `@remarks` and no description sentence. There is no first sentence to rewrite, so the block
  is untouched.
- Two first sentences opened with an adverb (`Recursively STRIP …`, `Transparently decompress …`).
  Both were moved to third person and the adverb was moved off the front, so the instrument reads
  the verb first: `Strips the prototype-pollution keys from a parsed value IN PLACE, recursively.`
  and `Decompresses an already-collected … byte sequence transparently …`. Every word is preserved.
- Three first sentences keep a word that also spells their symbol: `ServerInterface.address`
  ("the bound listener address"), `NegotiatorInterface.language` ("an `Accept-Language` header"),
  and `StreamInterface.comment` ("a `: text` SSE comment line"). Each is the domain term for the
  value, which the wave's standing conditions keep. `ServerInterface.stop` opens `Stops
  gracefully`, the third-person form of its own verb.

## Deviations

none.
