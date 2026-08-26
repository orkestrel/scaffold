# CI unit reports — T2, C2, L2, M1, SE1, TE3, PR1, S3, P3, B4

Builders (Sonnet) returned 2026-08-26. Acceptance met on all.

Common shape: `runs-on: ${{ matrix.os }}`; `os: [ubuntu-latest, windows-latest]`;
`node: ['22.12.0', '26']`; exclude row pinning Windows to the newer Node line; `fail-fast: false`;
action SHAs and steps byte-faithful to the scaffold reference; every named script verified present
per repository.

- **T2 terminal**: edit only; no browser project, no Playwright step. Status: workflow + T1's
  standing edits.
- **C2 console**: edit; browser project confirmed (`srcBrowser` enabled) → Playwright split into
  Linux (`--with-deps`) and Windows (plain) steps. Status: workflow + C1's standing edits.
- **L2 lsp**: full workflow created; no browser project → no Playwright; no `test:integration`
  analog → step omitted, reason recorded. Status: new `.github/` + L1/L1b standing edits.
- **M1 mcp**: edit; browser project confirmed → Playwright split. Status: workflow only.
- **SE1 sea**: edit; no browser project. Status: workflow only.
- **TE3 test**: edit; browser project confirmed → Playwright split. Status: workflow + TE1/TE2's
  standing edits.
- **PR1 process**: full workflow created; every project `browser: enabled: false` → no Playwright;
  no `test:integration` analog → step omitted, reason recorded. Status: new `.github/` + PR0's
  standing edit.
- **S3 scaffold**: edit; no browser project, so the pre-existing Playwright install step was
  removed with the reason recorded; `test:integration` step retained on both OS values. Status:
  workflow + standing campaign edits.
- **P3 probe**: full workflow created; no browser project → no Playwright; no isolated-proof
  analog → step omitted. Status: new `.github/` + P4's standing edits.
- **B4 browser**: edit; no Playwright vitest project (the suite drives real browsers over CDP and
  GitHub runner images ship Chrome and Edge) → no Playwright step; minimal matrix/exclude diff.
  Status: workflow + B1/B2/B5 standing edits.
- Checker lane 2026-08-26: every one of these workflows independently verified against the
  reference — matrices, exclude rows, action SHAs byte-identical, Playwright split present exactly
  where a `browser: enabled: true` project exists (console, mcp, test), scripts all resolve.
