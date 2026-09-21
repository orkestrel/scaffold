# Unit CL5c — one specimen section, and the class twins that disagree with their tags

## Role and engine

`opus` on native Opus 5, the sole writer in the Veneer checkout
(`C:/Users/mikes/WebstormProjects/veneer`), at the CL5b landing. Perform the assignment directly
and spawn nothing.

Read before acting: `AGENTS.md` at the Veneer checkout root, `.claude/rules/architecture.md`,
`browser.md`, `application.md`, `tests.md`, `styles.md`, and `names.md`. This unit names no skill.

## Why this unit exists

CL5's audit found two implementation defects its own scope barred it from closing. Both lanes
ruled each real, and the checker agreed the scope bar was legitimate rather than an evasion. This
unit owns the files that were off-limits then.

## Obligation 1 — the three specimen sections share one body

`app/browser/sections/ContentSection.ts`, `TypeSection.ts`, and `MediaSection.ts` are identical
apart from the copy object and the specimen table each reads: each creates a section element,
sets its label, appends a lead paragraph, appends one element per specimen row, and removes the
region on destruction. `AGENTS.md` § TTTDD routes repeated behaviour through one shared
implementation, and `.claude/rules/architecture.md` centralizes it.

Replace the three with one implementation. Settle the shape yourself: one class taking its copy
and its table, or one shared base the three extend. Whichever you choose, the showcase keeps
constructing and destroying the same regions in the same order, every existing case in the three
section proofs keeps passing, and the barrel keeps exporting whatever a consumer could already
reach. `ButtonSection` is a different shape, carrying engines and a class grid; leave it alone
unless your shape genuinely fits it, and say which you decided and why.

## Obligation 2 — the class twins that disagree with their tags

CL5's heading ruling is that a class twin must not disagree with its own tag on the same page,
because Bootstrap builds those classes by extending the tags. The audit found the same reasoning
applies to the mark pair and was not applied there.

`units/cl5-twin-measurement.md`, retained beside this brief, carries the Orchestrator's reading
of the calibration record and the ruling it supports. Read it before touching either partial. In
short: Elements sets its own mark tokens to the CSS system colours, the record's computed rows
are the user-agent highlight those resolve to, and Veneer's tag reproduces that exactly, so the
tag is right and the class is the side that departs.

**The ruling.** `.mark` declares the system colours the record measured, plus the tag's inline
padding, so an element carrying the class renders as the tag does. It does not simply drop its
paint: the user-agent highlight rule reaches the `mark` element alone, so an unpainted class on a
span gives no highlight and the twin still disagrees. Prove the twin by comparison, in the form
CL5's heading cases already take: mount the tag and a span carrying the class in one host and
assert the rendered paint and padding equal.

Then rule the two weaker pairs the audit raised, each with a reading you take:

- **The caption pair.** The class reads `--bs-secondary-color` and the tag reads `--vn-text-muted`
  through the caption mixin. Bootstrap does style its bare caption element, so this pair is not
  the mark pair's kind of defect. Measure both resolved values. If they resolve alike, bind them
  to one token and pin it. If they differ, leave both and say what each is bound to.
- **The figure pair.** The class sets an inline-block display while the tag sets a flex column
  with a gap, so on a figure element carrying the class the direction and the gap apply to a box
  that is no longer flex. It is inert as shipped. Read the residual gap in the figure case so a
  later change giving the class a flex or grid display reddens instead of silently re-arming it.

## Obligation 3 — two proof-integrity gaps from CL5's round 2

Both came from the subjective lane, neither forced a round, and both sit in files you already own.

1. **The retune tables carry an invariant nothing asserts.** `tests/setupStyles.ts` holds two
   tables pairing each heading and display level with the token that level names, and each row's
   retune value discriminates only because it differs from every size that level resolves by
   default. `tests/setupStyles.test.ts` pins the level-to-token pairing and not that difference.
   So a later editor setting a retune value to a level's own default silently disarms the whole
   matrix with nothing red. Assert the retune values are disjoint from the sizes the default
   tables carry, in the case that already freezes those tables.

2. **The colour control shares a case rather than owning one.**
   `tests/src/styles/components/type.test.ts` now mounts two hosts in one case and proves two
   subjects: the tag-and-class agreement on size, line, weight, and margin, and the delivery of
   an explicit heading colour. An earlier assertion failing hides the colour reading entirely,
   and a colour regression reports under a case whose subject is size. The element proof one
   directory over gives the identical control its own case. Give the painted host its own case
   reading colour alone, and leave the agreement case to its own subject.

## Scope

Owned: `app/browser/sections/ContentSection.ts`, `TypeSection.ts`, `MediaSection.ts`, and any new
file the shared shape needs under `app/browser/`; `app/browser/types.ts`, `index.ts`, and
`Showcase.ts` where the shape requires; `tests/app/browser/sections/*.test.ts`,
`tests/app/browser/Showcase.test.ts`, and `tests/app/browser/index.test.ts`;
`src/styles/elements/_mark.scss` and `_figure.scss`; `src/styles/components/_type.scss` and
`_image.scss`; `tests/src/styles/elements/mark.test.ts` and `figure.test.ts`;
`tests/src/styles/components/type.test.ts` and `image.test.ts`; `tests/setupStyles.ts` for the
case tables those proofs read.

Off-limits: `guides/veneer.md` — every guide row this unit's rulings imply is a bound for the
unit that owns the guide, and this unit writes none. Also `src/styles/_tokens.scss`,
`_mixins.scss`, `_reset.scss`, every other partial, `tests/setupConformance.ts`,
`tests/fixtures/**`, `package.json`, `configs/**`, and the vendored files. If closing a criterion
needs one, stop and report.

## Execution

1. Obligation 1, then the app proofs.
2. Obligation 2's mark ruling, then `npm run build:src:styles`, then the mark and type proofs
   with the comparison case.
3. The caption and figure readings, then their proofs.
4. The ordered chain from the checkout root: `npm run format:check`, `npm run lint:check`,
   `npm run check`, `npm run build`, `npm test`, then the Edge runs of `test:src:styles`,
   `test:setup:browser`, and `test:app:browser` with `PLAYWRIGHT_CHANNEL=msedge`.

## Output

Write `cl5c-report.md` in the Veneer checkout and return it: the shared shape you chose
and why, with the file that now holds it; every case that kept passing unedited; the mark pair's
before and after readings and the comparison case that pins them; the caption and figure readings
and what you ruled; the guide rows your rulings imply, listed for the guide's owner rather than
written; each step's exit code and final lines on both engines; the actual `git diff --stat` and
`git status --porcelain --untracked-files=all`. Keep it short: what changed, what it reads, what
ran.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle yourself: the shared section shape and its
name; where the comparison case sits; how the residual gap is read. **Stop and report** if the
shared shape cannot keep every existing section case passing, if the mark comparison cannot be
made to fail on a divergence, or if closing a criterion needs a file this brief does not grant.

## Acceptance criteria

1. One implementation carries the specimen section behaviour, the three sections no longer repeat
   it, and every existing case in their proofs passes with no expectation edited.
2. The showcase constructs and destroys the same regions in the same order, proved by the case
   that already asserts the region sequence.
3. An element carrying the mark class and the bare mark tag render the same paint and padding,
   proved by a comparison in one host, and a divergence reddens it.
4. The caption pair is bound to one token or its difference is recorded in the report with both
   readings.
5. The figure case reads the residual gap.
6. The frozen-table case asserts the retune values are disjoint from every default the sibling
   tables carry, and setting one retune value to its level's default reddens, recorded red then
   green.
7. The painted colour host has its own case reading colour alone.
8. `guides/veneer.md` is absent from the diff.
9. Every gate exits 0 on managed Chromium and Edge.
10. The status lists only the files this brief owns.
