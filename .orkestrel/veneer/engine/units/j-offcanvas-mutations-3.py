# J-OFFCANVAS round-3 mutation instrument, a copy of mutations-2.py with its live rows, the rows the
# round-3 mechanisms changed rewritten, and the round-3 rows added; in the W2 shape: applies each named mutation to an owned source
# file, runs the WHOLE test file it names (no -t), reads Vitest's JSON report, and records every
# failing case, then writes the original bytes back and checks every owned source's digest against
# the digest taken before the run, writing that receipt into the log. A row's verdict is EXACT when
# only the named case reddens, JOINED when the named case reddens beside others, and MISSED when the
# named case stays green. Each row also records the first line of the named case's first failure.
import hashlib, json, pathlib, re, subprocess, sys

ROOT = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/offcanvas')
REPORT = ROOT / 'tmp/j-offcanvas/mutation-report-3.json'
LOG = ROOT / 'tmp/j-offcanvas/mutations-3.log.txt'
VITEST = [
    'node', 'node_modules/vitest/vitest.mjs', 'run', '--config', 'vite.config.ts', '--no-cache',
    '--project', 'src:browser', '--reporter=json', f'--outputFile={REPORT}',
]
O = 'src/browser/Offcanvas.ts'
D = 'src/browser/Delegate.ts'
V = 'src/browser/validators.ts'
K = 'src/browser/constants.ts'
I = 'src/browser/index.ts'
B = 'src/browser/Backdrop.ts'
S = 'src/browser/Isolation.ts'
OT = 'tests/src/browser/Offcanvas.test.ts'
DT = 'tests/src/browser/Delegate.test.ts'
VT = 'tests/src/browser/validators.test.ts'
IT = 'tests/src/browser/index.test.ts'
BT = 'tests/src/browser/Backdrop.test.ts'
ST = 'tests/src/browser/Isolation.test.ts'
MT = 'tests/src/browser/Modal.test.ts'
OWNED = [O, D, V, K, I, B, S]

DOORS = 'stops each write sequence at the door after a write whose reaction takes the change over'
SLIDE_IN = 'abandons a show in flight on destruction'
SLIDE_OUT = 'writes nothing after a destruction during the slide-out'
ISOLATES = 'isolates the page and takes focus when a backdrop shows or scrolling is locked'
PRESS = 'hides on a trusted press on the backdrop, through an inert element painted above it'
KEPT = 'removes no backdrop when a reaction to the shown removal takes the hide over'
SPARE = 'claims each spared element as not inert at construction and at each observer delivery'
PROBES = 'counts no press on a container of the backdrop and no press inside the panel'
SIBLING = 'keeps the backdrop of a panel shown beside another shown panel interactive'
LIFETIME = 'ends each backdrop press listener with its backdrop'
ESCAPE = 'hides on a trusted Escape, and with escape dismissal off dispatches prevent'
RESIZE = 'hides a shown responsive panel when a resize leaves it in the flow'
SLIDING = 'applies a resize that arrives during the slide-in after the show dispatches'
FADES = 'fades the backdrop in and out beside the slide'


def door(write):
    return (f'\t\tif (!this.#apply({write[0]}, () => {write[1]})) return false\n',
            f'\t\t{write[1]}\n')


MUTATIONS = [
    # The door reads of the show.
    ('the show dispatch refusal is not read again', OT,
     'runs one show and one shown event when a listener to its show event shows it again',
     [(O, '\t\t// itself, so every refusal is read again before any write.\n\t\tif (this.#refused(true)) return false\n',
       '\t\t// itself, so every refusal is read again before any write.\n')]),
    ('the lock construction door is dropped', OT,
     'releases the scroll lock it constructed when a reaction inside the construction takes the show over',
     [(O, '\t\t\tif (!this.#holds(false)) {\n\t\t\t\tlock.destroy()\n\t\t\t\treturn false\n\t\t\t}\n', '')]),
    ('the aria-modal write door is dropped', OT, DOORS,
     [(O, *door(('false', "host.setAttribute('aria-modal', 'true')")))]),
    ('the role write door is dropped', OT, DOORS,
     [(O, *door(('false', "host.setAttribute('role', 'dialog')")))]),
    ('the showing write door is dropped', OT, DOORS,
     [(O, *door(('false', 'host.classList.add(showing)')))]),
    ('the shown write door is dropped', OT,
     'stops a show whose shown-token write a reaction answers by removing the token',
     [(O, *door(('true', 'host.classList.add(shown)')))]),
    ('the slide-in settle door is dropped', OT, SLIDE_IN,
     [(O, '\t\tawait Promise.all([settleAnimations(host, signal), appearing])\n\t\tif (!this.#holds(true)) return false\n',
       '\t\tawait Promise.all([settleAnimations(host, signal), appearing])\n')]),
    ('the showing removal door is dropped', OT, DOORS,
     [(O, *door(('true', 'host.classList.remove(showing)')))]),
    ('the isolation construction door is dropped', OT,
     'destroys the isolation it constructed when a reaction inside the construction takes the show over',
     [(O, '\t\t\t\tif (!this.#holds(true)) {\n\t\t\t\t\tisolation.destroy()\n\t\t\t\t\treturn false\n\t\t\t\t}\n', '')]),
    ('the focus door is dropped', OT,
     'stops a show whose focus a listener answers by destroying the panel',
     [(O, '\t\t\tif (!this.#apply(true, () => host.focus())) return false\n', '\t\t\thost.focus()\n')]),
    # The door reads of the hide.
    ('the hide dispatch refusal is not read again', OT,
     'runs one hide and one hidden event when a listener to its hide event hides it again',
     [(O, '\t\t}\n\t\tif (this.#refused(false)) return false\n\t\tthis.#changing = true\n',
       '\t\t}\n\t\tthis.#changing = true\n')]),
    ('the isolation release door is dropped', OT,
     'stops a hide whose focus return a listener answers by destroying the panel',
     [(O, *door(('true', 'isolation?.destroy()')))]),
    ('the hiding write door is dropped', OT, DOORS,
     [(O, *door(('true', 'host.classList.add(hiding)')))]),
    ('the shown removal door is dropped', OT,
     'stops a hide whose token removal a reaction answers by adding the shown token back',
     [(O, *door(('false', 'host.classList.remove(shown)')))]),
    ('the slide-out settle door is dropped', OT, SLIDE_OUT,
     [(O, '\t\tawait Promise.all([settleAnimations(host, this.#controller.signal), vanishing])\n\t\tif (!this.#holds(false)) return false\n',
       '\t\tawait Promise.all([settleAnimations(host, this.#controller.signal), vanishing])\n')]),
    ('the hiding removal door is dropped', OT, DOORS,
     [(O, *door(('false', 'host.classList.remove(hiding, showing)')))]),
    ('the aria-modal removal door is dropped', OT, DOORS,
     [(O, *door(('false', "host.removeAttribute('aria-modal')")))]),
    ('the role removal door is dropped', OT, DOORS,
     [(O, *door(('false', "host.removeAttribute('role')")))]),
    ('the lock release door is dropped', OT,
     'dispatches no hidden event after a reaction of a customized body to the lock release',
     [(O, *door(('false', 'lock?.destroy()')))]),
    # The conditions the options set.
    ('the lock ignores the scroll option', OT, ISOLATES,
     [(O, 'if (!this.#options.scroll && this.#lock === undefined) {', 'if (this.#lock === undefined) {')]),
    ('the isolation ignores the backdrop', OT, ISOLATES,
     [(O, 'if (this.#options.backdrop || !this.#options.scroll) {', 'if (!this.#options.scroll) {')]),
    ('the isolation ignores the scroll lock', OT, ISOLATES,
     [(O, 'if (this.#options.backdrop || !this.#options.scroll) {', 'if (this.#options.backdrop) {')]),
    ('the backdrop shows whatever the backdrop option reads', OT, ISOLATES,
     [(O, '\t\tif (this.#options.backdrop) {\n\t\t\tif (this.#backdrop === undefined) {', '\t\tif (true) {\n\t\t\tif (this.#backdrop === undefined) {')]),
    ('a static backdrop press hides', OT, PRESS,
     [(O, '\t#press(): void {\n\t\tif (this.#options.dismiss.backdrop) void this.hide()\n\t\telse this.#prevent()\n',
       '\t#press(): void {\n\t\tvoid this.hide()\n')]),
    ('the press counts any target containing the backdrop', OT, PROBES,
     [(O, "backdrop.element.addEventListener('mousedown', () => this.#press(), {",
       "host.ownerDocument.addEventListener('mousedown', (event) => { if (isInstance(event.target, Node) && event.target.contains(backdrop.element)) this.#press() }, {")]),
    ('the press listener sits on the backdrop parent', OT, PROBES,
     [(O, "backdrop.element.addEventListener('mousedown', () => this.#press(), {",
       "void (host.parentElement ?? backdrop.element).addEventListener('mousedown', () => this.#press(), {")]),
    ('the press listener sits on the host', OT, PROBES,
     [(O, "backdrop.element.addEventListener('mousedown', () => this.#press(), {",
       "host.addEventListener('mousedown', () => this.#press(), {")]),
    ('the press listener lives with the panel', OT, LIFETIME,
     [(O, '\t\t\t\t\tsignal: AbortSignal.any([signal, listening.signal]),\n', '\t\t\t\t\tsignal,\n')]),
    ('the isolation spares no backdrop', OT, PRESS,
     [(O, '\t\t\t\t\t...(this.#backdrop === undefined ? {} : { spare: [this.#backdrop.element] }),\n', '')]),
    ('the sibling walk claims a spared element inert', ST, SPARE,
     [(S, '|| chain.has(child) || this.#spare.has(child)) continue', '|| chain.has(child)) continue')]),
    ('the spared element is skipped, not claimed', OT, SIBLING,
     [(S, '\t\tfor (const element of this.#spare) {\n\t\t\tif (!element.isConnected) continue\n\t\t\tthis.#claim(element, false)\n\t\t\tif (this.#controller.signal.aborted) return\n\t\t}\n', '')]),
    ('the observer skips a spared insertion', ST, SPARE,
     [(S, '\t\t\t\tthis.#claim(node, !this.#spare.has(node))\n',
       '\t\t\t\tif (this.#spare.has(node)) continue\n\t\t\t\tthis.#claim(node, true)\n')]),
    ('the observer claims a spared insertion inert', ST, SPARE,
     [(S, 'this.#claim(node, !this.#spare.has(node))', 'this.#claim(node, true)')]),
    ('the backdrop removes itself at the end of its fade', OT, KEPT,
     [(B, '\t\telement.classList.remove(shown)\n\t\tif (this.#animated) await settleAnimations(element, this.#controller.signal)\n\t\treturn !this.#controller.signal.aborted && this.#change === change\n',
       '\t\telement.classList.remove(shown)\n\t\tif (this.#animated) await settleAnimations(element, this.#controller.signal)\n\t\tif (this.#controller.signal.aborted || this.#change !== change) return false\n\t\telement.remove()\n\t\treturn true\n')]),
    ('the hide removes the backdrop before the settle door', OT, KEPT,
     [(O, '\t\tconst vanishing = backdrop?.hide()\n',
       '\t\tconst vanishing = backdrop?.hide().then((faded) => {\n\t\t\tbackdrop.destroy()\n\t\t\treturn faded\n\t\t})\n')]),
    ('Escape hides whatever the keyboard option reads', OT, ESCAPE,
     [(O, "\t\tif (event.key !== 'Escape') return\n\t\tif (this.#options.dismiss.escape) void this.hide()\n\t\telse this.#prevent()\n",
       "\t\tif (event.key !== 'Escape') return\n\t\tvoid this.hide()\n")]),
    ('a refused dismissal dispatches prevent while hidden', OT, ESCAPE,
     [(O, '\t\tif (this.#controller.signal.aborted || !this.shown) return\n\t\temitEvent(this.#host, OFFCANVAS_EVENTS.prevent',
       '\t\tif (this.#controller.signal.aborted) return\n\t\temitEvent(this.#host, OFFCANVAS_EVENTS.prevent')]),
    # The responsive hide.
    ('the resize reads no position', OT, RESIZE,
     [(O, "if (view === null || view.getComputedStyle(this.#host).position === 'fixed') return",
       'if (view === null) return')]),
    ('the resize listener is not bound', OT, RESIZE,
     [(O, "\t\thost.ownerDocument.defaultView?.addEventListener('resize', () => this.#resize(), { signal })\n", '')]),
    ('a resize during the slide-in is not recorded', OT, SLIDING,
     [(O, '\t\tif (this.#changing) {\n\t\t\tthis.#resized = true\n\t\t\treturn\n\t\t}\n', '')]),
    ('a recorded resize is not applied after the slide-in', OT, SLIDING,
     [(O, '\t\tif (this.#resized) {\n\t\t\tthis.#resized = false\n\t\t\tthis.#resize()\n\t\t}\n', '')]),
    # The lifetime reads.
    ('the scroll lock takes no lifetime', OT,
     'restores the host, the body, and focus on destruction after a completed show',
     [(O, 'new ScrollLock({ document, signal })', 'new ScrollLock({ document })')]),
    ('the isolation takes no lifetime', OT,
     'stops the isolation whose inert write a reaction answers by destroying the panel',
     [(O, '\t\t\t\t\t...(this.#backdrop === undefined ? {} : { spare: [this.#backdrop.element] }),\n\t\t\t\t\tsignal,\n',
       '\t\t\t\t\t...(this.#backdrop === undefined ? {} : { spare: [this.#backdrop.element] }),\n')]),
    ('the signal abort is not heard', OT, 'destroys the panel when its signal aborts',
     [(O, "\t\t\tlifetime?.addEventListener('abort', () => this.destroy(), { once: true, signal })\n", '')]),
    # The slide, the backdrop, and the restoration.
    ('the show reads no layout before its tokens', OT, 'slides in a panel inserted in the same task',
     [(O, '\t\treflow(host)\n', '')]),
    ('the backdrop is painted on the body', OT, 'shows over the backdrop and hides',
     [(O, 'parent: host.parentElement ?? document.body,', 'parent: document.body,')]),
    ('the show does not wait for the backdrop fade', OT, FADES,
     [(O, 'await Promise.all([settleAnimations(host, signal), appearing])',
       'await Promise.all([settleAnimations(host, signal)])')]),
    ('the hide does not wait for the backdrop fade', OT, FADES,
     [(O, 'await Promise.all([settleAnimations(host, this.#controller.signal), vanishing])',
       'await Promise.all([settleAnimations(host, this.#controller.signal)])')]),
    ('the hide leaves a showing token behind', OT,
     'stops a show whose shown-token write a reaction answers by removing the token',
     [(O, 'host.classList.remove(hiding, showing)', 'host.classList.remove(hiding)')]),
    # The delegate routes.
    ('the offcanvas routes run before the toast route', DT,
     'runs the offcanvas routes after the modal and toast routes on one click',
     [(D, '\t\tthis.#dismissToast(event, event.target)\n\t\tthis.#routeOffcanvas(event, event.target)\n\t\tthis.#dismissOffcanvas(event, event.target)\n',
       '\t\tthis.#routeOffcanvas(event, event.target)\n\t\tthis.#dismissOffcanvas(event, event.target)\n\t\tthis.#dismissToast(event, event.target)\n')]),
    ('the toggle route reads no disabled state', DT,
     'toggles nothing from a trigger the disabled reading marks',
     [(D, '\t\tif (matchesDisabled(trigger, disabled)) return\n', '')]),
    ('the toggle route reads its target outside the root', DT,
     'leaves an offcanvas outside its root alone',
     [(D, '\t\tconst host = readTarget(trigger, this.#offcanvas.attributes, this.#root)\n',
       '\t\tconst host = readTarget(trigger, this.#offcanvas.attributes)\n')]),
    ('the toggle route shows instead of toggling', DT,
     'toggles the offcanvas a trigger names with the trigger',
     [(D, 'void engine.toggle(trigger).then(', 'void engine.show(trigger).then(')]),
    ('the toggle route hides no other shown offcanvas', DT,
     'hides the shown offcanvas inside the root before it toggles the one a trigger names',
     [(D, '\t\tif (isInstance(open, HTMLElement) && open !== host) void Offcanvas.find(open)?.hide()\n', '')]),
    ('the toggle route hides the named offcanvas as the other one', DT,
     'hides the shown offcanvas inside the root before it toggles the one a trigger names',
     [(D, 'if (isInstance(open, HTMLElement) && open !== host)', 'if (isInstance(open, HTMLElement))')]),
    ('the toggle route arms no focus return', DT,
     'toggles the offcanvas a trigger names with the trigger',
     [(D, '\t\thost.addEventListener(OFFCANVAS_EVENTS.hidden, () => trigger.focus(), {',
       '\t\thost.addEventListener(OFFCANVAS_EVENTS.hidden, () => undefined, {')]),
    ('a refused toggle keeps its focus return', DT,
     'returns no focus to the trigger when a listener prevents the toggle it asked for',
     [(D, '\t\tvoid engine.toggle(trigger).then((completed) => {\n\t\t\tif (!completed) refused.abort()\n\t\t})\n',
       '\t\tvoid engine.toggle(trigger)\n')]),
    ('the toggle route reads no lifetime before it prevents', DT,
     'leaves the offcanvas a click names to a live outer delegate when a listener to the button route destroys the inner one',
     [(D, '\t\tconst trigger = readClosest(target, this.#offcanvas.selectors.trigger, this.#root)\n\t\t// A listener to an earlier route\'s event can destroy this delegate, which then prevents, marks,\n\t\t// and drives nothing more.\n\t\tif (trigger === undefined || this.#controller.signal.aborted) return\n',
       '\t\tconst trigger = readClosest(target, this.#offcanvas.selectors.trigger, this.#root)\n\t\tif (trigger === undefined) return\n')]),
    ('the toggle route reads no lifetime after the other hide', DT,
     'leaves the offcanvas a click names to a live outer delegate when a listener to the hide event the inner route sends destroys the inner one',
     [(D, '\t\tif (this.#controller.signal.aborted || !this.#mark(event, Offcanvas, host)) return\n',
       '\t\tif (!this.#mark(event, Offcanvas, host)) return\n')]),
    ('the toggle route reads no nested-root mark', DT,
     'drives the offcanvas a click names once under nested roots',
     [(D, '\t\tif (host === undefined || Delegate.#driven.get(event)?.get(Offcanvas)?.has(host) === true) {\n',
       '\t\tif (host === undefined) {\n')]),
    ('the dismiss route is not run', DT,
     'hides the offcanvas a dismiss trigger names or sits in',
     [(D, '\t\tthis.#dismissOffcanvas(event, event.target)\n\t}\n', '\t}\n')]),
    ('the dismiss resolution reads no lifetime', DT,
     'acquires and hides nothing through the offcanvas dismiss route after a listener to the button route destroys the delegate',
     [(D, '\t\tif (host === undefined || this.#controller.signal.aborted) return undefined\n',
       '\t\tif (host === undefined) return undefined\n')]),
    ('the conflict preflight counts no offcanvas', DT,
     'refuses a click whose button host is the offcanvas its trigger names',
     [(D, '\t\t\t...offcanvases,\n', '')]),
    ('the conflict preflight counts a disabled toggle', DT,
     'drives the button route alone when the offcanvas trigger naming its button host is disabled',
     [(D, 'offcanvasTrigger === undefined ||\n\t\t\t\tmatchesDisabled(offcanvasTrigger, this.#offcanvas.classes.disabled)',
       'offcanvasTrigger === undefined')]),
    ('the conflict preflight counts one offcanvas twice', DT,
     'counts an offcanvas its trigger names and its dismiss trigger reaches once',
     [(D, 'const offcanvases = new Set(', 'const offcanvases = Array.from(')]),
    # The declarations.
    ('the offcanvas event guard accepts any related target', VT,
     'isOffcanvasEvent',
     [(V, "value is OffcanvasEventMap['show'] {\n\ttry {\n\t\tif (!isInstance(value, CustomEvent)) return false\n\t\tconst detail: unknown = value.detail\n\t\tif (typeof detail !== 'object' || detail === null) return false\n\t\tif (!('relatedTarget' in detail)) return true\n\t\treturn detail.relatedTarget === undefined || isInstance(detail.relatedTarget, HTMLElement)\n",
       "value is OffcanvasEventMap['show'] {\n\ttry {\n\t\tif (!isInstance(value, CustomEvent)) return false\n\t\tconst detail: unknown = value.detail\n\t\tif (typeof detail !== 'object' || detail === null) return false\n\t\tif (!('relatedTarget' in detail)) return true\n\t\treturn true\n")]),
    ('the default scroll is true', OT, 'publishes frozen default tables',
     [(K, '\tdismiss: Object.freeze({ backdrop: true, escape: true }),\n\tscroll: false,\n',
       '\tdismiss: Object.freeze({ backdrop: true, escape: true }),\n\tscroll: true,\n')]),
    ('the barrel omits the offcanvas', IT, 'exports the browser surface',
     [(I, "export * from './Offcanvas.js'\n", '')]),
]


def digest(path):
    return hashlib.sha256((ROOT / path).read_bytes()).hexdigest()


def run(test):
    if REPORT.exists():
        REPORT.unlink()
    done = subprocess.run(VITEST + [test], cwd=ROOT, capture_output=True, text=True,
                          encoding='utf-8', errors='replace', timeout=1200)
    if not REPORT.exists():
        return done.returncode, None, re.sub(r'\x1b\[[0-9;]*m', '', done.stdout + done.stderr)[-600:]
    report = json.loads(REPORT.read_text(encoding='utf-8'))
    cases = [case for result in report['testResults'] for case in result['assertionResults']]
    failed = [' > '.join(case['ancestorTitles'] + [case['title']]) for case in cases
              if case['status'] == 'failed']
    messages = {' > '.join(case['ancestorTitles'] + [case['title']]):
                re.sub(r'\x1b\[[0-9;]*m', '', (case.get('failureMessages') or [''])[0]).strip().split('\n')[0]
                for case in cases if case['status'] == 'failed'}
    return done.returncode, (len(cases), failed, messages), ''


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
                total, failed, messages = result
                hit = [title for title in failed if named in title]
                others = [title for title in failed if named not in title]
                verdict = ('EXACT' if hit and not others else 'JOINED' if hit else 'MISSED')
                first = messages[hit[0]] if hit else ''
                line = (f'{verdict} exit={code} | {label} | {test} | {len(failed)} failed of {total} | '
                        f'named: {hit} | first: {first} | joined: {others}')
        except Exception as error:
            line = f'ERR | {label} | {error}'
        finally:
            for path, data in originals.items():
                (ROOT / path).write_bytes(data)
        print(line, flush=True)
        lines.append(line)
    if not wanted:
        for test in [OT, DT, VT, IT, BT, ST, MT]:
            code, result, tail = run(test)
            total, failed, _messages = result if result is not None else (0, ['no report'], {})
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
