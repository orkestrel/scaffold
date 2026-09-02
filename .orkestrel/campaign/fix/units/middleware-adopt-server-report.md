# Unit middleware-adopt-server — report (2026-09-02)

Writer: `builder` on Claude Sonnet (native). Returned report, as data: the eight sites in
`src/core/helpers.ts` (import, TSDoc, call), `src/core/types.ts` (import, `ConnectionState`
member), `tests/src/core/helpers.test.ts` (case title, `via` → `through`), and
`guides/middleware.md` (the `ConnectionState` row, the limiter prose) adopt `computeClientKey`
and `Connection`; sweep over `src`, `tests`, `guides/middleware.md`, `README.md` returns no
hit for either old name. Gates: `format:check` 0 (after a scoped format of the wrapped import),
`lint:check` 0, `check` 0, `build` 0, `test` 0 (src 425 passed, 1 skipped, 1 todo; policy
111; config 46; setup 23; guides 38). Committed by the Orchestrator as `aa8646a`.
