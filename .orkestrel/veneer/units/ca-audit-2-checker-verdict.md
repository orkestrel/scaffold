# Audit round 2 — CAROUSEL (`ca`), checker verdict

## Claim verdicts

**Claim 1 (delta and scope) — CONFIRMED.**
- `ca-2-status.txt` lists exactly the four untracked owned files (`ca-2-status.txt:1-4`).
- `ca-2.diff` changes only those four files (headers at `ca-2.diff:1`, `214`, `796`, `822`); `CarouselSection.ts` is byte-identical to round 1 per the report's own statement and no round-2 hunk touches it in the diff.
- `ca-shared-2.patch` touches exactly the thirteen Shared-row files (`ca-shared-2.patch` headers, and `patch.log.txt:3-15` file list, all 13 files, `13 files changed, 427 insertions(+), 11 deletions(-)`).
- Comparing `ca-shared-2.patch` against round 1's `ca-shared.patch` file by file: `src/styles/index.scss`, `app/browser/Showcase.ts`, `app/browser/index.ts`, `tests/setup.ts`, `tests/setupStyles.test.ts`, `tests/app/browser/integration.test.ts`, `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`, `tests/conformance.test.ts`, and `tests/setupServer.test.ts` are byte-identical between the two patches. `app/browser/constants.ts` differs (`ca-shared-2.patch:33-34` vs `ca-shared.patch:33-34`, and remark text at `ca-shared-2.patch:41-49` vs `ca-shared.patch:29-38`). `guides/veneer.md` differs at multiple sites (`ca-shared-2.patch:581-582` drops the R1 clause present at `ca-shared.patch:581-582`; `ca-shared-2.patch:149` and `558` drop "three" from the theme-scope sentences present at `ca-shared.patch:149` and `558`). `tests/setupStyles.ts` carries identical bytes but a shifted hunk header (`@@ -4121,6 +4121,64 @@` in `ca-shared-2.patch` versus `@@ -4122,6 +4122,64 @@` in `ca-shared.patch`), matching "splitting at a different line to identical bytes."
- The two removed-and-rewritten paragraphs in `guides/veneer.md` (the "Bootstrap variables Veneer retains" section and the "retained" sentence near the departures table) are the M8 paragraphs round 1 rewrote.
- No line touches a vendored file, `src/browser/**`, `src/core/**`, `tests/fixtures/**`, `package.json`, `README.md`, or `ROADMAP.md`; none of those paths appear in the 13-file list.

**Claim 2 (mutations and matrix) — CONFIRMED, on the population checked.**
- `mutate.py`'s `MUTATIONS` dict adds `next-display-dropped`, `prev-display-dropped`, `fade-active-dropped`, `next-right-dropped` (`mutate.py:18-19`, `25`, `36`).
- `mutations/none.log.txt:6` reads `Tests  17 passed (17)`, exit 0 — the unmutated control.
- `mutations/next-display-dropped.log.txt:11-17`: `RUN  v4.1.11 /home/user/veneer-ca/tmp/probe/base`, red on `display`, `lone-slide`, `advance`, `selector-set`.
- `mutations/prev-display-dropped.log.txt:11-17`: same `RUN` line, red on `display`, `lone-slide`, `advance`, `selector-set`.
- `mutations/fade-active-dropped.log.txt:9-13`: same `RUN` line, red on `fade`, `selector-set`.
- `mutations/next-right-dropped.log.txt:11-14`: same `RUN` line, red on `controls`.
- `mutations/next-guard-dropped.log.txt:8-12`: red on `advance`, `selector-set` only — `lone-slide` is absent, confirming the lone-slide case reddens under the display mutations and not the guard mutations, as the record states.
- All checked `RUN` lines name `/home/user/veneer-ca/tmp/probe/base`, matching the claim's uniform path assertion. I did not individually re-read every one of the remaining rows in the mutation table against its log; the four added rows and the `none` control and one guard row (the falsifiable core of this claim) check out exactly as recorded.

**Claim 7 (gates and patch check) — BROKEN.**
- `gates/summary.txt:1-12` matches the report's gate table exactly: scoped format/lint exit 0, `format:check`/`lint:check`/`check`/`build:src` exit 0, styles `34 passed (34)`, app `11 passed (11)`, guides `19 passed (19)`, policy `109 passed | 1 skipped (110)`, setup `253 passed (253)`, conformance `22 passed (22)`.
- `patch.log.txt:1-35` confirms the reverse apply, the empty diff at `c3ac297`, `git apply --check` exit 0, the re-apply, and the file list equalling the Shared row.
- **Break:** the claim asserts `logs/patch.log.txt` records "the worktree's `git apply --check` exit 0." `patch.log.txt` (35 lines, full file) contains no such line — it ends at "shared files back at their patched digests" (`patch.log.txt:35`) and never invokes `git -C /home/user/veneer-ca apply --check`. That worktree check appears only in the report's own prose (`b-modal-ca-report-2.md:391-392`), which is the writer's self-report and not independent log evidence. Per the mutation test named in the falsification law: the mutation "delete that report sentence" would not change any log file, so nothing in the retained evidence distinguishes "the worktree check ran and passed" from "the worktree check never ran." The claim's assertion about what the log records is false as stated.

**Claim 8 (law and report) — CONFIRMED.**
- No `any`, no type assertion beyond `as const`, no non-null assertion, no `@ts-*`/`eslint-disable`, no nested function declaration beyond arrow callbacks: confirmed by pattern sweep of `ca-2.diff` and `ca-shared-2.patch` (no matches for `\bany\b`, `@ts-`, `eslint-disable`, non-`const` `as X`, or bare `!` assertions).
- SCSS (`ca-2.diff:1-213`) reads only tokens (`var(--vn-*)`, `var(--bs-*)`), mixins (`@include transition(...)`), and the recorded data URIs; no bare literal color appears outside a data URI.
- Banned-term sweep of the report, `ca-2.diff`, and `ca-shared-2.patch` against the writing-rule substitution table (`simply`, `easy`, `just`, `currently`, `utilize`, `leverage`, `via`, `in order to`, `e.g.`, `i.e.`, `etc.`, `performant`, `robust`, `allows you to`, `and/or`, `please`, `sanity check`, `dummy`, `blacklist`/`whitelist`, `master`/`slave`) returned no matches.
- `now`/`new` sweep of the report returned no unpermitted-sense hits: the only matches are "Failing-first," "first-written order," and "1500-second," none of which is the banned temporal sense.
- No list item is named by position in the report's prose.
- The report records each gate's command and result line (`b-modal-ca-report-2.md:357-370`).

## Counts the report states (listed, per claim 8's own requirement)

- Diffstat: `_carousel.scss` 207 insertions, `carousel.test.ts` 576 insertions, `CarouselSection.ts` 20 insertions, `CarouselSection.test.ts` 255 insertions; `13 files changed, 427 insertions(+), 11 deletions(-)`.
- Styles mutation tallies in `mutations/*.log.txt`, each a `Tests` line such as `17 passed (17)` or `N failed | M passed (17)`, one per row of the mutation table.
- Section mutation tallies in `section-mutations/*.log.txt` and `round1-section-hole/*.log.txt`, each `6 passed (6)`, `1 failed | 5 passed (6)`, `2 failed | 4 passed (6)`, or `5 passed (5)`.
- Gate tallies: `34 passed (34)`, `11 passed (11)`, `19 passed (19)`, `109 passed | 1 skipped (110)`, `253 passed (253)`, `22 passed (22)`.
- The interrupted-run note: a `1500-second` cap.
- The paragraph-wrap note: `100` columns.

## Findings outside the claims

None.

VERDICT: FAIL 7; outside the claims: none
---

Orchestrator reading appended after the lane returned (claim 7's worktree check): `git -C /home/user/veneer-ca apply --check /home/user/scaffold/.orkestrel/veneer/units/ca-shared-2.patch` run by the Orchestrator at 16:50:44 UTC exits 0; the patch carries index lines and `git -C /home/user/veneer apply --check --3way` against the session head `f31f24c` reports every hunk applied cleanly or with a resolvable conflict in `tests/setup.ts`. That sub-part is CONFIRMED on those measurements.
