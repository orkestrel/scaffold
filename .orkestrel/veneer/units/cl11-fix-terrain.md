# CL11 fix round — terrain

The single home for this round's measurements. The brief `cl11-brief-2.md` states rulings and
obligations and restates none of this. Where the brief and this record disagree, this record and the
tree win, and the unit stops rather than resolving it.

Every reading was taken on 2026-09-22 against the CL11 working tree over Veneer `0e0b055`, by the
Orchestrator or by an audit lane whose reading the Orchestrator re-derived. Cite each site by its
symbol; the line numbers move.

## The capture layer has no assertion that a frame shows what it claims

This is the round's subject. Three of the four forcing findings are facets of it.

### What the unit shipped, and what it does not do

The cascade journey case reads each key's declared property on the showcase specimen and again on the
lifted copy it photographs, and asserts the two lists agree before anything else. That comparison:

- compares **one declared property per key**, so a copy differing in anything else — the box the lift's
  bare wrapper gives it, an inherited background, a width the section shell was constraining —
  photographs unchallenged;
- **cannot see a blank frame at all.** A blank frame resolves the same computed value as a painted one,
  so no mutation of the frame's pixels reddens it;
- runs **after** every placement call, so in a capture run the frames are already written when it is
  evaluated. The protection is that the run goes red, not that the file is withheld.

**The mutation that defeats it**, named by the objective lane: change the capture target from the
lifted copy back to the offscreen specimen. Every reading is unchanged and the blank-frame condition
returns.

### The guard is reachable with what is already installed

The unit recorded this as irreducible, and that record is false. Both audit lanes read the installed
source independently and agree:

- the portfolio's `place` method **returns the written absolute path**;
- `createPortfolio` records that same absolute path in its `paths` collection;
- the installed `readFrame` export documents that exact path as its input, and its own doc block warns
  that the runner's read command resolves a **relative** path against its own root rather than against
  the calling test file, so a relative path names a file somewhere else.

The unit passed the portfolio's relative `directory` string — the input that doc block names as wrong.
No base path is missing. The consumer that already holds the absolute paths is the capture-only case
that reads the portfolio's `paths`.

**One constraint the objective lane adds:** reading a frame's dimensions and its bottom row does **not**
establish non-blank content. The assertion has to sample the image and has to be proven against a blank
control. Blank probe frames are retained under `tmp/probe/` from the unit's own strategy probe —
`plain--`, `scrolled--`, `staged--`, `wrapper--` are blank and `lifted-table--`, `lifted-link--` carry
content — so a control exists without manufacturing one.

### Two registered dark twins rest on paint nothing reads

The cascade case asserts the table's border colour and the link's colour **differ** between modes, which
is what earns those two keys their dark twins. For the container and the row it asserts the **opposite** —
that the layout reading is identical in both modes — so no assertion would catch a dark twin identical
to its light frame.

The twins are distinct today: their ground and text move with the theme, confirmed by eye from the
retained frames. That distinctness rests on a paint no assertion reads.

## The restore-refusal case leaks the viewport it proves is restored

Verified first-party. In `tests/setupBrowser.test.ts`, the case
`keeps the reading failure when the restore is refused, and carries the refusal as its cause` drives a
refused restore, which leaves the viewport at the visited width by design. It then asserts, in order,
the rejection's shape, the recorded sizes, and the window's width — and **only after all three** puts
the viewport back.

Any of those assertions rejecting skips the restore. Every following case in the file then runs at the
visited width, including the case that reads the original width back.

The case proving the visitor restores on failure does not restore on its own failure. The correction is
the one the visitor itself now uses: put the restoration where it runs whatever happens.

## The cascade state assertion forbids a legitimate second key

In `tests/setup.test.ts`, the case
`registers one light state per photographed cascade key, and no dark twin among them` checks uniqueness
of each state name's **first hyphen-separated segment**. So a future `container-fluid-rest` collides
with `container-capped-rest`, though they are different specimens rendering different treatments.

Per-key uniqueness is already enforced correctly one case earlier, by the specimen and selector
uniqueness assertions over the key table. The segment check adds a restriction its own stated reason —
a second frame of the same specimen at rest — does not describe.

No such key exists today, so nothing is red.

## Two false statements in the retained report

Both are record defects. The tree is correct; the report is not. They are corrected at retention with a
header, not by editing the report's body.

- **The byte-identity measurement is false.** The report states the home frame and a Button rest frame
  are byte-identical at 1280 and gives one digest for both. Measured: the files differ in size
  (423113 against 423121), in digest, and in pixel height (8204 against 8205), and neither carries the
  digest the report states. The objective lane adds that the dark pair at 1280 **does** match while the
  390 pair does not, so the claim is false as a universal even where one pair holds.

  **The ruling that measurement was cited for survives.** Both frames do show the same resting page, so
  a page frame for a new state would duplicate an existing frame. Only the evidence offered for it was
  wrong.
- **The changed case title is in the wrong file.** The report places it in the Button-family section
  proof; it is in the browser setup proof. The Button-family proof carries the rename's call sites and
  nothing else, which is narrower than the report describes and within scope either way.

## What this round does NOT touch

- **The "specimen" term collision.** The fixture registry and the showcase's declared specimens share
  one word on one module's public surface. Closing it renames call sites across files this round does
  not own. Carried by the unit that next owns the browser setup module.
- **The Button-family duplicate frame.** A Button-family row whose subject this unit does not own.
  Carried into CL13's portfolio assessment.
- **The fluid container reading.** It asserts a value any unclassed element reads, and the shipped rule
  declares no maximum inline size, so it cannot fail for any change to that rule. It works as a control
  on the capped container's cap. Recorded as a bound; no change is owed.
- **The shipped package.** Every defect this round closes is in the proof layer.
