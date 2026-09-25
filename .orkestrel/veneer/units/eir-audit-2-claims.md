# E-ID-RECORD round 2 audit — claims

Subject: E-ID-RECORD round 2 in `/home/user/veneer-eir` (branch `unit/eir`, uncommitted over Veneer `ca83afb`), briefed
by `e-id-record-brief-2.md` (the round-1 findings: `eir-audit-objective-verdict.md` claim 5 and `button-alias-table`,
`eir-audit-subjective-verdict.md` claims 5 and 6 and F1 and F2), written by `builder` on Sonnet, and reported in
`e-id-record-report-2.md`. The diff is `eir-2.diff` (the whole change over `ca83afb`), the status `eir-2-status.txt`,
and the round-2 logs and mutation script `eir-instruments/r2/`. All sit under
`/home/user/scaffold/.orkestrel/veneer/units/`. A unit report's prose is not a claim subject. Each claim is falsifiable;
rule every one.

1. **Button group.** `button-group.test.ts` asserts a child's `border-left-width` of 3 under the 3px scope, and the
   comment above it is the round-2 brief's text verbatim and true of the asserted readings.
2. **Toggle.** The keyboard toggle case asserts `input.matches(':focus-visible')` and the label's `[[0, 0, 0, 3]]` ring
   after Tab and before Space, keeps its post-Space reads, and reddens when `.btn-check:focus-visible + .btn` leaves the
   ring selector list (`eir-2-mutation-toggle.log.txt`); its assertions distinguish that mutation from the passing tree,
   and its title states what it proves.
3. **Table cells.** The added `tr.test.ts` case reads a cell's bottom border moving to a scope-set `--bs-border-width`,
   and reddens when `_tr.scss` reads `--vn-border-width` (`eir-2-mutation-tr.log.txt`).
4. **Guide.** The Button binding table's `--bs-btn-border-width` row reads `var(--bs-border-width)`, and the
   `--vn-state-stripe` Source cell is the round-2 brief's text verbatim.
5. **Scope and gates.** The status lists only the round-1 files; the round-2 source files are unchanged from round 1
   apart from the test and guide edits the brief names; `test:src:styles`, `test:conformance`, and `test:guides` exited 0
   (`eir-2-test-*.log.txt`).
