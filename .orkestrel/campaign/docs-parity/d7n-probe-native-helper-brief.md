# Probe native helper correction

Read the original native-entry brief, current root AGENTS.md and its applicable
rules, and keep the original owned scope. Execute directly, spawn nothing. Own
only probe/tests/guides.test.ts, probe/tests/setupServer.ts,
probe/tests/setupServer.test.ts and
scaffold/tmp/units/d7n-probe-native-helper-report.md. You are not alone; preserve
all other changes. No installs, tree-wide commands, builds, commits or pushes.

Root prepublish at d7n-probe-native-source-prepublish failed lint because the
failure-table local rows shadows GuideCommand's rows. Rename that local to
failures and update its uses without changing the comparison.

The newly extracted extractClaimLiteral, extractExportComment and
extractProbeSection return an empty string to signal absence. AGENTS.md's
absence rule requires undefined. Change those return contracts and absence
branches to undefined; update their focused tests. At guide-test callers,
assert the required text is present and narrow explicitly before using string
methods. Never substitute an empty string at a call site; missing input must
fail the parity case. Preserve every CLAIM, DIGEST and workload byte. The
interface-property helper is unchanged. No new generic helper or public API.

Return the exact touched paths and a brief report. Root runs the lint, type and
native gates; the independent lanes review this successor with the whole diff.
