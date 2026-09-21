# CL2 audit verdict — the Content/layout tokens and the breakpoint mixins

Subject: unit CL2 in Veneer over the base `00a5bdc`, written by `opus` on native Opus 5 under
the effective brief `units/cl2-brief-2.md` (brief 1 superseded after the scope read,
`units/cl2-scope-read-report.md`). Report: `units/cl2-report.md`. Claims: `cl2-audit-claims.md`.
Evidence: `units/cl2-diff.patch.txt`, `units/cl2-status.txt`.

## Round 1 (2026-09-21)

Lanes: analyst on Astra holding the OBJECTIVE lane (`units/cl2-audit-analyst-report.md`, thread
`01a0c372-28a1-7ff0-99a4-e01ac1da6d0e`, exit 0; Opus wrote the unit, so the lanes are swapped);
reviewer on Opus 5 holding the SUBJECTIVE lane (`units/lane-cl2-reviewer.md`, workflow
`wf_6c681075-bff`); checker on Sonnet (`units/lane-cl2-checker.md`); verifier on Sonnet
(`units/lane-cl2-verifier.md`) over `units/cl2-gate-brief.md`.

| Claim | Analyst (objective, Astra) | Reviewer (subjective, Opus) | Checker | Verifier |
| --- | --- | --- | --- | --- |
| 1 tokens and registry | CONFIRMED (its own unmapped-name control reddened the equality) | CONFIRMED (index law, Bootstrap's display steps, `TokenMap` derived, index proof enumerates no name) | CONFIRMED | — |
| 2 one Sass source, placement | CONFIRMED (in-memory compile of the partial emits nothing; unknown name throws) | CONFIRMED (declaration text and order equal the removed literals; no `@media (width` in the build) | CONFIRMED | — |
| 3 range conditions, `xs` | UNDECIDABLE only on the serialization reading (report-only) | CONFIRMED, serialization report-only | CONFIRMED, serialization report-only | — |
| 4 proofs and plants | UNDECIDABLE on the historical counts (report-only); its own controls reddened on the unmapped name, the 577px move, and the removed guard | CONFIRMED on what each proof asserts; counts report-only | CONFIRMED on shape; counts report-only | — |
| 5 readers and helpers | CONFIRMED (AST inventory equality; bodies unchanged against the base) | CONFIRMED (23 exports equal the inventory; no diff hunk on the two helpers) | CONFIRMED | — |
| 6 guide rows | CONFIRMED | CONFIRMED on values, sources, and the deletion | CONFIRMED on the rows | `test:guides` exit 0 |
| 7 scope, law, gates | UNDECIDABLE on the gate half | CONFIRMED on scope and law; gate half UNDECIDABLE | CONFIRMED mechanical half | every step exit 0 on Chromium and Edge; `scaffold audit` reports only the pre-existing `setupListeners` note and the three registry majors |

Reconciliation. Every claim is CONFIRMED by the lanes that could rule on it; the analyst's and
the reviewer's UNDECIDABLE rows are the gate half and the report-only readings, which the
verifier closes (every gate green on both engines, status identical before and after). The
serialization reading in claim 3 stays report-only and is not load-bearing: the proof compares
through `parseMediaWidth`, which reads the value under either spelling.

Findings:

- **Analyst 8 and reviewer 8 (the same defect; forces the fix round).** `tests/setupStyles.ts`
  declares `MEDIA_WIDTH_CONDITION` at module scope, unexported and read only by
  `parseMediaWidth`; `AGENTS.md` § Design laws and `.claude/rules/tests.md` § Shared test
  infrastructure forbid a hidden module declaration. The analyst executed the import and read
  `exported: false`. Fix: fold the literal into `parseMediaWidth` (one use; inventory unchanged).
- **Reviewer 9 (carried).** The reader case in `tests/setupBrowser.test.ts` gives its two
  fixture gates the same width, so `[576, 576]` holds under a wrong order or a duplicated match.
  Fix: gates at `576px` and `768px`, asserting `[576, 768]`.
- **Reviewer 10 (carried).** The same case asserts `readRules()` over every media rule
  `.not.toEqual([])`, which cannot fail. Fix: assert the flat walk carries both fixture
  conditions while `collectMediaConditions(rules, <a selector outside any gate>)` is empty.
- **Reviewer 11 (carried).** The stripe case in `tests/src/styles/tokens.test.ts` reads a value
  that inherits from `:root`, so it does not bind the theme-closure placement. Fix: assert
  `collectScopeProperties(rules, "[data-bs-theme='dark']")` carries `--vn-state-stripe`.
- **Reviewer 12 (referral, ruled here).** The compile-time refusal proof sits in
  `tests/setupStyles.test.ts` beside the existing `_theme.scss` refusal precedent. Ruling: that
  is its home in this workspace, because no Node project includes `tests/src/styles/**`
  (`vite.config.ts` projects: `src:styles` is browser-only; the `setup` project is the Node
  runner that reaches `compileString`), and a new project is an edit to the vendored config
  (scaffold-side). Recorded as a styles-pilot convention: a Node-side Sass compile proof of a
  partial's `@error` or emission shape lives in `tests/setupStyles.test.ts`. No code change.

### Findings carried into the fix round (`units/cl2-brief-3.md`)

1. Analyst 8 / reviewer 8: the regex literal folded into `parseMediaWidth`.
2. Reviewer 9: the reader case's gates at two widths.
3. Reviewer 10: the non-failing assertion replaced.
4. Reviewer 11: the stripe placement asserted on the dark scope.

### Terminal (round 1)

Verdict: fix round. `units/cl2-brief-3.md` on Opus (the writer); Astra stays the objective auditor.
