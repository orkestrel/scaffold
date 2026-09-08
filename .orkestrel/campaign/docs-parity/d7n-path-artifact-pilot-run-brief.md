# Author the pilot's root launch script

Act as builder on Terra under d7n-path-artifact-pilot-brief.md. Own only the additional
tmp/pass/path-artifact-pilot/run.sh file and tmp/units/d7n-path-artifact-pilot-run-report.md.
The pilot source is frozen; do not edit it. You are not alone. No command in the
authored script runs in this unit. No install, mutation, publication or delegation.

Read the original brief and this amendment. Root has packed the accepted existing
host build as tmp/pass/packed/path-bootstrap.4ppVCf/orkestrel-scaffold-0.0.63.tgz.
Its SHA-256 is 94cb80312c6ed57d78a0c67930d6c153fe2355be8c93df4f8429bd13306fed3b.
This is provisional bootstrap, not a release artifact. Root accepts it only with its
actual packed-host receipt and the pending mechanical check.

Write a Git Bash script that sources pass-env.sh, sets -euo pipefail, and uses quoted
forward-slash paths. Verify the exact archive digest with sha256sum and refuse a
mismatch before installation. Verify the pilot's private package.json exists and
refuse an existing node_modules directory. Save its checksum before installation.
Use exclusive mktemp -d under SCR for install logs. Keep the pilot's output path
as that evidence directory's absent child named result.

Run npm install --no-save --ignore-scripts --package-lock=false --no-audit --no-fund
with the exact tarball argument from the pilot directory. Retain stdout and stderr
separately. Check the saved private manifest checksum afterward and refuse a created
package-lock.json. Run node main.mjs with the absent absolute result path, retaining
its stdout and stderr separately and its real exit code. Print the evidence path
before work, then receipt paths on success. No cleanup, rebuild or fleet action.

The previous report's install recipe omitted --ignore-scripts and used separate
interactive commands. Do not execute that recipe. Retain it unchanged as a report
deviation; this file supplies the required saved-script launcher.

Run bash -n only. Return the actual authored source and syntax result. Root owns
installation, pilot execution, independent evidence review and final acceptance.
