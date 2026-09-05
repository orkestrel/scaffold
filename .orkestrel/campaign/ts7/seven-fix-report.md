# Unit ts7-seven-fix — report

Every finding in `tmp/units/ts7-seven-fix-brief.md` is closed, the browser `dts` template's override
is pinned by a test proved red then green, both `/typescript` fixture rows call the shared builder,
and the gate chain exits 0. Nothing stopped the unit.

## Items

| Item | File | Edit |
| ---- | ---- | ---- |
| 1 | `guides/scaffold.md:1149` | "rather than with it" is now "rather than with the installed `typescript` package". |
| 2 | `guides/scaffold.md:1150-1156` | "clears the `typescriptCompilerFolder` invoke option" is now "sets the `typescriptCompilerFolder` invoke option to `''`", and the F3 tradeoff sentence follows "the rollup then resolves no global type." verbatim as prescribed. Its version claim was read before use: `node_modules/@microsoft/api-extractor/package.json` is 7.59.0 and its nested `typescript` is 5.9.3. |
| 3 | `guides/scaffold.md:1159-1162` | The sentence from "That workspace's `audit` reports" to "supports 7." is replaced by the prescribed three sentences. Confirmed against `src/bin/helpers.ts:414-424`: the message compares `declared` against `published`, the major the registry serves. |
| 4 | `guides/scaffold.md:1794` | "the emitted TypeScript bound." is now "the emitted TypeScript range with the browser workspace's fork of it." |
| 5 | `ROADMAP.md:41-43` | Condition first: "When `vue-tsc` runs against 7, delete the range, its spread in `blueprintToDevDependencies`, and the guide paragraph naming it; that release is the trigger." |
| 6 | `ROADMAP.md:83-86` | "clear `typescriptCompilerFolder` in each published `src` environment's Vite configuration" is now "set `bundleTypes.invokeOptions.typescriptCompilerFolder` to `''` … (`undefined` fails `TS2375` under `exactOptionalPropertyTypes`, and api-extractor applies the option only when it names a folder)". The bullet's tail (`:86-90`) is rewrapped because the longer clause pushed one line to 169 columns. |
| 7 | `ROADMAP.md:48` | "a new rule" is now "an added rule". |
| 8 | `tests/src/core/constants.test.ts:193-194` | "so it receives `APP_BROWSER_TYPESCRIPT_RANGE` instead of the shared range. That range is a floor of the same form, so it answers to the same pattern." |
| 9 | `PROPOSAL.md:47`, `:354`, `:1032`, `:1160` | Measured at 130, 141, 133, and 116 columns; each containing paragraph is rewrapped at word boundaries, no word changed. Every long line elsewhere in the file is left as it was. |
| 10 | `PROPOSAL.md:1164-1167`, `:355-356` | "at no dependency cost because `typescript` is already a development dependency" is now "because `typescript` is already a development dependency; that entry is a preview surface (TypeScript 7.1 ships a different API) and spawns the platform's native compiler binary, so the swap is a measured cost rather than a free one". The C12 row gains ", preview surfaces that 7.1 replaces," after "entries". |
| 11 | `tests/src/core/compilers.test.ts:1440-1460` | One `it` added beside `explains the declaration rewrite in every emitted published face`. Red-then-green record follows. |
| 12 | `tests/setupServer.ts:1652-1701`, `tests/setupServer.test.ts:521-540`, `tests/src/bin/CLI.test.ts:142-148` and `:265-271` | `buildPackument` takes `string \| readonly string[]`, both `/typescript` fixture rows call it, one row added over the multi-version form. Red-then-green record follows. |

## Item 11 — red then green

The test proved: `tests/src/core/compilers.test.ts > blueprintToRootVite fixed proofs > sets the
rollup's compiler folder override in every emitted published face`.

Plant: `src/core/templates.ts:611`, the browser template's
`invokeOptions: { typescriptCompilerFolder: '' },`, removed by editing, then re-inserted by editing.
No git command ran.

| State | Command | Result |
| ----- | ------- | ------ |
| Line 611 removed | `npm run test:src:core` | exit 1, `Tests 1 failed \| 391 passed (392)`, `Test Files 1 failed \| 8 passed (9)`; the failing row is the added test, asserting at `compilers.test.ts:1455` |
| Line 611 restored | `npm run test:src:core` | exit 0, `Tests 392 passed (392)`, `Test Files 9 passed (9)` |

`git diff --stat -- src/core/templates.ts` printed nothing after the restore, and `git status --short`
does not list the file, so the restore is byte-identical.

## Item 12 — red then green, and the builder shape

The row added: `tests/setupServer.test.ts > the upstream fixtures > publishes every version it is
given, and names the first under dist-tags`.

| State | Command | Result |
| ----- | ------- | ------ |
| Row added, builder unchanged | `npm run test:setup` | exit 1, `Tests 2 failed \| 68 passed (70)`. The added row failed; the second failure is `answers the committed inventory and every host-owned path…` with `ScaffoldError: The vendored host cannot read the declared file at guides/scaffold.md`, which is the pending `host.json` rebuild the brief's standing conditions name, not the builder. |
| Builder changed | `npm run test:setup` | exit 1, `Tests 1 failed \| 69 passed (70)`. The added row passes; only the guide-digest row remains, and `npm run build` closes it. |
| After `npm run build` | `npm test` | exit 0, setup project `Tests 70 passed (70)` |

The fixture swap in `tests/src/bin/CLI.test.ts` reddened five `CLI upstream baselines` rows on the
same guide digest (`ScaffoldError: The vendored host cannot read the declared file at
guides/scaffold.md` in two, and the two assertion failures downstream of the same dark host);
`npm run build` then `npm test` closed all five.

**Shape chosen.** The first parameter widens to a union, and nothing else moves:

```ts
export function buildPackument(
	version: string | readonly string[],
	edges?: TestPackumentEdges,
): string
```

Why this shape:

- Every existing single-version call site passes a string and is untouched, including the ones that
  pass `edges` positionally (`Upstream.test.ts:1159`, `:1193`, `:1237`, `CLI.test.ts:4938`,
  `setupServer.test.ts:497`). A third parameter after `edges` would have forced
  `buildPackument(v, undefined, [other])` at any multi-version site.
- The array's first element is `dist-tags.latest`, stated in the `@param` block. The tag is not
  derived from the map, because ordering the versions inside the fixture would settle the fixture's
  answer with `compareVersions`, the comparator `Upstream` uses to select a release — the fixture
  would then be measured against itself.
- The edges are written onto every published record, not onto the tagged one. `Upstream.#edges`
  reads `versions[version]` for the version `#releaseVersion` selected, which for the browser
  workspace is the 6 major rather than the tag, so edges on the tag alone would be invisible to the
  reader that asked for them.
- An empty array throws rather than returning a packument with an empty tag, so no `''` sentinel
  enters the JSON.

The TSDoc states the added form in `@param version`, `@param edges`, and a `@remarks` paragraph
naming why the tag is a caller decision and why the edges spread across records.

The five-line comment above each `/typescript` row stays once per site, unchanged.

## Gates

Run in the brief's order, each exit code read.

| Command | Exit |
| ------- | ---- |
| `npm run lint` (converge) | 0 |
| `npm run format` (converge) | 0 |
| `npm run format:check` | 0 |
| `npm run lint:check` | 0 |
| `npm run check` | 0 |
| `npm run build` | 0 (`build-inventory: staged 121 file(s) into host.json`) |
| `npm test` | 0 — `392`, `432`, `245`, `111`, `46`, `70`, `17` tests passed across the seven projects, no failures |

## Vocabulary sweep

Pattern `\b(should|via|just|simply|ensure[sd]?|once|new|latest|currently|now|utilize|leverage|e\.g\.|i\.e\.|etc\.|performant|robust|allows you to|and/or|please|dummy)\b`, case-insensitive, over every added line of `git diff -U0` for `guides/scaffold.md`, `ROADMAP.md`, `PROPOSAL.md`, and `tests/`. Hits: `dist-tags.latest` in the TSDoc, the `latest` binding and the `'dist-tags': { latest }` key in `tests/setupServer.ts`, the `'dist-tags': { latest: '0.0.8' }` expectation in `tests/setupServer.test.ts`, and `new Error`. Every one is a code identifier or a language keyword, exempt under `.claude/rules/writing.md` § Substitutions. No prose hit in any edited sentence.

## Working tree

```text
 M PROPOSAL.md
 M ROADMAP.md
 M guides/scaffold.md
 M host.json
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/src/bin/CLI.test.ts
 M tests/src/core/compilers.test.ts
 M tests/src/core/constants.test.ts
?? .orkestrel/campaign/ts7/probe-fix-brief.md
?? .orkestrel/campaign/ts7/seven-fix-brief.md
```

```text
 PROPOSAL.md                      | 28 +++++++++++++++-----------
 ROADMAP.md                       | 22 ++++++++++----------
 guides/scaffold.md               | 25 +++++++++++++----------
 host.json                        |  4 ++--
 tests/setupServer.test.ts        | 21 ++++++++++++++++++++
 tests/setupServer.ts             | 43 +++++++++++++++++++++++++++-------------
 tests/src/bin/CLI.test.ts        | 22 ++++++++------------
 tests/src/core/compilers.test.ts | 22 ++++++++++++++++++++
 tests/src/core/constants.test.ts |  4 ++--
 9 files changed, 127 insertions(+), 64 deletions(-)
```

`host.json` carries only the `guides/scaffold.md` entry digest and the inventory's own digest, both
rebuilt by `npm run build`. `src/core/templates.ts` is absent from the status, as the item 11 plant
requires. No commit, push, publish, `git checkout`, `git restore`, `git stash`, `git reset`, or
`git clean` ran.

## Deviations

None stopped the unit. Three ancillary decisions and one standing-condition mismatch, recorded:

1. **Item 11's blueprint carries `bin: true`.** The brief names the blueprint
   `{ src: ['core', 'browser', 'server'] }` and also requires the emitted
   `configs/src/vite.bin.config.ts` artifact as the control. `buildBlueprint` defaults `bin` to
   `false` (`tests/setup.ts:190`), so that blueprint emits no bin artifact and the control could not
   be present. The test uses `{ src: ['core', 'browser', 'server'], bin: true }`.
2. **`git status --short` was not empty at the baseline.** The brief's standing conditions state it
   is empty at `c4bee5da`. Two untracked files were already present:
   `.orkestrel/campaign/ts7/probe-fix-brief.md` and `.orkestrel/campaign/ts7/seven-fix-brief.md`.
   Both are off-limits and untouched.
3. **The `ROADMAP.md` bullet tail at `:86-90` was rewrapped beyond the prescribed sentence.** Item 6's
   longer clause left one line at 169 columns and one at 61; the rest of that bullet is rewrapped at
   word boundaries with no word changed.
4. **Two inline `/typescript` packuments remain in `tests/src/bin/CLI.test.ts`**, at `:1271` and
   `:1336`. Neither is a shared fixture row: each is a per-test override inside its own `it`, shaped
   for that scenario (`reports a stale foreign floor and a crossed major without rewriting` publishes
   `6.0.3`, `6.0.4`, and `7.0.0`). Item 12 names only the two shared rows, so these are left as they
   were. Both could call the widened builder; recorded for whichever change next owns that file.
