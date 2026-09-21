# CL5 audit — mechanical lane brief

## Role and engine

`checker` on native Sonnet, clean context, read-only (no write tools, no shell edits). Perform
the assignment directly and spawn nothing.

## Objective

Rule on every claim marked `[mechanical]` in
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/cl5-audit-claims.md` with CONFIRMED,
REFUTED, or UNDECIDABLE and `file:line` evidence, run the probes below, add any extra finding
that is an implementation defect (numbered after the last claim), and end with one terminal line:
`Verdict: accept` or `Verdict: fix round` with the claims that force it.

**A verifier lane runs the gate chain in this same round, blind to you.** Rule the gate half of
claim 10 on the evidence you have and say plainly that the independent run is not in your slice;
do not call a fix round for its absence.

## Evidence

The rendered diff over the CL4b landing `5240e36` at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl5-diff.patch.txt` and the status at
`tmp/audit/cl5-status.txt`; the live Veneer tree at `C:/Users/mikes/WebstormProjects/veneer`,
including `dist/src/styles/index.css` and `tests/fixtures/oracle/inventory.json`; the retained
briefs and reports under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/`
(`cl5-brief.md`, `cl5-brief-2.md`, `cl5-report.md`, `cl5-scope-read-report.md`), read only to
learn what the unit claims. Rule on the tree.

## Probes

- Scope: the status lists only files the two briefs own, plus the one declared exception
  `tests/app/browser/index.test.ts`. Confirm that file's whole change is the added barrel names
  and nothing else. Confirm `src/styles/elements/**`, `src/styles/_reset.scss`,
  `src/styles/_tokens.scss`, `src/styles/_mixins.scss`, `tests/setupConformance.ts`,
  `tests/fixtures/**`, `package.json`, `configs/**`, and the vendored files are absent from the
  diff.
- The keys: for every key the claims list, every selector the pinned inventory records under it
  appears in `dist/src/styles/index.css`, allowing for the canonicalization that folds a legacy
  pseudo-element spelling. Name any inventory selector under those keys that is absent.
- The guide: each of those keys has one `selector` row with Status `shipped` in § Compatibility,
  and `tests/conformance.test.ts`'s `listed` value lists exactly the components whose rows are
  all `shipped`. Compare the two sets and report any mismatch in either direction.
- The layer: every rule in the four new partials sits inside `@layer components`; the layer order
  line in `_tokens.scss` is unchanged; `src/styles/index.scss` loads each new partial once.
- The values: for each selector the four partials emit, compare the emitted declarations with
  Bootstrap's own line in `node_modules/bootstrap/scss/`. Report every difference, and say for
  each whether the guide records it as a departure.
- The controls: each of the three section proofs carries a literal name list and a literal markup
  list, and each list matches its specimen table element by element.
- The sweep: the component folder holds exactly the five partials the claims name.
- Law sweep over the diff: no `any`, no assertion outside `as const`, no non-null assertion, no
  suppression comment, no `public`/`private`/`protected`, no parameter property, no default
  export, no skipped case, no case named for a control, no plant residue.

## Law

Scaffold's `AGENTS.md`, `.claude/rules/styles.md`, `tests.md`, `architecture.md`, `names.md`,
`application.md`, `documentation.md`. The user has ruled that audits cover implementation only:
report no wording or prose finding.

## Output

The claim table, the probe readings, the extra findings, one terminal line. No process diary.
