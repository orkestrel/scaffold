# Setup host fixture successor

Changed `tests/setupServer.ts` so the synthetic scripts root uses `codex.sh` and classifies its actual destination through `matchesExecutablePath(destination)`.

Changed `tests/setupServer.test.ts` to expect `scripts/codex.sh` as the synthetic executable destination.

Added `tmp/pass/scaffold-setup-host-fixture-successor/validate.sh`.

`C:/Users/mikes/scoop/apps/git/current/bin/bash.exe tmp/pass/scaffold-setup-host-fixture-successor/validate.sh` exited `0`. The focused test, scoped lint, and scoped format receipts are under `tmp/pass/scaffold-setup-host-fixture-successor/` and each exited `0`.

No remaining failure exists in this successor scope.
