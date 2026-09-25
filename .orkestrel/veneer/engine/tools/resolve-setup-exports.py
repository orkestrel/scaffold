# Resolves the one conflict the J-INTEGRATION landing's merge with Veneer main dbc7e0f leaves in tests/setupBrowser.test.ts:
# the sorted export list gains RELEASE_REENTRIES (J-SAMEWAY's row tables) on one side and SAMPLE_MESSAGES (the styles
# session's J-FIXTURES) on the other, so the resolution keeps both names in sort order and changes nothing else.
from pathlib import Path

p = Path(r'C:\Users\mikes\WebstormProjects\veneer\tmp\worktrees\integration\tests\setupBrowser.test.ts')
t = p.read_bytes().decode('utf-8')
old = (
    "<<<<<<< HEAD\n"
    "\t\t\t\t'RELEASE_REENTRIES',\n"
    "=======\n"
    "\t\t\t\t'SAMPLE_MESSAGES',\n"
    ">>>>>>> main\n"
)
new = "\t\t\t\t'RELEASE_REENTRIES',\n\t\t\t\t'SAMPLE_MESSAGES',\n"
assert t.count(old) == 1, t.count(old)
assert t.count('<<<<<<<') == 1
t = t.replace(old, new)
p.write_bytes(t.encode('utf-8'))
print('resolved')
