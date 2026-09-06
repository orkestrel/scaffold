# Report — U6 scaffold-seeds (scaffold)

`implementer`, Claude Opus 5, native Claude Code subagent. Sole writer in `/home/user/scaffold`.
Every criterion in the brief passed. Two suites outside the criteria are red on the stale committed
host inventory, which this unit cannot write; § Observations names the cause and the settling
command.

## Touched files

| File | Change |
| --- | --- |
| `/home/user/scaffold/src/core/constants.ts` | `DECLARATION_DEV_DEPENDENCIES` drops the `vite-plugin-dts` row, and its TSDoc says the set rolls declarations up rather than emits them, with the emit-then-roll-up chain in `@remarks`. |
| `/home/user/scaffold/package.json` | Drops the `vite-plugin-dts` development dependency row. |
| `/home/user/scaffold/.oxlintrc.json` | Adds the `^typescript(?:[/?#]\|$)` restricted-import row, message "the in-process compiler API is not a surface the fleet uses", to every population carrying a `no-restricted-imports` block. |
| `/home/user/scaffold/guides/scaffold.md` | Updates the `DECLARATION_DEV_DEPENDENCIES` Surface row; adds the declaration roll-up passage to § Generated workspace; adds the proof's two-direction type-system shape to § Limits; names the oxlint plugin as the home of the syntax-shaped policy laws and adds the `tests/config.test.ts` row in § Tests. |
| `/home/user/scaffold/PROPOSAL.md` | The control path becomes the parser `vite` re-exports; the tool table's `typescript` row states that no in-process compiler API is available and a `vite` row carries the parser; the doc-model refusal cites the vendored roll-up. |
| `/home/user/scaffold/ROADMAP.md` | Rewrites the campaign row to what remains, adds the four carried scaffold rows, and transforms the fleet `@packageDocumentation` row on a measurement. |
| `/home/user/scaffold/src/core/templates.ts` | Restates the root `vite.config.ts` seed's `config`-project rationale and raises its budget to `60_000`. |
| `/home/user/scaffold/vite.config.ts` | The same rationale and budget in the file the seed materializes. |
| `/home/user/scaffold/tests/src/core/compilers.test.ts` | Drops the three `vite-plugin-dts` range expectations; the `@microsoft/api-extractor` expectations stand. |
| `/home/user/scaffold/tests/src/core/fixtures/source-manifest.txt` | Drops the `vite-plugin-dts` row. |
| `/home/user/scaffold/tests/src/core/fixtures/setup-false-manifest.txt` | Drops the `vite-plugin-dts` row. |
| `/home/user/scaffold/tests/src/bin/CLI.test.ts` | Drops both `/vite-plugin-dts` packument replies and the package's name from the two `omitDependencies` lists. |
| `/home/user/scaffold/tests/src/bin/main.test.ts` | Drops the `/vite-plugin-dts` packument reply. |

`tests/src/core/constants.test.ts` is owned and needed no edit: its `TABLES` row reads
`DECLARATION_DEV_DEPENDENCIES` by symbol and its range-form assertion holds over the smaller set.

## Guide passages rewritten

- § Surface → Core → Constants, the `DECLARATION_DEV_DEPENDENCIES` row (`guides/scaffold.md:121`).
- § Generated workspace, a new passage after the artifact list: the roll-up runs the workspace's
  compiler as a command into a scratch directory outside the tree, hands the emitted entry
  declaration to API Extractor, which analyses with the engine it bundles and writes the one
  `index.d.ts` per face; the browser and server faces pass `rewriteCoreSpecifier`; the seeded `bin`
  config calls no roll-up.
- § Limits, a new passage inside the distribution-proof description: the proof's two-direction
  type-system shape, with what each direction catches and why one direction alone is insufficient.
- § Tests, the `tests/policy.test.ts` row and a new `tests/config.test.ts` row: the syntax-shaped
  policy laws are rules of the vendored oxlint plugin `configs/policy.ts`, and `tests/config.test.ts`
  proves each against a case pair plus the declaration roll-up over a real face.

## Proposal sentences rewritten

Line numbers are before (at `dc30323f`) and after.

| Subject | Before | After |
| --- | --- | --- |
| Tool table, the `typescript` row's `Parses`, `Reachable`, and `Dependency delta` cells | 251 | 251 |
| Tool table, the added `vite` row carrying `parseSync` | — | 252 |
| C5's doc-model sentence, now citing the vendored roll-up | 311 | 313 |
| C12's first sentence, now stating that no in-process compiler API is available on either major the fleet targets | 353 | 354 |
| The control sentence under "The extractor is `@orkestrel/guide`'s text-only scanner" | 409–410 | 412–415 |
| The risk heading "The scanner's miss rate against the parser is unmeasured" | 636 | 640 |
| "The extractor choice decides the dependency delta", the alternative path | 724–727 | 728–731 |
| The fallback reader under "A text scan can miss a doc block" | 1159–1160 | 1162–1164 |
| The open decision, now "Whether `vite` may ever move to a runtime edge" | 1236–1241 | 1239–1244 |
| The refusal row for the api-extractor doc model | 1251 | 1254 |
| Probe 1's comparison and the decision it reopens | 1264–1265 | 1267–1268 |

`grep -n 'ts\.[a-zA-Z]\|compiler API\|createProgram\|unplugin-dts\|vite-plugin-dts' PROPOSAL.md`
leaves two hits, each correct: line 251 states that no in-process compiler API is available, and
line 255 quotes `@orkestrel/guide`'s own `Source` doc block, which says "rather than the TypeScript
compiler API" at `/home/user/fleet/guide/src/core/sources/Source.ts:24-28`.

## Roadmap rows

- The campaign row (before `ROADMAP.md:38-50`) is rewritten to what remains: scaffold's sites
  landed on 2026-09-06, and what is left is probe's acceptance and the fleet visit in catalog layer
  order, with every `src`-publishing package bumping on its moved import lines.
- Four scaffold rows added under it, from the brief's carry: the duplicated classifier drive
  harness, the roll-up's `succeeded` reading against `logLevel: none`, the two policy readers whose
  names no longer divide the subject, and the noun-phrase TSDoc openers in `configs/policy.ts` and
  `tests/setupPolicy.ts`.
- The fleet `@packageDocumentation` row (before `ROADMAP.md:56-59`, now `:73-78`) is transformed
  rather than struck, on the measurement in § Measurements taken: the pipeline no longer refuses the
  comment, and what remains is that no published entry carries one.
- `grep -n 'vite-plugin-dts' ROADMAP.md` exits 1.

## Criteria

1. **`grep -rn 'vite-plugin-dts' src package.json guides ROADMAP.md PROPOSAL.md`** — exit 1, no
   line printed. **The restriction in every population** — a JSON read of `.oxlintrc.json` reports
   seven `no-restricted-imports` blocks (`src/core`, `src/browser`, `src/server`, `app/core`,
   `app/browser`, `app/server`, `src/bin`) and the `^typescript(?:[/?#]|$)` row in each.
2. **`npx oxfmt --config .oxfmtrc.json --check <owned files>`** — exit 0,
   `All matched files use the correct format.` / `Finished in 1363ms on 11 files using 4 threads.`
   **`npm run lint:check`** — exit 0, no diagnostic printed (this oxlint prints nothing on a clean
   run; the negative control in § Instruments is what proves the new row fires).
   **`npm run check`** — exit 0 through `tsc --noEmit --project tsconfig.json`, `check:src:core`,
   `check:src:server`, and `check:src:bin`.
3. **`npm run test:src:core`** — exit 0, `Test Files 9 passed (9)` / `Tests 385 passed (385)` /
   `Duration 18.13s`. **`npm run test:guides`** — exit 0, `Test Files 1 passed (1)` /
   `Tests 17 passed (17)` / `Duration 3.96s`.

## Failing-first evidence

No defect fix was in scope, so no test was driven red first. Two instruments were run red-then-green
in the way the falsification law requires of an instrument, both recorded in § Instruments.

## Instruments

**The restricted-import row, with its negative control** —
`/home/user/scaffold/tmp/units/ts6-u6-lint-control-2.sh`, log
`/home/user/scaffold/tmp/units/ts6-u6-lint-control.log.txt`. It builds a scratch workspace outside
the repository, copies the root lint configuration into it with the workspace-local JS plugin
dropped (the rule under test is a core rule), and runs the real oxlint binary from inside it:

```text
src/server/subpath.ts:1:1: error eslint(no-restricted-imports): 'typescript/lib/typescript.js' import is restricted from being used by a pattern. help: the in-process compiler API is not a surface the fleet uses
src/core/violation.ts:1:1: error eslint(no-restricted-imports): 'typescript' import is restricted from being used by a pattern. help: the in-process compiler API is not a surface the fleet uses
violating exit: 1
control exit: 0
```

Membership rule: a specifier equal to `typescript` or beginning `typescript` followed by `/`, `?`,
or `#`. The control is drawn from outside it — `@typescript-eslint/utils`, which shares the leading
letters and must be admitted — and it is admitted. The first file,
`ts6-u6-lint-control.sh`, ran from the repository root and reported `No files found to lint` for
both halves; the successor runs from inside the scratch workspace, which is the only change.

**The `@packageDocumentation` reading** — `/home/user/scaffold/tmp/units/ts6-u6-packagedoc/probe.mjs`,
log `probe.log.txt` beside it. Recorded in § Measurements taken.

## Measurements taken

**`@packageDocumentation` under the `declarationRollup` chain, 2026-09-06, this host.** Scaffold's
own `src/core/index.ts` carries no `@packageDocumentation` comment, so `dist/src/core/index.d.ts`
cannot answer the question directly. The probe drives the same chain the vendored plugin drives —
`tsc --declaration --emitDeclarationOnly` as a process, then `Extractor.invoke` over the emitted
entry with `configs/helpers.ts`'s own override set, `files: [entry]`, `dtsRollup.untrimmedFilePath`,
every report off — over a fixture face whose entry carries the comment:

```text
emitted entry:
/**
 * The probe fixture's core entry.
 *
 * @packageDocumentation
 */
export * from './types.js';

Analysis will use the bundled TypeScript version 5.9.3
succeeded: true
rollup:
/**
 * The probe fixture's core entry.
 *
 * @packageDocumentation
 */

export declare interface Greeting {
    readonly text: string
}

export { }

carries @packageDocumentation: true
```

The comment survives the compiler's emit and the extractor's roll-up. That closes the mechanism half
of the fleet row, so the row is transformed to the half that remains.

**The `config` project's cost, 2026-09-06 21:32 UTC, no other lane running.**
`npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project config`, log
`/home/user/scaffold/tmp/units/ts6-u6-config-timing.log.txt`:

```text
rolls one face into a single declaration and rewrites its core specifier      2276ms
loads every configured policy rule through the real binary                     607ms
reads the compiler scope and fixed extractor override a roll-up requires       253ms
drives each plugin through its real Vite hooks                                  85ms
Duration  7.71s (tests 4.70s)
```

The project's binding case is not the roll-up. `tests/config.test.ts:1435` and `:1440` spawn the
real linter twice under 15-second child caps, so that case's worst reading is roughly 30 s plus its
fixture work, against which the former `45_000` budget held 15 s of slack. The budget moves to
`60_000` and the rationale names both cases. `.claude/rules/tests.md` § Expensive proofs is the
reason: 1.5× over a self-capping 30 s case is the thin margin that turns contention into a red gate
carrying no diagnostic, and the campaign has already met that class of row twice.

## Observations, not criteria

**`npm run test:src:bin` and `npm run test:config` are red on the stale committed host inventory.**
`host.json` is off-limits to this unit and is regenerated by `npm run build:inventory`, which
`npm run build` runs.

- `npm run test:src:bin` — exit 1, `Tests 5 failed | 240 passed (245)`. Every failing row is under
  `CLI upstream baselines`; two throw
  `ScaffoldError: The vendored host cannot read the declared file at .oxlintrc.json`, and the other
  three assert on the `floor` provenance that the same read produces.
- `npm run test:config` — exit 1, `Tests 1 failed | 110 passed | 1 skipped (112)`, the one row being
  `keeps the committed host inventory aligned with the vendored checkout bytes`, which reports
  `The committed host inventory is stale at .oxlintrc.json, guides/scaffold.md`.
- Cause, read from the tree rather than from the message: `readHostFloor`
  (`src/server/helpers.ts:1226-1235`) throws when a recorded digest differs from the file's bytes. A
  SHA-256 sweep of all 121 `host.json` entries against the working tree reports exactly two moved
  paths, `.oxlintrc.json` and `guides/scaffold.md` — the two vendored files this unit was told to
  change — and no missing path.
- Settling command, for the Orchestrator: `npm run build` (or `npm run build:inventory` alone once
  `dist/` is current), then re-run both suites.

**`package-lock.json` still names `vite-plugin-dts`.** It is off-limits, and the brief assigns its
regeneration to the Orchestrator.

**The `config` project's own red row was present before this unit's first edit** in the same shape:
the ledger records `test:config` red on the host-inventory row alone through the U2, U3-fix, and
U3-fix-2 rounds.

## Shared-file patches

None. Every file this unit changed is in its owned list, and no off-limits file needs an edit for
any criterion.

## Deviation state

No deviation under the brief's contract: no file imports `typescript` after the restriction, no
criterion needs an off-limits file, and no gate named as a criterion fails. Four ancillary choices
were made and are recorded here.

1. **Two commands outside the brief's permitted list were run**, both read-only against the
   repository and both scoped to this unit's own files:
   `npx vitest run --project config` for the budget measurement the brief's carry requires, and
   `npm run test:src:bin` because this unit edits `tests/src/bin/CLI.test.ts` and
   `tests/src/bin/main.test.ts` and the permission floor requires a writer to validate its own
   scope. Their writes land under `os.tmpdir()`, never in the tree.
2. **A link was dropped from the guide.** The § Tests entry first read
   `[`configs/policy.ts`](../configs/policy.ts)`, and `npm run test:guides` reported
   `guides/scaffold.md: ../configs/policy.ts` broken: `tests/guides.test.ts:50` builds its inventory
   from `src/**/*.ts`, `tests/**/*.ts`, `guides/*.md`, and `*.md`, so no `configs/` path resolves.
   That test is off-limits, so the guide names the file as a backticked token with no link.
3. **The brief's line reference for the fleet `@packageDocumentation` row reads `ROADMAP.md:45`**;
   at `dc30323f` that line is the `vite-plugin-dts` clause inside the campaign row, and the fleet
   row sits at `:56-59`. Both were treated as named and both were rewritten.
4. **The roadmap row cites its measurement by date and mechanism rather than by the `tmp/` path**
   of the probe, because `tmp/` is swept at acceptance and a durable artifact must not point into
   it. The instrument itself is at `/home/user/scaffold/tmp/units/ts6-u6-packagedoc/probe.mjs` for
   retention.

## Flagged claims

- **The bin and config red rows are attributed to the stale inventory on the evidence in
  § Observations, not on a re-run with a regenerated inventory.** This unit cannot write `host.json`.
  The attribution rests on the error naming `.oxlintrc.json`, on `readHostFloor`'s digest
  comparison, and on the sweep showing only this unit's two vendored files moved. The deciding
  re-run belongs to the Orchestrator after `npm run build`.
- **The `60_000` budget is sized from an idle-host reading plus the capped case's arithmetic, not
  from a contended run.** No contended reading of the `config` project was available to this unit,
  and taking one would need a second lane running beside it, which the one-writer rule forbids. The
  number raises the margin over the self-capping 30 s case from 1.5× to 2×; it is a judgment the
  Orchestrator can overrule with a contended reading.
- **The `@packageDocumentation` reading is a fixture reading, not a reading of scaffold's own
  rollup.** Scaffold's entry carries no such comment, so the shipped artifact cannot show one. The
  probe drives the same chain with the same extractor options.
- **`npm run lint:check` prints nothing on success in this oxlint**, so its exit code is the whole
  of its evidence. The negative control in § Instruments is what shows the new row is live.

## Tree state

`git status --short`:

```text
 M .oxlintrc.json
 M PROPOSAL.md
 M ROADMAP.md
 M guides/scaffold.md
 M package.json
 M src/core/constants.ts
 M src/core/templates.ts
 M tests/src/bin/CLI.test.ts
 M tests/src/bin/main.test.ts
 M tests/src/core/compilers.test.ts
 M tests/src/core/fixtures/setup-false-manifest.txt
 M tests/src/core/fixtures/source-manifest.txt
 M vite.config.ts
```

`git diff --stat`:

```text
 .oxlintrc.json                                   | 28 ++++++++
 PROPOSAL.md                                      | 89 ++++++++++++------------
 ROADMAP.md                                       | 51 +++++++++-----
 guides/scaffold.md                               | 32 ++++++++-
 package.json                                     |  1 -
 src/core/constants.ts                            |  7 +-
 src/core/templates.ts                            |  7 +-
 tests/src/bin/CLI.test.ts                        | 12 +---
 tests/src/bin/main.test.ts                       |  4 --
 tests/src/core/compilers.test.ts                 |  3 -
 tests/src/core/fixtures/setup-false-manifest.txt |  1 -
 tests/src/core/fixtures/source-manifest.txt      |  1 -
 vite.config.ts                                   |  7 +-
 13 files changed, 154 insertions(+), 89 deletions(-)
```

The `.orkestrel/` tree is untouched. Nothing is committed.
