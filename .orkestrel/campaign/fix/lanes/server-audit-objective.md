<!-- task adab787ba1d0083cd.output -->
## Lane

OBJECTIVE (correctness, constraints, what the diff and contracts actually permit). Sol bench dark; this lane ran on the writer's engine in a clean context. Read-only; no shell (Read/Grep/Glob only).

## Per-claim verdicts

**1. Every brief row ends as applied, refused, or stopped; every refused row quotes the refusing rule — CONFIRMED.**
Evidence: `/home/user/scaffold/tmp/units/breaking/server-report.md:7-13` records s14-01, s14-03, s14-11, s14-12, s14-14, s14-02, s14-09 — the exact set the brief lists at `server-brief.md:22-31` — each as "applied". No row is refused or stopped, so the quoting obligation is inert.

**2. No old name survives under `src`, `tests`, `guides`; every new published symbol is declared in the owning `types.ts` where it is a contract — CONFIRMED (with one disclosed residual outside the unit's write scope).**
Evidence: word-boundary and case-insensitive searches over `/home/user/fleet/server` (excluding `node_modules`) for `openStream|enqueueStreamText|appendCookie|codingQuality|languageQuality|ipv6Network|clientRateKey|ConnectionInfo` return exactly one hit, `/home/user/fleet/server/guides/abort.md:91` — the vendored `@orkestrel/abort` guide mirror the brief places off-limits (`server-brief.md:119`) and the report discloses (`server-report.md:82`). Contracts: `ServerErrorCode` and `Connection` are declared in `/home/user/fleet/server/src/server/types.ts` (diff lines 971, 1030-1032); `StreamInterface`/`StreamOptions` pre-exist there; `Stream`, `ServerError`, `isServerError`, `createStream`, `pickCoding` are implementations in their kind-owning files and all reach the barrel through `/home/user/fleet/server/src/server/index.ts:1-8`.

**3. Each applied row lands in the ruled form, not a variant — BROKEN.**
The code rulings all land:
- s14-01 — `Stream` class at `/home/user/fleet/server/src/server/Stream.ts:50`, `createStream` factory at `factories.ts` (diff 496-498), `enqueueStreamText` folded in as `#enqueue` (`Stream.ts:125-128`), `openStream` deleted (diff 888-939).
- s14-03 — `appendCookie` deleted (diff 553-555); call sites read `headers.append('set-cookie', …)` at `helpers.ts` (diff 579, 597).
- s14-11 — `ServerError` + `ServerErrorCode` in the fleet shape; `Server.start` rejects with it (`/home/user/fleet/server/src/server/Server.ts:193`); `HTTPError.status` untouched (`errors.ts:56`); every `TypeError` constructor throw untouched (`Server.ts:115-139`).
- s14-12 — the four ruled `compute*` names (diff 625, 744, 768, 802), with `IPv6` acronym casing preserved.
- s14-14 — `Connection` replaces `ConnectionInfo` including `ConnectionStateFunction`'s parameter (diff 1048) and every `{@link}` target (diff 525, 789, 962, 980, 1042).
- Audit carriers — `pickCoding` is the single scoring leaf (diff 669-682) driven by both doors; the `tests/` citation sweep landed (diff 1079, 1092-1124, 1139, 1183, 1220, 1345).

The enumerated ruling "The report names mcp, toolbox, and middleware as carriers of the consequent edits" is not met. `server-report.md:7` names mcp and toolbox as following in their own units. Middleware appears only at `server-report.md:11`, and only to say a vendored mirror was not touched — never as a carrier. It is a real carrier: `/home/user/fleet/middleware/src/core/helpers.ts:15` imports `clientRateKey` from `@orkestrel/server` and calls it at line 42, and `/home/user/fleet/middleware/src/core/types.ts:2,278` declares `readonly connection?: ConnectionInfo`. Both imports are now broken names with no successor unit recorded.
What right looks like: the report's s14-12 and s14-14 rows each name `@orkestrel/middleware` as a carrier with the exact consequent edits — `clientRateKey → computeClientKey` at `middleware/src/core/helpers.ts:15,25,42` and `ConnectionInfo → Connection` at `middleware/src/core/types.ts:2,278` — stated the way mcp and toolbox are named at `server-report.md:7`.

**4. No compatibility alias, re-export shim, deprecated twin, or old-name fallback — CONFIRMED.**
Evidence: a search for `deprecated` and `export { … as … }` over `/home/user/fleet/server/src` returns no match, and the old-name sweep under claim 2 returns nothing in `src`. `negotiateEncoding` is not an alias: it survives as a pre-existing public door with a different contract (raw header versus parsed entries) that composes `parseAcceptHeader` with `pickCoding` (diff 708-714).

**6. The tree holds only owned files changed — CONFIRMED.**
Evidence: `/home/user/scaffold/tmp/units/breaking/server.status:1-19` lists `README.md`, `guides/server.md`, seven `src/server/*` files, `tests/setup.ts`, `tests/setupServer.ts`, five `tests/src/server/*` files, and two untracked owned files. Nothing under `.claude/`, `configs/`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `package.json`, `package-lock.json`, or `guides/<other-package>.md`.

**7. Gate commands exit as reported — UNRESOLVED, not NOT-EVIDENCED.** The report quotes both the exact command and the exit code for each gate at `server-report.md:65-69`: `npm run format:check` → exit 0 ("All matched files use the correct format. Finished in 2423ms on 51 files"), `npm run lint:check` → exit 0 (`oxlint --config .oxlintrc.json --deny-warnings .`, no output), `npm run check` → exit 0 (`tsc --noEmit --project tsconfig.json && tsc --noEmit -p configs/src/tsconfig.server.json`), `npm run build` → exit 0 ("✓ 10 modules transformed … built in 2.63s"), `npm test` → exit 0 (src:server 258 passed | 1 skipped; policy 111; config 46; setup 14; guides 28). That clears the NOT-EVIDENCED floor, but it is the writer's self-report and only the `verifier` lane's re-run settles it.

**8. Observations and deviations hide no criterion failure — CONFIRMED.**
Evidence: no row stopped, so the expected/found/evidence obligation is inert. The one acceptance-criterion residual — the `openStream` hit under `guides` against criterion 1 (`server-brief.md:163`) — is disclosed with its file and line at `server-report.md:82` rather than omitted. The single skipped test is named and attributed to the pre-existing `it.skipIf(!BINDS_IPV6)` case (`server-report.md:69`). The three judgment calls are recorded as deviations, not hidden (`server-report.md:93-97`).

## Findings outside the claims

**A. `Stream` preserves every `openStream` and `enqueueStreamText` behavior, and each is pinned — no defect.**
Method-by-method against the deleted source (diff 888-939): header merge is byte-identical (`new Headers({ ...SSE_HEADERS, ...options?.headers })` at `/home/user/fleet/server/src/server/Stream.ts:66` versus diff 908, same spread order, so the caller still wins); `write` keeps the closed/undefined guard and the `desiredSize !== null && > 0` readiness (`Stream.ts:78-82` versus diff 915-919); `comment` keeps the `: text\n\n` keep-alive with the same silent-no-op semantics through `#enqueue` (`Stream.ts:84-86,125-128` versus diff 920-922, 838-846); `drain` is unchanged (`Stream.ts:88-95` versus diff 923-930); `end` keeps its idempotence, `controller?.close()`, and wakeup settle (`Stream.ts:97-102` versus diff 931-938); consumer `cancel` still flips `closed` and settles (`Stream.ts:119-122` versus diff 902-906). The `start` callback assigns `#controller` synchronously during construction, so no write path sees an unattached controller. Pins: header merge order at `/home/user/fleet/server/tests/src/server/Stream.test.ts:22` and `:30` (including the re-cased-key append), keep-alive comment at `:58`, `end` no-op at `:39`, parked-producer settle on `end` at `:88`, consumer-cancel close at `:96`, park/wake at `:67`. Every case the deleted `describe('openStream')` block held (diff 1602-1673) has a successor.

**B. `ServerErrorCode`'s lowercase `'status'` breaks the fleet's `*ErrorCode` casing convention — required change.**
`/home/user/fleet/server/src/server/types.ts` (diff 1030-1032) declares `export type ServerErrorCode = 'status'`. Every other `*ErrorCode` union in the fleet uses uppercase literals: `/home/user/fleet/websocket/src/server/errors.ts:36-57` (`'OPTION' | 'LIMIT' | 'CLOSE' | 'FRAME'`), `/home/user/fleet/sse/src/core/errors.ts:36-53` (`'OVERFLOW'`), `/home/user/fleet/template/src/core/types.ts:262`, `/home/user/fleet/msg/src/core/types.ts:44`, `/home/user/fleet/reason/src/core/types.ts:800`, `/home/user/fleet/indexeddb/src/browser/types.ts:49`, `/home/user/fleet/program/src/core/types.ts:24`, `/home/user/fleet/form/src/core/types.ts:81`. The report's justification at `server-report.md:9` cites `@orkestrel/contract`'s `ContractCode` (`/home/user/fleet/contract/src/core/types.ts:49-61`, lowercase), but that union is not an `*ErrorCode` and names contract fault categories, so it does not govern this name. It matters because a consumer catching across packages reads `error.code` against one casing rule.
What right looks like: `ServerErrorCode = 'STATUS'`, with `Server.ts:193`, the `ServerInterface.start` `@remarks`, the guide's Types row and Contract item 3, and the `errors.test.ts` and `Server.test.ts` assertions updated in the same change.

**C. Everything else about `ServerError` and `isServerError` is consistent with the fleet — no defect.**
The class shape (`readonly code`, `readonly context?: Readonly<Record<string, unknown>>`, `this.name` set, `context` assigned only when defined) is identical to `/home/user/fleet/websocket/src/server/errors.ts:36-57` and `/home/user/fleet/sse/src/core/errors.ts:36-53`. The `instanceof`-only guard matches both (`websocket/src/server/errors.ts:76-78`, `sse/src/core/errors.ts:72-74`); the brand `isHTTPError` carries exists for the cross-copy request boundary, which no `ServerError` reaches, and the `@remarks` says so (diff 428-433). The absent constructor TSDoc matches this package's own `HTTPError` (`/home/user/fleet/server/src/server/errors.ts:63`).

**D. `pickCoding` keeps the two doors identical, and the agreement test binds — no defect, one optional strengthening.**
`Negotiator.encoding` (diff 288-302) and `negotiateEncoding` (diff 708-714) now carry the same body — an empty-offer guard, then `pickCoding(parseAcceptHeader(header), available)`. The duplicated guard is unobservable, because `pickCoding` over an empty `available` returns `undefined` anyway (diff 674-682); it only skips the parse, as the report states. The agreement test at `/home/user/fleet/server/tests/src/server/Negotiator.test.ts` (diff 1148-1161) drives five headers through both doors with `toBe`, so a one-sided drift reds it. Optional: only the first header carries an absolute expectation (`'deflate'`), so a regression breaking both doors identically would pass for the other four; adding an expected value per header closes that.

**E. Report measurement mismatch on the untracked file sizes — correct the record.**
`server-report.md:74` states `src/server/Stream.ts (132 lines)` and `tests/src/server/Stream.test.ts (106 lines)`. The tree holds 136 lines at `/home/user/fleet/server/src/server/Stream.ts` and 114 lines at `/home/user/fleet/server/tests/src/server/Stream.test.ts`. The retained report is the audit subject, so its diff-stat line must match the returned tree.

## Referrals to the Orchestrator (no verdict from me)

- `/home/user/fleet/server/guides/abort.md:91` runs `const stream = openStream({ signal: abort.signal })`. That fence is `@orkestrel/abort`'s own guide text, mirrored here refresh-only, and it names a `@orkestrel/server` export that no longer exists — and never accepted a `signal` option. Refreshing the mirror cannot fix it; the correction belongs to `@orkestrel/abort`'s guide upstream.
- `/home/user/fleet/server/src/server/helpers.ts:106` still rejects the double-`next` programmer error with a bare `Error`, while the same class of refusal in `Server.start` now carries `ServerError`. Outside every row here; route it to the capability that owns the middleware seam.

FAIL 3
