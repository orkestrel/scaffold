# R-B cold-host cache successor

`journey-cold-2.config.ts` derives the current journey wrapper's declared variants and applies `cacheDir` inside each `appJourney` result through `mergeConfig`.

Its `configResolved` observer compares the resolved cache directory with `R_B_COLD_CACHE`. Active mode prints `R-B-COLD-CACHE active=<path>`. The outer-only control omits only the project cache override and requires the observer's expected/actual refusal before test startup.

Run from canonical Scaffold:

```powershell
powershell.exe -NoProfile -File tmp/probe/run-r-b-cold-host-2.ps1
```

The runner preserves `CAPTURE`, restores its cache environment variables, records commands through each log, and requires generated cache files after every active journey project. No runtime command was run while authoring this successor.
