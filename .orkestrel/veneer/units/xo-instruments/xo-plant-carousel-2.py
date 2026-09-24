# Plants one control specimen into the CAROUSEL_SPECIMENS table: a copy of the captioned specimen
# under its own name and id whose class lists the population predicates read are either reordered
# (the `reordered` argument: each read class stands after an inert `vn-control` class) or extended
# (the `extra` argument: each read class stands before an inert `vn-control` class). The copy
# carries two defects the populations exist to catch: its first indicator loses the active state,
# and its carousel takes the `carousel-dark` class over the dark pictures, so its black captions
# fail the contrast floor. A population that admits the control reddens on the defect it checks.
import sys
path = '/home/user/veneer-xo/app/browser/constants.ts'
variant = sys.argv[1]
text = open(path).read()
head = 'export const CAROUSEL_SPECIMENS: readonly MarkupSpecimen[] = Object.freeze([\n'
start = text.index(head) + len(head)
end = text.index('\t}),\n', start) + len('\t}),\n')
entry = text[start:end]
assert "name: 'Captioned carousel'" in entry
label = 'Reordered' if variant == 'reordered' else 'Extended'
planted = entry.replace("'Captioned carousel'", f"'{label} control carousel'").replace('pier', 'control').replace('Pier', 'Control')
planted = planted.replace('Previous control', f'Previous {label} control').replace('Next control', f'Next {label} control')
assert planted.count(' class="active" aria-current="true"') == 1
planted = planted.replace(' class="active" aria-current="true"', '', 1)
def wrap(name):
	return f'vn-control {name}' if variant == 'reordered' else f'{name} vn-control'
assert planted.count('class="carousel"') == 1
planted = planted.replace('class="carousel"', f'class="{wrap("carousel-dark")} carousel"' if variant == 'reordered' else 'class="carousel carousel-dark vn-control"')
assert planted.count('class="carousel-indicators"') == 1
planted = planted.replace('class="carousel-indicators"', f'class="{wrap("carousel-indicators")}"')
assert planted.count('class="carousel-caption"') >= 1
planted = planted.replace('class="carousel-caption"', f'class="{wrap("carousel-caption")}"')
text = text[:end] + planted + text[end:]
open(path, 'w').write(text)
