# map:harness

Question: For each store case in the ollama service test, what claim does it pin, where does its wall time go, and where does it pin a path rather than an outcome, including any oracle a correct answer fails and any fixture that lets the model bypass the mechanism under test?

Evidence:
- I did not launch the bench and I did not read the subject. This session has only Read, Grep and Glob, so I could not run `bench.ts --resolve`, `scripts/brief.ts --lane cursor` or `launch.ts`, and I could not write the brief. Under C:\Users\mikes\WebstormProjects\scaffold\.agents\transports\cursor.md:25 a driver that writes nothing returns the brief text, its intended path, the resolved command and the journal paths, and the Orchestrator writes and launches.
- The dispatch said "if the bench is dark, perform the reading yourself". I did not, for two reasons. The bench is not shown dark, and cursor.md:35 says a dark bench stops with a deviation naming the Luna-then-Sonnet fallback and never hands the reading to another role.
- The model stays pinned at `grok-4.7-high` (cursor.md:8). The transport does not allow a different id (cursor.md:11), so "highest available effort" maps to that pin.
- I resolved the entry by hand, without `bench.ts`. The newest versioned install is C:\Users\mikes\AppData\Local\cursor-agent\versions\2026.10.01-14929f9, and both `node.exe` and `index.js` are there. A `dist-package` directory also sits under `versions\`; I left it out because it is not a versioned install.
- The launch form comes from cursor.md:18-20. The unit name I chose is `store-economics`. Command, with the cap left for the Orchestrator to set:
  `node .agents/skills/orkestrel-dispatch/scripts/launch.ts --journal tmp/cursor/store-economics.jsonl --errors tmp/cursor/store-economics.err --cap <seconds> --status -- C:\Users\mikes\AppData\Local\cursor-agent\versions\2026.10.01-14929f9\node.exe C:\Users\mikes\AppData\Local\cursor-agent\versions\2026.10.01-14929f9\index.js -p --trust --mode=ask --model grok-4.7-high --output-format stream-json "Read tmp/cursor/store-economics-brief.md and execute it exactly. Your final message is the document it specifies."`
- To read the answer afterwards: `node .agents/skills/orkestrel-dispatch/scripts/result.ts --cursor tmp/cursor/store-economics.jsonl` (cursor.md:23).

Distillate (brief text; intended path C:\Users\mikes\WebstormProjects\scaffold\tmp\cursor\store-economics-brief.md, to be written through `scripts/brief.ts --lane cursor`):

```markdown
# store-economics — the store tasks' claims, oracles, and wall-time economics

Read-only. Change no file anywhere. Report evidence with `file:line` pointers (for a JSON record: file path plus the key path); quote only the shortest span that carries a fact; no raw dumps, no decisions or recommendations.

## Question

`C:\Users\mikes\WebstormProjects\ollama\tests\service\browser.test.ts` has qwen3.5:2b-q4_K_M (Ollama 0.35.1, temperature 0, context 16384, predict 256, tool-iteration limit 8, attempt limit 3) drive the `@orkestrel/browser` 0.0.26 toolset over a seeded store page through `@orkestrel/agent`. It runs shipping, cart/click, search, checkout/form, paging, and an observational journey case. For each case: what claim does it pin, at what cost in wall time, and where does it pin a call path rather than an outcome?

## Scope

- `C:\Users\mikes\WebstormProjects\ollama\tests\service\browser.test.ts`
- `C:\Users\mikes\WebstormProjects\ollama\tests\setupStore.ts` (`runStoreTask` near :1046, the attempt loop near :1340-1420, the shared assertion at :1409-1411, the fixtures, and the per-task prompts)
- `C:\Users\mikes\WebstormProjects\ollama\tests\setupService.ts`
- `C:\Users\mikes\WebstormProjects\ollama\vite.config.ts` (the service project only)
- `C:\Users\mikes\WebstormProjects\ollama\tmp\codex\store-campaign\attempt-3\S0\run-1` through `run-16`: `results.json` (`assertionResults[].title`, `.status`, `.duration` only) and `transcripts\*.json` (the `elapsed` and `usage` fields and the tool-call names, arguments, and result lengths; no message bodies)
- `C:\Users\mikes\WebstormProjects\ollama\tmp\codex\store-campaign\model-4b-2\S0\run-1\results.json` and its `transcripts\*.json` (same fields)
- `C:\Users\mikes\WebstormProjects\ollama\tmp\codex\reliability-design.md`, only to name failure classes F-1..F-22 and G-1..G-15 where a finding matches one

## Evidence sought

1. **Per case claim.** The test title; the oracle predicate (each assertion, with its line); the call path it requires (which tools, which order, any required continuation); the system prompt and first user message (cite where each is built; quote no more than the clause that matters); which toolset faces it enables (page, journey/capture, others) and where that is chosen; its retry/attempt limit, tool-iteration limit, and every deadline and timeout (test, attempt, model call, browser), with the config line for each.
2. **Shared assertions.** Every assertion applied to all cases, especially the tool-result size check against `BROWSER_TOOL_LIMIT` (4,000) at setupStore.ts:1409-1411. Say whether it applies to tools the case's task never asks for (for example a journey/capture call record).
3. **Wall time.** Per case over the 16 2B runs: mean, median, min, and max of `duration`, plus the pass count. The same for the 4B run. Per attempt where the transcripts allow it. Split each case's time into model-turn latency (from `elapsed`/`usage`: prompt and eval token counts and durations) versus browser and setup time (launch, seeding, navigation, teardown, located in setupStore.ts/setupService.ts). Name the setup that runs per attempt versus per case versus per file.
4. **Journey case.** What it runs, what it asserts (if anything), its wall time, and whether any other case depends on it.
5. **Path pinned instead of outcome.** Every place where a correct final answer still fails the oracle because of the route taken. Examples to check, not to assume: paging's required `read` continuation when `search` already finds the token; the shared result-size assertion failing on an unsolicited journey call; checkout's order-count or click-after-submit handling. For each, give the assertion line and the transcript record that shows it (4B run: search, checkout, paging).
6. **Bypass.** Any task whose fixture lets the model reach the oracle's answer without the mechanism the case claims to test (for example, the answer token visible on the first page, reachable by `search`, or present in the prompt). Give the fixture line.

## Return

One Markdown document with these sections, each a list of cited facts: `Cases` (one subsection per case covering items 1 and 4), `Shared assertions`, `Wall time` (a table: case, 2B mean/median/min/max/passes, 4B duration/status, then the split), `Path over outcome`, `Bypass`, `Distillate` (at most one screen: the smallest context a tuning-design lane needs), `Unknowns` (each question the files did not settle, with where you looked).
```

Unknowns:
- Whether the bench is live. I could not run `bench.ts --cursor` here.
- Whether `bench.ts --resolve` picks the same entry I chose, or would pick `dist-package`.
- Whether Cursor in `--mode=ask` can read under `C:\Users\mikes\WebstormProjects\ollama` when launched from the scaffold checkout. The earlier brief at C:\Users\mikes\WebstormProjects\scaffold\tmp\cursor\holders-map-brief.md:13-17 scoped files in sibling checkouts the same way.
- How long the run will take; the Orchestrator sets the cap.

Journal: C:\Users\mikes\WebstormProjects\scaffold\tmp\cursor\store-economics.jsonl, with errors in C:\Users\mikes\WebstormProjects\scaffold\tmp\cursor\store-economics.err. No session id yet because nothing was launched.

Deviation:
- Command failure: nothing was launched, and neither the brief nor the resolved command was produced by its script. The session has no shell or write tool, so the brief text and the hand-resolved command above go to the Orchestrator to write and launch.
- I did not follow the dispatch's "perform the reading yourself" fallback, for the reasons under Evidence.
- `--status` records `git status --porcelain` only for the scaffold checkout, where the launch runs. A change inside `C:\Users\mikes\WebstormProjects\ollama` would go unrecorded, so the Orchestrator should take that checkout's status before and after by hand.
