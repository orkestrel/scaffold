# Unit U5b — `@orkestrel/mcp` distribution receipts (successor to U5)

Successor to `tmp/units/U5-mcp-distribution-brief.md` (staged beside this file). Read it in full
first; it stays the brief. This file records what moved between its writing and this launch and
wins over the sentences it amends.

## Role and engine

`implementer` on Opus 5, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/mcp` checkout while this unit runs.

## Amendments

1. **Baseline.** The mcp checkout is clean at the checkpoint the Orchestrator committed after
   audit A4b (`feat: host an MCP server in the page and bridge the registry to WebMCP`; the hash
   is in the launch pointer and `git log -1`). `git diff HEAD` is your diff for review.
2. **The landed browser face.** Report `.orkestrel/campaign/U4d-mcp-browser-report.md` (the
   chain U4 → U4c → U4d): `createPageServer({ tools, name?, version?, client? })` returns
   `{ client, stop }` — the verb is `stop`, not `destroy`; the client is bound but not connected
   at return; after `stop`, `call` and `tools` reject at once with `-32600`. `createModelContext`
   is not part of these receipts.
3. **The tarballs.** Tool: `C:/Users/mikes/WebstormProjects/scaffold/tmp/tarballs/orkestrel-tool-0.0.14.tgz`
   (packed after the emitter landed; receipt `.orkestrel/campaign/U0f-receipt.md`; the declaration
   carries `ToolManagerEventMap`). Agent: `.../tmp/tarballs/orkestrel-agent-0.0.22.tgz` (receipt
   `U0e-repack-agent-receipt.md`). The mcp tarball is packed by the proof from this checkout
   (build first). Install both foreign tarballs into the isolated consumer in ONE `npm install`
   (a lone agent install re-resolves tool from the registry).
4. **The installed tool in this checkout** carries the emitter (`node_modules/@orkestrel/tool`,
   `ToolManagerEventMap`); `guides/tool.md` mirrors the tool checkout at `fa88364`. Neither is
   yours to touch.
5. **Installed primitives.** As U4d: read `scaffold/guides/test.md` § Surface,
   `guides/contract.md` § Surface, and the declarations under `node_modules/@orkestrel/test`
   (including `@orkestrel/test/server`: `createLoopback`, `createScratch`) before declaring any
   helper; a helper whose job an export does is a defect. The Node relay fixture for X8 composes
   `createRelay` from the installed agent tarball with `@orkestrel/router` and `@orkestrel/server`
   (devDependencies of mcp); a scripted upstream implements `ProviderInterface` with a `stream`
   that yields nothing and returns a scripted `ProviderResult` per turn (P2's shape).
6. **Zero-request instrument.** The page-side recorder is `recordRequests` from
   `tests/setupBrowser.ts` where the page is Vite-served; in the isolated consumer's page use
   Playwright's `page.on('request')` plus a `fetch` counter installed before the scenario, and a
   deliberate positive control, exactly as U5 states.
7. **Standing conditions, restated.** Windows 11, Git Bash; `npm run test:distribution` builds,
   packs, installs, and launches Chromium (several minutes); the registry is reachable from the
   host for the consumer's other dependencies. Do not bump `version`; add no package; `src/**`
   is off-limits (report a patch).

Everything else in U5 — Objective, Context, Unknowns, Scope, Execution, Output, Deviation
contract, Acceptance criteria, Review evidence — is unchanged.
