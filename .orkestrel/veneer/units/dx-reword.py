# dx-reword.py: reword the three disclosure landing messages so no count of a growable set remains (dx-landing-checker-verdict.md claim 6). Anchor-refusing.
import sys
def edit(path, old, new):
    s=open(path).read(); n=s.count(old)
    if n!=1: sys.exit(f'edit refused: anchor count {n} in {path} for {old[:50]!r}')
    open(path,'w').write(s.replace(old,new))
U='/home/user/scaffold/.orkestrel/veneer/units/'
edit(U+'dd-landing-message.txt', 'The unit DROPDOWN ran over two rounds on opus in', 'The unit DROPDOWN ran over a first round and a fix round on opus in')
edit(U+'dd-landing-message.txt', 'mutation executed red and the four journey variants green on the validation copy.', 'mutation executed red and each journey variant green on the validation copy.')
edit(U+'nv-landing-message.txt', 'The unit NAV ran over two rounds on opus in', 'The unit NAV ran over a first round and a fix round on opus in')
edit(U+'co-landing-message.txt', 'COLLAPSE ran over two rounds on opus and builder in /home/user/veneer-co from 87ff1d0, audited by', 'COLLAPSE ran over a first round on opus and a fix round on builder in /home/user/veneer-co from 87ff1d0, audited by')
print('messages reworded')
