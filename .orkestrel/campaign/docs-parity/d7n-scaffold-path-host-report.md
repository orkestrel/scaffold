# Scaffold path host instrument report

Authored `tmp/pass/bootstrap-scaffold-path.sh`.

The script records immutable root readings under a fresh log directory. An exit trap records after readings and rejects changes to the root owner state. It rejects a wrong baseline, rejects a branch outside the campaign, and refuses an occupied or dangling-link worktree target. It installs only in the detached worktree, retains install and configuration-test logs, and preserves the configuration-test exit.

Validation: `bash -n tmp/pass/bootstrap-scaffold-path.sh` exited 0. `git diff --check -- tmp/pass/bootstrap-scaffold-path.sh tmp/units/d7n-scaffold-path-host-report.md` exited 0.
