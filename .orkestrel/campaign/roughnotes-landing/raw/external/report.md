# Roughnotes integration preparation report

The preparation script is [prepare.ps1](prepare.ps1). It preflights the fixed roots, branch names, baseline commit, original dirty and staged path allowlists, recovery path allowlist, and recovery's clean index before it creates a backup.

Root must run this command:

```powershell
& C:\Users\mikes\AppData\Local\Temp\roughnotes-integration-20260918\prepare.ps1
```

After independent staged verification, root must run these separate commands from the stated repository:

```powershell
git -C C:\Users\mikes\WebstormProjects\scaffold\tmp\recovery\roughnotes commit -m "Integrate accepted Roughnotes registry work"
git -C C:\Users\mikes\WebstormProjects\roughnotes apply --reverse -- C:\Users\mikes\AppData\Local\Temp\roughnotes-integration-20260918\backup\original-unstaged.patch
git -C C:\Users\mikes\WebstormProjects\roughnotes merge --ff-only recovery/journey-20260918
git -C C:\Users\mikes\WebstormProjects\roughnotes status --short
git -C C:\Users\mikes\WebstormProjects\roughnotes diff --cached -- .codex/agents/orkestrel.toml .codex/hooks.json
```

The measured original tree has the specified app, guide, and test dirty paths plus staged `.codex/agents/orkestrel.toml` and `.codex/hooks.json`. The measured recovery tree is on `recovery/journey-20260918` at `86a9ef6bc4620fdf36c47af1f4c530693357eb86`; its explicit changed-path allowlist is [recovery-paths.txt](recovery-paths.txt).

The script has not run its backup or staging behavior. It creates its backup only after the preflight passes. Root owns those mutations, the commit, patch reversal, fast-forward, install, and push.

PowerShell parsing passed. The `-Control` invocation created only `control-existing` in this scratch folder and confirmed that the preparation destination guard refuses an existing path. It returned exit `0`.
