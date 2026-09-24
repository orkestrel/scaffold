# J-SANITIZER audit — the objective lane

## Role and engine

`analyst` on GPT-6 Astra (`gpt-6-astra`), read-only, reached by `codex exec` from this file. Opus 5.5 wrote the unit, so this lane runs on the engine that did not. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness, constraints, and what the code and the platform actually permit. This is a security-relevant unit: the walk is the only sanitizer on a Chromium without `setHTML`.

## Read first

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/typescript.md`, `architecture.md`, `patterns.md`, and `tests.md` in that repository; `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E21 and its amendment; your own design-round proposal `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-sanitizer-design-analyst-proposal.md` (its floor and configuration tables); the HTML standard's sanitization algorithms (https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#html-sanitization) where your sandbox can reach it.

## Subject

The claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-sanitizer-audit-claims.md` names the subject and its evidence. Read the source in the worktree: `src/browser/sanitizers/ConfigSanitizer.ts`, the predicates in `src/browser/helpers.ts`, `SANITIZER_BASELINE` in `src/browser/constants.ts`, `isSanitizerConfig` in `src/browser/validators.ts`, and `tests/src/browser/sanitizers/ConfigSanitizer.test.ts` with `SANITIZER_CASES` in `tests/setupBrowser.ts`.

## Focus

Rule on every claim. Weight claims 2, 3, 4, and 7: whether any markup reaches the target through the walk carrying script execution or navigation to a script URL that the platform's safe `setHTML` would have removed (attribute namespaces, `xlink:href` as a namespaced attribute, SVG and MathML links, `srcdoc`, a `form` with a script `action`, a `<meta http-equiv>`, `<style>` and `style` attributes, a `<template>` nested in a kept element, `<noscript>` reparsing); whether the context parse runs anything or loads anything; and what survives for another window's target. You can run read-only commands and no test, so state each bypass you find as markup and the path through the source that keeps it. Report no prose or wording finding: the user's ruling is that audits weigh implementation, and a sentence is in scope only where it states behaviour the code contradicts.

## Output

A per-claim table (claim, CONFIRMED, FAIL, or UNRESOLVED, evidence with `file:line`, and for each proof claim the mutation and whether it is distinguished), then any bypass or behaviour defect outside the claims with its markup and path, then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
