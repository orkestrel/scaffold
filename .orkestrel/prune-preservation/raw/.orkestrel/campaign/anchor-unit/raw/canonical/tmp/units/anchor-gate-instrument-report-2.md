# Anchor gate instrument

## Files

`tmp/release/run-anchor-gates-2.ps1` is the successor instrument. It runs the fixed `npm.cmd run prepublishOnly` command, redirects output at process launch, records the real native exit result, and exits with that result. It records the `exit-seven` and `redirected-markers` labels in the JSON summary.

## Cap

The runner ends a recorded child process tree after 900 seconds. It records the native child result and reports exit `124` when the cap expires.

## Control

The control command ran from the canonical checkout with candidate HEAD `2f78b38a7c938d7e4f5b5c8f2030385bfcb5d6eb`. Its redirected stdout contains `ANCHOR_CONTROL_STDOUT`. Its redirected stderr is empty. The summary records `null` for the native and propagated exit values, and the PowerShell host returned exit `0`. This failed the `exit-seven` control.

The corrected script refreshes the recorded process after `WaitForExit` before reading `ExitCode`. The failed control evidence directory remains retained, so this unit cannot rerun the control.

Run the isolated control from the canonical checkout after the root removes the failed successor control directory:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\tmp\release\run-anchor-gates-2.ps1 -Head 2f78b38a7c938d7e4f5b5c8f2030385bfcb5d6eb -Control
```

## Limits

The control does not invoke package gates. The real release gate remains root-owned and must run after the source writer freezes the candidate.

## Root command

After the source writer freezes the candidate, run the following command with the candidate HEAD observed at that time:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\tmp\release\run-anchor-gates-2.ps1 -Head CANDIDATE_HEAD
```
