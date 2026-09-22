# F7 CAPTURE — audit evidence index

The subject is the worktree `/home/user/veneer-f7`, detached at `07fc3c3` with the unit's
uncommitted writes (owned files only; no Orchestrator integration).

- `/home/user/scaffold/tmp/audit/f7-status.txt` — `git status --porcelain` over the subject.
- `/home/user/scaffold/tmp/audit/f7.diff` — `git diff` against `07fc3c3` (the actual diff).
- `/home/user/scaffold/tmp/audit/f7-report.md` — the unit's returned report, with the re-shot
  portfolio table (frame size, floor, region, variation per scenario and variant).
- `/home/user/scaffold/tmp/audit/f7-capture-listing.txt` — the listing of
  `/home/user/veneer-f7/tmp/capture/states/` as the unit left it (frames and accessibility
  artifacts); the frames themselves are under that directory and are the review input for every
  rendered claim, with `readFrame` (installed) as the reader.
- `/home/user/scaffold/tmp/audit/f7-terrain.md` and
  `/home/user/scaffold/tmp/audit/cl13-portfolio-observations.md` — the terrain and the retained
  observations the brief pointed at.
- `/home/user/veneer-f7/tmp/units/f7-brief.md` — the brief the unit ran.
- `/home/user/scaffold/tmp/audit/f7-gates.log.txt` — the Orchestrator's gate chain over the subject
  worktree, complete when its last line reads `=== gates done`; read it last.

Rulings taken before this round: the caption opt-out specimen (obligation 5, second half) is NOT
DONE because F6's class is absent from this baseline; it goes to a successor unit after F6 and F7
integrate, so claim 5's specimen clause is ruled on that basis. The unit's reading that a frame's
name carries no `-<step>` token (the variant token is terminal; the step names the accessibility
artifact) is a ruling within the grammar the brief fixed; rule on whether the grammar as landed is
one a reader can parse, not on the brief's optional slot. The brief named `tests/journey/**`, which
does not exist; the journey suite is `tests/app/browser/integration.test.ts`, which the unit owned
on that reading.
