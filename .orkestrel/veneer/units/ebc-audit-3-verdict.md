# E-ID-BUTTON-CASCADE fix-round audit 3 — verdict (2026-09-25)

The Orchestrator's reconciliation of the fix-round audit on `ebc-audit-3-claims.md`. Three lanes ran blind to each
other: the objective lane, `analyst` on GPT-6 Astra (`ebc-audit-3-objective-verdict.md`; journal
`tmp/codex/ebc-audit-3-analyst.jsonl`, thread `01a0d693-2098-79a0-89cf-a1eaadafeb51`); the subjective lane, `reviewer`
on Opus 5.5 (`ebc-audit-3-subjective-verdict.md`); and `checker` on Sonnet on claims 1, 2, and 6
(`ebc-audit-3-checker-verdict.md`). Round 5 was written by `builder` on Sonnet; both lanes ran on other engines.

## Claims

| Claim | Objective | Subjective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 Titles | BROKEN | BROKEN | CONFIRMED | BROKEN: both titles match the brief verbatim and both overclaim. Each case reduces the components layer to a set of distinct selectors, so "no other rule" is false of a second rule on a recorded selector (objective; the lane's read-only PostCSS control shows the input unchanged); the carousel title calls `:where(.carousel-indicators [data-bs-target])` a button form, which the mixin's own definition excludes (subjective). The wording is the brief's (`ebc-brief-5.md` items 1 and 2), not the writer's. |
| 2 Comment | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 3 Revert probe coverage | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 4 Control | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 5 Kills | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 6 Scope and law | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |

- The checker confirmed claim 1 on its verbatim clause alone; the truth clause needs the assertions, which both lanes
  read. Its reading stands for what it read.
- Subjective R1 closed by the Orchestrator: the live `src/styles/_mixins.scss` in `/home/user/veneer-ebc` hashes to
  `0eb94362739480cfd6248a49dded1a02f23f7397eca3898957c60c8010adc69e`, the pre-plant value.
- Subjective R2 closed by the Orchestrator: the per-mutation `ebc-3-mutation-*-final5.log.txt` logs and their JSON
  reports are retained under `ebc-instruments/r5/logs/`.

## The seam ruling

Claim 1's seam — an enumeration case's title and comment against its assertion — has now taken three rounds
(`ebc-audit-verdict.md` claim 11, `ebc-audit-2-verdict.md` claim 7, and this round). `.claude/rules/quality.md` § Rounds
and verdicts makes the third round a ruling, not a fourth repair. The recurrence has no direction: each round's title
named a different object than the assertion reads ("rule" where it reads a selector, "button form" where it reads a
component selector). Both lanes this round converge on the ruling:

- **Invariant.** An enumeration case reads the set of distinct components-layer selectors that name its key's classes.
  Its title says "selector", names each admitted selector outside the key's list by the selector shape it has, and says
  "no other components-layer selector" for the rejection. Its comment says a missing selector and an extra selector
  each report there, and that a second rule on a recorded selector leaves the reading unchanged.
- **Constraint.** The assertion does not change: rule-level duplicates are outside what these cases read, and neither
  the title nor the comment claims otherwise. No case gains a rule count.
- **Interface.** The case title and the comment above it, in every enumeration case whose assertion dedupes selectors
  through a `Set`: `accordion`, `carousel`, `collapse`, `fade`, `modal`, `offcanvas`, `popover`, `toast`, and `tooltip`
  under `tests/src/styles/components/`. A sweep of `tests/` for `no other rule` and `a missing rule and an extra rule`
  returned exactly those nine files and no other enumeration case.

## Carriers

- **E-ID-BUTTON-CASCADE round 6** (`ebc-brief-8.md`, `builder` on Sonnet): the accordion and carousel titles and
  comments, verbatim, with a duplicate-rule control and an extra-selector plant per file. It closes on the checker's
  mechanical read of the verbatim text and the Orchestrator's reading of the plant logs, because the text adopts both
  lanes' prescriptions (`.claude/rules/quality.md` § Rounds and verdicts).
- **ENUM-TITLES** (`enum-titles-brief.md`, `builder` on Sonnet, its own worktree from Veneer `main`): the seven other
  files, under the same invariant and closing rule. It lands with the CASCADE landing's chain.

## Ruling

FAIL. The code and the instruments stand; round 6 carries two titles and two comments, and ENUM-TITLES carries the
same ruling to the seven cases outside this unit's files.
