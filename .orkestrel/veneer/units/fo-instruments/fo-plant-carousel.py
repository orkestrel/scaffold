# Plants, or removes, one carousel specimen in the CAROUSEL_SPECIMENS table of the fo worktree: a
# copy of the captioned specimen under its own name, id, and control labels, inserted after the
# captioned specimen. `plant` inserts the copy; `remove` deletes exactly the inserted copy.
import sys
path = '/home/user/veneer-fo/app/browser/constants.ts'
action = sys.argv[1]
text = open(path).read()
head = 'export const CAROUSEL_SPECIMENS: readonly MarkupSpecimen[] = Object.freeze([\n'
start = text.index(head) + len(head)
end = text.index('\t}),\n', start) + len('\t}),\n')
entry = text[start:end]
assert "name: 'Captioned carousel'" in entry
planted = (
	entry.replace("'Captioned carousel'", "'Planted carousel'")
	.replace('pier', 'planted')
	.replace('Pier', 'Planted')
	.replace('Previous planted', 'Previous planted one')
	.replace('Next planted', 'Next planted one')
)
if action == 'plant':
	assert planted not in text
	text = text[:end] + planted + text[end:]
elif action == 'remove':
	assert text.count(planted) == 1
	text = text.replace(planted, '', 1)
else:
	raise SystemExit('usage: fo-plant-carousel.py plant|remove')
open(path, 'w').write(text)
print(action, 'done')
