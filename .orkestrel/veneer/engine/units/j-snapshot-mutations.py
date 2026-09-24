# J-SNAPSHOT mutation instrument, in the W2 shape (the J-TOOLTIP round-3 instrument's runner): applies
# each named mutation to src/browser/HostSnapshot.ts, runs the WHOLE test file the row names (no -t),
# reads Vitest's JSON report, records every failing case, then writes the original bytes back and
# checks the source's digest against the digest taken before the run, writing that receipt into the
# log. The first row swaps in the landed source (Veneer main afae42c) whole, so the log carries the
# red reading of the final test file against the code this unit replaced; that row lists every
# failing case rather than naming one.
import hashlib, json, pathlib, re, subprocess, sys

ROOT = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/snapshot')
REPORT = ROOT / 'tmp/j-snapshot/mutation-report.json'
LOG = ROOT / 'tmp/j-snapshot/mutations.log.txt'
VITEST = [
    'node', 'node_modules/vitest/vitest.mjs', 'run', '--config', 'vite.config.ts', '--no-cache',
    '--project', 'src:browser', '--reporter=json', f'--outputFile={REPORT}',
]
H = 'src/browser/HostSnapshot.ts'
T = 'tests/src/browser/HostSnapshot.test.ts'
D = 'tests/src/browser/Dropdown.test.ts'
OWNED = [H]

LANDED = subprocess.run(['git', 'show', 'HEAD:' + H], cwd=ROOT, capture_output=True, check=True).stdout.decode('utf-8')

HAND_BACK = ('\t\tif (leaving) {\n\t\t\tthis.#leaving = this.#leaving.filter(\n'
             '\t\t\t\t(presence) => presence.element !== element || presence.attribute !== attribute,\n'
             '\t\t\t)\n\t\t} else HostSnapshot.#join(element, attribute, this)\n')
REMAIN = ('\t\tif (holders.size > 0) {\n\t\t\trecords.set(attribute, { present: record.present, holders })\n'
          '\t\t\treturn false\n\t\t}\n')

MUTATIONS = [
    # S1: the shared presence record.
    ('the presence record withdrawn early (deleted and judged at the first leave)', T,
     'removes the class attribute of a trigger a button and a collapse share',
     [(H, REMAIN, '')]),
    ('the removal judged per snapshot again (each save reads the element, each leave judges)', T,
     'once every snapshot that saved on the element restores, in either order',
     [(H, 'present: record?.present ?? element.hasAttribute(attribute),',
       'present: element.hasAttribute(attribute),'),
      (H, '\t\t\trecords.set(attribute, { present: record.present, holders })\n\t\t\treturn false\n',
       '\t\t\trecords.set(attribute, { present: record.present, holders })\n\t\t\treturn !record.present\n')]),
    ('the presence read at restore time rather than save time', T,
     'removes the class attribute it found absent when restoring leaves the list empty',
     [(H, '\t\treturn !record.present\n\t}', '\t\treturn !element.hasAttribute(attribute)\n\t}')]),
    ('the record a save during its own restoration takes back is dropped', T,
     'keeps its share of the class record for a token it saves during its own restoration',
     [(H, HAND_BACK, '\t\tHostSnapshot.#join(element, attribute, this)\n')]),
    # S2: the write-back re-entry.
    ('the re-entry hand-off dropped (a nested restore walks only what it published)', T,
     'writes every target an interrupted restoration still owns',
     [(H, 'this.#published = [...this.#published, ...records.map((record) => record.target)]',
       'this.#published = records.map((record) => record.target)'),
      (H, 'this.#leaving = [...this.#leaving, ...this.#joined]', 'this.#leaving = this.#joined')]),
    ('the re-entry hand-off dropped, read on the Dropdown reproduction', T,
     'restores the whole placement before a dropdown destroy',
     [(H, 'this.#published = [...this.#published, ...records.map((record) => record.target)]',
       'this.#published = records.map((record) => record.target)'),
      (H, 'this.#leaving = [...this.#leaving, ...this.#joined]', 'this.#leaving = this.#joined')]),
    ('the lifetime read dropped (a nested restore writes again the target it runs inside)', T,
     'writes a target once when a reaction to that write restores the same snapshot again',
     [(H, 'entry.owner !== owner || entry.written) {', 'entry.owner !== owner) {')]),
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


def apply(edits):
    originals = {}
    for edit in edits:
        path, old, new = edit[0], edit[1], edit[2]
        file = ROOT / path
        if path not in originals:
            originals[path] = file.read_bytes()
        text = file.read_text(encoding='utf-8')
        if old is None:
            file.write_bytes(new.encode('utf-8'))
            continue
        if text.count(old) != 1:
            raise RuntimeError(f'expected 1 match in {path}, found {text.count(old)}')
        file.write_bytes(text.replace(old, new).encode('utf-8'))
    return originals


def main():
    wanted = sys.argv[1:]
    before = {path: digest(path) for path in OWNED}
    lines = [f'digest before: {json.dumps(before)}']
    originals = {}
    if not wanted:
        try:
            originals = apply([(H, None, LANDED)])
            code, result, tail = run(T)
            if result is None:
                line = f'NOREPORT exit={code} | the landed source | {T} | {tail}'
            else:
                total, failed, _ = result
                line = (f'LANDED exit={code} | the landed source (main afae42c) | {T} | {len(failed)} failed of {total} | '
                        f'failed: {[title for title, _ in failed]} | first failures: {[first_line(message) for _, message in failed]}')
        except Exception as error:
            line = f'ERR | the landed source | {error}'
        finally:
            for path, data in originals.items():
                (ROOT / path).write_bytes(data)
        print(line, flush=True)
        lines.append(line)
    for label, test, named, edits in MUTATIONS:
        if wanted and not any(word in label for word in wanted):
            continue
        originals = {}
        try:
            originals = apply(edits)
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
        for test in [T, D]:
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
