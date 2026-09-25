All three lines were single runs I made to find where the time went. Each ran with temporary instrumentation in `tests/setupServer.ts`, restored byte-identically afterwards (`cmp`). My report left them out.

- **08:53:15 (11671 ms):** No short circuit. It ran with `console.log` timers and I kept no log, so my only evidence is my session transcript.
- **08:54:31 (10570 ms):** No short circuit. It wrote per-pass timings to `tmp/units/r2/probe/instrument.txt`, which I deleted before the next run. Only my transcript shows this.
- **08:56:07 (8863 ms):** Short circuit present.
  - `tmp/units/r2/setupServer.ts.instrument-backup` (modified 08:55:05) holds the short-circuit code.
  - `instrument.txt` (modified 08:56:07) holds this run's lines, with a `same` field only this instrumented copy wrote.

The instrumentation slowed these runs slightly, so I left them out of the `LEDGER_TIMEOUT` reading.
