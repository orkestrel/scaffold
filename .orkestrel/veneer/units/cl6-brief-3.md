# Unit CL6 — brief 3, the hover mechanism settled

Succeeds `units/cl6-brief-2.md`, which with `units/cl6-brief.md` beneath it stays in force for
everything this brief does not name. Both are left unedited.

What changed and why: **you stopped on obligation 1 and you were right to.** The record gives the
hover colour as a resolved triple and shows the specimen's own colour property unchanged between
rest and hover, so it does not state how that colour is produced, and binding a number whose
mechanism you could not name was exactly what the stop condition existed to prevent.

The Orchestrator resolved it by measurement rather than by ruling. This brief carries the answer
so obligation 1 is closed before you start, and everything else in briefs 1 and 2 stands.

## The mechanism, measured

`units/cl6-hover-mechanism.md`, retained beside this brief, carries the full reading; the
instrument is `units/cl6-hover-probe.mjs` and its output `units/cl6-hover-probe.log.txt`. In
short:

Converting the record's rest colours to sRGB and dividing the recorded hover channels by them
gives `0.799` to `0.800` on every channel in both modes, and multiplying each rest channel by
`0.8` reproduces the recorded hover to within the rounding of the record's own decimals.

**So the hover colour is the rest colour at eighty percent in the sRGB space**, which is what
`color-mix(in srgb, <rest> 80%, black)` produces.

Two consequences you must carry into the binding:

1. **The mechanism is the same in both modes.** Elements darkens its anchor on hover in dark mode
   as well as in light. **Veneer today lightens in dark mode**, mixing white into the link base,
   so the divergence is not only the base colour but the direction of the hover shift.
2. **Veneer already uses this mechanism on a different base.** Its light hover is a
   twenty-percent black mix of the link base, the same expression. The retune is therefore a
   change of base, and in dark mode a change of direction, rather than a new mechanism.

## Obligation 1, restated and closed

Do not search the record for the mechanism. Bind:

- The link base to the record's rest expression, which the record states itself: a mix of the
  primary over the canvas text, at seventy percent in light and eighty percent in dark.
- The link hover base to `color-mix(in srgb, var(--vn-link-base) 80%, black)` **in both modes**,
  replacing the white mix the dark theme carries today.

Report the resolved reading of each, in each mode, against the record's rows, and say whether
each lands on the record's value.

## What this does not change

Every other obligation and every stop condition in briefs 1 and 2 stands, and the blast radius is
the one that still matters most. **The dark direction change moves the link-styled button's hover
reading as well as its rest reading**, so brief 2's grant of that proof covers both, and a
consumer outside the owned set moving still stops you.

## Why this unit exists, restated

The user has framed the Content/layout family as the baseline: the source and the proofs,
conformance above all, with Bootstrap fully accounted for and every addition, removal, and change
recorded, so that movement is noticed and a future Bootstrap major can be tracked rather than
guessed at. Read your obligations in that light. **Every selector the key carries ends shipped,
excluded with a recorded reason, or recorded as a departure, and none ends unaccounted for.** A
departure that only a person would notice is not recorded; a departure a scan or a proof catches
is.

## Acceptance criteria, amended

Briefs 1 and 2's criteria stand, with criterion 2 replaced:

- The anchor's rest and hover colours resolve to the record's readings in both modes, each shown
  by a reading you took, with the hover produced by the measured mechanism rather than by a
  number copied from the record.
