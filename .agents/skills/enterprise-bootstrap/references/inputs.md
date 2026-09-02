# Input affordances

Pick an affordance from what the person is being asked for, not from the name a schema gives the
field. One category draws several ways, and the density and the list size decide which.

Read [The fixed state set](#the-fixed-state-set) before the catalog. Every affordance here handles
that same set, and each category names only what it adds or changes. The data states a whole surface
ships — ideal, empty, loading, partial, error — are a different subject and live in
[bootstrap-reference.md](bootstrap-reference.md) → The data states.

## Contents

- [The fixed state set](#the-fixed-state-set)
- [Rules that cross every category](#rules-that-cross-every-category)
- [The catalog](#the-catalog)
- [Where Bootstrap ships no component](#where-bootstrap-ships-no-component)

## The fixed state set

Draw every one of these for every affordance you place. A category adds `empty` and `full` when its
value is a set.

- **rest** — no pointer, no keyboard focus, the value the field holds.
- **hover** — pointer over the control. The chrome moves, the value does not.
- **focus-visible** — keyboard focus carrying the ring the theme ships. Never write `outline: none`.
- **disabled** — not editable and not submitted. Use the `disabled` attribute; the contrast bars
  exempt it.
- **locked** — not editable and still submitted. Use `readonly` on a control that honors it, and
  `disabled` plus a carrier that submits the value on one that does not.
- **invalid** — `is-invalid` on the control, a sibling `.invalid-feedback` message,
  `aria-invalid="true"`, and the message wired to the control with `aria-describedby`.
- **busy** — waiting on work the person cannot see: a select whose options are still loading, a
  field checking a value against a server. Mark the region `aria-busy="true"` and show a
  `spinner-border spinner-border-sm` in the control's own chrome. Leave the control operable unless
  its value depends on the work.
- **required** — the requirement stated in the visible label and the `required` attribute on the
  control. A `text-danger` asterisk is decoration and carries `aria-hidden="true"`; the word in the
  label is what a screen reader user gets.
- **with help** — a `.form-text` under the control, wired with `aria-describedby` beside the error
  message rather than in place of it.
- **empty** — the set holds nothing. Say what an entry would be, not "nothing here".
- **full** — the set is at its cap. State the cap and stop accepting, rather than dropping an entry
  silently.

## Rules that cross every category

- **Keep a read-only field on the same affordance the edit state uses.** Take `readonly`, or
  `disabled` plus a carrier, and neutralize the chrome with one transparent combination declared
  once by name — the combination is a class contract, so declare it and reuse it rather than
  retyping the utilities. Never swap to `form-control-plaintext`: it drops the horizontal padding,
  so the read view and the edit view reflow against each other.
- **A native select cannot be read-only.** A locked select takes `disabled`, so its value stops
  submitting; carry that value in a hidden input beside it.
- **Give a chosen filter an accent variant, not the neutral outline.** A `btn-outline-secondary`
  label reads as chosen in light and as muted in dark, so one markup says opposite things.
- **One visible label per field**, per [bootstrap-reference.md](bootstrap-reference.md) → Forms in
  production. That section owns labels, validation timing, and the error summary; this file owns
  which affordance carries them.
- **Match the control sizes in a row.** Take `form-control-sm`, `form-select-sm`, `input-group-sm`,
  and `btn-sm` together so a dense row shares one height.
- **Where Bootstrap ships no component, name the APG pattern the hand-roll owes** and route the
  build-or-buy decision to [bootstrap-reference.md](bootstrap-reference.md) → When not to hand-roll.
  The last section here lists those categories and their patterns.

## The catalog

### One line of text

**Default.** An `input.form-control` under its own `label.form-label`, at rung 1.

```html
<label for="account-name" class="form-label">Account name</label>
<input type="text" class="form-control" id="account-name" aria-describedby="account-name-help" />
<div id="account-name-help" class="form-text">The name on the invoice.</div>
```

**Alternates.** Take `.form-floating` when the row is too dense for a label line and the field is
never empty at rest. Take `.input-group` with `.input-group-text` when a prefix, a unit, or an
adjacent action belongs to the field; add `.has-validation` to the group so the feedback keeps the
border radius. Inside a dense grid cell, keep `form-control` and neutralize its chrome with the
declared transparent combination rather than dropping the control.

**States.** The fixed set, and nothing more.

### Text over many lines

**Default.** A `textarea.form-control` with a `rows` attribute sized to the expected answer, at
rung 1.

```html
<label for="incident-notes" class="form-label">Notes</label>
<textarea class="form-control" id="incident-notes" rows="3"></textarea>
```

**Alternates.** Take `.form-floating` when the surrounding rows use it, and set the height with a
stylesheet rule or a component variable rather than a `style` attribute. A one-row composer that
grows as the person types is the same control with a scripted height. A rich-text editor is a
hand-roll; Bootstrap ships none.

**States.** The fixed set, plus `full` where a character cap bounds the answer. Show the remaining
count in the `.form-text`, and keep it out of a live region unless the cap is close.

### A secret

**Default.** An `input[type=password].form-control` under a visible label, at rung 1.

```html
<label for="passphrase" class="form-label">Passphrase</label>
<div class="input-group">
	<input type="password" class="form-control" id="passphrase" autocomplete="current-password" />
	<button type="button" class="btn btn-outline-secondary" aria-pressed="false">Show</button>
</div>
```

**Alternates.** Take the `.input-group` reveal button whenever the value is typed rather than pasted
from a manager, and toggle `aria-pressed` with the input `type`. Never block paste, and never mask a
one-time code the person must read back.

**States.** The fixed set. A strength or availability check runs as `busy` while it waits, not as
`invalid`.

### A number

**Default.** An `input[type=number].form-control`, at rung 1. In a column of figures add
`text-end font-monospace` so the digits align, at rung 2.

```html
<label for="unit-count" class="form-label">Units</label>
<input type="number" class="form-control text-end font-monospace" id="unit-count" step="1" />
```

**Alternates.** Take `.input-group` with `.input-group-text` for a currency symbol or a unit, so the
unit is chrome rather than something the person must type. Where the value is an identifier rather
than a quantity, it belongs in the one-line-of-text row instead.

**States.** The fixed set. Validate the range on blur and state the bound in the message.

### A number in a bounded range

**Default.** An `input.form-range`, at rung 1, and only when a minimum, a maximum, and a step are all
fixed.

```html
<label for="threshold" class="form-label">Threshold</label>
<div class="d-flex align-items-center gap-2">
	<input type="range" class="form-range" id="threshold" min="0" max="100" step="5" />
	<output for="threshold" class="font-monospace">50</output>
</div>
```

**Alternates.** Keep a number input beside or instead of the slider when an exact value matters — a
range paints no read-out of its own, so a lone slider hides the value it sets. A two-thumb range is a
hand-roll: Bootstrap ships one thumb per input.

**States.** The fixed set. A disabled range still shows its value, so keep the read-out visible.

### A date

**Default.** An `input[type=date].form-control`, at rung 1. The platform brings the calendar, the
keyboard model, and the locale format.

```html
<label for="starts" class="form-label">Starts</label>
<input type="date" class="form-control" id="starts" />
```

**Alternates.** For a period, take two native inputs — a start and an end — before reaching for a
range picker, and validate the order on blur. A calendar grid of your own is a hand-roll.

**States.** The fixed set. Express an unavailable day with `min`, `max`, and a stated rule in the
help text, because a native picker takes no per-day exclusion.

### A time

**Default.** An `input[type=time].form-control`, at rung 1, with `step` set to the granularity the
value actually carries.

```html
<label for="cutoff" class="form-label">Cutoff</label>
<input type="time" class="form-control" id="cutoff" step="900" />
```

**Alternates.** Segmented numeric fields are a hand-roll and owe a spinbutton contract per segment.
Where the person picks from a fixed set of slots, this is one of many instead, and a select is the
lighter control.

**States.** The fixed set.

### A date and time

**Default.** An `input[type=datetime-local].form-control`, at rung 1.

```html
<label for="window-opens" class="form-label">Window opens</label>
<input type="datetime-local" class="form-control" id="window-opens" />
```

**Alternates.** Split into a date field and a time field when the two halves validate apart, when
one half is optional, or when a time zone control belongs between them. Name the zone the value is
stored in; a local datetime carries none.

**States.** The fixed set.

### A color

**Default.** An `input.form-control-color[type=color]`, at rung 1.

```html
<label for="brand-tint" class="form-label">Brand tint</label>
<input type="color" class="form-control form-control-color" id="brand-tint" value="#4a6fa5" />
```

**Alternates.** Pair the swatch with a text field when the value is copied, pasted, or read aloud
between people. Keep the swatch at a 24×24px target or larger.

**States.** The fixed set. A color input has no empty value, so give the field a default and say what
it is.

### One on/off answer

**Default.** A `.form-check` holding one `input.form-check-input[type=checkbox]` and its
`label.form-check-label`, at rung 1.

```html
<div class="form-check">
	<input class="form-check-input" type="checkbox" id="send-receipt" />
	<label class="form-check-label" for="send-receipt">Email me a receipt</label>
</div>
```

**Alternates.** Take `.form-check.form-switch` with `role="switch"` when the change applies the
moment it is flipped, and keep the plain checkbox when the value commits on submit. A lone box is
one answer; a group of boxes holding a list is a different category, so read the any-of rows before
grouping boxes.

**States.** The fixed set. A switch that applies immediately is `busy` while the change is in
flight, and reverts visibly when it fails.

### One of a few

**Default.** A radio group: `fieldset` and `legend` around `.form-check` rows, at rung 1.

```html
<fieldset>
	<legend class="form-label">Billing cycle</legend>
	<div class="form-check">
		<input class="form-check-input" type="radio" name="cycle" id="cycle-monthly" />
		<label class="form-check-label" for="cycle-monthly">Monthly</label>
	</div>
	<div class="form-check">
		<input class="form-check-input" type="radio" name="cycle" id="cycle-annual" />
		<label class="form-check-label" for="cycle-annual">Annual</label>
	</div>
</fieldset>
```

**Alternates.** Take a segmented `.btn-group` of `.btn-check` radios, at rung 2, when the choice
sits in a toolbar or a filter bar and every option fits on one row without wrapping; give the group
`role="radiogroup"` and one accessible name. A radio group and a segmented group draw the same
question, and the list size decides between them. Give a chosen filter an accent variant rather than
`btn-outline-secondary`.

**States.** The fixed set, applied to the group rather than to one option. Mark the group invalid,
name it in the message, and keep the error under the last row.

### One of many

**Default.** A `select.form-select`, at rung 1.

```html
<label for="territory" class="form-label">Territory</label>
<select class="form-select" id="territory">
	<option value="" selected disabled>Choose a territory</option>
	<option value="emea">EMEA</option>
</select>
```

**Alternates.** Drop to a radio group when the whole list fits in view and the options deserve
comparison. Move up to a searched list when the person can name the value faster than they can find
it, or when the list outgrows one scroll of the menu.

**States.** The fixed set, plus `empty` when the option list itself is empty — say why, and offer
the action that fills it. A locked select is `disabled`, so its value stops submitting; carry it in a
hidden input. A select whose options are loading is `busy`.

### One of many with an unlisted value admitted

**Default.** An `input.form-control` bound to a `<datalist>`, at rung 1. The list suggests, the
person can still submit a value it does not hold.

```html
<label for="carrier" class="form-label">Carrier</label>
<input class="form-control" list="carrier-options" id="carrier" />
<datalist id="carrier-options">
	<option value="Northwind Freight"></option>
</datalist>
```

**Alternates.** A combobox with free text is a hand-roll; take it only when the suggestions must be
fetched as the person types.

**States.** The fixed set. Attaching `list` changes the control's computed role to `combobox`, so
re-target every test and journey that finds this field by role.

### Any of a few

**Default.** `fieldset` and `legend` around `.form-check` checkbox rows sharing one name, at rung 1.

```html
<fieldset>
	<legend class="form-label">Notify me about</legend>
	<div class="form-check">
		<input class="form-check-input" type="checkbox" name="notify" id="notify-billing" />
		<label class="form-check-label" for="notify-billing">Billing</label>
	</div>
</fieldset>
```

**Alternates.** Take `.form-check-inline` when the options are short words and the row has space.
Bootstrap ships no `.form-check` color variant, so an accent or danger box is an authored rule over
tokens — take it only under the exception in [inspection.md](inspection.md) → When an authored rule
is already earned.

**States.** The fixed set, plus `empty` and `full`. State a minimum or a maximum count in the help
text and validate it on the group.

### Any of many

**Default.** A bounded, scrollable list of `.form-check` rows inside a bordered box, at rung 2, with
a filter field preceding it so the person can narrow the list before choosing.

```html
<label for="regions-filter" class="form-label">Regions</label>
<input type="search" class="form-control form-control-sm mb-2" id="regions-filter" />
<div class="border rounded overflow-auto p-2 mh-100" role="group" aria-label="Regions">
	<div class="form-check">
		<input class="form-check-input" type="checkbox" name="regions" id="region-emea" />
		<label class="form-check-label" for="region-emea">EMEA</label>
	</div>
</div>
```

**Alternates.** Take `select[multiple].form-select` where the platform control is acceptable to the
audience; its multi-select gesture is unteachable in a consumer flow but familiar in an internal
tool. A tags input is the ordered-set category. Bound the box's height from the layout that holds
it — Bootstrap ships `mh-100` and no other maximum-height step — never from a `style` attribute.

**States.** The fixed set, plus `empty` and `full`. Show the chosen count beside the list and give a
one-action way to clear it.

### A value picked from a searched list

**Default.** A combobox composed from shipped classes at rung 2, with the keyboard model
hand-rolled against the APG combobox pattern: an `input.form-control` carrying `role="combobox"`,
`aria-expanded`, `aria-controls`, `aria-autocomplete="list"`, and `aria-activedescendant`, over a
`ul.dropdown-menu[role=listbox]` of `.dropdown-item` buttons.

```html
<div class="input-group">
	<input
		class="form-control"
		type="text"
		role="combobox"
		aria-expanded="false"
		aria-controls="owner-listbox"
		aria-autocomplete="list"
		id="owner"
	/>
	<button type="button" class="btn btn-outline-secondary" aria-label="Clear">Clear</button>
</div>
<ul class="dropdown-menu show w-100 shadow" id="owner-listbox" role="listbox">
	<li><button type="button" class="dropdown-item" role="option">Northwind Freight</button></li>
</ul>
```

**Alternates.** Take the datalist in [One of many with an unlisted value
admitted](#one-of-many-with-an-unlisted-value-admitted) when the suggestions are static and short,
and pay for the combobox only when the list is fetched, ranked, or long enough to need one.

**States.** The fixed set, plus `empty` for a search that matched nothing — draw that with
`.dropdown-item-text`, never with an empty menu. The menu is `busy` while a query is in flight, and
the input stays operable throughout.

### Files

**Default.** An `input[type=file].form-control`, at rung 1.

```html
<label for="statement" class="form-label">Statement</label>
<input class="form-control" type="file" id="statement" accept=".csv" />
```

**Alternates.** Drive a hidden input from a button, a card, or a dropzone when the surface wants a
larger target; keep that input in the markup as the non-drag path, because a drag-only upload
strands keyboard and assistive-technology users. Dropzone chrome is an authored class contract over
tokens, and it owes a visible focus state of its own.

**States.** The fixed set, plus `empty` and `full`. Name the accepted types and the size cap in the
help text before the person picks, and report a rejected file beside the input rather than in a
toast.

### An ordered set of tags

**Default.** Bootstrap ships no tags input. Compose one at rung 2 from a text field that commits on
Enter plus a row of chips, each chip a `.badge` carrying a `btn-close` with its own accessible name.

```html
<label for="tag-entry" class="form-label">Tags</label>
<input class="form-control" type="text" id="tag-entry" aria-describedby="tag-entry-help" />
<div id="tag-entry-help" class="form-text">Press Enter to add a tag.</div>
<ul class="list-unstyled d-flex flex-wrap gap-2 mt-2">
	<li>
		<span class="badge text-bg-secondary d-inline-flex align-items-center gap-1">
			Priority
			<button
				type="button"
				class="btn-close"
				data-bs-theme="dark"
				aria-label="Remove Priority"
			></button>
		</span>
	</li>
</ul>
```

**Alternates.** Where the tags come from a fixed vocabulary, this is the any-of-many category and the
list is the better control. Where order carries meaning, give the reorder a non-drag path — a move
control per chip.

**States.** The fixed set, plus `empty` and `full`. Announce an added or removed tag in a
`role="status"` region, because the chip row is far from the field that changed it.

### A rating

**Default.** Bootstrap ships no rating. Draw the interactive form as a radio group at rung 2 — one
radio per value, restyled through `.btn-check` — so the keyboard model, the name, and the submitted
value come from the platform. Star chrome over that structure is an authored class contract at
rung 4.

```html
<fieldset>
	<legend class="form-label">Rating</legend>
	<div class="btn-group" role="radiogroup">
		<input type="radio" class="btn-check" name="rating" id="rating-1" />
		<label class="btn btn-outline-primary" for="rating-1">1</label>
	</div>
</fieldset>
```

**Alternates.** A read-only rating is not a control: draw it as a glyph row with one accessible name
stating the value, per [components.md](components.md) → Status glyph marks. A `role="slider"`
rating is a hand-roll and owes the APG slider contract, including its keyboard model.

**States.** The fixed set. Keep a cleared rating reachable, and say what cleared means.

### A step in a sequence

**Default.** A step indicator is not a field; it reports where the person is. Draw it from shipped
parts at rung 1 — a `nav` or `.list-group-numbered` whose current item carries `aria-current="step"`,
with a `.progress` bar where the count of steps is large.

```html
<nav aria-label="Application progress">
	<ol class="list-group list-group-numbered list-group-horizontal">
		<li class="list-group-item" aria-current="step">Details</li>
		<li class="list-group-item">Review</li>
	</ol>
</nav>
```

**Alternates.** Custom stepper chrome — connectors, dots, tick marks — is an authored class contract
over tokens. The rules for the sequence itself, including validation on leaving a step and where the
answers are held, live in [bootstrap-reference.md](bootstrap-reference.md) → Wizards & multi-step
forms.

**States.** The fixed set applies to the controls that move between steps, not to the indicator. Give
the indicator `rest` and a current mark that survives both themes, and never make position the only
signal that a step failed.

## Where Bootstrap ships no component

These categories have no shipped component, so each one is a build-or-buy decision before it is a
markup decision. Work the native-first ladder in
[bootstrap-reference.md](bootstrap-reference.md) → When not to hand-roll first, and take the
hand-roll only with the named pattern's contract in hand. The contracts for the patterns that file
already carries — dialog, combobox, radio group, toolbar — are in
[bootstrap-reference.md](bootstrap-reference.md) → Pattern contracts.

| Category                    | Pattern the hand-roll owes             |
| --------------------------- | -------------------------------------- |
| A date, as a calendar grid  | APG dialog plus a grid keyboard model  |
| A time, as segmented fields | APG spinbutton, per segment            |
| A searched list             | APG combobox                           |
| An ordered set of tags      | APG combobox plus removable buttons    |
| A rating, as one control    | APG slider                             |
| A two-thumb range           | APG slider, multi-thumb                |
| A files dropzone            | The visible input as the non-drag path |
| A data grid or a tree       | APG grid, APG tree view                |

Skeletons are not in this set: Bootstrap ships them, and
[components.md](components.md) → Placeholder (skeletons) owns the markup.
