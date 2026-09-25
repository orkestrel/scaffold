# E-ID-FLOW round 2 audit — claims

Subject: E-ID-FLOW round 2 in `/home/user/veneer-flow` (uncommitted over Veneer `6882751`), briefed by
`e-id-flow-brief-2.md` (carrying F1 to F3 of `flow-audit-verdict.md`), written by `opus` on Opus 5.5, and reported in
`e-id-flow-report-2.md`. The diff is `flow-2.diff` (the whole change over `6882751`), the status `flow-2-status.txt`,
and the logs `flow-instruments/logs/` (this round's carry the `-r2` suffix and the `mutation-address-literal` and
`mutation-nested-list` names). All sit under `/home/user/scaffold/.orkestrel/veneer/units/`. A unit report's prose is
not a claim subject. Each claim is falsifiable; rule every one.

1. **Titles.** Each density case title in `p`, `address`, `ol`, `ul`, `heading`, and `type` states both what the case
   reads at the default density and what it reads under the density factor, and each is true of its assertions.
2. **Address run.** Under `_address.scss` writing `1rem` for the token, the `address` density case reads red, its
   assertion distinguishes the mutation, and the restore is byte-identical (`mutation-address-literal.log.txt`).
3. **Nested-list record.** Each of the guide's `ol ol`, `ul ul`, `ol ul`, and `ul ol` Excluded rows carries the brief's
   clause verbatim, and the clause is true of the compiled cascade.
4. **Nested-list proof.** The added `ul.test.ts` case reads an inner bare `ul` at 16px and an inner `ul.mb-0` at 0px; it
   reddens under an added `ul ul { margin-bottom: 0 }` in the `elements` layer (`mutation-nested-list.log.txt`), and its
   assertions distinguish that mutation; its title states what it proves.
5. **Scope and law.** Round 2 adds no path to round 1's status; the diff adds no `any`, `as`, non-null assertion,
   suppression, nested function declaration, or hidden helper.
