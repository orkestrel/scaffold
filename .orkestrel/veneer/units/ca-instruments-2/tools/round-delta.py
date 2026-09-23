"""Writes the round-1 to round-2 delta of every owned file: round 1's bytes come from the retained
`ca.diff`, round 2's from the worktree."""
import pathlib, subprocess, tempfile
RETAINED = pathlib.Path('/home/user/scaffold/.orkestrel/veneer/units/ca.diff')
W = pathlib.Path('/home/user/veneer-ca')
OUT = W / 'tmp/units/ca-instruments-2/logs/round-delta.diff.txt'
files, current = {}, None
for line in RETAINED.read_text().split('\n'):
    if line.startswith('diff --git '):
        current = line.split(' b/')[-1]
        files[current] = []
    elif current and line.startswith('+') and not line.startswith('+++ '):
        files[current].append(line[1:])
chunks = []
with tempfile.TemporaryDirectory() as scratch:
    for path, body in files.items():
        old = pathlib.Path(scratch) / path.replace('/', '__')
        old.write_text('\n'.join(body) + '\n')
        result = subprocess.run(['diff', '-u', '--label', f'round-1/{path}', '--label', f'round-2/{path}', str(old), str(W / path)], capture_output=True, text=True)
        chunks.append(result.stdout if result.stdout else f'# {path}: unchanged\n')
OUT.write_text(''.join(chunks))
print(OUT)
