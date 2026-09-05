# Unit ts7-probe-2 — report

**Deviation: two gate reds this unit did not cause, both naming `oxlint`.** Every owned edit landed,
the red-then-green proof is recorded, and `format:check`, `lint:check`, `check`, and `build` exit 0.
`npm test` exits 1 on `tests/src/bin/main.test.ts`, which fails alone as well and fails a different
row on each run, and on `tests/guides.test.ts > guides fences > earns the receipt the guide
documents`, which is baseline drift measurable at `HEAD`. § Deviation carries the evidence and the
exact one-line patch for the second.

## Red then green

Run in `/home/user/fleet/probe`, with the tests already written, before the `#support()` change and
after it.

| Command                                                                                                                                                                                              | Before                                          | After                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------- | ------------------------------------ |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/Probe.test.ts -t 'no in-process compiler API\|unsupported TypeScript installation\|every major its own peer range'` | `Tests  1 failed \| 2 passed \| 25 skipped (28)`, exit 1 | `Tests  3 passed \| 25 skipped (28)`, exit 0 |

The row that ran red first is `probe > serves a workspace at every major its own peer range names`,
on the refusal this unit removes:

```text
FAIL  |src:server| tests/src/server/Probe.test.ts > probe > serves a workspace at every major its own peer range names
AssertionError: expected ProbeError: The supported TypeScript rang… { …(3) } to match object { name: 'ProbeError', …(3) }
-   "code": "refused",
-   "message": "The control must differ from the case; it carries the same candidate drafts and the same test",
+   "code": "malformed",
-   "origin": "claimant",
+   "origin": "workspace",
```

The two refusal rows the split produced — `refuses a workspace whose typescript carries no
in-process compiler API` and `names an unsupported TypeScript installation before entering the
compiler` — are the `2 passed` of the red run and pass again after.

The helper's own rows pass on the same tree:
`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/helpers.test.ts`
→ `Tests  45 passed (45)`, exit 0.

## The helper

`collectRangeMajors`, in `src/server/helpers.ts`, published through the `src/server/index.ts` barrel's
`export * from './helpers.js'` row and documented in the `guides/probe.md` server-helper Surface
table.

```ts
export function collectRangeMajors(range: string): readonly string[]
```

It reads each `||`-separated caret term and returns the major each names, once, in the order the
range names them. A term this package does not write — a bare version, a tilde term, a comparator
pair, a caret term carrying no minor — names no major and is skipped, so a range naming no caret term
yields an empty collection and `#support()` refuses every version, which is the branch the previous
`supported === undefined` guard held.

It lives in the server environment because its only consumer is `src/server/Probe.ts` and the core
layer carries no cross-environment consumer for it. `src/server/helpers.ts` already holds this
package's pure text leaves — `normalizePath`, `matchesWorkspaceModule`, `describeUnknown` — beside
the workspace readers, so the kind file and the environment both match.

## Gates

| Gate                   | Exit code |
| ---------------------- | --------- |
| `npm run format:check` | 0         |
| `npm run lint:check`   | 0         |
| `npm run check`        | 0         |
| `npm run build`        | 0         |
| `npm test`             | 1         |

`npm test` chains its projects with `&&`, so it stopped at `test:src` and never reached the four
projects after it. Those were run individually on the same tree:

| Command                | Result                                                | Exit code |
| ---------------------- | ------------------------------------------------------ | --------- |
| `npm run test:src`     | `Test Files  2 failed \| 9 passed (11)`, `Tests  4 failed \| 230 passed (234)` | 1 |
| `npm run test:policy`  | `Tests  111 passed (111)`                              | 0         |
| `npm run test:config`  | `Tests  46 passed (46)`                                | 0         |
| `npm run test:setup`   | `Tests  9 passed (9)`                                  | 0         |
| `npm run test:guides`  | `Tests  1 failed \| 12 passed (13)`                     | 1         |

Logs: `tmp/units/ts7-probe-2-test.log.txt`, `tmp/units/ts7-probe-2-test-policy.log.txt`,
`tmp/units/ts7-probe-2-test-config.log.txt`, `tmp/units/ts7-probe-2-test-setup.log.txt`,
`tmp/units/ts7-probe-2-test-guides.log.txt`.

`tests/src/server/Probe.test.ts` carried one of the `test:src` failures — the `mints receipts only
when every stage executes cleanly…` row, on `The probe could not arm: The Oxlint language server
exited with code 0`. Alone it is clean:
`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/Probe.test.ts`
→ `Tests  28 passed (28)`, exit 0 (`tmp/units/ts7-probe-2-probe-solo.log.txt`).

## Deviation

**Expected.** `npm test` exits 0 after the change, or is red only on a failure that passes alone.

**Found.** Two reds remain, neither reachable from anything this unit or its predecessor changed.

### `tests/src/bin/main.test.ts` — the Oxlint language server exits under the spawned bin entry

**Evidence.** The rows that fail move between runs of the same command on the same tree, and every
failure carries the same cause.

| Run                          | Result                              | Rows that failed                                                                                                                          |
| ---------------------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run test:src`           | `Tests  4 failed \| 230 passed (234)` | `answers both protocol eras without exposing worker output on stdout`, `carries the verdict record beside the rendered text on both eras`, `answers a rendering past the content bound with the receipt block` |
| The file alone, first run    | `Tests  2 failed \| 14 passed (16)`   | `answers a pinned legacy client through the initialize path`, `preserves worker diagnostics on stderr`                                    |
| The file alone, second run   | `Tests  1 failed \| 15 passed (16)`   | `answers both protocol eras without exposing worker output on stdout`                                                                     |

The solo command is
`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:bin tests/src/bin/main.test.ts`
(`tmp/units/ts7-probe-2-bin-solo.log.txt`, `tmp/units/ts7-probe-2-bin-solo-2.log.txt`). Each failure
reads the same tool response:

```text
"text": "The probe could not arm: The Oxlint language server exited with code 0",
"isError": true,
```

This unit's change reaches neither the lint stage nor the bin entry: `collectRangeMajors` and
`#support()` decide one TypeScript version comparison, and this workspace installs `typescript`
6.0.3, which both the old and the new check accept. `tests/src/server/stages/LintStage.test.ts` drives
the same language server in-process and passed in the same `test:src` run.

**Hypothesis.** One at most, per the deviation contract: the failure appears only where the bin entry
is spawned as a child and the language server is therefore a grandchild, so a host-level limit on the
deeper process rather than the code is what varies between runs.

### `tests/guides.test.ts > guides fences > earns the receipt the guide documents` — documented `oxlint@1.80.0` against installed 1.81.0

**Evidence.** The row runs a real claim and asserts the guide carries the receipt the run returned.
The receipt's `oxlint` field is read from the installed manifest, and the guide's fence names the
previous release:

```text
node -e "console.log('installed oxlint', require('./node_modules/oxlint/package.json').version)"
installed oxlint 1.81.0

git show HEAD:guides/probe.md | grep -n "verdict.receipt //"
598:verdict.receipt // 'probe:0806fb30f428edb8ea85adfb4b355441:type:typescript@6.0.3:oxlint@1.80.0:vitest@4.1.11:configs/src/tsconfig.core.json@3b674fdf121c85efb9ed1bab25ceeec8'

git show HEAD:package.json | grep -n '"oxlint"'
110:		"oxlint": "^1.81.0",
```

Both readings are of `HEAD` (`b331d93`, `Re-pin the development ranges to the released fleet`), so
the fence disagreed with the installed tool before either unit began. Neither unit touched `oxlint`,
the receipt fence, or anything the receipt's other fields read. The whole `guides parity` block
passes, including the two rows this unit's guide edits are subject to.

**Patch, report-only.** The fence sits outside the guide scope this brief names — the Prerequisites
bullet, the new Surface row, and the `Toolchain` sentence — and its correct value is a fact about the
pinned `oxlint` that the fleet visit owns, so this unit reports it rather than writing it. In
`guides/probe.md`, on the `verdict.receipt` line, replace `oxlint@1.80.0` with `oxlint@1.81.0`.

**Done.** The helper and its tests, the widened support check, the split refusal rows, the positive
row, the guide's Prerequisites bullet, `Toolchain` row, and Surface row; `format:check`,
`lint:check`, `check`, and `build` at exit 0; the red-then-green proof.

**Not done.** `npm test` at exit 0. The deciding re-run of the bin file belongs to the Orchestrator on
an idle host after this unit exits, and the guide fence needs an owner.

## Touched files

This unit owns the rows that follow. `package.json`, `package-lock.json`,
`src/server/stages/TypeStage.ts`, and `tests/src/core/errors.test.ts` carry unit ts7-probe's edits
alone and are untouched here.

| File                             | Change                                                                                                                                                                    |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/server/helpers.ts`          | `collectRangeMajors` with its TSDoc and `@example`, beside the package's other pure text leaves                                                                            |
| `src/server/Probe.ts`            | `#support()` accepts a major any caret term of the peer range names, through `collectRangeMajors`; the error message, code, origin, and context are unchanged             |
| `tests/src/server/helpers.test.ts` | The helper's `@example` transcription in the documented-example row, and a boundary row over the separator, surrounding whitespace, an unreadable term, and a repeated major |
| `tests/src/server/Probe.test.ts` | The constructor refusal split from the support refusal, the support row's fixture moved to a compiler carrying the API at 5.9.3, a positive row over a bridged TypeScript 7 workspace, and `captureError` and `collectRangeMajors` imported |
| `guides/probe.md`                | The `collectRangeMajors` Surface row, the Prerequisites sentences on the widened check and on what `Verdict.toolchain` reports, and the `Toolchain` contract row            |

The positive row links this checkout's installed `@typescript/typescript6` into the scratch
workspace, writes a `typescript` manifest at 7.0.2 whose entry publishes the version alone, and reads
the coordinator's next refusal after the support check — the control that repeats its case — because
reaching that refusal is what proves the support check admitted a TypeScript 7 workspace. It also
asserts `probe.toolchain.typescript` is `7.0.2`, which is the guide's `Toolchain` sentence under test.

## Tree

```text
 M guides/probe.md
 M package-lock.json
 M package.json
 M src/server/Probe.ts
 M src/server/helpers.ts
 M src/server/stages/TypeStage.ts
 M tests/src/core/errors.test.ts
 M tests/src/server/Probe.test.ts
 M tests/src/server/helpers.test.ts
```

```text
 guides/probe.md                  |  22 ++++++-
 package-lock.json                |  83 +++++++++++---------------
 package.json                     |   7 ++-
 src/server/Probe.ts              |   9 ++-
 src/server/helpers.ts            |  95 ++++++++++++++++++++++++------
 src/server/stages/TypeStage.ts   |   4 +-
 tests/src/core/errors.test.ts    |  19 ++++++
 tests/src/server/Probe.test.ts   | 124 +++++++++++++++++++++++++++++++++++++--
 tests/src/server/helpers.test.ts |  79 +++++++++++++++++++++++++
 9 files changed, 362 insertions(+), 80 deletions(-)
```

Both readings cover both units' edits. Nothing was committed, pushed, or reverted.

## Observations

- The successor finding this unit closes was measurable before the change and is measurable after:
  `collectRangeMajors('^6.0.3 || ^7.0.0')` returns `['6', '7']`, where the previous
  `/^\^(\d+)\./u` read of the same range returned `6` alone.
- `#support()` keeps its own read of the installed version's major, because that regex is a
  single-use read of one value rather than reusable logic.
- The guide's Prerequisites bullet no longer states the limit unit ts7-probe documented. It states
  the support the code now gives, and the refusal message a major outside the range still earns.
