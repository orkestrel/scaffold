# VISIT-agent report — setup proofs and the 0.0.52 visit

Unit complete. Every acceptance criterion is met. Nothing committed.

## The advisory as taken

`npx --no-install scaffold audit`, run at `/home/user/orkestrel/agent` before any edit, on
2026-08-25. Its three advisory lines, verbatim:

```text
scripts: The manifest at . declares a planned script with a differing value: test:guides. Keep the declared value unchanged or replace it with the planned value: "test:guides" declares "vitest run --config vite.config.ts --reporter=dot --project guides"; planned "vitest run --config vite.config.ts --no-cache --reporter=dot --project guides".
setup: The target at . carries a test setup module that no proof covers: tests/setup.ts. Add tests/setup.test.ts to cover it. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
```

The `setup:` advisory names one module, `tests/setup.ts`, so the proof work list is one file:
`tests/setup.test.ts`. The path table reported `48 of 126 planned paths drifted from the plan.`

## Touched files

| File                    | Summary                                                                                             |
| ----------------------- | --------------------------------------------------------------------------------------------------- |
| `tests/setup.test.ts`   | New. The proof of `tests/setup.ts` — 34 cases over the exported test-infrastructure behavior        |
| `package.json`          | `test:guides` adopted at the planned value; `test:setup` and its `test` chain link written by repair |
| `vite.config.ts`        | `setup` project baked by repair and registered in the `projects` list                               |
| `package-lock.json`     | The scaffold ^0.0.52 re-pin that arrived dirty                                                      |
| Vendored host file set  | 46 orchestration and docs paths rewritten by `scaffold repair`, plus 7 new ones                     |

Diffstat over the tracked owned files, plus the new proof:

```text
 package-lock.json | 1136 ++++++++++++++++++++++++++++++++---------------------
 package.json      |    9 +-
 vite.config.ts    |   13 +-
 3 files changed, 701 insertions(+), 457 deletions(-)
 tests/setup.test.ts | 415 lines (new)
```

## The proof and what each case asserts

`tests/setup.test.ts` covers the exported behavior of `tests/setup.ts` and re-proves no production
behavior. The agent loop, the conversation, and the two store twins keep their own mirrored suites,
and this file asserts nothing about them.

**`createScriptedProvider` replay.**

- `consumes one turn per call and returns that turn in script order` — two turns, two `generate`
  calls, contents in script order.
- `repeats the last turn once the script is exhausted` — the default `exhaust: 'repeat'`: a call
  past the end returns the last turn.
- `throws past the end of the script under exhaust throw` — `exhaust: 'throw'` rejects with
  `exhausted at turn 1`, the bound a loop test leans on to prove it never over-ran.

**`createScriptedProvider` streaming.**

- `streams a turn as one whole content delta and returns the assembled result` — the default
  `deltasOf`, and the generator's return carries the `usage` the deltas never did.
- `chunks a turn through deltasOf, and the deltas reassemble into the content` — the second route:
  the deltas are joined back into the content rather than compared against a restated chunk list.
- `lets a per-turn deltas list override deltasOf for that one turn` — the override governs the
  stream alone (the turn's result still returns whole) and does not leak into the next turn.
- `yields no delta for an empty list or an empty chunk, and still returns the turn` — `deltas: []`
  streams nothing yet returns, and a zero-length chunk never reaches the consumer.
- `streams a turn thoughts as thinking deltas ahead of its content` — the two channels stay
  separate and ordered, and the reasoning reassembles.
- `assembles the same result through generate as the stream returns` — generate/stream parity,
  taken by comparing one provider's `generate` against a twin's drained stream return.

**`createScriptedProvider` abort.**

- `throws a ProviderAbortError with an empty partial when the signal is already aborted`.
- `throws a ProviderAbortError carrying the content streamed before a mid-stream abort` — the
  partial is a genuine partial (`{ content: 'a' }` of a turn whose content is `'ab'`).
- `carries the reasoning streamed so far on a partial aborted during the thoughts` — the thinking
  channel accumulates into the partial too.

**`createScriptedProvider` identity and recorders.**

- `names the provider through name, defaulting to scripted` — `id` and `name` both move.
- `carries a format only when one is supplied` — absent by default, and the supplied object is
  forwarded by identity.
- `records each call messages, tools, options and signal only under record` — including that the
  recorded `signal` is the live bound the call was handed, held past the call.
- `records nothing unless record is set`.
- `reports the concurrent high-water mark and the calls started` — `maxInFlight` reads 1 after a
  serial call and 3 after three the test itself holds open concurrently, and it stays a high-water
  mark after they settle; `started` reads 4.

**Agent data builders.** One case each for `createToolCall`, `createTokenUsage`, and
`createAgentJob`: the documented default, then an override that replaces only what it names.

**Canonical tools.** `addTool` and `loopTool` are real callable `ToolInterface`s whose `execute`
resolves `5` and `'again'`, and each call mints an independent tool.

**`createStubSummarizer`.** One case: the digest names the slice's own length, two slices of
different length digest differently, and the recorder holds every digested slice in order — the
property a compaction test reads a section summary back through.

**`createRecordingScheduler`.** `counts each paced turn boundary and resolves its delay as a no-op`,
and `rejects with the signal reason on an aborted yield and paces nothing`.

**`buildConversationSnapshot`.** `folds the oldest turns into one summarized section and keeps the
last live` derives the expected section summary and the expected rollup by recomputing them from the
originals the section retained and from the section summaries — a second route to the digest rather
than a restatement of the literals the module folded — and proves no folded original lingers in the
live tail. `takes the conversation id from its argument and defaults to chat` pins the identity.

**`assertConversationStoreContract`.** The battery is registered once against a proof-local
conforming `ConversationStoreInterface`. Registering it is the proof: the helper's whole behavior is
the block of cases it registers, so a battery that stopped registering, or that registered a contract
a conforming store cannot satisfy, reddens this file. The store is proof-local rather than
`MemoryConversationStore` because driving the production twin here would re-run that store's own
suite inside the setup proof.

## Mutation control

One control, on `tests/setup.test.ts` — the mid-stream partial expectation, mutated in place from
`{ content: 'a' }` to `{ content: 'ab' }`, run through the shipped project, then restored.

Command: `npm run test:setup`. The failing line:

```text
 FAIL  |setup| tests/setup.test.ts > createScriptedProvider abort > throws a ProviderAbortError carrying the content streamed before a mid-stream abort
AssertionError: expected { content: 'a' } to deeply equal { content: 'ab' }
      Tests  1 failed | 33 passed (34)
```

Restored, same command: `Tests  34 passed (34)`, exit 0.

## What repair retained, and the order it needed

`npx --no-install scaffold repair` refused its first run:

```text
TARGET: The configs group is blocked because the manifest at . does not reach a Vitest project the planned configuration registers: setup. No chain from test or prepublishOnly invokes it. test:setup is already declared, so the gate is missing rather than the script: invoke it by name from the test or prepublishOnly chain. Exclude configs from --groups to write another group.
```

The block is an ordering one: `configs` cannot write the `setup` project until the manifest reaches
it, and the manifest cannot reach it until `configs` exists to be reached. Repair was therefore run
in two passes, both inside owned scope:

1. `npx --no-install scaffold repair --groups manifest` — wrote `test:setup` and left the `test`
   chain at its declared value. Closing line: `1 written, 1 unchanged, 0 removed in ..`
2. `npm pkg set` on `scripts.test`, adding `npm run test:setup` at the position the plan puts it
   (after `test:config`, before `test:guides`).
3. `npx --no-install scaffold repair` — full. Closing lines:
   `0 of 126 planned paths drifted from the plan.` and `49 written, 78 unchanged, 0 removed in ..`

Repair named no retained differing script value on either pass. The `scripts:` advisory the audit
opened with was closed by adopting the planned `test:guides` before repair ran, so nothing was left
to retain. Beyond `test:guides`, no value was adopted.

The full pass rewrote 46 vendored orchestration and docs paths and added 7 more
(`.agents/templates/`, `.agents/transports/`, `.agents/skills/orkestrel-prove-journey/`,
`.agents/skills/orkestrel-publish/`, `.claude/skills/orkestrel-prove-journey/`,
`.claude/skills/orkestrel-publish/`, `.agents/skills/orkestrel-debrief/references/retention.md`).
It removed nothing, so the paths the audit reported `foreign` — `.claude/agents/codex.md`,
`.codex/agents/claude.toml`, and `.agents/skills/orkestrel-human-journey/` with its
`.claude` bridge — are still present. Removing them is `scaffold overwrite`, which this unit was not
given.

## Gates

Each run bare at `/home/user/orkestrel/agent` after the mutation control was restored, in the order
the contract fixes. Every one exited 0.

| Gate                  | Closing line                                                                                  |
| --------------------- | ----------------------------------------------------------------------------------------------- |
| `npm run format:check` | `Finished in 3310ms on 173 files using 4 threads.` (preceded by `All matched files use the correct format.`) |
| `npm run lint:check`  | `> oxlint --config .oxlintrc.json --deny-warnings .` — no diagnostic emitted, exit 0           |
| `npm run check`       | `> tsc --noEmit -p configs/src/tsconfig.core.json` — no diagnostic emitted, exit 0             |
| `npm run build`       | `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts`                                |
| `npm test`            | `Tests  565` / `93` / `46` / `34` / `73` passed across `src:core`, `policy`, `config`, `setup`, `guides` |

The `npm test` per-project closing lines:

```text
> test:src     Test Files  17 passed (17)   Tests  565 passed (565)
> test:policy  Test Files   1 passed (1)    Tests   93 passed (93)
> test:config  Test Files   1 passed (1)    Tests   46 passed (46)
> test:setup   Test Files   1 passed (1)    Tests   34 passed (34)
> test:guides  Test Files   1 passed (1)    Tests   73 passed (73)
```

## Acceptance criteria

1. **Met.** `npx --no-install scaffold audit` at exit reports no `setup:` advisory. The only advisory
   left is `dependencies: typescript declares major 6, while the registry serves major 7.`, which is
   a dependency change this unit is not authorized to make.
2. **Met.** Every gate closes green, each read bare, per the preceding table.
3. **Met.** One mutation-control failing line reported, and the file restored — `npm run test:setup`
   reads `Tests  34 passed (34)` afterwards, and `npm run format:check` and `npm run check` were
   re-run after the restore.

## Deviation state

No deviation. The repair ordering was settled inside owned scope, and the brief's deviation contract
leaves file-internal structure and ancillary sequencing to the executor.

One finding, reported not fixed, because `tests/setup*.ts` is off-limits to this unit:

- `tests/setup.ts` imports and calls `describe`, `it`, and `expect` from `vitest`, inside its
  exported `assertConversationStoreContract`. The vendored `.claude/rules/tests.md` § Shared test
  infrastructure states "A setup file owns everything an assertion needs and nothing an assertion
  is: `describe`, `it`, and `expect` never appear in a `setup*.ts`", and the brief restates it as
  part of the fixed proof shape. `tests/setupPolicy.ts` carries no check for it, so no gate reports
  it. Closing it means moving the battery's registration out of the setup module and into the two
  store twins that invoke it, which changes `tests/setup.ts`, both twin suites, and this proof's
  final block — a successor unit, not this one.

## Instruments

The proof was iterated through a throwaway copy at `tmp/probe/setup.test.ts` (the `probe` project)
before `repair` baked the `setup` project, because no project collected `tests/setup*.test.ts` until
then. That copy is deleted; `tmp/` now holds only `tmp/units/`.
