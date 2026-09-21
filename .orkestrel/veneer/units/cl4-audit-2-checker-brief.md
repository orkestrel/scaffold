# CL4 audit round 2 — mechanical lane brief

## Role and engine

`checker` on native Sonnet, clean context, read-only (no write tools, no shell). Perform the
assignment directly and spawn nothing.

## Objective

Rule on every claim marked `[mechanical]` in
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/cl4-audit-claims-2.md` with CONFIRMED,
REFUTED, or UNDECIDABLE and `file:line` evidence, run the probes below, add any extra finding
that is an implementation defect (numbered after the last claim), and end with one terminal
line: `Verdict: accept` or `Verdict: fix round` with the claims that force it.

## Evidence

The rendered diff over the CL3b landing `d822d59` at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl4-diff-2.patch.txt` and the status at
`tmp/audit/cl4-status-2.txt`; the live Veneer tree at `C:/Users/mikes/WebstormProjects/veneer`,
including `dist/src/styles/index.css` and `tests/fixtures/oracle/inventory.json`; the retained
briefs and reports under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/`
(`cl4-brief-7.md` the fix brief over `cl4-brief.md`, `cl4-brief-2.md`, and the rulings `cl4-brief-3.md` to `cl4-brief-6.md`; `cl4-audit-verdict.md` round 1; and
`cl4-report.md` to `cl4-report-6.md`), read only to learn what the unit claims; rule on the tree.

## Probes

- Scope: the round-2 status lists the same paths as round 1 and nothing new; the round-2 diff
  differs from round 1 only in the guide, the mixins partial, the button proof, and the partials
  the fixes and the sweep touched, every one inside the fix brief grant.

- The boundary: no file under src/styles writes a breakpoint width as a literal except the ramp
  in the mixins partial; the fieldset partial loads the mixins and reads the up mixin at xl.

- The mixins: each new mixin lives in the mixins partial, is named for what it emits, and has the
  consumers the claims list; each consumer keeps its own selector and its distinct declarations;
  the mixins partial still emits no top-level CSS; the built cascade declares the same layer
  order as round 1.

- The equivalence: for every consumer of a new mixin, the built cascade emits the same
  declarations in the same order as round 1 does. Compare the two rendered diffs and the built
  file directly; do not take the report table for it.

- The focus case: the button proof carries a case that reads the outline in a focused,
  not-focus-visible state, distinct from the existing focus-visible reading.

- The guide: two departure rows are added beside the existing cell row, and the Compatibility
  table and the deferral table are otherwise unchanged from round 1.

- Law sweep over the round-2 diff: no any, no assertion outside as const, no non-null assertion,
  no suppression comment, no access modifier, no parameter property, no default export, no
  skipped case, no case named for a control, no plant residue.

## Law

Scaffold's `AGENTS.md`, `.claude/rules/styles.md`, `tests.md`, `architecture.md`, `names.md`,
`application.md`, `documentation.md`. The user has ruled that audits cover implementation only:
report no wording or prose finding.

## Output

The claim table, the probe readings, the extra findings, one terminal line. No process diary.
