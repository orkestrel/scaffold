# Scaffold release commit carrier report

Created `tmp/pass/commit-scaffold-upper-release.sh`.

The carrier requires the retained campaign verdict, required receipts, fixed Scaffold identity, current receipt bindings, packed archive digest, and packed manifest and distribution equality. It permits only the brief's product inventory and `.orkestrel/campaign/docs-parity` campaign paths. It permits untracked input only under that campaign folder.

Every Git call runs through the receipt wrapper with `timeout --kill-after=15s 120s`. The carrier fetches origin and proves `origin/main` ancestry before staging. It stages the changed permitted product paths and the campaign folder explicitly, commits with the required identity and trailers, pushes the required refs, checks every remote ref against the release HEAD, rechecks the packed artifact, and leaves `main` checked out.

Syntax check: `C:/Users/mikes/scoop/apps/git/current/bin/bash.exe -n tmp/pass/commit-scaffold-upper-release.sh` exited `0`.

The carrier was not executed. No target, install, commit, push, or publication operation ran.
