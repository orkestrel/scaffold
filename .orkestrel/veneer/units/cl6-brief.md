# Unit CL6 — links

## Role and engine

`sol` on Astra (GPT-6 Astra through `codex exec`, `workspace-write`), the sole writer in the
Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`), at the CL5c landing. Perform the
assignment directly and spawn nothing.

Read before acting: `AGENTS.md` at the Veneer checkout root, `.claude/rules/styles.md`,
`tests.md`, `architecture.md`, `names.md`, `application.md`, `browser.md`, and
`documentation.md`. This unit names no skill.

## Objective

Ship the link component classes Bootstrap's pinned inventory records under its `link` key, bind
the anchor's colours to the calibration record, and add the showcase section that renders them,
so the `link` key reads `shipped` and joins the listed set.

## Terrain and rulings already taken

Two retained records carry what this unit must not re-derive. Read both before editing.

- `units/cl6-scout-report.md` — the terrain map: every selector under the `link` key with its
  declarations, the anchor partial and its opacity expression written out, every link token with
  its value in each mode and whether it is Veneer's or an alias, and what the calibration record
  measured for anchors.
- `units/cl6-retune-measurement.md` — the Orchestrator's reading and the rulings it supports.

## Obligation 1 — find the hover mechanism before binding anything

The record measures the anchor at rest and on hover, and the two computed colours differ. But the
specimen's own colour property is **identical in both states**, so Elements does not produce its
hover colour by reassigning that property. Find the mechanism in the record before you bind a
hover value: a value bound to a reading produced another way reproduces the number and not the
behaviour.

Report what you find as the unit's first measurement, with the record rows behind it. If the
record cannot settle it, say so with the rows you read and bind the rest colour only, recording
the hover as unresolved rather than binding it to a number whose mechanism you could not name.

## Obligation 2 — bind the anchor's colours to the record, and measure the blast radius first

The shipped anchor is not the record's anchor in either mode or either state. The campaign's rule
is that a value the record measures is bound to it, and the record measures this one.

**Measure before you change.** `--vn-link-base` is defined as the primary colour itself, so
retuning it changes what the link token means relative to the primary role. Before editing:

1. Enumerate every consumer of `--vn-link-base`, `--vn-link-rgb`, `--vn-link-hover-base`, and
   `--vn-link-hover-rgb`, and every Bootstrap property Veneer aliases to them.
2. Take each consumer's resolved reading in both modes.
3. Make the change, rebuild, and take the same readings again.
4. Report which moved and which did not, as a before-and-after table.

CL3b is the precedent and the reason: a token that read like a private value turned out to be the
mix anchor for every dark role tier, and only a before-and-after reading caught it. **Stop and
report** if a consumer outside this unit's owned set moves.

## Obligation 3 — ship the link classes

The `link` key's selectors, per the terrain map: the coloured link classes for each role and the
body-emphasis class, each at rest, hover, and focus; the opacity utilities and their hover twins;
the underline offset utilities and their hover twins; the underline colour classes; and the
underline opacity utilities and their hover twins.

Place them in `src/styles/components/_link.scss`, wrapped in `@layer components`, loaded from
`src/styles/index.scss` beside the other component partials. Mirror
`src/styles/components/_type.scss` for file shape.

**The ruling on the role classes.** Bootstrap's coloured link classes use literal channel
triplets for hover and focus rather than reading its hover variable. The campaign's token rules
bar a literal colour outside the token file, so the role classes read Veneer's role tokens in
every state. That is a departure from Bootstrap's own values, and it is a bound for the unit that
owns the guide, not a row this unit writes beyond the compatibility row obligation 5 names.

## Obligation 4 — the opacity variable becomes live, and that needs its own proof

`src/styles/elements/_a.scss` reads `--bs-link-opacity` with an opaque fallback, and nothing in
Veneer assigns it, so the fallback is what applies today. The opacity utilities this unit ships
are the assignments. Shipping them turns a dormant variable into an active one, which changes the
anchor's behaviour as well as adding classes.

Prove that behaviour directly: an anchor under an opacity utility resolves the expected alpha,
and the same anchor without one resolves opaque. The presence scan sees the selector, not the
behaviour, so this proof is owed separately from the scan.

## Obligation 5 — the key ships

Give the `link` key a `selector` row with Status `shipped` in the guide's § Compatibility table,
and add it to `tests/conformance.test.ts`'s `listed` value. The key's inventory `properties`
object carries `--bs-link-opacity` and `--bs-link-underline-opacity`, so unlike CL5's keys this
one is **not** admitted by the empty-properties branch: read `collectShippedComponents` in
`tests/setupConformance.ts` and give the key whatever `variable` rows that function requires, each
`shipped` and each resting on a proof. Update the one ledger-derived case whose population this
moves.

**Write no other guide edit.** Every departure and every explanatory sentence this unit's rulings
imply is a bound for the unit that owns the guide; list them in your report rather than writing
them.

## Obligation 6 — the showcase section

Add `app/browser/sections/LinkSection.ts` with its specimen table and its proof, in the shape the
section implementation carries at that time. **CL5c replaces three near-identical sections with
one implementation before this unit runs**, so read what landed and use it rather than copying a
section file.

## Unknowns

Settle each yourself and record what you chose:

- Whether the underline colour classes and the underline opacity utilities can share a mixin, and
  whether any block this unit writes is shared with a partial already in the folder. CL5b lands a
  standing sweep proof before this unit runs, so a shared block reddens the suite rather than
  reaching an audit; run it before your gate chain.
- How the section divides its specimens, and each specimen's markup.

## Scope

Owned: `src/styles/components/_link.scss` (new) and its proof under
`tests/src/styles/components/`; `src/styles/elements/_a.scss`; `src/styles/_tokens.scss` and
`src/styles/_mixins.scss`, **for the link tokens and their emission alone**;
`src/styles/index.scss`; `tests/src/styles/elements/a.test.ts`; `tests/setupStyles.ts` for the
link case tables and `tests/setupStyles.test.ts` for their cases; `tests/conformance.test.ts` and
`tests/setupConformance.test.ts` where the key's rows move a population;
`app/browser/sections/LinkSection.ts` and its proof, `app/browser/constants.ts`, `index.ts`,
`Showcase.ts`, and the showcase and barrel proofs; `guides/veneer.md` **for the `link`
compatibility rows alone**.

Off-limits: every other partial under `src/styles/`, `src/styles/_reset.scss`,
`tests/setupConformance.ts`, `tests/fixtures/**`, `package.json`, `configs/**`, every vendored
file, and every guide section other than the compatibility rows this unit's key needs. If closing
a criterion needs one, stop and report.

## Execution

1. Obligation 1's measurement, reported before any edit.
2. Obligation 2's before readings, the binding, the after readings.
3. The partial, the barrel load, then `npm run build:src:styles`.
4. The proofs, including obligation 4's behaviour proof and a red proof for one shipped selector.
5. The key's rows and the conformance run.
6. The section and its proof.
7. The shared-block sweep, then the ordered chain from the checkout root:
   `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm test`,
   then the Edge runs of `test:src:styles`, `test:setup:browser`, and `test:app:browser` with
   `PLAYWRIGHT_CHANNEL=msedge`.

## Output

Write `cl6-report.md` in the Veneer checkout and return it: the hover mechanism you
found and the record rows behind it; the blast-radius table, before and after, in both modes;
each selector shipped and where its value came from; the opacity behaviour proof and what it
reads; the red-then-green pair; the variable rows the listed function required and the proof each
rests on; the sweep's result; the guide bounds your rulings imply, listed rather than written;
each step's exit code and final lines on both engines; the actual `git diff --stat` and
`git status --porcelain --untracked-files=all`. Keep it short: what changed, what it reads, what
ran.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle yourself: the partial's internal order;
each case table's shape; the section's specimens. **Stop and report** if the record cannot settle
the hover mechanism, if a consumer outside the owned set moves under the retune, if the listed
function needs a variable row this unit cannot prove, or if closing a criterion needs an
off-limits file.

## Acceptance criteria

1. Every selector the inventory records under the `link` key is present in the built cascade, and
   removing one reddens the presence scan.
2. The anchor's rest colour resolves to the record's reading in both modes, shown by a reading you
   took, and the hover colour either does the same or is recorded unresolved with its mechanism
   named as unfound.
3. The blast-radius table shows every consumer's before and after reading, and no consumer
   outside the owned set moved.
4. An anchor under an opacity utility resolves the expected alpha and one without it resolves
   opaque, proved by a reading.
5. The `link` key reads `shipped` and appears in the listed value, with every row the listed
   function requires.
6. The section mounts, renders every declared specimen, and destroys, proved through the section
   contract.
7. The shared-block sweep reports no shared block.
8. Every gate exits 0 on managed Chromium and Edge.
9. The status lists only the files this brief owns.
