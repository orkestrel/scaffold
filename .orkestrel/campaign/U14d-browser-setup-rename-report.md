<!-- U14d — builder (Sonnet, native), browser: the fake CDP transport helper renamed `createCDPTestTransport` before the scaffold re-pin. Retained from the completion notification, 2026-09-15 (79 s, 13 tool uses). -->

All acceptance criteria are met. No deviation occurred.

## Report

**Touched files (all under `tests/**`, owned scope):**

- `tests/setup.ts:84` — helper renamed `createCDPTransport` → `createCDPTestTransport`; body, TSDoc, and position unchanged (`:163` internal call updated too).
- `tests/setup.test.ts` — import (`:23`), `describe` title (`:48`), and 7 call sites renamed.
- `tests/src/core/BrowserCodegen.test.ts` — import (`:5`) and 5 call sites renamed.
- `tests/src/core/BrowserFrame.test.ts` — import (`:15`) and call site (`:341`) renamed.
- `tests/src/core/BrowserPage.test.ts` — import (`:30`) and 2 call sites renamed.
- `tests/src/core/BrowserWorker.test.ts` — import (`:12`) and call site (`:116`) renamed.
- `tests/src/core/CDPClient.test.ts` — import (`:13`) and call site (`:23`) renamed.
- `tests/src/core/factories.test.ts` — import (`:12`) and 4 call sites renamed.
- `tests/src/server/factories.test.ts` — unchanged; keeps its import of the real `createCDPTransport` from `@src/server` and all its calls.

**Helper before/after:**

```
// before
export function createCDPTransport(): CDPTestTransportInterface {

// after
export function createCDPTestTransport(): CDPTestTransportInterface {
```

**Acceptance readings:**

1. `npm run format:check` — exit 0, "All matched files use the correct format."
2. `npm run lint:check` — exit 0, no output (clean).
3. `npm run check` — exit 0 (`tsc --noEmit` root + `check:src:core` + `check:src:server`, all clean).
4. `npm run test:setup` — exit 0, 3 files, 50 passed | 1 skipped.
5. `npm run test:src:core` — exit 0, 39 files, 462 passed.
6. `npm run test:src:server` — exit 0, 6 files, 147 passed | 1 skipped.

**Search results (criterion 3):**

- `tests/**` for `createCDPTransport`: only `tests/src/server/factories.test.ts` (real import from `@src/server` and its calls, and one doc-comment mention).
- `src/**` and `guides/**` for `createCDPTransport`: unchanged real export in `src/server/factories.ts:36`, its use in `src/server/Browser.ts`, and its documentation in `guides/browser.md`.
- `tests/**` for `createCDPTestTransport`: the renamed helper in `tests/setup.ts` and every renamed caller listed above.

**`git status --short`:** names only the eight owned files (`tests/setup.ts`, `tests/setup.test.ts`, and the six `tests/src/core/*.test.ts` files). No other file touched.

**Deviation state:** none. No caller existed outside the owned files, and no plain search-and-replace risk arose because word-boundary substitution correctly left `tests/src/server/factories.test.ts`'s real-export import untouched (verified above).
