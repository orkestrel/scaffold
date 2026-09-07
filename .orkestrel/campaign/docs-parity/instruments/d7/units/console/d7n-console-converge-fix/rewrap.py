import re, subprocess, sys

TAG = re.compile(r"\{@link[^}]*\}")

def changed_lines(path):
    out = subprocess.run(['git', 'diff', '-U0', '--', path], capture_output=True, text=True).stdout
    marked = set()
    for line in out.split('\n'):
        m = re.match(r'^@@ -\S+ \+(\d+)(?:,(\d+))? @@', line)
        if m:
            start = int(m.group(1)); count = int(m.group(2) or '1')
            for n in range(start, start + count): marked.add(n)
    return marked

def tokenize(text):
    holes = []
    def stash(m):
        holes.append(m.group(0))
        return '\x00%d\x00' % (len(holes) - 1)
    masked = TAG.sub(stash, text)
    return [re.sub(r'\x00(\d+)\x00', lambda m: holes[int(m.group(1))], token) for token in masked.split()]

def wrap(tokens, width, prefix):
    lines = []
    current = prefix
    for token in tokens:
        candidate = current + ' ' + token
        if len(candidate) > width and current != prefix:
            lines.append(current)
            current = prefix + ' ' + token
        else:
            current = candidate
    lines.append(current)
    return lines

def process(path, width=100):
    marked = changed_lines(path)
    lines = open(path).read().split('\n')
    out, i, changed = [], 0, 0
    while i < len(lines):
        line = lines[i]
        if re.match(r'^(\s*) \* (?![-@])\S', line) and '*/' not in line:
            indent = re.match(r'^(\s*) \*', line).group(1)
            run, j = [], i
            while j < len(lines):
                candidate = lines[j]
                if not re.match(r'^%s \* (?![-@])\S' % re.escape(indent), candidate): break
                if '*/' in candidate: break
                if re.match(r'^%s \*   \S' % re.escape(indent), candidate): break
                run.append(candidate); j += 1
            touched = any((n + 1) in marked for n in range(i, j))
            if touched and any(len(l) > width for l in run):
                wrapped = wrap(tokenize(' '.join(re.sub(r'^%s \* ' % re.escape(indent), '', l) for l in run)), width, indent + ' *')
                if wrapped != run:
                    changed += 1; out.extend(wrapped); i = j; continue
            out.extend(run); i = j; continue
        out.append(line); i += 1
    open(path, 'w').write('\n'.join(out))
    return changed

for path in sys.argv[1:]:
    print(path, 'paragraphs rewrapped:', process(path))
