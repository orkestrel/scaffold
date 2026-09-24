# J-SANITIZER-CONTEXT audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra (`gpt-6-astra`), read-only, reached by `codex exec` from this file. Opus 5.5 wrote the unit, so this lane runs on the engine that did not. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness and what the code actually does.

## Read first

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E21 and its amendments; the claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-sanitizer-context-audit-claims.md`, which names the subject (Veneer `c6912b0`), the defect's Chromium 141 log, and the instrument.

## Subject

Read every source at `c6912b0` with `git -C C:/Users/mikes/WebstormProjects/veneer show c6912b0:<path>`; the pre-change source is `ca83afb`. For the HTML Standard, read the sections the claims name from your knowledge of the standard and cite them by section; this lane has no network.

## Focus

Rule on every claim. Weight claims 1, 2, and 3: whether parsing an integration point's markup in an HTML `div` context gives the tree the standard's fragment algorithm gives for that context element, for every class of token, and whether the integration-point test and the text-integration-point exception match the standard's definitions exactly; then claim 6, reading each mutation spec in `units/j-sanitizer-context-mutations.py` against its case. You can run read-only commands and no test. Report no prose or wording finding.

## Output

A per-claim table (claim, CONFIRMED, FAIL, or UNRESOLVED, evidence with `file:line` or the standard's section, and for each proof claim the mutation and whether it is distinguished), then any behaviour defect outside the claims, then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
