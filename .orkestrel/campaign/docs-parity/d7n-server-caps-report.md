# Report — `d7n-server-caps`

Every all-caps residue site the fix round's report named is lowered, keeping each sentence's
contrast. No code token, code line, assertion, or description paragraph changed.

## Per-file hunks

### `src/server/helpers.ts`

```diff
-// The RETURNING onion: each middleware may
+// The returning onion: each middleware may
@@
-// builds a spec-shaped `Set-Cookie` value with its attributes. The SIGNED
+// builds a spec-shaped `Set-Cookie` value with its attributes. The signed
@@
-// `signToken` value in a `Set-Cookie`, with the SAME secret rotation + tamper
+// `signToken` value in a `Set-Cookie`, with the same secret rotation + tamper
@@
- * Splits on `;`; the FIRST segment keeps any leading whitespace (a genuine
+ * Splits on `;`; the first segment keeps any leading whitespace (a genuine
  * cookie-pair separator never precedes it), while every later segment has its
  * inter-pair separator (ASCII space/tab) stripped before parsing — so a
- * whitespace-PADDED name (`'  __Host-x=evil'`) is rejected by
+ * whitespace-padded name (`'  __Host-x=evil'`) is rejected by
  * {@link isCookieName} rather than silently reconciling into a
  * prefix-protected `__Host-` name. A pair without `=`, or with an invalid
- * name, is skipped; a later duplicate name wins. TOTAL — an absent/empty/
+ * name, is skipped; a later duplicate name wins. Total — an absent/empty/
@@
- * `Domain`, `Path` (default `/`), `Max-Age`, `HttpOnly` (default ON), `Secure`
- * (default OFF), `SameSite` (default `Lax`). `Domain` / `Path` are validated
- * with {@link isCookieAttribute} and THROW an {@link HTTPError} on an
- * injection attempt (a programmer misconfiguration — never a silent drop). A `sameSite: 'None'` cookie is ALWAYS `Secure` regardless of
+ * `Domain`, `Path` (default `/`), `Max-Age`, `HttpOnly` (default ON), `Secure`
+ * (default off), `SameSite` (default `Lax`). `Domain` / `Path` are validated
+ * with {@link isCookieAttribute} and throw an {@link HTTPError} on an
+ * injection attempt (a programmer misconfiguration — never a silent drop). A `sameSite: 'None'` cookie is always `Secure` regardless of
  * the `secure` option (the spec requires it); an un-resolved `undefined`
- * `secure` here falls to OFF — request-aware callers resolve it first through
+ * `secure` here falls to off — request-aware callers resolve it first through
@@
- * a cookie when those MATCH the one it set).
+ * a cookie when those match the one it set).
@@
-// the payload under the secret. Signing always uses the FIRST secret (a
-// rotation list's current head); verifying accepts ANY secret in the list,
+// the payload under the secret. Signing always uses the first secret (a
+// rotation list's current head); verifying accepts any secret in the list,
  // through `crypto.subtle.verify` — constant-time internally, so the old
-// `safeCompare` is RETIRED, never ported. `verifyToken` is TOTAL (never
+// `safeCompare` is retired, never ported. `verifyToken` is total (never
@@
- * the signature), signed by using `crypto.subtle.sign('HMAC', …)` under the FIRST
+ * the signature), signed by using `crypto.subtle.sign('HMAC', …)` under the first
  * {@link TokenSecret} (the current secret, or the head of a rotation list).
- * Blank/whitespace-only secrets are IGNORED ({@link normalizeSecret}); a
- * misconfigured secret with no usable entry THROWS an {@link HTTPError}
+ * Blank/whitespace-only secrets are ignored ({@link normalizeSecret}); a
+ * misconfigured secret with no usable entry throws an {@link HTTPError}
@@
-// The content-negotiation helpers (module-scope) — the ONE shared q-value
+// The content-negotiation helpers (module-scope) — the one shared q-value
@@
- * back to `1`). A `;q=0` entry is KEPT (an explicit rejection a caller must
- * honor). The result is sorted by `q` DESCENDING, a STABLE sort preserving
+ * back to `1`). A `;q=0` entry is kept (an explicit rejection a caller must
+ * honor). The result is sorted by `q` descending, a stable sort preserving
  * the header's own order within a tie — a single pass with no backtracking,
- * so parsing stays linear in the header length (ReDoS-safe). TOTAL — an
+ * so parsing stays linear in the header length (ReDoS-safe). Total — an
@@
- * Prefers an EXACT named match (including an explicit `;q=0` rejection);
+ * Prefers an exact named match (including an explicit `;q=0` rejection);
@@
- * client accepts none of `available` (identity — no compression). TOTAL on
+ * client accepts none of `available` (identity — no compression). Total on
@@
- * binary (`image/png`, `application/zip`) is NOT compressible. An
- * absent/empty type is not compressible. TOTAL.
+ * binary (`image/png`, `application/zip`) is not compressible. An
+ * absent/empty type is not compressible. Total.
@@
-// compute/compare (RFC 7232 §2.3.2 WEAK comparison) and the TOTAL `Range`
+// compute/compare (RFC 7232 §2.3.2 weak comparison) and the total `Range`
@@
- * `undefined` (no header set). SECURITY: the literal `'null'` origin — sent
+ * `undefined` (no header set). Security: the literal `'null'` origin — sent
  * by a sandboxed iframe, a `file://` document, an opaque-origin redirect — is
- * NEVER reflected even if `'null'` were listed, closing the hostile-context
+ * never reflected even if `'null'` were listed, closing the hostile-context
@@
- * first FOUR (the `/64` prefix), normalizes each (lower-case, no leading
+ * first four (the `/64` prefix), normalizes each (lower-case, no leading
@@
- * Emits an `event:`/`id:`/`retry:` line for each present field, then ONE
+ * Emits an `event:`/`id:`/`retry:` line for each present field, then one
@@
-// through a byte-counting `TransformStream` that ABORTS the instant
+// through a byte-counting `TransformStream` that aborts the instant
  // decompressed output exceeds `decompression` (the zip-bomb defense — fail
-// BEFORE materializing the bomb, since `DecompressionStream` has no
+// before materializing the bomb, since `DecompressionStream` has no
@@
- * exceeds `limit` — BEFORE the rest of the stream is buffered — rather than
+ * exceeds `limit` — before the rest of the stream is buffered — rather than
@@
- * Lower-cases + trims and returns the matching {@link Encoding} ONLY for
+ * Lower-cases + trims and returns the matching {@link Encoding} only for
  * `gzip` / `deflate` (the two `DecompressionStream`-supported codings). An
  * absent header, `identity`, an unknown value, or a
  * comma-joined multi-coding all yield `undefined` (the body is read as-is).
- * TOTAL — never asserts the loose `string | null` header.
+ * Total — never asserts the loose `string | null` header.
```

The `(default ON)` pairing at the `HttpOnly` cell keeps its capital because it is two letters and
the residue table's pattern (`\b[A-Z]{3,}\b`) never matched it; only its paired `OFF` (three
letters, named in the table) is lowered.

### `src/server/errors.ts`

```diff
-// response of that status. Any OTHER throw is a programmer/runtime error → a
+// response of that status. Any other throw is a programmer/runtime error → a
  // 500 (its message hidden unless `expose`). The machine-readable field here is
  // the numeric `status` (plus an optional `context` bag) — `MultipartError` is
-// NOT declared here: it belongs to `@orkestrel/middleware` with its owner
+// not declared here: it belongs to `@orkestrel/middleware` with its owner
@@
-// constructed by a DIFFERENT copy of this package (version skew, a linked
+// constructed by a different copy of this package (version skew, a linked
@@
-// CALLER programmed wrong, so it keys on a `ServerErrorCode` rather than a
+// caller programmed wrong, so it keys on a `ServerErrorCode` rather than a
```

### `src/server/Stream.ts`

```diff
- * merged OVER them, at `options.status` (default `200`). A caller repeating one
+ * merged over them, at `options.status` (default `200`). A caller repeating one
@@
- * stream. Every method is a SAFE NO-OP once `closed` (ended by `end()`, or
+ * stream. Every method is a safe no-op once `closed` (ended by `end()`, or
@@
-	// The CONSUMER cancelled the stream: the handle is closed from the far end,
+	// The consumer cancelled the stream: the handle is closed from the far end,
```

### `src/server/Negotiator.ts`

```diff
- * Errors thrown by the negotiated handler propagate UNMODIFIED — the
+ * Errors thrown by the negotiated handler propagate unmodified — the
```

### `src/server/constants.ts`

```diff
-// inside THIS package: a capability arrives with its first real consumer,
+// inside this package: a capability arrives with its first real consumer,
  // never speculatively. Each is frozen or declared
  // readonly, so a consumer reads but never mutates the shared default. The
  // defaults only `@orkestrel/middleware` needs (rate limiting, CSRF, sessions,
-// static serving, multipart) stay OUT of this file; they belong to that
+// static serving, multipart) stay out of this file; they belong to that
```

### `src/server/Server.ts`

```diff
-	// Track the request for draining FIRST — before anything that can throw —
-	// so the sync listener itself never throws; the rest of setup (which CAN
+	// Track the request for draining first — before anything that can throw —
+	// so the sync listener itself never throws; the rest of setup (which can
@@
-	// error. `buildRequest` runs behind its OWN inner boundary: a throw there
+	// error. `buildRequest` runs behind its own inner boundary: a throw there
@@
-	// registration order: the FIRST to return `true` CLAIMS the socket. A
-	// throwing handler is treated as DECLINED — surfaced on `error` — and the
+	// registration order: the first to return `true` claims the socket. A
+	// throwing handler is treated as declined — surfaced on `error` — and the
@@
-	// connections. A keep-alive client leaves its socket IDLE after a
+	// connections. A keep-alive client leaves its socket idle after a
  // response, which would hang a plain `close()` — so idle sockets are
  // always dropped (an in-flight request is untouched); when `force` is set
  // (the drain deadline fired with work still in flight, or `destroy`)
  // every open socket is destroyed so the callback fires promptly.
  //
  // A protocol-upgraded socket needs the extra loop: node detaches it from
-	// the connection set BOTH `closeIdleConnections()` and
+	// the connection set both `closeIdleConnections()` and
@@
-	// Called BEFORE the new unit is counted, so a zero here means nothing was
+	// Called before the new unit is counted, so a zero here means nothing was
@@
-	// Fire the current drain wakeup once the LAST unit of drainable work has
-	// left. Called AFTER that unit is uncounted — event-driven, never a
+	// Fire the current drain wakeup once the last unit of drainable work has
+	// left. Called after that unit is uncounted — event-driven, never a
@@
-	// claiming handler still OWNS the socket — this only watches it, so the
+	// claiming handler still owns the socket — this only watches it, so the
```

No recast was needed at any site: every emphasized word carried a fact (a role, a state, a totality
claim, an ordering) whose meaning survives ordinary case, so no sentence needed a rewrite.

## Ruled grep

`grep -rnE '\b[A-Z]{3,}\b' src guides/server.md`, ruled hit by hit. Every remaining hit is on the
permitted list or is a token ruled as data:

- Acronyms and format names: `HTTP` (`errors.ts:2,34,38`; `Server.ts:32`; `helpers.ts:194,285,289,290,291,294,910,916`; `constants.ts:95`; `guides/server.md:3,64,89,93,111,128,129,135,139,163,167,173,265,410,416,567,611,716,728,735`), `HTTPS` (`helpers.ts:290,291`), `JSON` (`helpers.ts:398,410,436,440,444,462,488,504,511,513,523,1196,1221,1229,1234,1412,1414,1420,1421`; `constants.ts:95`; `guides/server.md:339,349`), `HMAC` (`helpers.ts:121,313,319,398,407,412,413,440,444,456,462,488,492`; `guides/server.md:97,99,152,153,349`), `SHA` (`helpers.ts:440,444,488,835,852`), `SSE` (`helpers.ts:962,1156,1161,1165,1171`; `constants.ts:58,62`; `guides/server.md:118,223,410,716,735`), `TLS` (`helpers.ts:285,289,290,291,294`; `guides/server.md:93,346`), `URL` (`helpers.ts:194,243,254`; `errors.ts:53`; `Server.ts:289`), `RFC` (`helpers.ts:167,171,828,860,877`; `guides/server.md:89,109,110,111`), `UTF` (`helpers.ts:511,1412`), `ASCII` (`helpers.ts:135,172,217`), `XML` (`constants.ts:95,96`), `SVG` (`constants.ts:96`), `WASM` (`constants.ts:96`), `CORS` (`helpers.ts:962`; `constants.ts:7`; `guides/server.md:463,488,669,671`), `CSRF` (`constants.ts:7`), `TOCTOU` (`helpers.ts:1503`), `CRLF` (`helpers.ts:1165`; `constants.ts:81`), `OOM` (`constants.ts:50`).
- HTTP method and header vocabulary: `GET` (`guides/server.md:31,442`), `OPTIONS` (`guides/server.md:463,464,477,488,671`), `DENY` (`helpers.ts:1044,1045,1046`), `SAMEORIGIN` (`helpers.ts:1046`).
- Error codes: `EADDRINUSE` (`helpers.ts:1500,1511,1528`; `guides/server.md:265,728`), `EAFNOSUPPORT` (none remaining).
- Code literals the prose quotes: `'STATUS'` and `'NEXT'` (`helpers.ts:109`; `errors.ts:23,24,142,147,148,158,161,199`; `Server.ts:199`; `guides/server.md:166,260,357`).
- Repository filenames and a placeholder: none remaining in the six owned files or `guides/server.md` beyond `README.md`/`AGENTS.md` links (`guides/server.md:741,752`).

No new hit outside the permitted list. `helpers.ts` also carries `RETURNING`, `SIGNED`, `SAME`,
`FIRST`, `PADDED`, `TOTAL`, `ON`/`OFF`, `THROW`, `MATCH`, `RETIRED`, `ANY`, `IGNORED`, `THROWS`,
`ONE`, `KEPT`, `DESCENDING`, `STABLE`, `EXACT`, `NOT`, `WEAK`, `SECURITY`, `NEVER`, `FOUR`,
`ABORTS`, `BEFORE`, `ONLY`, `CONSUMER`, `UNMODIFIED`, `THIS`, `OUT`, `DECLINED`, `CLAIMS`, `IDLE`,
`BOTH`, `LAST`, `AFTER`, `OWNS` — all lowered at the report's named lines and confirmed absent by
the closing sweep (`OFF`'s paired `ON` is the one two-letter exception, unmatched by the pattern).

## Criteria

**1.**

```text
git status --short
 M src/server/Negotiator.ts
 M src/server/Server.ts
 M src/server/Stream.ts
 M src/server/constants.ts
 M src/server/errors.ts
 M src/server/helpers.ts

git diff -U0 -- src | grep -E '^[-+]' | grep -vE '^(\+\+\+|---)' | grep -vE '^[-+]\s*(\*|//|/\*\*)'
(no output)                                                                        exit 0
```

**2.**

```text
grep -rnE '\b[A-Z]{3,}\b' src guides/server.md
```

Ruled above. Every hit is on the permitted list.

**3.**

```text
npx oxfmt --config .oxfmtrc.json --check src guides/server.md
All matched files use the correct format.
Finished in 1155ms on 11 files using 4 threads.                                    exit 0

npx oxlint --config .oxlintrc.json --deny-warnings src                             exit 0 (no output)
```

**4.**

```text
PATH=/opt/npm11/bin:$PATH npm run docs
rows read: 1, disagreements found: 0                                               exit 0

PATH=/opt/npm11/bin:$PATH npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0                      exit 0

PATH=/opt/npm11/bin:$PATH npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0                      exit 0
```

No description paragraph moved, so `guides/server.md` needed no edit.

**5.**

```text
PATH=/opt/npm11/bin:$PATH npm run check
tsc --noEmit --project tsconfig.json && npm run check:src → tsc --noEmit -p configs/src/tsconfig.server.json
exit 0 (no diagnostics)

PATH=/opt/npm11/bin:$PATH npm run test:guides
Test Files  1 passed (1)
     Tests  37 passed (37)                                                         exit 0
```

## Deviation state

No deviation stop. `guides/server.md` was not touched — no gate required a `--to guide` write, so
the guide-write clause of the scope did not fire.
