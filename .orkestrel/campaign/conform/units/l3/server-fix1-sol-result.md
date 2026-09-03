## Replaced cells
- `guides/server.md:93` — Clear a cookie by setting an immediately-expiring `Set-Cookie`.
- `guides/server.md:105` — Compute a content `ETag` over a fully-buffered response body by using WebCrypto.
- `guides/server.md:122` — Narrow an unknown caught value to an `HTTPError` (including subclasses) — recognized across package copies through a structural brand fallback.

## Comment
`src/server/validators.ts:7-9`:

> This file sits at the bottom of the module's graph beside `helpers.ts`, imports the `node:net` address type and the `@orkestrel/contract` guards, and never an implementation class.

## Claim 3 sweep
| Purpose | Pattern and paths | Result |
|---|---|---|
| server-obj-10 sentinel removed | `grep -rnE "resolvePort"` over `src`, `tests`, `guides/server.md`, `guides/README.md`, `README.md` | Empty. |

## server-subj-4 green
Command:

`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/helpers.test.ts`

Result: 130 passed.

Capture: `/home/user/work/evidence/server-proofs/subj-4-green.txt`

## server-obj-10 sentence
> The branch stays unproved by a narrow control; the row's evidence is the reachability argument and the live-path control.

## `via` sweep
Pattern: `\bvia\b`, case-insensitive.

Paths: `src`, `tests`, `guides/server.md`, `guides/README.md`, `README.md`. Vendored guide mirrors were excluded.

Surviving hits:
- `src/server/helpers.ts:249,400,412,455,832,884,1333,1410`
- `src/server/constants.ts:47`
- `src/server/Server.ts:53,54,57,58,61`
- `src/server/types.ts:78,153,574,625,713,716`
- `src/server/errors.ts:15,115`
- `tests/src/server/helpers.test.ts:160`
- `tests/src/server/Server.test.ts:1346`
- `guides/server.md:6,8,349,371`

Ruling: every surviving hit means `through` or `by using`, so it is banned. Each lies outside the brief’s owned cells and remains unchanged.

## `git status --short`
```text
 M README.md
 M guides/README.md
 M guides/server.md
 M src/server/Server.ts
 M src/server/Stream.ts
 M src/server/constants.ts
 M src/server/errors.ts
 M src/server/helpers.ts
 M src/server/index.ts
 M src/server/types.ts
 A src/server/validators.ts
 M tests/guides.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/src/server/Negotiator.test.ts
 M tests/src/server/Stream.test.ts
 M tests/src/server/helpers.test.ts
 A tests/src/server/validators.test.ts
```

## Exit codes
- `npm run format:check`: 0
- `npm run lint:check`: 0
- `npm run check`: 0
- `npm run test:guides`: 0