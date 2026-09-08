# Layer inventory instrument report

Created `tmp/pass/layer-inventory.mjs` without running collection.

The instrument validates its arguments, requires a fresh output directory, and records local manifests, lockfiles, Git readings, npm trees, installed attestations, registry packuments, and end-state drift. It labels `origin/main` as cached and returns a nonzero status for incomplete collection or observed drift.

The current root has unrelated changes in `.orkestrel/campaign/docs-parity/`, `package.json`, and `package-lock.json`. This unit did not modify them.
