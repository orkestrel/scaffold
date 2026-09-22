# CL9 audit round 1 — objective lane brief

## Role and engine

`reviewer` on native Opus 5, clean context. Astra wrote the unit, so you hold the OBJECTIVE lane
(correctness under the shipped cascade and the pinned inventory, rule compliance, test sufficiency,
scope honesty) and the Astra analyst holds the subjective lane. Read the work as work you did not
write. Perform the assignment directly and spawn nothing. You edit nothing and run nothing; you have
no write tools and no shell.

## Objective

Rule on every claim of `C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl9-audit-claims.md` with
CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence (`file:line` or exact text), add any
extra finding that is an implementation defect (numbered after the last claim, with a site and a
one-line failure scenario, distinguishing one that forces a fix round from one that does not), and
end with one terminal line: `Verdict: accept`, or `Verdict: fix round` with the claims that force it.

## A standing instruction about your own evidence

**Every `file:line` you cite must exist in the file you name.** In a recent round this lane confirmed
a claim citing lines four hundred past a file's end, and that confirmation was discarded while the
other lane's refutation stood. Before citing a line, confirm the file is long enough to have it and
that the line says what you claim. A verdict resting on an impossible citation is worth less than no
verdict, because it argues against a lane that read the file.

## Evidence

The Orchestrator rendered the diff over the CL8b landing `8c70787` at
`C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl9-diff.patch` and the status at
`tmp/audit/cl9-status.txt`.

Read those and these files in the live Veneer tree at `C:/Users/mikes/WebstormProjects/veneer`,
which are this round's subject:

- `src/styles/components/_table.scss` (the new partial) and `src/styles/index.scss` (its load)
- `tests/src/styles/components/table.test.ts` (the browser proof)
- `tests/setupStyles.ts` — the case tables, the collector's key tuple and its condition normalizer,
  and `normalizeComplexSelector`, which this unit extended and which `tests/setupConformance.ts`
  imports
- `tests/setupStyles.test.ts` — the bindings and the collector's cases
- `tests/conformance.test.ts` and `tests/setupConformance.test.ts` — the listing and the enumerating
  assertion
- `guides/veneer.md` — this key's selector rows, variable rows, and departure rows
- `app/browser/sections/TableSection.ts`, `app/browser/constants.ts`, `app/browser/Showcase.ts`,
  `app/browser/index.ts`, and the proofs `tests/app/browser/sections/TableSection.test.ts`,
  `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`
- the built `dist/src/styles/index.css`, `tests/fixtures/oracle/inventory.json` as the record, and
  `node_modules/bootstrap/dist/css/bootstrap.css` as the distribution the departures are ruled against

Read `tests/setupConformance.ts` as the machinery the accounting must satisfy and as the importer of
the normalizer this unit changed — never as a file the unit could edit. Read
`src/styles/components/_grid.scss` and `tests/src/styles/components/grid.test.ts` as the pattern the
brief told the unit to follow, and `src/styles/_mixins.scss` for the downward mixin, which this unit
is the first production consumer of.

Read the retained records under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`: the
brief `units/cl9-brief.md`, the terrain record `units/cl9-terrain.md`, the scope read
`units/cl9-scope-read-report.md`, the report `units/cl9-report.md`, and `cl8-audit-verdict.md` with
`cl8b-audit-verdict.md` for the comparison this unit extends.

**The brief deliberately restates no measurement.** The terrain record is the single home for this
key's counts, families, conditions, properties, and boundaries. Where the brief and that record
disagree, the record and the tree win.

**The law lives in the scaffold checkout**: the rule files are under
`C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/` — `styles.md`, `tests.md`,
`architecture.md`, and `names.md` in particular.

Rule on the diff and the live files, never on a report's word alone.

## Where to push hardest

**The downward equivalence, which is this unit's reason for existing.** Claim 3 asks two things:
that the arithmetic is right against the record's own boundaries, and that an opposite direction at
the same number still compares unequal. Rule each. An equivalence that over-matches would silently
accept a condition that selects the complementary set of viewports, which is worse than the gap it
replaced.

**The blast radius of the shared normalizer.** Claim 5 is the one this round most needs ruled. The
unit extended `normalizeComplexSelector`, which the conformance module imports, so the change reaches
every key's presence scan rather than only this key's comparison. Rule whether the new equivalence is
correct in general, whether it preserves quoted and escaped text, whether it leaves other expressions
distinct, and whether any already-shipped key's reading moved. The gates being green is evidence but
not a ruling: say what you checked.

**Whether the responsive reading is genuinely falsifiable.** Claim 7 is the first downward reading in
the package. Rule whether reading computed overflow and attempting a scroll actually distinguishes a
wrapper that applies from one that does not, at each side of the boundary — and whether the
unconditioned wrapper's reading could pass if the breakpoint wrappers were broken.

## Scope of judgment

Implementation only. Report no wording or prose finding. The guide's compatibility, variable, and
departure rows stay in scope as a contract, judged on whether their facts are true of the code.

## Output

The claim table (`Claim | Verdict | Evidence`), the extra findings, one terminal line. No process
diary.
