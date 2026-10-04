Implemented item-12-fix-3 in commit `c34b4dea5f40e34373e5333a1c2d05ed350e029c`. The branch contains one commit above `b438c16`, and the final working tree is clean.

The repairs and their evidence are:

| Item | Repair | Red and green evidence |
| --- | --- | --- |
| Required navigation retry | Retry capture failures after a generation change, retain context-loss recovery, and rethrow persistent failures when the generation stabilizes. | Removing the change-based retry produced 5 failures across DOM queries, node descriptions, AX capture, `GONE`, and persistent-error handling. All pass restored. |
| A1 | Add element-close and `GONE` coverage; remove the unreachable text-wait assertion and fold the element closed check into the existing rethrow path. | Disabling lifetime abort failed the close test; disabling generation retry failed the `GONE` test. Both pass restored. The close test checks settlement within 200 ms against a 10,000 ms deadline. |
| A2 | Track pending text observers and await their cleanup through the underlying session before detaching. | Removing teardown cleanup failed the test that withholds the cleanup reply and checks that detachment waits. It passes restored. |
| A3 | Clear cached DOM readiness before parking after context loss, shared with text-wait recovery. | Removing the readiness reset failed the concurrent absent-wait test: capture occurred before DOMContentLoaded. It passes restored. |
| A4 | Check remaining time before preparation and translate protocol deadline failures to `BROWSER_WAIT_TIMEOUT`. | Removing timeout translation and removing the exhausted-deadline guard each failed their respective test. Both pass restored. |
| A5 | Use “Hidden documents suspend animation frames; tasks still run.” | Prose-only change; exact wording verified and formatting passes. |
| Shared isolated world | Bind creation to page release; give each caller its own abort and deadline handling. | Binding creation to the first caller failed the survivor test. Removing independent abandonment failed the joining-caller test. Both pass restored. |
| Hidden-tab guide | State that browser timer throttling can delay wake tasks, without promising a duration. | Prose-only change; guide checks pass, and the live hidden-tab cases pass in both placements. |

Every mutation control exited 1 for its intended assertion. Logs are under `tmp/codex/item-12-fix-3-control-*.log`. The restored regression command exited 0 with 203 tests passing:

```text
node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:core tests/src/core/elements/BrowserElementManager.test.ts tests/src/core/BrowserPage.test.ts --reporter=dot
```

See the [restored regression output](/C:/Users/mikes/WebstormProjects/browser-wt-browse/tmp/codex/item-12-fix-3-control-green.log). The final core gate also passed all 1,233 tests, and the touched fixture file passed all 76 tests.

The post-commit command was `node tmp/codex/merge-gates.ts item-12-fix-3`. Each exit code was read:

| Gate | Initial exit | Final exit |
| --- | ---: | ---: |
| `npm run format:check` | 0 | 0 |
| `npm run lint:check` | 0 | 0 |
| `npm run check` | 2 | 0 |
| `npm run test:src:core` | 0 | 0 |
| `npm run test:src:browser` | 0 | 0 |
| `npm run test:src:server` | 0 | 0 |
| `npm run test:src:bin` | 0 | 0 |
| `npm run test:guides` | 0 | 0 |
| `npm run test:policy` | 0 | 0 |
| `npm run test:setup` | 0 | 0 |
| `npm run test:setup:browser` | 0 | 0 |
| `npm run build` | 0 | 0 |
| `npm run test:service` | 0 | 0 |
| `git diff --check` | 0 | 0 |

The initial typecheck reported test-only TS2379 errors from explicit `signal: undefined`. The amended commit omits the property instead. See the [initial gate record](/C:/Users/mikes/WebstormProjects/browser-wt-browse/tmp/codex/item-12-fix-3-first.json) and [final gate record](/C:/Users/mikes/WebstormProjects/browser-wt-browse/tmp/codex/item-12-fix-3.json). Both service runs passed 164 tests; no failing-file rerun or budget increase was needed.

Deviations: no scope changes, subagents, pushes, publications, or installations. Deterministic CDP seams supplied the permitted navigation evidence. No `prove` tool was available, so executable tests and mutation controls supplied the proof. The ancillary installed discovery scanner exited 1 because it classified Chromium instance names separately from their parent projects; it found no undiscovered tests, and both explicit browser gates passed. Verification ran on Windows.
