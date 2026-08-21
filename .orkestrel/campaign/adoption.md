# Adoption wave roster — derived from rows.tsv, 2026-08-21

Refactor targets are Orkestrel repositories carrying at least one site of an adopted family. Site
counts are scoping signals; each repo unit judges its own sites against the plan's rulings.

Refactor + re-pin: mcp, workflow, worker, pool, reason, interpret, indexeddb, database, console,
workspace, terminal, relation, queue, agent, supervisor, server, ollama, sea, scaffold, router,
rater, process, probe, emitter, browser — and `test` itself, whose own setup modules import the new
surface from its source.

Re-pin only (after publish, on `main`, no version bump unless the dist comparison says otherwise):
every other `@orkestrel/*` dependent of `@orkestrel/test`.

Excluded on user instruction 2026-08-21: workbench, elements, scsr, mailbox, lloyds, taverna,
terrain, tsea. Their duplicate sites stay recorded in `rows.tsv` for a later campaign.
