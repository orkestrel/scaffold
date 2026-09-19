# Roughnotes registry gates author report

The task instruments are ready. Root must launch them with this command:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File C:\Users\mikes\WebstormProjects\scaffold\tmp\release\launch-roughnotes-registry-gates.ps1 -Run roughnotes-registry-gates-20260918
```

The Node runner requires the fixed recovery root, branch `recovery/journey-20260918`, and HEAD `86a9ef6bc4620fdf36c47af1f4c530693357eb86` before it creates run evidence. It records source snapshots, Git status, and package/lock/installed identities before and after the sequence. It runs `format:check`, `lint:check`, `check`, `build`, and `test` without `CAPTURE`, then runs `test:journey` with `CAPTURE=1`. A failed child ends the sequence, records its logs and terminal record, and returns its native nonzero exit.

The PowerShell launcher records its retained process handle and PID, redirects output, limits the process tree to 900 seconds, writes a launcher result, and exits with the native result. It refuses an existing run name or launcher logs.

Syntax validation passed. Node checked `tmp/release/run-roughnotes-registry-gates.mjs` with exit `0`. PowerShell parsed `tmp/release/launch-roughnotes-registry-gates.ps1` with no diagnostics.

The inert child control passed. `roughnotes-control-20260918/control.json` records PID `36176`, stdout, stderr, exit `7`, and no signal. Its paired `successor.json` records `skipped: true`. The control command returned exit `0` after proving that behavior. The logs are retained in `tmp/units/roughnotes-registry-gates-evidence/roughnotes-control-20260918/`.

The owned files are `tmp/release/run-roughnotes-registry-gates.mjs`, `tmp/release/launch-roughnotes-registry-gates.ps1`, this report, and `tmp/units/roughnotes-registry-gates-author-evidence/`. Git status suppresses these ignored temporary paths. Their SHA-256 readings are:

| File | SHA-256 |
| --- | --- |
| `tmp/release/run-roughnotes-registry-gates.mjs` | `0558C2EA7C08D7C2507FD05892F118D3EB1ACAE87A8C8947F837EB6746D75805` |
| `tmp/release/launch-roughnotes-registry-gates.ps1` | `8E09376F24EFB0C74FABCAEEA7586F537ECC4F58CF048C16AC24DB545426502E` |
| `tmp/units/roughnotes-registry-gates-author-evidence/control-child.mjs` | `CC4F2E3DF915DE6C7BA3243E42138D96BC7A2357AD8B5663998FB04F7F7AFD27` |

Actual product gates and the final capture did not run during authorship. Root owns that evidence.
