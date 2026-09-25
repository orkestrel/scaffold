# Applies or restores one round-2 mutation or plant by name, and lists the table the driver walks.
# Each entry names the file it edits, the exact text it replaces (which must occur once), the
# replacement, the project and test-name pattern the driver runs, and whether the run needs a
# styles build first.
import json
import shutil
import sys

SERVER = 'tests/setupServer.ts'
SERVER_TEST = 'tests/setupServer.test.ts'
TOKENS = 'src/styles/_tokens.scss'
BUTTON = 'src/styles/components/_button.scss'
GUIDE = 'guides/veneer.md'


def entry(name, edits, project, pattern, build=False):
    return {'name': name, 'edits': edits, 'project': project, 'pattern': pattern, 'build': build}


SETTINGS_ROOT = """	root: Object.freeze({
		host: Object.freeze({ 'font-size': '16px', width: '1000px', height: '600px' }),
		root: '20px',
		viewport: Object.freeze([1280, 720] as const),
	}),
"""
STRING_ALTERNATIVES = r'''/"(?:[^"\\]|\\.)*"?|'(?:[^'\\]|\\.)*'?|url\((?:[^)"'\\]|\\.|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')*\)?|rgba?'''
PILL_CELL = '`calc(2rem * var(--vn-factor-radius))`, `50rem`'
# The row is written out whole, so a restore never reads the file the mutation edited.
UL_ROW = '| `reboot`       | `ul { list-style-type }`                                                                  | —                                                | declaration | `disc`                                                                                                                                                                                                                                                                                                                 | Elements names the marker each list writes rather than inheriting the user agent default.                                                                                                                                       |'

TABLE = [
    # describe('ValueResolver') and its classifier cases.
    entry('text-compare', [(SERVER, "\tif (resolution.recorded !== resolution.emitted) return 'retuned'", "\tif (recorded !== emitted) return 'retuned'")], 'setup', 'text-only member'),
    entry('ignore-resolution', [(SERVER, "\tif (resolution.recorded !== resolution.emitted) return 'retuned'\n", '')], 'setup', 'resolve apart as retuned'),
    entry('route-undecided', [(SERVER, "\tif (emitted === undefined) return 'dropped'\n\tif (resolution === undefined) return undefined", "\tif (emitted === undefined) return 'dropped'\n\tif (resolution === undefined) return 'restated'")], 'setup', 'names each pair the resolver cannot decide'),
    entry('colors-raw', [(SERVER, '\t\t\tif (red === undefined && x === undefined) return match', '\t\t\treturn match')], 'setup', 'resolves each side in its own stylesheet|writes every sRGB color'),
    entry('syntax-number-list', [(SERVER, "\t\t'<number>#': Object.freeze(['0', '1'] as const),\n", '')], 'setup', 'through each probe syntax'),
    entry('syntax-length-percentage-list', [(SERVER, "\t\t'<length-percentage>+': Object.freeze(['0px', '1px'] as const),\n", '')], 'setup', 'through each probe syntax'),
    entry('syntax-time', [(SERVER, "\t\t'<time>': Object.freeze(['0s', '1s'] as const),\n", '')], 'setup', 'through each probe syntax|compares a duration and a percentage'),
    entry('syntax-angle', [(SERVER, "\t\t'<angle>': Object.freeze(['0deg', '1deg'] as const),\n", '')], 'setup', 'through each probe syntax'),
    entry('syntax-color', [(SERVER, "\t\t'<color>': Object.freeze(['rgb(0, 0, 0)', 'rgb(0, 0, 1)'] as const),\n", '')], 'setup', 'through each probe syntax'),
    entry('base-only', [(SERVER, 'for (const setting of Object.values(RESOLVER_SETTINGS)) {', 'for (const setting of Object.values(RESOLVER_SETTINGS).slice(0, 1)) {')], 'setup', 'in every context their terms read'),
    entry('root', [(SERVER, SETTINGS_ROOT, '')], 'setup', 'in every context their terms read'),
    entry('no-parent', [(SERVER, '\t\t\t\t\tparent: pass === 0,', '\t\t\t\t\tparent: false,')], 'setup', 'in every context their terms read|a context the resolver cannot vary|names a planted unrecorded departure'),
    entry('unvaried-ignored', [(SERVER, '\t\t\t\t\t\tif (differ && (calls.test(left) || calls.test(right))) return undefined\n', '')], 'setup', 'a context the resolver cannot vary'),
    entry('mode-siblings', [(SERVER, '.filter((_element, index) => index === elements.length - 1 || elements[index + 1]?.nested)', '.filter(() => true)')], 'setup', 'reads the mode from the target'),
    entry('nested-flip', [(SERVER, '\t\t\tnested: elements.length === 0 || !/[+~]/u.test(joint),', '\t\t\tnested: elements.length === 0 || /[+~]/u.test(joint),')], 'setup', 'builds one element per compound'),
    entry('pseudo-kept', [(SERVER, "\t\tif (steps[end]?.char !== '(' || steps[end]?.literal === true) {\n\t\t\tindex = end", "\t\tif (steps[end]?.char !== '(' || steps[end]?.literal === true) {\n\t\t\tmatched += compound.slice(index, end)\n\t\t\tindex = end")], 'setup', 'writes the part of a compound'),
    entry('unmatched', [(SERVER, 'matched &&= element.matches(described.compound)', 'matched &&= true')], 'setup', 'reads every variable at an element'),
    entry('id-dropped', [(SERVER, "if (id !== undefined) attributes.push(['id', id.text])", "if (id !== undefined) attributes.push(['data-id', id.text])")], 'setup', 'reads every variable at an element'),
    entry('colors-strings', [(SERVER, STRING_ALTERNATIVES, '/rgba?')], 'setup', 'never inside a string or a URL'),
    entry('canonical-self', [(SERVER, '\t\t\trecorded: [stated],\n\t\t\temitted: [value],', '\t\t\trecorded: [stated],\n\t\t\temitted: [stated],')], 'setup', 'names a canonical token whose declaration'),
    entry('scoped-once', [(SERVER, "\t\t\tif (mode === 'dark' || mode === undefined)", "\t\t\tif (mode === 'dark')")], 'setup', 'names a canonical token whose declaration|outside every mode scope'),
    entry('empty-alike', [(SERVER, "(resolution.recorded === '' && stated.trim() !== value.trim())", "(resolution.recorded === '' && stated === '\\u0000')")], 'setup', 'written text of a canonical token'),
    entry('witness-row', [(SERVER, '\t\t\temitted: [`var(${token})`],', "\t\t\temitted: [row.emitted ?? ''],")], 'setup', 'by the token alone'),
    # describe('cascade ledger').
    entry('theme-unmeasured', [(SERVER, '\tfor (const component of shipped) {\n\t\tconst vocabulary = inventory.components[component]\n\t\tif (vocabulary === undefined)\n\t\t\tthrow new Error(`Shipped component ${component} has no official inventory`)', "\tfor (const component of shipped.filter((key) => key !== 'theme')) {\n\t\tconst vocabulary = inventory.components[component]\n\t\tif (vocabulary === undefined)\n\t\t\tthrow new Error(`Shipped component ${component} has no official inventory`)")], 'conformance', 'measures the dark component rules'),
    entry('rungs-dropped', [(SERVER, "\t'background-image',\n\t'box-shadow',\n\t'font-family',\n\t'transition-timing-function',\n", '')], 'conformance', 'decides every measured value difference|decides every repainted value difference'),
    entry('ignore-resolution-ledger', [(SERVER, "\tif (resolution.recorded !== resolution.emitted) return 'retuned'\n", '')], 'conformance', 'records every measured value difference|names no departure the compiled cascade'),
    entry('text-compare-ledger', [(SERVER, "\tif (resolution.recorded !== resolution.emitted) return 'retuned'", "\tif (recorded !== emitted) return 'retuned'")], 'conformance', 'names a retuned value retuned'),
    entry('canonical-self-ledger', [(SERVER, '\t\t\trecorded: [stated],\n\t\t\temitted: [value],', '\t\t\trecorded: [stated],\n\t\t\temitted: [stated],')], 'conformance', 'resolves every canonical token'),
    entry('witness-row-ledger', [(SERVER, '\t\t\temitted: [`var(${token})`],', "\t\t\temitted: [row.emitted ?? ''],")], 'conformance', 'witnesses every bootstrap-sourced token'),
    entry('category-swapped', [(SERVER, "\t\t\t\t\t\t? 'property'\n\t\t\t\t\t\t: 'declaration',", "\t\t\t\t\t\t? 'declaration'\n\t\t\t\t\t\t: 'property',")], 'conformance', 'reports an unrecorded literal declaration'),
    entry('unattributed-silent', [(SERVER, '.filter((block) => attributeBlock(block, inventory, recording, shipped, owners) === undefined)', '.filter(() => false)')], 'conformance', 'attributes every emitted rule'),
    entry('where-classes-ignored', [(SERVER, '\t\t\t\treadable.every(Boolean) &&\n', '\t\t\t\treadable.length < 0 &&\n')], 'conformance', 'places by measurement every emitted rule'),
    entry('deferrals-inverted', [(SERVER, '\t\t\t\t: selectors.has(normalizeComplexSelector(row.name)),', '\t\t\t\t: !selectors.has(normalizeComplexSelector(row.name)),')], 'conformance', 'defers no name the built cascade ships'),
    entry('tags-layer', [(SERVER, "\t\tif (block.layer !== 'elements') continue", "\t\tif (block.layer !== 'components') continue")], 'conformance', 'selects in the elements layer'),
    entry('addition-unrecorded', [(GUIDE, UL_ROW + '\n', '')], 'conformance', 'records every emitted name the official inventory lacks'),
    entry('addition-stale', [(GUIDE, UL_ROW + '\n', UL_ROW + '\n| `reboot` | `ul { audit-stale }` | — | declaration | `1px` | A planted row no declaration carries. |\n')], 'conformance', 'names no addition the compiled cascade no longer emits'),
    # The plants of Execution step 6.
    entry('plant-radius', [(TOKENS, '--vn-radius-base: calc(0.375rem * var(--vn-factor-radius));', '--vn-radius-base: calc(0.75rem * var(--vn-factor-radius));')], 'conformance', 'resolves every canonical token', build=True),
    entry('plant-witness', [(TOKENS, '--vn-radius-pill: 50rem;', '--vn-radius-pill: 40rem;'), (GUIDE, PILL_CELL, PILL_CELL.replace('50rem', '40rem'))], 'conformance', 'witnesses every bootstrap-sourced token', build=True),
    entry('plant-undecided', [(SERVER_TEST, "\t\t\t['btn', '.btn', 'filter', ['none'], undefined],\n\t\t] as const", "\t\t\t['btn', '.btn', 'filter', ['none'], undefined],\n\t\t\t['btn', '.btn', '--bs-btn-padding-x', ['1px'], 'red'],\n\t\t] as const")], 'setup', 'text-only member'),
    entry('plant-pill', [(TOKENS, '--vn-radius-pill: 50rem;', '--vn-radius-pill: 40rem;'), (TOKENS, '--bs-border-radius-pill: var(--vn-radius-pill);', '--bs-border-radius-pill: calc(var(--vn-radius-pill) * 1.25);'), (GUIDE, PILL_CELL, PILL_CELL.replace('50rem', '40rem'))], 'conformance', 'witnesses every bootstrap-sourced token', build=True),
    entry('plant-initial', [(TOKENS, '\t\t--vn-text-heading: inherit;', '\t\t--vn-text-heading: initial;')], 'conformance', 'resolves every canonical token', build=True),
    entry('plant-scoped', [(BUTTON, '@layer components {\n\t.btn {\n', '@layer components {\n\t.btn {\n\t\t--vn-text-body-base: oklch(0.208 0.042 265.755);\n')], 'conformance', 'resolves every canonical token', build=True),
]


def find(name):
    return next(item for item in TABLE if item['name'] == name)


command, *rest = sys.argv[1:]
if command == 'list':
    for item in TABLE:
        print('\t'.join([item['name'], item['project'], item['pattern'], 'build' if item['build'] else 'none', ' '.join(sorted({path for path, _old, _new in item['edits']}))]))
elif command == 'apply':
    item = find(rest[0])
    for path in sorted({path for path, _old, _new in item['edits']}):
        shutil.copyfile(path, f"tmp/units/r2/backup-{path.replace('/', '_')}")
    for path, old, new in item['edits']:
        text = open(path).read()
        if text.count(old) != 1:
            sys.exit(f'{item["name"]}: {path} holds the replaced text {text.count(old)} times')
        open(path, 'w').write(text.replace(old, new, 1))
elif command == 'restore':
    item = find(rest[0])
    for path in sorted({path for path, _old, _new in item['edits']}):
        shutil.copyfile(f"tmp/units/r2/backup-{path.replace('/', '_')}", path)
