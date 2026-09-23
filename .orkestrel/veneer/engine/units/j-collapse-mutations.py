# J-COLLAPSE red-first record: applies each named mutation to an owned source file, runs the
# proofs it names, records the failing count, and writes the original bytes back before the next.
import subprocess, sys, re, pathlib

ROOT = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer-collapse')
VITEST = [
    'node', 'node_modules/vitest/vitest.mjs', 'run', '--config', 'vite.config.ts', '--no-cache',
    '--reporter=dot', '--project', 'src:browser',
]
C = 'src/browser/Collapse.ts'
D = 'src/browser/Delegate.ts'
V = 'src/browser/validators.ts'
P = 'src/browser/parsers.ts'
K = 'src/browser/constants.ts'
I = 'src/browser/index.ts'
CT = 'tests/src/browser/Collapse.test.ts'
DT = 'tests/src/browser/Delegate.test.ts'

SETTLE = 'await settleAnimations(host, this.#controller.signal)'

MUTATIONS = [
    ('show writes no transition token', [(C, "if (!this.#apply(change, () => host.classList.add(transition))) return false\n\t\tif (!this.#apply(change, () => host.classList.remove(this.#classes.host))) return false", "if (!this.#apply(change, () => host.classList.remove(this.#classes.host))) return false")], CT, 'shows through the transition token'),
    ('show writes no pixel size', [(C, "host.style.setProperty(dimension, `${size}px`))) return false\n\t\tawait", "host.style.setProperty(dimension, ''))) return false\n\t\tawait")], CT, 'shows through the transition token'),
    ('the dimension is always height', [(C, "return this.#host.classList.contains(this.#classes.horizontal) ? 'width' : 'height'", "return 'height'")], CT, 'sizes the width'),
    ('the sibling is hidden without its engine and events', [(C, 'void this.#acquire(panel, parent).hide()', 'panel.classList.remove(this.#classes.shown)')], CT, 'hides the open first-level sibling'),
    ('a constructed sibling engine is not destroyed with its owner', [(C, '\t\tfor (const engine of this.#siblings) engine.destroy()\n', '')], CT, 'hides the open first-level sibling'),
    ('the sibling owner is not looked up', [(C, "const found = Collapse.#registry.find(panel)\n\t\tif (found !== undefined) return found\n", '')], CT, 'hides an open sibling through the collapse a consumer constructed'),
    ('the pre-change event return value is ignored', [(C, 'if (!emitEvent(this.#host, COLLAPSE_EVENTS.show, undefined, true)) return false', 'emitEvent(this.#host, COLLAPSE_EVENTS.show, undefined, true)'), (C, 'if (!emitEvent(this.#host, COLLAPSE_EVENTS.hide, undefined, true)) return false', 'emitEvent(this.#host, COLLAPSE_EVENTS.hide, undefined, true)')], CT, 'untouched when a listener prevents'),
    ('the mid-flight guard is dropped', [(C, "\t\t\tthis.#host.classList.contains(this.#classes.transition) ||\n", ''), (C, 'return panels.some((panel) => panel.classList.contains(this.#classes.transition))', 'return panels.length < 0')], CT, 'resolves false for a call while the panel or an open sibling transitions'),
    ('the panel takes focus', [(C, '\t\tconst size = dimension', '\t\thost.focus()\n\t\tconst size = dimension')], CT, 'keeps focus on the trigger'),
    ('a zero timer replaces the settle', [(C, SETTLE, 'await new Promise((resolve) => setTimeout(resolve, 0))', 2)], CT, 'dispatches shown after the height transition finishes'),
    ('a transitionend wait replaces the settle', [(C, SETTLE, "await new Promise((resolve) => host.addEventListener('transitionend', resolve, { once: true }))", 2)], CT, 'no animation created under staged reduced motion'),
    ('destruction omits the abort', [(C, '\t\tthis.#controller.abort()\n\t\t// The claim', '\t\t// The claim'), (C, '\tdestroy(): void {\n\t\tif (this.#controller.signal.aborted) return\n', '\tdestroy(): void {\n')], CT, 'abandons the transition in flight on destruction'),
    ('the triggers are not saved', [(C, "\t\t\tthis.#snapshot.save({ category: 'attribute', element: trigger, name: 'aria-expanded' })\n", '')], CT, 'after a completed show, keeping consumer edits'),
    ('a completed event is cancelable', [(C, 'emitEvent(host, COLLAPSE_EVENTS.shown, undefined, false)', 'emitEvent(host, COLLAPSE_EVENTS.shown, undefined, true)')], CT, 'dispatches bubbling events'),
    ('the event guard admits every custom event', [(V, 'return value instanceof CustomEvent && value.detail === null', 'return value instanceof CustomEvent')], CT, 'dispatches bubbling events'),
    ('the classes group is ignored', [(C, 'isClassToken,\n\t\t\toptions?.classes,', 'isClassToken,\n\t\t\tundefined,')], CT, 'only the replacing values when every group is replaced'),
    ('the attributes group is ignored', [(C, 'isAttributeName,\n\t\t\toptions?.attributes,', 'isAttributeName,\n\t\t\tundefined,')], CT, 'only the replacing values when every group is replaced'),
    ('the selectors group is ignored', [(C, 'isSelector,\n\t\t\toptions?.selectors,', 'isSelector,\n\t\t\tundefined,')], CT, 'only the replacing values when every group is replaced'),
    ('a class replacement is not validated', [(C, 'COLLAPSE_CLASSES,\n\t\t\tisClassToken,', 'COLLAPSE_CLASSES,\n\t\t\tisSelector,')], CT, 'refuses a group value'),
    ('the parent attribute is not coerced', [(C, '{ parent: parseElement },', '{ parent: (value: unknown) => value },')], CT, 'refuses a group value'),
    ('the host is not claimed', [(C, '\t\tCollapse.#registry.claim(host, this)\n', '')], CT, 'refuses an invalid host and a second owner'),
    ('the signal is ignored', [(C, "\t\tif (signal?.aborted) this.destroy()\n\t\telse {", "\t\tif (signal === undefined) this.destroy()\n\t\telse {")], CT, 'destroys the collapse when its signal aborts'),
    ('a write is not followed by a read', [(C, '\t\twrite()\n\t\treturn !this.#taken(change)', '\t\twrite()\n\t\treturn true')], CT, 'stops writing when a reaction to its own write destroys it'),
    ('the show dispatch is not followed by a read', [(C, '\t\tconst open = this.#open()\n\t\tif (this.#refused(true) || this.#moving(open)) return false\n', '\t\tconst open = this.#open()\n')], CT, 'writes nothing when a listener to its show event destroys it'),
    ('the show dispatch is not followed by a read (re-entry)', [(C, '\t\tconst open = this.#open()\n\t\tif (this.#refused(true) || this.#moving(open)) return false\n', '\t\tconst open = this.#open()\n')], CT, 'runs one transition and one shown event'),
    ('the change identity is not read after the await', [(C, 'return this.#controller.signal.aborted || this.#change !== change', 'return this.#controller.signal.aborted')], CT, 'another call took over during the await'),
    ('the collapse records no trigger token (agreeing overlap)', [(C, "\t\t\tthis.#snapshot.save({ category: 'token', element: trigger, name: collapsed })\n", '')], CT, 'restores a shared trigger to its original'),
    ('the collapse records no trigger token (disagreeing overlap)', [(C, "\t\t\tthis.#snapshot.save({ category: 'token', element: trigger, name: collapsed })\n", '')], CT, 'restores a shared trigger through the restoration that started first'),
    ('a default table is left unfrozen', [(K, "export const COLLAPSE_CLASSES: CollapseClassMap = Object.freeze({", "export const COLLAPSE_CLASSES: CollapseClassMap = ({")], CT, 'publishes frozen default tables'),
    ('a trigger reads its first panel alone', [(C, '!readTargets(trigger, this.#attributes).some(', '!readTargets(trigger, this.#attributes).slice(0, 1).some(')], CT, 'collapses a trigger naming several panels only when none of them is shown'),
    ('the triggers are read once', [(C, '\t#change: object | undefined\n', '\t#change: object | undefined\n\t#once: readonly HTMLElement[] | undefined\n'), (C, '\t\treturn Array.from(this.#host.ownerDocument.querySelectorAll(this.#selectors.trigger))\n\t\t\t.filter(instanceOf(HTMLElement))\n\t\t\t.filter((trigger) => readTargets(trigger, this.#attributes).includes(this.#host))\n', '\t\tthis.#once ??= Array.from(this.#host.ownerDocument.querySelectorAll(this.#selectors.trigger))\n\t\t\t.filter(instanceOf(HTMLElement))\n\t\t\t.filter((trigger) => readTargets(trigger, this.#attributes).includes(this.#host))\n\t\treturn this.#once\n')], CT, 'shows through the transition token'),
    ('the delegate has no collapse route', [(D, '\t\tthis.#routeCollapse(event, event.target)\n', '')], DT, 'toggles each panel a collapse trigger names'),
    ('the delegate prevents no anchor click', [(D, '\t\t\tevent.preventDefault()\n\t\t}\n\t\tfor (const panel', '\t\t}\n\t\tfor (const panel')], DT, 'toggles each panel a collapse trigger names'),
    ('the delegate drives the first named panel alone', [(D, 'for (const panel of readTargets(trigger, this.#collapse.attributes)) {', 'for (const panel of readTargets(trigger, this.#collapse.attributes).slice(0, 1)) {')], DT, 'toggles each panel a collapse trigger names'),
    ('the delegate routes by the default collapse selector', [(D, 'isSelector,\n\t\t\t\toptions?.collapse?.selectors,', 'isSelector,\n\t\t\t\tundefined,')], DT, 'routes collapse clicks by a replaced trigger selector'),
    ('the delegate ignores the collapse classes group', [(D, 'isClassToken,\n\t\t\t\toptions?.collapse?.classes,', 'isClassToken,\n\t\t\t\tundefined,')], DT, 'routes collapse clicks by a replaced trigger selector'),
    ('the per-click mark ignores the route', [(D, 'const hosts = routes.get(route) ?? new WeakSet<HTMLElement>()', 'const hosts = routes.get(Button) ?? new WeakSet<HTMLElement>()'), (D, 'Delegate.#driven.set(event, routes.set(route, hosts.add(host)))', 'Delegate.#driven.set(event, routes.set(Button, hosts.add(host)))')], DT, 'drives each route once per click'),
    ('the per-click mark is dropped', [(D, '\t\tif (hosts.has(host)) return false\n', '')], DT, 'drives each route once per click'),
    ('the delegate drives a panel outside its root', [(D, '\t\t\tif (!this.#root.contains(panel)) continue\n', '')], DT, 'leaves a panel outside its root alone'),
    ('the delegate does not validate the collapse classes', [(D, "'COLLAPSE_OPTION_INVALID',\n\t\t\t\tCOLLAPSE_CLASSES,\n\t\t\t\tisClassToken,", "'COLLAPSE_OPTION_INVALID',\n\t\t\t\tCOLLAPSE_CLASSES,\n\t\t\t\tisSelector,")], DT, 'refuses a collapse group value'),
    ('the panel loop runs after the delegate is destroyed', [(D, '\t\t\tif (this.#controller.signal.aborted) return\n\t\t\tif (!this.#root.contains(panel)) continue\n', '\t\t\tif (!this.#root.contains(panel)) continue\n')], DT, 'drives no route and no panel after a listener destroys the delegate'),
    ('the collapse event guard admits a payload', [(V, 'return value instanceof CustomEvent && value.detail === null', 'return value instanceof CustomEvent')], 'tests/src/browser/validators.test.ts', 'requires a custom event whose detail'),
    ('the collapse event guard reads detail uncontained', [(V, "\ttry {\n\t\treturn value instanceof CustomEvent && value.detail === null\n\t} catch {\n\t\treturn false\n\t}", "\treturn value instanceof CustomEvent && value.detail === null")], 'tests/src/browser/validators.test.ts', 'returns false when a prototype or detail accessor throws'),
    ('the parser returns a matched element of any kind', [(P, "\t\treturn instanceOf(HTMLElement)(element) ? element : undefined", "\t\treturn element ?? undefined")], 'tests/src/browser/parsers.test.ts', 'returns undefined for a selector matching no HTML element'),
    ('the parser refuses an element', [(P, "\tif (instanceOf(HTMLElement)(value)) return value\n", '')], 'tests/src/browser/parsers.test.ts', 'returns the first HTML element a selector matches'),
    ('the barrel omits the collapse and the parser', [(I, "export * from './parsers.js'\n", ''), (I, "export * from './Collapse.js'\n", '')], 'tests/src/browser/index.test.ts', 'exports the browser surface'),
]


def run(test, pattern):
    command = VITEST + [test, '-t', re.escape(pattern)]
    done = subprocess.run(command, cwd=ROOT, capture_output=True, text=True, encoding='utf-8', errors='replace', timeout=240, shell=False)
    text = re.sub(r'\x1b\[[0-9;]*m', '', done.stdout + done.stderr)
    tests = re.search(r'Tests\s+(.*)', text)
    return done.returncode, tests.group(1).strip() if tests else text[-400:]


def main():
    log = []
    wanted = sys.argv[1:]
    for label, edits, test, pattern in MUTATIONS:
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
                    raise RuntimeError(f'{label}: expected {count} match in {path}, found {text.count(old)}')
                file.write_bytes(text.replace(old, new).encode('utf-8'))
            code, tally = run(test, pattern)
            line = f'RED  exit={code} | {label} | {test} -t "{pattern}" | {tally}'
        except Exception as error:
            line = f'ERR  | {label} | {error}'
        finally:
            for path, data in originals.items():
                (ROOT / path).write_bytes(data)
        print(line, flush=True)
        log.append(line)
    for test in [] if wanted else [CT, DT, 'tests/src/browser/validators.test.ts', 'tests/src/browser/parsers.test.ts', 'tests/src/browser/index.test.ts']:
        code, tally = run(test, '')
        line = f'GREEN exit={code} | {test} | {tally}'
        print(line, flush=True)
        log.append(line)


main()
