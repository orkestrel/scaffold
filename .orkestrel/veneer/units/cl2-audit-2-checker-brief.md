# CL2 audit round 2 — mechanical lane brief

## Role and engine

`checker` on native Sonnet, clean context, read-only (no write tools, no shell). Perform the
assignment directly and spawn nothing.

## Objective

Rule on every claim marked `[mechanical]` in
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/cl2-audit-claims-2.md` with CONFIRMED,
REFUTED, or UNDECIDABLE and `file:line` evidence, run the probes below, add any extra finding
that is an implementation defect (numbered after the last claim), and end with one terminal
line: `Verdict: accept` or `Verdict: fix round` with the claims that force it.

## Evidence

The rendered diff over the CL1 landing `00a5bdc` (the whole CL2 change, round 1 plus the fix)
at `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl2-diff-2.patch.txt` and the status at
`tmp/audit/cl2-status-2.txt`; round 1's diff at `cl2-diff.patch.txt` for a diff-to-diff
reading; the live Veneer tree at `C:/Users/mikes/WebstormProjects/veneer`; the retained records
under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/` (`cl2-audit-verdict.md`
round 1, `units/cl2-brief-3.md`, `units/cl2-report-2.md`), read only to learn what the unit
claims; rule on the tree.

## Probes

- Scope: the status lists exactly the eleven CL2 files (`guides/veneer.md`,
  `src/core/constants.ts`, `src/styles/_mixins.scss`, `src/styles/_tokens.scss`,
  `tests/setupBrowser.test.ts`, `tests/setupBrowser.ts`, `tests/setupStyles.test.ts`,
  `tests/setupStyles.ts`, `tests/src/styles/fixtures/mixins.scss`,
  `tests/src/styles/mixins.test.ts`, `tests/src/styles/tokens.test.ts`) and nothing else; the
  round-2 diff differs from round 1's only in `tests/setupStyles.ts`,
  `tests/setupBrowser.test.ts`, and `tests/src/styles/tokens.test.ts` (brief 3's owned files);
  the other eight files carry byte-identical hunks in both diffs.
- Hidden declarations: a sweep of `^const |^let |^function |^type |^interface ` over
  `tests/setupStyles.ts` and `tests/setupBrowser.ts` finds no unexported module-scope
  declaration; `parseMediaWidth` still reads the range syntax and the `min-width` and
  `max-width` spellings; both export inventories equal their live export sets.
- The reader case: its two fixture gates carry different widths and the assertion reads
  `[576, 768]`; an ungated selector's `collectMediaConditions` result is asserted empty; no
  assertion `.not.toEqual([])` over `readRules()` remains.
- The stripe case: an assertion reads `collectScopeProperties` on the dark scope and expects
  `--vn-state-stripe`; the value assertions remain.
- Plants: the reader plant and the placement plant the report names are gone
  (`collectMediaConditions` returns one condition per matched gate; `--vn-state-stripe` is
  emitted inside `theme-tokens` in `src/styles/_mixins.scss` and nowhere in `_tokens.scss`).
- Law sweep over the diff: no `any`, no assertion outside `as const`, no non-null assertion, no
  suppression comment, no `public`/`private`/`protected`, no parameter property, no skipped
  case, no case named for a control.

## Law

Scaffold's `AGENTS.md`, `.claude/rules/tests.md`, `typescript.md`, `names.md`, `styles.md`.
The user has ruled that audits cover implementation only: report no wording or prose finding.

## Output

The claim table, the probe readings, the extra findings, one terminal line. No process diary.
