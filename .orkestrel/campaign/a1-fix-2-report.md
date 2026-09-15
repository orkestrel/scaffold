# Unit A1-fix-2 — report

All six items landed. Every gate the brief scopes exits 0; `test:src:core` rises 731 → 733 and
`test:setup` holds at 54.

## Touched files

| File                                  | Change                                                                                                                                      |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/core/AgentProvider.ts`           | Item 5's example takes `TextOptions extends ProviderOptions` and forwards it; item 6's catch passes `{ cause: error }` when a throw raced the cancel |
| `src/core/errors.ts`                  | Item 2's `ProviderError.code` member line in the sibling arm-by-condition form; item 6's `ProviderAbortError(partial, options?: ErrorOptions)` and its `cause` sentence |
| `src/core/types.ts`                   | Item 3 deletes the `ProviderOptions.headers` member doc the `@remarks` already carries                                                      |
| `tests/setup.ts`                      | Item 4 renames `acceptHostileArray` to `approveEvery`; `ScriptedWireOptions.abort` lets a scripted decoder failure abort in the turn it throws |
| `tests/src/core/AgentProvider.test.ts` | Item 1 repartitions 46 tests into 9 subject-named blocks, verbatim, plus item 6's two tests                                                 |
| `tests/src/core/validators.test.ts`   | Item 4's two call sites                                                                                                                     |

```text
 src/core/AgentProvider.ts            |  30 +-
 src/core/errors.ts                   |  10 +-
 src/core/types.ts                    |   1 -
 tests/setup.ts                       |  17 +-
 tests/src/core/AgentProvider.test.ts | 881 ++++++++++++++++++-----------------
 tests/src/core/validators.test.ts    |   6 +-
 6 files changed, 509 insertions(+), 436 deletions(-)
```

`git status --porcelain` lists those six files modified and nothing else.

## Item 1 — the blocks and what each holds

`grep -c "describe(" tests/src/core/AgentProvider.test.ts` → `9`. Test bodies moved verbatim: the
file was assembled from line slices of `git show HEAD:tests/src/core/AgentProvider.test.ts`
(`tmp/a1-fix-2-assemble.sh` in the agent checkout), and a sorted line diff of old against new
returns additions from item 6's two tests alone — no removal and no alteration.

| Block                                                                | Behaviours                                                                                                                                                                     |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AgentProvider — identity, transport, and request composition`        | UUID and format exposure, the bound global transport, the projected body with header overrides, the preserved JSON content type                                                |
| `AgentProvider — stream assembly and settled results`                 | Delta assembly, implicit-open reclassification, the flushed tail, verbatim raw content, buffered finish, multibyte split, the settled result in-stream and from `finish`, strict end of input, the record left undecoded after a result |
| `AgentProvider — HTTP failures and the bounded error body`            | The error-body bound and its single-chunk overshoot, status and cause when the body cannot be read, the empty success body, `ProviderError`'s own fields and guard             |
| `AgentProvider — failures that reach the caller unchanged`            | The hostile decoder error, the remotely reported abort, the remote abort's identity with its open body cancelled                                                              |
| `AgentProvider — the header hook inside the cancellation bound`       | The hook raced against the deadline, the rejected hook issuing no request, the unresolved hook cancelled by the caller                                                         |
| `AgentProvider — abort listener removal after the header hook`        | The whole `removes abort listeners after …` family, kept together and in order: hook success, hook rejection, caller cancellation, deadline expiry                             |
| `AgentProvider — cancellation and partial results`                    | Already-aborted entry, held content flushed into the partial, the stop between channels, the stalled body and the stalled 503 body on the deadline, refused buffered finish records, the normalized transport `AbortError`, the replaced caller reason, and item 6's pair |
| `AgentProvider — deadline clearing and reader release on every exit`  | Clearing after success, transport rejection, non-OK response, decoder failure, and a remote abort; reader and deadline release after an early generator return                 |
| `AgentProvider — isolation between concurrent calls on one instance`  | Concurrent calls equal to a drained stream, interleaved bodies with one cancelled prefix, cancellation isolated from a live sibling call                                       |

Decisions I took and carried on from, per the deviation contract's ancillary clause:

- The header hook sits in two blocks rather than one. The reviewer requires the listener family
  under a name that says so, and that family's members are themselves cancellation cases, so the
  deciding axis is the mechanism each test proves: listener removal in one block, the hook's
  behaviour under the cancellation bound in the other.
- `releases the reader and deadline after an early generator return` sits under deadline clearing,
  not cancellation. Its subject is what a call releases on the way out, which is that block's name;
  an early `return()` is not a partial result.

## Item 6 — red then green

Command: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/AgentProvider.test.ts`

- Before the fix (the `{ cause }` argument removed from `AgentProvider.stream`'s catch, everything
  else in place): `Tests 1 failed | 47 passed (48)`. The failure is
  `carries a decoder failure that raced the cancel as the abort error cause` —
  `AssertionError: expected undefined to be ProviderError: provider error: malformed record`.
- After the fix: `Tests 48 passed (48)`.

The sibling test `leaves the cause undefined when the cancel is the only failure` passed in both
runs, so it is a control rather than a second copy of the claim: a fix that set `cause`
unconditionally would redden it.

`ProviderAbortError`'s constructor now reads
`constructor(partial: ProviderResult, options?: ErrorOptions)` and forwards `options` to `super`.

## Scoped validation

| Command                  | Result                            |
| ------------------------ | --------------------------------- |
| `npm run lint:check`     | exit 0                            |
| `npm run check:src:core` | exit 0                            |
| `npm run check`          | exit 0                            |
| `npm run test:src:core`  | 23 files / 733 tests, exit 0      |
| `npm run test:setup`     | 1 file / 54 tests, exit 0         |
| `npm run format:check`   | exit 0, 87 files                  |
| `grep -rn "acceptHostileArray" tests` | no match (exit 1)    |

Banned-syntax sweep over the diff's added lines only
(`git diff -U0 | grep "^+" | grep -v "^+++"`, 509 lines, pattern
`\bany\b|\bas\b|!\.|!\)|@ts-|eslint-disable|oxlint-disable|\b(public|private|protected)\b|\bfunction\b`):
five hits, all prose ("as the cause", "as a protocol failure", "Returns true as an array's own …")
or the top-level `export function approveEvery` in `tests/setup.ts`. No `any`, no assertion, no
non-null assertion, no suppression, no access modifier, no parameter property, no nested function
declaration.

## Observations

- **Referral (c)'s literal arrangement is unreachable, and I measured it rather than argued it.**
  A probe (`tmp/probe/a1-fix-2-cause.test.ts.txt`, run through `npm run test:probe` before it was
  parked with a `.txt` suffix) drove the real engine three ways. Case A — a 20 ms deadline with a
  poison record scheduled at 60 ms — reported `decoded: []`: `read` is never called. Every path
  between the chunk loop's `combined.throwIfAborted()` and the next `read` call is guarded by a
  further `throwIfAborted`, so a deadline or a caller cancel always throws the signal's own reason
  before a decoder can throw a competing one. The erasure the referral describes is real, but its
  trigger is a throw that aborts in its own turn (case B, `decoded: ['poison']`) or a transport that
  rejects with its own failure as the deadline fires (case D). Both reached the catch with
  `cause: undefined` before the fix.
- Item 6's shipped test therefore keeps the referral's thrower — `read` throwing
  `ProviderError('PROTOCOL')` — in the only arrangement the engine admits: a scripted decoder
  failure that aborts the call's controller in the same synchronous turn it throws. That needed one
  fixture seam, `ScriptedWireOptions.abort`, which is inert for every existing caller
  (`tests/setup.test.ts` constructs `ScriptedWire` without it and still reads
  `expect(() => wire.read('error')).toThrow(error)` green).
- I did not add a third test for the transport-rejection vector. It exercises the same single
  branch, and the only identity-checkable version of it would need a new transport factory that
  near-duplicates the existing `rejectTransportOnAbort`.
- `tests/setup.test.ts` is off-limits and covers neither `approveEvery` nor the new `abort` option;
  `rejectTransportOnAbort` is uncovered there too, so this is the baseline's shape rather than a
  regression. A successor unit owning that file can close all three.
- Item 5's example was type-probed rather than eyeballed: a throwaway `src/core/probeExample.ts`
  carrying the fence's declarations verbatim passed `check:src:core` (exit 0), and a control
  version with `path: 42` failed it (`error TS2322`, exit 2), proving the probe sat inside the
  project. Both probes were deleted; `git status` carries neither.
- Not run, per the brief: `test:guides` (red until A3), `build`, and the whole `test` chain. The
  `@example` in `AgentProvider.ts` carries no title, so guide parity does not compare it; any guide
  fence that mirrors it is A3's row.

## Instruments retained in the agent checkout's `tmp/`

`tmp/a1-fix-2-assemble.sh` (item 1's slicer), `tmp/a1-fix-2-cause-tests.txt` (item 6's two tests as
fed to the slicer), `tmp/a1-fix-2-original.txt` (the `HEAD` copy it sliced), and
`tmp/probe/a1-fix-2-cause.test.ts.txt` (the reachability probe, suffixed so the `probe` project
does not collect it).

## Deviation

None. No item needed a file outside Owned, and no ruled behaviour changed beyond the added `cause`.

## Status

Complete. Six items landed, item 6 red-then-green, every scoped gate exit 0.
