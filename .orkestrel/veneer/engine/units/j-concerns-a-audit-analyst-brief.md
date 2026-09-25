# J-CONCERNS-A audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra, read-only, reached by `codex exec` from this file. Opus 5.5 wrote the unit, so this cross-engine lane audits it. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness, and what the code and the proofs actually do.

## Read first

- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/tests.md`.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E9, § E11, and § E32 with its amendment.
- The claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-concerns-a-audit-claims.md`, which names the subject (Veneer `bcea965`) and each evidence file by its path.

## Subject

Read every file at `bcea965` with `git -C C:/Users/mikes/WebstormProjects/veneer show bcea965:<path>`. The unit's net change over `main` is `git diff 094a71e bcea965`. Never read the worktree.

## Focus

- Rule claims 1 to 6, and weight claim 6.
- For each proof, name the mutation that makes it fail, and say whether its assertions tell that mutation apart from the passing case.
- Read `src/browser/ScrollSpy.ts` and `src/browser/Button.ts` at `bcea965` for a behaviour on the five concerns that no case covers. Examples: a smooth click during an activation, a destroyed scrollspy's pending smooth scroll, or a toggle from inside a toggle listener.
- For claim 3, say whether pinning Bootstrap's smooth scroll under reduced motion is a parity reading or a defect that E11 would refuse. Cite the ruling you rely on.
- You can run read-only commands. Run no test.
- Report no prose-voice finding. Claims 7 and 8 go to the checker job, but report any defect you see in them.

## Output

Give a per-claim table: the claim; CONFIRMED, FAIL, or UNRESOLVED; the evidence with `file:line`; and, for each proof claim, the mutation and whether the assertions distinguish it. Then list any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
