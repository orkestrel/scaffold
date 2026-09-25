# TOKEN-PROOFS audit round 3 — verdict

The Orchestrator's reconciliation of the check on its own ruled text (`tkp-audit-3-claims.md`): the objective lane,
`analyst` on GPT-6 Astra (`tkp-audit-3-objective-verdict.md`, journal `tmp/codex/tkp-audit-3-analyst.jsonl`), the only
lane, because the round audits the Orchestrator's text and the auditor must be an engine the Orchestrator does not
share. Round 4 on `builder` applied the text verbatim (claim 1).

**Verdict: FAIL 3, 4, 5; outside the claims: F-DIRECT-SCOPE.** The Orchestrator's text, not the unit, is at fault.

- **Claim 3.** "An override on any other element moves no tier and no alias" is false: `.btn` declares
  `--bs-btn-disabled-opacity: var(--vn-button-opacity)` (`src/styles/components/_button.scss`, around line 47), which
  resolves on the button, inside the override, and the executed case asserts it moves. The citation resolves.
- **Claim 4 and F-DIRECT-SCOPE.** "Follows an override on its own element or on any ancestor" is false where an element
  between them declares the name again: a `[data-bs-theme]` element inside the ancestor declares the validation aliases
  and `--vn-link-base` again (`src/styles/_theme.scss` around line 21; the `theme-tokens` mixin in
  `src/styles/_mixins.scss`), so its subtree reads the mode's value. Both are derived from source; no retained case
  mounts that nesting.
- **Claim 5.** The block header says each consumer case uses a plain ancestor; the valid and invalid form cases use a
  mode scope.

## Ruling

The paragraph states the one mechanism the lanes' counterexamples all follow — a custom property resolves on the element
whose rule declares it, from what that element inherits — and derives each placement from it. The nested-scope limits
gain executed assertions, so no qualifier rests on source reading alone. This is the seam's fourth round; the text is
the Orchestrator's, so its check again runs `analyst` on Astra.

## Carrier

TOKEN-PROOFS round 5 (`token-proofs-brief-5.md`, `opus` on Opus 5.5).
