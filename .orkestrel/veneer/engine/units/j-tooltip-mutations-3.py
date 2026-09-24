# J-TOOLTIP round-3 mutation instrument, a successor of the round-2 instrument (retained by the
# Orchestrator as j-tooltip-mutations-2.py; this file replaced it in place): every row re-anchored to the round-3 sources, the sanitizer rows run
# NativeSanitizer.test.ts and the helper rows helpers.test.ts, the rows round 3's items H and A to M
# name added, and each row records the first line of its first named failure, so an assertion
# failure and a runtime rejection read apart. In the W2 shape: applies each named mutation to an
# owned source file, runs the WHOLE test file it names (no -t), reads Vitest's JSON report, records
# every failing case, then writes the original bytes back and checks every owned source's digest
# against the digest taken before the run, writing that receipt into the log. A row whose label ends
# in "(equivalent)" names a mutation the unit expects no case to distinguish.
import hashlib, json, pathlib, re, subprocess, sys

ROOT = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tooltip')
REPORT = ROOT / 'tmp/j-tooltip/mutation-report.json'
LOG = ROOT / 'tmp/j-tooltip/mutations.log.txt'
VITEST = [
    'node', 'node_modules/vitest/vitest.mjs', 'run', '--config', 'vite.config.ts', '--no-cache',
    '--project', 'src:browser', '--reporter=json', f'--outputFile={REPORT}',
]
T = 'src/browser/Tooltip.ts'
L = 'src/browser/Placement.ts'
N = 'src/browser/sanitizers/NativeSanitizer.ts'
H = 'src/browser/helpers.ts'
V = 'src/browser/validators.ts'
P = 'src/browser/parsers.ts'
K = 'src/browser/constants.ts'
I = 'src/browser/index.ts'
TT = 'tests/src/browser/Tooltip.test.ts'
LT = 'tests/src/browser/Placement.test.ts'
NT = 'tests/src/browser/sanitizers/NativeSanitizer.test.ts'
HT = 'tests/src/browser/helpers.test.ts'
VT = 'tests/src/browser/validators.test.ts'
PT = 'tests/src/browser/parsers.test.ts'
IT = 'tests/src/browser/index.test.ts'
OWNED = [T, L, N, H, V, P, K, I]

INSERTED = '\t\t\temitEvent(this.#host, TOOLTIP_EVENTS.inserted, null, false)\n'
INSERTED_DOOR = "\t\t\tif (!this.#holds(change, tip) || tip.parentElement !== container) return false\n"
SHOW_WAIT = ('\t\t\tif (this.#animated) {\n\t\t\t\tawait settleAnimations(tip, this.#controller.signal)\n'
             '\t\t\t\tif (!this.#holds(change, tip) || !this.shown) return false\n\t\t\t}\n')
HIDE_WAIT = ('\t\t\tif (this.#animated) {\n\t\t\t\tawait settleAnimations(tip, this.#controller.signal)\n'
             '\t\t\t\tif (!this.#holding(change, tip)) return false\n\t\t\t}\n')
TOOLTIP_GUARD = ("export function isTooltipEvent(value: unknown): value is TooltipEventMap['show'] {\n\ttry {\n"
                 '\t\treturn isInstance(value, CustomEvent) && value.detail === null\n\t} catch {\n\t\treturn false\n\t}\n}')
TARGET_GUARD = ('export function isSanitizeTarget(value: unknown): value is SanitizeTargetInterface {\n\ttry {\n'
                '\t\treturn (\n')
TARGET_GUARD_BARE = ('export function isSanitizeTarget(value: unknown): value is SanitizeTargetInterface {\n\t{\n'
                     '\t\treturn (\n')
TARGET_CATCH = ("\t\t\ttypeof value.setHTML === 'function'\n\t\t)\n\t} catch {\n\t\treturn false\n\t}\n}")
TARGET_CATCH_BARE = "\t\t\ttypeof value.setHTML === 'function'\n\t\t)\n\t}\n}"

MUTATIONS = [
    # The doors (round 1, and round 3 item A).
    ('the show dispatch door is dropped', TT, 'refuses to show when disabled',
     [(T, '\t\t\tif (!this.#holds(change, undefined) || this.#blocked()) return false\n', '')]),
    ('the inserted door is dropped', TT, 'stops a show whose inserted listener destroys it',
     [(T, INSERTED + INSERTED_DOOR, INSERTED)]),
    ('a show runs while a change is in flight', TT, 'refuses a show a show listener starts',
     [(T, 'this.#controller.signal.aborted || this.#change !== undefined || this.#blocked()',
       'this.#controller.signal.aborted || this.#blocked()')]),
    ('the build reads no door between a content function and its move', TT,
     'stops a build whose content function destroys the tooltip on its second call',
     [(T, '\t\t\tif (!this.#holds(change, undefined) || !this.#occupy(tip, selector, value, change)) {',
       '\t\t\tif (!this.#occupy(tip, selector, value, change)) {'),
      (T, '\t\t\tthis.#release((element, occupied) => occupied !== slot || element === value)\n'
          '\t\t\tif (!this.#holds(change, undefined)) return false\n',
       '\t\t\tthis.#release((element, occupied) => occupied !== slot || element === value)\n')]),
    ('hide removes a relocated tip', TT, 'resolves a hide false and leaves the tip where a reaction moved it',
     [(T, '\t\t\t!tip.classList.contains(this.#classes.shown) &&\n\t\t\ttip.parentElement === this.#container\n',
       '\t\t\t!tip.classList.contains(this.#classes.shown)\n')]),
    # The record before the move, slot occupancy, and fill after destruction (items B, C, D).
    ('no record precedes the move', TT, 'returns a custom element content home when its disconnection reaction',
     [(T, '\t\t\tif (isInstance(value, Element)) {\n\t\t\t\tconst record = this.#origins.get(value)',
       '\t\t\tif (false && isInstance(value, Element)) {\n\t\t\t\tconst record = this.#origins.get(value)')]),
    ('an engine-displaced element is not restored', TT, 'returns both elements home when overlapping selectors',
     [(T, '\t\t\tthis.#release((element, occupied) => occupied !== slot || element === value)\n', '')]),
    ('fill resolves after destruction', TT, 'resolves fill false when the connection reaction',
     [(T, '\t\tthis.#release((_element, _slot, selector) => !changed.has(selector))\n'
          '\t\tif (this.#controller.signal.aborted) return false\n',
       '\t\tthis.#release((_element, _slot, selector) => !changed.has(selector))\n')]),
    # The timer, the active-trigger read, and the interactions.
    ('the one timer is not cleared', TT, 'a leave clears a pending show',
     [(T, '\t\tthis.#disarm()\n\t\tif (this.#controller.signal.aborted) return\n\t\tthis.#timer = setTimeout(',
       '\t\tif (this.#controller.signal.aborted) return\n\t\tthis.#timer = setTimeout(')]),
    ('the active-trigger read is dropped', TT, 'keeps the tip while focus still holds it',
     [(T, '\t\tif (active.hover || active.focus || active.click) return\n', '')]),
    ('an ask during a hide in flight is dropped', TT, 'shows the tip again when the pointer returns',
     [(T, '\t\t\tif (this.#entered && this.#timer === undefined) void this.show()\n', '')]),
    ('a disabled click asks for the tip', TT, 'toggles on a click with the click trigger',
     [(T, '\t\tif (!tooltip.#enabled) return\n', '')]),
    # The sanitizer path, through the tooltip and through the native sanitizer's own proofs (item E).
    ('markup skips the sanitizer', TT, 'writes markup through the default sanitizer',
     [(H, 'else if (html) sanitizer.write(slot, content)', 'else if (html) slot.innerHTML = content')]),
    ('the template skips the sanitizer', TT, 'writes the template and markup through a supplied sanitizer',
     [(H, 'sanitizer.write(wrapper, template)', 'wrapper.innerHTML = template')]),
    ('the native sanitizer drops its configuration', NT, 'writes through the allowlist when the configuration is omitted',
     [(N, 'element.setHTML(html, { sanitizer: this.#config })', 'element.setHTML(html, { sanitizer: {} })')]),
    ('the allowlist admits a global href', NT, 'keeps an element-scoped attribute only on the element that permits it',
     [(K, "\tattributes: Object.freeze([\n\t\t'class',\n", "\tattributes: Object.freeze([\n\t\t'class',\n\t\t'href',\n")]),
    ('the allowlist loses an ARIA name', NT, 'keeps every WAI-ARIA 1.2 attribute',
     [(K, "\t\t'aria-valuetext',\n", '')]),
    ('the allowlist admits data attributes', NT, 'keeps the allowlist markup and drops scripts',
     [(K, '\tdataAttributes: false,\n', '\tdataAttributes: true,\n')]),
    ('the unsupported refusal is removed', NT, 'refuses an element without setHTML',
     [(N, '\t\tif (!isSanitizeTarget(element)) {', '\t\tif (false && !isSanitizeTarget(element)) {')]),
    # The slot, the insertion, the placement, the container, and aria-describedby.
    ('an empty slot is kept', TT, 'removes an empty slot',
     [(H, "if (value === undefined || value === '') {", 'if (value === undefined) {')]),
    ('no inserted event', TT, 'shows the tip in the top layer above its trigger', [(T, INSERTED, '')]),
    ('hide keeps the placement', TT, 'shows the tip in the top layer above its trigger',
     [(T, '\t\tplacement?.destroy()\n', '')]),
    ('the container ignores aria-modal', TT, 'inserts the tip into the container option',
     [(T, 'return isInstance(modal, HTMLElement) ? modal : this.#host.ownerDocument.body',
       'return this.#host.ownerDocument.body')]),
    ('aria-describedby is not written', TT, 'shows the tip in the top layer above its trigger',
     [(T, '\t\t\tthis.#link(tip.id, true)\n', '')]),
    ('aria-describedby keeps the id after hide', TT, 'shows the tip in the top layer above its trigger',
     [(T, 'if (tip !== undefined && !this.#controller.signal.aborted) this.#link(tip.id, false)', '')]),
    # The option precedence, the refusals, the parity, and the placement options (item H).
    ('the constructor placement is ignored (precedence reversed)', TT, 'resolves the options from the constructor over the attributes',
     [(T, '\t\t\toptions?.placement,\n', '\t\t\tundefined,\n')]),
    ('an invalid descendants selector is accepted', TT, 'refuses an invalid host',
     [(T, 'if (descendants !== undefined && !isSelector(descendants)) {',
       'if (false && descendants !== undefined && !isSelector(descendants)) {')]),
    ('the promotion compensation is omitted', TT, 'reads the same border, padding, background, color, and overflow',
     [(L, '\t\t\t\tthis.#write(element, name, value)\n', '')]),
    ('the offset is not passed', TT, 'places the tip at the position, offset, and fallbacks',
     [(T, '\t\t\t\t\toffset: this.#offset,\n', '')]),
    ('update is not forwarded', TT, 'places the tip at the position, offset, and fallbacks',
     [(T, '\t\tthis.#placement?.update()\n', '')]),
    ('a prevented hide proceeds', TT, 'refuses to hide a hidden tip, keeps the tip a listener refuses to hide',
     [(T, '&& !forced) return false', '&& false) return false')]),
    ('a hide on a hidden tip proceeds', TT, 'refuses to hide a hidden tip, keeps the tip a listener refuses to hide',
     [(T, 'async #conceal(forced: boolean): Promise<boolean> {\n\t\tif (this.#controller.signal.aborted || !this.shown) return false',
       'async #conceal(forced: boolean): Promise<boolean> {\n\t\tif (this.#controller.signal.aborted) return false')]),
    ('a refused promotion is not cleaned up', TT, 'refuses the show when a listener cancels the tip promotion',
     [(T, '\t\t\t\tif (this.#holds(change, tip)) this.#discard()\n', '')]),
    ('a refused promotion rejects the show', TT, 'refuses the show when a listener cancels the tip promotion',
     [(T, "if (isAppError(error) && error.code === 'PLACEMENT_PROMOTION_REFUSED') return undefined",
       "if (false) return undefined")]),
    ('an arrow that is not an HTML element is accepted', LT, 'refuses an arrow that is not an HTML element',
     [(L, '\t\tfor (const candidate of arrow === undefined\n\t\t\t? [reference, element]\n\t\t\t: [reference, element, arrow]) {',
       '\t\tfor (const candidate of [reference, element]) {')]),
    # The lifetime, the modal, and the platform's dismissal (and its bound, item J).
    ('the aborted signal at construction is ignored', TT, 'destroys the tooltip when its signal aborts',
     [(T, '\t\tif (lifetime?.aborted) this.destroy()\n\t\telse lifetime?.addEventListener(',
       '\t\tlifetime?.addEventListener(')]),
    ('the signal abort is not heard', TT, 'destroys the tooltip when its signal aborts',
     [(T, "\t\telse lifetime?.addEventListener('abort', () => this.destroy(), { once: true, signal })\n", '')]),
    ('the modal hide is not heard', TT, 'hides when the modal it sits in dispatches its hide event',
     [(T, '?.addEventListener(MODAL_EVENTS.hide, () => void this.hide(), { signal })',
       '?.addEventListener(MODAL_EVENTS.hide, () => undefined, { signal })')]),
    ('the platform close is not bridged', TT, 'hides when the platform closes the hint',
     [(T, "\t\tif (this.#tip !== tip || !this.shown || tip.matches(':popover-open')) return\n", '\t\treturn\n')]),
    ('a prevented platform hide is not reopened', TT, 'hides when the platform closes the hint',
     [(T, '\t\t\t\ttip.showPopover()\n', '')]),
    ('a second platform close is prevented again', TT, 'hides a tip at its second platform close',
     [(T, '\t\tif (this.#promoted === tip) {', '\t\tif (false) {')]),
    # The arrow (round 2, and its reference point, item L).
    ('the arrow keeps its static position', TT, 'centers the arrow on the edge facing the trigger',
     [(L, "\t\tthis.#write(arrow, 'position', 'absolute')\n", '')]),
    ('the arrow is centered on the wrong axis', TT, 'centers the arrow on the edge facing the trigger',
     [(L, "\t\t\tvertical ? 'left' : 'top',\n", "\t\t\tvertical ? 'top' : 'left',\n")]),
    ('the arrow ignores the trigger center', TT, 'points the arrow at the center of a narrow trigger',
     [(L, '\t\t\t? anchor.left + anchor.width / 2 - box.left - element.clientLeft - size.width / 2\n',
       '\t\t\t? (element.clientWidth - size.width) / 2\n')]),
    # The move-back (round 2).
    ('a moved element is left in the tip on destroy', TT, 'returns a moved element to where it came from',
     [(T, '\t\tthis.#release(() => false)\n', '')]),
    ('a replaced element is dropped', TT, 'returns a moved element to where it came from',
     [(T, '\t\tthis.#release((_element, _slot, selector) => !changed.has(selector))\n', '')]),
    ('a rebuilt show keeps the earlier element', TT, 'returns a moved element to where it came from',
     [(T, '\t\tthis.#release((element, slot) => tip.contains(slot) && element.parentNode === slot)\n', '')]),
    # The title, the fade waits, the descendants (item K), and the vocabulary (item M).
    ('the title is not moved', TT, 'moves a title into the tip content at construction',
     [(T, '\t\tif (fallback !== undefined) this.#retitle(fallback)\n', '')]),
    ('the show wait is dropped', TT, 'waits for the fade in and the fade out when animated', [(T, SHOW_WAIT, '')]),
    ('the hide wait is dropped', TT, 'waits for the fade in and the fade out when animated', [(T, HIDE_WAIT, '')]),
    ('descendants get no tooltip of their own', TT, 'drives a tooltip for each matching descendant',
     [(T, '\t\tif (descendants === undefined) return this\n', '\t\treturn this\n')]),
    ('a failing descendant throws out of the listener', TT, 'drives nothing for a descendant whose own attribute fails',
     [(T, '\t\t\tif (!isAppError(error)) throw error\n\t\t\tthis.#failed.add(match)\n\t\t\treturn undefined\n',
       '\t\t\tthrow error\n')]),
    ("a consumer's descendant tooltip is driven", TT, 'leaves a tooltip a consumer constructed on a descendant',
     [(T, 'return this.#owned.has(existing) ? existing : undefined', 'return existing')]),
    ('the class group is ignored', TT, 'writes, tests, reads, and matches only the replacing values',
     [(T, 'const { shown, fade, auto } = this.#classes', 'const { shown, fade, auto } = TOOLTIP_CLASSES')]),
    ('the selector group is ignored', TT, 'writes, tests, reads, and matches only the replacing values',
     [(T, 'const arrow = tip.querySelector(this.#selectors.arrow)', 'const arrow = tip.querySelector(TOOLTIP_SELECTORS.arrow)')]),
    ('the default offset is zero', TT, 'shows the tip in the top layer above its trigger',
     [(K, 'offset: Object.freeze<[number, number]>([0, 6]),', 'offset: Object.freeze<[number, number]>([0, 0]),')]),
    # The helpers, over their own proofs (item H).
    ('the built tip stays attached', HT, 'returns the template root written through the sanitizer, detached',
     [(H, '\ttip.remove()\n\treturn tip\n', '\treturn tip\n')]),
    ('a template without an HTML root is accepted', HT, 'refuses a template whose first element is missing',
     [(H, '\tif (!isInstance(tip, HTMLElement)) {\n\t\tthrow new AppError(',
       '\tif (false && !isInstance(tip, HTMLElement)) {\n\t\tthrow new AppError(')]),
    ('an empty slot is kept by the helper', HT, 'writes text, calls a function with the trigger, removes an empty slot',
     [(H, "if (value === undefined || value === '') {", 'if (value === undefined) {')]),
    ('a content function is not called', HT, 'writes text, calls a function with the trigger, removes an empty slot',
     [(H, "const value = typeof content === 'function' ? content(trigger) : content",
       "const value = typeof content === 'function' ? undefined : content")]),
    ('an element content is copied, not moved', HT, 'moves an element in from its former parent',
     [(H, 'if (typeof content !== \'string\') slot.replaceChildren(content)',
       "if (typeof content !== 'string') slot.textContent = content.textContent")]),
    ('the writer ignores html', HT, 'moves an element in from its former parent',
     [(H, 'else if (html) sanitizer.write(slot, content)', 'else if (!html) sanitizer.write(slot, content)')]),
    # The guards (item H).
    ('the tooltip event guard reads detail uncontained', VT, 'returns false when a prototype or detail accessor throws',
     [(V, TOOLTIP_GUARD, "export function isTooltipEvent(value: unknown): value is TooltipEventMap['show'] {\n"
                         '\treturn isInstance(value, CustomEvent) && value.detail === null\n}')]),
    ('the tooltip event guard admits a payload', VT, 'requires a custom event whose detail the platform reads as absent',
     [(V, TOOLTIP_GUARD, "export function isTooltipEvent(value: unknown): value is TooltipEventMap['show'] {\n\ttry {\n"
                         '\t\treturn isInstance(value, CustomEvent)\n\t} catch {\n\t\treturn false\n\t}\n}')]),
    ('the sanitize target guard admits any setHTML member', VT, 'accepts an object whose setHTML member is a function',
     [(V, "\t\t\ttypeof value.setHTML === 'function'\n", '\t\t\ttrue\n')]),
    ('the sanitize target guard is uncontained', VT, 'returns false when a trap or an accessor throws',
     [(V, TARGET_GUARD, TARGET_GUARD_BARE), (V, TARGET_CATCH, TARGET_CATCH_BARE)]),
    # The parsers (item F).
    ('a negative delay parses', PT, 'refuses a negative, blank, or non-finite wait',
     [(P, 'return wait !== undefined && wait >= 0 ? { show: wait, hide: wait } : undefined',
       'return wait !== undefined ? { show: wait, hide: wait } : undefined')]),
    ('one delay fills the show wait alone', PT, 'reads one number as the show and hide waits',
     [(P, 'return wait !== undefined && wait >= 0 ? { show: wait, hide: wait } : undefined',
       'return wait !== undefined && wait >= 0 ? { show: wait } : undefined')]),
    ('an unknown trigger word parses', PT, 'refuses a blank value, a word it does not know',
     [(P, "\tif (words.some((word) => parseEnum(word, ['hover', 'focus', 'click', 'manual']) === undefined)) {\n"
          '\t\treturn undefined\n\t}\n', '')]),
    ('the hover word turns on focus', PT, 'turns on each interaction the words name',
     [(P, "hover: words.includes('hover'),", "hover: words.includes('focus'),")]),
    ('a placement string is refused', PT, 'accepts each placement string',
     [(P, 'return keyOf(PLACEMENT_AREAS)(value) ? value : undefined', 'return undefined')]),
    ('an unknown fallback member is skipped', PT, 'refuses an unknown member',
     [(P, '\t\t\tif (position === undefined) return undefined\n', '\t\t\tif (position === undefined) continue\n')]),
    ('a hostile fallback array escapes', PT, 'refuses an unknown member',
     [(P, '\t\treturn positions\n\t} catch {\n\t\treturn undefined\n\t}', '\t\treturn positions\n\t} catch (error) {\n\t\tthrow error\n\t}')]),
    ('the barrel omits the tooltip', IT, 'exports the browser surface',
     [(I, "export * from './Tooltip.js'\n", '')]),
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
    failed = [(case['title'], (case.get('failureMessages') or [''])[0]) for case in cases
              if case['status'] == 'failed']
    suites = [result.get('message', '') for result in report['testResults'] if result['status'] == 'failed'
              and not result['assertionResults']]
    return done.returncode, (len(cases), failed, suites), ''


def first_line(message):
    text = re.sub(r'\x1b\[[0-9;]*m', '', message).strip()
    return text.splitlines()[0][:160] if text else ''


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
                total, failed, suites = result
                hit = [title for title, _ in failed if named in title]
                others = [title for title, _ in failed if named not in title]
                cause = next((first_line(message) for title, message in failed if named in title), '')
                verdict = ('EXACT' if hit and not others else 'JOINED' if hit else 'MISSED')
                line = (f'{verdict} exit={code} | {label} | {test} | {len(failed)} failed of {total} | '
                        f'named: {hit} | first failure: {cause} | joined: {others}'
                        + (f' | suite failures: {[first_line(message) for message in suites]}' if suites else ''))
        except Exception as error:
            line = f'ERR | {label} | {error}'
        finally:
            for path, data in originals.items():
                (ROOT / path).write_bytes(data)
        print(line, flush=True)
        lines.append(line)
    if not wanted:
        for test in [TT, LT, NT, HT, VT, PT, IT]:
            code, result, tail = run(test)
            total, failed, _ = result if result is not None else (0, [('no report', '')], [])
            line = f'GREEN? exit={code} | {test} | {len(failed)} failed of {total} | {[title for title, _ in failed]}'
            print(line, flush=True)
            lines.append(line)
    after = {path: digest(path) for path in OWNED}
    receipt = 'restored byte for byte' if after == before else f'DIGEST MISMATCH {json.dumps(after)}'
    lines.append(f'digest after: {json.dumps(after)}')
    lines.append(f'receipt: {receipt}')
    print(lines[-1], flush=True)
    LOG.write_text('\n'.join(lines) + '\n', encoding='utf-8', newline='\n')


main()
