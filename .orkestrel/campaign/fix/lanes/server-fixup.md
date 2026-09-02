<!-- task a7b5bb00667e2ed4c.output -->
That's just formatter wrapping the longer import line. Everything checks out. All findings closed, gates green.

## Output

**Per finding:**

1. **`ServerErrorCode` → `'STATUS'`** — closed. Changed `src/server/types.ts:491` (union member) and `:732` (`@remarks`), `src/server/Server.ts:193` (throw site), `tests/src/server/Server.test.ts:113`, `tests/src/server/errors.test.ts:94,95,102,107,116,128`, `guides/server.md:161` (Types row) and `:252` (contract item). `ServerStatus`'s lowercase phase values (`'idle'`, `'starting'`, etc.) and the `context.status` payload key are untouched. `src/server/errors.ts:151,154,191` still show `'status'` in TSDoc `@example` prose — that file is not in the brief's owned-file list and finding 1's carried-site enumeration does not name it, so it is left as-is rather than edited outside scope.

2. **`pickCoding` → `resolveCoding`** — closed. Renamed at `src/server/helpers.ts:605,652,653,656,678,698`, `src/server/Negotiator.ts:2,47`, `tests/src/server/helpers.test.ts:33,548,562-573`, `guides/server.md:100,665`. `resolveCoding` was misplaced alphabetically in the `helpers.test.ts` import list (originally right after `parseRange`); moved it to sit between `requestEncoding` and `resolveOrigin` so `r`-prefixed imports stay sorted. The `guides/server.md` Helpers table row padding was re-aligned for the new name's width; `oxfmt` re-wrapped `Negotiator.ts`'s now-longer import statement onto multiple lines.

3. **`SSE_HEADERS` row** — closed. `guides/server.md:73` now reads "The SSE response headers a `Stream` merges under any caller `headers` — a caller repeating one of these exact keys replaces its value."

4. **`Stream.ts` class TSDoc** — closed. `src/server/Stream.ts:6` opens "The Server-Sent-Events handle over an open, fetch-standard streaming `Response`. Implements exactly {@link StreamInterface}."; the rest of the `@remarks` block is unchanged.

**Sweep** (`pickCoding` and `'status'` as a code literal, word-boundary/inflected, over `src`, `tests`, `guides/server.md`, `README.md`):
- `pickCoding` — no remaining hits.
- `'status'` code-literal hits remaining, all classified as out of scope: `src/server/errors.ts:131` (`HTTPError`'s `status` property, unrelated), `:151,154,191` (stale TSDoc examples in a non-owned file), `tests/src/server/Server.test.ts:1262` (`ServerInterface`'s `status` lifecycle property, unrelated). `README.md` had no hits of either symbol.

**Gate chain**, all exit `0`:
```text
npm run format:check   → 0 (after running scoped oxfmt on guides/server.md and Negotiator.ts to converge; re-checked clean)
npm run lint:check     → 0 (no output, no warnings)
npm run check           → 0 (tsc clean)
npm run build            → 0 (vite build + d.ts bundling succeeded)
npm test                  → 0 (test:src 258 passed/1 skipped, test:policy 111 passed, test:config 46 passed, test:setup 14 passed, test:guides 28 passed)
```
No re-run needed; nothing timing-suspect failed.

**`git diff --stat`:**
```text
 guides/server.md                 | 10 +++++-----
 src/server/Negotiator.ts         |  9 +++++++--
 src/server/Server.ts             |  2 +-
 src/server/Stream.ts             |  4 ++--
 src/server/helpers.ts            | 12 ++++++------
 src/server/types.ts              |  4 ++--
 tests/src/server/Server.test.ts  |  2 +-
 tests/src/server/errors.test.ts  | 12 ++++++------
 tests/src/server/helpers.test.ts | 12 ++++++------
 9 files changed, 36 insertions(+), 31 deletions(-)
```

**`git status --short`:**
```text
 M guides/server.md
 M src/server/Negotiator.ts
 M src/server/Server.ts
 M src/server/Stream.ts
 M src/server/helpers.ts
 M src/server/types.ts
 M tests/src/server/Server.test.ts
 M tests/src/server/errors.test.ts
 M tests/src/server/helpers.test.ts
```
All modified files are within the brief's owned scope; no off-limits file touched; no commit, stage, push, install, or discarding `git` command run.
