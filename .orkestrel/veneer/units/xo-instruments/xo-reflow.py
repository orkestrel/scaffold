# Reflows each TSDoc paragraph in the named file that holds a line longer than 100 columns, to
# 100 columns under the ` * ` prefix. A paragraph is a run of ` * ` lines between blank ` *` lines,
# a tag line, or the block's ends; tabs never appear in these blocks.
import sys, textwrap
path = sys.argv[1]
lines = open(path).read().split('\n')
out = []
i = 0
changed = 0
def is_text(line):
	return line.startswith(' * ') and not line.startswith(' * @')
while i < len(lines):
	if is_text(lines[i]):
		j = i
		while j < len(lines) and (is_text(lines[j]) or (j > i and lines[j].startswith(' *   '))):
			j += 1
		para = lines[i:j]
		if any(len(line) > 100 for line in para) and not any(line.startswith(' *   ') for line in para):
			words = ' '.join(line[3:] for line in para)
			wrapped = textwrap.wrap(words, width=97, break_long_words=False, break_on_hyphens=False)
			out.extend(' * ' + w for w in wrapped)
			changed += 1
		else:
			out.extend(para)
		i = j
	else:
		out.append(lines[i])
		i += 1
open(path, 'w').write('\n'.join(out))
print('reflowed', changed)
