# Probe release-head carrier report

## Scope

- Added `tmp/pass/install-probe-release-head.sh` as the Probe-only successor to `install-probe-runtime-head.sh`.
- Preserved the predecessor's arguments, canonical paths, archive checks, runtime roots, tracked-state receipts, and Guide and Scaffold distribution checks.
- Left the predecessor, shared readers, package manifests, lockfile, source, and peer metadata unchanged.

## Toolchain staging

- Reads each external development range with the final-visit `npm --prefix "$target" pkg get` mechanism.
- Captures range and supported-registry stdout, stderr, exit status, and command evidence under the carrier's evidence directory.
- Validates caret ranges and plain numeric registry releases before assembling quoted `name@version` install arguments.
- Adds the selected external roots to the existing no-save, ignore-scripts install.
- Reads each installed external version through `read-package-field.mjs`, requires equality with the registry observation, and records the result in `external-versions.txt`.

## Validation

- Ran Git Bash syntax validation only: `bash -n tmp/pass/install-probe-release-head.sh` exited `0`.
- Did not run the carrier, npm, a product command, an install, a commit, or a push.
