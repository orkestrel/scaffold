# SFIX-A report

## Deviation

Expected: the owned `.agents/orchestration.md` file and the owned enterprise-skill files were writable in the assigned `workspace-write` sandbox.

Found: the patch mechanism accepted edits to `AGENTS.md` and `.claude/rules/writing.md`, then rejected an edit to `.agents/orchestration.md` with this exact evidence:

```text
Script error:
patch rejected: writing outside of the project; rejected by user approval settings
```

Done: the supplied count-ban text and the writing-rule pointer landed. The unit stopped when an owned path was blocked. No alternate write mechanism was used.

Short hypothesis: the sandbox exposes `.agents` as read-only despite the brief assigning those paths to this writer.

## Files touched

- `AGENTS.md` — replaced the count-ban bullets with the supplied text verbatim, including the `both` ruling.
- `.claude/rules/writing.md` — replaced the numeral row's derived count-ban clause with the bare pointer to `AGENTS.md` § Writing.

No other owned source file changed.

## Positional references left standing

No retained-position judgment landed because the unit stopped before those edits. These brief-listed references remain unruled and unchanged:

- `.claude/agents/codex.md` — Luna's ordinal place on the tedious-work ladder.
- `.claude/agents/scout.md`, `.claude/agents/researcher.md`, and `.claude/agents/checker.md` — each native role's ordinal place on the tedious-work ladder.
- `.agents/orchestration.md` — the timing rationale's ordinal reason, the audit artifact's ordinal reference, the bridge-driver and bench-engine ordinal references, and the measurement's ordinal procedure step.
- `.agents/skills/enterprise-bootstrap/SKILL.md` — prose references to styling-ladder ordinal labels.
- `.agents/skills/enterprise-bootstrap/references/components.md` — the custom-style ordinal label.
- `.agents/skills/enterprise-bootstrap/references/bootstrap-reference.md` — the wizard example's ordinal progress and the review step's ordinal label.

The numbered styling ladder itself would remain because its rank defines the ordered procedure. That judgment was not applied because the skill path was blocked.

## Rationale clauses kept

No rationale edit landed.

- The silent-discard clause remains at the orchestration and verifier prohibition sites. It changes the judgment that the named Git commands are safe because they do not warn before discarding a working-tree change.
- The orchestration clause about the uncommitted unit having no other copy remains only because the edit was blocked; it was not retained by judgment.
- The verifier clause that a gate run needs none of the commands and that the tree has no other copy remains only because the unit stopped; it was not retained by judgment.
- The verifier sentence that reads the dirty tree as the unit under verification remains only because the unit stopped; it was not retained by judgment.

## Bench law text

No loopback-listener text was added. The owned `.agents/orchestration.md` file was the blocked path.

## Acceptance evidence

The acceptance commands have no exit code or test totals because none ran after the deviation:

- `rg -n 'rule 4|the third row|the fifth kind' AGENTS.md` — NOT RUN.
- `rg -n -i 'step of the tedious-work ladder|rung [0-9]|rungs [0-9]|Step [0-9] of [0-9]' .claude/ .agents/` — NOT RUN.
- `.agents/orchestration.md` § Bench laws loopback-listener inspection — NOT RUN.
- `npm run lint:check` — NOT RUN.
- `npm run check` — NOT RUN.
- `npx vitest run --config vite.config.ts --project src:core tests/src/core/templates.test.ts` — NOT RUN.
- `npx vitest run --config vite.config.ts --project guides` — NOT RUN.

## Could not close

The positional-reference repairs, stale test-comment repairs, prohibition-site rationale cuts, loopback-listener bench law, and all acceptance evidence remain open because the owned `.agents` path was not writable. Completed work is limited to the supplied count-ban text and the writing-rule pointer.