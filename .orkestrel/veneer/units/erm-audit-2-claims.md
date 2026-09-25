# ER-MECH fix-round audit 2 — claims

Subject: ER-MECH round 2 in `/home/user/veneer-erm` (branch `unit/erm`, rounds 1 and 2 uncommitted over Veneer
`873f715`), briefed by `er-mech-brief-2.md`, which carries every row and finding of `erm-audit-verdict.md`; written by
`opus` on Opus 5.5 and reported in `er-mech-report-2.md`. Evidence: `erm-2-delta.diff` (round 2's change over round 1's
tree, built by applying `erm.diff` to `873f715`), `erm-2.diff` (the whole change over `873f715`), `erm-2-status.txt`,
and the instruments and logs under `erm-instruments/r2/` (`erm-2-plants.py`, `erm-2-gates.sh`, `erm-2-engines.sh`, and
`logs/`). Round 1's instruments sit under `erm-instruments/`. All sit under
`/home/user/scaffold/.orkestrel/veneer/units/`. The design verdict is
`/home/user/scaffold/.orkestrel/veneer/e-receipts-design-verdict.md`. A unit report's prose is not a claim subject. A
plant counts as a kill only when the failing case's message names an assertion failure or the reader's own refusal
message. Rule every claim.

1. **Readers refuse malformed cells.** `readReceipts` refuses a Commands cell whose code spans are not separated by one
   comma each (a space-only gap, a doubled comma, a trailing comma) with a message naming the row; `readSupportedHosts`
   refuses a Platform cell that is neither `—` nor a member of `NODE_PLATFORMS`, naming the row, and validates no
   Channel; `NODE_PLATFORMS` holds exactly the values Node's `process.platform` can take; each refusal has a
   scratch-guide case, and the `reader-commands` and `reader-platform` plants each fail it with an assertion failure.
2. **Floors.** The `floor-npm` plant (a receipt's npm under the `package.json` floor) and the `floor-form` plant (a floor
   not in the `>=x.y.z` form) each fail the floor case with an assertion failure, and the case title names both
   refusals.
3. **Live runtime.** The live `readRuntime` case's title names what it reads and what it compares against, and its
   comment is true: the build comparison repeats Playwright's `Browser.getVersion` read, and the user-agent major is
   the only check independent of Playwright.
4. **Release-host case.** The release-host case's message names every host value a receipt row needs (channel, build,
   platform, kernel, Node, npm) and says the Date, Revision, and Commands cells come from the run that writes the row;
   `matchesReceipt` decides the match; the `release-match` control passes with a matching passing receipt and the
   `release-match-false` and `matcher-false` plants fail, so a matcher that always reads `false` is told apart; the
   invalid-build case drives `readRuntime`'s refusal through a `browser` parameter narrowed to the one member the
   reader reads, and the `runtime-build-refusal` plant fails it.
5. **Titles.** `BUILD_PATTERN`'s assertions sit in their own case, titled for the pattern, which the `build-pattern`
   plant fails; every case round 2 adds or retitles states what it proves.
6. **The guide.** `## Hosts` states that a non-release run passes when a passing receipt matches and skips when none
   does; that the message names every host value; that a sentence naming a browser build must rest on a receipt, as a
   requirement ER-PROSE's gate will enforce; the maintainer as the one who chooses the platform; the `engines.node`
   sentence as `erm-instruments/r2/logs/erm-2-engines.log.txt` reads it; and every channel `configs/browsers.ts` can
   pick. § Tests states the release binding in the same conditioned form. `tests/setupServer.ts` writes no temporal
   `once`.
7. **The packed link case.** The packed-CSS page case in `tests/distribution.test.ts` compares the link against a
   swatch written with the shipped rule's own colour expression on `--vn-color-primary-emphasis`, keeps its danger
   comparison, reads red before the fix and green after (`logs/erm-2-link-red.log.txt`, `logs/erm-2-link-green.log.txt`),
   and the `link-swatch-rgb` plant fails it with an assertion failure.
8. **Scope and law.** Round 2 changes only paths `er-mech-brief-2.md` owns; `erm-2-status.txt` and `erm-2.diff` name the
   same files; every new export appears in the export inventory in `tests/setupServer.test.ts`; the delta adds no
   `any`, prohibited assertion, non-null assertion, suppression, nested function declaration, or hidden helper.
