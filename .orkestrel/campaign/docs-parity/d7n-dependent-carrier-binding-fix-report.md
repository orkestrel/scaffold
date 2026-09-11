# Dependent carrier binding fix report

Updated `tmp/pass/commit-dependent-native-entry.sh` and `tmp/pass/prepare-dependent-registry-complete.sh`.

The source verdict checks read the final nonblank line with `awk`, strip a trailing carriage return, and require `VERDICT: PASS`. The registry carrier compares the final authored guide and guide-test hash receipt after its final capture.

Syntax checks: `C:/Users/mikes/scoop/apps/git/current/bin/bash.exe -n tmp/pass/prepare-dependent-registry-complete.sh` and `C:/Users/mikes/scoop/apps/git/current/bin/bash.exe -n tmp/pass/commit-dependent-native-entry.sh` exited `0`.

The carriers were not executed. No package command, installation, gate, Git change, or publication ran.
