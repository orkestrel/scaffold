# Registered Probe: installed closure differs from the merged fix

The registered tool failed with the legacy-stream error. Root read the registration,
installed manifests and implementation, and the owner's merged MCP source.

The registration in .codex/config.toml points to node_modules/@orkestrel/probe/dist/bin/main.js.
The .mcp.json registration points to that entry too. The primary installed Probe version
is 0.0.12 and its MCP dependency is 0.0.28. The installed MCP core at its #forward method
stops and disposes every async-iterator answer, then returns the stream refusal.

The fleet MCP checkout is version 0.0.29 and contains the owner's 292c966 correction.
Its MCPLegacy.#forward method reads the progress token and routes an admitted progress
stream through #progress. The fleet Probe checkout is version 0.0.13. The owner-main
reconciliation preserved these source corrections; it did not replace the registered
tool's installed dependency closure. Root has not installed anything into the owner's
primary scaffold node_modules directory.

The error text alone does not prove the corrected implementation fails. The fixed
class still refuses streams that cannot be represented under its declared legacy
contract. Before changing the registration, drive the fixed packed closure through
the real legacy transport and record the actual request metadata and result. Do not
infer client progress-token behavior from the tool wrapper's error.

No source change, publication, credential operation, or server-registration change
was performed for this diagnosis. The direct Probe API fallback bypasses this transport
and remains distinct evidence from a registered MCP round trip.

Root also read Probe's fleet-installed MCP manifest: that checkout still resolves
0.0.28. Rebuilding Probe alone would therefore keep the older dependency. Root ran the
merged MCP source's MCPLegacy test file successfully; see d7n-mcp-legacy-source.log.txt.
This establishes the package test reading, not the registered client's metadata or a
packed consumer closure. The fixed guide admits a string or integer progress token on
tools/call and still refuses streams outside that boundary.

The owner's subsequent instruction makes dependency-first tarball propagation and
resolution proof part of fleet acceptance. Follow d7n-layer-alignment-plan.md. The
MCP-to-Probe real transport seam remains open until the aligned artifact closure runs.
