"""J-SANITIZER mutation instrument.

Applies each mutation to one source file, runs the one test file whose case must catch it, reads the
JSON report for that case's status, and restores the source byte for byte before the next row. The
digest of every mutated file is recorded before the first row and compared after every restore.

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

ROWS = [
    {
        'mutation': 'the walk ignores the element list',
        'file': HELPERS,
        'find': '\tif (config.elements === undefined) return true\n',
        'replace': '\treturn true\n',
        'suite': SUITE,
        'case': 'a supplied configuration replaces the allowlist',
    },
    {
        'mutation': 'the floor element set dropped',
        'file': HELPERS,
        'find': '\treturn SANITIZER_BASELINE.elements.some(',
        'replace': '\treturn false && SANITIZER_BASELINE.elements.some(',
        'suite': SUITE,
        'case': 'the floor removes the base, iframe, object, and embed elements with their content',
    },
    {
        'mutation': 'the floor on-prefix rule dropped',
        'file': HELPERS,
        'find': '\tif (attribute.localName.startsWith(handlers)) return true\n',
        'replace': '',
        'suite': SUITE,
        'case': 'the floor removes every attribute whose name starts with on, where the platform removes only the handler names it knows',
    },
    {
        'mutation': 'the URL check is a regex without the platform parser',
        'file': HELPERS,
        'find': "\treturn URL.parse(value)?.protocol === 'javascript:'\n",
        'replace': '\treturn /^javascript:/i.test(value)\n',
        'suite': SUITE,
        'case': 'a script URL loses its attribute however the scheme is spelled, and a relative, encoded, or data URL keeps it',
    },
    {
        'mutation': 'the floor animation rule dropped',
        'file': HELPERS,
        'find': "\t\tattribute.localName === 'attributeName' &&\n",
        'replace': '\t\tfalse &&\n',
        'suite': SUITE,
        'case': 'SVG and MathML links lose a script URL, and an animation loses an attributeName naming a link',
    },
    {
        'mutation': 'template content not walked',
        'file': SANITIZER,
        'find': '\t\t\tif (isInstance(node, HTMLTemplateElement)) this.#clean(node.content)\n',
        'replace': '',
        'suite': SUITE,
        'case': 'a kept template has its content sanitized, nested templates included',
    },
    {
        'mutation': 'reserialization instead of replaceChildren',
        'file': SANITIZER,
        'find': '\t\tdestination.replaceChildren(...Array.from(parsed.childNodes))\n',
        'replace': '\t\telement.innerHTML = context.innerHTML\n',
        'suite': SUITE,
        'case': 'moves the parsed nodes in without serializing them again, so a noscript element keeps the elements parsed inside it',
    },
    {
        'mutation': 'always-native selection',
        'file': SANITIZER,
        'find': '\t\tif (isSanitizeTarget(element)) {\n',
        'replace': '\t\tif (isSanitizeTarget(element) || true) {\n',
        'suite': SUITE,
        'case': 'calls the setHTML method an element carries once with the configuration, and walks an element that carries none',
    },
    {
        'mutation': 'always-native selection, seen by the default tooltip',
        'file': SANITIZER,
        'find': '\t\tif (isSanitizeTarget(element)) {\n',
        'replace': '\t\tif (isSanitizeTarget(element) || true) {\n',
        'suite': TOOLTIP,
        'case': 'shows a default tooltip, text and markup, where no element carries a setHTML method',
    },
    {
        'mutation': 'always-walk selection',
        'file': SANITIZER,
        'find': '\t\tif (isSanitizeTarget(element)) {\n',
        'replace': '\t\tif (isSanitizeTarget(element) && false) {\n',
        'suite': SUITE,
        'case': 'calls the setHTML method an element carries once with the configuration, and walks an element that carries none',
    },
    {
        'mutation': 'validation removed',
        'file': SANITIZER,
        'find': '\t\tif (!isSanitizerConfig(copy)) {\n',
        'replace': '\t\tif (!isSanitizerConfig(copy) && false) {\n',
        'suite': SUITE,
        'case': 'refuses a configuration the platform refuses when it is constructed',
    },
    {
        'mutation': 'the caller configuration held by reference',
        'file': SANITIZER,
        'find': '\t\tthis.#config = Object.freeze(copy)\n',
        'replace': '\t\tthis.#config = config\n',
        'suite': SUITE,
        'case': 'holds its own copy of the configuration, so a later edit to the object the caller passed changes no write',
    },
    {
        'mutation': 'the walk parses in a template context',
        'file': SANITIZER,
        'find': (
            "\t\tconst inert = element.ownerDocument.implementation.createHTMLDocument('')\n"
            '\t\tconst context = inert.createElementNS(element.namespaceURI, element.localName)\n'
            '\t\tcontext.innerHTML = html\n'
            '\t\tconst parsed = isInstance(context, HTMLTemplateElement) ? context.content : context\n'
        ),
        'replace': (
            "\t\tconst template = element.ownerDocument.createElement('template')\n"
            '\t\ttemplate.innerHTML = html\n'
            '\t\tconst parsed = template.content\n'
        ),
        'suite': SUITE,
        'case': [
            'an empty dictionary keeps the text of table parts a div context drops',
            'the allowlist keeps the text of table parts a div context drops',
        ],
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
        if text.count(row['find']) != 1:
            raise SystemExit(f'Row {index}: the anchor does not occur exactly once in {row["file"]}')
        try:
            path.write_bytes(text.replace(row['find'], row['replace']).encode('utf-8'))
            report = run(row['suite'])
        finally:
            path.write_bytes(original)
        restored = digest(row['file']) == recorded[row['file']]
        results = [
            assertion
            for suite in report.get('testResults', [])
            for assertion in suite.get('assertionResults', [])
        ]
        cases = row['case'] if isinstance(row['case'], list) else [row['case']]
        statuses = []
        for title in cases:
            named = [assertion for assertion in results if assertion.get('title') == title]
            statuses.append(named[0].get('status') if len(named) == 1 else f'not collected ({len(named)} matches)')
        status = 'failed' if all(entry == 'failed' for entry in statuses) else ', '.join(statuses)
        failed = sum(1 for assertion in results if assertion.get('status') == 'failed')
        verdict = 'reddened' if status == 'failed' else 'SURVIVED'
        if verdict != 'reddened' or not restored:
            failures += 1
        receipt = 'restored byte for byte' if restored else 'RESTORE MISMATCH'
        lines.append(
            f'| {index} | {row["mutation"]} | `{row["file"]}` | `{row["suite"]}` | {'; '.join(cases)} | {', '.join(statuses)} | {failed} / {len(results)} | {verdict} | {receipt} |'
        )
    final = {path: digest(path) for path in files}
    lines += ['', '## Final digests', '']
    lines += [
        f'- `{path}` {final[path]} ' + ('restored byte for byte' if final[path] == recorded[path] else 'MISMATCH')
        for path in files
    ]
    lines += ['', f'Rows that did not redden their named case or did not restore: {failures}', '']
    LOG.write_text('\n'.join(lines), encoding='utf-8')
    print('\n'.join(lines))
    sys.exit(1 if failures else 0)


if __name__ == '__main__':
    main()
