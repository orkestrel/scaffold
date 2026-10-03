Committed on `scaffold-defects`: `a8344e019641f5da5e9911f5e18789eb9b7524cd`. The working tree is clean. Nothing was pushed or published.

The findings are repaired:

| Finding | Repair |
| --- | --- |
| S1 | Treat Vitest's unmatched-project refusal as an empty listing, preserving exit 3 for the gated missing project. Write and remove the listing under the operating system's temporary directory. |
| S2 | Search package ancestors for the nearest `.git` entry. Refuse linked worktrees and submodules before contacting npm. Resolve the primary clone through `commondir`; the fixture supplies `../..` and asserts the complete diagnostic line. |
| S4 | Remove provider types from generated browser and Vue scopes. Align template expectations, the vendored configuration proof, and documentation. Add the directive to read CDP sessions as `unknown` and guard `send` and replies. Generated scope checks reject `process`. |
| S5 | Apply the exact Linux packing directive. Refuse directory publishing outside Linux with exit 3 before contacting npm. Align the skill and script, remove the explanatory clause, and restore the missing backticks. |
| Item 6 | Expect release setup failures to report collected cases as skipped. Retain distinct collection and assertion controls. Replace the stale comment. Explicitly skip empty Node-import, Node-require, and browser entry selections with reasons. |

Regression measurements use these commands:

```text
# skills
node node_modules/vitest/vitest.mjs run --config vite.config.ts --project skills tests/agents/skills/orkestrel-harden/scripts/discovery.test.ts tests/agents/skills/orkestrel-publish/scripts/window.test.ts -t 'absent from|leaving a target|linked worktree|submodule|cannot pack'

# isolation
node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:core tests/src/core/compilers.test.ts -t 'excludes Node globals'

# release
node tmp/codex/execute.ts node_modules/vitest/vitest.mjs run --config vite.config.ts --project distribution tests/distribution.test.ts -t 'fails the release run'

# empty
node tmp/codex/execute.ts node_modules/vitest/vitest.mjs run --config vite.config.ts --project distribution tests/distribution.test.ts -t 'skips generated entry drives'
```

The same commands ran before and after their repairs:

| Finding | Command | Red before | Green after |
| --- | --- | --- | --- |
| S1 | skills | 2 failed | 2 passed |
| S2 | skills | 2 failed, 1 passed | 3 passed |
| S4 | isolation | 1 failed | 1 passed |
| S5 | skills | 1 failed | 1 passed |
| Item 6: release statuses | release | 1 failed | 1 passed |
| Item 6: empty selections | empty | 1 failed | 1 passed |

The combined skills command changed from exit 1 with 5 failures and 1 pass to exit 0 with 6 passes. The strengthened primary-clone case already passed before the implementation repair. Its wrong-path mutation, run by `node tmp/codex/worktree-control-2.ts`, produced 1 failure. After restoration, this command produced 1 pass:

```text
node node_modules/vitest/vitest.mjs run --config vite.config.ts --project skills tests/agents/skills/orkestrel-publish/scripts/window.test.ts -t 'refuses a linked worktree anywhere'
```

The touched compiler/template suites reported 233 passes. The touched skill suites reported 13 passes and 1 skip.

Final acceptance ran after the final source and inventory edits, in the required order:

| Command | Exit | Result |
| --- | --- | --- |
| `npm run format:check` | 0 | Passed |
| `npm run lint:check` | 0 | Passed |
| `npm run check` | 0 | Passed |
| `npm test` | 0 | Passed |
| `npm run build` | 0 | Passed |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project distribution --mode release` | 0 | 11 passed, 1 skipped |
| `git diff --check` | 0 | Passed |
| `git commit` | 0 | Commit recorded in this report |
| `git status --porcelain` | 0 | Empty |

The skipped distribution case tests refusal by npm below the required minimum; the installed npm meets that minimum. Acceptance evidence is retained in `tmp/codex/acceptance-final-2.log`, `.err`, and `.json`.

Execution adjustments: regression commands invoked the local Vitest entry through Node. Distribution installations stayed inside the worktree; an isolated temporary Git root prevented inherited ignore rules from hiding generated files. The host inventory was regenerated. No unresolved deviation remains. Validation ran on Windows; the Linux upload branch was not executed.
