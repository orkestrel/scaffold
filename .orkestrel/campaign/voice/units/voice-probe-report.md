# Unit voice-probe — report

Every TSDoc block under `src/` of `/home/user/fleet/probe` now opens with a third-person `-s` verb
sentence, and every boolean `@returns` reads `True if …; false otherwise`. The change is
comment-only. The package has no `app/` directory.

## Counts by kind

| Kind                                                | Blocks |
| --------------------------------------------------- | ------ |
| First sentence from the imperative                   | 0      |
| First sentence given a third-person verb             | 58     |
| First sentence reworded to drop the symbol's name    | 0      |
| Boolean `@returns` rewritten to the ruled form       | 4      |

The scan's `imperative=20` bucket held no imperative sentence. Every one of those hits was a noun
phrase whose leading word ends in `-s` or reads as a verb to the classifier — `Workspace-relative
path …`, `Digest of …`, `Resolved `typescript` version …`, `Identity of …`, `Initial listeners …`,
`Handler for …`, `Structured detail …`. They are counted as verbless, which is what reading them
shows.

Of the 58 first sentences, 54 were bare noun phrases that gained a verb (`Holds …`, `Names …`,
`Declares …`, `Explains …`, `Identifies …`, `Reports …`, `Publishes …`). The remaining 4 are the
`ProbeEventMap` members, which carried a past-tense clause rather than a bare noun phrase and now
open with `Fires …`, the form the fleet's landed units use for an event map.

One block is deliberately unchanged: `src/server/types.ts` `OverlayOptions.sensitive` opens
`If `true`, a lookup key matches a recorded path exactly; if `false`, …`. That is the boolean-parameter
form `.claude/rules/typescript.md` § Comments and API documentation prescribes, and it is neither
imperative nor a bare noun phrase. `voice-scan.mjs` still reports it as `verbless=1`; no landed unit
in this wave rewrote an `If `true`` opener either.

## Files touched

- `/home/user/fleet/probe/src/core/types.ts` — 50 first sentences on interface members, event-map
  members, and option fields.
- `/home/user/fleet/probe/src/server/types.ts` — 8 first sentences on interface members.
- `/home/user/fleet/probe/src/server/helpers.ts` — 3 boolean `@returns` lines from `True when …` and
  `True for …` to `True if …`.
- `/home/user/fleet/probe/src/core/errors.ts` — 1 boolean `@returns` line from `True only for …` to
  `True if …`.

Diffstat: `4 files changed, 75 insertions(+), 64 deletions(-)`.

## Gates

| Command                        | Exit | Note                                                        |
| ------------------------------ | ---- | ----------------------------------------------------------- |
| `npm run format:check`         | 0    | 68 files, all correctly formatted                            |
| `npm run lint:check`           | 0    | no output                                                    |
| `npm run check`                | 0    | root, core, server, and bin projects                         |
| `npm run build`                | 0    | core, server, and bin builds                                 |
| `npm test`                     | 1    | timing observation, see the following section                |
| `npm run test:src:core`        | 0    | 34 tests                                                     |
| `npm run test:src:server`      | 0    | 179 tests, 7 files                                           |
| `npm run test:src:bin`         | 0    | 15 tests                                                     |
| `npm run test:policy`          | 0    | 111 tests                                                    |
| `npm run test:config`          | 0    | 46 tests                                                     |
| `npm run test:setup`           | 0    | 3 tests                                                      |
| `npm run test:guides`          | 0    | 13 tests                                                     |

### The `npm test` failure is contention, not the change

`npm test` starts at `test:src`, which runs `src:core`, `src:server`, and `src:bin` as concurrent
Vitest projects. Three runs of it on this container failed the same way:

```text
Test Files  2 failed | 9 passed (11)
     Tests  8 failed | 220 passed (228)
Caused by: ProbeError: The Oxlint language server exited with code 0
Caused by: LSPError: The LSP request 'initialize' exceeded its deadline
```

The failing set drifted between runs (8, then 7, then 8 tests), which is the signature of a
deadline rather than a defect. `LINT_DEADLINE` is 2,000 ms and `src/core/constants.ts` records the
measured `initialize` reply at 155 ms, so the concurrent projects starve a bound with a wide margin
when the container is idle.

Each project passes alone, run immediately after the combined failure:

- `npm run test:src:server` — 179 passed, 122.64 s
- `npm run test:src:bin` — 15 passed, 53.20 s

The diff carries no non-comment token (`git diff -U0` filtered to lines outside a comment gutter is
empty), the build strips comments, and the failures are foreign-process deadlines in the Oxlint
language server and the MCP client. The authoritative combined run belongs to the Orchestrator's
landing chain on an idle container.

## Evidence

- `/home/user/scaffold/tmp/units/voice/voice-probe.diff`
- `/home/user/scaffold/tmp/units/voice/voice-probe.status` — lists only the four `src/` files.

## Deviations

None. Two decisions taken inside the wording latitude the brief grants:

- `OverlayOptions.sensitive` keeps its `If `true`, …; if `false`, …` opener, as recorded earlier.
- `ProbeInterface.emitter` reads `Publishes arming, answers, deadline expiry, and faults for
  observation.`, which keeps the original's observation framing while leading with a verb.
