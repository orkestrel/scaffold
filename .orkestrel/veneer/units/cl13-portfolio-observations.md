# CL13 — the Orchestrator's own reading of the Veneer side

Taken 2026-09-22 against the CL12 landing `a04fb7c`, before any verdict lane saw the portfolio.

`.agents/skills/orkestrel-polish-surface/SKILL.md` requires this: build the portfolio, then eyeball
every artifact yourself before spending a verdict round on it, because an unexamined portfolio buys
harness bugs at verdict prices. These are the readings that pass produced. Each becomes a numbered
confirm-or-refute candidate in the verdict brief rather than staying in the Orchestrator's head.

## What the Veneer side is

32 frames under `tmp/capture/states/` for the four Content/layout keys, produced by the journey
suite's capture run rather than a spawned harness. Every one already passed the pixel-variation guard
CL11 built, so none is blank.

Eight state names — four keys, each with a dark twin — across four variant projects.

## Reading 1: 32 frames, 14 distinct

The same state at the same width is **byte-identical** across the two projects that fix that width.
`container-capped-rest--light-1280` and `container-capped-rest--dark-1280` share one digest; so do the
390 pair, and so does every other key.

This is structural rather than a defect: each variant project runs every case, and a project's own
theme does not change a state that applies its own mode. It halves the portfolio's information — 32
files carrying 16 state-by-width combinations — and a lane counting frames rather than digests would
overstate the evidence.

**Expected distinct: 16. Actual: 14.** The two missing are reading 2.

## Reading 2: the link key's frames are width-invariant

`link-role-rest` at 1280 and at 390 share a digest, and so do its dark twins. Every other key differs
across widths.

By the capture registry's own duplication ruling — a frame that would duplicate another frame is not
registered — one of each pair is redundant as registered.

## Reading 3: the link frame shows one anchor of nine

Frame dimensions, read from each PNG's own header:

| State | at 1280 | at 390 |
| --- | --- | --- |
| `container-capped-rest` | 1140×21 | 390×21 |
| `row-numbered-rest` | 1280×21 | 390×42 |
| `link-role-rest` | 73×19 | 73×19 |

The container frame **shows its own subject**: 1140 wide inside a 1280 viewport is the cap, and 390
wide at 390 is the uncapped case. The row frame shows its subject too: the height doubles at 390
because the columns stack.

The link frame shows neither, and 73px is the reason. The key's selector is `.link-primary`, so the
specimen reader matches the **first anchor**, and the lift copies that one element. The specimen's
markup carries nine role links; the frame carries one.

For the key's declared property — `color` — the frame is sufficient, and the journey asserts that
property on the copy. As a **portfolio item** it shows a ninth of its subject, which is what a verdict
lane comparing against Bootstrap's role palette would be looking at.

This also explains reading 2: an inline anchor 73px wide does not reflow between 1280 and 390, so its
two registered widths cannot differ.

## What these readings are, and are not

None is a defect in the shipped cascade. The keys ship correctly and their proofs pass; CL11's round 2
confirmed each key's assertions distinguish a named mutation.

They are defects in **what the portfolio can show a reviewer**, which is the subject CL13 exists to
judge. Reading 3 is the substantive one: a lane asked whether Veneer's link roles match Bootstrap's
cannot answer it from a frame showing one role.

## Carried into the verdict brief

Each becomes a numbered candidate the lanes confirm or refute against the portfolio, not a finding the
Orchestrator asserts. A candidate the lanes refute dies on the record with the evidence that killed it.
