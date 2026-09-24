# J-MODAL mutation instrument, round 2: a copy of mutations.py whose first run left four rows missed
# (its log is mutations-1.log.txt). The open-token row names the reference-count case and a row for
# the never-released token names the empty-class case; the focus rows follow the guards the first run
# showed unobservable and the code no longer carries; the refused-show row drops the abort; the
# destroyed-delegate row is new. Otherwise, after the J-COLLAPSE round-3 instrument: applies each named mutation to
# an owned source file, runs the WHOLE test file it names (no -t), reads Vitest's JSON report, and
# records every failing case, then writes the original bytes back and checks every owned source's
# digest against the digest taken before the run, writing that receipt into the log.
import hashlib, json, pathlib, re, subprocess, sys

ROOT = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/modal')
REPORT = ROOT / 'tmp/j-modal/mutation-report-2.json'
LOG = ROOT / 'tmp/j-modal/mutations-2.log.txt'
VITEST = [
    'node', 'node_modules/vitest/vitest.mjs', 'run', '--config', 'vite.config.ts', '--no-cache',
    '--project', 'src:browser', '--reporter=json', f'--outputFile={REPORT}',
]
M = 'src/browser/Modal.ts'
B = 'src/browser/Backdrop.ts'
S = 'src/browser/ScrollLock.ts'
I = 'src/browser/Isolation.ts'
D = 'src/browser/Delegate.ts'
V = 'src/browser/validators.ts'
P = 'src/browser/parsers.ts'
K = 'src/browser/constants.ts'
X = 'src/browser/index.ts'
MT = 'tests/src/browser/Modal.test.ts'
BT = 'tests/src/browser/Backdrop.test.ts'
ST = 'tests/src/browser/ScrollLock.test.ts'
IT = 'tests/src/browser/Isolation.test.ts'
DT = 'tests/src/browser/Delegate.test.ts'
VT = 'tests/src/browser/validators.test.ts'
PT = 'tests/src/browser/parsers.test.ts'
XT = 'tests/src/browser/index.test.ts'
OWNED = [M, B, S, I, D, V, P, K, X]

SHOW_SETTLE = ('\t\t\tawait settleAnimations(this.#dialog ?? host, this.#controller.signal)\n'
               '\t\t\tif (!this.#holds(change, true)) return false\n')
HIDE_SETTLE = ('\t\t\tawait settleAnimations(host, this.#controller.signal)\n'
               '\t\t\tif (!this.#holds(change, false)) return false\n')
DESTROY = ('\tdestroy(): void {\n\t\tif (this.#controller.signal.aborted) return\n'
           '\t\tthis.#controller.abort()\n\t\tthis.#change = undefined\n')
MODAL_PREVENT = ('\t\t\tevent.preventDefault()\n\t\t}\n\t\tconst host = this.#readModal(target)\n')

MUTATIONS = [
    # Tables, guard, parser, barrel
    ('a modal default table is left unfrozen', MT, 'publishes frozen default tables',
     [(K, 'export const MODAL_CLASSES: ModalClassMap = Object.freeze({', 'export const MODAL_CLASSES: ModalClassMap = ({')]),
    ('the modal defaults leave the dismissal unfrozen', MT, 'publishes frozen default tables',
     [(K, 'dismiss: Object.freeze({ backdrop: true, escape: true }),', 'dismiss: { backdrop: true, escape: true },')]),
    ('the modal event guard admits a missing detail', VT, 'requires a custom event whose detail object',
     [(V, "if (typeof detail !== 'object' || detail === null) return false", "if (typeof detail !== 'object' || detail === null) return true")]),
    ('the modal event guard admits any related target', VT, 'requires a custom event whose detail object',
     [(V, 'return detail.relatedTarget === undefined || isInstance(detail.relatedTarget, HTMLElement)', 'return true')]),
    ('the modal event guard reads uncontained', VT, 'relatedTarget accessor throws',
     [(V, 'return detail.relatedTarget === undefined || isInstance(detail.relatedTarget, HTMLElement)\n\t} catch {\n\t\treturn false\n\t}',
       'return detail.relatedTarget === undefined || isInstance(detail.relatedTarget, HTMLElement)\n\t} catch (error) {\n\t\tthrow error\n\t}')]),
    ('the backdrop parser reads static as true', PT, 'reads static as itself',
     [(P, "return value === 'static' ? value : parseBoolean(value)", "return value === 'static' ? true : parseBoolean(value)")]),
    ('the backdrop parser folds case and space', PT, 'returns undefined for every other value',
     [(P, "return value === 'static' ? value : parseBoolean(value)",
       "return typeof value === 'string' && value.trim().toLowerCase() === 'static' ? 'static' : parseBoolean(value)")]),
    ('the barrel omits the modal family', XT, 'exports the browser surface',
     [(X, "export * from './Modal.js'\n", ''), (X, "export * from './Isolation.js'\n", '')]),
    # Modal lifecycle
    ('the scroll lock is not taken', MT, 'shows over the backdrop and hides',
     [(M, '\t\tthis.#lock ??= new ScrollLock({ document })\n', '')]),
    ('the open token is not written', MT, 'shows over the backdrop and hides',
     [(M, '\t\tthis.#open(document)\n', '')]),
    ('no backdrop is shown', MT, 'shows over the backdrop and hides',
     [(M, '\t\tif (this.#options.backdrop) {\n\t\t\tthis.#backdrop ??=', '\t\tif (this.#options.backdrop === undefined) {\n\t\t\tthis.#backdrop ??=')]),
    ('the host is not isolated', MT, 'shows over the backdrop and hides',
     [(M, '\t\t\tthis.#isolation ??= new Isolation(host, trigger === undefined ? {} : { trigger })\n', '')]),
    ('focus does not move into the host', MT, 'shows over the backdrop and hides',
     [(M, '\t\t\tif (!this.#apply(change, true, () => host.focus())) return false\n', '')]),
    ('the modal attributes are not written', MT, 'shows over the backdrop and hides',
     [(M, "\t\tif (!this.#apply(change, false, () => host.setAttribute('aria-modal', 'true'))) return false\n", '')]),
    ('the backdrop fade is not awaited', MT, 'displays the host after the backdrop fades in',
     [(M, '\t\t\tawait this.#backdrop.show()\n', '\t\t\tvoid this.#backdrop.show()\n')]),
    ('the show waits on the host rather than the dialog', MT, 'displays the host after the backdrop fades in',
     [(M, 'await settleAnimations(this.#dialog ?? host, this.#controller.signal)\n\t\t\tif (!this.#holds(change, true))',
       'await settleAnimations(host, this.#controller.signal)\n\t\t\tif (!this.#holds(change, true))')]),
    ('the hide does not wait for the host fade', MT, 'hides the host after its own fade settles',
     [(M, HIDE_SETTLE, '')]),
    ('a detached host is not appended', MT, 'appends a detached host to the body',
     [(M, '() => document.body.append(host)', '() => undefined')]),
    ('the scroll positions are not reset', MT, 'appends a detached host to the body',
     [(M, '\t\thost.scrollTop = 0\n', ''), (M, '\t\tif (body !== null && body !== undefined) body.scrollTop = 0\n', '')]),
    ('the pre-change event return value is ignored', MT, 'untouched when a listener prevents',
     [(M, 'if (!emitEvent(this.#host, MODAL_EVENTS.show, { relatedTarget: trigger }, true)) return false',
       'emitEvent(this.#host, MODAL_EVENTS.show, { relatedTarget: trigger }, true)'),
      (M, 'if (!emitEvent(this.#host, MODAL_EVENTS.hide, { relatedTarget: undefined }, true)) {\n\t\t\treturn false\n\t\t}',
       'emitEvent(this.#host, MODAL_EVENTS.hide, { relatedTarget: undefined }, true)')]),
    ('the in-flight guard is dropped', MT, 'resolves false for a call while a change is in flight',
     [(M, 'this.#controller.signal.aborted || this.#change !== undefined || this.shown === shown',
       'this.#controller.signal.aborted || this.shown === shown')]),
    ('a completed event is cancelable', MT, 'dispatches bubbling events carrying the trigger',
     [(M, 'emitEvent(host, MODAL_EVENTS.shown, { relatedTarget: trigger }, false)', 'emitEvent(host, MODAL_EVENTS.shown, { relatedTarget: trigger }, true)')]),
    ('the hooks bind every custom event', MT, 'dispatches bubbling events carrying the trigger',
     [(V, "if (typeof detail !== 'object' || detail === null) return false", "if (typeof detail !== 'object' || detail === null) return true"),
      (V, 'return detail.relatedTarget === undefined || isInstance(detail.relatedTarget, HTMLElement)', 'return true')]),
    # Dismissal
    ('Escape ignores the escape option', MT, 'hides on a trusted Escape',
     [(M, '\t\tif (this.#options.dismiss.escape) void this.hide()', '\t\tif (event.key.length > 0) void this.hide()')]),
    ('the bounce keeps the static token', MT, 'hides on a trusted Escape',
     [(M, '\t\thost.classList.remove(token)\n', '')]),
    ('the press check ignores where the press started', MT, 'hides on a trusted press beside the dialog',
     [(M, 'if (press.target !== this.#host || click.target !== this.#host) return', 'if (click.target !== this.#host) return')]),
    ('backdrop dismissal ignores its option', MT, 'hides on a trusted press beside the dialog',
     [(M, '\t\tif (this.#options.dismiss.backdrop) void this.hide()', '\t\tif (press.isTrusted || !press.isTrusted) void this.hide()')]),
    ('a press without a backdrop dismisses', MT, 'hides on a trusted press beside the dialog',
     [(M, '\t\tif (!this.#options.backdrop) return\n', '')]),
    # Focus
    ('the focus option is ignored', MT, 'leaves focus and the page alone when focus is false',
     [(M, '\t\tif (this.#options.focus) {', '\t\tif (this.#options.focus !== undefined) {')]),
    # Options
    ('the static reading does not reach the dismissal', MT, 'constructor winning path by path',
     [(M, "(read.backdrop === 'static' ? false : MODAL_DEFAULTS.dismiss.backdrop)", '(MODAL_DEFAULTS.dismiss.backdrop)')]),
    ('the constructor backdrop overrides the attribute whole', MT, 'unless the constructor supplies every path it feeds',
     [(M, '...(backdrop === undefined || light === undefined ? {} : { backdrop })', '...(backdrop === undefined ? {} : { backdrop })')]),
    ('the focus attribute is not read', MT, 'constructor winning path by path',
     [(M, '{ backdrop: parseBackdrop, escape: parseBoolean, focus: parseBoolean }', '{ backdrop: parseBackdrop, escape: parseBoolean, focus: () => true }')]),
    # Shared body state
    ('the open token is not reference-counted', MT, 'reference-counts the scroll lock and the open token',
     [(M, '\t\tif (held.holders.size > 0) return\n\t\ttokens.delete', '\t\ttokens.delete')]),
    ('the open token is written by each modal', MT, 'reference-counts the scroll lock and the open token',
     [(M, '\t\tif (held !== undefined) {\n\t\t\theld.holders.add(this)\n\t\t\treturn\n\t\t}\n\t\tconst snapshot = new HostSnapshot()\n\t\ttokens.set(token',
       '\t\tconst snapshot = new HostSnapshot()\n\t\ttokens.set(token'),
      (M, '\t\tif (tokens === undefined || held === undefined || !held.holders.delete(this)) return\n\t\tif (held.holders.size > 0) return\n',
       '\t\tif (tokens === undefined || held === undefined) return\n')]),
    ('the open token is never released', MT, 'leaves an empty class attribute on the body',
     [(M, '\t\tif (!this.#apply(change, false, () => this.#close())) return false\n', '')]),
    # Adjustment
    ('the dialog adjustment is skipped', MT, 'pads the host by the scrollbar width',
     [(M, "\t\tif (width === 0 && overflowing) host.style.setProperty('padding-left', `${width}px`)\n", '')]),
    ('the resize listener is not bound', MT, 'pads the host by the scrollbar width',
     [(M, "\t\thost.ownerDocument.defaultView?.addEventListener(\n\t\t\t'resize',", "\t\thost.ownerDocument.defaultView?.addEventListener(\n\t\t\t'vn-never',")]),
    ('the hide keeps the adjustment', MT, 'pads the host by the scrollbar width',
     [(M, "\t\tif (!this.#apply(change, false, () => host.style.removeProperty('padding-left'))) return false\n", '')]),
    # Cleanup
    ('destruction omits the abort', MT, 'abandons a show in flight on destruction',
     [(M, DESTROY, '\tdestroy(): void {\n\t\tthis.#change = undefined\n')]),
    ('destruction keeps the backdrop', MT, 'abandons a show in flight on destruction',
     [(M, '\t\tthis.#backdrop?.destroy()\n\t\tthis.#backdrop = undefined\n\t\tthis.#close()', '\t\tthis.#close()')]),
    ('destruction keeps the scroll lock', MT, 'abandons a show in flight on destruction',
     [(M, '\t\tthis.#lock?.destroy()\n\t\tthis.#lock = undefined\n\t\tthis.#snapshot.restore()', '\t\tthis.#snapshot.restore()')]),
    ('destruction keeps the isolation', MT, 'restores the host, the body, and focus on destruction',
     [(M, '\t\tthis.#isolation?.destroy()\n\t\tthis.#isolation = undefined\n\t\tthis.#backdrop?.destroy()', '\t\tthis.#backdrop?.destroy()')]),
    ('the host attributes are not saved', MT, 'restores the host, the body, and focus on destruction',
     [(M, "for (const name of ['aria-hidden', 'aria-modal', 'role']) {", "for (const name of ['aria-modal']) {")]),
    ('the signal is ignored', MT, 'destroys the modal when its signal aborts',
     [(M, '\t\tif (lifetime?.aborted) this.destroy()', '\t\tif (lifetime === undefined) this.destroy()')]),
    # Vocabulary
    ('the classes group is ignored', MT, 'only the replacing values when every group is replaced',
     [(M, 'isClassToken,\n\t\t\toptions?.classes,', 'isClassToken,\n\t\t\tundefined,')]),
    ('the attributes group is ignored', MT, 'only the replacing values when every group is replaced',
     [(M, 'isAttributeName,\n\t\t\toptions?.attributes,', 'isAttributeName,\n\t\t\tundefined,')]),
    ('the selectors group is ignored', MT, 'only the replacing values when every group is replaced',
     [(M, 'isSelector,\n\t\t\toptions?.selectors,', 'isSelector,\n\t\t\tundefined,')]),
    ('a class replacement is not validated', MT, 'refuses a group value',
     [(M, 'MODAL_CLASSES,\n\t\t\tisClassToken,', 'MODAL_CLASSES,\n\t\t\tisSelector,')]),
    # Ownership
    ('the host is not claimed', MT, 'refuses an invalid host and a second owner',
     [(M, '\t\tModal.#registry.claim(host, this)\n', '')]),
    # Doors
    ('a write is not followed by a read', MT, 'stops writing when a reaction to its own write destroys it',
     [(M, '\t\twrite()\n\t\treturn this.#holds(change, shown)', '\t\twrite()\n\t\treturn true')]),
    ('the show dispatch is not followed by a read', MT, 'writes nothing when a listener to its show event destroys it',
     [(M, '// itself, so every refusal is read again before any write.\n\t\tif (this.#refused(true)) return false\n',
       '// itself, so every refusal is read again before any write.\n')]),
    ('a change the host broke stays in flight', MT, 'lets a later hide release what it held',
     [(M, '\t\tif (!held && this.#change === change) this.#change = undefined\n', '')]),
    ('the shown-token read is dropped at the doors', MT, 'stops a hide whose token removal',
     [(M, '!this.#controller.signal.aborted && this.#change === change && this.shown === shown',
       '!this.#controller.signal.aborted && this.#change === change')]),
    # Backdrop
    ('a backdrop default table is left unfrozen', BT, 'publishes a frozen default table',
     [(K, 'export const BACKDROP_CLASSES: BackdropClassMap = Object.freeze({', 'export const BACKDROP_CLASSES: BackdropClassMap = ({')]),
    ('the backdrop reads no layout before its token', BT, 'fades it in from a layout read',
     [(B, '\t\tif (this.#animated) reflow(element)\n', '')]),
    ('the backdrop hide removes before the fade', BT, 'fades it in from a layout read',
     [(B, '\t\tif (this.#animated) await settleAnimations(element, this.#controller.signal)\n\t\tif (this.#controller.signal.aborted || this.#change !== change) return false\n',
       '\t\tif (this.#controller.signal.aborted || this.#change !== change) return false\n')]),
    ('the parent option is ignored', BT, 'appends to the parent it names',
     [(B, 'this.#parent = options?.parent ?? document.body', 'this.#parent = document.body')]),
    ('a shown backdrop shows again', BT, 'resolves false for a show while shown',
     [(B, 'if (this.#controller.signal.aborted || element.classList.contains(shown)) return false', 'if (this.#controller.signal.aborted) return false')]),
    ('the backdrop hide ignores a later show', BT, 'keeps the element for a show that takes over',
     [(B, '\t\tif (this.#controller.signal.aborted || this.#change !== change) return false\n\t\telement.remove()',
       '\t\tif (this.#controller.signal.aborted) return false\n\t\telement.remove()')]),
    ('backdrop destruction keeps the element', BT, 'removes the element at once on destruction',
     [(B, '\t\tthis.#controller.abort()\n\t\tthis.#element.remove()\n', '\t\tthis.#controller.abort()\n')]),
    ('the backdrop classes are not validated', BT, 'refuses a class value',
     [(B, 'BACKDROP_CLASSES,\n\t\t\tisClassToken,', 'BACKDROP_CLASSES,\n\t\t\tisSelector,')]),
    # ScrollLock
    ('a scroll lock default table is left unfrozen', ST, 'publishes a frozen default table',
     [(K, 'export const SCROLL_LOCK_SELECTORS: ScrollLockSelectorMap = Object.freeze({', 'export const SCROLL_LOCK_SELECTORS: ScrollLockSelectorMap = ({')]),
    ('the overflow is not hidden', ST, 'hides the body overflow',
     [(S, "body.style.setProperty('overflow', 'hidden')", "body.style.setProperty('overflow', 'visible')")]),
    ('a narrow element is compensated', ST, 'hides the body overflow',
     [(S, '(element) => element === body || defaultView.innerWidth <= element.clientWidth + remaining,', '(element) => element !== undefined,')]),
    ('the sticky margin is not written', ST, 'hides the body overflow',
     [(S, "\t\t\telement.style.setProperty('margin-right', `${computed - width}px`)\n", '')]),
    ('the locks are not counted', ST, 'shares one lock',
     [(S, '\t\tif (held.holders.size > 0) return\n', '')]),
    ('the scroll lock selectors group is ignored', ST, 'compensates the elements the selectors',
     [(S, 'isSelector,\n\t\t\toptions?.selectors,', 'isSelector,\n\t\t\tundefined,')]),
    ('a document with no window is compensated', ST, 'a document with no window',
     [(S, '\t\tif (defaultView === null) return\n', '')]),
    # Isolation
    ('only the host level is sealed', IT, 'beside the host chain inert at each level',
     [(I, 'while (node !== body && node.parentElement !== null) {', 'while (node === host && node.parentElement !== null) {')]),
    ('the original inert value is not recorded', IT, 'beside the host chain inert at each level',
     [(I, "\t\tif (entry === undefined) snapshot.save({ category: 'attribute', element, name: 'inert' })\n", '')]),
    ('insertions are not observed', IT, 'makes an element inserted beside the chain inert',
     [(I, '\t\t\tthis.#observer.observe(level, { childList: true })\n', '')]),
    ('focus is not returned', IT, 'returns focus to the trigger it names',
     [(I, '\t\tthis.#trigger?.focus()\n', '')]),
    ('a release restores while claims remain', IT, 'hands each element to the newest live claim',
     [(I, '\t\tif (newest === undefined) {', '\t\tif (newest === undefined || claims.length > 0) {')]),
    ('the chain is not cleared', IT, 'hands each element to the newest live claim',
     [(I, '\t\t\t\tthis.#claim(element, false)\n', '')]),
    # Delegate
    ('the delegate has no modal route', DT, 'shows the modal a trigger names',
     [(D, '\t\tthis.#routeModal(event, event.target)\n', '')]),
    ('the modal route prevents no anchor default', DT, 'shows the modal a trigger names',
     [(D, MODAL_PREVENT, '\t\t}\n\t\tconst host = this.#readModal(target)\n')]),
    ('the focus return is dropped', DT, 'shows the modal a trigger names',
     [(D, 'MODAL_EVENTS.hidden, () => trigger.focus(),', 'MODAL_EVENTS.hidden, () => undefined,')]),
    ('the focus return ignores a refused show', DT, 'returns no focus to the trigger when a listener prevents',
     [(D, '\t\t\tif (!completed) refused.abort()\n', '')]),
    ('the route runs after a listener destroys the delegate', DT, 'shows no modal after a listener to the hide event',
     [(D, '\t\t// A listener to the hide event can destroy this delegate, which then shows nothing.\n\t\tif (this.#controller.signal.aborted) return\n', '')]),
    ('the open modal is not hidden first', DT, 'hides the shown modal inside the root before',
     [(D, '\t\tif (isInstance(open, HTMLElement)) void Modal.find(open)?.hide()\n', '')]),
    ('the delegate has no dismiss route', DT, 'hides the modal a dismiss trigger names',
     [(D, '\t\tthis.#routeDismiss(event, event.target)\n', '')]),
    ('a disabled dismiss trigger hides', DT, 'hides the modal a dismiss trigger names',
     [(D, '\t\tif (disabled) return undefined\n', '')]),
    ('the dismiss route finds no enclosing modal', DT, 'hides the modal a dismiss trigger names',
     [(D, 'readTarget(trigger, this.#modal.attributes) ??\n\t\t\ttrigger.closest(`.${CSS.escape(this.#modal.classes.host)}`)',
       'readTarget(trigger, this.#modal.attributes)')]),
    ('the delegate routes by the default modal selectors', DT, 'routes modal clicks by replaced selectors',
     [(D, 'isSelector,\n\t\t\t\toptions?.modal?.selectors,', 'isSelector,\n\t\t\t\tundefined,')]),
    ('the delegate ignores the modal classes group', DT, 'routes modal clicks by replaced selectors',
     [(D, 'isClassToken,\n\t\t\t\toptions?.modal?.classes,', 'isClassToken,\n\t\t\t\tundefined,')]),
    ('the delegate drives a modal outside its root', DT, 'leaves a modal outside its root alone',
     [(D, 'return host !== undefined && this.#root.contains(host) ? host : undefined', 'return host')]),
    ('the modal conflict is not refused', DT, 'is the modal its',
     [(D, 'return this.#conflictsCollapse(target) || this.#conflictsModal(target)', 'return this.#conflictsCollapse(target)')]),
    ('the delegate does not validate the modal classes', DT, 'refuses a modal group value',
     [(D, "'MODAL_OPTION_INVALID',\n\t\t\t\tMODAL_CLASSES,\n\t\t\t\tisClassToken,", "'MODAL_OPTION_INVALID',\n\t\t\t\tMODAL_CLASSES,\n\t\t\t\tisSelector,")]),
]


def digest(path):
    return hashlib.sha256((ROOT / path).read_bytes()).hexdigest()


def run(test):
    if REPORT.exists():
        REPORT.unlink()
    done = subprocess.run(VITEST + [test], cwd=ROOT, capture_output=True, text=True,
                          encoding='utf-8', errors='replace', timeout=600)
    if not REPORT.exists():
        return done.returncode, None, re.sub(r'\x1b\[[0-9;]*m', '', done.stdout + done.stderr)[-600:]
    report = json.loads(REPORT.read_text(encoding='utf-8'))
    cases = [case for result in report['testResults'] for case in result['assertionResults']]
    failed = [case['title'] for case in cases if case['status'] == 'failed']
    if not cases:
        return done.returncode, None, json.dumps([result.get('message', '') for result in report['testResults']])[-600:]
    return done.returncode, (len(cases), failed), ''


def main():
    wanted = sys.argv[1:]
    before = {path: digest(path) for path in OWNED}
    lines = [f'digest before: {json.dumps(before)}']
    for label, test, named, edits in MUTATIONS:
        if wanted and not any(word in label for word in wanted):
            continue
        originals = {}
        try:
            for edit in edits:
                path, old, new = edit[0], edit[1], edit[2]
                count = edit[3] if len(edit) > 3 else 1
                file = ROOT / path
                if path not in originals:
                    originals[path] = file.read_bytes()
                text = file.read_text(encoding='utf-8')
                if text.count(old) != count:
                    raise RuntimeError(f'expected {count} match in {path}, found {text.count(old)}')
                file.write_bytes(text.replace(old, new).encode('utf-8'))
            code, result, tail = run(test)
            if result is None:
                line = f'NOREPORT exit={code} | {label} | {test} | {tail}'
            else:
                total, failed = result
                hit = [title for title in failed if named in title]
                others = [title for title in failed if named not in title]
                verdict = ('EXACT' if hit and not others else 'JOINED' if hit else 'MISSED')
                line = (f'{verdict} exit={code} | {label} | {test} | {len(failed)} failed of {total} | '
                        f'named: {hit} | joined: {others}')
        except Exception as error:
            line = f'ERR | {label} | {error}'
        finally:
            for path, data in originals.items():
                (ROOT / path).write_bytes(data)
        print(line, flush=True)
        lines.append(line)
    if not wanted:
        for test in [MT, BT, ST, IT, DT, VT, PT, XT]:
            code, result, tail = run(test)
            total, failed = result if result is not None else (0, ['no report'])
            line = f'GREEN? exit={code} | {test} | {len(failed)} failed of {total} | {failed}'
            print(line, flush=True)
            lines.append(line)
    after = {path: digest(path) for path in OWNED}
    receipt = 'restored byte for byte' if after == before else f'DIGEST MISMATCH {json.dumps(after)}'
    lines.append(f'digest after: {json.dumps(after)}')
    lines.append(f'receipt: {receipt}')
    print(lines[-1], flush=True)
    LOG.write_text('\n'.join(lines) + '\n', encoding='utf-8', newline='\n')


main()
