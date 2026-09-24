<!-- Checker: checker on Sonnet, workflow wf_9f4b4304-fd1, brief fu-audit-2-checker-brief.md. -->

Logs confirm the report's quoted result lines match (`Tests 2 failed | 286 passed | 12 skipped (300)`, `Tests 20 passed (20)`) — matches Orchestrator's given ruling that the timeout failures live in `tests/setupServer.test.ts`, which this unit does not touch.

## Verdict

**Claim 1 — Scope.** CONFIRMED.
- `/home/user/scaffold/.orkestrel/veneer/units/fu-2-status.txt:1-7` lists exactly `app/browser/constants.ts`, `tests/app/browser/integration.test.ts`, `tests/app/browser/sections/FocusRingSection.test.ts`, `tests/app/browser/sections/LinkSection.test.ts`, `tests/app/browser/sections/VisibilitySection.test.ts`, `tests/setup.test.ts`, `tests/setup.ts` — every file the briefs own (`/home/user/scaffold/.orkestrel/veneer/units/b-util-frames-brief.md:70`, `b-util-frames-brief-2.md:44`), and `VISIBILITY_COPY` lives in `app/browser/constants.ts`, already in that list.
- `/home/user/scaffold/.orkestrel/veneer/units/fu-2.diff` (all `diff --git` headers, lines 1-773) touches only those seven files; no `_color-bg.scss` or `_link.scss` hunk appears anywhere in the diff.
- `/home/user/veneer-fu/src/styles/utilities/_color-bg.scss:1-22` reads as plain baseline text (no label-polarity logic), consistent with `b-util-frames-report-2.md:15-19`'s account that the writer reverted its own P9 edit and `fu-2-status.txt` lists neither `_color-bg.scss` nor `_link.scss`.
- `/home/user/scaffold/.orkestrel/veneer/units/fu-shared-2.patch:1-2` has one `diff --git a/guides/veneer.md` header only; no other file's hunk appears; a search of the patch body for `text-bg` or any ledger-row token returns nothing, so it changes no ledger row.

**Claim 4 — The tables.** CONFIRMED.
- `fu-2.diff:986-1030` declares `LINK_STATE_TARGETS`, `LINK_STEP_PROPERTIES`, `LINK_PAINT_PROPERTIES`, and `FOCUS_INDICATOR_PROPERTIES` in `tests/setup.ts`, each `export const … = Object.freeze(…)` with a TSDoc block.
- `fu-2.diff:716-728` adds the same four names to the export-list case in `tests/setup.test.ts`.
- `fu-2.diff:743-769` adds the case that reads all four tables and asserts `Object.isFrozen(table)` for each.
- `fu-2.diff:292-302` (`tests/app/browser/integration.test.ts`) asserts `keys.filter((key) => LINK_STATE_TARGETS[key.scenario] === undefined)).toStrictEqual([])` — every link-state row has a target.
- Mutation `link-tables-absent` (`/home/user/scaffold/.orkestrel/veneer/units/fu-instruments/fu-mutations-2.log.txt:27-39`) removes the four declarations; the same log shows the actual run, exit 1, with both the export-list case and the table case failing (`AssertionError: expected [ 'CAPTURE_CONTROLS', …(17) ] to deeply equal [ 'CAPTURE_CONTROLS', …(21) ]` and `TypeError: Cannot convert undefined or null to object`), then the file restored. The mutation removes the exact symbols the two assertions read, and both assertions fail without them while passing with them restored, so it distinguishes the mutation from the passing case.

**Claim 5 — Prose and report.** CONFIRMED.
- F1: `fu-2.diff:838` (`tests/setup.ts`) and `fu-shared-2.patch:69` both read "These states lie outside the journey's variants," and `fu-2.diff:77` (`app/browser/constants.ts`) reads "which are the conditions the focusable helper answers to" — no count in any of the three.
- F2: `fu-shared-2.patch:42-49` names the Overflow region explicitly in the viewport clause ("every Overflow specimen render… the frame clips what an Overflow card… gives the Overflow axis cards a bounded height").
- F3: `fu-2.diff:60` (`VISIBILITY_COPY`) reads "…a container that appears while the link inside it holds focus. Press Tab to reach each link," naming the container.
- The report `b-util-frames-report-2.md:174-184` quotes each gate's command and result line; a sample cross-check against the retained logs confirms it verbatim: `fu-instruments/fu2-gate-setup.log.txt:76-77` matches "`Tests 2 failed | 286 passed | 12 skipped (300)`" and `fu-instruments/fu2-gate-guides.log.txt:10-11` matches "`Tests 20 passed (20)`".
- A sweep of the report for temporal words, ordinal naming, or a tally of a growable set (checked against `.claude/rules/writing.md` substitution table and `AGENTS.md` § Writing's count ban) finds none: the only numeric matches are measurements the run produced (contrast ratios, RGB/pixel values, test/exit counts with their command) or fixed compound terms ("three-way merge"), none of which name a count of a set anyone can add to.

**Counts the report states:** none found stated as bare counts; every number in `b-util-frames-report-2.md` is a measurement reported with the run that produced it (test-suite tallies beside their command, contrast ratios, pixel offsets, a diffstat line), per `AGENTS.md` § Writing's exception for "a value the reader needs."

Findings outside the claims: none.

VERDICT: PASS
