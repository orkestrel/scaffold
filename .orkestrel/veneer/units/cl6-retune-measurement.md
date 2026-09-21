# The link colour retune, measured

Taken by the Orchestrator from `units/cl6-scout-report.md` and
`research/calibration-content.md`, so CL6's brief carries the decision rather than the question.
The carried bound is CL6's "link map retune" (`cl3-audit-verdict.md` round 1).

## What the record measured and what ships

| Reading | The record's anchor specimen | Veneer's shipped anchor |
| --- | --- | --- |
| Rest colour, light | `oklab(0.3984 -0.019591 -0.190088)` | `rgb(8, 65, 234)` |
| Rest colour, dark | `oklab(0.7458 -0.0728685 -0.0983535)` | `rgb(85, 205, 243)` |
| Hover colour, light | `color(srgb 0.0407929 0.170295 0.538144)`, which is about `rgb(10, 43, 137)` | `rgb(6, 52, 187)` |
| Hover colour, dark | `color(srgb 0.248988 0.580565 0.745237)`, which is about `rgb(63, 148, 190)` | `rgb(119, 215, 246)` |

The specimen's own colour property equals its primary-over-canvas mix: a 70% mix of primary over
the canvas text in light, and an 80% mix in dark. Veneer's rest colour is the primary fill
itself, unmixed, and its hover is a 20% black or white shade of that.

So the shipped anchor is not the record's anchor in either mode or either state, and the
difference is systematic: Elements mixes its link toward the body text and Veneer does not mix at
all.

## The fact that decides the hover mechanism

The record's own custom property **does not change between rest and hover**, while the computed
colour does. So Elements does not produce its hover colour by reassigning that property. CL6 must
find the mechanism in the record before binding the hover value, because binding a hover token to
a reading produced another way reproduces the number and not the behaviour. Name it as the
unit's first measurement.

## The ruling CL6's brief carries

Bind the rest colour to the record, in both modes, the way CL3b bound the muted text and raised
surface tokens. The campaign's rule is that a value the record measures is bound to it, and the
record measures this one.

**The blast radius must be measured before the retune, not after.** `--vn-link-base` is defined
as the primary colour itself, so retuning it changes what the link token means relative to the
primary role. Enumerate every consumer of `--vn-link-base`, `--vn-link-rgb`,
`--vn-link-hover-base`, and `--vn-link-hover-rgb`, and every Bootstrap property Veneer aliases to
them, then take each consumer's resolved reading before and after and show which moved. CL3b's
anchor hazard is the precedent: a token that reads like a private value turned out to be the
mix anchor for every dark role tier, and only a before-and-after reading caught it.

**The utility families are what make the opacity variable live.** The anchor reads
`--bs-link-opacity` with an opaque fallback and nothing in Veneer ever assigns it, so the
fallback is always what applies today. The inventory's opacity and underline-opacity utilities
are the assignments. Shipping them turns a variable that currently does nothing into one that
does, which is a behavioural change to the anchor as well as an addition, and it needs its own
proof rather than riding on the utilities' presence scan.

**Bootstrap's role classes use literal channel triplets for hover and focus** rather than reading
its hover variable. Matching Bootstrap means shipping literals, which the campaign's own token
rules bar outside the token file. Rule it in the brief: the role classes read Veneer's role
tokens in every state, and the departure from Bootstrap's literals is a bound for the guide's
owner.

**Report to the user at the family's acceptance:** Veneer's link colours move to the values the
Elements record measured, so a consumer who matched the previous link colour sees it change.
