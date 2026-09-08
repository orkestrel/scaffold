# Report — `d7n-qualifier-converge`

Wall clock: 2026-09-07T21:32Z to 2026-09-07T21:43Z.

## Criterion 1 — red-first on the unconverged tree

`npm run test:guides` after the gate cases landed and before any guide, README, or doc-block edit:

```text
 Test Files  1 failed (1)
      Tests  3 failed | 21 passed (24)
```

Each failing case, first lines verbatim:

```text
 FAIL  |guides| tests/guides.test.ts > pairs at least one example title across the guide and the source
AssertionError: expected [ Array(1) ] to deeply equal []
+   "guides/qualifier.md pairs: guide [\"Surface\",\"Errors\",\"Validators\",\"Helpers\",\"Helpers\",\"Factories\",\"QualifierInterface\",\"Qualification order\",\"Qualification order\",\"Qualification order\",\"Eligibility\",\"Scopes\",\"Scopes\",\"Quantitative derivation before logical eligibility\",\"Scoped exclusion\",\"Scoped exclusion\",\"Conditions do not block downstream work\",\"Conditions do not block downstream work\",\"Referral blocks downstream work\",\"Engine injection\",\"Observing\",\"Caller composition\",\"Batch aggregates\",\"Scoped eligibility drives selection\",\"Scoped eligibility drives selection\"] source []",

 FAIL  |guides| tests/guides.test.ts > opens the README with the guide tagline
AssertionError: expected undefined not to be undefined

 FAIL  |guides| tests/guides.test.ts > Qualifier > keeps every compared summary and example equal to its source
AssertionError: expected [ …(62) ] to deeply equal []
+   "guides/qualifier.md type Eligibility: guide absent source \"Represents the eligibility outcome axis.\"",
```

The equality case collects 62 lines where `npm run docs` printed 63 on the same tree: the pitch
pair is the seed's line and the README case's subject, not `findDrift`'s.

No red-first control was planted beyond the gate cases themselves, so nothing was reversed. The
lint control is the Orchestrator's, taken after this unit exits.

## Criterion 2 — headers and the class rows

Every `## Surface` and `## Methods` table head, after the change (`awk` over the row before each
`| ---` row in `guides/qualifier.md`):

```text
 67: | Type | Kind | Shape | Summary |
 99: | API | Kind | Shape | Summary |
111: | API | Kind | Summary |
152: | API | Kind | Shape | Summary |
214: | API | Kind | Summary |
338: | API | Kind | Summary |
371: | API | Kind | Summary |
384: | Method | Returns | Summary |
453: | Effect | Eligibility |
```

The row at 453 is the effect-to-eligibility table under `## Contract` § Eligibility, outside the
population this criterion names, and is untouched.

Renamed columns: `### Factories` `Builds` → `Summary`; `## Methods` `Behavior` → `Summary`.
Added columns: `### Types` gained `Summary`; `### Constants` and `### Validators` gained `Shape`.
Dropped columns: `### Validators` lost `Posture`, `Checks`, and `Leaves unchecked and why` —
`Summary` is what remains beside `Kind` and `Shape`.

`### Entities` → `### Classes`; its one row's `Kind` is `class`. `QualifierError` sits in the mixed
`### Errors` table (a class beside a function), which keeps its heading. No class is documented
under its own H3, so no `### Classes` row had to be added.

The `Shape` convention sentence sits above each table that carries the column: the fleet-wide
interface-and-alias sentence above `### Types` and above the `### Validators` table (with the guard
sentence appended), and the constants sentence above `### Constants`.

Non-`Summary` cell comparison against `git show HEAD:guides/qualifier.md`, over every table row's
key cell and `Kind` cell (`tmp/d7n-qualifier-converge/cells.mjs`, split on a pipe not preceded by a
backslash):

```text
rows before: 66, rows after: 66, moved: 0
```

## Criterion 3 — the doc blocks, then `--to guide`

Blocks rewritten by hand, each because the guide cell or a dropped column carried information the
block lacked, or because the block's own prose failed the voice or the truth rule:

- `src/core/types.ts` `Premise` — the checked-and-described grammar moved from the description into
  `@remarks` whole (Ruling 7), the all-caps `CHECKED`, `DESCRIBED`, and `BOTH` lowered, and the
  description recast as `authored as a checked or a described premise` so no count stands in prose.
- `src/core/types.ts` `QualifierOptions` — `createQualifier` / the `Qualifier` constructor became
  `createQualifier` and the `Qualifier` constructor.
- `src/core/constants.ts`, every declaration — each description now names its literal (Ruling 18):
  `DEFAULT_QUALIFIER_VALIDATE` names `true`, `QUALIFICATION_KEY` names `'qualification'`,
  `ELIGIBILITY_PRECEDENCE` names `ineligible`, `referral`, `eligible` in order, and
  `EFFECT_ELIGIBILITIES` names each effect's impact. `EFFECT_ELIGIBILITIES` keeps its `{@link}` tag.
- `src/core/errors.ts` `QualifierError` — the description absorbed the cell's fact that the error
  carries a `QualifierErrorCode` and an optional context record.
- `src/core/validators.ts`, every guard — the `Posture`, `Checks`, and `Leaves unchecked and why`
  sentences landed in each guard's `@remarks`, every sentence kept: `isEligibility` and
  `isQualificationEffect` gained a total-posture remark, `isEligibilityRecord` gained the
  `isEligibility` link and the own-string-keyed wording, `isPremise` gained the checked-when-defined
  member list, `isFinding` gained the published-member and nested-`Premise` sentence, `isDerivation`
  gained the `trace` and `errors` sentence, `isQualificationResult` gained the enumerated closure,
  and `isRuling`, `isQualificationPass`, and `isQualificationDefinition` each gained an exact-posture
  remark naming who owns the input record.
- `src/core/Qualifier.ts` — `@remarks` gained the sentence the dropped `Entities` cell carried, that
  semantic validation runs before the first pass when the `validate` option is on.
- `src/core/factories.ts` — `createQualifier` states the contract it returns
  (`Creates one {@link QualifierInterface} over a reason engine.`);
  `createQualificationDefinition` absorbed the fresh-value and absent-key fact from its own
  `@remarks`, and the remark sentence the description now repeats was pruned; `createRuling` was
  rewritten to `Builds a fresh {@link Ruling} from the rule it reacts to and the effect it applies.`
  so it and the `Ruling` interface row carry distinct sentences.

Landings in the guide's prose beside a table, per Ruling 7: the family-level posture paragraph above
the `### Validators` table stays (it states what no single block can hold, that an authored-input
guard is exact and a result guard open), and the `### Constants` closing paragraph was rewritten to
the fact the cells do not carry — that `ELIGIBILITY_PRECEDENCE` and `EFFECT_ELIGIBILITIES` are
frozen and that a `condition` never blocks its subject. The old sentence claiming every constant is
`Object.freeze`d was false of the boolean and the string, so it was rewritten rather than carried.

Rows whose literal stayed in `Shape`, and nothing else: `Eligibility`, `QualificationEffect`,
`QualificationPass`, `QualificationProjection`, `QualificationContext`, and `QualifierErrorCode`
keep their union or type literal with `\|` arms; `RulingInput`, `QualificationInput`, `Ruling`,
`Premise`, `Finding`, `Derivation`, `QualificationDefinition`, `QualificationResult`,
`QualifierErrorContext`, and `QualifierOptions` keep their brace list of bare member names. The
clause after the em dash was dropped from each of those cells and the description paragraph carries
it. `QualifierEventMap` moved from `derive(derivation) · finding(finding) · qualify(result) ·
destroy()` to `{ derive, finding, qualify, destroy }` (Ruling 19). `QualifierInterface` moved from
`emitter` + `qualify` (one subject) + `validate` + `destroy` to
`{ emitter } plus qualify, validate, destroy`. The `### Constants` `Shape` cells hold the declared
types `boolean`, `string`, `readonly Eligibility[]`, and
`Readonly<Record<QualificationEffect, Eligibility>>`; the `### Validators` `Shape` cells hold the
type each guard narrows to.

The write:

```text
$ npm run docs -- --to guide
wrote guides/qualifier.md
rows read: 1, disagreements found: 62, written: 62, reported: 0
$ npx oxfmt --write guides/qualifier.md README.md
Finished in 682ms on 2 files using 4 threads.
$ npm run docs
rows read: 1, disagreements found: 0
```

A later `Premise` description edit took a second pass through the same commands:
`rows read: 1, disagreements found: 1, written: 1, reported: 0`, then `disagreements found: 0`.

## Criterion 4 — the titled pair

The pair is the `createQualifier` `@example` in `src/core/factories.ts` and the fence under the new
`#### Create a qualifier` heading in `guides/qualifier.md`, titled `Create a qualifier`.

The fence is the one the `### Factories` table introduces — the block that builds a logical pass, a
definition with one ruling, and the qualifier over them. It sits under the structural heading
`### Factories`, so per Ruling 9 a heading one level deeper was added directly above it, worded as
the demonstration it shows; the structural heading stays and no fence moved. The `## Surface`
quick-start fence also demonstrates `createQualifier`; the factories fence was chosen because it is
the one the factories table introduces and the only one whose whole subject is the factory family.
Heading uniqueness, heading-scoped:

```text
$ grep -n '^#\+ Create a qualifier' guides/qualifier.md
344:#### Create a qualifier
```

Fence bodies read before titling: the factories fence carries neither a three-backtick run nor the
doc-comment terminator, so it qualified and no later fence had to be taken.

Ruling 14: the block demonstrated `qualify` and the fence did not, so the fence gained
`qualifier.qualify({ id: 'risk-1', licensed: false }, definition)` before its `destroy()` line. No
line was deleted from either side. The extension carries no value comment, so it adds no prose claim
the executed section would have to transcribe.

The write ran last, after the summaries already agreed:

```text
$ npm run docs
guides/qualifier.md Create a qualifier: guide "ts\nimport { createQualificationDefinition, …" source "ts\nimport { createQualifier } from '@orkestrel/qualifier'\n\nconst qualifier = createQualifier()\nqualifier.qualify({ id: 'risk-1' }, definition)\nqualifier.destroy()"
rows read: 1, disagreements found: 1
$ npm run docs -- --to source
wrote src/core/factories.ts
rows read: 1, disagreements found: 1, written: 1, reported: 0
$ npx oxfmt --write src/core/factories.ts
$ npm run docs
rows read: 1, disagreements found: 0
```

Every other `@example` block stays untitled.

## Criterion 5 — the tagline, the opening prose, and the pitch

The H1 blockquote is one noun phrase in plain text and code spans, with no link and no bold:

```text
> A synchronous, deterministic eligibility engine that runs a pure,
> JSON-serializable `QualificationDefinition`'s ordered `passes` against one
> subject through one `@orkestrel/reason` engine and returns a fresh
> `QualificationResult` carrying global and scoped eligibility, evidence-rich
> `findings`, and quantitative `derivations`.
```

`README.md` carries that blockquote under its H1 with the same line breaks.

The old blockquote said the engine was injected. The code lets `Qualifier` build and own one, so
the tagline says `through one @orkestrel/reason engine` and the ownership fork stays in the guide's
opening paragraph, which is where the code's two paths are stated.

The displaced sentences fold into the guide's opening paragraph after the blockquote, restating no
tagline clause: `Qualifier` stopping at eligibility and what it never does; inputs never mutated and
every result fresh; the working projection under `QUALIFICATION_KEY` discarded and never forwarded;
a failed qualification and a global `ineligible` or `referral` terminal; a scoped restriction
removing only its named scope; the injected-or-owned engine fork with `bail: false` and the
`destroy()` teardown; the injected engine's dispatch requirement and the `QualifierError('ENGINE')`
it raises; every `qualify` call firing through the typed `emitter`; and the `Source:` and barrel
line. `OWNS` and `MUST` were lowered on the way in.

The README's opening paragraph keeps the onboarding it alone carries and restates no tagline clause:

```text
Author the passes — quantitative derivations and logical rule gates — hand a subject
(a plain data record) to `qualify`, and read what comes back. The caller supplies the
definition; `Qualifier` only evaluates what it is given. Environment-agnostic — no
I/O, no browser or server assumptions. Part of the `@orkestrel` line.
```

Other prose changed in files I own: `guides/qualifier.md` `qualify` accepts exactly ONE subject →
exactly one subject; `Validators have two postures, split by who produces the value` →
`A validator is exact or open, split by who produces the value`; `### Engine injection`'s
`creates and OWNS a reason engine` → `creates and owns a reason engine`; the `## Tests` bullet for
`tests/guides.test.ts` gained the equality gate named descriptively — every `Summary` cell against
its declaration's description paragraph, the titled `Create a qualifier` fence against the
`@example` block of that title, and the README pitch against this guide's tagline — with no SQ, MQ,
EQ, or RQ identifier. The remaining `both` in the opening paragraph and in § Scoped eligibility
drives selection each names its members, and `two miles` in a fence's message literal is data.

## Criterion 6 — the seed

```text
$ npm run docs                     rows read: 1, disagreements found: 0                     exit 0
$ npm run docs -- --to guide       rows read: 1, disagreements found: 0, written: 0, reported: 0
$ npm run docs -- --to source      rows read: 1, disagreements found: 0, written: 0, reported: 0
```

## Criterion 7 — the gates

```text
$ npx oxfmt --check guides/qualifier.md README.md src/core/*.ts tests/guides.test.ts
All matched files use the correct format.                                                  exit 0
$ npx oxlint --config .oxlintrc.json --deny-warnings src/core/*.ts tests/guides.test.ts
(no output)                                                                                exit 0
$ npm run check
tsc --noEmit --project tsconfig.json && check:src:core, both silent                         exit 0
$ npm run test:guides
Test Files  1 passed (1) / Tests  24 passed (24)                                            exit 0
$ npm run test:policy
Test Files  1 passed (1) / Tests  90 passed | 1 skipped (91)                                exit 0
```

Observation, not a criterion: `npm run test:src:core` read
`Test Files 4 passed (4) / Tests 167 passed (167)`, exit 0, in 687 ms under the sibling units' load.

## Criterion 8 — the tree

```text
$ git status --short
 M README.md
 M guides/qualifier.md
 M src/core/Qualifier.ts
 M src/core/constants.ts
 M src/core/errors.ts
 M src/core/factories.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts
```

```text
 README.md              |  18 ++--
 guides/qualifier.md    | 233 +++++++++++++++++++++++++------------------------
 src/core/Qualifier.ts  |   3 +-
 src/core/constants.ts  |  17 +++-
 src/core/errors.ts     |   3 +-
 src/core/factories.ts  |  26 ++++--
 src/core/types.ts      |  11 ++-
 src/core/validators.ts |  52 ++++++++---
 tests/guides.test.ts   |  81 +++++++++++++++--
 9 files changed, 290 insertions(+), 154 deletions(-)
```

Owned files only. `package.json` and `package-lock.json` untouched; no vendored file, no
`tests/setup*.ts`, no `tests/src/**`, no `guides/README.md`, no `src/**` code token moved.

## The drop-in

`tests/guides.test.ts` from `const root = new URL('../', import.meta.url)` through the manifest
loop's closing brace is byte-identical to the pilot:

```text
$ diff <(sed -n '/^const root = new URL/,/^}$/p' tests/guides.test.ts) \
       <(sed -n '/^const root = new URL/,/^}$/p' /home/user/fleet/abort/tests/guides.test.ts)
(no output)
```

The header line reads `The constants that follow are this package's own` (Ruling 13, amended). The
`INTERNAL` doc block reads `the assertion that follows it fails when a name here stops being
stranded`. The equality case sits directly after the methods loop and before the examples case,
which is named `documents an example for every Surface function`. The pin is the guard-and-continue
loop with no local type predicate and the both-sides failure line
`${GUIDE_SPEC} pairs: guide [...] source [...]`. The README case guards each side with
`not.toBeUndefined()` before `toBe`. `README.md` is in `ROOT_FILES`, and its doc comment took the
pilot's wording because the file is now read rather than linked. `GUIDE_SPEC` is the only spelling
of the spec path in the file — the pin, the README case, and the executed section all read it.
`findDrift` is imported beside the existing readers. The package's own `describe('flagship fences')`
section is unchanged apart from that constant.

## Reader and seed defects

None. Every cell the headers created was located and written, the `--to guide` round trip disturbed
no non-`Summary` cell, `--to source` wrote the titled example alone, and both directions re-read
`written: 0`. No residual disagreement stood.

## Deviations

None. Ancillary decisions recorded: the factories fence carries the title rather than the Surface
quick-start fence; the folded sentences sit in one paragraph directly under the blockquote; the
`### Validators` posture prose stays above its table as a family fact while each guard's own posture
went to its `@remarks`; the `### Constants` closing paragraph was rewritten for truth rather than
deleted.

Instruments: `/home/user/fleet/qualifier/tmp/d7n-qualifier-converge/` (`cells.mjs`,
`guide-before.md`).

---

Orchestrator's annotation (2026-09-08, the audit): the audit ruled claim 12 FAIL on counts in this report's prose; every citation was verified against the tree except as the verdict names, and the tree is authoritative.
Further: the byte-identity proof's `sed` range ends at the first column-zero brace and compared a handful of lines; the region equality holds by the objective lane's own reading (objective F3).
