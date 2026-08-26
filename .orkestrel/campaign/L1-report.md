# Unit L1 report — lsp: host-correct workspace URI examples

Implementer (Opus 5) returned 2026-08-26. Acceptance met.

- `guides/lsp.md` only: both fences derive workspace/document URIs through `pathToFileURL`, with a
  new paragraph stating `workspace` is an opaque caller-spelled URI. 15 insertions, 4 deletions.
- `tests/guides.test.ts` unchanged — it parses fences through `@orkestrel/guide`, transcribes none.
- Acceptance: `format:check` green (147 files); `test:guides` green (23); `grep file:///` in the
  guide exits 1 (no literal remains).
- Measured: edited fences typecheck (`tsc exit=0` against source aliases);
  `pathToFileURL('C:\projects\app').href` → `file:///C:/projects/app` on this host.
- `LSPClient.test.ts:179` deliberately unchanged: opaque round-trip fixtures (client stores at
  `LSPClient.ts:112`, forwards at `:246`).
- Finding carried to unit L1b: the same literal survives in published TSDoc at
  `src/core/factories.ts:13`, `src/core/LSPClient.ts:49`, `:52`, `src/server/factories.ts:13`.
