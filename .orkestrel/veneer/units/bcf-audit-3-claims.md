# Audit claims — BCF (`bcf`), round 4

Subject: BCF's round 4 — `bcf-4.diff` and `bcf-4-status.txt` (the worktree `/home/user/veneer-bcf` against
`f4e5693`, rounds 2 to 4 together), the report `b-collapse-bcf-report-4.md`, and the round-4 records under
`bcf-instruments/` (the names carrying `-4`) — against the successor brief `b-collapse-bcf-brief-4.md`, which
carries B-g and B-h from `bcf-audit-2-verdict.md`. The unit was written by `opus` on Opus 5.5. Rule each claim
CONFIRMED or BROKEN with `file:line` evidence; before confirming a claim about a proof, name the mutation that
would make it fail and whether its assertions distinguish that mutation from the passing case.

1. **B-g.** The selector case in `tests/app/browser/sections/NavbarSection.test.ts` derives its infixes from the
   `BREAKPOINT_INFIXES` constant and keeps the bare `.navbar-expand` entry; no literal infix list remains in the
   owned section proofs; the added-infix mutation reddens that case alone, as `bcf-mutations-4.log.txt` and its
   per-mutation log show.
2. **B-h.** The `MenuContainment` remarks in `tests/setupBrowser.ts` state what holds for an out-of-flow menu and
   an in-flow menu, and the `readMenuContainment` function's code is unchanged from round 3.
3. **Delta and law.** `bcf-4.diff` differs from `bcf-3.diff` only at the two sites B-g and B-h name; no changed
   line adds an `any`, an `as` beyond a const assertion, a `!`, a suppression, or a nested function; the
   report's gate result lines match their logs.
