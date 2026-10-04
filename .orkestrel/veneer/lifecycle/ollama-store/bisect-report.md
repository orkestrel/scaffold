The baseline is unreliable: **the “before” was a lucky run**. At `b4a18c3`, all store tasks passed together in **0/8 runs**. Assignment step 5 therefore ends the investigation before head measurement, dependency bisect, or a fix.

The measurement ran on Windows on 2026-10-04 after `git worktree add tmp/before b4a18c3` and a successful `npm ci`. The installed baseline matched its lockfile: agent 0.0.25, browser 0.0.22, workspace 0.0.10, probe 0.0.19, scaffold 0.0.90, root tool 0.0.18, and nested tool 0.0.17 under agent and probe. See the [installed-version record](C:/Users/mikes/WebstormProjects/ollama/tmp/codex/store-bisect/baseline/installed.json).

Before testing, the sample was fixed at 8 runs per tree. Under independent runs, that sample has a 96.1% chance of exposing a task that fails one-third of the time. The rates are descriptive, not a reliability certification. The baseline series was completed without extending the sample after failures.

Every run selected the store tasks with this command; each run’s `command.json` records the additional reporters and output path:

```text
node node_modules/vitest/vitest.mjs run --config vite.config.ts --no-cache --project service tests/service/browser.test.ts -t "the store tasks"
```

Ollama remained at 0.35.0 and the model remained `qwen3.5:2b-q4_K_M`, digest `124a03c347777e8e4e5955c33610ae01d9d90d8c2a718bfba069c498d5c7f3c9`, in every before/after check. Temperature remained 0, prediction limit 256, context 16,384, tool-iteration limit 8, and attempt limit 3. Budgets and prompts were unchanged.

The baseline outcomes follow. Parentheses show attempts consumed; each run link opens its machine-readable results. Every run exited 1. The journey case was excluded by the test-name filter; every store task executed.

| Baseline run | Shipping | Click | Search | Checkout | Paging |
| --- | --- | --- | --- | --- | --- |
| [1](C:/Users/mikes/WebstormProjects/ollama/tmp/codex/store-bisect/baseline/run-1/results.json) | Fail (3) | Fail (3) | Pass (1) | Pass (1) | Pass (3) |
| [2](C:/Users/mikes/WebstormProjects/ollama/tmp/codex/store-bisect/baseline/run-2/results.json) | Pass (1) | Fail (3) | Pass (1) | Pass (1) | Pass (3) |
| [3](C:/Users/mikes/WebstormProjects/ollama/tmp/codex/store-bisect/baseline/run-3/results.json) | Pass (1) | Fail (3) | Pass (1) | Pass (1) | Fail (3) |
| [4](C:/Users/mikes/WebstormProjects/ollama/tmp/codex/store-bisect/baseline/run-4/results.json) | Fail (3) | Pass (3) | Pass (1) | Pass (1) | Fail (3) |
| [5](C:/Users/mikes/WebstormProjects/ollama/tmp/codex/store-bisect/baseline/run-5/results.json) | Fail (3) | Fail (3) | Pass (1) | Pass (1) | Fail (3) |
| [6](C:/Users/mikes/WebstormProjects/ollama/tmp/codex/store-bisect/baseline/run-6/results.json) | Pass (1) | Pass (3) | Fail (3) | Pass (1) | Pass (1) |
| [7](C:/Users/mikes/WebstormProjects/ollama/tmp/codex/store-bisect/baseline/run-7/results.json) | Fail (3) | Pass (2) | Pass (1) | Pass (1) | Fail (3) |
| [8](C:/Users/mikes/WebstormProjects/ollama/tmp/codex/store-bisect/baseline/run-8/results.json) | Pass (1) | Fail (3) | Pass (1) | Pass (1) | Fail (3) |
| **Pass rate** | **4/8 (50%)** | **3/8 (37.5%)** | **7/8 (87.5%)** | **8/8 (100%)** | **3/8 (37.5%)** |

All 79 attempt transcripts, containing 316 tool calls, are preserved under `tmp/codex/store-bisect/baseline/run-N/transcripts/<task>-<attempt>.json`. The [attempt index](C:/Users/mikes/WebstormProjects/ollama/tmp/codex/store-bisect/baseline/summary.json) records every call’s name and arguments, answers, fixture state, and transcript hashes. See the [validated totals and model identity](C:/Users/mikes/WebstormProjects/ollama/tmp/codex/store-bisect/baseline/evidence.json), [complete test output](C:/Users/mikes/WebstormProjects/ollama/tmp/codex/store-bisect-baseline.log), and [failure diagnostics](C:/Users/mikes/WebstormProjects/ollama/tmp/codex/store-bisect-baseline.err). The collector’s exit 0 means collection completed; the individual test runs all failed.

Expected: a reliably passing baseline from which a dependency regression could be isolated. Found: repeated failures on the original dependency tree. The evidence includes:

- Shipping, run 1: every attempt called `look` repeatedly without `read` and answered without the cutoff. The attempts started at `e1`, `e13`, and `e25`, retaining the baseline’s shared-context behavior.
- Click, run 1: every attempt left the cart empty. Attempt 3 made no tool call.
- Paging, run 3: every attempt called only `look`; none performed the required continued `read`.
- Search, run 6: attempt 1 ended empty, attempt 2 incorrectly named Stoneware Mug as a kettle, and attempt 3 recorded an Ollama 500 response: `XML syntax error on line 9: element <function> closed by </parameter>`. This was the only transcript with a recorded provider failure.

Hypothesis: pre-existing variability in this model’s tool selection made the historical green run unrepresentative. No dependency cause was isolated, and no tool-definition byte difference is claimed. These measurements do not determine whether the head also introduces an additional regression.

The remaining comparison stages were not run because assignment step 5 requires stopping on an unreliable baseline:

| Comparison | Runs | Result |
| --- | --- | --- |
| Head `90901da`, with isolation repair | Not run | Baseline stop condition |
| Head with agent 0.0.25 and tool 0.0.17 | Not run | Baseline stop condition |
| Head with browser 0.0.22 | Not run | Baseline stop condition |
| Head with workspace 0.0.10 | Not run | Baseline stop condition |
| Head with scaffold-vendored files from `b4a18c3` | Not run | Baseline stop condition |

No fix was applied. The baseline supplies red evidence; there is no post-fix green result or post-fix pass rate. The isolation repair at `90901da` remains intact.

The gate results are:

| Gate | Result |
| --- | --- |
| Baseline `npm ci` | Passed, exit 0 |
| Baseline store series | 25 task passes, 15 task failures; 0/8 complete runs passed |
| Archive validation | Passed: all tasks and attempts present; model identity constant; empty-task negative control rejected |
| `npm run format:check` | Not run: no fix; step 5 stop |
| `npm run lint:check` | Not run: no fix; step 5 stop |
| `npm run check` | Not run: no fix; step 5 stop |
| `npm run test:setup` | Not run: no fix; step 5 stop |
| Post-fix store series | Not run: no fix; step 5 stop |
| `npm run prepublishOnly` | Not run: no fix; step 5 stop |
| `git worktree remove tmp/before` | Passed; worktree removed |

No commits were created, pushed, or published. HEAD remains `90901da87218c7f5fbc3005072312a500e330b1e`. `Release 0.0.21` was not committed because the fix-and-green-gates condition was not reached. The original 0.0.21 bump is preserved, so final `git status --porcelain` is:

```text
 M package-lock.json
 M package.json
```
