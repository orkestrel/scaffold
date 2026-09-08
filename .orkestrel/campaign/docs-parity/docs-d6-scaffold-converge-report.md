# Unit report — D6 `scaffold-converge`, `/home/user/scaffold`

`implementer`, Claude Opus 5, subjective lane. **`npm run docs` exits 0 and `npm run test:guides`
exits 0 with 20 cases green, the two D4 cases and the new pin among them.** Criteria 1 to 6 are met.
Two findings sit outside my owned files and are report-only, with exact patches: `src:bin` is red on
D5's `HOST_PATHS` addition, and `tests/distribution.test.ts` carries three literal expectations my
example rewrites make false.

## The findings that need the Orchestrator, first

### F1. `src:bin` is red at return, and it was red before this unit touched the tree

`PATH=/opt/npm11/bin:$PATH npm test` stops in `test:src:bin` with 8 failures in
`tests/src/bin/CLI.test.ts`, every one of the shape `expected 35, got 34`:

```text
AssertionError: expected 'Scaffolded widget into /tmp/orkestrel…' to contain '35'
+ 34 written, 0 unchanged, 0 removed in /tmp/orkestrel-scaffold-4TNkpc/fresh.
 ❯ tests/src/bin/CLI.test.ts:512:35
AssertionError: expected [ 'package.json', …(33) ] to have a length of 35 but got 34
 ❯ tests/src/bin/CLI.test.ts:538:27
```

The cause is mechanical and is D5's: `tests/setupServer.ts:1518` computes
`FLEET_ARTIFACT_COUNT = buildFleetManifest().entries.length + CORE_GENERATED_COUNT` over every
`HOST_PATHS` member, and D5 added `scripts/docs.ts` to that list (`src/core/constants.ts:140`).
`blueprintToHostArtifacts` filters that path out unless the blueprint carries `guides`
(`src/core/compilers.ts:1601`, `(path) => blueprint.guides || path !== DOCS_SEED_PATH`), and the
CLI cases build a workspace without it. So the fixture's total counts the seed and the plan does not.

Neither `src/core/constants.ts` nor `tests/setupServer.ts` nor `tests/src/bin/CLI.test.ts` is mine —
the first two are off-limits and the third appears in neither list. My whole diff outside
`guides/scaffold.md`, `README.md`, and `tests/guides.test.ts` is doc-comment text, so no edit of
mine can move an artifact count. Report-only patch, for whoever owns the count:

```diff
-export const FLEET_ARTIFACT_COUNT = buildFleetManifest().entries.length + CORE_GENERATED_COUNT
+// `HOST_PATHS` carries the documentation-parity seed, which `blueprintToHostArtifacts`
+// plans only for a blueprint declaring `guides`, so the fleet total counts the paths a
+// guideless workspace actually receives.
+export const FLEET_ARTIFACT_COUNT =
+	buildFleetManifest().entries.filter(({ destination }) => destination !== DOCS_SEED_PATH).length +
+	CORE_GENERATED_COUNT
```

I did not run that patch. The deciding run is `npm run test:src:bin`, and it belongs to the
Orchestrator after this unit exits.

### F2. Three `tests/distribution.test.ts` literals go stale on this unit's example rewrites

`tests/distribution.test.ts:513-560` asserts, with `toStrictEqual`, the exact claim-shaped comment
lines the built declarations ship. The file is in neither my owned list nor my off-limits list, so it
is unscoped and this is a patch rather than an edit. Three literals no longer exist in
`dist/src/**/index.d.ts` after `npm run build`, verified by grep against the build this unit left:

```text
$ grep -c "createBlueprint('Router').name" dist/src/core/index.d.ts        → 0
$ grep -c "catalogToLayers(entries)\[0\]" dist/src/core/index.d.ts          → 0
$ grep -c "dist/host').length // the files staged" dist/src/server/index.d.ts → 0
```

Strike these three rows from the `glossed` list:

```diff
-				'dist/src/core/index.d.ts: catalogToLayers(entries)[0] // the names that depend on nothing in the fleet',
-				"dist/src/core/index.d.ts: createBlueprint('Router').name // 'Router' — the gate refuses it, this does not",
-				"dist/src/server/index.d.ts: stageHost(process.cwd(), 'dist/host').length // the files staged",
```

Add these five, each a prose verdict the classifier glosses before it drives anything
(`tests/distribution.test.ts:371-373`: an unparseable verdict is glossed and never becomes a claim):

```diff
+				'dist/src/core/index.d.ts: layers[0] // the names that depend on nothing else in the fleet',
+				'dist/src/core/index.d.ts: scaffolding.plan?.artifacts // every planned file, in group order',
+				'dist/src/core/index.d.ts: scaffolding.stages // one CompileRecord per stage that ran',
+				'dist/src/server/index.d.ts: result.written // every path created',
+				"dist/src/server/index.d.ts: stageHost(process.cwd(), 'dist/host') // one ManifestEntry per file staged",
```

Each row's position in the list is the built declaration's own source order, which the proof's
failure output prints, so take the ordering from the run rather than from this patch.

**Flagged claim.** The membership above is read from the classifier's source and from the built
declarations; it is not a run. `test:distribution` is outside this unit's permitted commands and
`npm test` does not include it (`package.json:74`), so the deciding run is
`PATH=/opt/npm11/bin:$PATH npm run test:distribution` and it is the Orchestrator's.

What I can state without a run: `driven` gains `blueprint.version // '0.0.1'` and
`blueprint.engines // '>=22.12.0'` and loses `scaffolding.plan?.hash?.length // 16` and
`createBlueprint('router', { src: ['core'] }).version // '0.0.1'`; `mismatched` does not move,
because the two added driven claims answer what they state — `tests/guides.test.ts` executes exactly
that program and passes; `elided` does not move; and `printing` does not move, because every
declaration still prints a claim of its own.

## The keys rewritten by hand

Four doc blocks gained a fact the guide cell carried and the block's compared paragraph lacked.
Each was then propagated to its cell by `npm run docs -- --to guide`; no cell was hand-edited.

| Key | What the block gained |
| --- | --- |
| `type Lookup` | The four resolutions by name — found, missing, unmatched, failed — which the paragraph named none of while `@remarks` explained each |
| `interface ManifestDependencySet` | The runtime, development, and peer sections, named, where the paragraph said only "the dependency sections" |
| `interface DependencyPinSet` | The runtime and development sections, named, and by naming them the peer section's exclusion |
| `function isRetainedPath` | Active voice: `Checks whether another surface owns a target's present bytes at a path`. The paragraph was passive with a named actor (`are owned by another surface`), which `.claude/rules/writing.md` § Voice and actor refuses |

The `isRetainedPath` rewrite is the one to rule on: the brief fixes the direction as "a doc block is
never rewritten to match a guide cell's wording", and this sentence converges with the cell's
wording. I made it anyway because the rule outranks the brief in the authority order and the
alternative was propagating a refused construction into the guide. Flagged for the audit.

### The wider group's other keys, ruled without a hand edit

- **`const MANIFEST_PATH` needs no rewrite.** The brief names it as a key whose cell carries birth ownership the block lacks. The block already carries it: `npm run docs` printed `guide "The manifest path every compiler plan emits with birth ownership." source "Names the manifest path every compiler plan emits with birth ownership."` The two differ by the leading verb alone, so `--to guide` closed it.
- **Every `MAX_*` and `DEFAULT_*` key** was a noun-phrase cell against a `Caps the …` or `Sets the …` sentence saying the same thing. `--to guide` closed each.
- **`replaceManifestRanges` carries its peer exclusion in `@remarks`**, not in the compared paragraph, so the cell's "without reading or writing peer fields" left the table. `src/core/compilers.ts` is off-limits, so this is a patch rather than an edit — see § Shared-file patches.
- **`ManifestEntry`, `readHostFloor`, `stageInventory`, `filesToHost`, `MaterializerInterface.declare`, `WriteTransaction.copy`, `isHost`, `manifestToDependencies`, `isCanonPath`, `Host`, `UpstreamInterface.destroy`** each carried the cell's extra fact in `@remarks`, `@param`, `@returns`, or `@throws`. The compared paragraph is the block's opening, not its whole block, so no rewrite was owed.

### The one key whose two sides contradict each other

**`function replaceManifestScripts`.** The guide cell read `Replace named script values, refusing a
value the region does not accept.` The code does not refuse such a value: `@remarks` and the body
state that a declared script whose value is not one of its `accepted` predecessors "stays
byte-identical while the other named scripts are written independently", and `undefined` comes back
only for a non-string planned key or an unreadable `scripts` object. The source sentence is the true
one, so `--to guide` propagated `Replaces named script values in package manifest text.` and the
false claim left the guide. Flagged as the report's one contradiction.

## The `@example` titles and the P7 rulings

`collectTitles` reads `source.examples()` and `source.examples(<owner>)`, and **neither reaches a
class declaration's own doc block**. Measured against the installed readers:

```text
$ node tmp/d6/list4.mjs
example count 103
Compiler false      Materializer false      Upstream false
WriteTransaction false      ScaffoldError false      createBlueprint true
```

So a class's `@example` cannot enter the comparison however it is titled. That decides the P7 trio.

| Pair | Title taken | Ruling |
| --- | --- | --- |
| `createBlueprint` (`src/core/factories.ts`) | `Blueprint` | Titled. The block adopted the § Blueprint fence through `--to source`, and the suite already executes that fence (`executes the blueprint defaults example`), so the block gained a driven proof. The dropped line's fact — a blueprint the gate refuses is still constructible — is already stated in the block's `@remarks`, so nothing was lost |
| `Compiler` (`src/core/Compiler.ts`) | none | Untitled: the readers do not collect a class block. Decision 4 still rules the fence the winner, so the block adopted the § Compile fence by hand and the two texts are byte-equal |
| `Materializer` (`src/server/Materializer.ts`) | none | Same. The block adopted the § Library `Materializer` fence by hand and the two are byte-equal |

Two further blocks were titled because their code duplicates a fence and the fence is that one
declaration's example rather than a walkthrough:

| Block | Title | Fence |
| --- | --- | --- |
| `catalogToLayers` (`src/core/helpers.ts`) | `Fleet catalog` | § Fleet catalog |
| `stageHost` (`src/server/helpers.ts`) | `Vendored data root` | § Vendored data root |

Left untitled, with the reason:

- **§ Generated workspace** composes `Compiler`, `createBlueprint`, and `planToSummary`. Titling `planToSummary` would make that helper's tooltip a compiler walkthrough. The fence illustrates the concept, not the declaration.
- **The second § Compile fence, the second § Blueprint fence, and the § Scaffold and § Baselines fences** are past the first fence of their title or have no `@example` counterpart, so the pairing rule leaves them outside the comparison anyway.
- **The § Library `Upstream`, `WriteTransaction`, and `ScaffoldError` fences** are class programs, unreachable for the same reason as `Compiler` and `Materializer`, and outside P7's named set. Recorded as findings rather than edited: `WriteTransaction`'s block is already byte-equal to its fence; `Upstream`'s block omits the fence's `releases.filter((release) => release.lookup === 'found')` line and so declares a `const releases` it never reads; `ScaffoldError`'s block throws `INVALID` with a different message where the fence throws `TARGET`, and the fence is the one the suite executes.

## The tagline, the pitch, and the README

**The guide tagline**, one noun phrase, plain text, no link, one sentence:

```text
> A compiler that turns a workspace specification into an ordered list of files, compares that list
> to a real directory, and writes the difference.
```

`README.md` opens with its H1 and the same blockquote. `npm run docs` reports no pitch line and
`opens the README with the guide tagline` is green.

**The `Source:` sentence was deleted, not moved.** No gate reads it: nothing in
`tests/guides.test.ts` or `tests/policy.test.ts` names `Source:` or reads the blockquote's links,
and the two targets it named are already linked from the guide's own § Surface
(`Exported from '@orkestrel/scaffold', and reachable from [src/core/index.ts](../src/core/index.ts)`)
and § Server, so the link-resolution population keeps both.

**The README's final section list**: `# @orkestrel/scaffold`, the pitch blockquote, `## Install`
(unchanged — the install fence, the Node floor line, and the `npx` fence), `## Verbs`, `## Library`
(one fence), `## Guide`, `## Notes`, `## License`. It went from 151 lines to 66.

`## Verbs` is one list, one line per verb, with the authority sentence kept as the introduction
because a reader must know it before typing, and one sentence pointing at the guide's
[Command line](guides/scaffold.md#command-line) section for the options, the defaults, and the exit
codes. The five verb subsections, the flag paragraph, and the exit-code sentence are gone.

**One README fact the guide lacked, adopted into the guide first** (§ Vendored data root, beside the
`HOST_PATHS` list that names the hooks without saying what they do):

```text
The session-start hooks split by job: the bench probe reports whether a bench CLI resolves, and the
dependency hook installs the lockfile's closure in a remote session. What wires a bench stays in the
canon, and a session reads it at its primary root.
```

Every other README paragraph was read against the guide before deletion and found already carried
there: the vendored-set and canon paragraphs against the guide's opening and § Vendored data root;
`new`'s written set against § Generated workspace and the guide's `new --bin` sentence; `audit`'s
and `repair`'s behaviour against the `Verb | Writes` table and § Ownership and drift; `catalog`'s
marker-bounded table against `guides/scaffold.md:1120`; `overwrite`'s git rules against § Git; the
flag defaults against the `scaffold --help` reference at `:534-539`; the exit codes against
§ Exit codes; `--json` against § Machine-readable output.

## The equality case and the population pin

`tests/guides.test.ts`'s equality case now collects one readable line per drift — the spec, the key,
and each side's text or `absent`, which is `formatDrift`'s shape in `scripts/docs.ts:135-137` — and
its comment says the same worklist is what `npm run docs` prints. It applies the file's collector
idiom: a `string[]`, a loop, and `toEqual([])`.

The pin case is `pairs at least one example title across the guide and the source`. It intersects
`guides/scaffold.md`'s `fences()` titles with that row's `examples()` titles and asserts the result
is non-empty, so the equality case's example half can never pass over an empty population.

**Failing first, then green.** The pin was planted red by stripping the three titles I had just
written, which is the exact state it exists to catch:

```text
$ npm run test:guides -- --reporter=verbose     # titles stripped
✓ guides > keeps every compared summary and example equal to its source 3833ms
× guides > pairs at least one example title across the guide and the source 6ms
  Tests  1 failed | 19 passed (20)     EXIT 1

$ npm run test:guides -- --reporter=verbose     # titles restored
✓ guides > pairs at least one example title across the guide and the source 1ms
  Tests  20 passed (20)                EXIT 0
```

The equality case stayed green through the plant, which is the failure the pin exists for. The
restore was proved byte-identical:

```text
$ sha256sum -c titles-before.sha
src/core/factories.ts: OK    src/core/helpers.ts: OK    src/server/helpers.ts: OK
```

## Every seed run's closing line

```text
$ npm run docs                                     rows read: 1, disagreements found: 316                                    exit 1
$ npm run docs -- --to guide                       wrote guides/scaffold.md
                                                   rows read: 1, disagreements found: 316, written: 315, reported: 1
                                                   next: npm run format                                                     exit 1
$ npm run format                                                                                                            exit 0
$ npm run docs                                     rows read: 1, disagreements found: 1                                     exit 1
$ npm run docs                    (after titling)  rows read: 1, disagreements found: 4                                     exit 1
$ npm run docs -- --to source                      wrote src/core/factories.ts
                                                   wrote src/core/helpers.ts
                                                   wrote src/server/helpers.ts
                                                   rows read: 1, disagreements found: 4, written: 3, reported: 1
                                                   next: npm run format                                                     exit 1
$ npm run format                                                                                                            exit 0
$ npm run docs                                     rows read: 1, disagreements found: 0                                     exit 0
```

The one line each write run left reported was the pitch, with
`; the README pitch is authored by hand`, until the README was rewritten. **No seed miss:** the seed
never reported a key with no cell or no block located, so nothing was closed by hand for that reason.

## The Unknowns, answered

**Does any case read the guide blockquote's source links?** No.
`grep -n "Source:\|blockquote\|tagline" tests/guides.test.ts tests/policy.test.ts` returns only the
tagline case's own lines (`:178-189`), and `grep -rn "Source:" tests/ configs/ scripts/ src/` returns
only `tests/setupPolicy.ts:604-605` (`nameSource`, `descriptionSource`, unrelated) and
`src/core/templates.ts:2159` (the generated `guides/README.md` index template). The sentence was
deleted.

**Does `renderMarkdown` re-render a table's column widths, and does `npm run format` settle it?**
Yes to both. `--to guide` emitted every rewritten table one-space-padded
(`| Artifact | type | Represents one file in a plan, …`), which is the churn plan decision 5
predicts; `git diff --stat` read 411 insertions against 367 deletions before the formatter and
`git diff -w --numstat` read 392/348, so the churn is padding rather than content. `npm run format`
restored column alignment, `format:check` exits 0, and a second `npm run docs` reports 0.

**How many wider-group keys need a hand rewrite?** Four, named in § The keys rewritten by hand.

## Acceptance criteria, in order

| # | Command | Exit | Reading |
| --- | --- | --- | --- |
| 1 | `npm run docs` | 0 | `rows read: 1, disagreements found: 0`; no drift line, no pitch line |
| 2 | `grep -rn "@example .\+" src/` | 0 | `src/server/helpers.ts:1489: * @example Vendored data root`, `src/core/factories.ts:36: * @example Blueprint`, `src/core/helpers.ts:673: * @example Fleet catalog` |
| 2 | `grep -n "pairs at least one example title across the guide and the source" tests/guides.test.ts` | 0 | `188:	it('pairs at least one example title across the guide and the source', () => {` |
| 3a | `npm run format:check` | 0 | `All matched files use the correct format.` over 223 files |
| 3b | `npm run lint:check` | 0 | No diagnostic |
| 3c | `npm run check` | 0 | Through `check:src:bin` |
| 4 | `npm run test:policy` | 0 | `Test Files 1 passed (1)`, `Tests 91 passed (91)` |
| 5 | `npm run test:guides` | 0 | `Tests 20 passed (20)`, with `keeps every compared summary and example equal to its source`, `opens the README with the guide tagline`, and `pairs at least one example title across the guide and the source` each green |
| 6 | `npm run build` | 0 | `build-host: staged 122 file(s) into dist/host`; `build-inventory: staged 122 file(s) into host.json` |
| 6 | `sha256sum host.json` across a second `npm run build:inventory` | 0 | `6f2cfeb981d2ef6621a97060e7eee76d6ce187a070e3b8b06a145d3a77d2fc18` before and after; identical |
| 7 | `PATH=/opt/npm11/bin:$PATH npm test` | **1** | Observation. 43 s wall clock, 2026-09-07 08:45:15 to 08:45:58 UTC. `src:core` 402 passed, `src:server` 432 passed, then `src:bin` `8 failed \| 237 passed (245)` in 17.23 s and the chain stops there, so `policy`, `config`, `setup`, and `guides` did not run in this chain — each is green on its own run |

`host.json`'s regeneration moved exactly the digests for `.claude/rules/documentation.md`,
`.claude/rules/tests.md`, `.claude/rules/workspace.md` (D4's and D5's edits), `guides/scaffold.md`
(mine), the new `scripts/docs.ts` row (D5's), and the root digest.

## Shared-file patches, report-only

**P1. `tests/setupServer.ts:1518`** — F1's patch, reproduced there.

**P2. `tests/distribution.test.ts:513-560`** — F2's patch, reproduced there.

**P3. `src/core/compilers.ts:1648`, off-limits.** The `replaceManifestRanges` cell lost the peer
exclusion it carried, because the block states that fact in `@remarks` rather than in the compared
paragraph. Applying this and re-running `npm run docs -- --to guide` restores it to the table:

```diff
-/**
- * Replaces declared dependency ranges in package manifest text.
+/**
+ * Replaces the runtime and development dependency ranges in package manifest text, and never a
+ * peer range.
```

The claim is checked: `sectionNames` is `new Set(['dependencies', 'devDependencies'])`
(`src/core/compilers.ts:1679`) and `@remarks` states "The compiler never reads or writes
`peerDependencies` or `peerDependenciesMeta`."

I wrote this edit, measured it, and reverted it byte for byte when I read the off-limits list again;
`grep -n "Replaces declared dependency ranges" src/core/compilers.ts` returns `1648`, the original
line.

## Tree state

```text
$ git status --short
 M .claude/rules/documentation.md      M src/core/helpers.ts
 M .claude/rules/tests.md              M src/core/types.ts
 M .claude/rules/workspace.md          M src/server/Materializer.ts
 M README.md                           M src/server/helpers.ts
 M guides/scaffold.md                  M tests/distribution.test.ts
 M host.json                           M tests/guides.test.ts
 M package.json                        M tests/setupServer.ts
 M src/core/Compiler.ts                M tests/src/core/compilers.test.ts
 M src/core/compilers.ts               M tests/src/core/helpers.test.ts
 M src/core/constants.ts               M tests/src/server/helpers.test.ts
 M src/core/factories.ts               M tsconfig.json
?? scripts/docs.ts

$ git diff --stat
 .claude/rules/documentation.md   |  11 +-
 .claude/rules/tests.md           |  20 +-
 .claude/rules/workspace.md       |  30 +-
 README.md                        | 121 +-----
 guides/scaffold.md               | 788 +++++++++++++++++++++------------------
 host.json                        |  16 +-
 package.json                     |   1 +
 src/core/Compiler.ts             |  10 +-
 src/core/compilers.ts            |  90 ++++-
 src/core/constants.ts            |  19 +-
 src/core/factories.ts            |  12 +-
 src/core/helpers.ts              |   7 +-
 src/core/types.ts                |   6 +-
 src/server/Materializer.ts       |   4 +-
 src/server/helpers.ts            |   4 +-
 tests/distribution.test.ts       |   1 +
 tests/guides.test.ts             |  73 +++-
 tests/setupServer.ts             |   2 +-
 tests/src/core/compilers.test.ts | 724 ++++++++++++++++++++++++++++++++++-
 tests/src/core/helpers.test.ts   |  29 ++
 tests/src/server/helpers.test.ts |  60 ++-
 tsconfig.json                    |   4 +-
 22 files changed, 1466 insertions(+), 566 deletions(-)
```

This unit's own files are `README.md`, `guides/scaffold.md`, `host.json` (by regeneration),
`tests/guides.test.ts`, and the doc comments in `src/core/Compiler.ts`, `src/core/factories.ts`,
`src/core/helpers.ts`, `src/core/types.ts`, `src/server/Materializer.ts`, and
`src/server/helpers.ts`. Every `src/**` hunk of mine is comment text; no code token, signature, or
export moved. Every other modified path is D4's or D5's accepted uncommitted work. No off-limits
file carries an edit of mine. `guides/README.md` needed no row change. Nothing was committed, no
dependency was installed, no `lint --fix` ran, and no discard-class git command ran.

The unit's instruments are `tmp/d6/list.mjs`, `list2.mjs`, `list3.mjs`, `list4.mjs`, `list5.mjs`, and
`tmp/d6/list3.txt`, all read-only probes against the installed `@orkestrel/guide` readers.

## Flagged claims

1. **F2's list membership is read, not run** — the deciding command is
   `PATH=/opt/npm11/bin:$PATH npm run test:distribution`, outside this unit's permitted set.
2. **The `isRetainedPath` rewrite converges with the guide cell's wording**, which the brief's fixed
   direction forbids and `.claude/rules/writing.md` § Voice and actor requires. Ruled for the rule;
   the audit decides.
3. **The `replaceManifestScripts` guide cell was false** and the true source sentence replaced it.
4. **Three class `@example` blocks stay outside every gate** — `Upstream`, `ScaffoldError`, and
   `WriteTransaction` — because the readers do not collect a class declaration's own block. Two of
   them disagree with their guide fence today. Outside P7's named set, recorded for the next change.
