# Unit R6 report — align-packages authority order

## Edit

File: `.agents/skills/orkestrel-align-packages/SKILL.md`, `## Load authority` numbered list.

Before:

```
1. `AGENTS.md` and applicable `.claude/rules/*.md`.
2. The `integration.md` and `fleet.md` references selected below.
3. `.agents/orchestration.md` for orchestration.
4. Relevant package guides, `guides/scaffold.md`, and the configured Orkestrel specialist.
```

After:

```
1. `AGENTS.md` and applicable `.claude/rules/*.md`.
2. `.agents/orchestration.md` for orchestration.
3. The `integration.md` and `fleet.md` references selected below.
4. Relevant package guides, `guides/scaffold.md`, and the configured Orkestrel specialist.
```

This matches O7's correction (ruling 13, `.orkestrel/debrief/reconciliation.md:70`): the skill
previously ordered its own `integration.md`/`fleet.md` references before
`.agents/orchestration.md`, reversing the root sequence at `.agents/orchestration.md:8-14`, which
places orchestration before a dispatch-named skill's references. `.agents/orchestration.md` now
precedes the references. No other content in the skill or its `references/*.md` files states a
conflicting authority order, so no other line moved.

## Standing condition

`test:config` was not run, per the brief's standing condition: it is red at HEAD for an unrelated
stale host inventory, and the Orchestrator regenerates it at integration.

## Acceptance

1. O7's correction is present; no other content moved.
2. This report file exists.
