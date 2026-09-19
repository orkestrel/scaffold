# Record the anchor gate runner

The Node control recorded native exit `7`, runner host exit `7`, and retained stdout and stderr markers on Windows on 2026-09-18. The package gates remain unrun.

## Identify the assignment

The effective dispatch is `../../../../raw/canonical/tmp/units/anchor-gate-runner-brief.md`. This report covers instrument authorship and isolated controls. Root owns independent review, source freeze, the actual release reading, and acceptance.

The runner invokes `process.execPath` with explicit argv and cwd. It opens exclusive stdout and stderr files before spawning the child, passes their descriptors directly as launch-time stdio, waits for the child's `close` event, and writes an exclusive `summary.json` file. It sets `process.exitCode` to the native child exit when that exit is available without a signal or instrument failure.

The installed npm entry exists at `C:/Users/mikes/scoop/apps/nodejs-lts/current/bin/node_modules/npm/bin/npm-cli.js`. The installed npm manifest records version `12.0.2`; the executed Node reports `v24.20.0`. The instrument reads package manifests and invokes no npm shim or dynamically assembled shell command.

## Identify the authored paths

The implementation and report paths are:

- `../../../../raw/canonical/tmp/release/run-anchor-gates.mjs`
- `../../../../raw/canonical/tmp/release/anchor-gate-control.mjs`
- `../../../../raw/canonical/tmp/units/anchor-gate-runner-report.md`

The retained control artifacts live in `tmp/units/anchor-gates-control-node/` and `tmp/units/anchor-gates-control-node-2/`. Each directory retains `summary.json`, `stdout.log.txt`, `stderr.log.txt`, `runner-executed.mjs`, and `control-executed.mjs`. The successor directory also retains `host-readings.json`, which records exact control commands, host exits, marker readings, and SHA-256 measurements.

Historical PowerShell scripts and control directories were not edited or rerun. Candidate source and package scripts were read only. No shared-file patch is proposed.

## Record the control commands

Run the commands from `C:/Users/mikes/WebstormProjects/scaffold`. Explicit shell exit propagation preserves the Node process exit through Windows PowerShell's command wrapper.

The `wrong-head` control ran before successor output creation:

```powershell
node tmp/release/run-anchor-gates.mjs 0000000000000000000000000000000000000000 --control
$hostexit = $LASTEXITCODE
Write-Output "CONTROL_OUTPUT_EXISTS=$(Test-Path tmp/units/anchor-gates-control-node-2)"
Write-Output "HOST_EXIT=$hostexit"
exit $hostexit
```

The host returned exit `1`. The runner reported the expected commit mismatch, and `CONTROL_OUTPUT_EXISTS=False` confirmed that the output directory did not exist.

The shared runner exercised the `exit-seven`, `stdout-marker`, and `stderr-marker` controls:

```powershell
node tmp/release/run-anchor-gates.mjs 2f78b38a7c938d7e4f5b5c8f2030385bfcb5d6eb --control
$hostexit = $LASTEXITCODE
Write-Output "HOST_EXIT=$hostexit"
exit $hostexit
```

The host returned exit `7`. The summary records native exit `7`, signal `null`, propagated exit `7`, and `expired=false`. The child PID was `44912`. The measured duration was `0.13978239999999997` seconds. The stdout file contains `ANCHOR_CONTROL_STDOUT stdout-marker`; the stderr file contains `ANCHOR_CONTROL_STDERR stderr-marker`.

The `existing-output` control retained evidence and compared its hashes:

```powershell
$before = Get-ChildItem tmp/units/anchor-gates-control-node-2 -File | Get-FileHash -Algorithm SHA256
node tmp/release/run-anchor-gates.mjs 2f78b38a7c938d7e4f5b5c8f2030385bfcb5d6eb --control
$hostexit = $LASTEXITCODE
$after = Get-ChildItem tmp/units/anchor-gates-control-node-2 -File | Get-FileHash -Algorithm SHA256
$changed = Compare-Object $before $after -Property Hash, Path
$changed
Write-Output "EVIDENCE_UNCHANGED=$($null -eq $changed)"
Write-Output "HOST_EXIT=$hostexit"
exit $hostexit
```

The host returned exit `1`. The runner reported `existing-output`. The hash comparison reported no difference and `EVIDENCE_UNCHANGED=True`. The original Node control directory received the same refusal and unchanged-hash reading before the successor path was selected.

The scoped syntax commands returned exit `0`:

```text
node --check tmp/release/run-anchor-gates.mjs
node --check tmp/release/anchor-gate-control.mjs
```

The scoped `git diff --check -- ../../../../raw/canonical/tmp/release/run-anchor-gates.mjs ../../../../raw/canonical/tmp/release/anchor-gate-control.mjs ../../../../raw/canonical/tmp/units/anchor-gate-runner-report.md` command returned exit `0`. Git ignores the owned tmp paths, so this command reports only the tracked diff, which is empty. Syntax validation and the executed controls cover the authored instrument directly.

## Record the successor choice

The original Node control summary records native and propagated exit `7`, with its stdout and stderr preserved. The initial tool invocation's PowerShell wrapper returned exit `1` because it lacked explicit `exit $LASTEXITCODE` propagation. That wrapper reading does not certify the runner's host exit.

The fixed successor control output is `tmp/units/anchor-gates-control-node-2`. The successor command explicitly propagated the native shell exit and produced host exit `7`. This choice follows the dispatch's instruction to retain prior evidence and use a named successor. The actual release output path did not change. Root received the choice before the report closed. Executed-script copies preserve the exact instrument revisions associated with each control run.

## Record failure handling and limits

The runner requires a hexadecimal expected commit argument and accepts only the optional `--control` flag. The runner rejects a mismatched HEAD before creating output. An `lstat` check refuses existing output, and nonrecursive `mkdir` also refuses a raced creation. Exclusive log and summary creation avoids evidence overwrite.

A spawn error, null native exit, signal exit, or metadata failure records an instrument failure and returns exit `1`. The child cap is `900` seconds. Expiry attempts Windows process-tree termination through `taskkill.exe /PID RECORDED_PID /T /F`, records the termination reading, and returns exit `124` after child close. The termination command has a `30`-second timeout. Git metadata commands also have `30`-second timeouts. The Node control did not exercise expiry, signal termination, or spawn failure; those paths have no executed behavioral reading from this unit. A failed tree termination can leave the runner awaiting child close, so root must retain its independent hard cap for the actual run.

The control certifies native child exit and direct file-descriptor output retention through this runner on the dispatched host. It does not prove npm's package gates, package distribution, registry behavior, another host, or an expired process tree.

## Record the diff and status

The owned paths were absent before authorship. Scoped `git status --short` reports no tracked changes because the tmp tree is ignored. The canonical baseline carried user-owned `.codex` edits and campaign records. The candidate baseline carried source-unit edits; the control summary records its before and after HEAD/status without modifying those paths.

The additive instrument diffstat was measured with `git diff --no-index --stat -- /dev/null PATH`. Exit `1` from these commands denotes an additive difference:

```text
 /dev/null => tmp/release/run-anchor-gates.mjs | 197 ++++++++++++++++++++++++++
 1 file changed, 197 insertions(+)
 /dev/null => tmp/release/anchor-gate-control.mjs | 3 +++
 1 file changed, 3 insertions(+)
```

## Give root the actual invocation

After independent review and source freeze, root runs the following command from the canonical checkout. Replace `EXPECTED_COMMIT` with the candidate's reconciled commit; the placeholder denotes the mandatory expected HEAD argument.

```powershell
node tmp/release/run-anchor-gates.mjs EXPECTED_COMMIT
$hostexit = $LASTEXITCODE
exit $hostexit
```

Actual mode invokes the installed npm JavaScript entry with `run prepublishOnly` in `tmp/release/scaffold-0.0.75`. It writes to `tmp/release/scaffold-0.0.75/tmp/units/anchor-release-gates-node`. Root must retain the summary and stdout/stderr files beside its actual release reading.
