# Unit F0-BRIDGE — successor brief 2

Effective over `tmp/units/f0-bridge-brief.md`, which stays in force for every section this file does
not change.

## What changed and why

The original brief's § Standing conditions stated that `git status --short` prints nothing before
the unit starts. That was false: the Orchestrator had retained two records under
`.orkestrel/veneer/units/` after the checkpoint commit `903962c` and before the launch, and the
unit stopped on them, correctly. The corrected standing condition follows.

## Standing conditions (replaces the row in the original brief)

Before you start, `git status --short` prints exactly these untracked paths and nothing else:

```text
?? .orkestrel/veneer/units/f0-bridge-brief-2.md
?? .orkestrel/veneer/units/f0-bridge-brief.md
?? .orkestrel/veneer/units/veneer-pin-gates-report.md
```

Each is the Orchestrator's retained record, outside your owned set; read them as expected and do
not touch them.

## Acceptance criteria (replaces criterion 1 in the original brief)

1. `git status --short` prints exactly ` M .orkestrel/veneer/plan.md`,
   ` D .orkestrel/veneer/handoff.md`, and the untracked paths named under § Standing conditions,
   and nothing else.

Criteria 2 and 3 of the original brief stand unchanged.
