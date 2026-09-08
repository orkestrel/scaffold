# Guide artifact verification

GATE REPORT — GREEN for the local Guide artifact.

Artifact orkestrel-guide-0.0.18.tgz hashes to
8828ee3dfecc15d72d863f82c938c95a64d4323aa4d674a2f620735e62c61afc.

Canonical Guide is clean at ef6ada9975d71ce97ac20239f473c02b77e84cd9;
refreshed origin/main ancestry holds. format:check, lint:check, check, build,
test, pack, extraction and consumer install exited 0. Package tests recorded no
required skip.

The staged manifest retains 0.0.18 and changes only Contract ^0.0.16 to ^0.0.17
and Markdown ^0.0.13 to ^0.0.14. Canonical manifest and lock receipts are unchanged;
the archived bootstrap lock is unchanged. Packed manifest and full dist match the
staged build. The non-map baseline dist comparison ran and exited 0.

Independent corrected consumer smokes: ESM exit 0; CommonJS exit 0. They exercised
public findDrift, Guide's createSurfaceSymbolContract, dependency identity through
Guide/Markdown/HTML, and accepted entry hashes. npm ls --all exited 1 for the
bootstrap Test development range, 0.0.14 versus ^0.0.13, not staged runtime dependencies.

Carrier truth remains exit 1: its original ESM driver imported
createSurfaceSymbolContract from Contract. Gates, pack, extraction and consumer
installation had already completed. The corrected driver-only resume exited 0;
artifact bytes were not rebuilt. The earlier jREDPY stage stopped before gates
because its inspector resolved Guide's unbuilt dist entry.

Open: parity-entry consolidation and registry-final test:distribution. The latter
was intentionally not run because staged runtime versions are unpublished.

Provenance: independent native verifier foundation_receipts_verify, Guide follow-up.
