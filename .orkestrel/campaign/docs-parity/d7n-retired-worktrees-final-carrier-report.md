# Retired worktrees final carrier report

The carrier is [d7n-retired-worktrees-final-carrier.ps1](../pass/d7n-retired-worktrees-final-carrier.ps1).

The carrier fixes the target paths, parses each worktree registration block, and compares normalized native paths with ordinal semantics. It checks reparse ancestry from files through their directories and from directories through the filesystem root before any permitted read or write.

The archive stores nullable branch metadata in JSON, exact status and index metadata, full-index binary patches, raw snapshots for present records, and deleted manifest records without snapshots. Verification checks exact archive and manifest populations, source and snapshot hashes, patch hashes, fresh patch captures in GUID validation directories, and every archive file against its raw Git blob in the supplied commit. Removal requires that commit to be reachable from `origin/main`, verifies all targets and committed archives before removal, verifies each target again immediately before its fixed `git worktree remove --force` command, and rechecks canonical and recovery refs.

Run the read-only host check with `powershell -NoProfile -File tmp/pass/d7n-retired-worktrees-final-carrier.ps1 -Mode Preflight`.

Root can run `powershell -NoProfile -File tmp/pass/d7n-retired-worktrees-final-carrier.ps1 -Mode Archive`, then `powershell -NoProfile -File tmp/pass/d7n-retired-worktrees-final-carrier.ps1 -Mode Verify`. Root can run the negative control only in Verify mode with `-HashOverride WRONG_SHA256`. After the committed archive reaches `origin/main`, root can run `powershell -NoProfile -File tmp/pass/d7n-retired-worktrees-final-carrier.ps1 -Mode Remove -ArchiveCommit COMMIT_SHA`.

Archive, Verify, the wrong-hash control, and Remove did not run in this unit.

The parser command `[System.Management.Automation.Language.Parser]::ParseFile('C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/d7n-retired-worktrees-final-carrier.ps1', ...)` reported `parser completed` and exited `0`.

An initial read-only run of `powershell -NoProfile -File C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/d7n-retired-worktrees-final-carrier.ps1 -Mode Preflight` exposed command recursion and exited `1` with `The script failed due to call depth overflow.` The carrier changed its native Git invocations to `git.exe`. The same command then reported `preflight scaffold-guides-entry`, `preflight scaffold-path`, and `preflight completed`, and exited `0`. After the canonical-head preservation correction, the same command reported the same output and exited `0`.
