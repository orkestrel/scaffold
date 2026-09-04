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
| probe-obj-5  | The lint fixture opens the `closed` record and never writes the URI into it   | 1 failed, 29 passed (`probe-obj-5-planted-red2.txt`) | 30 passed (`probe-obj-5-green2.txt`) |

The `probe-obj-5` red output names the condition in its own words at the shipped budget:
`Condition "the lint fixture to record the standard input it closed" did not hold within 10000ms`,
which is what the rule requires of an expired budget. That plant is the control the reshaped
condition needs: `openSync` still creates `closed`, so a condition reading existence alone would
have passed the plant, and the shipped condition reads the record's contents and fails it. Both
captures ran `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server
tests/src/server/stages/LintStage.test.ts`, and the plant was restored by editing the line back.

The round's earlier control renamed each polled marker to a key nothing writes and reported 3
failed, 27 passed at a 2000 ms budget (`probe-obj-5-planted-red.txt`,
`probe-obj-5-restored-green.txt`). Fix round 1 supersedes it: referral R-2 asked for a control at
the shipped budget, and the reshaped condition needs a plant that leaves the record's existence
intact. The superseded captures stay on disk.

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

Each pattern ran from `/home/user/fleet/probe`, and every row names the paths it covered rather
than a glob whose population a reader has to infer. No sweep entered `node_modules`,
`package-lock.json`, or `tmp/`. Three path sets recur, and the `Paths` column names each by its
placeholder:

- `TREE` — `src`, `tests`, `guides`, `configs`, `scripts`, `dist`, `README.md`, `AGENTS.md`,
  `CLAUDE.md`, `package.json`, `vite.config.ts`, `tsconfig.json`.
- `PROSE` — `src`, `tests`, `guides`, `README.md`, `AGENTS.md`, `CLAUDE.md`.
- `DIFF` — the added lines (`^\+`) of `git diff -U0 -- src tests guides`, which spans every path
  this unit modified.

Every row was re-measured in fix round 1 against the tree as it stands, so a line number here is the
shipped one.

| Pattern                                                             | Paths                          | Result                                             |
| -------------------------------------------------------------------- | -------------------------------- | ---------------------------------------------------- |
| `createRevisionFile`                                                | `TREE`                         | no match; `dist/` carried the built output of the preceding `npm run build` |
| `\bcreateRevisionFile(s|d|ing)?\b` case-insensitive                 | `PROSE`                        | no match                                           |
| `isProcessLive`                                                     | `PROSE`                        | no match                                           |
| `\b(isProcessLive|isProcessLives|isProcessLived|isProcessLiving)\b` case-insensitive | `src`, `tests`, `guides/probe.md`, `guides/README.md`, `README.md` | no match |
| `#destroyed`                                                        | `src`                          | no match. A `#`-private field can occupy no other population |
| `taken on 2026-08-20`                                               | `guides/probe.md`, `guides/README.md`, `README.md` | one hit, `guides/probe.md:1002`, the Cost measurement probe-subj-6's repair leaves in place; the receipt paragraph reads empty |
| `function readHostEnding|const SERVER = |const ORDERED = \[|const STALLING = \[` | `tests`             | one hit, `tests/setupServer.ts:283`, the moved helper |
| `Content-Length: ' + Buffer.byteLength`                             | `tests`, `src`                 | one hit, `tests/setupServer.ts:83`                 |
| `JSON.parse(buffer.subarray`                                        | `tests`, `src`                 | one hit, `tests/setupServer.ts:97`                 |
| `\b(should|simply|easy|easier|just|via|currently|utilize|leverage|e\.g\.|i\.e\.|etc\.|performant|robust|allows you to|and/or|dummy|sanity check|please)\b` case-insensitive | `DIFF` | no match |
| `\b(above|below|once)\b` case-insensitive                           | `DIFF`                         | every hit ruled: `above` as magnitude, `at once` and `exits at once` as simultaneity, `child.once` as a code token. One hit was a document reference and was rewritten before the gates |

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
11. **probe-obj-4's `spawn` clause was not factored.** The repair asked for one exported leaf
    carrying the mechanics both endings need — spawn, await exit, read `{ code, signal }`. Only the
    exit reading is shared, and `readChildEnding` (`tests/setupServer.ts:234-238`) carries it; both
    callers take it at `:262` and `:285`. The spawn stays where it is, at `readSignalEnding:261` and
    `readHostEnding:284`, because the two spawns agree on nothing a leaf could hold fixed: different
    programs (a caller-supplied one against a fixed timer), different stdio
    (`['ignore', 'pipe', 'ignore']` against `'ignore'`), different readiness (the first `data` event
    on standard output against the `spawn` event), and different kill doors (`child.kill` against
    `process.kill`). A leaf parameterized over those adds no boundary, invariant, composition,
    translation, lifecycle, or narrower contract, so it is the superfluous wrapper `AGENTS.md`
    § Design laws refuses — and the same refuter refused a kill-door parameter in this row for that
    reason. This decision is recorded in fix round 1 against finding O-2, which named the departure
    defensible and the record missing.

## Deviation state

None. No row's repair contradicted a rule, collided with a name, needed a file outside Owned, or
needed a consumer edit to keep this package's gates green. A grep for `buildRevisionPath` over
`/home/user/fleet/probe` returned nothing before the rename, so the name was free.

## Review evidence

- `/home/user/work/evidence/conform-probe.diff` — 1600 lines, written by `node /home/user/scaffold/tmp/work/evidence.mjs probe`.
- `/home/user/work/evidence/conform-probe.status` — 14 entries, every one inside Owned.

## Fix round 1

Round 1's lanes were the objective lane
(`/home/user/scaffold/.orkestrel/campaign/conform/units/l4/probe-objective-r1.md`: FAIL on claims 2
and 4, findings O-1 to O-3, referrals R-1 to R-3) and the Grok checker
(`/home/user/scaffold/.orkestrel/campaign/conform/units/l4/probe-r1-checker-grok.result.md`: PASS,
with one referral asking whether the sweep table names the paths claim 3 requires). The campaign
directory holds no subjective-lane verdict for probe round 1, so this round answers the lane files
that exist. Every fix landed in `/home/user/fleet/probe`, and the sections this round rewrote — the
planted-control row, § Sweeps, and § Decisions — were corrected in place rather than restated here.

### Claim 2 and R-2 — the polled condition holds only after the close

The lane's failing input was real. `openSync('closed', 'w')` creates the record before
`closeSync(0)` runs, so `scratch.read('closed') !== undefined` could hold in the window before the
close the condition names. The condition was the same race in a new spelling.

The lane's first form landed, keeping decision 8's descriptor discipline:

- `tests/src/server/stages/LintStage.test.ts:1305` polls
  `() => (scratch.read('closed') ?? '') !== ''`.
- `tests/setupServer.ts:62-64` reads: "and `PROBE_CLOSES_INPUT` closes the server's own standard
  input when that document is closed and then writes the URI into the `closed` record it opened
  first, so the record's contents land after the close and a test that waits for those contents
  writes again only after the close has landed."
- `tests/src/server/stages/LintStage.test.ts:1299-1302` reads: "The fixture opens the record before
  it closes its own descriptor and writes the URI into it afterwards, so the record's contents land
  after the close. The write that follows this wait therefore meets a pipe that is already broken
  rather than one this host was slow to break."

`tests/setupServer.ts:147-148`, the descriptor comment decision 8 records, is unchanged: it explains
which descriptor the write lands on, and it claims nothing about when the record exists.

R-2's re-plant answers the referral's question. The plant now stops the fixture writing the record
at all — the `writeSync(record, …)` element of the program text was deleted, leaving `openSync` and
both `closeSync` calls — so `closed` still exists and stays empty. Under the reshaped condition that
is a red; under the condition the lane refuted it would have been a green, which is what makes this
plant the control the change needs. The budget is the shipped `10_000` rather than the earlier
control's `2_000`.

| Reading | Command | Result | Capture |
| ------- | ------- | ------ | ------- |
| Planted red | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/stages/LintStage.test.ts` | 1 failed, 29 passed; `Condition "the lint fixture to record the standard input it closed" did not hold within 10000ms` | `/home/user/work/evidence/probe-proofs/probe-obj-5-planted-red2.txt` |
| Restored green | the same command | 30 passed | `/home/user/work/evidence/probe-proofs/probe-obj-5-green2.txt` |

The plant was restored by editing the deleted element back, never by `git restore`, and the restored
line is byte-identical to the shipped one.

### Claim 4, O-3, and the checker's referral — the sweep records

§ Sweeps is rewritten rather than extended, because the shortfall the lane and the checker both
named is the same one: a row recording `**/*.{ts,md}` names the pattern's admitted population, not
the population the sweep was drawn from. Each row now names its paths through `TREE`, `PROSE`,
`DIFF`, or an explicit list, and each was re-measured against the tree as it stands.

The rows this round adds:

- probe-subj-6's sweep, which claim 4 found missing: `taken on 2026-08-20` over `guides/probe.md`,
  `guides/README.md`, `README.md`. One hit, `guides/probe.md:1002`, the Cost measurement the row's
  repair leaves in place; the receipt paragraph reads empty. The lane measured this hit at
  `guides/probe.md:1003`; the O-1 deletion later in this round removed one line earlier in the file,
  so the shipped line is `:1002`.
- O-3's inflection rows:
  `\b(isProcessLive|isProcessLives|isProcessLived|isProcessLiving)\b`, case-insensitive, over `src`,
  `tests`, `guides/probe.md`, `guides/README.md`, `README.md` — no match; and `#destroyed` over
  `src` — no match, with the row now stating why `src` is the whole population a `#`-private field
  can occupy.

Two recorded line numbers moved with the claim-2 reword, which adds one line to `tests/setupServer.ts`
before both: the framing writer reads `tests/setupServer.ts:83` and the framing parser
`tests/setupServer.ts:97`. The § Sweeps table carries the shipped values.

### O-1 — `LintStageInterface` tables `inspect` alone

`guides/probe.md:258` tabled a `destroy` row under `#### LintStageInterface`. That row is deleted.
`src/server/types.ts:240-251` declares `LintStageInterface extends StageInterface` with `inspect`
alone, `destroy` is inherited and already tabled under `StageInterface` at `guides/probe.md:244`,
and the `TypeStageInterface` table takes the same convention. `.claude/rules/documentation.md`
§ Parity requires the table's methods to match the interface's call-signature members exactly.

`npm run test:guides` exits 0 with 13 passed
(`/home/user/work/evidence/probe-proofs/fix1-test-guides-2.txt`). Its first run in this round exited
1 on the standing arming failure, in the row `earns the receipt the guide documents`, whose cause
chain ends in `LSPError: The LSP request 'initialize' exceeded its deadline`
(`/home/user/work/evidence/probe-proofs/fix1-test-guides.txt`). That run started seconds after a
24-second contended `LintStage.test.ts` run; run alone the project is green. The failure names no
parity row and no file this round touched. The deciding reading is the landing run under
`ALLOW_RED_TEST=probe`, which R-3 leaves with the Orchestrator.

### O-2 — the `spawn` clause is recorded

§ Decisions item 11 records it: only the exit reading is shared and `readChildEnding` carries it,
and the two spawns differ in program, stdio, readiness signal, and kill door, so a leaf
parameterized over those is the superfluous wrapper `AGENTS.md` § Design laws refuses. The decision
records the departure rather than factoring the spawn.

### R-1 — no addendum exists

The referral is answered rather than carried. No file
`/home/user/scaffold/tmp/units/conform/conform-probe-brief-addendum.md` exists, and probe's one
fleet dependency, mcp, renamed nothing probe imports. The lane's claim-1 and claim-2 rulings are
therefore against the complete row set, and they stand as written.

### R-3 — the landing run

Not this unit's to take. The deciding whole-suite reading runs under `ALLOW_RED_TEST=probe` at
landing, with the Orchestrator, after this unit exits. This round ran scoped files only.
- `/home/user/work/evidence/probe-proofs/` — every red, green, and gate capture named in this report.
