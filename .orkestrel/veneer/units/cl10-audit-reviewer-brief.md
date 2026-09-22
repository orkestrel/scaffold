# CL10 audit round 1 — subjective lane brief

## Role and engine

`reviewer` on native Opus 5, clean context. Opus 5 wrote the unit, so the lanes are swapped from the
previous round: you hold the SUBJECTIVE lane (shape, fit, vocabulary, whether the decisions read as
decisions a maintainer can act on) and the Astra analyst holds the objective lane. Read the work as
work you did not write. Perform the assignment directly and spawn nothing. You edit nothing and run
nothing; you have no write tools and no shell.

## Objective

Rule on every claim of `C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl10-audit-claims.md` with
CONFIRMED, REFUTED, or UNPROVEN and the deciding evidence, add any extra finding that is an
implementation defect (numbered after the last claim, with a site and a one-line failure scenario,
distinguishing one that forces a fix round from one that does not), and end with one terminal line:
`Verdict: accept`, or `Verdict: fix round` with the claims that force it.

## Two standing instructions about your own evidence

**Cite every site by its symbol** — the case title, the export name, the selector. Give a line number
only as "currently around N". The tree moves under a landing, and a retained verdict citing a bare
line number names a different site a week later.

**Before confirming any claim about a proof, name the mutation that would make that proof fail**, and
say whether the proof's assertions distinguish that mutation from the passing case. Where you cannot
name such a mutation, the claim is UNPROVEN rather than CONFIRMED. A proof that cannot fail reads
exactly like one that can, and this campaign has twice confirmed one that could not.

## Evidence

The Orchestrator rendered the diff over the CL9 landing `5e011a3` at
`C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl10-diff.patch` and the status at
`C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl10-status.txt`.

Read those and these files in the live Veneer tree at `C:/Users/mikes/WebstormProjects/veneer`,
which are this round's subject:

- `src/styles/components/_icon-link.scss`, `_ratio.scss`, `_vr.scss`, and `src/styles/index.scss`
- `tests/src/styles/components/icon-link.test.ts`, `ratio.test.ts`, and `vr.test.ts`
- `tests/setupStyles.ts` — the collector's selector prefix, `RATIO_CASES`, and `ICON_LINK_MARKUP`
- `tests/setupStyles.test.ts` — the key tuple, the prefix-admission control, the ratio scale binding,
  and the icon-class binding
- `tests/conformance.test.ts` and `tests/setupConformance.test.ts` — the two enumerations
- `guides/veneer.md` — the Helper classes section, the departures, and the compatibility rows
- `app/browser/constants.ts` and the proofs `tests/app/browser/sections/LayoutSection.test.ts`,
  `LinkSection.test.ts`, and `MediaSection.test.ts`
- the built `dist/src/styles/index.css`, `tests/fixtures/oracle/inventory.json` as the record, and
  `node_modules/bootstrap/dist/css/bootstrap.css` as the distribution the departures are ruled against

Read `tests/setupConformance.ts` as the machinery the accounting must satisfy, never as a file the
unit could edit. Read `src/styles/components/_grid.scss` and `_table.scss` with their proofs as the
pattern the brief told the unit to follow, and `src/styles/_mixins.scss` for the transition mixin.

Read the retained records under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`: the
brief `units/cl10-brief.md`, the terrain record `units/cl10-terrain.md`, the scope read
`units/cl10-scope-read-report.md`, and the report `units/cl10-report.md`.

The brief deliberately restates no measurement: the terrain record is the single home for these keys'
counts, families, conditions, and values, and where the brief and that record disagree the record and
the tree win.

The law lives in the scaffold checkout, not in the subject: `AGENTS.md` at the Veneer checkout root
redirects there, and the rule files are under
`C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`, with `styles.md`, `tests.md`,
`architecture.md`, and `names.md` in particular.

## Push hardest on these

- **The partial placement.** Three partials named for their inventory keys, one of them the first
  hyphenated filename in this tree. Judge whether that reads as the convention the tree already
  follows or as a new one, and whether a reader looking for a key finds its file.
- **The departures.** Judge each on its facts being true of the code, not on its wording: the absent
  prefixed backface property against the present unauthored prefixed text-decoration alias, the
  transition reading Veneer's motion tokens rather than the recorded literal, the physical inline
  direction in the shift, and the undefined icon class in the combinator. Ask in particular whether
  a future Bootstrap major moving any of these would surface through what the guide states.
- **The showcase grouping.** The unit put the three specimens into Links, Media, and Layout rather
  than adding a Helpers region, arguing the tree groups by subject. Judge that against what the
  existing sections actually do, and say whether a maintainer adding the next helper key would know
  where to put it.
- **The ratio precision ruling.** This family carries ten decimal places where the grid carries
  eight, and the difference is that the official arithmetic rounds in one and not the other. Judge
  whether the code and its proof state that in a way a later reader would not "fix" into consistency.

## Scope of findings

The user has ruled that audits cover implementation only: report no wording, comment, doc-block, or
guide-prose finding. The one exception is that the guide's compatibility, variable, and departure
rows are in scope as a contract, judged on their facts being true of the code.
