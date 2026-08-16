# Absorb — the fleet-alignment breakage map for supervisor

Role: grok, engine Cursor Grok (cursor-grok-4.5-high), read-only. Return distilled evidence with
file:line pointers, never raw dumps. Perform directly; spawn nothing; edit nothing.

## Objective

Map every break the dependency raise causes in /workspace/supervisor, so a design round can plan
the migration. The raise: workflow 0.0.10→0.0.12, mcp 0.0.12→0.0.15, guide 0.0.8→0.0.11,
agent 0.0.13→0.0.15, middleware 0.0.9→0.0.11, contract 0.0.9→0.0.11, server 0.0.10→0.0.12,
tool 0.0.9→0.0.10, budget 0.0.5→latest, emitter 0.0.5→latest, sse 0.0.4→latest,
terminal 0.0.5→latest, router 0.0.8→latest, sea 0.0.5→latest, ollama 0.0.8→latest,
scaffold 0.0.21→0.0.37 (devDep), plus @orkestrel/test 0.0.3 arriving as a NEW devDep.

## Evidence

- The CURRENT installed versions: /workspace/supervisor/node_modules/@orkestrel/<name>/ (what the
  code compiles against today).
- The TARGET published trees, unpacked:
  /tmp/claude-0/-home-user/6d2dc0ef-4f55-5fcd-ae2e-97129e7119cf/scratchpad/fleet-target/<name>/
  (workflow, mcp, guide, agent, middleware, contract, server, tool, database, test).
- Supervisor's consumption: /workspace/supervisor/{src,app,tests,configs}/**.

## Known breaks to pin exactly (from an earlier failed install)

- `recoverWorkflow` no longer exported by @orkestrel/workflow (used in tests/src/core/Run.test.ts:18,
  tests/src/server/integration.test.ts:18) — name its replacement in workflow 0.0.12's declarations.
- JSONRPC types moved: app/server/MCPProjection.ts:190 (JSONRPCRequest vs JSONRPCNotification id
  compatibility) and app/server/helpers.ts:325 (id now required on JSONRPCRequest) failed under the
  target mcp — read mcp 0.0.15's JSONRPC type declarations and state the exact new shapes.
- `guide.patterns()` is not a function under guide 0.0.11 (tests/guides/src/parity.test.ts:69) —
  name the replacement API and any other guide surface the parity suite uses that moved.

## Sweep

For EACH raised package: diff its declaration surface (index.d.ts / types) current vs target,
list every removed/renamed/changed symbol that supervisor imports (grep supervisor for each), and
report per package: symbols consumed (file:line), symbols broken (with the target's replacement),
or "no consumed symbol moved". Also: middleware 0.0.11's peerDependencies exactly as published
(the database peer conflict is known — state it precisely). Also: whether @orkestrel/test's
helpers (createRecorder, waitForDelay, createScratch) overlap helpers supervisor hand-rolls in
tests/setup*.ts (candidates for adoption, file:line).

## Output

One section per package in raise order, a final "adoption candidates" section for @orkestrel/test,
and a closing table: package | break count | severity (compile / behavioral / none). No process
diary, no raw dumps.
