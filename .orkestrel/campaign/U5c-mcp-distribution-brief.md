# Unit U5c — `@orkestrel/mcp` distribution receipts (successor to U5b)

Successor to `tmp/units/U5b-mcp-distribution-brief.md`, which succeeds
`tmp/units/U5-mcp-distribution-brief.md` (both staged beside this file). Read U5 in full first;
it stays the brief. U5b's amendments stand except where this file amends them again; this file
wins over the sentences it amends.

## Role and engine

`implementer` on Opus 5, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/mcp` checkout while this unit runs.

## Amendments to U5b

1. **Baseline (replaces U5b amendment 1).** The mcp checkout is clean at commit `406b5c9` (`feat: produce tools/list_changed from the registry on every listen stream`, the U4e … U4e-h chain, 2026-09-15), plus the U14e rename of `CONFORMANCE_SCHEMA` if it has landed by launch.
   Beneath it sit `7959f08` (the whole browser face U4 → U4m: `createPageServer`, the WebMCP
   bridge `createModelContext` with the live-state sync, the failure-path pins, the host records
   as relationships) and the server-side producer commit this baseline names (U4e → U4e-d).
   `git diff HEAD` is your diff for review.
2. **The landed browser face (replaces U5b amendment 2).** Read `guides/mcp.md` as landed rather
   than any unit report: `createPageServer({ tools, name?, version?, client? })` returns
   `{ client, stop }`; the client is bound but not connected at return; after `stop`, `call` and
   `tools` reject at once with `-32600`. `createModelContext` is not part of these receipts.
3. **The server now owns the tools family (new).** Every `subscriptions/listen` stream whose
   filter carries `toolsListChanged` yields `notifications/tools/list_changed` from the registry,
   `server/discover` advertises `tools: { listChanged: true }`, and a consumer filter claiming
   the family is refused at construction. None of X5–X8 lists a subscription; do not add one.
   Where an existing distribution case compares a discover result literally, the `tools`
   capability reads `{ listChanged: true }` (the gates after the landing are green, so no such
   literal is red at your baseline; report one if you meet it).
4. **The tool is on the registry (replaces U5b amendment 3's tool line).** `@orkestrel/tool@0.0.15`
   is published (`dist.shasum 07c17603a4f018db3a784eac8030485286f2bd96`) and carries the
   emitter; this checkout's installed tool is that registry release after the visit against
   scaffold 0.0.68. The isolated consumer installs `@orkestrel/tool@0.0.15` FROM THE REGISTRY, not
   the `tmp/tarballs/` copy. The agent is still the unpublished tip: install
   `C:/Users/mikes/WebstormProjects/scaffold/tmp/tarballs/orkestrel-agent-0.0.22.tgz` as U5b
   amendment 3 states, in the same `npm install` as the registry tool. The mcp tarball is packed
   by the proof from this checkout. The installed primitives, the zero-request instrument, and
   the standing conditions stand as U5b amendments 5–7 state them. The setup export
   `CONFORMANCE_INPUT_SCHEMA` in `tests/setupConformance.ts` is the renamed `CONFORMANCE_SCHEMA`
   (U14e); neither is yours to touch.

Everything else in U5 — Objective, Context, Unknowns, Scope, Execution, Output, Deviation
contract, Acceptance criteria, Review evidence — is unchanged.
