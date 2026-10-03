Stopped under the deviation contract: `npm test` failed on host inventory mismatches. The requested edits are complete and uncommitted.

Changes made:

- Removed the Linux-only publish refusal and its opening-comment wording from `.agents/skills/orkestrel-publish/scripts/window.ts`. Preserved the linked-worktree and submodule refusal, including its upward search.
- Removed “requires Linux” from the publish skill's script table.
- Removed host-dependent expectations and skips from `window.test.ts`, retaining every linked-worktree case and the submodule case.
- Replaced the Linux packing directive in `wave.md` with the exact requested pack-comparison directive.
- Removed the Linux-only instruction from `window.md` and restored the Windows operator paragraph verbatim from `060f390b9`. Retained the strengthened linked-worktree instruction from `a8344e019`.

The gates ran on Windows in the prescribed order:

| Command | Exit | Result |
| --- | --- | --- |
| `npm run format:check` | 0 | Passed |
| `npm run lint:check` | 0 | Passed |
| `npm run check` | 0 | Passed |
| `npm run test:skills` | 0 | 62 tests passed |
| `npm test` | 1 | Core: 507 passed. Server: 2 failed, 478 passed, 7 skipped |
| `npm run build` | — | Not run after the conflict |
| `git diff --check` | — | Not run after the conflict |

The focused regression command was `npx vitest run --config vite.config.ts --project skills tests/agents/skills/orkestrel-publish/scripts/window.test.ts`: before the implementation change, 2 failed and 4 passed; after it, 6 passed with no skips.

Deviation:

- Expected: the prescribed gate sequence passes before a commit and an empty status.
- Found: `npm test` exits 1 in `tests/src/server/helpers.test.ts`. The `readHostFloor` case at line 1643 reports “The vendored host cannot read the declared file at .agents/skills/orkestrel-publish/SKILL.md”. The `stageHost` case at line 2539 reports inventory digest mismatches for the edited publish files. Full evidence is in `tmp/codex/scaffold-defects-3-test.log` and `tmp/codex/scaffold-defects-3-test.err`.
- Done: requested edits, focused regression, and the gates through `npm test`. Not done: build, diff check, commit, and clean status. No push, publication, or installation was performed.
- Hypothesis: the host inventory needs regeneration after the vendored edits, but the prescribed sequence puts the build that regenerates it after the tests that read it.

Commit: none created. HEAD remains `a8344e019641f5da5e9911f5e18789eb9b7524cd` on `scaffold-defects`. `git status --porcelain` reports only the modified files listed in the changes.
