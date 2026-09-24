#!/usr/bin/env python3
"""LEDGER (cl) mutation driver, successor of cl-mutate.py: a mutation may carry several sites in one
file (`old` and `new` as equal-length lists), which the priority swap needs. It applies one named
mutation, runs one npm script, records the mutated sites, the command, the exit, the summary lines,
and the failing case names in tmp/units/cl-mutations.log.txt, then restores the file byte for byte."""
import os, re, subprocess, sys, json

LOG = '/home/user/veneer-cl/tmp/units/cl-mutations.log.txt'
ENV = dict(os.environ)
ENV['PATH'] = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + ENV['PATH']
ENV['PLAYWRIGHT_BROWSERS_PATH'] = '/opt/pw-browsers'
ANSI = re.compile(r'\x1b\[[0-9;]*m')

def run(label, root, path, olds, news, script, extra=()):
    if isinstance(olds, str): olds, news = [olds], [news]
    target = os.path.join(root, path)
    original = open(target, 'rb').read()
    text = original.decode()
    for old, new in zip(olds, news):
        if text.count(old) != 1:
            raise SystemExit(f'{label}: site not found exactly once in {path}: {old!r}')
        text = text.replace(old, new)
    open(target, 'w').write(text)
    try:
        command = ['npm', 'run', script, *extra]
        done = subprocess.run(command, cwd=root, env=ENV, capture_output=True, text=True)
        out = ANSI.sub('', done.stdout + done.stderr)
        summary = [l.strip() for l in out.splitlines() if l.strip().startswith(('Tests ', 'Test Files '))]
        failing = sorted({l.strip() for l in out.splitlines() if l.strip().startswith('FAIL ')})
        errors = [l.strip() for l in out.splitlines() if l.strip().startswith(('AssertionError', 'Error:', 'TypeError'))][:6]
        with open(LOG, 'a') as log:
            log.write(f'=== {label}\n')
            log.write(f'root: {root}\nfile: {path}\n')
            for old, new in zip(olds, news):
                log.write(f'site (before): {old!r}\nsite (after): {new!r}\n')
            log.write(f'command: {" ".join(command)}\nexit: {done.returncode}\n')
            for line in summary: log.write(f'summary: {line}\n')
            for line in failing: log.write(f'failing: {line}\n')
            for line in errors: log.write(f'error: {line[:400]}\n')
            log.write('\n')
        print(label, done.returncode, summary, *failing, *errors, sep='\n  ')
    finally:
        open(target, 'wb').write(original)
    if open(target, 'rb').read() != original:
        raise SystemExit(f'{label}: restore failed')

if __name__ == '__main__':
    for m in json.load(open(sys.argv[1])):
        run(m['label'], m['root'], m['path'], m['old'], m['new'], m['script'], m.get('extra', []))
