# J-ORACLE-FIX-OFFCANVAS round 1 audit — the subjective lane

## Role and engine

`reviewer` on Opus 5.5, a native read-only subagent. Perform the assignment directly and spawn nothing. You hold the subjective lane: whether the fix's shape fits the engine, the vocabulary, the comments, and the guide's voice.

## Read first

- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, and `.claude/rules/names.md`, `browser.md`, `tests.md`, `documentation.md`, and `writing.md` under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E24 and § E35.
- The claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-oracle-fix-offcanvas-audit-claims.md`, and every evidence file it names.

## Subject

The diff is `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-oracle-fix-offcanvas.diff`. The tree at `eaf3908` is the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas`. Read by absolute path.

## Focus

- Rule claims 1, 2, 3, 7, and 8 from the design-fit side, answering each of these:
  - Is cancelling the press's default action on the condition that focus moved the shape a reader of this engine expects?
  - Does it sit beside the E35 mechanism J-OVERLAYS will bring to `Offcanvas` without a conflict?
  - Are the test titles named for what they prove?
  - Do the comment and the guide sentences follow the writing rules?
- For each proof you confirm, name the mutation that makes it fail, and say whether its assertions tell that mutation apart from the passing case.
- Report a prose finding only where a sentence is false or breaks a writing rule, with the rule.

## Output

Give a per-claim table for the claims you rule: the claim; CONFIRMED, FAIL, or UNRESOLVED; and the evidence with `file:line`. Then list any design-fit defect, with the smallest change that fixes it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
