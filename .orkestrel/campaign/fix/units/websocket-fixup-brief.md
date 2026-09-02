# Unit websocket-fixup — close the websocket unit's audit findings

## Role and engine

`builder` on Claude Sonnet, a native subagent. You perform the assignment directly and spawn
nothing.

## Objective

`@orkestrel/websocket` at commit `1f06c29` names its error codes by the fault, pins the
"without writing a frame" claim and every `OPTION` context with executed assertions, and keeps
its coercers and guards in the files the architecture rule names, with the published surface
unchanged.

## Context

**Findings, each with its ruling.** Apply them in this order.

1. **Referral A (subjective), ruled apply — `WebSocketErrorCode` at `src/server/types.ts:84`.**
   The fleet's `*ErrorCode` members name the fault (sqlite `CONSTRAINT`, sse `OVERFLOW`, csv
   `LIMIT_EXCEEDED`, indexeddb `QUOTA`); `CODE` reads as `error.code === 'CODE'` and collides with
   the close status `code` this package already owns. Ruling: `CODE` → `CLOSE`, `PAYLOAD` →
   `LIMIT`; `OPTION` and `FRAME` stand. Carry every throw site (`src/server/NodeWebSocket.ts:193,213,217`),
   every test assertion, the `src/server/errors.ts` module comment and class TSDoc, the guide's
   Errors section rows and prose (`guides/websocket.md:130-158`), and the `@throws` lines. The
   browser and mcp consumers adopt in their own units.
2. **F1 (objective) / required change 1 (subjective) — `tests/src/server/NodeWebSocket.test.ts:320-346`.**
   The guide (`guides/websocket.md`, the Errors section) and `src/server/errors.ts:9` claim a
   `LIMIT` or `CLOSE` refusal throws without writing a frame or changing `readyState`; the test
   asserts `readyState` only and never binds the peer. Ruling: bind `const [server, client] = duplexPair()`,
   record `client` `data` chunks into an array, `await flushSocket()` after the handshake,
   snapshot the recorded byte total, run the three refusals, `await flushSocket()` again, and
   assert the total is unchanged before the `readyState` assertion — the shape the `OPTION` case
   at `:97-104` already uses.
3. **F2 (objective) — `tests/src/server/NodeWebSocket.test.ts:91-111`.** The `key` and invalid
   `protocol` `OPTION` cases assert the code only, while the guide promises `context` carries the
   refused option under its name. Ruling: carry a per-case expected context through that loop and
   assert it (`{ key }` for the key case, `{ protocol }` for the protocol case), as the
   payload/timeout loop does at `:133`.
4. **F3 (objective) / Referral B (subjective), ruled apply now — kind placement in
   `src/server/helpers.ts`.** `parseWebSocketFrame` (`:90`) and `parseUTF8` (`:195`) are coercers
   returning `T | undefined`, which `.claude/rules/architecture.md` places in `parsers.ts`; the
   guards `isWebSocketKey` (`:47`), `isWebSocketProtocol` (`:68`), and `isCloseCode` (`:224`) are
   total guards, which it places in `validators.ts`. The barrel star-exports every module, so no
   published name changes. Ruling: move the two coercers into `src/server/parsers.ts` and the
   three guards into a new `src/server/validators.ts` (add `export * from './validators.js'` to
   `src/server/index.ts` in sorted position), each with its TSDoc and `@example`, bodies
   unchanged; `measureWebSocketFrame` stays in `helpers.ts` (it is `measure*`, not a coercer).
   Mirror the tests: their describes move from `tests/src/server/helpers.test.ts` into
   `tests/src/server/parsers.test.ts` and a new `tests/src/server/validators.test.ts`. Update the
   guide's Codec helpers table only where a row names the file a symbol lives in, and the Tests
   index bullets. Re-read the `src/server/parsers.ts` module comment (`:1-4`) afterwards: with
   every coercer inside it, its class claim is true; keep it. Check `tests/guides.test.ts`'s
   `INTERNAL` list stays `[]` (nothing is stranded) and `tests/policy.test.ts` stays green (the
   parsers gate requires every `parsers.ts` export to be `parse*`, and the validators gate
   requires every `validators.ts` export to be a guard).

Referral C (the Errors section placement and shape) stands as landed. The `context` type
`Readonly<Record<string, unknown>>` is lawful and stands; recorded for the next change.

**Law.** `AGENTS.md`; `.claude/rules/architecture.md` (read at
`node_modules/@orkestrel/scaffold/dist/host/claude/rules/` — this checkout carries no vendored
`.claude/rules/`); `.claude/rules/names.md`; `.claude/rules/tests.md`; `.claude/rules/documentation.md`
§ Parity.

**Host.** Linux, bash. Repository `/home/user/fleet/websocket` at commit `1f06c29`, branch
`claude/orkestrel-npm-audit-deps-14ibta`, committed clean at launch, `node_modules` installed with
the closure staged. Do not run `npm install`. Build a throwaway probe, where you need one, under
the system temporary directory, never under the checkout. Other gate chains run on this host
concurrently; if `npm test` fails on a timing-suspect test, re-run `npm run test:src` once and
report both readings.

**Standing conditions.** none.

## Unknowns

none.

## Scope

**Owned.** `src/server/types.ts` (the `WebSocketErrorCode` alias only), `src/server/errors.ts`,
`src/server/NodeWebSocket.ts` (throw sites only), `src/server/helpers.ts`, `src/server/parsers.ts`,
`src/server/validators.ts` (new), `src/server/index.ts` (one barrel line), `src/server/factories.ts`
(the `@throws` line only), `guides/websocket.md`, `README.md` if it names a moved code,
`tests/src/server/**`, `tests/guides.test.ts` only if `INTERNAL` must change (it must not).

**Off-limits.** `package.json`, `package-lock.json`, `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `.claude/**`, `configs/**`, every vendored guide mirror, every other file,
every other checkout.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, stage, push, install, or
discarding `git` command. Tree-wide `format` only to converge after `npm run lint`; then the
non-mutating chain.

## Execution

A native subagent: perform the assignment directly and spawn nothing. For finding 2, write the
byte-total assertion first and prove it can fail by temporarily making `ping` write one byte
before validating (in `NodeWebSocket.ts`, a file you own), run `npm run test:src`, quote the
failure, restore the line exactly, and confirm with `git diff` that only the intended edits
remain. Then run:

```text
npm run format:check && npm run lint:check && npm run check && npm run build && npm test
```

## Output

Return, as data: per finding — closed, with the file and line of the change, or stopped with the
deviation; the failing-first excerpt for finding 2 and the passing count; the word-boundary sweep
for `'CODE'`, `'PAYLOAD'`, `parseWebSocketFrame`, `parseUTF8`, `isWebSocketKey`, `isWebSocketProtocol`,
`isCloseCode` over `src`, `tests`, `guides/websocket.md`, `README.md` with every hit classified;
each gate command with its exit code and an excerpt for any failure; `git diff --stat`;
`git status --short`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when the policy test rejects a moved symbol's name in its new file, when a move
creates an import cycle between the leaf files, or when a gate fails for a cause you cannot
attribute after the re-run. Decide, record, and carry on from the wording of a guide sentence.

## Acceptance criteria

1. `rg -n "'CODE'|'PAYLOAD'" src tests guides/websocket.md` returns no hit; `WebSocketErrorCode`
   is `'OPTION' | 'LIMIT' | 'CLOSE' | 'FRAME'`.
2. The refusal test records the peer's bytes and asserts none arrive; it failed under the planted
   write and passes after the restore.
3. The `key` and `protocol` cases assert their `context`.
4. `src/server/parsers.ts` exports only `parse*` functions including `parseWebSocketFrame` and
   `parseUTF8`; `src/server/validators.ts` exports only the three guards; `src/server/helpers.ts`
   exports neither a `parse*` nor an `is*` function; the barrel exports every module.
5. The gate chain exits 0.
6. `git status --short` lists only owned files.
