# Report — unit readme-links (builder, Sonnet; first pass over the idle checkouts)

Grep launch set (`grep -l 'guides/src/' /home/user/fleet/*/README.md`): abort, agent, budget,
console, contract, csv, database, emitter, indexeddb, markdown, middleware, msg, ndjson, ollama,
pool, program, qualifier, queue, router, sea, server, sse, template, timeout, toolbox, websocket,
worker, workflow. Excluded as live in this pass: ollama, toolbox. Every other checkout's README
now links `guides/<package>.md` (agent also `guides/tool.md` and `guides/workspace.md`; sea at two
lines; contract, indexeddb, and websocket inside GitHub URL targets), each target exists, and each
status lists `README.md` alone. Re-run grep over the edited checkouts: no hit. No deviation.
Second pass owed: ollama and toolbox after their units land.
