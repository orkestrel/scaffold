# Retains T5 round 7 from /home/user/test-tf/tmp/units into .orkestrel/veneer/units: t5-7.diff and t5-7-status.txt
# beside the report, every other round-5 file (modified at or after 20:22 on 2026-09-24, the brief copy excepted) and
# any round-7 directory under t5-instruments-7/, and the report as t5-test-frame-report-7.md with each
# tmp/units path rewritten to the retained path it names.
import datetime, pathlib, re, shutil
src = pathlib.Path('/home/user/test-tf/tmp/units')
U = pathlib.Path('/home/user/scaffold/.orkestrel/veneer/units')
R = '.orkestrel/veneer/units'
inst = U / 't5-instruments-7'
inst.mkdir(exist_ok=True)
since = datetime.datetime(2026, 9, 24, 20, 22).timestamp()
TOP = {'t5-7.diff', 't5-7-status.txt'}
SKIP = {'t5-brief-7.md', 't5-report-7.md'}
copied = []
for p in sorted(src.iterdir()):
    if p.name in SKIP or p.stat().st_mtime < since:
        continue
    if p.is_dir():
        shutil.copytree(p, inst / p.name, dirs_exist_ok=True)
    else:
        shutil.copy2(p, U / p.name if p.name in TOP else inst / p.name)
    copied.append(p.name)
report = (src / 't5-report-7.md').read_text()
def target(m):
    rest = m.group(1)
    first = rest.split('/')[0]
    return f'{R}/{first}' if first in TOP else f'{R}/t5-instruments-7/{rest}'
new = re.sub(r'tmp/units/([A-Za-z0-9_.*<>/-]+)', target, report)
new = new.replace('/home/user/test-tf/' + R, R)
(U / 't5-test-frame-report-7.md').write_text(new)
print('copied', len(copied), copied, '| report paths', len(re.findall(r'tmp/units/', report)), '->', len(re.findall(r'tmp/units/', new)))
