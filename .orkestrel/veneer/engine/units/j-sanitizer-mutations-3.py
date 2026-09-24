"""J-SANITIZER mutation instrument (round 3).

Applies each row's edits to one source file, runs the one test file whose cases must catch it, reads
the JSON report for each named case's status, and restores the source byte for byte before the next
row. The digest of every mutated file is recorded before the first row and compared after every
restore. A control row makes an edit that changes no behaviour: its named case must pass, and its
verdict reads HELD, which proves the instrument can report a mutation that survives.

Run from the worktree root: python tmp/j-sanitizer/mutations.py
The log is written to tmp/j-sanitizer/mutations.log.txt.
"""

import hashlib
import json
import pathlib
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
LOG = ROOT / 'tmp' / 'j-sanitizer' / 'mutations.log.txt'
REPORT = ROOT / 'tmp' / 'j-sanitizer' / 'mutation-report.json'
HELPERS = 'src/browser/helpers.ts'
SANITIZER = 'src/browser/sanitizers/ConfigSanitizer.ts'
SUITE = 'tests/src/browser/sanitizers/ConfigSanitizer.test.ts'
TOOLTIP = 'tests/src/browser/Tooltip.test.ts'
SELECTION = 'calls the setHTML method an element carries once with the configuration, and walks an element that carries none'

ROWS = [
    {
        'mutation': 'the walk ignores the element list',
        'file': HELPERS,
        'edits': [('\tif (config.elements === undefined) return true\n', '\treturn true\n')],
        'suite': SUITE,
        'cases': ['a supplied configuration replaces the allowlist'],
    },
    {
        'mutation': 'the floor element set dropped',
        'file': HELPERS,
        'edits': [('\treturn SANITIZER_BASELINE.elements.some(', '\treturn false && SANITIZER_BASELINE.elements.some(')],
        'suite': SUITE,
        'cases': ['the floor removes the base, iframe, object, and embed elements with their content'],
    },
    {
        'mutation': 'the floor on-prefix rule dropped',
        'file': HELPERS,
        'edits': [('\tif (attribute.localName.startsWith(handlers)) return true\n', '')],
        'suite': SUITE,
        'cases': ['the floor removes every attribute whose name starts with on, where the platform removes only the handler names it knows'],
    },
    {
        'mutation': 'the URL check is a regex without the platform parser',
        'file': HELPERS,
        'edits': [("\treturn URL.parse(value)?.protocol === 'javascript:'\n", '\treturn /^javascript:/i.test(value)\n')],
        'suite': SUITE,
        'cases': ['a script URL loses its attribute however the scheme is spelled, and a relative, encoded, or data URL keeps it'],
    },
    {
        'mutation': 'the floor animation rule dropped',
        'file': HELPERS,
        'edits': [("\t\tattribute.localName === 'attributeName' &&\n", '\t\tfalse &&\n')],
        'suite': SUITE,
        'cases': ['SVG and MathML links lose a script URL, and an animation loses an attributeName naming a link'],
    },
    {
        'mutation': 'template content not walked',
        'file': SANITIZER,
        'edits': [('\t\t\tif (isInstance(node, HTMLTemplateElement)) this.#clean(node.content)\n', '')],
        'suite': SUITE,
        'cases': ['a kept template has its content sanitized, nested templates included'],
    },
    {
        'mutation': 'reserialization instead of replaceChildren',
        'file': SANITIZER,
        'edits': [(
            '\t\tif (content === undefined) Element.prototype.replaceChildren.call(element, ...nodes)\n',
            '\t\tif (content === undefined) element.innerHTML = context.innerHTML\n',
        )],
        'suite': SUITE,
        'cases': ['moves the parsed nodes in without serializing them again, so a noscript element keeps the elements parsed inside it'],
    },
    {
        'mutation': 'always-native selection',
        'file': SANITIZER,
        'edits': [('\t\tif (isSanitizeTarget(element)) {\n', '\t\tif (isSanitizeTarget(element) || true) {\n')],
        'suite': SUITE,
        'cases': [SELECTION],
    },
    {
        'mutation': 'always-native selection, seen by the default tooltip',
        'file': SANITIZER,
        'edits': [('\t\tif (isSanitizeTarget(element)) {\n', '\t\tif (isSanitizeTarget(element) || true) {\n')],
        'suite': TOOLTIP,
        'cases': ['shows a default tooltip, text and markup, where no element carries a setHTML method'],
    },
    {
        'mutation': 'always-walk selection',
        'file': SANITIZER,
        'edits': [('\t\tif (isSanitizeTarget(element)) {\n', '\t\tif (isSanitizeTarget(element) && false) {\n')],
        'suite': SUITE,
        'cases': [SELECTION],
    },
    {
        'mutation': 'validation removed',
        'file': SANITIZER,
        'edits': [('\t\tif (!isSanitizerConfig(copy)) {\n', '\t\tif (!isSanitizerConfig(copy) && false) {\n')],
        'suite': SUITE,
        'cases': ['refuses a configuration the platform refuses when it is constructed'],
    },
    {
        'mutation': 'the caller configuration held by reference',
        'file': SANITIZER,
        'edits': [('\t\tthis.#config = Object.freeze(copy)\n', '\t\tthis.#config = config\n')],
        'suite': SUITE,
        'cases': ['holds its own copy of the configuration, so a later edit to the object the caller passed changes no write'],
    },
    {
        'mutation': 'the walk parses in a template context',
        'file': SANITIZER,
        'edits': [(
            '\t\tconst context = inert.importNode(element, false)\n'
            '\t\tcontext.innerHTML = html\n'
            '\t\tconst parsed = isInstance(context, HTMLTemplateElement) ? context.content : context\n',
            "\t\tconst context = inert.createElement('template')\n"
            '\t\tcontext.innerHTML = html\n'
            '\t\tconst parsed = context.content\n',
        )],
        'suite': SUITE,
        'cases': [
            'an empty dictionary keeps the text of table parts a div context drops',
            'the allowlist keeps the text of table parts a div context drops',
        ],
    },
    {
        'mutation': 'the context copy reverted to a bare element',
        'file': SANITIZER,
        'edits': [(
            '\t\tconst context = inert.importNode(element, false)\n',
            '\t\tconst context = inert.createElementNS(element.namespaceURI, element.localName)\n',
        )],
        'suite': SUITE,
        'cases': ['parses in the context of the target, so an annotation-xml element whose encoding is text/html keeps an HTML anchor'],
    },
    {
        'mutation': 'the children read through the childNodes property',
        'file': SANITIZER,
        'edits': [('\t\tfor (const node of collectChildren(parent)) {\n', '\t\tfor (const node of Array.from(parent.childNodes)) {\n')],
        'suite': SUITE,
        'cases': [
            'a form whose named control shadows childNodes loses its iframe under an empty dictionary',
            'a form whose named control shadows childNodes loses its iframe and unlisted elements under a configuration that keeps forms',
        ],
    },
    {
        'mutation': 'the attributes read through the attributes property',
        'file': SANITIZER,
        'edits': [('\t\t\tfor (const attribute of collectAttributes(node)) {\n', '\t\t\tfor (const attribute of Array.from(node.attributes)) {\n')],
        'suite': SUITE,
        'cases': [
            'a form whose named control shadows attributes loses its handler and script URL under an empty dictionary',
            'a form whose named control shadows attributes loses its handler and script URL under a configuration that keeps forms',
        ],
    },
    {
        'mutation': 'the element name read through the localName and namespaceURI properties',
        'file': SANITIZER,
        'edits': [(
            '\t\t\tconst name = isInstance(node, Element) ? readElementName(node) : undefined\n',
            '\t\t\tconst name = isInstance(node, Element) ? { name: node.localName, namespace: node.namespaceURI } : undefined\n',
        )],
        'suite': SUITE,
        'cases': [
            'a form whose named control shadows localName keeps only what a configuration that keeps forms lists',
            'a form whose named control shadows namespaceURI keeps only what a configuration that keeps forms lists',
        ],
    },
    {
        'mutation': 'the attribute removed through the removeAttributeNode property',
        'file': SANITIZER,
        'edits': [('\t\t\t\t\tElement.prototype.removeAttributeNode.call(node, attribute)\n', '\t\t\t\t\tnode.removeAttributeNode(attribute)\n')],
        'suite': SUITE,
        'cases': ['a form whose named controls shadow removeAttributeNode, getAttributeNames, and getAttributeNode loses its handler'],
    },
    {
        'mutation': 'the node removed through the removeChild property',
        'file': SANITIZER,
        'edits': [('\t\t\t\tNode.prototype.removeChild.call(parent, node)\n', '\t\t\t\tparent.removeChild(node)\n')],
        'suite': SUITE,
        'cases': ['a form whose named control shadows removeChild loses its iframe'],
    },
    {
        'mutation': 'the template target recognised through this window constructor',
        'file': SANITIZER,
        'edits': [(
            "\t\t\tname?.name === 'template' && name.namespace === SANITIZER_NAMESPACE\n",
            '\t\t\tisInstance(element, HTMLTemplateElement)\n',
        )],
        'suite': SUITE,
        'cases': ['replaces the content of a template element of another window through the walk, and leaves its own children'],
    },
    {
        'mutation': 'the plain-data refusal removed',
        'file': HELPERS,
        'edits': [(
            'export function matchesPlainData(value: unknown): boolean {\n',
            'export function matchesPlainData(value: unknown): boolean {\n\treturn true\n',
        )],
        'suite': SUITE,
        'cases': ['refuses a configuration that is not plain data before copying it'],
    },
    {
        'mutation': 'an unlisted data attribute kept beside an attribute list',
        'file': HELPERS,
        'edits': [(
            "\t\treturn listed || (config.dataAttributes === true && listing?.startsWith('data-') === true)\n",
            "\t\treturn listed || listing?.startsWith('data-') === true\n",
        )],
        'suite': SUITE,
        'cases': ['an attribute list without dataAttributes removes an unlisted data attribute'],
    },
    {
        'mutation': 'the parse runs in the live document',
        'file': SANITIZER,
        'edits': [("\t\tconst inert = document.implementation.createHTMLDocument('')\n", '\t\tconst inert = document\n')],
        'suite': SUITE,
        'cases': ['parses in an inert document, so an image inside a removed object requests nothing'],
    },
    {
        'mutation': 'control: a local variable renamed',
        'file': SANITIZER,
        'control': True,
        'edits': [
            ('\t\tconst nodes = collectChildren(parsed)\n', '\t\tconst survivors = collectChildren(parsed)\n'),
            (
                '\t\tif (content === undefined) Element.prototype.replaceChildren.call(element, ...nodes)\n',
                '\t\tif (content === undefined) Element.prototype.replaceChildren.call(element, ...survivors)\n',
            ),
            (
                '\t\telse Reflect.apply(DocumentFragment.prototype.replaceChildren, content, nodes)\n',
                '\t\telse Reflect.apply(DocumentFragment.prototype.replaceChildren, content, survivors)\n',
            ),
        ],
        'suite': SUITE,
        'cases': [SELECTION],
    },
]


def digest(path):
    return hashlib.sha256((ROOT / path).read_bytes()).hexdigest()


def run(suite):
    if REPORT.exists():
        REPORT.unlink()
    command = [
        'node',
        'node_modules/vitest/vitest.mjs',
        'run',
        '--config',
        'vite.config.ts',
        '--no-cache',
        '--project',
        'src:browser',
        '--reporter=json',
        f'--outputFile={REPORT.relative_to(ROOT).as_posix()}',
        suite,
    ]
    subprocess.run(command, cwd=ROOT, capture_output=True, timeout=600, check=False)
    return json.loads(REPORT.read_text(encoding='utf-8'))


def main():
    files = sorted({row['file'] for row in ROWS})
    recorded = {path: digest(path) for path in files}
    lines = ['# J-SANITIZER mutation instrument', '', '## Recorded digests (SHA-256)', '']
    lines += [f'- `{path}` {recorded[path]}' for path in files]
    lines += [
        '',
        '## Rows',
        '',
        '| Row | Mutation | File | Test file | Named case | Named case status | Failed / total | Verdict | Restore |',
        '| --- | --- | --- | --- | --- | --- | --- | --- | --- |',
    ]
    failures = 0
    for index, row in enumerate(ROWS, start=1):
        path = ROOT / row['file']
        original = path.read_bytes()
        text = original.decode('utf-8')
        for find, replace in row['edits']:
            if text.count(find) != 1:
                raise SystemExit(f'Row {index}: an anchor does not occur exactly once in {row["file"]}')
            text = text.replace(find, replace)
        try:
            path.write_bytes(text.encode('utf-8'))
            report = run(row['suite'])
        finally:
            path.write_bytes(original)
        restored = digest(row['file']) == recorded[row['file']]
        results = [
            assertion
            for suite in report.get('testResults', [])
            for assertion in suite.get('assertionResults', [])
        ]
        statuses = []
        for title in row['cases']:
            named = [assertion for assertion in results if assertion.get('title') == title]
            statuses.append(named[0].get('status') if len(named) == 1 else f'not collected ({len(named)} matches)')
        failed = sum(1 for assertion in results if assertion.get('status') == 'failed')
        if row.get('control'):
            verdict = 'HELD' if all(status == 'passed' for status in statuses) and failed == 0 else 'REDDENED'
            expected = 'HELD'
        else:
            verdict = 'reddened' if all(status == 'failed' for status in statuses) else 'SURVIVED'
            expected = 'reddened'
        if verdict != expected or not restored:
            failures += 1
        receipt = 'restored byte for byte' if restored else 'RESTORE MISMATCH'
        lines.append(
            f'| {index} | {row["mutation"]} | `{row["file"]}` | `{row["suite"]}` | {"; ".join(row["cases"])} | {", ".join(statuses)} | {failed} / {len(results)} | {verdict} | {receipt} |'
        )
    final = {path: digest(path) for path in files}
    lines += ['', '## Final digests', '']
    lines += [
        f'- `{path}` {final[path]} ' + ('restored byte for byte' if final[path] == recorded[path] else 'MISMATCH')
        for path in files
    ]
    lines += ['', f'Rows whose verdict differs from the expected one or that did not restore: {failures}', '']
    LOG.write_text('\n'.join(lines), encoding='utf-8')
    print('\n'.join(lines))
    sys.exit(1 if failures else 0)


if __name__ == '__main__':
    main()
