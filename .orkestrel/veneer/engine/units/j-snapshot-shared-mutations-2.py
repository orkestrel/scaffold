"""J-SNAPSHOT-SHARED round-2 mutation instrument, the successor of mutations.py.

What changed from mutations.py: the round-1 rows re-run against the round-2 sources (their anchors
follow the `#owned` and `passed` renames and their case titles follow the retitles), and rows are
added for R1 (the attribute and property name folding), R2 (each engine's release on a construction
that throws, and the placement's early reads), and R4 (the `#linked` field against the simpler
teardown unlink).

Each row mutates one or more exact source spans, runs the whole test file it names through the real
`src:browser` Vitest project, and reads the named case's status from the JSON report. A kill row
passes when its case is collected and fails (KILLED); the control row passes when its case is
collected and passes (HELD). Every source is checked against its recorded SHA-256 digest before any
row runs, restored from the bytes read before the row after it runs, and checked against the
recorded digest again at the end, which prints the receipt `restored byte for byte`.

Run from the worktree root: python tmp/j-snapshot-shared/mutations-2.py
The log goes to tmp/j-snapshot-shared/mutations-2.log.txt as well as to standard output.
"""

import hashlib
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
REPORT = ROOT / 'tmp/j-snapshot-shared/mutation-report-2.json'
LOG = ROOT / 'tmp/j-snapshot-shared/mutations-2.log.txt'
VITEST = ROOT / 'node_modules/vitest/vitest.mjs'

# SHA-256 of each source a row mutates, recorded on the finished unit before the instrument's run.
RECORDED = {
    'src/browser/HostSnapshot.ts': '814a17d481d421079459d4082fea95be19bb7a2f99b5f8d04d53d6824117a8d3',
    'src/browser/Alert.ts': 'c11f5dcc78dbd6e15d4f86577045e6a6ef4a5366a190306be9448cd993fbd191',
    'src/browser/Tab.ts': 'c68264acba1325e7e633debdd007b06376e357563cc93323bae7b1b44c313164',
    'src/browser/Tooltip.ts': 'b4f48b3d6868a20cfa67023e7c7b04aa3aae1e75d7543d695e1d0b0352db704b',
    'src/browser/Button.ts': '993c63d05d9f523894251be82afc8033d2a6252b463dc912520df6be4b2b52e4',
    'src/browser/Carousel.ts': 'dff80b8caa7a4238c55cd3fe73011ebbb2adbd531fd6e83447321b87d2b50c53',
    'src/browser/Collapse.ts': 'd5924fe6894e3762337da42ee219b90f8792df20868f7945900e46e62d872738',
    'src/browser/Dropdown.ts': 'e8afef68897340e8d70e9c42fca7ecfb0eb8e69a0f9bcad7c384bc044053b90e',
    'src/browser/ScrollSpy.ts': '8d39eba242d0eaf7a3fe8ea972eb46fcdc9d12a125eb417e84ca081336889545',
    'src/browser/Toast.ts': '67bd93c4b99a7324a39ab967f710893cfcaa094b435efc9a790f62bad4ec17d0',
    'src/browser/Placement.ts': '1bcd7f3fa3ee4f47f595c85bf07ab13631218c9756dd7225913df136ac92d997',
}

S = 'src/browser/HostSnapshot.ts'
H = 'tests/src/browser/HostSnapshot.test.ts'
SHARED = 'HostSnapshot writes a target two snapshots share back only at the last holder restoration, from its record, in either order'
SPELLINGS = 'HostSnapshot joins one record for an attribute or a property saved under two spellings of its name on an HTML element, in either release order'
APART = 'HostSnapshot keeps attribute names that differ in case apart on an SVG element and on an HTML element outside an HTML document, and custom property names apart on any element'
RELEASE = '\t\t} catch (error) {\n\t\t\tthis.destroy()\n\t\t\tthrow error\n\t\t}\n\t}\n'
KEPT = '\t\t} catch (error) {\n\t\t\tthrow error\n\t\t}\n\t}\n'
THROWN = 'releases its claim when an option read throws during construction'


def released(entity, case):
    """Returns the row that keeps an engine's claim and records when its construction throws."""
    return (
        f'R2-{entity.upper()}',
        'R2',
        f'{entity} rethrows a construction failure without destroying itself',
        [(f'src/browser/{entity}.ts', RELEASE, KEPT)],
        f'tests/src/browser/{entity}.test.ts',
        f'{entity} {case}',
        'failed',
    )


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
        [(S, '\t\t\t\tpassed.push(target)\n', '')],
        H,
        'HostSnapshot leaves a shared target to the holder a reaction restores, which writes the record value back',
        'failed',
    ),
    (
        'CLEAR',
        'S3',
        'clear keeps every holding',
        [(S, '\t\tthis.#relinquish(false)\n', '')],
        H,
        'HostSnapshot relinquishes its holdings on clear without writing, so the last remaining holder writes the record value back',
        'failed',
    ),
    (
        'CLEAR-PENDING',
        'S3',
        'clear keeps the ownership of a restoration in progress',
        [
            (
                S,
                '\t\tfor (const target of this.#owned) {\n\t\t\tHostSnapshot.#withdraw(target.element, HostSnapshot.#key(target), this)\n\t\t}\n\t\tthis.#owned = []\n\t\t// Leaving',
                '\t\tthis.#owned = []\n\t\t// Leaving',
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
        'R1-FOLD',
        'R1',
        'every name keys its record as written',
        [(S, "\t\treturn `${category}:${folded ? name.replace(/[A-Z]/g, (letter) => letter.toLowerCase()) : name}`\n", '\t\treturn `${category}:${name}`\n')],
        H,
        SPELLINGS,
        'failed',
    ),
    (
        'R1-TAKEOVER',
        'R1',
        'an attribute name keys its record as written, a property name still folded',
        [
            (
                S,
                "\t\t\t(category === 'attribute' &&\n\t\t\t\telement.namespaceURI === 'http://www.w3.org/1999/xhtml' &&\n\t\t\t\telement.ownerDocument.contentType === 'text/html') ||\n",
                '',
            )
        ],
        H,
        'HostSnapshot joins the record a restoration still owns when a reaction saves the attribute under another spelling of its name',
        'failed',
    ),
    (
        'R1-NAMESPACE',
        'R1',
        'an attribute name folds on an element outside the HTML namespace',
        [(S, "\t\t\t\telement.namespaceURI === 'http://www.w3.org/1999/xhtml' &&\n", '')],
        H,
        APART,
        'failed',
    ),
    (
        'R1-DOCUMENT',
        'R1',
        'an attribute name folds on an HTML element outside an HTML document',
        [(S, "\t\t\t\telement.ownerDocument.contentType === 'text/html') ||\n", '\t\t\t\ttrue) ||\n')],
        H,
        APART,
        'failed',
    ),
    (
        'R1-CUSTOM',
        'R1',
        'a custom property name folds',
        [(S, "\t\t\t(category === 'property' && !name.startsWith('--'))\n", "\t\t\tcategory === 'property'\n")],
        H,
        APART,
        'failed',
    ),
    released('Button', 'releases its claim and its records when an option read throws during construction'),
    released('Collapse', THROWN),
    released('Alert', THROWN),
    released('Toast', THROWN),
    released('ScrollSpy', THROWN),
    released('Dropdown', 'releases its claim and its listeners when an option read throws during construction'),
    released('Tab', 'releases its claim and writes nothing when an option read throws during construction'),
    released('Carousel', 'releases its claim and restores the pointer token when an option read throws during construction'),
    released('Tooltip', 'releases its claim and restores the title and label it moved when an option read throws during construction'),
    (
        'R2-PLACEMENT',
        'R2',
        'placement reads its position after the promotion again',
        [
            ('src/browser/Placement.ts', '\t\tconst area = PLACEMENT_AREAS[options?.position ?? PLACEMENT_DEFAULTS.position]\n', '\t\tconst area = PLACEMENT_AREAS[PLACEMENT_DEFAULTS.position]\n'),
            ('src/browser/Placement.ts', "\t\telement.setAttribute('popover', popover)\n", "\t\telement.setAttribute('popover', popover)\n\t\tvoid options?.position\n"),
        ],
        'tests/src/browser/Placement.test.ts',
        'Placement writes nothing when an option read throws during construction',
        'failed',
    ),
    (
        'R4-LINKED',
        'R4',
        'the simpler shape: no destroy unlink, the teardown unlinks whatever the lifetime',
        [
            ('src/browser/Tooltip.ts', '\t\tconst linked = this.#linked\n\t\tif (linked !== undefined) this.#link(linked, false)\n', ''),
            ('src/browser/Tooltip.ts', '\t\tif (!this.#controller.signal.aborted) this.#link(tip.id, false)\n', '\t\tthis.#link(tip.id, false)\n'),
        ],
        'tests/src/browser/Tooltip.test.ts',
        'Tooltip takes its tip id out when a closing beforetoggle listener destroys it inside a hide while a popover on the same trigger lives, holding no record after',
        'failed',
    ),
    (
        'HELD',
        'control',
        'a last holder refuses to own a record another restoration already owns, the only case a save-order comparison decides',
        [(S, '\t\t\telse if (restoring) {\n', '\t\t\telse if (restoring && (record.owner === undefined || record.owner === this)) {\n')],
        H,
        'HostSnapshot writes an overlapping target back from its record at the last holder restoration, whichever restoration starts first',
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
