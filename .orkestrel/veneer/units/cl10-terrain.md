# CL10 terrain — the icon-link, ratio, and vertical-rule keys, measured

The Orchestrator's own reading, taken while CL9's audit was live. The instrument is
`units/cl10-probe.mjs`, run against the pinned record at the CL8b landing. No scout was dispatched:
the probe answers what one would have been asked. **This record is the single home for these
measurements; CL10's brief restates none of them.**

## The three keys

| Key | Entries | Declarations | Properties object |
| --- | --- | --- | --- |
| `icon-link` | 5 | 16 | empty |
| `ratio` | 7 | 14 | `--bs-aspect-ratio` |
| `vr` | 1 | 6 | empty |

Thirteen selector entries in total — the smallest unit of this family. Checked against **every** key
in the record rather than by prefix: **no other key carries any of their selectors**, so each can
join the emitted-vocabulary comparison's tuple on its own account.

### `icon-link`

Families: `.icon-link`; `.icon-link > .bi`, which appears **twice**; `.icon-link-hover:hover > .bi`;
`.icon-link-hover:focus-visible > .bi`.

Declared properties: `align-items`, `display`, `gap`, `text-decoration-color`,
`text-underline-offset`, `backface-visibility`, `fill`, `flex-shrink`, `height`, `width`,
`transform`, `transition`, and the vendor-prefixed `-webkit-backface-visibility` and
`-webkit-text-decoration-color`.

### `ratio`

Families: `.ratio`; `.ratio::before`; `.ratio > *`; and `.ratio-{a}x{b}`, four of them. Its one custom
property is the aspect ratio, so this key needs a shipped variable row where the other two do not.
Declared properties include `padding-top` with a percentage, which is the aspect-ratio mechanism.

### `vr`

One selector, six declarations: `align-self`, `background-color`, `display`, `min-height`, `opacity`,
`width`.

## Three facts that decide the unit

**A condition kind the comparison has never seen.** `icon-link` is recorded under
`@media (prefers-reduced-motion: reduce)`, which is why `.icon-link > .bi` appears twice — once for
its transition and once for the reduced-motion override. Every condition the comparison has handled
so far is a width: the normalizer rewrites minimum widths and, since CL9, maximum widths. **A
preference condition passes through both sides unchanged**, so it compares equal only if Veneer's own
mixin emits the same text the record carries. Confirm that before relying on it, and if the texts
differ the equivalence belongs in the comparison the way the width ones do.

The styles rule also requires that a `transition` declaration never ship without its reduced-motion
pair, so the record's shape and the rule agree here rather than conflicting.

**An undefined class in a combinator, which this campaign has ruled on before.** `.bi` is Bootstrap
Icons' class and nothing in Veneer defines it, exactly as `.navbar` was when CL7 shipped the container
combinators. CL7's ruling stands and applies: **ship the combinator.** Its declarations are
self-contained on the element Veneer does own, and the rule matches nothing until a consumer brings
the icon markup. Record the undefined class as a bound for the guide, as CL7 did.

**Vendor-prefixed properties the record carries.** Two of `icon-link`'s declared properties are
`-webkit-` prefixed. CL8's value-accounting measurement found that class of difference across the
already-shipped keys: the record carries a prefix and the cascade does not. Whether this unit emits
them or records the omission as a departure is the unit's to settle from what the tree already does
for the same class — read the shipped partials before deciding, and record whichever way it goes.

## Routing changes for this unit

The design verdict's unit table routes CL10 to **`opus`**, not to Astra — the first unit of this
family since CL5 to be written natively rather than on the bench. **So the audit lanes swap back**:
Astra holds the OBJECTIVE lane and the Opus reviewer the subjective one, because the auditor must be
an engine that did not write the work.

## The open questions, measured and closed

**The preference condition needs no equivalence work.** Veneer's reduced-motion mixin emits
`@media (prefers-reduced-motion: reduce)` and the record carries that text exactly. Both sides of the
comparison reach `parent.params` through the same parse — the recorded side is built as CSS and
parsed, so the at-rule name is consumed on both — and the whitespace strip then makes them identical.
So this condition kind compares equal without the treatment the width conditions needed.

**The aspect ratios derive, and their precision differs from the column percentages'.** The record
carries `1x1: 100%`, `4x3: 75%`, `16x9: 56.25%`, and `21x9: 42.8571428571%`. Each is the height over
the width as a percentage, so the partial can loop a list of name, width, and height rather than
writing four values out.

**The last one fixes the rounding, and it is not the grid's.** The grid partial rounds to eight
decimal places, which is what the record's column percentages carry. This record's
`42.8571428571%` carries **ten**. A loop copying the grid's arithmetic emits `42.85714286%` and the
comparison reddens on a value the eye would call identical. Compute to the precision the record
carries for this key, and take the scale from the record rather than from the sibling partial.

**The vertical rule needs no new token and reads an alias that already resolves.** Its width reads
the Bootstrap border-width variable, and the token file already declares that variable over Veneer's
own — so the partial reads it directly, which is the established alias pattern. Its background is
`currentcolor` and its opacity a literal `0.25` with no variable in the record. Adding a token for
that opacity would be Veneer's own addition, so it needs the justification CL7 settled for the
container widths — a published scale a consumer retunes — and absent that it stays a literal. The
unit decides and records which.
