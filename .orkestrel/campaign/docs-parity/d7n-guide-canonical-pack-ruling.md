# Canonical Guide packing

Build and validate the canonical Guide checkout with accepted dependency tarballs.
Keep its registry-installable manifest and lock during these gates. After source
acceptance, edit only the runtime ranges in package.json immediately before
npm pack --ignore-scripts: Contract ^0.0.17 and Markdown ^0.0.14. Keep Guide 0.0.18.
Restore the exact captured manifest bytes after packing, including a failed pack.
Do not commit or checkpoint the temporary ranges.

Check manifest, lock, guide-index, and staged-index preservation. Read the packed
manifest and record the artifact hash and installed prerequisite identities. Label
the archive local-artifact-only. Registry-final locks and registry installability
remain pending publication of its runtime dependencies. Add no direct HTML edge.

The reused objective analyst accepted this sequence without a design conflict.
Root adopts it to replace copied-package preparation under the owner's direct-
checkout instruction. No upload is authorized.
