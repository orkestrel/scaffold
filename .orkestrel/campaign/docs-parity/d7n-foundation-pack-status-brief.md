# Packing comparison exit correction

Act as builder on Terra. Read the foundation-pack-carrier brief and follow its
authority, ownership and permission limits. Own only the unexecuted
tmp/pass/pack-foundation-final.sh and a separate correction report. Do not edit
the returned report. Root has not run the package operation.

Correct compare(): capture the command's nonzero status inside an else branch,
not after the completed if statement. Root reproduced the defect through
tmp/pass/check-foundation-comparison-status.sh: captured-after-if=0, exit0.
Persist statuses0 and1 as comparison readings. A status above1 is an execution
failure and must return that failure so set -e stops the carrier. Keep stderr in
the comparison evidence. Print the recorded map-excluding comparison too.

No package edits or package operation. Validate bash syntax. Return the exact
correction and scope evidence in tmp/units/d7n-foundation-pack-status-report.md.
