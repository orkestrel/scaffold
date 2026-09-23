# Audit verdict — NAVBAR (`nb`), round 3 (the mechanical fix round)

Subject: the round-3 claims in `nb-audit-3-claims.md` over the worktree `/home/user/veneer-nb` (the owned files over `a658879`), `nb-3.diff`, `nb-3-status.txt`, `nb-shared-3.patch`, `nb-offlimits-3.patch`, `nb-retirement-3.patch`, `b-collapse-nb-report-3.md`, and `nb-instruments-3/`. The unit was written by `builder` on Sonnet from `nb-brief-3.md`, whose every edit was prescribed verbatim.

## Lanes

| Lane | Role and engine | Verdict file | Terminal line |
| --- | --- | --- | --- |
| Objective | `analyst` on GPT-6 Astra (`codex-queue-22.sh`, thread `01a0cfc6-407c-76e0-8b05-1b8260aacacc`) | `nb-audit-3-objective-verdict.md` | `FAIL 5; outside the claims: REPORT-COUNTS, EMPTY-TABLE-PROOFS` |
| Checker | `checker` on Sonnet (claims 1, 2, 5) | `nb-audit-3-checker-verdict.md` | `FAIL 5; outside the claims: none` |
| Subjective | not run | — | — |

The subjective lane is not run in this round for this round's own reason: the brief prescribed every edit's before and after text from the round-2 reviewer's own replacement text, leaving no shape, naming, or voice choice to the unit, so the round's claims are mechanical and the audit ran the objective lane and the checker. The lanes ran on the one claims file, blind. The checker's command sub-clause (`git apply --check` of the shared and off-limits patches) is settled in `nb-audit-3-settling.txt`: exit 0 for each.

## Reconciliation

1. **Delta and scope: CONFIRMED** in every lane. The owned-file delta from round 2 sits in `navbar.test.ts` (the three matrices read through imports) and the `NavbarSection.test.ts` comment; the shared patch's delta sits in the five named files; the off-limits patch is byte-identical to round 2; the retirement patch differs only in its index lines and the `setupStyles.test.ts` hunk header (`601` to `607`); the patches apply with exit 0.
2. **The nouns, the sentences, and the comment: CONFIRMED** in every lane at the sites each names. The section comment's bare token is ruled under claim 5.
3. **The three tables: CONFIRMED** by the objective lane: the declarations, their order, rows, TSDoc, `ReadonlyArray` contracts, and recursive freezing; the import, export-list, table-loop, and row-loop membership; the consumer-property assertion; the proofs reading each table through its import with no row restated; each freeze control and the foreign-property control red on the case it names, the unmutated file green. The empty-population defect is ruled under EMPTY-TABLE-PROOFS.
4. **The gates and the matrix: CONFIRMED** by the objective lane against the retained logs: every stage gate and retirement gate exit 0 as the report states, every carried round-2 mutation record equal to its round-2 record where re-run, the rerun scope stated, the retirement asset probe red then green.
5. **Law and report: BROKEN, carried in part.** The code law holds in every lane (no `any`, assertion, suppression, mock, nested function, or duplicated helper). The writing law fails at one code site, carried: the `NavbarSection.test.ts` comment beside the light-attribute assertion leaves `data-bs-theme` bare where the brief's item 5 gave it in backticks and the file's own comments at the toggler and content assertions backtick their tokens; the report's account that bare tokens are the file's convention is false and is corrected here. The report's defects are record-only, the round-3 report staying as audited, and the round-4 report is written under the rule: the styles, section, setup, and retirement commands abbreviated where the brief required each in full; the retirement patch-check command named against the worktree where `retire.sh` runs it in the simulated repository; possessivized code tokens; a temporal `new` and a cross-reference `above`; the deviation on the stage's `node_modules` summarized without the first failing pass's evidence, which `gates.sh` truncated at its next run; the carried deviations summarized without the four fields. The retained-path clause holds.

## Findings outside the claims, ruled

- **EMPTY-TABLE-PROOFS** (the objective lane, established by its read-only probe): with any added table's initializer replaced by `Object.freeze([])`, the setup case's freeze, property, and row assertions and the proof's loop execute no assertion and read green. The rows are correct and the freeze and foreign-property controls hold; the missing protection is membership. Carried to round 4: the setup case asserts each table's rows by member, the expand readings derived from the breakpoint table, and one deletion control per table reads red on that case.
- **REPORT-COUNTS** (both lanes): the report's "three tables", "four controls", "two case-title-only mutations", "one hunk header", and "three inline tuple loops" tally growable sets; "sole writer" and "both" after naming D6 and D7 are permitted senses. Record-only for the round-3 report; the round-4 report states none.

## Carriers

Every carried finding is an item of `nb-brief-4.md` (`builder` on Sonnet, the same writer resumed in the same worktree). The off-limits and retirement patches carry no finding and are regenerated for the record.

VERDICT: FAIL 5; outside the claims: EMPTY-TABLE-PROOFS, REPORT-COUNTS
