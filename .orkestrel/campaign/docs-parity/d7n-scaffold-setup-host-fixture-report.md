# Setup host fixture

Changed `tests/setupServer.ts` within `createCheckout` and `buildCheckoutManifest`. Each synthetic nonempty host root uses `sample.md`, except `scripts`, which uses `sample.sh`. The checkout manifest preserves `matchesExecutablePath` classification through canonical `scripts/codex.sh` for the synthetic scripts member.

Changed `tests/setupServer.test.ts` to assert the `scripts` fleet root, `scripts/sample.sh` as the synthetic executable destination, and `scripts` in the vendored plan.

Added `tmp/pass/scaffold-setup-host-fixture/validate.sh`.

`C:/Users/mikes/scoop/apps/git/current/bin/bash.exe tmp/pass/scaffold-setup-host-fixture/validate.sh` exited `0`. The focused setup test receipt is `tmp/pass/scaffold-setup-host-fixture/focused.exit.txt`; its raw output is `focused.log.txt`. Scoped lint and format receipts are `lint.exit.txt` and `format.exit.txt`, with matching raw logs in the same directory. Each scoped conformance command exited `0`.

No remaining failure exists in this fixture scope.
