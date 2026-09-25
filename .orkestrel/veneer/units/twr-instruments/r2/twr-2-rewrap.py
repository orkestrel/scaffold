# Rewraps one Markdown paragraph, named by a prefix of its first line and of its last line, at 100
# columns, keeping every inline code span on one line.
# Usage: python3 tmp/units/twr-2-rewrap.py <file> <first-line-prefix> <last-line-prefix>
import pathlib
import re
import sys
import textwrap

path = pathlib.Path(sys.argv[1])
first, last = sys.argv[2], sys.argv[3]
lines = path.read_text().split('\n')
starts = [i for i, line in enumerate(lines) if line.startswith(first)]
assert len(starts) == 1, (first, starts)
start = starts[0]
end = next(i for i in range(start, len(lines)) if lines[i].startswith(last))
assert all(lines[i].strip() for i in range(start, end + 1)), 'span crosses a blank line'
text = ' '.join(line.strip() for line in lines[start:end + 1])
KEEP = ' '
assert KEEP not in text
protected = re.sub(r'`[^`]*`', lambda match: match.group(0).replace(' ', KEEP), text)
wrapped = textwrap.wrap(protected, width=100, break_long_words=False, break_on_hyphens=False)
lines[start:end + 1] = [line.replace(KEEP, ' ') for line in wrapped]
path.write_text('\n'.join(lines))
print(start + 1, end + 1, '->', start + len(wrapped))
