# Unit B3 report — browser: Windows real-launch diagnosis

Implementer (Opus 5) returned 2026-08-26. No repair (correctly outside its contract); diagnosis
complete with controls; tree unchanged beyond B1/B2 standing edits; instruments and leaked
processes/profiles swept to zero.

- Cause (both failure shapes): discovery ranks Microsoft Edge first on Windows (installed at
  `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe` — the campaign brief's "no Edge"
  host fact was wrong); Edge's launcher re-executes itself and exits 0 in ~100-1600 ms before CDP
  readiness; `Browser.#waitForLaunch` (`src/server/Browser.ts:690-718`) races readiness against
  direct-child exit and reads launcher exit as browser death. The re-executed browser carries the
  same `--remote-debugging-port` and parents the real tree; CDP `SystemInfo.getProcessInfo` names
  it.
- Negative control: the store Chromium stays alive to readiness under the identical argv — the
  instrument discriminates. Engine-forced control: `BROWSER_COMPATIBILITY_ENGINE=chromium` runs
  the full file green (104 passed | 1 skipped) in 20 s, exonerating the readiness read, path
  handling, store choice, and removal retries.
- `EPERM` is consequential: teardown signals the dead launcher, the surviving Edge tree holds
  `--user-data-dir`; removal succeeds the instant the tree dies and never before. One suite run
  leaked 443 processes and 55 profiles (swept).
- Not a test defect: Edge-first discovery is the library working as specified; a skip would hide a
  reachable product defect.
- Ruling accepted by the Orchestrator → unit B5: adopt the CDP-endpoint owner as the session's
  process; terminate its tree on Windows in-package (no new dependency); POSIX path unchanged;
  `pid` prose and guide teardown updated; closing condition — the real-launch file green on this
  host under default (Edge) discovery with no surviving process or profile.
