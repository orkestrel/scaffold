# Retains the TIP (tp) return from /home/user/veneer-tp/tmp/units into .orkestrel/veneer/units/: the
# diff, status, and shared patch beside the report, every other file under tp-instruments/, and the
# report without its appended copy of the patch; rewrites every tmp/units path in the report to the
# retained path it names. Derived from w2-retain-md-to2.py with the unit and worktree changed.
import pathlib, re, shutil

U = pathlib.Path('/home/user/scaffold/.orkestrel/veneer/units')
R = '.orkestrel/veneer/units'
src = pathlib.Path('/home/user/veneer-tp/tmp/units')
TOP = {'tp.diff', 'tp-status.txt', 'tp-shared.patch'}
for p in src.iterdir():
    if p.name == 'tp-report.md':
        continue
    dst = U / p.name if p.name in TOP else U / 'tp-instruments' / p.name
    shutil.copy2(p, dst)
report = (src / 'tp-report.md').read_text()
head, sep, tail = report.partition('\n## Shared patch\n')
assert sep, 'no shared patch section'
patch = (src / 'tp-shared.patch').read_text()
assert patch.strip() in tail, 'appended patch differs from tp-shared.patch'
report = head + '\n## Shared patch\n\nThe exact shared patch is `tmp/units/tp-shared.patch`; the retained copy drops the appended duplicate.\n'
def target(m):
    rest = m.group(1)
    first = rest.split('/')[0]
    return f'{R}/{first}' if first in TOP else f'{R}/tp-instruments/{rest}'
new = re.sub(r'tmp/units/([A-Za-z0-9_.*/-]+)', target, report)
(U / 'b-modal-tp-report.md').write_text(new)
print('rewritten', len(re.findall(r'tmp/units/', report)), '->', len(re.findall(r'tmp/units/', new)))
