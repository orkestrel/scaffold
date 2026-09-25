"""J-SAMEWAY mutation instrument.

Each row mutates one or more exact source spans, runs the one case it names through the real
`src:browser` Vitest project against the whole test file, and reads that case's status from the
JSON report. A kill row passes when its case is collected and fails (KILLED); the control row passes
when its case is collected and passes (HELD). Every source is checked against its recorded SHA-256
digest before any row runs, restored from the bytes read before the row after it runs, and checked
against the recorded digest again at the end, which prints the receipt `restored byte for byte`.

Round 2 (J-INTEGRATION round 5), derived from round 1's mutations.py by r2-instrument.py.

Run from the worktree root: python tmp/j-sameway/mutations-2.py
The log goes to tmp/j-sameway/mutations-2.log.txt as well as to standard output.
"""

import hashlib
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
REPORT = ROOT / 'tmp/j-sameway/mutation-report-2.json'
LOG = ROOT / 'tmp/j-sameway/mutations-2.log.txt'
VITEST = ROOT / 'node_modules/vitest/vitest.mjs'

# SHA-256 of each source a row mutates, recorded on the finished unit before the instrument's run.
RECORDED = {
    'src/browser/Modal.ts': '1349fb047f101cd15a3924ea39b7a9e111240188441d0fa9d3bc258dad28a46a',
    'src/browser/Offcanvas.ts': '7324f92778f597e17afcc6e3dacafce09f3c0f200492475cabb21d3497f70d71',
    'src/browser/Backdrop.ts': 'bab09e6714f79974c47187e4ad7ef9652773112a19a919009ce4efae94775bff',
}

M = 'src/browser/Modal.ts'
O = 'src/browser/Offcanvas.ts'
B = 'src/browser/Backdrop.ts'
MT = 'tests/src/browser/Modal.test.ts'
OT = 'tests/src/browser/Offcanvas.test.ts'
BT = 'tests/src/browser/Backdrop.test.ts'

SHOW_AGREEMENT = 'completes a show whose shown token the host adds first at each door before its token step, skipping that write'
HIDE_AGREEMENT = 'completes a hide whose shown token the host removes first at each door before its token step, skipping that write'
SHOW_REVERSAL = 'returns a show to the hidden state when the host adds its shown token early and removes it at a later door'
HIDE_REVERSAL = 'keeps the shown state of a hide whose shown token the host removes at its hide event and adds back at a later door before its token step'
MODAL_SUPERSEDED = 'writes nothing for a change a listener to its pre-change event supersedes or prevents, and refuses a show on a shown host'
OFFCANVAS_SUPERSEDED = 'writes nothing for a show a listener to its show event supersedes or prevents, and refuses a show on a shown host'
OFFCANVAS_NESTED_HIDE = 'runs one hide and one hidden event when a listener to its hide event hides it again, the inner call resolving true and the outer false'
REENTERED = "writes nothing of a stopped show's returning step after a reaction inside the isolation's release starts a change of its own"
REINSERTED = "writes no backdrop shown token after a hide a reaction inside the returning step's insertion starts"
CLOSING = "dispatches no hidden event and resolves false when a reaction inside the hide's closing destruction of a restored backdrop destroys the modal or adds the shown token back"
CLOSING_PANEL = "dispatches no hidden event and resolves false when a reaction inside the hide's closing destruction of a restored backdrop destroys the panel or adds the shown token back"
OWNED = 'writes no shown token when its owner no longer holds the change after the insertion, and reads the owner only after an insertion'

SHOW_COMPARE = (
    "`shown` token has made this call's token write for it, so every later door requires the token.\n"
    '\t\tif (this.#controller.signal.aborted || this.#change !== prior) return false\n'
)
HIDE_COMPARE = (
    "\t\t// the `shown` token has made this call's token write for it.\n"
    '\t\tif (this.#controller.signal.aborted || this.#change !== prior) return false\n'
)
SHOW_AGREED = 'const expected = this.shown ? true : undefined'
HIDE_AGREED = 'const expected = this.shown ? undefined : false'
SHOW_SKIP = 'if (!this.shown) host.classList.add(shown)'
HIDE_SKIP = 'if (this.shown) host.classList.remove(shown)'
CLOSING_DOOR = (
    '\t\tif (!this.#apply(change, false, () => held?.destroy())) {\n'
    '\t\t\treturn this.#reshow(change, written, undefined)\n'
    '\t\t}\n'
)
OWNER_READ = 'if (owned?.() === false || !this.#holds(change)) return false'
SHOW_UNWRITTEN = 'leaves a backdrop the show did not write where it is when the host takes that show over'
HIDE_UNWRITTEN = 'shows no backdrop the hide did not write when the host takes that hide over'
BACKDROP_WRITE = 'writes only the return to the state the host chose after a reaction to a backdrop write stops the change, and completes a change whose reaction only calls the opposite method'
CLAIM = 'releases its claim and its listeners when an option getter throws after the claim'
OWNER_DESTROYS = 'writes no shown token when its owner read destroys it, resolving false'
SHOWN_BY_CALL = 'if (!held.element.classList.contains(shown)) backdrop = held'
FADED_BY_CALL = 'const backdrop = held?.element.classList.contains(shown) === true ? held : undefined'
RELEASE = '\t\t} catch (error) {\n\t\t\tthis.destroy()\n\t\t\tthrow error\n'
OWNER_PASSED = 'this.#revert(change, () => void backdrop.show(() => this.#owns(change)))'


def pair(path, old, new):
    return (path, old, new)


# (id, obligation, mutation, edits, test file, case full name, expected)
ROWS = [
    ('A1-modal-show', 'A1', 'Modal show doors before the token step require the start state again',
     [pair(M, SHOW_AGREED, 'const agreed = false')], MT, f'Modal {SHOW_AGREEMENT}', 'failed'),
    ('A1-modal-hide', 'A1', 'Modal hide doors before the token step require the start state again',
     [pair(M, HIDE_AGREED, 'const agreed = true')], MT, f'Modal {HIDE_AGREEMENT}', 'failed'),
    ('A1-offcanvas-show', 'A1', 'Offcanvas show doors before the token step require the start state again',
     [pair(O, SHOW_AGREED, 'const agreed = false')], OT, f'Offcanvas {SHOW_AGREEMENT}', 'failed'),
    ('A1-offcanvas-hide', 'A1', 'Offcanvas hide doors before the token step require the start state again',
     [pair(O, HIDE_AGREED, 'const agreed = true')], OT, f'Offcanvas {HIDE_AGREEMENT}', 'failed'),
    ('A1-skip-modal-show', 'A1', 'Modal show writes its token unconditionally (the skip removed)',
     [pair(M, SHOW_SKIP, 'host.classList.add(shown)')], MT, f'Modal {SHOW_AGREEMENT}', 'failed'),
    ('A1-skip-modal-hide', 'A1', 'Modal hide removes its token unconditionally (the skip removed)',
     [pair(M, HIDE_SKIP, 'host.classList.remove(shown)')], MT, f'Modal {HIDE_AGREEMENT}', 'failed'),
    ('A1-skip-offcanvas-show', 'A1', 'Offcanvas show writes its token unconditionally (the skip removed)',
     [pair(O, SHOW_SKIP, 'host.classList.add(shown)')], OT, f'Offcanvas {SHOW_AGREEMENT}', 'failed'),
    ('A1-skip-offcanvas-hide', 'A1', 'Offcanvas hide removes its token unconditionally (the skip removed)',
     [pair(O, HIDE_SKIP, 'host.classList.remove(shown)')], OT, f'Offcanvas {HIDE_AGREEMENT}', 'failed'),
    ('A2-modal-show', 'A2', 'Modal show forgets the end it found after the dispatch (doors read lifetime only)',
     [pair(M, SHOW_AGREED, 'const agreed = undefined')], MT, f'Modal {SHOW_REVERSAL}', 'failed'),
    ('A2-modal-hide', 'A2', 'Modal hide forgets the end it found after the dispatch (doors read lifetime only)',
     [pair(M, HIDE_AGREED, 'const agreed = undefined')], MT, f'Modal {HIDE_REVERSAL}', 'failed'),
    ('A2-offcanvas-show', 'A2', 'Offcanvas show forgets the end it found after the dispatch (doors read lifetime only)',
     [pair(O, SHOW_AGREED, 'const agreed = undefined')], OT, f'Offcanvas {SHOW_REVERSAL}', 'failed'),
    ('A2-offcanvas-hide', 'A2', 'Offcanvas hide forgets the end it found after the dispatch (doors read lifetime only)',
     [pair(O, HIDE_AGREED, 'const agreed = undefined')], OT, f'Offcanvas {HIDE_REVERSAL}', 'failed'),
    ('A3-modal-show', 'A3', 'Modal show drops the pre-dispatch identity comparison',
     [pair(M, SHOW_COMPARE, SHOW_COMPARE.replace(' || this.#change !== prior', ''))], MT, f'Modal {MODAL_SUPERSEDED}', 'failed'),
    ('A3-modal-hide', 'A3', 'Modal hide drops the pre-dispatch identity comparison',
     [pair(M, HIDE_COMPARE, HIDE_COMPARE.replace(' || this.#change !== prior', ''))], MT, f'Modal {MODAL_SUPERSEDED}', 'failed'),
    ('A3-offcanvas-show', 'A3', 'Offcanvas show drops the pre-dispatch identity comparison',
     [pair(O, SHOW_COMPARE, SHOW_COMPARE.replace(' || this.#change !== prior', ''))], OT, f'Offcanvas {OFFCANVAS_SUPERSEDED}', 'failed'),
    ('A3-offcanvas-hide', 'A3', 'Offcanvas hide drops the pre-dispatch identity comparison',
     [pair(O, HIDE_COMPARE, HIDE_COMPARE.replace(' || this.#change !== prior', ''))], OT, f'Offcanvas {OFFCANVAS_NESTED_HIDE}', 'failed'),
    ('A4-modal', 'A4', "Modal's returning step re-reads the identity at each write instead of the call's",
     [pair(M, "\t\t\tthis.#revert(change, () => {\n\t\t\t\tif (name === 'display') host.style.setProperty('display', 'none')",
           "\t\t\tthis.#revert(this.#change, () => {\n\t\t\t\tif (name === 'display') host.style.setProperty('display', 'none')")],
     MT, f'Modal {REENTERED}', 'failed'),
    ('A4-offcanvas', 'A4', "Offcanvas's returning step re-reads the identity at each write instead of the call's",
     [pair(O, "\t\t\tthis.#revert(change, () => {\n\t\t\t\tif (name === 'showing')",
           "\t\t\tthis.#revert(this.#change, () => {\n\t\t\t\tif (name === 'showing')")],
     OT, f'Offcanvas {REENTERED}', 'failed'),
    ('A5-backdrop', 'A5', 'The backdrop show drops its owner read after the insertion',
     [pair(B, OWNER_READ, 'if (!this.#holds(change)) return false')], BT, f'Backdrop {OWNED}', 'failed'),
    ('A5-modal', 'A5', "Modal's returning step shows the backdrop with no owner read",
     [pair(M, OWNER_PASSED, 'this.#revert(change, () => void backdrop.show())')], MT, f'Modal {REINSERTED}', 'failed'),
    ('A5-offcanvas', 'A5', "Offcanvas's returning step shows the backdrop with no owner read",
     [pair(O, OWNER_PASSED, 'this.#revert(change, () => void backdrop.show())')], OT, f'Offcanvas {REINSERTED}', 'failed'),
    ('A5-alternative', 'A5', "The rejected mechanism: the backdrop's hide takes over a call in flight in place of the owner read",
     [
         pair(B, OWNER_READ, 'if (!this.#holds(change)) return false'),
         pair(B, 'return this.#holds(change)\n\t}\n\n\tasync hide()',
              'const held = this.#holds(change)\n\t\tif (held) this.#change = undefined\n\t\treturn held\n\t}\n\n\tasync hide()'),
         pair(B, "if (this.#controller.signal.aborted || !element.classList.contains(shown)) return false",
              "if (this.#controller.signal.aborted || (!element.classList.contains(shown) && this.#change === undefined)) return false"),
         pair(B, '\t\telement.classList.remove(shown)\n',
              '\t\tif (element.classList.contains(shown)) element.classList.remove(shown)\n'),
         pair(B, 'return this.#holds(change)\n\t}\n\n\tdestroy()',
              'const held = this.#holds(change)\n\t\tif (held) this.#change = undefined\n\t\treturn held\n\t}\n\n\tdestroy()'),
     ],
     MT, f'Modal {REINSERTED}', 'failed'),
    ('A6-modal', 'A6', "Modal's closing destruction of the backdrop reads no door",
     [pair(M, CLOSING_DOOR, '\t\theld?.destroy()\n')], MT, f'Modal {CLOSING}', 'failed'),
    ('A6-offcanvas', 'A6', "Offcanvas's closing destruction of the backdrop reads no door",
     [pair(O, CLOSING_DOOR, '\t\theld?.destroy()\n')], OT, f'Offcanvas {CLOSING_PANEL}', 'failed'),
    ('B1-modal-show', 'B1', 'Modal show returns a backdrop it found already shown',
     [pair(M, SHOWN_BY_CALL, 'backdrop = held')], MT, f'Modal {SHOW_UNWRITTEN}', 'failed'),
    ('B1-modal-hide', 'B1', 'Modal hide returns a backdrop it found already hidden',
     [pair(M, FADED_BY_CALL, 'const backdrop = held')], MT, f'Modal {HIDE_UNWRITTEN}', 'failed'),
    ('B1-offcanvas-show', 'B1', 'Offcanvas show returns a backdrop it found already shown',
     [pair(O, SHOWN_BY_CALL, 'backdrop = held')], OT, f'Offcanvas {SHOW_UNWRITTEN}', 'failed'),
    ('B1-offcanvas-hide', 'B1', 'Offcanvas hide returns a backdrop it found already hidden',
     [pair(O, FADED_BY_CALL, 'const backdrop = held')], OT, f'Offcanvas {HIDE_UNWRITTEN}', 'failed'),
    ('B4-equivalent', 'B4', "Offcanvas's forward show passes no owner read (reactions inside the insertion destroy or call the opposite method)",
     [pair(O, 'appearing = held.show(() => this.#owns(change))', 'appearing = held.show()')], OT, f'Offcanvas {BACKDROP_WRITE}', 'passed'),
    ('B5-modal', 'B5', "Modal's constructor rethrows a getter's error without destroying itself",
     [pair(M, RELEASE, '\t\t} catch (error) {\n\t\t\tthrow error\n')], MT, f'Modal {CLAIM}', 'failed'),
    ('B5-offcanvas', 'B5', "Offcanvas's constructor rethrows a getter's error without destroying itself",
     [pair(O, RELEASE, '\t\t} catch (error) {\n\t\t\tthrow error\n')], OT, f'Offcanvas {CLAIM}', 'failed'),
    ('R2-owner-lifetime', 'A5', "The backdrop show reads its own lifetime before the owner's function instead of after it",
     [pair(B, OWNER_READ, 'if (!this.#holds(change) || owned?.() === false) return false')], BT, f'Backdrop {OWNER_DESTROYS}', 'failed'),
    ('CONTROL', 'control', "Modal's ownership read tests the identity before the lifetime (operands swapped)",
     [pair(M, 'return !this.#controller.signal.aborted && this.#change === change',
           'return this.#change === change && !this.#controller.signal.aborted')],
     MT, f'Modal {REENTERED}', 'passed'),
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
            LOG.write_bytes(('\n'.join(sink) + '\n').encode('utf-8'))
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
    LOG.write_bytes(('\n'.join(sink) + '\n').encode('utf-8'))
    sys.exit(0 if restored and failures == 0 else 1)


if __name__ == '__main__':
    main()
