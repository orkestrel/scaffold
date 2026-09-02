# Unit voice-codec — report

Every TSDoc block under `src/` of `/home/user/fleet/codec` now opens with a third-person `-s` verb
sentence that does not repeat the symbol's name. Only `src/core/constants.ts` needed a rewrite;
`src/core/helpers.ts`, `src/core/validators.ts`, and `src/core/index.ts` already satisfied the rule.
No boolean `@returns` needed rewording: every guard in `validators.ts` already reads
`True if …; false otherwise`. The package has no `app/` directory.

## Blocks rewritten by kind

| Kind                                          | Count |
| --------------------------------------------- | ----- |
| First sentence from the imperative             | 0     |
| First sentence given a verb (was verbless)     | 5     |
| First sentence reworded to drop the symbol name| 0     |
| Boolean `@returns` reworded                    | 0     |

The five verbless first sentences, all in `src/core/constants.ts`:

- `BASE64_ALPHABET` — `The RFC 4648 §4 alphabet, …` → `Holds the RFC 4648 §4 alphabet, …`
- `BASE64_LOOKUP` — `Base64 character to 6-bit value lookup, …` → `Maps each Base64 character to its 6-bit value, …`
- `HEX_ALPHABET` — `The RFC 4648 §8 alphabet, lowercase and index-ordered; …` → `Holds the RFC 4648 §8 alphabet, lowercase and index-ordered; …`
- `HEX_LOOKUP` — `Hex character to 4-bit value lookup, …` → `Maps each hex character to its 4-bit value, …`
- `WINDOWS_1252_HIGH` — `Windows-1252 high-band byte to code point lookup, keyed by the byte and transcribed from the WHATWG Encoding index …` → `Maps each Windows-1252 high-band byte to its code point, transcribed from the WHATWG Encoding index …`

Two blocks were re-wrapped so no rewritten comment line exceeds the `printWidth` of 100 the
`.oxfmtrc.json` file sets: the single-line blocks on `BASE64_ALPHABET` and `HEX_ALPHABET` became
multi-line blocks, and the `HEX_LOOKUP` block's two lines were re-flowed. Every `@remarks`,
`@param`, `@returns`, `@throws`, `@example`, and later sentence is byte-identical to the launch
tree; the `git diff` file shows the whole change.

## Classifier readings

`instruments/voice-scan.mjs` at launch reported codec `imperative=1 verbless=3 returnsBad=0`; after
the sweep it reports `imperative=0 verbless=0 returnsBad=0`. Two classifier readings differed from
the tree, and reading each hit caught both:

- The launch `imperative=1` was `HEX_LOOKUP`, whose first word `Hex` is a noun rather than an
  imperative verb. It was verbless.
- `WINDOWS_1252_HIGH` was verbless and the classifier counted it third-person, because its first
  word `Windows` matches the `[A-Z][a-z]+s` third-person pattern. The launch `verbless=3` therefore
  undercounted by one.

## Files touched

- `/home/user/fleet/codec/src/core/constants.ts` — five constant TSDoc first sentences given a
  third-person `-s` verb.

Diffstat: `1 file changed, 12 insertions(+), 7 deletions(-)`.

## Gates

| Command             | Exit | Result                                                     |
| ------------------- | ---- | ---------------------------------------------------------- |
| `npm run format:check` | 0 | All matched files use the correct format (31 files)        |
| `npm run lint:check`   | 0 | No output                                                  |
| `npm run check`        | 0 | `tsc --noEmit` on the root and `configs/src/tsconfig.core.json` |
| `npm run build`        | 0 | Built `dist/src/core/index.js` and `index.cjs`             |
| `npm test`             | 0 | `src:core` 157, `policy` 111, `config` 46, `guides` 25 — all passed |

No failure excerpt: every step exited 0. The `npm test` reading is an observation; the
Orchestrator's landing chain is the authoritative run.

## Evidence paths

- `/home/user/scaffold/tmp/units/voice/voice-codec.diff`
- `/home/user/scaffold/tmp/units/voice/voice-codec.status` — lists `M src/core/constants.ts` alone.

## Deviations

none.
