# Applies the forms specimen additions to app/browser/constants.ts. Unit FORMS-FRAMES (fr).
import sys

p = '/home/user/veneer-fr/app/browser/constants.ts'
s = open(p).read()


def once(old, new):
    global s
    if s.count(old) != 1:
        sys.exit(f'anchor not found once: {old[:80]!r}')
    s = s.replace(old, new)


def spec(name, markup):
    return f"\tObject.freeze({{\n\t\tname: '{name}',\n\t\tmarkup:\n\t\t\t'{markup}',\n\t}}),\n"


def after_spec(name, blocks):
    global s
    anchor = f"\t\tname: '{name}',\n"
    if s.count(anchor) != 1:
        sys.exit(f'specimen not found once: {name}')
    i = s.index(anchor)
    j = s.index('\t}),\n', i) + len('\t}),\n')
    s = s[:j] + ''.join(blocks) + s[j:]


# Form control: the small and large step of the textarea, the file, the color, and the plaintext
# controls, each after its base control.
after_spec('Form control textarea', [
    spec('Form control textarea small', '<textarea class="form-control form-control-sm" aria-label="Small message" rows="3"></textarea>'),
    spec('Form control textarea large', '<textarea class="form-control form-control-lg" aria-label="Large message" rows="3"></textarea>'),
])
after_spec('Form control file', [
    spec('Form control file small', '<input class="form-control form-control-sm" type="file" aria-label="Small attachment">'),
    spec('Form control file large', '<input class="form-control form-control-lg" type="file" aria-label="Large attachment">'),
])
after_spec('Form control color', [
    spec('Form control color small', '<input class="form-control form-control-color form-control-sm" type="color" aria-label="Small accent color">'),
    spec('Form control color large', '<input class="form-control form-control-color form-control-lg" type="color" aria-label="Large accent color">'),
])
after_spec('Form control plaintext', [
    spec('Form control plaintext small', '<input class="form-control-plaintext form-control-sm" type="text" aria-label="Small account email" value="reader@example.com" readonly="">'),
    spec('Form control plaintext large', '<input class="form-control-plaintext form-control-lg" type="text" aria-label="Large account email" value="reader@example.com" readonly="">'),
])

# Form floating: an empty textarea, and a disabled text control and select.
after_spec('Form floating textarea', [
    spec('Form floating empty textarea', '<div class="form-floating"><textarea class="form-control" id="floating-pickup" placeholder="Notes"></textarea><label for="floating-pickup">Pickup notes</label></div>'),
])
after_spec('Form floating disabled', [
    spec('Form floating disabled input', '<div class="form-floating"><input type="text" class="form-control" id="floating-depot" placeholder="Depot" value="North depot" disabled=""><label for="floating-depot">Closed depot</label></div>'),
    spec('Form floating disabled select', '<div class="form-floating"><select class="form-select" id="floating-route" disabled=""><option selected="">Harbor Line</option></select><label for="floating-route">Retired route</label></div>'),
])

# Input group: a button pair leading a control, a select after an addon, and a floating label after
# an addon.
after_spec('Input group dropdown validated', [
    spec('Input group buttons', '<div class="input-group"><button type="button" class="btn btn-outline-secondary">Earlier order</button><button type="button" class="btn btn-outline-secondary">Later order</button><input class="form-control" type="text" aria-label="Order number"></div>'),
    spec('Input group select', '<div class="input-group"><label class="input-group-text" for="grouped-warehouse">Stock from</label><select class="form-select" id="grouped-warehouse"><option>Northworks</option><option>Southgate</option></select></div>'),
    spec('Input group floating', '<div class="input-group"><span class="input-group-text">@</span><div class="form-floating"><input type="text" class="form-control" id="grouped-recipient" placeholder="Recipient"><label for="grouped-recipient">Recipient handle</label></div></div>'),
])

# Validation: the textarea, color, and inline-check hosts in both states, and the passing branch of
# the scoped form.
once("""		{
			name: 'Validated form',
			host: 'form',
			state: 'invalid',
			id: 'required-destination',
			label: 'Required destination',
			value: '',
		},
	].map(""", """		{
			name: 'Valid textarea',
			host: 'textarea',
			state: 'valid',
			id: 'valid-notes',
			label: 'Valid notes',
			value: 'Stack the oak on pallets.',
		},
		{
			name: 'Invalid textarea',
			host: 'textarea',
			state: 'invalid',
			id: 'invalid-notes',
			label: 'Invalid notes',
			value: '',
		},
		{
			name: 'Valid color',
			host: 'color',
			state: 'valid',
			id: 'valid-shade',
			label: 'Valid shade',
			value: '',
		},
		{
			name: 'Invalid color',
			host: 'color',
			state: 'invalid',
			id: 'invalid-shade',
			label: 'Invalid shade',
			value: '',
		},
		{
			name: 'Valid inline feedback',
			host: 'inline',
			state: 'valid',
			id: 'valid-inline-box',
			label: 'Valid inline inspection',
			value: '',
		},
		{
			name: 'Invalid inline feedback',
			host: 'inline',
			state: 'invalid',
			id: 'invalid-inline-box',
			label: 'Invalid inline inspection',
			value: '',
		},
		{
			name: 'Validated form',
			host: 'form',
			state: 'invalid',
			id: 'required-destination',
			label: 'Required destination',
			value: '',
		},
		{
			name: 'Validated passing form',
			host: 'form',
			state: 'valid',
			id: 'filled-destination',
			label: 'Filled destination',
			value: 'Lisbon',
		},
	].map(""")
once("""		if (host === 'form') {
			return Object.freeze({
				name,
				markup: `<form class="was-validated">${field}<input class="form-control" id="${id}" required=""><div class="invalid-feedback">${note}</div></form>`,
			})
		}
""", """		if (host === 'form') {
			return Object.freeze({
				name,
				markup: `<form class="was-validated">${field}<input class="form-control" id="${id}" required=""${value === '' ? '' : ` value="${value}"`}><div class="${state}-feedback">${note}</div></form>`,
			})
		}
		if (host === 'textarea') {
			return Object.freeze({
				name,
				markup: `${field}<textarea class="form-control is-${state}" id="${id}" rows="3">${value}</textarea>`,
			})
		}
		if (host === 'color') {
			return Object.freeze({
				name,
				markup: `${field}<input class="form-control form-control-color is-${state}" type="color" id="${id}">`,
			})
		}
		if (host === 'inline') {
			return Object.freeze({
				name,
				markup: `<div class="form-check form-check-inline"><input class="form-check-input is-${state}" type="checkbox" id="${id}"><label class="form-check-label" for="${id}">${label}</label><div class="${state}-feedback">${note}</div></div>`,
			})
		}
""")

open(p, 'w').write(s)
print('applied')

# Copy and TSDoc: each table's prose names the specimens this unit adds.
s = open(p).read()
once("""	paragraph:
		'Compare the text control at each size, the textarea, the file, date, and color controls, the plaintext form, and a disabled and a readonly control, and the ring keyboard focus paints on the text control.',""",
"""	paragraph:
		'Compare the text control, the textarea, the file and color controls, and the plaintext form at each size, the date control, a disabled and a readonly control, the file button under the pointer, and the ring keyboard focus paints on the text control.',""")
once(""" * The color control carries no value, so it renders the control's own default rather than a color
 * this module would have to write as a literal. The date control carries a fixed value, so its frame
 * shows the same filled date fields on every run.
 */
export const FORM_CONTROL_SPECIMENS""",
""" * The color control carries no value, so it renders the control's own default rather than a color
 * this module would have to write as a literal. The date control carries a fixed value, so its frame
 * shows the same filled date fields on every run.
 *
 * The textarea, the file control, the color control, and the plaintext form each follow with their
 * small and large steps, each specimen its base control's markup with the size class its name claims,
 * because the size rules write a separate treatment for each of those controls: the textarea's and
 * the color control's heights, the file button's inset, and the plaintext form's cleared inline
 * padding.
 */
export const FORM_CONTROL_SPECIMENS""")
once("""	paragraph:
		'Compare each floating label at rest and floated: over an empty field, a filled one, a textarea, a select, a disabled field, and a read-only value.',""",
"""	paragraph:
		'Compare each floating label at rest and floated: over an empty field, a filled one, a filled and an empty textarea, a select, a disabled textarea, field, and select, and a read-only value.',""")
once(""" * keyboard traversal. The filled field, the textarea, and the plaintext value carry their text in
 * the markup, so each renders its label floated with no drive; the disabled field is a filled
 * textarea, which shows the disabled label and the disabled backdrop in one frame.
 */""",
""" * keyboard traversal. The filled field, the textarea, and the plaintext value carry their text in
 * the markup, so each renders its label floated with no drive; the disabled field is a filled
 * textarea, which shows the disabled label and the disabled backdrop in one frame.
 *
 * The empty textarea carries its placeholder alone, so its label rests over the control until
 * keyboard focus floats it and paints the backdrop behind it, which the filled textarea shows only
 * because it carries text. The disabled text control and the disabled select show the disabled
 * label without a backdrop, because the backdrop is the textarea's alone.
 */""")
once("""		'Compare a control joined to its addons, buttons, and dropdown toggles: the shared borders, the squared inner corners, each size, the feedback a failing group reports under its row, and the tooltip a passing or a failing group hangs over the row after it.',""",
"""		'Compare a control joined to its addons, buttons, and dropdown toggles: the shared borders, the squared inner corners, each size, the feedback a failing group reports under its row, the tooltip a passing or a failing group hangs over the row after it, a select and a floating label joined to an addon, and a focused button lifted over the button beside it.',""")
once(""" * class is set in markup, and each toggle announces the `aria-expanded="false"` state: no script
 * opens a menu in this region.
 */""",
""" * class is set in markup, and each toggle announces the `aria-expanded="false"` state: no script
 * opens a menu in this region.
 *
 * The button pair leads its group with two buttons, so keyboard focus on the first lifts it above
 * the level the second rests on and its ring paints over that neighbour. The select and the floating
 * wrapper each follow an addon, which is the position the group squares a child's leading corners in,
 * and the floating wrapper holds its label, so its frame shows a floated label inside a group.
 */""")
once(""" * Each row names the host, the state, the control's own identifier, and the text it announces, and
 * the markup is derived from that row rather than written twice, so a passing specimen and its
 * failing twin cannot drift apart.""",
""" * Each row names the host, the state, the control's own identifier, and the text it announces, and
 * the markup is derived from that row rather than written twice, so a passing specimen and its
 * failing twin cannot drift apart. The textarea and the color control each take the state on the
 * control the release gives a rule of its own, and the inline check holds its feedback inside its
 * row, where the inline rule reaches it. The scoped form renders once failing, with its required
 * control empty, and once passing, with that control filled, which are the two branches the
 * `.was-validated` scope reaches.""")
open(p, 'w').write(s)
print('prose applied')
