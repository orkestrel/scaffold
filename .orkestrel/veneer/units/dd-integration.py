# dd-integration.py: the DROPDOWN landing's conflict resolution and integration edits (dd-audit-2-verdict.md § Rulings).
import re, sys
def edit(path, old, new):
    s=open(path).read(); n=s.count(old)
    if n!=1: sys.exit(f'integration refused: anchor count {n} in {path} for {old[:60]!r}')
    open(path,'w').write(s.replace(old,new))
# 1. the registry conflict: the gap rows (landed) then the dropdown rows, appended in landing order
p='tests/setup.ts'; s=open(p).read()
m=re.search(r'<<<<<<< ours\n(.*?)=======\n(.*?)>>>>>>> theirs\n', s, re.S)
if m is None or s.count('<<<<<<<')!=1: sys.exit('integration refused: conflict block count')
ours, theirs = m.group(1), m.group(2)
s=s[:m.start()] + ours + '\t}),\n\tObject.freeze({\n' + theirs + s[m.end():]
open(p,'w').write(s)
# 2. the comment tally in the section proof (subjective lane, claim 8)
edit('tests/app/browser/sections/DropdownSection.test.ts',
"\t// The journey photographs each specimen at these two widths, and the grid columns that seat each\n\t// toggle reflow between them, so the room each menu keeps is read at both.",
"\t// The journey photographs each specimen at 390 and at 1280 pixels, and the grid columns that seat\n\t// each toggle reflow between those widths, so the room each menu keeps is read at each of them.")
# 3. the actor's terms (subjective F1)
edit('app/browser/constants.ts', 'the `data-bs-popper` attribute a placement engine writes when it', 'the `data-bs-popper` attribute a dropdown engine writes when it')
edit('guides/veneer.md', 'placement engine writes when it leaves a menu to the stylesheet', 'dropdown engine writes when it leaves a menu to the stylesheet')
edit('guides/veneer.md', 'The Dropdown `plugin` row in § Compatibility records the behavior the engine owns.', 'The Dropdown `plugin` row in § Compatibility records the behavior J-ENGINE owns.')
# 4. the population tally (Astra, claim 8)
edit('tests/setupStyles.ts', ' * table and those two populations against the record together.', ' * table, the button-group population, and the withheld population against the record together.')
print('dd integration applied')
