# B-FORMS-SELECT, round 2 (the fix round) — audit claims

## Subject

The B-FORMS-SELECT fix round's uncommitted writes in `/home/user/veneer-bfs` (detached at `2c10329`),
written by `opus` from `/home/user/veneer-bfs/tmp/units/b-forms-select-brief-2.md` (the successor
carrying the round-1 audit's findings: claim 3's unread `color` declaration, D30's `@each`, claim 6's
bare tokens, claim 7's D26 carrier sites, F1 to F4, and the R3 and R5 carrier rows) over the round-1
writes ruled in `/home/user/scaffold/.orkestrel/veneer/units/bfs-audit-verdict.md`. Rounds so far:
round 1 (analyst FAIL 3, 6, 7, 10; reviewer FAIL 3, 6, 7, 10 with F1 to F4; checker nothing broken),
this fix round. **Review evidence.** `/home/user/scaffold/.orkestrel/veneer/units/bfs-2.diff` (the whole diff
against `2c10329`, the new owned files rendered through `git add -N`), `bfs-2-status.txt`, the
round-1 diff `/home/user/scaffold/.orkestrel/veneer/units/bfs-1.diff` for the delta this round added, and the
report `/home/user/scaffold/.orkestrel/veneer/units/bfs-2-report.md` (its § Gate table carries the writer's
commands and exits; a lane treats them as the writer's claims).

## What the round decides

Whether the carried findings are closed so that B-FORMS-SELECT lands on Veneer `main` after
FLOATING with the Orchestrator's integration edits (the Set literal key `form-select`; the ROADMAP
patch with D26's carrier text and the B-FORMS-CLOSE and B-PASSIVE-CLOSE rows), and whether the
writer's one recorded choice stands (the binding assertion's set typed `Set<string>` to close a
TS2345 diagnostic).

## Already established — do not re-run

Verified by the Orchestrator directly on 2026-09-23 in the worktree: `grep -n '@each'
src/styles/components/_form-select.scss` returns one line; `grep -c 'bright\|dim'
tests/src/styles/components/form-select.test.ts` returns 0; `grep -c 'every ring'
src/styles/components/_form-select.scss` returns 0; `git status --short` lists the round-1 file set
(four `A`, thirteen `M`) and nothing else. The sandbox is read-only with no browser: rule a
browser-only reading by naming its settling command; `npm run check`, `npx sass`, and the Node
readers are allowed, and a lane that runs `npm run check` reports its exit as evidence for claim 10.

## Unknowns

- Whether the delta between `bfs-1.diff` and `bfs-2.diff` introduced a defect outside the carried
  findings: read the delta for claims 1 to 9 and the whole diff for claim 10.
- Whether the split cases (claim 7) kept every assertion the two original cases carried: compare
  the assertion sets of `bfs-1.diff` and `bfs-2.diff` for `form-select.test.ts`.

## The threshold

A finding is worth more than a clean pass: this round lands the `form-select` baseline. `CONFIRMED`
requires naming the attack that failed; a claim about a proof is ruled on the mutation named and
whether the assertions distinguish it. Rule every claim CONFIRMED, BROKEN, UNRESOLVED, or
NOT-EVIDENCED with `file:line`.

## Numbered falsifiable claims

1. **The select's text colour is read.** `FORM_SELECT_CASES` carries a `.form-select` `color` row
   (`var(--bs-body-color)`) and a `background-color` row (`var(--bs-body-bg)`); a case sets `color`
   on a wrapper and asserts the select's resolved colour still matches `--bs-body-color` in the light
   and dark islands; under the plant (delete the `color` declaration, rebuild) the colour case and
   the recorded-declaration table case redden (`2 failed, 11 passed`) and are green after the exact
   reverse edit; the `FORM_SELECT_CASES` TSDoc and the guide's evidence sentence are bounded to the
   rows the table carries and name the cases reading `background-image` and `outline`. Rule from the
   assertion whether a wrapper colour distinguishes an inherited colour from the bound one.
2. **D30 lands byte-identical.** `.form-select-sm` and `.form-select-lg` are one `@each` over a
   two-entry structure in the release's order; the writer's `cmp` before and after exits 0 and its
   negative control exits 1. Compile it yourself (reconstruct the round-1 partial from `bfs-1.diff`).
3. **Every code token in `### Form select classes` is followed by a noun**, and the sentence around
   line 733 no longer makes the partial's filename the bare subject of "reads". Sweep the section
   against `writing.md` § Code tokens and rule each hit.
4. **The D26 carrier list is complete.** The ROADMAP patch's "Theme-scope select caret and switch
   knob" row names B-FORMS-ASSETS and lists the § Form select classes theme-scope sentence, the
   § Bootstrap variables paragraph, the dark-caret case's title, its comment, and the `tokens.test.ts`
   and `theme.test.ts` cases the `$assets` removal makes false. Rule the list against the tree by
   grepping for `select-indicator`, `theme scope`, and `--bs-form-select-bg-img` in the guide and the
   proof.
5. **The focus comment claims only this ring.** The partial's comment reads that a retune of the
   focus tokens moves this ring together with the button's, not every ring the package paints
   (`_pagination.scss` still writes a literal ring).
6. **The density claim is bounded.** The guide sentence and the partial's comment bound the
   density rescaling to a select with no validation state and state that the validation state keeps
   the release's literal icon geometry; the ROADMAP patch adds a B-FORMS-CLOSE row for the validated
   select's literal `padding-right` and caret inset in `_validation.scss`.
7. **The split cases each prove one thing and are named for it**: the single-row select keeping its
   caret; the bare select left to the user agent's appearance and ring; the disabled traversal
   refusal; the absent Gecko rule in the Chromium cascade; the focus-width retune; every assertion the
   two original cases carried survives in one of them.
8. **The mode rows read `light` and `dark`**, with no `bright` or `dim` term left in the proof.
9. **The carrier rows are one carrier each.** The ROADMAP patch's B-PASSIVE-CLOSE rows name the
   `MOTION` literal (the range, select, pagination, progress, icon-link, and spinner proofs) and the
   guide-wide token-noun sweep; every row names exactly one unit.
10. **The law holds and scope is honest.** Across the whole diff: no `any`, `as` (other than `as
    const`), `!`, or suppression; the `Set<string>` type argument is a declaration's type parameter
    (D36), not an assertion; no nested function beyond a callback passed or returned directly; frozen
    tables; no helper whose job an installed `@orkestrel/test` export does; no literal colour outside
    `_tokens.scss`; the status is the round-1 file set; `tmp/probe/` is absent; `_tokens.scss`,
    `_theme.scss`, `_validation.scss`, `tests/setupServer*.ts`, `ROADMAP.md`, and the vendored files
    are untouched; a lane's own `npm run check` exits 0.
