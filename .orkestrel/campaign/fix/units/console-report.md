# Unit breaking-console — report (2026-09-02)

Writer: `implementer` on Opus 5 (native; Sol dark, substitution recorded). Returned report:

## Rows

- **s09-07** — applied: withCapture moved out of the class-free leaf and renamed: src/core/helpers.ts:729 -> createCaptureResult in src/core/factories.ts:141. helpers.ts now imports no implementation class (the `import { Capture } from './Capture.js'` line and the CaptureOptions/CaptureResult type imports are gone), so the leaf pair sits below every class-importing file. The CaptureResult TSDoc link at src/core/types.ts:932 repoints to import('./factories.js').createCaptureResult; the guide's Surface row, its `Scoping third-party console.* with createCaptureResult` heading and fence, and the tests inventory line all moved with it.
- **s09-09** — applied: The seven pass-through factories are deleted from src/core/factories.ts: createANSIRenderer, createLogger, createLoggerManager, createReporter, createCapture, createSpinner, createProgress. createStyler, createTheme, and createConsoleSink stay (each composes: a default renderer plus the enabled switch, a per-role merge with deep freeze, a console snapshot). All seven classes stay barrelled — src/core/index.ts is byte-unchanged and still carries 13 star exports. Their guide Surface rows and every fence moved to direct construction (`new Logger(...)`, `new Spinner(...)`), and the six *Options rows now name the class rather than the deleted factory.
- **s09-10** — applied: DEFAULT_CAPTURE_LEVELS deleted from src/core/constants.ts:407 and src/server/constants.ts:19. src/core/Capture.ts:71 now reads CAPTURE_LEVELS and src/server/ProcessCapture.ts:95 reads STREAM_LEVELS. Both surviving constants' TSDoc already stated the default-set role, so no new wording was needed; the two guide Constants rows are deleted and the CAPTURE_LEVELS / STREAM_LEVELS summaries now say `intercepts by default`.
- **s09-11** — applied: Reduced by the Orchestrator's ruling to the limit alone, because s09-10 already removed the server DEFAULT_CAPTURE_LEVELS. DEFAULT_CAPTURE_LIMIT -> DEFAULT_STREAM_LIMIT at src/server/constants.ts:27, with src/server/ProcessCapture.ts and src/server/types.ts:177 adopted. The one surviving `DEFAULT_CAPTURE_LIMIT` mention in src/server/constants.ts:18 is the TSDoc cross-reference naming the core constant this one mirrors, which still resolves. Guide Constants row renamed and Contract 8 now names both caps.
- **s09-12** — applied: LEVELS -> LOG_LEVELS at src/core/constants.ts:239, beside STATUS_LEVELS, CAPTURE_LEVELS, and STREAM_LEVELS. Consumers adopted in src/core/factories.ts (import and the createTheme loop) and tests/src/core/factories.test.ts. Guide Constants row renamed.
- **s09-13** — applied: The {@link} at src/server/types.ts:15 repointed from import('./helpers.js').isStreamTarget to import('./validators.js').isStreamTarget. The full src/server sweep of the `import('./<file>.js').<symbol>` form returned 21 links; that was the only wrong one — the other two helpers.js links (src/server/types.ts:121 and src/server/validators.ts:40) both name decodeChunk, which does live in helpers.ts. The guides/console.md:683 fence is split: `### Server helpers directly` keeps inferColumns, and a new `### Server boundary guards directly` fence carries isStreamTarget and isBufferEncoding.
- **s09-14** — applied: columnsOf -> inferColumns at src/server/helpers.ts:23, beside its sibling inferStyled in the same file. Consumers adopted in src/server/factories.ts (import, the columns getter, and its comment) and both server tests. The TSDoc first sentence was rewritten to the third-person form (`Infers the width in character cells of a stream target ...`). Guide Surface row, the runnable fence, and the tests inventory line all renamed.
- **s09-21** — applied: SpinnerInterface.success -> succeed and .failure -> fail (src/core/types.ts:1077, :1079); Spinner.success -> succeed and .failure -> fail (src/core/Spinner.ts:114, :118); ProgressInterface.failure -> fail (src/core/types.ts:1216) and Progress.failure -> fail (src/core/Progress.ts:112). `completed` and the `complete` event are untouched — the diff over src/core/Progress.ts and src/core/types.ts carries no line changing either. The StatusLevel literal 'success' is NOT renamed: Spinner#finish still passes 'success' | 'error', and the theme's statuses.success role, STATUS_ICONS, STATUS_COLORS, and Reporter.status('success', ...) are all unchanged. Guide Methods tables, the SpinnerInterface / ProgressInterface Surface rows, Contract 11, both animation fences, and the tests inventory adopted the new names.

## Symbols moved

- withCapture [src/core/helpers.ts] → createCaptureResult [src/core/factories.ts]
- createANSIRenderer [src/core/factories.ts] → removed (class ANSIRenderer stays barrelled)
- createLogger [src/core/factories.ts] → removed (class Logger stays barrelled)
- createLoggerManager [src/core/factories.ts] → removed (class LoggerManager stays barrelled)
- createReporter [src/core/factories.ts] → removed (class Reporter stays barrelled)
- createCapture [src/core/factories.ts] → removed (class Capture stays barrelled)
- createSpinner [src/core/factories.ts] → removed (class Spinner stays barrelled)
- createProgress [src/core/factories.ts] → removed (class Progress stays barrelled)
- DEFAULT_CAPTURE_LEVELS [src/core/constants.ts] → removed (callers read CAPTURE_LEVELS)
- DEFAULT_CAPTURE_LEVELS [src/server/constants.ts] → removed (callers read STREAM_LEVELS)
- DEFAULT_CAPTURE_LIMIT [src/server/constants.ts] → DEFAULT_STREAM_LIMIT
- LEVELS [src/core/constants.ts] → LOG_LEVELS
- columnsOf [src/server/helpers.ts] → inferColumns
- SpinnerInterface.success [src/core/types.ts] → succeed
- SpinnerInterface.failure [src/core/types.ts] → fail
- Spinner.success [src/core/Spinner.ts] → succeed
- Spinner.failure [src/core/Spinner.ts] → fail
- ProgressInterface.failure [src/core/types.ts] → fail
- Progress.failure [src/core/Progress.ts] → fail

## Files touched

- /home/user/fleet/console/src/core/factories.ts
- /home/user/fleet/console/src/core/helpers.ts
- /home/user/fleet/console/src/core/constants.ts
- /home/user/fleet/console/src/core/types.ts
- /home/user/fleet/console/src/core/Capture.ts
- /home/user/fleet/console/src/core/Spinner.ts
- /home/user/fleet/console/src/core/Progress.ts
- /home/user/fleet/console/src/browser/factories.ts
- /home/user/fleet/console/src/server/constants.ts
- /home/user/fleet/console/src/server/helpers.ts
- /home/user/fleet/console/src/server/factories.ts
- /home/user/fleet/console/src/server/types.ts
- /home/user/fleet/console/src/server/ProcessCapture.ts
- /home/user/fleet/console/tests/src/core/factories.test.ts
- /home/user/fleet/console/tests/src/core/Logger.test.ts
- /home/user/fleet/console/tests/src/core/LoggerManager.test.ts
- /home/user/fleet/console/tests/src/core/Reporter.test.ts
- /home/user/fleet/console/tests/src/core/Capture.test.ts
- /home/user/fleet/console/tests/src/core/Spinner.test.ts
- /home/user/fleet/console/tests/src/core/Progress.test.ts
- /home/user/fleet/console/tests/src/browser/factories.test.ts
- /home/user/fleet/console/tests/src/server/factories.test.ts
- /home/user/fleet/console/tests/src/server/helpers.test.ts
- /home/user/fleet/console/guides/console.md
- /home/user/fleet/console/README.md

## Tests changed

- tests/src/core/factories.test.ts — subject reduced to the four surviving factories. The createANSIRenderer, createLogger, and createLoggerManager describes were deleted as duplicates of ANSIRenderer.test.ts, Logger.test.ts, and LoggerManager.test.ts; the inner createCapture describe was deleted as a duplicate of Capture.test.ts; describe('createCapture / withCapture') became describe('createCaptureResult'), and its sync/async/boundary blocks renamed with it. The createTheme snapshot-isolation tests keep driving live entities and now import Logger, Reporter, and Spinner directly. Header comment and the unused LogLevel type import updated.
- tests/src/core/Logger.test.ts — createLogger import dropped, call sites already used new Logger. Gained describe('default sink') carrying the proof moved out of factories.test.ts: a default-constructed Logger writes one info line through the snapshotted console.log. Its former describe('factory parity') duplicate was deleted.
- tests/src/core/LoggerManager.test.ts — createLoggerManager import dropped; describe('factory parity') deleted (the registry, fan-out, and event-free assertions it duplicated all already live in this file).
- tests/src/core/Reporter.test.ts — createReporter import dropped; describe('factory parity') renamed to describe('default sink') and its duplicate first test deleted, keeping the unique default-console-sink proof.
- tests/src/core/Capture.test.ts — createCapture and createLogger imports replaced by Capture and Logger; describe('factory parity') deleted (start/stop/messages and `active` are already proven in this file).
- tests/src/core/Spinner.test.ts — every spinner.success/.failure call and every describe/it title renamed to succeed/fail; describe('factory parity') deleted; createSpinner import dropped. oxfmt collapsed the now-shorter import list to one line.
- tests/src/core/Progress.test.ts — every progress.failure call and the describe/it titles and comments renamed to fail; describe('factory parity') deleted; createProgress import dropped.
- tests/src/browser/factories.test.ts — createCapture/createLogger imports replaced by Capture/Logger; the two it() titles naming those factories renamed to name the classes they drive.
- tests/src/server/factories.test.ts — createLogger/createReporter imports replaced by Logger/Reporter; the columnsOf comment renamed.
- tests/src/server/helpers.test.ts — columnsOf renamed to inferColumns throughout (import, describe, and every assertion); import list resorted to decodeChunk, inferColumns, inferStyled.

## Gates

- `npm run format:check` → exit 0 — Checking formatting... / All matched files use the correct format. / Finished in 2188ms on 83 files using 4 threads.
- `npm run lint:check` → exit 0 — oxlint --config .oxlintrc.json --deny-warnings . (no diagnostics)
- `npm run check` → exit 0 — tsc --noEmit --project tsconfig.json, then check:src:core, check:src:browser, check:src:server — all silent
- `npm run build` → exit 0 — [unplugin:dts] Declaration files built in 1965ms. / dist/src/server/index.cjs 20.03 kB │ gzip: 6.92 kB / ✓ built in 2.08s / Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts
- `npm test` → exit 0 — src:core+src:browser+src:server — Test Files 17 passed (17), Tests 639 passed (639), 15.99s; policy 111 passed; config 46 passed; setup 17 passed; guides — Test Files 1 passed (1), Tests 68 passed (68)

## Diff stat

```text
25 files changed, 429 insertions(+), 836 deletions(-)
```

Status at return (writer's reading): `All eight assigned rows applied; no row refused and no row stopped. The gate chain runs green end to end: format:check 0, lint:check 0, check 0, build 0, test 0. No off-limits file was touched — git status --short lists exactly the 25 files above, with package.json, package-lock.json, configs/**, tests/setupPolicy.ts, tests/policy.test.ts, the vendored guide mirrors, and .claude/** all clean.`
Built `dist/` moves: true

## Observations

- Word-boundary sweep, run over src, tests, guides, and README.md after the last row: withCapture 0, createANSIRenderer 0, createLogger 0, createLoggerManager 0, createReporter 0, createCapture 0, createSpinner 0, createProgress 0, DEFAULT_CAPTURE_LEVELS 0, columnsOf 0, LEVELS 0. The `.success(` and `.failure(` call forms return 0 across the same population.
- The two ambiguous words were swept separately and every surviving hit classified. `\bsuccess\b` survives only as the StatusLevel literal (src/core/types.ts:703 and the 'success' argument Spinner#finish passes), the theme's statuses.success role (src/core/constants.ts, the createTheme tests), Reporter.status('success', ...) call sites, and plain English in a doc line and a distribution-test comment. `\bfailure\b` survives only as plain English: a decode failure in src/server/helpers.ts, a reporter status payload in Reporter.test.ts, one Spinner test title describing the line fail() commits, and comments in tests/setupPolicy.ts and tests/distribution.test.ts. None names a renamed member.
- `DEFAULT_CAPTURE_LIMIT` deliberately survives: s09-11 renames only the server constant. The core constant keeps its name (src/core/constants.ts:409, read by src/core/Capture.ts), and the one server mention at src/server/constants.ts:18 is the TSDoc cross-reference naming the core constant this one mirrors.
- dist/ moved as expected. dist/src/core/index.js carries 10 occurrences of succeed/createCaptureResult and 0 of withCapture, createSpinner, createProgress, or createANSIRenderer; dist/src/server/index.js carries inferColumns and dist/src/server/index.d.ts carries DEFAULT_STREAM_LIMIT.
- Centralization sweep over the touched files: src/core/factories.ts exports only create* functions (createStyler, createTheme, createConsoleSink, createCaptureResult), so kind purity holds after the move. src/core/helpers.ts and src/core/constants.ts import no implementation class, so the leaf pair sits below every class-importing file — this is what s09-07 was for, and it is now mechanically checkable with `grep "^import .*from './[A-Z]"` returning nothing for either file. The three surviving factories each pass the wrapper test (composition, merge-and-freeze, snapshot); the seven that did not are gone. src/core/index.ts is unchanged, so all seven classes stay barrelled and the parity INTERNAL list still names only `class Styler`.
- Whole-suite timing on this host, reported as an observation rather than a criterion: the src projects took 15.99s for 639 tests, policy 1.29s, config 2.47s, setup 0.23s, guides 1.23s. No test was timing-suspect and none failed.
- Text integrity: the diff carries no replacement character, no unintended control byte, and `git diff --check` reports nothing.
- The staged dependency closure was re-verified before editing (`node /home/user/work/verify-stage.mjs console` reports contract, emitter, guide, html, markdown, and test all OK against their register rows). The baseline `npm run check` exited 0 before any edit, so this checkout had no upstream adoption debt to read as an adoption list — the renamed guide helpers were already adopted at HEAD (commit a96051e).

## Deviations

- s09-09 obliged deleting the removed capability's tests. Five `describe('factory parity', ...)` blocks (Logger, LoggerManager, Reporter, Spinner, Progress) and three describes plus one inner describe in tests/src/core/factories.test.ts asserted only that a deleted factory returned a working instance. I checked each against the class's own mirrored test file before deleting it, and every assertion but one was already proven there. The exception was factories.test.ts's proof that a default-constructed Logger writes one info line through the snapshotted console.log, which no other file covered; I moved it into tests/src/core/Logger.test.ts as `describe('default sink')` rather than dropping it, and updated that file's guide inventory line. Reporter.test.ts's equivalent default-sink test was already in its factory-parity block, so I kept it and renamed the block instead of deleting it.
- s09-13 offered `retitle or split`. I split, because the fence mixed a helper with a validator. The new `### Server boundary guards directly` fence carries isBufferEncoding and also isStreamTarget, so the guards section is complete rather than carrying one of the module's two guards. Both added isStreamTarget lines are true of the guard as written (a record with a callable write is accepted; a bare object is rejected).
- Wording decisions taken under the deviation contract's `decide, record, and carry on` clause. The SpinnerInterface.fail member doc reads `Stop with an error line` rather than a literal `fail line`, matching the theme's `error` status role that Spinner#finish actually selects; the guide's SpinnerInterface Methods row follows it. inferColumns's TSDoc first sentence was rewritten to the third-person `Infers the width ...` form, and the three factories.ts blocks I touched took `Creates ...`. createCaptureResult's TSDoc keeps its body verbatim from the moved block, with its three `{@link createCapture}` references repointed at the `Capture` class and its first sentence put in the third person.
- guides/console.md carries a larger diff than the row edits alone: deleting seven Surface rows and renaming several others changed the widest cell in six tables, so I re-padded every table in the file to its own longest row. The padding model counts East Asian Wide and Fullwidth code points as two columns and everything else as one, which reproduces the file's existing alignment byte-for-byte in the tables I did not otherwise edit (the STATUS_ICONS row, which carries ✔ ✖ ⚠ ℹ, is unchanged in the diff). 74 of the 135 added lines in that file are table rows whose only change is padding.
- oxfmt rewrote tests/src/core/Spinner.test.ts after the rename, because `failure` shortening to `fail` let the import list fit inside the 100-column width and collapse to one line. I ran the mutating formatter on that one file only, then proved the state with the non-mutating chain, per the brief's tools clause.

Actual diff and status rendered by the Orchestrator: `tmp/units/breaking/console.diff`,
`tmp/units/breaking/console.status`.
