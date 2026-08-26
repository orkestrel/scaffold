# Unit T1 report — terminal: decode a CRLF chunk as Enter

Builder (Sonnet) returned 2026-08-26. Acceptance met on first pass.

- Diff: `src/core/constants.ts` — one `CONTROL_NAMES` row keyed `${RETURN}${NEWLINE}` mapping to
  `{ name: 'return', ctrl: false }`, TSDoc updated from single-byte claim; new test in
  `tests/src/core/helpers.test.ts` (`decodes a CRLF chunk delivered as one Enter keypress`).
- Red-then-green: `npx vitest run --config vite.config.ts --project src:core
  tests/src/core/helpers.test.ts` — red 1 failed | 35 passed (36); green 36 passed (36).
- Gates: `npm run check`, `format:check` (158 files), `lint:check`, `test:guides` (48) all green.
- `guides/terminal.md` untouched: its `CONTROL_NAMES` row is generic, names no member — recorded
  as the unit's ancillary decision.
- Status: ` M src/core/constants.ts`, ` M tests/src/core/helpers.test.ts` — owned files only.
