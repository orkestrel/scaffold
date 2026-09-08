# Correct guide final evidence ordering

Act as builder on the native mechanical route. Perform directly and spawn nothing.
Follow the original d7n-guide-final-instruments-brief.md, its rules and skill, and this
bounded correction. Own only the same scratch scripts and the successor report
tmp/units/d7n-guide-final-instruments-2-report.md. Preserve the original report and
the initial script snapshots. No package edits, gate body, pack, install, commit, push,
permission change, credential access, or retained-record write.

Read d7n-guide-final-instruments-check-report.md. Correct its supported findings:

- In validate-guide-heading.sh, remove the success marker from the main body. Create it
  inside finish only after the incoming status is successful and every final state
  capture and comparison succeeded. Preserve an original failed command exit. Treat a
  final git capture failure as failure even when its resulting empty file happens to
  match the baseline. Capture failures must not make a success marker possible.
- In pack-guide-heading.sh, retain commit, version, artifact path, tarball SHA256, and
  dist SHA256 in a metadata file under the fresh log directory. Print the same metadata.
  Retain final status there only after clean state and HEAD checks succeed. Preserve the
  failure exit if writing or reading the metadata fails. Apply the final capture-failure
  handling to its finish trap as well.

Do not move the validator's trap. The checker says it is installed after preconditions,
but the actual script installs it before them. Root rejects that part of V1; the supported
V1 defect is the marker created before the comparison. Do not repeat the rejected finding
as a required fix. Keep the existing guards, gate order, no-overwrite packing, and scope.

Run syntax checks only and report exact paths and exits. The root caller will execute
only after successor review. No prose counts or engine identifiers.
