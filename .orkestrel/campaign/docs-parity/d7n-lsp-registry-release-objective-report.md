Objective lane held.

**METADATA — CONFIRMED**

- Canonical and packed manifests declare `@orkestrel/lsp@0.0.7`; the downloaded baseline declares `0.0.6`.
- Registry receipts resolve Contract `0.0.17`, Emitter `0.0.10`, Process `0.0.11`, Guide `0.0.18`, Scaffold `0.0.64`, Test `0.0.14`, and Probe `0.0.12`.
- `lsp-roots.stdout.txt` confirms those installed versions and preserves `vscode-languageserver-protocol@3.18.2`.
- Runtime dependency names retain their roles. No peer or optional metadata was removed.
- The runtime ranges changed from the published baseline. The no-map and whitespace-insensitive dist comparisons also exited `1`, independently establishing material movement and the `0.0.7` bump.

**TOOLING — CONFIRMED**

- Online overwrite and audit exited `0`.
- Final Guide and Scaffold version checks and complete dist comparisons exited `0` against their registry-confirmed archives.
- `package.json` directly maps `test:guides` to `node --experimental-strip-types tests/guides.test.ts`.
- The retained diff deletes `scripts/docs.ts` and `scripts/metamodel.sh`; `scripts/guides.ts` is absent. A narrow search across the manifest, README, tests, configs, and own guide found no dangling launcher reference.
- Guide and Scaffold mirror comparisons exited `0`.
- The `guides/lsp.md` and `tests/guides.test.ts` hashes agree before overwrite, after overwrite, and after the final visit.
- The dirty paths match the brief’s generated catalog, mirrored guides, metadata, and Scaffold-owned script cleanup. No unexpected authored path appears.

**ARTIFACT — CONFIRMED**

- The final `prepublishOnly` receipt exited `0`. The API Extractor compiler notice and child-process deprecation warning accompany successful commands and no failed gate.
- Actual `npm pack --ignore-scripts` exited `0`.
- The archive SHA-256 is `09335ae7bd72220582b421340330c3567ab637381b7c0aef5de9cad36422741e`.
- The extracted packed manifest equals canonical `package.json`; complete packed `dist` equals canonical `dist`.
- The registry `0.0.6` archive downloaded successfully. Material dist comparison remained different after excluding maps and ignoring whitespace.
- `pack-upper-layer-final-verified.sh:55-64` binds packing to the successful prepublish receipt and its exact manifest, diff, and index. Lines `82-83` bind packed metadata and dist to canonical state. Lines `119-125` prove packing preserved status, index, diff, and metadata.

**ROOT-CARRIER — CONFIRMED**

- `prepare-lsp-registry.sh` verifies the starting identity, branch, HEAD, clean index, clean tree, registry versions, fresh evidence paths, and origin/main ancestry.
- It restricts initial install changes to `package.json` and `package-lock.json`.
- It records and pushes preparation commit `d2c5e0299e87aad1b08252b09fe9e243c4f1dbdb`.
- Lines `93-110` run supported overwrite/audit, remove the retired docs entry, preserve authored hashes, regenerate the lock, run `npm ci`, and recheck installed Guide and Scaffold distributions.
- Lines `112-120` verify final ranges and invoke format, prepublish, and bound packing.
- The prepared HEAD equals the final captured HEAD. No upload command appears in the retained command ledger.
- This confirms the frozen preparation state only. The later LSP guide correction, its replacement gates, release commit, and publication remain outside this verdict.

The prior Interpret proof gap is closed by the retained `d7n-interpret-upper-native-green` exit `0`. Its separately assigned preservation correction is outside this LSP review.

VERDICT: PASS
