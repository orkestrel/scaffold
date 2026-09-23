# B-FORMS-CLOSE-SPECIMENS (`bfs`), round 2 — audit claims

## Subject

Round 2 of B-FORMS-CLOSE-SPECIMENS in `/home/user/veneer-bfs` (a worktree detached at `d02bd46`,
holding rounds 1 and 2 uncommitted), written by `opus` on Opus 5.5 from
`/home/user/veneer-bfs/tmp/units/bfs-brief-2.md` (retained as
`/home/user/scaffold/.orkestrel/veneer/units/b-forms-close-specimens-brief-2.md`), carrying round
1's audit findings (`bfs-audit-verdict.md`: claim 4's tallies, overclaim, and false generalization,
F1, F2, the `'nothing'` sentinel, the position-named group, the focus comment's redundancy, the
rationale worded three ways). Round 1's claims 1 to 3 and 5 to 7 and 9 held and are not re-run;
this round's claims are the fix's. **Review evidence.**
`/home/user/scaffold/.orkestrel/veneer/units/bfs-2.diff` (the whole diff against `d02bd46`,
rounds 1 and 2), `bfs-2-status.txt`, the round-2 report `b-forms-close-specimens-report-2.md` (its
geometry readings per key and its mutation run), the round-2 brief, and round 1's records
(`bfs.diff`, `b-forms-close-specimens-report.md`, `bfs-audit-verdict.md`, `bfs-setup.log.txt`).

## What the round decides

Whether B-FORMS-CLOSE-SPECIMENS lands on the session branch as one commit (rounds 1 and 2
together) after the B-FORMS-CLOSE-TABLES landing, with the reviewer's three-sentence guide text
landed as the Orchestrator's integration edit and the frames regenerated per variant.

## Already established — do not re-run

Round 1's confirmed claims; the blank-frame measurement's date (commit `eb1cd71`, 2026-09-22); the
standing ruling that a CSS token is its own noun; the objective lane's sandbox runs no Vitest
project and no browser (`npm run check` and `node -e` that write nothing are allowed).

## Unknowns

- Whether an undefined `hit` (the hit test reaching no element) surfaces legibly in the assertion's
  failure output (the writer did not run that case; `JSON.stringify` drops the field from the
  artifact): the lanes rule from the filter and its message.
- Whether the geometry predicate (`box.top >= host.getBoundingClientRect().bottom`, host the copy's
  parent) is the right host for every hanging key a later family registers (a tooltip whose host is
  not its parent): the lanes say what a later key would need.

## The threshold

`CONFIRMED` requires naming the attack that failed; a claim about a proof names the mutation and
says whether the assertions distinguish it. Rule every claim CONFIRMED, BROKEN, UNRESOLVED, or
NOT-EVIDENCED with `file:line`.

## Numbered falsifiable claims

1. **The delta is the brief.** Round 2 touches only the four round-1 files in their owned regions;
   the status lists those and nothing else; `src/**`, `guides/**`, `tests/setupStyles.ts`,
   `tests/src/**`, and `tests/fixtures/**` are unchanged.
2. **The doc block carries the lanes' text and states the gate's predicate.** The "names what sets
   its specimen apart" sentence, the "placement rulings" sentence, the hanging-key paragraph
   opening "A key the release positions below its host's box…" and stating the predicate the
   journey gates on (the key's top at or below its host's bottom edge), and the spinner sentence
   without a tally and with "file" after the path token read as the brief's criterion 1 gives them;
   the date stays; the block names no member.
3. **The gate is geometric and admits exactly the tooltip keys.** The journey's hanging-key gate
   reads `box.top >= host.getBoundingClientRect().bottom` with the host the copy's parent through
   `requireValue`, keeps the `requireValue` on the button-led group with a message naming the
   hanging selector, and on this tree admits exactly `input-group-valid-tooltip` and
   `input-group-invalid-tooltip` in light and dark (the report's readings: the tooltips at
   +1.59 px, the nearest excluded key at −16 px, the floating labels at −58 to −64.8 px). Mutation:
   `top: 0` on the tooltip admits no key and the exact-keys assertion reddens (the writer's run).
4. **The design-law fixes.** The `hung` map's field is `limit` (no `floor` remains in that map), the
   `hit` value is `string | undefined` with the sentinel gone and the filter still requiring
   `'tooltip'`, so an undefined hit fails; the focus comment reads the brief's text; the rest case's
   opening comment and the `CascadeKey` remarks use the same words as the doc block's rationale;
   the Input group paragraph ends "…the feedback a failing group reports under its row, and the
   tooltip a passing or a failing group hangs over the row after it." with the section test reading
   the rendered paragraph against the constant (the shared section-test pattern); no group is
   named by position in `constants.ts` or the section test.
5. **Prose law.** Every comment and doc block round 2 adds or changes follows `writing.md` and
   `AGENTS.md` § Writing: no count, no position name, no banned term, a code token followed by a
   noun (a CSS token its own noun), one idea per sentence.
6. **Law and scope.** Across the round-2 delta: no `any`, `as` (other than `as const`), `!`, or
   suppression; no nested function beyond a callback passed directly; no helper whose job an
   installed `@orkestrel/test` browser export does (the point-in-rectangle comparison stays inline
   after the writer's read of the declaration found no such export); the off-limits files
   untouched. Run `npm run check` from the worktree and report its exit code as evidence here (the
   objective lane).
