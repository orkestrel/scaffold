# nv-integration.py: the NAV landing's integration edits (nv-audit-2-verdict.md § Rulings: claim 9's two comments, F1, F2)
# and the D4 drop of DROPDOWN's Nav deferral row; every anchor must match exactly once.
import re, sys
def edit(path, old, new):
    s=open(path).read(); n=s.count(old)
    if n!=1: sys.exit(f'integration refused: anchor count {n} in {path} for {old[:60]!r}')
    open(path,'w').write(s.replace(old,new))
edit('guides/veneer.md', "writes `role`, `aria-selected`, `tabindex`, and `active`, `show` on the pane, and in a dropdown, `active` on the toggle, `show` on the menu, and `aria-expanded` on the item. Owner: J-ENGINE.", "writes `role`, `aria-selected`, `tabindex`, and `active`; `show` on the pane; in a dropdown, `active` on the toggle, `show` on the menu, and `aria-expanded` on the item. Owner: J-ENGINE.")
edit('guides/veneer.md', "does not paint over the tab's focus outline", "does not paint over the tab's focus ring")
edit('tests/setupStyles.test.ts', "\t\t// the weight slot is read by the type case, and the two hover slots by the hover case, because\n\t\t// no resting element paints them.", "\t\t// the weight slot is read by the type case, and the link hover color slot and the tab hover border\n\t\t// color slot by the hover case, because no resting element paints them.")
edit('tests/setupStyles.ts', " * `tests/setupStyles.test.ts` adds the navbar-bearing names back from the guide's own deferral table", " * The `tests/setupStyles.test.ts` proof adds the navbar-bearing names back from the guide's own deferral table")
# D4: NAV's landing drops the Nav deferral row DROPDOWN carried
s=open('guides/veneer.md').read()
rows=[l for l in s.split('\n') if l.startswith('| `.nav-tabs .dropdown-menu`')]
if len(rows)!=1: sys.exit(f'integration refused: Nav row count {len(rows)}')
s=s.replace(rows[0]+'\n','',1); open('guides/veneer.md','w').write(s)
print('nv integration applied')
