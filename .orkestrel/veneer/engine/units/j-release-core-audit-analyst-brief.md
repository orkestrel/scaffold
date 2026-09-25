# J-RELEASE-CORE round 1 audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra, read-only, reached by `codex exec` from this file. Opus 5.5 wrote the round, so this cross-engine lane audits it. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness, and what the code and its contracts actually permit.

## Read first

- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E13 with every amendment, § E24 with every amendment, § E25, and § E35.
- The claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-release-core-audit-claims.md`. It names the subject, Veneer `d702bb8`, and each evidence file by its path.

## Subject

Read every file at `d702bb8` with `git -C C:/Users/mikes/WebstormProjects/veneer show d702bb8:<path>`. The base is `63eabbd`.

## Focus

- Rule every claim, and weight claims 1, 3, and 4.
- For claim 1, trace a nested `destroy` inside a release, and inside an abort listener.
- For claim 3, reason from the adoption the J-RELEASE units will make, for example `Dropdown`'s per-show `Placement` and `Delegate`'s acquired engines.
- For claim 4, trace a no-change `write` while another snapshot's restoration has the target pending.
- You can run read-only commands. Run no test.
- Report no prose-voice finding.

## Output

Give a per-claim table: the claim; CONFIRMED, FAIL, or UNRESOLVED; the evidence with `file:line`; and, for each proof claim, the mutation and whether the assertions distinguish it. Then list any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
