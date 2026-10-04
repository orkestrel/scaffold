# Unit eager-analyst — the objective design argument for an eager, recovering `browse` pool

## Role and engine

`analyst` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`, because the read-only sandbox blocks every shell on this host. Read-only by this brief: create, edit, delete, and run nothing that writes, here or in any other checkout. Perform the assignment yourself and spawn nothing.

## Lane

Objective: correctness, failure modes, races, protocol facts, resource cleanup, and measurable cost. Two Opus planners argue API shape and naming in parallel; argue those only where correctness forces a shape.

## Assignment

Answer `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\lifecycle\eager\design-brief.md` in full, reading the inputs it names (`map.md`, `clients.md`, and `browser-browse-map.md` beside it, and the code in this checkout). Give particular weight to:

- Every way a launch, a recovery, or a teardown can race: a tool call arriving mid-recovery, two crashes in a row, a crash during teardown, a signal during the eager launch, a client that closes stdin before the launch finishes, the port 9222 refusal at startup.
- The failure table: for each failure (launch refused, executable missing, process exit, dropped socket, renderer crash, a browser alive but not answering, profile directory locked, disk full), the signal that reveals it, the pool's action, and what the caller sees, with code citations for every existing signal and a stated gap where none exists.
- Liveness without a periodic poll (`AGENTS.md` § Design laws): what the existing events and command deadlines cover, and what they leave uncovered.
- The startup sequence against each client's startup timeout in `clients.md`, and what the user sees when the launch fails under each candidate, including the D9 candidates that change `@orkestrel/mcp` (its checkout is `C:\Users\mikes\WebstormProjects\mcp`): judge each against the MCP specification's lifecycle text in `clients.md`.
- Cleanup: every process, profile, port, and listener the pool creates, and the proof that each is released after a normal stop, a crash, and a killed server (the next start's sweep of orphaned profiles included).
- The measurement plan for the spare browser and the eager start: what to time, on which realistic loads, and what result would make the spare worth keeping, reasoned from the case with no fixed figure.

## Output

Return one Markdown document in the brief's output shape. Cite `path:line` for every claim about the code. No process diary.
