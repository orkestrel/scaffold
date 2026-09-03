# Unit conform-probe — report

Every row landed. No row stopped. The gate chain is green through `build`; `npm test` carries the
standing arming failure the brief names and nothing else.

## Rows

| Row          | Disposition | What landed                                                                                     |
| ------------ | ----------- | ------------------------------------------------------------------------------------------------ |
| probe-subj-1 | applied     | `Probe.#destroy()` releases the emitter in a `finally`, plus the guide's Teardown entry and a proof |
| probe-subj-2 | applied     | `createRevisionFile` renamed to `buildRevisionPath` across source, tests, and the guide row       |
| probe-subj-5 | applied     | `#destroyed` deleted from `Probe`, `TypeStage`, `LintStage`, `RuntimeStage`; every read derived   |
| probe-subj-6 | applied     | The receipt paragraph drops the stale date and names the gate that re-runs the claim             |
| probe-obj-1  | applied     | The entry splits on `/\r\n|\n/u`, with the row that reads the rule                                |
| probe-obj-2  | applied     | `isProcessLive` deleted; every site reads `isRunning` from `@orkestrel/test/server`               |
| probe-obj-3  | applied     | One `createLintFixture` replaces `SERVER`, `ORDERED`, `STALLING`, and every manifest literal      |
| probe-obj-4  | applied     | `readHostEnding` moved to `setupServer.ts` beside `readChildEnding` and `describeEnding`         |
| probe-obj-5  | applied     | Five sleeps became named conditions; the refuted sixth stands                                    |
| probe-obj-6  | applied     | `probeRefusedTargets` exported with TSDoc and its own proof                                      |
| probe-obj-7  | applied     | `RuntimeStage` `@remarks` and the guide state the exact-match overlay and its miss report        |
| fleet-F1     | noop        | `tests/setup.ts` declares no `isBrowserVuePath`, and this workspace has no browser environment   |
| fleet-F2     | noop        | No implementation class declares a public `readonly id` field                                    |

### fleet-F1 evidence

`grep -c isBrowserVuePath tests/setup.ts tests/setup.test.ts` reports `0` for each. `tests/setup.ts`
holds one export, `WORKSPACE_ROOT`, and `tests/setup.test.ts` proves it. `ls -d src/browser
app/browser tests/setupBrowser.ts` reports each absent, so the browser-environment branch of the
ruling is inapplicable and the sole-export branch is not reached either.

### fleet-F2 evidence

Classes read: `ProbeError` (`src/core/errors.ts:28`), `Overlay` (`src/server/Overlay.ts:32`),
`Probe` (`src/server/Probe.ts:63`), `ProbeServer` (`src/server/ProbeServer.ts:51`), `LintStage`
(`src/server/stages/LintStage.ts:54`), `RuntimeStage` (`src/server/stages/RuntimeStage.ts:112`),
`TypeStage` (`src/server/stages/TypeStage.ts:52`). `grep -n "readonly id\|\tid:\|get id("` over those
files exits 1 with no match. `readonly id: string` appears only at `src/core/types.ts:342`, inside
the `Verdict` interface, which the ruling leaves unchanged.

## Files touched

| File                                          | Summary                                                                                            |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `src/bin/main.ts`                             | Splits a reported message on `/\r\n|\n/u` instead of on a bare carriage return                      |
| `src/server/Probe.ts`                         | Releases the emitter in `#destroy()`'s `finally`, derives destruction from `#closing`, takes the rename |
| `src/server/helpers.ts`                       | Renames the helper to `buildRevisionPath` and rewrites its first sentence, `@returns`, and `@example` |
| `src/server/stages/TypeStage.ts`              | Drops `#destroyed`; five reads derive from `#closing`                                               |
| `src/server/stages/LintStage.ts`              | Drops `#destroyed`; three reads derive from `#closing`                                              |
| `src/server/stages/RuntimeStage.ts`           | Drops `#destroyed`, takes the rename, and states the overlay's exact-match sensitivity in `@remarks` |
| `guides/probe.md`                             | Teardown entry, the `sensitive` paragraph, the receipt sentence, and the renamed helper row         |
| `tests/setupServer.ts`                        | Adds `createLintFixture`, `Ending`, `readChildEnding`, `describeEnding`, `readHostEnding`; exports `probeRefusedTargets`; deletes `isProcessLive` |
| `tests/setupServer.test.ts`                   | Covers the fixture builder, the ending leaves, and the refused-name classifier; drops the `isProcessLive` rows |
| `tests/src/server/Probe.test.ts`              | Reads the released emitter, and builds both fixture servers from the shared builder                 |
| `tests/src/server/stages/LintStage.test.ts`   | Uses the shared fixture, `isRunning`, the moved ending helpers, and five named waits                |
| `tests/src/server/stages/RuntimeStage.test.ts`| Takes the rename at its import and ten call sites                                                   |
| `tests/src/server/helpers.test.ts`            | Takes the rename and renames its case to `builds sibling revision paths…`                           |
| `tests/src/bin/main.test.ts`                  | Adds the line-ending row, and reads `describeEnding` and `readChildEnding` instead of inline copies |

Diffstat: 14 files changed, 522 insertions, 376 deletions (before the framing-parser unification;
the recorded diff is `/home/user/work/evidence/conform-probe.diff`, 1600 lines).

## Failing-first proofs

Each command ran in `/home/user/fleet/probe`. Every capture sits under
`/home/user/work/evidence/probe-proofs/`.

| Row          | Command                                                                          | Red                            | Green                        |
| ------------ | --------------------------------------------------------------------------------- | -------------------------------- | ------------------------------ |
| probe-obj-1  | `npx vitest run … --project src:bin -t 'splits a reported message'`               | 1 failed (`probe-obj-1-red.txt`) | 1 passed (`probe-obj-1-green.txt`) |
| probe-subj-1 | `npx vitest run … --project src:server -t 'destroys idempotently and releases the listeners'` | 1 failed (`probe-subj-1-red.txt`) | 1 passed (`probe-subj-1-green.txt`) |
| probe-obj-2  | `npx vitest run … --project src:server --project setup tests/src/server/stages/LintStage.test.ts tests/setupServer.test.ts` | 6 failed, 27 passed (`probe-obj-2-red.txt`) | 33 passed (`probe-obj-2-green.txt`) |
| probe-obj-4  | `npm run test:setup`                                                             | 3 failed, 4 passed (`probe-obj-4-red.txt`) | 7 passed (`probe-obj-4-green.txt`) |
| probe-obj-6  | `npm run test:setup`                                                             | 1 failed, 3 passed (`probe-obj-6-red.txt`) | 4 passed (`probe-obj-6-green.txt`) |

Three rows carry a planted-wrong control instead, because each removes or consolidates a mechanism
rather than repairing a defect a test could name first.

| Row          | Plant                                                                         | Red                                        | Restored green                            |
| ------------ | ------------------------------------------------------------------------------ | -------------------------------------------- | ------------------------------------------- |
| probe-subj-5 | `#closing === undefined` at the entry guard of all four classes                | 99 failed, 21 passed (`probe-subj-5-planted-red.txt`) | 119 passed, 1 standing failure (`probe-subj-5-restored-green.txt`) |
| probe-obj-3  | The builder drops the `server.pid` announcement and the `delay` selection      | 2 failed, 7 passed (`probe-obj-3-builder-planted-red.txt`) | 9 passed (`probe-obj-3-builder-green.txt`) |
| probe-obj-5  | Each polled marker renamed to a key nothing writes                            | 3 failed, 27 passed (`probe-obj-5-planted-red.txt`) | 30 passed (`probe-obj-5-restored-green.txt`) |

The `probe-obj-5` red output names each condition in its own words, for example
`Condition "the lint fixture to record the initialize it never answers" did not hold within 2000ms`,
which is what the rule requires of an expired budget.

Per-file greens after each row, all with `npx vitest run --config vite.config.ts --no-cache
--reporter=dot --project src:server <file>`:

- `TypeStage.test.ts` 24 passed (`probe-subj-5-typestage-green.txt`)
- `LintStage.test.ts` 30 passed (`probe-subj-5-lintstage-green.txt`, `probe-obj-3-lintstage-green.txt`, `probe-obj-4-lintstage-green.txt`, `probe-obj-5-green.txt`, `probe-obj-3-framing-lintstage-green.txt`)
- `RuntimeStage.test.ts` 40 passed (`probe-subj-5-runtimestage-green.txt`)
- `Probe.test.ts` 26 passed (`probe-subj-5-probe-green.txt`, `probe-obj-3-probe-green.txt`, `probe-obj-3-framing-probe-green.txt`)
- `helpers.test.ts` with `RuntimeStage.test.ts` 82 passed (`probe-subj-2-green.txt`)
- `npm run test:guides` 13 passed (`probe-subj-2-guides.txt`)

probe-obj-1 has no behavioural proof available, and that is a finding rather than a shortcut. The
entry runs on import and ends the process it is loaded into, so its reporter cannot be called from a
test. No refusal this package can construct carries a lone carriage return to it either: every
construction-time message is built from a fixed string and a package name, and `describeUnknown` is
reached only on the arming path, which never reaches this reporter. The row therefore reads the
entry's own rule, the way `starts one probe server and exports nothing` beside it already does, and
the row's comment records why.

probe-obj-7's new sentence names a failure behaviour that `RuntimeStage.test.ts:893` already drives:
`reports when workspace configuration serves a covered module before the overlay` asserts the exact
`workspace` issue the sentence quotes.

## Sweeps

Each pattern ran from `/home/user/fleet/probe` over the tracked tree, excluding `node_modules`.

| Pattern                                                             | Paths                          | Result                                             |
| -------------------------------------------------------------------- | -------------------------------- | ---------------------------------------------------- |
| `createRevisionFile`                                                | `**/*.{ts,md,json,js,cjs}`     | no match, `dist/` included after `build`           |
| `createRevisionFile(s|d|ing)?\b` case-insensitive                   | `**/*.{ts,md}`                 | no match                                           |
| `isProcessLive`                                                     | `**/*.{ts,md}`                 | no match                                           |
| `#destroyed`                                                        | `src/`                         | no match                                           |
| `function readHostEnding|const SERVER = |const ORDERED = \[|const STALLING = \[` | `tests/`            | one hit, `tests/setupServer.ts:283`, the moved helper |
| `Content-Length: ' + Buffer.byteLength`                             | `tests/`, `src/`               | one hit, `tests/setupServer.ts:82`                 |
| `JSON.parse(buffer.subarray`                                        | `tests/`, `src/`               | one hit, `tests/setupServer.ts:96`                 |
| `\b(should|simply|easy|easier|just|via|currently|utilize|leverage|e\.g\.|i\.e\.|etc\.|performant|robust|allows you to|and/or|dummy|sanity check|please)\b` case-insensitive | added lines of `git diff -U0` | no match |
| `\b(above|below|once)\b` case-insensitive                           | added lines of `git diff -U0`  | every hit ruled: `above` as magnitude, `at once` as simultaneity, `child.once` as a code token. One hit was a document reference and was rewritten before the gates |

No row deletes a count over a package-owned set, so the number-word and numeral sweeps that rule
names do not fire. The prose this unit authored states no count.

## Gates

Run in order from `/home/user/fleet/probe`, each read bare.

| Command               | Exit | Reading                                              |
| ---------------------- | ---- | ------------------------------------------------------ |
| `npm run format:check` | 0    | All matched files use the correct format, 68 files    |
| `npm run lint:check`   | 0    | no output                                            |
| `npm run check`        | 0    | root project and the three scoped projects           |
| `npm run build`        | 0    | `dist/bin/main.js` 0.41 kB, and the core and server bundles |
| `npm test`             | 1    | 8 failed, 221 passed, 229 total; see the observation |

`npm run format:check` first reported `tests/setupServer.ts` unformatted. I ran
`npx oxfmt --config .oxfmtrc.json --write tests/setupServer.ts`, scoped to that one owned file rather
than the tree, and the checker then passed.

### Observation — the standing arming failure

`npm test` exits 1 on the failure set the brief names, and on nothing else. All 8 failures carry one
cause: `The probe could not arm: The Oxlint language server exited with code 0`, whose `cause` chain
ends in `LSPError: The LSP request 'initialize' exceeded its deadline`. A
`grep -c "could not arm: The Oxlint language server exited with code 0"` over the run reports 8, one
per failure.

- `tests/src/bin/main.test.ts`: `answers both protocol eras without exposing worker output on stdout`, `carries the verdict record beside the rendered text on both eras`, `carries a record whose control reports an issue per refused declaration`, `answers a record past the published key bound with the rendered text alone`, `answers a rendering past the content bound with the receipt block`, `answers a driven third-party client with the verdict record`, `answers a pinned legacy client through the initialize path`.
- `tests/src/server/Probe.test.ts`: `mints receipts only when every stage executes cleanly, including for a control that shares no path with its case, and returns admitted path issues`.

The failure is load-sensitive, so the deciding run is yours. Two readings say so. `npm run
test:src:bin` alone drops that file from 7 failures to 1, on the same cause
(`gate-test-bin-alone.txt`). `Probe.test.ts` run alone passed 26 of 26 three times after the changes
landed (`probe-subj-5-probe-green.txt`, `probe-obj-3-probe-green.txt`,
`probe-obj-3-framing-probe-green.txt`), and failed only inside a four-file contended run and inside
`npm test`. The whole-suite reading was identical before and after the last edit of the unit, so
nothing this unit changed moved it.

I did not measure `npm test` at the committed baseline; the brief's § Standing conditions supplied
that reading, and this unit's readings are consistent with it.

## Breaking

`buildRevisionPath` replaces the published `createRevisionFile` on `@orkestrel/probe/server`.

No consumer edit is required. A grep for `from '@orkestrel/probe'` and `from '@orkestrel/probe/server'`
over every fleet `src`, `app`, and `tests` tree returns only this package's own files, as the brief's
§ Consumers records, and every other fleet package reaches probe through the `prove` Model Context
Protocol tool, whose `CLAIM_SHAPE` schema this rename does not touch. The rename earns a version bump
for this package.

## Shared-file patches

None. Every edit landed inside § Scope's Owned set, and `git status --short` lists exactly those
files (`/home/user/work/evidence/conform-probe.status`, 14 entries).

## Decisions recorded, not deviations

The deviation contract makes each of these mine to settle. None conflicts with a row's objective.

1. **`probe-subj-1` obliged one existing assertion to change.** The refuter's evidence surveyed
   `probe.emitter` uses and missed the `on: { error }` hook at `Probe.test.ts:1460`. Its
   `expect(failures.count).toBe(1)` asserted that a destroyed coordinator still reports a later
   `prove` refusal to a listener, which is exactly what releasing the emitter ends. I reworked that
   row into the row the repair asks for — it now records the count teardown left and asserts a later
   refusal does not raise it, and reads `probe.emitter.destroyed` beside it — and renamed it
   `destroys idempotently and releases the listeners its host registered`. The no-double-reporting
   intent it carried is still proven by `emits one error for an ordinary stage failure`, which runs
   before teardown.
2. **No `get #destroyed()` accessor.** The refuter allowed one where the derived expression reads
   poorly. It does not: `ProbeServer.ts:93` already spells the same question as
   `this.#closing !== undefined` in this package, so the fifteen replaced reads now read the way the
   package's fourth class always has.
3. **`readHostEnding` returns `Ending` rather than the phrase.** `read*` obtains a value and
   `describe*` renders one, so the three call sites in `LintStage.test.ts` wrap it in
   `describeEnding`. That is what makes `describeEnding` the single construction of the phrase the
   row asks for.
4. **Two further copies of that phrase and of the exit read, in `main.test.ts`.** Line 1018 built the
   `code <n>` / `signal <s>` phrase inline and lines 1027-1031 built `readChildEnding`'s promise
   inline. The row's rule — any near-duplicate helper is a defect — reaches both, so both now call
   the exported leaves. The refuter's instruction to leave `main.test.ts:1006` and `:1010` unchanged
   is honoured: `readSignalEnding`'s signature is unchanged.
5. **The fixture builder takes `budget`, `delay`, and `binary`, and nothing else.** Every other
   difference between the three programs is already marker-driven at run time, so one program text
   carries every marker and no option selects a conversation. That keeps the builder clear of a
   behaviour-selecting discriminator. The two facts the refuter names are carried: `budget` is the
   self-exit timer, and the `server.pid` announcement is now unconditional, so `readFixtureServer`
   works against any fixture rather than one.
6. **`version` is not an option.** Every site publishes `1.79.0`, and a capability with no consumer
   is speculation.
7. **The builder's program carries one framing parser, not two.** The refuter asked for exactly one.
   The blocking handshake reader in the `stall` branch and the streaming reader now share one
   `frame()` function inside the program; the blocking reader keeps its own `readSync` loop, which is
   the mechanism that conversation exists to have. `LintStage.test.ts` drives the blocking path on
   this host — `restores progress to its pre-inspection reading while its close cleanup is still
   pending` passed rather than skipped in every run — so the unification is proven rather than
   assumed.
8. **`PROBE_CLOSES_INPUT` takes its record descriptor before closing descriptor 0.** A plain
   `writeFileSync` after `closeSync(0)` would have been handed the freed descriptor 0 and left
   libuv's stdin handle pointing at a regular file. The program opens `closed` first, closes 0, then
   writes and closes the record, so the marker lands after the close and descriptor 0 stays free.
9. **`LintStage.test.ts:1257`'s `waitForDelay(250)` stands**, as the refuter's REFUTED ruling
   directs, along with the two sleeps inside `readPipeWrites` and the settle window in the stall row,
   which the row list does not name.
10. **The guide's `sensitive` paragraph puts the `RuntimeStage` sentence after the `TypeStage`
    sentence and before the folding sentence**, so the paragraph reads as which stage mints with
    what, then what folding reaches.

## Deviation state

None. No row's repair contradicted a rule, collided with a name, needed a file outside Owned, or
needed a consumer edit to keep this package's gates green. A grep for `buildRevisionPath` over
`/home/user/fleet/probe` returned nothing before the rename, so the name was free.

## Review evidence

- `/home/user/work/evidence/conform-probe.diff` — 1600 lines, written by `node /home/user/scaffold/tmp/work/evidence.mjs probe`.
- `/home/user/work/evidence/conform-probe.status` — 14 entries, every one inside Owned.
- `/home/user/work/evidence/probe-proofs/` — every red, green, and gate capture named in this report.
