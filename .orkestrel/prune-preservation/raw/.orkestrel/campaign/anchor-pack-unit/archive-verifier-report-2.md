SUPPLEMENT — GREEN

- `node -e` SHA-256 comparison exited `0`.
  - `tmp/release/packages/orkestrel-scaffold-0.0.75.tgz`
  - Actual SHA-256: `6815C4CA8145E2073B2E51C7E93F3105ABA5D6F9FFAA0DC2CD10E3A23FE7CBFC`
  - `adopt-scaffold-0.0.75-metadata.json` archive field: identical.

- `Select-String` inspection of `pack-anchor-candidate.ps1` exited `0`. Its only matched output destination is `Join-Path $release 'anchor-pack'`; no `baseline`, `packages`, or `refreshed-pack` target occurs.

This supplement verifies the designated predecessor chain. The original report remains unchanged: its `.72` retention observation is a scope limitation, not a candidate failure. No candidate checks, gates, pack commands, writes, or historical sweep ran.
