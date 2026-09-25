# Resolves the merge of Veneer main 0a0a252 into unit/engines-b (2026-09-25) by hunk, under D50. The one conflict is
# the sorted export list in tests/setupBrowser.test.ts: J-SAMEWAY-ENGINES-B's five DROPDOWN_* door tables beside the
# styles session's FORM_ENTRIES. The union keeps both sides in sorted order. An unrecognised hunk stops the script with
# nothing written.
from pathlib import Path

p = Path(r'C:\Users\mikes\WebstormProjects\veneer\tmp\worktrees\engines-b\tests\setupBrowser.test.ts')
t = p.read_bytes().decode('utf-8')
old = (
    "<<<<<<< HEAD\n"
    "\t\t\t\t'DROPDOWN_HIDE_DOORS',\n"
    "\t\t\t\t'DROPDOWN_HIDE_REVERSALS',\n"
    "\t\t\t\t'DROPDOWN_SHOW_DOORS',\n"
    "\t\t\t\t'DROPDOWN_SHOW_REVERSALS',\n"
    "\t\t\t\t'DROPDOWN_WRITE_BACKS',\n"
    "=======\n"
    "\t\t\t\t'FORM_ENTRIES',\n"
    ">>>>>>> main\n"
)
new = (
    "\t\t\t\t'DROPDOWN_HIDE_DOORS',\n"
    "\t\t\t\t'DROPDOWN_HIDE_REVERSALS',\n"
    "\t\t\t\t'DROPDOWN_SHOW_DOORS',\n"
    "\t\t\t\t'DROPDOWN_SHOW_REVERSALS',\n"
    "\t\t\t\t'DROPDOWN_WRITE_BACKS',\n"
    "\t\t\t\t'FORM_ENTRIES',\n"
)
assert t.count(old) == 1, t.count(old)
assert t.count('<<<<<<< ') == 1, t.count('<<<<<<< ')
p.write_bytes(t.replace(old, new, 1).encode('utf-8'))
print('resolved 1')
