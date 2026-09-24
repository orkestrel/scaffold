# J-DROPDOWN mutation instrument, shaped on the retained j-collapse-mutations-3.py: applies each named
# mutation to an owned source file, runs the WHOLE test file it names (no -t), reads Vitest's JSON
# report, and records every failing case, then writes the original bytes back and checks every owned
# source's digest against the digest taken before the run, writing that receipt into the log.
# `python mutations.py --dry` checks that every edit's text occurs the expected number of times and
# runs nothing.
import hashlib, json, pathlib, re, subprocess, sys

ROOT = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/dropdown')
REPORT = ROOT / 'tmp/j-dropdown/mutation-report.json'
LOG = ROOT / 'tmp/j-dropdown/mutations.log.txt'
VITEST = [
    'node', 'node_modules/vitest/vitest.mjs', 'run', '--config', 'vite.config.ts', '--no-cache',
    '--project', 'src:browser', '--reporter=json', f'--outputFile={REPORT}',
]
DD = 'src/browser/Dropdown.ts'
PL = 'src/browser/Placement.ts'
D = 'src/browser/Delegate.ts'
V = 'src/browser/validators.ts'
P = 'src/browser/parsers.ts'
H = 'src/browser/helpers.ts'
K = 'src/browser/constants.ts'
I = 'src/browser/index.ts'
DDT = 'tests/src/browser/Dropdown.test.ts'
PLT = 'tests/src/browser/Placement.test.ts'
DT = 'tests/src/browser/Delegate.test.ts'
VT = 'tests/src/browser/validators.test.ts'
PT = 'tests/src/browser/parsers.test.ts'
HT = 'tests/src/browser/helpers.test.ts'
IT = 'tests/src/browser/index.test.ts'
OWNED = [DD, PL, D, V, P, H, K, I]

SHOW_EVENT = 'if (!emitEvent(this.#host, DROPDOWN_EVENTS.show, { click: undefined }, true)) return false'
HIDE_EVENT = 'if (!emitEvent(this.#host, DROPDOWN_EVENTS.hide, { click }, true)) return false'
SHOW_REREAD = ('\t\t// disable the toggle, so every refusal is read again before any write.\n'
               '\t\tif (this.#refused(true)) return false\n')
PLACEMENT_DOOR = ('\t\tif (this.#controller.signal.aborted) {\n\t\t\tthis.#placement = undefined\n'
                  '\t\t\tplacement.destroy()\n\t\t\treturn false\n\t\t}\n')
RESET = ('\t\tPOPOVER_PROPERTIES.forEach((name, index) => {\n\t\t\tconst value = unpromoted[index]\n'
         '\t\t\tif (value !== undefined && style.getPropertyValue(name) !== value) {\n'
         '\t\t\t\tthis.#write(element, name, value)\n\t\t\t}\n\t\t})\n')
PREVIOUS_MENU = ('\t\tfor (\n\t\t\tlet sibling = host.previousElementSibling;\n\t\t\tsibling;\n'
                 '\t\t\tsibling = sibling.previousElementSibling\n\t\t) {\n'
                 '\t\t\tif (sibling.matches(selector) && isInstance(sibling, HTMLElement)) return sibling\n\t\t}\n'
                 '\t\treturn Array.from(host.parentElement?.querySelectorAll(selector) ?? []).find(\n'
                 '\t\t\tinstanceOf(HTMLElement),\n\t\t)\n')
PREVIOUS_TOGGLE = ('\t\tfor (\n\t\t\tlet sibling = menu.previousElementSibling;\n\t\t\tsibling;\n'
                   '\t\t\tsibling = sibling.previousElementSibling\n\t\t) {\n'
                   '\t\t\tif (sibling.matches(selector)) return this.#within(sibling)\n\t\t}\n')
ENTRIES = ('\t\t\tengine.menu.querySelectorAll(\n'
           '\t\t\t\t`:is(${this.#dropdown.selectors.entry}):not(.${CSS.escape(disabled)}, :disabled)`,\n'
           '\t\t\t),\n\t\t)\n\t\t\t.filter(instanceOf(HTMLElement))\n'
           '\t\t\t.filter((entry) => entry.checkVisibility())\n')

MUTATIONS = [
    # Dropdown: the sequence
    ('the menu is never promoted', DDT, 'opens the menu in the top layer',
     [(DD, 'static: this.#static || host.closest(this.#selectors.navbar) !== null,', 'static: true,')]),
    ('the toggle is not focused', DDT, 'opens the menu in the top layer',
     [(DD, '\t\tif (!this.#apply(change, false, () => host.focus())) return false\n', '')]),
    ('the toggle expansion is not written at show', DDT, 'opens the menu in the top layer',
     [(DD, "\t\tif (!this.#apply(change, false, () => host.setAttribute('aria-expanded', 'true'))) return false\n", '')]),
    ('the toggle shown token is not written', DDT, 'opens the menu in the top layer',
     [(DD, '\t\tif (!this.#apply(change, true, () => host.classList.add(shown))) return false\n', '')]),
    ('the side is not written at show', DDT, 'opens the menu in the top layer',
     [(DD, '\t\tif (!this.#apply(change, true, () => placement.update())) return false\n', '')]),
    ('the hide leaves the menu promoted', DDT, 'opens the menu in the top layer',
     [(DD, '\t\t\tplacement?.destroy()\n\t\t\tif (!this.#holds(change, true)) return false\n', '\t\t\tif (!this.#holds(change, true)) return false\n')]),
    ('the toggle expansion is not written at hide', DDT, 'opens the menu in the top layer',
     [(DD, "() => host.setAttribute('aria-expanded', 'false')", '() => undefined')]),
    ('the direction tokens are ignored', DDT, 'takes the side and edge',
     [(DD, "\t\tif (tokens?.contains(end)) return 'right-start'\n", ''),
      (DD, "\t\tif (tokens?.contains(start)) return 'left-start'\n", '')]),
    ('the alignment property is ignored', DDT, 'takes the side and edge',
     [(DD, "getPropertyValue('--bs-position').trim() === 'end'", "getPropertyValue('--bs-position').trim() === 'never'")]),
    ('the navbar is not read', DDT, 'leaves the menu in flow',
     [(DD, 'static: this.#static || host.closest(this.#selectors.navbar) !== null,', 'static: this.#static,')]),
    ('the offset attribute is not read', DDT, 'offsets the menu from the offset attribute',
     [(DD, '{ offset: parseOffset, static: parseStatic }', '{ static: parseStatic }')]),
    ('the reference attribute is not read', DDT, 'offsets the menu from the offset attribute',
     [(DD, 'this.#reference = options?.reference ?? this.#refer(host)', 'this.#reference = options?.reference ?? host')]),
    # Dropdown: light dismissal
    ('the dismissal switches are ignored', DDT, 'closes only on the clicks its dismissal allows',
     [(DD, '\t\tif (!(inside ? this.#dismiss.inside : this.#dismiss.outside)) return\n', '')]),
    ('a click on the toggle counts as a dismissal', DDT, 'keeps the menu open for a click on its toggle',
     [(DD, '\t\tif (path.includes(this.#host)) return\n', '')]),
    ('a form control inside the menu counts as a dismissal', DDT, 'keeps the menu open for a click on its toggle',
     [(DD, '/input|select|option|textarea|form/i.test(target.tagName)', 'false')]),
    ('the secondary button counts as a dismissal', DDT, 'keeps the menu open for a click on its toggle',
     [(DD, '\t\tif (click?.button === 2) return\n', '')]),
    ('every key release counts as a dismissal', DDT, 'keeps the menu open for a click on its toggle',
     [(DD, "!(isInstance(event, KeyboardEvent) && event.key === 'Tab')", "!isInstance(event, KeyboardEvent)")]),
    ('the dismissing click is not carried', DDT, 'closes on a click outside',
     [(DD, '\t\tthis.#conceal(click)\n\t}\n', '\t\tthis.#conceal(undefined)\n\t}\n')]),
    ('the document clicks are not heard', DDT, 'closes on a click outside',
     [(DD, "owner.addEventListener('click',", "owner.addEventListener('dblclick',")]),
    # Dropdown: refusals and events
    ('a disabled toggle is not refused', DDT, 'refuses to show or hide a disabled toggle',
     [(DD, ' ||\n\t\t\tthis.#host.matches(`.${CSS.escape(this.#classes.disabled)}, :disabled`)', '')]),
    ('the pre-change event return value is ignored', DDT, 'untouched when a listener prevents',
     [(DD, SHOW_EVENT, 'emitEvent(this.#host, DROPDOWN_EVENTS.show, { click: undefined }, true)'),
      (DD, HIDE_EVENT, 'emitEvent(this.#host, DROPDOWN_EVENTS.hide, { click }, true)')]),
    ('a completed event is cancelable', DDT, 'dispatches bubbling events on the toggle',
     [(DD, 'emitEvent(host, DROPDOWN_EVENTS.shown, { click: undefined }, false)', 'emitEvent(host, DROPDOWN_EVENTS.shown, { click: undefined }, true)')]),
    ('the event guard admits a payload-less event', DDT, 'dispatches bubbling events on the toggle',
     [(V, "\t\tif (typeof detail !== 'object' || detail === null) return false\n", "\t\tif (typeof detail !== 'object' || detail === null) return true\n")]),
    # Dropdown: vocabulary, options, ownership
    ('the classes group is ignored', DDT, 'every group is replaced',
     [(DD, 'isClassToken, options?.classes),', 'isClassToken, undefined),'),
      (DD, '\t\t\t\toptions?.classes?.center,\n', '\t\t\t\tundefined,\n')]),
    ('the attributes group is ignored', DDT, 'every group is replaced',
     [(DD, 'isAttributeName,\n\t\t\toptions?.attributes,', 'isAttributeName,\n\t\t\tundefined,')]),
    ('the selectors group is ignored', DDT, 'every group is replaced',
     [(DD, 'isSelector,\n\t\t\toptions?.selectors,', 'isSelector,\n\t\t\tundefined,')]),
    ('a class replacement is not validated', DDT, 'refuses a group value that fails validation',
     [(DD, 'resolveVocabulary(\'DROPDOWN_OPTION_INVALID\', classes, isClassToken, options?.classes)', 'resolveVocabulary(\'DROPDOWN_OPTION_INVALID\', classes, isSelector, options?.classes)')]),
    ('the auto-close attribute is not coerced', DDT, 'refuses a group value that fails validation',
     [(DD, '{ dismiss: parseDismiss },', '{ dismiss: (value: unknown) => (value === null ? undefined : { inside: true }) },')]),
    ('the menu is searched after the toggle alone', DDT, 'finds the menu after the toggle',
     [(DD, PREVIOUS_MENU, '\t\treturn undefined\n')]),
    ('the toggle is not claimed', DDT, 'refuses an invalid host and a second owner',
     [(DD, '\t\tDropdown.#registry.claim(host, this)\n', '')]),
    ('the signal is ignored', DDT, 'destroys the dropdown when its signal aborts',
     [(DD, '\t\tif (signal?.aborted) this.destroy()\n\t\telse {', '\t\tif (signal === undefined) this.destroy()\n\t\telse {')]),
    ('destruction leaves the placement', DDT, 'closes the open menu without events on destruction',
     [(DD, '\t\tplacement?.destroy()\n\t\tthis.#snapshot.restore()\n', '\t\tthis.#snapshot.restore()\n')]),
    ('a default table is left unfrozen', DDT, 'publishes frozen default tables',
     [(K, "center: Object.freeze({ down: 'dropdown-center', up: 'dropup-center' }),", "center: { down: 'dropdown-center', up: 'dropup-center' },")]),
    # Dropdown: doors
    ('a write is not followed by a read', DDT, 'stops writing when a reaction to its own write destroys it',
     [(DD, '\t\twrite()\n\t\treturn this.#holds(change, shown)', '\t\twrite()\n\t\treturn true')]),
    ('the show dispatch is not followed by a read', DDT, 'writes nothing when a listener to its show event destroys it',
     [(DD, SHOW_REREAD, '\t\t// disable the toggle, so every refusal is read again before any write.\n')]),
    ('a change in flight is not refused', DDT, 'while a change is in flight',
     [(DD, '\t\t\tthis.#change !== undefined ||\n', '')]),
    ('the placement door is not read', DDT, 'the toggle focus or the menu promotion destroys it',
     [(DD, PLACEMENT_DOOR, '')]),
    ('the menu token door is dropped at show', DDT, 'stops a show whose menu token write',
     [(DD, '\t\tif (!this.#apply(change, true, () => menu.classList.add(shown))) return false\n', '\t\tmenu.classList.add(shown)\n')]),
    ('the menu token door is dropped at hide', DDT, 'stops a hide whose menu token removal',
     [(DD, '\t\t\tif (!this.#apply(change, false, () => menu.classList.remove(shown))) return false\n', '\t\t\tmenu.classList.remove(shown)\n')]),
    # Placement
    ('the element is not promoted', PLT, 'promotes the element to the top layer',
     [(PL, '\t\telement.showPopover()\n', '')]),
    ('the popover reset is skipped', PLT, 'reads the same border, padding',
     [(PL, RESET, '')]),
    ('the element keeps its own position', PLT, 'flips an element the cascade positions absolute',
     [(PL, "\t\tthis.#write(element, 'position', 'fixed')\n", '')]),
    ('every position anchors at the bottom start', PLT, 'anchors each placement position',
     [(PL, 'const area = PLACEMENT_AREAS[options?.position ?? PLACEMENT_DEFAULTS.position]', "const area = 'bottom span-right'")]),
    ('the offset margins are dropped', PLT, 'shifts the element away',
     [(PL, '`${side === \'bottom\' ? distance : vertical ? 0 : skid}px`', "'0px'"),
      (PL, '`${side === \'left\' ? distance : vertical ? -skid : 0}px`', "'0px'"),
      (PL, '`${side === \'top\' ? distance : vertical ? 0 : -skid}px`', "'0px'"),
      (PL, '`${side === \'right\' ? distance : vertical ? skid : 0}px`', "'0px'")]),
    ('the default fallback is none', PLT, 'flips to the opposite side',
     [(PL, "\t\t\t\t\t? 'flip-block'\n\t\t\t\t\t: 'flip-inline'", "\t\t\t\t\t? 'none'\n\t\t\t\t\t: 'none'")]),
    ('the listed fallbacks are ignored', PLT, 'flips to the opposite side',
     [(PL, 'fallbacks.map((fallback) => PLACEMENT_AREAS[fallback]).join(\', \')', "'flip-block'")]),
    ('a static placement promotes', PLT, 'leaves a static element in flow',
     [(PL, '\t\tif (this.#static) {\n\t\t\tthis.#snapshot.save', '\t\tif (this.#static && false) {\n\t\t\tthis.#snapshot.save')]),
    ('the reference resize is not observed', PLT, 'writes the side once the element renders',
     [(PL, '\t\tthis.#observer.observe(reference)\n', '')]),
    ('the scroll end is not heard', PLT, 'writes the side once the element renders',
     [(PL, "addEventListener('scrollend',", "addEventListener('scrollstart',")]),
    ('an anchor name the reference carries is replaced', PLT, 'keeps an anchor name',
     [(PL, "names === 'none' ? anchor : `${names}, ${anchor}`", 'anchor')]),
    ('the placement attributes group is ignored', PLT, 'writes only the replacing attribute names',
     [(PL, 'isAttributeName,\n\t\t\toptions?.attributes,', 'isAttributeName,\n\t\t\tundefined,')]),
    ('a detached element is not refused', PLT, 'refuses an attribute name that fails validation',
     [(PL, '\t\tif (!this.#static && !element.isConnected) {', '\t\tif (!this.#static && element === null) {')]),
    ('destruction restores nothing', PLT, 'promotes the element to the top layer',
     [(PL, '\t\tif (this.#element.matches(\':popover-open\')) this.#element.hidePopover()\n\t\tthis.#snapshot.restore()\n', '')]),
    ('the side is the bottom gap alone', PLT, 'anchors each placement position',
     [(PL, 'return gaps.reduce((widest, gap) => (gap[1] > widest[1] ? gap : widest))[0]', "return 'bottom'")]),
    # Delegate
    ('the delegate has no dropdown route', DT, 'toggles a dropdown on a click inside its toggle',
     [(D, '\t\tthis.#routeDropdown(event, event.target)\n', '')]),
    ('the dropdown route prevents nothing', DT, 'toggles a dropdown on a click inside its toggle',
     [(D, '\t\tif (toggle === undefined || !this.#mark(event, Dropdown, toggle)) return\n\t\tevent.preventDefault()\n\t\tconst engine = Dropdown.find(toggle) ?? this.#acquire(new Dropdown(toggle, this.#dropdown))\n\t\tvoid engine.toggle()',
       '\t\tif (toggle === undefined || !this.#mark(event, Dropdown, toggle)) return\n\t\tconst engine = Dropdown.find(toggle) ?? this.#acquire(new Dropdown(toggle, this.#dropdown))\n\t\tvoid engine.toggle()')]),
    ('the delegate routes by the default dropdown selector', DT, 'routes dropdown clicks by a replaced trigger selector',
     [(D, 'isSelector,\n\t\t\t\toptions?.dropdown?.selectors,', 'isSelector,\n\t\t\t\tundefined,')]),
    ('the delegate ignores the dropdown classes group', DT, 'routes dropdown clicks by a replaced trigger selector',
     [(D, '\t\t\t\t\toptions?.dropdown?.classes,\n', '\t\t\t\t\tundefined,\n')]),
    ('the delegate has no key route', DT, 'opens the menu on a trusted arrow key',
     [(D, "this.#root.addEventListener('keydown',", "this.#root.addEventListener('keyup',")]),
    ('the arrow keys wrap among the entries', DT, 'opens the menu on a trusted arrow key',
     [(D, "computeNeighbor(entries, current, event.key === 'ArrowDown', !inside)", "computeNeighbor(entries, current, event.key === 'ArrowDown', true)")]),
    ('disabled and unrendered entries take focus', DT, 'opens the menu on a trusted arrow key',
     [(D, ENTRIES, '\t\t\tengine.menu.querySelectorAll(this.#dropdown.selectors.entry),\n\t\t).filter(instanceOf(HTMLElement))\n')]),
    ('a text field keeps no key from the route', DT, 'inside a text field ignores every other key',
     [(D, '\t\tif (vertical && /input|textarea/i.test(target.tagName)) return\n', '')]),
    ('Escape leaves focus in the menu', DT, 'hides the menu on Escape',
     [(D, '\t\t\tvoid engine.hide()\n\t\t\ttoggle.focus()\n', '\t\t\tvoid engine.hide()\n')]),
    ('a disabled toggle is routed', DT, 'ignores clicks and keys on a toggle carrying the disabled',
     [(D, 'return `:is(${selectors.trigger}):not(.${CSS.escape(classes.disabled)}, :disabled)`', 'return `:is(${selectors.trigger})`')]),
    ('a key inside a menu looks after the menu alone', DT, 'finds the toggle for a key inside a menu',
     [(D, PREVIOUS_TOGGLE, '')]),
    ('the dropdown mark is dropped', DT, 'drives a dropdown once per click and per key under nested roots',
     [(D, '\t\tif (toggle === undefined || !this.#mark(event, Dropdown, toggle)) return\n\t\tevent.preventDefault()\n\t\tconst engine = Dropdown.find(toggle) ?? this.#acquire(new Dropdown(toggle, this.#dropdown))\n\t\tvoid engine.toggle()',
       '\t\tif (toggle === undefined) return\n\t\tevent.preventDefault()\n\t\tconst engine = Dropdown.find(toggle) ?? this.#acquire(new Dropdown(toggle, this.#dropdown))\n\t\tvoid engine.toggle()')]),
    ('the dropdown toggle joins no conflict', DT, 'refuses a click whose dropdown toggle is its button host',
     [(D, '\t\tif (toggle !== undefined && Dropdown.find(toggle) === undefined) constructed.push(toggle)\n', '')]),
    ('the delegate discards every dropdown it owns', DT, 'releases a dropdown whose toggle left the root',
     [(D, ' &&\n\t\t\t\tDropdown.find(engine.host) !== engine\n', '\n')]),
    ('the delegate does not validate the dropdown classes', DT, 'refuses a dropdown group value',
     [(D, '\t\t\t\t\tclasses,\n\t\t\t\t\tisClassToken,\n', '\t\t\t\t\tclasses,\n\t\t\t\t\tisSelector,\n')]),
    # Guards, parsers, helpers, barrel
    ('the dropdown event guard admits any click', VT, 'requires a custom event whose detail is an object',
     [(V, '\t\treturn click === undefined || isInstance(click, MouseEvent)\n', '\t\treturn true\n')]),
    ('the dropdown event guard reads detail uncontained', VT, 'returns false when a prototype or click accessor throws',
     [(V, "\ttry {\n\t\tif (!isInstance(value, CustomEvent)) return false\n", "\t{\n\t\tif (!isInstance(value, CustomEvent)) return false\n"),
      (V, "\t\treturn click === undefined || isInstance(click, MouseEvent)\n\t} catch {\n\t\treturn false\n\t}\n", "\t\treturn click === undefined || isInstance(click, MouseEvent)\n\t}\n")]),
    ('the dismissal parser swaps inside and outside', PT, 'projects each Bootstrap auto-close value',
     [(P, "if (value === 'inside') return { inside: true, outside: false }", "if (value === 'inside') return { inside: false, outside: true }")]),
    ('the dismissal parser reads every other value as true', PT, 'returns undefined for every other value',
     [(P, '\tif (value === true || value === \'true\') return { inside: true, outside: true }\n', '\tif (value !== false && value !== \'false\' && value !== \'inside\' && value !== \'outside\') return { inside: true, outside: true }\n')]),
    ('the offset parser takes any count of parts', PT, 'not exactly two finite numbers',
     [(P, '\tif (parts?.length !== 2) return undefined\n', '\tif (parts === undefined || parts.length === 0) return undefined\n')]),
    ('the offset parser takes strings in an array', PT, 'not exactly two finite numbers',
     [(P, "Array.isArray(value) && value.every((part) => typeof part === 'number')", 'Array.isArray(value)')]),
    ('the static parser reads dynamic as static', PT, 'reads the static display value',
     [(P, "\tif (value === 'dynamic') return false\n", "\tif (value === 'dynamic') return true\n")]),
    ('the neighbour never wraps', HT, 'wraps past each end',
     [(H, '\tif (wrap) return list[(next + list.length) % list.length]\n', '')]),
    ('the neighbour of an absent member is always the first', HT, 'returns the first member for an absent current',
     [(H, 'if (index === -1) return !forward && wrap ? list.at(-1) : list[0]', 'if (index === -1) return list[0]')]),
    ('the neighbour is not clamped', HT, 'steps forward and backward',
     [(H, '\treturn list[Math.max(0, Math.min(next, list.length - 1))]\n', '\treturn list[next]\n')]),
    ('the barrel omits the dropdown and the placement', IT, 'exports the browser surface',
     [(I, "export * from './Placement.js'\n", ''), (I, "export * from './Dropdown.js'\n", '')]),
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
    loaded = [result.get('message', '') for result in report['testResults'] if result.get('status') == 'failed' and not result['assertionResults']]
    return done.returncode, (len(cases), failed, loaded), ''


def main():
    dry = '--dry' in sys.argv
    wanted = [word for word in sys.argv[1:] if word != '--dry']
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
            if dry:
                line = f'MATCHED | {label}'
            else:
                code, result, tail = run(test)
                if result is None:
                    line = f'NOREPORT exit={code} | {label} | {test} | {tail}'
                else:
                    total, failed, loaded = result
                    hit = [title for title in failed if named in title]
                    others = [title for title in failed if named not in title]
                    verdict = ('EXACT' if hit and not others else 'JOINED' if hit else 'MISSED')
                    line = (f'{verdict} exit={code} | {label} | {test} | {len(failed)} failed of {total} | '
                            f'named: {hit} | joined: {others}' + (f' | load: {loaded}' if loaded else ''))
        except Exception as error:
            line = f'ERR | {label} | {error}'
        finally:
            for path, data in originals.items():
                (ROOT / path).write_bytes(data)
        print(line, flush=True)
        lines.append(line)
    if not wanted and not dry:
        for test in [DDT, PLT, DT, VT, PT, HT, IT]:
            code, result, tail = run(test)
            total, failed, loaded = result if result is not None else (0, ['no report'], [])
            line = f'GREEN? exit={code} | {test} | {len(failed)} failed of {total} | {failed}'
            print(line, flush=True)
            lines.append(line)
    after = {path: digest(path) for path in OWNED}
    receipt = 'restored byte for byte' if after == before else f'DIGEST MISMATCH {json.dumps(after)}'
    lines.append(f'digest after: {json.dumps(after)}')
    lines.append(f'receipt: {receipt}')
    print(lines[-1], flush=True)
    if not dry:
        (LOG if not wanted else LOG.with_name('mutations-partial.log.txt')).write_text('\n'.join(lines) + '\n', encoding='utf-8', newline='\n')


main()
