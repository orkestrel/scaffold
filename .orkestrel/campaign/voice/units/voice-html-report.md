# Unit voice-html — report

Every TSDoc block under `src/` of `/home/user/fleet/html` now opens with a third-person `-s` verb
sentence, and every boolean `@returns` reads `True if …; false otherwise`. The gate chain exits 0
at every step. No deviation.

## Blocks rewritten, by kind

| Kind | Blocks |
| ---- | ------ |
| First sentence from the imperative | 35 |
| First sentence given a verb | 81 |
| First sentence reworded to drop the symbol's name | 0 |
| Boolean `@returns` | 13 |

Each boolean `@returns` line sits in a block whose first sentence is also in the imperative row, so
those rows overlap rather than add. The package has no `app/` directory, so the sweep covered `src/`
only.

Acceptance instrument, run from `/home/user/scaffold`:

```text
node .orkestrel/campaign/instruments/voice-scan.mjs | grep '^html'
before: html files=  9 blocks= 156 imperative=  35 verbless=  81 returnsBad= 13
after:  html files=  9 blocks= 156 imperative=   0 verbless=   0 returnsBad=  0
```

## Verbs chosen

- Imperative openers took their `-s` form (`Determine` to `Determines`, `Scan` to `Scans`,
  `Collapse … and remove` to `Collapses … and removes`).
- An interface, a type alias, and a class took `Represents`.
- A readonly data property took `Holds`, a boolean data property took `Indicates whether`, and the
  `document` accessor took `Exposes`.
- An options interface took `Describes`.
- A collection constant took `Lists`, a table constant took `Holds`, and a scalar constant took
  `Names`.
- The `walk` member took `Provides` and the `stream` member took `Returns`, because `Walks` and
  `Streams` would repeat the member's own name.

## Files touched

| File | Summary |
| ---- | ------- |
| `src/core/types.ts` | Third-person openers on every interface, type alias, member, and options field |
| `src/core/constants.ts` | Third-person openers on every exported constant |
| `src/core/helpers.ts` | Imperative openers converted, and the guard `@returns` lines rewritten |
| `src/core/validators.ts` | Imperative openers converted, and every guard `@returns` line rewritten |
| `src/core/HTML.ts` | Third-person openers on the class, the `document` accessor, `walk`, and `stream` |
| `src/core/shapers.ts` | Third-person openers on every shape constant |
| `src/core/factories.ts` | `Create` to `Creates` on `createHTML` |

`src/core/parsers.ts` and `src/core/index.ts` already conformed and were not touched.

```text
 src/core/HTML.ts       |   8 ++--
 src/core/constants.ts  |  36 +++++++--------
 src/core/factories.ts  |   2 +-
 src/core/helpers.ts    |  60 ++++++++++++-------------
 src/core/shapers.ts    |  12 ++---
 src/core/types.ts      | 120 ++++++++++++++++++++++++++-----------------------
 src/core/validators.ts |  35 ++++++++-------
 7 files changed, 141 insertions(+), 132 deletions(-)
```

## Gates

Run from `/home/user/fleet/html`, in order.

| Command | Exit | Result |
| ------- | ---- | ------ |
| `npm run format:check` | 0 | All matched files use the correct format (46 files) |
| `npm run lint:check` | 0 | No diagnostic |
| `npm run check` | 0 | `tsc --noEmit` clean for the root and `configs/src/tsconfig.core.json` |
| `npm run build` | 0 | `dist/src/core/index.js` and `index.cjs` emitted, declarations copied |
| `npm test` | 0 | src 312, policy 111, config 46, setup 29, guides 18 — all passed |

No failure excerpt: no gate failed, and no gate needed a re-run. The mutating `npm run lint` and
`npm run format` were not needed, because `format:check` passed on the first try. `npm test` timing
is an observation; the Orchestrator's landing chain is the authoritative run.

## Scope evidence

- `git diff` hunks change comment lines only. A filter over the diff for an added or removed line
  that is not a `/**`, ` * `, or ` */` line returns 0 lines.
- No added or removed line carries `@param`, `@example`, `@remarks`, `@throws`, `@see`, or
  `@deprecated`.
- `git status --short` lists modified files under `src/core/` and nothing else.
- No comment line exceeds the formatter's 100-column print width, counting a tab as 2 columns, which
  was also true of the launch tree.

Evidence files:

- `/home/user/scaffold/tmp/units/voice/voice-html.diff`
- `/home/user/scaffold/tmp/units/voice/voice-html.status`

## Observations

A first sentence containing a token that also appears in its declaration's name was left alone in
the places that follow. Neither is in a wave bucket.

- `src/core/HTML.ts:40`, class `HTML`: "Represents a parsed HTML document …". `HTML` here names the
  markup language, which is the domain term the pilot lessons say to keep.
- `src/core/HTML.ts:165`, method `fold`: "Runs a total catamorphism over the document: every node is
  folded from its own already-folded children …". The first sentence already reads third person, and
  `folded` is the domain verb rather than the member's name.

One measured figure differs from the brief. The brief records `imperative=36` at launch; the same
instrument, run against the launch tree before any edit, reported `imperative=35` for `html`, and
the buckets summed to the brief's `verbless=81` and `returnsBad=13` unchanged. Every block the
instrument listed was read and rewritten, so the sweep is complete either way.

## Deviations

none
