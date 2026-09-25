"""J-SAMEWAY-ENGINES-A mutation instrument.

Each row plants one mutation in one exact source span, runs the one case it names through the real
`src:browser` Vitest project against that case's test file, and reads the case's status and failure
message from the JSON report.

Obligations, per engine:
- A1, the old refusal restored: a door before the token step reads the token at the change's start
  again, or the token step writes the token the host already wrote.
- A2, an entry's return dropped: the returning step skips one kind of entry, or loses an entry.
- A3, Toast's transition door requires the `shown` token again.
- PHASE, a phase stop that is not a takeover runs the returning step: the door no longer ends the
  change when the panel, the toast, the list, or the items stop it otherwise.
- ORDER, Tab reads the host's token before the list, so a sibling's own swap reads as a takeover.

Rule: a failed case counts as KILLED only when the first line of its failure message names an
assertion failure: it starts with `AssertionError`, or it is the expect library's own assertion
message, which starts with `expected `. Every other failure reads REFUSED, and so does a case that
was not collected or a file that reports a suite-level error. A passed case reads HELD only when its
file reports no suite-level error. The BOOM row plants a thrown `Error('boom')` and the UNBOUND row
an unbound identifier; both must read REFUSED. The CONTROL row plants an equivalent spelling of a
returning step's guard and must read HELD.

The first run (`tmp/j-engines-a/mutations-1.log.txt`) planted both Toast A2 rows as an arrow function
whose body was an `if` statement, which fails the transform: both read REFUSED with the setup
module's import failure, as the rule requires of a broken plant. Both rows now plant a block body.

Every mutated source is read before any row runs and its SHA-256 digest printed; each row restores
the bytes it read, and the end of the run checks every digest again and prints the receipt
`restored byte for byte`.

Run from the worktree root: python tmp/j-engines-a/mutations.py
The log goes to tmp/j-engines-a/mutations.log.txt as well as to standard output.
"""

import hashlib
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
REPORT = ROOT / 'tmp/j-engines-a/mutation-report.json'
LOG = ROOT / 'tmp/j-engines-a/mutations.log.txt'
VITEST = ROOT / 'node_modules/vitest/vitest.mjs'

COLLAPSE = 'src/browser/Collapse.ts'
TOAST = 'src/browser/Toast.ts'
TAB = 'src/browser/Tab.ts'
CAROUSEL = 'src/browser/Carousel.ts'

COLLAPSE_TEST = 'tests/src/browser/Collapse.test.ts'
TOAST_TEST = 'tests/src/browser/Toast.test.ts'
TAB_TEST = 'tests/src/browser/Tab.test.ts'
CAROUSEL_TEST = 'tests/src/browser/Carousel.test.ts'


def case(test, title):
    prefix = {COLLAPSE_TEST: 'Collapse', TOAST_TEST: 'Toast', TAB_TEST: 'Tab', CAROUSEL_TEST: 'Carousel'}
    return (test, f'{prefix[test]} {title}')


C_SHOW_EVENT = case(COLLAPSE_TEST, 'completes a show whose listener adds the shown token, expanding its trigger, clearing the size, and dispatching shown')
C_SHOW_SIBLING = case(COLLAPSE_TEST, 'completes a show whose open sibling hide listener adds the shown token to its panel')
C_HIDE_EVENT = case(COLLAPSE_TEST, 'completes a hide whose listener removes the shown token, collapsing its trigger and dispatching hidden')
C_HIDE_SIZE = case(COLLAPSE_TEST, 'completes a hide whose size write a reaction answers by removing the shown token, dispatching hidden and resolving true')
C_SHOW_TOKEN = case(COLLAPSE_TEST, 'returns a show whose completing token write a reaction answers by removing the shown token, clearing the transition token and the size, so a later show runs')
C_SHOW_SETTLED = case(COLLAPSE_TEST, 'returns a show whose transition removal a reaction answers by removing the shown token, clearing the size and collapsing each trigger that names no shown panel')
C_HIDE_TRIGGER = case(COLLAPSE_TEST, 'returns a hide whose trigger write a reaction answers by adding the shown token, expanding that trigger again and writing no aria-expanded value it never wrote')
C_SHOW_SIZED = case(COLLAPSE_TEST, 'returns a show whose listener added the shown token and whose zero-size write a reaction answers by removing it, adding back the host token and clearing the size')
C_SHOW_HOSTLESS = case(COLLAPSE_TEST, 'returns a show of a panel without the host token, whose host-token removal a reaction answers by removing the shown token, adding no host token')
C_SHOW_PHASE = case(COLLAPSE_TEST, 'stops a show whose transition-token write a reaction answers by removing that token, writing nothing more')

T_SHOW_FADE = case(TOAST_TEST, 'completes a show whose fade write a reaction answers by adding the shown token, dispatching shown and resolving true')
T_HIDE_EVENT = case(TOAST_TEST, 'completes a hide whose listener removes the shown token, dispatching hidden and resolving true')
T_HIDE_STUCK = case(TOAST_TEST, 'completes a hide whose transition-token write a reaction answers by removing the shown token, leaving no showing token, so a later show and hide run')
T_SHOW_TOKEN = case(TOAST_TEST, 'returns a show whose token write a reaction answers by removing the shown token, leaving no showing token, so a later show and hide run')
T_SHOW_SHOWN = case(TOAST_TEST, 'returns a show of a shown toast whose fade write a reaction answers by removing the shown token, removing only the fade token it added')
T_HIDE_RETURN = case(TOAST_TEST, 'returns a hide whose listener removed the shown token and whose transition-token write a reaction answers by adding it back, removing the showing token')
T_SHOW_PHASE = case(TOAST_TEST, 'stops a show whose shown-and-transition write a reaction answers by removing the transition token, writing nothing more')

TB_EVENT = case(TAB_TEST, 'completes a swap whose listener activates the control, writing no active token on the control and dispatching every event')
TB_SIBLING = case(TAB_TEST, 'completes a swap whose sibling token write a reaction answers by activating the control, writing no active token on the control')
TB_TOKEN = case(TAB_TEST, 'returns a swap whose control-activation write a reaction answers by removing the active token, reactivating and reselecting the sibling')
TB_DROPDOWN = case(TAB_TEST, 'returns a swap whose control loses its active token during the pane fade, reopening the dropdown that holds the sibling')
TB_TAKEN = case(TAB_TEST, 'resolves false for the swap a sibling takes over by a reaction to its control write, with no panes to read')
TB_PHASE = case(TAB_TEST, 'never swaps a list whose markup marks two controls active, stopping after the first removal')

CA_EVENT = case(CAROUSEL_TEST, 'completes a slide whose listener activates the incoming item, writing no active token on it and dispatching slid')
CA_INDICATOR = case(CAROUSEL_TEST, 'completes a slide whose indicator write a reaction answers by activating the incoming item, dispatching slid')
CA_TRANSITION = case(CAROUSEL_TEST, 'completes a slide whose incoming item gains its active token during the transition, dispatching slid')
CA_OUTGOING = case(CAROUSEL_TEST, 'returns a slide whose outgoing removal a reaction answers by removing the incoming active token, reactivating the outgoing item and its indicator')
CA_REVERSED = case(CAROUSEL_TEST, 'returns a slide whose listener activated the incoming item and which loses that token during the transition, removing the order and direction tokens it added')
CA_PHASE = case(CAROUSEL_TEST, 'stops a slide whose indicator write a reaction answers by taking the active token off the outgoing item, writing nothing more')

# (row, obligation, mutation label, (path, old, new), (test file, case full name), expected verdict)
ROWS = [
    ('A1-collapse-show-event', 'A1', 'the show re-read refuses a shown panel', (COLLAPSE, 'this.#transitioning([this.#host, ...siblings])', 'this.#transitioning([this.#host, ...siblings]) ||\n\t\t\tthis.shown'), C_SHOW_EVENT, 'KILLED'),
    ('A1-collapse-show-sibling', 'A1', 'the sibling door refuses a shown panel', (COLLAPSE, 'if (!this.#holds(change, shown, [], [this.#classes.transition])) return false', 'if (!this.#holds(change, shown, [], [this.#classes.transition, this.#classes.shown])) return false'), C_SHOW_SIBLING, 'KILLED'),
    ('A1-collapse-hide-event', 'A1', 'the hide re-read refuses a hidden panel', (COLLAPSE, 'this.#transitioning([this.#host])', 'this.#transitioning([this.#host]) ||\n\t\t\t!this.shown'), C_HIDE_EVENT, 'KILLED'),
    ('A1-collapse-hide-size', 'A1', 'the size-write door requires the shown token', (COLLAPSE, '!this.#apply(change, expected, [], during, () =>', '!this.#apply(change, expected, [this.#classes.shown], during, () =>'), C_HIDE_SIZE, 'KILLED'),
    ('A2-collapse-transition', 'A2', 'the returning step drops the transition entry', (COLLAPSE, "if (entry === 'transition') host.classList.remove(this.#classes.transition)", "if (entry === 'transition') return"), C_SHOW_TOKEN, 'KILLED'),
    ('A2-collapse-trigger', 'A2', 'the hide return drops each trigger entry', (COLLAPSE, "if (typeof entry !== 'string') this.#mark(entry, true)", "if (typeof entry !== 'string') return"), C_HIDE_TRIGGER, 'KILLED'),
    ('A2-collapse-filter', 'A2', 'the show return collapses a trigger naming a shown panel', (COLLAPSE, 'if (!panels.some((panel) => panel.classList.contains(shown))) this.#mark(entry, false)', 'this.#mark(entry, false)'), C_SHOW_SETTLED, 'KILLED'),
    ('A2-collapse-host', 'A2', 'the host-token removal is an entry on a panel without the token', (COLLAPSE, "const opened = host.classList.contains(this.#classes.host)\n\t\t\t? (['transition', 'host'] as const)\n\t\t\t: (['transition'] as const)", "const opened = ['transition', 'host'] as const"), C_SHOW_HOSTLESS, 'KILLED'),
    ('A2-collapse-host-return', 'A2', 'the returning step drops the host entry', (COLLAPSE, "else if (entry === 'host') host.classList.add(this.#classes.host)", "else if (entry === 'host') return"), C_SHOW_SIZED, 'KILLED'),
    ('PHASE-collapse', 'PHASE', 'a phase stop keeps the identity, so the returning step writes', (COLLAPSE, '\t\tthis.#change = {}\n', ''), C_SHOW_PHASE, 'KILLED'),
    ('A1-toast-show-fade', 'A1', 'the fade door refuses the shown token', (TOAST, '!this.#apply(change, expected, [], [transition], () => host.classList.add(fade))', '!this.#apply(change, expected, [], [shown, transition], () => host.classList.add(fade))'), T_SHOW_FADE, 'KILLED'),
    ('A1-toast-hide-event', 'A1', 'the hide re-read refuses a hidden toast', (TOAST, "has made this call's token write for it.\n\t\tif (this.#refused() || this.#change !== prior) return false", "has made this call's token write for it.\n\t\tif (this.#refused() || this.#change !== prior || !this.shown) return false"), T_HIDE_EVENT, 'KILLED'),
    ('A3-toast-hide-transition', 'A3', 'the transition door requires the shown token', (TOAST, 'if (!this.#apply(change, expected, [transition], [], () => host.classList.add(transition))) {', 'if (!this.#apply(change, expected, [shown, transition], [], () => host.classList.add(transition))) {'), T_HIDE_STUCK, 'KILLED'),
    ('A2-toast-transition', 'A2', 'the show return drops the transition entry', (TOAST, "() => this.#host.classList.remove(name === 'fade' ? fade : transition)", "() => {\n\t\t\t\tif (name === 'fade') this.#host.classList.remove(fade)\n\t\t\t}"), T_SHOW_TOKEN, 'KILLED'),
    ('A2-toast-fade', 'A2', 'the show return drops the fade entry', (TOAST, "() => this.#host.classList.remove(name === 'fade' ? fade : transition)", "() => {\n\t\t\t\tif (name !== 'fade') this.#host.classList.remove(transition)\n\t\t\t}"), T_SHOW_SHOWN, 'KILLED'),
    ('PHASE-toast', 'PHASE', 'a phase stop keeps the identity, so the returning step writes', (TOAST, '\t\tthis.#change = {}\n', ''), T_SHOW_PHASE, 'KILLED'),
    ('A1-tab-event', 'A1', 'the re-read refuses an active control', (TAB, 'this.#sibling() !== outgoing) {', 'this.#sibling() !== outgoing || this.active) {'), TB_EVENT, 'KILLED'),
    ('A1-tab-skip', 'A1', 'the token step writes the token the host already wrote', (TAB, 'if (!this.active) host.classList.add(active)', 'host.classList.add(active)'), TB_SIBLING, 'KILLED'),
    ('A2-tab-selected', 'A2', 'the returning step drops each selection entry', (TAB, 'this.#revert(change, () => this.#write([element, facet, !value]))', "if (facet !== 'selected') this.#revert(change, () => this.#write([element, facet, !value]))"), TB_TOKEN, 'KILLED'),
    ('A2-tab-dropdown', 'A2', 'the returning step drops each aria-expanded entry', (TAB, 'this.#revert(change, () => this.#write([element, facet, !value]))', "if (facet !== 'expanded') this.#revert(change, () => this.#write([element, facet, !value]))"), TB_DROPDOWN, 'KILLED'),
    ('ORDER-tab', 'ORDER', 'the host token is read before the list', (TAB, '\t\tif (this.#sibling() === undefined) {\n\t\t\tif (active !== undefined && this.active !== active) return false\n', '\t\tif (active !== undefined && this.active !== active) return false\n\t\tif (this.#sibling() === undefined) {\n'), TB_TAKEN, 'KILLED'),
    ('PHASE-tab', 'PHASE', 'a phase stop keeps the identity, so the returning step writes', (TAB, '\t\tthis.#change = {}\n', ''), TB_PHASE, 'KILLED'),
    ('A1-carousel-event', 'A1', 'the re-read refuses an active incoming item', (CAROUSEL, '!current.includes(incoming)\n\t\t) {', '!current.includes(incoming) ||\n\t\t\tincoming.classList.contains(active)\n\t\t) {'), CA_EVENT, 'KILLED'),
    ('A1-carousel-indicator', 'A1', 'the indicator door refuses an active incoming item', (CAROUSEL, '() => indicator.classList.remove(active),\n\t\t\t\t\t\tchange,\n\t\t\t\t\t\tpair,\n\t\t\t\t\t\texpected,\n\t\t\t\t\t\t[[outgoing, active]],\n\t\t\t\t\t\t[[indicator, active]],', '() => indicator.classList.remove(active),\n\t\t\t\t\t\tchange,\n\t\t\t\t\t\tpair,\n\t\t\t\t\t\texpected,\n\t\t\t\t\t\t[[outgoing, active]],\n\t\t\t\t\t\t[[indicator, active], [incoming, active]],'), CA_INDICATOR, 'KILLED'),
    ('A1-carousel-transition', 'A1', 'the transition door refuses an active incoming item', (CAROUSEL, 'if (!this.#holds(change, pair, expected, moving, blocked, [])) {', 'if (!this.#holds(change, pair, expected, moving, [...blocked, [incoming, active]], [])) {'), CA_TRANSITION, 'KILLED'),
    ('A2-carousel-current', 'A2', 'the returning step drops each aria-current entry', (CAROUSEL, "else if (entry[1] === null) entry[0].removeAttribute('aria-current')\n\t\t\t\telse entry[0].setAttribute('aria-current', entry[1])", 'else return'), CA_OUTGOING, 'KILLED'),
    ('A2-carousel-outgoing', 'A2', "the outgoing item's active removal is no entry", (CAROUSEL, '\t\t\t\t[outgoing, active, false],\n', ''), CA_OUTGOING, 'KILLED'),
    ('A2-carousel-direction', 'A2', "the incoming item's direction token is no entry", (CAROUSEL, ': [...turned, [incoming, direction, true]]', ': turned'), CA_REVERSED, 'KILLED'),
    ('PHASE-carousel', 'PHASE', 'a phase stop keeps the slide in flight, so the returning step writes', (CAROUSEL, '\t\tthis.#finish(change)\n\t\treturn false\n\t}', '\t\treturn false\n\t}'), CA_PHASE, 'KILLED'),
    ('CONTROL', 'control', "the hide return's guard spelled as a length test", (TOAST, "if (written.includes('transition')) {", 'if (written.length > 0) {'), T_HIDE_RETURN, 'HELD'),
    ('BOOM', 'refusal', "the collapse return throwing Error('boom')", (COLLAPSE, "if (entry === 'transition') host.classList.remove(this.#classes.transition)", "if (entry === 'transition') throw new Error('boom')"), C_SHOW_TOKEN, 'REFUSED'),
    ('UNBOUND', 'refusal', 'the tab token step naming an unbound identifier', (TAB, 'if (!this.active) host.classList.add(active)', 'if (!this.active) host.classList.add(unboundToken)'), TB_TOKEN, 'REFUSED'),
]

ASSERTION = re.compile(r'^(AssertionError\b|expected .+)')


def digest(data):
    return hashlib.sha256(data).hexdigest()


def emit(line, sink):
    print(line, flush=True)
    sink.append(line)


def escape(name):
    return ''.join('\\' + char if char in '\\^$.|?*+()[]{}' else char for char in name)


def first_line(text):
    for line in text.splitlines():
        if line.strip():
            return line.strip()[:200]
    return ''


def read(case_name):
    """Returns (status, first line of the failure message, refusal reason or None)."""
    if not REPORT.exists():
        return 'NO REPORT', '', 'no report'
    report = json.loads(REPORT.read_text(encoding='utf-8'))
    suites = report.get('testResults', [])
    suite_messages = [suite.get('message', '') for suite in suites if suite.get('message')]
    found = [
        result
        for suite in suites
        for result in suite.get('assertionResults', [])
        if result.get('fullName') == case_name
    ]
    if len(found) != 1:
        return f'NOT COLLECTED ({len(found)})', first_line(' '.join(suite_messages)), 'not collected'
    status = found[0]['status']
    message = first_line('\n'.join(found[0].get('failureMessages', [])))
    if suite_messages:
        return status, message, 'suite-level error: ' + first_line(' '.join(suite_messages))
    if status == 'passed':
        return status, '', None
    if status != 'failed':
        return status, message, 'not run'
    if ASSERTION.match(message):
        return status, message, None
    return status, message, 'not an assertion failure'


def run(test, case_name):
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
            escape(case_name),
            test,
        ],
        cwd=ROOT,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        check=False,
    )
    return read(case_name)


def verdict(status, reason):
    if status == 'passed' and reason is None:
        return 'HELD'
    if status == 'failed' and reason is None:
        return 'KILLED'
    return 'REFUSED'


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
    for row, obligation, label, (path, old, new), (test, case_name), expected in ROWS:
        text = originals[path].decode('utf-8')
        count = text.count(old)
        try:
            if count != 1:
                status, message, reason = f'ANCHOR ({count})', '', 'anchor'
            else:
                (ROOT / path).write_bytes(text.replace(old, new).encode('utf-8'))
                status, message, reason = run(test, case_name)
        finally:
            (ROOT / path).write_bytes(originals[path])
        reading = verdict(status, reason)
        if reading != expected:
            misses += 1
        cell = message.replace('|', '\\|')
        emit(
            f'| {row} | {obligation} | {label} | {case_name} | {expected} | {status} | {reading} | {cell} | {reason or ""} |',
            sink,
        )
    restored = all(digest((ROOT / path).read_bytes()) == recorded[path] for path in paths)
    emit('restored byte for byte' if restored else 'RESTORE FAILED', sink)
    emit(f'rows {len(ROWS)}, missed {misses}', sink)
    LOG.write_bytes(('\n'.join(sink) + '\n').encode('utf-8'))
    sys.exit(0 if restored and misses == 0 else 1)


if __name__ == '__main__':
    main()
