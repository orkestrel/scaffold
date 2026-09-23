# al-integration.py: the ALERT landing's integration edit, the M14 placement deviation resolved at integration
# (al-audit-claims.md: the section constructed after the disclosure regions and before the first utility region):
# the Alert region moves from after Input group (its position at c3ac297) to after Nav in the construction list,
# the export list, the order proof, and the specimen spread. Every anchor must match exactly once; run from the
# Veneer checkout after `git apply --3way al-shared-2.patch` and its conflict resolution.
import sys
def move(path, line, after):
    s=open(path).read()
    for a in (line, after):
        n=s.count(a)
        if n!=1: sys.exit(f'integration refused: anchor count {n} in {path} for {a[:60]!r}')
    s=s.replace(line,'',1); s=s.replace(after, after+line, 1)
    open(path,'w').write(s)
move('app/browser/Showcase.ts', "\t\t\tnew AlertSection(this.#main),\n", "\t\t\tnew NavSection(this.#main),\n")
move('app/browser/index.ts', "export * from './sections/AlertSection.js'\n", "export * from './sections/NavSection.js'\n")
move('tests/app/browser/Showcase.test.ts', "\t\t\t\t'Alert',\n", "\t\t\t\t'Nav',\n")
move('tests/app/browser/Showcase.test.ts', "\t\t\t\t\t...ALERT_SPECIMENS,\n", "\t\t\t\t\t...NAV_SPECIMENS,\n")
print('al integration applied: the Alert region follows Nav')
