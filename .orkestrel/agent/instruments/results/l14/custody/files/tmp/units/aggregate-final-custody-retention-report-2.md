# Aggregate calibration custody retention inventory — successor 2

Captured at 2026-10-12T00:35:19.591Z (UTC), during this unit's execution. The earlier `00:22` timestamp predates this run and is unverified; it was not reused.

The exact-reference walk completed with no missing paths or hash mismatches. The inventory records 341 unique files: 339 required hash-bound inputs and 2 useful execution receipts. Of these, 12 are already tracked under campaign paths and 329 are not. It includes all eight l14 freeze manifests, the deployment's 11 `controls[]` references, four `models[].metadata` references, the hash-bound receipt, and 320 request/response children explicitly named by the two referenced inventories. Every entry records source path, measured byte count and SHA-256, declaration source, and tracked-path status.

The deployment hash agrees with the binding in all eight freeze manifests. The calibration command plan and driver report are retained as useful receipts. The start receipt's `cwd` directory exists; it was not swept. Only request/response children named by its referenced inventory files were followed.

See [aggregate-final-custody-retention-inventory-2.json](aggregate-final-custody-retention-inventory-2.json) for the complete per-file records and [aggregate-final-custody-retention-read-2.ts](aggregate-final-custody-retention-read-2.ts) for the bounded reader. The original report and inventory remain unchanged. No artifacts were copied or modified.
