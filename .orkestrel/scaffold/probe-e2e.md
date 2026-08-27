# End-to-end acceptance probe — new, audit, repair against a scratch target

Run by the Orchestrator on 2026-08-27 with the built CLI (dist from commit 4979ed2's tree).

## Commands and readings

```text
node dist/bin/main.js new widget --src core --offline --target ./widget -> exit 0
widget/.agents -> absent; widget/.claude -> agents, settings.json; widget/.claude/rules -> absent
widget/AGENTS.md and widget/CLAUDE.md open with the pointer bodies

planted: widget/.claude/rules/names.md; drifted: widget/AGENTS.md
audit -> exit 1; row: AGENTS.md docs stale; canon question names .claude/rules
repair -> exit 0; output carries the canon question and 'AGENTS.md replaced (25 lines added)'
after repair: AGENTS.md opens with the pointer body; .claude/rules/names.md still present
audit (aligned tree) -> exit 0 with the canon question still reported
```

## What the probe settles

- A generated target carries the pointer pair and no canon tree.
- repair replaces a drifted pointer and never touches a canon leftover.
- The canon question is reported by audit and by a writing verb's terminal audit, refuses
  nothing, and does not move an aligned tree's exit code.
- The guide sentence claiming no writing verb raises the setup question contradicted this
  reading and was corrected in guides/scaffold.md in the same change.

## Control

The negative control is the fresh target before the plant: its audit reported no canon
question and no drift row (new.log, audit on the clean tree implied by exit 0 after repair).
Raw logs: new.log, audit.log, repair.log, audit2.log beside this record's source in the
scratchpad; transcribed here because the scratchpad is swept.
