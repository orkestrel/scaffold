# Audit claims — UTIL-FLOW (`ufl`), round 2

Subject: round 2's record — `ufl-2.diff` and `ufl-2-status.txt` (the worktree `/home/user/veneer-ufl`
against `2a3f223`), the revised shared patch `ufl-shared-2.patch` (one unified diff against `2a3f223`
that supersedes `ufl-shared.patch` whole), the revised Route B patch `ufl-routeb-2.patch` (applied over
the shared patch and the owned files, superseding `ufl-routeb.patch`), the report
`b-utilities-ufl-report-2.md`, and the round-2 instruments and logs under `ufl-instruments/`
(`ufl-mutations-2.log.txt`, `ufl-mutate-2.sh`, `ufl-gates-2.sh`, `ufl-2-gate-*.log.txt`,
`ufl-2-shared-interdiff.txt`, `ufl-reflow.py`) — against the successor brief
`b-utilities-ufl-brief-2.md`, the round-1 verdict `ufl-audit-verdict.md` and its lane verdicts, round
1's record (`ufl.diff`, `ufl-shared.patch`, `ufl-routeb.patch`, `b-utilities-ufl-report.md`), and the
mid-campaign notes `w2-w3-note-1.md` to `w2-w3-note-3.md`. The unit was written by `opus` on Opus 5.5.
Each claim is falsifiable; a lane rules CONFIRMED or BROKEN with `file:line` evidence, and before
confirming a claim about a proof names the mutation that would make the proof fail and whether its
assertions distinguish that mutation from the passing case.

Orchestrator rulings the lanes take as given, and rule wrong where the evidence says so: the round-1
verdict's rulings stand, and every claim it confirmed stays confirmed unless round 2 changed its
subject; where the verdict or the brief quotes a replacement sentence, that sentence is the fix; the
validation copy was deleted before the report, so a lane rules the gate and mutation claims from the
code's assertions and the retained logs, and names which it read.

1. **Scope and delta.** `ufl-2-status.txt` lists round 1's owned paths and nothing else;
   `ufl-shared-2.patch` applies with `git apply --check` to a fresh extract of `2a3f223`, and
   `ufl-routeb-2.patch` applies over it and the owned files; against round 1, the shared patch changes
   only `app/browser/Showcase.ts`, `app/browser/index.ts`, `app/browser/constants.ts`,
   `tests/app/browser/Showcase.test.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, and
   `guides/veneer.md`, and the Route B patch only the mixin comment; the owned files change only at the
   sites U1, U2, and U4 name.
2. **U1: the case populations.** `HIT_CORNERS` and `STRETCHED_LINK_HOSTS` sit in `tests/setupStyles.ts`,
   frozen and exported, and a case in `tests/setupStyles.test.ts` binds them by derivation to the edges
   the inventory records for the `stretched-link` key; the `computeCornerPoints` helper the brief did not
   name is setup infrastructure that reads no document and asserts nothing, consolidating arithmetic
   every hit-test case would otherwise repeat; `stretched-link.test.ts` and `LinkSection.test.ts` carry
   no local selector or corner population; `FloatSection.test.ts` derives its float classes from
   `FLOAT_VALUES` and `GRID_BREAKPOINT_CASES`; each retained red run (a dropped corner, a dropped host, a
   dropped float value) reddens the case the report names, and its assertions distinguish the mutation.
3. **U2 and U3: the prose.** The `_overflow.scss` comment names the `overflow`, `overflow-x`, and
   `overflow-y` entries; the `OBJECT_FIT_*` TSDoc names the region by where it lies and writes "the wide
   and the narrow picture"; the `cover-block` comment opens with "Emits"; `OBJECT_FIT_COPY.paragraph`
   carries "then a tall picture that switches from contain to cover at the md boundary"; no added or
   changed line in the owned files or either patch counts a growable set, names a list item by its
   position, or leaves a code token without its noun.
4. **U4: the mixin's own red run.** With `ufl-routeb-2.patch` applied, deleting `right: 0` from the
   `cover-block` mixin reddens the mixins cover case, the stretched-link corner and edge cases, and the
   card overlay case (`ufl-mutations-2.log.txt`), and those cases' assertions distinguish the deletion.
5. **U5: the region order.** `app/browser/Showcase.ts`, `app/browser/index.ts`, and
   `tests/app/browser/Showcase.test.ts` construct and list the regions Float, Object fit, Overflow, the
   guide orders the utility sections and their § Tests links the same way, and `index.test.ts`, which
   compares a sorted key list, needs no edit.
6. **The round-1 confirmations.** The claims round 1 confirmed (the cascade against the oracle, the
   proof matrix, D46 and the `cover-block` mixin, the Tailwind shared names) still hold on round 2's
   files.
7. **Law and report.** The owned files and both patches add no `any`, no `as` beyond a const assertion,
   no `!`, no suppression, no mock, spy, or fake, and no nested function beyond a callback passed
   directly; the round-2 report follows the writing rule and records each gate's command with its
   result line; a lane lists every count the report states as a finding outside the claims for the
   record.
