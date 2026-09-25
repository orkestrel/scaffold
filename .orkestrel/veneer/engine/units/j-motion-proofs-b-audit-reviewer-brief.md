# J-MOTION-PROOFS-B rounds 1 and 2 audit — the subjective lane

## Role and engine

`reviewer` on Opus 5.5, a native read-only subagent. Perform the assignment directly and spawn nothing. You hold the subjective lane: whether the proofs' shape, the engines' changes, the test titles, the comments, and the guide's voice fit the project.

## Read first

- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, and `.claude/rules/names.md`, `tests.md`, `browser.md`, `documentation.md`, and `writing.md` under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E32 with its amendment, § E34, and § E35.
- The claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-motion-proofs-b-audit-claims.md`, and every evidence file it names.

## Subject

The diffs are `j-motion-proofs-b.diff` and `j-motion-proofs-b-2.diff`, and the patches that each integration applied, all in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`. The tree at `fd82ae9` is the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/motion-proofs-b`. Read by absolute path.

## Focus

- Rule claims 1, 2, 7, 9, and 10 from the design-fit side, answering each of these:
  - Does the watcher pattern repeat across the four files where a shared reader in `tests/setupBrowser.ts` belongs? If so, name the duplication and where it would live.
  - Are the kept control readings the right shape under E32?
  - Do the test titles name what they prove?
  - Do the comments and the guide sentences follow the writing rules?
- For each proof you confirm, name the mutation that makes it fail, and say whether its assertions tell that mutation apart from the passing case.
- Report a prose finding only where a sentence is false or breaks a writing rule, with the rule.

## Output

Give a per-claim table for the claims you rule: the claim; CONFIRMED, FAIL, or UNRESOLVED; and the evidence with `file:line`. Then list any design-fit defect, with the smallest change that fixes it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
