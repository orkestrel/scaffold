# Unit server-prose — report

## Sweep record

Command: `grep -rniE '\bvia\b' src tests guides/server.md guides/README.md README.md` (vendored set and `node_modules` excluded).

Landed-tip hits, each ruled banned-sense and rewritten:

- `src/server/helpers.ts:249,400,412,455,830,882,1331,1408`
- `src/server/constants.ts:47`
- `src/server/Server.ts:53,54,57,58,61`
- `src/server/types.ts:78,153,574,624,712,715`
- `src/server/errors.ts:15,115`
- `tests/src/server/helpers.test.ts:160`
- `tests/src/server/Server.test.ts:1346`
- `guides/server.md:6,8,349,371`

No hits in `guides/README.md` or `README.md`. No hit sat in a code identifier; every hit was a preposition meaning through or by using.

After the rewrites, the same sweep (mirrors excluded) returns no hits at all — no permitted `via` uses exist in this scope.

## Rewrites (file:line before → after)

- `src/server/helpers.ts:249` " * `secure` here falls to OFF — request-aware callers resolve it first via" → "... first through"
- `src/server/helpers.ts:400` "// via `crypto.subtle.verify` — constant-time internally, so the old" → "// through `crypto.subtle.verify` ..."
- `src/server/helpers.ts:412` " * the signature), signed via `crypto.subtle.sign('HMAC', …)` under the FIRST" → "... signed by using `crypto.subtle.sign(...)` ..."
- `src/server/helpers.ts:455` " * HMAC-SHA256 signature against EACH {@link TokenSecret} candidate via" → "... candidate through"
- `src/server/helpers.ts:830` " * Computes a CONTENT `ETag` over a fully-buffered response body via WebCrypto." → "... body by using WebCrypto."
- `src/server/helpers.ts:882` " * via {@link unwrapETag} before comparing the opaque body). TOTAL — a" → " * through {@link unwrapETag} ..."
- `src/server/helpers.ts:1331` " * transparently via `DecompressionStream`, capping the DECOMPRESSED output —" → "... transparently through `DecompressionStream` ..."
- `src/server/helpers.ts:1408` " * content type: `application/json` is parsed via `@orkestrel/contract`'s" → "... parsed by using `@orkestrel/contract`'s"
- `src/server/constants.ts:47` " * consumer raises it via {@link import('./types.js').BodyOptions}" → "... raises it through {@link ...}"
- `src/server/Server.ts:53` " *   `close`); a `Request` is built via the router's `buildRequest`, its" → "... built through the router's ..."
- `src/server/Server.ts:54` " *   `signal` LINKED to this run's stop signal via `@orkestrel/abort`'s" → "... signal through `@orkestrel/abort`'s"
- `src/server/Server.ts:57` " *   teardown, composes with the server's stop signal via `AbortSignal.any`," → "... signal through `AbortSignal.any`,"
- `src/server/Server.ts:58` " *   so a handler awaiting `request.signal` observes BOTH); `context.state` is built via" → "... is built through"
- `src/server/Server.ts:61` " *   written back via `sendResponse`." → " *   written back through `sendResponse`."
- `src/server/types.ts:78` " * without calling `next`), or thread data via `context.state` — no mutable" → "... thread data through `context.state` ..."
- `src/server/types.ts:153` " *   connection via {@link import('./helpers.js').resolveSecure} — `Secure` on" → "... connection through {@link ...}"
- `src/server/types.ts:574` " * Represents a raw `node:http` protocol-upgrade claimant — registered via" → "... registered through"
- `src/server/types.ts:624` " *   more may be added later via `use`." → " *   more may be added later by using `use`."
- `src/server/types.ts:712` " * idempotent teardown. Per request: a `Request` is built via the router's" → "... is built through the router's"
- `src/server/types.ts:715` " * written back via `sendResponse` — every escaping throw is caught by the" → " * written back through `sendResponse` ..."
- `src/server/errors.ts:15` "// shared across every copy via the global symbol registry) plus the exact" → "// shared across every copy through the global symbol registry) ..."
- `src/server/errors.ts:115` " * the cross-copy brand (interned via `Symbol.for`, so every copy resolves the" → "... interned by using `Symbol.for`, ..."
- `tests/src/server/helpers.test.ts:160` "	it('substitutes the downstream request via next(newRequest)', async () => {" → "... by using next(newRequest)', ..."
- `tests/src/server/Server.test.ts:1346` "	it('an SSE route via createStream is consumed incrementally by fetch', async () => {" → "... route through createStream ..."
- `guides/server.md:6` "> negotiation via `Negotiator`, ETag/Range, security primitives, SSE, and the" → "... negotiation through `Negotiator`, ..."
- `guides/server.md:8` "> binding `node:http` via `@orkestrel/router`'s adapter helpers, the upgrade" → "... binding `node:http` through `@orkestrel/router`'s ..."
- `guides/server.md:349` "   and verifies against ANY; comparison is constant-time via" → "... constant-time through"
- `guides/server.md:371` "    `buildRequest`) is LINKED, via `@orkestrel/abort`'s `linkSignal`, to the" → "... LINKED, through `@orkestrel/abort`'s `linkSignal`, ..."

No cell in a `guides/server.md` table changed width; `npx oxfmt` confirmed no reformat needed (see § Gates). No line in `tests/guides.test.ts` transcribed a rewritten guide sentence.

## Gates

- `npm run format:check` — exit 0.
- `npm run lint:check` — exit 0.
- `npm run check` — exit 0.
- `npm run test:guides` — exit 0 (33 passed).
- `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/helpers.test.ts tests/src/server/Server.test.ts` — exit 0 (190 passed, 1 skipped).

## git status --short

```
 M guides/server.md
 M src/server/Server.ts
 M src/server/constants.ts
 M src/server/errors.ts
 M src/server/helpers.ts
 M src/server/types.ts
 M tests/src/server/Server.test.ts
 M tests/src/server/helpers.test.ts
```

All listed files are owned files; no vendored, off-limits, or `package.json` file changed.
