# Unit conform-server — report

Every row is `applied` or `noop`. No row stopped. The gate chain is green.

## Consumer edits taken

Applied before any row, as the addendum directs.

| Edit                                         | Disposition | Evidence                                                                                                                                                                                                                                                                        |
| -------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| guide's `symbol.kind` → `symbol.keyword`     | `applied`   | The line now reads `.filter((symbol) => symbol.keyword === 'function')` at `tests/guides.test.ts:131`. `npm run check` failed at the committed baseline with `tests/guides.test.ts(120,32): error TS2339: Property 'kind' does not exist on type 'SurfaceSymbol'` (`baseline-check.txt`) and exits 0 after (`addendum-1-check-after.txt`). |
| router's landed renames                      | `noop`      | `grep -rnw "route" src tests` returns only prose occurrences of the English word — no `route` import and no `route(` call from `@orkestrel/router`. The package's only `@orkestrel/router` value imports are `createDispatcher`, `buildRequest`, `isEncryptedSocket`, and `sendResponse`.                                                    |
| codec's `encodeHex`                          | `applied`   | Adopted through server-obj-3. The installed declaration at `node_modules/@orkestrel/codec/dist/src/core/index.d.ts` exports `encodeHex(bytes: Uint8Array): string`.                                                                                                              |
| mirrors `guides/guide.md`, `guides/emitter.md`, `guides/contract.md` | `noop` | Not edited. They refresh at the wave.                                                                                                                                                                                                                                             |

## Rows

| Row              | Disposition | Note                                                                                                                                    |
| ---------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| server-obj-1     | `applied`   | `isAddressInfo` moved to `src/server/validators.ts`, barrelled before `helpers.js`, mirrored by `tests/src/server/validators.test.ts`.  |
| server-obj-2     | `applied`   | The double-`next` guard rejects with `new ServerError('NEXT', …)`; `ServerErrorCode` gained `'NEXT'`.                                   |
| server-obj-3     | `applied`   | `computeBodyETag` uses `encodeHex` from `@orkestrel/codec`; the hand-rolled `Array.from(...).join('')` is gone.                         |
| server-obj-4     | `applied`   | `tests/guides.test.ts` executes the flagship fences; the broken gzip fence in the guide is repaired.                                    |
| server-obj-5     | `applied`   | `buildContext` exported from `tests/setup.ts`; the copies in `helpers.test.ts` and `Negotiator.test.ts` deleted; `tests/setup.test.ts` proves the moved fixture. |
| server-obj-6     | `applied`   | `README.md` names the `engines` floor. Carries server-subj-3; not applied twice.                                                        |
| server-obj-7     | `applied`   | `README.md` names the ES and CommonJS builds the package actually ships.                                                                 |
| server-obj-8     | `applied`   | The contract item "Status machine + bound address + restart-fresh-abort" rewrapped at the three-space continuation indent. Whitespace only; no word changed. |
| server-obj-9     | `applied`   | The `drain()` sentence and the graceful-stop sentence rewritten; the file sweeps clean.                                                 |
| server-obj-10    | `applied`   | `probePort` and `Server.#listen` each reject with a `TypeError`; `Server.#resolvePort` deleted.                                         |
| server-obj-11    | `applied`   | `readBody`'s `@returns` and `@remarks` name the empty body and the malformed `application/json` body as the `undefined` outcomes; the guide row mirrors it. Behaviour unchanged. |
| server-obj-12    | `applied`   | One `@remarks` sentence on `HTTPError`. No code change.                                                                                 |
| server-subj-1    | `applied`   | The `AGENTS §22` citations in the opening sentence and in the See-also row removed from `guides/README.md`.                             |
| server-subj-2    | `applied`   | Every ordinal and tally struck; `codec.md` and the development mirrors described.                                                       |
| server-subj-4    | `applied`   | `requestEncoding` → `parseEncoding` across source, test, and guide. BREAKING; see § Breaking.                                           |
| server-subj-6    | `applied`   | `for (const member of value)` in `scrubPrototype`.                                                                                       |
| server-subj-8    | `applied`   | `id`, `status`, `port`, `dispatcher`, `emitter`, `use`, and `upgrade` carry doc blocks.                                                 |
| server-subj-9    | `applied`   | `encoding`'s summary and `@remarks` state the divergence; guide and test pin it.                                                        |
| server-subj-10   | `applied`   | `resolveSecure`'s `encrypted` tag and `computeBodyETag`'s `weak` tag use the fixed "If `true`, …; if `false`, …" form.                  |
| server-subj-11   | `applied`   | `Stream` merges caller headers with `Headers.set`; the casing caveat is gone from every artifact that carried it.                       |
| fleet-F1         | `noop`      | `grep -rn "isBrowserVuePath" tests vite.config.ts` returns nothing. The helper is absent from `tests/setup.ts` and from `tests/setup.test.ts`, so this row makes no edit. |
| fleet-F2         | `applied`   | `Server`'s public `readonly id` became `readonly #id` (first `#` field) plus `get id()` (first getter). Precondition checked: `grep -rn "JSON.stringify" src tests/src tests/guides.test.ts guides/server.md README.md` returns cookie/token/request-body sites only — no `Server` instance is serialized anywhere. |

## Files touched

| File                                  | Change                                                                                                                                     |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/server/validators.ts`            | New. Holds `isAddressInfo` with its TSDoc, the module's guard file.                                                                         |
| `src/server/helpers.ts`               | `ServerError('NEXT')` rejection, `encodeHex`, `parseEncoding` rename, `member` binding, `probePort` `TypeError`, boolean and `readBody` TSDoc, `isAddressInfo` removed. |
| `src/server/Server.ts`                | `#id` field plus `id` getter first, `#resolvePort` deleted, `#listen` narrows the bound address and rejects a `TypeError`.                  |
| `src/server/types.ts`                 | `ServerErrorCode` gained `'NEXT'`, `ServerInterface` members documented, `encoding` divergence documented, `StreamOptions.headers` caveat removed, `start` rejection documented. |
| `src/server/errors.ts`                | `ServerError` summary and `@remarks` widened, module comment corrected, `HTTPError` records its `status` discriminator.                     |
| `src/server/Stream.ts`                | Header merge through `Headers.set`; the casing caveat removed from the class TSDoc.                                                          |
| `src/server/constants.ts`             | `SSE_HEADERS` no longer says "these exact keys".                                                                                             |
| `src/server/index.ts`                 | `export * from './validators.js'` between `errors.js` and `helpers.js`.                                                                     |
| `tests/src/server/validators.test.ts` | New. Mirrors `src/server/validators.ts`.                                                                                                    |
| `tests/src/server/helpers.test.ts`    | `ServerError`/`NEXT` assertions, the known SHA-256 digest case, `parseEncoding` rename, `isAddressInfo` block moved out, shared `buildContext`. |
| `tests/src/server/Negotiator.test.ts` | Shared `buildContext`; new empty-header divergence case.                                                                                    |
| `tests/src/server/Stream.test.ts`     | The seam-owned key replaces in any casing.                                                                                                  |
| `tests/setup.ts`                      | Exports `buildContext` with its TSDoc.                                                                                                      |
| `tests/setup.test.ts`                 | Proves `buildContext` instead of the export-free surface.                                                                                   |
| `tests/guides.test.ts`                | `symbol.keyword`; a `guide fences` block executing the flagship fences.                                                                     |
| `guides/server.md`                    | `ServerError`/`ServerErrorCode`/`isServerError`/`SSE_HEADERS`/`readBody` rows, `parseEncoding` row, the contract items "Status machine + bound address + restart-fresh-abort", "Graceful drain is event-driven, never a busy-loop", "Seam semantics: returning onion", and "SSE producers can cooperate with real process-local transport backpressure", the `NegotiatorInterface` divergence paragraph, the repaired gzip fence, the Tests list. |
| `guides/README.md`                    | The `AGENTS §22` citations, every ordinal, the `codec.md` paragraph, the development-mirror paragraph.                                      |
| `README.md`                           | The runtime floor and the build formats.                                                                                                    |

Diffstat: 18 files changed, 469 insertions(+), 227 deletions(-).

## Failing-first controls

Each file sits under `/home/user/work/evidence/server-proofs/`.

| Row / edit         | Command                                                                                                     | Red                                     | Green                              |
| ------------------ | ----------------------------------------------------------------------------------------------------------- | --------------------------------------- | ---------------------------------- |
| addendum `keyword` | `npm --prefix /home/user/fleet/server run check`                                                            | exit 2, one TS2339 (`baseline-check.txt`) | exit 0 (`addendum-1-check-after.txt`) |
| server-obj-1       | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/validators.test.ts` | 1 failed, 1 passed (`obj-1-planted-red.txt`) | 2 passed (`obj-1-green.txt`)   |
| server-obj-2       | `npm --prefix /home/user/fleet/server run test:src:server`                                                   | 1 failed, 257 passed, 1 skipped (`obj-2-red.txt`) | 259 passed, 1 skipped (`obj-10-green.txt`) |
| server-obj-3       | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/helpers.test.ts -t "ETag"` | 1 failed, 6 passed, 123 skipped (`obj-3-planted-red.txt`) | 7 passed, 123 skipped (`obj-3-green.txt`) |
| server-obj-4       | `npm --prefix /home/user/fleet/server run test:guides`                                                       | 1 failed, 32 passed (`obj-4-red.txt`)   | 33 passed (`obj-4-green.txt`)      |
| server-obj-5       | `npm --prefix /home/user/fleet/server run test:setup`                                                        | 1 failed, 13 passed (`obj-5-planted-red.txt`) | 14 passed (`obj-5-green.txt`)  |
| server-obj-10      | `npm --prefix /home/user/fleet/server run test:src:server`                                                   | 55 failed, 204 passed, 1 skipped (`obj-10-planted-red.txt`) | 259 passed, 1 skipped (`obj-10-green.txt`) |
| server-subj-4      | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/helpers.test.ts` | 5 failed, 125 passed (`subj-4-red.txt`) | 130 passed (`subj-4-green.txt`) |
| server-subj-9      | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/Negotiator.test.ts` | 2 failed, 25 passed (`subj-9-planted-red.txt`) | 27 passed (`subj-9-green.txt`) |
| server-subj-11     | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/Stream.test.ts` | 1 failed, 10 passed (`subj-11-red.txt`) | 11 passed (`subj-11-green.txt`)    |

**Which reds are natural and which are planted.** server-obj-2, server-obj-4, server-subj-4, and server-subj-11 reddened against the shipped defect: the double-`next` rejection was a bare `Error`, the guide's gzip fence executed as written rejects with `HTTPError: malformed compressed request body` at `helpers.ts:1387`, `parseEncoding` did not exist, and a re-cased seam key produced `text/event-stream; charset=utf-8, text/plain`. server-obj-1, server-obj-3, server-obj-5, server-obj-10, and server-subj-9 have no reachable defect vector, so each ran a planted-wrong control and the plant was undone by editing the same line back:

- server-obj-1: `isAddressInfo` returned `false` unconditionally.
- server-obj-3: `encodeHex(...).toUpperCase()`.
- server-obj-5: `buildContext` returned `method: 'POST'`.
- server-obj-10: both new guards inverted to `if (isAddressInfo(address)) throw`, restoring the `0` result.
- server-subj-9: `Negotiator.encoding` given `negotiate`'s first-offered fallback on an empty entry list.

**server-obj-10 has no natural red, and that is the row's own finding.** Invariant: a listener bound to a numeric port yields an `AddressInfo`, so the `isAddressInfo` guards in `Server.#listen` and `probePort` narrow Node's `address()` union (`string | AddressInfo | null`) and throw a `TypeError` for the members this path cannot produce, in place of the removed `0` sentinel. Constraint: no listener-injection seam is added to fake Node's return, because the rule against coordination machinery for a requirement nobody wrote binds. Interface: a comment at each guard states that the branch is unreachable through `listen(port)` and exists for the union's other members, while the members retain their `@throws` rows. Claim 4 reads the branch as an exempt, documented gap. The row's evidence is the reachability argument and the live-path control: inverting the guards reddens 55 cases across `helpers.test.ts`, `Server.test.ts`, and `factories.test.ts`.

**Rows with no behavioural control.** server-obj-6, server-obj-7, server-obj-8, server-obj-9, server-obj-11, server-obj-12, server-subj-1, server-subj-2, server-subj-6, server-subj-8, and server-subj-10 are documentation, prose, or a loop-binding rename with no observable behaviour. Their evidence is the sweeps below plus the gate chain.

## Sweeps

Each pattern ran over the paths named beside it. The vendored dependency mirrors `guides/<dep>.md` are excluded from every sweep of package-owned prose, because they are fetched bytes.

| Purpose                                | Pattern and paths                                                                                                                            | Result                                                                                                            |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| server-subj-4 old name, with inflections | `grep -rniE '\brequestEncoding(s|ed|ing)?\b'` over `src`, `tests`, `guides/server.md`, `guides/README.md`, `README.md` | Empty.                                                                                                            |
| server-subj-4 new name is reachable    | `grep -rnw "parseEncoding"` over the same paths                                                                                              | `src/server/helpers.ts` (declaration, `@example`, `readBody` call site), `tests/src/server/helpers.test.ts`, `guides/server.md` Helpers row. |
| server-subj-6 rejected generic words   | `grep -rnE '\b(item|items|info|thing|obj|cfg|msg|doc)\b'` over `src`, `tests`, `guides/server.md`, `guides/README.md`, `README.md` | Permitted hits: `tests/src/server/helpers.test.ts:747` is the unsupported `items` range-unit fixture; `tests/config.test.ts:2` is vendored prose outside the unit; `guides/server.md:327` refers to the numbered contract item. `tests/distribution.test.ts:177`, `:427`, and `:583` use `thing` as an English prose referent, and `tests/config.test.ts:687` calls the `console.info` API. No rejected identifier remains. |
| server-obj-8 old continuation form     | `grep -rnE '^stopping → stopped'` over `src`, `tests`, `guides/server.md`, `guides/README.md`, `README.md`                                      | Empty. The contract continuation no longer starts at column zero.                                                 |
| server-obj-11 old `readBody` return    | ``grep -rnE '@returns The parsed JSON value, the raw text, or `undefined` for an empty body'`` over the same paths                             | Empty. The return text names the empty and malformed-JSON outcomes.                                               |
| server-obj-12 old `HTTPError` shape    | `grep -rnE 'readonly code'` over the same paths                                                                                               | `src/server/errors.ts:164` is the permitted `ServerError.code`; `HTTPError` has no `code`, and its `@remarks` records `status` as the discriminator. This additive documentation repair removed no literal wording. |
| server-subj-8 old undocumented members | ``grep -rnE 'readonly id: string|readonly status: ServerStatus|readonly port: number \| undefined|readonly dispatcher: DispatcherInterface<TState>|readonly emitter: EmitterInterface<ServerEventMap>|use\(middleware: MiddlewareHandler<TState>\): void|upgrade\(handler: UpgradeHandler\): void'`` over the same paths | The relevant declarations are `src/server/types.ts:722`, `:724`, `:729`, `:733`, `:735`, `:745`, and `:752`; each has an immediately preceding TSDoc block. Other hits are implementation declarations at `src/server/Server.ts:185` and `:192`, another documented dispatcher member at `src/server/types.ts:671`, and a policy fixture at `tests/setupPolicy.ts:2882`. This additive repair removed no literal wording, so the sweep rules the candidate member sites. |
| server-subj-10 old boolean tags        | ``grep -rnE '@param encrypted - The connection.s TLS flag \(\{@link.*encrypted\}\)$|@param weak - `true` for a weak'`` over the same paths   | Empty. Each tag uses the fixed `If true; if false` form.                                                          |
| server-obj-9 `should`                  | `grep -rni "should"` over `guides/server.md`, `guides/README.md`, `README.md`, `src`, `tests/src`, `tests/setup.ts`, `tests/setup.test.ts`, `tests/guides.test.ts`, `tests/setupServer.ts` | Empty.                                                                                                            |
| server-obj-10 sentinel removed, with inflections | `grep -rniE '\bresolvePort(s|ed|ing)?\b'` over `src`, `tests`, `guides/server.md`, `guides/README.md`, `README.md`                           | Empty.                                                                                                            |
| server-obj-1 placement                 | `grep -rnE "isAddressInfo"` over `src`, `tests/src`, `README.md`, `guides/README.md`, `guides/server.md`                                     | Declared only in `src/server/validators.ts`; imported by `helpers.ts` and `Server.ts` from `./validators.js`; tested in `tests/src/server/validators.test.ts`; one Helpers row and one Tests row in the guide. |
| server-subj-1 numbered citations       | `grep -rnE "AGENTS §\|§2[0-9]"` over the same paths                                                                                          | Empty.                                                                                                            |
| server-obj-6 / server-obj-7 old claims | `grep -rnE "Node\.js >= 24\|ESM-only"` over the same paths                                                                                   | `tests/distribution.test.ts:60` is permitted: `ESM-only` has the declaration-file sense in a vendored file outside this unit. |
| addendum old member                    | `grep -rnE "symbol\.kind"` over the same paths                                                                                               | Empty.                                                                                                            |
| server-subj-2 number words             | `grep -rniE "\b(one\|two\|three\|four\|five\|six\|seven\|eight\|nine\|ten\|first\|second\|third\|fourth\|fifth)\b"` over `guides/README.md`   | Ruled by sense: the surviving hits are all `one of this package's runtime dependencies`, which names membership rather than tallying the set. No ordinal remains. |
| server-subj-2 numeral counts           | `grep -rnE "\b[0-9]+ (elements\|members\|rules\|rows\|exports\|files\|options\|steps\|cases\|stages\|findings\|tests\|helpers\|methods\|entities\|tables\|sections\|constants\|passes\|categories)\b"` over `guides/README.md`, `guides/server.md`, `README.md`, `src`, `tests/setup.ts`, `tests/setup.test.ts`, `tests/guides.test.ts`, `tests/src` | Empty.                                                                                                            |
| fleet-F1 subject                       | `grep -rn "isBrowserVuePath"` over `tests`, `vite.config.ts`                                                                                 | Empty. The helper does not exist in this workspace.                                                               |
| fleet-F2 precondition                  | `grep -rn "JSON.stringify"` over `src`, `tests/src`, `tests/guides.test.ts`, `guides/server.md`, `README.md`                                 | Cookie `Domain`/`Path` diagnostics, the token payload, one test's tampered payload, one request body. No `Server` instance is serialized, so the getter loses nothing. |
| addendum router sweep                  | `grep -rnw "route"` over `src`, `tests`                                                                                                      | Only the English word in prose. No `route` import or `route(` call from `@orkestrel/router`.                     |
| authored prose, `above` / `below`      | `git diff -U0 -- src tests README.md guides \| grep -E "^\+.*\b(above\|below)\b"`                                                            | Empty after the repair. One added comment in `tests/guides.test.ts` read "Every case below transcribes"; it now reads "Each case in this block transcribes". |
| authored prose, temporal `once`        | `git diff -U0 … \| grep -E "^\+.*[Oo]nce "`                                                                                                  | One hit, ruled permitted: "minted once per `Server`" uses `once` as a frequency, not as `after`.                  |
| server-subj-11 caveat removed          | `grep -rn "casing\|re-cased\|comma-joined"` over `src`, `guides/server.md`, `tests/src`                                                       | Only the corrected sentences ("replaces the seam's value, in any casing"), the implementation comment explaining why `Headers.set` is used, the test name, and an unrelated `parseEncoding` remark about a comma-joined multi-coding header. |

## Gates

Ran in order after converging with `npm run lint` then `npm run format`. Each log sits under `/home/user/work/evidence/server-proofs/`.

| Gate                | Command                                         | Exit | Reading                                                                                     | Log                       |
| ------------------- | ----------------------------------------------- | ---- | --------------------------------------------------------------------------------------------- | ------------------------- |
| `npm run format:check` | `npm --prefix /home/user/fleet/server run format:check` | 0    | 53 files checked                                                                            | `final-1-format-check.txt` |
| `npm run lint:check`   | `npm --prefix /home/user/fleet/server run lint:check`   | 0    | no diagnostics                                                                              | `final-2-lint-check.txt`   |
| `npm run check`        | `npm --prefix /home/user/fleet/server run check`        | 0    | root project and `configs/src/tsconfig.server.json` both clean                               | `final-3-check.txt`        |
| `npm run build`        | `npm --prefix /home/user/fleet/server run build`        | 0    | ES and CJS emitted, `index.d.cts` copied                                                     | `final-4-build.txt`        |
| `npm test`             | `npm --prefix /home/user/fleet/server test`             | 0    | `src:server` 260 passed / 1 skipped; `policy` 111 passed; `config` 46 passed; `setup` 14 passed; `guides` 33 passed | `final-5-test.txt`         |

The one skipped case is pre-existing and outside this unit: `tests/src/server/Server.test.ts` runs `it.skipIf(!BINDS_IPV6)` on the IPv6-literal host case, and this container binds no `::1`. It was skipped at the committed baseline too (`obj-2-red.txt` reports the same 1 skipped).

`git status --short` reports every entry inside Owned and nothing outside it: `README.md`, `guides/README.md`, `guides/server.md`, `src/server/Server.ts`, `src/server/Stream.ts`, `src/server/constants.ts`, `src/server/errors.ts`, `src/server/helpers.ts`, `src/server/index.ts`, `src/server/types.ts`, `tests/setup.ts`, `tests/setup.test.ts`, `tests/guides.test.ts`, `tests/src/server/Negotiator.test.ts`, `tests/src/server/Stream.test.ts`, `tests/src/server/helpers.test.ts`, and the untracked additions `src/server/validators.ts` and `tests/src/server/validators.test.ts`. No vendored file, no `package.json`, no `configs/`, no `node_modules`.

## Breaking

**server-subj-4 — `requestEncoding` renamed to `parseEncoding`.**

The exported name moved. `@orkestrel/server` no longer exports `requestEncoding`.

Consumer edit each importer needs:

```ts
// before
import { requestEncoding } from '@orkestrel/server'
const encoding = requestEncoding(request.headers.get('content-encoding'))

// after
import { parseEncoding } from '@orkestrel/server'
const encoding = parseEncoding(request.headers.get('content-encoding'))
```

No fleet package needs it. I ran
`grep -rnw --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=.git "requestEncoding" /home/user/fleet`
after the rename, and every surviving hit is a vendored mirror line:

```text
/home/user/fleet/ollama/guides/server.md:121:| `requestEncoding` | function | Narrow a raw `Content-Encoding` header to a decompressible `Encoding`. |
/home/user/fleet/middleware/guides/server.md:121:| `requestEncoding` | function | Narrow a raw `Content-Encoding` header to a decompressible `Encoding`. |
/home/user/fleet/toolbox/guides/server.md:121:| `requestEncoding` | function | Narrow a raw `Content-Encoding` header to a decompressible `Encoding`. |
/home/user/fleet/mcp/guides/server.md:121:| `requestEncoding` | function | Narrow a raw `Content-Encoding` header to a decompressible `Encoding`. |
```

Those are mirrors of this package's own guide, and they refresh at the wave rather than by hand. No source file in any declared consumer imports the symbol. The same sweep for `parseEncoding` returns only this package's files, so the new name collides with nothing in the fleet.

**server-subj-11 — the SSE header merge changed its observable result for a re-cased key.** Not a signature change. Before: `new Stream({ headers: { 'content-type': 'text/plain' } })` produced `text/event-stream; charset=utf-8, text/plain`. After: it produces `text/plain`. No consumer in the fleet closure depended on the append outcome, because that outcome is not a valid `Content-Type`. Record this in the commit message.

**server-obj-2 — the double-`next` rejection reason changed class.** The message text is unchanged, so a consumer matching on the message still matches. A consumer matching `error instanceof Error` still matches, because `ServerError extends Error`. A consumer matching `error.constructor === Error` does not; none exists in the fleet.

## Shared-file patches

None. No row required an edit outside this checkout, and no vendored file in this checkout was touched.

## Deviations

None. No row stopped, and no name collided.

These ancillary questions I decided and carried on from, as the deviation contract permits:

1. **server-obj-10's literal placement does not compile.** The row says to read `const address = server.address()` inside `#listen`'s existing `try` and to use `address.port` after the `finally`. A `const` declared in the `try` block is out of scope after it. I declared `let port: number` before the `try`, assigned it inside the `try` after the address narrows, and used it after the `finally`. TypeScript accepts this because the `catch` clause's end point is unreachable — every path in it throws — so the only route past the statement is the `try`'s normal exit. `npm run check` exits 0. The row's substance is unchanged: no sentinel, a `TypeError` on the unresolvable address, the existing `catch` doing the cleanup, and `#resolvePort` deleted.
2. **`probePort` closes before it throws, without a duplicated branch.** The row says to close the probe and then throw. I read the address, close and await unconditionally, and then narrow and throw. Same observable order, with the close on a single path instead of repeated inside the rejection branch.
3. **`guides/README.md` paragraph order.** The row adds a `codec.md` paragraph "in the same shape" and a development-mirror paragraph, without fixing where they sit. I grouped the runtime mirrors first (contract, emitter, abort, router, timeout, codec) and the development mirrors last (guide, then probe/scaffold/test), moving whole paragraphs and changing no wording beyond the ordinals the row strikes.

These repairs the rows created rather than named, taken because leaving them would ship a false sentence the same round wrote:

- **`guides/server.md` § Tests.** Moving `isAddressInfo` made that section's claim about `helpers.test.ts` false and left `tests/src/server/validators.test.ts` unlisted. I corrected the `helpers.test.ts` entry, added a `validators.test.ts` entry, and named the empty-header divergence in the `Negotiator.test.ts` entry.
- **`types.ts` and the guide's contract item "Seam semantics: returning onion".** Widening `ServerErrorCode` made "A `ServerError` reports a lifecycle refusal" and "a SECOND call … REJECTS" (with no named class) incomplete. Each now names `'NEXT'` and states that the double-`next` rejection reaches the request boundary as a generic 500.

An addition beyond a row's literal text, recorded for audit: server-obj-3 is a substitution with no behavioural defect, so I added `computeBodyETag`'s known-digest case — `'"2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"'` for the ASCII text `hello`. The existing cases assert only the `W/"` prefix and determinism, which `.claude/rules/tests.md` calls asserting an implementation against itself. The published digest is a declaration that can disagree with the code.

## Evidence files

- `/home/user/work/evidence/conform-server.diff` — 1318 lines, written by `node /home/user/scaffold/tmp/work/evidence.mjs server`.
- `/home/user/work/evidence/conform-server.status` — 18 entries, from the same command, which ran `git add -N` on `src/server/validators.ts` and `tests/src/server/validators.test.ts`.
- `/home/user/work/evidence/server-proofs/` — every control and gate log named in this report.

## Fix round 1

Source: `/home/user/scaffold/.orkestrel/campaign/conform/units/l3/server-objective-r1-sol.md`.

- **O1.** At `guides/server.md:93`, `clearCookie` now says "by setting". At
  `guides/server.md:105`, `computeBodyETag` now says "by using WebCrypto". At
  `guides/server.md:122`, `isHTTPError` now says "through a structural brand
  fallback".
- **O2.** The comment at `src/server/validators.ts:7-9` says that the file sits
  at the bottom of the module's graph beside `helpers.ts`, imports the
  `node:net` address type and the `@orkestrel/contract` guards, and never an
  implementation class.
- **Claim 3.** `grep -rnE "resolvePort" src tests guides/server.md
  guides/README.md README.md` returned empty. The server-obj-10 sweep row now
  records that full population.
- **Claim 4.** Each abbreviated Vitest command in § Failing-first controls now
  carries `--config vite.config.ts --no-cache --reporter=dot`. The
  server-subj-4 green reran the red command and reports 130 passed in
  `/home/user/work/evidence/server-proofs/subj-4-green.txt`; its red capture is
  `/home/user/work/evidence/server-proofs/subj-4-red.txt`. The server-obj-10
  paragraph records that no narrow red can drive the unreachable branch and
  retains the reachability argument plus the live-path captures
  `/home/user/work/evidence/server-proofs/obj-10-planted-red.txt` and
  `/home/user/work/evidence/server-proofs/obj-10-green.txt`.

The acceptance captures are
`/home/user/work/evidence/server-proofs/fix1-format-check.txt`,
`/home/user/work/evidence/server-proofs/fix1-lint-check.txt`,
`/home/user/work/evidence/server-proofs/fix1-check.txt`, and
`/home/user/work/evidence/server-proofs/fix1-test-guides.txt`.

The O1 sweep used `grep -rniE "\bvia\b" src tests guides/server.md
guides/README.md README.md`. It excludes the vendored `guides/<dependency>.md`
mirrors. The owned hits at `guides/server.md:93`, `guides/server.md:105`, and
`guides/server.md:122` are gone. The sweep returned the following surviving
hits:

- `src/server/helpers.ts:249`, `:400`, `:412`, `:455`, `:832`, `:884`,
  `:1333`, and `:1410`
- `src/server/constants.ts:47`
- `src/server/Server.ts:53`, `:54`, `:57`, `:58`, and `:61`
- `src/server/types.ts:78`, `:153`, `:574`, `:625`, `:713`, and `:716`
- `src/server/errors.ts:15` and `:115`
- `tests/src/server/helpers.test.ts:160` and
  `tests/src/server/Server.test.ts:1346`
- `guides/server.md:6`, `:8`, `:349`, and `:371`

Every surviving hit uses `via` to mean `through` or `by using`, so every hit is
in the substitution table's banned sense. Each surviving hit is outside this
fix round's owned cells and remains unchanged.

## Fix round 2

Source: `/home/user/scaffold/.orkestrel/campaign/conform/units/l3/server-objective-r2-sol.md`.

- **R1 and Claim 4.** The comments before the `isAddressInfo` guards at
  `src/server/Server.ts` and `src/server/helpers.ts` state the unreachable
  `listen(port)` branch and the purpose of the union's other members. The
  server-obj-10 paragraph in § Failing-first controls records the invariant,
  constraint, and interface, and rules the branch an exempt, documented gap
  under claim 4. The `Node\.js >= 24|ESM-only` row in § Sweeps records the
  permitted hit at `tests/distribution.test.ts:60`.
- **O1.** The Quickstart case in `tests/guides.test.ts` passes its anonymous
  middleware directly to `server.use(...)` and retains every lifecycle
  assertion.
- **Claim 9.** No source or report edit carries this claim. The Orchestrator
  regenerated `/home/user/work/evidence/conform-server.diff` and
  `/home/user/work/evidence/conform-server.status` at 21:33 UTC, and the
  round-3 lanes read that evidence from the landing tree.

## Fix round 3

Source checker:
`/home/user/scaffold/.orkestrel/campaign/conform/units/l3/server-r3-checker-luna.result.md`.

The sweep used the pattern `AGENTS[^\n]*§|§ ?[0-9]+` over `src`, `tests/src`,
`tests/setup.ts`, `tests/setup.test.ts`, `tests/guides.test.ts`,
`tests/setupServer.ts`, `guides/server.md`, `guides/README.md`, and `README.md`.
The vendored `guides/<dependency>.md` mirrors were outside the population. The
final sweep returned no hit.

The initial sweep returned these hits and rewrites:

- `src/server/helpers.ts:126` — before: "never `as` (`AGENTS.md` §
  Non-negotiable rules), and total on hostile input." After: "never `as`, and
  remains total on hostile input."
- `src/server/helpers.ts:459` — before: "It then decodes + narrows the payload
  (`isRecord` + `typeof`, never `as` — `AGENTS.md` § Non-negotiable rules) and,
  when an expiry was bound in, rejects an expired token." After: "It then
  decodes + narrows the payload (`isRecord` + `typeof`, never `as`) and, when
  an expiry was bound in, rejects an expired token."
- `src/server/helpers.ts:512` — before: "reads it as UTF-8 JSON, narrows it to a
  record with a string `value` (`AGENTS.md` § Non-negotiable rules — never
  `as`), and rejects an expired `exp`." After: "reads it as UTF-8 JSON, narrows
  it to a record with a string `value` without `as`, and rejects an expired
  `exp`."
- `src/server/helpers.ts:828` — before: "compute/compare (RFC 7232 §2.3.2 WEAK
  comparison) and the TOTAL `Range` parser." After: "compute/compare (RFC 7232
  WEAK comparison) and the TOTAL `Range` parser."
- `src/server/helpers.ts:860` — before: "before the RFC 7232 §2.3.2 weak
  comparison." After: "before the RFC 7232 weak comparison."
- `src/server/helpers.ts:877` — before: "`ETag` — the RFC 7232 §2.3.2 WEAK
  comparison." After: "`ETag` — the RFC 7232 WEAK comparison."
- `src/server/constants.ts:4` — before: "inside THIS package (`AGENTS.md` §
  Design laws: a capability arrives with its first real consumer, never
  speculatively)." After: "inside THIS package: a capability arrives with its
  first real consumer, never speculatively."
- `tests/src/server/helpers.test.ts:703` — before: "matches weak-vs-strong per
  RFC 7232 §2.3.2". After: "matches weak-vs-strong per RFC 7232".
- `guides/server.md:11` — before: "package's, never re-implemented here
  (`AGENTS.md` § Design laws — mechanism, not product policy)." After:
  "package's, never re-implemented here — mechanism, not product policy."

A direct read found a split-line citation that the required same-line pattern
did not admit:

- `guides/server.md:650` — before: "`DispatcherInterface`; this package owns
  zero route matching (`AGENTS.md` § Design laws — mechanism, not product
  policy)." After: "`DispatcherInterface`; this package owns zero route
  matching — mechanism, not product policy."

### Orchestrator integration (21:45 UTC, after fix round 3 returned)

Fix round 3's sweep pattern (`§ ?[0-9]+`, the Orchestrator's own brief) reached the RFC 7232 section pointers in `src/server/helpers.ts` (the `computeBodyETag` and `matchesETag` doc lines) and `tests/src/server/helpers.test.ts:703`, which are not instruction citations; the Orchestrator restored `§2.3.2` at those sites from the fix round's before-and-after record (`npx oxfmt --check` exit 0 over both files). The `AGENTS §` removals stand.

## Fix round 4

Source: `/home/user/scaffold/.orkestrel/campaign/conform/units/l3/server-objective-r3-sol.md`.

- **R1.** `isAddressInfo` now checks `address` and `family` with the installed
  `isString` guard and checks `port` with `isNumber`, after `isRecord` narrows
  the input. Its `@remarks` names the members and their published
  `node:net` types.
- **R2.** Moving `id` to a getter is non-breaking for this fleet under the
  fleet-F2 precondition: no `Server` instance is spread or serialized. The
  release bump carries the enumerable-own-property shape change for outside
  consumers.
- **Guard control.** With the guard planted to check `port` alone,
  `/home/user/work/evidence/server-proofs/fix4-red.txt` reports 2 failed and
  3 passed: the port-only and non-string-family cases fail. After restoring
  the total guard,
  `/home/user/work/evidence/server-proofs/fix4-green.txt` reports 5 passed.
- **Sweep records.** § Sweeps carries the case-insensitive word-boundary and
  inflection forms for `requestEncoding` and `resolvePort`, the full-population
  generic-word reading, and the documentation-row readings for server-obj-8,
  server-obj-11, server-obj-12, server-subj-8, and server-subj-10.

### Orchestrator integration (22:24 UTC, after the re-run round-3 checker)

The re-run checker found one citation split across two comment lines at `src/server/types.ts:3-4` (`AGENTS.md` / `§ Non-negotiable rules`), which the single-line sweeps missed, and the Orchestrator's own line-by-line sweep found a second at `:584-585`. The Orchestrator removed both (the sentences keep "both `readonly`, both fetch/string-pure" and "no assertion at this boundary"; `npm run check` exit 0 afterwards) and swept `§` and `AGENTS` line by line over `src`, `tests/src`, the root setup and guides tests, `guides/server.md`, `guides/README.md`, and `README.md`: the surviving `§` hits are the RFC 7232 section pointers, and no `AGENTS` line remains.
