# Unit voice-guide — report

Every TSDoc block under `src/` of `@orkestrel/guide` opens with a third-person `-s` verb sentence,
and every boolean `@returns` reads `True if …; false otherwise`. The gate chain exits 0 at every
step. No code token changed.

The package has no `app/` directory, so the sweep covered `src/**` only.

## Blocks rewritten, by kind

| Kind                                          | Count |
| --------------------------------------------- | ----- |
| First sentence from the imperative             | 14    |
| First sentence given a verb                    | 89    |
| First sentence reworded to drop the symbol's name | 9  |
| Boolean `@returns` reworded                    | 6     |

Distinct blocks with a rewritten first sentence: 103. The imperative and verbless rows are
disjoint and sum to 103. The name-drop row is a subset of the verbless row, not an addition to it.

The launch measurement read `imperative=15, verbless=87`. Two classifier artifacts explain the
difference from the reading above, and both were ruled by reading the block:

- `SourceLine.code` ("Source code with comment and template spans replaced by aligned spaces.")
  counted as imperative because `Source` is a capitalized word outside the classifier's stoplist.
  It is a bare noun phrase, so it is counted under the verbless row and now reads "Holds source
  code …".
- Four property blocks opening with `Its …` counted as third-person because the classifier's `-s`
  test matches `Its`. Each carried no verb, so each was rewritten: `SurfaceSymbol.name`,
  `SurfaceSymbol.kind`, `MethodGroup.methods`, and `Declaration.body`.

The nine name drops: `surfaceSymbolShape`, `methodGroupShape`, and `manifestEntryShape` ("The shape
of a X" → "Describes a X"); `ManifestEntry.source`; `ManifestEntry.tests`; `FenceImport.names`;
`GuideFence.code`; `DeclarationHead.text`; `Declaration.body`.

## Files touched

- `/home/user/fleet/guide/src/core/Guide.ts` — class doc opens "Presents a stateful, structured view …".
- `/home/user/fleet/guide/src/core/constants.ts` — five constant docs open `Names …` or `Lists …`.
- `/home/user/fleet/guide/src/core/factories.ts` — six factory docs move `Create`/`Compile` to `Creates`/`Compiles`.
- `/home/user/fleet/guide/src/core/helpers.ts` — 30 helper docs, plus two boolean `@returns` lines.
- `/home/user/fleet/guide/src/core/parsers.ts` — `parseManifest` moves `Parse` to `Parses`.
- `/home/user/fleet/guide/src/core/shapers.ts` — three shape docs open `Describes …`.
- `/home/user/fleet/guide/src/core/sources/Source.ts` — class doc opens "Reflects a module scope's …".
- `/home/user/fleet/guide/src/core/types.ts` — 52 type, interface, member, and property docs.
- `/home/user/fleet/guide/src/core/validators.ts` — four guard docs open `Checks whether …`, each with its boolean `@returns`.

Diffstat: 9 files changed, 124 insertions(+), 120 deletions(-).

## Gates

Run from `/home/user/fleet/guide` after the last edit, in the order `AGENTS.md` fixes.

| Command                | Exit | Result                                                          |
| ---------------------- | ---- | --------------------------------------------------------------- |
| `npm run format:check` | 0    | All matched files use the correct format (82 files).             |
| `npm run lint:check`   | 0    | No diagnostic.                                                   |
| `npm run check`        | 0    | `tsc --noEmit` on the root and the `src:core` project.           |
| `npm run build`        | 0    | Built `dist/src/core/index.cjs`; `dist/` is gitignored.          |
| `npm test`             | 0    | 375, 111, 46, 12, and 27 tests passed across src, policy, config, setup, and guides. |

`npm run lint` and `npm run format` were not needed: `format:check` passed on the first run.

`npm test` timing is an observation, not a criterion. The guides-parity project (27 tests) passed,
so no parity test pins a rewritten sentence.

## Acceptance evidence

- Diff: `/home/user/scaffold/tmp/units/voice/voice-guide.diff`
- Status: `/home/user/scaffold/tmp/units/voice/voice-guide.status` — nine entries, every one under `src/`.
- Comment-only proof: `git diff | grep -E '^[+-]' | grep -v '^[+-][+-]' | grep -vE '^[+-]\s*(\*|/\*\*|//)'` returns nothing.
- Tag-line proof: the only changed `@returns` lines are the six boolean ones; no `@param`,
  `@remarks`, `@throws`, `@example`, or `@deprecated` line changed.
- Acceptance instrument after landing: `voice-scan.mjs` reports
  `guide files=11 blocks=110 imperative=0 verbless=3 returnsBad=0`. The three verbless hits are the
  classifier matching `/** … */` inside string literals in `helpers.ts` at lines 1407, 1429, and
  1459 (`indexOf('/**', …)`), not doc blocks.

## Wording judgments

Each of these sits inside the brief's "wording choices within the rule are yours". None is a
deviation.

- A domain noun that is the value's own name stays, per the pilot slice's lesson. `Declaration`
  keeps "declaration", `DeclarationHead` keeps "declaration head", `MethodGroup.interface` keeps
  "interface", `ManifestEntry.concept` keeps "concept" (the manifest table's own column header),
  `FenceImport.specifier` keeps "module specifier", and `GuideFence.language` keeps "language tag".
  Dropping any of them would leave the sentence naming no value.
- `isExternalLink` keeps "should be skipped" in its first sentence. The wave migrates voice, and
  rewriting that clause would change substance outside the objective.
- Verb echo is kept where the rule's own examples endorse it: `createGuide` reads "Creates …" and
  `normalizeDirectories` reads "Normalizes …", the same pattern the wave brief prescribes.
- `Source.ts` keeps "`Source` never touches disk:" byte-identical on its line; only the first
  sentence reflowed.

## Deviations

none.
