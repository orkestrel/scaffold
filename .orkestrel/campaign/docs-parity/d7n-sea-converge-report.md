# Report — P.2 `d7n-sea-converge` (sea under the equality gate)

Checkout `/home/user/fleet/sea`, baseline `09f5e85` (clean at start). Every acceptance criterion
closed. No deviation. Owned files only in `git status --short`.

## 1. Red-first, on the unconverged tree

Command: `PATH=/opt/npm11/bin:$PATH npm run test:guides`, run directly after the gate cases landed
and before any guide, README, or doc-block edit.

```text
 Test Files  1 failed (1)
      Tests  3 failed | 34 passed (37)
```

The first lines of each failing case, verbatim:

```text
 FAIL  |guides| tests/guides.test.ts > pairs at least one example title across the guide and the source
AssertionError: expected [ Array(1) ] to deeply equal []
+   "guides/sea.md pairs: guide [\"Overview\",\"Injecting a resource directly\",\"Assets\",\"Boundary and formatting helpers\"] source []",

 FAIL  |guides| tests/guides.test.ts > opens the README with the guide tagline
AssertionError: expected undefined not to be undefined
 ❯ tests/guides.test.ts:123:20
    123|  expect(pitch).not.toBeUndefined()

 FAIL  |guides| tests/guides.test.ts > Sea > keeps every compared summary and example equal to its source
AssertionError: expected [ …(128) ] to deeply equal []
+   "guides/sea.md class SEA: guide \"Build orchestrator — `execute` runs compress → blob → assemble; `destroy` tears down the emitter.\" source \"Runs a Node.js single executable application build to completion.\"",
+   "guides/sea.md class Injector: guide \"Cross-platform binary resource injector (PE / ELF / Mach-O) — `inject` writes the resource.\" source \"Writes a named resource into a PE, ELF, or Mach-O executable in place.\"",
+   "guides/sea.md class Asset: guide \"A single named asset — `key` / `content` / `compressed`.\" source \"Holds one named asset's key, bytes, and compression state.\"",
```

The gate cases in `tests/guides.test.ts`: the `findDrift` import beside the existing readers; the
`GUIDE_SPEC` constant `'guides/sea.md'`; `README.md` added to `ROOT_FILES` with the pilot's comment;
the `own` manifest lookup; the pin at file scope in the pilot's guard-and-continue form with the
both-sides failure line; the README case with its two `not.toBeUndefined()` guards; the equality case
inside `describe(entry.concept)`, directly after the methods loop and before the examples case.

Drop-in canon (Ruling 13 and its amendment): the header line reads "The constants that follow are
this package's own", the `INTERNAL` block reads "the assertion that follows it fails when a name here
stops being stranded", and the examples case keeps the name `documents an example for every Surface
function`. Byte-for-byte reading against the pilot over the shared body:

```text
$ diff <(sed -n '63,275p' tests/guides.test.ts) <(sed -n '47,259p' /home/user/fleet/abort/tests/guides.test.ts)
DIFF EXIT 0
$ diff <(sed -n '41,62p' tests/guides.test.ts) <(sed -n '26,46p' /home/user/fleet/abort/tests/guides.test.ts)
7c6  const GUIDE_SPEC = 'guides/sea.md'
9c8  const MODULES = Object.freeze({ '@orkestrel/sea': 'src/server', '@src/server': 'src/server' })
```

The constants block and the `sea.md fences` transcriptions are this package's own. The header
comment takes the canonical two sentences plus one naming the fences block, the shape `terminal` and
`markdown` already carry; the pilot's "the only part a sibling package changes" is false for a
package that also owns a fences block. Ancillary decision, recorded here.

## 2. The tables

Every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Returns`.

- `### Entities` became `### Classes`: every row's `Kind` is `class` (`SEA`, `Injector`, `Asset`,
  `AssetManager`). No class is documented under its own H3, so no table was added. `SEAError` and
  `ShellError` stay rows of the mixed `### Helpers and errors` table, which keeps its heading.
- Each `## Methods` table's `Behavior` header became `Summary` (`SEAInterface`, `InjectorInterface`,
  `AssetManagerInterface`).
- `### Constants` gained `Shape` between `Kind` and `Summary` under Ruling 18, with the convention
  sentence "A `Shape` cell holds the constant's declared type." An unannotated string const heads
  `string`, an unannotated numeric const `number`, and an annotated const its annotation
  (`ReadonlySet<string>`, `SEAEntryFormat`, `Readonly<Record<string, SEAPlatform>>`,
  `Readonly<Record<SEACompressionMode, number>>`) — the reading `websocket/guides/websocket.md:79`
  already carries.
- `### Types` gained `Shape` between `Kind` and `Summary` under Ruling 15, with the fleet's one
  wording. Every cell is Ruling 12's idiom: bare member names in braces, `?` on an optional member,
  `plus` before the call-signature members (`{ format } plus inject`,
  `{ emitter, count } plus asset, assets, keys, register, load, clear, destroy`,
  `{ emitter, status } plus execute, destroy`), a type alias's own literal with `\|` arms, and
  `AssetManagerEventMap` / `SEAEventMap` as bare member names per Ruling 19. No cell spells a
  member's type.
- The first column's header text (`API`, `Method`) is the guide's own and is untouched (Ruling 10).

The `Shape` column was inserted by `tmp/d7n-sea-converge/shape.mjs`, which splits on a pipe not
preceded by a backslash. Every non-`Summary` cell was then compared against the baseline:

```text
$ git show HEAD:guides/sea.md > tmp/d7n-sea-converge/sea.baseline.md
$ node tmp/d7n-sea-converge/cells.mjs tmp/d7n-sea-converge/sea.baseline.md guides/sea.md
rows before: 129, rows after: 129
rows missing after: 0
rows added: 0
non-Summary cells mismatched: 0
```

No row's literal stayed in a `Shape` cell against the idiom: every literal in the table is either a
type alias's own type literal (`SEACompressionMode`, `ExecutableFormat`, `SEAStatus`, `SEAErrorCode`,
`SEAEntryFormat`, `SEACompressionHandler`) or a constant's declared type.

## 3. The doc blocks rewritten by hand, then propagated

Each block below was rewritten before `--to guide` ran, because its cell carried what the block
lacked or its sentence was not what the code does.

- `createSEA`, `createInjector`, `createAsset`, `createAssetManager` — each states the contract it
  returns, in distinct wording so four adjacent rows do not carry one sentence. `createInjector`'s
  second description paragraph (format detection, no WASM, no external tools) moved into `@remarks`
  under Ruling 7.
- `patchSentinelFuse` — its second description paragraph (the 64 MB chunked search, what the fuse
  signals, the standalone availability) moved into `@remarks`; the reference to the `Injector` class
  is restated as the class rather than as a bare name.
- `walkDirectory` — the cell said "returns all file paths" and the code returns paths relative to
  the base and skips symlinks. Rewritten to "Walks a directory recursively and returns every file
  path it finds, relative to the base and skipping symlinks", verified against
  `src/server/helpers.ts` (the `relative(root, fullPath)` push and the `entry.isSymbolicLink()`
  continue).
- `redactCommand` — gained the purpose the guide cell carried ("so the command is safe to include in
  an error message").
- `stripTrailingNulls` — gained "NUL-padded binary name field", the subject the guide cell named.
- `isExecutableFormat`, `isPlatformSupported`, `isPEExecutable` — "Checks if" became "Checks whether",
  the term `isPowerOfTwo` and `isCompressible` already used.
- Every block in `src/server/constants.ts` — each names its literal under Ruling 18 (`0x5a4d`,
  `0x00004550`, `0x7f454c46`, `0x19`, `0x1000`, `0xfeedfacf`, `0x80000000`, `0x00000040`,
  `0x40000000`, 11, 2, 3, 1, 4, 6, 10, 16, 8, 40, `.br`, `cjs`, `NODE_SEA_BLOB`,
  `NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2`), takes a terminating period, and wraps every
  underscore-carrying identifier in a code span.
- Every documented member of `SEAInterface` and `AssetManagerInterface` in `src/server/types.ts`
  gained a doc comment; both interfaces reported `guide absent source absent` before the header
  rename. Their `readonly` data members gained one too, matching the shape
  `InjectorInterface.format` already had.

**Reader defect met, with the seed line that produced it.** A raw underscore pair in a description
is read as Markdown emphasis once the cell carries it, and the compared text loses the underscores
on the guide side while the source side keeps them. The seed's own baseline worklist shows it:

```text
guides/sea.md const MACHO_LC_SEGMENT_64: guide "Mach-O LCSEGMENT64 load command." source "Holds the Mach-O LC_SEGMENT_64 load command"
guides/sea.md const PE_RESOURCE_DIR_SIZE: guide "Size of IMAGERESOURCEDIRECTORY in bytes." source "Holds the size of IMAGE_RESOURCE_DIRECTORY in bytes"
```

Left alone, `--to guide` would write the raw identifier into the cell and the next `docs` run would
report the same pair again, with no doc-block rewrite able to close it. Wrapping the identifier in a
code span in the doc block closes it, because the reader trims a code span's boundary whitespace and
keeps its content. This is a guide-side reading worth a rule rather than a per-package fix: a
`Summary` cell is Markdown, so a description paragraph carrying `A_B_C` outside a code span cannot
converge. Sites fixed here: `MACHO_LC_SEGMENT_64`, `PE_RT_RCDATA`, `PE_RESOURCE_DIR_SIZE`,
`PE_RESOURCE_ENTRY_SIZE`, `PE_RESOURCE_DATA_ENTRY_SIZE`. No seed defect met.

The propagation:

```text
$ npm run docs -- --to guide
wrote guides/sea.md
rows read: 1, disagreements found: 129, written: 128, reported: 1
$ npx oxfmt --config .oxfmtrc.json --write guides/sea.md
```

The one reported row was the titled example pair, closed in criterion 4. A later single-row
correction (`walkDirectory`) ran the same way at `written: 1, reported: 0`.

## 4. The titled pair

The titled block is the primary factory's: `createSEA` in `src/server/factories.ts`, named by its
content rather than by a line number. Its title is `Build a single executable`.

The fence that demonstrates it is the guide's flagship fence, which imports `createSEA` and
`formatSize`, constructs the build, awaits `execute()`, and writes the result. It sat under the
structural heading `## Overview`, so Ruling 9 applies: the heading `### Build a single executable`
was added directly above the fence, `## Overview` stays, and no fence moved.

Fence bodies read before choosing: the `## Overview` fence (no three-backtick run, no `*/`); the
`### Injecting a resource directly`, `### Assets`, and `### Boundary and formatting helpers` fences
were not needed, since the first eligible fence demonstrates the primary factory. Heading
uniqueness, heading-scoped:

```text
$ grep -n '^#\+ Build a single executable' guides/sea.md
12:### Build a single executable
```

Ruling 14: nothing was deleted from either side. The block's example demonstrated construction and
`execute()` with different literal data; the fence demonstrates that plus the import line, the
`windows` and `timeout` options, and the result write, so the fence is the fuller side and the block
took it whole.

The block was titled by hand first, then the write ran last, after the summaries agreed:

```text
$ npm run docs                                  → rows read: 1, disagreements found: 1
$ npm run docs -- --to source
wrote src/server/factories.ts
rows read: 1, disagreements found: 1, written: 1, reported: 0
```

Every other `@example` in the package stays untitled.

## 5. The tagline, the opening prose, and the README

The H1 blockquote is one noun phrase in plain text, no link and no bold, and the README carries the
same text with the same line breaks:

```text
> The Node.js single executable application (SEA) builder: a pure-TypeScript pipeline
> that compresses assets, assembles the SEA blob, injects it into a copy of the host
> Node binary, and signs the result, with no WASM and no external tools.
```

The displaced sentences ("Source: …", "Surfaced through the `@orkestrel/sea` barrel.") fold into the
guide's opening paragraph after the blockquote, which is the only prose added there:

> Every export named here reaches a consumer through the `@orkestrel/sea` barrel, and its source
> sits under [`src/server`](../src/server).

The README's opening paragraph keeps the onboarding it alone carries and restates no tagline clause:

> Build a [Single Executable Application](https://nodejs.org/api/single-executable-applications.html)
> with the `createSEA` function: point it at your entry script and an output directory, then
> `await sea.execute()` for the finished binary. Part of the `@orkestrel` line.

The Node SEA link the old paragraph carried is kept; the pure-TypeScript, compress, blob, inject,
and no-external-tools clauses moved out of it and into the blockquote. `npm run test:guides` ran
after the README edit and is green (objective lane M9).

Other prose changed in the guide: the `## Methods` preamble, which said a `readonly` data member
"stays a Surface row" — under Ruling 15 those members now sit in the interface's `Shape` cell, so the
sentence names that instead and names `format`, `emitter`, `status`, and `count`. That is the one
fact landing in guide prose beside a table rather than in a compared cell. The Windows signing
paragraph lost its all-caps emphasis (`OPTIONAL`, `LAST` became `optional`, `last`) and its `+` as a
conjunction. A `## Tests` section was added before `## See also`, naming each suite and, for
`tests/guides.test.ts`, the equality gate's checks descriptively — every `Summary` cell against its
declaration's description paragraph, the titled `Build a single executable` fence against the
`@example` block of that title, the README pitch against the tagline — with no SQ/MQ/EQ/RQ
identifier.

Voice sweeps over the prose owned here: no count in prose survives (`the first two bytes of a PE
file` and `four-byte boundary` are a field size and an alignment boundary, values rather than counts
over a growable set); no all-caps emphasis survives in `guides/sea.md` or `README.md`; no clause
break in a rewritten block uses a spaced hyphen; no rewritten sentence borrows a sibling export's
name as its product noun. Every comment line extended was rewrapped by hand — the widest added line
is 90 characters, inside each file's existing width.

## 6. `npm run docs`

```text
$ npm run docs
rows read: 1, disagreements found: 0
DOCS EXIT 0
$ npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0
$ npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
```

## 7. Gates over the owned paths

```text
$ npx oxfmt --config .oxfmtrc.json --check guides/sea.md README.md src/server/constants.ts src/server/factories.ts src/server/helpers.ts src/server/types.ts src/server/validators.ts tests/guides.test.ts
All matched files use the correct format.
FMT EXIT 0

$ npx oxlint --config .oxlintrc.json --deny-warnings src/server/constants.ts src/server/factories.ts src/server/helpers.ts src/server/types.ts src/server/validators.ts tests/guides.test.ts
LINT EXIT 0

$ npm run check
> tsc --noEmit -p configs/src/tsconfig.server.json
CHECK EXIT 0

$ npm run test:guides
 Test Files  1 passed (1)
      Tests  37 passed (37)
GUIDES EXIT 0

$ npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
POLICY EXIT 0
```

Observation, the package's narrowest unit script, taken inside this unit's own exec under sibling
load:

```text
$ npm run test:src:server
 Test Files  7 passed (7)
      Tests  190 passed (190)
   Duration  1.55s
SRC EXIT 0
```

No lint control was planted: the Orchestrator takes that reading after this unit exits.

## 8. `git status --short`

```text
 M README.md
 M guides/sea.md
 M src/server/constants.ts
 M src/server/factories.ts
 M src/server/helpers.ts
 M src/server/types.ts
 M src/server/validators.ts
 M tests/guides.test.ts
```

Diffstat: 8 files changed, 366 insertions(+), 214 deletions(-).

Owned files only. `package.json` and `package-lock.json` are untouched; the `@orkestrel/guide` range
stays `^0.0.17`. No code token moved in any source file:

```text
$ git diff -U0 src | grep -E '^[+-]' | grep -vE '^[+-]{3}' | grep -vE '^[+-]\s*(\*|//|/\*\*)'
(no output)
```

Instruments are under `/home/user/fleet/sea/tmp/d7n-sea-converge/` (`shape.mjs`, `cells.mjs`,
`red-first.log.txt`, `sea.baseline.md`, `sea.before-shape.md`), which git ignores.

## Wall clock

First command 2026-09-07T20:58:11Z, last command 2026-09-07T21:12:43Z: about 15 minutes.

## Deviation state

None. `npm install` and `npm ci` were not run. No `git checkout`, `git restore`, `git stash`,
`git reset`, or `git clean` was run. No vendored file, no off-limits file, and no test outside
`tests/guides.test.ts` was edited, and no suite outside the owned scope went red.
