# Guide runtime preparation

Accept Guide's tested metadata and mirrored-guide preparation at
f277b88bc1e8063521ce1acaa783913b0af1856a. The campaign branch is pushed. Final
refreshed Scaffold application and main closure remain open; do not publish yet.

Runtime pins now name Contract ^0.0.17 and Markdown ^0.0.14. Test's development pin
names ^0.0.14. The pending Guide version remains 0.0.18. The Scaffold and Probe
development pins remain registry-resolvable under the owner's tarball deferral.
The package's accepted native entry and public API are unchanged.

Root's d7n-guide-upper-final-prepublish exited 0. Actual packing and complete
canonical distribution comparison passed. The archive is
d7n-guide-upper-final-pack/orkestrel-guide-0.0.18.tgz with SHA256
c3bcbc4fd28d66a38dab69741835fd434b64bb23c9f0d128707a3b88ee19daaa. Root's raw-byte
comparison with the accepted native-entry build found no distribution difference.

The preparation commit carrier checked the current manifest hashes, full diff,
index, packed manifest and complete distribution against those receipts before
staging the explicit metadata/mirror paths. The target was clean after the commit.
The final visit must apply the repaired Scaffold archive, regenerate the lock as
needed, rerun prepublishOnly and bind the resulting actual archive before main.

VERDICT: ACCEPTED FOR PREPARATION
