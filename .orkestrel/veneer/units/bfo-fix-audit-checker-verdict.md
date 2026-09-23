# B-FORMS-CONTROL, round 2 (the fix round) — `checker` on Sonnet, mechanical conformance

Native subagent, clean context, read-only, on the tree of `/home/user/veneer-bfo` on 2026-09-23. The verdict text is the lane's handback verbatim.

## Checker verdict — B-FORMS-CONTROL round 2 (fix round), claims 6 and 10

### Claim 6 — the prose

BROKEN.

Verified as CONFIRMED:
- Alias sentence, timing bullet, both `see`-links, ladder lead-in, proof comment all read exactly as the report states — `/home/user/scaffold/.orkestrel/veneer/units/bfo-2.diff:332-334` (alias), `:357-359` (timing), `:373-375` and `:387-388` (links), `:375-376` (ladder lead-in), `:2446` (`the release's `0.15s` fade`).
- ROADMAP rows and the restated D31 carrier cell each name exactly one carrier — report `b-forms-control-report-2.md:206-216` (`B-FORMS-CLOSE` in the restated cell and two new rows, `L2 LEDGER-PRIORITY` in the third).
- The FLOATING carrier sentence's text-control half (report `b-forms-control-report-2.md:196-199`) follows `writing.md`: code tokens carry a following noun, no banned term, no growable-set count.

Falsified:
- `writing.md` § Substitutions bans a temporal `once` (replacement: `after`). `tests/src/styles/components/form-control.test.ts:56` reads: `// A driven case is read only once the control is in the state its selector names: keyboard traversal is what earns `:focus-visible`, and the pointer is what earns `:hover`.` This is the temporal sense ("once the control is in the state" = "after/when the control is in the state"), not the frequency sense the file's other `once` occurrences use (for example `tests/setupStyles.ts` comments reading "written once," "once per engine," which state a count of repetitions and are permitted). This comment is part of the diff under audit (new file, `form-control.test.ts`) and is therefore in scope of claim 6's "every changed... comment" clause.

This single defect is enough to break the claim as stated ("every changed sentence... follows `writing.md`"); no wider sweep of the guide/TSDoc prose for column-length or further banned-term hits was needed to reach a verdict once one violation was confirmed, so the remainder of the guide prose is reported CONFIRMED on the specific sentences the claim names and not independently swept end-to-end for the general clause.

### Claim 10 — the law holds and scope is honest (non-`npm run check` parts; the objective lane rules the `npm run check` instruction)

CONFIRMED for the parts a read-only lane can rule:
- **Status.** `bfo-2-status.txt` (19 rows) equals the round-1 status `bfo-status.txt` (17 rows) plus exactly two added rows, `M src/styles/_mixins.scss` and `M tests/src/styles/components/validation.test.ts`, and nothing else — compared row by row.
- **`tmp/probe/` absent.** `Glob` over `/home/user/veneer-bfo/tmp/probe/**` returned no files.
- **Off-limits untouched; no file outside the brief-2 Owned list changed.** The brief's Owned list (`/home/user/veneer-bfo/tmp/units/b-forms-control-brief-2.md` § Scope) is `src/styles/components/_form-control.scss`, `tests/src/styles/components/form-control.test.ts`, `tests/setupStyles.ts`/`.test.ts`, `app/browser/constants.ts`, `app/browser/sections/FormControlSection.ts`, `tests/app/browser/sections/FormControlSection.test.ts`, `tests/app/browser/integration.test.ts`, `tests/setup.ts`/`.test.ts`, `tests/src/styles/components/validation.test.ts` (brief-granted), `guides/veneer.md`, plus `src/styles/_mixins.scss` under the D40 grant recorded in `/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md` § D40. Six status rows sit outside that literal list — `app/browser/Showcase.ts`, `app/browser/index.ts`, `src/styles/index.scss`, `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`, `tests/conformance.test.ts` — but each carries the identical `git diff --stat` line count in round 2's report (`b-forms-control-report-2.md:251-269`) as in round 1's report (`b-forms-control-report.md:45-56`: `Showcase.ts | 2 +`, `index.ts | 1 +`, `index.scss | 1 +`, `Showcase.test.ts | 3 +`, `index.test.ts | 3 +`, `conformance.test.ts | 1 +`, all unchanged). These six are round-1's already-established barrel-registration edits, carried forward untouched by the round-2 writer, not a round-2 scope breach. `src/styles/_mixins.scss` (`/home/user/veneer-bfo/src/styles/_mixins.scss:46-60`) carries exactly `control-type` then `control-border` after `border-reset`, matching D40's text and order.

Findings outside claims 6 and 10: none.

VERDICT: FAIL 6; outside the claims: none
