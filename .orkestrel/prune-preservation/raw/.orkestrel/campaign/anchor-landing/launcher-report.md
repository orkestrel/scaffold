# Launcher copy report

`tmp/release/launch-anchor-retention.ps1` copies the accepted gate launcher. It changes the output log, error log, JavaScript entry, and retention-facing labels. The retained Node path, baseline, working directory, process handle, cap, stream redirection, wait, and native exit propagation match the predecessor.

The PowerShell parser returned exit `0`. The named-substitution comparison returned exit `0`. The `git diff --no-index` command returned exit `1` because it found the recorded delta in `anchor-launcher-evidence/delta.patch`.

Root owns launcher invocation and its retained execution logs. This unit did not invoke the launcher or retention script.
