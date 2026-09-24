# J-HELPERS whole-file mutation instrument, in the W2 shape of j-toast-mutations-3.py: applies each
# named mutation to an owned source file, runs the WHOLE test file it names (no -t), reads Vitest's
# JSON report, records every failing case against the case the row names (EXACT when only the named
# case fails, JOINED when it fails beside others, MISSED when it passes), then writes the original
# bytes back and checks every owned source's digest against the digest taken before the run,
# writing that receipt into the log. The H8 rows come first; the rows under "Branches" answer the
# brief's first unknown, whether each branch of the three sibling-walk sites is pinned.
# Usage: python tmp/j-helpers/mutations.py [LOG_NAME] [WORD ...]; a WORD keeps only the rows whose
# label carries it, and a run with no WORD also runs every named test file unmutated.
import hashlib, json, pathlib, re, subprocess, sys

ROOT = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/helpers')
REPORT = ROOT / 'tmp/j-helpers/mutation-report.json'
VITEST = [
    'node', 'node_modules/vitest/vitest.mjs', 'run', '--config', 'vite.config.ts', '--no-cache',
    '--project', 'src:browser', '--reporter=json', f'--outputFile={REPORT}',
]
H = 'src/browser/helpers.ts'
D = 'src/browser/Delegate.ts'
DR = 'src/browser/Dropdown.ts'
S = 'src/browser/ScrollSpy.ts'
HT = 'tests/src/browser/helpers.test.ts'
DT = 'tests/src/browser/Delegate.test.ts'
DRT = 'tests/src/browser/Dropdown.test.ts'
ST = 'tests/src/browser/ScrollSpy.test.ts'
OWNED = [H, D, DR, S]

WALK = ('\t\tlet sibling = forward ? element.nextElementSibling : element.previousElementSibling;\n'
        '\t\tsibling !== null;\n'
        '\t\tsibling = forward ? sibling.nextElementSibling : sibling.previousElementSibling\n')
CLOSEST = ('\tconst match = element.closest(selector)\n'
           '\treturn isInstance(match, HTMLElement) && (root === undefined || root.contains(match))\n'
           '\t\t? match\n\t\t: undefined\n')
TOGGLE_PREVIOUS = '\t\t\t...readSiblings(container, trigger, false),\n'
TOGGLE_NEXT = '\t\t\t...readSiblings(container, trigger, true),\n'
TOGGLE_PARENT = '\t\t\t...(container.parentElement?.querySelectorAll(trigger) ?? []),\n'
MENU_NEXT = '\t\t\t...readSiblings(host, selector, true),\n'
MENU_PREVIOUS = '\t\t\t...readSiblings(host, selector, false),\n'
MENU_PARENT = '\t\t\t...(host.parentElement?.querySelectorAll(selector) ?? []),\n'

MUTATIONS = [
    # H8
    ('the direction is reversed in readSiblings', HT,
     'returns the matching siblings after or before the element, nearest first',
     [(H, WALK, WALK.replace('forward ?', '!forward ?', 2))]),
    ('readSiblings returns the farthest first', HT,
     'returns the matching siblings after or before the element, nearest first',
     [(H, '\t\tif (sibling.matches(selector)) siblings.push(sibling)\n',
       '\t\tif (sibling.matches(selector)) siblings.unshift(sibling)\n')]),
    ('readOutermost drops the :is() wrapper', HT, 'nests a selector list as one selector',
     [(H, '`:scope :is(${selector}) :is(${selector})`', '`:scope ${selector} ${selector}`')]),
    ('readOutermost excludes no nested match', HT, 'returns the matches no other match inside the root holds',
     [(H, '\t\t.filter((element) => !nested.has(element))\n', '\t\t.filter((element) => nested.size >= 0)\n')]),
    ('readScrollbarWidth drops the null-view guard', HT, 'returns 0 for a document with no view',
     [(H, 'return view === null ? 0 : Math.abs(view.innerWidth - document.documentElement.clientWidth)',
       'return Math.abs((view as Window).innerWidth - document.documentElement.clientWidth)')]),
    ('readClosest applies the containment before the guard, to the starting element', HT,
     'returns a match the root contains, the root itself included',
     [(H, CLOSEST, '\tconst match = element.closest(selector)\n'
       '\tif (root !== undefined && !root.contains(element)) return undefined\n'
       '\treturn isInstance(match, HTMLElement) ? match : undefined\n')]),
    ('readClosest widens the guard to Element', HT, 'returns undefined when the closest match is not an HTML element',
     [(H, CLOSEST, CLOSEST.replace('isInstance(match, HTMLElement)', 'isInstance(match, Element)'))]),
    ('readClosest passes a rejected match to a farther ancestor', HT, 'returns undefined when the closest match is not an HTML element',
     [(H, CLOSEST, '\tlet match = element.closest(selector)\n'
       '\twhile (match !== null && !isInstance(match, HTMLElement)) match = match.parentElement?.closest(selector) ?? null\n'
       '\treturn isInstance(match, HTMLElement) && (root === undefined || root.contains(match))\n'
       '\t\t? match\n\t\t: undefined\n')]),
    ('the bounded readTarget returns an inside later match', HT, 'bounds the first match alone by a root',
     [(H, '\tconst target = readTargets(trigger, attributes)[0]\n',
       '\tconst target = readTargets(trigger, attributes).find((element) => root === undefined || root.contains(element))\n')]),
    ('Dropdown refuses by the token and the platform state alone', DRT,
     'refuses to show, toggle, or hide an anchor toggle whose disabled attribute is not false',
     [(DR, '\t\t\tmatchesDisabled(this.#host, this.#classes.disabled)\n',
       '\t\t\tthis.#host.matches(`.${CSS.escape(this.#classes.disabled)}, :disabled`)\n')]),
    ('ScrollSpy reads a disabled attribute of false as disabled', ST,
     'observes a link whose disabled attribute reads false',
     [(S, "if (hash === '' || matchesDisabled(link, this.#classes.disabled)) return undefined",
       "if (hash === '' || matchesDisabled(link, this.#classes.disabled) || link.hasAttribute('disabled')) return undefined")]),
    # Branches
    ('branch: the toggle search skips the siblings before the menu', DT,
     'finds the toggle for a key inside a menu among the menu siblings',
     [(D, TOGGLE_PREVIOUS, '')]),
    ('branch: the toggle search skips the siblings after the menu', DT,
     'passes over a disabled toggle before the menu to the toggle after it',
     [(D, TOGGLE_NEXT, '')]),
    ('branch: the toggle search reads the siblings after the menu first', DT,
     'prefers the toggle before the menu to the one after it',
     [(D, TOGGLE_PREVIOUS + TOGGLE_NEXT, TOGGLE_NEXT + TOGGLE_PREVIOUS)]),
    ('branch: the toggle search skips the menu parent', DT,
     'falls back to the first toggle inside the menu parent',
     [(D, TOGGLE_PARENT, '')]),
    ('branch: the toggle search takes a disabled toggle', DT,
     'passes over a disabled toggle before the menu to the toggle after it',
     [(D, '\t\t].find((element) => !matchesDisabled(element, disabled))\n', '\t\t][0]\n')]),
    ('branch: the menu search skips the siblings after the toggle', DRT,
     'finds the menu after the toggle, then before it, then inside its parent',
     [(DR, MENU_NEXT, '')]),
    ('branch: the menu search skips the siblings before the toggle', DRT,
     'takes the nearest menu before the toggle over the first one in its parent',
     [(DR, MENU_PREVIOUS, '')]),
    ('branch: the menu search reads the siblings before the toggle first', DRT,
     'finds the menu after the toggle, then before it, then inside its parent',
     [(DR, MENU_NEXT + MENU_PREVIOUS, MENU_PREVIOUS + MENU_NEXT)]),
    ('branch: the menu search skips the toggle parent', DRT,
     'finds the menu after the toggle, then before it, then inside its parent',
     [(DR, MENU_PARENT, '')]),
    ('branch: the menu search takes a menu that is not HTML', DRT,
     'passes over a nearer menu that is not HTML',
     [(DR, '\t\t].find(instanceOf(HTMLElement))\n', '\t\t].find((element) => isInstance(element, Element))\n')]),
    ('branch: the scrollspy parent is the farthest preceding one', ST,
     'stops activating when a reaction to its parent write destroys it',
     [(S, 'const previous = readSiblings(holder, parent, false)[0]',
       'const previous = readSiblings(holder, parent, false).at(-1)')]),
    ('branch: the scrollspy reads no preceding parent', ST,
     'activates the links that lead to the active one',
     [(S, 'const previous = readSiblings(holder, parent, false)[0]', 'const previous = undefined')]),
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
    log = ROOT / 'tmp/j-helpers' / (sys.argv[1] if len(sys.argv) > 1 else 'mutations.log.txt')
    wanted = sys.argv[2:]
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
        for test in [HT, DT, DRT, ST]:
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
    log.write_text('\n'.join(lines) + '\n', encoding='utf-8', newline='\n')


main()
