# J-TOAST mutation instrument, a copy of j-collapse mutations-3.py with the toast rows: applies each
# named mutation to an owned source file, runs the WHOLE test file it names (no -t), reads Vitest's
# JSON report, and records every failing case, then writes the original bytes back and checks every
# owned source's digest against the digest taken before the run, writing that receipt into the log.
# A row whose label ends in "(equivalent)" names a mutation the unit expects no case to distinguish,
# and the log records what each such row read.
import hashlib, json, pathlib, re, subprocess, sys

ROOT = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/toast')
REPORT = ROOT / 'tmp/j-toast/mutation-report.json'
LOG = ROOT / 'tmp/j-toast/mutations.log.txt'
VITEST = [
    'node', 'node_modules/vitest/vitest.mjs', 'run', '--config', 'vite.config.ts', '--no-cache',
    '--project', 'src:browser', '--reporter=json', f'--outputFile={REPORT}',
]
T = 'src/browser/Toast.ts'
D = 'src/browser/Delegate.ts'
V = 'src/browser/validators.ts'
K = 'src/browser/constants.ts'
I = 'src/browser/index.ts'
TT = 'tests/src/browser/Toast.test.ts'
DT = 'tests/src/browser/Delegate.test.ts'
VT = 'tests/src/browser/validators.test.ts'
IT = 'tests/src/browser/index.test.ts'
OWNED = [T, D, V, K, I]

SETTLE = 'await settleAnimations(host, this.#controller.signal)'
SHOW_AWAIT = ('host.classList.add(shown, transition))\n\t\t) {\n\t\t\treturn false\n\t\t}\n'
              '\t\tif (this.#animated) {\n\t\t\tawait settleAnimations(host, this.#controller.signal)\n'
              '\t\t\tif (!this.#holds(change, [shown, transition], [])) return false\n')
HIDE_AWAIT = ('() => host.classList.add(transition))) {\n\t\t\treturn false\n\t\t}\n'
              '\t\tif (this.#animated) {\n\t\t\tawait settleAnimations(host, this.#controller.signal)\n'
              '\t\t\tif (!this.#holds(change, [shown, transition], [])) return false\n')
SHOW_FIRST = ('\t\tif (this.#refused()) return false\n\t\tif (!emitEvent(this.#host, TOAST_EVENTS.show, null, true)) return false\n')
SHOW_REREAD = ('\t\t// refusal is read again before any write.\n\t\tif (this.#refused()) return false\n')
PREVENT = ('\t\tif (isInstance(trigger, HTMLAnchorElement) || isInstance(trigger, HTMLAreaElement)) {\n'
           '\t\t\tevent.preventDefault()\n\t\t}\n')

MUTATIONS = [
    # Sequence
    ('show writes no fade token', TT, 'shows through the fade and showing tokens',
     [(T, '() => host.classList.add(fade)', '() => host.classList.add()')]),
    ('the fade token ignores animated', TT, 'shows and hides at once with animated false',
     [(T, 'if (this.#animated && !this.#apply(change, [], [transition], () => host.classList.add(fade))) {',
       'if (!this.#apply(change, [], [transition], () => host.classList.add(fade))) {')]),
    ('the calls wait with animated false', TT, 'shows and hides at once with animated false',
     [(T, '\t\tif (this.#animated) {\n\t\t\tawait', '\t\tif (this.#controller) {\n\t\t\tawait', 2)]),
    ('show refuses a shown toast', TT, 'restarts the delay when show runs on a shown toast',
     [(T, SHOW_FIRST, SHOW_FIRST.replace('if (this.#refused()) return false', 'if (this.#refused() || this.shown) return false'))]),
    ('hide on a hidden toast proceeds', TT, 'resolves false for a hide on a hidden toast',
     [(T, 'if (this.#refused() || !this.shown) return false', 'if (this.#refused()) return false', 2)]),
    ('hide reads no layout', TT, 'stops a hide when the shown token leaves during its transition',
     [(T, '\t\treflow(host)\n\t\tif (!this.#apply(change, [shown, transition], [], () => host.classList.add(transition))) {',
       '\t\tif (!this.#apply(change, [shown, transition], [], () => host.classList.add(transition))) {')]),
    # Motion
    ('a zero timer replaces the settle', TT, 'dispatches shown after the fade in finishes',
     [(T, SETTLE, 'await new Promise((resolve) => setTimeout(resolve, 0))', 2)]),
    ('a transitionend wait replaces the settle', TT, 'no animation created under staged reduced motion',
     [(T, SETTLE, "await new Promise((resolve) => host.addEventListener('transitionend', resolve, { once: true }))", 2)]),
    # Timer
    ('the delay is not started after show', TT, 'hides itself after the delay its attribute names',
     [(T, "\t\tif (!host.matches(':hover') && !host.matches(':focus-within')) this.#schedule()\n", '')]),
    ('autohide is ignored', TT, 'hides itself after the delay its attribute names',
     [(T, 'if (!this.#autohide || this.#controller.signal.aborted) return', 'if (this.#controller.signal.aborted) return')]),
    ('the delay attribute is not read', TT, 'hides itself after the delay its attribute names',
     [(T, '{ animated: parseBoolean, autohide: parseBoolean, delay: parseNumber }', '{ animated: parseBoolean, autohide: parseBoolean }')]),
    ('show ignores the pointer and focus', TT, 'holds the delay while the pointer rests inside',
     [(T, "\t\tif (!host.matches(':hover') && !host.matches(':focus-within')) this.#schedule()\n", '\t\tthis.#schedule()\n')]),
    ('mouseout ignores focus', TT, 'holds the delay while the pointer rests inside',
     [(T, "this.#leave(event.relatedTarget, ':focus-within')", "this.#leave(event.relatedTarget, ':not(*)')")]),
    ('focusout ignores the pointer', TT, 'holds the delay while the pointer rests inside',
     [(T, "this.#leave(event.relatedTarget, ':hover')", "this.#leave(event.relatedTarget, ':not(*)')")]),
    ('mouseover does not clear the delay', TT, 'clears a pending delay when focus or the pointer enters',
     [(T, "\t\thost.addEventListener('mouseover', () => this.#clear(), { signal })\n", '')]),
    ('focusin does not clear the delay', TT, 'clears a pending delay when focus or the pointer enters',
     [(T, "\t\thost.addEventListener('focusin', () => this.#clear(), { signal })\n", '')]),
    ('leaving starts no delay', TT, 'holds the delay while the pointer rests inside',
     [(T, '\t\tif (this.#host.matches(other)) return\n\t\tthis.#schedule()\n', '\t\tif (this.#host.matches(other)) return\n')]),
    ('the related target is not read', TT, 'a descendant listener stops the focusin that follows',
     [(T, '\t\tif (isInstance(related, Node) && this.#host.contains(related)) return\n', '')]),
    ('hide leaves the delay running', TT, 'clears the pending delay when a hide is accepted',
     [(T, '\t\tif (this.#refused() || !this.shown) return false\n\t\tthis.#clear()\n', '\t\tif (this.#refused() || !this.shown) return false\n')]),
    ('show leaves the delay running', TT, 'clears a pending delay when a show is accepted',
     [(T, SHOW_REREAD + '\t\tthis.#clear()\n', SHOW_REREAD)]),
    ('destruction leaves the delay running (equivalent)', TT, 'abandons the transition in flight on destruction',
     [(T, '\t\tthis.#controller.abort()\n\t\tthis.#clear()\n', '\t\tthis.#controller.abort()\n')]),
    ('the timer starts beside a pending one', TT, 'restarts the delay when show runs on a shown toast',
     [(T, '\t#schedule(): void {\n\t\tthis.#clear()\n', '\t#schedule(): void {\n'),
      (T, SHOW_REREAD + '\t\tthis.#clear()\n', SHOW_REREAD)]),
    # Cancellation
    ('the pre-change event return value is ignored', TT, 'untouched when a listener prevents',
     [(T, 'if (!emitEvent(this.#host, TOAST_EVENTS.show, null, true)) return false', 'emitEvent(this.#host, TOAST_EVENTS.show, null, true)'),
      (T, 'if (!emitEvent(this.#host, TOAST_EVENTS.hide, null, true)) return false', 'emitEvent(this.#host, TOAST_EVENTS.hide, null, true)')]),
    ('the mid-flight guard is dropped', TT, 'while a transition is in flight',
     [(T, '\t\t\tthis.#controller.signal.aborted || this.#host.classList.contains(this.#classes.transition)\n',
       '\t\t\tthis.#controller.signal.aborted\n')]),
    # Events
    ('a completed event is cancelable', TT, 'dispatches bubbling events',
     [(T, 'emitEvent(host, TOAST_EVENTS.shown, null, false)', 'emitEvent(host, TOAST_EVENTS.shown, null, true)')]),
    ('the event guard admits every custom event', TT, 'dispatches bubbling events',
     [(V, 'return isInstance(value, CustomEvent) && value.detail === null', 'return isInstance(value, CustomEvent)')]),
    # Cleanup
    ('destruction omits the abort', TT, 'abandons the transition in flight on destruction',
     [(T, '\t\tthis.#controller.abort()\n\t\tthis.#clear()\n', '\t\tthis.#clear()\n'),
      (T, '\tdestroy(): void {\n\t\tif (this.#controller.signal.aborted) return\n', '\tdestroy(): void {\n')]),
    ('the fade token is not saved', TT, 'restores the tokens it wrote after a completed change',
     [(T, 'for (const name of [shown, transition, fade]) {', 'for (const name of [shown, transition]) {')]),
    ('the signal is ignored', TT, 'destroys the toast when its signal aborts',
     [(T, '\t\tif (lifetime?.aborted) this.destroy()\n', '\t\tif (lifetime === undefined) this.destroy()\n')]),
    # Vocabulary
    ('the classes group is ignored', TT, 'only the replacing values when every group is replaced',
     [(T, 'isClassToken,\n\t\t\toptions?.classes,', 'isClassToken,\n\t\t\tundefined,')]),
    ('the attributes group is ignored', TT, 'only the replacing values when every group is replaced',
     [(T, 'isAttributeName,\n\t\t\toptions?.attributes,', 'isAttributeName,\n\t\t\tundefined,')]),
    ('a class replacement is not validated', TT, 'refuses a group value',
     [(T, 'TOAST_CLASSES,\n\t\t\tisClassToken,', 'TOAST_CLASSES,\n\t\t\tisSelector,')]),
    ('the selectors group is not validated', TT, 'refuses a group value',
     [(T, "\t\tresolveVocabulary('TOAST_OPTION_INVALID', TOAST_SELECTORS, isSelector, options?.selectors)\n", '')]),
    ('the animated attribute is not coerced', TT, 'refuses a group value',
     [(T, '{ animated: parseBoolean,', '{ animated: (value: unknown) => value,')]),
    ('a default table is left unfrozen', TT, 'publishes frozen default tables',
     [(K, 'Required<Pick<ToastOptions, \'animated\' | \'autohide\' | \'delay\'>> =\n\tObject.freeze({', 'Required<Pick<ToastOptions, \'animated\' | \'autohide\' | \'delay\'>> =\n\t({')]),
    # Ownership
    ('the host is not claimed', TT, 'refuses an invalid host and a second owner',
     [(T, '\t\tToast.#registry.claim(host, this)\n', '')]),
    # Doors
    ('a write is not followed by a read', TT, 'stops writing when a reaction to its own write destroys it',
     [(T, '\t\twrite()\n\t\treturn this.#holds(change, present, absent)', '\t\twrite()\n\t\treturn true')]),
    ('the show dispatch is not followed by a read', TT, 'writes nothing when a listener to its show event destroys it',
     [(T, SHOW_REREAD, '\t\t// refusal is read again before any write.\n')]),
    ('the change identity is not read', TT, 'another call took over during the await',
     [(T, '\t\t\tthis.#change === change &&\n', '')]),
    ('the fade door admits the transition token', TT, 'fade write a reaction answers',
     [(T, '!this.#apply(change, [], [transition], () => host.classList.add(fade))', '!this.#apply(change, [], [], () => host.classList.add(fade))')]),
    ('the show transition door reads no token', TT, 'shown-and-transition write a reaction answers',
     [(T, '!this.#apply(change, [shown, transition], [], () => host.classList.add(shown, transition))', '!this.#apply(change, [], [], () => host.classList.add(shown, transition))')]),
    ('the show await reads no token', TT, 'stops a show when the transition token leaves during its await',
     [(T, SHOW_AWAIT, SHOW_AWAIT.replace('this.#holds(change, [shown, transition], [])', 'this.#holds(change, [], [])'))]),
    ('the show completion door reads no token', TT, 'completing removal a reaction answers by removing the shown token',
     [(T, 'this.#apply(change, [shown], [transition], () => host.classList.remove(transition))', 'this.#apply(change, [], [], () => host.classList.remove(transition))')]),
    ('the hide transition door reads no token', TT, 'hide whose transition-token write a reaction answers',
     [(T, '!this.#apply(change, [shown, transition], [], () => host.classList.add(transition))', '!this.#apply(change, [], [], () => host.classList.add(transition))')]),
    ('the hide await reads no token', TT, 'stops a hide when the shown token leaves during its transition',
     [(T, HIDE_AWAIT, HIDE_AWAIT.replace('this.#holds(change, [shown, transition], [])', 'this.#holds(change, [], [])'))]),
    ('the hide completion door reads no token', TT, 'hide whose completing removal a reaction answers',
     [(T, 'this.#apply(change, [], [shown, transition], () => host.classList.remove(transition, shown))', 'this.#apply(change, [], [], () => host.classList.remove(transition, shown))')]),
    # Delegate
    ('the delegate has no toast route', DT, 'hides the toast a dismiss trigger names',
     [(D, '\t\tthis.#routeToast(event, event.target)\n', '')]),
    ('the dismiss route prevents no anchor click', DT, 'hides the toast a dismiss trigger names',
     [(D, PREVENT, '')]),
    ('the dismiss route prevents after the disabled check', DT, 'skips a dismiss trigger carrying the disabled',
     [(D, PREVENT + '\t\tif (this.#disabled(trigger)) return\n', '\t\tif (this.#disabled(trigger)) return\n' + PREVENT)]),
    ('a disabled trigger hides', DT, 'skips a dismiss trigger carrying the disabled',
     [(D, '\t\tif (this.#disabled(trigger)) return\n\t\tconst toast', '\t\tconst toast')]),
    ('the disabled attribute is not read', DT, 'skips a dismiss trigger carrying the disabled',
     [(D, " || trigger.hasAttribute('disabled')", '')]),
    ('the dismiss route reads no closest host', DT, 'hides the toast a dismiss trigger names',
     [(D, '\t\t\ttrigger.closest(`.${CSS.escape(this.#toast.classes.host)}`)', '\t\t\tnull')]),
    ('the host token is the default', DT, 'routes toast dismiss clicks by a replaced selector',
     [(D, 'CSS.escape(this.#toast.classes.host)', "CSS.escape('toast')")]),
    ('the delegate routes by the default toast selector', DT, 'routes toast dismiss clicks by a replaced selector',
     [(D, 'isSelector,\n\t\t\t\toptions?.toast?.selectors,', 'isSelector,\n\t\t\t\tundefined,')]),
    ('the delegate ignores the toast classes group', DT, 'routes toast dismiss clicks by a replaced selector',
     [(D, 'isClassToken,\n\t\t\t\toptions?.toast?.classes,', 'isClassToken,\n\t\t\t\tundefined,')]),
    ('the delegate ignores the toast attributes group', DT, 'routes toast dismiss clicks by a replaced selector',
     [(D, 'isAttributeName,\n\t\t\t\toptions?.toast?.attributes,', 'isAttributeName,\n\t\t\t\tundefined,')]),
    ('the delegate drives a toast outside its root', DT, 'leaves a toast outside its root alone',
     [(D, '\t\treturn isInstance(toast, HTMLElement) && this.#root.contains(toast) ? toast : undefined',
       '\t\treturn isInstance(toast, HTMLElement) ? toast : undefined')]),
    ('the toast mark is dropped', DT, 'hides a toast once per click under nested roots',
     [(D, 'if (toast === undefined || !this.#mark(event, Toast, toast)) return', 'if (toast === undefined) return')]),
    ('the toast owner is not looked up', DT, 'drives the toast a consumer constructed',
     [(D, 'const engine = Toast.find(toast) ?? this.#acquire(new Toast(toast, this.#toast))', 'const engine = this.#acquire(new Toast(toast, this.#toast))')]),
    ('the toast conflict is not refused', DT, 'refuses a click whose button host is the toast',
     [(D, '\t\tif (this.#contests(event.target)) return\n', '')]),
    ('the collapse half of the toast conflict is dropped', DT, 'collapse trigger names the toast',
     [(D, '\t\tconst opener = target.closest(this.#collapse.selectors.trigger)\n', '\t\tconst opener = target.closest(this.#collapse.selectors.trigger)\n\t\tif (opener !== toast) return false\n')]),
    ('a disabled trigger still contests', DT, 'the dismiss trigger inside the toast that is its button host is disabled',
     [(D, 'if (trigger === undefined || this.#disabled(trigger)) return false', 'if (trigger === undefined) return false')]),
    ('an owned toast is dropped while live', DT, 'hides the toast a dismiss trigger names',
     [(D, ' &&\n\t\t\t\tToast.find(engine.host) !== engine', '')]),
    ('the delegate does not validate the toast classes', DT, 'refuses a toast group value',
     [(D, "'TOAST_OPTION_INVALID',\n\t\t\t\tTOAST_CLASSES,\n\t\t\t\tisClassToken,", "'TOAST_OPTION_INVALID',\n\t\t\t\tTOAST_CLASSES,\n\t\t\t\tisSelector,")]),
    # Guards and barrel
    ('the toast event guard admits a payload', VT, 'requires a custom event whose detail',
     [(V, 'return isInstance(value, CustomEvent) && value.detail === null', 'return isInstance(value, CustomEvent)')]),
    ('the toast event guard reads detail uncontained', VT, 'returns false when a prototype or detail accessor throws',
     [(V, '\ttry {\n\t\treturn isInstance(value, CustomEvent) && value.detail === null\n\t} catch {\n\t\treturn false\n\t}', '\treturn isInstance(value, CustomEvent) && value.detail === null')]),
    ('the barrel omits the toast', IT, 'exports the browser surface',
     [(I, "export * from './Toast.js'\n", '')]),
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
        for test in [TT, DT, VT, IT]:
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
