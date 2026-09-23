# Writes each report-only patch J-COLLAPSE returns as an exact unified diff, built from modified
# copies under tmp/j-collapse/patches/ so no shared or off-limits file is edited.
import difflib, pathlib

ROOT = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer-collapse')
OUT = ROOT / 'tmp/j-collapse/patches'
OUT.mkdir(parents=True, exist_ok=True)


def edit(text, old, new):
    if text.count(old) != 1:
        raise SystemExit(f'expected one match: {old[:90]!r} found {text.count(old)}')
    return text.replace(old, new)


def diff(name, changes):
    lines = []
    for path, transform in changes:
        before = (ROOT / path).read_text(encoding='utf-8')
        after = transform(before)
        lines.extend(difflib.unified_diff(
            before.splitlines(keepends=True), after.splitlines(keepends=True),
            fromfile=f'a/{path}', tofile=f'b/{path}', n=3,
        ))
    (OUT / name).write_text(''.join(lines), encoding='utf-8', newline='\n')
    print(name, len(lines))


def row(cells, widths):
    return '| ' + ' | '.join(cell.ljust(width) for cell, width in zip(cells, widths)) + ' |'


# 1. The overlap precedence ruling, for J-BINDER-PRECEDENCE: the sentence on HostSnapshotInterface.restore.
diff('j-collapse-precedence.diff', [
    ('src/browser/types.ts', lambda text: edit(
        text,
        "\t * half-restored element, and the restoration then leaves that target to it. Where two\n"
        "\t * restorations overlap on one target, the restoration that started first writes it back.\n",
        "\t * half-restored element, and the restoration then leaves that target to it. Where two\n"
        "\t * restorations overlap on one target, the restoration whose snapshot saved that target first\n"
        "\t * writes it back, because that snapshot recorded the value the target carried before either\n"
        "\t * engine wrote it.\n",
    )),
])

# 2. The delegate's prose, which names the button route alone.
DELEGATE_SUMMARY_OLD = "Activates data-attribute button hosts through a root's delegated click listener."
DELEGATE_SUMMARY_NEW = "Activates data-attribute hosts through a root's delegated click listener."
SURFACE = [41, 9, 150]


def delegate_guide(text):
    text = edit(text,
                row(['`Delegate`', 'class', DELEGATE_SUMMARY_OLD], SURFACE),
                row(['`Delegate`', 'class', DELEGATE_SUMMARY_NEW], SURFACE))
    text = edit(text,
                row(['`DelegateInterface`', 'interface', 'Owns delegated activation and the button engines it constructs.'], SURFACE),
                row(['`DelegateInterface`', 'interface', 'Owns delegated activation and the engines it constructs.'], SURFACE))
    text = edit(text,
                "| Method    | Summary                                                             |\n"
                "| --------- | ------------------------------------------------------------------- |\n"
                "| `destroy` | Releases the click listener and destroys every owned button engine. |\n",
                row(['Method', 'Summary'], [9, 62]) + '\n'
                + '| ' + '-' * 9 + ' | ' + '-' * 62 + ' |\n'
                + row(['`destroy`', 'Releases the click listener and destroys every engine it owns.'], [9, 62]) + '\n')
    text = edit(text,
                "none; an engine you constructed keeps its own groups. The delegate prevents the click's default\n"
                "action, as Bootstrap's data API does. A host under nested delegate roots is driven once per click\n"
                "for each entity whose selector matches, by whichever delegate hears the click first.\n",
                "none; an engine you constructed keeps its own groups. The button route prevents the click's\n"
                "default action, as Bootstrap's data API does. The `collapse` option carries the collapse's groups\n"
                "the same way, and § Components states its route under Collapse. A host under nested delegate\n"
                "roots is driven once per click for each entity whose selector matches, by whichever delegate\n"
                "hears the click first.\n")
    return text


diff('j-collapse-delegate-prose.diff', [
    ('src/browser/types.ts', lambda text: edit(edit(
        text,
        '/** Owns delegated activation and the button engines it constructs. */',
        '/** Owns delegated activation and the engines it constructs. */'),
        '\t/** Releases the click listener and destroys every owned button engine. */',
        '\t/** Releases the click listener and destroys every engine it owns. */')),
    ('src/browser/Delegate.ts', lambda text: edit(text, ' * ' + DELEGATE_SUMMARY_OLD, ' * ' + DELEGATE_SUMMARY_NEW)),
    ('guides/veneer.md', delegate_guide),
])

# 3. The collapse's destroy summary, which omits the sibling collapses it destroys.
DESTROY_OLD = 'Releases hooks, abandons a transition in flight, and restores the panel and its triggers.'
DESTROY_NEW = ('Releases hooks, abandons a transition in flight, restores the panel and its triggers, and '
               'destroys each sibling collapse it constructed.')


def destroy_guide(text):
    widths = [9, len(DESTROY_NEW)]
    old_table = (
        "| Method    | Summary                                                                                   |\n"
        "| --------- | ----------------------------------------------------------------------------------------- |\n"
        "| `show`    | Shows the panel and hides its open accordion siblings.                                    |\n"
        "| `hide`    | Hides the panel.                                                                          |\n"
        "| `toggle`  | Hides the panel when it is shown and shows it otherwise.                                  |\n"
        f"| `destroy` | {DESTROY_OLD} |\n")
    rows = [
        ['Method', 'Summary'],
        None,
        ['`show`', 'Shows the panel and hides its open accordion siblings.'],
        ['`hide`', 'Hides the panel.'],
        ['`toggle`', 'Hides the panel when it is shown and shows it otherwise.'],
        ['`destroy`', DESTROY_NEW],
    ]
    new_table = ''.join(
        ('| ' + ' | '.join('-' * width for width in widths) + ' |\n') if line is None else row(line, widths) + '\n'
        for line in rows)
    return edit(text, old_table, new_table)


diff('j-collapse-destroy-summary.diff', [
    ('src/browser/types.ts', lambda text: edit(text, '\t * ' + DESTROY_OLD + '\n', '\t * ' + DESTROY_NEW + '\n')),
    ('guides/veneer.md', destroy_guide),
])

# 4. The tag reading the invalid-host error repeats in Button and Collapse, centralized in helpers.ts.
READ_TAG = '''
/**
 * Reads the tag name of a value that is an element, for the context of an invalid-host error.
 *
 * @param value - The value an engine refused as its host.
 * @returns The element's tag name, or undefined when the value is not an element or reading it throws.
 * @remarks
 * A hostile value, such as a proxy whose prototype trap throws, reads as undefined rather than
 * replacing the engine's own error with its throw.
 * @example
 * ```ts
 * readTag(document.createElementNS('http://www.w3.org/2000/svg', 'svg')) // 'svg'
 * ```
 */
export function readTag(value: unknown): string | undefined {
	try {
		return value instanceof Element ? value.tagName : undefined
	} catch {
		return undefined
	}
}
'''
HOST_READING = '''			let tag: string | undefined
			try {
				const value: unknown = host
				if (value instanceof Element) tag = value.tagName
			} catch {
				tag = undefined
			}
'''


def use_read_tag(text, entity, code):
    text = edit(text, HOST_READING, '')
    text = edit(text,
                f"throw new AppError('{entity} requires an HTMLElement host', '{code}', {{ tag }})",
                f"throw new AppError('{entity} requires an HTMLElement host', '{code}', {{\n\t\t\t\ttag: readTag(host),\n\t\t\t}})")
    return text


def read_tag_helpers_test(text):
    text = edit(text, '\treadTarget,\n\treadTargets,\n', '\treadTag,\n\treadTarget,\n\treadTargets,\n')
    return edit(text, "describe('readTarget', () => {", """describe('readTag', () => {
	it('reads an element tag name and returns undefined for any other value', () => {
		expect(readTag(build('div'))).toBe('DIV')
		expect(readTag(document.createElementNS('http://www.w3.org/2000/svg', 'svg'))).toBe('svg')
		expect(readTag(null)).toBeUndefined()
		expect(readTag({ tagName: 'DIV' })).toBeUndefined()
		expect(
			readTag(
				new Proxy(
					{},
					{
						getPrototypeOf() {
							throw new Error('Unreadable')
						},
					},
				),
			),
		).toBeUndefined()
	})
})

describe('readTarget', () => {""")


diff('j-collapse-read-tag.diff', [
    ('src/browser/helpers.ts', lambda text: text.rstrip('\n') + '\n' + READ_TAG),
    ('src/browser/Button.ts', lambda text: edit(use_read_tag(text, 'Button', 'BUTTON_HOST_INVALID'),
                                                "import { bindEventMap, emitEvent, resolveVocabulary } from './helpers.js'",
                                                "import { bindEventMap, emitEvent, readTag, resolveVocabulary } from './helpers.js'")),
    ('src/browser/Collapse.ts', lambda text: edit(use_read_tag(text, 'Collapse', 'COLLAPSE_HOST_INVALID'),
                                                  '\treadTargets,\n\treflow,\n', '\treadTag,\n\treadTargets,\n\treflow,\n')),
    ('tests/src/browser/helpers.test.ts', read_tag_helpers_test),
    ('tests/src/browser/index.test.ts', lambda text: edit(text, "\t\t\t'parseElement',\n\t\t\t'readTarget',\n", "\t\t\t'parseElement',\n\t\t\t'readTag',\n\t\t\t'readTarget',\n")),
    ('guides/veneer.md', lambda text: edit(text,
                                           row(['`readTarget`', 'function', "Returns the first HTML element a trigger's target attribute, or its `href` fragment, names in its document."], SURFACE) + '\n',
                                           row(['`readTag`', 'function', 'Reads the tag name of a value that is an element, for the context of an invalid-host error.'], SURFACE) + '\n'
                                           + row(['`readTarget`', 'function', "Returns the first HTML element a trigger's target attribute, or its `href` fragment, names in its document."], SURFACE) + '\n')),
])


# 5. The J-ENGINE row's Collapse mention in ROADMAP.md.
def roadmap(text):
    lines = text.split('\n')
    found = [index for index, line in enumerate(lines) if line.startswith('| J-ENGINE ')]
    if len(found) != 1:
        raise SystemExit('expected one J-ENGINE row')
    line = lines[found[0]]
    cells = line[1:-1].split('|')
    route = cells[1].rstrip()
    width = len(cells[1]) - 1
    addition = '; J-COLLAPSE carries the Collapse engine, its delegate route, and its `plugin` row'
    updated = route + addition
    if len(updated) > width:
        raise SystemExit(f'route cell {len(updated)} wider than {width}')
    cells[1] = updated.ljust(width) + ' '
    lines[found[0]] = '|' + '|'.join(cells) + '|'
    return '\n'.join(lines)


diff('j-collapse-roadmap.diff', [('ROADMAP.md', roadmap)])
