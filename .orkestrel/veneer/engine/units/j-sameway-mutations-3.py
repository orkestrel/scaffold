"""J-SAMEWAY mutation instrument, round 3 (J-INTEGRATION round 6).

Each row mutates one or more exact source spans, runs the one case it names through the real
`src:browser` Vitest project against the whole test file, and reads that case's status and failure
messages from the JSON report.

The refusal rule: a failing case whose failure message names a `ReferenceError`, a `SyntaxError`, an
identifier that `is not defined`, a binding read `before initialization`, or a failed transform is a
broken plant, not a kill, and reads REFUSED. A kill row passes when its case is collected and fails
for any other cause (KILLED). A hold row passes when its case is collected and passes (HELD). The
demonstration row plants an unbound identifier and passes only when the rule refuses it.

Every source is checked against its recorded SHA-256 digest before any row runs, restored from the
bytes read before the row after it runs, and checked against the recorded digest again at the end,
which prints the receipt `restored byte for byte`.

Run from the worktree root: python tmp/j-sameway/mutations-3.py
The log goes to tmp/j-sameway/mutations-3.log.txt as well as to standard output.
"""

import hashlib
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
REPORT = ROOT / 'tmp/j-sameway/mutation-report-3.json'
LOG = ROOT / 'tmp/j-sameway/mutations-3.log.txt'
VITEST = ROOT / 'node_modules/vitest/vitest.mjs'

# SHA-256 of each source a row mutates, recorded on the finished unit before the instrument's run.
RECORDED = {
    'src/browser/Modal.ts': '9883f24d19e8f8fda1e194fac88949de056ac7b0658f17ad0a28dce78eeebdc8',
    'src/browser/Offcanvas.ts': 'c5deae69adf09ca83b5ea934c2db7eea62a1b59465fc92980ff11d38cfae5847',
    'src/browser/Backdrop.ts': 'bab09e6714f79974c47187e4ad7ef9652773112a19a919009ce4efae94775bff',
}

BROKEN = re.compile(
    r'ReferenceError|SyntaxError|is not defined|before initialization|Transform failed'
)

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
CLOSING_MODAL = "dispatches no hidden event and resolves false when a reaction inside the hide's closing destruction of a restored backdrop destroys the modal or adds the shown token back"
CLOSING_PANEL = "dispatches no hidden event and resolves false when a reaction inside the hide's closing destruction of a restored backdrop destroys the panel or adds the shown token back"
OWNED = 'writes no shown token when its owner no longer holds the change after the insertion, and reads the owner only after an insertion'
OWNER_DESTROYS = 'writes no shown token when its owner read destroys it, resolving false'
SHOW_UNWRITTEN = 'leaves a backdrop the show did not write where it is when the host takes that show over'
HIDE_UNWRITTEN = 'shows no backdrop the hide did not write when the host takes that hide over'
BACKDROP_WRITE = 'writes only the return to the state the host chose after a reaction to a backdrop write stops the change, and completes a change whose reaction only calls the opposite method'
CLAIM = 'releases its claim and its listeners when an option getter throws after the claim'
MODAL_RETURNED_SHOWN = 'returns the host and its backdrop to the shown state when the host takes a hide over at each door after the shown token leaves'
MODAL_RETURNED_HIDDEN = 'returns the host to the hidden state and removes the backdrop when the host drops the shown token at each door after the show writes it'
PANEL_RETURNED_SHOWN = 'returns the panel and its backdrop to the shown state when the host takes a hide over at each door after the shown token leaves'
PANEL_RETURNED_HIDDEN = 'returns the panel to the hidden state and removes the backdrop when the host drops the shown token at each door after the show writes it'
CONNECTION_RETURNED = 'puts back a backdrop the hide removed, adding no token it never removed, when the host takes that hide over'
TOKEN_RETURNED = 'removes only the backdrop token the show added when the host takes that show over'

SHOW_EXPECTED = 'const expected = this.shown ? true : undefined'
HIDE_EXPECTED = 'const expected = this.shown ? undefined : false'
SHOW_SKIP = 'if (!this.shown) host.classList.add(shown)'
HIDE_SKIP = 'if (this.shown) host.classList.remove(shown)'
SHOW_COMPARE = (
    "`shown` token has made this call's token write for it, so every later door requires the token.\n"
    '\t\tif (this.#controller.signal.aborted || this.#change !== prior) return false\n'
)
HIDE_COMPARE = (
    "\t\t// the `shown` token has made this call's token write for it.\n"
    '\t\tif (this.#controller.signal.aborted || this.#change !== prior) return false\n'
)
CLOSING_DOOR = (
    '\t\tif (!this.#apply(change, false, () => held?.destroy())) {\n'
    '\t\t\treturn this.#reshow(change, written, null)\n'
    '\t\t}\n'
)
OWNER_READ = 'if (owned?.() === false || !this.#holds(change)) return false'
RELEASE = '\t\t} catch (error) {\n\t\t\tthis.destroy()\n\t\t\tthrow error\n'
SHOWN_RECORDED = 'if (!held.element.classList.contains(shown)) {'
CONNECTION_RECORDED = "shade = held.element.isConnected ? ['token'] : ['connection', 'token']"
FADED_RECORDED = "held?.element.classList.contains(shown) === true ? ['token'] : []"
REMOVED_RECORDED = "...(place === null ? [] : ['connection' as const])"
CONNECTION_RETURN_HIDE = "if (name === 'connection') place?.append(backdrop.element)"
TOKEN_RETURN_HIDE = "if (name === 'token') void backdrop.show(() => this.#owns(change))"
TOKEN_RETURN_SHOW = "if (name === 'token') void backdrop.hide()"
CONNECTION_RETURN_SHOW = "\t\t\t\tif (name === 'connection') {\n\t\t\t\t\tthis.#backdrop = undefined\n"


def pair(path, old, new):
    return (path, old, new)


def drop(path, line):
    """Removes one returning-step entry's write, leaving the statement a no-op."""
    return pair(path, line, 'if (name === undefined) return')


# (id, obligation, mutation, edits, test file, case full name, expected)
ROWS = [
    ('A1-modal-show', 'A1', 'Modal show doors before the token step require the start state again',
     [pair(M, SHOW_EXPECTED, 'const expected = false')], MT, f'Modal {SHOW_AGREEMENT}', 'failed'),
    ('A1-modal-hide', 'A1', 'Modal hide doors before the token step require the start state again',
     [pair(M, HIDE_EXPECTED, 'const expected = true')], MT, f'Modal {HIDE_AGREEMENT}', 'failed'),
    ('A1-offcanvas-show', 'A1', 'Offcanvas show doors before the token step require the start state again',
     [pair(O, SHOW_EXPECTED, 'const expected = false')], OT, f'Offcanvas {SHOW_AGREEMENT}', 'failed'),
    ('A1-offcanvas-hide', 'A1', 'Offcanvas hide doors before the token step require the start state again',
     [pair(O, HIDE_EXPECTED, 'const expected = true')], OT, f'Offcanvas {HIDE_AGREEMENT}', 'failed'),
    ('A1-skip-modal-show', 'A1', 'Modal show writes its token unconditionally (the skip removed)',
     [pair(M, SHOW_SKIP, 'host.classList.add(shown)')], MT, f'Modal {SHOW_AGREEMENT}', 'failed'),
    ('A1-skip-modal-hide', 'A1', 'Modal hide removes its token unconditionally (the skip removed)',
     [pair(M, HIDE_SKIP, 'host.classList.remove(shown)')], MT, f'Modal {HIDE_AGREEMENT}', 'failed'),
    ('A1-skip-offcanvas-show', 'A1', 'Offcanvas show writes its token unconditionally (the skip removed)',
     [pair(O, SHOW_SKIP, 'host.classList.add(shown)')], OT, f'Offcanvas {SHOW_AGREEMENT}', 'failed'),
    ('A1-skip-offcanvas-hide', 'A1', 'Offcanvas hide removes its token unconditionally (the skip removed)',
     [pair(O, HIDE_SKIP, 'host.classList.remove(shown)')], OT, f'Offcanvas {HIDE_AGREEMENT}', 'failed'),
    ('A2-modal-show', 'A2', 'Modal show forgets the end it found after the dispatch (doors read lifetime only)',
     [pair(M, SHOW_EXPECTED, 'const expected = undefined')], MT, f'Modal {SHOW_REVERSAL}', 'failed'),
    ('A2-modal-hide', 'A2', 'Modal hide forgets the end it found after the dispatch (doors read lifetime only)',
     [pair(M, HIDE_EXPECTED, 'const expected = undefined')], MT, f'Modal {HIDE_REVERSAL}', 'failed'),
    ('A2-offcanvas-show', 'A2', 'Offcanvas show forgets the end it found after the dispatch (doors read lifetime only)',
     [pair(O, SHOW_EXPECTED, 'const expected = undefined')], OT, f'Offcanvas {SHOW_REVERSAL}', 'failed'),
    ('A2-offcanvas-hide', 'A2', 'Offcanvas hide forgets the end it found after the dispatch (doors read lifetime only)',
     [pair(O, HIDE_EXPECTED, 'const expected = undefined')], OT, f'Offcanvas {HIDE_REVERSAL}', 'failed'),
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
    ('A5-owner-lifetime', 'A5', "The backdrop show reads its own lifetime before the owner's function instead of after it",
     [pair(B, OWNER_READ, 'if (!this.#holds(change) || owned?.() === false) return false')], BT, f'Backdrop {OWNER_DESTROYS}', 'failed'),
    ('A5-modal', 'A5', "Modal's returning step puts the backdrop back through a show with no owner read",
     [pair(M, CONNECTION_RETURN_HIDE, "if (name === 'connection') void backdrop.show()")], MT, f'Modal {REINSERTED}', 'failed'),
    ('A5-offcanvas', 'A5', "Offcanvas's returning step puts the backdrop back through a show with no owner read",
     [pair(O, CONNECTION_RETURN_HIDE, "if (name === 'connection') void backdrop.show()")], OT, f'Offcanvas {REINSERTED}', 'failed'),
    ('A5-alternative', 'A5', "The rejected mechanism: the backdrop's hide takes over a call in flight in place of the owner read, and the returning step reinserts through that show",
     [
         pair(M, CONNECTION_RETURN_HIDE, "if (name === 'connection') void backdrop.show()"),
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
     [pair(M, CLOSING_DOOR, '\t\theld?.destroy()\n')], MT, f'Modal {CLOSING_MODAL}', 'failed'),
    ('A6-offcanvas', 'A6', "Offcanvas's closing destruction of the backdrop reads no door",
     [pair(O, CLOSING_DOOR, '\t\theld?.destroy()\n')], OT, f'Offcanvas {CLOSING_PANEL}', 'failed'),
    ('B4-equivalent', 'B4', "Offcanvas's forward show passes no owner read (reactions inside the insertion destroy or call the opposite method)",
     [pair(O, 'appearing = held.show(() => this.#owns(change))', 'appearing = held.show()')], OT, f'Offcanvas {BACKDROP_WRITE}', 'passed'),
    ('B5-modal', 'B5', "Modal's constructor rethrows a getter's error without destroying itself",
     [pair(M, RELEASE, '\t\t} catch (error) {\n\t\t\tthrow error\n')], MT, f'Modal {CLAIM}', 'failed'),
    ('B5-offcanvas', 'B5', "Offcanvas's constructor rethrows a getter's error without destroying itself",
     [pair(O, RELEASE, '\t\t} catch (error) {\n\t\t\tthrow error\n')], OT, f'Offcanvas {CLAIM}', 'failed'),
    # D1: each entry kind, its recording and its return.
    ('D1-rec-modal-show-token', 'D1', 'Modal show records a token entry for a backdrop it found shown',
     [pair(M, SHOWN_RECORDED, '{')], MT, f'Modal {SHOW_UNWRITTEN}', 'failed'),
    ('D1-rec-offcanvas-show-token', 'D1', 'Offcanvas show records a token entry for a backdrop it found shown',
     [pair(O, SHOWN_RECORDED, '{')], OT, f'Offcanvas {SHOW_UNWRITTEN}', 'failed'),
    ('D1-rec-modal-show-connection', 'D1', 'Modal show records no connection entry for a backdrop it inserted',
     [pair(M, CONNECTION_RECORDED, "shade = ['token']")], MT, f'Modal {MODAL_RETURNED_HIDDEN}', 'failed'),
    ('D1-rec-offcanvas-show-connection', 'D1', 'Offcanvas show records no connection entry for a backdrop it inserted',
     [pair(O, CONNECTION_RECORDED, "shade = ['token']")], OT, f'Offcanvas {PANEL_RETURNED_HIDDEN}', 'failed'),
    ('D1-rec-modal-hide-token', 'D1', 'Modal hide records a token entry for a backdrop it found hidden',
     [pair(M, FADED_RECORDED, "['token']")], MT, f'Modal {HIDE_UNWRITTEN}', 'failed'),
    ('D1-rec-offcanvas-hide-token', 'D1', 'Offcanvas hide records a token entry for a backdrop it found hidden',
     [pair(O, FADED_RECORDED, "['token']")], OT, f'Offcanvas {HIDE_UNWRITTEN}', 'failed'),
    ('D1-rec-modal-hide-connection', 'D1', 'Modal hide records no connection entry for a backdrop it removed',
     [pair(M, REMOVED_RECORDED, '...[]')], MT, f'Modal {CONNECTION_RETURNED}', 'failed'),
    ('D1-rec-offcanvas-hide-connection', 'D1', 'Offcanvas hide records no connection entry for a backdrop it removed',
     [pair(O, REMOVED_RECORDED, '...[]')], OT, f'Offcanvas {CONNECTION_RETURNED}', 'failed'),
    ('D1-ret-modal-show-connection', 'D1', "Modal's returning show step leaves in the page a backdrop the show inserted",
     [pair(M, CONNECTION_RETURN_SHOW, "\t\t\t\tif (name === undefined) {\n\t\t\t\t\tthis.#backdrop = undefined\n")], MT, f'Modal {MODAL_RETURNED_HIDDEN}', 'failed'),
    ('D1-ret-offcanvas-show-connection', 'D1', "Offcanvas's returning show step leaves in the page a backdrop the show inserted",
     [pair(O, CONNECTION_RETURN_SHOW, "\t\t\t\tif (name === undefined) {\n\t\t\t\t\tthis.#backdrop = undefined\n")], OT, f'Offcanvas {PANEL_RETURNED_HIDDEN}', 'failed'),
    ('D1-ret-modal-show-token', 'D1', "Modal's returning show step leaves a backdrop token the show added",
     [drop(M, TOKEN_RETURN_SHOW)], MT, f'Modal {TOKEN_RETURNED}', 'failed'),
    ('D1-ret-offcanvas-show-token', 'D1', "Offcanvas's returning show step leaves a backdrop token the show added",
     [drop(O, TOKEN_RETURN_SHOW)], OT, f'Offcanvas {TOKEN_RETURNED}', 'failed'),
    ('D1-ret-modal-hide-connection', 'D1', "Modal's returning hide step leaves out of the page a backdrop the hide removed",
     [drop(M, CONNECTION_RETURN_HIDE)], MT, f'Modal {CONNECTION_RETURNED}', 'failed'),
    ('D1-ret-offcanvas-hide-connection', 'D1', "Offcanvas's returning hide step leaves out of the page a backdrop the hide removed",
     [drop(O, CONNECTION_RETURN_HIDE)], OT, f'Offcanvas {CONNECTION_RETURNED}', 'failed'),
    ('D1-ret-modal-hide-token', 'D1', "Modal's returning hide step leaves off a backdrop token the hide removed",
     [drop(M, TOKEN_RETURN_HIDE)], MT, f'Modal {MODAL_RETURNED_SHOWN}', 'failed'),
    ('D1-ret-offcanvas-hide-token', 'D1', "Offcanvas's returning hide step leaves off a backdrop token the hide removed",
     [drop(O, TOKEN_RETURN_HIDE)], OT, f'Offcanvas {PANEL_RETURNED_SHOWN}', 'failed'),
    ('D1-ret-modal-show-display', 'D1', "Modal's returning show step leaves the display the show wrote",
     [drop(M, "if (name === 'display') host.style.setProperty('display', 'none')")], MT, f'Modal {MODAL_RETURNED_HIDDEN}', 'failed'),
    ('D1-ret-modal-show-aria-hidden', 'D1', "Modal's returning show step leaves the aria-hidden removal the show made",
     [drop(M, "if (name === 'aria-hidden') host.setAttribute('aria-hidden', 'true')")], MT, f'Modal {MODAL_RETURNED_HIDDEN}', 'failed'),
    ('D1-ret-modal-show-aria-modal', 'D1', "Modal's returning show step leaves the aria-modal the show wrote",
     [drop(M, "if (name === 'aria-modal') host.removeAttribute('aria-modal')")], MT, f'Modal {MODAL_RETURNED_HIDDEN}', 'failed'),
    ('D1-ret-modal-show-role', 'D1', "Modal's returning show step leaves the role the show wrote",
     [drop(M, "if (name === 'role') host.removeAttribute('role')")], MT, f'Modal {MODAL_RETURNED_HIDDEN}', 'failed'),
    ('D1-ret-modal-hide-display', 'D1', "Modal's returning hide step leaves the display the hide wrote",
     [drop(M, "if (name === 'display') host.style.setProperty('display', 'block')")], MT, f'Modal {MODAL_RETURNED_SHOWN}', 'failed'),
    ('D1-ret-modal-hide-aria-hidden', 'D1', "Modal's returning hide step leaves the aria-hidden the hide wrote",
     [drop(M, "if (name === 'aria-hidden') host.removeAttribute('aria-hidden')")], MT, f'Modal {MODAL_RETURNED_SHOWN}', 'failed'),
    ('D1-ret-modal-hide-aria-modal', 'D1', "Modal's returning hide step leaves the aria-modal removal the hide made",
     [drop(M, "if (name === 'aria-modal') host.setAttribute('aria-modal', 'true')")], MT, f'Modal {MODAL_RETURNED_SHOWN}', 'failed'),
    ('D1-ret-modal-hide-role', 'D1', "Modal's returning hide step leaves the role removal the hide made",
     [drop(M, "if (name === 'role') host.setAttribute('role', 'dialog')")], MT, f'Modal {MODAL_RETURNED_SHOWN}', 'failed'),
    ('D1-ret-offcanvas-show-showing', 'D1', "Offcanvas's returning show step leaves the showing token the show wrote",
     [drop(O, "if (name === 'showing') host.classList.remove(this.#classes.showing)")], OT, f'Offcanvas {PANEL_RETURNED_HIDDEN}', 'failed'),
    ('D1-ret-offcanvas-show-aria-modal', 'D1', "Offcanvas's returning show step leaves the aria-modal the show wrote",
     [drop(O, "if (name === 'aria-modal') host.removeAttribute('aria-modal')")], OT, f'Offcanvas {PANEL_RETURNED_HIDDEN}', 'failed'),
    ('D1-ret-offcanvas-show-role', 'D1', "Offcanvas's returning show step leaves the role the show wrote",
     [drop(O, "if (name === 'role') host.removeAttribute('role')")], OT, f'Offcanvas {PANEL_RETURNED_HIDDEN}', 'failed'),
    ('D1-ret-offcanvas-hide-hiding', 'D1', "Offcanvas's returning hide step leaves the hiding token the hide wrote",
     [drop(O, "if (name === 'hiding') host.classList.remove(this.#classes.hiding)")], OT, f'Offcanvas {PANEL_RETURNED_SHOWN}', 'failed'),
    ('D1-ret-offcanvas-hide-aria-modal', 'D1', "Offcanvas's returning hide step leaves the aria-modal removal the hide made",
     [drop(O, "if (name === 'aria-modal') host.setAttribute('aria-modal', 'true')")], OT, f'Offcanvas {PANEL_RETURNED_SHOWN}', 'failed'),
    ('D1-ret-offcanvas-hide-role', 'D1', "Offcanvas's returning hide step leaves the role removal the hide made",
     [drop(O, "if (name === 'role') host.setAttribute('role', 'dialog')")], OT, f'Offcanvas {PANEL_RETURNED_SHOWN}', 'failed'),
    ('D2-planted-unbound', 'D2', "Round 2's broken A1 plant: the expected end declared under another name, leaving `expected` unbound",
     [pair(M, SHOW_EXPECTED, 'const agreed = false')], MT, f'Modal {SHOW_AGREEMENT}', 'refused'),
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


def read(case):
    """Returns the case's status, refined to REFUSED for a broken plant, and its first failure line."""
    report = json.loads(REPORT.read_text(encoding='utf-8'))
    found = [
        result
        for suite in report.get('testResults', [])
        for result in suite.get('assertionResults', [])
        if result.get('fullName') == case
    ]
    if len(found) != 1:
        causes = [suite.get('message', '') for suite in report.get('testResults', [])]
        cause = next((line for text in causes for line in text.splitlines() if line.strip()), '')
        return f'NOT COLLECTED ({len(found)})', cause[:120]
    result = found[0]
    messages = result.get('failureMessages', [])
    first = next((line.strip() for text in messages for line in text.splitlines() if line.strip()), '')
    if result['status'] == 'failed' and any(BROKEN.search(text) for text in messages):
        return 'REFUSED', first[:120]
    return result['status'], first[:120]


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
    return read(case) if REPORT.exists() else ('NO REPORT', '')


def judge(expected, reading):
    if expected == 'failed' and reading == 'failed':
        return 'KILLED'
    if expected == 'passed' and reading == 'passed':
        return 'HELD'
    if expected == 'refused' and reading == 'REFUSED':
        return 'REFUSED AS PLANTED'
    return 'MISSED'


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
    emit('| Row | Obligation | Mutation | Case | Expected | Reading | Cause | Verdict |', sink)
    emit('| --- | --- | --- | --- | --- | --- | --- | --- |', sink)
    failures = 0
    for row, obligation, mutation, edits, test, case, expected in ROWS:
        cause = ''
        try:
            texts = {path: originals[path].decode('utf-8') for path, _, _ in edits}
            for path, old, new in edits:
                count = texts[path].count(old)
                if count != 1:
                    raise ValueError(f'{path}: anchor found {count} times')
                texts[path] = texts[path].replace(old, new)
            for path, text in texts.items():
                (ROOT / path).write_bytes(text.encode('utf-8'))
            reading, cause = run(test, case)
        except ValueError as error:
            reading = f'ANCHOR ({error})'
        finally:
            for path in {path for path, _, _ in edits}:
                (ROOT / path).write_bytes(originals[path])
        verdict = judge(expected, reading)
        if verdict == 'MISSED':
            failures += 1
        cause = cause.replace('|', '/')
        emit(f'| {row} | {obligation} | {mutation} | {test} > {case} | {expected} | {reading} | {cause} | {verdict} |', sink)
    restored = all(digest((ROOT / path).read_bytes()) == recorded for path, recorded in RECORDED.items())
    emit('restored byte for byte' if restored else 'RESTORE FAILED', sink)
    emit(f'rows {len(ROWS)}, missed {failures}', sink)
    LOG.write_bytes(('\n'.join(sink) + '\n').encode('utf-8'))
    sys.exit(0 if restored and failures == 0 else 1)


if __name__ == '__main__':
    main()
