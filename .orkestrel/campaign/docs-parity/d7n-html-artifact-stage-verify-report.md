GATES: GREEN

- HTML stage at `tmp/pass/d7n-html-stage.FBOpkx` records `format:check`, `lint:check`, `check`, `build`, and `test` with exit `0`.
- The staged package is `@orkestrel/html@0.0.9`, with only `@orkestrel/contract` changed from `^0.0.16` to `^0.0.17`. The staged lock receipt is unchanged.
- Installed readings resolve Contract `0.0.17`, Guide `0.0.18`, and Test `0.0.14`. `npm ls --all` exits `1` only for the expected bootstrap-invalid Guide/Test ranges; HTML’s required Contract runtime resolves correctly.
- Recomputed tarball SHA-256 is `970077f8671a978c271e7a790b78a6b44772d1f60d4e944fc381526c916c334b`, matching metadata. Packed manifest equals the staged manifest, and packed `dist` matches extracted `dist`.
- The installed consumer commands `node smoke.cjs ..\contract\package` and `node smoke.mjs ..\contract\package` each exit `0`. They prove CommonJS and ESM rendering/document guards and Contract `0.0.17` resolution with matching runtime digests.
- Canonical HTML checkout: clean status and diff receipts; source tip is `0b953169d8a541a8b2bc91f0170c301bd5b9cdca`.
- Repair receipt limits writes to `tests/setupPolicy.ts` and `tests/config.test.ts`; the preserved receipt records unchanged values.
- Root-owned Git-boundary change matches the retained predecessor: the only added line is `run repository git -C "$COPY" init` immediately after archive extraction. It initializes only the disposable archive copy and changes no source or ignore policy.

Observed limits:

- `test:distribution` was not run because Contract `^0.0.17` is not registry-served.
- Revised parity revalidation and registry-final distribution remain pending.
- Build logs warn that API Extractor bundles TypeScript `5.9.3` while the target uses `6.0.3`; the build exits `0`.
