# Unit voice-agent — report

Every TSDoc block under `src/` of `/home/user/fleet/agent` now opens with a third-person `-s` verb
sentence, and every boolean `@returns` reads `True if …; false otherwise`. The gate chain exits 0 at
every step. No `app/` directory exists in this package, so the sweep covered `src/**` only.

## Blocks rewritten by kind

Measured by comparing each doc block's first sentence and `@returns` line between `HEAD` (`4df65d2`)
and the worktree (`instruments` copy at
`/tmp/claude-0/-home-user-scaffold/249f2596-6386-5f66-868c-31383bbd6eeb/scratchpad/voice-agent/compare.mjs`):

| Kind                                            | Count |
| ----------------------------------------------- | ----- |
| First sentences rewritten (all causes)          | 277   |
| — from an imperative opener                     | 96    |
| — from a verbless opener (bare noun phrase)     | 181   |
| — of those, reworded to drop the symbol's name  | 8     |
| Boolean `@returns` rewritten                    | 9     |

The name-drop rewrites: the `Channel` class and `ChannelInterface` ("async channel" → "async
stream"), the `Conversation` class and `ConversationInterface` ("A conversation grouping messages" →
"Groups messages"), the `Agent` class and `AgentInterface` ("The agent loop —" → "Composes"),
`ScopeManager` ("The scope registry" → "Registers the named filters"), and `InstructionManager` ("The
instruction registry" → "Registers the immutable {@link Instruction}s").

Reconciliation with the launch population (`voice-scan.mjs`: blocks=305, imperative=96, verbless=170,
returnsBad=9): the imperative bucket matches exactly at 96. The verbless figure is 181 rather than
170 because 11 `Options for …` openers pass the scan's third-person test (the word ends in `s`) while
being bare noun phrases. The brief's standing conditions named that bucket error; each was read and
rewritten to `Configures …`. After the sweep the scan reports
`agent files=21 blocks=305 imperative=0 verbless=0 returnsBad=0`.

## Files touched

All under `src/core/`, comment text only:

`Agent.ts`, `AgentContext.ts`, `AgentRegistry.ts`, `Authority.ts`, `Channel.ts`, `ThinkSplitter.ts`,
`constants.ts`, `conversations/Conversation.ts`, `conversations/ConversationManager.ts`,
`conversations/stores/DatabaseConversationStore.ts`, `conversations/stores/MemoryConversationStore.ts`,
`errors.ts`, `factories.ts`, `helpers.ts`, `instructions/Instruction.ts`,
`instructions/InstructionManager.ts`, `scopes/Scope.ts`, `scopes/ScopeManager.ts`, `types.ts`,
`validators.ts`.

Diffstat: 20 files changed, 315 insertions(+), 319 deletions(-). Every changed line is a comment line
(`git diff -U0` filtered for lines matching neither `* …` nor `/** …`: 0 hits). No `@param`,
`@remarks`, `@throws`, or `@example` line changed; the only tagged lines in the diff are the 9
`@returns` rewrites.

## Gates

Run from `/home/user/fleet/agent`, in order:

| Command               | Exit | Excerpt                                                              |
| --------------------- | ---- | -------------------------------------------------------------------- |
| `npm run format:check`| 0    | `All matched files use the correct format.` (76 files)                |
| `npm run lint:check`  | 0    | no output                                                             |
| `npm run check`       | 0    | `tsc --noEmit` for the root and `configs/src/tsconfig.core.json`      |
| `npm run build`       | 0    | `✓ built in 3.07s`; `Copied: dist/src/core/index.d.ts to …index.d.cts`|
| `npm test`            | 0    | src 606 passed (17 files), policy 111, config 46, setup 34, guides 83 |

`format:check` passed without converging, so neither `npm run lint` nor `npm run format` ran.
`npm test` is reported as an observation per the brief; the Orchestrator's landing chain is the
authoritative run.

## Evidence

- `/home/user/scaffold/tmp/units/voice/voice-agent.diff` (`git diff`, 2172 lines)
- `/home/user/scaffold/tmp/units/voice/voice-agent.status` (`git status --short`, every entry under `src/`)

## Deviations

None against the objective. One environment observation, resolved and non-blocking: a sibling unit
working in `/home/user/fleet/toolbox` overwrote my instrument at
`…/scratchpad/apply.mjs` and my `…/scratchpad/e-constants.json` mid-unit, and its script then ran
against this checkout's `src/core/types.ts` (0 matches) and crashed on a missing `src/core/Form.ts`.
It wrote nothing here — `git status` and the diff confirm only my own comment edits. I moved every
instrument into a unit-private `…/scratchpad/voice-agent/` directory and re-applied the lost edit
list. The shared session scratchpad is not safe for concurrent units that use fixed filenames.
