# B-FORMS-CHECK, round 2 (the fix round) — audit claims

## Subject

The B-FORMS-CHECK fix round's uncommitted writes in `/home/user/veneer-bfc` (detached at `2c10329`),
written by `opus` from `/home/user/veneer-bfc/tmp/units/b-forms-check-brief-3.md` (the successor
carrying the round-1 audit's findings: claim 2's proof gap, claim 8's `@each`, claim 5's prose defects, F1 to F3, D28, and the swap-plant note) over the round-1 writes ruled in
`/home/user/scaffold/.orkestrel/veneer/units/bfc-audit-verdict.md`. Rounds so far: round 1 (analyst
FAIL 2, 8, 10; reviewer FAIL 1, 2, 5, 10; checker FAIL 8), this fix round. Review evidence:
`/home/user/scaffold/.orkestrel/veneer/units/bfc-3.diff` (the whole diff against `2c10329`, the new owned files
rendered through `git add -N`), `bfc-3-status.txt`, the round-1 diff `/home/user/scaffold/.orkestrel/veneer/units/bfc-1.diff`
for the delta this round added, and the report `/home/user/scaffold/.orkestrel/veneer/units/bfc-3-report.md`; the
writer's plant and reading scripts sit under
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/bfc3/`.

## What the round decides

Whether the ten carried findings are closed so that B-FORMS-CHECK lands on Veneer `main` with the
Orchestrator's shipped-key Set literal edit (`'form-check'` between `'figure'` and `'form-range'`)
and the report's ROADMAP patch, and whether the writer's two recorded choices stand (the
§ Compatibility variable row's opening reworded so only that row changes under `oxfmt`; the ROADMAP
patch naming B-FORMS-ASSETS per D26).

## Already established — do not re-run

Verified by the Orchestrator directly: the round-1 verdicts and their reconciliation; the partial
now carries one `@each` (`grep -n '@each' src/styles/components/_form-check.scss` returns one line);
the file set in `bfc-3-status.txt` is the round-1 set (four `A`, thirteen `M`); the release's dark
knob rule is `bootstrap.css:2501`, the same descendant shape as the partial's (D28's basis). The
sandbox is read-only with no browser: rule a browser-only reading by naming its settling command;
`npm run check` and `npx sass` are allowed.

## Unknowns

- Whether the delta between `bfc-1.diff` and `bfc-3.diff` introduced a defect outside the carried
  findings: read the delta for claims 1 to 9 and the whole diff for claim 9's law sweep.
- Whether the attribute-only host's markup is one an author could meet (an element carrying
  `disabled` that is not a form control) or a contrivance: rule on what the assertion proves about
  the `[disabled] ~ .form-check-label` half.

## The threshold

A finding is worth more than a clean pass: this round lands the `form-check` baseline. `CONFIRMED`
requires naming the attack that failed; a claim about a proof is ruled on the mutation named and
whether the assertions distinguish it from the passing case. Rule every claim CONFIRMED, BROKEN,
UNRESOLVED, or NOT-EVIDENCED with `file:line`.

## Numbered falsifiable claims

1. **Claim 2 is repaired.** The case `dims a disabled box and its label, whether the attribute or a
   disabled fieldset disables it` mounts a host that matches `[disabled]` and not `:disabled`,
   asserts both, and reads its label's `opacity` and `cursor`; under the split-rule plant (an
   attribute-label rule declaring `opacity: 1` before the state-label rule) the case reddens at the
   new host (`expected '1' to be '0.5'`) and is green after the exact reverse edit; the round-1 form
   of the case stayed green under the same plant. Rule from the assertion.
2. **The `@each` compiles byte-identical.** The checkbox and radio glyph rules are one `@each` over a
   two-entry map in the release's order; the writer's `cmp` of the `npx sass` output before and
   after exits 0 and a mutated-map control differs. Compile it yourself and compare with the round-1
   partial's compile (`git show` cannot reach the uncommitted round-1 text; reconstruct it from
   `bfc-1.diff` or compare against the installed release's declarations).
3. **The guide's three defects are closed.** The focus bullet's lead reads "The focus ring binds the
   focus tokens, and the focus border tints the blue palette entry." with a sentence stating that a
   `--vn-color-primary-base` retune moves the ring and leaves the border on the release's tint (the
   writer measured it); "the resting fill in the light and dark modes"; the print sentence reads
   "No proof prints, so the proof reads the `print-color-adjust` declaration as its resolved value
   alone." Rule the sentences against `_form-check.scss`'s focus rule and `writing.md`.
4. **F1 is closed.** `FORM_CHECK_ICON_CASES` names its field `mode` in every row and in the remarks;
   the `it.each` destructure in `form-check.test.ts` and the two reads in `setupStyles.test.ts`
   follow; a word-boundary grep for `theme` over the two test files and `tests/setupStyles.ts`
   finds only the `data-bs-theme` attribute and prose.
5. **F2 is closed.** The § Compatibility `form-check` variable row states that each glyph is read
   from the `$icons` map and the dark knob from the `$dark` map; the writer reworded the row's
   opening ("The input carries the … properties, …") so that `oxfmt` re-pads no other row: rule
   whether the row's meaning is unchanged and whether only that row changed in § Compatibility.
6. **D28 is recorded.** The report records the nested-island reading (a resting switch inside
   `[data-bs-theme='light']` nested inside `[data-bs-theme='dark']` reads the dark knob URI) with its
   command, and `### Form check classes` states in one sentence that the descendant rule reaches a
   resting switch inside a light island nested in a dark one, as the release's own rule does, with no
   light-scope reset. Rule the sentence against the partial's dark rule and `bootstrap.css:2501`.
7. **F3 and D26 are in the ROADMAP patch.** The § Customization carrier row reads "…the range thumb,
   and the check fill and focus border read the palette entry"; the "Theme-scope select caret and
   switch knob" carrier row names B-FORMS-ASSETS per D26; the patch applies to the `ROADMAP.md` in
   the worktree (rule by reading the target lines).
8. **The swap plant is an exchange.** The plant table describes an exchange of both bindings and
   records three reddening cases (the `checked checkbox` glyph row, the `indeterminate checkbox`
   glyph row, `shows the mixed glyph over the checked one…`); rule from the assertions that an
   exchange reddens exactly those.
9. **The law holds and scope is honest.** Across the whole diff: no `any`, `as` (other than `as
   const`), `!`, or suppression; no nested function beyond a callback passed or returned directly;
   frozen tables; no helper whose job an installed `@orkestrel/test` export does; no literal colour
   outside `_tokens.scss`; the status is the round-1 file set; `tmp/probe/` is absent; `_tokens.scss`,
   `_theme.scss`, `_validation.scss`, `tests/setupServer*.ts`, `ROADMAP.md`, and the vendored files
   are untouched.
10. **Gates.** `npm run check`, `build:src`, the scoped browser run (23 passed), `test:conformance`
    (17), `test:guides` (18), `test:src:styles` (657), and `test:journey` (136) exit 0; `test:setup`
    is red only on the Set literal. UNRESOLVED until the Orchestrator's independent chain at the
    landing; run `npm run check` yourself.
