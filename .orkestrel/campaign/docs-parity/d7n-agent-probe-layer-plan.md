# Agent and Probe release preparation

Prepare Agent0.0.21 and Probe0.0.13 on their canonical checkouts. The fresh catalog
places them in L5; the fresh registry still serves Agent0.0.20 and Probe0.0.12.
Their pending versions are already committed, so do not bump them again.

Root fetched origin and confirmed origin/main ancestry for Agent at 305af91 and
Probe at 93fc01d. Their trees are clean. No merge is needed. The published
Guide0.0.18 and Scaffold0.0.64 archives are installed no-save with full dist and
tracked-metadata equality. Direct native entry runs fail because their old
top-level @src/core imports are not native-resolvable. The source units replace
that entry using GuideCommand and preserve the accepted package-specific cases.

Complete this round by closing these responsibilities:

- Adopt the native entry in tests/guides.test.ts. Keep automatic authority
  rewriting there through GuideCommand. Scaffold owns manifest scripts and
  mandatory removal of retired script files.
- Preserve Agent's accepted A-item and Probe's P-item documentation fixes.
  Preserve Probe's heavy-fixture ruling. Review against the retained audit
  obligations; the owner's native-entry request supersedes the historical seed.
- Re-pin runtime, development and applicable peer ranges from fresh registry
  evidence. Preserve optional-peer metadata and external supported-major policy.
  Agent keeps the registry-resolvable Probe development pin until Probe ships.
- Run supported overwrite/audit, regenerate the lock, install the registry graph,
  sweep self-pins and run prepublishOnly. Compare and pack the actual built output.
- Prove MCP0.0.29 through Probe's built foreign-client transport. Keep the
  registered harness pathway distinct from package-level transport evidence.
- Use root-recorded gates and independent review; do not dispatch a fresh verifier
  under the owner's waiver. Reuse the objective analyst if available and keep
  the owner's separate review independent.
- Commit by path, push campaign and main, select clean canonical main and confirm
  archive/output/ref identity before replacing the consumed prompt.txt line.

No authentication or upload belongs to root. Later Ollama/Toolbox preparation,
the Supervisor owner decision, Probe development re-pins and the separately
versioned Scaffold generated follow-up remain outside this upload layer.
