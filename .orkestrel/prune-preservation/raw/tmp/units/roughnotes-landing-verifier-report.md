**GREEN — landing verification**

- Original and `origin/main` resolve to `57b738fd38d4553d0f4f6a31ff4fb1030432a389`. Recovery resolves to the same commit.
- Original status has only staged `.codex/agents/orkestrel.toml` and `.codex/hooks.json`; no unstaged drift. Index blobs are `59069a1f5926a5a691982125cc4e0ec72f7e69fc` and `7c6257de2940b4bf16d64f7ff20834152c899404`.
- Backup-to-original Codex working hashes match. The recorded install has `npm ci` exit `0` (PID `39536`), `npm ls` exit `0` (PID `24628`), terminal success exit `0`, `@orkestrel/scaffold` `0.0.75`, `@orkestrel/test` `0.0.18`, and config SHA-256 `C8364A20FCA401E65F3C092968B1F6B4D4E025A1EFD91E22BEB01B3FCD39E076`. Recorded host is Node `v24.20.0`, npm `11.19.0`.
- Retention manifest records, frozen hashes, and declared operational hashes all match. Required references resolve; inventory-directory targets are present; excluded payload scan is clean.
- Report11 resolves at `operational-3/recovery/tmp/units/r-b-report-11.md`; required red/green and setup references are present. Retained receipts show green `failed: 0`, red `failed: 12`, and missing-target control `failed: 4`.
- Anomaly resolved by scope clarification: `tests/app/browser/setup.ts` is absent because the accepted recovery commit replaces prior app/test/guide edits. It is not part of the preserved user-Codex byte boundary. Initial file-only target reading also treated retained inventory directories as missing; directory-aware validation found no missing target.
