# Audit brief — unit followon-budget

## Role and lane

`checker` on Claude Sonnet, a native subagent in a clean context, read-only. The `orkestrel-falsify` verdict shape binds.

## Subject and evidence

The unit's uncommitted changes in `/home/user/fleet/budget` on top of e35e994: the diff at `/home/user/work/evidence/followon-budget.diff` (`git diff HEAD`), the status at `/home/user/work/evidence/followon-budget.status` (`git status --short`), and the six rows at `/home/user/scaffold/tmp/units/followon/budget-brief.md` § Rows. The canon is `/home/user/scaffold/AGENTS.md` and `/home/user/scaffold/.claude/rules/`. The builder that applied the rows was stopped after its edits and gate runs while parked on a permission prompt; the Orchestrator wrote the evidence files from the tree it left, so the diff is the tree's, not the writer's quotation of it.

## What the round decides

Whether the unit lands on the Orchestrator's deciding gate run or goes back for a fix.

## Claims

1. Every row under § Rows is present in the diff as an exact replacement of the old text the row quotes with the new text the row prescribes, with no paraphrase; cite the diff hunk per row.
2. The diff touches only `src/core/types.ts`, `tests/setup.ts`, `tests/guides.test.ts`, and `guides/README.md`, and the status lists only those four files.
3. No sentence the unit wrote contains `below`, `above`, `currently`, `should`, or a count of a growable set, and no ordinal names a list item (`.claude/rules/writing.md` § Substitutions and § Code tokens, references, and links; `AGENTS.md` § Writing); name the pattern and the paths behind the sweep.
4. `guides/README.md` § Dependency reference names every `@orkestrel/*` development dependency `package.json` declares (`@orkestrel/guide`, `@orkestrel/probe`, `@orkestrel/scaffold`, `@orkestrel/test`) with its mirror file, and every mirror file in `guides/` other than `budget.md` and `README.md` is named there.
5. The `BudgetOptions` doc block states the `id` default in exactly one place (`Default: a random UUID.` on the property), and the `defineThrowingProperty` doc block states that the call mutates its argument.
6. No line in the diff exceeds 100 columns.

## Output

The `orkestrel-falsify` verdict shape: numbered per-claim verdicts with `file:line` evidence, findings outside the claims (each with the exact prescription that closes it), and exactly one terminal line `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids or none>`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing. Read-only; edit nothing. Read files only with the Read, Grep, and Glob tools and run no shell command.
