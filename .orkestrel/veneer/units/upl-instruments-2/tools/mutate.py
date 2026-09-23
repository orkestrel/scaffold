#!/usr/bin/env python3
"""Applies one textual mutation to a file in the fresh copy, runs a command, and restores the file.

Usage: mutate.py NAME FILE OLD NEW [--build] -- COMMAND...
FILE, OLD, and NEW are `-` for an unmutated control run. OLD must occur in FILE; every occurrence
is replaced. With `--build`, the styles are rebuilt after the mutation and again after the restore.
The log, headed by the mutation, the command, and the population the command collected, is written
to logs/mutations/NAME.log.txt; the summary line and each red case title are printed.
"""
import os, re, subprocess, sys
args = sys.argv[1:]
split = args.index('--')
name, path, old, new, *flags = args[:split]
command = args[split + 1:]
root = '/home/user/veneer-upl/tmp/probe/fresh'
logs = '/home/user/veneer-upl/tmp/units/upl-instruments-2/logs/mutations'
env = dict(os.environ)
env['PATH'] = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + env['PATH']
build = '--build' in flags
full = os.path.join(root, path) if path != '-' else None
original = open(full).read() if full else None
if full:
    if original.count(old) < 1:
        sys.exit(f'{name}: pattern not found in {path}')
    open(full, 'w').write(original.replace(old, new))
try:
    if build:
        subprocess.run(['npm', 'run', 'build:src:styles'], cwd=root, env=env, capture_output=True, check=True)
    result = subprocess.run(command, cwd=root, env=env, capture_output=True, text=True)
    output = re.sub(r'\x1b\[[0-9;]*m', '', result.stdout + result.stderr)
    summary = re.findall(r'Tests\s+(.*?\(\d+\))', output)
    population = re.findall(r'Tests\s+.*?\((\d+)\)', output)
    failed = sorted(set(re.findall(r'FAIL .*?> (.*)', output)))
    os.makedirs(logs, exist_ok=True)
    header = [
        f'# mutation: {name}',
        f'# file: {path}',
        f'# replaced: {old!r}',
        f'# with: {new!r}',
        f'# rebuilt styles: {"yes" if build else "no"}',
        f'# command: {" ".join(command)}',
        f'# exit: {result.returncode}',
        f'# population: {population[-1] if population else "no case collected"} cases collected',
        f'# result: {summary[-1] if summary else "none"}',
    ] + [f'# red: {title}' for title in failed]
    open(f'{logs}/{name}.log.txt', 'w').write('\n'.join(header) + '\n\n' + output)
    print(f'{name}: exit={result.returncode} {summary[-1] if summary else "no summary"}')
    for title in failed:
        print(f'  red: {title}')
finally:
    if full:
        open(full, 'w').write(original)
    if build:
        subprocess.run(['npm', 'run', 'build:src:styles'], cwd=root, env=env, capture_output=True, check=True)
