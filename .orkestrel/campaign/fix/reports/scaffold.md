# Fix report: scaffold

## Dispositions

- **s02-01** applied (src/core/constants.ts, src/server/Materializer.ts, tests/setupServer.ts, tests/src/bin/CLI.test.ts, guides/scaffold.md): Declared CATALOG_OPENING_MARKER and CATALOG_CLOSING_MARKER in src/core/constants.ts beside CATALOG_AGENT_PATH, imported them in Materializer.#recatalog, deleted the two static fields and the comment, and pointed the CATALOG_AGENT_TEXT fixture and the CLI marker assertions at them. Added the two guide Surface rows the barrel parity test requires.
- **s02-02** applied (src/server/constants.ts, src/server/Upstream.ts, guides/scaffold.md): Moved all ten values into src/server/constants.ts under the names the repair gave, imported them in Upstream, and deleted the static block and both comments. Added ten guide Surface rows because src/server/index.ts star-exports constants.js.
- **s02-03** applied (src/server/Materializer.ts): Imported MANIFEST_NAME from ./constants.js and used it in #reconcile in place of the 'manifest.json' literal.
- **s02-04** applied (src/server/types.ts, src/server/Upstream.ts, guides/scaffold.md): Declared HostInventory, ReadAllowance, TextReadResult, and BytesReadResult in src/server/types.ts and referenced them at every inline site (three inventory records, twenty allowance parameters, every #readWithRetries/#request/#body overload). Two ancillary decisions: the read-outcome pair is named TextReadResult/BytesReadResult so it follows the {Entity}Result form in names.md rather than the dossier's informal 'ReadOutcome'; and ReadAllowance.remaining is declared mutable, which is a deliberate departure from the readonly-properties law because the carrier's mutation is the mechanism that makes budget a per-call bound. The departure is stated in that interface's @remarks.
- **s02-05** applied (src/bin/CLI.ts, src/bin/helpers.ts, src/bin/types.ts, tests/src/bin/helpers.test.ts, tests/setupServer.ts): Moved all fourteen methods to src/bin/helpers.ts as exported functions under the names the repair gave, deleted the privates, rewired every call site, and added a unit test per extracted function in tests/src/bin/helpers.test.ts (107 tests in that file now pass). Two ancillary decisions: versionsToRefusal and fetchToRefusal return the ScaffoldError rather than throwing it, so the {noun}To{Noun} names the repair chose are honest and the leaves are pure — the five and two call sites throw the returned refusal; and scriptToInvocations needed a name for its return shape, declared as ScriptInvocations in src/bin/types.ts (src/bin has no barrel, so it is not published). A CATALOG_AGENT_ROWS_TEXT fixture was added to tests/setupServer.ts because catalogToNames needs a table with rows, which CATALOG_AGENT_TEXT deliberately lacks.
- **s02-06** applied (src/bin/CLI.ts, src/bin/helpers.ts): Exported writeOutput and writeDiagnostic from src/bin/helpers.ts, defaulted the CLI constructor to them, and deleted both static fields; the explanatory comment moved onto the constructor assignment. No direct unit test: the pair writes to the real process streams, and tests/src/bin/main.test.ts already drives the built entry as a real child and asserts the report arrives on stdout with stderr clean, which is the honest evidence for both.
- **s02-07** applied (src/core/helpers.ts, src/server/Materializer.ts, tests/src/core/helpers.test.ts, guides/scaffold.md): Exported isRetainedPath from src/core/helpers.ts with the TSDoc the repair asked for, collapsed all three two-branch blocks in #expand and #expandRaw to one if, added a guide Surface row, and added tests covering both arms plus a canon-path control the predicate must refuse.
- **s02-08** applied (src/core/helpers.ts, src/server/helpers.ts, src/bin/CLI.ts, tests/src/core/helpers.test.ts, guides/scaffold.md): Exported isFloorPath from src/core/helpers.ts carrying the concept the three comments described between them, called it at all three sites, condensed the filesToHost @remarks and the CLI comment to point at the named predicate, added a guide Surface row, and added tests with a workspace-owned-path control the predicate must refuse.
- **s02-09** applied (src/core/compilers.ts, src/core/helpers.ts, tests/src/core/compilers.test.ts, tests/src/core/helpers.test.ts, guides/scaffold.md): Moved srcToRoot and artifactToFinding into src/core/helpers.ts, imported them back into compilers.ts, moved their guide rows from the Compilers table to the Helpers table, and moved the artifactToFinding producer-matrix test (with its OWNERSHIPS/PLANNED/MATCHING/DIFFERING data) from tests/src/core/compilers.test.ts to tests/src/core/helpers.test.ts so the mirror holds. Explicit ruling on pathToCondition: it stays in compilers.ts. It builds an exports condition block — a fragment of the manifest shape its sibling manifest compilers emit — so it is a shape compiler rather than a leaf projection, and its guide row stays in the Compilers table.
- **s02-10** applied (src/server/helpers.ts): Replaced the mojibake sequence with the ellipsis in the readHostFloor @throws line, matching every sibling @throws in the file.
- **s02-11** applied (src/server/helpers.ts): Deleted the stranded 'the' in the readSnapshot @remarks, so the clause reads '…as a present directory; they are different verdicts.'
- **s02-12** applied (src/bin/CLI.ts): Changed both #reportReplacements line-count patterns to /\r\n|\n/u, so a lone carriage return inside a line no longer inflates the reported count.
- **s02-13** applied (src/bin/CLI.ts): Applied what the two lane corrections share. Renamed the method to the bare verb #declare, which both lanes admit and which the names.md row the objective lane quoted requires. Renamed the local pair together, as the DRIFT-RESHAPE lane requires, to local (the half already written from the floor) and remainder (the DRIFT lane's chosen token for the second half's result), so neither identifier states the opposite of what it holds on either branch. Moved the 'network half' comment onto #reconcile and gave #declare a comment saying it substitutes for that half when --offline is given.
- **s02-16** applied (src/bin/helpers.ts): Imported isError from @orkestrel/contract and used it at both sites, matching how src/server/helpers.ts and src/server/Upstream.ts already ask the question.
- **s02-17** deferred_wave: The repair is TSDoc first-sentence voice across the whole src/ population and the finding itself defers the ruling. The fleet migrates to third-person first sentences in a later dedicated wave, so nothing was applied here. Every TSDoc sentence written or rewritten in this unit uses the third-person form.

## Gates

- npm run format:check: pass — All matched files use the correct format. Finished in 6300ms on 213 files using 4 threads.
- npm run lint:check: pass — oxlint --config .oxlintrc.json --deny-warnings . (no output, exit 0)
- npm run check: pass — tsc --noEmit --project tsconfig.json && check:src:core && check:src:server && check:src:bin, all silent
- npm run build: pass — build-host: staged 116 file(s) into dist/host; build-inventory: staged 116 file(s) into host.json
- npm test: pass — src:core 377 passed (8 files); src:server 431 passed (5 files); src:bin 244 passed (3 files); policy 111 passed; config 46 passed; guides 17 passed

## Diffstat

```text
 guides/scaffold.md               |  22 +-
 host.json                        |   4 +-
 src/bin/CLI.ts                   | 477 ++++++-----------------------
 src/bin/helpers.ts               | 638 ++++++++++++++++++++++++++++++++++++++-
 src/bin/types.ts                 |  12 +
 src/core/compilers.ts            |  75 +----
 src/core/constants.ts            |  20 ++
 src/core/helpers.ts              | 126 ++++++++
 src/server/Materializer.ts       |  38 +--
 src/server/Upstream.ts           | 162 ++++------
 src/server/constants.ts          |  55 ++++
 src/server/helpers.ts            |  27 +-
 src/server/types.ts              |  62 ++++
 tests/setupServer.ts             |  32 +-
 tests/src/bin/CLI.test.ts        |   6 +-
 tests/src/bin/helpers.test.ts    | 356 +++++++++++++++++++++-
 tests/src/core/compilers.test.ts |  84 +-----
 tests/src/core/helpers.test.ts   | 117 +++++++
 18 files changed, 1602 insertions(+), 711 deletions(-)
```

- dist moves: true

## Deviations

One tree change sits outside the brief's named Owned set and is reported rather than resolved: host.json, the committed vendored-file inventory, was regenerated by `npm run build`. It is not on the off-limits list, and it is machine-generated rather than authored. It had to move because guides/scaffold.md is a vendored destination the inventory carries a digest for, so editing the guide invalidated that digest. Reading `readHostFloor` against unchanged code shows this is not a defect in the change: run from source it reads the repository root through HOST_INVENTORY_PATH and throws TARGET when a declared file's bytes no longer hash to the recorded digest. Before the build regenerated it, one src:server test and five src:bin tests failed with `The vendored host cannot read the declared file at guides/scaffold.md`; after the build all six pass and tests/config.test.ts reports `host-inventory: entries=116`. The gate chain regenerates it before the suite runs, so the order in the brief already covers this. Two ancillary rulings taken under the deviation contract rather than stopping the unit are recorded in the s02-04 and s02-05 notes: the mutable `remaining` on ReadAllowance, and the two refusal projections returning their ScaffoldError instead of throwing it. No lane correction in s02-13 conflicted in a way re-verification could not settle.
