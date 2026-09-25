# E-ID-RECORD audit — claims

Subject: E-ID-RECORD in `/home/user/veneer-eir` (branch `unit/eir`, uncommitted over Veneer `ca83afb`), briefed by
`e-id-record-brief.md` under `e-id-common.md` and `../e-identity-design-verdict.md`, written by `builder` on Sonnet
(a first run stopped by a container restart, then a resumed run), and reported in `e-id-record-report.md`. The diff is
`eir.diff`, the status `eir-status.txt`, and the logs and scripts `eir-instruments/`. All sit under
`/home/user/scaffold/.orkestrel/veneer/units/`. Bootstrap 5.3.8 is
`/home/user/veneer-eir/node_modules/bootstrap/dist/css/bootstrap.css`. A unit report's prose is not a claim subject.
Each claim is falsifiable; rule every one.

1. **Scope.** The status lists only the owned files and `guides/veneer.md`, and the diff changes nothing outside the
   `hr` and `tr` border widths, the `.btn` border-width alias, the `.btn-check` hiding, their proofs, and the named
   guide rows.
2. **Hook.** The bare `hr`, the table row cells, and `.btn` read `--bs-border-width`, so a scope retuning it moves each;
   the `hr` proof reddens when `_hr.scss` reads `--vn-border-width` again (`eir-instruments/`).
3. **Toggle.** `.btn-check` hides its input with exactly Bootstrap's `position`, `clip`, and `pointer-events`
   declarations; the toggle case reaches the input by Tab, checks it with Space, and reads the label's focus paint, and
   it reddens under `display: none`.
4. **Records.** The stripe token row states the ruling; the `.btn-check` and `.btn` departure and addition rows match
   the shipped cascade; the conformance ledger passes.
5. **The off-limits assertion.** `tests/src/styles/components/button-group.test.ts` asserts that a child `.btn`'s left
   border stays 1px under a scope setting `--bs-border-width: 3px`; the ruling makes that false, and the returned patch
   (reading 3px) is the whole correction, with the case's title still true after it.
6. **Law.** The diff adds no `any`, `as`, non-null assertion, suppression, nested function declaration, or hidden
   helper, and every added or retitled test is named for what it proves.
