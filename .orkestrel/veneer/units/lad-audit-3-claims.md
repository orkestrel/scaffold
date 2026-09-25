# LEDGER-ADDITIONS audit round 3 — claims

Subject: LEDGER-ADDITIONS round 3 in `/home/user/veneer-lad` (branch `unit/lad`, uncommitted over Veneer `2376710`),
briefed by `ledger-additions-brief-3.md` to carry claims 1 and 7 and findings N1 and N2 of `lad-audit-2-verdict.md`.
Written by `opus` on Opus 5.5 and reported in `ledger-additions-report-3.md`. Rounds 1 and 2's confirmed claims are not
re-ruled. Evidence: `lad-3.diff` (`git diff 2376710`), `lad-3-status.txt`, `lad-2.diff`, and `lad-instruments/r3/`
(this round's own diff `lad-3-round.diff`, the plant and gate drivers, and the logs). All sit under
`/home/user/scaffold/.orkestrel/veneer/units/`. A mutation counts as a kill only when the failing case's message names
an assertion failure. This round is the seam's third, so a claim ruled BROKEN here is ruled by the Orchestrator rather
than repaired again. Rule every claim.

1. **The decoded function name.** `collectMatchingClasses` in `tests/setupServer.ts` recognises an `:is()` or `:where()`
   argument by the name `readIdentifier` decodes after the latest syntax colon, requires that name to end at the
   parenthesis, and compares its ASCII-lower-cased text with `is` and `where`; so `:\77 here(.nav-link)` returns
   `['nav-link']`, `:WHERE(.upper)` returns `['upper']`, and no name that is not `is` or `where` opens a readable group.
   The reading case asserts the escaped spelling; `lad-3-red.log.txt` shows it failing before the fix and
   `lad-3-plant-escaped.log.txt` shows the raw-spelling plant failing it alone with an `AssertionError`.
2. **Nothing else moved.** The conformance gate's pass line is the same as round 2's, every other reading-case
   assertion still holds, and `lad-3-round.diff` changes only the lines the brief's Items name.
3. **The name.** `collectMatchingClasses` describes what the reader returns under `.claude/rules/names.md`: it tells the
   reader apart from `collectSelectorClasses`, does not use `subject`, and is no less true for
   `':is(.alpha, .beta) > .gamma'` than for `':where(button.nav-link)'`. No site still names `collectSubjectClasses`.
4. **The TSDoc.** The reader's summary reads "Collects every class a selector writes, reading through `:is()` and
   `:where()` arguments."; its first remark gives the ruled reason and states that a returned class can sit in any
   compound; its second remark states the decoded-name recognition; and each sentence is true of the code.
   `matchSelectorKey`'s `@param classes` links the renamed reader.
5. **The guide.** § Additions' ownership sentence gives the ruled reason verbatim, and the re-wrapped lines keep every
   other word of the paragraph.
6. **Gates.** The scoped oxfmt check, `npm run check`, `npm run lint:check`, the setup file (118 passed),
   `npm run test:conformance` (29 passed), `npm run test:guides`, and `npm run test:policy` exit 0 in
   `lad-instruments/r3/`.
7. **Scope and law.** `lad-3-status.txt` names only the four files rounds 1 and 2 touched, and this round's change is
   confined to `tests/setupServer.ts`, `tests/setupServer.test.ts`, and `guides/veneer.md`; `src/**` is unchanged; the
   round adds no `any`, prohibited assertion, non-null assertion, suppression, nested function declaration, hidden
   helper, mock, or fake.
