"""fold-50: D43 — the engine session. Edits ROADMAP.md: the D41 tenet gains the D43 amendment, the phase
preamble and the J-ENGINE row name the parallel session, § Protocol gains `### The engine session`,
§ Decisions and § Records name D43 and the engine folder. Every anchor must be unique or the fold refuses."""
import pathlib, sys
p = pathlib.Path('/home/user/veneer/ROADMAP.md'); s = p.read_text()
def rep(old, new):
    global s
    n = s.count(old)
    if n != 1: sys.exit(f'fold 50 refused: anchor count {n}: {old[:70]!r}')
    s = s.replace(old, new, 1)
# 1 the D41 tenet
rep("  with no runtime dependency outside `@orkestrel/*` and each candidate ruled on, Elements and\n  Mailbox read for mechanisms and lessons.\n",
    "  with no runtime dependency outside `@orkestrel/*` and each candidate ruled on, Elements and\n  Mailbox read for mechanisms and lessons. From 2026-09-23 the engine runs in a parallel session\n  on its own branch (D43): what still waits on the baseline is each `plugin` row's flip to\n  `shipped`, the showcase wiring of engine behaviour, and E-VUE; § Protocol › The engine session\n  states the branches, the ownership, and the landing discipline.\n")
# 2 the phase preamble
rep("`J` the engine after the baseline (D41), and `X` the close.",
    "`J` the engine in a parallel session (D41 as amended by D43), and `X` the close.")
# 3 the J-ENGINE row
lines = s.split('\n')
idx = [i for i, l in enumerate(lines) if l.startswith('| J-ENGINE ')]
if len(idx) != 1: sys.exit('fold 50 refused: J-ENGINE row')
cells = lines[idx[0]].split('|')
cells[2] = " in the engine session (D43): its own terrain and design rounds, then `opus` on Opus 5 per unit with `sol` on Astra only on a recorded reason; the kickoff brief is `/home/user/scaffold/.orkestrel/veneer/j-engine-session-brief.md` and its records sit under `/home/user/scaffold/.orkestrel/veneer/engine/` "
cells[4] = " none for the engine's own branch; a `plugin` row flips to `shipped` only after its family's cascade lands (B-COLLAPSE … B-SCROLLSPY, B-MODAL … B-CAROUSEL); E-IDENTITY for the motion values "
lines[idx[0]] = '|'.join(cells)
s = '\n'.join(lines)
# 4 § Protocol gains the engine subsection before § Carriers
rep("- A re-review of an unchanged clean claim.\n\n## Carriers\n",
    """- A re-review of an unchanged clean claim.

### The engine session

From 2026-09-23 the J-ENGINE campaign runs in a second session (D43), and each session keeps to
these rules:

- The engine session works on its harness-designated branch in Veneer and in scaffold, records that
  name in `/home/user/scaffold/.orkestrel/veneer/engine/plan.md`, and never pushes the baseline
  session's branch. Neither session force-pushes.
- The engine session owns `src/browser/**`, `src/core/**`, `tests/src/browser/**`,
  `tests/src/core/**`, the guide's engine sections, and the Status, Proof, and Obligation cells of
  the § Compatibility rows of kind `engine` and `plugin`; the baseline session owns every other
  file it owns today and adds a `plugin` row (status `accepted`, owner J-ENGINE) per landed family.
  `tests/setup.ts`, `tests/setupBrowser.ts`, `package.json` (the exports map only; no dependency
  enters without the user's ruling), and `README.md` are report-only for both until a landing
  applies a change. `app/**` stays the baseline's until it closes; the showcase wiring of engine
  behaviour is a J-SHOWCASE unit after that.
- Before every landing either session fetches and merges `origin/main` into its branch (a merge
  commit), re-runs its gate chain on the merge result, pushes its branch, then fast-forwards
  `main`; a non-fast-forward push means the other session landed first, so it merges again, re-runs,
  and pushes again. A conflict in `guides/veneer.md` or `ROADMAP.md` is resolved in favour of the
  session that owns the section or row, and `npm run test:guides` and `npm run test:policy` run on
  the merge result before the push.
- Each session runs one `grok` lane at a time on the shared Cursor bench and re-probes an empty lane
  before ruling it dark; the Codex bench's standing condition binds both.
- Each session prunes its own records per the retention reference, with the promotion record in the
  pruning commit; the campaign records of the engine session live under
  `/home/user/scaffold/.orkestrel/veneer/engine/` and nowhere else in that folder.

## Carriers
""")
# 5 § Decisions
rep("and the dispatch carries the recommendation only after the user rules.\n",
    "and the dispatch carries the recommendation only after the user rules. D43 was ruled by the user on\n2026-09-23 and § Rulings and § Protocol › The engine session carry it.\n")
# 6 § Records
rep("  records the landing procedure.\n",
    "  records the landing procedure. The engine session's record lives under\n  `/home/user/scaffold/.orkestrel/veneer/engine/`, with its kickoff brief\n  `/home/user/scaffold/.orkestrel/veneer/j-engine-session-brief.md` beside that folder (D43).\n")
p.write_text(s); print('fold 50 applied')
