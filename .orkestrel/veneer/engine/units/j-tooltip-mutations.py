# J-TOOLTIP mutation instrument, in the W2 shape: applies each named mutation to an owned source
# file, runs the WHOLE test file it names (no -t), reads Vitest's JSON report, and records every
# failing case, then writes the original bytes back and checks every owned source's digest against
# the digest taken before the run, writing that receipt into the log. A row whose label ends in
# "(equivalent)" names a mutation the unit expects no case to distinguish, and the log records what
# each such row read.
import hashlib, json, pathlib, re, subprocess, sys

ROOT = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tooltip')
REPORT = ROOT / 'tmp/j-tooltip/mutation-report.json'
LOG = ROOT / 'tmp/j-tooltip/mutations.log.txt'
VITEST = [
    'node', 'node_modules/vitest/vitest.mjs', 'run', '--config', 'vite.config.ts', '--no-cache',
    '--project', 'src:browser', '--reporter=json', f'--outputFile={REPORT}',
]
T = 'src/browser/Tooltip.ts'
N = 'src/browser/sanitizers/NativeSanitizer.ts'
H = 'src/browser/helpers.ts'
V = 'src/browser/validators.ts'
P = 'src/browser/parsers.ts'
K = 'src/browser/constants.ts'
I = 'src/browser/index.ts'
TT = 'tests/src/browser/Tooltip.test.ts'
NT = 'tests/src/browser/sanitizers/NativeSanitizer.test.ts'
HT = 'tests/src/browser/helpers.test.ts'
VT = 'tests/src/browser/validators.test.ts'
PT = 'tests/src/browser/parsers.test.ts'
IT = 'tests/src/browser/index.test.ts'
OWNED = [T, N, H, V, P, K, I]

INSERTED = '\t\t\temitEvent(this.#host, TOOLTIP_EVENTS.inserted, null, false)\n'
INSERTED_DOOR = "\t\t\tif (!this.#holds(change, tip) || tip.parentElement !== container) return false\n"
SHOW_WAIT = ('\t\t\tif (this.#animated) {\n\t\t\t\tawait settleAnimations(tip, this.#controller.signal)\n'
             '\t\t\t\tif (!this.#holds(change, tip) || !this.shown) return false\n\t\t\t}\n')

MUTATIONS = [
    # The door reads.
    ('the show dispatch door is dropped', TT, 'refuses to show when disabled',
     [(T, '\t\t\tif (!this.#holds(change, undefined) || this.#blocked()) return false\n', '')]),
    ('the inserted door is dropped', TT, 'stops a show whose inserted listener destroys it',
     [(T, INSERTED + INSERTED_DOOR, INSERTED)]),
    ('a show runs while a change is in flight', TT, 'refuses a show a show listener starts',
     [(T, 'this.#controller.signal.aborted || this.#change !== undefined || this.#blocked()',
       'this.#controller.signal.aborted || this.#blocked()')]),
    # The timer clearing and the active-trigger read.
    ('the one timer is not cleared', TT, 'a leave clears a pending show',
     [(T, '\t\tthis.#disarm()\n\t\tif (this.#controller.signal.aborted) return\n\t\tthis.#timer = setTimeout(',
       '\t\tif (this.#controller.signal.aborted) return\n\t\tthis.#timer = setTimeout(')]),
    ('the active-trigger read is dropped', TT, 'keeps the tip while focus still holds it',
     [(T, '\t\tif (active.hover || active.focus || active.click) return\n', '')]),
    ('an ask during a hide in flight is dropped', TT, 'shows the tip again when the pointer returns',
     [(T, '\t\t\tif (this.#entered === true && this.#timer === undefined) void this.show()\n', '')]),
    ('a disabled click asks for the tip', TT, 'toggles on a click with the click trigger',
     [(T, '\t\tif (!tooltip.#enabled) return\n', '')]),
    # The sanitizer path.
    ('markup skips the sanitizer', TT, 'writes markup through the default sanitizer',
     [(H, 'else if (html) sanitizer.write(slot, content)', 'else if (html) slot.innerHTML = content')]),
    ('the template skips the sanitizer', TT, 'writes the template and markup through a supplied sanitizer',
     [(H, 'sanitizer.write(wrapper, template)', 'wrapper.innerHTML = template')]),
    ('the native sanitizer drops its configuration', TT, 'writes markup through the default sanitizer',
     [(N, 'element.setHTML(html, { sanitizer: this.#config })', 'element.setHTML(html)')]),
    # The slot removal on empty content.
    ('an empty slot is kept', TT, 'removes an empty slot',
     [(H, "if (value === undefined || value === '') {", 'if (value === undefined) {')]),
    # The inserted dispatch.
    ('no inserted event', TT, 'shows the tip in the top layer above its trigger',
     [(T, INSERTED, '')]),
    # The placement destroy on hide.
    ('hide keeps the placement', TT, 'shows the tip in the top layer above its trigger',
     [(T, '\t\tplacement?.destroy()\n', '')]),
    # The container default.
    ('the container ignores aria-modal', TT, 'inserts the tip into the container option',
     [(T, 'return isInstance(modal, HTMLElement) ? modal : this.#host.ownerDocument.body',
       'return this.#host.ownerDocument.body')]),
    # The aria-describedby write and removal.
    ('aria-describedby is not written', TT, 'shows the tip in the top layer above its trigger',
     [(T, '\t\t\tthis.#describe(tip.id, true)\n', '')]),
    ('aria-describedby keeps the id after hide', TT, 'shows the tip in the top layer above its trigger',
     [(T, 'if (tip !== undefined && !this.#controller.signal.aborted) this.#describe(tip.id, false)',
       '')]),
    # The signal branch.
    ('the aborted signal at construction is ignored', TT, 'destroys the tooltip when its signal aborts',
     [(T, '\t\tif (lifetime?.aborted) this.destroy()\n\t\telse lifetime?.addEventListener(',
       '\t\tlifetime?.addEventListener(')]),
    ('the signal abort is not heard', TT, 'destroys the tooltip when its signal aborts',
     [(T, "\t\telse lifetime?.addEventListener('abort', () => this.destroy(), { once: true, signal })\n",
       '')]),
    # The modal hide.
    ('the modal hide is not heard', TT, 'hides when the modal it sits in dispatches its hide event',
     [(T, '?.addEventListener(MODAL_EVENTS.hide, () => void this.hide(), { signal })',
       '?.addEventListener(MODAL_EVENTS.hide, () => undefined, { signal })')]),
    # The hint dismissal bridge.
    ('the platform close is not bridged', TT, 'hides when the platform closes the hint',
     [(T, "\t\tif (this.#tip !== tip || !this.shown || tip.matches(':popover-open')) return\n",
       '\t\treturn\n')]),
    ('a prevented platform hide is not reopened', TT, 'hides when the platform closes the hint',
     [(T, '\t\t\t\ttip.showPopover()\n', '')]),
    # The title handling, the fade wait, the delegation, and the declarations.
    ('the title is not moved', TT, 'moves a title into the tip content at construction',
     [(T, '\t\tif (fallback !== undefined) this.#retitle(fallback)\n', '')]),
    ('the fade wait is dropped', TT, 'waits for the fade in and the fade out when animated',
     [(T, SHOW_WAIT, '')]),
    ('descendants get no tooltip of their own', TT, 'drives a tooltip for each matching descendant',
     [(T, '\t\tif (descendants === undefined) return this\n', '\t\treturn this\n')]),
    ('the default offset is zero', TT, 'publishes frozen default tables',
     [(K, 'offset: Object.freeze<[number, number]>([0, 6]),', 'offset: Object.freeze<[number, number]>([0, 0]),')]),
    ('the tooltip event guard reads detail uncontained', VT, 'returns false when a prototype or detail accessor throws',
     [(V, "export function isTooltipEvent(value: unknown): value is TooltipEventMap['show'] {\n\ttry {\n"
          '\t\treturn isInstance(value, CustomEvent) && value.detail === null\n\t} catch {\n\t\treturn false\n\t}\n}',
       "export function isTooltipEvent(value: unknown): value is TooltipEventMap['show'] {\n"
       '\treturn isInstance(value, CustomEvent) && value.detail === null\n}')]),
    ('a negative delay parses', PT, 'refuses a negative, blank, or non-finite wait',
     [(P, 'return wait !== undefined && wait >= 0 ? { show: wait, hide: wait } : undefined',
       'return wait !== undefined ? { show: wait, hide: wait } : undefined')]),
    ('an unknown trigger word parses', PT, 'refuses a blank value, a word it does not know',
     [(P, "\tif (words.some((word) => parseEnum(word, ['hover', 'focus', 'click', 'manual']) === undefined)) {\n"
          '\t\treturn undefined\n\t}\n', '')]),
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
        for test in [TT, NT, HT, VT, PT, IT]:
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
