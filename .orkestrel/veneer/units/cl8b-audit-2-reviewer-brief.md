# CL8b audit round 2 — objective lane brief

## Role and engine

`reviewer` on native Opus 5, clean context. Astra wrote the unit and its fixes, so you hold the
OBJECTIVE lane (correctness under the shipped cascade and the pinned inventory, rule compliance, test
sufficiency, scope honesty) and the Astra analyst holds the subjective lane. Read the work as work
you did not write. Perform the assignment directly and spawn nothing. You edit nothing and run
nothing; you have no write tools and no shell.

## Objective

Rule on every claim of `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/cl8b-audit-claims-2.md`
with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence (`file:line` or exact text), add
any extra finding that is an implementation defect (numbered after the last claim, with a site and a
one-line failure scenario, distinguishing one that forces a fix round from one that does not), and
end with one terminal line: `Verdict: accept`, or `Verdict: fix round` with the claims that force it.

## A standing instruction about your own evidence

**Every `file:line` you cite must exist in the file you name.** In round 1 this lane confirmed a
claim citing lines in a test file four hundred lines past its end, and that confirmation was
discarded — the subjective lane's refutation stood, and the defect was real. Before you cite a line,
confirm the file is long enough to have it and that the line says what you claim. A verdict resting
on a citation that cannot exist is worth less than no verdict, because it argues against a lane that
read the file.

## Evidence

The Orchestrator rendered the diff over the CL8 landing `d2c5bb3` at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl8b-diff-2.patch.txt` and the status at
`tmp/audit/cl8b-status-2.txt`; round 1's are at `cl8b-diff.patch.txt` and
`tmp/audit/cl8b-status.txt` for a diff-to-diff reading.

Read those and these files in the live Veneer tree at `C:/Users/mikes/WebstormProjects/veneer`,
which are this round's subject:

- `tests/src/styles/utilities/gap.test.ts` — the corrected density case and the new priority case
- `src/styles/_mixins.scss` — the extracted ramp mixin
- `src/styles/components/_grid.scss` and `src/styles/utilities/_gap.scss` — its two call sites
- `tests/setupStyles.test.ts` — the sweep's folder guard
- `app/browser/constants.ts` and `tests/app/browser/sections/LayoutSection.test.ts` — the derived step
  list
- `src/styles/_tokens.scss` and `src/core/constants.ts` — the step scale and the density factor's
  registration, which decides whether the factor inherits
- `tests/setupBrowser.ts` — the loader the priority case uses and the order a loaded sheet arrives in
- the built `dist/src/styles/index.css`

Read `tests/src/styles/tokens.test.ts` for the case named for the root-versus-subtree distinction,
which is the mechanism round 1's finding rested on.

Read the retained records under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`: the
effective brief `units/cl8b-brief-3.md` with briefs 2 and 1 beneath it; the fix report
`units/cl8b-report-3.md`; and `cl8b-audit-verdict.md` for round 1, whose rulings carry unchanged and
are not reopened.

**The law lives in the scaffold checkout**: `AGENTS.md` at the Veneer root redirects there, and the
rule files are under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/` — `styles.md`,
`tests.md`, `architecture.md`, and `names.md` in particular.

Rule on the diff and the live files, never on a report's word alone.

## Where to push hardest

**Whether the corrected density case now catches what it exists to catch.** Claim 1 asks two things
of it: that its positive control would catch a factor that stopped reaching the specimen, and that
its independence assertions would catch a step scale that started carrying the factor. Rule each
separately. A case that proves the factor arrived but could not see the scale change would be the
same defect wearing a new shape.

**Whether the extraction can change what either partial emits.** Rule claim 3 by reading the mixin
body and both call sites, including whether the grid's offset guard still receives the boundary value
it needs. The instrument is corroboration, not the ruling.

**Whether the priority case is a real test.** Claim 5 rests on a competing rule arriving after the
layered cascade. If it arrives inside a layer, or before, the case restates layer order instead of
testing the priority, and removing the priority would still redden for the wrong reason. Read the
loader and rule what order the sheet actually arrives in.

## Scope of judgment

Implementation only. Report no wording or prose finding. The guide's compatibility and deferral rows
stay in scope as a contract, judged on whether their facts are true of the code.

## Output

The claim table (`Claim | Verdict | Evidence`), the extra findings, one terminal line. No process
diary.
