# Applies or reverts one named mutation of the fo unit: an exact, single-occurrence text swap in one
# file. `apply NAME` replaces the mutation's original text with its mutated text; `revert NAME`
# swaps it back. Each swap refuses unless its source text occurs exactly once.
import sys

ROOT = '/home/user/veneer-fo/'
MUTATIONS = {
	# P12: the advancing case's scroll left to the document's own behavior.
	'scroll-default': (
		'tests/app/browser/sections/CarouselSection.test.ts',
		"picture.scrollIntoView({ block: 'center', behavior: 'instant' })",
		'picture.scrollIntoView()',
	),
	# P11: the advancing specimen's incoming picture drawn at its own width.
	'picture-own-width': (
		'app/browser/constants.ts',
		r'<img class="w-100" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 800 400\'%3E%3Crect width=\'800\' height=\'400\' fill=\'%23fd7e14\'',
		r'<img class="img-fluid" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 800 400\'%3E%3Crect width=\'800\' height=\'400\' fill=\'%23fd7e14\'',
	),
	# P16: the plain alert paints a fill and a text color through a utility that is not a role class.
	'plain-alert-fill': (
		'app/browser/constants.ts',
		'<div class="alert" role="alert">The Northworks yard',
		'<div class="alert text-bg-primary" role="alert">The Northworks yard',
	),
	# P16: the tree without the next control's registry rows, the red-first state of its case.
	'no-fading-rows': (
		'tests/setup.ts',
		"""	Object.freeze({ scenario: 'captioned-carousel-focus', subject: 'Captioned carousel' }),
	Object.freeze({ scenario: 'fading-carousel-hover', subject: 'Fading carousel' }),
	Object.freeze({ scenario: 'fading-carousel-focus', subject: 'Fading carousel' }),
""",
		"""	Object.freeze({ scenario: 'captioned-carousel-focus', subject: 'Captioned carousel' }),
""",
	),
	# P16: the next control's hover frame shot after the pointer is released.
	'hover-released': (
		'tests/app/browser/integration.test.ts',
		"""			await stageMedia({ motion: false })
			await FRAMES.place('fading-carousel-hover', control, specimen)""",
		"""			await stageMedia({ motion: false })
			await releasePointer()
			await FRAMES.place('fading-carousel-hover', control, specimen)""",
	),
	# P16: the bottom popover's header paints the body fill, so the strip's fill differs from it.
	'strip-header-fill': (
		'app/browser/constants.ts',
		'<h3 class="popover-header">Popover on bottom</h3>',
		'<h3 class="popover-header bg-body">Popover on bottom</h3>',
	),
	# P16: the bottom popover's header drops below the popover's top edge, off the strip's row.
	'strip-off-row': (
		'app/browser/constants.ts',
		'<h3 class="popover-header">Popover on bottom</h3>',
		'<h3 class="popover-header mt-1">Popover on bottom</h3>',
	),
}


def swap(path: str, source: str, target: str) -> None:
	text = open(ROOT + path).read()
	count = text.count(source)
	if count != 1:
		raise SystemExit(f'{path}: expected one occurrence, found {count}')
	open(ROOT + path, 'w').write(text.replace(source, target, 1))


action, name = sys.argv[1], sys.argv[2]
path, original, mutated = MUTATIONS[name]
if action == 'apply':
	swap(path, original, mutated)
elif action == 'revert':
	swap(path, mutated, original)
else:
	raise SystemExit('usage: fo-mutate.py apply|revert NAME')
print(action, name, 'in', path)
