# Roughnotes integration preparation successor report

The successor script is [prepare-2.ps1](prepare-2.ps1). It compares full measured porcelain arrays before backup creation, including every status state. Its Git wrapper throws after each native nonzero result. It rechecks original hashes and staged index entries after recovery staging.

Root must run:

```powershell
& C:\Users\mikes\AppData\Local\Temp\roughnotes-integration-20260918\prepare-2.ps1
```

The `-Control` command parsed and returned exit `0`. It refused an existing scratch destination, an in-memory extra status row, and the native `git rev-parse missing-ref-for-control` failure. The Git diagnostic is expected control evidence.

See [the actual successor diff](evidence/successor-2/prepare.diff.patch), [original expected status](original-status.expected.txt), and [recovery expected status](recovery-status.expected.txt). The preparation behavior did not run.

After root commits recovery, use its literal commit hash in the fast-forward command. Before the original reversal, root must run `git -C C:\Users\mikes\WebstormProjects\roughnotes apply --reverse --check -- C:\Users\mikes\AppData\Local\Temp\roughnotes-integration-20260918\backup\original-unstaged.patch`, then run the same command without `--check` only after it passes.
