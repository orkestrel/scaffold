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

After the rewrites, the same sweep (mirrors excluded) returns no hits at all.

## Rewrites (file:line before → after)

- `src/server/helpers.ts:249` "... resolve it first via" → "... resolve it first through"
- `src/server/helpers.ts:400` "// via `crypto.subtle.verify` ..." → "// through `crypto.subtle.verify` ..."
- `src/server/helpers.ts:412` "signed via `crypto.subtle.sign('HMAC', …)`" → "signed by using `crypto.subtle.sign('HMAC', …)`"
- `src/server/helpers.ts:455` "candidate via" → "candidate through"
- `src/server/helpers.ts:830` "response body via WebCrypto." → "response body by using WebCrypto."
- `src/server/helpers.ts:882` " * via {@link unwrapETag}" → " * through {@link unwrapETag}"
- `src/server/helpers.ts:1331` "transparently via `DecompressionStream`" → "transparently through `DecompressionStream`"
- `src/server/helpers.ts:1408` "is parsed via `@orkestrel/contract`'s" → "is parsed by using `@orkestrel/contract`'s"
- `src/server/constants.ts:47` "raises it via {@link ...}" → "raises it through {@link ...}"
- `src/server/Server.ts:53` "is built via the router's" → "is built through the router's"
- `src/server/Server.ts:54` "stop signal via `@orkestrel/abort`'s" → "stop signal through `@orkestrel/abort`'s"
- `src/server/Server.ts:57` "stop signal via `AbortSignal.any`," → "stop signal through `AbortSignal.any`,"
- `src/server/Server.ts:58` "is built via" → "is built through"
- `src/server/Server.ts:61` "written back via `sendResponse`." → "written back through `sendResponse`."
- `src/server/types.ts:78` "thread data via `context.state`" → "thread data through `context.state`"
- `src/server/types.ts:153` "connection via {@link ...}" → "connection through {@link ...}"
- `src/server/types.ts:574` "registered via" → "registered through"
- `src/server/types.ts:624` "added later via `use`." → "added later by using `use`."
- `src/server/types.ts:712` "is built via the router's" → "is built through the router's"
- `src/server/types.ts:715` "written back via `sendResponse`" → "written back through `sendResponse`"
- `src/server/errors.ts:15` "shared across every copy via the global symbol registry)" → "shared across every copy through the global symbol registry)"
- `src/server/errors.ts:115` "interned via `Symbol.for`," → "interned by using `Symbol.for`,"
- `tests/src/server/helpers.test.ts:160` "substitutes the downstream request via next(newRequest)" → "substitutes the downstream request by using next(newRequest)"
- `tests/src/server/Server.test.ts:1346` "an SSE route via createStream" → "an SSE route through createStream"
- `guides/server.md:6` "negotiation via `Negotiator`," → "negotiation through `Negotiator`,"
- `guides/server.md:8` "binding `node:http` via `@orkestrel/router`'s" → "binding `node:http` through `@orkestrel/router`'s"
- `guides/server.md:349` "comparison is constant-time via" → "comparison is constant-time through"
- `guides/server.md:371` "is LINKED, via `@orkestrel/abort`'s `linkSignal`," → "is LINKED, through `@orkestrel/abort`'s `linkSignal`,"

No table cell in `guides/server.md` changed width; `npx oxfmt --config .oxfmtrc.json --check` confirmed the tree is formatted. No line in `tests/guides.test.ts` transcribes a rewritten guide sentence.

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

Report file: `/home/user/scaffold/tmp/units/followon/server-prose-report.md`
