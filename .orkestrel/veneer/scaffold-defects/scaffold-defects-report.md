Committed on `scaffold-defects`: `060f390b973a05fa0450194a373e087e88e19401`. Working tree is clean. Nothing was pushed or published.

| Defect | Repair |
| --- | --- |
| S1 | Discovery reads Vitest's `--json=FILE` output and forwards every selected project through `--project`. Regressions cover bracketed stdout and excluded-project collection. Arguments, output structure, and exit codes are preserved; scoped undiscovered-file semantics are documented. |
| S2 | Publish preflight checks every requested directory before registry access. A linked worktree is refused with exit code 3 and its primary clone path. The regression verifies that a later linked-worktree argument prevents any upload. |
| S3 | Added the browser-test directive to move the real CDP pointer to `(-1, -1)` in the case's `finally` block. |
| S4 | Generated browser and Vue scoped tsconfigs include `@vitest/browser-playwright` types. Generated-workspace checks compile `cdp().send`; removing the augmentation produces TS2339 in each scope. Canon and expectations agree. |
| S5 | Added the directive to pack releases on Linux, compare archive paths, sizes, and content hashes between hosts, and report executable-mode differences separately. Packing code is unchanged. |
| S6 | Generated distribution proofs staged at module import. Staging now runs in suite setup with guarded cleanup. Generated-project collection creates no distribution directory; an execution check also passes and cleans up. |

The same regression commands were run before and after their repairs.

Command A:

```text
node tmp/codex/execute.ts node_modules/vitest/vitest.mjs run --config vite.config.ts --project skills tests/agents/skills/orkestrel-harden/scripts/discovery.test.ts tests/agents/skills/orkestrel-publish/scripts/window.test.ts -t 'bracketed|scopes collection|linked worktree'
```

Command B:

```text
node tmp/codex/execute.ts node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:core tests/src/core/compilers.test.ts -t 'generated defect regressions'
```

Command C:

```text
node tmp/codex/directives.ts
```

| Defect | Command | Red before | Green after |
| --- | --- | --- | --- |
| S1 | A | 2 failed | 2 passed |
| S2 | A | 1 failed | 1 passed |
| S3 | C | 1 failed | 1 passed |
| S4 | B | 1 failed | 1 passed |
| S5 | C | 1 failed | 1 passed |
| S6 | B | 1 failed | 1 passed |

Command A changed from exit 1 with 3 failures to exit 0 with 3 passes; 6 tests were filtered. Command B changed from exit 1 with 2 failures to exit 0 with 2 passes; 192 tests were filtered. Command C changed from exit 1 with 2 failures to exit 0 with 2 passes.

S3 and S5 use directive-presence checks. No carousel reproduction or cross-host archive experiment is claimed. S4 uses installed provider declarations; its unused Vue entry is an inert declaration stub.

Final acceptance ran after the implementation edits, in the required order:

| Command | Exit | Result |
| --- | --- | --- |
| `npm run format:check` | 0 | Passed |
| `npm run lint:check` | 0 | Passed |
| `npm run check` | 0 | Passed |
| `npm test` | 0 | Passed |
| `npm run build` | 0 | Passed; host inventory regenerated |
| `git diff --check` | 0 | Passed |
| `git commit` | 0 | Commit recorded above |
| `git status --porcelain` | 0 | Empty |

Acceptance output is retained in `tmp/codex/acceptance-3.log`, `tmp/codex/acceptance-3.err`, and `tmp/codex/acceptance-3.json`.

Deviation: an initial acceptance harness redirected all temporary directories into the worktree, causing unrelated fixture failures. Removing that override restored their intended isolation. The final acceptance used the normal environment; no unrelated fixture changes remain. No unresolved deviation remains. No dependency installation was performed outside the worktree.
