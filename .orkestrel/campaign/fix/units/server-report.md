# Unit breaking-server — report (2026-09-02)

Writer: `implementer` on Opus 5 (native; Sol dark, substitution recorded). Returned report:

## Rows

- **s14-01** — applied: Followed the ruling exactly: added `Stream` class at src/server/Stream.ts implementing StreamInterface with #encoder/#response/#controller/#closed/#wakeup fields; `createStream(options?)` in factories.ts; `enqueueStreamText` folded in as the `#enqueue` private method; `openStream` and `enqueueStreamText` deleted from helpers.ts. Barrelled `export * from './Stream.js'`. The ReadableStream underlying source is a table of bound method references (`this.#attach.bind(this)`), not arrows: the oxlint policy plugin's no-nested-functions rule permits only object-literal method shorthand and a direct-argument callback, and an arrow as a property value is neither — verified by running `npm run lint`, which reported all three arrows before the change and exit 0 after. Guide: `openStream`/`enqueueStreamText` Helpers rows deleted, `createStream` Factories row and `Stream` Entities row added, Methods parity sentence now names Negotiator, Server, and Stream, Contract item 2 extended to StreamInterface, SSE fence rewritten to createStream. Tests moved to the mirrored tests/src/server/Stream.test.ts. mcp/toolbox are outside this repository and follow in their own units.
- **s14-03** — applied: `appendCookie` deleted from helpers.ts with its Surface row. Its two call sites — `writeSignedCookie` and `clearCookie` — now call `headers.append('set-cookie', …)` directly, and the `writeSignedCookie` @remarks that pointed at it now names `Headers.append`. Its test block was re-anchored rather than deleted outright: the invariant it guarded (a cookie write accumulates rather than clobbers) is now a property of the two remaining public writers, so `describe('clearCookie')` asserts both the Max-Age=0 expiry and that writeSignedCookie followed by clearCookie leaves both cookies on the header.
- **s14-11** — applied: Added `ServerError` and `isServerError` to errors.ts and `ServerErrorCode` to types.ts (types.ts first, per TTTDD; the policy sweep also requires a type alias to sit in types.ts). `Server.start()` now rejects with `new ServerError('status', "server cannot start from '<status>'", { status })` instead of a bare Error. The code union has one member, `'status'`, because one thrower exists — adding more would be the speculation the minimal-API law bars. Lowercase literal to match this package's own `ServerStatus` values and @orkestrel/contract's `ContractCode`. `isServerError` is instanceof-only and its @remarks says so: the brand `isHTTPError` carries exists for the request error boundary reading a foreign copy's error, and no boundary consumes a ServerError. HTTPError keeps `status`; the TypeError constructor throws are untouched. `ServerInterface.start` documents the code and the guard.
- **s14-12** — applied: `codingQuality` → `computeCodingQuality`, `languageQuality` → `computeLanguageQuality`, `ipv6Network` → `computeIPv6Network`, `clientRateKey` → `computeClientKey`, exactly as the ruling names them. `computeIPv6Network` preserves the `IPv6` acronym casing per the acronym rule (an acronym lowers only when it leads). Call sites in helpers.ts and Negotiator.ts, the four guide Surface rows, the helpers-test import list and its two describe titles all moved with them. The touched TSDoc first sentences were rewritten to the third-person -s form.
- **s14-14** — applied: `ConnectionInfo` → `Connection` across types.ts (declaration, file-header comment, CookieOptions.secure prose, ConnectionStateFunction), helpers.ts (two {@link} targets), the helpers test type block, and all four guide sites. `ConnectionStateFunction` keeps its name; only its parameter type changed. Middleware's vendored guides/server.md mirror is refresh-only and was not touched — it does not exist in this checkout. No collision: the only remaining `\bConnection\b` hits are the `Connection: 'keep-alive'` HTTP header key in constants.ts, the same key in tests/setupServer.ts, and the prose phrase 'Connection facts' in the guide.
- **s14-02** — applied: Audit carrier. Added the exported selection leaf `pickCoding(entries, available)` to helpers.ts, called by both `negotiateEncoding` and `Negotiator.encoding`, so the scoring loop has one implementation instead of two. Neither door is a 1:1 forward — each composes parseAcceptHeader with pickCoding behind its own empty-offer guard, which keeps the pre-existing short-circuit that skips parsing. `computeCodingQuality`'s TSDoc now names pickCoding as its consumer; `negotiateEncoding`'s says the two doors cannot drift. Guide Surface row added. Covered by three new helpers-test cases plus a Negotiator test that drives five headers through both doors and asserts they agree.
- **s14-09** — applied: Audit carrier. Swept every dead PROPOSAL/§N citation from tests/: Server.test.ts (PROPOSAL §9, PROPOSAL §5.1), Negotiator.test.ts (§16), factories.test.ts (§16), setup.ts (AGENTS §16.1), setupServer.ts (AGENTS §16.1 / §17.6 plus four more §8/§16 citations at lines 10, 26, 188, 230 that the row's anchor list did not enumerate but that carry the identical defect). The RFC 7232 §2.3.2 citation at helpers.test.ts:685 is a legitimate external-spec reference the finding explicitly ruled out of scope and is kept. tests/setupPolicy.ts and tests/policy.test.ts are off-limits and carry no citations.

## Symbols moved

- openStream → createStream (factory in factories.ts) + Stream (class in src/server/Stream.ts)
- enqueueStreamText → removed (folded into Stream as the #enqueue private method)
- appendCookie → removed (call sites use headers.append('set-cookie', cookie))
- codingQuality → computeCodingQuality
- languageQuality → computeLanguageQuality
- ipv6Network → computeIPv6Network
- clientRateKey → computeClientKey
- ConnectionInfo → Connection
- added: Stream (class)
- added: createStream (factory)
- added: ServerError (class)
- added: ServerErrorCode (type)
- added: isServerError (guard)
- added: pickCoding (helper)

## Files touched

- /home/user/fleet/server/src/server/Stream.ts
- /home/user/fleet/server/src/server/types.ts
- /home/user/fleet/server/src/server/errors.ts
- /home/user/fleet/server/src/server/helpers.ts
- /home/user/fleet/server/src/server/factories.ts
- /home/user/fleet/server/src/server/Negotiator.ts
- /home/user/fleet/server/src/server/Server.ts
- /home/user/fleet/server/src/server/constants.ts
- /home/user/fleet/server/src/server/index.ts
- /home/user/fleet/server/tests/src/server/Stream.test.ts
- /home/user/fleet/server/tests/src/server/helpers.test.ts
- /home/user/fleet/server/tests/src/server/Server.test.ts
- /home/user/fleet/server/tests/src/server/errors.test.ts
- /home/user/fleet/server/tests/src/server/factories.test.ts
- /home/user/fleet/server/tests/src/server/Negotiator.test.ts
- /home/user/fleet/server/tests/setup.ts
- /home/user/fleet/server/tests/setupServer.ts
- /home/user/fleet/server/guides/server.md
- /home/user/fleet/server/README.md

## Tests changed

- /home/user/fleet/server/tests/src/server/Stream.test.ts — new mirrored file; the openStream block moved here and rewritten against `new Stream()`, plus new cases for the header merge order, the comment keep-alive wire, and the StreamInterface conformance check
- /home/user/fleet/server/tests/src/server/helpers.test.ts — openStream block and StreamInterface type import removed; appendCookie import and describe removed, replaced by describe('clearCookie') covering expiry and accumulation; pickCoding import plus three cases; describe titles moved to the compute* names
- /home/user/fleet/server/tests/src/server/errors.test.ts — added describe('ServerError') (code, message, name, context, not-an-HTTPError) and describe('isServerError') (narrowing, rejection of a generic Error, an HTTPError, non-errors, and a bare code-carrying lookalike)
- /home/user/fleet/server/tests/src/server/factories.test.ts — added describe('createStream — round-trip'): instance-of-Stream, StreamInterface satisfaction, option threading, an end-to-end wire read, and the return-type assertion
- /home/user/fleet/server/tests/src/server/Server.test.ts — openStream call sites and import moved to createStream; added a case asserting the wrong-status start rejects with a ServerError of code 'status' carrying { status: 'listening' }
- /home/user/fleet/server/tests/src/server/Negotiator.test.ts — added a case driving five headers through both Negotiator.encoding and negotiateEncoding and asserting they agree, which is what the shared pickCoding leaf buys

## Gates

- `npm run format:check` → exit 0 — All matched files use the correct format. Finished in 2423ms on 51 files using 4 threads.
- `npm run lint:check` → exit 0 — oxlint --config .oxlintrc.json --deny-warnings . — no output, exit 0
- `npm run check` → exit 0 — tsc --noEmit --project tsconfig.json && tsc --noEmit -p configs/src/tsconfig.server.json — no diagnostics
- `npm run build` → exit 0 — ✓ 10 modules transformed. dist/src/server/index.cjs 87.88 kB │ gzip: 27.71 kB. ✓ built in 2.63s. Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts
- `npm test` → exit 0 — src:server 258 passed | 1 skipped (259); policy 111 passed; config 46 passed; setup 14 passed; guides 28 passed. The single skip is the pre-existing it.skipIf(!BINDS_IPV6) case in Server.test.ts, unrelated to this change.

## Diff stat

```text
README.md 2 +-, guides/server.md 148 ++++---, src/server/Negotiator.ts 16 +--, src/server/Server.ts 8 +-, src/server/constants.ts 7 +-, src/server/errors.ts 72 ++++, src/server/factories.ts 33 ++-, src/server/helpers.ts 279 +++-------, src/server/index.ts 1 +, src/server/types.ts 47 ++-, tests/setup.ts 2 +-, tests/setupServer.ts 10 +-, tests/src/server/Negotiator.test.ts 21 ++-, tests/src/server/Server.test.ts 28 ++-, tests/src/server/errors.test.ts 49 ++-, tests/src/server/factories.test.ts 51 ++-, tests/src/server/helpers.test.ts 178 ++++------ | 17 files changed, 510 insertions(+), 442 deletions(-). Untracked and not counted by git diff --stat: src/server/Stream.ts (132 lines) and tests/src/server/Stream.test.ts (106 lines).
```

Status at return (writer's reading): `All seven rows applied; none refused, none stopped. The full gate chain runs green in order: format:check, lint:check, check, build, test — every one exit 0. The published declaration carries the new surface (Stream, ServerError, ServerErrorCode, isServerError, createStream, pickCoding, Connection, the four compute* renames) and none of the removed names; both published entry points (ESM and CJS) were loaded and driven, so the new Stream.ts ↔ factories.ts ↔ helpers.ts graph has no module cycle in the shipped form.`
Built `dist/` moves: true

## Observations

- Acceptance criterion 1 sweep: `grep -rn '\b<old>\b' src tests guides` returns no hit for enqueueStreamText, appendCookie, codingQuality, languageQuality, ipv6Network, clientRateKey, or ConnectionInfo. The one residual hit is `guides/abort.md:91`, `const stream = openStream({ signal: abort.signal })` — illustrative prose inside the vendored @orkestrel/abort guide mirror, calling a symbol with a `signal` option this package's stream never had. That file is off-limits (guides/<other-package>.md) and refresh-only; no edit made, and nothing in this package's surface depends on it.
- The case-insensitive inflected sweep (-s/-ed/-ing/-er and the verb-to-noun form) over src, tests, guides, README.md returned hits only for the stems codingqualit, languagequalit, and ipv6network, and every one of those is the NEW compute* name containing the stem as a substring. The prose sweep for the concepts as English words ('append a cookie', 'open stream', 'connection info', 'coding quality', 'enqueue stream') returned nothing; the sole 'rate-limit key' hit is Connection.ip's TSDoc describing what the field is for, unrelated to the helper's old name.
- A false documentation claim was found and corrected. StreamOptions, SSE_HEADERS, and the openStream @remarks all claimed a seam-owned header key 'is never overridden'. The code merges `{ ...SSE_HEADERS, ...options?.headers }`, so the caller wins. A probe with a negative control measured three outcomes: an exact-case repeat REPLACES the seam's value; a differently-cased repeat makes Headers accumulate BOTH into one comma-joined value ('text/event-stream; charset=utf-8, text/plain'); an unrelated key merges alongside; and the control (no caller headers) leaves the seam's value intact. Behaviour is unchanged — no row authorizes moving it — but all three prose copies now state what the code does, and two Stream tests pin it. If the seam SHOULD win, that is a successor row, not a fix here.
- Two negative controls prove the parity gate that backs acceptance criterion 5 can actually fail. Removing the createStream Surface row reddens `documents every barrel export` with "expected [ 'function createStream' ] to deeply equal []"; adding an undocumented public `flush()` to Stream reddens `Stream exposes no undocumented method` with "expected [ 'flush' ] to deeply equal []". Both files were restored byte-for-byte in the same command that planted the control.
- `guides/README.md` still carries `AGENTS §22` twice (the header line and the See-also entry) — the identical dead-citation class s14-09 exists to remove, in a file this brief lists as owned. My s14-09 carrier scopes the sweep to tests/, so I did not edit it. Recorded for whichever unit owns the guide-manifest prose.
- `wrapMiddleware` and `decodeTokenPayload` are exported from helpers.ts with no direct test in tests/src/server/. Pre-existing — neither was touched by any row here — and outside this unit's scope.
- This repository's own AGENTS.md is the scaffold pointer file and declares no named sections, so the pre-existing `AGENTS.md § Non-negotiable rules` and `§ Design laws` citations left in src/ by the earlier fix round do not resolve locally either. Same class as s14-09, outside my rows, not touched. I removed one such citation I had briefly introduced myself in Stream.ts.
- `npm run check` was run first as instructed and exited 0 against the staged upstream closure, so the adoption list was empty — commit ba377d4 had already adopted the renamed @orkestrel/guide helpers in the parity test. `node /home/user/work/verify-stage.mjs server` confirms all ten staged tarballs are the installed copies. No npm install was run.

## Deviations

- No row stopped and no deviation blocked the unit. Three judgment calls were taken under the deviation contract's 'decide, record, and carry on' clause and are stated here rather than as stops.
- The ReadableStream underlying source uses bound method references rather than the arrow delegates I first wrote. `npm run lint` reported policy(no-nested-functions) on all three arrows; reading configs/policy.ts shows the rule permits only object-literal method shorthand (isPolicyMethod) and an anonymous function passed directly as a call/new argument (isPolicyCallback), and an arrow as a Property value is neither. Method shorthand cannot reach the class's `this`, so `this.#attach.bind(this)` is the arrow-free form that keeps every instance-bound body in a `#` method. Worth noting for the audit: tests/setupPolicy.ts walks only top-level statements and never sees inside a class, so the lint plugin and the AST sweep disagree about this construct — the lint plugin is the stricter and binding one.
- s14-09's sweep covered four §-citations in tests/setupServer.ts beyond the single anchor line the row named (lines 10, 26, 188, 230 in the original file). Leaving them while removing the line-7 citation from the same file would have left the identical defect in the same header block. Strictly within the row's own stated population, 'the remaining PROPOSAL §/§N citations in tests/'.
- The appendCookie test block was re-anchored onto clearCookie and writeSignedCookie rather than deleted. The row's rule is that a removed capability takes its tests with it, and the appendCookie-specific assertions did go; but the invariant those assertions protected (a cookie write appends rather than clobbers) is now carried by the two remaining public writers and would otherwise have lost its only coverage. Testing `Headers.append` itself would have been a platform test and was avoided.
- Engine substitution recorded per the brief: the Sol bench is dark, so this objective-implementation unit ran on the Opus 5 native implementer lane.

Actual diff and status rendered by the Orchestrator: `tmp/units/breaking/server.diff`,
`tmp/units/breaking/server.status`.
