# map:transcripts

Question: For the 2B and 4B store-task runs, where does each run first leave the path the oracle needs (the tool result the model had just seen, the call it made, the call the oracle needed), and how do those departures group and count by root mechanism across the two models?

Evidence:
- I have no shell or write tool in this session, so I could not write the brief, run `bench.ts --cursor --resolve`, check `live`, or launch. I did not read the subject files. No reading was done.
- The transport pins `CURSOR_GROK_MODEL=grok-4.7-high` (C:/Users/mikes/WebstormProjects/scaffold/.agents/transports/cursor.md:8). It says a driver that cannot write returns the brief text, its intended path, the resolved command and the journal paths, and the Orchestrator writes and launches (cursor.md:25).
- The Windows entry was found by glob, not by `bench.ts`. The newest versioned install is C:/Users/mikes/AppData/Local/cursor-agent/versions/2026.10.01-14929f9, which contains both `node.exe` and `index.js`. The Orchestrator should confirm it with `bench.ts --cursor --resolve`.
- The brief scaffold to generate first is `node .agents/skills/orkestrel-dispatch/scripts/brief.ts --unit store-failure-paths --lane cursor --subject "<text>"`, then check it with `--check PATH` (C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-dispatch/scripts/brief.ts:3,105).

Distillate:
Brief path: C:/Users/mikes/WebstormProjects/scaffold/tmp/cursor/store-failure-paths-brief.md. The Orchestrator should merge this body into the `brief.ts` output.

```text
# store-failure-paths: read-only distillation

Read-only. Write, edit, create, delete nothing in any repository. Run no tests, no npm, no git-mutating command. Make no decisions or recommendations; report evidence only. No raw dumps: quote only the decisive lines (at most ~5 lines per quote). Every fact carries a file:line citation (transcript JSON: file plus line, or file plus message index if single-line).

Scope (read only these):
- C:/Users/mikes/WebstormProjects/ollama/tmp/codex/store-campaign/attempt-3/S0/run-1..run-16/transcripts/ : read-*.json (shipping), paging-*.json, search-*.json. Sample at least 6 runs per task; read EVERY failing search run (results.json in each run dir marks pass/fail).
- C:/Users/mikes/WebstormProjects/ollama/tmp/codex/store-campaign/model-4b-2/S0/run-1/transcripts/ (all files)
- C:/Users/mikes/WebstormProjects/ollama/tmp/codex/store-campaign/attempt-4/S0-classified.json
- C:/Users/mikes/WebstormProjects/ollama/tmp/codex/toolset-probe/replay/tables.md
- C:/Users/mikes/WebstormProjects/ollama/tmp/codex/toolset-probe-last.md
- For the oracle definition only: C:/Users/mikes/WebstormProjects/ollama/tests/setupStore.ts (runStoreTask ~:1046, attempt loop ~:1340-1420, shared assertion :1409-1411) and C:/Users/mikes/WebstormProjects/ollama/tests/service/browser.test.ts
- Failure-class names only: C:/Users/mikes/WebstormProjects/ollama/tmp/codex/reliability-design.md (F-1..F-22, G-1..G-15)

Evidence sought:
1. Per task (shipping, cart, search, checkout, paging) the oracle-required tool path, cited from setupStore.ts / browser.test.ts, including BROWSER_TOOL_LIMIT (4,000) applying to every tool result.
2. Per task x model (2B attempt-3 S0; 4B model-4b-2 run-1), per sampled run/attempt: the FIRST departure from that path:
   a. the exact tool result text the model had just seen (decisive lines quoted, cited);
   b. the call the model made (tool + arguments);
   c. the call the oracle needed.
3. Group departures by root mechanism. Use these where they fit, add others if evidence demands: look/read overlap; search-match blocks satisfying a read; offset confusion between tools; journey tools used during page tasks; oversized results (> 4,000 chars); ignored wait instruction (double submit); answering without a call. Map each to its F-/G- class id where one matches.
4. Count each mechanism across runs (runs sampled, attempts affected), per model.
5. State which mechanisms 2B and 4B share and which are model-specific.
6. From toolset-probe tables: which definition bytes (0.0.26 vs attempt-2) coincide with the shipping first-reply change; cite rows.

Final message (the document): sections Oracle paths; Departures (table: model | task | run/attempt | seen (quote+cite) | made | needed | mechanism); Mechanism counts; Shared vs model-specific; Unknowns (what the files could not settle). Nothing else.
```

Resolved command (run from C:/Users/mikes/WebstormProjects/scaffold):

```text
node .agents/skills/orkestrel-dispatch/scripts/launch.ts --journal tmp/cursor/store-failure-paths.jsonl --errors tmp/cursor/store-failure-paths.err --cap <seconds> --status -- C:\Users\mikes\AppData\Local\cursor-agent\versions\2026.10.01-14929f9\node.exe C:\Users\mikes\AppData\Local\cursor-agent\versions\2026.10.01-14929f9\index.js -p --trust --mode=ask --model grok-4.7-high --output-format stream-json "Read tmp/cursor/store-failure-paths-brief.md and execute it exactly. Your final message is the document it specifies."
```

Read the result with `node .agents/skills/orkestrel-dispatch/scripts/result.ts --cursor tmp/cursor/store-failure-paths.jsonl`.

Unknowns:
- I don't know if the bench is live, because `bench.ts --cursor` was not run.
- I don't know if the Cursor agent, launched from the scaffold checkout, can read absolute paths in the separate C:/Users/mikes/WebstormProjects/ollama repository.
- `--status` records the scaffold checkout only, so nothing records the ollama repo's state before and after. The Orchestrator should snapshot `git status --porcelain` in C:/Users/mikes/WebstormProjects/ollama around the run.

Journal: C:/Users/mikes/WebstormProjects/scaffold/tmp/cursor/store-failure-paths.jsonl, errors in C:/Users/mikes/WebstormProjects/scaffold/tmp/cursor/store-failure-paths.err. There is no session id because nothing has been launched.

Deviation:
1. With no shell or write tool I could not write the brief, resolve, check liveness or launch. Per cursor.md:25 the Orchestrator writes and launches.
2. The dispatch said "if the bench is dark, perform the reading yourself." I refused that part. My role says not to read the subject. The transport says a dark bench stops with a deviation naming the fallback, Luna then Sonnet, and the reading is never handed to the Orchestrator, `planner` or `analyst` (cursor.md:35). No distillate of the transcripts is included.
3. Containment was not recorded, because no run took place.
