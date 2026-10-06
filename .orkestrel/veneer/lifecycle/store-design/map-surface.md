# map:surface

Question: What exact surface does browser 0.0.26 advertise to the model in a store page task, covering each tool's definition and size, what look and read return, what the journey tools return, how BROWSER_TOOL_LIMIT is enforced, the seed view, and the footers, and which tool or argument choices are ambiguous for a small model?

Evidence:
- I could not run the bench. This session has only Read, Grep and Glob, with no shell and no file write. So I could not run `bench.ts --cursor --resolve`, write the brief, launch, or read a result. Under `C:/Users/mikes/WebstormProjects/scaffold/.agents/transports/cursor.md:25` that makes me a read-only driver: I return the brief text, its intended path, the command and the journal paths, and the Orchestrator writes and launches.
- I did not do the reading myself. The computed task allows that fallback only if the bench is dark. I could not test whether it is dark, and my standing instruction says not to read the subject. If it is dark, `cursor.md:35` names the fallback as Luna, then Sonnet, and does not give the reading to the driver.
- A Glob found the newest versioned install: `C:/Users/mikes/AppData/Local/cursor-agent/versions/2026.10.01-14929f9/node.exe` and `.../2026.10.01-14929f9/index.js`. This is a candidate only. `bench.ts --cursor --resolve` must confirm it.
- Model pin: `grok-4.7-high` (`cursor.md:8`).

Distillate:
Intended brief path: `C:/Users/mikes/WebstormProjects/scaffold/tmp/cursor/store-toolset-surface-brief.md`. Create it with `node .agents/skills/orkestrel-dispatch/scripts/brief.ts --unit store-toolset-surface --lane cursor --subject "Store toolset model-facing surface"`, then fill it with this text:

```
# Unit store-toolset-surface — Store toolset model-facing surface

## Role and engine
Read-only distiller on Cursor Grok (grok-4.7-high), reached as the cursor transport. Executor: BENCH_ENGINE.

## Objective
Map the exact model-facing surface of @orkestrel/browser 0.0.26 as the ollama store harness advertises it in a page task, with a file:line pointer for every fact.

## Context
- **Evidence.** browser repo C:/Users/mikes/WebstormProjects/browser at main 0379087 (0.0.26). Harness C:/Users/mikes/WebstormProjects/ollama/tests/setupStore.ts (createBrowserToolset options near :1046; attempt loop :1340-1420; shared assertion :1409-1411) and C:/Users/mikes/WebstormProjects/ollama/tests/setupService.ts. Observed: a 4B record call returned a 4,087-char body, over BROWSER_TOOL_LIMIT (4,000), which the shared assertion requires of every tool result.
- **Law.** Read only. No decisions, no recommendations, no edits.
- **Installed primitives.** none
- **Host.** Windows, PowerShell; read-only ask mode.
- **Standing conditions.** none

## Unknowns
Anything not settled from the scoped files: list it under Unknowns, with the file:line where the reading stopped.

## Scope
- **Owned.** none (read-only).
- **Shared (report-only).** none
- **Off-limits.** All writes. Any file outside the read set below.
- **Made false by this change.** none
- **Tools and limits.** Read only these files: C:/Users/mikes/WebstormProjects/browser/src/core/BrowserToolset.ts, C:/Users/mikes/WebstormProjects/browser/src/core/BrowserJourneyToolset.ts, C:/Users/mikes/WebstormProjects/browser/src/core/constants.ts, C:/Users/mikes/WebstormProjects/browser/src/core/types.ts, the browser/src/core modules those four import for result rendering and helpers (one import hop, plus a second hop only for a renderer), C:/Users/mikes/WebstormProjects/ollama/tests/setupStore.ts, C:/Users/mikes/WebstormProjects/ollama/tests/setupService.ts.

## Execution
Perform the reading yourself and spawn nothing.

## Output
One Markdown document as your final message, no process diary, no raw file dumps (quote only the exact description strings). Sections:
1. Advertised tools in a page task: for each tool, its name, parameters (name, type, required, description), tool description, the character length of every description, and the total serialized definition bytes. Say which options in setupStore.ts select the set and which tools are left out.
2. look and read: the parameters of each; what each returns (view format, search-match blocks, footers, offsets, continuation rules); where their purposes overlap; how offsets differ between look and read.
3. Journey tools (record, save, journeys, edit, replay, forget, capture): what each returns. Explain why record's body can exceed BROWSER_TOOL_LIMIT: give the limit's definition, and every place it is enforced and every result path where it is not.
4. The seed view the first user message carries: how it is built and where.
5. Tool-result instructions: every footer that names a next tool, every wait instruction, and every continuation hint, quoted with file:line.
6. Ambiguities a small model faces in choosing a tool or an argument, each tied to file:line evidence.
Every fact carries a file:line pointer.

## Deviation contract
Stop and report (expected, found, evidence, done or not done, one hypothesis) if a scoped file is missing or the version is not 0.0.26. Settle the import-hop boundary yourself and record it.

## Acceptance criteria
1. Every section is present, with file:line on each fact.
2. Description lengths and definition bytes are counted, not estimated, and the counting method is stated.
3. No recommendation and no edit.

**Observations, not criteria.** none
**Measurement.** none

## Review evidence
git status --porcelain unchanged (recorded by launch.ts --status).
```

The command (the `<node>` and `<index>` paths are the unconfirmed Glob candidate; `<cap>` is for the Orchestrator to size):
```
node .agents/skills/orkestrel-dispatch/scripts/launch.ts --journal tmp/cursor/store-toolset-surface.jsonl --errors tmp/cursor/store-toolset-surface.err --cap <cap> --status -- C:/Users/mikes/AppData/Local/cursor-agent/versions/2026.10.01-14929f9/node.exe C:/Users/mikes/AppData/Local/cursor-agent/versions/2026.10.01-14929f9/index.js -p --trust --mode=ask --model grok-4.7-high --output-format stream-json "Read tmp/cursor/store-toolset-surface-brief.md and execute it exactly. Your final message is the document it specifies."
```
Read the answer with: `node .agents/skills/orkestrel-dispatch/scripts/result.ts --cursor tmp/cursor/store-toolset-surface.jsonl`

Unknowns:
- Whether the bench is live. `bench.ts --cursor` has not been run.
- Whether `--resolve` returns the 2026.10.01-14929f9 install the Glob found.
- Whether the Cursor agent, started from the scaffold checkout in ask mode, can read absolute paths in the sibling browser and ollama repositories.

Journal: `C:/Users/mikes/WebstormProjects/scaffold/tmp/cursor/store-toolset-surface.jsonl` (errors in `C:/Users/mikes/WebstormProjects/scaffold/tmp/cursor/store-toolset-surface.err`). No session id, because nothing was launched.

Deviation: Command failure, because this driver has no shell or write tool. I wrote no brief, ran no resolve and launched nothing, so there is no distillate of the subject. The computed task's fallback ("if the bench is dark, perform the reading yourself") was not taken. Bench liveness is unknown, and my standing instruction forbids reading the subject; `cursor.md:35` routes a dark bench to Luna, then Sonnet. No repository change was made, so containment is clean.
