The unit is complete. Every item landed, both captures are of the shipped tree, and the gate chain is green.

## The reshaped condition and the two reworded sentences

`/home/user/fleet/probe/tests/src/server/stages/LintStage.test.ts:1305` — the polled condition now reads the record's contents:

```ts
() => (scratch.read('closed') ?? '') !== '',
```

`/home/user/fleet/probe/tests/setupServer.ts:62-64`:

> and `PROBE_CLOSES_INPUT` closes the server's own standard input when that document is closed and then writes the URI into the `closed` record it opened first, so the record's contents land after the close and a test that waits for those contents writes again only after the close has landed.

`/home/user/fleet/probe/tests/src/server/stages/LintStage.test.ts:1299-1302`:

> The fixture opens the record before it closes its own descriptor and writes the URI into it afterwards, so the record's contents land after the close. The write that follows this wait therefore meets a pipe that is already broken rather than one this host was slow to break.

`tests/setupServer.ts:147-148`, the descriptor comment decision 8 records, is unchanged: it rules on which descriptor the write lands on and claims nothing about when the record exists.

## The re-planted control at the shipped budget

The plant deletes the `writeSync(record, message.params.textDocument.uri)` element of the fixture's program text, leaving `openSync` and both `closeSync` calls. `closed` therefore still exists and stays empty, so the condition the lane refuted would have passed this plant and the shipped condition fails it.

| Reading | Result | Capture |
| --- | --- | --- |
| Planted red | 1 failed, 29 passed (30) | `/home/user/work/evidence/probe-proofs/probe-obj-5-planted-red2.txt` |
| Restored green | 30 passed (30) | `/home/user/work/evidence/probe-proofs/probe-obj-5-green2.txt` |

Both ran `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/stages/LintStage.test.ts`. The red names the condition's own description at the shipped budget:

```
Error: Condition "the lint fixture to record the standard input it closed" did not hold within 10000ms (waited 10015.125544999999ms)
```

The plant was restored by editing the deleted element back. `git diff -- tests/setupServer.ts` shows all four lines present with no removal hunk, so the plant left no residue.

Both captures were re-taken after I settled the comment's final wording (an ancillary decision the deviation contract gives me), so the red's echoed source lines match the shipped file exactly.

## The sweep rows as recorded

§ Sweeps is rewritten rather than extended, because the lane's O-3 and the checker's referral name one shortfall: a row recording `**/*.{ts,md}` names the pattern's admitted population, not the population it was drawn from. Each row now names its paths through `TREE`, `PROSE`, `DIFF`, or an explicit list, and every row was re-measured against the tree as it stands.

Rows added this round, each measured by me:

| Pattern | Paths | Result |
| --- | --- | --- |
| `taken on 2026-08-20` | `guides/probe.md`, `guides/README.md`, `README.md` | one hit, `guides/probe.md:1002`, the Cost measurement probe-subj-6's repair leaves in place; the receipt paragraph reads empty |
| `\b(isProcessLive\|isProcessLives\|isProcessLived\|isProcessLiving)\b` case-insensitive | `src`, `tests`, `guides/probe.md`, `guides/README.md`, `README.md` | no match |
| `#destroyed` | `src` | no match; the row now states why `src` is the whole population a `#`-private field can occupy |

Path sets defined in the section: `TREE` is `src`, `tests`, `guides`, `configs`, `scripts`, `dist`, `README.md`, `AGENTS.md`, `CLAUDE.md`, `package.json`, `vite.config.ts`, `tsconfig.json`; `PROSE` is `src`, `tests`, `guides`, `README.md`, `AGENTS.md`, `CLAUDE.md`; `DIFF` is the added lines of `git diff -U0 -- src tests guides`, which spans every path the unit modified.

Three recorded line numbers moved and the table carries the shipped values: the receipt-date hit reads `guides/probe.md:1002` rather than the lane's `:1003`, because the O-1 deletion removed an earlier line; the framing writer reads `tests/setupServer.ts:83` and the framing parser `tests/setupServer.ts:97`, because the claim-2 reword adds one line before both.

## The O-1 deletion

Deleted from `guides/probe.md`, the sole change to that table:

```
| `destroy` | `Promise<void>`  | Tears down the resident language server, abandoning every inspection it holds rather than waiting behind one. |
```

`src/server/types.ts:240-251` declares `LintStageInterface extends StageInterface` with `inspect` alone; `destroy` is inherited and already tabled under `StageInterface` at `guides/probe.md:244`; the `TypeStageInterface` table takes the same convention.

## The O-2 decision text

Recorded as § Decisions item 11 in the report: only the exit reading is shared, and `readChildEnding` (`tests/setupServer.ts:234-238`) carries it, taken at `:262` and `:285`. The spawn stays at `readSignalEnding:261` and `readHostEnding:284`, because the two spawns agree on nothing a leaf could hold fixed — different programs (a caller-supplied one against a fixed timer), different stdio (`['ignore', 'pipe', 'ignore']` against `'ignore'`), different readiness (the first `data` event on standard output against the `spawn` event), and different kill doors (`child.kill` against `process.kill`). A leaf parameterized over those adds no boundary, invariant, composition, translation, lifecycle, or narrower contract, so it is the superfluous wrapper `AGENTS.md` § Design laws refuses.

The lane cited `readHostEnding`'s spawn at `:305-306`; measured on the shipped tree it is `:284`, and the report records the measured line.

## `git status --short`

```
 M guides/probe.md
 M src/bin/main.ts
 M src/server/Probe.ts
 M src/server/helpers.ts
 M src/server/stages/LintStage.ts
 M src/server/stages/RuntimeStage.ts
 M src/server/stages/TypeStage.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/src/bin/main.test.ts
 M tests/src/server/Probe.test.ts
 M tests/src/server/helpers.test.ts
 M tests/src/server/stages/LintStage.test.ts
 M tests/src/server/stages/RuntimeStage.test.ts
```

The unit's paths and nothing new. No untracked entry.

## Exit codes

| Command | Exit | Reading | Capture |
| --- | --- | --- | --- |
| `npm run format:check` | 0 | All matched files use the correct format, 68 files | `fix1-format-check.txt` |
| `npm run lint:check` | 0 | no output | `fix1-lint-check.txt` |
| `npm run check` | 0 | root project and the three scoped projects | `fix1-check.txt` |
| `npm run test:guides` | 0 | 13 passed | `fix1-test-guides-3.txt` |
| scoped `LintStage.test.ts`, `--project src:server` | 0 | 30 passed | `probe-obj-5-green2.txt` |
| scoped `setupServer.test.ts`, `--project setup` | 0 | 8 passed | `fix1-setupserver-green.txt` |

Captures sit under `/home/user/work/evidence/probe-proofs/`.

One reading needs naming rather than hiding: `npm run test:guides` exited 1 on its first run in this round (`fix1-test-guides.txt`), in the row `earns the receipt the guide documents`, on the standing arming failure whose cause chain ends in `LSPError: The LSP request 'initialize' exceeded its deadline`. That run started seconds after a 24-second contended `LintStage.test.ts` run. Run alone the project is green twice (`fix1-test-guides-2.txt`, `fix1-test-guides-3.txt`). The failure names no parity row and no file this round touched. Per `.agents/orchestration.md` § Writing concurrency, the deciding reading is yours after this unit exits.

## Deviation state

None. No planted control failed to redden by its condition's own description, and no gate reddened on a file outside Owned. Two ancillary questions were mine to settle and are recorded: the exact wording of the reworded comment (settled before the captures, so both captures match the shipped file), and which lane files § Fix round 1 names — the campaign directory holds no subjective-lane verdict for probe round 1, so the section names the objective lane and the Grok checker and says so.

## Files touched

- `/home/user/fleet/probe/tests/src/server/stages/LintStage.test.ts` — polls the record's contents and states why the contents land after the close.
- `/home/user/fleet/probe/tests/setupServer.ts` — the fixture's TSDoc says the record's contents land after the close; the program text is byte-identical to the pre-plant state.
- `/home/user/fleet/probe/guides/probe.md` — the `LintStageInterface` table drops the inherited `destroy` row.
- `/home/user/scaffold/tmp/units/conform/conform-probe-report.md` — § Sweeps rewritten with populations and the three added rows, § Decisions gains item 11, the obj-5 planted-control row takes the new captures, and § Fix round 1 is appended.

Diffstat for the probe checkout, this round only: 3 files changed, 6 insertions, 5 deletions.
