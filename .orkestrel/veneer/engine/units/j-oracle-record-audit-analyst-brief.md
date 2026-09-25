# J-ORACLE-RECORD audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra, read-only, reached by `codex exec` from this file. Opus 5.5 wrote the unit, so this cross-engine lane audits it. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness, and what the oracle actually records and compares.

## Read first

- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/tests.md`.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E9, § E11, § E26, and § E28.
- The claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-oracle-record-audit-claims.md`, which names the subject (Veneer `9ea360d`) and each evidence file by its path.

## Subject

Read every file at `9ea360d` with `git -C C:/Users/mikes/WebstormProjects/veneer show 9ea360d:<path>`. The base is `0865c67`. Never read the worktree. Bootstrap's pinned bundle and sources are under `C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/`.

## Focus

- Rule claims 1 to 8 and claim 10, and weight claims 3, 5, 6, and 7.
- For claim 3, find any way the settle can report a state while a motion runs. Examples: a transition on an element that `document.getAnimations()` omits, a delay longer than the span it reads, or a scroll that stops and restarts between readings.
- For claim 7, name each end-state facet a plugin carries that no reading captures, and say which plugin's parity it leaves unproved.
- For claim 6, name the mutation each row plants, and say whether the comparison tells it apart from the passing case.
- Rule claim 9's `tests.md` points you can check from the code. The subjective lane rules its naming.
- You can run read-only commands. Run no test.
- Report no prose-voice finding.

## Output

Give a per-claim table: the claim; CONFIRMED, FAIL, or UNRESOLVED; the evidence with `file:line`; and, for each proof claim, the mutation and whether the comparison distinguishes it. Then list any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
