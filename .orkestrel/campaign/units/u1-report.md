## Delivered

- `EventSourceInterface`, `RecorderMap`, `SignalInterface`, and `ResourceFactoryInterface` — [types.ts](/home/user/test/src/core/types.ts:22)
- `createHostileValues`, defaulted `createRecorder`, `createRecorders`, `createSignal`, and `createResourceFactory` — [factories.ts](/home/user/test/src/core/factories.ts:45)
- `waitForAbort`, widened `retryUntil`, `invokeUnchecked`, `readProperty`, and `flattenHeaders` — [helpers.ts](/home/user/test/src/core/helpers.ts:21)
- Factory proofs — [factories.test.ts](/home/user/test/tests/src/core/factories.test.ts:126)
- Helper and amended regression proofs — [helpers.test.ts](/home/user/test/tests/src/core/helpers.test.ts:69)

## Validation

- Baseline: `npx vitest run --project src:core tests/src/core/helpers.test.ts` — exit `1`; `1 failed, 54 passed`.
- Restored regression: same command — exit `0`; `65 passed`.
- `npm run format:check` — exit `0`.
- `npm run lint:check` — exit `0`.
- `npm run check:src:core` — exit `0`.
- `npm run test:src:core` — exit `0`; `83 passed`.
- `git diff --check` — exit `0`.
- `git status --short` — exit `0`; only owned files changed.

## Decisions

- Duplicate event names install fresh recorders; the returned map retains the last recorder.
- Signal listener identity includes the callback and capture mode. One-shot delivery removes its registration before invoking the caller.
- The non-enumerable hostile object also contains a cycle, preserving the existing totality-loop result.
- Retry values render through JSON, fall back to string conversion, and truncate at `200` characters.
- The amended timeout proof uses `attempts: 1` and `budget: 0`, making its producer-call assertion deterministic.
- The unchecked `Reflect` results are contextually typed as `T`; no explicit `any` token was added because lint rejects it.

## Deviations

none

## Flags

- Audit `createSignal` listener identity, capture modes, one-shot delivery, and original-callback removal first.
- Audit `createRecorders` duplicate wiring and its assertion-free `Object.fromEntries` typing.
- Audit retry rendering against cyclic values and throwing conversions.