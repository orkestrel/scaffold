## Delivered

- Recorder maps now accumulate into a partial map and narrow through the public total guard [validators.ts](/home/user/test/src/core/validators.ts:13), exported by [index.ts](/home/user/test/src/core/index.ts:2). The factory documents widened-array keying limits in [factories.ts](/home/user/test/src/core/factories.ts:142).
- Scoped signal registrations now leave the tally when their lifetime aborts; already-aborted lifetimes install nothing in [factories.ts](/home/user/test/src/core/factories.ts:171).
- The revoked array was replaced with a live array proxy hostile to index reads, with failure-class remarks in [factories.ts](/home/user/test/src/core/factories.ts:12) and controls in [factories.test.ts](/home/user/test/tests/src/core/factories.test.ts:43).
- `HeadersSource` now describes project-local host declarations accurately in [types.ts](/home/user/test/src/core/types.ts:186).
- Exact tuple and interface-inference proofs are compiled and executed in [factories.test.ts](/home/user/test/tests/src/core/factories.test.ts:129).

## Validation

All commands exited `0`:

- `npm run check:src:core`
- `npx tsc --noEmit -p configs/src/tsconfig.server.json`
- `npx tsc --noEmit -p configs/src/tsconfig.browser.json`
- `npx tsc --noEmit -p tsconfig.json`
- `npm run test:src:core`
- `npm run lint:check`
- `npm run format:check`
- `git diff --check`

`git status --short` contains only owned paths.

## Controls

- Desynchronization red-before command: `npm run test:src:core -- --run tests/src/core/factories.test.ts`, exit `1`.
- Red evidence: `AssertionError: expected 1 to be +0` after `lifetime.abort()`.
- The same focused command passed after repair.
- Exact tuple bindings, reversed-value discrimination, and inference through `EventSourceInterface<TMap>` bind the laundering control. `createRecorders` contains no `Object.fromEntries`.
- Existing unscoped removal and one-shot signal controls remain green.

## Decisions

- Named the total guard `isRecorderMapComplete`.
- Used an internal cleanup controller so manual removal and one-shot delivery also detach the lifetime listener.
- Kept the hostile corpus order stable while replacing the revoked-array member.

## Deviations

None.

## Flags

The guide remains unchanged because the brief marks `guides/` off-limits and assigns guide parity work to R4. No commit was created because `.git` is read-only.