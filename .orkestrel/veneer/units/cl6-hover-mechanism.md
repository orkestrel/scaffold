# The anchor's hover mechanism, found

CL6 stopped on the stop condition its brief carried: the calibration record gives the anchor's
hover colour as a resolved triple and shows the specimen's own colour property unchanged between
rest and hover, so the record does not state how the hover colour is produced. The unit was right
to stop rather than bind a number whose mechanism it could not name.

The Orchestrator resolved it by converting the record's values and comparing them, through
`units/cl6-hover-probe.mjs`, whose reading is `units/cl6-hover-probe.log.txt`.

## The reading

Converting the record's rest colours from their recorded form to sRGB, beside its hover colours
as recorded:

| Mode | Rest | Hover |
| --- | --- | --- |
| light | `0.051055 0.212846 0.672640` | `0.040793 0.170295 0.538144` |
| dark | `0.311424 0.725670 0.931488` | `0.248988 0.580565 0.745237` |

Per channel, hover divided by rest:

| Mode | Red | Green | Blue |
| --- | --- | --- | --- |
| light | `0.79900` | `0.80009` | `0.80005` |
| dark | `0.79951` | `0.80004` | `0.80005` |

Multiplying each rest channel by `0.8` reproduces the recorded hover to within `1.51e-4`, which
is the rounding of the record's own decimals.

## The mechanism

**The hover colour is the rest colour at eighty percent in the sRGB space**, which is exactly
what `color-mix(in srgb, <rest> 80%, black)` produces: mixing with black at that weight scales
each gamma-encoded channel by the weight and adds nothing.

Two consequences decide CL6's binding.

**The mechanism is the same in both modes.** Elements darkens its anchor on hover in dark mode as
well as light. Veneer today lightens in dark mode, mixing white into the link base, so the
divergence from the record is not only the base colour but the direction of the hover shift.

**Veneer already uses this mechanism, on a different base.** Its light hover is a twenty-percent
black mix of the link base, which is the same expression. So the retune is a change of base and,
in dark mode, a change of direction, rather than a new mechanism.

## What this settles for CL6

The record's rest colour is stated by the record itself as a mix of the primary over the canvas
text, at seventy percent in light and eighty percent in dark. The hover colour is that rest
colour at eighty percent in sRGB, in both modes.

So the binding is: the link base takes the record's rest expression, and the link hover base
takes `color-mix(in srgb, var(--vn-link-base) 80%, black)` in both modes, replacing the
white mix the dark theme carries today.

The blast-radius obligation is unchanged and still stops the unit: the link-styled button reads
both tokens, and the dark direction change moves its hover reading as well as its rest reading.
