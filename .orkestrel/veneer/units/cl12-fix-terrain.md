# CL12 fix round — terrain

The single home for this round's measurements. The brief `cl12-brief-2.md` states rulings and
obligations and restates none of this. Where the brief and this record disagree, this record and the
tree win, and the unit stops rather than resolving it.

Taken by the Orchestrator on 2026-09-22 against the CL12 working tree over Veneer `eb1cd71`, or by an
audit lane whose reading the Orchestrator re-derived. Cite each site by its section heading.

## The sentence the cascade falsifies

`guides/veneer.md` § Tokens § Space, border, radius, and elevation, the paragraph immediately after
the new container and gutter table, beginning "The container partial reads each width inside the
`breakpoint-up` mixin".

It says one width caps its own family from its own boundary upward. **The cascade appends**, so each
rule names its own name and every narrower one. Read from the built cascade:

```text
@media (width>=576px){.container,.container-sm{…max-inline-size:var(--vn-container-sm)}
@media (width>=768px){.container,.container-sm,.container-md{…var(--vn-container-md)}
@media (width>=992px){.container,.container-sm,.container-md,.container-lg{…var(--vn-container-lg)}
@media (width>=1200px){.container,…,.container-xl{…var(--vn-container-xl)}
@media (width>=1400px){.container,…,.container-xxl{…var(--vn-container-xxl)}
```

So the narrow container reads its own width **only between 576px and 767px**, and above 1400px it
reads the widest width. A consumer sizing a layout from that sentence expects one number and measures
another.

The subjective audit lane supplied a corrected sentence. Its facts match this reading; take it or write
one that does, and check yours against these five rules rather than against the old sentence:

> The container partial applies each width inside the `breakpoint-up` mixin for the name that width
> carries, and each rule names that name and every narrower one, so a capped container takes the width
> of the widest boundary the viewport has crossed: `.container-sm` reads `--vn-container-sm` from
> 576px, `--vn-container-md` from 768px, and `--vn-container-xxl` from 1400px. `.container-fluid` reads
> no cap.

**Verify the fluid clause before shipping it.** This record has not measured it.

## The half-true justification

`guides/veneer.md` § Tokens § Deferred names, the added sentence saying "these are Veneer's own names
rather than official ones".

The table's first row is `scroll-padding` on the document. That is a standard CSS property, not a name
Veneer coined, so a maintainer testing the stated reason against the first row finds it false.

**The operative fact is true and stronger**: none of those names is in the pinned inventory
`scanCompatibilityPresence` checks against, which is exactly why the § Styles reader would refuse them.
A sweep of `tests/fixtures/oracle/inventory.json` for `scroll-padding` returns nothing.

## What is NOT wrong, so that you do not repair it

- **The nine added token rows.** Every value matches the built cascade and every alias cell is true,
  confirmed by both audit lanes reading the cascade rather than the guide.
- **The corrected compatibility row.** The class paints from the two mark tokens, not the highlight
  aliases, and only that row's obligation text changed.
- **The two deferral subsections' shapes, and the prose explaining why they differ.** Both lanes
  confirmed the shipped prose is true. Only the *report's* impossibility claim is overstated; see the
  next section.
- **The Files rows, the tests links, and the raised-surface replacement.** Confirmed true of the tree.

## Four report corrections this round carries

The guide is right on each of these. The **report** overstates, and a successor reading it would be
misled. Your report carries the corrections; the guide does not change.

1. **Range rows can be checked.** Round 1 claimed a range row cannot be read by a completeness check.
   An audit lane expanded the guide's gray endpoints through the registry and obtained the intervening
   names. The literal rows round 1 added are right; the claim about ranges is wrong.
2. **Grammar unification is not impossible in both directions.** Round 1 conflated changing a table's
   columns with relocating its rows. Converting the unread tokens table to the read table's column
   shape leaves the reader's own section projection identical, so that direction breaks nothing. What
   fails is relocating those rows into the Styles table, which the scanner refuses as outside the
   official inventory, and changing the Styles table's own columns, which removes the owner the reader
   requires. An audit lane ran the conversion in memory and got an identical projection.
3. **The sweep is narrower than "instrument-derived".** One instrument uses a hand-selected probe
   array rather than enumerating claims from the guide. More sharply: the ledger instrument prints a
   row only when an obligation carries both a backticked class and a backticked token, and the
   pre-edit false row carried no token — **so that instrument cannot have produced the finding the
   report credits to it.** The correction itself is true; the account of how it was found is not
   reproducible.
4. **The recommended completeness gate is insufficient, and this one must not propagate.** The
   proposal checks backticked names anywhere inside the tokens section. The mark tokens appear in
   their table rows **and** in prose beside them, so deleting a row leaves the span and the gate
   passes — a gate that cannot fail for the thing it exists to catch. Recommend instead checking the
   table's name cells and their required value, source, and alias columns. The cost line also omits
   the composite rows: four registered tokens appear nowhere in the guide at all, not even backticked,
   because they are written only as a suffix fragment inside a base-name row.

## What this round does NOT touch

- **The two undeclared shorthand conventions** in the tokens section. Carried by the successor that
  lands the completeness gate.
- **The mirror instrument's base-name comparison**, which a moved proof would defeat. Carried by
  whichever unit next runs that sweep.
- **The compatibility table's two granularities.** The cross-cutting unit's.
- **Any prose that is merely plain.** The implementation-over-prose ruling stands; this round corrects
  what is false and nothing else.
