# Refreshed candidate pack instrument

Run the instrument with this command after the candidate tree is clean:

```powershell
pwsh -File .orkestrel/campaign/refreshed-pack-unit/pack-refreshed-candidate.ps1 -Commit COMMIT_ID
```

The `pack-refreshed-candidate.ps1` script parses with PowerShell. The script does not run during this unit.

The candidate worktree has tracked changes in the vendored journey skill, its `captures.md` reference, and `host.json`. The instrument rejects that state before it creates package output.

The instrument creates `tmp/release/refreshed-pack` only when the path does not exist. It leaves that directory in place after a packing or validation failure.

DEVIATIONS: none.
