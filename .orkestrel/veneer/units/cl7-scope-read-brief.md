# CL7 scope read — check the brief against the tree before it is dispatched

## Role and engine

`checker` on native Sonnet, clean context, read-only (no write tools, no shell edits). Perform
the assignment directly and spawn nothing.

## Objective

Rule on every row below with `holds`, `amend`, or `unclear`, each with `file:line` evidence, so
CL7's brief is corrected before a writer opens it. A row you rule `amend` names the correct fact;
a row you rule `unclear` names what you could not settle and why.

## The brief under review

`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl7-brief.md`, with its terrain map at
`.orkestrel/veneer/units/cl7-scout-report.md` and the Orchestrator's rulings at
`units/cl7-rulings.md`. Read those for context and rule against the tree.

The subject checkout is `C:/Users/mikes/WebstormProjects/veneer`, whose HEAD is the CL5c landing
`c1c81a4` and whose working tree carries unit CL6's completed change, pending its landing. CL7
starts from exactly that content, so read the working tree as it stands.

**CL6 changed files this brief's subject depends on**: the token file, the anchor partial, the
styles barrel, the styles setup module and its proof, the conformance listing and the conformance
setup proof, and the showcase. **The terrain map predates all of it**, so its line citations will
have shifted and its facts were taken before those changes. Say where the map is now stale rather
than inheriting it silently. Read-only audit lanes are examining the same tree; they write
nothing.

## Rows

1. **The `container` key's shape after CL6.** Confirm the terrain map's reading of the key:
   the three selector groups it names, the two custom properties the entry carries, and that the
   payload widths are not the ramp widths. Name any group the map missed.
2. **What the key needs to be listed.** Read the function deciding which components count as
   shipped and state exactly what rows this key needs, by category and status, quoting the branch
   that decides it. The brief asserts the key is not admitted by the empty-properties branch;
   confirm or correct that against the projected properties list for this key.
3. **The ramp after CL6.** Confirm every media condition the key carries still matches a named
   breakpoint mixin at the same width, and name each mixin's current signature and line. Say
   whether CL6 changed anything in the mixins file that a container partial would read.
4. **The gutter coincidence.** The brief rules that the container widths and the gutter take
   tokens of their own, and requires a blast-radius reading because a space-scale member carries
   the gutter's value today. Name that member, its current value, and **every consumer of it**
   under `src/styles/` and `tests/`. That is the population the unit must measure; name it, do
   not measure it.
5. **The case table and the viewport visitor.** Name the breakpoint case table, its boundaries,
   and the visitor's contract and file, and confirm a container proof can drive a width change
   through them without new machinery. Say whether CL6 changed either.
6. **The section base.** Name the shared specimen section base, its file, what a new section must
   do to use it, and its copy and row types, so CL7's section is written against what landed.
7. **The conformance cases.** Name every case whose population or expectation this key's rows
   would move, and say for each whether it scopes to one component or reads the whole table.
8. **The owned set.** Read the brief's Owned and Off-limits lists line by line against the tree.
   Name any path that does not exist where the brief says it does, **any file the change will
   make false that appears in neither list**, and any Owned entry the change does not need. Rule
   specifically on whether granting the token file and the registry "for the container and gutter
   tokens and their registry leaves alone" is wide enough for what rows 2 and 4 imply, and
   whether the standing shared-block sweep could force a mixins-file edit the brief puts
   off-limits.

## Law

Scaffold's `AGENTS.md`, `.claude/rules/styles.md`, `tests.md`, `architecture.md`, `names.md`,
`application.md`, `browser.md`. Implementation only: report no wording or prose finding, and rule
on no guide row except where row 2 requires naming the rows the listed function reads.

## Output

The row table (`Row | Ruling | Evidence`), then the amendments the brief needs, each as the exact
sentence that replaces the one it corrects. No process diary.
