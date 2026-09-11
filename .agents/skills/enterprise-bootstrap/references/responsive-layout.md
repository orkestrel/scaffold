# Responsive layout

> Part of the `enterprise-bootstrap` package. Use before composing a screen, shell, toolbar,
> form, overlay, or data view. Operate layer: [SKILL.md](../SKILL.md).

## Contents

- [Declare the contract](#declare-the-contract)
- [Build the base](#build-the-base)
- [Expand by available space](#expand-by-available-space)
- [Keep the task intact](#keep-the-task-intact)
- [Handle navigation and overlays](#handle-navigation-and-overlays)
- [Prove the result](#prove-the-result)

## Declare the contract

Record one row per distinct region before writing its layout. Reuse a region's contract instead
of repeating it on every screen. Take the host's supported range; absent one, prove normal content
at 320 CSS px and compose first at a representative 390 CSS px. These are verification widths,
not new Bootstrap breakpoints or guarantees about physical devices.

| Region           | Narrow behavior                                               | Expansion condition                     | Information/actions retained                       | Overflow                     |
| ---------------- | ------------------------------------------------------------- | --------------------------------------- | -------------------------------------------------- | ---------------------------- |
| Navigation       | Named trigger opens a drawer                                  | Rail plus usable main content fit       | Same destinations and current state                | Drawer body only when needed |
| Search/actions   | Search and actions stack; filters wrap or disclose            | Labels and hit areas fit together       | Search, active filters, clear path, primary action | None                         |
| Record list      | Identity, decision fields, primary action; details disclosure | Comparison columns fit beside any rail  | Same data, sorting, selection, actions             | None for the list            |
| Comparison table | Named, keyboard-operable local scroller                       | Columns fit without a scroller          | All comparison columns and row identity            | Table region only            |
| Form/dialog      | One reading column; natural height                            | Related fields or explanation have room | Labels, errors, consequences, cancel/commit        | One vertical owner           |
| Hero/preview     | Copy, actions, then legible evidence                          | Both columns remain useful              | Thesis, primary action, useful demonstration       | Decorative layer only        |

Name the actual thresholds used and why. Do not give every region the same breakpoint by habit.
Build and use the narrow primary flow before adding desktop chrome or finishing details.

## Build the base

Use Bootstrap's mobile-first direction: unprefixed rules apply from the smallest width; `sm`,
`md`, `lg`, `xl`, and `xxl` add behavior at their minimum widths. `xs` has no class infix.
Take the installed breakpoint map, not device labels, from
[Breakpoints & layout](bootstrap-reference.md#breakpoints--layout).

Prefer shipped structure before custom media queries:

```html
<!-- One field per row until the content supports a pair. -->
<div class="row g-3">
	<div class="col-12 col-md-6"><!-- labelled field --></div>
	<div class="col-12 col-md-6"><!-- related labelled field --></div>
</div>

<!-- Stretch actions at the base; use their natural widths from sm. -->
<div class="d-grid gap-2 d-sm-flex flex-sm-wrap">
	<button type="submit" class="btn btn-primary">Save changes</button>
	<button type="button" class="btn btn-outline-secondary">Cancel</button>
</div>

<!-- Give search its own narrow row rather than crushing its input. -->
<form class="row g-2 align-items-end" role="search" aria-label="Find invoices">
	<div class="col-12 col-md">
		<label class="form-label" for="invoice-search">Search invoices</label>
		<input class="form-control" id="invoice-search" type="search" />
	</div>
	<div class="col-12 col-sm-6 col-md-auto">
		<label class="form-label" for="invoice-status">Status</label>
		<select class="form-select" id="invoice-status">
			<option>All statuses</option>
		</select>
	</div>
</form>
```

Keep DOM order meaningful before arranging columns. Do not use visual `order-*` to separate focus
order from reading order. Use `p-3 p-lg-4` and `g-3 g-lg-4` to grow outer space independently of
control size. Keep `.row` gutters inside a compatible container or padded parent; do not add
unbudgeted `gap-*` to percentage columns whose widths already total the row.

Check the generated CSS. Stock width/height, overflow, and general position utilities do not all
ship breakpoint variants. Do not invent `w-md-auto`, `overflow-lg-auto`, `position-lg-sticky`, or
`min-w-0`. Responsive sticky helpers are a separate shipped family. Take missing roles through
[Layout and type extensions](bootstrap-reference.md#layout-and-type-extensions).

## Expand by available space

Measure the content container after rails, gutters, and panel padding. A wide viewport can contain
a narrow main region, split pane, or dialog. Delay columns, keep an intrinsic layout, or use an
authorized container-query extension when reuse requires it. A viewport breakpoint alone does not
prove the component fits.

Let flex/grid children shrink: use the project's zero-inline-minimum role and, for custom grids,
`minmax(0, 1fr)` where appropriate. Break long identifiers at safe opportunities; expose complete
values through a usable detail view when truncation is unavoidable. Never shrink amounts, labels,
or input text to rescue a desktop row. Let identity/amount headers wrap independently and bound
long action labels to their container; a wrapping parent does not constrain an oversized child.
Preserve native input scrolling for long editable values.

Use a content-led maximum width, not an unconditional fixed width or `vw-100` inside a padded
container. Let content set height. Prefer ordinary page scrolling to a phone-sized nested viewport;
reserve bounded table scrolling for a documented comparison task. Do not use `vh-100`, transforms,
CSS zoom, or root `overflow-x-hidden` to make an oversized layout appear to fit.

Keep large typography and presentation space responsive without shrinking body text or hit areas.
Bootstrap RFS scales supported type; it does not reflow navigation, dialogs, or preview content.
A readable line count beats mechanically preserving a desktop hero's proportions.

## Keep the task intact

Choose a data strategy by the task, not a fixed ranking:

- **Record work:** use a compact list or labelled stack when the job is finding and acting on one
  record. Keep identity, status, amount, due date, and the relevant action directly discoverable;
  put secondary details behind a named disclosure. Generate variants from one data/state model.
- **Comparison work:** retain a semantic table when column comparison is essential. Local horizontal
  scrolling is valid; name the region, provide a scroll cue, and verify keyboard reach to both ends.
  Keep search and pagination outside it. Do not turn every comparison into cards.
- **Priority columns:** omit a column from the narrow presentation only when the same information is
  available through an operable detail path. `d-none` alone is not a content strategy.

Do not render two independent forms or state stores for narrow/wide variants. Keep IDs unique and
only the active representation in the accessibility/focus tree. Preserve filters, values, selected
record IDs, sort, and open-detail context across a live resize. Restore focus to the equivalent
visible control if its representation disappears; do not steal unrelated focus. Track the control
before hiding it: the browser may move focus to the body before a media-query listener runs.
A dialog closed after reflow returns to the visible equivalent of its original trigger.

Keep search and action bars in normal flow. Stack or wrap ordinary controls before considering a
scroller; put additional filters behind a working disclosure with active-filter count and reset.
Use a wrapping group of independent buttons or a select, not a joined `.btn-group` bent over two
rows. Keep consequential button labels visible. Preserve the current page and previous/next when
reducing a pager's numbered links.

Keep record actions outside a clipped table wrapper when necessary. Popper placement alone does
not guarantee escape from an overflow ancestor. Prefer a root-mounted dialog or an existing
portal implementation over z-index escalation.

Make touch targets comfortable without making text larger: prefer 44×44 CSS px for primary mobile
controls; retain the package's 24×24 minimum for every applicable target. Enlarge the actual button
or associated label, not merely the icon's surrounding decoration. Keep action affordances visible
without hover. Measure effective label hit areas for native checkboxes and switches.

## Handle navigation and overlays

Use `navbar-expand-*` or responsive `offcanvas-*` from the installed build. Match the trigger's
visibility threshold to the inline panel. Preserve one destination set, a named trigger, current
state, keyboard operation, Escape, and focus return. Exercise a drawer opened below a threshold,
resized above it, then returned below; no stale backdrop, body scroll lock, or invisible focus trap
may remain. Do not assume the host wrapper behaves exactly like the stock plugin.

Keep overlay width within the viewport and height content-led with an explicit vertical scroll
owner. Bootstrap's `modal-fullscreen-*-down` belongs to its modal structure, not a native `<dialog>`.
For native dialogs, declare a bounded logical size in the stylesheet when needed; keep consequences,
fields, safe dismissal, and commit reachable on short screens and with enlarged text. Check the
initial view as well as the scrolled footer. When action focus would hide the beginning, focus a
static top heading with `tabindex="-1"`; keep a safe dismissal in the tab sequence. Follow the
[dialog focus guidance](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/).

Let nonessential sticky chrome become static on narrow or short screens. Where fixed controls are
required, reserve their space, account for safe-area insets, and check focus visibility. Use a
supported dynamic viewport unit only for a genuine viewport-bound requirement; it does not prove
virtual-keyboard behavior. Test the soft keyboard and browser chrome on a real supported device,
or leave that coverage open.

Keep theme ownership intact during reflow. A dark hero or drawer on a light page establishes its
foreground/background at its boundary; ordinary descendants inherit. Take adaptive subtle fills
and exceptions from [color-modes.md](color-modes.md), not a separate mobile palette.

## Prove the result

Run [Responsive task and reflow](inspection.md#responsive-task-and-reflow) and
[Responsive interaction continuity](inspection.md#responsive-interaction-continuity). Check 320 and
390 CSS px, one wide view, and `b−1`, `b`, `b+1` for each used breakpoint; deduplicate overlaps.
Check narrow/short landscape, long unbroken identifiers, expanded copy, enlarged text, and the
states actually used. Cross light/dark with the important narrow/wide states.

Require both geometry and task evidence. A page with no horizontal overflow can still hide its
primary action, clip a menu, or push decision fields into an undiscoverable scroller. Conversely,
a valid local two-dimensional scroller is not a page-level reflow failure.

Capture narrow output first and inspect it before desktop. Preserve before/after evidence for
regressions; run known-invalid controls through the same readers. State the Bootstrap build,
browser, assets, CSS viewport, state, and exclusions. Do not call a screenshot, class scan, reduced
viewport, device-pixel-ratio change, or emulated touch a real-device or complete accessibility pass.

Take upstream behavior from Bootstrap's [breakpoints](https://getbootstrap.com/docs/5.3/layout/breakpoints/),
[grid](https://getbootstrap.com/docs/5.3/layout/grid/), [flex](https://getbootstrap.com/docs/5.3/utilities/flex/),
[offcanvas](https://getbootstrap.com/docs/5.3/components/offcanvas/), and
[tables](https://getbootstrap.com/docs/5.3/content/tables/). Distinguish this package's test matrix
from the requirements and two-dimensional-content exception in
[WCAG reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html).
