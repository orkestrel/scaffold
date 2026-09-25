# TOKEN-PROOFS audit round 4 — verdict

The Orchestrator's reconciliation of the check on its re-ruled text and round 5's assertions (`tkp-audit-4-claims.md`):
the objective lane, `analyst` on GPT-6 Astra (`tkp-audit-4-objective-verdict.md`, journal
`tmp/codex/tkp-audit-4-analyst.jsonl`), the only lane, because the round audits the Orchestrator's text.

**Verdict: FAIL 2, 3; outside the claims: F-COLOR-MODES.** The nested assertions, the header, the titles, and the gates
are CONFIRMED; the defects are two edges of the Orchestrator's mechanism sentence and one pre-existing guide sentence.

- **Claim 2.** "from the values that element inherits" leaves out a declaration on the element itself: the form case's
  mode element declares `--vn-form-valid` inline, and its own mode-scope aliases read that value
  (`src/styles/_mixins.scss`, the `theme-tokens` mixin; the case titled for the valid control's move under a mode scope).
- **Claim 3.** "The aliases only the `:root` selector declares keep their value" is false where the `[data-bs-theme]`
  element is the root itself, which is where the `ColorMode` controller writes the attribute: the root-only aliases
  resolve on that same element and follow the override. No case mounts that state.
- **F-COLOR-MODES.** § Color modes says a name no mode changes is declared at the `:root` selector alone; the state mixes
  (`--vn-state-hover`, `--vn-state-active`, `--vn-state-stripe`) carry the same value in both modes and each mode scope
  declares them again (the built cascade, per the objective lane's parse).

## Ruling

The two edges are corrected in the text, the root-with-mode state gains an executed assertion, and § Color modes states
what the built cascade declares. The frame has repeated: each round finds a narrower edge of one mechanism, so this round
keeps the mechanism and fixes only the edges the check measured. Its check again runs `analyst` on Astra.

## Carrier

TOKEN-PROOFS round 6 (`token-proofs-brief-6.md`, `opus` on Opus 5.5).
