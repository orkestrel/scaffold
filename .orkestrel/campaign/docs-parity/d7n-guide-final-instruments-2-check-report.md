# Guide final instruments successor check

1. V1 — CONFIRMED

Evidence: `tmp/pass/validate-guide-heading.sh:80-109` installs the EXIT trap before all argument, branch, state, and gate preconditions. `finish` captures final status and diffs at lines 64-76, preserves the original command status when capture fails, compares state before success, and touches the success marker only at lines 81-87 after successful comparisons. The prior report's statement that trap placement was late is superseded as a report error; the actual premature-marker defect is corrected.

2. V2 — CONFIRMED

Evidence: `tmp/pass/validate-guide-heading.sh:103-109` runs format check, lint check, type check, build, test, and docs in the required order through `run`. The helper at lines 13-29 logs the exact command and exit and returns failures under `set -euo pipefail`. No install, docs-direction writer, formatting write, repair, or source cleanup appears.

3. P1 — CONFIRMED

Evidence: `tmp/pass/pack-guide-heading.sh:71-102` validates the sole full SHA argument, guide checkout, clean state, branch, HEAD, origin ancestry after fetch, package identity, version, fresh packed/extracted directories, exact tarball, and byte equality between extracted and built distribution. Lines 116-119 recheck clean state, unchanged HEAD, and retain final status. `run` logs fetch, build, pack, extract, and compare command failures.

4. P2 — CONFIRMED

Evidence: `tmp/pass/pack-guide-heading.sh:104-119` measures the commit, version, tarball path, tarball SHA256, and distribution SHA256, writes them to `$LOGS/metadata.txt`, and writes final clean status to `$LOGS/status-final.txt`. The EXIT capture at lines 45-69 retains final status and diffs. The metadata and status remain in the fresh log directory.

5. Root review launcher — CONFIRMED

Evidence: `tmp/pass/run-guide-heading-review.sh:4-14` requires the review brief and retained diff/status evidence, refuses stale journal and stderr paths, attaches the guide target through `--add-dir`, uses the `reviewer` route with plan mode, caps the run at 1800 seconds, and prompts the reviewer not to run commands, edit, delegate, or read credentials. All paths use forward slashes. `bash -n` exited 0.

Syntax evidence: `bash -n tmp/pass/validate-guide-heading.sh`, `pack-guide-heading.sh`, and `run-guide-heading-review.sh` each exited 0. No bodies or package commands ran.

VERDICT: PASS
