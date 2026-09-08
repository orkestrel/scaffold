# Unit report — D6-fix-2, converge-close

`builder`, Sonnet. N0a to N0e and N2 to N5 applied. Every criterion this unit's own edits touch is
green. One criterion — the distribution proof's confirming run exiting `0` — does not close, for a
cause outside this unit's owned files: reported under **Deviation**.

## N0a — the seed is planned for every blueprint

`src/core/compilers.ts:1599-1601` (`blueprintToHostArtifacts`): the filter is gone, `selected =
selectHostPaths(HOST_PATHS, blueprint.name)`. The `@remarks` paragraph reads:

> The documentation-parity seed is vendored like every other hook. The `docs` script
> {@link blueprintToScripts} emits and the `guides` project the root configuration registers select
> with `guides`, so a workspace that indexes no guides carries the seed and no script that runs it;
> `npm run check` there still resolves the seed's import, because every workspace declares
> `@orkestrel/guide`.

The `@example` now opens `createBlueprint('router')`.

## N0b — the cases follow

- `tests/src/core/compilers.test.ts:1787-1799`: renamed `vendors the documentation seed for every
  blueprint and emits its script with guides`; both `planned` and `withheld` contain
  `'scripts/docs.ts'`, `blueprintToScripts(indexed).docs` is the strip-types command,
  `blueprintToScripts(bare)` carries no `docs`, and `expect(withheld).toStrictEqual(planned)`.
- `tests/src/core/helpers.test.ts:313-315`: comment rewritten to state the seed is selected like
  every other vendored hook, with no guides gate anywhere in the selection path; the case itself is
  unchanged (it already asserted the seed as a candidate for every name).
- `tests/src/core/Compiler.test.ts:71,74`: measured red first —
  `expected [ …(40) ] to have a length of 39 but got 40` — then set to `40` and `22`, matching
  D5's original P1 patch. Green after the edit.

## N0c — the fleet total is the whole host set again

`tests/setupServer.ts`: `FLEET_ARTIFACT_COUNT` returns to the single line
`buildFleetManifest().entries.length + CORE_GENERATED_COUNT`, no comment above it, and the
`DOCS_SEED_PATH` import is removed (nothing else in the file read it — confirmed with
`grep -n "DOCS_SEED_PATH" tests/setupServer.ts`, no hits).

## N0d — the guide

`guides/scaffold.md`: the two named sentences replaced verbatim as the brief states, and the
surrounding paragraphs re-wrapped by hand to the file's width. `npm run docs` reports
`rows read: 1, disagreements found: 0`, exit `0` — the compared paragraphs did not move, confirming
no drift.

## N0e — `src:bin` green

`npm run test:src:bin` exits `0`, `Test Files 3 passed (3)`, `Tests 245 passed (245)`, including the
CLI upstream case at `CLI.test.ts:729`. This needed `npm run build` first (see **Ordering note**
below); N0e's own criterion is read after that rebuild, matching N5's own requirement.

## N2 — the distribution proof's claim lists

Ran `PATH=/opt/npm11/bin:$PATH npm run test:distribution` once to read the printed lists. The
`glossed` list moved exactly as the D6-fix brief and the D6 converge report state: three rows
(`catalogToLayers(entries)[0]`, `createBlueprint('Router').name`, `stageHost(...).length`) left the
list, replaced in the built declarations' own printed order by
`layers[0] // the names that depend on nothing else in the fleet`,
`scaffolding.plan?.artifacts // every planned file, in group order`,
`scaffolding.stages // one CompileRecord per stage that ran` on the core side, and
`stageHost(process.cwd(), 'dist/host') // one ManifestEntry per file staged` replacing the removed
`.length` row and `result.written // every path created` added on the server side. Applied to
`tests/distribution.test.ts:513-543`. The `driven`, `elided`, `undriven`, and `mismatched`
expectations needed no edit: they assert through `toContain`/`.length`/`toStrictEqual` against sets
the moved rows do not touch.

Confirming run (second): the claim-list case is green in both the first and the confirming run. See
**Deviation** for the one case in this same file that does not close.

## N3 — `replaceManifestRanges` names its peer exclusion

`src/core/compilers.ts:1647` (formatter-wrapped across two lines):

```text
Replaces the runtime and development dependency ranges in package manifest text, and never a
peer range.
```

`npm run docs -- --to guide` wrote `guides/scaffold.md` (`rows read: 1, disagreements found: 1,
written: 1, reported: 0`), `npm run format` ran, and a second `npm run docs` reports
`disagreements found: 0`, exit `0`. The cell (`guides/scaffold.md:268`) carries the same sentence.

## N4 — two class blocks adopt their fences

**`Upstream`** (`src/server/Upstream.ts`): the block's `@example` gained the line
`releases.filter((release) => release.lookup === 'found')` between the `lookup` call and
`upstream.destroy()`. Byte comparison:

Block, after the edit:

```ts
import { Upstream } from '@orkestrel/scaffold/server'

const upstream = new Upstream({ registry: { timeout: 5_000 } })
const releases = await upstream.lookup([{ name: '@orkestrel/emitter', range: '^0.0.5' }])

releases.filter((release) => release.lookup === 'found')
upstream.destroy()
```

Guide fence (`guides/scaffold.md:1505-1512`), identical text. Equal.

**`ScaffoldError`** (`src/core/errors.ts`): the block's `@example` adopted the guide's § Library
fence — import order swapped (`isScaffoldError, ScaffoldError`), the thrown code changed
`'INVALID'` → `'TARGET'`, and the message changed to `'The target carries no readable manifest.'`.
Byte comparison:

Block, after the edit:

```ts
import { isScaffoldError, ScaffoldError } from '@orkestrel/scaffold'

try {
	throw new ScaffoldError('TARGET', 'The target carries no readable manifest.')
} catch (error) {
	if (isScaffoldError(error)) error.code // 'TARGET'
}
```

Guide fence (`guides/scaffold.md:1561-1568`), identical text. Equal. Both blocks stay untitled.

## N5 — the inventory and the gates

- `npm run build` exits `0`: `build-host: staged 122 file(s) into dist/host`,
  `build-inventory: staged 122 file(s) into host.json`.
- `sha256sum host.json` identical across a second `npm run build:inventory` (both readings
  captured and diffed byte for byte, `IDENTICAL`).
- `npm run docs` exits `0`, `rows read: 1, disagreements found: 0`.
- `npm run test:guides` exits `0`, `Tests 20 passed (20)`.

## Ordering note

Editing `guides/scaffold.md` by hand (N0d) and regenerating it (N3's `--to guide`) changes its real
bytes without regenerating `host.json`, and `readHostFloor()` compares the checkout's live bytes
against `host.json`'s recorded digest for every `HOST_PATHS` entry, `guides/scaffold.md` included.
Each time the guide moved, `npm run test:src:bin` and `npm run test:src:server` briefly redden with
`ScaffoldError: The vendored host cannot read the declared file at guides/scaffold.md` until
`npm run build` (N5) regenerates the inventory. The acceptance criteria are read after that final
rebuild, per criterion 4 preceding criterion 3 in effect; both are green at that point:

```text
$ npm run test:src:bin      Test Files 3 passed (3)   Tests 245 passed (245)
$ npm run test:src:core     Test Files 9 passed (9)   Tests 402 passed (402)
$ npm run test:src:server   Test Files 5 passed (5)   Tests 432 passed (432)
$ npm run test:policy       Test Files 1 passed (1)   Tests 91 passed (91)
$ npm run test:guides       Test Files 1 passed (1)   Tests 20 passed (20)
```

## Acceptance criteria, in order

1. `grep -n "blueprint.guides || path" src/core/compilers.ts` — no output.
   `grep -n "DOCS_SEED_PATH" tests/setupServer.ts` — no output.
   `grep -n "and never a peer range" src/core/compilers.ts guides/scaffold.md` — the guide cell
   matches (`guides/scaffold.md:268`); the source block carries the same sentence wrapped across
   two lines by the formatter (`src/core/compilers.ts:1647-1648`,
   `grep -n "Replaces the runtime and development" src/core/compilers.ts` → `1647`), so the
   single-line pattern does not match the source side. Met in substance; the grep's single-line form
   cannot see the formatter's wrap.
2. `npm run format:check`, `npm run lint:check`, `npm run check` — all exit `0`.
3. `npm run test:src:bin` exits `0` (245/245). `npm run test:src:core` (402/402),
   `npm run test:src:server` (432/432), `npm run test:policy` (91/91), `npm run test:guides`
   (20/20) — all exit `0`.
4. `npm run docs` exits `0`. `npm run build` exits `0`. The inventory digest is identical across a
   second `npm run build:inventory`.
5. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — **not met**. The claim-list case (this
   unit's N2 scope) is green on both runs. A second, unrelated case in the same file —
   `installs the packed scaffold and passes one generated core/server workspace through prepublish`
   — fails on both runs with `expected 2 to be +0`. See **Deviation**.

## Deviation

**Expected.** Acceptance criterion 5: `PATH=/opt/npm11/bin:$PATH npm run test:distribution` exits
`0` on the confirming run. Standing conditions state the distribution proof is "red on exactly the
claim-list case at dispatch," implying the rest of that file is green once N2 lands.

**Found.** Both the reading run and the confirming run fail one further case:

```text
FAIL |distribution| tests/distribution.test.ts > installed package consumer > installs the packed
scaffold and passes one generated core/server workspace through prepublish
[requires a reachable npm registry]
AssertionError: expected 2 to be +0 // Object.is equality
 ❯ tests/distribution.test.ts:938:26
```

**Evidence.** This test is off-limits (owned only for the claim lists) and its own source is
untouched by this unit. Reproduced its steps in a scratch script outside the repository, under
`npm 11`, with real network: `npm pack`, `npm install` into a scratch consumer, generate a `proof`
blueprint (`guides: false`, matching the test's own blueprint), install the packed tarball as the
generated workspace's `@orkestrel/scaffold`, then run that workspace's own `npm run prepublishOnly`.
The chain fails at `npm run check` with:

```text
scripts/docs.ts(20,2): error TS2305: Module '"@orkestrel/guide"' has no exported member 'Drift'.
scripts/docs.ts(24,2): error TS2305: Module '"@orkestrel/guide"' has no exported member 'SourceExample'.
scripts/docs.ts(27,2): error TS2305: Module '"@orkestrel/guide"' has no exported member 'collectExamples'.
… (nine further TS2305/TS2339/TS7006 diagnostics against the installed '@orkestrel/guide')
```

`scripts/docs.ts` is vendored into the generated workspace by N0a's own change (the seed now reaches
every blueprint, `guides: false` included), and the workspace's real, registry-installed
`@orkestrel/guide` package predates the exports `scripts/docs.ts` needs (`Drift`, `SourceExample`,
`collectExamples`, `collectKeys`, `collectTitles`, `findDrift`, `locateComment`, `normalizeComment`,
`replaceCell`, `replaceExample`, `replaceSummary`, `spliceSpan`, and the `Guide.tagline` member).
This is the same gap the D5 `scaffold-seed` deviation and the orchestration contract's "Fixing a
dependency before it publishes" section describe: `@orkestrel/guide`'s published tip has not shipped
the surface `scripts/docs.ts` depends on. `npm 22`'s own install of `dependencies status: 1` in the
same probe (`Cannot read properties of null (reading 'edgesOut')`) is a separate, environment-local
npm-cache defect unrelated to this finding; the `npm 11` run installs cleanly and reaches the real
type-check failure.

**Done / not done.** N0a to N0e, N2's claim lists, N3, and N4 are done and every criterion they own
is green. N5's `build`, inventory-digest, `docs`, and `test:guides` rows are done and green. Criterion
5 is not met: the confirming distribution run is red on a case this unit's N2 scope does not name and
cannot fix — the fix is a published `@orkestrel/guide` release or a tarball substitution ahead of it,
in `tests/distribution.test.ts`'s own off-limits body, neither available inside this unit's owned
files or permitted commands.

**Hypothesis.** The published `@orkestrel/guide` package needs a release carrying the reader
surface `scripts/docs.ts` imports (or the generated-workspace proof needs the tarball-substitution
pattern `.agents/orchestration.md` § "Fixing a dependency before it publishes" describes) before this
one case can close; that release or substitution sits outside this unit's scope and belongs to
whoever owns the `@orkestrel/guide` package or `tests/distribution.test.ts`'s generation step.

## Tree state

```text
$ git status --short
 M .claude/rules/documentation.md      (D4, untouched here)
 M .claude/rules/tests.md              (D4, untouched here)
 M .claude/rules/workspace.md          (D4, untouched here)
 M README.md                          (D6, untouched here)
 M guides/scaffold.md
 M host.json
 M package.json                        (D5, untouched here)
 M src/core/Compiler.ts               (D6, untouched here)
 M src/core/compilers.ts
 M src/core/constants.ts              (D5, untouched here)
 M src/core/errors.ts
 M src/core/factories.ts              (D6, untouched here)
 M src/core/helpers.ts                (D6, untouched here)
 M src/core/types.ts                  (D6, untouched here)
 M src/server/Materializer.ts         (D6, untouched here)
 M src/server/Upstream.ts
 M src/server/helpers.ts              (D6, untouched here)
 M tests/distribution.test.ts
 M tests/guides.test.ts               (D4/D6, untouched here)
 M tests/setupServer.ts
 M tests/src/core/Compiler.test.ts
 M tests/src/core/compilers.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/server/helpers.test.ts   (D5, untouched here)
 M tsconfig.json                      (D6, untouched here)
?? scripts/docs.ts                    (D5, untouched here)

$ git diff --stat
 25 files changed, 1476 insertions(+), 575 deletions(-)
```

This unit's own edits: `src/core/compilers.ts` (N0a's doc block and filter, N3's paragraph),
`tests/src/core/compilers.test.ts` (N0b's case), `tests/src/core/helpers.test.ts` (N0b's comment),
`tests/src/core/Compiler.test.ts` (the two tallies), `tests/setupServer.ts` (N0c),
`guides/scaffold.md` (N0d's hand edits, N3's `--to guide` write, and the formatter),
`tests/distribution.test.ts` (N2's claim lists), `src/server/Upstream.ts` and `src/core/errors.ts`
(N4's `@example` bodies), and `host.json` (by regeneration alone). No off-limits file carries an
edit of mine. No `npm install`, `lint --fix`, discard-class git command, or commit ran.

## Flagged claims

- **The confirming distribution run's second failure is diagnosed from a scratch reproduction
  outside the repository**, not from an edit to the off-limits test file. The reproduction used the
  same pack/install/generate/materialize/install/run-gates steps `tests/distribution.test.ts` itself
  runs, read from its own source, under the same `npm 11` PATH.
- **Criterion 1's grep for the peer-exclusion sentence in `src/core/compilers.ts` reports nothing**
  because the formatter wrapped the sentence across two lines; the sentence is present and correct,
  confirmed by reading the file directly and by the guide cell it propagated to.
