# Foundation final packing instrument

Act as builder on Terra. Perform this fully specified instrument unit directly;
spawn nothing. Read scaffold/AGENTS.md, .agents/orchestration.md, portability,
writing and quality rules, orkestrel-publish SKILL.md and its wave/window
references. No role installs, commits, publishes, authenticates, or runs a
tree-wide mutating command. Root runs the instrument after independent review.

Own only scaffold/tmp/pass/pack-foundation-final.sh and return a report under
scaffold/tmp/units/d7n-foundation-pack-carrier-report.md. Preserve all other work.
Use apply_patch, forward-slash paths, and the existing pass-env.sh. No secrets,
worktrees, copies of checkouts, inline Node, or discard-class git operations.

Write a bash instrument accepting package and fresh safe evidence label. Allow
codec, contract, msg, sse, test only. Resolve the canonical target from FLEET.
Require its expected pending version: codec 0.0.3, contract 0.0.17, msg 0.0.10,
sse 0.0.7, test 0.0.14. Use read-package-field.mjs for name/version checks.

Require an evidence directory named d7n-<package>-final-prepublish whose
action.exit.txt is exactly 0. Hash current manifest/lock and compare with that
run's manifests-after.sha256; compare current git diff HEAD --binary and index
with that run's recorded after files so the gate binds to this source state.
Capture git head, branch, status, index, diff HEAD --binary and manifest hashes.
Every Git invocation uses git -C. Do not reject the expected generated dirty
tree: root will commit it after packing acceptance.

Pack from the canonical final built tree with npm pack --ignore-scripts
--pack-destination into a fresh SCR/packed/<label> directory, cap 120s with 15s
kill grace. Capture stdout, stderr, exit and exact command. Require the expected
archive filename. Hash it, list archive members, extract only into that fresh
packing directory, compare packed package.json with canonical package.json,
compare packed dist with canonical dist byte-for-byte. Do not build or install.

Extract the retained baseline into a separate new subdirectory of the same
packing evidence directory, never into a checkout. Baselines under SCR/packed:

- codec: d7n-foundation-codec.eyQ8Pi/orkestrel-codec-0.0.3.tgz
- contract: d7n-foundation-contract.ZjPTS5/orkestrel-contract-0.0.17.tgz
- msg: d7n-foundation-msg.N3AAAA/orkestrel-msg-0.0.10.tgz
- sse: d7n-foundation-sse.zb8CDG/orkestrel-sse-0.0.7.tgz
- test: d7n-foundation-test.ufR41o/orkestrel-test-0.0.14.tgz

Record the baseline hash and compare baseline dist/src with final dist/src using
diff -qr first. Save the reading and status. Also record a comparison excluding
*.map. When that has differences, record a whitespace-insensitive comparison
with diff -r -w -B --exclude='*.map'. Preserve nonzero comparison statuses as
evidence, not a guessed material-movement verdict. Unexpected command failures
must fail the instrument. Do not compare metadata as runtime material.

Capture source state afterwards and require it unchanged. Print the evidence
path, archive SHA and comparison readings. Validate the script with bash -n only;
do not execute the release operation. Return paths, syntax status and deviations.
