import re, pathlib
root = pathlib.Path('/home/user/veneer')
# guide: keep HEAD's table, append F8a's four rows after the tests/src/styles/ row
g = root / 'guides/veneer.md'
lines = g.read_text().split('\n')
start = lines.index('<<<<<<< HEAD')
mid = lines.index('=======', start)
end = next(i for i, l in enumerate(lines) if l.startswith('>>>>>>> ') and i > mid)
head = lines[start + 1:mid]
theirs = lines[mid + 1:end]
new_rows = [l for l in theirs if re.match(r'^\| `(configs/src/vite\.tailwind\.config\.ts|tests/setup\.css|tests/fixtures/tailwind/|tests/tailwind/)`', l)]
assert len(new_rows) == 4, new_rows
resolved = head + new_rows
lines[start:end + 1] = resolved
g.write_text('\n'.join(lines))
# setupBrowser.test.ts: keep both sides, sorted
t = root / 'tests/setupBrowser.test.ts'
text = t.read_text()
def merge(m):
    ours = [l for l in m.group(1).split('\n') if l.strip()]
    theirs = [l for l in m.group(2).split('\n') if l.strip()]
    return '\n'.join(sorted(ours + theirs, key=lambda l: l.strip().strip("',"))) + '\n'
text2, n = re.subn(r'<<<<<<< HEAD\n(.*?)=======\n(.*?)>>>>>>> [^\n]*\n', merge, text, flags=re.S)
assert n == 2, n
t.write_text(text2)
print('resolved', n)
