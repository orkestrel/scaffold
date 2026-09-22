# CL10 audit round 1 — mechanical conformance brief

## Role and engine

`checker` on the native cheap tier, clean context, read-only. You run beside two adversarial lanes
and replace neither. Perform the assignment directly and spawn nothing.

## Objective

Rule on the mechanical claims of
`C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl10-audit-claims.md` — claims 1, 2, 4, 5, 6, 9,
10, 19, 21, 22, and 25 — with CONFIRMED, REFUTED, or UNPROVEN and the exact evidence.

## A standing instruction, and why it is here

**Answer a question of the form "does this tree do X" by searching for X already being done, never by
inspecting the interface that would do it.**

A scope read on this very unit reported that the reduced-motion preference "cannot be driven by the
current setup" after inspecting the browser page interface and finding no media control. The
mechanism exists, is exported by an installed package as `stageMedia`, and is imported by name in
several proofs in this same tree — including one in `tests/src/styles/mixins.test.ts` that reads the
exact collapse the scope read called unreachable. The lane reasoned about which files looked
relevant instead of grepping for the thing itself, and the false finding reached a dispatched unit.

So for every claim below: grep for the population's existing members first. Name the pattern you
searched and the paths it covered, including for a clean result.

## Evidence

- The diff: `C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl10-diff.patch`
- The status: `C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl10-status.txt`
- The brief that fixes the owned and off-limits sets:
  `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl10-brief.md`
- The terrain record, the single home for these keys' measurements:
  `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl10-terrain.md`
- The unit's report: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl10-report.md`
- The live tree: `C:/Users/mikes/WebstormProjects/veneer`, including the built
  `dist/src/styles/index.css`, the record `tests/fixtures/oracle/inventory.json`, and the guide
  `guides/veneer.md`

## What each claim needs

- **Claim 1** — every family the record carries under `icon-link`, `ratio`, and `vr` is emitted by
  the three partials, and nothing beyond. Compare the record's entries against the partials and
  against the built cascade.
- **Claim 2** — the ratio partial drives its named aspects from a loop, not from written-out rules.
- **Claim 4** — `src/styles/_tokens.scss` and `src/core/constants.ts` are unchanged in the diff, and
  `--bs-border-width` is already declared in the token file.
- **Claim 5** — the guide's `### Deferred selectors` table gained no row, and every recorded selector
  under the three keys appears in the built cascade.
- **Claim 6** — the selector prefix in `collectGridVocabulary` admits the three keys and refuses a
  longer name beginning with one of those words. Read the regex and rule on its boundary.
- **Claims 9 and 10** — the three keys are in both enumerations in the position those lists require,
  and the presence-scan machinery in `tests/setupConformance.ts` admits each key on the rows it has.
- **Claim 19** — the showcase specimens in `app/browser/constants.ts` declare no inline `style`
  attribute and use shipped classes only.
- **Claim 21** — the status lists only files the brief owns, and no off-limits path was touched.
- **Claim 22** — the shared-block sweep reports nothing for the three new partials.
- **Claim 25** — the report's account of what shipped matches the diff.

## Output

One ruling per claim with its evidence, then any mechanical defect you found that no claim names,
numbered after the last claim. No terminal verdict line: you advise, you do not rule the round.
