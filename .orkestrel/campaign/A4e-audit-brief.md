# Audit A4e — close the U4h round and the U4 chain (`@orkestrel/mcp` browser face)

## Role and lane

One brief, two blind lanes; state which you hold in your first line.

- `analyst` on GPT-6 Astra (read-only `codex exec` rooted at `C:/Users/mikes/WebstormProjects/mcp`):
  OBJECTIVE and cross-engine lane (Opus 5 wrote the whole chain). Do not attempt a test run; name
  each unexecuted vector as `UNRESOLVED` with its exact command and read the Orchestrator's logs
  under Review evidence — every file is staged beside this brief in `tmp/codex/`.
- `checker` on Sonnet (native; Read, Grep, Glob): MECHANICAL lane — every U4h carrier closed at the
  `file:line` the report names; the red readings; scope; the probe. Read the evidence under
  `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/` (`.txt` suffixed where noted) and
  the mcp tree at `C:/Users/mikes/WebstormProjects/mcp`.

Perform the audit directly and spawn nothing.

## Subject and the frame this round must break

The `mcp` checkout at checkpoint `b9ff0b9` plus the working tree after U4 → U4c → U4d → U4f →
U4g → U4h. U4h's brief is `U4h-mcp-browser-fix-brief.md`; its report is `U4h-mcp-browser-report.md`.
Previous rounds: `A4c-audit-analyst.md`, `A4d-audit-analyst.md` and `A4d-audit-checker.md`; the
Orchestrator's probes `P12-a4c-probe.md` and `P13-a4d-probe.md` (each reproduced in real Chromium
what the prior lane predicted). Three consecutive rounds found one more interleaving each: the
refusal across a stop from a `connect` listener, a re-entrant publish, a clear listener adding a
name, a same-name addition inside a clear. This round is bounded: enumerate the interleaving space
once, rule on every cell, and either name the remaining defect with its vector or state that the
space is closed. The space: {`publish` (first, queued, suspended), followed `add`, `remove`,
`clear`, `destroy`} × {issued from a `change`/`toolchange` listener, from a manager listener
registered before the bridge's, from a later `publish` of another manager, from ordinary code} ×
{same name, distinct name, unprojectable tool, a descriptor JSON cannot encode}. Walk it as a
table in your reasoning and report only the cells you rule BROKEN or UNRESOLVED, with vectors.

## Review evidence

- `A4e-u4h-only.patch` — the U4h delta alone (5 files); `A4d-u4g-only.patch`, `A4c-u4f-only.patch`
  — the prior deltas; `A4e-diff.patch` — the whole chain against `b9ff0b9`.
- `U4h-mcp-gates-orchestrator.log.txt`, `U4h-mcp-gates-test-full.log.txt` — the Orchestrator's
  authoritative gates after U4h.
- `collide3-mcp-after-u4h.txt` — the export-name collision probe (`collisions: none`).
- The U4h report carries its red readings and the synchronous-teardown control it ran.

## Numbered falsifiable claims

1. **A release is bound to what the event carried.** `#release(tools, descriptor)`
   (`ModelContext.ts:323`) releases only a registration bound to that manager AND still advertising
   the ended tool's projection; `#cleared` and `#removed` project at the event through
   `toolToDefinition` + `toolToWebMCP`; P13 claim 4 is green (`ModelContext.test.ts:369`); the
   existing remove and clear tests stay green. Falsify with a vector in the space above.
2. **The descriptor-equality bias is safe.** An unencodable descriptor (a cyclic `inputSchema`)
   reads as unequal, so a `remove` or `clear` of such a tool leaves its registration for `#prune`
   or `destroy`. Rule whether a registration can be leaked past `destroy` or advertised after its
   tool is gone in a way a consumer observes.
3. **The settled-not-refused contract is pinned and true** (`MCPClient.test.ts:1748`): inside a
   `connect` listener, `disconnect()` then a call, a task request, and a subscription's `next()`
   each reject with `MCP client disconnected` inside the request deadline; the pin reddens under a
   synchronous teardown (the report's control).
4. **The prose is exact** (`guides/mcp.md:3676-3684`, the `#refuse` block `MCPClient.ts:553-566`):
   transport loss from a `connect` listener refuses at once; a `disconnect` from it defers and the
   drain settles; nothing promises immediate refusal after `disconnect`.
5. **Nothing re-implements an installed export** (probe clean; `toolToDefinition` is the
   installed manager's own projection, reused rather than re-derived).
6. **Nothing else moved.** The U4h delta is the five files the report names; `src/browser/types.ts`
   untouched and still true; no manifest, version, lockfile, `scaffold repair` file, `dist/**`.
7. **The chain is whole.** Every finding from A4, A4b, A4c, and A4d names a closing test or a
   recorded ruling in the tree (walk the four verdict files' FAIL lines once).
8. **Ship it as mcp 0.0.31** for U4e (the server's `list_changed` producer over the same emitter)
   and U5b (distribution proof)? Name what must change first if not, with the vector.

## Output

The `orkestrel-falsify` verdict shape: one line per claim (`CONFIRMED`, `BROKEN`, `UNRESOLVED`, or
`NOT-EVIDENCED`) with the evidence; the interleaving cells ruled BROKEN or UNRESOLVED under
`outside:` with their vectors (or `outside: none — space closed`); ONE terminal line
`VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. Nothing else.
