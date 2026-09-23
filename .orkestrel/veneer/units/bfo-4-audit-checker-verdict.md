# B-FORMS-CONTROL, round 4 (the two-sentence micro-round) — `checker` on Sonnet, mechanical conformance

Native subagent, clean context, read-only, on the tree of `/home/user/veneer-bfo` on 2026-09-23. The verdict text is the lane's handback verbatim.

## Per-claim verdicts

**Claim 1 — The delta is the brief.** CONFIRMED.
Evidence: `/home/user/scaffold/.orkestrel/veneer/units/bfo-4.diff:1711-1723` versus `bfo-3.diff:1711-1723` show the delta confined to the `FORM_CONTROL_CASES` `@remarks` block in `tests/setupStyles.ts`:
- `bfo-4.diff:1714` reads "`declared` reading or a `compiled` reading, followed by ` !important`..." replacing `bfo-3.diff:1714`'s "`declared` or `compiled` one, followed by ` !important`...", matching brief edit 1 (`b-forms-control-brief-4.md:49-52`) verbatim.
- `bfo-4.diff:1720-1723` reads the replacement `reads` paragraph ("...states that the rule reads no custom property and leaves its literals to the value assertions...") replacing `bfo-3.diff:1720-1723`'s prior text ("...separates a rule holding Bootstrap's own values from one this package routed onto tokens..."), matching brief edit 2 (`b-forms-control-brief-4.md:53-60`) verbatim.
Both files total the same 2,714 lines (`Grep` count on each, no offset). Sampled ranges outside the edit window are byte-identical: `bfo-4.diff:1-50` = `bfo-3.diff:1-50`, and `bfo-4.diff:2650-2713` = `bfo-3.diff:2650-2713`. The attack that would break this claim — a further wording change, a line-count drift, or a change outside `tests/setupStyles.ts` — is ruled out by the identical total line count plus matching head and tail samples; no evidence of a change beyond the two prescribed sentences was found. Status: `bfo-4-status.txt:1-19` and the round-3 `git status --porcelain` reproduced in `b-forms-control-report-4.md:42-62` list the identical 19-file set with no additions.

**Claim 3 — Law and scope (reading parts only; `npm run check` exit code left to the objective lane).** CONFIRMED for the parts checkable by reading.
Evidence:
- No `any`: `Grep` for `: any\b|<any>|as any` over `bfo-4.diff` returned no matches.
- No `as` other than `as const`: `Grep` for `^\+.* as [A-Za-z]` over `bfo-4.diff` returned only prose uses of the English word "as" (for example `bfo-4.diff:44,150,338-339,349,966,1459,1549,1568,1583,1674,1711,1713,1723,2381,2406`) and one `as const` at `bfo-4.diff:2313` (`{ focus: ':focus-visible', hover: ':hover' } as const`); no type-assertion `as <Type>` form appears in an added line.
- No non-null assertion (`!`) outside `!=`/`!==`: `Grep` for `^\+.*\w![^=]` over `bfo-4.diff` returned no matches.
- No suppression (`@ts-ignore`, `@ts-nocheck`, `@ts-expect-error`, `eslint-disable`): `Grep` returned no matches over `bfo-4.diff`.
- No nested function declaration/assignment beyond a directly-passed or directly-returned callback: `Grep` for `^\+\s*function |^\+\s*const \w+ = \(.*=> \{` over `bfo-4.diff` returned no matches.
- Frozen tables and readonly members: `FORM_CONTROL_CASES` is declared `readonly FormControlCase[]` wrapped in `Object.freeze([...])` (`bfo-4.diff:1725`), each entry itself `Object.freeze({...})` (for example `bfo-4.diff:1726`), and the `evidence` field is a literal union on a `readonly` property (`bfo-4.diff:1679`), consistent throughout the sampled entries.
- Off-limits files untouched: subsumed by claim 1's finding that round 4's only change against the round-3 tree is the two prescribed sentences inside `tests/setupStyles.ts`; every other file in the diff is unchanged from round 3, so no off-limits file was touched this round.

The `npm run check` exit-code instruction in claim 3 addresses the objective lane and is not ruled here.

## Findings outside claims 1 and 3

None found (BROKEN standard: none identified as broken, none identified as speculative).

VERDICT: PASS
