# J-POPOVER mutation instrument, in the shape of the J-TOOLTIP round-5 instrument
# (scaffold/.orkestrel/veneer/engine/units/j-tooltip-mutations-5.py). One row per behaviour this unit
# pins: each field of the popover profile, the engine's profile read through `new.target`, the
# per-profile registry and id prefix, the class a descendant's engine is constructed from, the
# two-slot content rule and the content attribute read, the empty-slot removal, the manual
# promotion, the click and offset defaults, the placement's owner door (POP6) on both of its sides,
# the rebuild dispatch's container read alone, the popover guard, and the barrel row. The run shape is
# the round-5 one: apply each named mutation to an owned source file, run the WHOLE test file the row
# names (no -t), read Vitest's JSON report, record every failing case and the named case's first
# failure line, write the original bytes back, and check every mutated source's digest against the
# digest taken before the run, writing that receipt into the log. Cases are matched on their full
# name (describe and title), because two guard suites share their case titles. A control row, after
# the mutation rows, applies an edit its suite must not notice.
import hashlib, json, pathlib, re, subprocess, sys

ROOT = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/popover')
REPORT = ROOT / 'tmp/j-popover/mutation-report.json'
LOG = ROOT / 'tmp/j-popover/mutations.log.txt'
VITEST = [
    'node', 'node_modules/vitest/vitest.mjs', 'run', '--config', 'vite.config.ts', '--no-cache',
    '--project', 'src:browser', '--reporter=json', f'--outputFile={REPORT}',
]
P = 'src/browser/Popover.ts'
T = 'src/browser/Tooltip.ts'
L = 'src/browser/Placement.ts'
K = 'src/browser/constants.ts'
H = 'src/browser/helpers.ts'
V = 'src/browser/validators.ts'
I = 'src/browser/index.ts'
PT = 'tests/src/browser/Popover.test.ts'
TT = 'tests/src/browser/Tooltip.test.ts'
LT = 'tests/src/browser/Placement.test.ts'
DT = 'tests/src/browser/Dropdown.test.ts'
HT = 'tests/src/browser/helpers.test.ts'
VT = 'tests/src/browser/validators.test.ts'
IT = 'tests/src/browser/index.test.ts'
OWNED = [P, T, L, K, H, V, I]

TOGGLES = 'Popover toggles a header-and-body tip on a click'
FILLS = 'Popover fills the header from the title and the body from the content'
CLAIMS = 'Popover claims a trigger under its own profile beside a tooltip'
DOOR_BLOCK = ('\t\tif (options?.owned?.() === false) {\n\t\t\tthis.destroy()\n\t\t\treturn\n\t\t}\n')
POPOVER_GUARD = ("export function isPopoverEvent(value: unknown): value is PopoverEventMap['show'] {\n\ttry {\n"
                 '\t\treturn isInstance(value, CustomEvent) && value.detail === null\n')

MUTATIONS = [
    # Each field of the popover profile.
    ('the profile names the tooltip', PT, CLAIMS,
     [(P, "\t\tname: 'popover',\n", "\t\tname: 'tooltip',\n")]),
    ('the profile carries the tooltip events', PT, TOGGLES,
     [(P, '\t\tevents: POPOVER_EVENTS,\n', '\t\tevents: Tooltip.profile.events,\n')]),
    ('the profile guard refuses every event', PT, 'Popover runs an initial hook only for a popover event',
     [(P, '\t\tguard: isPopoverEvent,\n', '\t\tguard: (value: unknown): value is CustomEvent<null> => value === 0,\n')]),
    ('the profile carries the tooltip class tokens', PT, TOGGLES,
     [(P, '\t\tclasses: POPOVER_CLASSES,\n', '\t\tclasses: Tooltip.profile.classes,\n')]),
    ('the profile carries the tooltip attribute names', PT, FILLS,
     [(P, '\t\tattributes: POPOVER_ATTRIBUTES,\n', '\t\tattributes: Tooltip.profile.attributes,\n')]),
    ('the profile carries the tooltip selectors', PT, FILLS,
     [(P, '\t\tselectors: POPOVER_SELECTORS,\n', '\t\tselectors: Tooltip.profile.selectors,\n')]),
    ('the profile carries the tooltip defaults', PT, TOGGLES,
     [(P, '\t\tdefaults: POPOVER_DEFAULTS,\n', '\t\tdefaults: Tooltip.profile.defaults,\n')]),
    ('the profile promotes the tip as a hint', PT, TOGGLES,
     [(P, "\t\tpopover: 'manual',\n", "\t\tpopover: 'hint',\n")]),
    # The engine's side of the seam.
    ('the engine reads the tooltip profile whatever class it constructs', PT, TOGGLES,
     [(T, '\t\tconst profile = new.target.profile\n', '\t\tconst profile = Tooltip.profile\n')]),
    ('one registry serves every profile', PT, CLAIMS,
     [(T, '\t\tconst known = Tooltip.#registries.get(profile)\n',
       '\t\tconst known = Tooltip.#registries.get(Tooltip.profile)\n'),
      (T, '\t\tTooltip.#registries.set(profile, registry)\n',
       '\t\tTooltip.#registries.set(Tooltip.profile, registry)\n')]),
    ('the id prefix ignores the profile', PT, TOGGLES,
     [(T, '\t\tconst prefix = `vn-${this.#profile.name}-`\n', '\t\tconst prefix = `vn-tooltip-`\n')]),
    ('a descendant engine is always a tooltip', PT, 'Popover drives a popover for each matching descendant',
     [(T, '\t\t\tconst tooltip = new this.#class(match, {\n', '\t\t\tconst tooltip = new Tooltip(match, {\n')]),
    ('the engine promotes every tip as a hint', PT, TOGGLES,
     [(T, '\t\t\t\t\tpopover: this.#profile.popover,\n', "\t\t\t\t\tpopover: 'hint',\n")]),
    # The two-slot content rule and the empty-slot removal.
    ('the tip has no body slot', PT, FILLS,
     [(T, '\t\tconst body = this.#selectors.content\n', '\t\tconst body = undefined\n')]),
    ('the content attribute is not read', PT, FILLS,
     [(T, '\t\tconst source = this.#attributes.content\n', '\t\tconst source = undefined\n')]),
    ('an empty slot stays in the tip', PT, FILLS,
     [(H, "\tif (value === undefined || value === '') {\n\t\tslot.remove()\n",
       "\tif (value === undefined || value === '') {\n\t\tslot.replaceChildren()\n")]),
    # The defaults the popover changes.
    ('the click trigger is off by default', PT, TOGGLES,
     [(K, '\ttrigger: Object.freeze({ hover: false, focus: false, click: true }),\n',
       '\ttrigger: Object.freeze({ hover: false, focus: false, click: false }),\n')]),
    ('the offset is the tooltip offset', PT, TOGGLES,
     [(K, '\t\toffset: Object.freeze<[number, number]>([0, 8]),\n',
       '\t\toffset: Object.freeze<[number, number]>([0, 6]),\n')]),
    # POP6: the placement's owner door, on the placement's side and on the tooltip's.
    ('the placement reads no owner door (tooltip)', TT,
     'Tooltip resolves a show false and leaves the tip unpromoted and unpositioned',
     [(L, DOOR_BLOCK, '')]),
    ('the placement reads no owner door (placement)', LT, 'Placement reads its owner door once',
     [(L, DOOR_BLOCK, '')]),
    ('the tooltip supplies no door', TT,
     'Tooltip resolves a show false and leaves the tip unpromoted and unpositioned',
     [(T, '\t\t\t\t\towned: this.#holds.bind(this, change, false),\n', '')]),
    # The rebuild dispatch's container read alone: the token read stays.
    ("the rebuild's dispatch reads no container", TT,
     'Tooltip stops a rebuild whose show listener moves the settled tip into another container',
     [(T, '\t\t\tif (!this.#holds(change, held)) return false\n',
       '\t\t\tif (\n\t\t\t\t!this.#holds(change, undefined) ||\n'
       '\t\t\t\t(held === true && this.#tip?.classList.contains(this.#classes.shown) !== true)\n'
       '\t\t\t) {\n\t\t\t\treturn false\n\t\t\t}\n')]),
    # The guard and the barrel.
    ('the popover guard admits a payload', VT, 'isPopoverEvent requires a custom event whose detail',
     [(V, POPOVER_GUARD, POPOVER_GUARD.replace(' && value.detail === null', ''))]),
    ('the barrel omits the popover', IT, 'src browser entry exports the browser surface',
     [(I, "export * from './Popover.js'\n", '')]),
]

# A control row applies an edit the named suite must not notice: the dropdown supplies no door, so
# removing the placement's door read leaves the whole dropdown suite green (HELD), and any failure
# there reads BROKE.
CONTROLS = [
    ('the dropdown reads no owner door', DT, [(L, DOOR_BLOCK, '')]),
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
    failed = [(case['fullName'], (case.get('failureMessages') or [''])[0]) for case in cases
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
                hit = [title for title, _ in failed if title.startswith(named)]
                others = [title for title, _ in failed if not title.startswith(named)]
                cause = next((first_line(message) for title, message in failed if title.startswith(named)), '')
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
    for label, test, edits in CONTROLS:
        if wanted and not any(word in label for word in wanted):
            continue
        originals = {}
        try:
            for path, old, new in edits:
                file = ROOT / path
                if path not in originals:
                    originals[path] = file.read_bytes()
                text = file.read_text(encoding='utf-8')
                if text.count(old) != 1:
                    raise RuntimeError(f'expected 1 match in {path}, found {text.count(old)}')
                file.write_bytes(text.replace(old, new).encode('utf-8'))
            code, result, tail = run(test)
            if result is None:
                line = f'NOREPORT exit={code} | control {label} | {test} | {tail}'
            else:
                total, failed, _ = result
                verdict = 'HELD' if not failed else 'BROKE'
                line = (f'{verdict} exit={code} | control {label} | {test} | {len(failed)} failed of {total} | '
                        f'{[title for title, _ in failed]}')
        except Exception as error:
            line = f'ERR | control {label} | {error}'
        finally:
            for path, data in originals.items():
                (ROOT / path).write_bytes(data)
        print(line, flush=True)
        lines.append(line)
    if not wanted:
        for test in [PT, TT, LT, DT, HT, VT, IT]:
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
