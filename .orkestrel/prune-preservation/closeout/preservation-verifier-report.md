**RED — preservation staging gap**

- `manifest-2.json` source-to-retained SHA-256 checks pass; `unresolved` is empty.
- Audit control, objective, and subjective patches each pass `git apply --reverse --check` against their exact dirty worktree.
- Protected Scaffold hashes, Roughnotes `57b738f` identity, and original Codex index blobs match the retained readings.
- `staged-paths-2.actual.txt` matches the live index except the authorized closeout metadata and `ROADMAP.md`.
- The recovery worktree path is `C:\Users\mikes\WebstormProjects\scaffold\tmp\recovery\roughnotes`.

Blocker: `stage-paths-2.txt` names 25,571 planned files, while `staged-paths-2.actual.txt` and the Git index contain 12,353 before closeout additions. The omitted remainder includes 13,749 paths outside the stated media/cache/archive exclusion classes, including retained Roughnotes `tmp` audit, authority, instrument, and log records. Resolve or preserve this gap before deleting the original roots.
