# J-COLLAPSE round 3 mutation instrument (D6), a copy of mutations-2.py with the round-3 rows: applies each named mutation to an owned source file,
# runs the WHOLE test file it names (no -t), reads Vitest's JSON report, and records every failing
# case, then writes the original bytes back and checks every owned source's digest against the
# digest taken before the run, writing that receipt into the log.
import hashlib, json, pathlib, re, subprocess, sys

ROOT = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer-collapse')
REPORT = ROOT / 'tmp/j-collapse/mutation-report.json'
LOG = ROOT / 'tmp/j-collapse/mutations-round-3.log.txt'
VITEST = [
    'node', 'node_modules/vitest/vitest.mjs', 'run', '--config', 'vite.config.ts', '--no-cache',
    '--project', 'src:browser', '--reporter=json', f'--outputFile={REPORT}',
]
C = 'src/browser/Collapse.ts'
D = 'src/browser/Delegate.ts'
V = 'src/browser/validators.ts'
P = 'src/browser/parsers.ts'
K = 'src/browser/constants.ts'
I = 'src/browser/index.ts'
CT = 'tests/src/browser/Collapse.test.ts'
DT = 'tests/src/browser/Delegate.test.ts'
VT = 'tests/src/browser/validators.test.ts'
PT = 'tests/src/browser/parsers.test.ts'
IT = 'tests/src/browser/index.test.ts'
OWNED = [C, D, V, P, K, I]

SETTLE = 'await settleAnimations(host, this.#controller.signal)'
SHOW_TOKEN = ('\t\tthis.#save(dimension, triggers)\n'
              '\t\tif (!this.#apply(change, during, [], () => host.classList.add(transition))) return false\n'
              '\t\tif (!this.#apply(change, during, [], () => host.classList.remove(this.#classes.host))) {')
SHOW_SIZE = ('host.style.setProperty(dimension, `${size}px`))) {\n\t\t\treturn false\n\t\t}\n\t\tawait')
TRIGGERS = ('\t\treturn Array.from(this.#host.ownerDocument.querySelectorAll(this.#selectors.trigger))\n'
            '\t\t\t.filter(instanceOf(HTMLElement))\n'
            '\t\t\t.filter((trigger) => readTargets(trigger, this.#attributes).includes(this.#host))\n')
REFUSAL = ('\t\tconst siblings = this.#siblings()\n'
           '\t\tif (this.#refused(true) || this.#transitioning(siblings)) return false\n')
MARK = ('\t\t\tif (!this.#root.contains(panel)) continue\n'
        '\t\t\tif (!this.#mark(event, Collapse, panel)) continue\n')

MUTATIONS = [
    # Lifecycle
    ('show writes no transition token', CT, 'shows and hides through the transition token',
     [(C, SHOW_TOKEN, SHOW_TOKEN.replace('\t\tif (!this.#apply(change, during, [], () => host.classList.add(transition))) return false\n', ''))]),
    ('show writes no pixel size', CT, 'shows and hides through the transition token',
     [(C, SHOW_SIZE, SHOW_SIZE.replace('`${size}px`', "''"))]),
    ('the triggers are read once', CT, 'shows and hides through the transition token',
     [(C, '\t#change: object | undefined\n', '\t#change: object | undefined\n\t#once: readonly HTMLElement[] | undefined\n'),
      (C, TRIGGERS, TRIGGERS.replace('\t\treturn Array.from', '\t\tthis.#once ??= Array.from') + '\t\treturn this.#once\n')]),
    ('the dimension is always height', CT, 'sizes the width',
     [(C, "return this.#host.classList.contains(this.#classes.horizontal) ? 'width' : 'height'", "return 'height'")]),
    ('a trigger reads its first panel alone', CT, 'collapses a trigger naming several panels',
     [(C, '!readTargets(trigger, this.#attributes).some(', '!readTargets(trigger, this.#attributes).slice(0, 1).some(')]),
    ('the sibling is hidden without its engine and events', CT, 'hides the open first-level sibling',
     [(C, 'void this.#acquire(sibling, parent).hide()', 'sibling.classList.remove(this.#classes.shown)')]),
    ('a constructed sibling engine is not destroyed with its owner', CT, 'hides the open first-level sibling',
     [(C, '\t\tfor (const engine of this.#owned) engine.destroy()\n', '')]),
    ('the sibling owner is not looked up', CT, 'hides an open sibling through the collapse a consumer constructed',
     [(C, '\t\tconst found = Collapse.#registry.find(sibling)\n\t\tif (found !== undefined) return found\n', '')]),
    # Cancellation
    ('the pre-change event return value is ignored', CT, 'untouched when a listener prevents',
     [(C, 'if (!emitEvent(this.#host, COLLAPSE_EVENTS.show, null, true)) return false', 'emitEvent(this.#host, COLLAPSE_EVENTS.show, null, true)'),
      (C, 'if (!emitEvent(this.#host, COLLAPSE_EVENTS.hide, null, true)) return false', 'emitEvent(this.#host, COLLAPSE_EVENTS.hide, null, true)')]),
    ('the mid-flight guard is dropped', CT, 'resolves false for a call while the panel or an open sibling transitions',
     [(C, '\t\t\tthis.#host.classList.contains(this.#classes.transition) ||\n', ''),
      (C, 'return panels.some((panel) => panel.classList.contains(this.#classes.transition))', 'return panels.length < 0')]),
    # Focus
    ('the panel takes focus', CT, 'keeps focus on the trigger',
     [(C, '\t\tconst size = dimension', '\t\thost.focus()\n\t\tconst size = dimension')]),
    # Motion
    ('a zero timer replaces the settle', CT, 'dispatches shown after the height transition finishes',
     [(C, SETTLE, 'await new Promise((resolve) => setTimeout(resolve, 0))', 2)]),
    ('a transitionend wait replaces the settle', CT, 'no animation created under staged reduced motion',
     [(C, SETTLE, "await new Promise((resolve) => host.addEventListener('transitionend', resolve, { once: true }))", 2)]),
    # Cleanup
    ('destruction omits the abort', CT, 'abandons the transition in flight on destruction',
     [(C, '\t\tthis.#controller.abort()\n\t\t// The claim', '\t\t// The claim'),
      (C, '\tdestroy(): void {\n\t\tif (this.#controller.signal.aborted) return\n', '\tdestroy(): void {\n')]),
    ('the triggers are not saved', CT, 'after a completed show, keeping consumer edits',
     [(C, "\t\t\tthis.#snapshot.save({ category: 'attribute', element: trigger, name: 'aria-expanded' })\n", '')]),
    ('the signal is ignored', CT, 'destroys the collapse when its signal aborts',
     [(C, '\t\tif (signal?.aborted) this.destroy()\n\t\telse {', '\t\tif (signal === undefined) this.destroy()\n\t\telse {')]),
    ('an owned sibling whose panel left the document is kept', CT, 'destroys a sibling collapse it constructed',
     [(C, '\t\tthis.#prune()\n', '', 2)]),
    # Events
    ('a completed event is cancelable', CT, 'dispatches bubbling events',
     [(C, 'emitEvent(host, COLLAPSE_EVENTS.shown, null, false)', 'emitEvent(host, COLLAPSE_EVENTS.shown, null, true)')]),
    ('the event guard admits every custom event', CT, 'dispatches bubbling events',
     [(V, 'return value instanceof CustomEvent && value.detail === null', 'return value instanceof CustomEvent')]),
    # Vocabulary
    ('the classes group is ignored', CT, 'only the replacing values when every group is replaced',
     [(C, 'isClassToken,\n\t\t\toptions?.classes,', 'isClassToken,\n\t\t\tundefined,')]),
    ('the attributes group is ignored', CT, 'only the replacing values when every group is replaced',
     [(C, 'isAttributeName,\n\t\t\toptions?.attributes,', 'isAttributeName,\n\t\t\tundefined,')]),
    ('the selectors group is ignored', CT, 'only the replacing values when every group is replaced',
     [(C, 'isSelector,\n\t\t\toptions?.selectors,', 'isSelector,\n\t\t\tundefined,')]),
    ('a class replacement is not validated', CT, 'refuses a group value',
     [(C, 'COLLAPSE_CLASSES,\n\t\t\tisClassToken,', 'COLLAPSE_CLASSES,\n\t\t\tisSelector,')]),
    ('the parent attribute is not coerced', CT, 'refuses a group value',
     [(C, '{ parent: parseElement },', '{ parent: (value: unknown) => value },')]),
    ('a default table is left unfrozen', CT, 'publishes frozen default tables',
     [(K, 'export const COLLAPSE_CLASSES: CollapseClassMap = Object.freeze({', 'export const COLLAPSE_CLASSES: CollapseClassMap = ({')]),
    # Ownership
    ('the host is not claimed', CT, 'refuses an invalid host and a second owner',
     [(C, '\t\tCollapse.#registry.claim(host, this)\n', '')]),
    ('the collapse records no trigger token', CT, 'restores a shared trigger to its original',
     [(C, "\t\t\tthis.#snapshot.save({ category: 'token', element: trigger, name: collapsed })\n", '')]),
    # Doors
    ('a write is not followed by a read', CT, 'stops writing when a reaction to its own write destroys it',
     [(C, '\t\twrite()\n\t\treturn this.#holds(change, present, absent)', '\t\twrite()\n\t\treturn true')]),
    ('the show dispatch is not followed by a read', CT, 'writes nothing when a listener to its show event destroys it',
     [(C, REFUSAL, '\t\tconst siblings = this.#siblings()\n')]),
    ('the change identity is not read', CT, 'another call took over during the await',
     [(C, '\t\t\tthis.#change === change &&\n', '')]),
    ('the token read is dropped at the write doors', CT, 'transition-token write a reaction answers',
     [(C, '\t\tconst during = [transition]\n', '\t\tconst during: string[] = []\n', 2)]),
    ('the completion read is dropped', CT, 'completing token write a reaction answers',
     [(C, '[...completed, transition], [], () =>', '[transition], [], () =>'),
      (C, 'completed, [transition], () =>', '[], [], () =>', 2),
      (C, '[...completed, transition], [shown], () =>', '[transition], [], () =>'),
      (C, 'completed, [transition, shown], () =>', '[], [], () =>')]),
    ('the hide size-write read is dropped', CT, 'stops a hide whose size write',
     [(C, '[shown], during, () => host.style.setProperty', '[], [], () => host.style.setProperty')]),
    ('the trigger-write door reads no token', CT, 'stops a hide whose trigger write',
     [(C, '#writeTriggers(change, during, [], triggers, true)', '#writeTriggers(change, [], [], triggers, true)'),
      (C, '#writeTriggers(change, during, [shown], collapsed, false)', '#writeTriggers(change, [], [], collapsed, false)')]),
    ('the hide doors after the removal admit the shown token', CT, 'stops a hide whose trigger write',
     [(C, '!this.#apply(change, during, [shown], () => host.classList.remove(this.#classes.host, shown))',
       '!this.#apply(change, during, [], () => host.classList.remove(this.#classes.host, shown))'),
      (C, '#writeTriggers(change, during, [shown], collapsed, false)', '#writeTriggers(change, during, [], collapsed, false)'),
      (C, 'this.#apply(change, during, [shown], () => host.style.removeProperty(dimension))',
       'this.#apply(change, during, [], () => host.style.removeProperty(dimension))'),
      (C, 'if (!this.#holds(change, during, [shown])) return false', 'if (!this.#holds(change, during, [])) return false')]),
    ('#prune runs after the refusals', CT, 'destroys a sibling collapse it constructed',
     [(C, '\t\tthis.#prune()\n\t\tif (this.#refused(true) || this.#transitioning(this.#siblings())) return false\n',
       '\t\tif (this.#refused(true) || this.#transitioning(this.#siblings())) return false\n\t\tthis.#prune()\n'),
      (C, '\t\tthis.#prune()\n\t\tif (this.#refused(false)) return false\n',
       '\t\tif (this.#refused(false)) return false\n\t\tthis.#prune()\n')]),
    # Delegate
    ('the same-host conflict is not refused', DT, 'refuses a click whose button host',
     [(D, '\t\tif (this.#conflicts(event.target)) return\n', '')]),
    ('the delegate has no collapse route', DT, 'toggles each panel a collapse trigger names',
     [(D, '\t\tthis.#routeCollapse(event, event.target)\n', '')]),
    ('the delegate prevents no anchor click', DT, 'toggles each panel a collapse trigger names',
     [(D, '\t\t\tevent.preventDefault()\n\t\t}\n\t\tfor (const panel', '\t\t}\n\t\tfor (const panel')]),
    ('the delegate drives the first named panel alone', DT, 'toggles each panel a collapse trigger names',
     [(D, 'for (const panel of readTargets(trigger, this.#collapse.attributes)) {', 'for (const panel of readTargets(trigger, this.#collapse.attributes).slice(0, 1)) {')]),
    ('the delegate routes by the default collapse selector', DT, 'routes collapse clicks by a replaced trigger selector',
     [(D, 'isSelector,\n\t\t\t\toptions?.collapse?.selectors,', 'isSelector,\n\t\t\t\tundefined,')]),
    ('the delegate ignores the collapse classes group', DT, 'routes collapse clicks by a replaced trigger selector',
     [(D, 'isClassToken,\n\t\t\t\toptions?.collapse?.classes,', 'isClassToken,\n\t\t\t\tundefined,')]),
    ('the per-click mark ignores the route', DT, 'the button host is the panel itself',
     [(D, 'const hosts = routes.get(route) ?? new WeakSet<HTMLElement>()', 'const hosts = routes.get(Button) ?? new WeakSet<HTMLElement>()'),
      (D, 'Delegate.#driven.set(event, routes.set(route, hosts.add(host)))', 'Delegate.#driven.set(event, routes.set(Button, hosts.add(host)))')]),
    ('the per-click mark is dropped', DT, 'drives each route once per click',
     [(D, '\t\tif (hosts.has(host)) return false\n', '')]),
    ('the delegate drives a panel outside its root', DT, 'leaves a panel outside its root alone',
     [(D, '\t\t\tif (!this.#root.contains(panel)) continue\n', '')]),
    ('the collapse mark is keyed on the trigger', DT, 'leaves a panel outside an inner root to the outer delegate',
     [(D, MARK, '\t\t\tif (!this.#root.contains(panel)) continue\n'),
      (D, '\t\tif (target instanceof HTMLAnchorElement || trigger instanceof HTMLAnchorElement) {', '\t\tif (!this.#mark(event, Collapse, trigger)) return\n\t\tif (target instanceof HTMLAnchorElement || trigger instanceof HTMLAnchorElement) {')]),
    ('the collapse mark comes before the containment check', DT, 'leaves a panel outside an inner root to the outer delegate',
     [(D, MARK, '\t\t\tif (!this.#mark(event, Collapse, panel)) continue\n\t\t\tif (!this.#root.contains(panel)) continue\n')]),
    ('the panel loop runs after the delegate is destroyed', DT, 'drives no route and no panel after a listener destroys the delegate',
     [(D, '\t\t\tif (this.#controller.signal.aborted) return\n\t\t\tif (!this.#root.contains(panel)) continue\n', '\t\t\tif (!this.#root.contains(panel)) continue\n')]),
    ('the delegate does not validate the collapse classes', DT, 'refuses a collapse group value',
     [(D, "'COLLAPSE_OPTION_INVALID',\n\t\t\t\tCOLLAPSE_CLASSES,\n\t\t\t\tisClassToken,", "'COLLAPSE_OPTION_INVALID',\n\t\t\t\tCOLLAPSE_CLASSES,\n\t\t\t\tisSelector,")]),
    # Guards, parser, barrel
    ('the collapse event guard admits a payload', VT, 'requires a custom event whose detail',
     [(V, 'return value instanceof CustomEvent && value.detail === null', 'return value instanceof CustomEvent')]),
    ('the collapse event guard reads detail uncontained', VT, 'returns false when a prototype or detail accessor throws',
     [(V, '\ttry {\n\t\treturn value instanceof CustomEvent && value.detail === null\n\t} catch {\n\t\treturn false\n\t}', '\treturn value instanceof CustomEvent && value.detail === null')]),
    ('the parser returns the first match whatever it is', PT, 'returns undefined for a selector matching no HTML element',
     [(P, '\t\treturn Array.from(document.querySelectorAll(value)).find(instanceOf(HTMLElement))', '\t\treturn document.querySelector(value) ?? undefined')]),
    ('the parser type-checks the first match only', PT, 'returns the first HTML element among the matches',
     [(P, '\t\treturn Array.from(document.querySelectorAll(value)).find(instanceOf(HTMLElement))', '\t\tconst first = document.querySelector(value)\n\t\treturn instanceOf(HTMLElement)(first) ? first : undefined')]),
    ('the parser refuses an element', PT, 'returns the first HTML element a selector matches',
     [(P, '\tif (instanceOf(HTMLElement)(value)) return value\n', '')]),
    ('the barrel omits the collapse and the parser', IT, 'exports the browser surface',
     [(I, "export * from './parsers.js'\n", ''), (I, "export * from './Collapse.js'\n", '')]),
]


def digest(path):
    return hashlib.sha256((ROOT / path).read_bytes()).hexdigest()


def run(test):
    if REPORT.exists():
        REPORT.unlink()
    done = subprocess.run(VITEST + [test], cwd=ROOT, capture_output=True, text=True,
                          encoding='utf-8', errors='replace', timeout=300)
    if not REPORT.exists():
        return done.returncode, None, re.sub(r'\x1b\[[0-9;]*m', '', done.stdout + done.stderr)[-600:]
    report = json.loads(REPORT.read_text(encoding='utf-8'))
    cases = [case for result in report['testResults'] for case in result['assertionResults']]
    failed = [case['title'] for case in cases if case['status'] == 'failed']
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
        for test in [CT, DT, VT, PT, IT]:
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
