**BLOCKED — do not delete the roots yet.**

| Root | Preservation requirement |
|---|---|
| `scaffold\tmp` | Contains registered Scaffold audit worktrees with modified product files: `guides/scaffold.md`, `host.json`, `src/core/compilers.ts`, `src/core/templates.ts`, `tests/distribution.test.ts`, `tests/setupServer.ts`, `tests/src/core/compilers.test.ts`, and `tests/src/core/templates.test.ts`. It also contains the registered release worktree with untracked `capture-recipe-unit` records. |
| `scaffold\.orkestrel` | Contains tracked campaign records, untracked campaign residue, and modified `campaign/rebaseline-2.md` with SHA-256 `023E7615CA0651C9EE0F1A9734F963037B86BD2F2F72BFAB56DA9614D3CFF1C8`. |
| `roughnotes\tmp\recovery\roughnotes` | Registered Roughnotes worktree on `recovery/journey-20260918`, clean at `57b738fd38d4553d0f4f6a31ff4fb1030432a389`. Remove it through Roughnotes Git worktree management before any Scaffold `tmp` deletion. |
| `roughnotes\.orkestrel` | Tracked campaign records. Deletion requires an explicit Roughnotes deletion commit after retention disposition. |

All registered worktree heads are ancestors of their accepted `main` branch. No root or descendant reparse point was found. No executable path under a target root was found; process working-directory liveness was not established.

Protected bytes match the dispatch readings. Roughnotes retains only staged Codex additions with index blobs `59069a1f5926a5a691982125cc4e0ec72f7e69fc` and `7c6257de2940b4bf16d64f7ff20834152c899404`.

After preserving or explicitly ruling the dirty audit and release-worktree content, remove the Roughnotes recovery worktree first, then the Scaffold audit and release worktrees, then delete the now-unregistered Scaffold `tmp` root.
