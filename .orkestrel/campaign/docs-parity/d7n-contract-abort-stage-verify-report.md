# Contract-to-Abort installed receipt

Native verifier on Terra returned this body. Root retained its findings unchanged.

GATE: GREEN

- Re-run ESM smoke: exit `0`.
  - Contract package path: `consumer/node_modules/@orkestrel/contract/package.json`
  - ESM SHA-256: `94bd1bfed211a25b466167a11cf303c8f19ed273c718d4f4b8af9b55312646c6`
  - CommonJS SHA-256: `25b06b99d200048e1b52a5c25709fb89d488651933d3a18fb41992ad31b4c80b`
  - Contract version: `0.0.17`
  - Abort resolves the consumer’s exact Contract package and declares `^0.0.17`.
  - Parent `false` reason propagates; invalid id throws consumer `ContractError`.

- Re-run CommonJS smoke: exit `0`.
  - Contract path: `consumer/node_modules/@orkestrel/contract/dist/src/core/index.cjs`
  - SHA-256: `25b06b99d200048e1b52a5c25709fb89d488651933d3a18fb41992ad31b4c80b`
  - Contract version: `0.0.17`
  - Parent `false` reason propagates; invalid id throws consumer `ContractError`.

- Staged Abort tarball identity: recomputed SHA-256 matches `logs/abort-artifact.sha256`:
  `3138c5dfeeff97c8d86ba9c78f03e5326bf215d257401fcce1a284ccf6087403`.

- Retained stage logs record exit `0` for Contract/Guide tarball installation, `check:src`, `build:src`, `test:src`, Abort pack, concrete consumer tarball install, ESM smoke, and CommonJS smoke. The installed-copy log records Contract `0.0.17` and Guide `0.0.18`.

- Retained canonical Abort status, diff, manifest digest, and lockfile digest match before and after. The accepted Contract digest is `88ef71a590f33edd9dc28bbdf65dc30ce9e2251fd9805807bb94bef0adcbca5a`.

- Anomaly: the staged build log reports an API Extractor bundled-TypeScript version advisory. It exits `0`.

Scope: this proves the installed tarball dependency mechanism only. Full Abort package gates, selected-path repair, and parity-pin closure remain outside this receipt.
