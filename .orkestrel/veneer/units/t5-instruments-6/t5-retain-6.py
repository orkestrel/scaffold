# Retains T5 round 6 from /home/user/test-tf/tmp/units into .orkestrel/veneer/units: t5-6.diff and t5-6-status.txt
# beside the report, every other round-5 file (modified at or after 19:21 on 2026-09-24, the brief copy excepted) and
# the t5-6-mutations directory under t5-instruments-6/, and the report as t5-test-frame-report-6.md with each
# tmp/units path rewritten to the retained path it names.
import datetime, pathlib, re, shutil
src = pathlib.Path('/home/user/test-tf/tmp/units')
U = pathlib.Path('/home/user/scaffold/.orkestrel/veneer/units')
R = '.orkestrel/veneer/units'
inst = U / 't5-instruments-6'
inst.mkdir(exist_ok=True)
since = datetime.datetime(2026, 9, 24, 19, 21).timestamp()
TOP = {'t5-6.diff', 't5-6-status.txt'}
SKIP = {'t5-brief-6.md', 't5-report-6.md'}
copied = []
for p in sorted(src.iterdir()):
    if p.name in SKIP or p.stat().st_mtime < since:
        continue
    if p.is_dir():
        shutil.copytree(p, inst / p.name, dirs_exist_ok=True)
    else:
        shutil.copy2(p, U / p.name if p.name in TOP else inst / p.name)
    copied.append(p.name)
report = (src / 't5-report-6.md').read_text()
def target(m):
    rest = m.group(1)
    first = rest.split('/')[0]
    return f'{R}/{first}' if first in TOP else f'{R}/t5-instruments-6/{rest}'
new = re.sub(r'tmp/units/([A-Za-z0-9_.*<>/-]+)', target, report)
new = new.replace('/home/user/test-tf/' + R, R)
(U / 't5-test-frame-report-6.md').write_text(new)
print('copied', len(copied), copied, '| report paths', len(re.findall(r'tmp/units/', report)), '->', len(re.findall(r'tmp/units/', new)))
