Stopped under the brief’s deviation contract. No commit was made. The tracked worktree is clean; the incomplete patch is preserved at `tmp/codex/reading-fix-incomplete.patch`.

**Expected:** A parameterless page tool accepts synthetic `purpose` and refuses `what`, as the brief requires.

**Found:** The page tool accepts `what` and invokes its handler. Enforcing refusal would change the page-tool argument-validation boundary. `guides/browser.md:2929` explicitly states that “a page tool’s arguments are the page’s to check.” The reading design specifies renaming the placeholder, but does not introduce validation of page-tool arguments.

**Evidence:**

- The added `BrowserToolset.test.ts` case creates a parameterless `checkout` tool, adopts it through a real `BrowserToolset`, and calls it with `{ what: 'place the order' }`. The rejection assertion fails: the promise resolves to `'undefined'`.
- `src/core/BrowserToolset.ts:1994` binds adopted tools directly to `#invoke`; `:1245–1247` strips only synthetic `purpose`. The generic-tool argument check at `:604` is outside that path.
- The installed `@orkestrel/tool` declaration, `node_modules/@orkestrel/tool/dist/src/core/index.d.ts:249–253`, states that a tool without a configured contract forwards the raw argument record unchanged.
- The reading design at `../scaffold/.orkestrel/veneer/showcase/browse/reading-design.md:161` places the `what` refusal on the existing generic-tool check and separately tells page-tool callers to send `purpose`.

**Hypothesis:** The brief’s refusal requirement applies the generic tools’ validation behavior to adopted page tools, whose arguments have a separate ownership contract.

The repair and evidence status is:

| Required change or ruling | Repair status and evidence |
| --- | --- |
| Rename both `matchBrowser*` helpers to `scanBrowser*`, without shims | Not applied; stopped before the rename. |
| Preserve the first row’s offset/reference when reserving a later row | Regression test failed against the original implementation: expected `[120] xxxxxx…`, received `…` followed by the later row. A candidate repair is preserved in the patch; no green run was completed. |
| Suppress an ellipsis-only block with space 1–2 | Regression test failed: expected an empty block, received `Matches:\n…\n\n`. Candidate repair preserved; no green run completed. |
| Reach the surrogate guard with room 28 | Test changed in the preserved patch and passed in the baseline run. Guard-removal mutation was not run, so mutation proof remains incomplete. |
| Test a parameterless page tool with `purpose` and refuse `what` | Baseline failed on the required refusal. This is the stopping conflict; no production validation change was made. |
| Remove the dead `search === undefined` branch | Candidate edit preserved, then restored; no separate proof completed. |
| State the tool-copy bound’s derivation in the present | Candidate test-comment edit preserved. Guide edit not applied. Historical measurements remain for a successor commit message: full copy 6,023 → 6,559; journey copy 3,067 → 3,090 UTF-16 code units. |
| Correct the native-toolset TSDoc and MCP vocabulary | Candidate edits preserved, then restored. |
| Correct guide prompt provenance, match headings/placeholders, `plain` receipts, journey example, and adapted transcript labels; remove the tool-name count and replace `search: 'all'` | Not applied. |
| Document the pending move note in the `tabs` row | Not applied. |
| Use a matching README search word and quote “the site’s search box” | Not applied. |
| Leave the double mapping, heading count, and optional authored `purpose` advisories unchanged | Unchanged. |
| Keep the Ollama store-proof migration outside this unit | No Ollama files changed. The requested local guide correction remains unapplied. |

The baseline command was `npx vitest run --config vite.config.ts --project src:core tests/src/core/helpers.test.ts tests/src/core/BrowserToolset.test.ts`. It exited 1: 3 failed and 314 passed, across 2 test files, in 39.51 seconds. No timeout occurred. No red/green mutation pair was completed.

The gate results are:

| Command | Result |
| --- | --- |
| `npm run format:check` | Not run: deviation stop |
| `npm run lint:check` | Not run: deviation stop |
| `npm run check` | Not run: deviation stop |
| `npm run test:src:core` | Not run: deviation stop |
| `npm run test:src:browser` | Not run: deviation stop |
| `npm run test:src:server` | Not run: deviation stop |
| `npm run test:src:bin` | Not run: deviation stop |
| `npm run test:guides` | Not run: deviation stop |
| `npm run test:policy` | Not run: deviation stop |
| `npm run test:setup` | Not run: deviation stop |
| `npm run test:setup:browser` | Not run: deviation stop |
| `npm run build` | Not run: deviation stop |
| `npm run test:service` | Not run: deviation stop |
| `git diff --check` | Exit 0 after restoring this unit’s tracked edits |
| `git status --porcelain` | Exit 0; empty output |

Commit: none. HEAD remains `fcefa2a71a3cf29f007678c165a1ed4e78d5ffbf` on `ccr-d15a48b1-yyyll6`. No agents were spawned; nothing was pushed, published, or installed.