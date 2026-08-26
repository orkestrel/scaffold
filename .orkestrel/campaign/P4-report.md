# Unit P4 report — probe: overlay case-divergence fix

Implementer (Opus 5) returned 2026-08-26. Acceptance met; no deviation.

- Mechanism: `Overlay` now takes `sensitive` (default `true`); keys candidates by a lookup key
  folded only when minted `sensitive: false`; stores the recorded spelling for `paths` and
  `covers`; `TypeStage` mints per-inspection overlays from its own `useCaseSensitiveFileNames`
  reading, so one reading decides declaration and matching. Containment never folds (pinned by
  test). `readDirectory`/`getDirectories` ruled no-canonicalization: direct `typescript.sys`
  references reading the real filesystem, no overlay key involved (grep evidence quoted).
- Red-then-green: the P1 miss reproduced as a real regression (`TypeStage.test.ts`, volume-probed
  `folding` gate): red 1 failed | 23 skipped → green 1 passed | 23 skipped. Owned files' suites
  green (Overlay 7; TypeStage 24); whole `test:src:server` observed green (172 passed | 4
  skipped).
- Gates: check, format:check (157), lint:check, test:guides (13) green. Guide overlay passage and
  `OverlayInterface.text` row updated.
- Residuals recorded: `RuntimeStage` still mints `new Overlay()` (exact match) — divergent-case
  Vite id reachability unmeasured; successor candidate for the audit round to attack. A joint
  two-file vitest invocation post-edit timed out under contention while each file and the full
  suite pass — Orchestrator's verify phase owns the authoritative reading. `covers` on an
  overlay-only directory asked in divergent case answers false — no route found, unmeasured.
- Re-baseline: unit P2 (probe guide prose) struck — canonical probe guide already names Windows
  behaviors; remaining POSIX mentions are dated measurements in the correct form.
