# fold-56.py: the ALERT landing (f31f24c over a658879): record the landing in the ROADMAP's B-MODAL … B-CAROUSEL routing row. Anchor-refusing.
import sys
def edit(path, old, new):
    s=open(path).read(); n=s.count(old)
    if n!=1: sys.exit(f'fold refused: anchor count {n} in {path} for {old[:50]!r}')
    open(path,'w').write(s.replace(old,new))
R='/home/user/veneer/ROADMAP.md'
edit(R, "CONDITIONS landed as `8ca1609` (`builder` on Sonnet, verified by `checker`) ", "CONDITIONS landed as `8ca1609` (`builder` on Sonnet, verified by `checker`); ALERT landed as `f31f24c` (over a first round and a fix round on `opus`; the objective lane on `reviewer` on Opus 5.5 in round 1 while the Codex bench was dark and on `analyst` on Astra in round 2, with `reviewer` on Opus 5.5 and `checker` beside it; the Alert region constructed after Nav per M14) ")
print('fold-56 applied')
