# Guide native-adoption root carrier report

The unexecuted carrier is [check-guide-native-adoption.sh](../pass/check-guide-native-adoption.sh).

It rejects unsafe or occupied evidence targets. It records the accepted archive hash, Guide commit, tracked state, staged metadata, and manifest hashes before the aligned guide commands. It retains each command's separated output and exit, rejects rewrite markers, and refuses state changes.

It compares the canonical Guide distribution with the accepted extracted archive and Scaffold's installed distribution. It also compares the archive and canonical README.

On execution it creates `$SCR/<label>` with archive and commit readings, before and per-command
state captures, command stdout/stderr/exit files, and archive/canonical/installed comparison
outputs and exits. The carrier has not run. Root owns that execution and acceptance.
