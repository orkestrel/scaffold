"""Builds the case-by-mutation matrix from logs/record: every case the unmutated control ran, and the
mutations whose logged run reddened it. Prints a Markdown table and flags a case no mutation reddens."""
import glob, os, re
LOGS = '/home/user/veneer-ud/tmp/units/ud-instruments-3/logs/record'
control = open(f'{LOGS}/control.log.txt').read()
cases = []
for line in control.splitlines():
    match = re.match(r'^\s*✓ \|[^|]*\| (\S+?)(?::\d+:\d+)? > (.*?)(?: \d+ms)?$', line)
    if match:
        path, title = match.groups()
        case = f'{os.path.basename(path)} > {title}'
        if case not in cases:
            cases.append(case)
red = {}
for log in sorted(glob.glob(f'{LOGS}/*.log.txt')):
    name = os.path.basename(log)[:-len('.log.txt')]
    if name == 'control':
        continue
    for line in open(log).read().split('\n\n')[0].splitlines():
        match = re.match(r'^\s+red: (\S+) > (.*)$', line)
        if match:
            red.setdefault(f'{os.path.basename(match.group(1))} > {match.group(2)}', []).append(name)
print('| Proof case | Mutations that redden it |')
print('| --- | --- |')
for case in cases:
    names = red.get(case, [])
    print(f'| {case} | {", ".join(f"`{n}`" for n in names) if names else "NONE"} |')
missing = [case for case in cases if case not in red]
print(f'\nunreddened: {missing}')
print(f'red cases not in the control: {[c for c in red if c not in cases]}')
