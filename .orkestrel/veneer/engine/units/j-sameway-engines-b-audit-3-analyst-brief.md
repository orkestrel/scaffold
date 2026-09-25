# J-SAMEWAY-ENGINES-B round 3 audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra, read-only, reached by `codex exec` from this file. Opus 5.5 wrote the round, so this cross-engine lane audits it. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness, and what the code actually does.

## Read first

- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E13, § E18, § E24 with every amendment, and § E25.
- Your earlier verdict, `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-sameway-engines-b-audit-objective-verdict.md`, and the Orchestrator's `j-sameway-engines-b-audit-verdict.md` beside it.
- The claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-sameway-engines-b-audit-claims-3.md`, which names the subject (Veneer `87dc147`) and each evidence file by its path.

## Subject

Read every file at `87dc147` with `git -C C:/Users/mikes/WebstormProjects/veneer show 87dc147:<path>`. The base is `45aebaa`. Never read the worktree.

## Focus

- Rule every claim, and weight claims 1, 2, 3, and 5.
- Re-run your earlier witnesses through `87dc147`.
- List Dropdown's and Tooltip's change exits: what each records, and what each returning step writes. Find any target a change writes that the return misses, and any return that writes a value the target did not hold before the call's first changing write.
- For claim 2, rule whether treating `aria-describedby` as a token list is E24's rule applied to a shared list, or a departure from it that needs a ruling.
- For claim 3, find any path where a refused reopening leaves `shown` true, or dispatches `hidden` twice.
- You can run read-only commands. Run no test.
- Report no prose-voice finding.

## Output

Give a per-claim table: the claim; CONFIRMED, FAIL, or UNRESOLVED; the evidence with `file:line`; and, for each proof claim, the mutation and whether the assertions distinguish it. Then list any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
