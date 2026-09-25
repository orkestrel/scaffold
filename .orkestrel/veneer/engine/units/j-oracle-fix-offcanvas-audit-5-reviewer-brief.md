# J-ORACLE-FIX-OFFCANVAS rounds 3 to 5 audit — the subjective lane

## Role and engine

`reviewer` on Opus 5.5, a native read-only subagent. Perform the assignment directly and spawn nothing. You hold the subjective lane. Rule on whether the new surface fits the project: the name and home of `holdsFocus`, `IsolationInterface.trigger`, the press rule's shape, the test titles, and the prose.

## Read first

- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, and `.claude/rules/names.md`, `architecture.md`, `tests.md`, `documentation.md`, and `writing.md` under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E35.
- The claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-oracle-fix-offcanvas-audit-claims-5.md`, and every evidence file it names.

## Subject

The diffs are `j-oracle-fix-offcanvas-3.diff` and `j-oracle-fix-offcanvas-5.diff` in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`. The tree at `88d06f4` is the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas`. Read by absolute path.

## Focus

- Rule claims 2, 3, 6, and 8 from the design-fit side, answering each of these:
  - Is `holdsFocus` the right name, home, and shape for a module helper?
  - Does `trigger` on `IsolationInterface` read as the single word it should?
  - Do the guide's new paragraphs teach the rule and its limits clearly?
  - Do the test titles name what they prove?
- For each proof you confirm, name the mutation that makes it fail, and say whether its assertions tell that mutation apart from the passing case.
- Report a prose finding only where a sentence is false or breaks a writing rule, with the rule.

## Output

Give a per-claim table for the claims you rule: the claim; CONFIRMED, FAIL, or UNRESOLVED; and the evidence with `file:line`. Then list any design-fit defect, with the smallest change that fixes it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
