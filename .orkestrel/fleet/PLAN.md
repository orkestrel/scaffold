# Fleet plan — current-pins, clean-repos campaign

The campaign of record. Read this first if a session went dark. Prior campaign's open items live
in `BACKLOG.md`; the running ledger is `SESSION.md`.

## Exit criterion

1. Every fleet repo declares the latest published version of every `@orkestrel/*` dependency and
   devDependency, proven by gates and the material-dist rule (runtime re-pin ⇒ bump+publish cascade
   in layer order; dev re-pin ⇒ publish only when the rebuilt `dist/` differs **materially** from
   the published tarball — sourcemaps excluded, whitespace ignored; superfluous diffs oblige nothing).
2. Every repo clean of campaign residue; `ROADMAP.md` only where it is a live plan the user keeps.
3. Every deferred item implemented, struck on evidence, or in `BACKLOG.md` with owner and condition.

## User rulings (2026-08-17)

- **Branches: disregarded.** No deletions, merged or unmerged. The only branch question is whether
  main is behind — the main-behind audit (in flight) rules per unmerged branch which side is
  correct; its verdicts are informational unless main is missing real work.
- **supervisor: end of campaign.** Its ROADMAP, rescue branch, mirrors, and missing guide are one
  triage, taken after the wave completes. Its L5 re-pin/publish slot in the wave is deferred with it.
- **Materiality rule** for dist comparison landed in `.agents/orchestration.md` and the orkestrel
  role file: whitespace-only and sourcemap-only diffs are superfluous, never a republish trigger.

## Tier 1 — CLOSED

Catalog regenerated (46 rows). markdown PROPOSAL.md deleted. brief and scaffold `.orkestrel/`
triaged and pruned (survivors: B9-B15). Three publishing findings landed in orchestration.md.
Dev re-pin sweep 18/18 green, pushed, main fast-forwarded everywhere; test repo's guides.test.ts
migrated to guide 0.0.11 `fences()`/`findUnlisted` (first live B1 confirmation).

## Tier 2 — the release wave (user-gated on publish only)

Material-dist verdicts (rebuilt vs published, material rule): **contract, emitter, html, markdown,
msg, ndjson, program, qualifier, template, tool** owe a release — each carries post-release src
commits on main. interpret collapsed to superfluous: no release owed. Runtime drift separately
obliges: workspace, queue, relation, scaffold, worker, workflow, agent, toolbox, ollama (+supervisor,
deferred).

Because contract (L0) republishes, every consumer re-pins under the exit criterion and bumps in
turn: the wave is effectively fleet-wide, layer by layer. Expected publish rounds:

- **L0**: contract, msg. (sse, test: publish only if their own dist proves material.)
- **L1**: abort, budget, csv, emitter, html, indexeddb, ndjson, sqlite, timeout, tool.
- **L2**: console, database, form, markdown, middleware, pool, reason, router, sea, table,
  template, websocket.
- **L3**: browser, guide, interpret, mcp, qualifier, queue, rater, relation, scaffold, server,
  terminal, workspace.
- **L4**: brief, program, worker, workflow.
- **L5**: agent. (supervisor deferred.)
- **L6**: ollama, toolbox.

Per-repo protocol, in layer order:

1. Re-pin `@orkestrel/scaffold` devDependency to latest and install (the overwrite must run the
   current vendored host).
2. `scaffold overwrite`; read the git diff; walk back real package affordances; residue deletions
   stand.
3. Re-pin runtime `@orkestrel/*` deps to the versions the registry serves now (overwrite's
   `declare` performs this; verify it).
4. Five gates. Expect and repair B1-class adoption debt (guide 0.0.11 fences API, test 0.0.5
   helpers) as it surfaces, like the test repo.
5. Material-dist check; bump when a runtime pin moved or the dist proves material.
6. Commit, push branch, fast-forward main. The user publishes the layer's batch; a five-minute
   window covers roughly 8-12 uploads, so expect several approvals across the wave.
7. The next layer prepares only after this one is on the registry (pins must resolve).

Scaffold's own release (console re-pin + this session's vendored rule edits) rides its L3 slot and
then propagates the updated host fleet-wide through the later layers' overwrites.

## After the wave

- **supervisor** (D3): full triage — ROADMAP keep/extract, rescue branch, mirrors, guide — then its
  own re-pin/bump/publish visit.
- **Backlog design work** (BACKLOG.md): B1 residue not closed by the wave's visits, B2 canon
  reconciliation, B3 prepack call, B9 contract combinator, B10 reason guards, B12-B15.

## Decision register (user)

| # | Decision | State |
| - | -------- | ----- |
| D3 | supervisor triage and its ROADMAP | deferred to campaign end, per ruling |
| D5 | Publish windows for each wave layer | user-run, on request |
| D6 | B3 prepack manifests | open, no default |
| D7 | Wave go/no-go: begin L0 preparation (contract, msg bumps + gates, no publish until approved) | awaiting ruling |
