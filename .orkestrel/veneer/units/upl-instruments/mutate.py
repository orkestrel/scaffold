#!/usr/bin/env python3
"""Applies one textual mutation to a file in the validation copy, runs a command, and restores the file.

Usage: mutate.py NAME FILE OLD NEW [--build] -- COMMAND...
Prints the command's failing and passing counts and its exit code, and writes its log beside it.
"""
import re, subprocess, sys, os
args = sys.argv[1:]
split = args.index('--')
name, path, old, new, *flags = args[:split]
command = args[split + 1:]
root = '/home/user/veneer-upl/tmp/probe/land'
env = dict(os.environ)
env['PATH'] = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:' + env['PATH']
full = os.path.join(root, path)
original = open(full).read()
if original.count(old) < 1:
    sys.exit(f'{name}: pattern not found in {path}')
open(full, 'w').write(original.replace(old, new))
try:
    if '--build' in flags:
        subprocess.run(['npm', 'run', 'build:src:styles'], cwd=root, env=env, capture_output=True, check=True)
    result = subprocess.run(command, cwd=root, env=env, capture_output=True, text=True)
    output = result.stdout + result.stderr
    os.makedirs('/home/user/veneer-upl/tmp/probe/logs', exist_ok=True)
    open(f'/home/user/veneer-upl/tmp/probe/logs/{name}.log.txt', 'w').write(output)
    tests = re.findall(r'Tests\s+(.*?)\s*\(\d+\)', output)
    failed = sorted(set(re.findall(r'FAIL .*?> (.*)', output)))
    print(f'{name}: exit={result.returncode} tests={tests}')
    for title in failed:
        print(f'  red: {title}')
finally:
    open(full, 'w').write(original)
    if '--build' in flags:
        subprocess.run(['npm', 'run', 'build:src:styles'], cwd=root, env=env, capture_output=True, check=True)
