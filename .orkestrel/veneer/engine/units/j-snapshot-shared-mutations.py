"""J-SNAPSHOT-SHARED mutation instrument.

Each row mutates one or more exact source spans, runs the whole test file it names through the real
`src:browser` Vitest project, and reads the named case's status from the JSON report. A kill row
passes when its case is collected and fails (KILLED); the control row passes when its case is
collected and passes (HELD). Every source is checked against its recorded SHA-256 digest before any
row runs, restored from the bytes read before the row after it runs, and checked against the
recorded digest again at the end, which prints the receipt `restored byte for byte`.

Run from the worktree root: python tmp/j-snapshot-shared/mutations.py
The log goes to tmp/j-snapshot-shared/mutations.log.txt as well as to standard output.
"""

import hashlib
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
REPORT = ROOT / 'tmp/j-snapshot-shared/mutation-report.json'
LOG = ROOT / 'tmp/j-snapshot-shared/mutations.log.txt'
VITEST = ROOT / 'node_modules/vitest/vitest.mjs'

# SHA-256 of each source a row mutates, recorded on the finished unit before the instrument's run.
RECORDED = {
    'src/browser/HostSnapshot.ts': '328b70e147f7100800f56b8b45f084c0fa12b106a8844e34aeeba1c44fc09e24',
    'src/browser/Alert.ts': '50e8b8d6a294691510e0a84121b8216a76e575aafaebbe3dc69ea756bcd9d617',
    'src/browser/Tab.ts': '2b22ca62b91f4007cc7309b728c07dca7ae09bbf51243c582b7c11b3f63a81a9',
    'src/browser/Tooltip.ts': '5819c51ffbcc98944a54103bed4960d5e1fcc4b8d4ba5c5824cb7422de7cfff9',
}

S = 'src/browser/HostSnapshot.ts'
H = 'tests/src/browser/HostSnapshot.test.ts'
SHARED = 'HostSnapshot writes a target two snapshots share back only at the last holder restoration, from the first save value, in either order'

# (id, obligation, mutation, edits, test file, case full name, expected)
ROWS = [
    (
        'READ',
        'S1',
        'every save reads the element, even while another snapshot holds the target',
        [(S, '\t\tif (record === undefined) {\n\t\t\tswitch (category) {', '\t\tif (record === undefined || record !== undefined) {\n\t\t\tswitch (category) {')],
        'tests/src/browser/Swipe.test.ts',
        'Swipe keeps the pointer token while a carousel or a swipe on the same host lives, and removes it after the last is destroyed, in either order',
        'failed',
    ),
    (
        'JOIN',
        'S1',
        'a later save replaces the holders of the record it joins',
        [(S, '\t\t\tholders: new Set([...(record?.holders ?? []), this]),\n\t\t\towner: undefined,', '\t\t\tholders: new Set([this]),\n\t\t\towner: undefined,')],
        H,
        SHARED,
        'failed',
    ),
    (
        'SILENT',
        'S1',
        'a restoration that is not the last holder owns and writes the target too',
        [(S, '\t\t\tif (holders.size > 0) records.set(key, { ...record, holders })\n', '\t\t\tif (holders.size > 0 && !restoring) records.set(key, { ...record, holders })\n')],
        'tests/src/browser/Carousel.test.ts',
        'Carousel keeps the pointer token of a touch replacement a reaction to an item restoration constructs, and removes it after the replacement is destroyed',
        'failed',
    ),
    (
        'LAST',
        'S1',
        'the last holder restoration owns no target and writes nothing back',
        [(S, '\t\t\t\towned.push(target)\n', '')],
        H,
        'HostSnapshot leaves a shared target to the holder a reaction restores, which writes the first save value back',
        'failed',
    ),
    (
        'CLEAR',
        'S3',
        'clear keeps every holding',
        [(S, '\t\tthis.#relinquish(false)\n', '')],
        H,
        'HostSnapshot relinquishes its holdings on clear without writing, so the last remaining holder writes the first save value back',
        'failed',
    ),
    (
        'CLEAR-PENDING',
        'S3',
        'clear keeps the ownership of a restoration in progress',
        [
            (
                S,
                '\t\tfor (const { category, element, name } of this.#published) {\n\t\t\tHostSnapshot.#withdraw(element, HostSnapshot.#key(category, name), this)\n\t\t}\n\t\tthis.#published = []\n\t\t// Leaving',
                '\t\tthis.#published = []\n\t\t// Leaving',
            )
        ],
        H,
        'HostSnapshot writes nothing more, removing no emptied class attribute, for an interrupted restoration a reaction to one of its writes clears',
        'failed',
    ),
    (
        'CLEAR-ALERT',
        'S3',
        'a completed alert close keeps its snapshot holding',
        [('src/browser/Alert.ts', '\t\t\tthis.#snapshot.clear()\n', '')],
        'tests/src/browser/Alert.test.ts',
        'Alert holds no record of the shown token after a completed close, so a fresh alert on the reused host restores the token its destruction finds recorded',
        'failed',
    ),
    (
        'TAB',
        'S4',
        'a tab saves only the initial attributes it writes',
        [('src/browser/Tab.ts', '\t\tfor (const { element, name } of planned) {\n', '\t\tfor (const { element, name } of writes) {\n')],
        'tests/src/browser/Tab.test.ts',
        'Tab keeps the roles and states of a live sibling tab when another tab of its list is destroyed, and restores the markup after the last',
        'failed',
    ),
    (
        'S5',
        'S5',
        'destruction leaves its tip id in aria-describedby',
        [('src/browser/Tooltip.ts', '\t\tif (linked !== undefined) this.#link(linked, false)\n', '\t\tvoid linked\n')],
        'tests/src/browser/Tooltip.test.ts',
        'Tooltip names only live tips in aria-describedby after it is destroyed while a popover on the same trigger lives, and restores its title and label',
        'failed',
    ),
    (
        'HELD',
        'control',
        'a last holder refuses to own a record another restoration already owns, the only case a save-order comparison decides',
        [(S, '\t\t\telse if (restoring) {\n', '\t\t\telse if (restoring && (record.owner === undefined || record.owner === this)) {\n')],
        H,
        'HostSnapshot writes an overlapping target back from its first save value at the last holder restoration, whichever restoration starts first',
        'passed',
    ),
]


def digest(data):
    return hashlib.sha256(data).hexdigest()


def emit(line, sink):
    print(line, flush=True)
    sink.append(line)


def status(case):
    report = json.loads(REPORT.read_text(encoding='utf-8'))
    found = [
        result['status']
        for suite in report.get('testResults', [])
        for result in suite.get('assertionResults', [])
        if result.get('fullName') == case
    ]
    return found[0] if len(found) == 1 else f'NOT COLLECTED ({len(found)})'


def run(test, case):
    if REPORT.exists():
        REPORT.unlink()
    subprocess.run(
        [
            'node',
            str(VITEST),
            'run',
            '--config',
            'vite.config.ts',
            '--no-cache',
            '--project',
            'src:browser',
            '--reporter=json',
            f'--outputFile={REPORT.relative_to(ROOT).as_posix()}',
            test,
        ],
        cwd=ROOT,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        check=False,
    )
    return status(case) if REPORT.exists() else 'NO REPORT'


def main():
    sink = []
    originals = {path: (ROOT / path).read_bytes() for path in RECORDED}
    for path, recorded in RECORDED.items():
        actual = digest(originals[path])
        if actual != recorded:
            emit(f'DIGEST MISMATCH {path}: recorded {recorded}, found {actual}', sink)
            LOG.write_text('\n'.join(sink) + '\n', encoding='utf-8')
            sys.exit(2)
        emit(f'digest {path} {actual}', sink)
    emit('| Row | Obligation | Mutation | Case | Expected | Reading | Verdict |', sink)
    emit('| --- | --- | --- | --- | --- | --- | --- |', sink)
    failures = 0
    for row, obligation, mutation, edits, test, case, expected in ROWS:
        try:
            texts = {path: originals[path].decode('utf-8') for path, _, _ in edits}
            for path, old, new in edits:
                count = texts[path].count(old)
                if count != 1:
                    raise ValueError(f'{path}: anchor found {count} times')
                texts[path] = texts[path].replace(old, new)
            for path, text in texts.items():
                (ROOT / path).write_bytes(text.encode('utf-8'))
            reading = run(test, case)
        except ValueError as error:
            reading = f'ANCHOR ({error})'
        finally:
            for path in {path for path, _, _ in edits}:
                (ROOT / path).write_bytes(originals[path])
        verdict = ('KILLED' if expected == 'failed' else 'HELD') if reading == expected else 'MISSED'
        if verdict == 'MISSED':
            failures += 1
        emit(f'| {row} | {obligation} | {mutation} | {test} > {case} | {expected} | {reading} | {verdict} |', sink)
    restored = all(digest((ROOT / path).read_bytes()) == recorded for path, recorded in RECORDED.items())
    emit('restored byte for byte' if restored else 'RESTORE FAILED', sink)
    emit(f'rows {len(ROWS)}, missed {failures}', sink)
    LOG.write_text('\n'.join(sink) + '\n', encoding='utf-8')
    sys.exit(0 if restored and failures == 0 else 1)


if __name__ == '__main__':
    main()
