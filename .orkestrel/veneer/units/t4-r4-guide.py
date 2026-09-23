# t4-r4-guide.py: the T4-R4 fix round's guide edits (t4-r4-brief.md). Refuses an anchor that does not match exactly once.
# Usage: python3 t4-r4-guide.py /home/user/test
import sys, os

root = sys.argv[1]
path = os.path.join(root, 'guides/test.md')
text = open(path).read()

EDITS = [
	(
		"""`visible` keyword, or a paint containment) caps a descendant's edge at that ancestor's clip edge,
which the `readClipEdge` helper reads from the box the ancestor's `overflow-clip-margin` value
selects, the padding box by default, expanded by the length the `readClipMargin` helper reads where
the clip is the `clip` keyword or a paint containment. So a viewport-height specimen inside a""",
		"""`visible` keyword, or a paint containment) caps a descendant's edge at that ancestor's clip edge,
which the `readClipEdge` helper reads. A `hidden`, `auto`, or `scroll` overflow clips at the
padding box, whatever the ancestor's `overflow-clip-margin` value selects. The `clip` keyword and a
paint containment over a `visible` overflow clip at the box that value selects, the padding box by
default, expanded by the length the `readClipMargin` helper reads. So a viewport-height specimen inside a""",
	),
	(
		"""where a viewport-bound child ends at the frame's clip edge. The `clipsOverflow` helper names the
frames that count, and the `readClipEdge` helper reads each frame's clip edge from the box its
`overflow-clip-margin` value selects, the padding box by default, expanded by the margin the
`readClipMargin` helper reads.""",
		"""where a viewport-bound child ends at the frame's clip edge. The `clipsOverflow` helper names the
frames that count, and the `readClipEdge` helper reads each frame's clip edge. A `hidden`, `auto`,
or `scroll` overflow ends at the padding box. The `clip` keyword and a paint containment over a
`visible` overflow end at the box the frame's `overflow-clip-margin` value selects, the padding box
by default, expanded by the margin the `readClipMargin` helper reads.""",
	),
]

for old, new in EDITS:
	count = text.count(old)
	if count != 1:
		sys.exit(f'anchor matched {count} times: {old[:60]!r}')
	text = text.replace(old, new, 1)

open(path, 'w').write(text)
print('applied', len(EDITS), 'edits to', path)
