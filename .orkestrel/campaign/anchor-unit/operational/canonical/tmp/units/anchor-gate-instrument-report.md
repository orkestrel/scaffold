# Anchor gate instrument

`../../../../raw/canonical/tmp/release/run-anchor-gates.ps1` captures the candidate's fixed `npm.cmd run prepublishOnly` command. It refuses an existing evidence directory, checks the required candidate commit, redirects native output, and writes the child exit code with environment readings to `summary.json`.

The `-Control` switch runs `node.exe -e` with the static `ANCHOR_CONTROL_STDOUT` and `ANCHOR_CONTROL_STDERR` markers. The control uses `tmp/units/anchor-release-gates-control` and exits `7` when the static program reaches Node unchanged.

The control command ran from the canonical checkout with candidate HEAD `2f78b38a7c938d7e4f5b5c8f2030385bfcb5d6eb`. It returned exit `1`. The recorded child exit is `1`, and `stderr.log.txt` records a Node `SyntaxError`: `Start-Process` removed the double quotes in the earlier control program. The script now uses single quotes inside the static program.

The failed run created `tmp/units/anchor-release-gates-control`. The script must refuse that directory on every later invocation. This assignment prohibits cleanup, so the corrected control requires the root to remove the failed control evidence directory before invoking the command again.

Run the corrected control from the canonical checkout after that removal:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\tmp\release\run-anchor-gates.ps1 -Head 2f78b38a7c938d7e4f5b5c8f2030385bfcb5d6eb -Control
```

The control does not invoke package gates. The root release invocation omits `-Control` and uses the candidate HEAD recorded after the source writer freezes the candidate.
