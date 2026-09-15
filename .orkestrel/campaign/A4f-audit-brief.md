# Audit A4f — close the U4i round and the U4 chain (`@orkestrel/mcp` browser face)

## Role and lane

One brief, three blind lanes; state which you hold in your first line.

- `analyst` on GPT-6 Astra (read-only `codex exec` rooted at `C:/Users/mikes/WebstormProjects/mcp`):
  OBJECTIVE and cross-engine lane (Opus 5 wrote the chain). Do not attempt a browser run; name each
  unexecuted vector as `UNRESOLVED` with its exact command and read the Orchestrator's logs under
  Review evidence — every file is staged beside this brief in `tmp/codex/`.
- `reviewer` on Opus 5 (native; Read, Grep, Glob): SUBJECTIVE lane — API shape and vocabulary
  (`WebMCPProjection`, `buildWebMCPProjections`, `collectWebMCPProjections`, the convergence rule as
  the guide states it, the class remarks), simplification, guide voice.
- `checker` on Sonnet (native; Read, Grep, Glob): MECHANICAL lane — every U4i carrier closed at the
  `file:line` the report names; the red readings; scope; the probe; the chain walk (claim 8).

Read the evidence under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/` (`.txt`
suffixed where noted; the Astra lane reads the staged copies in `tmp/codex/`) and the mcp tree at
`C:/Users/mikes/WebstormProjects/mcp`. Perform the audit directly and spawn nothing. This round
closes the chain: rule on every claim and name any remaining defect with its vector, or state the
chain is closed.

## Subject and the ruling under audit

The `mcp` checkout at checkpoint `b9ff0b9` plus the working tree after U4 → U4c → U4d → U4f → U4g
→ U4h → U4i. U4i's brief is `U4i-mcp-browser-fix-brief.md`; its report `U4i-mcp-browser-report.md`.
The Orchestrator's ruling U4i implemented: a followed `add`, `remove`, or `clear` is a trigger; each
queues one synchronisation of the handle's registrations for that manager against the manager's
state at run time (instances through `tools()` → `toolToDefinition` → `toolToWebMCP`, unprojectable
skipped): absent → released, same instance → untouched, equal descriptor under a new instance →
kept and re-bound, changed → re-registered, new → registered; `publish` keeps its call-time
snapshot. Previous rounds: `A4e-audit-analyst.md` (O1–O3 and the recorder question), the probes
`P12-a4c-probe.md`, `P13-a4d-probe.md`.

## Review evidence

- `A4f-u4i-only.patch` — the U4i delta (8 files, +548/−214); `A4e-u4h-only.patch`,
  `A4d-u4g-only.patch`, `A4c-u4f-only.patch` — the prior deltas; `A4f-diff.patch` — the whole chain.
- `U4i-mcp-gates-orchestrator.log.txt`, `U4i-mcp-gates-test-full.log.txt` — the Orchestrator's
  authoritative gates after U4i.
- `collide3-mcp-after-u4i.txt` — the export-name collision probe (`collisions: none`).
- The U4i report's red readings, the coalescing control, and the recorder audit table.

## Numbered falsifiable claims

1. **The sync converges on the manager.** After any followed change the registry equals the
   manager's projectable set for that manager, whatever listener ordering produced the change:
   O1 (equal-descriptor same-name replacement inside an earlier remove or clear listener; plain,
   queued, and suspended), O2 (an unencodable descriptor is released after remove or clear and left
   alone while its tool stays), O3 (`tools.destroy()` empties silently after its clear). Walk the
   interleaving space once more ({first, queued, suspended publish; add; remove; clear; destroy} ×
   {change listener; earlier manager listener; later publish of another manager; ordinary code} ×
   {same name; distinct name; unprojectable; unencodable}) and name any cell the sync misses.
2. **Coalescing is exact.** `#pending` holds the manager whose sync is queued and not started; a
   second event for that manager queues nothing; a change to a manager a later `publish` took up
   while a sync is queued still registers (the boolean control reddened). Falsify with an event
   the coalescing drops.
3. **`publish` keeps its contract**: call-time snapshot, queue position, whole-batch refusal, the
   follow; the queued-snapshot pin and the restated snapshot tests hold; a publication's registrations
   record their tool so the first sync does not churn an unencodable descriptor.
4. **The public shape is right (reviewer's lane leads).** `buildWebMCPDescriptors` →
   `buildWebMCPProjections` returning `WebMCPProjection { tool; descriptor }` pairs;
   `collectWebMCPProjections` as the skipping sibling; `describeWebMCPTool` retained for consumers.
   Rule on the names, on two leaves versus one with a switch, and on whether `WebMCPProjection`
   belongs in the public types.
5. **The prose is exact**: class remarks, `publish`/`destroy` TSDoc, the guide's follow section and
   parity rows state the convergence rule; no descriptor-bound release sentence remains; the skip
   rule stands.
6. **The recorder limit is stated and the one absence claim is bounded** (`recordRequests` TSDoc;
   `completes connect…` reads the drain while a response is pending and after it completed). Rule
   whether the claim "no request left the page" is proven by that control or needs a transport
   recorder the unit could not reach (`src/browser/factories.ts` off-limits) — if the latter, name
   it as the vector for a follow-up rather than a chain blocker.
7. **Nothing else moved; nothing re-implements an installed export.** Eight files; probe clean;
   `toolToDefinition` is the installed manager's projection.
8. **The chain is whole.** Every FAIL from A4, A4b, A4c, A4d, and A4e names a closing test or a
   recorded ruling in the tree (the Orchestrator's P13b closed A4d claim 5).
9. **Ship it as mcp 0.0.31** for U4e (the server's `list_changed` producer over the same emitter)
   and U5b (distribution proof)? Name what must change first if not, with the vector.

## Output

The `orkestrel-falsify` verdict shape: one line per claim (`CONFIRMED`, `BROKEN`, `UNRESOLVED`, or
`NOT-EVIDENCED`) with the evidence; findings outside the claims under `outside:` (or `outside:
none — chain closed`); ONE terminal line `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`.
Nothing else.
