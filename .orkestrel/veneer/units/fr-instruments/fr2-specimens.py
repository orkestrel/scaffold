# Applies the round-2 forms specimen changes to app/browser/constants.ts. Unit FORMS-FRAMES (fr).
import sys

p = '/home/user/veneer-fr/app/browser/constants.ts'
s = open(p).read()


def once(old, new):
    global s
    if s.count(old) != 1:
        sys.exit(f'anchor not found once: {old[:90]!r}')
    s = s.replace(old, new)


# The validated check sits in a `.form-check` row, as the release's validation markup writes it.
once("""				markup: `<div><input class="form-check-input is-${state}" type="checkbox" id="${id}" checked=""><label class="form-check-label" for="${id}">${label}</label></div>`,""",
     """				markup: `<div class="form-check"><input class="form-check-input is-${state}" type="checkbox" id="${id}" checked=""><label class="form-check-label" for="${id}">${label}</label></div>`,""")

# The validated multiple select, in both states.
once("""		{
			name: 'Validated form',
			host: 'form',""", """		{
			name: 'Valid multiple select',
			host: 'multiple',
			state: 'valid',
			id: 'valid-warehouses',
			label: 'Valid warehouses',
			value: 'Northworks',
		},
		{
			name: 'Invalid multiple select',
			host: 'multiple',
			state: 'invalid',
			id: 'invalid-warehouses',
			label: 'Invalid warehouses',
			value: 'Unassigned',
		},
		{
			name: 'Validated form',
			host: 'form',""")
once("""		if (host === 'check') {""", """		if (host === 'multiple') {
			return Object.freeze({
				name,
				markup: `${field}<select class="form-select is-${state}" id="${id}" multiple=""><option>${value}</option><option>Southgate</option></select>`,
			})
		}
		if (host === 'check') {""")

# The grouped select and the grouped floating wrapper each end with a button, the sized groups hold a
# select, and a toolbar holds a group beside a button group.
once("""			'<div class="input-group"><label class="input-group-text" for="grouped-warehouse">Stock from</label><select class="form-select" id="grouped-warehouse"><option>Northworks</option><option>Southgate</option></select></div>',
	}),""", """			'<div class="input-group"><label class="input-group-text" for="grouped-warehouse">Stock from</label><select class="form-select" id="grouped-warehouse"><option>Northworks</option><option>Southgate</option></select><button type="button" class="btn btn-outline-secondary">Reserve stock</button></div>',
	}),""")
once("""			'<div class="input-group"><span class="input-group-text">@</span><div class="form-floating"><input type="text" class="form-control" id="grouped-recipient" placeholder="Recipient"><label for="grouped-recipient">Recipient handle</label></div></div>',
	}),
])""", """			'<div class="input-group"><span class="input-group-text">@</span><div class="form-floating"><input type="text" class="form-control" id="grouped-recipient" placeholder="Recipient"><label for="grouped-recipient">Recipient handle</label></div><button type="button" class="btn btn-outline-secondary">Verify handle</button></div>',
	}),
	...[
		{ name: 'Input group select large', size: 'lg', label: 'Large' },
		{ name: 'Input group select small', size: 'sm', label: 'Small' },
	].map(({ name, size, label }) =>
		Object.freeze({
			name,
			markup: `<div class="input-group input-group-${size}"><label class="input-group-text" for="grouped-${size}-warehouse">${label} stock</label><select class="form-select" id="grouped-${size}-warehouse"><option>Northworks</option><option>Southgate</option></select></div>`,
		}),
	),
	Object.freeze({
		name: 'Input group toolbar',
		markup:
			'<div class="btn-toolbar" role="toolbar" aria-label="Order tools"><div class="btn-group me-2" role="group" aria-label="Order actions"><button type="button" class="btn btn-outline-secondary">Refresh orders</button></div><div class="input-group"><span class="input-group-text">#</span><input class="form-control" type="text" aria-label="Toolbar order number"></div></div>',
	}),
])""")

# The empty plaintext control inside a floating container.
once("""			'<div class="form-floating"><input type="email" class="form-control-plaintext" id="floating-account" placeholder="dispatch@example.com" value="dispatch@example.com" readonly=""><label for="floating-account">Account email</label></div>',
	}),
])""", """			'<div class="form-floating"><input type="email" class="form-control-plaintext" id="floating-account" placeholder="dispatch@example.com" value="dispatch@example.com" readonly=""><label for="floating-account">Account email</label></div>',
	}),
	Object.freeze({
		name: 'Form floating empty plaintext',
		markup:
			'<div class="form-floating"><input type="email" class="form-control-plaintext" id="floating-unset" placeholder="dispatch@example.com" readonly=""><label for="floating-unset">Unset email</label></div>',
	}),
])""")

# Prose: the region copy and the TSDoc each changed table's specimens make false.
once("""		'Compare each floating label at rest and floated: over an empty field, a filled one, a filled and an empty textarea, a select, a disabled textarea, field, and select, and a read-only value.',""",
     """		'Compare each floating label at rest and floated: over an empty field, a filled one, a filled and an empty textarea, a select, a disabled textarea, field, and select, and a filled and an empty read-only value.',""")
once(""" * label without a backdrop, because the backdrop is the textarea's alone.
 */""", """ * label without a backdrop, because the backdrop is the textarea's alone. The empty plaintext control carries its placeholder
 * alone, so keyboard focus moves its text down to the floated inset, where the filled one already
 * sits.
 */""")
once("""a select and a floating label joined to an addon, and a focused button lifted over the button beside it.',""",
     """a select and a floating label joined between an addon and a button, a select in a large and a small group, a group in a toolbar, and a focused button lifted over the button beside it.',""")
once(""" * keyboard focus on the `Earlier order` button lifts it above the level its neighbour rests on and
 * its ring paints over that neighbour. The select and the floating
 * wrapper each follow an addon, which is the position the group squares a child's leading corners in,
 * and the floating wrapper holds its label, so its frame shows a floated label inside a group.
 */""", """ * keyboard focus on the `Earlier order` button lifts it above the level its neighbour rests on and
 * its ring paints over that neighbour. The select and the floating wrapper each sit between an addon
 * and a trailing button, which is where the group squares both of a child's inline corners and where
 * keyboard focus lifts the child's ring over the button. The floating wrapper holds an empty control
 * and its label, so at rest the label sits over the control, and focus floats it. The sized selects
 * are one ramp, derived from the size list, and each keeps the room its indicator needs. The toolbar
 * holds a button group beside a group, which inside a toolbar takes its content's width.
 */""")
once(""" * failing twin cannot drift apart. The textarea and the color control each take the state on the
 * control the release gives a rule of its own, and the inline check holds its feedback inside its
 * row, where the inline rule reaches it.""", """ * failing twin cannot drift apart. The textarea and the color control each take the state on the
 * control the release gives a rule of its own, and the inline check holds its feedback inside its
 * row, where the inline rule reaches it. A check sits in a `.form-check` row, as the release's
 * validation markup writes it, so its focus ring clears its label, and a select showing several
 * values carries the state without the mark, which the release withholds from it.""")

open(p, 'w').write(s)
print('applied')

# The plaintext form and the floating plaintext form announced one name; the journey reaches each
# plaintext control by its name, so the plaintext form takes a name of its own.
s = open(p).read()
once("""'<input class="form-control-plaintext" type="text" aria-label="Account email" value="reader@example.com" readonly="">',""",
     """'<input class="form-control-plaintext" type="text" aria-label="Reader email" value="reader@example.com" readonly="">',""")
open(p, 'w').write(s)
print('renamed')
