# Terrain brief — B-UTILITIES wave 3: PAINT, TEXT, FONT, SPACING, FLOW, EFFECT (Cursor Grok, read-only)

Route `grok` on Cursor Grok (`grok-4.7-high`), `--mode=ask`, read-only, rooted at `/home/user/veneer`
(the session branch and `main` at `2a3f223`). Perform the reading directly and spawn nothing. Capture
`git status --porcelain` before and after; any change is a deviation. Return evidence with
`file:line` pointers, cite every site by its symbol or heading and a line only as approximate, and
return no raw file dumps, no decisions, no design, and no edits. Never read `dist/`,
`node_modules/bootstrap/dist/`, `tmp/`, or a lockfile. Quote at most twelve lines per site.

## Question

Which facts in the six B-UTILITIES brief drafts no longer hold at `2a3f223`, and what does each
unit touch there? The units and their keys are fixed by
`/home/user/scaffold/.orkestrel/veneer/b-utilities-design-verdict.md` § Units and routing: UTIL-PAINT
(`up`), UTIL-TEXT (`ut`), UTIL-FONT (`uf`), UTIL-SPACING (`usp`), UTIL-FLOW (`ufl`), and
UTIL-EFFECT (`ue`). Their drafts are
`/home/user/scaffold/.orkestrel/veneer/units/b-utilities-{up,ut,uf,usp,ufl,ue}-brief-draft.md`,
written before UTIL-DISPLAY (`47aab1d`), UTIL-PLACEMENT (`ac96f81`), NAVBAR (`009b95a`), and the
specimen band (`5d7f3b9`) landed. The family's record is
`/home/user/scaffold/.orkestrel/veneer/units/b-utilities-family.md` and its terrain
`/home/user/scaffold/.orkestrel/veneer/units/b-utilities-terrain-report.md`. Read the verdict, the
family record, and the drafts first.

## Evidence sought

1. **Stale facts per draft.** For each draft, every stated measurement, path, symbol, count, line,
   base commit, or file-existence claim, checked against the tree at `2a3f223`: holds, moved (give
   the current site), or false (give what the tree says). Name the sentence by its heading and
   opening words.
2. **The sibling pattern.** How UTIL-DISPLAY and UTIL-PLACEMENT shipped their keys at `2a3f223`: the
   partials under `src/styles/utilities/` and their `@use` order in `src/styles/index.scss`, the
   `utility` and `utility-variable` mixins with `$state` in `src/styles/_mixins.scss`, the case
   tables in `tests/setupStyles.ts`, the proofs under `tests/src/styles/utilities/`, the section
   classes and their registration, the capture frames, the Tailwind exclusion line in
   `tests/setup.css` and its fixtures, and the guide rows. Name the files and symbols.
3. **The collision map.** Every file two or more of the six units must write, with the region each
   unit touches (for example the Tailwind exclusion line, `tests/setupStyles.ts`,
   `src/styles/index.scss`, `guides/veneer.md`'s file table and obligation ledger, the section
   order in `app/browser/constants.ts`), so the Orchestrator can scope shared files as
   report-only patches and order the landings.
4. **Files each unit makes false.** For each unit, the tests and fixtures whose assertions its
   landing makes false, found by searching for the keys' existing members.

## Output

Return, as your final message and nothing else: one section per evidence item, each unit's
findings under its own heading, a contradictions list, and an unresolved-inputs list.
