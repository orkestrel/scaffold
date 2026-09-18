# Anchor pack successor

`tmp/release/pack-anchor-candidate.ps1` retains the fixed candidate and mandatory `-Commit` parameter. The script writes only to `tmp/release/anchor-pack` after the commit, clean-tree, identity, dependency, and distribution checks pass.

The successor adds `guides/scaffold.md` to the vendored byte comparison at lines `18` through `21`. Its existing source mapping changes an `agents/skills/` prefix to `.agents/skills/`; the guide entry therefore reads `guides/scaffold.md` from the candidate source path.

The successor compares packed bytes with built bytes for `dist/src/server/index.js`, `dist/src/server/index.cjs`, `dist/src/server/index.d.ts`, and `dist/src/server/index.d.cts` at lines `268` through `280`. Metadata records each packed server path and SHA256 under `server` at line `289`.

PowerShell 5.1 parsed the script without syntax errors. The wrong-commit control passed a valid-length zero hash, exited `1`, reported `The candidate HEAD does not match -Commit.`, and left `tmp/release/anchor-pack` absent. No package command ran.

The retained predecessor archive remains at `tmp/release/refreshed-pack/orkestrel-scaffold-0.0.75.tgz`. The predecessor delta and the empty `git diff --check` reading are in `tmp/units/anchor-pack-evidence/predecessor-delta.patch` and `tmp/units/anchor-pack-evidence/predecessor-delta-check.txt`. The parse and refusal controls are in `tmp/units/anchor-pack-evidence/parse.txt`, `wrong-commit.txt`, and `wrong-commit-control.txt`.

After root commits the candidate and the active gates pass, run:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File C:\Users\mikes\WebstormProjects\scaffold\tmp\release\pack-anchor-candidate.ps1 -Commit <COMMITTED_HASH>
```

DEVIATIONS: none.
