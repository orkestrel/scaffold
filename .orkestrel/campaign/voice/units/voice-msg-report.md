# Unit voice-msg — report

Every TSDoc block under `src/` of `/home/user/fleet/msg` now opens with a third-person `-s` verb
sentence that does not repeat the symbol's name, and every boolean `@returns` reads
`True if …; false otherwise`. The gate chain exits 0 at every step. The package has no `app/`
directory, so `src/core/**` is the whole population.

## Counts by kind

- First sentence rewritten from the imperative: 40
- First sentence given a verb (bare noun phrase): 95
- First sentence reworded to drop the symbol's name: 2
- Boolean `@returns` rewritten: 9
- Total edits: 146, over 137 of the 139 blocks the scan enumerates

The 2 untouched blocks already satisfied the rule: the `MSG` class block (`Parses raw .eml or .msg
file bytes …`) and `inferExtension` (`Infers the file extension …`).

Acceptance instrument after the sweep:

```text
msg         files= 10 blocks= 139 imperative=   0 verbless=   0 returnsBad=  0
```

## Files touched

- `/home/user/fleet/msg/src/core/MSG.ts` — module header title dropped; constructor, `options`,
  `chain`, `fields`, `attachment`, and `burn` first sentences moved to third person.
- `/home/user/fleet/msg/src/core/constants.ts` — all 63 constant blocks given a verb
  (`Holds`, `Names`, `Locates`, `Maps`, `Lists`, `Marks`, `Caps`, `Sets`, `Identifies`).
- `/home/user/fleet/msg/src/core/errors.ts` — `MSGError` given `Represents`, `isMSGError` moved to
  `Narrows`, boolean `@returns` rewritten.
- `/home/user/fleet/msg/src/core/factories.ts` — `createMSG` moved to `Creates`.
- `/home/user/fleet/msg/src/core/helpers.ts` — 25 imperative openers moved to third person,
  `compareCFBName` given a verb, 3 boolean `@returns` rewritten.
- `/home/user/fleet/msg/src/core/parsers.ts` — `parseMIMEPart` moved to `Parses`.
- `/home/user/fleet/msg/src/core/shapers.ts` — `burnCFB`, `extractMessageFromMSG`, and
  `extractMessage` moved to third person.
- `/home/user/fleet/msg/src/core/types.ts` — 24 bare noun phrases given `Represents`, `Names`,
  `Holds`, `Describes`, or `Configures`; 4 imperative members moved to third person;
  `MSGInterface` reworded to drop the symbol's name.
- `/home/user/fleet/msg/src/core/validators.ts` — 2 imperative openers moved to `Narrows`,
  3 `Type guard for …` openers given a verb, 5 boolean `@returns` rewritten.

Diffstat: 9 files changed, 145 insertions(+), 147 deletions(-). The net −2 lines is the deleted
module-header title line and its blank comment line in `MSG.ts`; every other changed line is an
in-place comment line.

## Gates

| Command               | Exit | Result                                                             |
| --------------------- | ---- | ------------------------------------------------------------------ |
| `npm run format:check` | 0   | `All matched files use the correct format.` (44 files)              |
| `npm run lint:check`   | 0   | no output                                                           |
| `npm run check`        | 0   | root project and `configs/src/tsconfig.core.json` both clean        |
| `npm run build`        | 0   | `✓ built in 2.81s`; ESM, CJS, and declaration bundles emitted       |
| `npm test`             | 0   | 178, 111, 46, 13, and 18 tests passed across the five projects      |

No mutating `lint` or `format` run was needed: `format:check` passed on the first attempt.

`npm test` timing is an observation from inside this unit's exec; the Orchestrator's landing chain
is the authoritative run.

## Evidence

- `/home/user/scaffold/tmp/units/voice/voice-msg.diff`
- `/home/user/scaffold/tmp/units/voice/voice-msg.status`

`git status --short` lists only the nine `src/core/*.ts` files. A filter over the diff for changed
lines that are not comment continuations returns nothing, so no code token moved.

## Deviations

One, resolved without stopping.

- **Expected.** Every first sentence is reworded in place, so `@example`, `@param`, `@remarks`,
  `@throws`, and later sentences stay byte-identical.
- **Found.** The `MSG.ts` module header block opened with the bare title `MSG` on its own line —
  a first "sentence" that is nothing but the symbol's name, with no verb to inflect and no content
  to keep. The paragraph following it (`Parses .eml (RFC 2822 / MIME) and .msg …`) already reads
  third-person.
- **Evidence.** Pre-edit block at `src/core/MSG.ts:1-10`; the scan listed it as
  `/home/user/fleet/msg/src/core/MSG.ts: MSG`. Post-edit hunk in `voice-msg.diff`.
- **Done.** Yes. The title line and its blank comment line were deleted, promoting the existing
  third-person paragraph to the first sentence. Its bytes are unchanged. No other block was
  changed structurally.
- **Hypothesis.** The wave's transform rules assume a first sentence with substance to reword; a
  title-only header has none, so deleting the title is the only rewrite that neither invents
  content nor duplicates the paragraph beneath it.

## Recorded decisions

- `WINDOWS_1252_HIGH` in `constants.ts` was swept even though the scan does not flag it: its
  opening token `Windows-1252` matches the instrument's third-person `-s` pattern, while the
  sentence is a bare noun phrase. The brief directs sweeping by reading rather than by bucket.
- `compareCFBName` reads `Serves as the CFB-compliant directory name comparator.` rather than a
  `Compares …` opener, because the untouchable second sentence already begins `Compares by UTF-16
  length first, …`.
- `MSGFieldData` reads `Holds parsed field data …` rather than `Represents …`, because the
  untouchable second sentence already begins `Represents the root message, …`.
- `MSG_PIDLID_MAPPING` reads `Holds the PidLid property set GUID to LID-to-field-name mapping.`
  rather than a `Maps …` opener, because its untouchable second sentence already begins `Maps
  well-known MAPI named property sets …`.
- No guide or test pins a rewritten sentence: `tests/guides.test.ts` compares fence languages,
  import specifiers, and link targets, and a search of `guides/`, `tests/`, and `README.md` for the
  rewritten openers returned nothing.
