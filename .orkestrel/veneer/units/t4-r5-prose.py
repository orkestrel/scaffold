# t4-r5-prose.py: the T4-R5 fix round's prose edits (t4-r5-brief.md). Gives every code token in the T4 delta's token lists
# its own noun, and drops the padding-box restriction from the `clipsOverflow` summary in the guide and the TSDoc alike.
# Refuses an anchor that does not match exactly once. Usage: python3 t4-r5-prose.py /home/user/test
import sys, os

root = sys.argv[1]
GUIDE = os.path.join(root, 'guides/test.md')
SOURCE = os.path.join(root, 'src/browser/helpers.ts')

EDITS = {
	GUIDE: [
		(
			"""which the `readClipEdge` helper reads. A `hidden`, `auto`, or `scroll` overflow clips at the
padding box, whatever the ancestor's `overflow-clip-margin` value selects. The `clip` keyword and a
paint containment over a `visible` overflow clip at the box that value selects, the padding box by
default, expanded by the length the `readClipMargin` helper reads. So a viewport-height specimen""",
			"""which the `readClipEdge` helper reads. An `overflow-y` value of the `hidden` keyword, the `auto`
keyword, or the `scroll` keyword clips at the padding box, whatever the ancestor's
`overflow-clip-margin` value selects. The `clip` keyword and a paint containment over a `visible`
overflow clip at the box that value selects, the padding box by default, expanded by the length the
`readClipMargin` helper reads. So a viewport-height specimen""",
		),
		(
			"""frames that count, and the `readClipEdge` helper reads each frame's clip edge. A `hidden`, `auto`,
or `scroll` overflow ends at the padding box. The `clip` keyword and a paint containment over a""",
			"""frames that count, and the `readClipEdge` helper reads each frame's clip edge. An `overflow-y`
value of the `hidden` keyword, the `auto` keyword, or the `scroll` keyword ends at the padding box.
The `clip` keyword and a paint containment over a""",
		),
		(
			"Reports whether an element clips its descendants' overflow at its own padding box.",
			"Reports whether an element clips its descendants' overflow.",
		),
	],
	SOURCE: [
		(
			""" * A `hidden`, `auto`, or `scroll` overflow stops its content at the padding box, whatever the
 * element's `overflow-clip-margin` value says. A `clip` overflow and a paint containment start the
 * edge from the box the computed `overflow-clip-margin` value names (the `border-box`,
 * `padding-box`, or `content-box` keyword, the padding box where the value names none) and expand it
 * by the length {@link readClipMargin} reads.""",
			""" * An `overflow-y` value of the `hidden` keyword, the `auto` keyword, or the `scroll` keyword stops
 * the content at the padding box, whatever the element's `overflow-clip-margin` value says. A `clip`
 * overflow and a paint containment start the edge from the box the computed `overflow-clip-margin`
 * value names (the `border-box` keyword, the `padding-box` keyword, or the `content-box` keyword,
 * and the padding box where the value names none) and expand it by the length
 * {@link readClipMargin} reads.""",
		),
		(
			""" * containment and has no effect on a `hidden`, `auto`, or `scroll` overflow, whose content stops
 * at the padding box whatever the property says.""",
			""" * containment and has no effect on an `overflow-y` value of the `hidden` keyword, the `auto`
 * keyword, or the `scroll` keyword, whose content stops at the padding box whatever the property
 * says.""",
		),
		(
			" * Reports whether an element clips its descendants' overflow at its own padding box.",
			" * Reports whether an element clips its descendants' overflow.",
		),
		(
			""" * keyword or whose computed `contain` value carries paint containment (the `paint`, `content`, or
 * `strict` keyword).""",
			""" * keyword or whose computed `contain` value carries paint containment (the `paint` keyword, the
 * `content` keyword, or the `strict` keyword).""",
		),
	],
}

for path, edits in EDITS.items():
	text = open(path).read()
	for old, new in edits:
		count = text.count(old)
		if count != 1:
			sys.exit(f'anchor matched {count} times in {path}: {old[:60]!r}')
		text = text.replace(old, new, 1)
	open(path, 'w').write(text)
	print('applied', len(edits), 'edits to', path)
