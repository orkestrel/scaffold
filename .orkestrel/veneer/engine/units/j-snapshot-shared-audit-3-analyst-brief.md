# J-SNAPSHOT-SHARED round-3 audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra (`gpt-6-astra`), read-only, reached by `codex exec` from this file. Opus 5.5 wrote the round, so this cross-engine lane audits it. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness and what the code actually does.

## Read first

- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E25 and its amendments.
- Your round-2 verdict, `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-snapshot-shared-audit-2-objective-verdict.md`.
- The claims file, `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-snapshot-shared-audit-claims-3.md`, which names the subject (Veneer `43637c1`) and its evidence.

## Subject

Read every source at `43637c1`, either with `git -C C:/Users/mikes/WebstormProjects/veneer show 43637c1:<path>` or from the snapshot directory the claims file names. Round 2 is `e3167f7`. Never read the worktree.

## Focus

- Rule on every claim, and weight claims 1, 2, 3, and 7.
- For claim 2, check the reading against the DOM standard's `createElement` step and the HTML-document definition of attribute name matching. Name the document kinds you considered: an XML document from `createDocument`, an HTML document from `createHTMLDocument`, a `DOMParser` result of each type, a `text/plain` load, and an iframe's document.
- For claim 3, trace both move directions.
- For claim 7, search every class in `src/browser` again at this commit.
- You can run read-only commands. Run no test.
- Report no prose or wording finding.

## Output

Give a per-claim table: the claim; CONFIRMED, FAIL, or UNRESOLVED; the evidence with `file:line`; and, for each proof claim, the mutation and whether the assertions distinguish it. Then list any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
