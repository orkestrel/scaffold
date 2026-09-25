# J-SAMEWAY-ENGINES-A audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra (`gpt-6-astra`), read-only, reached by `codex exec` from this file. Opus 5.5 wrote the unit, so this cross-engine lane audits it. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness and what the code actually does.

## Read first

- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E13, § E22, § E24, and § E25, each with every amendment.
- Your J-SAMEWAY round-3 verdict, `units/j-sameway-audit-3-objective-verdict.md`, for the pattern these engines follow.
- The claims file, `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-sameway-engines-a-audit-claims.md`, which names the subject (Veneer `7511b82`) and its evidence.

## Subject

Read every file at `7511b82`, either with `git -C C:/Users/mikes/WebstormProjects/veneer show 7511b82:<path>` or from the snapshot directory the claims file names. The base is `8bc940d`. Never read the worktree.

## Focus

- Rule on every claim, and weight claims 1, 2, and 4.
- For claim 4, list every exit of each engine's `show`, `hide`, or `slide`, as you did for Modal and Offcanvas: what the returning step receives and what it writes.
- Find any write the call makes that no entry returns and no rule excuses. Find any return that writes something the call did not write.
- Trace a reaction that moves the token back inside each returning write, and a destruction inside one.
- For claim 1, find any door before the token step that still reads the token.
- You can run read-only commands. Run no test.
- Report no prose-voice finding. Claim 7 is about truth.

## Output

Give a per-claim table: the claim; CONFIRMED, FAIL, or UNRESOLVED; the evidence with `file:line`; and, for each proof claim, the mutation and whether the assertions distinguish it. Then list any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
