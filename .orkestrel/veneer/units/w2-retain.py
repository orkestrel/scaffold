# Retains a returned wave-2 or wave-3 unit from its worktree's tmp/units/ into .orkestrel/veneer/units/.
# Usage: python3 w2-retain.py <unit> <worktree> <retained report name>
# The unit's shared patch, diff, and status sit beside the report and every other file under
# <unit>-instruments/. Where the unit returned no diff or status, the Orchestrator captures them from
# the worktree read-only (tracked changes as git diff against 2a3f223, each untracked file as
# git diff --no-index /dev/null) and says so in the report's retained header. The report's appended
# copy of the shared patch is dropped when it equals the patch file, and every tmp/units path in the
# report is rewritten to the retained path it names. Generalizes w2-retain-tp.py.
import pathlib, re, shutil, subprocess, sys

unit, wt, name = sys.argv[1], pathlib.Path(sys.argv[2]), sys.argv[3]
U = pathlib.Path('/home/user/scaffold/.orkestrel/veneer/units')
R = '.orkestrel/veneer/units'
src = wt / 'tmp/units'
TOP = {f'{unit}.diff', f'{unit}-status.txt', f'{unit}-shared.patch'}
inst = U / f'{unit}-instruments'
inst.mkdir(exist_ok=True)
for p in src.iterdir():
    if p.name == f'{unit}-report.md':
        continue
    if p.is_dir():
        shutil.copytree(p, inst / p.name, dirs_exist_ok=True)
    else:
        shutil.copy2(p, U / p.name if p.name in TOP else inst / p.name)
notes = []
if not (src / f'{unit}-status.txt').exists():
    status = subprocess.run(['git', '-C', str(wt), 'status', '--porcelain'], capture_output=True, text=True, check=True).stdout
    (U / f'{unit}-status.txt').write_text(status)
    notes.append(f'`{unit}-status.txt`')
if not (src / f'{unit}.diff').exists():
    status = (U / f'{unit}-status.txt').read_text()
    parts = [subprocess.run(['git', '-C', str(wt), 'diff', '2a3f223'], capture_output=True, text=True, check=True).stdout]
    for line in status.splitlines():
        if line.startswith('?? '):
            path = line[3:]
            parts.append(subprocess.run(['git', '-C', str(wt), 'diff', '--no-index', '/dev/null', path], capture_output=True, text=True).stdout)
    (U / f'{unit}.diff').write_text(''.join(parts))
    notes.append(f'`{unit}.diff`')
report = (src / f'{unit}-report.md').read_text()
patch = (src / f'{unit}-shared.patch').read_text().strip()
heads = [m.start() for m in re.finditer(r'\n## ', report)]
for start in reversed(heads):
    if patch in report[start:]:
        title = report[start + 1:].split('\n', 1)[0]
        report = report[:start] + f'\n{title}\n\nThe exact shared patch is `tmp/units/{unit}-shared.patch`; the retained copy drops the appended duplicate.\n'
        break
if notes:
    report = f'<!-- Retained by the Orchestrator: {" and ".join(notes)} captured read-only from {wt} at retention, because the unit returned none. -->\n' + report
def target(m):
    rest = m.group(1)
    first = rest.split('/')[0]
    return f'{R}/{first}' if first in TOP else f'{R}/{unit}-instruments/{rest}'
new = re.sub(r'tmp/units/([A-Za-z0-9_.*/-]+)', target, report)
(U / name).write_text(new)
print(unit, 'captured:', notes or 'none', '| rewritten', len(re.findall(r'tmp/units/', report)), '->', len(re.findall(r'tmp/units/', new)))
