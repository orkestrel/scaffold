# Report — `d7n-websocket-close`

## Items

1. **The `Shape` idiom (Rulings 15, 18, 20).** No hunk. Read `src/server/types.ts` for the
   three flagged rows: `WebSocketFrame`, `WebSocketEncodeOptions`, and `NodeWebSocketOptions`
   declare data members only, with no call-signature member, so none takes a `plus`. Every
   `## Surface`, `### Constants`, and `### Types` table already carries `Shape` with its
   canonical convention sentence (`guides/websocket.md:75`, `:104`); `NodeWebSocketInterface`
   already reads `{ emitter, readyState } plus send, ping, close, destroy`. `grep -n '|
   interface *| `{[^`]*:' guides/websocket.md` and `grep -n '…' guides/websocket.md` printed
   nothing, confirming no row spells a member's type or elides.
2. **Member references.** No hunk. The brief's site list was `(none)`; `npm run docs` read
   `rows read: 1, disagreements found: 0`, confirming no `Owner#member` versus `member` drift.
3. **The drop-in's canon (Rulings 13 and 20).** One hunk, `tests/guides.test.ts:3`:
   ```diff
   -// package's own, and are the only part a sibling package changes.
   +// package's own, as is the executed section that closes the file.
   ```
   `diff -u <(sed -n '47,258p' abort/tests/guides.test.ts) <(sed -n '54,265p'
   websocket/tests/guides.test.ts)` printed nothing over the drop-in's canon region (`const
   root = ` through the manifest loop's closing brace), matching the brief's recorded "(no
   difference)". Only the header line disagreed with the pilot and is now the pilot's byte
   for byte.
4. **Fence lead-ins (Ruling 21).** Five hunks in `guides/websocket.md`, one sentence inserted
   between each named heading and its directly following fence, naming what the fence
   demonstrates: the `## Surface` fence (an upgrade handler passed to `createNodeWebSocket`),
   `### Stream-decode frames across chunk boundaries`, `### Encode a frame to the wire (server
   unmasked, client masked)`, `### Compute the handshake accept token`, and `### Keep a
   connection alive, and tear it down on demand`. None of the four other guide fences under a
   structural heading needed a new sentence — the titled `### Accept an upgrade and echo
   messages (server mode)` fence already carries one.
5. **Propagation.** `npx oxfmt --write guides/websocket.md tests/guides.test.ts` ran clean
   and left the tree at the state reported in the criteria; `npm run docs` read `rows read: 1,
   disagreements found: 0`; `-- --to guide` and `-- --to source` each read `written: 0,
   reported: 0`.

## Acceptance criteria

1. `git status --short` in `/home/user/fleet/websocket`:
   ```
    M guides/websocket.md
    M tests/guides.test.ts
   ```
   Owned files only.
2. `grep -n '| interface *| `{[^`]*:' guides/websocket.md` — no output.
   `grep -n '…' guides/websocket.md` — no output.
   Every `Shape`-bearing table (`## Surface`'s `### Constants` at line 75's sentence and
   `### Types` at line 104's sentence) carries the canonical sentence between its heading and
   the table.
3. `diff -u <(sed -n '47,258p' /home/user/fleet/abort/tests/guides.test.ts) <(sed -n
   '54,265p' /home/user/fleet/websocket/tests/guides.test.ts)` — no output (region equal
   byte for byte outside the package-specific appended cases already present). Line 3 of
   `tests/guides.test.ts` now reads the pilot's line 3 exactly.
4. `npx oxfmt --check guides/websocket.md tests/guides.test.ts`:
   ```
   Checking formatting...

   All matched files use the correct format.
   Finished in 346ms on 2 files using 4 threads.
   ```
   Exit 0.
   `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` — no output,
   exit 0.
5. `npm run docs`:
   ```
   rows read: 1, disagreements found: 0
   ```
   `npm run docs -- --to guide`:
   ```
   rows read: 1, disagreements found: 0, written: 0, reported: 0
   ```
   `npm run docs -- --to source`:
   ```
   rows read: 1, disagreements found: 0, written: 0, reported: 0
   ```
6. `npm run test:guides`:
   ```
    Test Files  1 passed (1)
        Tests  25 passed (25)
     Duration  579ms (transform 154ms, setup 44ms, import 252ms, tests 71ms, environment 0ms)
   ```
   Exit 0. `npm run test:policy`:
   ```
    Test Files  1 passed (1)
        Tests  90 passed | 1 skipped (91)
     Duration  617ms (transform 198ms, setup 46ms, import 185ms, tests 247ms, environment 0ms)
   ```
   Exit 0.

## Wall clock

`npm run docs` (initial read): 0.688s. `npx oxfmt --write`: 1.743s. `npx oxfmt --check`:
0.705s. `npx oxlint`: 2.224s. `npm run test:guides`: 3.634s. `npm run test:policy`: 1.165s.
