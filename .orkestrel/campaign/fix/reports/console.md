# Fix report: console

## Dispositions

- **s09-07** deferred_breaking: Re-verified: helpers.ts still imports the Capture class and constructs it in withCapture. Both offered repairs break the published surface — moving withCapture to factories.ts requires the create* name form (renaming an exported function to createCaptureResult), and the stated alternative changes withCapture's published parameter list to take a CaptureInterface. Applied nothing; the finding goes whole to the work order.
- **s09-09** deferred_breaking: Re-verified: the seven pass-through factories are still present and the seven classes are still barrelled. The reconciled DRIFT-RESHAPE repair deletes createANSIRenderer, createLogger, createLoggerManager, createReporter, createCapture, createSpinner, and createProgress, which removes exported symbols. Deferred whole.
- **s09-10** deferred_breaking: Re-verified: DEFAULT_CAPTURE_LEVELS is still a rename-only alias of CAPTURE_LEVELS in core/constants.ts and of STREAM_LEVELS in server/constants.ts. Deleting either removes a barrelled exported constant with a guide row.
- **s09-11** deferred_breaking: Re-verified: DEFAULT_CAPTURE_LEVELS and DEFAULT_CAPTURE_LIMIT are still declared in both core/constants.ts and server/constants.ts with different types and meanings, and both pairs are star-exported. The repair renames the server pair, which removes two published names from @orkestrel/console/server.
- **s09-12** deferred_breaking: Re-verified: LEVELS is still the unqualified name beside STATUS_LEVELS, CAPTURE_LEVELS, and STREAM_LEVELS. Renaming it to LOG_LEVELS removes a barrelled exported constant with a guide row.
- **s09-13** applied (src/server/validators.ts, src/server/helpers.ts, src/server/index.ts, src/server/factories.ts, src/server/ProcessCapture.ts, tests/src/server/validators.test.ts, tests/src/server/helpers.test.ts, guides/console.md): Created src/server/validators.ts and moved isStreamTarget and isBufferEncoding there unchanged, added the barrel row after constants, and repointed the importers in factories.ts, ProcessCapture.ts, and helpers.ts (decodeChunk). The published surface is identical. Mirrored the move in the tests: the two guard describe blocks moved to tests/src/server/validators.test.ts, and the guide's Tests section gained a validators row and lost the guard clauses from the helpers row. Corrected isBufferEncoding's TSDoc link to decodeChunk to the cross-file import form.
- **s09-14** deferred_breaking: Re-verified: columnsOf is still exported from server/helpers.ts, barrelled, and documented at guides/console.md. Renaming it to inferColumns removes a published name, so the whole finding defers including the lane's extended guide-update list.
- **s09-16** applied (src/core/Retention.ts, src/core/types.ts, src/core/index.ts, src/core/Capture.ts, src/server/ProcessCapture.ts, tests/src/core/Retention.test.ts, guides/console.md): Extracted the level-keyed bounded buffer into src/core/Retention.ts as Retention<T extends { readonly level: string }> with RetentionInterface in core/types.ts, and composed it in both captures. Capture and ProcessCapture each lost #limit, #messages, #buckets, #retain, and #push; messages() and clear() now delegate and #intercept/#record call retention.add. Additive only: no published name changed and both captures' observable behaviour is unchanged. Retention had to be barrelled rather than interned — see deviations. Added tests/src/core/Retention.test.ts covering order, the independent caps, an unbucketed level, the returned copies, clear, and the zero and one limits, plus a runnable guide fence and Surface, Methods, Contract 8, and Tests rows.
- **s09-17** applied (src/core/Capture.ts, src/server/ProcessCapture.ts): Took the second branch, which both lane corrections agree on. Deleted the false 'The presence of an entry is what active reads' sentence from both #originals comments and stated on each #active field why the fact is not derived: an empty levels list patches nothing, so a started capture configured with no level leaves #originals empty while still being active. Confirmed against start(), which sets #active before the levels loop. No behaviour changed.
- **s09-18** applied (src/core/*.ts, src/browser/*.ts, src/server/*.ts): Deleted every section reference, chunk label, and predecessor-project reference from src/**/*.ts; the pattern that found 142 lines now returns none. Parenthetical section citations were dropped outright; where a clause carried a real constraint the constraint replaced it — the retention comments now say retention is capped at limit rather than naming the predecessor's leak, and the spinner and bar constants say there is one frame set and one bar glyph pair a caller overrides through options. Chunk labels became the branch they named (browser branch, server branch, TTY sink, render* renderers). Two leftover bare AGENTS prose references exposed by those deletions were removed with them.
- **s09-19** applied (src/core/types.ts, src/server/types.ts): Converted the comment blocks over ConsoleMethod, StreamWriteFunction, and StreamWriteCallback into TSDoc blocks with third-person first sentences and the boundary rationale under @remarks, so the three barrelled exports arrive documented in the emitted declarations.
- **s09-20** applied (src/core/types.ts, src/core/Progress.ts, guides/console.md): Named the payload as ProgressReport in core/types.ts, used it in ProgressEventMap.update, typed the record built in Progress.#advance against it, and added the Surface row plus the data-only paragraph entry. Structurally identical to the anonymous shape, so no consumer-visible change. Placed beside ProgressEventMap rather than beside StepPosition — see deviations.
- **s09-21** deferred_breaking: Re-verified: SpinnerInterface.success/failure and ProgressInterface.failure are unchanged. Every candidate rename moves published interface members, class methods, and guide method-table rows, so the finding defers whole. The two lane corrections also disagree on the successful-terminal verb — see deviations.
- **s09-22** applied (src/core/types.ts, src/core/helpers.ts, src/core/factories.ts, src/browser/factories.ts, src/server/factories.ts, tests/src/core/helpers.test.ts, guides/console.md): Applied what the two lane corrections share: exported one core leaf, selectWriter(level, writers), over a new WriterSet<T> type, and called it from all three sinks; dropped the instruction to record the server sink's warn routing as a deliberate difference, and kept the 'same routing' sentences, which now name the leaf that enforces them. The server sink calls it twice, once for the stream target and once for that target's styled fact, passing { log: out, warn: err, error: err } so its existing routing is unchanged. Unit-tested in tests/src/core/helpers.test.ts across every LogLevel, an omitted level, a folded set, and a non-string member type; Surface rows added for both names.
- **s09-23** applied (src/core/*.ts, src/browser/*.ts, src/server/*.ts): Applied the half that stands on its own: replaced capitalised emphasis with plain prose across all three environments, lowercasing every all-caps token outside backticks and {@link} tags except genuine acronyms and spec names (ANSI, SGR, TTY, CSS, JSON, CSI, OSC, ESC, BEL, DEL, C0, ISO-8601, ECMA-48, POSIX, CJK, ASCII, CR, CRLF, UTF-8, UTF-16, FFFD, OS, API, CI, VT, VGA, DCS, PM, APC, SOS, RIS) and this package's underscore-free identifiers (COLORS, ATTRIBUTES, LEVELS, RESET, DIRECTIVE, INVARIANT, WARN, GET). Only comment lines changed, verified by diffing every non-comment line. One sentence-initial word that fell to lowercase across a line break was re-capitalised. The other half of the repair — rewriting each first sentence into the third person — is deferred_wave per the brief's fleet ruling; every sentence written or rewritten in this unit uses the third-person form.

## Gates

- npm run format:check: pass — All matched files use the correct format. Finished in 2023ms on 83 files using 4 threads. (First run failed on guides/console.md, a file this unit edited; converged with npm run lint then npm run format, then re-ran the non-mutating chain.)
- npm run lint:check: pass — oxlint --config .oxlintrc.json --deny-warnings . — no diagnostics. (One earlier failure of my own, typescript(array-type) on src/core/Retention.ts:38, was fixed by writing ReadonlyArray<T['level']>.)
- npm run check: pass — tsc --noEmit --project tsconfig.json, then check:src:core, check:src:browser, check:src:server — all silent.
- npm run build: pass — build:src:core, build:src:browser, build:src:server all '✓ built in ...'; declaration bundling reported only the pre-existing API Extractor notice that the bundled TypeScript 5.9.3 is older than the project's 6.0.3.
- npm test: pass — src 17 files / 650 tests, policy 1 / 111, config 1 / 46, setup 3 / 17, guides 1 / 68 — all passed.

## Diffstat

```text
 guides/console.md                |  65 +++++--
 src/browser/constants.ts         |  18 +-
 src/browser/factories.ts         |  44 ++---
 src/browser/helpers.ts           |  20 +-
 src/browser/types.ts             |  12 +-
 src/core/ANSIRenderer.ts         |  10 +-
 src/core/Capture.ts              |  71 +++----
 src/core/Logger.ts               |  22 +--
 src/core/LoggerManager.ts        |  14 +-
 src/core/Progress.ts             |  28 +--
 src/core/Reporter.ts             |  14 +-
 src/core/Spinner.ts              |  36 ++--
 src/core/Styler.ts               |  30 +--
 src/core/constants.ts            |  70 +++----
 src/core/errors.ts               |   2 +-
 src/core/factories.ts            |  73 ++++----
 src/core/helpers.ts              | 110 +++++++----
 src/core/index.ts                |   1 +
 src/core/types.ts                | 391 ++++++++++++++++++++++-----------------
 src/server/ProcessCapture.ts     | 107 +++++------
 src/server/constants.ts          |  10 +-
 src/server/factories.ts          |  35 ++--
 src/server/helpers.ts            |  68 ++-----
 src/server/index.ts              |   1 +
 src/server/types.ts              |  84 +++++----
 tests/src/core/helpers.test.ts   |  47 +++++
 tests/src/server/helpers.test.ts |  77 +-------
 27 files changed, 749 insertions(+), 711 deletions(-)

Untracked (new files, not shown by git diff --stat):
 src/core/Retention.ts
 src/server/validators.ts
 tests/src/core/Retention.test.ts
 tests/src/server/validators.test.ts
```

- dist moves: true

## Deviations

Four things the work order needs.

1. s09-16 forced a published-surface addition I could not avoid. The finding asks for the extracted engine to live in src/core and be composed by src/server/ProcessCapture.ts. The only alias src/server can import from core is the barrel specifier `@src/core` (tsconfig paths declares `@src/core`, `@src/browser`, `@src/server` and nothing deeper, and both server build outputs externalize the exact string `@src/core`), so an interned class in the parity INTERNAL list at tests/guides.test.ts would have been unreachable from ProcessCapture. Retention and RetentionInterface are therefore barrelled from src/core/index.ts, documented with Surface rows, a `#### RetentionInterface` Methods table, a runnable guide fence, and a Tests row. That is additive and passes the breaking test, but it is a real API expansion the fix round did not otherwise plan.

2. s09-21's two lane corrections genuinely conflict, so I resolved nothing. One amends to `complete()` and `fail()` across both entities, leaving ProgressEventMap's `complete` event and ProgressInterface's `completed` property in place; the other amends to `succeed()` and `fail()` and requires the progress bar's successful-terminal term to be ruled on as one decision covering the method, the `complete` event, and the `completed` property, or left alone. The finding defers as breaking either way, but the work order has to pick the verb before the rename can be briefed.

3. Two ancillary placement choices, recorded per the deviation contract. ProgressReport sits beside ProgressEventMap in the animations block of core/types.ts rather than beside StepPosition in the reporting block, so the declaration sits with the event that carries it and with its guide table. Retention's public method names are `add`, `records`, and `clear`; `records` rather than `messages` because the class is generic over a record type and both captures keep their own `messages()` names unchanged.

4. Scope note on s09-18. Deleting the parenthetical section citations left two bare `AGENTS` prose references (src/browser/factories.ts and src/core/helpers.ts) that read as fragments and cite the same unresolvable document. I removed both. Section references in guides/console.md and in tests/src/server/helpers.test.ts were outside the finding's stated `src/**/*.ts` population; the one in that test file sat in a comment I was already editing and went with it, but the guide still carries `§n` references that no dossier finding covers.
