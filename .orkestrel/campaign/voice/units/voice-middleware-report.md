# Unit voice-middleware — report

Every TSDoc block under `src/` of `@orkestrel/middleware` now opens with a third-person `-s` verb,
and every boolean `@returns` reads `True if …; false otherwise`. The gate chain exits 0 at every
step. No deviation.

## Blocks rewritten by kind

| Kind | Count |
| ---- | ----- |
| First sentence from the imperative | 42 |
| First sentence given a verb (bare noun phrase) | 121 |
| First sentence reworded to drop the symbol's name | 0 |
| Boolean `@returns` | 16 |

Total changed comment lines: 179 (163 first-sentence openers + 16 `@returns`), matching the
diffstat's 179 insertions and 179 deletions.

The launch population measured 138 blocks the `voice-scan.mjs` classifier flagged (imperative 47,
verbless 91 by my own run of the same regexes over `git archive HEAD src`). Reading every block
found 25 more the classifier admitted as third person because its `THIRD` pattern accepts any
capitalized word ending in `s`: the `Options for …` openers, the `Compress …` openers,
`Security-headers + request-identifier battery.`, `Cross-Origin Resource Sharing battery.`, and
`Windows reserved device-name stems …`. Every one of them was rewritten. The per-kind table rules each block
by reading rather than by its bucket, so noun-phrase openers the classifier bucketed as imperative
(`Bearer-token authentication battery.`, `Per-category size/count caps …`, and their siblings) count
as verbless.

Two blocks name their own symbol inside the first sentence and were left as they are, because
neither repeats the name as its description:

- `src/core/shapers.ts` — `sessionColumns` appears inside the usage snippet
  `` `createDatabase({ tables: { sessions: sessionColumns } })` ``. Dropping the token would break
  the snippet, and the wave keeps every code token.
- `src/server/middlewares.ts` — the node face's `createCompression` first sentence names the core
  face's `createCompression` as its sibling. That is a cross-reference to a different symbol.

## Verb choices

- Factory and helper functions take the third-person form of their own verb (`Creates`, `Builds`,
  `Resolves`, `Parses`, `Serves`, `Narrows`).
- Battery factories whose sentence was a bare noun phrase take `Creates the … battery`.
- Guard predicates take `Checks whether` or `Determines whether`.
- Value constants take `Holds`, name-valued constants `Names`, collection constants `Lists`.
- Interfaces and type aliases take `Describes` for a shape, `Represents` for an entity or a record,
  `Names` for a literal union, `Implements` for a class implementing a named interface, and
  `Configures` for an options bag (`Options for \`createX\` — …` → `Configures \`createX\` — …`).

## Files touched

- `/home/user/fleet/middleware/src/core/Session.ts` — class opener gains `Represents`.
- `/home/user/fleet/middleware/src/core/constants.ts` — constant openers gain `Holds`, `Names`, or `Lists`.
- `/home/user/fleet/middleware/src/core/factories.ts` — `Create` openers become `Creates`.
- `/home/user/fleet/middleware/src/core/helpers.ts` — openers to third person, and the trusted-hop, buffering, negotiation, preflight, constant-time, and expiry boolean `@returns`.
- `/home/user/fleet/middleware/src/core/middlewares.ts` — battery openers gain `Creates` or `Scopes`.
- `/home/user/fleet/middleware/src/core/shapers.ts` — constant opener gains `Holds`.
- `/home/user/fleet/middleware/src/core/stores/DatabaseSessionStore.ts` — class opener gains `Implements`.
- `/home/user/fleet/middleware/src/core/stores/MemorySessionStore.ts` — class opener gains `Implements`.
- `/home/user/fleet/middleware/src/core/types.ts` — type openers gain `Describes`, `Represents`, or `Configures`.
- `/home/user/fleet/middleware/src/core/validators.ts` — every `Determine` opener becomes `Determines`, and every guard's boolean `@returns` is rewritten.
- `/home/user/fleet/middleware/src/server/constants.ts` — constant openers gain `Holds`, `Names`, or `Lists`.
- `/home/user/fleet/middleware/src/server/errors.ts` — the class opener gains `Represents`, the guard becomes `Narrows`, and its boolean `@returns` is rewritten.
- `/home/user/fleet/middleware/src/server/helpers.ts` — openers to third person, and the under-path, containment, reserved-device, dotfile, and signature boolean `@returns`.
- `/home/user/fleet/middleware/src/server/middlewares.ts` — openers become `Serves`, `Parses`, and `Compresses`.
- `/home/user/fleet/middleware/src/server/types.ts` — type openers gain `Describes`, `Names`, `Configures`, or `Reads`.

## Gates

Run from `/home/user/fleet/middleware` on 2026-09-02, in order.

| Command | Exit | Excerpt |
| ------- | ---- | ------- |
| `npm run format:check` | 0 | `All matched files use the correct format.` (66 files) |
| `npm run lint:check` | 0 | no output |
| `npm run check` | 0 | `tsc --noEmit` for the root, `configs/src/tsconfig.core.json`, and `configs/src/tsconfig.server.json` |
| `npm run build` | 0 | `dist/src/server/index.cjs 55.29 kB`, `Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts` |
| `npm test` | 0 | `test:config` 46 passed, `test:setup` 23 passed, `test:guides` 38 passed; `test:src` and `test:policy` passed earlier in the same chain |

`npm test` is an observation for timing, per the brief; the Orchestrator's landing chain is the
authoritative run. `npm run lint` and `npm run format` were not needed: `format:check` passed on the
first attempt.

## Acceptance evidence

- Diff: `/home/user/scaffold/tmp/units/voice/voice-middleware.diff` (1477 lines).
- Status: `/home/user/scaffold/tmp/units/voice/voice-middleware.status` (15 files, all under `src/`).
- `git diff -U0` changed lines all match `^[+-]\s*(/\*\*|\*)`, so no non-comment token moved.
- The only block tag in the diff is `@returns`, 16 added lines. No `@param`, `@remarks`, `@throws`,
  or `@example` line changed.
- The acceptance instrument
  `node /home/user/scaffold/.orkestrel/campaign/instruments/voice-scan.mjs` reports
  `middleware files= 19 blocks= 170 imperative= 0 verbless= 0 returnsBad= 0`.

## Deviations

none
