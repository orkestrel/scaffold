# B-FORMS-CONTROL, round 4 (the two-sentence micro-round) — audit claims

## Subject

The B-FORMS-CONTROL round-4 writes in `/home/user/veneer-bfo` (detached at `2c10329`, the round-1
to round-4 writes uncommitted in the tree), written by `builder` on Sonnet from
`/home/user/veneer-bfo/tmp/units/b-forms-control-brief-4.md` (the successor carrying the round-3
findings of `/home/user/scaffold/.orkestrel/veneer/units/bfo-3-audit-verdict.md` claims 2 and 3:
the pronoun after the `declared` and `compiled` rung tokens; the `reads` sentence stating what an
empty map proves) over the round-3 writes. Rounds so far: round 1, round 2 (the fix round), round
3 (the prose micro-round), this round. **Review evidence.**
`/home/user/scaffold/.orkestrel/veneer/units/bfo-4.diff` (the whole diff against `2c10329`),
`bfo-4-status.txt`, the round-3 diff `bfo-3.diff` (for the delta), the brief
`b-forms-control-brief-4.md` (the prescribed text of both edits), and the report
`b-forms-control-report-4.md`.

## What the round decides

Whether B-FORMS-CONTROL lands on the session branch with these writes and the Orchestrator's
integration edits (`bfo-integration.py`), and whether the `reads` sentence now states exactly what
the Node case proves.

## Already established — do not re-run

Every ruling of the three earlier rounds (`bfo-audit-verdict.md`, `bfo-fix-audit-verdict.md`,
`bfo-3-audit-verdict.md`), including the family ruling that a CSS property, value, function, or
`!important` token is its own noun; the analyst's `npm run check` exited 0 on round 3 and the
writer reports 0 on round 4; the sandbox for the objective lane is read-only with no browser and
runs no Vitest project (`npm run check`, `node -e`, and the Node readers are allowed); the
Orchestrator's landing chain settles the gates.

## Unknowns

- Whether the delta between `bfo-3.diff` and `bfo-4.diff` changed anything the brief did not
  prescribe: read the delta against `b-forms-control-brief-4.md` § Edits.

## The threshold

`CONFIRMED` requires naming the attack that failed. Rule every claim CONFIRMED, BROKEN, UNRESOLVED,
or NOT-EVIDENCED with `file:line`.

## Numbered falsifiable claims

1. **The delta is the brief.** The delta between `bfo-3.diff` and `bfo-4.diff` consists of the two
   edits `b-forms-control-brief-4.md` § Edits prescribes, inside the `FORM_CONTROL_CASES` remark of
   `tests/setupStyles.ts`, and nothing else; the status is the round-3 set and nothing else.
2. **The sentences.** "for a `declared` reading or a `compiled` reading" carries a noun after each
   rung token; the `reads` paragraph reads "The `reads` map is keyed by property. A property the map
   leaves out is the claim that its declaration writes no `var()`, so an empty map states that the
   rule reads no custom property and leaves its literals to the value assertions. A token moved
   from the property that consumes it onto another declaration of the same rule reads as a
   different row." and claims nothing the Node case in `tests/setupStyles.test.ts` does not prove
   (the case keeps the compiled properties whose declaration reads a `var()` and compares that map
   to `reads`; the value assertions in `form-control.test.ts` cover the recorded literals). Rule
   whether an added literal declaration on a shipped rule still falls outside both, and confirm
   that the sentence no longer claims it does not.
3. **Law and scope.** Across the whole diff: no `any`, `as` (other than `as const`), `!`, or
   suppression; no nested function beyond a callback passed or returned directly; frozen tables;
   readonly members; the off-limits files untouched. Run `npm run check` and report its exit code
   as evidence here (the objective lane).
