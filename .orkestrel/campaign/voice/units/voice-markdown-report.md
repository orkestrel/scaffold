# Unit voice-markdown — report

Every TSDoc block under `src/` of `/home/user/fleet/markdown` now opens with a third-person `-s`
verb sentence, and every boolean `@returns` reads `True if …; false otherwise`. The gate chain
exits 0 at every step. No deviation.

The package has no `app/` directory, so the sweep covered `src/core/` alone.

## Blocks rewritten by kind

| Kind                                        | Count |
| ------------------------------------------- | ----- |
| First sentence from the imperative           | 44    |
| First sentence given a verb                  | 117   |
| First sentence reworded to drop the symbol's name | 0 |
| Boolean `@returns`                           | 13    |

The diff is 174 changed lines against 174 removed, so every rewrite replaced one comment line in
place and no line reflowed. 161 of those lines are first sentences and 13 are `@returns`.

## Files touched

- `/home/user/fleet/markdown/src/core/validators.ts` — 17 `Determine whether` → `Determines whether`; 4 boolean `@returns`.
- `/home/user/fleet/markdown/src/core/helpers.ts` — 21 imperative openers to the `-s` form (`Extracts`, `Splits`, `Derives`, `Resolves`, `Merges`, `Scans`, `Projects`, `Renders`, `Trims`, `Reduces`, `Combines`, `Reads`, `Folds`, `Rewrites`, `Concatenates`); 10 verbless openers given a verb (`Counts`, `Checks whether`, `Walks`); 9 boolean `@returns`.
- `/home/user/fleet/markdown/src/core/types.ts` — 94 verbless openers given a verb: `Represents` for a type, an interface, and a handler alias; `Holds` for a data property; `Names` for the `TableAlign` literal union; `Returns` for the `walk` and `stream` interface members.
- `/home/user/fleet/markdown/src/core/shapers.ts` — 7 `The shape of …` openers to `Describes the shape of …`.
- `/home/user/fleet/markdown/src/core/factories.ts` — 6 imperative openers (`Creates`, `Compiles`).
- `/home/user/fleet/markdown/src/core/Markdown.ts` — 4 verbless openers (`Wraps`, `Holds`, `Returns`).
- `/home/user/fleet/markdown/src/core/constants.ts` — 2 verbless openers (`Caps`, `Holds`).

`src/core/compilers.ts`, `src/core/parsers.ts`, and `src/core/index.ts` already satisfied the rule
and were not touched.

## Gates

Run from `/home/user/fleet/markdown` in the order the shared brief names.

| Command                | Exit | Result                                                                |
| ---------------------- | ---- | --------------------------------------------------------------------- |
| `npm run format:check` | 0    | All matched files use the correct format (47 files).                  |
| `npm run lint:check`   | 0    | No diagnostic.                                                        |
| `npm run check`        | 0    | `tsconfig.json` and `configs/src/tsconfig.core.json` both clean.      |
| `npm run build`        | 0    | Built in 3.07s; declaration copy completed.                           |
| `npm test`             | 0    | 11 test files passed, 801 tests passed (602 src, 111 policy, 46 config, 24 setup, 18 guides). |

No failure excerpt: no gate failed. `npm run format` and `npm run lint` were not needed, because
`format:check` passed on the first run. `npm test` timing is an observation; the authoritative run
is the Orchestrator's.

## Acceptance instrument

`node .orkestrel/campaign/instruments/voice-scan.mjs` from `/home/user/scaffold`:

```text
markdown    files= 10 blocks= 216 imperative=   0 verbless=   0 returnsBad=  0
```

Launch reading for the same row: `imperative= 46 verbless= 115 returnsBad= 13`.

## Evidence paths

- `/home/user/scaffold/tmp/units/voice/voice-markdown.diff`
- `/home/user/scaffold/tmp/units/voice/voice-markdown.status`

`git status --short` lists the seven `src/core/*.ts` files and nothing else. A line-by-line check
of the diff confirms every removed line's tail survives in its replacement, apart from the 13
boolean `@returns` rewrites and four first sentences the wave's transform rules restructure:
`Markdown`, `MAX_DEPTH`, `countIndent`, and `walkNodes`.

## Observations

- `renderMarkdown` keeps the `parse(renderMarkdown(doc))` code token inside its first sentence.
  The sentence's subject never names the symbol, and the shared brief requires every code token to
  survive unchanged, so dropping it would destroy the round-trip expression the sentence documents.
  A baseline scan for a symbol name inside its own first sentence returns the same three sites it
  returns after the sweep, and each is either that code token or a match in a later sentence.
- No guide parity test pins a TSDoc first sentence in this package. A search of `tests/` for the
  rewritten openers returns nothing, and `test:guides` passes.

## Deviations

None.
