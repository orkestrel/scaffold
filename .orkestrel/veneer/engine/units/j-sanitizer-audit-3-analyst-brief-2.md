# J-SANITIZER audit, round 3 — the objective lane (successor brief)

Successor to `j-sanitizer-audit-3-analyst-brief.md`. What changed and why: the first run of this lane (thread journal `tmp/codex/j-sanitizer-audit-3.jsonl`) ended with the provider's content filter refusing the turn before a verdict, so the lane did not run. This brief asks for the same review in a verification form: for each defence, confirm from the source that it holds, or name the gap. The subject is Veneer's own HTML sanitizer, reviewed defensively before it ships.

## Role and engine

`analyst` on GPT-6 Astra (`gpt-6-astra`), read-only, reached by `codex exec` from this file. Opus 5.5 wrote the unit. Perform the assignment directly and spawn nothing. You hold the objective lane: correctness and what the code actually guarantees.

## Read first

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E21 with its amendment; your round-2 verdict `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-sanitizer-audit-objective-verdict.md`.

## Subject

The claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-sanitizer-audit-claims-3.md` names the subject and its evidence. Read the source in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/sanitizer`: `src/browser/sanitizers/ConfigSanitizer.ts`, the helpers it calls in `src/browser/helpers.ts`, `SANITIZER_BASELINE` in `src/browser/constants.ts`, `isSanitizerConfig` in `src/browser/validators.ts`, and the cases in `tests/src/browser/sanitizers/ConfigSanitizer.test.ts` with `SANITIZER_CASES` in `tests/setupBrowser.ts`.

## Focus

Rule on every claim. For claim 3, work through this checklist, and for each item name the source line whose defence handles it, or describe the gap in one sentence:

1. Named-property shadowing of the members the walk reads, on every element kind that has named properties (`form`, and the document-level named access through `img`, `embed`, and `object` names).
2. A tree change during traversal: whether the walker can skip or revisit a node when an element is removed while walking.
3. Template content inside kept elements, nested templates, and templates in foreign content.
4. Namespaced attributes: `xlink:href`, and an attribute in an unknown namespace whose local name is `href`.
5. The attributes and elements the platform's safe baseline removes or neutralises: `srcdoc`, `formaction` on `button` and `input`, `meta` with `http-equiv`, `base`, and event-handler attributes.
6. `style` elements and `style` attributes: what the platform keeps, and whether the walk agrees.
7. `noscript` inside a kept element, whose content parses differently when scripting is enabled.
8. An element the configuration lists that the floor removes.

Report no prose or wording finding.

## Output

A per-claim table (claim, CONFIRMED, FAIL, or UNRESOLVED, evidence with `file:line`, and for each proof claim the mutation and whether it is distinguished); then the checklist, one row per item, naming the line that handles it or the gap; then one terminal line, `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
