# fold-53.py: record the CONDITIONS landing (8ca1609) in the B-MODAL … B-CAROUSEL row's Role and engine cell.
import sys
path='/home/user/veneer/ROADMAP.md'; s=open(path).read()
old="| B-MODAL … B-CAROUSEL     | `opus` on Opus 5 (the alias serves `claude-opus-5`), one unit per key group per its design verdict "
new="| B-MODAL … B-CAROUSEL     | `opus` on Opus 5 (the alias serves `claude-opus-5`), one unit per key group per its design verdict; CONDITIONS landed as `8ca1609` (`builder` on Sonnet, verified by `checker`) "
n=s.count(old)
if n!=1: sys.exit(f'integration refused: anchor count {n}')
open(path,'w').write(s.replace(old,new)); print('fold-53 applied')
