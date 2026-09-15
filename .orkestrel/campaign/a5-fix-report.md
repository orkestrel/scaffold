# Unit A5-fix report

## Repairs R1–R12: file and landed line

- R1 (three sites): `guides/agent.md:1126`, `src/core/factories.ts:104`, `tests/guides.test.ts:657`
  — each now reads `// signal cancellation, drain, then close the listener`.
- R2: `tests/guides.test.ts:571-574` — cancel-case stop comment replaced with the four-line text
  naming `closeIdleConnections` and `server.close()`.
- R3: `tests/guides.test.ts:464-467` — the "runs as written" comment moved above
  `const server = createServer(...)` with the new text (`serve` export, `SIGTERM` listener a test
  process outlives).
- R4: `tests/guides.test.ts:504-505` — credential comment replaced with the two-line text.
- R5: `guides/agent.md:1097` — opening clause replaced (`The `@orkestrel/agent` package declares no
  dependency on a newline-delimited JSON parser, and no runtime dependency on a router or on a
  server adapter, so`).
- R6: `guides/agent.md:1099` — final sentence replaced with the three-sentence byte-limit text.
- R7: `guides/agent.md:1099` — `url` token followed by `option`.
- R8: `tests/guides.test.ts:489` (`` a `ProviderError` instance carrying ``) and
  `tests/guides.test.ts:471-473` (route comment rewritten with `the dispatcher itself`).
- R9: `tests/guides.test.ts:46` (`const { createAbort } = await import('@orkestrel/abort')`
  added beside the `@orkestrel/test` import); cancel case `tests/guides.test.ts:543`
  (`const abort = createAbort()`); flagship case `new AbortController().signal` replaced with
  `createAbort().signal` at `tests/guides.test.ts:495, 512, 515`. Every other case's
  `AbortController` use is untouched (lines 353, 378, 397, 603, 631, 637, 681).
- R10: `guides/agent.md:1099` — the `declare` placeholders sentence inserted directly after
  "The transcription substitutes where a test process differs from a deployment."
- R11: `tests/guides.test.ts:525` — case renamed to `'cancels the upstream turn when the relay
  reader goes away with the first pull pending'`.
- R12: flagship case (`tests/guides.test.ts:517-521`) — `finally` keeps only `await server.stop()`;
  `expect(server.status).toBe('stopped')` and `expect(server.address).toBeUndefined()` moved after
  the `try`/`finally`. Cancel case (`tests/guides.test.ts:538-575`) — `let drained: number |
  undefined` declared before `try`; `finally` keeps `gate.resolve()`, the `performance.now()`
  reading, `await server.stop()`, and `drained = performance.now() - closing`; the R2 comment and
  `expect(drained).toBeLessThan(1000)` / `expect(server.status).toBe('stopped')` moved after the
  `try`/`finally`.

## Commands run

- `npm run format` — exit 0, converged (rewrote to formatter width; no further diff after
  a second run).
- `npm run lint` — exit 0, no changes needed.
- `npm run format:check` — exit 0 (`All matched files use the correct format.`).
- `npm run lint:check` — exit 0, no warnings.
- `npm run check` — exit 0 (`tsc --noEmit` for the root project and `check:src:core`; no API
  Extractor notice printed on this run).
- `npm run test:guides` — exit 0, **43 passed**, 0 skipped, 0 todo.

## Tree state

`git status --porcelain`:

```
 M guides/agent.md
 M src/core/factories.ts
 M tests/guides.test.ts
```

`git diff --stat`:

```
 guides/agent.md       |  6 +++---
 src/core/factories.ts |  2 +-
 tests/guides.test.ts  | 52 +++++++++++++++++++++++++++------------------------
 3 files changed, 32 insertions(+), 28 deletions(-)
```

`git diff src/core/factories.ts` shows exactly one changed line (the TSDoc stop comment).

## Flags

None. Every repair applied to the exact "current text" the brief named; no formatter rewrite
changed a repaired comment's reading.
