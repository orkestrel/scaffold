# Lane brief — draft the conformance round's verdict file

Role and engine: `grok` (Cursor Grok 4.6), read-only absorption and distillation. Never create, edit, or delete a file; never run a command that changes a tree. Perform the reading directly and spawn nothing.

Objective: draft `.orkestrel/campaign/conform/verdict.md` — the round's verdict file that `HANDOFF.md` § 5 step 4 names: "the engine substitutions, the interruption ledger, the per-package terminal lines" — from the records, so the Orchestrator writes the final file by ruling on the draft rather than by re-reading the folder.

Read, under `/home/user/scaffold/.orkestrel/campaign/conform/`: `HANDOFF.md` (the state table: one row per package or package group, with the landing commit, the rounds, and the verdict file each names); every `units/conform-<pkg>-audit-verdict.md` and every `units/followon/*-audit-verdict.md` (the Lanes table and the Terminal section of each); `ledgers/session-2026-09-03.md` and any other `ledgers/session-*.md` (every section naming a bench going dark, an engine substitution, a session restart, an interrupted unit, or a usage limit); `ledgers/followons.md` (the rows whose carrier is a next-matrix row rather than a landed commit).

Output shape, exactly:

`## Per-package terminal lines` — one table, one row per package in layer order (L0 codec contract msg sse test; L1 abort budget csv emitter html indexeddb ndjson sqlite timeout tool; L2 console database form markdown middleware pool process reason router table template websocket; L3 browser guide interpret lsp mcp qualifier queue rater relation scaffold sea server terminal workspace; L4 brief probe program worker workflow; L5 agent; L6 ollama toolbox), columns: package, landing commit (short hash or "not landed"), rounds run (a list of round numbers with each round's lanes and terminals, in the words the verdict file uses), fix rounds (writer engines), verdict terminal (quote the Terminal section's first word), follow-on units landed in that package (name and commit), the verdict file path. Where a package's verdict file is missing, say "no verdict file" and cite the HANDOFF row.

`## Engine substitutions` — a table: when (UTC, from the ledger), which bench or engine went dark, the evidence line the ledger quotes, which lanes moved to which engine, and when it came back if it did.

`## Interruptions` — a table: when, what was interrupted (session restart, unit killed, usage limit), what was lost or left partial, and how it was recovered (the ledger section).

`## Open carriers` — the follow-on rows whose carrier is a next-matrix row, one line each, with the package and the ledger line.

`## Unknowns` — anything the records leave ambiguous, with the file and line.

Distilled pointers only, `file:line` on every claim, no recommendations, no prose outside the tables.
