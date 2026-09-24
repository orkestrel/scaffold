# J-SCROLLSPY mutation instrument, derived from the retained J-COLLAPSE round-3 instrument
# (j-collapse-mutations-3.py): applies each named mutation to an owned source file, runs the WHOLE
# test file it names (no -t), reads Vitest's JSON report, and records every failing case, then writes
# the original bytes back. What changed from the source: the subject is this worktree's ScrollSpy,
# its delegate scan, its guard, its parsers, its tables, and its barrel row; the run is split into
# slices that each finish inside one foreground call, so `python mutations-1.py <start> <end>` runs
# MUTATIONS[start:end] and appends its rows to one log, the first slice recording the owned sources'
# digests, and `python mutations-1.py final` runs every named test file green and writes the receipt
# comparing the digests after the last slice with the ones the first slice recorded.
import hashlib, json, pathlib, re, subprocess, sys

ROOT = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/scrollspy')
REPORT = ROOT / 'tmp/j-scrollspy/mutation-report.json'
LOG = ROOT / 'tmp/j-scrollspy/mutations-1.log.txt'
VITEST = [
    'node', 'node_modules/vitest/vitest.mjs', 'run', '--config', 'vite.config.ts', '--no-cache',
    '--project', 'src:browser', '--reporter=json', f'--outputFile={REPORT}',
]
S = 'src/browser/ScrollSpy.ts'
D = 'src/browser/Delegate.ts'
V = 'src/browser/validators.ts'
P = 'src/browser/parsers.ts'
K = 'src/browser/constants.ts'
I = 'src/browser/index.ts'
ST = 'tests/src/browser/ScrollSpy.test.ts'
DT = 'tests/src/browser/Delegate.test.ts'
VT = 'tests/src/browser/validators.test.ts'
PT = 'tests/src/browser/parsers.test.ts'
IT = 'tests/src/browser/index.test.ts'
OWNED = [S, D, V, P, K, I]

DIRECTION = '\t\t\tif (down !== top >= this.#top) continue\n'
ORIGIN = '\t\t\tif (down && scroll === 0) return\n'
LEAVE = ('\t\t\t\tif (this.#link === link) this.#link = undefined\n'
         '\t\t\t\tif (!this.#apply(observer, [], link, false)) return\n')
HOST_TOP = 'top: top - root.getBoundingClientRect().top - root.clientTop + root.scrollTop,'
ROOT_RULE = "root: getComputedStyle(this.#host).overflowY === 'visible' ? null : this.#host,"
SCAN = '\t\t\t\tif (ScrollSpy.find(host) === undefined) this.#acquire(new ScrollSpy(host, scrollspy))\n'

MUTATIONS = [
    # Selection
    ('the first entering section wins whatever the direction', ST, 'activates the lower entering section',
     [(S, DIRECTION, ''), (S, ORIGIN, '\t\t\treturn\n')]),
    ('scrolling up takes the lower section too', ST, 'activates the lower entering section',
     [(S, DIRECTION, '\t\t\tif (!(top >= this.#top)) continue\n')]),
    ('a leaving section clears the active link whatever it names', ST, 'activates the lower entering section',
     [(S, '\t\t\t\tif (this.#link === link) this.#link = undefined\n', '\t\t\t\tthis.#link = undefined\n')]),
    ('a leaving section clears nothing', ST, 'clears the active link when its section leaves',
     [(S, LEAVE, '')]),
    ('the unscrolled root keeps no first section', ST, 'keeps the first entering section while the root has not scrolled',
     [(S, ORIGIN, '')]),
    ('the root is always the viewport', ST, 'activates the lower entering section',
     [(S, ROOT_RULE, 'root: null,')]),
    # Parents
    ('the parents are not activated', ST, 'activates the links that lead to the active one',
     [(S, '\t\tfor (const parent of this.#parents(link)) {\n', '\t\tfor (const parent of [link]) {\n')]),
    ('the dropdown toggle is not activated', ST, 'activates the links that lead to the active one',
     [(S, '\t\t\treturn isInstance(found, HTMLElement) ? [found] : []\n', '\t\t\treturn []\n')]),
    ('the parent walk leaves the target', ST, 'activates the links that lead to the active one',
     [(S, '\t\t\tholder !== undefined &&\n\t\t\tholder !== target &&\n\t\t\ttarget.contains(holder)\n', '\t\t\tholder !== undefined\n')]),
    ('the target keeps its active token', ST, 'restores every link it wrote on destruction',
     [(S, 'for (const element of [this.#target, ...cleared.filter(instanceOf(HTMLElement))]) {',
       'for (const element of cleared.filter(instanceOf(HTMLElement))) {')]),
    # Links
    ('a disabled link is observed', ST, 'observes no link without a fragment',
     [(S, '\t\t\tlink.classList.contains(this.#classes.disabled) ||\n', '')]),
    ('a link carrying the disabled attribute is observed', ST, 'observes no link without a fragment',
     [(S, "\t\t\t(disabled !== null && disabled !== 'false')\n", '\t\t\tfalse\n')]),
    ('a hidden section is observed', ST, 'observes no link without a fragment',
     [(S, 'section.checkVisibility({ visibilityProperty: true })', 'section.isConnected')]),
    ('refresh reads the links once', ST, 'observes no link without a fragment',
     [(S, '\t\tthis.#observer?.disconnect()\n\t\tconst links', '\t\tif (this.#observer !== undefined) return\n\t\tconst links')]),
    ('the section is looked up in the document', ST, 'leaves a section outside the host alone',
     [(S, 'this.#host.querySelector(`#${CSS.escape(id)}`)', 'this.#host.ownerDocument.querySelector(`#${CSS.escape(id)}`)')]),
    # Smooth scroll
    ('smooth is ignored', ST, 'scrolls the host smoothly',
     [(S, '\t\tif (resolved.smooth === true) {\n', '\t\tif (resolved.smooth === false) {\n')]),
    ('the host scroll jumps', ST, 'scrolls the host smoothly',
     [(S, HOST_TOP + "\n\t\t\t\tbehavior: 'smooth',", HOST_TOP + "\n\t\t\t\tbehavior: 'instant',")]),
    ("the click reads the clicked element's own link", ST, 'scrolls the host smoothly',
     [(S, "origin.closest('[href]')", 'origin')]),
    ("the host offset is Bootstrap's", ST, 'scrolls the host smoothly',
     [(S, HOST_TOP, 'top: section.offsetTop - this.#host.offsetTop,')]),
    ('the document scroll takes the offset from the host', ST, 'scrolls the document smoothly',
     [(S, 'view?.scrollTo({ top: top + view.scrollY, behavior: \'smooth\' })',
       "view?.scrollTo({ top: section.offsetTop - this.#host.offsetTop, behavior: 'smooth' })")]),
    ('the root is always the host', ST, 'scrolls the document smoothly',
     [(S, ROOT_RULE, 'root: this.#host,')]),
    # Options
    ('the target attribute is not read', ST, 'reads its target, smooth scroll, margin, and threshold',
     [(S, '{ target: parseElement, smooth: parseBoolean }', '{ smooth: parseBoolean }')]),
    ('the smooth attribute is not read', ST, 'reads its target, smooth scroll, margin, and threshold',
     [(S, '{ target: parseElement, smooth: parseBoolean }', '{ target: parseElement }')]),
    ('the margin attribute is not read', ST, 'reads its target, smooth scroll, margin, and threshold',
     [(S, '{ margin: parseRootMargin, threshold: parseThreshold }', '{ threshold: parseThreshold }')]),
    ('the threshold attribute is not read', ST, 'reads its target, smooth scroll, margin, and threshold',
     [(S, '{ margin: parseRootMargin, threshold: parseThreshold }', '{ margin: parseRootMargin }')]),
    ('the constructor margin is not validated', ST, 'refuses a group value, a host attribute, and an intersection value',
     [(S, '\t\tif (parseRootMargin(intersection.margin) === undefined) {\n', '\t\tif (false) {\n')]),
    ('the constructor threshold is not validated', ST, 'refuses a group value, a host attribute, and an intersection value',
     [(S, '\t\tif (parseThreshold(intersection.threshold) === undefined) {\n', '\t\tif (false) {\n')]),
    # Vocabulary
    ('the classes group is ignored', ST, 'only the replacing values when every group is replaced',
     [(S, 'isClassToken,\n\t\t\toptions?.classes,', 'isClassToken,\n\t\t\tundefined,')]),
    ('the attributes group is ignored', ST, 'only the replacing values when every group is replaced',
     [(S, 'isAttributeName,\n\t\t\toptions?.attributes,', 'isAttributeName,\n\t\t\tundefined,')]),
    ('the selectors group is ignored', ST, 'only the replacing values when every group is replaced',
     [(S, 'isSelector,\n\t\t\toptions?.selectors,', 'isSelector,\n\t\t\tundefined,')]),
    ('a class replacement is not validated', ST, 'refuses a group value, a host attribute, and an intersection value',
     [(S, 'SCROLL_SPY_CLASSES,\n\t\t\tisClassToken,', 'SCROLL_SPY_CLASSES,\n\t\t\tisSelector,')]),
    ('a default table is left unfrozen', ST, 'publishes frozen default tables',
     [(K, 'threshold: Object.freeze([0.1, 0.5, 1]),', 'threshold: [0.1, 0.5, 1],')]),
    # Ownership and lifetime
    ('the host is not claimed', ST, 'refuses an invalid host and a second owner',
     [(S, '\t\tScrollSpy.#registry.claim(host, this)\n', '')]),
    ('the host is not validated', ST, 'refuses an invalid host and a second owner',
     [(S, '\t\tif (!isInstance(host, HTMLElement)) {\n', '\t\tif (host === undefined) {\n')]),
    ('an abort after construction is ignored', ST, 'destroys the scrollspy when its signal aborts',
     [(S, "\t\t\tsignal?.addEventListener('abort', () => this.destroy(), {", "\t\t\tsignal?.addEventListener('abort', () => undefined, {")]),
    ('a signal that arrived aborted is ignored', ST, 'destroys the scrollspy when its signal aborts',
     [(S, '\t\tif (signal?.aborted) this.destroy()\n\t\telse {\n', '\t\t{\n')]),
    ('destruction restores nothing', ST, 'restores every link it wrote on destruction',
     [(S, '\t\tthis.#snapshot.restore()\n', '')]),
    ('destruction keeps observing and a delivery reads no lifetime', ST, 'restores every link it wrote on destruction',
     [(S, '\t\tthis.#controller.abort()\n\t\tthis.#observer?.disconnect()\n\t\tthis.#observer = undefined\n', '\t\tthis.#controller.abort()\n'),
      (S, '\t\t\t!this.#controller.signal.aborted &&\n\t\t\tthis.#observer === observer &&\n', '')]),
    # Doors
    ('a write is not followed by a read', ST, 'reaction to its parent write destroys it',
     [(S, '\t\t\telement.classList.toggle(token, active)\n\t\t}\n\t\treturn this.#holds(observer, present)',
       '\t\t\telement.classList.toggle(token, active)\n\t\t}\n\t\treturn true')]),
    ('the link token is not read after its write', ST, 'reaction to the link write removes the token',
     [(S, 'this.#apply(observer, [link], ', 'this.#apply(observer, [], ', 2)]),
    ('the dispatch is not followed by a read', ST, 'processes no further entry of a delivery',
     [(S, '\t\temitEvent(this.#host, SCROLL_SPY_EVENTS.activate, { relatedTarget: link }, false)\n\t\treturn this.#holds(observer, [])',
       '\t\temitEvent(this.#host, SCROLL_SPY_EVENTS.activate, { relatedTarget: link }, false)\n\t\treturn true')]),
    # Events
    ('the activate event is cancelable', ST, 'activates the lower entering section',
     [(S, '{ relatedTarget: link }, false)', '{ relatedTarget: link }, true)')]),
    ('the activate event names the host', ST, 'activates the lower entering section',
     [(S, '{ relatedTarget: link }, false)', '{ relatedTarget: this.#host }, false)')]),
    ('the hooks admit every custom event', ST, 'binds only engine-shaped events',
     [(S, 'bindEventMap(host, SCROLL_SPY_EVENTS, isScrollSpyEvent,', 'bindEventMap(host, SCROLL_SPY_EVENTS, (event) => event instanceof CustomEvent,')]),
    # Delegate
    ('the delegate has no scrollspy scan', DT, 'acquires a scrollspy for every host its root holds',
     [(D, SCAN, '')]),
    ('the scan constructs over a consumer scrollspy', DT, 'leaves a scrollspy a consumer constructed',
     [(D, SCAN, '\t\t\t\tthis.#acquire(new ScrollSpy(host, scrollspy))\n')]),
    ('the scanned scrollspy is not acquired', DT, 'acquires a scrollspy for every host its root holds',
     [(D, SCAN, '\t\t\t\tif (ScrollSpy.find(host) === undefined) new ScrollSpy(host, scrollspy)\n')]),
    ('the discard drops every scrollspy', DT, 'acquires a scrollspy for every host its root holds',
     [(D, ' &&\n\t\t\t\tScrollSpy.find(engine.host) !== engine\n', '\n')]),
    ('the delegate scans by the default host selector', DT, 'scans by a replaced host selector alone',
     [(D, 'isSelector,\n\t\t\t\toptions?.scrollspy?.selectors,', 'isSelector,\n\t\t\t\tundefined,')]),
    ('the delegate ignores the scrollspy classes group', DT, 'scans by a replaced host selector alone',
     [(D, 'isClassToken,\n\t\t\t\toptions?.scrollspy?.classes,', 'isClassToken,\n\t\t\t\tundefined,')]),
    ('the delegate does not validate the scrollspy classes', DT, 'refuses a scrollspy group value',
     [(D, "'SCROLL_SPY_OPTION_INVALID',\n\t\t\t\tSCROLL_SPY_CLASSES,\n\t\t\t\tisClassToken,", "'SCROLL_SPY_OPTION_INVALID',\n\t\t\t\tSCROLL_SPY_CLASSES,\n\t\t\t\tisSelector,")]),
    ('a scan refusal leaves the acquired scrollspies live', DT, 'destroys every scrollspy its scan acquired',
     [(D, '\t\t} catch (error) {\n\t\t\tthis.destroy()\n', '\t\t} catch (error) {\n')]),
    # Guard, parsers, barrel
    ('the scrollspy event guard admits any detail', VT, 'requires a custom event whose detail carries an HTML element',
     [(V, "\t\t\t'relatedTarget' in detail &&\n\t\t\tisInstance(detail.relatedTarget, HTMLElement)\n", "\t\t\t'relatedTarget' in detail\n")]),
    ('the scrollspy event guard admits any element', VT, 'requires a custom event whose detail carries an HTML element',
     [(V, 'isInstance(detail.relatedTarget, HTMLElement)', 'isInstance(detail.relatedTarget, Element)')]),
    ('the scrollspy event guard reads detail uncontained', VT, 'returns false when a prototype or related-target accessor throws',
     [(V, "\ttry {\n\t\tif (!isInstance(value, CustomEvent)) return false\n", "\t{\n\t\tif (!isInstance(value, CustomEvent)) return false\n"),
      (V, "\t\t\tisInstance(detail.relatedTarget, HTMLElement)\n\t\t)\n\t} catch {\n\t\treturn false\n\t}\n", "\t\t\tisInstance(detail.relatedTarget, HTMLElement)\n\t\t)\n\t}\n")]),
    ('the margin parser admits a blank string', PT, 'returns undefined for a margin the intersection observer refuses',
     [(P, "if (typeof value !== 'string' || value.trim() === '') return undefined", "if (typeof value !== 'string') return undefined")]),
    ('the margin parser admits any string', PT, 'returns undefined for a margin the intersection observer refuses',
     [(P, '\t\tnew IntersectionObserver(() => undefined, { rootMargin: value }).disconnect()\n', '')]),
    ('the threshold parser reads no JSON', PT, 'reads a comma-separated list and a JSON array',
     [(P, "\t\t\t: text.startsWith('[')\n\t\t\t\t? parseJSON(text)\n\t\t\t\t: text.split(',')", "\t\t\t: text.split(',')")]),
    ('the threshold parser reads members with parseFloat', PT, 'returns undefined for an empty list',
     [(P, 'text.split(\',\').map((part) => parseNumber(part))', 'text.split(\',\').map((part) => Number.parseFloat(part))')]),
    ('the threshold parser admits an empty list', PT, 'returns undefined for an empty list',
     [(P, 'return ratios !== undefined && ratios.length > 0 ? ratios : undefined', 'return ratios')]),
    ('the threshold parser admits any ratio', PT, 'returns undefined for an empty list',
     [(P, 'parseArray(list, boundsOf(0, 1))', 'parseArray(list, boundsOf())')]),
    ('the barrel omits the scrollspy', IT, 'exports the browser surface',
     [(I, "export * from './ScrollSpy.js'\n", '')]),
]


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
    return done.returncode, (len(cases), failed), ''


def append(lines):
    with LOG.open('a', encoding='utf-8', newline='\n') as handle:
        handle.write('\n'.join(lines) + '\n')


def main():
    if sys.argv[1:] == ['final']:
        lines = []
        for test in [ST, DT, VT, PT, IT]:
            code, result, tail = run(test)
            total, failed = result if result is not None else (0, ['no report'])
            line = f'GREEN? exit={code} | {test} | {len(failed)} failed of {total} | {failed}'
            print(line, flush=True)
            lines.append(line)
        before = json.loads(LOG.read_text(encoding='utf-8').splitlines()[0].removeprefix('digest before: '))
        after = {path: digest(path) for path in OWNED}
        receipt = 'restored byte for byte' if after == before else f'DIGEST MISMATCH {json.dumps(after)}'
        lines.append(f'digest after: {json.dumps(after)}')
        lines.append(f'receipt: {receipt}')
        print(lines[-1], flush=True)
        append(lines)
        return
    start, end = int(sys.argv[1]), int(sys.argv[2])
    lines = []
    if start == 0:
        LOG.write_text('', encoding='utf-8')
        lines.append(f'digest before: {json.dumps({path: digest(path) for path in OWNED})}')
    for label, test, named, edits in MUTATIONS[start:end]:
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
    append(lines)


main()
