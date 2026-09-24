# J-TAB mutation instrument, after the retained J-COLLAPSE round-3 instrument (j-collapse-mutations-3.py):
# applies each named mutation to an owned source file, runs the WHOLE test file it names (no -t), reads
# Vitest's JSON report, and records every failing case, then writes the original bytes back and checks
# every owned source's digest against the digest taken before the run, writing that receipt into the log.
import hashlib, json, pathlib, re, subprocess, sys

ROOT = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tab')
REPORT = ROOT / 'tmp/j-tab/mutation-report-3.json'
LOG = ROOT / 'tmp/j-tab/mutations-3.log.txt'
VITEST = [
    'node', 'node_modules/vitest/vitest.mjs', 'run', '--config', 'vite.config.ts', '--no-cache',
    '--project', 'src:browser', '--reporter=json', f'--outputFile={REPORT}',
]
T = 'src/browser/Tab.ts'
D = 'src/browser/Delegate.ts'
V = 'src/browser/validators.ts'
H = 'src/browser/helpers.ts'
K = 'src/browser/constants.ts'
I = 'src/browser/index.ts'
TT = 'tests/src/browser/Tab.test.ts'
DT = 'tests/src/browser/Delegate.test.ts'
VT = 'tests/src/browser/validators.test.ts'
HT = 'tests/src/browser/helpers.test.ts'
IT = 'tests/src/browser/index.test.ts'
OWNED = [T, D, V, H, K, I]

SETTLE = 'await settleAnimations(pane, this.#controller.signal)'
HOLDS_AFTER_SETTLE = ('\t\t\t\tawait settleAnimations(pane, this.#controller.signal)\n'
                      '\t\t\t\tif (!this.#holds(change, held, settled)) return false\n')
KEYS = "['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End']"

ROUND_ONE = [
    # Construction and ownership
    ('the host is not claimed', TT, 'refuses an invalid host and a second owner',
     [(T, '\t\tTab.#registry.claim(host, this)\n', '')]),
    ('the pane is read from the href alone', TT, 'resolves its pane by the target attribute before its href',
     [(T, '\t\tthis.#pane = readTarget(host, this.#attributes)\n', "\t\tthis.#pane = readTarget(host, { target: 'data-vn-absent' })\n")]),
    ('construction refuses a control outside any list', TT, 'constructs a control with no list',
     [(T, '\t\tconst writes = this.#planInitial()\n', "\t\tif (this.#list() === undefined) throw new AppError('No list', 'TAB_HOST_INVALID')\n\t\tconst writes = this.#planInitial()\n")]),
    ('the initial roles are not written', TT, 'writes the initial roles and states',
     [(T, '\t\t\tthis.#writeInitial(writes)\n', '')]),
    ('the initial roles are not saved', TT, 'writes the initial roles and states',
     [(T, "\t\t\tthis.#snapshot.save({ category: 'attribute', element, name })\n", '')]),
    ('an existing role is overwritten', TT, 'writes the initial roles and states',
     [(T, '\t\t\t!element.hasAttribute(name) &&\n', '')]),
    ('the wrapper is the control itself', TT, 'writes the initial roles and states',
     [(T, '\t\treturn isInstance(wrapper, HTMLElement) ? wrapper : control\n', '\t\treturn control\n')]),
    ('an entry is not its own wrapper', TT, 'writes each list-group item its own wrapper',
     [(T, 'control.closest(`:is(${this.#selectors.wrapper}, ${this.#selectors.entry})`)',
       'control.closest(this.#selectors.wrapper)')]),
    ('the initial roles are written for an aborted signal', TT, 'destroys the tab when its signal aborts',
     [(T, '\t\t\tthis.#writeInitial(writes)\n\t\t}\n', '\t\t}\n\t\tthis.#writeInitial(writes)\n')]),
    # Pre-change events and refusals
    ('the hide prevention is ignored', TT, 'refuses the swap before any write when a listener prevents either one',
     [(T, '\t\tif (!hiding || !showing) return false\n', '\t\tif (!showing) return false\n')]),
    ('the show prevention is ignored', TT, 'refuses the swap before any write when a listener prevents either one',
     [(T, '\t\tif (!hiding || !showing) return false\n', '\t\tif (!hiding) return false\n')]),
    ('a prevented hide dispatches no show', TT, 'refuses the swap before any write when a listener prevents either one',
     [(T, '\t\tif (this.#controller.signal.aborted) return false\n\t\tconst showing',
       '\t\tif (this.#controller.signal.aborted || !hiding) return false\n\t\tconst showing')]),
    ('the hide dispatch is not followed by a read', TT, 'dispatches no show event when a listener to the sibling hide destroys it',
     [(T, '\t\tif (this.#controller.signal.aborted) return false\n\t\tconst showing', '\t\tconst showing')]),
    ('the refusals are not read again after the events', TT, 'writes nothing when a listener to its show event destroys it',
     [(T, '\t\tif (this.#refused() || this.#sibling() !== outgoing) return false\n', '\t\tif (this.#sibling() !== outgoing) return false\n')]),
    ('the active sibling is not read again after the events', TT, 'deactivates the sibling itself',
     [(T, '\t\tif (this.#refused() || this.#sibling() !== outgoing) return false\n', '\t\tif (this.#refused()) return false\n')]),
    ('an active control dispatches its events', TT, 'resolves false with no event and no write when the control is already active',
     [(T, '\t\treturn this.#controller.signal.aborted || this.active\n', '\t\treturn this.#controller.signal.aborted\n')]),
    # The swap
    ('the sibling keeps its active token', TT, 'swaps the active control and pane',
     [(T, '() => outgoing.classList.remove(active)', '() => undefined')]),
    ('the sibling is not blurred', TT, 'swaps the active control and pane',
     [(T, '() => outgoing.blur()', '() => undefined')]),
    ('the sibling pane keeps its shown token', TT, 'swaps the active control and pane',
     [(T, '() => previous.classList.remove(active, shown)', '() => previous.classList.remove(active)')]),
    ('the selection is not written', TT, 'swaps the active control and pane',
     [(T, "control.setAttribute('aria-selected', String(selected))", 'undefined')]),
    ('the tab stop is not written', TT, 'swaps the active control and pane',
     [(T, "\t\t\t\tif (selected) control.removeAttribute('tabindex')\n\t\t\t\telse control.setAttribute('tabindex', '-1')\n", '')]),
    ('the completed events precede the swap', TT, 'swaps the active control and pane',
     [(T, '\t\tconst held = [active]\n', "\t\temitEvent(host, TAB_EVENTS.shown, { relatedTarget: outgoing }, false)\n\t\tconst held = [active]\n")]),
    ('the sibling pane is read with this tab attributes', TT, 'deactivates the pane the sibling names through its own tab',
     [(T, '(Tab.#registry.find(outgoing)?.pane ?? readTarget(outgoing, this.#attributes))', 'readTarget(outgoing, this.#attributes)')]),
    ('the dropdown is not written', TT, 'marks the toggle, the menu, and the wrapper of a dropdown',
     [(T, '\t\tconst dropdown = this.#dropdown(control)\n\t\tif (dropdown === undefined) return true\n', '\t\treturn true\n\t\tconst dropdown = this.#dropdown(control)\n')]),
    ('a role that is not tab takes the selection', TT, 'constructs a control with no list',
     [(T, "\t\tconst entering = host.getAttribute('role') === 'tab'\n", '\t\tconst entering = true\n')]),
    # Motion
    ('the pane is not laid out before its shown token', TT, 'waits for the pane fade to settle',
     [(T, '\t\t\tif (fading) reflow(pane)\n', '')]),
    ('a zero timer replaces the settle', TT, 'waits for the pane fade to settle',
     [(T, SETTLE, 'await new Promise((resolve) => setTimeout(resolve, 0))')]),
    # Doors
    ('a write is not followed by a read', TT, 'stops writing when a reaction to its own write destroys it',
     [(T, '\t\twrite()\n\t\treturn this.#holds(change, host, pane)', '\t\twrite()\n\t\treturn true')]),
    ('the change identity is not read', TT, 'showing the tab again, the inner call completing the one swap',
     [(T, '\t\t\tthis.#change === change &&\n', '')]),
    ('the control token is not read', TT, 'control-activation write a reaction answers by removing the active token',
     [(T, '\t\t\thost.every((token) => this.#host.classList.contains(token)) &&\n', '')]),
    ('the pane tokens are not read', TT, 'pane-activation write a reaction answers',
     [(T, '\t\t\t(element === undefined || pane.every((token) => element.classList.contains(token)))\n', '\t\t\ttrue\n')]),
    ('the fade is not followed by a read', TT, 'loses its shown token during the fade',
     [(T, HOLDS_AFTER_SETTLE, '\t\t\t\tawait settleAnimations(pane, this.#controller.signal)\n')]),
    ('the hidden dispatch is not followed by a read', TT, 'when a listener to its hidden event destroys it',
     [(T, "\t\t\temitEvent(outgoing, TAB_EVENTS.hidden, { relatedTarget: host }, false)\n\t\t\tif (!this.#holds(change, held, settled)) return false\n",
       "\t\t\temitEvent(outgoing, TAB_EVENTS.hidden, { relatedTarget: host }, false)\n")]),
    # Cleanup
    ('destruction omits the abort', TT, 'abandons a swap in flight on destruction',
     [(T, '\t\tthis.#controller.abort()\n\t\t// The claim', '\t\t// The claim'),
      (T, '\tdestroy(): void {\n\t\tif (this.#controller.signal.aborted) return\n', '\tdestroy(): void {\n')]),
    ('the swap is not saved', TT, 'restores the controls and panes after a completed swap',
     [(T, '\t\tif (outgoing !== undefined) this.#save(outgoing, previous, leaving)\n\t\tthis.#save(host, pane, entering)\n', '')]),
    ('the signal is ignored', TT, 'destroys the tab when its signal aborts',
     [(T, '\t\tif (signal?.aborted) this.destroy()\n\t\telse {', '\t\tif (signal === undefined) this.destroy()\n\t\telse {')]),
    # Events
    ('a completed event is cancelable', TT, 'dispatches bubbling events',
     [(T, 'emitEvent(host, TAB_EVENTS.shown, { relatedTarget: outgoing }, false)', 'emitEvent(host, TAB_EVENTS.shown, { relatedTarget: outgoing }, true)')]),
    ('the event guard admits every custom event', TT, 'binds only engine-shaped events to hooks',
     [(V, '\t\treturn related === undefined || isInstance(related, HTMLElement)\n', '\t\treturn true\n'),
      (V, "\t\tif (typeof detail !== 'object' || detail === null) return false\n", '\t\tif (detail === null) return true\n')]),
    # Vocabulary
    ('the classes group is ignored', TT, 'only the replacing values when every group is replaced',
     [(T, '\t\t\tisClassToken,\n\t\t\toptions?.classes,', '\t\t\tisClassToken,\n\t\t\tundefined,')]),
    ('the attributes group is ignored', TT, 'only the replacing values when every group is replaced',
     [(T, '\t\t\tisAttributeName,\n\t\t\toptions?.attributes,', '\t\t\tisAttributeName,\n\t\t\tundefined,')]),
    ('the selectors group is ignored', TT, 'only the replacing values when every group is replaced',
     [(T, '\t\t\tisSelector,\n\t\t\toptions?.selectors,', '\t\t\tisSelector,\n\t\t\tundefined,')]),
    ('a class replacement is not validated', TT, 'refuses a group value',
     [(T, '\t\t\tTAB_CLASSES,\n\t\t\tisClassToken,', '\t\t\tTAB_CLASSES,\n\t\t\tisSelector,')]),
    ('a default table is left unfrozen', TT, 'publishes frozen default tables',
     [(K, 'export const TAB_CLASSES: TabClassMap = Object.freeze({', 'export const TAB_CLASSES: TabClassMap = ({')]),
    # Delegate
    ('the delegate has no tab route', DT, 'shows the pane a tab, pill, or list trigger names on click',
     [(D, '\t\tthis.#routeTab(event, event.target)\n', '')]),
    ('the delegate prevents no anchor click', DT, 'shows the pane a tab, pill, or list trigger names on click',
     [(D, '\t\tif (isInstance(control, HTMLAnchorElement) || isInstance(control, HTMLAreaElement)) {\n\t\t\tevent.preventDefault()\n\t\t}\n', '')]),
    ('the delegate prevents every click', DT, 'shows the pane a tab, pill, or list trigger names on click',
     [(D, '\t\tif (isInstance(control, HTMLAnchorElement) || isInstance(control, HTMLAreaElement)) {\n', '\t\tif (isInstance(control, HTMLElement)) {\n')]),
    ('the delegate drops no destroyed tab', DT, 'shows the pane a tab, pill, or list trigger names on click',
     [(D, '\t\t\t\tAlert.find(engine.host) !== engine &&\n\t\t\t\tTab.find(engine.host) !== engine\n', '\t\t\t\tAlert.find(engine.host) !== engine\n')]),
    ('the delegate drives a disabled control', DT, 'leaves a control the disabled reading marks inactive on click',
     [(D, '\t\tif (isDisabled(control, this.#tab.classes.disabled)) return\n', '')]),
    ('the disabled attribute is not read', DT, 'moves focus and activation with the arrow keys',
     [(V, "\t\telement.matches(':disabled') ||\n\t\t(element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false')\n", "\t\telement.matches(':disabled')\n")]),
    ('the delegate has no key route', DT, 'moves focus and activation with the arrow keys',
     [(D, '\t\tthis.#routeTabKey(event, event.target)\n', '')]),
    ('the key propagates', DT, 'moves focus and activation with the arrow keys',
     [(D, '\t\tevent.stopPropagation()\n', '')]),
    ('the key keeps its default action', DT, 'moves focus and activation with the arrow keys',
     [(D, '\t\tevent.stopPropagation()\n\t\tevent.preventDefault()\n', '\t\tevent.stopPropagation()\n')]),
    ('the keys do not wrap', DT, 'moves focus and activation with the arrow keys',
     [(D, "key === 'ArrowRight' || key === 'ArrowDown', true)", "key === 'ArrowRight' || key === 'ArrowDown', false)")]),
    ('Home and End are ignored', DT, 'moves focus and activation with the arrow keys',
     [(D, KEYS, "['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']")]),
    ('the keys pass no disabled control over', DT, 'moves focus and activation with the arrow keys',
     [(D, '.filter(\n\t\t\t(element) => !isDisabled(element, this.#tab.classes.disabled),\n\t\t)\n', '\n')]),
    ('the next control takes no focus', DT, 'moves focus and activation with the arrow keys',
     [(D, '\t\tnext.focus({ preventScroll: true })\n', '')]),
    ('the tab click is not marked', DT, 'drives a tab control under nested roots once per click and once per key',
     [(D, '\t\tif (!this.#mark(event, Tab, control)) return\n', '')]),
    ('the tab key is not marked', DT, 'drives a tab control under nested roots once per click and once per key',
     [(D, ' || !this.#mark(event, Tab, next)) return', ') return')]),
    ('the tab same-host conflict is not refused', DT, 'refuses a click whose button host is the tab control',
     [(D, '\t\t\t...(control !== undefined && Tab.find(control) === undefined ? [control] : []),\n', '')]),
    ('the tab conflict ignores a consumer button', DT, 'the tab control carries a button a consumer constructed',
     [(D, '\t\t\t...(host !== undefined && Button.find(host) === undefined ? [host] : []),\n', '\t\t\t...(host !== undefined ? [host] : []),\n')]),
    ('the delegate routes by the default tab selector', DT, 'routes tab clicks and keys by a replaced trigger selector',
     [(D, '\t\t\t\tisSelector,\n\t\t\t\toptions?.tab?.selectors,', '\t\t\t\tisSelector,\n\t\t\t\tundefined,')]),
    ('the delegate ignores the tab classes group', DT, 'routes tab clicks and keys by a replaced trigger selector',
     [(D, '\t\t\t\tisClassToken,\n\t\t\t\toptions?.tab?.classes,', '\t\t\t\tisClassToken,\n\t\t\t\tundefined,')]),
    ('the click route constructs the tab without its group', DT, 'routes tab clicks and keys by a replaced trigger selector',
     [(D, '\t\tvoid (Tab.find(control) ?? this.#construct(new Tab(control, this.#tab)))?.show()\n', '\t\tvoid (Tab.find(control) ?? this.#construct(new Tab(control)))?.show()\n')]),
    ('the key route constructs the tab without its group', DT, 'routes tab clicks and keys by a replaced trigger selector',
     [(D, '\t\tvoid (Tab.find(next) ?? this.#construct(new Tab(next, this.#tab)))?.show()\n', '\t\tvoid (Tab.find(next) ?? this.#construct(new Tab(next)))?.show()\n')]),
    ('the delegate does not validate the tab classes', DT, 'refuses a tab group value',
     [(D, "\t\t\t\t'TAB_OPTION_INVALID',\n\t\t\t\tTAB_CLASSES,\n\t\t\t\tisClassToken,", "\t\t\t\t'TAB_OPTION_INVALID',\n\t\t\t\tTAB_CLASSES,\n\t\t\t\tisSelector,")]),
    # Helper, guard, barrel
    ('the neighbor does not wrap', HT, 'wrapping past either end when wrap is true',
     [(H, '\treturn list[\n\t\twrap ? (moved + list.length) % list.length : Math.max(0, Math.min(moved, list.length - 1))\n\t]\n',
       '\treturn list[Math.max(0, Math.min(moved, list.length - 1))]\n')]),
    ('the neighbor does not stay on the end member', HT, 'stays on the end member when wrap is false',
     [(H, '\treturn list[\n\t\twrap ? (moved + list.length) % list.length : Math.max(0, Math.min(moved, list.length - 1))\n\t]\n',
       '\treturn list[(moved + list.length) % list.length]\n')]),
    ('an absent current value returns the first member', HT, 'returns an end member for a current value outside the list',
     [(H, '\tif (index === -1) return !forward && wrap ? list.at(-1) : list[0]\n', '\tif (index === -1) return list[0]\n')]),
    ('the tab event guard admits any detail', VT, 'requires a custom event whose detail carries an HTML element or nothing',
     [(V, "\t\tif (typeof detail !== 'object' || detail === null) return false\n", "\t\tif (typeof detail !== 'object' || detail === null) return true\n")]),
    ('the tab event guard admits any related target', VT, 'requires a custom event whose detail carries an HTML element or nothing',
     [(V, '\t\treturn related === undefined || isInstance(related, HTMLElement)\n', '\t\treturn true\n')]),
    ('the tab event guard reads related target uncontained', VT, 'returns false when a prototype or relatedTarget accessor throws',
     [(V, "export function isTabEvent(value: unknown): value is TabEventMap['show'] {\n\ttry {\n",
       "export function isTabEvent(value: unknown): value is TabEventMap['show'] {\n\tif (value instanceof CustomEvent && typeof value.detail === 'object' && value.detail !== null && 'relatedTarget' in value.detail) void value.detail.relatedTarget\n\ttry {\n")]),
    ('the barrel omits the tab', IT, 'exports the browser surface',
     [(I, "export * from './Tab.js'\n", '')]),
]

# Round 2 (j-tab-brief-2.md): the rows items A, B, C, D, E, and F add. A row whose named entry is a
# tuple reddens every case it names; the verdict is MISSED unless each one fails.
ROUND_TWO = [
    # A
    ('the outgoing phase reads no sibling', TT,
     ('sibling blur a listener answers by showing that sibling again', 'showing a third control, which ends alone active'),
     [(T, '\t\t\tthis.#sibling() === undefined &&\n', '')]),
    # B
    ('the tab route reads no lifetime before it prevents or marks', DT, 'shows nothing for the tab route after a button listener destroys the delegate',
     [(D, '\t\tif (control === undefined || this.#controller.signal.aborted) return\n', '\t\tif (control === undefined) return\n')]),
    ('the tab route keeps an engine constructed while the delegate was destroyed', DT, 'whose construction a reaction answers by destroying the delegate',
     [(D, '\t\tif (!this.#controller.signal.aborted) return this.#acquire(engine)\n\t\tengine.destroy()\n\t\treturn undefined\n', '\t\treturn this.#acquire(engine)\n')]),
    # C
    ('the one refusal omits the panels', DT, 'refuses a click whose button host is a panel the collapse trigger names',
     [(D, '\t\t\t...(trigger === undefined\n\t\t\t\t? []\n\t\t\t\t: readTargets(trigger, this.#collapse.attributes).filter(\n\t\t\t\t\t\t(panel) => Collapse.find(panel) === undefined,\n\t\t\t\t\t)),\n', '')]),
    ('the shared closest match ignores the root', DT, 'ignores unmatched targets and a closest host outside the root',
     [(D, '\t\treturn isInstance(element, HTMLElement) && this.#root.contains(element) ? element : undefined\n', '\t\treturn isInstance(element, HTMLElement) ? element : undefined\n')]),
    # D
    ('the root registers no key listener', DT, 'registers one click and one key listener on the root',
     [(D, "\t\tthis.#root.addEventListener('keydown', (event) => this.#press(event), {\n\t\t\tsignal: this.#controller.signal,\n\t\t})\n", '')]),
    # E
    ('the controls keep a toggle', HT, 'returns the links and entries that are not toggles',
     [(H, 'list.querySelectorAll(`:is(${link}, ${entry}):not(${toggle}), ${trigger}`)', 'list.querySelectorAll(`:is(${link}, ${entry}), ${trigger}`)')]),
    ('the controls keep an element that is not HTML', HT, 'leaves out an element that is not HTML',
     [(H, '\t).filter(instanceOf(HTMLElement))\n}\n', '\t)\n}\n')]),
    ('an undefined current value is looked up', HT, 'reads an undefined current value as one the list does not hold',
     [(H, '\tconst index = current === undefined ? -1 : list.indexOf(current)\n', '\tconst index = list.indexOf(current)\n')]),
    # F
    ('the live abort subscription is dropped', TT, 'destroys the tab when its signal aborts',
     [(T, "\t\t\tsignal?.addEventListener('abort', () => this.destroy(), {\n\t\t\t\tonce: true,\n\t\t\t\tsignal: this.#controller.signal,\n\t\t\t})\n", '')]),
    ('the delegate destroys in acquisition order', DT, 'restores a list whose controls it drove through several tabs to the markup the list carried',
     [(D, '\t\tfor (const engine of [...this.#owned].reverse()) engine.destroy()\n', '\t\tfor (const engine of this.#owned) engine.destroy()\n')]),
    ('the observer releases in acquisition order', DT, 'restores a removed list whose controls it drove through several tabs',
     [(D, '\t\tfor (const engine of [...this.#owned].reverse()) {\n', '\t\tfor (const engine of this.#owned) {\n')]),
]

# Round 3 (j-tab-brief-3.md): E16's one disabled reading, as the tab and alert routes call it.
ROUND_THREE = [
    ('the disabled reading ignores a false attribute value', DT, 'drives one whose disabled attribute reads false',
     [(V, " && element.getAttribute('disabled') !== 'false')", ')')]),
    ('the disabled reading ignores the platform state', VT, 'reads a control inside a disabled fieldset as disabled',
     [(V, "\t\telement.matches(':disabled') ||\n", '')]),
    ('the disabled reading ignores the token', VT, 'reads the token, the platform disabled state',
     [(V, '\t\telement.classList.contains(token) ||\n', '')]),
    ('the alert route reads no disabled trigger', DT, 'skips a dismiss trigger carrying the disabled token or the disabled attribute',
     [(D, '\t\tif (isDisabled(trigger, classes.disabled)) return undefined\n', '')]),
]

MUTATIONS = ROUND_ONE + ROUND_TWO + ROUND_THREE


def digest(path):
    return hashlib.sha256((ROOT / path).read_bytes()).hexdigest()


def run(test):
    if REPORT.exists():
        REPORT.unlink()
    done = subprocess.run(VITEST + [test], cwd=ROOT, capture_output=True, text=True,
                          encoding='utf-8', errors='replace', timeout=400)
    if not REPORT.exists():
        return done.returncode, None, re.sub(r'\x1b\[[0-9;]*m', '', done.stdout + done.stderr)[-600:]
    report = json.loads(REPORT.read_text(encoding='utf-8'))
    cases = [case for result in report['testResults'] for case in result['assertionResults']]
    failed = [case['title'] for case in cases if case['status'] == 'failed']
    if not cases:
        messages = ' '.join(result.get('message', '') for result in report['testResults'])
        return done.returncode, (0, ['collection failed: ' + messages[:300]]), ''
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
                text = file.read_bytes().decode('utf-8')
                if text.count(old) != count:
                    raise RuntimeError(f'expected {count} match in {path}, found {text.count(old)}')
                file.write_bytes(text.replace(old, new).encode('utf-8'))
            code, result, tail = run(test)
            if result is None:
                line = f'NOREPORT exit={code} | {label} | {test} | {tail}'
            else:
                total, failed = result
                names = named if isinstance(named, tuple) else (named,)
                hit = [title for title in failed if any(name in title for name in names)]
                others = [title for title in failed if not any(name in title for name in names)]
                every = all(any(name in title for title in failed) for name in names)
                verdict = ('EXACT' if every and not others else 'JOINED' if every else 'MISSED')
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
        for test in [TT, DT, VT, HT, IT]:
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
