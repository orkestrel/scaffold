# land-sort.py: after a mechanical merge, restore the sorted order of the two literal lists the tests compare
# as sorted sets (the app entry's export-key list in tests/app/browser/index.test.ts and the `listed` literal
# in tests/conformance.test.ts), merge the Tailwind exclusion line a concatenating merge splits into two
# consecutive `@source not inline` lines (the profile, its fixtures, and the guide's fences each carry one line,
# and a landing that adds names appends its whole line), and report any table row left detached from its table
# by a blank line in guides/veneer.md. Run from the Veneer checkout root.
import pathlib, re
def sort_run(path, opener):
    p = pathlib.Path(path); lines = p.read_text().split('\n')
    i = next(k for k, l in enumerate(lines) if opener in l)
    j = i + 1
    while not re.fullmatch(r"\s*'[^']+',", lines[j]): j += 1
    k = j
    while re.fullmatch(r"\s*'[^']+',", lines[k]): k += 1
    block = lines[j:k]; s = sorted(block)
    lines[j:k] = s; p.write_text('\n'.join(lines))
    print(f"{path}: {'reordered' if block != s else 'already sorted'}; {'DUPLICATES' if len(set(block)) != len(block) else 'no duplicates'}")
sort_run('tests/app/browser/index.test.ts', 'exports the showcase surface')
sort_run('tests/conformance.test.ts', 'const listed: readonly string[] = [')
g = pathlib.Path('guides/veneer.md').read_text().split('\n')
for n in range(2, len(g)):
    if g[n].startswith('| ') and g[n - 1] == '' and g[n - 2].startswith('| ') and not g[n].startswith('| ---') and not (n + 1 < len(g) and g[n + 1].startswith('| ---')):
        print(f"guides/veneer.md:{n + 1}: row detached from the table above: {g[n][:80]}")

def merge_exclusions(path):
    p = pathlib.Path(path); lines = p.read_text().split('\n'); out = []; i = 0; merged = 0
    while i < len(lines):
        line = lines[i]
        if 'source not inline("' in line and i + 1 < len(lines) and 'source not inline("' in lines[i + 1]:
            first = re.search(r'inline\("([^"]*)"\)', line).group(1).split()
            second = re.search(r'inline\("([^"]*)"\)', lines[i + 1]).group(1).split()
            names = first + [name for name in second if name not in first]
            out.append(re.sub(r'inline\("[^"]*"\)', 'inline("' + ' '.join(names) + '")', line)); i += 2; merged += 1
        else:
            out.append(line); i += 1
    p.write_text('\n'.join(out))
    print(f"{path}: {merged} split exclusion line(s) merged")
for path in ('tests/setup.css', 'tests/fixtures/tailwind/consumer.css', 'tests/fixtures/tailwind/preflight.css', 'guides/veneer.md'):
    merge_exclusions(path)
