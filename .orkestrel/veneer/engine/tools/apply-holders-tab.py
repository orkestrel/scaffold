# Applies J-HOLDERS round 2's report-only patch to tests/src/browser/Tab.test.ts in the holders worktree, exactly as returned
# (units/j-holders-report-2.md § Deviation state): under the E25 amendment of 2026-09-25 a sibling's destruction leaves the
# emptied class attribute to the last holder. The three-line anchor must occur once.
from pathlib import Path

p = Path(r'C:\Users\mikes\WebstormProjects\veneer\tmp\worktrees\holders\tests\src\browser\Tab.test.ts')
t = p.read_bytes().decode('utf-8')
old = (
    "\t\t\tearlier.destroy()\n"
    "\t\t\texpect(a?.getAttribute('class')).toBe('active')\n"
    "\t\t\texpect(b?.hasAttribute('class')).toBe(false)\n"
)
new = (
    "\t\t\tearlier.destroy()\n"
    "\t\t\texpect(a?.getAttribute('class')).toBe('active')\n"
    "\t\t\texpect(b?.getAttribute('class')).toBe('')\n"
)
count = t.count(old)
assert count == 1, count
p.write_bytes(t.replace(old, new).encode('utf-8'))
print('applied')
