# Lists every comment and TSDoc line rounds 1 and 2 added that carries a number word, a numeral, or a
# tally word, across the owned files and the added lines of the shared patches, for a ruling by hand.
import re, subprocess
OWNED = subprocess.run(['git', 'ls-files', '--others', '--exclude-standard'], capture_output=True, text=True, cwd='/home/user/veneer-up').stdout.split()
PATCHES = ['tmp/units/up-shared-2.patch', 'tmp/units/up-unscoped-profiles-2.patch']
PATTERN = re.compile(r'\b(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|both|single|pair|couple|several|dozen|once|twice|\d+)\b', re.I)
COMMENT = re.compile(r'^\s*(//|\*|/\*\*)')
def scan(path, lines):
    for number, line in lines:
        if COMMENT.match(line) and PATTERN.search(line):
            print(f'{path}:{number}: {line.strip()}')
for path in OWNED:
    with open(f'/home/user/veneer-up/{path}') as handle:
        scan(path, enumerate(handle.read().splitlines(), 1))
for patch in PATCHES:
    current = None
    for line in open(f'/home/user/veneer-up/{patch}').read().splitlines():
        if line.startswith('+++ b/'):
            current = line[6:]
        elif line.startswith('+') and not line.startswith('+++') and current and not current.endswith('.md'):
            scan(f'{patch} ({current})', [('+', line[1:])])
