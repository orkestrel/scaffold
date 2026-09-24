# Retains a successor round of a unit from its worktree's tmp/units/ into .orkestrel/veneer/units/.
# Usage: python3 w2-retain-round.py <unit> <worktree> <round> <retained report name> <cutoff HH:MM>
# Copies every file the round wrote (modified at or after the cutoff on 2026-09-24): the round's diff,
# status, and patches beside the report, and every other file under <unit>-instruments/; drops the
# report's appended duplicate of its shared patch and rewrites each tmp/units path to the retained
# path it names. A companion of w2-retain.py for rounds after the first.
import datetime, pathlib, re, shutil, sys

unit, wt, n, name, cutoff = sys.argv[1], pathlib.Path(sys.argv[2]), sys.argv[3], sys.argv[4], sys.argv[5]
U = pathlib.Path('/home/user/scaffold/.orkestrel/veneer/units')
R = '.orkestrel/veneer/units'
src = wt / 'tmp/units'
since = datetime.datetime.strptime(f'2026-09-24 {cutoff}', '%Y-%m-%d %H:%M').timestamp()
TOP = {f'{unit}-{n}.diff', f'{unit}-{n}-status.txt', f'{unit}-shared-{n}.patch', f'{unit}-routeb-{n}.patch'}
inst = U / f'{unit}-instruments'
inst.mkdir(exist_ok=True)
copied = []
for p in sorted(src.iterdir()):
    if p.is_dir() or p.stat().st_mtime < since or p.name == f'{unit}-report-{n}.md':
        continue
    shutil.copy2(p, U / p.name if p.name in TOP else inst / p.name)
    copied.append(p.name)
report = (src / f'{unit}-report-{n}.md').read_text()
patch_file = src / f'{unit}-shared-{n}.patch'
if patch_file.exists():
    patch = patch_file.read_text().strip()
    for start in reversed([m.start() for m in re.finditer(r'\n## ', report)]):
        if patch in report[start:]:
            title = report[start + 1:].split('\n', 1)[0]
            report = report[:start] + f'\n{title}\n\nThe exact shared patch is `tmp/units/{unit}-shared-{n}.patch`; the retained copy drops the appended duplicate.\n'
            break
def target(m):
    rest = m.group(1)
    first = rest.split('/')[0]
    top = first in TOP or re.fullmatch(rf'{unit}(-\d+)?(\.diff|-status\.txt)|{unit}-(shared|routeb)(-\d+)?\.patch', first)
    return f'{R}/{first}' if top else f'{R}/{unit}-instruments/{rest}'
new = re.sub(r'tmp/units/([A-Za-z0-9_.*/-]+)', target, report)
new = new.replace(f'{wt}/{R}', R)
(U / name).write_text(new)
print(unit, 'round', n, 'copied', len(copied), '| report paths', len(re.findall(r'tmp/units/', report)), '->', len(re.findall(r'tmp/units/', new)))
