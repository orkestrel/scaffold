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
- **supervisor: not ours.** The user works it in their own session at their own pace. Clone
  removed, excluded from every sweep, plan, and script; its rescue branch travels with it.
- **Materiality rule** for dist comparison landed in `.agents/orchestration.md` and the orkestrel
  role file: whitespace-only and sourcemap-only diffs are superfluous, never a republish trigger.

## Tier 1 — CLOSED

Catalog regenerated (46 rows). markdown PROPOSAL.md deleted. brief and scaffold `.orkestrel/`
triaged and pruned (survivors: B9-B15). Three publishing findings landed in orchestration.md.
Dev re-pin sweep 18/18 green, pushed, main fast-forwarded everywhere; test repo's guides.test.ts
migrated to guide 0.0.11 `fences()`/`findUnlisted` (first live B1 confirmation).

## Completed by the user's result-guard session (2026-08-17, see brief/DEBRIEF.md)

contract 0.0.12 (`objectOf` — closes B9's contract half), reason 0.0.6 (eleven result guards —
closes B10), interpret 0.0.9, brief 0.0.2, rater 0.0.10, qualifier 0.0.9, program 0.0.8,
test 0.0.6 (fences migration + browser journey layer). All published, mains current, clones synced.

**One defect carried out of it:** reason 0.0.6 published pinning contract ^0.0.11 while its five
consumers pin contract ^0.0.12 — two contract copies in one install graph. The repair is reason's
L2 wave slot (one release re-pinning contract ^0.0.12 plus whatever L1 lands); the five consumers
re-pin reason in their own second-round slots.

**supervisor is out of this campaign entirely** — user-owned session; clone removed, excluded from
every sweep, plan, and script.

## Tier 2 — the release wave, reorganized

Per-repo protocol unchanged (visit.sh): overwrite with current host → format converge → five gates
→ material-dist check → bump when owed → push branch + fast-forward main. Every visit also re-pins
test ^0.0.6 dev. DEBRIEF guidance binds visits: guide Kind column distinguishes function/const;
source TSDoc backticks only its own package's exports; dictionary leaves certify own members only.

| Round | Work | Publishes |
| ----- | ---- | --------- |
| now | publish the prepared msg 0.0.7; sse dev-only re-pin (contract dev ^0.0.12, test ^0.0.6), no release expected | msg |
| L1 | abort, budget, csv, emitter, html, indexeddb, ndjson, sqlite, timeout, tool — re-pin contract ^0.0.12, visit, bump | 10 |
| L2 | console, database, form, markdown, middleware, pool, reason (defect repair rides here), router, sea, table, template, websocket | 12 |
| L3 | browser, guide, mcp, queue, relation (+B16 hardening port), scaffold (+B17 catalog-format fix, vendored rule edits ship), server, terminal, workspace, plus second rounds: interpret, qualifier, rater (re-pin reason 0.0.7 and L1 bumps) | 12 |
| L4 | worker, workflow, plus second rounds: brief, program | 4 |
| L5 | agent | 1 |
| L6 | ollama, toolbox | 2 |

Roughly 42 uploads across 7 windows. Each layer prepares only after the previous is on the
registry. Publishing is the user's credential; windows on request.

## After the wave

Backlog design work: B1 residue, B2 canon reconciliation, B3 prepack call, B12-B15, B17-B20.
supervisor work belongs to the user's own session and is not tracked here beyond B6's pointer.

## Decision register (user)

| # | Decision | State |
| - | -------- | ----- |
| D5 | Publish windows per layer round | user-run, on request; msg's window is ready now |
| D6 | B3 prepack manifests | open, no default |
| D8 | Branch cleanup script run (.orkestrel/fleet/branch-cleanup.sh, operator credentials) | with user |
