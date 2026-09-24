# UTIL-FONT round 3: applies F-d and the sweep fixes. Run with the worktree root as the first
# argument for the owned file, and the validation copy root as the second for the shared files.
import sys

def edit(path, pairs):
    text = open(path).read()
    for old, new in pairs:
        if text.count(old) != 1:
            sys.exit(f'{path}: site not found once: {old!r}')
        text = text.replace(old, new)
    open(path, 'w').write(text)

owned, shared = sys.argv[1], sys.argv[2]
edit(f'{owned}/tests/src/styles/utilities/font.test.ts', [
    ("read on a host that retunes the one token that level names:",
     "read on a host that retunes the token that level names:"),
    ("""	// and a 600 parent weight: a relative keyword written as the number one parent resolves it to
	// reads that number under the other parent, and a class that sets nothing inherits a parent
	// weight its twin does not carry under at least one of them.""",
     """	// and a 600 parent weight: a relative keyword written as the number a parent resolves it to
	// reads that number under the other parent, and a class that sets nothing inherits a parent
	// weight that differs from its twin's under the 400 parent, the 600 parent, or both."""),
    ("were the parents in one band, a relative", "were the parents in a shared band, a relative"),
    ("it('resolves the later value of an entry where an element carries two of its classes', () => {",
     "it('resolves the later value of an entry where an element carries conflicting classes of it', () => {"),
])
edit(f'{shared}/tests/setupStyles.ts', [
    (" * parent resolves, and a step written as the number one parent weight resolves it to reads the same\n",
     " * parent resolves, and a step written as the number a parent weight resolves it to reads the same\n"),
    (" * writes, the property it sets, and one class it writes.\n",
     " * writes, the property it sets, and a class it writes.\n"),
    (" * Pairs each font key whose steps a proof reads one by one with the property it sets and the table\n",
     " * Pairs each font key whose steps a proof reads step by step with the property it sets and the table\n"),
    ("the `font` key's\n * single step is the `FONT_ENTRY_CASES` table's row.",
     "the `font` key's\n * `monospace` step is the `FONT_ENTRY_CASES` table's row."),
])
edit(f'{shared}/tests/setupStyles.test.ts', [
    ("every key whose every recorded rule is a single `.KEY-*` class setting one longhand",
     "every key whose every recorded rule is a `.KEY-*` class alone setting a longhand"),
])
edit(f'{shared}/app/browser/constants.ts', [
    ("The weight steps share one paragraph, because", "The weight steps share a paragraph, because"),
    ("because a single line shows no spacing between\n * lines.",
     "because a paragraph that never wraps shows no\n * spacing between its lines."),
])
edit(f'{shared}/guides/veneer.md', [
    ("heading class together, and a size class holds one size at every viewport.",
     "heading class together, and a size class holds its size at every viewport."),
])
print('applied')
