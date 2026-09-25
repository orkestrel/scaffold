# J-MOTION-PROOFS-B rounds 1 and 2 audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra, read-only, reached by `codex exec` from this file. Opus 5.5 wrote both rounds, so this cross-engine lane audits them. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness, and what the code and the proofs actually do.

## Read first

- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E24 with every amendment, § E32 with its amendment, § E34, and § E35.
- The claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-motion-proofs-b-audit-claims.md`. It names the subject, Veneer `fd82ae9`, and each evidence file by its path.

## Subject

Read every file at `fd82ae9` with `git -C C:/Users/mikes/WebstormProjects/veneer show fd82ae9:<path>`. The base is `1290162`.

## Focus

- Rule every claim, and weight claims 3, 4, and 5.
- For claim 3, trace the Toast show's door after the fade-in settle, its rewind, and a `hide` that a `shown`-less takeover starts.
- For claim 5, open each mutation log under `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/motion-proofs-b/tmp/j-motion-proofs-b/mutations/`, and name which case failed by which error.
- You can run read-only commands. Run no test.
- Report no prose-voice finding.

## Output

Give a per-claim table: the claim; CONFIRMED, FAIL, or UNRESOLVED; the evidence with `file:line`; and, for each proof claim, the mutation and whether the assertions distinguish it. Then list any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
