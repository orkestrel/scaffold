# Frontend Design

> Part of the `enterprise-bootstrap` package. Aesthetic, hierarchy, spacing,
> typography, color, depth, imagery, process, and copy — use when setting visual direction.
> Operate layer: [SKILL.md](../SKILL.md).

Give the surface a point of view rooted in its subject. Make the person's task clear before making
the frame distinctive. Preserve an established identity; take a justified aesthetic risk only where
the brief leaves room. Never trade readability, familiar behavior, or honest content for novelty.

## Ground it in the subject

Name the subject, the audience, and the screen's single job. Inspect the existing product, its
content, and its design system before choosing a direction. Use prior designs and preferences as
hints, not templates. Draw character from the subject's materials, instruments, artifacts, and
vernacular rather than an unrelated visual trend.

Set personality through four levers — typeface, primary color, corner-radius family, and copy
register — chosen from the audience and subject, then held on every screen. A neutral sans-serif
and a small radius are deliberate neutrals, not missing decisions; a serif reads classic, a
rounded sans or large radius playful, no radius formal. Keep one radius family per product: pill
buttons beside square cards read as two products. Take the register from what the audience
already uses, not from a competitor's interface. In an existing product these levers are set;
carry them forward.

Start with the smallest useful feature: what the person needs to see, enter, decide, and do next.
Compose that interaction with realistic content before choosing its navigation shell. Reuse a shell
that already works; do not redesign it to avoid a local layout decision. Build the simple working
flow first, then refine it and take the next feature. Never imply functionality that is not built.

## Design principles

### Hierarchy before decoration

Name the primary information, supporting context, and ancillary detail in each task region. Make
that order readable without color: use placement, grouping, weight, and spacing before adding
paint. When the primary element does not stand out, quiet its competitors before enlarging it.

Carry hierarchy with two or three foreground tiers and two weights before reaching for size;
size alone produces oversized primary text and unreadable secondary text. Use a regular body
weight (400) and one emphasis weight (600–700); weights under 400 belong only at display sizes.
Quiet a heavy element by lowering its contrast — an icon beside a label takes the secondary tier
rather than the label growing — and strengthen a faint one with weight or width, not a darker
color. On a colored fill, inherit its tested foreground first. Use a scoped opaque same-hue tier only
when another readable tier is needed; do not import a neutral grey blindly or reduce opacity. Take the
measured tiers from [color-modes.md](color-modes.md) → Text tiers. Keep information-bearing marks
above the contrast bar in [SKILL.md](../SKILL.md) → Surfaces, color, contrast.

Pick heading elements for document structure and size them for their visual job. A page's `h1` need
not be its largest text; a section title usually supports the content and can be small, or present
only for assistive technology. Adapt the heading levels in component examples to the host page,
never the other way around.

Treat labels on **displayed data** as supporting content. Omit a redundant label only when format
and context still identify the value; combine label and value where that reads more naturally.
Keep labels, units, timeframes, and comparison bases where values would otherwise be ambiguous.
Emphasize the label instead when the task is to scan for a named property. Never apply label
removal to form controls or accessible names.

Give each active task region at most one dominant action. Make secondary actions clear but quieter,
and tertiary actions discoverable without competing. Destructive describes consequence, not rank:
keep a row-level delete quiet; give the final destructive commit the strong danger treatment when
the confirmation ladder calls for one. Take implementations from [SKILL.md](../SKILL.md) →
Hierarchy & actions; a readable outline is not forbidden, and a solid fill is not proof of contrast.

### Space, grouping, and width

Start with generous space, then remove it until the task's density is right. Choose compactness
because comparison or throughput needs it, not because everything must fit above the fold.

Use a small spacing and sizing scale with meaningful jumps: tight steps at the bottom, wider
steps higher up, and no two steps closer than about 25 %. Reuse the project's scale before
extending it. Choose by elimination — render the guessed step and both neighbors; when both
neighbors are worse the guess is right, and when one is better repeat around it — instead of
tuning one pixel at a time. Name roles for internal gaps, field groups, panels, and sections; do
not make "multiples of four" an unlimited license to invent values.

Keep more space **between** groups than **within** them, in both axes. Keep labels, controls, help,
and errors together; keep headings closer to the content they introduce than to the preceding
section. Separate icon-and-value pairs from their neighbors. Confirm those relationships after
wrapping, validation, and responsive reflow.

Give content the width it needs, not all the width available. Bound forms and reading columns;
allow data comparisons more room. Split supporting explanation from a form on wide screens rather
than stretching its fields. A narrow useful panel does not owe the screen filler cards.

Use a grid where columns need to scale together. Use a bounded rail and a flexible main region where
they do not. Prefer a content-derived maximum width over changing percentage widths for a
login panel. Let it shrink only when the viewport requires it. Take missing sizing steps through
[bootstrap-reference.md](bootstrap-reference.md) → Utilities API, not invented classes.

Compose and use the primary flow at narrow width before expanding it. Record each region's
stacking, expansion, content parity, and scroll policy in [responsive-layout.md](responsive-layout.md).
On mobile, preserve the design's reading order and character through type, rhythm, and useful
content, not a shrunken shell. Rework dense previews into legible lists rather than truncating
all the evidence. Judge the available container, not the viewport label.

Adapt hierarchy, not a screenshot's proportions. Reduce large headings and outer gaps sooner than
body text and control targets. Set type, padding, and icon size independently for each control size.
Wrap or reorganize before truncating decision-critical content. Do not shrink an entire interface
to make it fit.

### Typography that fits the task

Assign display, body, and utility roles; they need not be different font families. Reuse the
product's typefaces. For a new system, take a legible UI face for repeated reading and data, and add
a display face only where its character earns the payload. A neutral sans-serif or system stack is
a deliberate choice, not a failure of distinctiveness. Prefer families offered in five or more
weights; avoid condensed or short-x-height faces for UI text; keep a display face at display size,
where it was drawn to work. Test the actual glyphs, numerals, weights, languages, and fallback the
surface needs.

Hand-pick a finite type scale in `rem`, with smaller jumps for UI text and larger jumps for
display; a modular ratio yields fractional pixels and too few reading sizes. Avoid nested `em`
font sizes that compound off-scale. Start with two working weights — regular and emphasis — and
add another only for a distinct role. Keep captions and metadata at the smallest readable step in
the secondary tier, not smaller in body color. Never shrink text merely to avoid fixing a cramped
layout.

Keep prose near **45–75 characters per line** where the viewport permits; judge the rendered font,
not the unit alone. Bound paragraphs independently of wider images, tables, or navigation. Keep
long text start-aligned; center only short, independent passages. Align mixed-size text on its
baseline, not the centers of its boxes.

Use more line-height for small or wide paragraphs and less for large headings. Keep controls and
icons out of prose line-height rules. Trust the typeface's tracking by default; tighten display
text or open short all-caps labels only where the rendered result improves. Never use tracking to
rescue an illegible display face at UI size.

Right-align comparable quantities with their headers. Keep units and decimal precision consistent;
use tabular figures when the shipped font supports them. Keep identifiers and prose out of numeric
formatting rules. Take table mechanics from [bootstrap-reference.md](bootstrap-reference.md) →
Dense data tables.

Let link prominence follow context. Inline prose links need a persistent non-color cue. Where
most things are links — navigation, lists, tables — emphasize with weight or a darker tone and
let ancillary links reveal an underline on hover and focus; the prose treatment everywhere is
noise. Keep hover and visible focus feedback. Never make hover the only way to discover an action
on touch or keyboard.

### Color as a constrained system

Define roles, not a handful of unrelated swatches. Reuse or establish a neutral ramp, one or two
brand families, and only the status or categorical families the feature needs. A working neutral
ramp often needs 8–10 shades; brand and status families need enough steps for text, borders, fills,
and interaction states. Those are starting ranges, not quotas to fill on every task.

Choose a family's base in a real control, its dark edge in text, and its light edge in a subtle
surface; fill the gaps with visibly distinct steps, middle first. Define every shade up front;
never derive one at a use site with `lighten`, `darken`, or `color-mix`. Use HSL to reason about
hue, saturation, and lightness when authoring a ramp; retain a project's established color
format. Raise saturation as lightness moves away from the middle so light and dark steps keep
their color, and rotate hue within about 20–30° — toward a brighter neighbor for light steps, a
darker one for dark steps — rather than mixing with white or black. Give all greys one hue and
temperature, warmer or cooler to match the brand. Refine the shared ramp in context instead of
adding per-component shades. Take the Bootstrap extension points from
[color-modes.md](color-modes.md) → Extend the theme.

Map primitives through the existing semantic and component tokens. Decide which element owns
the surface before choosing a foreground. Default ordinary text and quiet status to inheritance;
use adaptive neutral or subtle fills without automatically adding a text-color class. Take the
mechanics and bounded exceptions from [color-modes.md](color-modes.md), and the token extension
points from [bootstrap-reference.md](bootstrap-reference.md) → Theming & design tokens.

Flip the contrast for status, tags, and callouts: a dark tone of the hue on its light tint keeps
the color without the weight of a dark fill, and reserves the solid pair for the primary
element. Reserve explicit foreground/background pairs for intentional solid, inverse, or
image-backed regions. Keep a secondary foreground within that region's tested contract; do not apply neutral
grey or reduced opacity by habit. When no quieter foreground passes, separate by weight or spacing.
Review hierarchy in light and dark independently. Preserve relative prominence and useful
separation rather than mechanically inverting shades or adding a border to every dark panel.

Use color to reinforce a word, glyph, position, or pattern, never to carry meaning alone. Give
charts identifiable series and values without relying solely on hue. A grayscale check reveals
hierarchy problems; it does not prove contrast or accessibility.

### Depth and finishing details

Separate regions with space first, then a surface change, then a shadow, then a line. Keep cards
for real grouping; do not nest a card around every field. When an element has both a border and a
distinct background, remove the border and look again. Remove redundant dividers, not the edges or
focus indicators a person needs to recognize and operate a control.

Use elevation to explain layering. Define a small shadow scale and assign it by z-position:
small and tight for slightly raised controls and cards, medium for floating menus, large and soft
for dialogs; lift an item on drag and press a control on click. Do not give every panel a shadow.
Light comes from above: a raised element takes a lighter top edge and a tight shadow beneath, an
inset element a shadow at its top edge — mimic that and stop. Where a shadow needs two parts, use
a broad cast shadow and a tighter contact shadow; weaken the contact as elevation increases. Flat
surfaces establish depth through lightness — lighter reads closer, darker recessed — or a hard
offset shadow, without simulated lighting. Take the Bootstrap ladder from
[bootstrap-reference.md](bootstrap-reference.md) → Elevation and depth.

Keep overlap intentional and responsive: no clipped text, controls, focus rings, or hit areas.
Give overlapping images a ring in the background color so they never clash. Keep radii and border
weights in one family.

Spend polish on the content already present before adding another accessory — icon bullets that mean something, a brand-colored check, a
promoted quotation mark, a link underline that completes on hover. One accent border per region
— top of a card, side of a callout, under a heading or the active nav item — is the cheapest
"designed" cue; five accents are a pattern. Change a section's surface before decorating it; keep
any gradient within about 30° of hue and any pattern low-contrast and away from text. An accent,
pattern, or background treatment supports grouping, state, or the subject; never add one to
compensate for weak hierarchy. Take the class recipes from [utilities.md](utilities.md) →
Composition habits and [components.md](components.md).

### Images at their intended size

Use relevant, good-quality imagery and inspect the actual asset early. Do not compose around a
placeholder and assume an unrelated replacement will work. Choose an image, diagram, live demo,
or text treatment for the information it carries; imagery is not mandatory decoration.

Keep text contrast consistent across the actual image crop and every supported width. Use a tested
overlay or local backdrop when needed; changing text color alone does not control a variable
background. Do not count average image contrast as a passing measurement.

Render icons near their intended optical size. Put a small icon in a larger quiet container, or
choose a purpose-built illustration, rather than enlarging a UI glyph until its proportions look
wrong. Show UI screenshots at a legible size: crop to the relevant feature or capture its real
narrow layout instead of shrinking a whole desktop screen into unreadable texture. Label a
simplified illustration as such; never pass invented product output off as evidence.

Bound user-uploaded images with a consistent frame and aspect ratio. Use cover only when cropping
is acceptable; use contain when the whole image matters. Reserve dimensions, preserve aspect
ratio, and handle missing images. Give informative images useful alternatives and decorative ones
empty alternatives. Test portrait, landscape, transparent, very light, and very dark content.

### States are part of the composition

Design the first-use empty state beside the populated one. Name the action that creates value and
remove controls that genuinely have nothing to operate on. Keep active filters and their clear
path in a **filtered-empty** state; hiding them hides the cause of the empty result. Preserve the
frame, entered values, and recovery path when a request fails.

Build the required loading, partial, and error states in the same feature cycle. Keep known layout
stable while loading; never display invented progress. Stress the working interface with long
names, multiline copy, missing values, and large counts, not only attractive sample data. Take the
state contracts from [bootstrap-reference.md](bootstrap-reference.md) → The data states.

## Where the signature lives in product UI

In an authenticated tool the data is the content: keep it quiet, legible, and fast to compare. Put
the signature in the frame — navigation, header, type treatment, and useful empty states — rather
than an unconventional table. Keep the frame subordinate to the task. Carry an existing product's
signature forward instead of introducing another one for each screen.

For marketing, open with the subject's thesis and the most characteristic evidence for it: a
headline, image, demonstration, or interaction. Do not transplant that hero into an operational
screen. A big number, supporting stats, and a gradient accent are not a direction by themselves.

Make numbering, eyebrows, dividers, and labels encode something true. Number steps only when order
matters. Give richer components richer content without replacing their semantics: supporting text
in a menu, related non-comparable details in one table cell, native radios inside selectable cards.
Preserve keyboard behavior, sorting, and the comparisons the task depends on.

## Process: brainstorm, explore, plan, critique, build, critique again

Calibrate against recurring defaults: cream with serif and terracotta; near-black with
acid green or vermilion; broadsheet hairlines, square corners, and dense columns. These can fit a
brief; they are not evidence that a direction fits this one. Follow a pinned direction exactly and
use free axes deliberately, not as an excuse to rebrand an existing product.

Work in small passes:

1. **Ground the feature.** State its job, real content, primary action, and existing constraints.
2. **Explore the hierarchy.** Compare compact low-fidelity arrangements of that feature. Hold
   color: body surfaces, inherited text, weight, and spacing only, until a grayscale capture
   reads; add brand and status hue last to reinforce what already reads. Settle the reading
   order, grouping, and narrow layout before fine styling. Discard the sketches after selecting
   a workable arrangement.
3. **Plan the system.** Name palette families and surface ownership; type roles, sizes, and weights; spacing
   and width roles; radius and elevation; the signature the brief calls for or the existing identity to preserve. Reuse existing
   tokens and record only the additions or changes. State the layout in prose or a small wireframe.
4. **Critique, then build.** Reject a plan that obscures the task, implies unbuilt behavior, or reads
   as interchangeable. Implement the smallest working flow, map shared tokens at their owning scope, and refine its states
   before extending the next feature. Revise the shared plan when the render disproves it.
5. **Critique the render.** Read task, hierarchy, grouping, type, contrast, state, and signature in
   that order. Fix the earliest failure before decorating later layers. Recheck after the fix.

Keep CSS specificity deliberate. Utilities may use `!important`; inspect the winning declaration
instead of stacking overrides. Remove conflicting classes before escalating selector specificity.
A class selector remains a class selector regardless of its name.

Keep exploratory drafts private. Show the selected direction, relevant decisions, and verification
limits, not every discarded variation. Do not claim a rendered result from source inspection.

## Restraint and self-critique

Spend boldness in one place where the brief permits it, and keep its surroundings disciplined. A
minimal direction needs precise spacing and type; a maximal direction needs controlled hierarchy,
not a pile of effects. Preserve an established restrained identity instead of manufacturing risk.

Use motion only when it explains a transition, gives feedback, or belongs to the subject. Prefer
Bootstrap's behavior and at most one orchestrated decorative moment. Keep custom motion behind
`prefers-reduced-motion: no-preference`; the motion-free surface must remain complete.

Before shipping, remove the least-useful accessory if one exists. Restore it only when the surface
loses information or the brief's intended identity. Never remove a label, boundary, or affordance
merely to satisfy a subtraction rule.

Review captures at the declared widths, themes, and states, with keyboard focus and realistic
content. Switch modes on the mounted interface; inspect inherited text, quiet fills, and selected
controls before polishing decoration. Compare against the named design criteria; do not invent a numeric beauty score. Use
[inspection.md](inspection.md) for measurable claims and its rendered design review for visual
ones. Record untested coverage as open. Route a requested review campaign to `orkestrel-polish-surface`.

## Writing in design

Keep a word only where it helps the person understand or operate the interface. Decide what each
element needs to say before writing it. Use the brief's content; when it supplies none, write
specific interface copy without inventing customer claims, performance figures, or testimonials.
Distinguish fixture data from product facts.

Write from the end user's side of the screen. Name what people control and recognize, not how the
system is built. Prefer a specific plain verb to a clever phrase. Tune tone to the product and hold
one vocabulary across screens.

Make a control name its result: "Save changes," not "Submit." Keep that verb through the flow:
"Publish" confirms with "Published." Keep labels short only while they stay unambiguous. An expanded
accessible name must contain the visible label, preferably at its start; do not replace a useful
visible label with hidden explanation.

Give failure and emptiness direction rather than mood. State what failed, what was preserved, and
what the person can do next. Name the first useful action in an empty state. Keep errors in context
and avoid apology, blame, and vague reassurance.

Use active voice, sentence case, and no filler. Let a label label and an example demonstrate. Keep
help and validation distinct; never make placeholder text carry either job alone.
