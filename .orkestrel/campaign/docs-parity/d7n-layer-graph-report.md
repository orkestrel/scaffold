## Work order

**Status:** Preliminary dependency order only. It does not authorize packing or publication.

| Layer | Package — local / registry | Direct final-graph dependencies |
| --- | --- | --- |
| L0 | codec — `0.0.3` / `0.0.2` | — |
| L0 | contract — `0.0.17` / `0.0.16` | — |
| L0 | msg — `0.0.10` / `0.0.9` | — |
| L0 | sse — `0.0.7` / `0.0.6` | — |
| L0 | test — `0.0.14` / `0.0.13` | external peer: vitest `^4.1.11` |
| L1 | abort — `0.0.10` / `0.0.9` | contract `^0.0.16` |
| L1 | budget — `0.0.10` / `0.0.9` | contract `^0.0.16` |
| L1 | csv — `0.0.7` / `0.0.6` | contract `^0.0.16` |
| L1 | emitter — `0.0.10` / `0.0.9` | contract `^0.0.16` |
| L1 | html — `0.0.9` / `0.0.8` | contract `^0.0.16` |
| L1 | indexeddb — `0.0.11` / `0.0.10` | contract `^0.0.16` |
| L1 | ndjson — `0.0.10` / `0.0.9` | contract `^0.0.16` |
| L1 | sqlite — `0.0.11` / `0.0.10` | contract `^0.0.16` |
| L1 | timeout — `0.0.10` / `0.0.9` | contract `^0.0.16` |
| L1 | tool — `0.0.14` / `0.0.13` | contract `^0.0.16` |
| L2 | console — `0.0.13` / `0.0.12` | contract `^0.0.16`; emitter `^0.0.9` |
| L2 | database — `0.0.14` / `0.0.13` | contract `^0.0.16`; emitter `^0.0.9`; indexeddb `^0.0.10`; sqlite `^0.0.10` |
| L2 | form — `0.0.6` / `0.0.5` | contract `^0.0.16`; emitter `^0.0.9` |
| L2 | markdown — `0.0.14` / `0.0.13` | contract `^0.0.16`; html `^0.0.8` |
| L2 | pool — `0.0.11` / `0.0.10` | emitter `^0.0.9` |
| L2 | process — `0.0.11` / `0.0.10` | contract `^0.0.16`; emitter `^0.0.9` |
| L2 | reason — `0.0.10` / `0.0.9` | contract `^0.0.16`; emitter `^0.0.9` |
| L2 | router — `0.0.14` / `0.0.13` | abort `^0.0.9`; contract `^0.0.16`; emitter `^0.0.9` |
| L2 | table — `0.0.5` / `0.0.4` | contract `^0.0.16`; emitter `^0.0.9` |
| L2 | template — `0.0.7` / `0.0.6` | contract `^0.0.16`; emitter `^0.0.9` |
| L2 | websocket — `0.0.12` / `0.0.11` | emitter `^0.0.9` |
| L3 | browser — `0.0.16` / `0.0.15` | contract `^0.0.16`; emitter `^0.0.9`; html `^0.0.8`; websocket `^0.0.11` |
| L3 | guide — `0.0.18` / `0.0.17` | contract `^0.0.16`; markdown `^0.0.13` |
| L3 | interpret — `0.0.13` / `0.0.12` | contract `^0.0.16`; emitter `^0.0.9`; reason `^0.0.9`; template `^0.0.6` |
| L3 | lsp — `0.0.7` / `0.0.6` | contract `^0.0.16`; emitter `^0.0.9`; process `^0.0.10` |
| L3 | qualifier — `0.0.14` / `0.0.13` | contract `^0.0.16`; emitter `^0.0.9`; reason `^0.0.9` |
| L3 | queue — `0.0.13` / `0.0.12` | abort `^0.0.9`; contract `^0.0.16`; database `^0.0.13`; emitter `^0.0.9`; timeout `^0.0.9` |
| L3 | rater — `0.0.14` / `0.0.13` | contract `^0.0.16`; emitter `^0.0.9`; reason `^0.0.9` |
| L3 | relation — `0.0.12` / `0.0.11` | contract `^0.0.16`; database `^0.0.13`; emitter `^0.0.9` |
| L3 | scaffold — `0.0.63` / `0.0.63` | console `^0.0.12`; contract `^0.0.16`; emitter `^0.0.9`; markdown `^0.0.13`; process `^0.0.10`; template `^0.0.6` |
| L3 | sea — `0.0.15` / `0.0.14` | contract `^0.0.16`; emitter `^0.0.9`; process `^0.0.10` |
| L3 | server — `0.0.19` / `0.0.18` | abort `^0.0.9`; codec `^0.0.2`; contract `^0.0.16`; emitter `^0.0.9`; router `^0.0.13`; timeout `^0.0.9` |
| L3 | terminal — `0.0.15` / `0.0.14` | console `^0.0.12`; contract `^0.0.16`; database `^0.0.13`; emitter `^0.0.9`; form `^0.0.5`; sse `^0.0.6` |
| L3 | workspace — `0.0.8` / `0.0.7` | contract `^0.0.16`; database `^0.0.13`; emitter `^0.0.9` |
| L4 | brief — `0.0.8` / `0.0.7` | contract `^0.0.16`; emitter `^0.0.9`; interpret `^0.0.12`; reason `^0.0.9` |
| L4 | mcp — `0.0.29` / `0.0.28` | codec `^0.0.2`; contract `^0.0.16`; emitter `^0.0.9`; process `^0.0.10`; sse `^0.0.6`; tool `^0.0.13`; websocket `^0.0.11`; peers: router `^0.0.13`, server `^0.0.18` |
| L4 | middleware — `0.0.20` / `0.0.19` | abort `^0.0.9`; budget `^0.0.9`; contract `^0.0.16`; timeout `^0.0.9`; peers: database `^0.0.13` optional, server `^0.0.18` |
| L4 | program — `0.0.13` / `0.0.12` | contract `^0.0.16`; emitter `^0.0.9`; qualifier `^0.0.13`; rater `^0.0.13`; reason `^0.0.9` |
| L4 | worker — `0.0.12` / `0.0.11` | contract `^0.0.16`; database `^0.0.13`; emitter `^0.0.9`; pool `^0.0.10`; queue `^0.0.12` |
| L4 | workflow — `0.0.18` / `0.0.17` | abort `^0.0.9`; budget `^0.0.9`; contract `^0.0.16`; database `^0.0.13`; emitter `^0.0.9`; queue `^0.0.12`; timeout `^0.0.9` |
| L5 | agent — `0.0.21` / `0.0.20` | abort `^0.0.9`; budget `^0.0.9`; contract `^0.0.16`; database `^0.0.13`; emitter `^0.0.9`; queue `^0.0.12`; timeout `^0.0.9`; tool `^0.0.13`; workflow `^0.0.17`; workspace `^0.0.7` |
| L5 | probe — `0.0.13` / `0.0.12` | contract `^0.0.16`; emitter `^0.0.9`; lsp `^0.0.6`; mcp `^0.0.28`; queue `^0.0.12`; timeout `^0.0.9`; tool `^0.0.13`; external optional peers: oxlint, typescript, vitest |
| L6 | ollama — `0.0.15` / `0.0.14` | agent `^0.0.20`; budget `^0.0.9`; contract `^0.0.16`; ndjson `^0.0.9`; timeout `^0.0.9`; tool `^0.0.13` |
| L6 | toolbox — `0.0.13` / `0.0.12` | agent `^0.0.20`; contract `^0.0.16`; database `^0.0.13`; form `^0.0.5`; relation `^0.0.11`; server `^0.0.18`; terminal `^0.0.14`; tool `^0.0.13`; workflow `^0.0.17`; workspace `^0.0.7` |

**Observed facts**

- The runtime, peer, and optional in-pass graph has no cycle. No manifest declares `optionalDependencies`. Middleware’s database peer is optional through `peerDependenciesMeta`.
- Retained manifests show no bundled declarations or overrides.
- Every captured local version except scaffold is absent from its captured registry version list, so it is prepared and unpublished. Scaffold remains `0.0.63`, equal to the captured registry latest.
- Every in-pass runtime or peer pin targets an older captured registry version than the corresponding prepared local package. In this `0.0.x` fleet, those caret ranges are exact pins. The final artifact graph therefore requires each visited dependent to settle and rewrite its own pins before acceptance.
- Development tooling is separate from release ordering. Guide, scaffold, probe, and test form a development bootstrap cycle through their dev declarations. Every package’s dev closure also names this tooling set. This cycle must be provisioned by identified temporary artifacts; it cannot certify the final release closure.
- The direct MCP-to-Probe path is: lower runtime artifacts → router and server peer artifacts → MCP tarball → Probe tarball. Database’s captured dev prerequisites include guide, probe, scaffold, and test; the retained handoff records Probe’s database head-start tarball as provisional tooling, not a runtime edge.

**Execution order and blast radius**

- Before L0, prepare the guide/scaffold/probe/test tooling cycle with artifact identities and keep it separate from final dependency proof. Guide’s retained source candidate and Ollama’s parked candidate remain source-state risks.
- For each layer, refresh branch relation and registry data; retain the owner’s prepared version where it covers accepted work; align runtime, peer, optional, and dev pins; apply the canonical scaffold correction through the supported library mechanism; build and pack; then supply only the accepted tarball to dependents.
- A changed runtime, peer, or optional artifact invalidates every downstream package named in the table. A dev-only re-pin does not create a consumer cascade, but a changed emitted artifact invalidates the dependent proof that consumed it.
- The L4 MCP artifact changes the Probe acceptance seam. Probe must consume that packed MCP artifact and pass its real-transport proof. Database’s tool bootstrap must be refreshed if the Probe artifact changes.
- The publication sequence remains conditional on accepted tarballs and owner direction. No bump is recommended merely because the pass resumed.

**Acceptance evidence per visit**

- Fresh remote relation, registry reading, manifest, package-lock, and dirty-state receipt.
- Chosen local version present in the packed manifest, with tarball digest and accepted source commit.
- Direct lower-layer resolutions, nested copies, peer metadata, and optional-install behavior inspected from the isolated consumer’s installed tree.
- Scaffold correction applied through `createBlueprint` / `Compiler` / packed-host `Materializer.audit` and `Materializer.repair`; do not use the CLI repair path that declares manifest pins.
- Targeted package gates, final gate chain, and a consumer proof from the accepted tarball. The MCP-to-Probe seam requires its real transport proof.

**Deferred to layer visits**

- Installed and nested resolution state is unknown. Read each isolated consumer’s installed `node_modules/@orkestrel/*/package.json` declarations and run `npm ls @orkestrel/<package>` after tarball installation.
- Final gate status, packed-artifact provenance, peer installation behavior, optional installation behavior, and final branch freshness are unknown. Read the visit’s retained gate logs, packed manifest and digest, Git relation receipt, and registry response.
- `origin/main` in the survey is cached. Refresh it before accepting ancestry or selecting a release version.
- The source acceptance state for Guide and Ollama remains governed by the handoff table; this graph does not settle either candidate.

**Decision evidence**

- `.orkestrel/campaign/docs-parity/evidence/d7n-layer-survey-diagnostic/*/package.after.json`
- `.orkestrel/campaign/docs-parity/evidence/d7n-layer-survey-diagnostic/*/npm-view.stdout.txt`
- `.orkestrel/campaign/docs-parity/evidence/d7n-layer-survey-diagnostic/rows.jsonl`
- `.orkestrel/campaign/docs-parity/d7n-layer-survey-reading.md`
- `.orkestrel/campaign/docs-parity/d7n-layer-survey-verify-report.md`
- `.orkestrel/campaign/docs-parity/d7n-layer-alignment-plan.md`
- `.orkestrel/campaign/docs-parity/handoff.md`
- `.orkestrel/campaign/docs-parity/d7n-layer-supported-map-reading.md`
- `.orkestrel/campaign/docs-parity/d7n-layer-supported-map-report.md`

