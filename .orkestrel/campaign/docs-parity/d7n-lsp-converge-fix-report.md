# Report — `d7n-lsp-converge-fix`

Wall clock: 2026-09-08T02:23:34Z (baseline `npm run docs` reading) to 2026-09-08T02:33:00Z (final
sweep). Checkout `/home/user/fleet/lsp`, sole writer, from the committed tip `edca4bd`.

Touched files, one line each:

- `guides/lsp.md` — the lead-ins ending with a period, the renamed `### Stdio client transport`
  and `### Client and transport contracts` subsections, a sentence introducing each fence that had
  none, the titled fence's read of `diagnostics`, and every
  function row's `Shape` cell with the convention sentence its table now needs.
- `src/core/factories.ts` — the same read line inside the titled `@example`.
- `src/core/types.ts` — `destroy`'s `@remarks` regains the drain fact.
- `tests/setupServer.ts` — the comment lines rewrapped at the configured print width.
- `tests/src/server/fixtures/protocol.mjs` — the `frame` description names the unit the code returns.

```text
 guides/lsp.md                          | 81 ++++++++++++++++++----------------
 src/core/factories.ts                  |  1 +
 src/core/types.ts                      |  7 +--
 tests/setupServer.ts                   | 22 +++++----
 tests/src/server/fixtures/protocol.mjs |  2 +-
 5 files changed, 63 insertions(+), 50 deletions(-)
```

The instrument is `tmp/d7n-lsp-converge-fix/edit.mjs` inside the checkout. Applied to the `edca4bd`
copies of the touched files in a scratch tree, it reproduces each byte for byte, the guide after
`oxfmt --write` supplies the table realignment:

```text
$ node <scratch>/tmp/d7n-lsp-converge-fix/edit.mjs        node exit=0
reproduces: src/core/factories.ts
reproduces: src/core/types.ts
reproduces: tests/setupServer.ts
reproduces: tests/src/server/fixtures/protocol.mjs
$ npx oxfmt --config .oxfmtrc.json --write <scratch>/guides/lsp.md
reproduces after format: guides/lsp.md
```

## Item 1 — the lead-ins (L1)

Each colon became a period; no other word moved, which is the subjective lane's own prescription
("The server surface provides these exports.").

```diff
-The server surface provides these exports:
+The server surface provides these exports.
-The client surface provides these entities and configuration contracts:
+The client surface provides these entities and configuration contracts.
-The framing, timing, and error surface provides these exports:
+The framing, timing, and error surface provides these exports.
-The JSON-RPC and initialization surface provides these payload types:
+The JSON-RPC and initialization surface provides these payload types.
-The document and diagnostic surface provides these payload types:
+The document and diagnostic surface provides these payload types.
-The validation surface provides these guards:
+The validation surface provides these guards.
-The constant surface provides these protocol names, advertisements, and limits:
+The constant surface provides these protocol names, advertisements, and limits.
```

## Item 2 — the subsection names (L2)

```diff
-### Stdio transport
+### Stdio client transport
-### Client
+### Client and transport contracts
```

No link names either heading: `grep -n '](#' guides/lsp.md README.md guides/README.md` exits 1 with
no output, and `grep -n 'Stdio transport\|### Client' guides/lsp.md README.md guides/README.md`
returned only those heading lines themselves before the rename.

## Item 3 — the fixture description (L3)

`@param` and `@returns` are untouched, and the first sentence carries no `frame` token, so
`policy/no-malformed-summary`'s name check stays clear.

```diff
 /**
- * Encodes a JSON-RPC message as one Content-Length base-protocol payload.
+ * Encodes a JSON-RPC message with its Content-Length header as one base-protocol buffer.
  *
  * @param {unknown} message - The JSON-RPC message to frame.
  * @returns {Buffer} The ASCII header and UTF-8 body as one buffer.
  */
```

## Item 4 — the fences without a lead-in (L4, Ruling 21)

Each new sentence is an imperative naming what its fence demonstrates, the form the guide's other
fence lead-ins already carry (`Drive that seam directly to carry one frame without a client:`).

```diff
 has somewhere to go, and `error` receives a listener throw that the emitter would otherwise swallow.
 
+Spawn a language server as a child process and drive it through the stdio transport:
+
 ```ts
```

```diff
 `readLSPHeader()` reads and the body starts at `boundary + 4`.
 
+Flatten a retained state, scan that buffer for the header boundary, and take the state's last bytes:
+
 ```ts
```

```diff
 property, so a caller that has already decoded frames keeps them through a refusal.
 
+Encode one message, then read its declared length and its body back at the boundary offsets:
+
 ```ts
```

The fences under `## Transport seam` and `## Validation` already carried one and were left alone.

## Item 5 — the titled pair's unread binding (L5, Ruling 14)

Path taken: the read, not the drop. Both sides gained the same line, so Ruling 14's "the side that
lacks the demonstration is extended" holds and the lead-in at `:47-48` keeps its promise to "read its
diagnostics" without recasting.

The read consumes the binding in one line and introduces no second unread name, which is what the
brief's `const first = ...` shape could not do. `for (const x of xs) console.log(...)` is the fleet's
own form for reading a returned collection in a fence
(`/home/user/fleet/agent/guides/database.md:1772`), and `LSPDiagnostic` declares `message`, so the
line reads a real member. No import is added, so the guide's fence-import check is unaffected.

`guides/lsp.md`:

```diff
 	{ signal },
 )
+for (const diagnostic of diagnostics) console.log(diagnostic.message)
 await client.close(uri)
 await client.destroy()
```

`src/core/factories.ts`:

```diff
  * 	{ signal },
  * )
+ * for (const diagnostic of diagnostics) console.log(diagnostic.message)
  * await client.close(uri)
  * await client.destroy()
```

## Item 6 — `destroy`'s dropped fact (L6)

The description paragraph is unchanged, so the compared cell does not move. The added sentence was
falsified against the tree rather than taken from the lane: `src/core/LSPClient.ts:638` runs
`this.#drain(new LSPError('The LSP client is closing', { code: 'closed' }))` and `:641` then awaits
`this.#request(LSP_METHODS.shutdown)`, and `#drain` at `:609-612` settles every entry of `#pending`
and `#publications` with that error.

```diff
 	 * @returns A promise that resolves after transport settlement and listener removal.
-	 * @remarks A close failure that settles before the deadline is emitted before the emitter is
-	 * destroyed. At the deadline, the client emits a coded `timeout` error and absorbs the later
-	 * close outcome.
+	 * @remarks Pending operations reject with an `LSPError` coded `closed` before the `shutdown`
+	 * request is written. A close failure that settles before the deadline is emitted before the
+	 * emitter is destroyed. At the deadline, the client emits a coded `timeout` error and absorbs the
+	 * later close outcome.
```

## Item 7 — the wide comment lines (L7)

Ancillary decision recorded: the criterion is `awk 'length > 100'` printing nothing for the whole
file, and the baseline reading was `20: 105`, `22: 101`, `53: 102`, `152: 101`. The rewrap therefore
covers the paragraph each of those lines sits in, not the two lines item 7 names alone; every edit is
comment text and no assertion, value, or code token moved.

```diff
 /**
- * Names the value this process carries in `LSP_FIXTURE_AMBIENT` so a child can report what it inherited.
+ * Names the value this process carries in `LSP_FIXTURE_AMBIENT` so a child can report what it
+ * inherited.
  *
- * @remarks A host adds variables to a child's environment on its own account: Windows copies `PATH`,
- * `TEMP`, `USERPROFILE`, and the rest of its required set into every child whatever environment the
- * spawn configured, so `PATH` reports the same value there whether a spawn replaced the environment
- * or inherited it. No host injects this variable, so a child that reports it inherited the parent's
- * environment and a child that reports `null` received the configured environment alone.
+ * @remarks A host adds variables to a child's environment on its own account: Windows copies
+ * `PATH`, `TEMP`, `USERPROFILE`, and the rest of its required set into every child whatever
+ * environment the spawn configured, so `PATH` reports the same value there whether a spawn replaced
+ * the environment or inherited it. No host injects this variable, so a child that reports it
+ * inherited the parent's environment and a child that reports `null` received the configured
+ * environment alone.
  */
 export const FIXTURE_AMBIENT = 'inherited'
```

```diff
-/** Names the workspace the Oxlint receipt lints, pinned to one rule so its diagnostics stay fixed. */
+/**
+ * Names the workspace the Oxlint receipt lints, pinned to one rule so its diagnostics stay fixed.
+ */
 export const OXLINT_FILES: Readonly<Record<string, string>> = Object.freeze({
```

```diff
- * @remarks A caller that needs the value cannot proceed without it, so an absent or off-shape member
- * fails here rather than reaching an assertion as a stand-in number.
+ * @remarks A caller that needs the value cannot proceed without it, so an absent or off-shape
+ * member fails here rather than reaching an assertion as a stand-in number.
```

## Item 8 — the function rows' `Shape` cells (L8, Rulings 20 and 26)

Each cell holds the signature read from its declaration as a type literal, with a union arm escaped
`\|` the way the table's own convention sentence requires; a defaulted parameter is written optional,
which is its call-signature form. The guard row holds the type it narrows to. Column padding is
`oxfmt`'s; the rows are shown with it collapsed, and the `Summary` cells are untouched.

```diff
-| `createStdioClientTransport` | function | | Creates a byte transport over …
+| `createStdioClientTransport` | function | `(options: StdioClientTransportOptions) => StdioClientTransportInterface` | Creates a byte transport over …
-| `createLSPClient` | function | | Creates a transport-agnostic …
+| `createLSPClient` | function | `(options: LSPClientOptions) => LSPClientInterface` | Creates a transport-agnostic …
-| `encodeLSPMessage` | function | | Encodes a JSON-RPC message …
+| `encodeLSPMessage` | function | `(message: JSONRPCMessage) => Uint8Array` | Encodes a JSON-RPC message …
-| `parseLSPMessages` | function | | Parses a byte chunk …
+| `parseLSPMessages` | function | `(chunk: Uint8Array, state?: LSPDecodeState) => readonly [messages: readonly JSONRPCMessage[], state: LSPDecodeState \| undefined]` | Parses a byte chunk …
-| `joinLSPSegments` | function | | Flattens the retained segments …
+| `joinLSPSegments` | function | `(state: LSPDecodeState) => Uint8Array` | Flattens the retained segments …
-| `takeLSPTail` | function | | Takes the last retained bytes …
+| `takeLSPTail` | function | `(state: LSPDecodeState, count: number) => Uint8Array` | Takes the last retained bytes …
-| `scanLSPBoundary` | function | | Finds the first base-protocol header boundary …
+| `scanLSPBoundary` | function | `(bytes: Uint8Array) => number \| undefined` | Finds the first base-protocol header boundary …
-| `readLSPHeader` | function | | Reads one base-protocol header block …
+| `readLSPHeader` | function | `(header: Uint8Array, messages?: readonly JSONRPCMessage[]) => number` | Reads one base-protocol header block …
-| `readLSPBody` | function | | Reads one base-protocol content body …
+| `readLSPBody` | function | `(body: Uint8Array, messages?: readonly JSONRPCMessage[]) => JSONRPCMessage` | Reads one base-protocol content body …
-| `waitForDeadline` | function | | Waits for a deadline to elapse …
+| `waitForDeadline` | function | `(timeout: number) => Promise<void>` | Waits for a deadline to elapse …
-| `isLSPError` | function | | Checks whether an unknown value is a branded package error. |
+| `isLSPError` | function | `LSPError` | Checks whether an unknown value is a branded package error. |
```

Each table that carries those rows gained the sentence after its interface sentence, on the
same paragraph line the guide already uses for an appended convention clause:

```diff
-… escaped as `\|`. An extended interface's name comes before `plus`, with the members it adds after.
+… escaped as `\|`. An extended interface's name comes before `plus`, with the members it adds after. A function row's `Shape` cell holds its signature, and a guard row's the type it narrows to.
-… escaped as `\|`.
+… escaped as `\|`. A function row's `Shape` cell holds its signature, and a guard row's the type it narrows to.
```

Ancillary decision recorded: `### JSON-RPC and initialization`, `### Documents and diagnostics`,
`### Guards`, and `### Constants` did not gain the sentence. None of them carries a function row with
an empty `Shape` cell, which is item 8's trigger; the `### Guards` rows already hold the type each
guard narrows to under Ruling 20's guard sentence. Ruling 27's strike of the interface sentence in
front of a guard table names interpret, toolbox, and brief, so it stayed outside this round.

The class rows `StdioClientTransport`, `LSPClient`, and `LSPError` keep an empty `Shape` cell. Item 8
names function rows and the item's own grep is scoped to `| function |`.

## Item 9 and criterion 3 — propagation

```text
$ npx oxfmt --config .oxfmtrc.json --write guides/lsp.md src/core/factories.ts src/core/types.ts tests/setupServer.ts tests/src/server/fixtures/protocol.mjs
Finished in 734ms on 5 files using 4 threads.                                      exit 0
$ PATH=/opt/npm11/bin:$PATH npm run docs
rows read: 1, disagreements found: 0                                               exit 0
$ PATH=/opt/npm11/bin:$PATH npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0                       exit 0
$ PATH=/opt/npm11/bin:$PATH npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0                       exit 0
```

`git status --short` after both write directions is unchanged from the reading under criterion 1.

## Criterion 1 — scope

```text
$ git status --short
 M guides/lsp.md
 M src/core/factories.ts
 M src/core/types.ts
 M tests/setupServer.ts
 M tests/src/server/fixtures/protocol.mjs
$ git diff -U0 -- src tests/setupServer.ts tests/src/server/fixtures/protocol.mjs | grep -E '^[-+]' | grep -vE '^(\+\+\+|---)' | grep -vE '^[-+]\s*(\*|//|/\*\*)'
(no output)                                                                        exit 1
```

The sweep prints nothing rather than the item 5 fence line: that line sits inside the `@example` doc
block as ` * for (const diagnostic of diagnostics) …`, so the `^[-+]\s*\*` filter removes it. Every
`src/**` and fixture edit is doc-block or comment text, and no code token moved.

## Criterion 2 — the scoped gates

```text
$ npx oxfmt --config .oxfmtrc.json --check guides/lsp.md README.md tests/guides.test.ts tests/setupServer.ts src
All matched files use the correct format.
Finished in 479ms on 17 files using 4 threads.                                     exit 0
$ npx oxlint --config .oxlintrc.json --deny-warnings tests src
(no output)                                                                        exit 0
$ PATH=/opt/npm11/bin:$PATH npm run check
tsc --noEmit --project tsconfig.json, then configs/src/tsconfig.core.json and
configs/src/tsconfig.server.json, no diagnostics                                   exit 0
```

## Criterion 4 — the sweeps

```text
$ grep -nE 'provides these [a-z, ]+:$' guides/lsp.md                               (no output)
$ grep -c '^### Stdio client transport' guides/lsp.md                              1
$ grep -c '^### Client$' guides/lsp.md                                             0
$ grep -c 'base-protocol buffer' tests/src/server/fixtures/protocol.mjs            1
$ awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^```/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/lsp.md
                                                                                   (no output)
$ grep -c 'coded `closed` before the `shutdown`' src/core/types.ts                 1
$ awk 'length > 100' tests/setupServer.ts                                          (no output)
$ grep -nE '^\| `[^`]+` +\| function +\| +\| ' guides/lsp.md                       (no output)
$ diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)
                                                                                   (no output)
```

## Criterion 5 — the suites

```text
$ PATH=/opt/npm11/bin:$PATH npm run test:guides
 Test Files  1 passed (1)
      Tests  30 passed (30)                                                        exit 0
$ PATH=/opt/npm11/bin:$PATH npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)                                            exit 0
$ PATH=/opt/npm11/bin:$PATH npm run test:setup
 Test Files  3 passed (3)
      Tests  28 passed (28)                                                        exit 0
```

Observation, not a criterion:

```text
$ PATH=/opt/npm11/bin:$PATH npm run test:src:server
 Test Files  3 passed (3)
      Tests  20 passed (20)                                                        exit 0
```

## Voice sweep

Pattern, over the added lines of `guides/lsp.md`, `src/core`, `tests/setupServer.ts`, and
`tests/src/server/fixtures/protocol.mjs` (`git diff … | grep -E '^\+' | grep -vE '^\+\+\+'`, 63
lines, held at `tmp/d7n-lsp-converge-fix/added.txt`):

```text
$ grep -inE 'should|simpl(y|e)|eas(y|ier|ily)|just|currently|utiliz|leverag|\bvia\b|in order to|e\.g\.|i\.e\.|etc\.|performant|robust|allows you to|and/or|\bsince\b|\bonce\b|please|sanity check|dummy|blacklist|whitelist|\bmaster\b|\bslave\b|\bnew\b|\blatest\b|\bnow\b|we recommend|\bwe\b|\bour\b|let'"'"'s|above|below|guarantee|\bensure' tmp/d7n-lsp-converge-fix/added.txt
(no output)                                                                        exit 1
```

No non-ASCII character entered the guide from this round: the only hits of `grep -nP '[^\x00-\x7F]'`
over `guides/lsp.md` are the pre-existing em dashes and `↔` in `## Tests`.

## Deviation state

No deviation. No gate outside the owned files reddened, every `Shape` cell had a Ruling 26 form, and
no residual disagreement survived — the seed read zero without `--to` before either write direction
ran.
