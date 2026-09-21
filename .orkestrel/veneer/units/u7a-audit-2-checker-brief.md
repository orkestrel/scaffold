# U7a audit round 2 — checker brief

## Role and engine

`checker` on native Sonnet, clean context. Perform the assignment directly and spawn nothing.
You edit nothing and run nothing; you have no write tools and no shell.

## Objective

Rule mechanically on the claims
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u7a-audit-claims-2.md` marks `[mechanical]`
with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding evidence (`file:line` or exact
text). Rule on no other claim. That file alone fixes the claim numbers. The user has ruled that
audits cover implementation only: report no wording, comment, doc-block, or guide-prose finding.

## Evidence

The Orchestrator rendered the round-2 diff over the Veneer checkout's `2bc922d` at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u7a-diff-2.patch.txt`, round 1's rendered diff over the same base
at `u7a-diff.patch.txt`, and the status at `tmp/audit/u7a-status-2.txt`. Read those and
the live Veneer tree at `C:/Users/mikes/WebstormProjects/veneer`. Read the retained report
`.orkestrel/veneer/units/u7a-report-10.md` (with `-9.md`, `-8.md`, and `-7.md`) only to learn what the unit claims; rule on the tree.

## Probes

- `userEvent`: grep `tests/src/styles/elements/button.test.ts` and
  `tests/src/styles/components/button.test.ts` for `userEvent` and for `from 'vitest/browser'`;
  list every hit.
- Presence partition: re-run round 1's partition probe over `tests/fixtures/oracle/inventory.json`
  (`components.btn`) against `dist/src/styles/index.css` and the guide's deferral table; name
  any member in neither set and any deferred name present; confirm `.btn:active` no longer
  appears as a bare selector in `src/styles/components/_button.scss`.
- Tokens: every `--vn-*` name the partials and `_mixins.scss` declare appears in `TOKEN_NAMES`
  and the reverse; the three state tokens are declared inside `theme-tokens` only (no hand copy
  in `_tokens.scss` `:root` or `_theme.scss` mode scopes).
- Binding rows: every `--bs-btn-*` row in `guides/veneer.md` § Tokens names the value the
  partial declares (the light role's text token included); list any row that differs.
- Scope: the status file's lines are a subset of brief 7's owned set; `src/browser/**`,
  `app/**`, `tests/setupConformance*.ts`, `tests/fixtures/**`, `package.json`, `configs/**`
  absent from the diff; the diff adds no `any`, no assertion outside `as const`, no non-null
  assertion, no suppression, no skip; every module-scope function added is exported and tested;
  no case title names a control; no `PLANT` residue.
- Enumerating assertions: the export-inventory case lists every export of
  `tests/setupStyles.ts`; `tests/conformance.test.ts` lists `btn`; no `it(` removed without a
  rewritten successor.

## Law

Scaffold's `AGENTS.md`, `.claude/rules/styles.md`, `names.md`, `typescript.md`, `tests.md`.

## Output

A table `Claim | Verdict | Evidence` over the mechanical claims; the probe readings; extra
findings numbered after the last claim with a site (implementation only, or "none found"); then
exactly one terminal line: `Verdict: accept` or `Verdict: fix round` with the claim numbers that
force it. No process diary.
