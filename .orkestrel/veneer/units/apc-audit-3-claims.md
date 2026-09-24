# AP-COLOR audit, round 3 — claims

Subject: the AP-COLOR round-3 change in `/home/user/veneer-apc` (branch `unit/apc`, uncommitted over Veneer `712ae72`),
briefed by `ap-color-brief-3.md` to carry H1 to H6 of `apc-audit-2-verdict.md`, and reported in `ap-color-report-3.md`.
The owned diff is `apc-3.diff`, the shared patch `apc-shared-3.patch`, the status `apc-3-status.txt`, and the logs and
scripts `apc-instruments-3/`; round 2's are `apc-2.diff`, `apc-shared-2.patch`, and `apc-instruments-2/`. All sit under
`/home/user/scaffold/.orkestrel/veneer/units/`. Each claim is falsifiable; rule every one.

1. **Scope and gates.** The status lists only owned and shared files; each final gate log ends on exit 0 with the count
   the report states (`test:src:styles` 1456, `test:setup` 320, `test:conformance` 26, `test:guides` 20, and
   `format:check`, `lint:check`, and `check` clean); `git diff 712ae72 -- src` still equals round 1's `src/` hunks.
2. **H1.** The four retune cases together keep every assertion of round 2's single case, and each title names exactly
   the path its assertions prove.
3. **H6.** The emphasis-opacity case asserts, in each mode on a painted scope and for every tier role, alpha 1 on
   `.text-<role>-emphasis.text-opacity-50` and alpha 0.5 on `.text-<role>.text-opacity-50`; the emphasis-opacity mutation
   reddens it, as its log shows.
4. **H5.** The `.text-danger` channel mutation reddens the release-record case in both modes, as its log shows.
5. **H3 and H4.** The anchor sentence ties only the resting color to `.text-primary`; the split retune sentences each
   carry one idea and are true against the four cases and the opacity case; the rewrapped paragraphs change no word.
6. **H2.** The report places the theme-dependent overrides on the theme scope, the density override on the root with its
   cleanup, and the F7 overrides on descendants, matching the test code.
7. **Law and report.** The round-3 diff adds no `any`, `as`, non-null assertion, suppression, nested function
   declaration, or hidden helper; every new or split title is named for what it proves; no report claim is wider than
   its logs.
