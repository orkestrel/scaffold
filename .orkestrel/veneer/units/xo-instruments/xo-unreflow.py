# Restores the base line breaks of every TSDoc paragraph whose words the unit did not change, so the
# reflow stays on the paragraphs the unit edited.
import sys
base_path, path = sys.argv[1], sys.argv[2]
def is_text(line):
	return line.startswith(' * ') and not line.startswith(' * @')
def paragraphs(lines):
	i = 0
	while i < len(lines):
		if is_text(lines[i]):
			j = i
			while j < len(lines) and (is_text(lines[j]) or (j > i and lines[j].startswith(' *   '))):
				j += 1
			yield i, j
			i = j
		else:
			i += 1
base = open(base_path).read().split('\n')
index = {}
for i, j in paragraphs(base):
	index.setdefault(' '.join(' '.join(l[3:] for l in base[i:j]).split()), base[i:j])
lines = open(path).read().split('\n')
out = []
last = 0
restored = 0
for i, j in paragraphs(lines):
	out.extend(lines[last:i])
	key = ' '.join(' '.join(l[3:] for l in lines[i:j]).split())
	original = index.get(key)
	if original is not None and original != lines[i:j]:
		out.extend(original)
		restored += 1
	else:
		out.extend(lines[i:j])
	last = j
out.extend(lines[last:])
open(path, 'w').write('\n'.join(out))
print('restored', restored)
