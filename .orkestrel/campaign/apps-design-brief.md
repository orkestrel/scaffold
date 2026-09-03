# Design brief — bring taverna, lloyds, and supervisor to the canon and the skills

## The question for both lanes

Propose the unit plan that brings the three applications to scaffold 0.0.60 and the latest
`@orkestrel/*` packages through the fleet visit, applies `enterprise-bootstrap` to each browser
surface, and proves each primary surface with a journey suite per `orkestrel-prove-journey`, the
way terrain now does. Name the units, their order, their owned files, their acceptance criteria,
the risks, and the campaign's exit criterion. Argue for the shape you hold; the Orchestrator
reconciles the two lanes.

## Evidence

- The absorption distillate: `.orkestrel/scaffold/absorb-consumers-report.md` (identity, pins,
  test infrastructure, structure drift, bootstrap and journey findings, risks, per repository).
- The terrain precedent: `.orkestrel/scaffold/visit-terrain-report.md` (the visit's deletion
  shape and the repair for a new lint rule), `terrain-reference-report.md`,
  `terrain-successor-report.md`, `fix-terrain-report.md`, `fix-terrain-successor-report.md`, and
  the live `terrain-compliance-brief.md` (application changes the skills require).
- The visit procedure: `.agents/skills/orkestrel-publish/references/wave.md` § Visit a
  repository; the successor `visit-overwrite-brief.md` (the Orchestrator commits the re-pin and
  runs the overwrite); `visit-terrain-brief.md` (the `--dirty` form under a user's lockfile
  change).
- The skills: `.agents/skills/enterprise-bootstrap/SKILL.md` and references;
  `.agents/skills/orkestrel-prove-journey/SKILL.md` and references.
- The catalog `.claude/agents/orkestrel.md`; scaffold's local version is 0.0.60 and
  `@orkestrel/test` 0.0.12 is the campaign build, both publishing in the release round that runs
  beside this design.

## Constraints the plan must honour

- One writer per checkout; the three checkouts can run in parallel. The visit precedes any
  skill unit in its checkout.
- Each visit needs preconditions the terrain visit did not: add `@orkestrel/scaffold`,
  `@orkestrel/test`, and `@orkestrel/probe` where absent; delete and commit a stale catalog
  agent body before the overwrite (taverna); expect the overwrite to replace `AGENTS.md`,
  `CLAUDE.md`, `vite.config.ts`, `.claude/settings.json` (taverna's SessionStart hooks live
  there and must move to `.claude/settings.local.json` or be dropped on the record), and to
  remove foreign canon paths; expect `configs/policy.ts` and the `no-nested-functions` rule to
  redden app code the way it did in terrain (28 sites).
- The user's rulings: latest contract and latest `@orkestrel` ranges everywhere; application
  changes the skills require are in scope (`navbar-dark`, outline buttons on dark rails, a
  destructive action without a confirmation ladder, inline `style` widths, per-row accessible
  names, the statechart harness page, the per-variant artifact); a published package
  (supervisor) whose runtime range moves bumps and publishes.
- Supervisor is both a package and an operator UI: its runtime `dependencies` move to the
  catalog and it publishes after; its Halfmoon route is the legacy `halfmoon.min.css`, not the
  modern core the others use.
- Lloyds' `vite.config.ts` carries unused `src:*` project factories the overwrite rewrites;
  taverna's `guides` project includes an empty tree.
- Every unit is a file before it launches; every acceptance criterion is independently
  checkable; timing-sensitive whole-suite results are observations, not criteria.

## Return

Units with role and engine, owned files, dependencies, acceptance criteria; the parallel and
serial order across the three checkouts; the risks with their settling probe; the exit
criterion as enumerated capabilities, each to end implemented, repaired, retained, or excluded
on evidence. Bound the plan to what the evidence supports; name every unknown as unknown with
how a unit reports on it.
