# Unit voice-workspace — report

`@orkestrel/workspace` at `/home/user/fleet/workspace`, branch
`claude/orkestrel-npm-audit-deps-14ibta`, baseline commit `e564c2d`. Done, uncommitted. No
deviations.

## Blocks rewritten by kind

The scan counted 57 blocks under `src/`; 54 were rewritten and 3 already satisfied the rule
(`createBinaryContent`, `isBinary`, `computeDecodedSize`).

| Kind                                          | Count |
| --------------------------------------------- | ----- |
| First sentence from the imperative             | 28    |
| First sentence given a verb                    | 26    |
| First sentence reworded to drop the symbol name| 7     |
| Boolean `@returns` reworded                    | 5     |

The first two kinds partition the 54 rewritten first sentences. The name-dropping count is a
subset of the 26 verb-added blocks, not a further 7 blocks: `BinaryMIME`, `Position`,
`WorkspaceOptions`, `WorkspaceSnapshot`, `WorkspaceManagerOptions`, `DatabaseWorkspaceStore`, and
`MemoryWorkspaceStore` each had a first sentence that restated its own identifier's words in
sequence, so the rewrite both supplied the verb and removed the name. Total comment edits: 59
(54 first sentences + 5 boolean `@returns`).

## Files touched

- `/home/user/fleet/workspace/src/core/constants.ts` — `EXTENSION_LANGUAGES` opens `Maps …`.
- `/home/user/fleet/workspace/src/core/errors.ts` — `WorkspaceError`, its constructor, and
  `isWorkspaceError` including its boolean `@returns`.
- `/home/user/fleet/workspace/src/core/factories.ts` — six `Create …` openers to `Creates …`.
- `/home/user/fleet/workspace/src/core/helpers.ts` — fourteen imperative openers plus two boolean
  `@returns`.
- `/home/user/fleet/workspace/src/core/types.ts` — every type, interface, and store member.
- `/home/user/fleet/workspace/src/core/validators.ts` — both narrowing guards and their boolean
  `@returns`.
- `/home/user/fleet/workspace/src/core/workspaces/Workspace.ts` — class and constructor.
- `/home/user/fleet/workspace/src/core/workspaces/WorkspaceManager.ts` — class and constructor.
- `/home/user/fleet/workspace/src/core/workspaces/stores/DatabaseWorkspaceStore.ts` — class and
  constructor.
- `/home/user/fleet/workspace/src/core/workspaces/stores/MemoryWorkspaceStore.ts` — class.

Diffstat: 10 files changed, 63 insertions(+), 59 deletions(-). Every one of the 122 changed
content lines begins with `*` or `/**`; no non-comment token moved.

## Gates

| Command                | Exit |
| ---------------------- | ---- |
| `npm run format:check` | 0    |
| `npm run lint:check`   | 0    |
| `npm run check`        | 0    |
| `npm run build`        | 0    |
| `npm test`             | 0    |

No failure excerpts. `npm test`: `test:src` 140 passed (7 files), `test:policy` 111 passed,
`test:config` 46 passed, `test:setup` 12 passed, `test:guides` 28 passed. Timing is an
observation from inside this exec; the Orchestrator's landing chain is the authoritative run.

## Acceptance instrument

`node .orkestrel/campaign/instruments/voice-scan.mjs` after the sweep:

```text
workspace   files= 11 blocks=  57 imperative=   0 verbless=   0 returnsBad=  0
```

Launch reading was `imperative=32 verbless=21 returnsBad=5` over the same 57 blocks.

## Evidence paths

- `/home/user/scaffold/tmp/units/voice/voice-workspace.diff`
- `/home/user/scaffold/tmp/units/voice/voice-workspace.status`

`git status --short` lists only the 10 `src/core/` files.

## Deviations

None.

## Observations

- `WorkspaceEventMap` read `Events emitted after workspace mutations complete.`, which the scan's
  classifier scored third-person because `Events` ends in `-s`. It carries no verb, so the sweep
  rewrote it to `Names the events emitted after workspace mutations complete.` per the brief's
  instruction to rule by reading rather than by bucket. It is one of the 26 verb-added blocks.
- Two rewritten first sentences crossed the `printWidth` of 100 and were wrapped inside their own
  block: `FileContent` in `types.ts` gained a second comment line, and
  `WorkspaceManagerInterface` changed from a one-line `/** … */` to a wrapped block. No `@param`,
  `@remarks`, `@returns`, `@throws`, `@example`, or later sentence moved in either.
- `WorkspaceSnapshot` lost the word `snapshot` from its own first sentence because that word pair
  is the symbol's name; the surrounding `WorkspaceStoreInterface` and store class docs still carry
  the term, so the concept vocabulary survives in the module.
