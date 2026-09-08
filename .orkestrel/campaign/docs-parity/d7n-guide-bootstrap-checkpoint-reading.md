# Guide bootstrap checkpoint

Guide's canonical path propagation and full host gate chain passed. The candidate is
checkpointed as 0accc1509113e67e2362a51cd9789e5b05005879 and pushed to the campaign
branch. Main remains unchanged; this checkpoint is not a reader closure or release.

The configured-policy command exited 1 before public repair and 0 afterward. The
repair wrote only tests/setupPolicy.ts and tests/config.test.ts. Preserved source,
manifest and lock bytes did not change. The accepted pilot supplies the mechanism
controls; the driver checker remains in progress.

Root's validate-guide-bootstrap.sh chain exited 0. Its format, lint, type, build,
test and docs logs each end in exit=0. The script's success marker requires unchanged
tracked state. See evidence/d7n-guide-bootstrap-gates/ for those exact readings.

The gate script is a mechanical successor of the retained Guide runner. Its diff
changes only the bootstrap label and selected vendored-path allowlist. No gate was
removed or weakened. Its author used the native builder; root read the actual diff
and ran it. Final independent package verification follows the retained R1–R6 fix.
No further design lanes ran for this runner reuse, under the owner's instruction to
reuse accepted checks and focus on downstream artifacts.

The remaining reader correction is carried only by
d7n-guide-heading-close-fix-brief.md. The old head-start artifact remains installed
in consumers until the corrected Guide is accepted and packed.
