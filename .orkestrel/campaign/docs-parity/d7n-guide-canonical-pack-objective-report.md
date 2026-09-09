## Constraints ruling

The temporary canonical `package.json` overlay is acceptable. It does not make main npm-ci-incoherent if no checkpoint captures it and exact canonical bytes are restored immediately after packing.

Use this sequence:

- Capture exact bytes and hashes for Guide’s `package.json`, `package-lock.json`, and guide index.
- Build and validate in canonical Guide with the accepted tarballs already installed. Keep the registry-installable metadata during this work.
- Edit only `package.json` immediately before packing: set Contract to `^0.0.17` and Markdown to `^0.0.14`. Do not add HTML directly, alter the lock, or change the index.
- Pack Guide `0.0.18` from the canonical checkout. Prevent redundant lifecycle work if the established pack command supports that after the explicit build.
- Restore `package.json` from the exact captured bytes by editing, even when packing fails.
- Verify the manifest, lock, and index hashes match their captured values.
- Inspect the packed manifest and record its SHA-256. It must declare Guide `0.0.18`, Contract `^0.0.17`, and Markdown `^0.0.14`.
- Label the tarball `local-artifact-only`. Use it only with the accepted prerequisite tarballs already installed. Do not call it publishable or registry-installable until those runtime versions publish and the normal manifest/lock update can land coherently.

No design conflict exists. The only invalid state would be committing, checkpointing, or leaving behind the temporary overlay, or presenting its tarball as a registry-ready release.
