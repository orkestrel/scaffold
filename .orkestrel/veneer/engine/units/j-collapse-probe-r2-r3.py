# The Orchestrator's mutate-run-restore probe for the J-COLLAPSE round-2 referrals R2 and R3:
# applies one named text mutation to an owned source, runs the whole named test file on the browser
# project with Vitest's JSON reporter, records every failing case, restores the original bytes, and
# checks the digest. Usage: python collapse-mutate-probe.py <log path>
import hashlib, json, pathlib, subprocess, sys

ROOT = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer-collapse')
REPORT = ROOT / 'tmp/j-collapse/orchestrator-probe-report.json'
VITEST = [
    'node', 'node_modules/vitest/vitest.mjs', 'run', '--config', 'vite.config.ts', '--no-cache',
    '--project', 'src:browser', '--reporter=json', f'--outputFile={REPORT}',
]
C = 'src/browser/Collapse.ts'
CT = 'tests/src/browser/Collapse.test.ts'

WRITE_TRIGGERS_SHOW = '\t\tif (!this.#writeTriggers(change, during, triggers, true)) return false\n'
WRITE_TRIGGERS_HIDE = '\t\tif (!this.#writeTriggers(change, during, collapsed, false)) return false\n'
PRUNE_SHOW = ('\tasync show(): Promise<boolean> {\n\t\tthis.#prune()\n'
              '\t\tif (this.#refused(true) || this.#transitioning(this.#siblings())) return false\n')
PRUNE_SHOW_AFTER = ('\tasync show(): Promise<boolean> {\n'
                    '\t\tif (this.#refused(true) || this.#transitioning(this.#siblings())) return false\n\t\tthis.#prune()\n')
PRUNE_HIDE = '\tasync hide(): Promise<boolean> {\n\t\tthis.#prune()\n\t\tif (this.#refused(false)) return false\n'
PRUNE_HIDE_AFTER = '\tasync hide(): Promise<boolean> {\n\t\tif (this.#refused(false)) return false\n\t\tthis.#prune()\n'

MUTATIONS = [
    ('R2: the trigger-write door reads no token (writeTriggers receives [] in show and hide)', CT,
     [(C, WRITE_TRIGGERS_SHOW, WRITE_TRIGGERS_SHOW.replace('during', '[]')),
      (C, WRITE_TRIGGERS_HIDE, WRITE_TRIGGERS_HIDE.replace('during', '[]'))]),
    ('R3: #prune runs after the refusals instead of before them', CT,
     [(C, PRUNE_SHOW, PRUNE_SHOW_AFTER), (C, PRUNE_HIDE, PRUNE_HIDE_AFTER)]),
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
    log = pathlib.Path(sys.argv[1])
    lines = ['# The Orchestrator\'s R2 and R3 probe over the J-COLLAPSE round-2 worktree (2026-09-24, Chromium 153.0.8010.12)']
    source = ROOT / C
    before = digest(source)
    for name, test_file, edits in MUTATIONS:
        original = source.read_bytes()
        text = original.decode('utf-8')
        try:
            for path, old, new in edits:
                if old not in text:
                    raise SystemExit(f'mutation site not found for {name!r}: {old[:60]!r}')
                text = text.replace(old, new, 1)
            source.write_bytes(text.encode('utf-8'))
            code, total, failed = run(test_file)
            verdict = 'GREEN (a hole: no case reddens)' if not failed else ('RED' if code != 0 else 'RED?')
            lines.append(f'{verdict} exit={code} | {name} | {test_file} | {len(failed)} failed of {total} | {failed}')
        finally:
            source.write_bytes(original)
    after = digest(source)
    lines.append(f'digest before={before} after={after} ' + ('restored byte for byte' if before == after else 'DIGEST MISMATCH'))
    log.write_text('\n'.join(lines) + '\n', encoding='utf-8', newline='\n')
    print('\n'.join(lines))


main()
