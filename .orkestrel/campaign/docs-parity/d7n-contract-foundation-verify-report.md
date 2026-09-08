# Contract foundation artifact verification

Native verifier on Terra returned this receipt. Root retained its body unchanged.

GATE REPORT — GREEN

Accepted Contract artifact: `tmp/pass/packed/d7n-foundation-contract.ZjPTS5/orkestrel-contract-0.0.17.tgz`
SHA256 recomputed: `88ef71a590f33edd9dc28bbdf65dc30ce9e2251fd9805807bb94bef0adcbca5a`

Accepted Guide artifact: `tmp/pass/packed/d7n-guide-bootstrap.47Q7XT/orkestrel-guide-0.0.18.tgz`
SHA256 recomputed: `3a60e83f4c6319f029106f3d9588ed186639f72c222a34045326439cfff73519`

Contract receipt exit truth: registry view, fetch, Guide tarball install, `prepublishOnly`, docs, pack, extraction, and repair all exited `0`. `prepublishOnly` recorded, in order: `format:check`, `lint:check`, `check`, `build`, `test`, and release-mode distribution. `dist-diff.txt` is empty. Pack members include each declared root import and require target plus their declarations.

Guide pack receipt: fetch, build, pack, extraction, and extracted-to-built core comparison exited `0`. Its installed core hash is `6455f6f9399961cc499631c8e3d7db7e7b5d7c5062c44ffd72144c41f1395205`, matching the receipt.

Contract source tip: `fd3fce2d2665027021bfef05bb7de1e546fa52ae`. Current manifest and lock hashes match the preserved receipt. Current status and binary diff show only `tests/setupPolicy.ts` and `tests/config.test.ts`, matching the repair receipt. No scope mismatch found.

Anomalies: the logs retain the API Extractor/TypeScript-version warning and the release distribution child-shell deprecation warning. `test:policy` and `test:config` each report skipped cases without naming them in the receipt logs; their identities are absent evidence. Do not treat development-pin or fleet closure as complete.
