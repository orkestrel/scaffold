# J-ALERT round-2 mutation instrument, a copy of mutations.py with every round-1 row kept (strings
# updated to the round-2 source: the close dispatch inside the try, the #reach and #locate names) and
# the round-2 rows added (E15's marker rows, the focus row, the closest-inside-root row): applies each
# named mutation to an owned source file, runs the WHOLE test file it names (no -t), reads Vitest's
# JSON report, and records every failing case, then writes the original bytes back and checks every
# owned source's digest against the digest taken before the run, writing that receipt into the log.
import hashlib, json, pathlib, re, subprocess, sys

ROOT = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/alert')
REPORT = ROOT / 'tmp/j-alert/mutation-report-2.json'
LOG = ROOT / 'tmp/j-alert/mutations-2.log.txt'
VITEST = [
    'node', 'node_modules/vitest/vitest.mjs', 'run', '--config', 'vite.config.ts', '--no-cache',
    '--project', 'src:browser', '--reporter=json', f'--outputFile={REPORT}',
]
A = 'src/browser/Alert.ts'
D = 'src/browser/Delegate.ts'
V = 'src/browser/validators.ts'
K = 'src/browser/constants.ts'
I = 'src/browser/index.ts'
AT = 'tests/src/browser/Alert.test.ts'
DT = 'tests/src/browser/Delegate.test.ts'
VT = 'tests/src/browser/validators.test.ts'
IT = 'tests/src/browser/index.test.ts'
OWNED = [A, D, V, K, I]

SETTLE = '\t\t\t\tawait settleAnimations(host, this.#controller.signal)\n'
POST_WAIT = '\t\t\t\tif (!this.#holds()) return false\n'
REMOVAL = '\t\t\tif (!this.#apply(() => host.remove()) || host.isConnected) return false\n'
CLOSED = '\t\t\temitEvent(host, ALERT_EVENTS.closed, null, false)\n'
SECOND_REFUSAL = ('\t\t\t// again before any write.\n'
                  '\t\t\tif (this.#controller.signal.aborted) return false\n')
MARKED = ('\t\tthis.#closing = true\n'
          '\t\ttry {\n'
          '\t\t\tif (!emitEvent(this.#host, ALERT_EVENTS.close, null, true)) return false\n')
PREVENT = ('\t\tif (isInstance(trigger, HTMLAnchorElement) || isInstance(trigger, HTMLAreaElement)) {\n'
           '\t\t\tevent.preventDefault()\n'
           '\t\t}\n')
RESOLVE = '\t\tconst host = this.#locate(trigger, classes, attributes)\n'
ALERT_HOSTS = '\t\t\t...(alert !== undefined && Alert.find(alert) === undefined ? [alert] : []),\n'

MUTATIONS = [
    # Lifecycle
    ('the shown token is not removed', AT, 'closes an alert without the fade token inside the call',
     [(A, '() => host.classList.remove(shown)', '() => host.classList.remove()')]),
    ('the host is not removed', AT, 'closes an alert without the fade token inside the call',
     [(A, '() => host.remove()', '() => undefined')]),
    ('a completed close does not release the alert', AT, 'closes an alert without the fade token inside the call',
     [(A, '\t\t\tthis.#release()\n\t\t\treturn true', '\t\t\treturn true')]),
    ('a completed close restores the alert', AT, 'closes an alert without the fade token inside the call',
     [(A, '\t\t\tthis.#release()\n\t\t\treturn true', '\t\t\tthis.destroy()\n\t\t\treturn true')]),
    ('every close waits', AT, 'closes an alert without the fade token inside the call',
     [(A, 'if (host.classList.contains(fade)) {', 'if (fade.length > 0) {')]),
    # Motion
    ('the fade wait is dropped', AT, 'fades an alert carrying the fade token out',
     [(A, SETTLE, '')]),
    ('the layout read is dropped', AT, 'fades an alert carrying the fade token out',
     [(A, '\t\t\treflow(host)\n', '')]),
    ('a fallback timer follows the settle', AT, 'with no fallback timer',
     [(A, SETTLE, SETTLE + '\t\t\t\tawait new Promise((resolve) => setTimeout(resolve, 150))\n')]),
    # Events
    ('closed is dispatched before the removal', AT, 'closed on the removed host alone',
     [(A, REMOVAL + CLOSED, CLOSED + REMOVAL)]),
    ('the close event is not cancelable', AT, 'dispatches a cancelable close',
     [(A, 'ALERT_EVENTS.close, null, true)', 'ALERT_EVENTS.close, null, false)')]),
    ('the closed event is cancelable', AT, 'dispatches a cancelable close',
     [(A, 'ALERT_EVENTS.closed, null, false)', 'ALERT_EVENTS.closed, null, true)')]),
    ('the hooks admit a payload', AT, 'binds only engine-shaped events to hooks',
     [(V, 'return isInstance(value, CustomEvent) && value.detail === null', 'return isInstance(value, CustomEvent)')]),
    # Cancellation and flight
    ('the close event return value is ignored', AT, 'when a listener prevents close',
     [(A, 'if (!emitEvent(this.#host, ALERT_EVENTS.close, null, true)) return false', 'emitEvent(this.#host, ALERT_EVENTS.close, null, true)')]),
    ('the in-flight guard is dropped', AT, 'resolves false for a call while a close is in flight',
     [(A, 'return this.#controller.signal.aborted || this.#closing', 'return this.#controller.signal.aborted')]),
    ('a stopped close stays in flight', AT, 'adds the token back, keeping the host and leaving no close in flight',
     [(A, '\t\t} finally {\n\t\t\tthis.#closing = false\n\t\t}', '\t\t} finally {\n\t\t\tvoid this.#closing\n\t\t}')]),
    # Cleanup
    ('the shown token is not saved', AT, 'abandons the fade on destruction',
     [(A, "\t\t\tthis.#snapshot.save({ category: 'token', element: host, name: shown })\n", '')]),
    ('destruction omits the abort', AT, 'abandons the fade on destruction',
     [(A, '\t\tif (this.#controller.signal.aborted) return\n\t\t// The claim', '\t\t// The claim'),
      (A, '\t\tthis.#release()\n\t\tthis.#snapshot.restore()', '\t\tAlert.#registry.release(this.#host, this)\n\t\tthis.#snapshot.restore()')]),
    ('the signal is ignored', AT, 'destroys the alert when its signal aborts',
     [(A, '\t\tif (signal?.aborted) this.destroy()\n\t\telse {', '\t\tif (signal === undefined) this.destroy()\n\t\telse {')]),
    # Vocabulary
    ('the classes group is ignored', AT, 'only the replacing class tokens',
     [(A, 'isClassToken,\n\t\t\toptions?.classes,', 'isClassToken,\n\t\t\tundefined,')]),
    ('a class replacement is not validated', AT, 'refuses a group value',
     [(A, 'ALERT_CLASSES,\n\t\t\tisClassToken,', 'ALERT_CLASSES,\n\t\t\tisSelector,')]),
    ('the attributes group is not validated', AT, 'refuses a group value',
     [(A, 'isAttributeName,\n\t\t\toptions?.attributes,', 'isAttributeName,\n\t\t\tundefined,')]),
    ('the selectors group is not validated', AT, 'refuses a group value',
     [(A, 'ALERT_SELECTORS, isSelector, options?.selectors)', 'ALERT_SELECTORS, isSelector, undefined)')]),
    ('a default table is left unfrozen', AT, 'publishes frozen default tables',
     [(K, 'export const ALERT_CLASSES: AlertClassMap = Object.freeze({', 'export const ALERT_CLASSES: AlertClassMap = ({')]),
    # Ownership
    ('the host is not claimed', AT, 'refuses an invalid host and a second owner',
     [(A, '\t\tAlert.#registry.claim(host, this)\n', '')]),
    # Doors
    ('a write is not followed by a read', AT, 'reaction to its shown-token removal destroys it',
     [(A, '\t\twrite()\n\t\treturn this.#holds()', '\t\twrite()\n\t\treturn true')]),
    ('the close dispatch is not followed by a read', AT, 'writes nothing when a listener to its close event destroys it',
     [(A, SECOND_REFUSAL, '\t\t\t// again before any write.\n')]),
    ('the marker is set after the dispatch', AT, 'refuses a close that a listener to its close event starts on every dispatch',
     [(A, MARKED, '\t\ttry {\n\t\t\tif (!emitEvent(this.#host, ALERT_EVENTS.close, null, true)) return false\n\t\t\tthis.#closing = true\n')]),
    ('the marker is not cleared after a prevented close', AT, 'when a listener prevents close',
     [(A, MARKED, '\t\tthis.#closing = true\n\t\tif (!emitEvent(this.#host, ALERT_EVENTS.close, null, true)) return false\n\t\ttry {\n')]),
    ('the post-wait read is dropped', AT, 'the shown token returns during the fade',
     [(A, POST_WAIT, '')]),
    ('the removal door reads no lifetime', AT, 'reaction to its removal of the host destroys it',
     [(A, REMOVAL, '\t\t\thost.remove()\n\t\t\tif (host.isConnected) return false\n')]),
    ('the removal door ignores a reinsertion', AT, 'reaction to its removal of the host inserts it again',
     [(A, REMOVAL, '\t\t\tif (!this.#apply(() => host.remove())) return false\n')]),
    ('the completion reads no lifetime', AT, 'listener to its closed event destroys it',
     [(A, '\t\t\tif (this.#controller.signal.aborted) return false\n\t\t\tthis.#release()', '\t\t\tthis.#release()')]),
    # Delegate
    ('the delegate has no alert route', DT, 'closes the alert a dismiss trigger names',
     [(D, '\t\tthis.#routeAlert(event, event.target)\n', '')]),
    ('the dismiss route prevents no anchor click', DT, 'closes the alert a dismiss trigger names',
     [(D, PREVENT, '')]),
    ('the dismiss route prevents every click', DT, 'closes the alert a dismiss trigger names',
     [(D, 'if (isInstance(trigger, HTMLAnchorElement) || isInstance(trigger, HTMLAreaElement)) {', 'if (trigger.isConnected) {')]),
    ('the disabled check comes before the prevention', DT, 'preventing an anchor trigger default all the same',
     [(D, PREVENT + RESOLVE, RESOLVE + '\t\tif (host === undefined) return undefined\n' + PREVENT)]),
    ('the disabled token is ignored', DT, 'skips a dismiss trigger carrying the disabled token',
     [(D, 'trigger.classList.contains(classes.disabled) || ', '')]),
    ('the disabled attribute is ignored', DT, 'skips a dismiss trigger carrying the disabled token',
     [(D, " || trigger.hasAttribute('disabled')", '')]),
    ('the target attribute is not read', DT, 'closes the alert a dismiss trigger names',
     [(D, 'readTarget(trigger, attributes) ?? ', '')]),
    ('the host-token fallback is dropped', DT, 'closes the alert a dismiss trigger names',
     [(D, ' ?? trigger.closest(`.${CSS.escape(classes.host)}`)', '')]),
    ('the dismiss route closes an alert outside its root', DT, 'leaves an alert outside its root alone',
     [(D, 'return isInstance(host, HTMLElement) && this.#root.contains(host) ? host : undefined', 'return isInstance(host, HTMLElement) ? host : undefined')]),
    ('the consumer alert is not looked up', DT, 'drives the alert a consumer constructed',
     [(D, 'const engine = Alert.find(host) ?? this.#acquire(new Alert(host, this.#alert))', 'const engine = this.#acquire(new Alert(host, this.#alert))')]),
    ('the delegate does not own the alerts it constructs', DT, 'restores an alert whose fade is in flight when the delegate',
     [(D, 'Alert.find(host) ?? this.#acquire(new Alert(host, this.#alert))', 'Alert.find(host) ?? new Alert(host, this.#alert)')]),
    ('the delegate drops a live alert at the next click', DT, 'restores an alert whose fade is in flight when the delegate',
     [(D, '\t\t\t\tCollapse.find(engine.host) !== engine &&\n\t\t\t\tAlert.find(engine.host) !== engine\n', '\t\t\t\tCollapse.find(engine.host) !== engine\n')]),
    ('the delegate routes by the default dismiss selector', DT, 'routes dismiss clicks by a replaced selector',
     [(D, 'isSelector,\n\t\t\t\toptions?.alert?.selectors,', 'isSelector,\n\t\t\t\tundefined,')]),
    ('the delegate ignores the alert classes group', DT, 'routes dismiss clicks by a replaced selector',
     [(D, 'isClassToken,\n\t\t\t\toptions?.alert?.classes,', 'isClassToken,\n\t\t\t\tundefined,')]),
    ('the delegate ignores the alert attributes group', DT, 'routes dismiss clicks by a replaced selector',
     [(D, 'isAttributeName,\n\t\t\t\toptions?.alert?.attributes,', 'isAttributeName,\n\t\t\t\tundefined,')]),
    ('the delegate does not validate the alert classes', DT, 'refuses an alert group value',
     [(D, "'ALERT_OPTION_INVALID',\n\t\t\t\tALERT_CLASSES,\n\t\t\t\tisClassToken,", "'ALERT_OPTION_INVALID',\n\t\t\t\tALERT_CLASSES,\n\t\t\t\tisSelector,")]),
    ('the conflict ignores the alert against the button host', DT, 'refuses a click whose button host is the alert',
     [(D, ALERT_HOSTS, '')]),
    ('the conflict ignores the alert against a panel', DT, 'refuses a click whose collapse trigger names the alert',
     [(D, ALERT_HOSTS, '')]),
    ('the conflict ignores a consumer alert engine', DT, 'carries an alert a consumer constructed',
     [(D, 'alert !== undefined && Alert.find(alert) === undefined ? [alert]', 'alert !== undefined ? [alert]')]),
    ('the conflict ignores a consumer button engine', DT, 'carries a button a consumer constructed',
     [(D, 'host !== undefined && Button.find(host) === undefined ? [host]', 'host !== undefined ? [host]')]),
    ('the alert mark is dropped', DT, 'closes an alert under nested roots once per click',
     [(D, 'return this.#mark(event, route, host) ? host : undefined', 'return host')]),
    ('the dismiss route runs after the delegate is destroyed', DT, 'closes no alert after a listener destroys the delegate',
     [(D, 'if (host === undefined || this.#controller.signal.aborted) return undefined', 'if (host === undefined) return undefined')]),
    ('the dismiss route moves focus outside the alert', DT, 'closes an alert through a trusted click on its close control, moving focus nowhere',
     [(D, '\t\tif (host === undefined) return\n\t\tconst engine = Alert.find(host)', '\t\tif (host === undefined) return\n\t\tconst focusable = host.previousElementSibling\n\t\tif (isInstance(focusable, HTMLElement)) focusable.focus()\n\t\tconst engine = Alert.find(host)')]),
    ('the closest match ignores the root', DT, 'ignores unmatched targets and a closest host outside the root',
     [(D, 'return isInstance(element, HTMLElement) && this.#root.contains(element) ? element : undefined', 'return isInstance(element, HTMLElement) ? element : undefined')]),
    # Guard and barrel
    ('the alert event guard admits a payload', VT, 'requires a custom event whose detail the platform reads as absent',
     [(V, 'return isInstance(value, CustomEvent) && value.detail === null', 'return isInstance(value, CustomEvent)')]),
    ('the alert event guard reads any object', VT, 'requires a custom event whose detail the platform reads as absent',
     [(V, 'return isInstance(value, CustomEvent) && value.detail === null', "return typeof value === 'object' && value !== null && 'detail' in value && value.detail === null")]),
    ('the alert event guard reads detail uncontained', VT, 'returns false when a prototype or detail accessor throws',
     [(V, '\ttry {\n\t\treturn isInstance(value, CustomEvent) && value.detail === null\n\t} catch {\n\t\treturn false\n\t}', '\treturn isInstance(value, CustomEvent) && value.detail === null')]),
    ('the barrel omits the alert', IT, 'exports the browser surface',
     [(I, "export * from './Alert.js'\n", '')]),
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
        for test in [AT, DT, VT, IT]:
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
