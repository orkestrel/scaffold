# Unit mcp-fixup — close the mcp unit's audit findings

## Role and engine

`builder` on Claude Sonnet, a native subagent. You perform the assignment directly and spawn
nothing.

## Objective

`@orkestrel/mcp` at commit `e7d82a4` names the server-side duplex adapter as the mirror of its
client twin, tells the one-shared-class story on both faces of its guide, and carries no comment
that names a file the repository does not have.

## Context

**Findings, each with its ruling.** Apply in this order.

1. **Both lanes, s01-11 — the adapter's name.** `src/server/factories.ts:103-105` declares
   `createMessageTransportBridge(transport: MCPMessageTransportInterface): MCPTransportInterface`.
   The strict `create{ReturnType}` form `createMCPTransport` is refused: `createMessagePortTransport`
   already returns `MCPTransportInterface`, so that name would claim an occupied slot, and the
   function adapts an existing transport rather than constructing the core port. Ruling (the
   s01-11 ruling is amended to this): `createDuplexServerTransport`, the exact mirror of
   `createDuplexClientTransport` in `src/core/factories.ts`, which the guide already frames as its
   opposite number. Rename at `src/server/factories.ts:103` and its call sites `:352` and `:484`,
   the guide rows at `guides/mcp.md:2673`, `:2820`, `:2837` and any prose naming it, and the
   consumers `tests/fixtures/browserServer.ts:22,177`, `tests/src/server/factories.test.ts:862`,
   `tests/src/server/transports/StdioServerTransport.test.ts:5,234`,
   `tests/src/server/transports/WebSocketServerTransport.test.ts:4,200,226,266`. Keep imports
   sorted. The TSDoc first sentence names it as the server-side mirror of
   `createDuplexClientTransport`.
2. **Subjective required change — the guide's server face.** `guides/mcp.md:2671`, the server
   `createHTTPClientTransport` row, still reads "Create a `MCPMessageTransportInterface` over
   `fetch` … (the egress mirror)" while the browser twin at `:3115` reads "Return the core
   `HTTPClientTransport` … the same class the Node face's factory returns." Ruling: give the server
   row the browser row's sentence. The server Entities section (`:2675-2680`) and Helpers section
   (`:2694-2711`) carry no note for `HTTPClientTransport`, `decodeEvent`, `readEventStream`, and
   `buildResponseError` leaving the face; the browser Helpers section at `:3136-3139` shows the
   form — an italic note naming what the face no longer declares and where it ships from. Ruling:
   add the equivalent note to both server sections. `HTTPClientTransportOptions` is documented only
   in the core Types table; ruling: both face Types sections (`:2696-2711` and `:3143-3150`) carry
   a pointer to it in the same note form.
3. **Objective F1 — unresolvable paths in a rewritten header.**
   `tests/src/server/integration.test.ts:42-43` points at `tests/src/core/mcp/MCPClient.test.ts`
   and `tests/src/ollama/mcp.test.ts`; the first is `tests/src/core/MCPClient.test.ts` and the
   second does not exist. Ruling: correct the first and delete the second pointer.
4. **Objective F2 — a pointer this unit made dead.** `tests/src/core/MCPClient.test.ts:56` names
   `tests/src/server/mcp/HTTPClientTransport.test.ts`. Ruling: point it at
   `tests/src/server/integration.test.ts`.
5. **Objective F3 — a comment the change falsified.** `tests/guides.test.ts:515-517` reads "The
   server and browser faces declare the same class, and only the browser barrel re-exports it: the
   server face strands `HTTPClientTransport`." Ruling: reword the lead comment to present the
   `FIXTURE_FILES` block as a synthetic negative control, matching the comment at `:526-536`.
6. **Objective F4 — `via`.** `tests/src/server/factories.test.ts:862` reads
   `// bindServer port (via createMessageTransportBridge) …`. Ruling: `through
   createDuplexServerTransport` (finding 1 renames the symbol in the same line).
7. **Subjective referral — the `LEGACY_OWNER_PATTERN` alternation.** `tests/guides.test.ts:87-89`
   nests `MiddlewareOptions|Options|…`. Ruling: prove with a probe under the system temporary
   directory that the pattern matches both `MCPSessionMiddlewareOptions` and `MCPSessionOptions`
   and that no other `MCPSession*` symbol exported from `src/server/index.ts` escapes it; record
   the probe and its output; change the pattern only if the probe shows a miss.

Recorded, no change: the s01-03 merge into `createScopeServer(options, scope?)` is ratified; the
two face `createHTTPClientTransport` delegates stand under the s01-01 ruling and the successor
row that would publish the factory from core is recorded; `createScopeMessageListener`'s
placement in `factories.ts`, the `MCPSessionOptions`/`MCPSessionMiddlewareOptions` key overlap,
and the bare `ScopeInterface` are successor rows; the four wire headers leaving the server face
have no fleet consumer and carry a radius record; `guides/README.md:58` follows the vendored
`guides/server.md` mirror at the re-pin.

**Law.** `AGENTS.md`; `.claude/rules/names.md`; `.claude/rules/documentation.md` § Parity;
`.claude/rules/writing.md`. Read the copies under
`node_modules/@orkestrel/scaffold/dist/host/claude/rules/` if the checkout's `.claude/rules/`
differs.

**Host.** Linux, bash. Repository `/home/user/fleet/mcp` at commit `e7d82a4`, branch
`claude/orkestrel-npm-audit-deps-14ibta`, committed clean at launch, `node_modules` installed
with the closure staged. Do not run `npm install`. `npm run test:conformance` needs a current
`dist/`; the gate chain builds first. Other gate chains run on this host concurrently; if
`npm test` fails on a timing-suspect test, re-run `npm run test:src` once and report both
readings. Build a throwaway probe, if you need one, under the system temporary directory, never
under the checkout's `tmp/`.

**Standing conditions.** The one skipped test (`StdioClientTransport` under a forced host) is
pre-existing.

## Unknowns

none.

## Scope

**Owned.** `src/server/factories.ts`, `guides/mcp.md`, `tests/fixtures/browserServer.ts`,
`tests/src/server/factories.test.ts`, `tests/src/server/transports/StdioServerTransport.test.ts`,
`tests/src/server/transports/WebSocketServerTransport.test.ts`,
`tests/src/server/integration.test.ts`, `tests/src/core/MCPClient.test.ts`,
`tests/guides.test.ts` — each only at the sites the findings name, plus any test whose title or
control identifier the rename makes false.

**Off-limits.** `package.json`, `package-lock.json`, `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `.claude/**`, `configs/**`, every vendored guide mirror, every other file,
every other checkout.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, stage, push, install, or discarding
`git` command. Tree-wide `format` only to converge after `npm run lint`; then the non-mutating
chain.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Apply the findings in
order, run the word-boundary sweep and the case-insensitive inflected sweep for
`createMessageTransportBridge`, `MessageTransportBridge`, `via`, `tests/src/core/mcp/`,
`tests/src/ollama/`, `tests/src/server/mcp/` over `src`, `tests`, `guides/mcp.md`, `README.md`,
classifying every hit, then run:

```text
npm run format:check && npm run lint:check && npm run check && npm run build && npm test
```

## Output

Return, as data: per finding — closed, with the file and line of the change, or stopped with the
deviation; the probe for finding 7 and its output; the sweep and every hit classified; each gate
command with its exit code and an excerpt for any failure; `git diff --stat`;
`git status --short`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when the rename collides with an existing export, or when a gate fails for a cause
you cannot attribute after the re-run. Decide, record, and carry on from the wording of a
sentence or the placement of a note.

## Acceptance criteria

1. `rg -n 'createMessageTransportBridge' src tests guides/mcp.md README.md` returns no hit;
   `createDuplexServerTransport` is exported from `src/server/index.ts` through the factories
   barrel row and both call sites use it.
2. The server `createHTTPClientTransport` row reads as the browser row does, and both server
   sections and both face Types sections carry the notes.
3. Every path named in a test comment resolves.
4. The probe shows the pattern matches both `MCPSession*` options names.
5. The gate chain exits 0.
6. `git status --short` lists only owned files.
