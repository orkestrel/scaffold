# U3 report — server surface (native Opus implementer after bench reroute)

Delivered: UpgradeOptions (server/types.ts:171), UpgradeResult (:182), requestUpgrade
(server/helpers.ts:437, settles once, destroys the client socket, agent: false), and the split
capability probes supportsDirectoryLinks :490, supportsFileLinks :524, supportsMode :552,
supportsCase :578, supportsBytes :604 — each allocating via mkdtempSync, cleaning through
removeTree in a finally, reading refusal as false.

Repair: destroyScratch permission-hold proof re-keyed to a runtime probe
(PERMISSION_HOLD_REFUSES_REMOVAL) measured false as uid 0 and true as uid 65534; the recorded red
command now reports the case skipped with the probe's citation.

Validation: format/lint 0; test:src:server 0 with 133 passed, 6 skipped; root tsc 0; policy 0.
check:src:server exit 2 reported as a deviation with baseline-identical diagnostics proving it
pre-existed in U1's core files — repaired separately as F2.

Discrimination plants each reddened the named test and were restored to a verified digest.

Flags carried forward: tests/setupServer.ts duplicates the shipped probes (equivalence pinned at
tests/src/server/helpers.test.ts:1197; deletion belongs to the test repo's own adoption unit);
UpgradeResult's claimed member is derivable from status (documented, for the audit);
createLoopback cannot tear down an upgraded socket — fixtures own detached sockets (guide unit
documents the limit); destroyScratch's hold behavior remains unproven on a root container, settling
command recorded; guides red as planned; version still 0.0.8 until the bump unit.
