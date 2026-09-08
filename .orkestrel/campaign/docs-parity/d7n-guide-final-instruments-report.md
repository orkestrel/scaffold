# Guide final instruments report

Created `tmp/pass/validate-guide-heading.sh` and `tmp/pass/pack-guide-heading.sh`.

The validator checks the campaign branch, staged state, untracked files, and the guide-heading fix paths. It records status and binary diffs before and after its ordered gate chain. Its EXIT trap preserves a failing command status, prints the log directory, and rejects a successful chain that changed tracked state. It writes its success marker only after the comparison.

The pack instrument validates its full SHA input, clean checkout, branch, and HEAD before and after fetching. It checks `origin/main` ancestry, package identity, version `0.0.18`, the exact tarball, extracted distribution byte equality, and final clean state. It prints the commit, package version, tarball path, and measured SHA256 values.

`C:/Users/mikes/scoop/apps/git/current/bin/bash.exe -n tmp/pass/validate-guide-heading.sh` exited 0.

`C:/Users/mikes/scoop/apps/git/current/bin/bash.exe -n tmp/pass/pack-guide-heading.sh` exited 0.

`git diff --check -- tmp/pass/validate-guide-heading.sh tmp/pass/pack-guide-heading.sh tmp/units/d7n-guide-final-instruments-report.md` exited 0.

No package gate or packing command ran. No specification conflict remains.
