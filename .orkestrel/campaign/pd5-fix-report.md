Unit PD5-FIX complete. All acceptance criteria closed.

## Touched files

- `/home/user/orkestrel/probe/src/server/helpers.ts` — `relativeWorkspaceMessage` now removes root spellings only at path-token starts, handles a separator-terminated root, and removes no revision at all; TSDoc rewritten to match.
- `/home/user/orkestrel/probe/src/server/stages/RuntimeStage.ts` — `#issue` renames the exact generated specification by its own basename after the workspace rewrite.
- `/home/user/orkestrel/probe/tests/src/server/helpers.test.ts` — added the prefix-embedded-root, host-root-workspace, and complete-marker regressions; replaced the helper-level revision test and the second documented example.
- `src/server/stages/TypeStage.ts`, `tests/src/server/stages/*.test.ts` — unchanged by this unit (PD5 edits only). No stage-test pin needed flipping.

## The bounded mechanism

`src/server/helpers.ts:229-251`. Three prefixes are built once and deduplicated (`file:` URL, forward-slash root, native root), each terminated by exactly one separator: `url.endsWith('/') ? url : `${url}/`` and the same shape for the other spellings, so a root that already ends in its separator passes through as itself instead of as a doubled separator (`src/server/helpers.ts:236-240`). Each prefix is removed through `replaceAll(spelling, replacer)`, whose replacer receives the match offset, and an occurrence stands whenever the preceding character is one a path carries — `/[^\s"'`()[\]{}<>,;:=|]/u.test(source.charAt(offset - 1))` at `src/server/helpers.ts:247`. `charAt(-1)` returns the empty string, which no class matches, so offset 0 needs no separate branch (probed before use: `replaceAll` with a string pattern passes `(match, offset, source)` on Node v22.22.2).

Order-independence holds without ranking the prefixes: the plain root inside a `file:` URL is preceded by `/`, a path character, so only the URL prefix can consume it.

## The revision-name route

The runtime stage performs its own exact replacement; the helper no longer knows about revisions. `src/server/stages/RuntimeStage.ts:892-896` rewrites `basename(specification)` to `basename(original)` after the workspace rewrite. The basename carries no separator, so one exact replacement covers the relative, native-absolute, and `file:` URL spellings, and it needs no new parameter on `#issue`, no signature change on `#specification`, and no revision field on the stage. The name carries the pid-plus-UUID revision minted for that run, so an occurrence of it names that file and no other. The directory part needs no rewriting because `createRevisionFile` writes the sibling into the declared test's own directory.

## Red then green, per failing input

Command: `npx vitest run --project src:server tests/src/server/helpers.test.ts`. Before the fix: `Tests 4 failed | 35 passed (39)`. After: `Tests 39 passed (39)`.

| Verdict input | Failing test (red) | Recorded actual before the fix |
| --- | --- | --- |
| Unbounded root replacement | `workspace message paths > removes a root spelling only where a path begins` | `Cannot find /mirrorsrc/core/greeting.ts` |
| Separator-terminated root | `workspace message paths > rewrites a path beneath a workspace that is the host root` | `Cannot read /tsconfig.json` (baseline `#translate` produced `tsconfig.json`) |
| Over-broad revision removal | `workspace message paths > leaves a name the target tree owns alone` | `Failed to load tmp/notes.ts` |
| Documented example | `server helper examples > returns the documented value for every documented server-helper example` | red on the mirror example, green after |

The stage half of the revision finding was recorded red separately: with `#issue`'s rename removed and the new helper in place, `npx vitest run --project src:server tests/src/server/stages/RuntimeStage.test.ts -t "names the declared test in a reported message"` reported `Tests 1 failed | 38 skipped (39)` with received `ran tmp/probe/runtime-message-38d4741c-….test.probe-4735-221361fd-….ts`. The rename was restored immediately and the same command reported `Tests 1 passed | 38 skipped (39)`. The restore is visible in the final diff.

## Corrected evidence attribution

The retained PD5 report's red table misattributes one row. The party, runtime, and helper-suite reds are baseline records taken against the committed baseline. The escaped-text red is not: the baseline exported no `relativeWorkspaceMessage`, so the only failure the baseline could produce for that suite is the missing-function failure already recorded for the helper suite. That red was the negative control against the rejected whole-message-normalization variant, which corrupted `expected 'line1\nline2' to be 'other'`, and it demonstrates why that variant was discarded rather than a defect in the baseline.

## Gate tails

- `npm run check:src:server` → `tsc --noEmit -p configs/src/tsconfig.server.json`, exit 0, no diagnostics.
- `npx tsc --noEmit --project tsconfig.json` (covers the owned test file, which the scoped server project does not include) → exit 0.
- `npx oxlint --config .oxlintrc.json --deny-warnings src/server tests/src/server` → exit 0, no output.
- `npx oxfmt --config .oxfmtrc.json --check` over the modified source and test files → `All matched files use the correct format. Finished in 6ms on 6 files using 4 threads.`
- `npm run test:src:server` → `Test Files 7 passed (7)`, `Tests 161 passed (161)`, duration 119.23s. Every PD5 pin green, including the runtime message pin, the TypeStage inferred-project pin (`Tests 22 passed (22)` scoped), and the cleanup pins that retain the generated filename.

## git diff --stat

```text
 src/server/helpers.ts                        | 66 +++++++++++++++++++++
 src/server/stages/RuntimeStage.ts            | 15 ++++-
 src/server/stages/TypeStage.ts               | 29 ++++++----
 tests/src/server/helpers.test.ts             | 86 +++++++++++++++++++++++++++-
 tests/src/server/stages/RuntimeStage.test.ts | 28 ++++++++-
 tests/src/server/stages/TypeStage.test.ts    |  5 +-
 6 files changed, 211 insertions(+), 18 deletions(-)
```

## git status --porcelain

```text
 M src/server/helpers.ts
 M src/server/stages/RuntimeStage.ts
 M src/server/stages/TypeStage.ts
 M tests/src/server/helpers.test.ts
 M tests/src/server/stages/RuntimeStage.test.ts
 M tests/src/server/stages/TypeStage.test.ts
```

## Deviations

None against the primary objective. One off-limits-file finding, report-only, carried by PD5 rather than by this unit and unchanged by it: `guides/probe.md` § Surface has no row for the `relativeWorkspaceMessage` export PD5 added, so `npm run test:guides` fails at `tests/guides.test.ts:208` with `- "relativeWorkspaceMessage"` missing from the documented set (`Tests 1 failed | 12 passed (13)`). The exact patch, inserted after the `relativeWorkspaceFile` row at `guides/probe.md:177` to keep the table in source order:

```text
| `relativeWorkspaceMessage` | function | `(workspace: string, message: string) => string` | Removes every spelling of the workspace root from the paths a tool's message names, at each path it begins. |
```

The backticked name is wider than the table's current first column, so the carrier re-pads that table's rows when inserting; the parity gate reads only the first cell, so padding is presentation.