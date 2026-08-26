# Unit B1 report — browser: CRLF-safe finder-output parsing

Implementer (Opus 5) returned 2026-08-26. Acceptance met.

- `readFirstLine` exported leaf (split `/\r?\n/`, first non-empty trimmed line);
  `probeAllPathNames` routed through it; `launchBrowserProcess` TSDoc and the guide rows name the
  Windows non-detached teardown half; the guide teardown claim states the win32
  `ChildProcess.kill` path.
- Red-then-green: scoped helpers run — red 2 failed | 37 passed (39), including a REAL `where`
  multi-match case with fixtures planted in two scratch PATH directories; green 39 passed (39).
- Gates: `check`, `format:check` (199 files), `lint:check`, `test:guides` (53), `test:policy` (93)
  all green.
- Observation for the audit round: `guides/browser.md:1168` uses `ensures` (writing-rule ban) and
  states the POSIX half only.
