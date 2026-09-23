# B-FORMS-CONTROL, round 3 (the prose micro-round) — `checker` on Sonnet, mechanical conformance

Native subagent, clean context, read-only, on the tree of `/home/user/veneer-bfo` on 2026-09-23. The verdict text is the lane's handback verbatim.

## Checklist verdict — B-FORMS-CONTROL round 3, checker lane (claims 1, 2, 5)

**Claim 1 — The delta is the brief.** CONFIRMED.
- File-list parity: `diff --git` headers in `bfo-2.diff` and `bfo-3.diff` name the identical 19-file set (verified full listing of both files) and match `bfo-3-status.txt:1-19` exactly. No file outside that set, no off-limits file (`src/**` other than the already-established `_mixins.scss`/`_form-control.scss`/`index.scss` carried from round 2, `tests/setupServer.test.ts`, `tests/conformance.test.ts`, `package.json`, `package-lock.json`) appears.
- Byte-for-byte comparison of every non-owned file's diff block between `bfo-2.diff` and `bfo-3.diff` (`app/browser/Showcase.ts`, `constants.ts`, `index.ts`, `FormControlSection.ts` at bfo-3.diff:1-137 vs bfo-2.diff:1-137; `_mixins.scss`, `_form-control.scss` at bfo-3.diff:846-1067 vs bfo-2.diff:843-1067) is identical.
- The five owned-file deltas were each isolated and diffed:
  - `tests/setupStyles.ts` `FORM_CONTROL_CASES` `@remarks` (bfo-3.diff:1701-1723 vs bfo-2.diff:1697-1719): the only difference is exactly the six replacements the brief's edit 3 prescribes ("The `resolved` rung is…", "The `declared` rung is…", "The `compiled` rung is…", "The `excluded` rung is…", "The `values` map holds…", "The `reads` map is keyed…"), rewrapped.
  - `tests/setup.ts` scenario remark (bfo-3.diff:1458-1469 vs bfo-2.diff:1454-1465): only the prescribed noun insertion ("The `form-control-text` scenario already names…"), rewrapped.
  - `tests/src/styles/components/form-control.test.ts` comment (bfo-3.diff:2311-2313 vs bfo-2.diff:2307-2309): only "once" → "after".
  - `tests/app/browser/integration.test.ts` comment (bfo-3.diff:1139-1142 vs bfo-2.diff:1136-1138): replaced with exactly the brief's edit-6 text, naming `Form control readonly` and `Form control date` by name with no ambiguous pronoun.
  - `guides/veneer.md` paragraphs (lines around 152 and 734 in the working tree) confirmed word-for-word identical to the round-2 wording, differing only in line-break placement (spot-read against the working tree at `/home/user/veneer-bfo/guides/veneer.md:152-161,734-741`).
- `tmp/probe/` absent: `grep tmp/probe` over `bfo-3-status.txt` returns no match.
- Status is the round-2 set and nothing else: confirmed by the file-list comparison above.

**Claim 2 — The prose.** CONFIRMED.
- `tests/setupStyles.ts:3798-3821` (working tree): every rung token (`resolved`, `declared`, `compiled`, `excluded`) and map token (`values`, `reads`) carries its noun ("The `resolved` rung…", "The `values` map…", "The `reads` map…").
- `tests/setup.ts:963` carries "The `form-control-text` scenario already names…".
- `tests/src/styles/components/form-control.test.ts:56` reads "A driven case is read only after the control is in the state its selector names".
- `tests/app/browser/integration.test.ts:907-910` reads "The traversal starts from the `Form control readonly` specimen's control… A walk from the start crosses the `Form control date` specimen, whose control keeps focus on itself…", naming both specimens by name with no two-referent pronoun.
- No banned term or growable-set count found in the changed text (read all six spans in full).

**Claim 5 — Law and scope, reading parts only** (the `npm run check` instruction is the objective lane's; not ruled here). UNRESOLVED for the whole-diff sweep, CONFIRMED for the round-3 changed spans.
- Searched the whole diff for ` as [A-Za-z]` (excluding `as const`): every hit is prose ("as it writes them", "reads as a different row", "as the shipped partials do") or `as const` at `tests/src/styles/components/form-control.test.ts` (bfo-3.diff:2313) — no type assertion.
- Searched the whole diff for `: any`, `<any>`, `as any`, `as unknown as`, ` !.`, `@ts-ignore`, `@ts-nocheck`, `@ts-expect-error`, `eslint-disable`: no match.
- Searched for new top-level `function` declarations or function-expression consts added in the diff: no match; the only function-shaped additions are the arrow callback passed to `it(...)` and the mixin/class bodies, consistent with the callback exception.
- `Object.freeze`/`readonly` usage: 205 occurrences in the diff, consistent with frozen-table and readonly-member conventions already established in prior rounds.
- I did not independently re-verify every off-limits-file claim beyond the file-list check under claim 1 (that check is the same evidence this claim needs for "off-limits files untouched", and it is CONFIRMED there); I did not run `npm run check` myself (objective lane's instruction) and record no exit code.

## Referrals

- None from claims 1, 2, or 5's reading parts. `npm run check`'s exit code is the objective lane's to supply.
- Claims 3 and 4 are outside this dispatch's assignment.

VERDICT: PASS
