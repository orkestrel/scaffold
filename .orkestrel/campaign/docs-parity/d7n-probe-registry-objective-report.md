Objective lane held. Probe source acceptance remains closed.

### REGISTRY — CONFIRMED

Attack: stale registry pins, unsupported external versions, lost optional-peer metadata, local resolutions, self-dependency, and repeated version bump.

Evidence: the final manifest pins the recorded registry versions for Contract, Emitter, LSP, MCP, Queue, Timeout, Tool, Guide, Scaffold, and Test. External development and peer ranges equal the supported registry observations while retaining their declared majors. Probe has no self-dependency. Oxlint, TypeScript, and Vitest remain optional peers.

The intentional `prior-*`, `self-version`, and `registry-lock-local` exit `1` receipts are successful absence checks. The pending version is `0.0.13`, while the registry observation remains `0.0.12`. Canonical manifest and lock hashes match the completed visit and pack receipts.

### OVERWRITE — CONFIRMED

Attack: unexpected authored-source changes, retained legacy entry scripts, an indirect guides command, and paths outside the allowed generated/dependency set.

Evidence: overwrite and audit exited `0`. `scripts/docs.ts` is deleted, `scripts/guides.ts` is absent, and `test:guides` directly runs `tests/guides.test.ts`. The frozen diff contains only `.claude/agents/orkestrel.md`, declared dependency guide mirrors, `package.json`, `package-lock.json`, and the retired docs script.

The Probe guide and native guide entry retain identical before/overwrite/final hashes. Canonical values still match those receipts:

- `guides/probe.md`: `9a0b3ab64c098244ca41f541e8dc42eb5590d94162adb02f546e6d746e5b329b`
- `tests/guides.test.ts`: `2d0f9cfda9287edb4c7082b459e9a2fcd0b5b02cc9ec0e729f24f6c6c95592f1`

### ARTIFACT — CONFIRMED

Attack: stale gate state, pack-time manifest drift, incomplete or stale dist, unchanged baseline output, and mismatched installed Guide/Scaffold bytes.

Evidence: final prepublish and actual pack exited `0` at HEAD `291668e9824a8f2448681e8bab52bf5c6e47a006`. Pack before/after HEAD, branch, status, diff, index, and manifest evidence is identical. Extracted dist equals canonical dist. The extracted manifest matches the canonical `0.0.13` manifest. Installed Guide `0.0.18` and Scaffold `0.0.64` distributions match their accepted archives.

The archive hash is:

`8fa05fa2962fec81ca31bfa9fbd3d8e468b7a2f638f63309add17efd9e3724b0`

The baseline `0.0.12` comparison reports material core and server output differences, while the bin output remains unchanged. That supports the pending bump without inventing a bin change.

The final legacy observer exited `0` with the expected receipt and clean case stages. The modern driven client and pinned legacy client cases also exited `0`. These runs prove the final canonical dependency graph, not the unchanged registered harness installation.

### CLOSE — CONFIRMED

Attack: stale visit or pack evidence, unexpected staged/untracked input, broadened path allowance, missing ancestry checks, incomplete pushes, dirty final main, and implicit publication.

Evidence: [`close-agent-probe-registry-supported-release.sh:58`](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/close-agent-probe-registry-supported-release.sh:58) validates the expected source HEAD, pending version, visit identity, verdict, campaign branch, prepublish, pack, manifest, diff, index, and archive hash. Registry and supported-major checks continue through [`close-agent-probe-registry-supported-release.sh:89`](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/close-agent-probe-registry-supported-release.sh:89).

The path allowlist at [`close-agent-probe-registry-supported-release.sh:132`](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/close-agent-probe-registry-supported-release.sh:132) admits only manifest, lock, catalog, retired docs script, and declared dependency mirrors. The carrier fetches and checks ancestry, commits with the required identity and trailer, pushes campaign and main, then requires clean local main and matching refs at [`close-agent-probe-registry-supported-release.sh:151`](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/close-agent-probe-registry-supported-release.sh:151).

The carrier performs no authentication, upload, or publication. Its readiness still depends on root installing the reconciled PASS verdict and excluding intervening writers.

VERDICT: PASS
