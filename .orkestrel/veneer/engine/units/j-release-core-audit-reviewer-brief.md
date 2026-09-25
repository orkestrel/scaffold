# J-RELEASE-CORE round 1 audit — the subjective lane

## Role and engine

`reviewer` on Opus 5.5, a native read-only subagent. Perform the assignment directly and spawn nothing. You hold the subjective lane: whether the `Lifetime` and `write` surfaces present the shape E35 rules, whether the names and the vocabulary fit the project, and whether the guide's voice holds.

## Read first

- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, and `.claude/rules/names.md`, `architecture.md`, `patterns.md`, `typescript.md`, `tests.md`, `documentation.md`, and `writing.md` under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E25 and § E35.
- The claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-release-core-audit-claims.md`, and every evidence file it names.

## Subject

The diff is `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-release-core.diff`. The tree at `d702bb8` is the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-core`. Read by absolute path.

## Focus

- Rule claims 2, 3, 8, and 9 from the design-fit side, answering each of these:
  - Does `join`'s third parameter, the class's own lifetime, fit, or does it belong elsewhere?
  - Does `LifetimeHolding` earn its place as a public type?
  - Is `matchesHostValue` the right name and home?
  - Does the guide teach the mechanism an engine author must follow, including claim 3's rule?
  - Do the test titles name what they prove?
- For each proof you confirm, name the mutation that makes it fail, and say whether its assertions tell that mutation apart from the passing case.
- Report a prose finding only where a sentence is false or breaks a writing rule, with the rule.

## Output

Give a per-claim table for the claims you rule: the claim; CONFIRMED, FAIL, or UNRESOLVED; and the evidence with `file:line`. Then list any design-fit defect, with the smallest change that fixes it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
