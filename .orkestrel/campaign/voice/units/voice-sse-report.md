# Unit voice-sse — report

Every TSDoc block under `src/` of `/home/user/fleet/sse` now opens with a third-person `-s` verb, and
the one boolean `@returns` reads `True if …; false otherwise`. The gate chain exits 0 at every step.
The tree has no `app/` directory, so the sweep covered `src/` alone.

## Counts by kind

| Kind                                          | Blocks |
| --------------------------------------------- | ------ |
| First sentence from the imperative             | 2      |
| First sentence given a verb                    | 14     |
| First sentence reworded to drop the symbol name| 1      |
| Boolean `@returns` rewritten                   | 1      |

Blocks in the package: 20. Blocks already third-person and left untouched: 4 (`SSEError`
constructor, `isSSEError`, `createSSEParser`, `SSEParserInterface.clear`). Blocks whose text
changed: 17 — the imperative and verbless buckets are disjoint and cover 16, plus `isSSEError`,
whose first sentence was already correct and whose `@returns` alone changed.

The name-drop row counts `BOM`, which also sits in the verbless row: that block took both
transforms.

The launch scan reported imperative=3, verbless=12. The scan over-approximates in two places, and
reading each hit reclassified them without changing the work: `Machine-readable codes carried by …`
(`SSEErrorCode`) is a noun phrase the scan's leading-word test read as imperative, and
`Options for {@link …}` (`SSEParserOptions`) is a noun phrase whose leading word ends in `s`, so the
scan read it as third-person. Both were rewritten. The re-run reports `imperative=0 verbless=0
returnsBad=0` over the same blocks=20.

## Wording judgments

- A verb was chosen by the symbol's kind, as the shared brief directs: `Names` for a constant and
  for the literal-union type, `Holds` for a data property, `Represents` for an interface and a
  class, `Configures` for the options interface.
- `BOM` carried its own name as a standalone noun inside its first sentence — `a leading BOM on
  later chunks is ordinary content`. That reads now as `a leading mark …`, which drops the name
  with no loss because `byte-order mark` opens the same sentence.
- `NUL` keeps `the NUL byte` and the `SSEEvent` members keep `data`, `event`, `id`, and `retry`.
  In each the word is the domain term for the value — the byte's own name, and the SSE wire field
  names — rather than a restatement of the symbol's identity. Removing them would cost precision,
  which the deviation contract puts outside a voice rewrite.

## Files touched

- `/home/user/fleet/sse/src/core/constants.ts`
- `/home/user/fleet/sse/src/core/types.ts`
- `/home/user/fleet/sse/src/core/errors.ts`
- `/home/user/fleet/sse/src/core/SSEParser.ts`

Diffstat: 4 files changed, 19 insertions(+), 19 deletions(-). Every hunk is inside comment text; no
non-comment token changed.

## Gates

| Command               | Exit | Reading                                            |
| --------------------- | ---- | -------------------------------------------------- |
| `npm run format:check`| 0    | All matched files use the correct format (37 files) |
| `npm run lint:check`  | 0    | No output                                           |
| `npm run check`       | 0    | `tsc --noEmit` on the root and the core project     |
| `npm run build`       | 0    | Built `dist/src/core` ESM, CJS, and declarations    |
| `npm test`            | 0    | 120, 111, 46, 16, 18 tests passed across five projects |

No failure excerpt: no gate failed, and no gate needed a re-run. The mutating `npm run lint` and
`npm run format` were not needed, because `format:check` passed on the first run. The `npm test`
result is an observation on timing; the Orchestrator's landing chain is the authoritative run.

The guides parity project (`test:guides`, 18 tests) passed unchanged. It checks symbol names,
method tables, fences, and links, and pins no first sentence.

## Evidence paths

- `/home/user/scaffold/tmp/units/voice/voice-sse.diff`
- `/home/user/scaffold/tmp/units/voice/voice-sse.status` — lists `src/core/SSEParser.ts`,
  `src/core/constants.ts`, `src/core/errors.ts`, `src/core/types.ts` and nothing else.

The edit instrument is at
`/tmp/claude-0/-home-user-scaffold/249f2596-6386-5f66-868c-31383bbd6eeb/scratchpad/voice-sse-edit.py`.
It applies exact one-occurrence replacements and fails loudly on any other match count.

## Deviations

No stop. One path discrepancy, resolved and recorded:

- **Expected.** The launch prompt named
  `/home/user/fleet/sse/.claude/rules/typescript.md` as the rule to read.
- **Found.** That file does not exist. The repository's `.claude/` directory holds `agents/` and
  `settings.json` alone.
- **Evidence.** `find . -name typescript.md -not -path './node_modules/*'` returns nothing;
  `ls .claude` returns `agents` and `settings.json`.
- **Done.** Yes. `/home/user/fleet/sse/AGENTS.md` states that every scaffold path resolves against
  the installed copy when no sibling checkout exists, so I read
  `node_modules/@orkestrel/scaffold/dist/host/claude/rules/typescript.md` § Comments and API
  documentation. Its text matches the rule the shared brief quotes.
- **Hypothesis.** This checkout takes its rules from the installed `@orkestrel/scaffold` package
  rather than from a vendored `.claude/rules/` directory.
