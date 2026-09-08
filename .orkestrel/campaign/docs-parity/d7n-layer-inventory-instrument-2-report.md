# Layer inventory instrument successor report

Updated `tmp/pass/layer-inventory.mjs` and added direct controls at `tmp/pass/layer-inventory.test.mjs`.

The controls first failed because the predecessor did not export the successor completeness and output-guard helpers. The failing output is retained at `tmp/pass/d7n-layer-inventory-instrument-2-red.txt`.

The same command passed after the correction. Its raw output is retained at `tmp/pass/d7n-layer-inventory-instrument-2-green.txt`.

The instrument now records reasons for invalid local, Git, npm, attestation, registry, and drift readings. It preserves keyed npm dependency identity, rejects an occupied output path unless `lstat` reports `ENOENT`, and uses Windows `taskkill /PID /T /F` for timeout termination.

`node --check tmp/pass/layer-inventory.mjs` and `git diff --check -- tmp/pass/layer-inventory.mjs tmp/pass/layer-inventory.test.mjs` passed. Collection was not run.

Current root status reports only unrelated `package-lock.json` and `package.json` changes. The instrument and controls remain ignored beneath `tmp/`.
