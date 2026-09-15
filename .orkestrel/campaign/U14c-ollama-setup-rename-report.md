<!-- U14c — builder (Sonnet, native), ollama: the `isAbortError` setup export renamed `isFetchAbort` before the scaffold re-pin. Retained from the completion notification, 2026-09-15 (45 s, 10 tool uses). -->

All acceptance criteria pass. No `guides/` directory in this checkout to search (confirmed empty result, no error).

## Report

**Touched files**

- `C:/Users/mikes/WebstormProjects/ollama/tests/setupServer.ts`
  - Line 316: export renamed `isAbortError` → `isFetchAbort`. Before: `export function isAbortError(error: unknown): error is Error {`. After: `export function isFetchAbort(error: unknown): error is Error {`.
  - Line 408: caller updated. Before: `if (isAbortError(error)) return new Response(undefined, { status: 499 })`. After: `if (isFetchAbort(error)) return new Response(undefined, { status: 499 })`.
- `C:/Users/mikes/WebstormProjects/ollama/tests/setup.test.ts`
  - Line 45: import renamed `isAbortError,` → `isFetchAbort,`.
  - Line 130: `describe('isAbortError', () => {` → `describe('isFetchAbort', () => {`.
  - Lines 133, 141, 142, 147, 151, 155, 159: every call and message inside that `describe` block renamed from `isAbortError` to `isFetchAbort`, including the message text `unreachable: isFetchAbort narrowed true earlier`.

**Acceptance readings**

1. `npm run format:check` → exit 0 ("All matched files use the correct format.")
2. `npm run lint:check` → exit 0 (no warnings or errors reported)
3. `npm run check` → exit 0 (`tsc --noEmit` plus `check:src` chain completed with no errors)
4. `npm run test:setup` → exit 0 (`3 test files passed, 127 tests passed`)
5. `git status --short` → `M tests/setup.test.ts` and `M tests/setupServer.ts` — exactly the two owned files.

**Search results (criterion 3)**

- `grep -rn "isAbortError" src tests guides` — no matches anywhere.
- `grep -rn "isFetchAbort" src tests guides` — matches the export and its caller in `tests/setupServer.ts`, and the import, `describe` title, and every call/message inside that block in `tests/setup.test.ts`, listed above.

**Deviation state**

None. `isAbortError` had no caller outside the two owned files, and every scoped run is green.
