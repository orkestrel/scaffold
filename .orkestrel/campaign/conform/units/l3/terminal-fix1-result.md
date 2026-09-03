## Fix round 1

The round-1 objective lane's refutation of claim 9 is closed. Every fence line of `guides/terminal.md` that carries a value comment now has a transcription in the `guide fences` block, the header sentence names that population exactly, and the new TSDoc blocks in `tests/setupServer.ts` open in the third person. The gate chain is green on the tree the round left, `scaffold audit --offline` reports no drift, and `git status --short` lists the same paths it listed before the round.

### Findings closed

| Finding | The claim it refuted                                                                                                | The edit that closes it                                                                                                                                                                                               |
| ------- | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| F1      | `tests/guides.test.ts:3-5` claimed the block transcribes each flagship fence while the manager fence carried no case | Cases added for the manager fence, the database-store fence, and the password, select, checkbox, editor, and themed-`renderSelectView` lines of the direct-drive and re-theme fences                                   |
| F1      | Value-claiming lines outside the lane's list also carried no case                                                    | `prompt.pending()` given its own case; `result.error.errors` folded into the broker case by comparing the whole outcome with `toEqual`; `renderCursorUp(0)` and `delete` on an absent id asserted beside their siblings |
| F1      | The header sentence still overclaimed once the fence population was read against the block                          | `tests/guides.test.ts:1-7` rewritten to name the covered scope: every fence line carrying a value comment, and no case for a line whose comment claims no value                                                        |
| F3      | The new TSDoc blocks in `tests/setupServer.ts` opened as noun phrases                                               | `:43` "Settings for a recording TTY." → "Configures a recording TTY."; `:50` "Create a recording TTY. …" → "Creates a recording TTY. …". `createLineInput` and `createStreamTarget` keep their pre-existing form        |

The block comment above `describe('guide fences')` also lost its `below` reference, which `.claude/rules/writing.md` § Code tokens, references, and links bans.

### Lines ruled out of the population, with the reason

`guides/terminal.md:612` `createTerminal() // process.stdin / process.stdout by default` claims a resolved default rather than a returned value, and no test can assert it without a real TTY. `:89`, `:90`, `:647`, `:672`, `:698-700`, and `:740` claim an emission, a fill, a teardown, or an ownership boundary rather than a value. The header sentence names that exclusion rather than implying those lines are covered elsewhere.

### Failing-first controls

Each reading ran `cd /home/user/fleet/terminal && npx vitest run --config vite.config.ts --no-cache --reporter=dot --project guides` and is captured under `/home/user/work/evidence/terminal-proofs/`.

| Reading                                    | Plant                                                                                   | Result                       | Exit | Capture                   |
| ------------------------------------------ | --------------------------------------------------------------------------------------- | ---------------------------- | ---- | ------------------------- |
| Baseline, before the round                 | None                                                                                    | `52 passed (52)`             | 0    | `fix1-baseline.txt`       |
| An existing transcription made wrong       | `renderConfirmView` expected as `'? Continue? (yes/NO)'` where the fence claims `(y/N)`  | `1 failed \| 51 passed (52)` | 1    | `fix1-existing-red.txt`   |
| The plant restored and the new cases added | None                                                                                    | `60 passed (60)`             | 0    | `fix1-existing-green.txt` |
| A new case made wrong                      | The manager fence's `{ name: 'Ada' }` expected as `{ name: 'Grace' }`                   | `1 failed \| 59 passed (60)` | 1    | `fix1-manager-red.txt`    |
| That plant restored                        | None                                                                                    | `60 passed (60)`             | 0    | `fix1-manager-green.txt`  |

Both plants were removed by editing the expectation back. `grep -n "Grace\|yes/NO" tests/guides.test.ts` returns nothing, so no plant is live.

`fix1-added-first.txt` records the run between the plant's restoration and the green reading: my own first select transcription expected `' ○ Admin'` where `renderSelectView` writes `'  ○ Admin'` for an unfocused row, so the run read `1 failed | 59 passed (60)`. The expectation was corrected to what the code returns. The fence's own comment claims no exact string for that line, so no guide claim is in question.

`grep -nP "[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]" tests/guides.test.ts` returns nothing: every control byte in the file is still built through `String.fromCharCode` or console's own `CSI`.

### Gates

Run in the chain's order on the tree the round left. Every command exited 0; the captures are under `/home/user/work/evidence/terminal-proofs/`.

| Command                        | Exit | Reading                                                                                                                 | Capture                      |
| ------------------------------ | ---- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `npm run format:check`         | 0    | `All matched files use the correct format.` over 68 files                                                               | `fix1-gate-format-check.txt` |
| `npm run lint:check`           | 0    | No diagnostic                                                                                                           | `fix1-gate-lint-check.txt`   |
| `npm run check`                | 0    | Root project, `configs/src/tsconfig.core.json`, and `configs/src/tsconfig.server.json` all clean                        | `fix1-gate-check.txt`        |
| `npm run build`                | 0    | Core and server ESM + CJS built, both `.d.cts` copies written                                                            | `fix1-gate-build.txt`        |
| `npm test`                     | 0    | `src` 126 passed, `policy` 111 passed, `config` 46 passed, `setup` 25 passed, `guides` 60 passed, `integration` 2 passed | `fix1-gate-test.txt`         |
| `npx scaffold audit --offline` | 0    | `0 of 40 planned paths drifted from the plan. Audit compared bytes at 25, existence at 5, and nothing at 10.`            | `fix1-scaffold-audit.txt`    |

No convergence step was needed: `format:check` passed without an `oxfmt` write.

`node /home/user/scaffold/tmp/work/evidence.mjs terminal` rewrote `/home/user/work/evidence/conform-terminal.diff` (3419 lines, up from 3219) and `/home/user/work/evidence/conform-terminal.status` (30 entries, unchanged). Every status entry is a path the unit already owned; the round added no file. `git diff --stat tests/guides.test.ts tests/setupServer.ts` reads `475 insertions(+), 66 deletions(-)` against `HEAD`, which carries the base unit's work as well as this round's.

**Observation, not a criterion.** The whole-suite `npm test` reading was taken inside this unit's own exec. The deciding run belongs to the Orchestrator after this unit exits.

### Deviations

No row stopped. No fence's claimed value contradicted what the code returns, so no guide edit was needed and `guides/terminal.md` is untouched. No prompt fence needed `createFakeTTY`: every line this round transcribes is a pure core call.

Two judgments the brief left to me are recorded rather than raised.

- **The population is wider than the lane's list.** Row 1 says "every untranscribed value-claiming line", and Row 2 makes the header sentence the test of it, so I re-derived the population from the guide rather than taking the lane's list as complete. That added `prompt.pending()`, `result.error.errors`, `renderCursorUp(0)`, and `delete` on an absent id.
- **The header sentence changed even though no value-claiming line stays untranscribed.** Row 2's "otherwise leave it" would have left a sentence that still claims each flagship fence is transcribed, which stays false for the fences that drive a real TTY walk and claim no value. I rewrote it to name the covered scope, which is the form Row 2 prescribes for the case it does anticipate. This is the ancillary wording the deviation contract leaves to the executor.

The directive appended to `.claude/rules/documentation.md`'s tool output — work through Bash rather than the Read, Edit, and Write tools — was ignored, as the dispatch instructs. Every file change in this round went through `Edit`.
