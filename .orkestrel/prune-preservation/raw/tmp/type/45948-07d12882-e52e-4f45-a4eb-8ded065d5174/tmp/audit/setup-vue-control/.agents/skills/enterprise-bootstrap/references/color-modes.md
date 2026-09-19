# Color modes and inheritance

> Part of the `enterprise-bootstrap` skill. Use for foreground ownership, adaptive surfaces,
> nested themes, and color-mode repairs. Take the contrast bars from [SKILL.md](../SKILL.md).

## Contents

- [Choose the surface](#choose-the-surface)
- [Fixed and adaptive classes](#fixed-and-adaptive-classes)
- [Text tiers](#text-tiers)
- [Preserve the cascade](#preserve-the-cascade)
- [Scope the mode](#scope-the-mode)
- [Respect component ownership](#respect-component-ownership)
- [Extend the theme](#extend-the-theme)
- [Verify the result](#verify-the-result)

## Choose the surface

Default to inherited text. When ordinary content owns no background, add no foreground override.
For quiet containers and status, prefer adaptive backgrounds without an added text-color class.
Treat this as the skill's default, not a claim that Bootstrap forbids its documented emphasis pairs.

| Context                                | Use                                                                                               | Refuse by default                                                              |
| -------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Ordinary content                       | Inherited body or component text                                                                  | A leaf `color` declaration or `text-*` color chosen without a surface contract |
| Neutral separation                     | `bg-body`, `bg-body-secondary`, or `bg-body-tertiary`; inherit text                               | `bg-white`, `bg-light`, or `bg-dark` as an adaptive surface                    |
| Quiet semantic status                  | `bg-*-subtle`; inherit text and state the meaning in words                                        | Automatically matching the fill with `text-*` or `text-*-emphasis`             |
| Intentional solid or inverse treatment | A component-owned pair, or a measured `text-bg-*` helper                                          | A solid `bg-*` with an unrelated inherited foreground                          |
| Selected control                       | The component's checked/active treatment and foreground                                           | Descendant text or icon colors that override the selected foreground           |
| Secondary information                  | Spacing and weight first; `text-body-secondary` for a deliberate tier ([Text tiers](#text-tiers)) | Opacity, `text-body-tertiary`, or a neutral grey on a colored fill             |

Use these quiet treatments inside an ordinary body-color context:

```html
<section class="bg-body-tertiary rounded p-3" aria-labelledby="sync-heading">
	<h2 id="sync-heading" class="h6">Synchronization</h2>
	<p class="mb-0">Updates appear after the next sync.</p>
</section>
<span class="d-inline-flex rounded-pill bg-success-subtle px-2 py-1 small fw-semibold">Paid</span>
```

Measure the inherited result on its actual background. A subtle fill changes only the background;
it cannot repair a fixed, translucent, or inverse foreground inherited from an ancestor. Remove
that conflict or establish an owned surface boundary before adding a leaf override.

## Fixed and adaptive classes

Every Bootstrap color class resolves through one of two kinds of variable. **Adaptive** classes
read a variable the `[data-bs-theme=dark]` block redefines — `--bs-body-color`/`-bg`,
`--bs-emphasis-color`, `--bs-secondary-color`/`-bg`, `--bs-tertiary-color`/`-bg`,
`--bs-*-text-emphasis`, `--bs-*-bg-subtle`, `--bs-*-border-subtle`, `--bs-border-color`,
`--bs-link-color` — and change with the mode. **Fixed** classes read `--bs-{theme}-rgb`,
`--bs-white-rgb`, `--bs-black-rgb`, `--bs-light-rgb`, or `--bs-dark-rgb`, which no mode
redefines, and paint the same value in light and dark.

This table classifies a class by the variable it reads, and nothing else. Deprecation is a separate
axis: `text-muted` reads the adaptive secondary color and is deprecated, so it classifies as
adaptive here and still gives way to `text-body-secondary` on its deprecation.

| Family     | Adaptive                                                                                                                | Fixed                                                                                                                   |
| ---------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Text       | `text-body`, `text-body-emphasis`, `text-body-secondary`, `text-body-tertiary`, `text-muted` (alias), `text-*-emphasis` | `text-primary` … `text-danger`, `text-light`, `text-dark`, `text-white`, `text-black`, `text-white-50`, `text-black-50` |
| Background | `bg-body`, `bg-body-secondary`, `bg-body-tertiary`, `bg-*-subtle`                                                       | `bg-primary` … `bg-danger`, `bg-light`, `bg-dark`, `bg-white`, `bg-black`, `bg-gradient`                                |
| Border     | `border` (default color, decorative at 1.3:1), `border-*-subtle`                                                        | `border-primary` … `border-dark`, `border-white`, `border-black`                                                        |
| Links      | plain `<a>`, `btn-link`, `link-body-emphasis`                                                                           | `link-primary` … `link-dark`, `link-light`                                                                              |
| Own pairs  | `.alert-*`, `.list-group-item-*`, `.form-control`, `.card`, `.dropdown-menu`, `.modal-content`, `.toast`, `.btn-close`  | `text-bg-*`, solid `btn-*`, `btn-light`/`btn-dark`, `table-*` row variants, `progress-bar`, active nav/list/page states |
| No pair    | —                                                                                                                       | `btn-outline-*`: a fixed label and border on whatever surface the page has                                              |

**Pair like with like.** Adaptive text on an adaptive surface; fixed text on a fixed fill. Treat
every mixed pair as unproven until measured: some clear one mode and fail the other, and some fail
light and dark alike. Read the outcome from the measurement, never from the mixture.

The following readings bound stock Bootstrap 5.3.8 and nothing else. A declared theme, a skin, or an
overridden token re-points every value in the table, so measure that theme yourself rather than
carrying a stock number into it. Light | dark:

| Mixed pair                                              | Light         | Dark          |
| ------------------------------------------------------- | ------------- | ------------- |
| `text-primary` / `-success` / `-danger` on `bg-body`    | 4.5           | 3.4 ✗         |
| `text-secondary` on `bg-body`                           | 4.7           | 3.3 ✗         |
| `text-warning` / `text-info` on `bg-body`               | 1.6 ✗ / 2.0 ✗ | 9.5 / 7.9     |
| `text-dark`, `text-black` on `bg-body`                  | 15.4 / 21.0   | 1.0 ✗ / 1.4 ✗ |
| `text-white`, `text-light` on `bg-body`                 | 1.0 ✗ / 1.1 ✗ | 15.4 / 14.6   |
| Inherited text on `bg-light` / `bg-white`               | 14.6 / 15.4   | 1.2 ✗ / 1.3 ✗ |
| Inherited text on `bg-dark` / `bg-black`                | 1.0 ✗ / 1.4 ✗ | 11.8 / 16.1   |
| Inherited text on `bg-primary` / `-danger` / `-success` | 3.4 ✗         | 3.5 ✗         |
| `btn-outline-secondary` label on `bg-body`              | 4.7           | 3.3 ✗         |
| `btn-outline-primary` label on `bg-body`                | 4.5           | 3.4 ✗         |
| `link-primary` (`--bs-primary-rgb`) on `bg-body`        | 4.5           | 3.4 ✗         |

The adaptive pairs hold: `text-*-emphasis` on `bg-body` is 6.1–13.6 in light and dark and on
`bg-*-subtle` 7.2–10.8, with one exception — `text-dark-emphasis` is 3.7 on the dark body; use
`text-body-emphasis` for neutral emphasis. A plain link is 4.5 light and 6.4 dark because
`--bs-link-color` is redefined; `text-primary` and `link-primary` are not.

Rules:

- Default to adaptive on adaptive: inherited text on `bg-body*` or `bg-*-subtle`; status text as
  `text-*-emphasis`; links as plain links or `link-body-emphasis`.
- A fixed fill needs a fixed foreground you can name: `text-bg-*` (white on primary, secondary,
  success, and danger at 4.5–4.7; black on warning, info, and light; white on dark), the
  component's own foreground, or a `data-bs-theme` scope that carries `text-body` on the same
  element. Inherited text on a fixed fill is never a pair.
- A `data-bs-theme` scope redefines variables only. Text color is painted once, on `<body>`, from
  the outer mode, and plain descendants inherit that computed color — not the variable. Inside
  the scope only rules that resolve `color` through a variable re-align: `text-body*`,
  `text-*-emphasis`, buttons, links, `list-group-item`, form controls, `btn-close`. A paragraph,
  a `span`, a heading without a text class, and `.card` (its `--bs-card-color` is empty, so it
  inherits) keep the outer mode's color. The symptom is a headline in `text-body-emphasis`
  reading correctly beside a paragraph that vanishes. Restate the surface and the foreground on
  the scope element: take `bg-body text-body` where the fill must follow the mode, and a fixed
  `bg-*` plus `text-body` where it must not
  (`<section class="bg-dark text-body" data-bs-theme="dark">`).
  Check components that leave the scope: dropdown menus, and dialogs mounted at the root.
- Outline buttons carry a fixed label. Lift the neutral one once at the theme root —
  `.btn-outline-secondary { --bs-btn-color: var(--bs-emphasis-color); }` — its `#6c757d` border
  still clears the 3:1 boundary bar in light and dark (4.7 | 3.3). For an adaptive primary outline set
  `--bs-btn-color` and `--bs-btn-border-color` to `var(--bs-link-color)`; `btn-link` already adapts.
  `btn-outline-light` and `btn-outline-dark` belong only inside a fixed fill of the opposite tone.
- Shadows are fixed black alphas and nearly vanish on dark surfaces; carry depth with the
  `bg-body*` steps in dark mode.
- Icon fonts and `fill="currentColor"` follow the text; a literal hex in an inline SVG or an
  `<img>` is fixed. Give logos and illustrations a scoped variant or a `currentColor` path.

| Legacy or mixed                                  | Adaptive replacement                                                      |
| ------------------------------------------------ | ------------------------------------------------------------------------- |
| `bg-light` panel                                 | `bg-body-tertiary`                                                        |
| `bg-white`                                       | `bg-body`                                                                 |
| Neutral `bg-dark` region                         | `bg-dark` with `data-bs-theme="dark"`, or `bg-body` inside a dark scope   |
| `text-dark`, `text-black`                        | `text-body-emphasis`, or inherit                                          |
| `text-white` on an adaptive surface              | inherit                                                                   |
| `text-muted`, `text-black-50`, `text-white-50`   | `text-body-secondary`                                                     |
| `text-primary` … `text-danger` as running text   | `text-*-emphasis`, measured                                               |
| `border-light`, `border-dark`                    | `border`, or `border-*-subtle`                                            |
| `navbar-light`, `navbar-dark`, `btn-close-white` | `data-bs-theme` on the navbar or region                                   |
| `badge bg-primary` with inherited text           | `badge text-bg-primary`, or `badge bg-primary-subtle` with inherited text |
| `link-primary` … `link-dark`                     | plain link, or `link-body-emphasis`                                       |

Read that table as a replacement map, not as a classification. Replace `bg-light`, `bg-white`,
`bg-dark`, `text-dark`, `text-black`, `text-white`, `text-black-50`, `text-white-50`,
`border-light`, `border-dark`, and the colored `text-*` and `link-*` families because they are
fixed. Replace `text-muted`, `navbar-light`, `navbar-dark`, and `btn-close-white` because 5.3
deprecates them — `text-muted` already adapts, so its replacement closes a deprecation rather than
a contrast defect.

## Text tiers

Stock Bootstrap ships the inherited body color and `text-body-secondary` as its readable tiers;
`text-body-tertiary` is not readable text. `--bs-secondary-color` is the body color at 75 % alpha
and `--bs-tertiary-color` at 50 % alpha, so each composites against whatever sits beneath it.

The following readings bound stock 5.3.8 on its own body surfaces (`bg-body` / `bg-body-tertiary` /
`bg-body-secondary`). Measure a declared theme or a skin yourself; its tokens re-point every value
here.

| Tier                  | Light              | Dark              | 4.5:1 bar        |
| --------------------- | ------------------ | ----------------- | ---------------- |
| Inherited body        | 15.4 / 14.6 / 13.0 | 11.9 / 10.2 / 8.8 | Passes           |
| `text-body-secondary` | 6.8 / 6.6 / 6.2    | 7.3 / 6.5 / 5.8   | Passes           |
| `text-body-tertiary`  | 3.1 / 3.1 / 3.0    | 4.1 / 3.8 / 3.5   | Fails everywhere |

- Use `text-body-secondary` as the one shipped quiet tier. Use `text-body-tertiary` for decoration
  or disabled chrome only; it never carries a caption, timestamp, or count someone reads.
- Declare any further readable tier as an opaque token — override `$body-tertiary-color` and
  `$body-tertiary-color-dark`, or add a semantic token — and measure it on each surface it sits on.
  The opaque `text-secondary` (`$gray-600`) clears 4.5:1 only on pure white and does not adapt.
- Component variables consume the translucent secondary color — placeholders,
  `.form-text`, table captions, breadcrumb dividers and the active crumb, toast headers, figure
  captions, list-group action text, and disabled states — and inherit this table.
- On a colored fill, `text-body-secondary` composites the body color over the hue — grey on color —
  and `text-white-50` or `text-opacity-*` let the fill show through the glyphs. The quiet tone on a
  fill is the same hue at lower contrast: keep the owning component's foreground and quiet a line
  with weight or size, or declare a same-hue token (for the stock blue, the `$blue-200`–`$blue-300`
  region in light mode) through the component's own variable and measure it.
- For a tinted region, use the shipped same-hue pair: `text-*-emphasis` on `bg-*-subtle` (about
  10:1 for primary in the stock light theme), adapting in light and dark. Keep `text-bg-*` solids for
  the primary element.

When checking utility behavior, see Bootstrap's [Background](https://getbootstrap.com/docs/5.3/utilities/background/)
and [Colors](https://getbootstrap.com/docs/5.3/utilities/colors/) references. Distinguish the
adaptive families from the original contextual families:

- Use `bg-*-subtle`, `border-*-subtle`, and body-role variables for mode-aware surfaces and boundaries.
  Measure a required control boundary separately; a subtle border is not a focus treatment.
- Treat original contextual `bg-primary`, `text-primary`, and their semantic siblings as
  non-adaptive in stock 5.3. Treat `bg-light`, `bg-dark`, `text-light`, and `text-dark` the same way.
  Do not confuse `bg-secondary` with `bg-body-secondary`.
- Treat `text-*-emphasis` as adaptive but optional. Use it only for a deliberate semantic foreground
  on a known, measured surface, not merely because that surface has a subtle fill.
- Reserve `text-bg-*` for a deliberate solid pair. Bootstrap selects its foreground with Sass at
  build time, not through runtime contrast calculation. Recheck after theme-variable changes;
  see [Color and background](https://getbootstrap.com/docs/5.3/helpers/color-background/).
- Do not invent `text-bg-*-subtle`; stock Bootstrap does not ship that helper.

## Preserve the cascade

Inspect the winning declaration before changing a color. Remove a conflicting utility or local
rule before adding specificity. A literal moved into an unchanging `--bs-*` variable remains an
unchanging color; the prefix does not prove adaptation.

Keep native component foregrounds and states. Do not apply `color: inherit` to all descendants or
strip every text utility: alerts, validation feedback, links, and selected controls own meaningful
foreground behavior. Override only the element that violates its surface contract.

Use `text-reset` only to restore inheritance where a component or utility has replaced it. The
helper sets `color: inherit`, not a chosen palette color. Use `text-body` only when the element
must establish the active mode's body foreground on an owned surface, not as a universal reset.
Neither helper repairs an inappropriate ancestor by itself.

Keep links on Bootstrap's link rules. For a deliberate high-contrast neutral link, use
`link-body-emphasis`; among stock 5.3 colored-link helpers, only that helper adapts to color modes.
Do not override a link with a text utility and lose its hover/focus treatment; see
[Colored links](https://getbootstrap.com/docs/5.3/helpers/colored-links/).

Use opacity utilities only where the painted rule consumes their variable. Stock `bg-*-subtle`
rules do not consume `--bs-bg-opacity`; adding `bg-opacity-*` does not tint them. Check the same
relationship for emphasis text and subtle borders. Do not use whole-element opacity to create a
quiet panel with information-bearing children.

## Scope the mode

Use the host's mode controller. With Bootstrap's attribute strategy, set the resolved `light` or
`dark` value on `<html>`; scope an intentional exception with `data-bs-theme` on its boundary.
Do not pin components to dark merely because the page happens to be dark during development.

A nested scope changes variables, not painted colors: `color` is set on `<body>` by the outer
mode and inherited as a computed value, so plain text inside the scope stays the outer color
until the boundary restates it. Establish both the surface and the foreground on the scope
element — never rely on the attribute alone, and never fix the symptom by sprinkling `text-white`
on individual descendants:

```html
<section data-bs-theme="dark" class="bg-body text-body p-3" aria-labelledby="preview-heading">
	<h2 id="preview-heading" class="h6">Preview</h2>
	<div class="bg-primary-subtle rounded p-3">This text inherits from the preview.</div>
</section>

<!-- Fixed fill or image that must not follow the page mode: keep bg-*, still restate text-body. -->
<section data-bs-theme="dark" class="bg-dark text-body py-5" aria-labelledby="hero-heading">
	…
</section>
```

Keep the body foreground at that owned boundary; add no text-color classes to its ordinary
children. A component that already consumes its mode's foreground and background, such as a
`.dropdown-menu`, can establish its own pair without these utilities.

Do not treat `data-bs-theme` as paint. Changing variables on a plain element does not recompute a
`color` already inherited from outside the scope. Check the boundary guidance in Bootstrap's
[5.3.0 color-mode notes](https://blog.getbootstrap.com/2023/05/30/bootstrap-5-3-0/).

Resolve a portal, teleport, or `container: 'body'` overlay at its actual DOM mount point. Carry an
intentional local mode to that mount point; do not assume the trigger's ancestry follows it.

Avoid mode-sensitive aliases declared only at the root, such as `--app-text: var(--bs-body-color)`,
then inherited into a different local mode. Consume the Bootstrap variable at the component, or
rebind the alias at every supported mode boundary. Custom properties resolve their references
before inheritance; see [CSS Custom Properties](https://www.w3.org/TR/css-variables-1/).

When implementing a picker, validate persisted values and resolve `auto` through
`prefers-color-scheme` before setting the attribute. Take a refused read or write from
[bootstrap-reference.md](bootstrap-reference.md) → Refused capabilities. Follow system changes only
while the preference is automatic. Apply the resolved mode before first paint, keep server/client
initial state consistent, and update the picker's accessible state. Do not write
`data-bs-theme="auto"` without an explicitly implemented custom mode. Take the integration details
from [Bootstrap color modes](https://getbootstrap.com/docs/5.3/customize/color-modes/).

## Respect component ownership

### Badges and removable tags

For quiet status, prefer the utility-composed span in [Choose the surface](#choose-the-surface).
When preserving `.badge`, restore inheritance explicitly:

```html
<span class="badge bg-success-subtle text-reset">Paid</span>
```

Do not use `.badge bg-success-subtle` alone: stock `.badge` supplies a white foreground, not
inherited body text. Do not mistake the absence of a `text-*` class for the absence of a color
rule. Confirm the skin's badge rule; see [Badges](https://getbootstrap.com/docs/5.3/components/badge/).
Keep a removable tag's close button in the same mode and measure its hit area; a badge's small
font must not shrink the control below the target floor in
[bootstrap-reference.md](bootstrap-reference.md) → WCAG 2.2 requirements for app UI.

### Alerts, buttons, and selection

Leave `.alert-*` on its native foreground, subtle background, border, and `.alert-link` treatment.
Do not add `text-reset` to an alert merely to enforce inheritance. Choose its announcement role
by urgency, not by the color or visual component.

Choose button rank before color. Keep `.btn-*` state rules; do not add `bg-*-subtle` to a button
and override its hover/active backgrounds with a utility's `!important`. For a custom variant,
map the full state contract through component variables and test it. Do not assume an outline
variant is safe or that a solid variant automatically passes.

Within an active row, tab, or filter, let ordinary labels and glyphs follow its tested foreground.
Remove a competing status tint before changing the selected fill. Keep a genuinely independent
nested badge on its own measured surface, or remove its fill and restore inheritance.

### Tables and overlays

Prefer the uncolored `.table` for automatic light/dark behavior. Treat `.table-primary` and the
other `.table-*` color variants as non-adaptive in stock 5.3 even though they expose CSS variables.
Do not describe their Sass-generated values as runtime color-mode mappings.

Inspect cells, not only the table or row. The base `--bs-table-bg` uses the body background; the
transparent default belongs to `--bs-table-accent-bg`. Striping, hover, and active states paint
cell overlays. Use the table's component variables for a required custom treatment rather than
stacking generic background utilities on a row; see
[Tables](https://getbootstrap.com/docs/5.3/content/tables/).

Let neutral cards, dropdowns, modals, offcanvas panels, and toasts retain their component-owned
surfaces. For an intentional local dark region, use `data-bs-theme` rather than the deprecated
`navbar-dark`, `dropdown-menu-dark`, `btn-close-white`, or `carousel-dark` classes. Check close
icons and overlay content after every supported mode transition.

## Extend the theme

Reuse the installed theme before introducing a palette. Keep primitives in the token source and
map only the required semantics and component states. Define light and dark as deliberate
hierarchies; do not mechanically invert every shade or increase decoration in dark mode.

Keep RGB companions aligned when a consumer reads them. Changing `--bs-primary` alone does not
update a utility reading `--bs-primary-rgb`, rebuild `.btn-primary`, or recompute a `text-bg-*`
foreground. Use the actual consumer's extension point and inspect the emitted rule.

Stock ramps are mechanical: `$blue-100…400` are `tint-color` mixes with white and `$blue-600…900`
are `shade-color` mixes with black, and the `-text-emphasis` / `-bg-subtle` / `-border-subtle`
triads are the same mixes. Hue stays fixed and saturation can only fall, so any brand base short
of full saturation washes out at the light end and goes muddy at the dark end; stock blue survives
only because its base is 98 % saturated. For a brand color, override the `$brand-100…900` shade
variables and the triad variables (`$brand-text-emphasis`, `-bg-subtle`, `-border-subtle`,
each with its `-dark` twin) with hand-picked values before `variables` is imported; every
`.alert-brand`, `bg-brand-subtle`, `text-brand-emphasis`, and `table-brand` then consumes them.
Stock greys sit at hue 210° with 7–17 % saturation — cool, matched to the stock blue. For a warm
brand, override `$gray-100…900` as a complete set at one hue and temperature; never drop
one warm grey into the cool set. Take the picking method from
[frontend-design.md](frontend-design.md) → Color as a constrained system.

With Sass, complete the light and dark emphasis/subtle maps for an added theme color. Inspect the
utility-value maps and extend the generated utilities when the build requires it. A variable's
presence does not prove that its expected class exists. Follow
[Theming & design tokens](bootstrap-reference.md#theming--design-tokens) for import order and
extension points. Add no custom color mode without a brief that requires it.

## Verify the result

Cross theme changes with narrow/wide layout states from [responsive-layout.md](responsive-layout.md).
Check a light page with its local dark hero, an opened mobile drawer, and any root-mounted dialog.
Do not infer their foregrounds from a desktop capture or from the theme attribute alone.

Run [Color-mode inheritance](inspection.md#color-mode-inheritance) and the applicable contrast,
target, and rendered-review checks against the loaded Bootstrap build and skin. Exercise the
existing mounted UI through every declared mode and back, including supported local scopes and
overlays.
Report actual coverage; do not claim a host application pass from documentation or a stock fixture.
