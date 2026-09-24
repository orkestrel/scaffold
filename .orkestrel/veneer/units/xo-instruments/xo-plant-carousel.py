# Plants one carousel specimen into the CAROUSEL_SPECIMENS table: a copy of the captioned specimen
# under its own name and id. With the argument `nameless` the copy's first indicator loses its
# aria-label attribute, which the naming case must refuse.
import re, sys
path = '/home/user/veneer-xo/app/browser/constants.ts'
variant = sys.argv[1]
text = open(path).read()
head = 'export const CAROUSEL_SPECIMENS: readonly MarkupSpecimen[] = Object.freeze([\n'
start = text.index(head) + len(head)
end = text.index('\t}),\n', start) + len('\t}),\n')
entry = text[start:end]
assert "name: 'Captioned carousel'" in entry
planted = entry.replace("'Captioned carousel'", "'Planted carousel'").replace('pier', 'planted').replace('Pier', 'Planted').replace('Previous planted', 'Previous planted one').replace('Next planted', 'Next planted one')
if variant == 'nameless':
	planted = planted.replace(' aria-label="Planted 1"', '', 1)
text = text[:end] + planted + text[end:]
open(path, 'w').write(text)
