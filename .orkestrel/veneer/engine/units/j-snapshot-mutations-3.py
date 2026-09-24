# J-SNAPSHOT round-3 mutation instrument, a successor of mutations-2.py (round 2). What changed: the
# LANDED row swaps in round 2's source (tmp/j-snapshot/HostSnapshot.round2.ts) whole, recording the
# red reading of the final test file against it; the S1'' rows are added (the taken-back record is
# not judged, and round 2's cleanup over the live leaving list restored); the re-entry hand-off row
# is also read on the destroy-inside-destroy Dropdown variant; every round-2 row is kept on its
# unchanged anchor. In the W2 shape: applies each named mutation, runs the WHOLE test file the row
# names (no -t), reads Vitest's JSON report, records every failing case and the first failure line
# of the named case, writes the original bytes back, and checks every mutated file's digest
# against the digest taken before the run. With --controls it runs only CONTROLS and writes
# mutations-3-controls.log.txt: each control names a proof shape an earlier round replaced, so a
# MISSED verdict there is the expected reading. A failed edit still restores every file it touched,
# because each file's original bytes are recorded before its first edit.
import hashlib, json, pathlib, re, subprocess, sys

ROOT = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/snapshot')
REPORT = ROOT / 'tmp/j-snapshot/mutation-report-3.json'
CONTROLLING = '--controls' in sys.argv
LOG = ROOT / ('tmp/j-snapshot/mutations-3-controls.log.txt' if CONTROLLING else 'tmp/j-snapshot/mutations-3.log.txt')
VITEST = [
    'node', 'node_modules/vitest/vitest.mjs', 'run', '--config', 'vite.config.ts', '--no-cache',
    '--project', 'src:browser', '--reporter=json', f'--outputFile={REPORT}',
]
H = 'src/browser/HostSnapshot.ts'
T = 'tests/src/browser/HostSnapshot.test.ts'
D = 'tests/src/browser/Dropdown.test.ts'
M = 'tests/src/browser/Modal.test.ts'
OWNED = [H, T]

ROUND2 = (ROOT / 'tmp/j-snapshot/HostSnapshot.round2.ts').read_text(encoding='utf-8')

REMAIN = ('\t\tif (holders.size > 0) records.set(attribute, { present: record.present, holders })\n'
          '\t\telse {\n\t\t\trecords.delete(attribute)\n'
          '\t\t\tif (records.size === 0) HostSnapshot.#presence.delete(element)\n\t\t}\n')
EARLY = ('\t\trecords.delete(attribute)\n'
         '\t\tif (records.size === 0) HostSnapshot.#presence.delete(element)\n')
LAST = ('\t\tif (holders.size > 0) {\n\t\t\trecords.set(attribute, { present: record.present, holders })\n'
        '\t\t\treturn false\n\t\t}\n'
        '\t\trecords.delete(attribute)\n'
        '\t\tif (records.size === 0) HostSnapshot.#presence.delete(element)\n')
TAKE_BACK = ('\t\tif (leaving) {\n\t\t\tthis.#leaving = this.#leaving.filter(\n'
             '\t\t\t\t(presence) => presence.element !== element || presence.attribute !== attribute,\n'
             '\t\t\t)\n\t\t\treturn\n\t\t}\n')
SHARED = ('present: record?.present ?? element.hasAttribute(attribute),', 'present: element.hasAttribute(attribute),')
HAND_OFF = [
    (H, 'this.#published = [...this.#published, ...records.map((record) => record.target)]',
     'this.#published = records.map((record) => record.target)'),
    (H, 'this.#leaving = [...this.#leaving, ...this.#joined]', 'this.#leaving = this.#joined'),
]
REMOVE = '\t\t\t\t\tif (value === undefined) target.element.removeAttribute(target.name)\n'
LATE = ('\t\t\t\t\tif (value === undefined) {\n\t\t\t\t\t\ttarget.element.removeAttribute(target.name)\n'
        "\t\t\t\t\t\tif (target.name === 'popover') target.element.setAttribute('data-popper-placement', 'late')\n"
        '\t\t\t\t\t}\n')
DELIVERED = '\t\texpect(delivered).toEqual([])\n'

MUTATIONS = [
    # S1 and S1': the shared presence record and the removal at every departure.
    ('the removal only at the last holder (round 1 rule)', T,
     'removes the class attribute of a trigger a button restoration leaves empty while a collapse on the same trigger stays live',
     [(H, REMAIN, LAST)]),
    ('the presence record withdrawn early (forgotten at the first departure)', T,
     'removes the class attribute of a trigger a button and a collapse share when the button restoration destroys the collapse',
     [(H, REMAIN, EARLY)]),
    ('the presence record withdrawn early, read on the style handoff case', T,
     'removes the style attribute after a snapshot saved inside a restoration property write restores',
     [(H, REMAIN, EARLY)]),
    ('each save reads the element again (the reading is not shared)', T,
     'found absent after every snapshot that saved on the element restores, in either order',
     [(H,) + SHARED]),
    ('each save reads the element again, read on the three overlapping class restorations', T,
     'removes the class attribute after three overlapping restorations, one saved inside another token write',
     [(H,) + SHARED]),
    ('each save reads the element again, read on the three overlapping style restorations', T,
     'removes the style attribute after three overlapping restorations, one saved inside another property write',
     [(H,) + SHARED]),
    ('the presence read at restore time rather than save time', T,
     'removes the class attribute it found absent when restoring leaves the list empty',
     [(H, '\t\treturn !record.present\n\t}', '\t\treturn !element.hasAttribute(attribute)\n\t}')]),
    ('the taken-back record is not read (the S1 repair of round 3)', T,
     'removes the class attribute its own writes left empty when a save during its restoration takes its share back',
     [(H, '\t\treturn HostSnapshot.#presence.get(element)?.get(attribute)?.present === false\n', '\t\treturn false\n')]),
    ('round 2 cleanup restored (the cleanup walks the live leaving list and departs only) (the S1 repair of round 3)', T,
     'removes the class attribute its own writes left empty when a save during its restoration takes its share back',
     [(H, '\t\t\tfor (const { element, attribute } of held) {\n', '\t\t\tfor (const { element, attribute } of this.#leaving) {\n', 2),
      (H, "!this.#absent(element, attribute)) continue", "!this.#leave(element, attribute)) continue", 2)]),
    ('the take-back of a holding a save during its own restoration makes is dropped', T,
     'keeps its share of the class record for a token it saves during its own restoration',
     [(H, TAKE_BACK, '')]),
    # S2 and S2': the write-back re-entry and its proofs.
    ('the re-entry hand-off dropped (a nested restore walks only what it published)', T,
     'writes every target an interrupted restoration still owns', HAND_OFF),
    ('the re-entry hand-off dropped, read on the Dropdown reproduction', T,
     'restores the whole placement before a dropdown destroy', HAND_OFF),
    ('the re-entry hand-off dropped, read on the retitled same-snapshot re-entry case', T,
     'writes every target and removes the class attribute when a reaction that saves a target during a token write',
     HAND_OFF),
    ('the re-entry hand-off dropped, read on the destroy-inside-destroy Dropdown variant', T,
     'restores the whole placement and the dropdown before a destroy', HAND_OFF),
    ('the written mark not read (a nested restore writes again the target whose write it runs inside)', T,
     'writes a target once when a reaction to that write restores the same snapshot again',
     [(H, 'entry.owner !== owner || entry.written) {', 'entry.owner !== owner) {')]),
    ('a late side write after the outer popover removal returns (the S2 negative control)', T,
     'restores the whole placement before a dropdown destroy', [(H, REMOVE, LATE)]),
]

CONTROLS = [
    ('the late side write against the round-1 proof shape (deliveries discarded, no delivered assertion)', T,
     'restores the whole placement before a dropdown destroy',
     [(H, REMOVE, LATE),
      (T, '\t\tconst observer = new MutationObserver((records) => delivered.push(...records))\n',
       '\t\tconst observer = new MutationObserver(() => {})\n', 2),
      (T, DELIVERED, '', 2)]),
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


def apply(edits, originals):
    # Records each file's original bytes before its first edit, so a failed edit still restores them.
    for edit in edits:
        path, old, new = edit[0], edit[1], edit[2]
        count = edit[3] if len(edit) > 3 else 1
        file = ROOT / path
        if path not in originals:
            originals[path] = file.read_bytes()
        text = file.read_text(encoding='utf-8')
        if old is None:
            file.write_bytes(new.encode('utf-8'))
            continue
        if text.count(old) != count:
            raise RuntimeError(f'expected {count} match in {path}, found {text.count(old)}: {old[:60]!r}')
        file.write_bytes(text.replace(old, new).encode('utf-8'))


def row(label, test, named, edits):
    originals = {}
    try:
        apply(edits, originals)
        code, result, tail = run(test)
        if result is None:
            return f'NOREPORT exit={code} | {label} | {test} | {tail}'
        total, failed, suites = result
        if named is None:
            return (f'LANDED exit={code} | {label} | {test} | {len(failed)} failed of {total} | '
                    f'failed: {[title for title, _ in failed]} | first failures: {[first_line(message) for _, message in failed]}')
        hit = [title for title, _ in failed if named in title]
        others = [title for title, _ in failed if named not in title]
        cause = next((first_line(message) for title, message in failed if named in title), '')
        verdict = 'EXACT' if hit and not others else 'JOINED' if hit else 'MISSED'
        return (f'{verdict} exit={code} | {label} | {test} | {len(failed)} failed of {total} | '
                f'named: {hit} | first failure: {cause} | joined: {others}'
                + (f' | suite failures: {[first_line(message) for message in suites]}' if suites else ''))
    except Exception as error:
        return f'ERR | {label} | {error}'
    finally:
        for path, data in originals.items():
            (ROOT / path).write_bytes(data)


def main():
    before = {path: digest(path) for path in OWNED}
    lines = [f'digest before: {json.dumps(before)}']
    if CONTROLLING:
        plan = CONTROLS
    else:
        plan = [('the round-2 source (tmp/j-snapshot/HostSnapshot.round2.ts)', T, None, [(H, None, ROUND2)])] + MUTATIONS
    for label, test, named, edits in plan:
        line = row(label, test, named, edits)
        print(line, flush=True)
        lines.append(line)
    if not CONTROLLING:
        for test in [T, D, M]:
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
