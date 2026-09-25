"""J-SAMEWAY-ENGINES-B mutation instrument, round 3.

Each row plants one mutation, as one or more exact source spans, runs the one case it names through
the real `src:browser` Vitest project against that case's test file, and reads the case's status and
failure message from the JSON report.

Rule: a failed case reads KILLED only when the first line of its failure message names an assertion
failure: it starts with `AssertionError`, or it is the expect library's own assertion message, which
starts with `expected ` and names what the assertion expected. Every other failure reads REFUSED,
whatever it names, and so does a case that was not collected. A file that reports a suite-level
error reads REFUSED whether its case failed or passed, and a passed case reads HELD only when the whole
file run reports success: the report's `success` flag is true and Vitest exits 0, which it does
only with no failed case and no unhandled error. The BOOM row plants a thrown `Error('boom')` and the UNBOUND row an
unbound identifier; both must read REFUSED. The CONTROL rows plant an equivalent spelling of a door
read and must read HELD.

Every mutated source is read before any row runs and its SHA-256 digest printed; each row restores
the bytes it read, and the end of the run checks every digest again and prints the receipt
`restored byte for byte`.

Run from the worktree root: python tmp/j-engines-b/mutations-3.py
The log goes to tmp/j-engines-b/mutations-3.log.txt as well as to standard output.
"""

import hashlib
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
REPORT = ROOT / 'tmp/j-engines-b/mutation-report-3.json'
LOG = ROOT / 'tmp/j-engines-b/mutations-3.log.txt'
VITEST = ROOT / 'node_modules/vitest/vitest.mjs'

D = 'src/browser/Dropdown.ts'
T = 'src/browser/Tooltip.ts'
DT = 'tests/src/browser/Dropdown.test.ts'
TT = 'tests/src/browser/Tooltip.test.ts'
PT = 'tests/src/browser/Popover.test.ts'

# The cases, by the file that holds them.
DB1S = ('Dropdown', DT, 'completes a show whose menu shown token the host adds first at each door before its token step, skipping that write')
DB1H = ('Dropdown', DT, 'completes a hide whose menu shown token the host removes first at each door before its token step, skipping that write')
DB2S = ('Dropdown', DT, 'returns a show to the hidden state when the host removes the menu shown token after the show found it at its end')
DB2H = ('Dropdown', DT, 'keeps the shown state of a hide whose menu shown token the host adds back after the hide found it removed')
DB3 = ('Dropdown', DT, 'hides the menu with its events when a consumer invoker or a hidePopover call closes the promoted menu')
DB3P = ('Dropdown', DT, 'promotes the menu again once when a listener prevents the hide a platform close starts, and hides it at the next close')
DLIFE = ('Dropdown', DT, 'writes nothing more of a stopped show returning step when a reaction inside its placement restoration destroys the dropdown')
DNEST = ('Dropdown', DT, 'promotes once and dispatches one shown event when a listener to its show event shows it again, the inner call resolving true and the outer false')
TB1S = ('Tooltip', TT, 'completes a show whose tip the host marks shown first at each door before its token step, skipping that write')
TB1H = ('Tooltip', TT, 'completes a hide whose tip the host takes the shown token from first at its hide event, skipping that write')
TB2 = ('Tooltip', TT, 'returns what a change wrote to the state the host chose when the host moves the tip shown token against it after its token step')
TB3 = ('Tooltip', TT, 'hides the tip with its events when a consumer invoker or a hidePopover call closes it')
TMOVED = ('Tooltip', TT, 'leaves a tip a reaction moves during the show fade where it is, promoted and named, and takes no returning step')
TLIFE = ('Tooltip', TT, 'writes nothing more of a stopped show returning step when a reaction inside its tip removal destroys the tooltip')
PB1 = ('Popover', PT, 'completes a change whose tip the host moves the shown token to the change end first at a door before its token step, skipping that write')
PB2 = ('Popover', PT, 'returns what a change wrote to the state the host chose when the host moves the tip shown token against it during the fade')
PB3 = ('Popover', PT, 'hides the tip with its events when a consumer invoker or a hidePopover call closes it')
DWB = ('Dropdown', DT, 'writes back only the toggle targets a stopped change altered, to their prior values, in reverse order of its first writes')
DNESTED = ('Dropdown', DT, 'leaves a show a reaction starts inside a stopped show write-back as that show wrote it')
DREFUSED = ('Dropdown', DT, 'hides the menu with its events when a listener cancels the promotion again after a prevented platform close')
TDESC = ('Tooltip', TT, 'takes only its own id out of aria-describedby when the host takes a show over, keeping a present attribute and another engine id')
TORDER = ('Tooltip', TT, 'destroys the placement and takes its id out before it removes the tip, when the host takes a show over')
TLIFE3 = ('Tooltip', TT, 'writes nothing more of a stopped show returning step when a listener inside its placement destruction destroys the tooltip')
TREFUSED = ('Tooltip', TT, 'hides the tip with its events when a listener cancels the promotion again after a prevented platform close')
PREFUSED = ('Popover', PT, 'hides the tip with its events when a listener cancels the promotion again after a prevented platform close')

# Dropdown anchors.
D_SHOW_HALTED = 'if (this.#halted(prior, true)) return false'
D_HIDE_HALTED = 'if (this.#halted(prior, guarded)) return false'
D_SHOW_EXPECTED = 'const expected = this.shown ? true : undefined'
D_HIDE_EXPECTED = 'const expected = this.shown ? undefined : false'
D_SHOW_SKIP = 'if (!this.shown) menu.classList.add(shown)'
D_HIDE_SKIP = 'if (this.shown) menu.classList.remove(shown)'
D_REHIDE_BODY = (
    '\t\trewindHostWrites(written, () => this.#owns(change))\n'
    '\t\tif (!this.#owns(change)) return false\n'
)
D_RETURN_PLACEMENT = '\t\tplacement?.destroy()\n\t\tif (this.#placement === placement) this.#placement = undefined\n'
D_RESHOW_BODY = '\t#reshow(change: object, written: readonly HostWrite[]): false {\n\t\trewindHostWrites(written, () => this.#owns(change))\n'
D_RECORD_ARIA = "let written = recordHostWrite([], expanded, 'true')"
D_RECORD_TOGGLE = "written = recordHostWrite(written, { category: 'token', element: host, name: shown }, shown)"
D_RECORD_HIDE_TOGGLE = (
    '\t\t\tlet written = recordHostWrite(\n'
    '\t\t\t\t[],\n'
    "\t\t\t\t{ category: 'token', element: host, name: shown },\n"
    '\t\t\t\tundefined,\n'
    '\t\t\t)\n'
)
D_RECORD_HIDE_ARIA = (
    '\t\t\twritten = recordHostWrite(\n'
    '\t\t\t\twritten,\n'
    "\t\t\t\t{ category: 'attribute', element: host, name: 'aria-expanded' },\n"
    "\t\t\t\t'false',\n"
    '\t\t\t)\n'
)
D_REOPENED = 'if (!opened && this.#placement === placement && this.shown) {'
D_IDENTITY = '\t\t\tthis.#change !== prior ||\n'
D_OBSERVE = "menu.addEventListener('toggle', (event) => this.#follow(event), {"
D_REPROMOTE = '\t\tthis.#promoted = placement\n\t\tthis.#menu.showPopover()\n'
D_BOUND = 'if (this.#promoted === placement) {'
D_OWNS = 'return !this.#controller.signal.aborted && this.#change === change'
D_REHIDE_START = '#rehide(change: object, written: readonly HostWrite[]): false {\n'

# Tooltip anchors.
T_CONNECTION = 'if (!this.#apply(change, undefined, () => container.append(tip))) return false'
T_LINK = 'if (!this.#apply(change, undefined, () => this.#link(tip.id, true))) return false'
T_INSERTED = 'if (!this.#apply(change, undefined, () => emitEvent(host, events.inserted, null, false))) {'
T_OWNED = 'owned: this.#holds.bind(this, change, undefined),'
T_SHOW_SKIP = 'if (!tip.classList.contains(shown)) tip.classList.add(shown)'
T_HIDE_DOOR = (
    "// A listener that only took the tip's `shown` token has made this call's token write for it.\n"
    '\t\t\tif (!this.#holds(change, undefined)) return false'
)
T_HIDE_SKIP = 'if (tip.classList.contains(shown)) tip.classList.remove(shown)'
T_RETURN_PLACEMENT = '\t\t\tthis.#placement = undefined\n\t\t\tplacement?.destroy()\n'
T_RETURN_CONNECTION = '\t\t\t\ttip.remove()\n\t\t\t}\n\t\t})\n\t\treturn false'
T_RETURN_LINK = 'this.#revert(change, () => this.#link(tip.id, false, described))'
T_REHIDE_TOKEN = 'if (!marked) return this.#rehide(change, tip, described)'
T_REHIDE_WAIT = 'if (!this.#holds(change, true)) return this.#rehide(change, tip, described)'
T_PRECONDITION = '#rehide(change: object, tip: HTMLElement, described: boolean): false {\n\t\tif (!this.#holds(change, false)) return false'
T_LINK_RETURN_LINE = '\t\tthis.#revert(change, () => this.#link(tip.id, false, described))\n'
T_REOPENED = 'if (!opened && this.#tip === tip && this.shown) void this.#conceal(true)'
T_REVERT = 'if (this.#owns(change)) write()'
T_OBSERVE = "tip.addEventListener('toggle', (event) => this.#dismiss(tip, event), { signal }),"
T_OWNS = 'return !this.#controller.signal.aborted && this.#change === change'


def edit(path, old, new):
    return (path, old, new)


# (row, obligation, mutation label, edits, case, expected verdict)
ROWS = [
    ('B1-dropdown-show-refusal', 'B1', 'the show refuses a menu shown after its show event', [edit(D, D_SHOW_HALTED, 'if (this.#halted(prior, true) || this.shown) return false')], DB1S, 'KILLED'),
    ('B1-dropdown-show-door', 'B1', 'every pre-token show door requires the menu without its token', [edit(D, D_SHOW_EXPECTED, 'const expected = false')], DB1S, 'KILLED'),
    ('B1-dropdown-show-skip', 'B1', 'the show writes its token over the host\'s', [edit(D, D_SHOW_SKIP, 'menu.classList.add(shown)')], DB1S, 'KILLED'),
    ('B1-dropdown-hide-refusal', 'B1', 'the hide refuses a menu hidden after its hide event', [edit(D, D_HIDE_HALTED, 'if (this.#halted(prior, guarded) || !this.shown) return false')], DB1H, 'KILLED'),
    ('B1-dropdown-hide-door', 'B1', 'the pre-token hide door requires the menu with its token', [edit(D, D_HIDE_EXPECTED, 'const expected = true')], DB1H, 'KILLED'),
    ('B1-dropdown-hide-skip', 'B1', 'the hide removes its token over the host\'s', [edit(D, D_HIDE_SKIP, 'menu.classList.remove(shown)')], DB1H, 'KILLED'),
    ('B2-dropdown-show-expected', 'B2', 'the show forgets the end it found after its show event', [edit(D, D_SHOW_EXPECTED, 'const expected = undefined')], DB2S, 'KILLED'),
    ('B2-dropdown-hide-expected', 'B2', 'the hide forgets the end it found after its hide event', [edit(D, D_HIDE_EXPECTED, 'const expected = undefined')], DB2H, 'KILLED'),
    ('B2-dropdown-return-placement', 'B2', 'the show\'s return keeps the placement', [edit(D, D_RETURN_PLACEMENT, '\t\tif (this.#placement === placement) this.#placement = undefined\n')], DB2S, 'KILLED'),
    ('B2-dropdown-return-writes', 'B2', 'the show\'s return writes no host target back', [edit(D, D_REHIDE_BODY, '\t\tif (!this.#owns(change)) return false\n')], DB2S, 'KILLED'),
    ('B2-dropdown-record-aria', 'B2', 'the show records no aria-expanded write', [edit(D, D_RECORD_ARIA, 'let written: readonly HostWrite[] = []')], DB2S, 'KILLED'),
    ('B2-dropdown-record-toggle', 'B2', 'the show records no toggle token write', [edit(D, D_RECORD_TOGGLE, 'written = [...written]')], DB2S, 'KILLED'),
    ('B2-dropdown-reshow', 'B2', 'the hide\'s return writes no host target back', [edit(D, D_RESHOW_BODY, '\t#reshow(change: object, written: readonly HostWrite[]): false {\n')], DB2H, 'KILLED'),
    ('B2-dropdown-record-hide-toggle', 'B2', 'the hide records no toggle token write', [edit(D, D_RECORD_HIDE_TOGGLE, '\t\t\tlet written: readonly HostWrite[] = []\n')], DB2H, 'KILLED'),
    ('B2-dropdown-record-hide-aria', 'B2', 'the hide records no aria-expanded write', [edit(D, D_RECORD_HIDE_ARIA, '\t\t\twritten = [...written]\n')], DB2H, 'KILLED'),
    ('B2-dropdown-identity', 'B2', 'the pre-change read ignores a listener\'s own change', [edit(D, D_IDENTITY, '')], DNEST, 'KILLED'),
    ('B2-dropdown-lifetime', 'B2', 'the returning step writes its targets back without reading its ownership', [edit(D, D_REHIDE_BODY, '\t\trewindHostWrites(written, () => true)\n\t\tif (!this.#owns(change)) return false\n')], DNESTED, 'KILLED'),
    ('B2-dropdown-superseded-placement', 'B2', 'the returning step destroys the placement without reading its ownership', [edit(D, D_REHIDE_BODY, '\t\trewindHostWrites(written, () => this.#owns(change))\n')], DNESTED, 'KILLED'),
    ('B3-dropdown-observe', 'B3', 'the dropdown hears no toggle event', [edit(D, D_OBSERVE, "menu.addEventListener('toggle-unheard', (event) => this.#follow(event), {")], DB3, 'KILLED'),
    ('B3-dropdown-repromote', 'B3', 'a prevented platform hide promotes nothing again', [edit(D, D_REPROMOTE, '\t\tthis.#promoted = placement\n')], DB3P, 'KILLED'),
    ('B3-dropdown-bound', 'B3', 'the second platform close is never forced', [edit(D, D_BOUND, 'if (placement === undefined) {')], DB3P, 'KILLED'),
    ('B1-tooltip-show-connection', 'B1', 'the insertion door requires the tip without its token', [edit(T, T_CONNECTION, T_CONNECTION.replace('undefined', 'false'))], TB1S, 'KILLED'),
    ('B1-tooltip-show-link', 'B1', 'the link door requires the tip without its token', [edit(T, T_LINK, T_LINK.replace('undefined', 'false'))], TB1S, 'KILLED'),
    ('B1-tooltip-show-inserted', 'B1', 'the inserted door requires the tip without its token', [edit(T, T_INSERTED, T_INSERTED.replace('undefined', 'false'))], TB1S, 'KILLED'),
    ('B1-tooltip-show-owned', 'B1', 'the promotion door requires the tip without its token', [edit(T, T_OWNED, 'owned: this.#holds.bind(this, change, false),')], TB1S, 'KILLED'),
    ('B1-tooltip-show-skip', 'B1', 'the show writes its token over the host\'s', [edit(T, T_SHOW_SKIP, 'tip.classList.add(shown)')], TB1S, 'KILLED'),
    ('B1-tooltip-hide-refusal', 'B1', 'the hide refuses a tip hidden after its hide event', [edit(T, T_HIDE_DOOR, T_HIDE_DOOR.replace('change, undefined', 'change, true'))], TB1H, 'KILLED'),
    ('B1-tooltip-hide-skip', 'B1', 'the hide removes its token over the host\'s', [edit(T, T_HIDE_SKIP, 'tip.classList.remove(shown)')], TB1H, 'KILLED'),
    ('B2-tooltip-return-placement', 'B2', 'the show\'s return keeps the placement', [edit(T, T_RETURN_PLACEMENT, '\t\t\tthis.#placement = undefined\n')], TB2, 'KILLED'),
    ('B2-tooltip-return-connection', 'B2', 'the show\'s return keeps the tip in its container', [edit(T, T_RETURN_CONNECTION, '\t\t\t\ttip.isConnected\n\t\t\t}\n\t\t})\n\t\tthis.#revert')], TB2, 'KILLED'),
    ('B2-tooltip-return-link', 'B2', 'the show\'s return keeps the tip named', [edit(T, T_RETURN_LINK, 'this.#revert(change, () => undefined)')], TB2, 'KILLED'),
    ('B2-tooltip-rehide-token', 'B2', 'a show taken over at its token step returns nothing', [edit(T, T_REHIDE_TOKEN, 'if (!marked) return false')], TB2, 'KILLED'),
    ('B2-tooltip-rehide-wait', 'B2', 'a show taken over during its wait returns nothing', [edit(T, T_REHIDE_WAIT, 'if (!this.#holds(change, true)) return false')], TB2, 'KILLED'),
    ('B2-tooltip-precondition', 'B2', 'the returning step runs for a tip other code moved', [edit(T, T_PRECONDITION, T_PRECONDITION.replace('!this.#holds(change, false)', '!this.#owns(change)'))], TMOVED, 'KILLED'),
    ('B2-tooltip-lifetime', 'B2', 'the returning step writes without reading its ownership', [edit(T, T_REVERT, 'write()')], TLIFE3, 'KILLED'),
    ('B3-tooltip-observe', 'B3', 'the tooltip hears no toggle event', [edit(T, T_OBSERVE, "tip.addEventListener('toggle-unheard', (event) => this.#dismiss(tip, event), { signal }),")], TB3, 'KILLED'),
    ('B1-popover-show-inserted', 'B1', 'the inserted door requires the tip without its token', [edit(T, T_INSERTED, T_INSERTED.replace('undefined', 'false'))], PB1, 'KILLED'),
    ('B1-popover-hide-refusal', 'B1', 'the hide refuses a tip hidden after its hide event', [edit(T, T_HIDE_DOOR, T_HIDE_DOOR.replace('change, undefined', 'change, true'))], PB1, 'KILLED'),
    ('B2-popover-return-placement', 'B2', 'the show\'s return keeps the placement', [edit(T, T_RETURN_PLACEMENT, '\t\t\tthis.#placement = undefined\n')], PB2, 'KILLED'),
    ('B3-popover-observe', 'B3', 'the popover hears no toggle event', [edit(T, T_OBSERVE, "tip.addEventListener('toggle-unheard', (event) => this.#dismiss(tip, event), { signal }),")], PB3, 'KILLED'),
    ('P1-dropdown-fixed-aria', 'P1', 'the show records aria-expanded as absent whatever it held', [edit(D, D_RECORD_ARIA, "let written: readonly HostWrite[] = [{ target: expanded, value: undefined, priority: '' }]")], DWB, 'KILLED'),
    ('P1-dropdown-forward', 'P1', 'the show writes its targets back in forward order', [edit(D, D_REHIDE_BODY, '\t\trewindHostWrites([...written].reverse(), () => this.#owns(change))\n\t\tif (!this.#owns(change)) return false\n')], DWB, 'KILLED'),
    ('P1-dropdown-placement-first', 'P1', 'the show destroys its placement before it writes its targets back', [edit(D, D_REHIDE_BODY, '\t\tthis.#placement?.destroy()\n' + D_REHIDE_BODY)], DWB, 'KILLED'),
    ('P1-dropdown-hide-fixed-toggle', 'P1', 'the hide records the toggle token as present whatever it held', [edit(D, D_RECORD_HIDE_TOGGLE, "\t\t\tlet written: readonly HostWrite[] = [{ target: { category: 'token', element: host, name: shown }, value: shown, priority: '' }]\n")], DWB, 'KILLED'),
    ('P2-tooltip-presence', 'P2', 'the return removes an emptied attribute that was present before the call', [edit(T, T_RETURN_LINK, 'this.#revert(change, () => this.#link(tip.id, false))')], TDESC, 'KILLED'),
    ('P2-tooltip-whole', 'P2', 'the return removes the whole attribute', [edit(T, T_RETURN_LINK, "this.#revert(change, () => this.#host.removeAttribute('aria-describedby'))")], TDESC, 'KILLED'),
    ('P1-tooltip-order', 'P1', 'the show removes the tip before it takes its id out', [edit(T, T_LINK_RETURN_LINE, ''), edit(T, T_RETURN_CONNECTION, '\t\t\t\ttip.remove()\n\t\t\t}\n\t\t})\n' + T_LINK_RETURN_LINE + '\t\treturn false')], TORDER, 'KILLED'),
    ('P3-dropdown', 'P3', 'a refused reopening leaves the menu shown', [edit(D, D_REOPENED, 'if (!opened && opened) {')], DREFUSED, 'KILLED'),
    ('P3-tooltip', 'P3', 'a refused reopening leaves the tip shown', [edit(T, T_REOPENED, 'if (!opened && opened) void this.#conceal(true)')], TREFUSED, 'KILLED'),
    ('P3-popover', 'P3', 'a refused reopening leaves the tip shown', [edit(T, T_REOPENED, 'if (!opened && opened) void this.#conceal(true)')], PREFUSED, 'KILLED'),
    ('CONTROL-dropdown', 'control', 'the ownership read in the other order', [edit(D, D_OWNS, 'return this.#change === change && !this.#controller.signal.aborted')], DB2S, 'HELD'),
    ('CONTROL-tooltip', 'control', 'the ownership read in the other order', [edit(T, T_OWNS, 'return this.#change === change && !this.#controller.signal.aborted')], TB2, 'HELD'),
    ('BOOM', 'refusal', "the show's return throwing Error('boom')", [edit(D, D_REHIDE_START, D_REHIDE_START + "\t\tthrow new Error('boom')\n")], DB2S, 'REFUSED'),
    ('UNBOUND', 'refusal', 'the show reading an unbound identifier', [edit(D, D_SHOW_EXPECTED, 'const expected = this.shown ? true : unbound')], DB1S, 'REFUSED'),
]

ASSERTION = re.compile(r'^(AssertionError\b|expected .+)')


def digest(data):
    return hashlib.sha256(data).hexdigest()


def emit(line, sink):
    sys.stdout.buffer.write((line + '\n').encode('utf-8'))
    sys.stdout.flush()
    sink.append(line)


def escape(name):
    return ''.join('\\' + char if char in '\\^$.|?*+()[]{}' else char for char in name)


def first_line(text):
    for line in text.splitlines():
        if line.strip():
            return line.strip()[:200]
    return ''


def read(case, code):
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
        if result.get('fullName') == case
    ]
    if len(found) != 1:
        return f'NOT COLLECTED ({len(found)})', first_line(' '.join(suite_messages)), 'not collected'
    status = found[0]['status']
    message = first_line('\n'.join(found[0].get('failureMessages', [])))
    if suite_messages:
        return status, message, 'suite-level error: ' + first_line(' '.join(suite_messages))
    if status != 'failed':
        if report.get('success') is not True or code != 0:
            return status, '', f'file run not successful: success {report.get("success")}, exit {code}'
        return status, '', None
    if ASSERTION.match(message):
        return status, message, None
    return status, message, 'not an assertion failure'


def run(test, case):
    if REPORT.exists():
        REPORT.unlink()
    result = subprocess.run(
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
    return read(case, result.returncode)


def verdict(status, reason):
    if status == 'passed' and reason is None:
        return 'HELD'
    if status == 'failed' and reason is None:
        return 'KILLED'
    return 'REFUSED'


def main():
    sink = []
    paths = sorted({path for row in ROWS for path, _, _ in row[3]})
    originals = {path: (ROOT / path).read_bytes() for path in paths}
    recorded = {path: digest(data) for path, data in originals.items()}
    for path in paths:
        emit(f'digest {path} {recorded[path]}', sink)
    emit('| Row | Obligation | Mutation | Case | Expected | Status | Verdict | Failure message | Refusal |', sink)
    emit('| --- | --- | --- | --- | --- | --- | --- | --- | --- |', sink)
    misses = 0
    for row, obligation, label, edits, (describe, test, title), expected in ROWS:
        case = f'{describe} {title}'
        texts = {path: originals[path].decode('utf-8') for path, _, _ in edits}
        anchored = True
        for path, old, new in edits:
            count = texts[path].count(old)
            if count != 1:
                anchored = False
                status, message, reason = f'ANCHOR ({count})', '', 'anchor'
                break
            texts[path] = texts[path].replace(old, new)
        try:
            if anchored:
                for path, text in texts.items():
                    (ROOT / path).write_bytes(text.encode('utf-8'))
                status, message, reason = run(test, case)
        finally:
            for path in texts:
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
