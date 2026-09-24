# Retains the MODAL (md) return and the TOAST round-2 (to) return from their worktrees into
# .orkestrel/veneer/units/, and rewrites every tmp/units path inside the retained reports (and the
# earlier TOAST round-1 and UFL reports) to the retained path it names. tmp/probe paths name the
# deleted validation copies and stay as written.
import pathlib, re, shutil

U = pathlib.Path('/home/user/scaffold/.orkestrel/veneer/units')
R = '.orkestrel/veneer/units'

def copy(src, dst):
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dst)

# MODAL
md = pathlib.Path('/home/user/veneer-md/tmp/units')
for name in ['md.diff', 'md-status.txt', 'md-shared.patch']:
    copy(md / name, U / name)
for name in ['md-failfirst.log.txt', 'md-mutations.log.txt', 'md-gates.txt', 'md-stage-build.log.txt',
             'md-stage-conformance.log.txt', 'md-worktree-format.log.txt', 'md-worktree-lint.log.txt']:
    copy(md / name, U / 'md-instruments' / name)
for p in (md / 'md-gates').iterdir():
    copy(p, U / 'md-instruments' / 'md-gates' / p.name)
report = (md / 'md-report.md').read_text()
head, sep, tail = report.partition('\n## Shared patch\n')
assert sep, 'no shared patch section'
patch = (md / 'md-shared.patch').read_text()
assert patch.strip() in tail, 'appended patch differs from md-shared.patch'
report = head + '\n## Shared patch\n\nThe exact shared patch is `tmp/units/md-shared.patch`; the retained copy drops the appended duplicate.\n'
(U / 'b-modal-md-report.md').write_text(report)

# TOAST round 2
to = pathlib.Path('/home/user/veneer-to/tmp/units')
for name in ['to-2.diff', 'to-2-status.txt', 'to-shared-2.patch']:
    copy(to / name, U / name)
for p in to.iterdir():
    if p.name.startswith('to-gate-2-') or p.name in ['to-mutations-2.log.txt', 'to-mutate-2.py', 'to-patch-2.sh', 'to-setup-when-idle.sh']:
        copy(p, U / 'to-instruments' / p.name)
copy(to / 'to-report-2.md', U / 'b-modal-to-report-2.md')

TOP = {'md.diff', 'md-status.txt', 'md-shared.patch', 'to.diff', 'to-status.txt', 'to-shared.patch',
       'to-2.diff', 'to-2-status.txt', 'to-shared-2.patch', 'ufl-shared.patch', 'ufl-routeb.patch',
       'to-report-2.md'}
RENAMED = {'to-report-2.md': 'b-modal-to-report-2.md'}

def target(m):
    rest = m.group(1)
    first = rest.split('/')[0]
    if first in TOP:
        return f'{R}/{RENAMED.get(first, first)}'
    unit = re.match(r'(md|to|ufl)[-.]', first).group(1)
    return f'{R}/{unit}-instruments/{rest}'

for name in ['b-modal-md-report.md', 'b-modal-to-report-2.md', 'b-modal-to-report.md', 'b-utilities-ufl-report.md']:
    path = U / name
    text = path.read_text()
    new = re.sub(r'tmp/units/([A-Za-z0-9_.*/-]+)', target, text)
    path.write_text(new)
    print(name, len(re.findall(r'tmp/units/', text)), '->', len(re.findall(r'tmp/units/', new)))
