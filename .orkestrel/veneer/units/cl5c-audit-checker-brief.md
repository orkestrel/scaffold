# CL5c audit — mechanical lane brief

## Role and engine

`checker` on native Sonnet, clean context, read-only (no write tools, no shell edits). Perform
the assignment directly and spawn nothing.

## Objective

Rule on every claim marked `[mechanical]` in
`C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl5c-audit-claims.md` with CONFIRMED,
REFUTED, or UNDECIDABLE and `file:line` evidence, run the probes below, add any extra finding
that is an implementation defect (numbered after the last claim), and end with one terminal line:
`Verdict: accept` or `Verdict: fix round` with the claims that force it.

**A verifier lane runs the gate chain in this same round, blind to you.** Rule the gate half on
the evidence you have and say plainly that the independent run is not in your slice; do not call
a fix round for its absence.

## Evidence

The rendered diff over the CL5b landing `4f817db` at
`C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl5c-diff.patch` and the status at
`tmp/audit/cl5c-status.txt`; the live Veneer tree at `C:/Users/mikes/WebstormProjects/veneer`,
including `dist/src/styles/index.css`; the retained briefs and both reports under
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/`, read only to learn what the
unit claims. Rule on the tree.

## Probes

- Scope: the status lists only files the three briefs own. `guides/veneer.md`,
  `tests/setupConformance.ts`, `tests/fixtures/**`, `package.json`, `configs/**`, the vendored
  files, and every partial outside `elements/_mark.scss` and `components/_type.scss` are absent
  from the diff. Name every path in the status and the brief clause that grants it.
- The registry: `src/core/constants.ts` gains exactly two leaves. For each, name its group, its
  value, and confirm the value equals `--vn-` plus the registry path joined with hyphens. Confirm
  no existing leaf changed.
- The mixin: `src/styles/_mixins.scss` gains exactly one mixin, emitting exactly the declarations
  the claims list, and the file still emits no top-level CSS. Both consumers include it and
  declare nothing else for that selector. Confirm the element partial gained the mixin load the
  way its sibling partials carry it.
- The cascade: `dist/src/styles/index.css` emits the same declaration set for the bare mark tag
  and for the mark class. Quote both rules.
- The sections: the three specimen sections each reduce to a constructor delegating to the base,
  each remains an exported name in `app/browser/index.ts`, and `tests/app/browser/index.test.ts`
  carries the base's name in its pinned key set. The button section is absent from the diff.
- The case tables: name the mark table the class's case pins, confirm its readings match what the
  built cascade resolves for the class, and confirm the tag's own table and proof are
  byte-identical to `4f817db`.
- The disjointness: the case that freezes the component case tables asserts every retune value is
  disjoint from every size the default tables carry. Quote the assertion.
- Law sweep over the diff: no `any`, no assertion outside `as const`, no non-null assertion, no
  suppression comment, no `public`/`private`/`protected`, no parameter property, no default
  export, no skipped case, no case named for a control, no plant residue. Search the source and
  test trees for residue of either plant the unit reports.

## Law

Scaffold's `AGENTS.md`, `.claude/rules/architecture.md`, `browser.md`, `application.md`,
`tests.md`, `styles.md`, `names.md`. Implementation only: **rule on no guide row and report no
prose finding of any kind.**

## Output

The claim table, the probe readings, the extra findings, one terminal line. No process diary.
