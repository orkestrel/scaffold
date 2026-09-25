# J-HOLDERS audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra (`gpt-6-astra`), read-only, reached by `codex exec` from this file. Opus 5.5 wrote the unit, so this cross-engine lane audits it. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness and what the code actually does.

## Read first

- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E13, § E22, § E24, § E25, and § E30, each with its amendments.
- The claims file, `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-holders-audit-claims.md`, which names the subject (Veneer `ef320ca`) and its evidence.

## Subject

Read every file at `ef320ca`, either with `git -C C:/Users/mikes/WebstormProjects/veneer show ef320ca:<path>` or from the snapshot directory the claims file names. The base is `4cd56a8`. Never read the worktree.

## Focus

- Rule on every claim, and weight claims 1, 2, and 3.
- For claim 1, trace Modal's `open` token through two modals in each order of show and hide, a stopped show (E22 and E24's returning step), a destruction mid-change, and a body replaced between shows.
- For claim 2, trace two and three isolations, with and without `spare`, destroyed in each order. Find any element whose final `inert` state differs from `4cd56a8`'s, or any intermediate write a reaction could observe that `4cd56a8` never made.
- For claim 3, test the stated reason against `ScrollLock`'s code.
- You can run read-only commands. Run no test.
- Report no prose finding.

## Output

Give a per-claim table: the claim; CONFIRMED, FAIL, or UNRESOLVED; the evidence with `file:line`; and, for each proof claim, the mutation and whether the assertions distinguish it. Then list any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
