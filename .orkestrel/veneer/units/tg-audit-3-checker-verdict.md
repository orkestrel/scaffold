# Verdict — checker, TOGGLES round 3, claims 1, 2, 4, 8

## Claim 1 — Delta and scope
UNRESOLVED (mixed).

Confirmed by direct reading:
- `tg-3-status.txt:1-6` lists the same six owned files as `tg-2-status.txt:1-6`, byte-identical.
- `tg-3.diff` vs `tg-2.diff`: `_input-group.scss`, `ButtonGroupSection.test.ts`, `InputGroupSection.test.ts` hunks are byte-identical between rounds. `_button-group.scss` differs only in the size-loop comment (`tg-3.diff:52-54` vs `tg-2.diff:52-54`). `button-group.test.ts` differs only in the caret comment (`tg-3.diff:396-402`), the `margin` rename in the caret case (`tg-3.diff:403-421`), and the added empty-toggle case (`tg-3.diff:423-437`).
- `tg-shared-3.patch` touches the same five files as `tg-shared-2.patch` (grep `^diff --git|^index` on both): `app/browser/constants.ts`, `guides/veneer.md`, `tests/setup.ts`, `tests/setupStyles.test.ts`, `tests/setupStyles.ts`. Each `index` line's pre-image hash is identical across rounds (the `a658879` blob); `tests/setup.ts`'s index is unchanged both rounds, consistent with the report's "no change this round" claim.
- No forbidden path (`src/browser/**`, `src/core/**`, `tests/fixtures/**`, `package.json`, `README.md`, `ROADMAP.md`, a vendored file) appears in either file list.

UNRESOLVED sub-clause: "`git apply --check` at `a658879` exits 0" rests only on the writer's own quoted command/exit code in `b-collapse-tg-report-3.md:223-230` — a report quoting itself, not independent evidence. Command to settle it: `git apply --check --verbose tg-shared-3.patch` from a clean checkout of `a658879`.

## Claim 2 — The guide and the constants
CONFIRMED.
- Corners sentence: `tg-shared-3.patch:224-226` reads exactly "because the release's markup puts its hidden menu after it, which often leaves the toggle as the group's visible end while it is not the last child."
- Opening paragraph: `tg-shared-3.patch:212-215`, diffed against `tg-shared-2.patch` (grep `sized group families`) — round-3 change is re-wrap only, no word differs from round 2, longest line ~99 columns.
- Both specimen doc blocks: `tg-shared-3.patch:24` (`BUTTON_GROUP_SPECIMENS`) and `tg-shared-3.patch:86` (`INPUT_GROUP_SPECIMENS`) each read "each toggle announces the `aria-expanded="false"` state:".

## Claim 4 — The field nouns
CONFIRMED.
- Brief text (`tg-brief-3.md:34-37`) for the four `@remarks` blocks matches the patch verbatim: `BUTTON_GROUP_SPLIT_CASES` at `tg-shared-3.patch:1400-1405`, `BUTTON_GROUP_SPLIT_FORMS` at `tg-shared-3.patch:1445-1449`, `INPUT_GROUP_TOGGLE_CASES` at `tg-shared-3.patch:1524-1532`, `BUTTON_GROUP_CARET_CASES` at `tg-shared-3.patch:1564-1569`.
- Size loop comment `tg-3.diff:52-54` matches brief item 4 (`tg-brief-3.md:26`) verbatim.
- Caret comment `tg-3.diff:396-401` matches brief item 7 (`tg-brief-3.md:39`) verbatim.

## Claim 8 — Law and report
BROKEN.
- No `any`, disallowed `as` assertion, `!`, or suppression comment found in `tg-3.diff` or `tg-shared-3.patch` (grepped `: any\b`, ` as [A-Za-z]`, `@ts-ignore`, `@ts-expect-error`, `eslint-disable`; every hit is an unrelated English "as").
- I independently re-ran the `side`/`margin` grep rather than trusting the report's self-quote: `grep -n "side"` over `tests/src/styles/components/button-group.test.ts` in `/home/user/veneer-tg` and over `tg-shared-3.patch` — every hit is unrelated English ("beside," "inside," "outside," "the written side," "sides"); none names the removed field. This sub-clause is CONFIRMED on my own evidence.
- Writing-rule violation found: `b-collapse-tg-report-3.md:133` states "The case titles equal round 2's set (**61 titles**) plus one addition and two retitles" — a count of a growable set (the case-title population), which `tg-brief-3.md:57` (item 10) explicitly told the writer not to state. This breaks the claim's "no count of a growable set" clause.
- UNRESOLVED sub-clauses: the report's SHA-256 digest (`b-collapse-tg-report-3.md:215-216`) and its `git apply --check` output are both self-quoted; settle with `sha256sum tg-shared-3.patch` and `git apply --check --verbose tg-shared-3.patch` against `a658879`.
- Not settled by this read-only pass: whether any new exported helper duplicates an installed `@orkestrel/test` or `@orkestrel/contract` export — no duplication found by inspection, but the installed package's export surface was not exhaustively checked.

## Counts the report states
- "62 passed (62)" for the styles run (61 round-2 cases plus one added case).
- "114 passed (114)" for the scoped setup run.
- "22 passed (22)" for `test:conformance`.
- "19 passed (19)" for `test:guides`.
- "109 passed | 1 skipped (110)" for `test:policy`.
- "9 passed (9)" for the section run.
- "61 titles" for the round-2 case-title population, plus one addition and two retitles (the growable-set count flagged BROKEN above).
- "1583 lines" for the shared patch, with a stated SHA-256 digest.

VERDICT: FAIL 1, 8; outside the claims: none
