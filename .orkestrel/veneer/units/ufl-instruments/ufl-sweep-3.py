# Lists each comment, TSDoc, or prose line rounds 1 and 2 added whose code token or {@link} tag is
# followed by no noun: by punctuation, by the line's end, or by a function word.
import re, subprocess, sys
root = '/home/user/veneer-ufl'
owned = subprocess.run(['git', '-C', root, 'status', '--porcelain'], capture_output=True, text=True).stdout.split()
owned = [p for p in owned if p not in ('M', '??')]
sources = []
for path in owned:
    for number, line in enumerate(open(f'{root}/{path}'), 1):
        sources.append((path, number, line.rstrip('\n')))
for patch in sys.argv[1:]:
    current = None
    for line in open(patch):
        if line.startswith('+++ b/'):
            current = f'{patch.rsplit("/", 1)[-1]}:{line[6:].strip()}'
        elif line.startswith('+') and not line.startswith('+++'):
            sources.append((current, 0, line[1:].rstrip('\n')))
token = r'(`[^`]+`|\{@link [^}]+\})'
after = r'(?=\s*$|[,.;:)!?]|\s+(?:and|or|to|is|are|in|with|the|a|an|as|at|by|of|so|for|on|from|that|which|than|before|after|beside|reads|writes|sets|carries|ships|names)\b)'
comment = re.compile(r'^\s*(//|\*|/\*\*)')
for path, number, line in sources:
    is_markdown = path.endswith('.md')
    if not (comment.match(line) or (is_markdown and not line.lstrip().startswith(('|', '```', '@')))):
        continue
    for match in re.finditer(token + after, line):
        print(f'{path}:{number}: {match.group(1)} || {line.strip()[:150]}')
