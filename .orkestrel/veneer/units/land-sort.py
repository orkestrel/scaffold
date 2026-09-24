# land-sort.py: after a mechanical merge, restore the sorted order of the two literal lists the tests compare
# as sorted sets (the app entry's export-key list in tests/app/browser/index.test.ts and the `listed` literal
# in tests/conformance.test.ts), and report any table row left detached from its table by a blank line in
# guides/veneer.md. Run from the Veneer checkout root.
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
