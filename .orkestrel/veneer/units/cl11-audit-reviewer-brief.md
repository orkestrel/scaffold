# CL11 audit round 1 — subjective lane brief

## Role and engine

`reviewer` on native Opus 5, clean context. Opus 5 wrote the unit, so the lanes swap: you hold the
SUBJECTIVE lane (shape, fit, vocabulary, whether the decisions read as decisions a maintainer can act
on) and the Astra analyst holds the objective lane. Read the work as work you did not write. Perform
the assignment directly and spawn nothing. You edit nothing and run nothing; you have no write tools
and no shell.

## Objective

Rule on every claim of `C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl11-audit-claims.md` with
CONFIRMED, REFUTED, or UNPROVEN and the deciding evidence, add any extra finding that is an
implementation defect (numbered after the last claim, with a site and a one-line failure scenario,
distinguishing one that forces a fix round from one that does not), and end with one terminal line:
`Verdict: accept`, or `Verdict: fix round` with the claims that force it.

## Two standing instructions about your own evidence

**Cite every site by its symbol** — the case title, the export name, the state name. Give a line
number only as "currently around N".

**Before confirming any claim about a proof, name the mutation that would make that proof fail**, and
say whether the proof's assertions distinguish that mutation from the passing case. Where you cannot
name such a mutation, the claim is UNPROVEN rather than CONFIRMED.

## Evidence

The Orchestrator rendered the diff over the CL10 landing `0e0b055` at
`C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl11-diff.patch` and the status at
`C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/cl11-status.txt`.

Read those and these files in the live Veneer tree at `C:/Users/mikes/WebstormProjects/veneer`:

- `tests/setup.ts` and `tests/setup.test.ts` — the state table and the portfolio derivation
- `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts` — the reworked visitor, the renamed reader,
  the duplicate-name refusals, and their cases
- `tests/app/browser/integration.test.ts` — the journey that reaches the new states
- `tests/distribution.test.ts` — the consumer page's new drive
- `tests/app/browser/sections/ButtonSection.test.ts` — the rename's call sites
- `configs/app/vite.journey.config.ts` and `vite.config.ts` — the variant projects and the capture flag

Read the retained records under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`: the
brief `units/cl11-brief.md`, the measurements `units/cl11-terrain.md`, the scope read
`units/cl11-scope-read-report.md` that held the brief, and the report `units/cl11-report.md`.

The brief deliberately restates no measurement: the terrain record is the single home for them, and
where the brief and that record disagree the record and the tree win.

The law lives in the scaffold checkout: `AGENTS.md` at the Veneer checkout root redirects there, and
the rule files are under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`, with `tests.md`,
`names.md`, `application.md`, and `architecture.md` in particular.

## Push hardest on these

- **The seam.** The visitor gained a third parameter so a refused restore can be driven. Judge whether
  that reads as a seam the design would have welcomed anyway — `.claude/rules/tests.md` § Untestable
  usually means missing seam is the rule — or as a parameter added to satisfy a test and carried by
  every caller forever. Its default keeps existing callers working, including in files this unit does
  not own; judge whether that is a kindness or a hidden coupling.
- **The state table's shape.** The registry gained a table with a state, a specimen, an element, and a
  property per row, and the portfolio list is derived from it. Judge whether a maintainer adding the
  next key would know what to put in each column, and whether the table earns being a table rather
  than a list of names.
- **The lifted-copy photography.** The journey copies a specimen, prepends the copy to the document,
  shoots it, and removes it, because an element frame at the specimen's own position comes back blank.
  Judge whether that reads as a deliberate technique with its reason recorded, or as a workaround a
  later reader would undo. The unit guards it by asserting the copy resolves what the specimen
  resolves before placing.
- **The rename's vocabulary.** `resolveButton` became `readButton` beside an existing
  `readOracleButton`. Judge whether the pair now reads as one vocabulary, and whether the specimen
  reader that gained the same refusal belongs in that family.
- **The three open items.** The unit left a Button-family duplicate frame registered rather than
  struck, shipped no permanent blank-frame guard, and did not explain why element frames go blank.
  Judge whether each is recorded where a reader meets it, which is what the seam rule requires of a
  genuinely irreducible gap.

## Scope of findings

The user has ruled that audits cover implementation only: report no wording, comment, doc-block, or
guide-prose finding.
