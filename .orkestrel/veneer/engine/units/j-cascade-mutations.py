"""J-CASCADE mutation instrument.

Each row plants one mutation in one exact source span, runs the one case it names through the real
`src:browser` Vitest project against that case's test file, and reads the case's status and failure
message from the JSON report.

Seams, one mutation each:
- WAIT, the engine's wait: `settleAnimations` in `src/browser/helpers.ts` returns before it reads a
  running animation, so no fade engine waits on its fade. Its rows name each C1 case and each C2
  case, whose zero-factor reading holds under it and whose large-factor reading must break.
- TOKEN, the fade token read: the shipped `.fade` transition in `src/styles/components/_fade.scss`
  reads a literal `150ms` in place of the `--vn-motion-feedback` token, so the motion factor no
  longer reaches the fade.
- SWIPE, the swipe direction: `Swipe` in `src/browser/Swipe.ts` reports a rightward drag as `left`
  and a leftward one as `right`.

Refusal rule: a failed case counts as KILLED only when its failure is an assertion the mutation
reached. The instrument REFUSES the kill when the case was not collected, when the file reports a
suite-level error (a collection, syntax, or transform failure), or when the case's failure message
or the run's output names a `ReferenceError`, a `TypeError` naming an unbound identifier
(`is not defined`, `is not a function`, `is not a constructor`), a `SyntaxError`, a Vite transform or
import-resolution failure, or a Sass compile error. The REFUSAL row plants an unbound identifier in
the WAIT seam and must read REFUSED.

The CONTROL row plants an equivalent spelling of the TOKEN seam's declaration and must read HELD.

Every mutated source is read before any row runs and its SHA-256 digest printed; each row restores
the bytes it read, and the end of the run checks every digest again and prints the receipt
`restored byte for byte`.

Run from the worktree root: python tmp/j-cascade/mutations.py
The log goes to tmp/j-cascade/mutations.log.txt as well as to standard output.
"""

import hashlib
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
REPORT = ROOT / 'tmp/j-cascade/mutation-report.json'
LOG = ROOT / 'tmp/j-cascade/mutations.log.txt'
VITEST = ROOT / 'node_modules/vitest/vitest.mjs'

HELPERS = 'src/browser/helpers.ts'
FADE = 'src/styles/components/_fade.scss'
SWIPE = 'src/browser/Swipe.ts'

WAIT_ANCHOR = '\tconst controller = new AbortController()\n\tconst aborted'
WAIT = (HELPERS, WAIT_ANCHOR, '\tif (!signal.aborted) return\n' + WAIT_ANCHOR)
UNBOUND = (HELPERS, WAIT_ANCHOR, WAIT_ANCHOR.replace('new AbortController()', 'new AbortController(unboundSignal)'))
TOKEN_ANCHOR = 'transition(opacity var(--vn-motion-feedback) linear)'
TOKEN = (FADE, TOKEN_ANCHOR, 'transition(opacity 150ms linear)')
EQUIVALENT = (FADE, TOKEN_ANCHOR, 'transition(opacity linear var(--vn-motion-feedback))')
SWIPE_ANCHOR = "this.#handler(distance > 0 ? 'right' : 'left')"
DIRECTION = (SWIPE, SWIPE_ANCHOR, "this.#handler(distance > 0 ? 'left' : 'right')")

FACTOR = 'at a zero motion factor, and only after the fade the factor lengthens finishes at a large one'

ALERT_FADE = ('tests/src/browser/Alert.test.ts', 'Alert fades an alert carrying the fade token out through its opacity transition before it removes the host')
TAB_FADE = ('tests/src/browser/Tab.test.ts', 'Tab waits for the pane fade to settle before dispatching the completed events, leaving no animation on the pane')
TOAST_FADE = ('tests/src/browser/Toast.test.ts', 'Toast shows through the fade and showing tokens and hides back under the shipped cascade, awaiting the fade out')
TOAST_SHOWN = ('tests/src/browser/Toast.test.ts', 'Toast dispatches shown after the fade out that a show of a shown toast runs through the showing token finishes')
TOOLTIP_FADE = ('tests/src/browser/Tooltip.test.ts', 'Tooltip waits for the fade in and the fade out when animated, and neither writes the fade token nor waits when not')
POPOVER_FADE = ('tests/src/browser/Popover.test.ts', 'Popover fades its tip in and out on trusted clicks under the shipped cascade by default, dispatching shown and hidden only after each fade finishes')
ALERT_FACTOR = ('tests/src/browser/Alert.test.ts', f'Alert dispatches closed with no running fade {FACTOR}')
TAB_FACTOR = ('tests/src/browser/Tab.test.ts', f'Tab dispatches shown with no running pane fade {FACTOR}')
TOAST_FACTOR = ('tests/src/browser/Toast.test.ts', f'Toast dispatches hidden with no running fade {FACTOR}')
TOOLTIP_FACTOR = ('tests/src/browser/Tooltip.test.ts', f'Tooltip dispatches shown with no running fade on the tip {FACTOR}')
POPOVER_FACTOR = ('tests/src/browser/Popover.test.ts', f'Popover dispatches shown with no running fade on the tip {FACTOR}')
CAROUSEL_DRAG = ('tests/src/browser/Carousel.test.ts', 'Carousel slides next on a trusted leftward touch drag and previous on a rightward one under the shipped carousel cascade')

# (row, obligation, mutation label, edit, (test file, case full name), expected verdict)
ROWS = [
    ('C1-alert', 'C1', 'WAIT', WAIT, ALERT_FADE, 'KILLED'),
    ('C1-tab', 'C1', 'WAIT', WAIT, TAB_FADE, 'KILLED'),
    ('C1-toast-hide', 'C1', 'WAIT', WAIT, TOAST_FADE, 'KILLED'),
    ('C1-toast-show', 'C1', 'WAIT', WAIT, TOAST_SHOWN, 'KILLED'),
    ('C1-tooltip', 'C1', 'WAIT', WAIT, TOOLTIP_FADE, 'KILLED'),
    ('C1-popover', 'C1', 'WAIT', WAIT, POPOVER_FADE, 'KILLED'),
    ('C2-wait-alert', 'C2', 'WAIT', WAIT, ALERT_FACTOR, 'KILLED'),
    ('C2-wait-tab', 'C2', 'WAIT', WAIT, TAB_FACTOR, 'KILLED'),
    ('C2-wait-toast', 'C2', 'WAIT', WAIT, TOAST_FACTOR, 'KILLED'),
    ('C2-wait-tooltip', 'C2', 'WAIT', WAIT, TOOLTIP_FACTOR, 'KILLED'),
    ('C2-wait-popover', 'C2', 'WAIT', WAIT, POPOVER_FACTOR, 'KILLED'),
    ('C2-alert', 'C2', 'TOKEN', TOKEN, ALERT_FACTOR, 'KILLED'),
    ('C2-tab', 'C2', 'TOKEN', TOKEN, TAB_FACTOR, 'KILLED'),
    ('C2-toast', 'C2', 'TOKEN', TOKEN, TOAST_FACTOR, 'KILLED'),
    ('C2-tooltip', 'C2', 'TOKEN', TOKEN, TOOLTIP_FACTOR, 'KILLED'),
    ('C2-popover', 'C2', 'TOKEN', TOKEN, POPOVER_FACTOR, 'KILLED'),
    ('C3-carousel', 'C3', 'SWIPE', DIRECTION, CAROUSEL_DRAG, 'KILLED'),
    ('CONTROL', 'control', 'TOKEN spelled as the equivalent `opacity linear <duration>` shorthand', EQUIVALENT, ALERT_FACTOR, 'HELD'),
    ('REFUSAL', 'refusal', 'WAIT seam with an unbound identifier passed to the controller', UNBOUND, ALERT_FADE, 'REFUSED'),
]

REFUSALS = [
    re.compile(r'ReferenceError'),
    re.compile(r'TypeError: [^\n]*is not (defined|a function|a constructor)'),
    re.compile(r'SyntaxError'),
    re.compile(r'Transform failed'),
    re.compile(r'Failed to (resolve import|load url|fetch dynamically imported module)'),
    re.compile(r'\[sass\]'),
]


def digest(data):
    return hashlib.sha256(data).hexdigest()


def emit(line, sink):
    print(line, flush=True)
    sink.append(line)


def escape(name):
    return ''.join('\\' + char if char in '\\^$.|?*+()[]{}' else char for char in name)


def refusal(text):
    for pattern in REFUSALS:
        match = pattern.search(text)
        if match:
            return match.group(0)
    return None


def first_line(text):
    for line in text.splitlines():
        if line.strip():
            return line.strip()[:160]
    return ''


def read(case, output):
    """Returns (status, message, refused reason) for the case from the JSON report and the run output."""
    if not REPORT.exists():
        return 'NO REPORT', first_line(output), 'no report'
    report = json.loads(REPORT.read_text(encoding='utf-8'))
    suites = report.get('testResults', [])
    suite_messages = [suite.get('message', '') for suite in suites if suite.get('message')]
    found = [
        result
        for suite in suites
        for result in suite.get('assertionResults', [])
        if result.get('fullName') == case
    ]
    if len(found) != 1:
        return f'NOT COLLECTED ({len(found)})', first_line(' '.join(suite_messages)), 'collection failure'
    status = found[0]['status']
    message = '\n'.join(found[0].get('failureMessages', []))
    if status != 'failed':
        return status, '', None
    if suite_messages:
        return status, first_line(message), 'suite-level error: ' + first_line(' '.join(suite_messages))
    reason = refusal(message) or refusal(output)
    return status, first_line(message), reason


def run(test, case):
    if REPORT.exists():
        REPORT.unlink()
    completed = subprocess.run(
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
        capture_output=True,
        text=True,
        encoding='utf-8',
        errors='replace',
        check=False,
    )
    return read(case, (completed.stdout or '') + (completed.stderr or ''))


def verdict(status, reason):
    if status == 'passed':
        return 'HELD'
    if status == 'failed' and reason is None:
        return 'KILLED'
    if reason is not None:
        return 'REFUSED'
    return 'MISSED'


def main():
    sink = []
    paths = sorted({row[3][0] for row in ROWS})
    originals = {path: (ROOT / path).read_bytes() for path in paths}
    recorded = {path: digest(data) for path, data in originals.items()}
    for path in paths:
        emit(f'digest {path} {recorded[path]}', sink)
    emit('| Row | Obligation | Mutation | Case | Expected | Status | Verdict | Failure message | Refusal |', sink)
    emit('| --- | --- | --- | --- | --- | --- | --- | --- | --- |', sink)
    misses = 0
    for row, obligation, label, (path, old, new), (test, case), expected in ROWS:
        text = originals[path].decode('utf-8')
        count = text.count(old)
        try:
            if count != 1:
                status, message, reason = f'ANCHOR ({count})', '', 'anchor'
            else:
                (ROOT / path).write_bytes(text.replace(old, new).encode('utf-8'))
                status, message, reason = run(test, case)
        finally:
            (ROOT / path).write_bytes(originals[path])
        reading = verdict(status, reason)
        if reading != expected:
            misses += 1
        cell = message.replace('|', '\\|')
        emit(
            f'| {row} | {obligation} | {label} | {test} > {case} | {expected} | {status} | {reading} | {cell} | {reason or ""} |',
            sink,
        )
    restored = all(digest((ROOT / path).read_bytes()) == recorded[path] for path in paths)
    emit('restored byte for byte' if restored else 'RESTORE FAILED', sink)
    emit(f'rows {len(ROWS)}, missed {misses}', sink)
    LOG.write_bytes(('\n'.join(sink) + '\n').encode('utf-8'))
    sys.exit(0 if restored and misses == 0 else 1)


if __name__ == '__main__':
    main()
