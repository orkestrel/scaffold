# AP-COLOR audit, round 2 — claims

Subject: the AP-COLOR round-2 change in `/home/user/veneer-apc` (branch `unit/apc`, uncommitted over Veneer `712ae72`),
briefed by `ap-color-brief-2.md` to carry F1 to F7 of `apc-audit-verdict.md`, and reported in `ap-color-report-2.md`. The
owned diff is `apc-2.diff`, the shared patch `apc-shared-2.patch`, the status `apc-2-status.txt`, and the logs and
scripts `apc-instruments-2/`; the round-1 diff and logs are `apc.diff` and `apc-instruments/`. All sit under
`/home/user/scaffold/.orkestrel/veneer/units/`. Each claim is falsifiable; rule every one.

1. **Scope and gates.** The status lists only the round-2 owned files (round 1's plus `tests/setup.ts`) and the shared
   files. Each final gate log ends on exit 0 with the count the report states: `test:src:styles` 1448, `test:setup` 320,
   `test:conformance` 26, `test:guides` 20, the scoped journey case 4 passed in the four variants, and `format:check`,
   `lint:check`, and `check` clean.
2. **Source unchanged.** `git diff 712ae72 -- src` in the worktree equals the `src/` hunks of `apc.diff`.
3. **F1.** `UNDER_BAR` holds exactly `dark|Outline dark|rest` and `light|Outline light|rest`, its remarks are true
   against the change, `tests/setup.ts` changes nowhere else, and the composed-contrast case that failed on the stale
   table (`apc-instruments/apc-capture.log.txt`) passes in all four variants.
4. **F2.** The tier-at-80 log shows the link rest, link hover, outline rest, and invalid feedback and label proofs red in
   dark at the readings the report states, and the valid case green for the reason it states.
5. **F3.** Each mutation in the report's table reddens the proof it names, in the modes it names, and each restore is
   byte-identical. The tightened hover proof still proves the hover is the tier moved 20 percent toward the emphasis
   text, and its expected value no longer derives from the link's own color.
6. **F4.** The retune proof runs in each mode with every override on the element that declares that mode's theme, and
   the identity, opacity, validation, and anchor fixtures paint the body background.
7. **F7.** The four new retune assertions state true behavior, and the mutations that inline the tier, read the token
   directly, and send the link through the alias each redden the assertion whose path they remove, as the logs show.
8. **F5.** No assertion compares a table with the template that built it or a value with its own literal;
   `TEXT_TIER_CASES` writes the ruling's mix independently of the class's expression; the release-record case compares
   each tier key with that independent twin and asserts it differs from the release's channel twin.
9. **F6.** The guide carries the brief's scoped identity, link, and departure sentences, states no count, uses no banned
   term, and each sentence is true against the code and its proofs.
10. **Law.** The round-2 diff adds no `any`, `as`, non-null assertion, suppression comment, nested function declaration,
    module-scope helper hidden in a test file, or helper duplicating an installed export, and every new or retitled test
    is named for what it proves.
11. **Report.** No claim in the report is wider than its logs, and it states which earlier readings it did not retain.
