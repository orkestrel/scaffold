# Report — unit workspace-fixup (builder, Sonnet; successor brief workspace-fixup-2)

Finding 1 closed: `tests/src/core/workspaces/Workspace.test.ts:457-501` splits the empty-batch
describe into one case per form. Finding 2 closed: `README.md:44` links `guides/workspace.md`.

First dispatch stopped on the deviation contract: the seed `path.every( → path.some(` reddened
the pre-existing multi-path `has` case at `Workspace.test.ts:215` beside the pin. The successor
brief scoped every seed to the empty batch.

Pins, each red under its own seed and none reddening another case, run with
`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core <file>`:

| Pin | Seed | Red |
| --- | --- | --- |
| `has([])` | `Workspace.ts:116` `path.length > 0 && path.every(...)` | `Workspace.test.ts:466:29` expected false to be true |
| `move({})` | `Workspace.ts:216` `if (Object.keys(from).length === 0) return false` | `Workspace.test.ts:483:30` |
| `remove([])` | `Workspace.ts:230` `if (path.length === 0) return false` | `Workspace.test.ts:500:32` |
| registry `remove([])` | `WorkspaceManager.ts:107` `if (ids.length === 0) return false` | `WorkspaceManager.test.ts:181:30` |

Every seed restored by editing the exact text back; `git diff --stat src` empty. Gates:
format:check 0, lint:check 0, check 0, build 0, test 0 (src 140, policy 111, config 46, setup 12,
guides 28). `git status --short`: ` M README.md`, ` M tests/src/core/workspaces/Workspace.test.ts`.
