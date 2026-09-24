# J-SANITIZER audit, round 3 — the objective lane

## Role and engine

`analyst` on GPT-6 Astra (`gpt-6-astra`), read-only, reached by `codex exec` from this file. Opus 5.5 wrote the unit; you found the round-2 DOM clobbering bypass. Perform the assignment directly and spawn nothing. You hold the objective lane and an adversarial one: your job is to break the walk.

## Read first

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/typescript.md` and `tests.md` there; `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E21 with its amendment; your round-2 verdict `j-sanitizer-audit-objective-verdict.md` in the `units/` folder; the HTML standard's sanitization algorithms and the form element's named-property interface where your sandbox reaches them.

## Subject

The claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-sanitizer-audit-claims-3.md` names the subject and its evidence. Read the source in the worktree: `src/browser/sanitizers/ConfigSanitizer.ts`, the helpers it calls in `src/browser/helpers.ts`, `SANITIZER_BASELINE` and `SANITIZER_NAMESPACE` in `constants.ts`, `isSanitizerConfig` in `validators.ts`, and the cases in `tests/src/browser/sanitizers/ConfigSanitizer.test.ts` with `SANITIZER_CASES` in `tests/setupBrowser.ts`.

## Focus

Weight claims 1, 2, 3, 4, and 5. Claim 3 is the one that matters: produce any markup that passes the walk carrying script execution or navigation to a script URL that native safe `setHTML` would remove, and give its path through the source. You can run read-only commands and no test, so state each bypass as markup plus the line that keeps it. If you find none after attacking every vector the claim lists, say which vectors you attacked and why each fails. Report no prose or wording finding.

## Output

A per-claim table (claim, CONFIRMED, FAIL, or UNRESOLVED, evidence with `file:line`, and for each proof claim the mutation and whether it is distinguished), then every bypass with its markup and path (or the vectors attacked), then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
