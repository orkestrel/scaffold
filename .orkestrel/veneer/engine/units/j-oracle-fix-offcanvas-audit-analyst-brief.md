# J-ORACLE-FIX-OFFCANVAS round 1 audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra, read-only, reached by `codex exec` from this file. Opus 5.5 wrote the round, so this cross-engine lane audits it. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness, and what the code actually does.

## Read first

- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E24 with every amendment, § E28 with every amendment, § E34, and § E35.
- The claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-oracle-fix-offcanvas-audit-claims.md`. It names the subject, Veneer `eaf3908`, and each evidence file by its path.

## Subject

Read every file at `eaf3908` with `git -C C:/Users/mikes/WebstormProjects/veneer show eaf3908:<path>`. The base is `63eabbd`.

## Focus

- Rule every claim, and weight claims 1, 3, and 9.
- For claim 9, read how `Isolation` returns focus, and where `activeElement` points when focus sits inside a shadow root.
- For claim 6, read `Delegate`'s offcanvas route at `eaf3908`.
- You can run read-only commands. Run no test.
- Report no prose-voice finding.

## Output

Give a per-claim table: the claim; CONFIRMED, FAIL, or UNRESOLVED; the evidence with `file:line`; and, for each proof claim, the mutation and whether the assertions distinguish it. Then list any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
