The successor admits the accepted original tree and records the install boundary without running `npm ci`. Root owns runtime acceptance. The effective brief is `install-brief-3.md`, and the effective instrument is `launch-install-original-3.ps1`. Earlier briefs and instruments remain unchanged.

Run the complete instrument with this exact invocation:

```powershell
powershell.exe -NoProfile -File "C:\Users\mikes\AppData\Local\Temp\roughnotes-integration-20260918\launch-install-original-3.ps1"
```

The script SHA256 is `DF4157F67C1B3BBAFBF9EE05E88931569E74CC304994CC20F61BD6599C331A07`. The complete delta against the predecessor is saved in `install-author-evidence/successor-3/script.diff.patch`. Native diffstat reports `195 insertions(+), 23 deletions(-)` for the instrument. The scoped `git.exe diff --no-index --check` reading returns exit `1` because the compared files differ and emits no whitespace diagnostic.

The actual production preflight ran this command before and after the repair:

```powershell
powershell.exe -NoProfile -File C:/Users/mikes/AppData/Local/Temp/roughnotes-integration-20260918/launch-install-original-3.ps1 -Check
```

Before the fix, the copied predecessor ran without reaching admission. Its `Git` function shadows executable lookup. The author control child was PID `39764`, in exec session `6435`. `taskkill.exe /PID 39764 /T /F` returned exit `0`, and the completed child returned native exit `1`: failed `1`, passed `0`. The recorded child is dead. The successor resolves an application command with `Get-Command git.exe`, takes the native command result directly, and invokes that executable through `Invoke-Git`. A retained intermediate preflight also exposed multiple native Git matches; the successor selects the returned executable before invocation.

After the repair, the same production preflight command returns native exit `0`: failed `0`, passed `1`. Its output is `Original install admission passed before output creation.` The real `original-registry-install-20260918` destination remains absent. Final native PowerShell parser validation reports errors `0`. Exact outputs and exits are saved in the `check-before`, `check-intermediate`, `check-after`, and `parser-final` evidence records.

The controls extract the production initialization and function definitions through PowerShell's native AST. They run `Get-Snapshot` against the actual original tree and call the production admission/comparison functions. Accepted identity returns exit `0`; a wrong HEAD, extra dirty status row, wrong top-level, and existing destination each return exit `1` before install output or npm execution. An unchanged preservation snapshot returns exit `0`; changed manifest hash data returns exit `1`. The controls change inert scratch observations, never original files or its index. Their exact commands, snapshots, streams, and native exits are saved beside `admission-controls.ps1`.

The production native process helper ran `npm --version` only. Its captured npm output is `11.19.0`; the helper returned native exit `0`, PID `43640`, retained handle `2720`, and `expired=false`. Command, arguments, working directory, cap `300` seconds, immediate PID, streams, and result are saved in the `native-version` evidence directory. This reading uses the actual native Node/npm entry; no package was installed. The process is dead.

The final read-only admission observes original root `C:/Users/mikes/WebstormProjects/roughnotes`, branch `main`, and HEAD `57b738fd38d4553d0f4f6a31ff4fb1030432a389`. Its complete status remains:

```text
A  .codex/agents/orkestrel.toml
A  .codex/hooks.json
```

The snapshot records the complete Git index, branch, HEAD, normalized physical/root paths, full status including individual untracked paths, and SHA256 values for `package.json`, `package-lock.json`, and the named user Codex additions. The accepted commit and exact status bind the already-verified manifest/lock without duplicating their identity parser. Before install, the script refuses reparse-point target ancestors and an existing output directory. It normalizes every path-comparison operand through the same native path API.

The instrument runs native `node.exe` with the npm CLI entry and `ci --ignore-scripts --no-audit --no-fund`. Its exclusive destination saves the script hash/invocation, before snapshot, exact npm command, process-start record, streams, native exit, timeout result, and termination output. It holds each process handle before waiting and captures process data before disposal. A timeout caps the process tree and reports exit `124`. Native nonzero exits propagate. Every exception after destination creation reaches the failure terminal path, retains partial evidence, and attempts a failure preservation snapshot.

After successful ci, the script writes and compares `after.json`, runs and saves `npm ls @orkestrel/scaffold @orkestrel/test --depth=0 --json`, and requires installed Scaffold `0.0.75` and Test `0.0.18`. It hashes the actual public artifact `node_modules/@orkestrel/scaffold/dist/host/codex/config.toml`. The recovery package's file at that location was independently read and measured as SHA256 `C8364A20FCA401E65F3C092968B1F6B4D4E025A1EFD91E22BEB01B3FCD39E076`. The script enforces that digest and compares a final preservation snapshot before writing success.

Touched paths are `launch-install-original-3.ps1`, `install-report-3.md`, and `install-author-evidence/successor-3/**`. No shared-file patch is required. Original/recovery source, indices, earlier evidence, and backup remain unchanged by this unit.

Actual ci, installed identity, artifact verification in original, timeout termination during install, and failure-terminal output from an actual install have not run. The proof covers parsing, real read-only admission, scratch negative controls, snapshot comparison, and the native process helper's read-only success path. Root's tracked actual invocation and an independent verifier close the remaining runtime acceptance.