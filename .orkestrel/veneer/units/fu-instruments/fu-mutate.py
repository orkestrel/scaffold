# Applies or restores one named mutation of the UTIL-FRAMES unit. Usage:
#   python3 tmp/units/fu-mutate.py apply <name>
#   python3 tmp/units/fu-mutate.py restore <name>
# Each mutation replaces one exact string in one owned file, after copying the file to
# tmp/units/fu-mutation-backup/<name>; restore copies that backup back, which undoes exactly the
# mutation and nothing else.
import os, shutil, sys

ROOT = '/home/user/veneer-fu'
MUTATIONS = {
	'role-rings-default': (
		'app/browser/constants.ts',
		'<p><a class="focus-ring focus-ring-${role}" href="#main">focus-ring-${role}</a></p>',
		'<p><a class="focus-ring" href="#main">focus-ring-${role}</a></p>',
	),
	'ring-frame-unpadded': (
		'tests/app/browser/integration.test.ts',
		"""			const marker = document.createComment(key.scenario)
			specimen.before(marker)
			const lifted = build('div', { classes: 'p-2' })
			lifted.append(specimen)
			document.body.prepend(lifted)
			try {
				expect(mounted.host.querySelector('main')?.contains(link)).toBe(false)
				// The helper answers to focus itself""",
		"""			const marker = document.createComment(key.scenario)
			specimen.before(marker)
			const lifted = build('div')
			lifted.append(specimen)
			document.body.prepend(lifted)
			try {
				expect(mounted.host.querySelector('main')?.contains(link)).toBe(false)
				// The helper answers to focus itself""",
	),
	'link-state-undriven': (
		'tests/app/browser/integration.test.ts',
		"""				if (state === 'hover') {
					await stagePane(window.innerWidth, window.innerHeight)
					await hoverAccessible('link', readName(link))
				} else {
					// A key press after the focus is what makes the browser match the link as
					// keyboard focus.
					link.focus()
					await pressKeys('{ArrowRight}')
				}""",
		"""				if (state === 'hover') {
					await stagePane(window.innerWidth, window.innerHeight)
				}""",
	),
	'container-always-hidden': (
		'app/browser/constants.ts',
		'<span class="visually-hidden-focusable">This container shows while',
		'<span class="visually-hidden-focusable visually-hidden">This container shows while',
	),
	'default-ring-unrested': (
		'tests/setup.ts',
		"""	Object.freeze({
		scenario: 'default-focus-ring',
		subject: 'Default focus ring',
		selector: '.focus-ring',
		property: 'box-shadow',
	}),
""",
		'',
	),
	'emphasis-link-merged': (
		'app/browser/constants.ts',
		"""<a href="#main" class="link-dark">Dark link</a></p>',
	}),
	Object.freeze({
		name: 'Body emphasis link',
		markup: '<p><a href="#main" class="link-body-emphasis">Body emphasis link</a></p>',
	}),""",
		"""<a href="#main" class="link-dark">Dark link</a> <a href="#main" class="link-body-emphasis">Body emphasis link</a></p>',
	}),""",
	),
}

action, name = sys.argv[1], sys.argv[2]
path, old, new = MUTATIONS[name]
target = os.path.join(ROOT, path)
backup = os.path.join(ROOT, 'tmp/units/fu-mutation-backup', name)
if action == 'apply':
	os.makedirs(os.path.dirname(backup), exist_ok=True)
	shutil.copyfile(target, backup)
	text = open(target).read()
	if text.count(old) != 1:
		sys.exit(f'{name}: the mutated site occurs {text.count(old)} times in {path}')
	open(target, 'w').write(text.replace(old, new))
	print(f'applied {name} to {path}')
elif action == 'restore':
	shutil.copyfile(backup, target)
	os.remove(backup)
	print(f'restored {path} after {name}')
