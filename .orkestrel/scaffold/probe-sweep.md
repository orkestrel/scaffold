# End-to-end sweep probe — new, tracked leftovers, audit, overwrite, re-audit

Run by the Orchestrator on 2026-08-27 with the built CLI (dist from fdf72fe's tree).

```text
new widget --src core --offline -> exit 0; .claude holds agents + settings.json;
  .codex, .cursor, .mcp.json absent; .claude/agents holds orkestrel.md
git init + commit; planted tracked: .claude/rules/names.md, .codex/config.toml,
  .claude/agents/planner.md; committed
audit (online) -> exit 1; foreign rows for the planted leftovers
overwrite --offline -> '3 removed', '0 of 34 planned paths drifted'; exit 1 from the
  pinned usage refusal: catalog does not take --offline (the sweep half completed)
after: .claude/rules and .codex empty; .claude/agents holds only orkestrel.md
audit (online) -> exit 1: the live overlay compares the unpublished branch's floor
  against the published 0.0.55 inventory, reporting tests/policy.test.ts stale -
  correct for a branch ahead of the registry, and unrelated to the sweep
audit --offline -> exit 0, '0 of 34 planned paths drifted'
```

## What the probe settles

- A generated target carries no harness wiring and keeps the catalog file.
- A tracked canon leftover is a foreign finding and audit exits 1 on it.
- One overwrite run repairs the pointers and deletes the tracked leftovers through
  the existing transaction; the catalog file survives.
- The swept tree audits clean against its floor.
- The online stale row is the live overlay reading the published release, which is
  the correct answer for an unpublished branch.
