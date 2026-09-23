# t4-r7-prose.py: the T4-R7 fix round's prose edits (t4-r7-brief.md), successor of t4-r6-prose.py with the same paragraph
# rewriter. Gives each `{@link}` identifier the T4 delta adds its own noun, writes the boolean return in the "True if ...;
# false otherwise" form, and drops the fixture count from a test comment. Refuses an anchor that does not match exactly
# once. Usage: python3 t4-r7-prose.py /home/user/test
import os, re, sys

root = sys.argv[1]
SOURCE = os.path.join(root, 'src/browser/helpers.ts')
SETUP = os.path.join(root, 'tests/setupBrowser.ts')
WIDTH = 100
PREFIX = ' * '

PARAGRAPHS = [
	(SOURCE, "@returns The element's overflow clip edge in CSS pixels", [
		("for an element that clips nothing ({@link clipsOverflow}).", "for an element that clips nothing, as the {@link clipsOverflow} helper reports it."),
	]),
	(SOURCE, "An `overflow-y` value of the `hidden` keyword, the `auto` keyword, or the `scroll` keyword stops", [
		("by the length {@link readClipMargin} reads.", "by the length the {@link readClipMargin} helper reads."),
	]),
	(SOURCE, "@returns Whether the element's computed `overflow-y` value", [
		("@returns Whether the element's computed", "@returns True if the element's computed"),
		("or the `strict` keyword).", "or the `strict` keyword); false otherwise."),
	]),
	(SOURCE, "A scroll container (the `auto` keyword or the `scroll` keyword) keeps", [
		("past the element's clip edge ({@link readClipEdge}) are no part", "past the element's clip edge, which the {@link readClipEdge} helper measures, are no part"),
	]),
	(SOURCE, "Each element contributes its client rectangle's bottom edge", [
		("at that ancestor's clip edge ({@link readClipEdge}), because", "at that ancestor's clip edge, which the {@link readClipEdge} helper measures, because"),
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


for path in (SOURCE,):
	lines = open(path).read().split('\n')
	for target, opening, replacements in PARAGRAPHS:
		if target == path:
			lines = rewrite(lines, opening, replacements)
	open(path, 'w').write('\n'.join(lines))
	print('rewrote', path)

TEST = os.path.join(root, 'tests/src/browser/helpers.test.ts')
text = open(TEST).read()
old = '// The two frames stack: 300 rows'
if text.count(old) != 1:
	sys.exit(f'test comment matched {text.count(old)} times')
open(TEST, 'w').write(text.replace(old, '// The frames stack: 300 rows', 1))
print('rewrote', TEST)
