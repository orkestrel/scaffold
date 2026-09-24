"""J-GUARDS mutation instrument.

Each row mutates one or more exact source spans, runs the one case it names through the real
`src:browser` Vitest project, and reads that case's status from the JSON report. A kill row passes
when its case is collected and fails (KILLED); the control row passes when its case is collected and
passes (HELD). Every source is checked against its recorded SHA-256 digest before any row runs,
restored from the bytes read before the row after it runs, and checked against the recorded digest
again at the end, which prints the receipt `restored byte for byte`.

Run from the worktree root: python tmp/j-guards/mutations.py
The log goes to tmp/j-guards/mutations.log.txt as well as to standard output.
"""

import hashlib
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
REPORT = ROOT / 'tmp/j-guards/mutation-report.json'
LOG = ROOT / 'tmp/j-guards/mutations.log.txt'
VITEST = ROOT / 'node_modules/vitest/vitest.mjs'

# SHA-256 of each source a row mutates, recorded on the finished unit before the instrument's run.
RECORDED = {
    'src/browser/validators.ts': '9ddd219825f8a1c0d1915bcc28ebfc119fa39aacd1ad56fc69fa56483ca47b49',
    'src/browser/helpers.ts': '81941ebf1aac521807d7a90d602451635a0a074db95604391dbe06a5e0da23fe',
    'src/browser/Collapse.ts': '533ebb2db6d29d443cc8447bddc1f03cb706ce2dc48c5d00f33a0f68655b56b4',
    'src/browser/Alert.ts': 'a9bf4fa0c4c4ea5eeb12435b471a9318199967d64960358b2985ae6487f8bd3e',
    'src/browser/Toast.ts': 'fee42e12e5d36b53bef3f37f1fa0fb313bdf416fe1d5e15c5b27d7c588ced983',
    'src/browser/Tab.ts': '04acfb75b6673328bab8dca076b4ac1740b40a19ed2049e6446b1dec6003fa96',
    'src/browser/Modal.ts': '242da3b20b6e7cbefdef25add15437b9bc61be77bcff938b0a6cb0ba0d3cb86a',
    'src/browser/Offcanvas.ts': '3b4ed8e77b15701eb78125a535c0ce62635fd7d652d720fbde70f01521cdeb2b',
    'src/browser/Tooltip.ts': '7ca55290c4d617902c3ac4325aa90bf4b5afc7e4cb00801ae78e3baeb19cc544',
}

V = 'tests/src/browser/validators.test.ts'
H = 'tests/src/browser/helpers.test.ts'

BARE_BODY = 'return isInstance(value, CustomEvent) && value.detail === null'
RELATED_READ = (
    "\t\tconst related: unknown = 'relatedTarget' in detail ? detail.relatedTarget : undefined\n"
    '\t\treturn related === undefined || isInstance(related, HTMLElement)\n'
)
RELATED_HEAD = (
    'export function isRelatedEvent(value: unknown): value is CustomEvent<RelatedDetail> {\n'
    '\ttry {\n'
    '\t\tif (!isInstance(value, CustomEvent)) return false\n'
)
RELATED_BODY = (
    '\t\tif (!isInstance(value, CustomEvent)) return false\n'
    '\t\tconst detail: unknown = value.detail\n'
    "\t\tif (typeof detail !== 'object' || detail === null) return false\n" + RELATED_READ
)
RELATED_CONTAINED = '\ttry {\n' + RELATED_BODY + '\t} catch {\n\t\treturn false\n\t}\n}\n'
RELATED_BARE = RELATED_BODY.replace('\t\t', '\t') + '}\n'
SUPPLIED = '\t\tconst supplied = options?.[key]\n'


def swap(entity, events, current, other, tail):
    """Returns the edits that bind an engine through the other shared guard, import included."""
    path = f'src/browser/{entity}.ts'
    if current == 'isBareEvent':
        imports = (
            "import { isAttributeName, isBareEvent, isClassToken, isSelector } from './validators.js'",
            "import { isAttributeName, isRelatedEvent, isClassToken, isSelector } from './validators.js'",
        )
    else:
        imports = (
            "import { isAttributeName, isClassToken, isRelatedEvent, isSelector } from './validators.js'",
            "import { isAttributeName, isClassToken, isBareEvent, isSelector } from './validators.js'",
        )
    return [
        (path, *imports),
        (path, f'bindEventMap(host, {events}, {current}, {tail})', f'bindEventMap(host, {events}, {other}, {tail})'),
    ]


# (id, obligation, mutation, edits, test file, case full name, expected)
ROWS = [
    (
        'P1-a',
        'P1',
        'isBareEvent accepts any object whose detail is null (class half dropped)',
        [('src/browser/validators.ts', BARE_BODY, 'return isInstance(value, Object) && value.detail === null')],
        V,
        'isBareEvent requires a custom event whose detail the platform reads as absent, under any wire name',
        'failed',
    ),
    (
        'P1-b',
        'P1',
        'isBareEvent accepts any defined detail (null check inverted to undefined)',
        [('src/browser/validators.ts', BARE_BODY, 'return isInstance(value, CustomEvent) && value.detail !== undefined')],
        V,
        'isBareEvent requires a custom event whose detail the platform reads as absent, under any wire name',
        'failed',
    ),
    (
        'P1-c',
        'P1',
        'isBareEvent loses its containment',
        [
            (
                'src/browser/validators.ts',
                '\ttry {\n\t\t' + BARE_BODY + '\n\t} catch {\n\t\treturn false\n\t}\n',
                '\t' + BARE_BODY + '\n',
            )
        ],
        V,
        'isBareEvent returns false when a prototype or detail accessor throws',
        'failed',
    ),
    (
        'P2-a',
        'P2',
        'isRelatedEvent accepts any Element (HTMLElement widened to Element)',
        [('src/browser/validators.ts', 'isInstance(related, HTMLElement)', 'isInstance(related, Element)')],
        V,
        'isRelatedEvent requires a custom event whose detail object carries no relatedTarget, or an undefined or HTML element one',
        'failed',
    ),
    (
        'P2-b',
        'P2',
        'isRelatedEvent accepts a null related target (=== undefined loosened to == null)',
        [('src/browser/validators.ts', 'return related === undefined ||', 'return related == null ||')],
        V,
        'isRelatedEvent requires a custom event whose detail object carries no relatedTarget, or an undefined or HTML element one',
        'failed',
    ),
    (
        'P2-c',
        'P2',
        'isRelatedEvent accepts any object (instance check dropped)',
        [
            (
                'src/browser/validators.ts',
                RELATED_HEAD,
                RELATED_HEAD.replace(
                    'if (!isInstance(value, CustomEvent)) return false',
                    "if (typeof value !== 'object' || value === null || !('detail' in value)) return false",
                ),
            )
        ],
        V,
        'isRelatedEvent requires a custom event whose detail object carries no relatedTarget, or an undefined or HTML element one',
        'failed',
    ),
    (
        'P2-d',
        'P2',
        "isRelatedEvent reads relatedTarget again, as the removed modal guard did",
        [
            (
                'src/browser/validators.ts',
                RELATED_READ,
                "\t\tif (!('relatedTarget' in detail)) return true\n"
                '\t\treturn detail.relatedTarget === undefined || isInstance(detail.relatedTarget, HTMLElement)\n',
            )
        ],
        V,
        'isRelatedEvent reads the relatedTarget member of the detail once',
        'failed',
    ),
    (
        'P2-e',
        'P2',
        'isRelatedEvent loses its containment',
        [('src/browser/validators.ts', RELATED_CONTAINED, RELATED_BARE)],
        V,
        'isRelatedEvent returns false when a prototype, detail, or relatedTarget accessor throws',
        'failed',
    ),
    (
        'P4-collapse',
        'P4',
        'Collapse binds its hooks through isRelatedEvent',
        swap('Collapse', 'COLLAPSE_EVENTS', 'isBareEvent', 'isRelatedEvent', 'options?.on, this.#controller.signal'),
        'tests/src/browser/Collapse.test.ts',
        'Collapse dispatches bubbling events, the pre-change ones cancelable, with no detail, and binds only engine-shaped events to hooks',
        'failed',
    ),
    (
        'P4-alert',
        'P4',
        'Alert binds its hooks through isRelatedEvent',
        swap('Alert', 'ALERT_EVENTS', 'isBareEvent', 'isRelatedEvent', 'options?.on, this.#controller.signal'),
        'tests/src/browser/Alert.test.ts',
        'Alert dispatches a cancelable close and a non-cancelable closed, both bubbling with no detail, closed on the removed host alone, and binds only engine-shaped events to hooks',
        'failed',
    ),
    (
        'P4-toast',
        'P4',
        'Toast binds its hooks through isRelatedEvent',
        swap('Toast', 'TOAST_EVENTS', 'isBareEvent', 'isRelatedEvent', 'options?.on, signal'),
        'tests/src/browser/Toast.test.ts',
        'Toast dispatches bubbling events, the pre-change ones cancelable, with no detail, and binds only engine-shaped events to hooks',
        'failed',
    ),
    (
        'P4-tab',
        'P4',
        'Tab binds its hooks through isBareEvent',
        swap('Tab', 'TAB_EVENTS', 'isRelatedEvent', 'isBareEvent', 'options?.on, this.#controller.signal'),
        'tests/src/browser/Tab.test.ts',
        'Tab dispatches bubbling events, the pre-change ones cancelable, with the other control in detail, and binds only engine-shaped events to hooks',
        'failed',
    ),
    (
        'P4-modal',
        'P4',
        'Modal binds its hooks through isBareEvent',
        swap('Modal', 'MODAL_EVENTS', 'isRelatedEvent', 'isBareEvent', 'options?.on, signal'),
        'tests/src/browser/Modal.test.ts',
        'Modal dispatches bubbling events carrying the trigger in show and shown, the pre-change ones cancelable, and binds only engine-shaped events to hooks',
        'failed',
    ),
    (
        'P4-offcanvas',
        'P4',
        'Offcanvas binds its hooks through isBareEvent',
        swap('Offcanvas', 'OFFCANVAS_EVENTS', 'isRelatedEvent', 'isBareEvent', 'options?.on, signal'),
        'tests/src/browser/Offcanvas.test.ts',
        'Offcanvas dispatches bubbling events carrying the trigger in show and shown, the pre-change ones cancelable, and binds only engine-shaped events to hooks',
        'failed',
    ),
    (
        'P4-popover',
        'P4',
        'The tooltip engine binds its hooks through isRelatedEvent',
        [
            (
                'src/browser/Tooltip.ts',
                "import { isAttributeName, isBareEvent, isClassToken, isSelector } from './validators.js'",
                "import { isAttributeName, isRelatedEvent, isClassToken, isSelector } from './validators.js'",
            ),
            (
                'src/browser/Tooltip.ts',
                'bindEventMap(host, profile.events, isBareEvent, settings?.on, signal)',
                'bindEventMap(host, profile.events, isRelatedEvent, settings?.on, signal)',
            ),
        ],
        'tests/src/browser/Popover.test.ts',
        'Popover runs an initial hook only for a popover event carrying no payload',
        'failed',
    ),
    (
        'O1',
        'G3',
        'resolveOptions copies every enumerable constructor key again (the removed loop restored)',
        [
            (
                'src/browser/helpers.ts',
                '\t\tresolved[key] = value\n\t}\n\treturn resolved\n}\n',
                '\t\tresolved[key] = value\n\t}\n\tfor (const key in options) {\n\t\tconst value = options[key]\n'
                '\t\tif (value !== undefined) resolved[key] = value\n\t}\n\treturn resolved\n}\n',
            )
        ],
        H,
        'resolveOptions never reads a constructor key the parser table does not declare',
        'failed',
    ),
    (
        'O2',
        'G3',
        'resolveOptions spreads the constructor object over the defaults',
        [('src/browser/helpers.ts', 'const resolved: T = { ...defaults }\n\tfor (const key in parsers)', 'const resolved: T = { ...defaults, ...options }\n\tfor (const key in parsers)')],
        H,
        'resolveOptions leaves a constructor key the parser table does not declare out of the result',
        'failed',
    ),
    (
        'O3',
        'G3',
        'resolveOptions reads a declared key twice',
        [
            (
                'src/browser/helpers.ts',
                SUPPLIED + '\t\tif (supplied !== undefined) {\n\t\t\tresolved[key] = supplied\n',
                '\t\tif (options?.[key] !== undefined) {\n\t\t\tresolved[key] = options[key]\n',
            )
        ],
        H,
        'resolveOptions reads a declared constructor key once',
        'failed',
    ),
    (
        'O4',
        'G3',
        'resolveOptions reads own constructor keys only',
        [('src/browser/helpers.ts', SUPPLIED, '\t\tconst supplied = options !== undefined && Object.hasOwn(options, key) ? options[key] : undefined\n')],
        H,
        'resolveOptions takes an inherited declared constructor key over the attribute',
        'failed',
    ),
    (
        'O4-enumerable',
        'G3',
        'resolveOptions reads own enumerable constructor keys only',
        [
            (
                'src/browser/helpers.ts',
                SUPPLIED,
                '\t\tconst supplied =\n\t\t\toptions !== undefined && Object.prototype.propertyIsEnumerable.call(options, key)\n'
                '\t\t\t\t? options[key]\n\t\t\t\t: undefined\n',
            )
        ],
        H,
        'resolveOptions takes a non-enumerable declared constructor key over the attribute',
        'failed',
    ),
    (
        'O5',
        'G3',
        "The tooltip engine declares a content key in its main parser table",
        [('src/browser/Tooltip.ts', '\t\t\t\tdescendants: parseString,\n', '\t\t\t\tdescendants: parseString,\n\t\t\t\tcontent: parseString,\n')],
        'tests/src/browser/Tooltip.test.ts',
        'Tooltip never reads a content option, which its profile declares no slot for, from the constructor object',
        'failed',
    ),
    (
        'CONTROL',
        'control',
        'isRelatedEvent tests the element before undefined (operands swapped, one read kept)',
        [('src/browser/validators.ts', 'return related === undefined || isInstance(related, HTMLElement)', 'return isInstance(related, HTMLElement) || related === undefined')],
        V,
        'isRelatedEvent reads the relatedTarget member of the detail once',
        'passed',
    ),
]


def digest(data):
    return hashlib.sha256(data).hexdigest()


def emit(line, sink):
    print(line, flush=True)
    sink.append(line)


def escape(name):
    return ''.join('\\' + char if char in '\\^$.|?*+()[]{}' else char for char in name)


def status(case):
    report = json.loads(REPORT.read_text(encoding='utf-8'))
    found = [
        result['status']
        for suite in report.get('testResults', [])
        for result in suite.get('assertionResults', [])
        if result.get('fullName') == case
    ]
    return found[0] if len(found) == 1 else f'NOT COLLECTED ({len(found)})'


def run(test, case):
    if REPORT.exists():
        REPORT.unlink()
    subprocess.run(
        [
            'node',
            str(VITEST),
            'run',
            '--config',
            'vite.config.ts',
            '--no-cache',
            '--project',
            'src:browser',
            '--reporter=json',
            f'--outputFile={REPORT.relative_to(ROOT).as_posix()}',
            '-t',
            escape(case),
            test,
        ],
        cwd=ROOT,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        check=False,
    )
    return status(case) if REPORT.exists() else 'NO REPORT'


def main():
    sink = []
    originals = {path: (ROOT / path).read_bytes() for path in RECORDED}
    for path, recorded in RECORDED.items():
        actual = digest(originals[path])
        if actual != recorded:
            emit(f'DIGEST MISMATCH {path}: recorded {recorded}, found {actual}', sink)
            LOG.write_text('\n'.join(sink) + '\n', encoding='utf-8')
            sys.exit(2)
        emit(f'digest {path} {actual}', sink)
    emit('| Row | Obligation | Mutation | Case | Expected | Reading | Verdict |', sink)
    emit('| --- | --- | --- | --- | --- | --- | --- |', sink)
    failures = 0
    for row, obligation, mutation, edits, test, case, expected in ROWS:
        try:
            texts = {path: originals[path].decode('utf-8') for path, _, _ in edits}
            for path, old, new in edits:
                count = texts[path].count(old)
                if count != 1:
                    raise ValueError(f'{path}: anchor found {count} times')
                texts[path] = texts[path].replace(old, new)
            for path, text in texts.items():
                (ROOT / path).write_bytes(text.encode('utf-8'))
            reading = run(test, case)
        except ValueError as error:
            reading = f'ANCHOR ({error})'
        finally:
            for path in {path for path, _, _ in edits}:
                (ROOT / path).write_bytes(originals[path])
        verdict = ('KILLED' if expected == 'failed' else 'HELD') if reading == expected else 'MISSED'
        if verdict == 'MISSED':
            failures += 1
        emit(f'| {row} | {obligation} | {mutation} | {test} > {case} | {expected} | {reading} | {verdict} |', sink)
    restored = all(digest((ROOT / path).read_bytes()) == recorded for path, recorded in RECORDED.items())
    emit('restored byte for byte' if restored else 'RESTORE FAILED', sink)
    emit(f'rows {len(ROWS)}, missed {failures}', sink)
    LOG.write_text('\n'.join(sink) + '\n', encoding='utf-8')
    sys.exit(0 if restored and failures == 0 else 1)


if __name__ == '__main__':
    main()
