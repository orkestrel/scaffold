# Unit D5-fix-2 — report

Every finding the round carries landed. `npm run test:src:core` went from `6 failed | 394 passed (400)` before the fix to `400 passed (400)` after, and `PATH=/opt/npm11/bin:$PATH npm run test:distribution` is now green on all its cases, closing the standing `:293` red.

## What landed, by finding

**L1. One current-text map across rows.** `scripts/docs.ts:384` seeds one `Map<string, string>` from the inventory before the row loop. `writeGuide` (`:284-310`) and `writeSource` (`:319-360`) take that map, read the live text of the file they are about to rewrite, and write the result back into it; neither writes a file and neither returns a file list, so `Outcome` (`:77-81`) lost its `files` member. The flush at `:436-442` walks the map once after every row has run, compares each text against the frozen inventory, writes each moved file once, and sorts the names; `:444` prints `wrote <path>` once per moved file. `spliceSpan` and `replaceCell` offsets stay valid because each drift still recomputes its span from the text it is about to rewrite (`:340`, `:299`), which is now the live text rather than a per-row re-seed.

The row's key index moved to `Row.index` (`:73`), built once per row before the loop (`:397`), so `writeSource` no longer needs the inventory record at all. `Row.module` is gone with it.

Proof: `tests/src/core/compilers.test.ts:2361`, `carries every overlapping row into one source file and writes that file once`, over the `SEED_OVERLAP` fixture (`:2024-2124`) — a parent row over `src/core` and a child row over `src/core/panels`, each documenting one declaration of `src/core/panels/panel.ts`. It asserts the whole written file against `SEED_OVERLAP_WRITTEN` (`:2093`), asserts one `wrote ` line, and asserts a clean second report run. Before the fix that case reported `wrote src/core/panels/panel.ts` twice.

**L2. The whole-file proof.** `tests/src/core/compilers.test.ts:2275` asserts the written guide against `SEED_GUIDE_WRITTEN` (`:1906-1938`), a hand-written constant carrying `SEED_GUIDE` with the planted cells replaced. The `toContain` lines beneath it stay as named landmarks. Mutation check on the instrument: dropping the untouched `` | `Widget` | interface | … | `` row from the expected constant reddens the case with a whole-file `Object.is` diff (`1 failed | 399 skipped (400)`), and restoring the row greens it (`1 passed | 399 skipped (400)`).

**L3. `written` counts a change.** `scripts/docs.ts:304` and `:355` increment only when the replacement differs from the current text. Flagged: no case proves this limb, because the state is unreachable through the readers — `findDrift` reports a pair only where the sides carry different text, so a replacement reproducing the current bytes cannot arise from a reported drift. The flush's own `text === files[file]` comparison (`:438`) is what keeps the tally and the `wrote` line from disagreeing.

**L4. A missing index exits inside the code set.** `collectMissing` (`:185-195`) returns one line per input the run needs and the workspace lacks: `guides/README.md: the workspace carries no concept index to read` for a workspace with no index, and `<spec>: the concept index names it and the workspace does not carry it` for an index row naming a guide the inventory lacks. `:376-379` prints those lines and sets `process.exitCode = 2` before any row is built, so no throw reaches the process and no partial write happens on a broken index. Both throws are gone. Cases: `:2393` `names the concept index it cannot read and takes exit 2` and `:2409` `names the indexed guide the workspace does not carry and takes exit 2`, each asserting the line, exit `2`, an empty error stream, and that the workspace's files did not move. `runSeed` gained `stderr` (`:2170`) so the no-throw limb is asserted rather than inferred.

**L5. One word for one quantity.** `Outcome.reported` (`scripts/docs.ts:80`), `formatReported` (`:147`), and the printed `reported:` label (`:449`) now read as one word. Every call site follows (`:292`, `:296`, `:301`, `:324`, `:337`, `:342`, `:351`).

**L6. `collectSummaries`.** `scripts/docs.ts:169`, called at `:396`, beside `collectTitles`.

**L7. The seed's path has one home.** `src/core/constants.ts:111-112` declares `DOCS_SEED_PATH` with the doc block the brief fixes. `HOST_PATHS` reads it at `:143`. `blueprintToScripts` reads it at `src/core/compilers.ts:352`, `blueprintToHostArtifacts` at `:1601`, and the import row sits at `:39`. The `@example` at `:1591-1595` reads it too, which is what makes `grep -n "'scripts/docs.ts'" src/core/compilers.ts` print nothing; that example is executed by `tests/distribution.test.ts` and still prints `true` under the green distribution run. The guide's `## Surface` gained its row at `guides/scaffold.md:126`, whose `Summary` cell equals the doc block's description paragraph so the row adds no compared-key drift. Pin: `tests/src/core/helpers.test.ts:188` asserts `DOCS_SEED_PATH` equals the literal `'scripts/docs.ts'`, beside the existing literal membership assertions, so the pin cannot pass by reading the implementation back to itself.

**L8. The guide.** `guides/scaffold.md:1032-1039` replaces the exit-code sentence and names the pitch selection: the pitch pair is the `README.md` blockquote against the tagline of the guide the manifest's own bare name selects, `guides/<name>.md`, and a workspace whose manifest declares no name, whose index carries no row for that guide, or which carries no `README.md` reports no pitch line. The exit codes now read `1` while a disagreement stands, `0` when none does, and `2` for an argument outside `--to` and for an input the run cannot read, printing one line naming that file rather than throwing. No count of a growable set appears in the changed lines.

**L9. The seed's own comments.** `scripts/docs.ts:48` reads "Names the option the seed accepts, with the values it takes." A sweep of every comment in the file for a count of a growable set returns nothing else; the remaining occurrences are `one line per …` rates and singular articles.

**L10. The next-step line.** `scripts/docs.ts:451` prints `next: npm run format`. The expectations that pinned the old line follow at `tests/src/core/compilers.test.ts:2268`, `:2303`, `:2333` (the `not.toContain` guard), and `:2376`.

**L11. The rule bullet.** `.claude/rules/workspace.md:77-83`. The second "for every workspace" is gone and the bullet is re-wrapped to the file's width; no other sentence in the bullet or the file changed.

**L12. The pinned vendored list.** `tests/distribution.test.ts:282` carries `'scripts/docs.ts'` after `'scripts/ollama.sh'`, as the brief places it. Observation, not a deviation: the surrounding `scripts/` names in that list are otherwise alphabetical, so the row sits out of that local order; the list's assertions are membership and containment, and the `dist/host` comparison sorts, so no reading depends on the position.

**L13. The inventory.** `npm run build` regenerated `host.json`; the seed's entry sits at `:705-710` and the `.claude/rules/workspace.md` and `guides/scaffold.md` digests moved with their files.

## Citations this round renumbers

`d5-scaffold-seed-report.md`:

| Cited | The site | Now |
| --- | --- | --- |
| `.claude/rules/workspace.md:77-79` | the vendored-import bullet | `:77-83` |
| `scripts/docs.ts:227` | `normalizeComment` inside `findExample` | `:256` |
| `src/core/constants.ts:140` | the `HOST_PATHS` seed row | `:143`, reading `DOCS_SEED_PATH` declared at `:111-112` |
| `src/core/compilers.ts:229-234` | `blueprintToDevDependencies` excluding the workspace's own name | `:230-235` |
| `src/core/compilers.ts:349-352` | the `docs` emission under `blueprint.guides` | `:350-353`, reading `DOCS_SEED_PATH` |
| `src/core/compilers.ts:421-425` | the `blueprintToScripts` `@remarks` docs sentence | `:422-427` |
| `src/core/compilers.ts:448-452` | `blueprintToWritableScripts` admitting `docs` | `:449-453` |
| `guides/scaffold.md:1025-1044` | the equality-gate block | `:1026-1057` |
| `tests/src/core/compilers.test.ts:1806-2114` | the fixture and `describe('the documentation seed')` | `:1827-2423` |
| `tests/src/core/helpers.test.ts:17` | the `EXECUTABLE_PATHS` import row | `:18` |
| `tests/src/core/helpers.test.ts:178-191` | `vendors the documentation seed without an executable bit or a canon claim` | `:179-195` |
| `tests/distribution.test.ts:589`, `:857` | the `proof` blueprint | `:590`, `:858` |
| `host.json:704-709` | the staged seed entry | `:705-710` |

Unmoved this round, so still resolving as cited: `guides/scaffold.md:16-20`, `guides/scaffold.md:607-609`, and `tests/src/core/compilers.test.ts:611-631` at the `:616-637` the audit already renumbered it to.

`d5-fix-report.md`:

| Cited | The site | Now |
| --- | --- | --- |
| `src/core/constants.ts:130` | the `blueprintToHostArtifacts` mention in the `HOST_PATHS` remarks | `:133` |
| `src/core/constants.ts:180` | the same rename in the `CANON_PATHS` remarks | `:183` |
| `src/core/constants.ts:272` | the same rename in the `CATALOG_AGENT_PATH` remarks | `:275` |
| `src/core/compilers.ts:643-693` | `blueprintToRootTsconfig` own specifiers | `:644-694` |
| `src/core/compilers.ts:1598` | the `blueprintToHostArtifacts` declaration | `:1599` |
| `guides/scaffold.md:1025-1044` | the equality-gate block | `:1026-1057` |
| `tests/src/core/compilers.test.ts:1187` | the gate-law case it names | `:1187`, unmoved |
| `tests/src/core/compilers.test.ts:1787` | `plans the documentation seed and its script together with guides` | `:1787`, unmoved |
| `tests/src/core/compilers.test.ts:2018` | `describe('blueprintToRootTsconfig own specifiers')` | `:2182` |
| `tests/src/core/compilers.test.ts:1806-2114` | the fixture and the seed `describe` | `:1827-2423` |
| `tests/src/core/helpers.test.ts:312` | `keeps the documentation seed a candidate whatever else selects it` | `:317` |
| `.claude/rules/workspace.md:77-83` | the vendored-import bullet | `:77-83`, re-wrapped |

## Criteria, in order

**1. The greps — met.**

```text
$ grep -n "DOCS_SEED_PATH" src/core/constants.ts src/core/compilers.ts
src/core/constants.ts:112:export const DOCS_SEED_PATH = 'scripts/docs.ts'
src/core/constants.ts:143:	DOCS_SEED_PATH,
src/core/compilers.ts:39:	DOCS_SEED_PATH,
src/core/compilers.ts:352:		scripts.docs = `node --experimental-strip-types ${DOCS_SEED_PATH}`
src/core/compilers.ts:1591: * import { blueprintToHostArtifacts, createBlueprint, DOCS_SEED_PATH } from '@orkestrel/scaffold'
src/core/compilers.ts:1595: * blueprintToHostArtifacts(blueprint).some((artifact) => artifact.path === DOCS_SEED_PATH) // true
src/core/compilers.ts:1601:		(path) => blueprint.guides || path !== DOCS_SEED_PATH,

$ grep -n "'scripts/docs.ts'" src/core/compilers.ts
(no output)

$ grep -n "formatLeft\|buildSummaries\|run npm run format" scripts/docs.ts
(no output)

$ grep -n "'scripts/docs.ts'" tests/distribution.test.ts
282:			'scripts/docs.ts',

$ grep -c "declares for every workspace" .claude/rules/workspace.md
0
```

**2. The static gates — met.**

```text
$ npm run format:check                        EXIT 0
All matched files use the correct format.
Finished in 9851ms on 223 files using 4 threads.

$ npm run lint:check                          EXIT 0
> oxlint --config .oxlintrc.json --deny-warnings .

$ npm run check                               EXIT 0
> tsc --noEmit -p configs/src/tsconfig.bin.json
```

`scripts/docs.ts` is inside the root program: `tsc --project tsconfig.json --listFiles` lists `/home/user/scaffold/scripts/docs.ts`, so the seed's types are checked by criterion 2 rather than only by its spawned runs.

**3. The suites — met.**

```text
$ npm run test:src:core                       EXIT 0
 Test Files  9 passed (9)
      Tests  400 passed (400)

$ npm run test:src:core -- --reporter=verbose -t "the documentation seed"
✓ … the documentation seed > names every planted disagreement and writes nothing without a direction 211ms
✓ … the documentation seed > carries every summary to the guide and leaves the example and every other byte 217ms
✓ … the documentation seed > carries every summary and example to the source, and reads back clean 436ms
✓ … the documentation seed > reports a key no doc block carries and the pitch, and leaves both files 241ms
✓ … the documentation seed > prints one usage line and takes exit 2 for an argument outside its option 343ms
✓ … the documentation seed > carries every overlapping row into one source file and writes that file once 580ms
✓ … the documentation seed > names the concept index it cannot read and takes exit 2 190ms
✓ … the documentation seed > names the indexed guide the workspace does not carry and takes exit 2 191ms

$ npm run test:src:server                     EXIT 0
 Test Files  5 passed (5)
      Tests  432 passed (432)

$ npm run test:config                         EXIT 0
      Tests  172 passed | 1 skipped (173)

$ npm run test:policy                         EXIT 0
      Tests  91 passed (91)
```

Red-first, before any implementation edit, with the new cases and the changed expectations in place:

```text
$ npm run test:src:core                       EXIT 1
 FAIL … the documentation seed > carries every summary to the guide and leaves the example and every other byte
 FAIL … the documentation seed > carries every summary and example to the source, and reads back clean
 FAIL … the documentation seed > carries both overlapping rows into one source file and writes that file once
 FAIL … the documentation seed > names the concept index it cannot read and takes exit 2
 FAIL … the documentation seed > names the indexed guide the workspace does not carry and takes exit 2
 FAIL … isCanonPath > vendors the documentation seed without an executable bit or a canon claim
 Test Files  2 failed | 7 passed (9)
      Tests  6 failed | 394 passed (400)
```

The overlap case's red named the defect directly: `wrote src/core/panels/panel.ts` twice in the same run.

**4. Build and inventory idempotence — met.**

```text
$ sha256sum host.json                         d938a3e53705f148fb504f02638acf7dee265219e95ece4d37b97105a6ed839a
$ npm run build                               EXIT 0   build-inventory: staged 122 file(s) into host.json
$ sha256sum host.json                         d938a3e53705f148fb504f02638acf7dee265219e95ece4d37b97105a6ed839a
$ npm run build:inventory                     EXIT 0
$ sha256sum host.json                         d938a3e53705f148fb504f02638acf7dee265219e95ece4d37b97105a6ed839a
```

**5. Observations.**

```text
$ PATH=/opt/npm11/bin:$PATH npm run test:distribution      EXIT 0
 Test Files  1 passed (1)
      Tests  5 passed (5)
   Duration  76.48s (transform 896ms, setup 636ms, import 965ms, tests 74.65s, environment 0ms)
```

Both cases the deciding npm 11 run reported red at dispatch are green: `stages exactly the declared vendored host inventory` clears with the `scripts/docs.ts` row, and the packed-scaffold install clears as M8 recorded it does under npm 11.19.1. This reading was taken inside my own exec; the deciding run is the Orchestrator's.

```text
$ npm run docs                                            EXIT 1
rows read: 1, disagreements found: 316
$ diff <before> <after>                                   (identical)
```

The reported key set is byte-identical to the pre-change run, so the `DOCS_SEED_PATH` Surface row agrees with its doc block and adds no drift.

```text
$ npm run test:guides                                     EXIT 1
 FAIL  tests/guides.test.ts > guides > keeps every compared summary and example equal to its source
 FAIL  tests/guides.test.ts > guides > opens the README with the guide tagline
 Test Files  1 failed (1)
      Tests  2 failed | 17 passed (19)
```

Red on exactly the D4 cases the standing condition names, and on nothing else.

## Tree state

```text
$ git status --short
 M .claude/rules/documentation.md
 M .claude/rules/tests.md
 M .claude/rules/workspace.md
 M guides/scaffold.md
 M host.json
 M package.json
 M src/core/Compiler.ts
 M src/core/compilers.ts
 M src/core/constants.ts
 M tests/distribution.test.ts
 M tests/guides.test.ts
 M tests/setupServer.ts
 M tests/src/core/compilers.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/server/helpers.test.ts
 M tsconfig.json
?? scripts/docs.ts

$ git diff --stat
 .claude/rules/documentation.md   |  11 +-
 .claude/rules/tests.md           |  20 +-
 .claude/rules/workspace.md       |  30 +-
 guides/scaffold.md               |  73 ++++-
 host.json                        |  16 +-
 package.json                     |   1 +
 src/core/Compiler.ts             |   4 +-
 src/core/compilers.ts            |  90 ++++--
 src/core/constants.ts            |  19 +-
 tests/distribution.test.ts       |   1 +
 tests/guides.test.ts             |  51 ++-
 tests/setupServer.ts             |   2 +-
 tests/src/core/compilers.test.ts | 652 ++++++++++++++++++++++++++++++++++++++-
 tests/src/core/helpers.test.ts   |  29 ++
 tests/src/server/helpers.test.ts |  60 +++-
 tsconfig.json                    |   4 +-
 16 files changed, 971 insertions(+), 92 deletions(-)
```

The status carries D4, D5, and D5-fix beside this round. This unit moved `scripts/docs.ts`, `src/core/constants.ts`, `src/core/compilers.ts`, `guides/scaffold.md`, `.claude/rules/workspace.md`, `tests/distribution.test.ts`, `tests/src/core/compilers.test.ts`, `tests/src/core/helpers.test.ts`, and `host.json` by regeneration. `tests/distribution.test.ts` is the one file this round added to the status; every other file it touched was already dirty. No off-limits file moved.

## Flagged claims

- **L3 has no case.** The no-op replacement it guards against is unreachable through the readers, so the change is a code ruling rather than a proven behaviour. Stated in full under L3.
- **The distribution reading is mine, not the deciding one.** It ran inside this unit's exec, under this unit's own resident processes. The authoritative run belongs to the Orchestrator after this unit exits.
- **The example edit was not in the brief.** `src/core/compilers.ts:1591-1595` reads `DOCS_SEED_PATH` because criterion 1 requires the literal to disappear from that file. The example still executes and still prints `true` under the green distribution run, but the judgment to route the criterion through the doc block rather than to report it as a conflict is mine, and it is recorded here for review.
- **The vendored list's row order.** Recorded under L12: the row sits where the brief places it, which is out of the local alphabetical order of that list's `scripts/` names.

_Citations corrected by the Orchestrator after the closure round (`d5-fix-2-audit-objective.md` claim 8, `d5-fix-2-checker.md` claim 4): the span sites, the `formatReported` call sites, the `SEED_GUIDE_WRITTEN` range, the `DOCS_SEED_PATH` row, and the next-step expectations._
