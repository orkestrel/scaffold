# CL5b audit — mechanical lane brief

## Role and engine

`checker` on native Sonnet, clean context, read-only (no write tools, no shell edits). Perform
the assignment directly and spawn nothing.

## Objective

Rule on every claim marked `[mechanical]` in
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/cl5b-audit-claims.md` with CONFIRMED,
REFUTED, or UNDECIDABLE and `file:line` evidence, run the probes below, add any extra finding
that is an implementation defect (numbered after the last claim), and end with one terminal line:
`Verdict: accept` or `Verdict: fix round` with the claims that force it.

**A verifier lane runs the gate chain in this same round, blind to you.** Rule the gate half on
the evidence you have and say plainly that the independent run is not in your slice; do not call
a fix round for its absence.

## Evidence

The rendered diff over the CL5 landing `ea82419` at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl5b-diff.patch.txt` and the status at
`tmp/audit/cl5b-status.txt`; the live Veneer tree at `C:/Users/mikes/WebstormProjects/veneer`;
the retained briefs, scope read, and report under
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/`, read only to learn what the
unit claims. Rule on the tree.

## Probes

- Scope: the status lists only files the two briefs own. `package.json`, `guides/veneer.md`,
  `src/styles/_tokens.scss`, `src/styles/_reset.scss`, `tests/fixtures/**`, `configs/**`, the
  vendored files, and every partial outside the four the extractions touch are absent from the
  diff.
- The manifest: `package.json` is unchanged, and no file the diff touches imports `source-map-js`
  or any package the manifest does not declare. Name every import the changed files add.
- The contract module: compare `tests/setupConformance.ts` before and after in the diff. Name
  every export it had before, confirm each still exists with the same signature, and confirm the
  diff adds exports and types only. Name any existing line the diff changes.
- The mixins: `src/styles/_mixins.scss` gains exactly two mixins, each emitting the declarations
  the claims list and nothing else, and the file still emits no top-level CSS. Each of the four
  consumers includes the right one and retains its own selector and remaining declarations.
- The plants: `src/styles/elements/_address.scss` and `src/styles/components/_quote.scss` are
  absent from the diff and match their content at `ea82419`. Search the source and test trees for
  any residue of the planted custom-property names and report what you find.
- The fixture: the image fixture is exported once from `tests/setupStyles.ts`, both image proofs
  import it, neither declares or inlines a copy, and the export-name assertion carries the name.
- Law sweep over the diff: no `any`, no assertion outside `as const`, no non-null assertion, no
  suppression comment, no `public`/`private`/`protected`, no parameter property, no default
  export, no skipped case, no case named for a control.

## Law

Scaffold's `AGENTS.md`, `.claude/rules/styles.md`, `tests.md`, `architecture.md`, `names.md`,
`workspace.md`. Implementation only: **rule on no guide row and report no prose finding of any
kind.**

## Output

The claim table, the probe readings, the extra findings, one terminal line. No process diary.
