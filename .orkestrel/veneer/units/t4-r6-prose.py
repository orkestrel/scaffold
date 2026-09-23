# t4-r6-prose.py: the T4-R6 fix round's prose edits (t4-r6-brief.md), the whole remaining surface in one pass. Each edit
# names a documentation paragraph by a unique opening, replaces sentences inside it (each replacement must match exactly
# once), and rewraps that paragraph to 100 columns without breaking a code span or a `{@link}` tag. Refuses an anchor
# that does not match exactly once. Usage: python3 t4-r6-prose.py /home/user/test
import os, re, sys

root = sys.argv[1]
SOURCE = os.path.join(root, 'src/browser/helpers.ts')
SETUP = os.path.join(root, 'tests/setupBrowser.ts')
WIDTH = 100
PREFIX = ' * '

PARAGRAPHS = [
	(SOURCE, "@returns The element's overflow clip edge in CSS pixels", [
		("and `undefined` for an element that clips nothing", "or the `undefined` value for an element that clips nothing"),
	]),
	(SOURCE, "An `overflow-y` value of the `hidden` keyword, the `auto` keyword, or the `scroll` keyword stops", [
		("A `clip` overflow and a paint containment start the edge", "A `clip` overflow and a paint containment over a `visible` overflow start the edge"),
		("So a bordered or padded frame with a clip margin ends where the browser stops painting its content, not at its border box plus the margin.",
		 "So a bordered or padded frame whose clip margin names no box ends at its padding box plus the margin, where the browser stops painting its content, rather than at its border box plus the margin."),
	]),
	(SOURCE, "@returns The computed `overflow-clip-margin` length in CSS pixels", [
		("alone, and `0` for every other element.", "alone, and zero for every other element."),
	]),
	(SOURCE, "The `overflow-clip-margin` property expands the clip edge of a `clip` overflow", [
		("of a `clip` overflow and of a paint containment and has", "of a `clip` overflow and of a paint containment over a `visible` overflow and has"),
	]),
	(SOURCE, "@returns `true` for an element whose computed `overflow-y` value", [
		("@returns `true` for an element whose computed `overflow-y` value is other than the `visible` keyword or whose computed `contain` value",
		 "@returns Whether the element's computed `overflow-y` value is other than the `visible` keyword or its computed `contain` value"),
	]),
	(SOURCE, "A scroll container (`auto` or `scroll`) keeps what overflows", [
		("A scroll container (`auto` or `scroll`) keeps", "A scroll container (the `auto` keyword or the `scroll` keyword) keeps"),
		("a clipping one (`hidden` or `clip`) and", "a clipping one (the `hidden` keyword or the `clip` keyword) and"),
		("past the element's padding edge are no part", "past the element's clip edge ({@link readClipEdge}) are no part"),
		("because `overflow-x` and `overflow-y` compute independently under `clip` and a horizontal clip",
		 "because the `overflow-x` property and the `overflow-y` property compute independently under the `clip` keyword, and a horizontal clip"),
	]),
	(SOURCE, "Each element contributes its client rectangle's bottom edge", [
		("The clip edge is read from the box the frame's `overflow-clip-margin` value selects, the padding box by default, and expanded by that value's length where the clip is the `clip` keyword or a paint containment; a `hidden` or scrolling frame stops at its padding box.",
		 "The clip edge of a `clip` overflow, and of a paint containment over a `visible` overflow, is read from the box the frame's `overflow-clip-margin` value selects, the padding box by default, and expanded by that value's length; a hidden or scrolling frame stops at its padding box."),
	]),
	(SETUP, "Lists the inline styles a clip-edge reader measures over a frame styled", [
		("over a frame styled `height: 400px; padding-bottom: 20px; border-bottom: 3px solid`, and the row",
		 "over a frame with the `height: 400px; padding-bottom: 20px; border-bottom: 3px solid` style, and the row"),
		("a `hidden` or scrolling overflow stops", "a hidden or scrolling overflow stops"),
		("a `clip` overflow and a paint containment expand", "a `clip` overflow and a paint containment over a `visible` overflow expand"),
	]),
]

SPAN = re.compile(r'`[^`]*`|\{@link [^}]*\}')


def wrap(text):
	protected = SPAN.sub(lambda match: match.group(0).replace(' ', '\x00'), text)
	lines, line = [], ''
	for word in protected.split(' '):
		candidate = word if not line else line + ' ' + word
		if len(PREFIX) + len(candidate) > WIDTH and line:
			lines.append(line)
			line = word
		else:
			line = candidate
	lines.append(line)
	return [PREFIX + entry.replace('\x00', ' ') for entry in lines]


def rewrite(lines, opening, replacements):
	starts = [index for index, line in enumerate(lines) if line.startswith(PREFIX) and line[len(PREFIX):].startswith(opening)]
	if len(starts) != 1:
		sys.exit(f'paragraph opening matched {len(starts)} times: {opening[:60]!r}')
	start = starts[0]
	end = start
	while end + 1 < len(lines) and lines[end + 1].startswith(PREFIX) and not lines[end + 1][len(PREFIX):].startswith('@'):
		end += 1
	text = ' '.join(line[len(PREFIX):].strip() for line in lines[start : end + 1])
	for old, new in replacements:
		count = text.count(old)
		if count != 1:
			sys.exit(f'sentence matched {count} times: {old[:60]!r}')
		text = text.replace(old, new, 1)
	return lines[:start] + wrap(text) + lines[end + 1 :]


for path in (SOURCE, SETUP):
	lines = open(path).read().split('\n')
	for target, opening, replacements in PARAGRAPHS:
		if target == path:
			lines = rewrite(lines, opening, replacements)
	open(path, 'w').write('\n'.join(lines))
	print('rewrote', path)
