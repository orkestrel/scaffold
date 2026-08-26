# Unit C1 report — console: CRLF-safe content splitting

Implementer (Opus 5) returned 2026-08-26. Acceptance met.

- `renderBox` splits `options.content` on `/\r\n|\n/`; TSDoc Lines bullet states the rule and the
  lone-`\r` exclusion; guide Contract 13 updated; failing-first CRLF case plus lone-`\r` boundary
  case added.
- Red-then-green: scoped helpers run — red 1 failed | 151 passed (152); green 152 (152).
- Split-site audit: the only other `src/` newline-adjacent split is `src/browser/helpers.ts:161`
  (SGR parameter list, `;`-separated wire data) — retained. Pattern occurs once → no extracted
  helper, per the centralize-twice law.
- Gates: `check`, `test:guides` (63), `format:check` (170 files), `lint:check` all green;
  observation: full `test:src:core` 445 passed.
- Status: guides/console.md, src/core/helpers.ts, tests/src/core/helpers.test.ts — owned only.
