# Foundation artifact receipt verification

Native verifier on Terra returned this body. Root retained its findings unchanged.

GATE REPORT — GREEN

- codec — GREEN. Artifact `orkestrel-codec-0.0.3.tgz`, SHA256 `105b7c15c7eb8a1d9fa707d35feaf7923dd521536749be62fd22dd3c16f447f7`. Fetch, repair, Guide install, prepublish, docs, pack, and extraction each exited `0`. Prepublish records `format:check → lint:check → check → build → test → distribution release`. Extracted `dist` comparison is empty; packed manifest matches the source manifest. HEAD matches `8c20e1599651647efc1478b86f2b30d685cc8db6`. Current diff is limited to `tests/setupPolicy.ts` and `tests/config.test.ts`; manifest and lock hashes remain preserved.

- msg — GREEN. Artifact `orkestrel-msg-0.0.10.tgz`, SHA256 `257d9c2db2279371147c7363819cb6fd12833113d3d12d48aa390ac2fa15ac41`. Every recorded visit stage exited `0`, with the required prepublish order. Extracted `dist` comparison is empty; packed manifest matches. HEAD matches `57128e98372d2bc94307236886beb5166d172664`. Current diff scope and preserved manifest/lock hashes match codec.

- sse — GREEN. Artifact `orkestrel-sse-0.0.7.tgz`, SHA256 `358c3105939cd7ab87ad1e0e3ea864d8955f6efa2a15046d471f717f9d7ece8c`. Every recorded visit stage exited `0`, with the required prepublish order. Extracted `dist` comparison is empty; packed manifest matches. HEAD matches `7778cff15ca587fdb12404a31737dc7a91225e1d`. Current diff scope and preserved manifest/lock hashes match codec.

- test — GREEN. Artifact `orkestrel-test-0.0.14.tgz`, SHA256 `d6ae5e57126d370b3316b528a8bd6dafaf2b64d9bdf52e73fead78065f7c5002`. Every recorded visit stage exited `0`, with the required prepublish order. Extracted `dist` comparison is empty; packed manifest matches. HEAD matches `1b6ce0468d40c676d1e544cd004c0a5aa09730f0`. Current diff scope and preserved manifest/lock hashes match codec. Distribution skips are conditional export-drive exclusions; release mode would fail on an unreachable registry or browser, so no required registry or browser proof is absent.

Across the receipts, the installed Guide core hash is `6455f6f9399961cc499631c8e3d7db7e7b5d7c5062c44ffd72144c41f1395205`, and campaign-retained evidence matches. Artifact members cover each declared export target.

Standing warnings: API Extractor reports bundled TypeScript `5.9.3` against target `6.0.3`; distribution logs report Node `DEP0190`. No missing receipt evidence found. Final tooling development pins and the fleet parity-pin tail remain open under Ruling 30.
