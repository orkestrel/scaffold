# J-SANITIZER-CONTEXT round-2 audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra (`gpt-6-astra`), read-only, reached by `codex exec` from this file. Opus 5.5 wrote the round, so this lane runs on the engine that did not. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness and what the code actually does.

## Read first

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; your round-1 verdict `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-sanitizer-context-audit-objective-verdict.md`; the claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-sanitizer-context-audit-claims-2.md`, which names the subject (Veneer `85c04ac`) and its evidence, including the writer's excerpt of the HTML Standard.

## Subject

Read every source at `85c04ac` with `git -C C:/Users/mikes/WebstormProjects/veneer show 85c04ac:<path>`; round 1 is `c6912b0`. The writer's standard excerpt is evidence to check against your own knowledge of the standard, not to trust.

## Focus

Rule on every claim. Weight claim 1: the writer's reading disputes part of your round-1 claim-1 finding (the stray `</p>` and `</br>`); rule on the standard's foreign-content rule for those end tags, and on whether any token class still differs between a `div` context and an integration-point context without the prose saying so. Then claims 3 and 5. You can run read-only commands and no test. Report no prose-style finding; a prose sentence that states the standard or the code wrongly is a correctness finding.

## Output

A per-claim table (claim, CONFIRMED, FAIL, or UNRESOLVED, evidence with `file:line` or the standard's section, and for each proof claim the mutation and whether it is distinguished), then any behaviour defect outside the claims, then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
