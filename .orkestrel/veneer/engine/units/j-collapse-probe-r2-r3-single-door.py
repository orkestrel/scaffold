# The Orchestrator's mutate-run-restore probe for the J-COLLAPSE round-3 referrals R2 and R3 (the
# subjective lane): one door at a time, empties the hide's post-removal `[shown]` read at the
# host-and-shown removal, at the size clearing, and at the post-await read (the trigger door has its
# own proof), and narrows the delegate's conflict read to the target attribute alone; runs the whole
# named test file on the browser project with Vitest's JSON reporter, records every failing case,
# restores the bytes, and checks the digest.
# Usage: python collapse-mutate-probe-2.py <worktree root> <log path>
import hashlib, json, pathlib, subprocess, sys

ROOT = pathlib.Path(sys.argv[1])
REPORT = ROOT / 'tmp/j-collapse/orchestrator-probe-2-report.json'
VITEST = [
    'node', 'node_modules/vitest/vitest.mjs', 'run', '--config', 'vite.config.ts', '--no-cache',
    '--project', 'src:browser', '--reporter=json', f'--outputFile={REPORT}',
]
C = 'src/browser/Collapse.ts'
D = 'src/browser/Delegate.ts'
CT = 'tests/src/browser/Collapse.test.ts'
DT = 'tests/src/browser/Delegate.test.ts'

REMOVAL = "\t\t\t!this.#apply(change, during, [shown], () => host.classList.remove(this.#classes.host, shown))\n"
CLEARING = "\t\tif (!this.#apply(change, during, [shown], () => host.style.removeProperty(dimension))) {\n"
POST_AWAIT = "\t\tif (!this.#holds(change, during, [shown])) return false\n"
CONFLICT = "\t\t\treadTargets(trigger, this.#collapse.attributes).includes(host) &&\n"

MUTATIONS = [
    ('R2a: the host-and-shown removal door admits the shown token', CT, [(C, REMOVAL, REMOVAL.replace('[shown]', '[]'))]),
    ('R2b: the size-clearing door admits the shown token', CT, [(C, CLEARING, CLEARING.replace('[shown]', '[]'))]),
    ('R2c: the post-await read admits the shown token', CT, [(C, POST_AWAIT, POST_AWAIT.replace('[shown]', '[]'))]),
    ('R3: the conflict read names a panel through the target attribute alone', DT,
     [(D, CONFLICT, CONFLICT.replace('.includes(host) &&', '.includes(host) &&\n\t\t\ttrigger.hasAttribute(this.#collapse.attributes.target) &&'))]),
]


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def run(test_file):
    if REPORT.exists():
        REPORT.unlink()
    result = subprocess.run([*VITEST, test_file], cwd=ROOT, capture_output=True, text=True)
    failed, total = [], 0
    if REPORT.exists():
        data = json.loads(REPORT.read_text(encoding='utf-8'))
        for suite in data.get('testResults', []):
            for case in suite.get('assertionResults', []):
                total += 1
                if case.get('status') == 'failed':
                    failed.append(case.get('title', '?'))
    return result.returncode, total, failed


def main():
    log = pathlib.Path(sys.argv[2])
    lines = [f'# The Orchestrator\'s R2 and R3 single-door probe over the J-COLLAPSE round-3 worktree at {ROOT} (2026-09-24, Chromium 153.0.8010.12)']
    before = {p: digest(ROOT / p) for p in (C, D)}
    for name, test_file, edits in MUTATIONS:
        originals = {}
        try:
            for path, old, new in edits:
                source = ROOT / path
                originals.setdefault(path, source.read_bytes())
                text = source.read_text(encoding='utf-8')
                if old not in text:
                    raise SystemExit(f'mutation site not found for {name!r}: {old[:70]!r}')
                source.write_bytes(text.replace(old, new, 1).encode('utf-8'))
            code, total, failed = run(test_file)
            verdict = 'GREEN (a hole: no case reddens)' if not failed else 'RED'
            lines.append(f'{verdict} exit={code} | {name} | {test_file} | {len(failed)} failed of {total} | {failed}')
        finally:
            for path, original in originals.items():
                (ROOT / path).write_bytes(original)
    after = {p: digest(ROOT / p) for p in (C, D)}
    lines.append('digests ' + ('restored byte for byte' if before == after else 'DIGEST MISMATCH'))
    log.write_text('\n'.join(lines) + '\n', encoding='utf-8', newline='\n')
    print('\n'.join(lines))


main()
