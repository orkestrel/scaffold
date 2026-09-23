# fold-58.py: the CAROUSEL landing (2071f8f over 4977d09): record the landing in the ROADMAP's B-MODAL … B-CAROUSEL routing row. Anchor-refusing.
import sys
def edit(path, old, new):
    s=open(path).read(); n=s.count(old)
    if n!=1: sys.exit(f'integration refused: anchor count {n} in {path} for {old[:60]!r}')
    open(path,'w').write(s.replace(old,new))
R='/home/user/veneer/ROADMAP.md'
edit(R, "the Alert region constructed after Nav per M14)", "the Alert region constructed after Nav per M14); CAROUSEL landed as `2071f8f` (over a first round and a fix round on `opus` and a builder fix round, each audited by `analyst` on Astra, `reviewer` on Opus 5.5, and `checker`, the builder round by `checker`; the Carousel region constructed after Alert; the caption read at 390 per R3 at the landing)")
print('fold-58 applied')
P='/home/user/scaffold/.orkestrel/veneer/plan.md'
edit(P, "CAROUSEL round 3 returned on `builder` (`/home/user/veneer-ca`; the checker read the code claims confirmed and the report's gate record short, closed by the Orchestrator's own readings in `ca-instruments-2/logs/round3-gates/`; landing next).", "CAROUSEL landed as `2071f8f` on the session branch (over three rounds; the landing checker, the fast gates, the regeneration with the R3 caption reading at 390, and the chain green, the `test:config` cross-talk reading re-run alone green; `ca-landing-measurements.txt`).")
print('fold-58: plan in-flight line updated')
