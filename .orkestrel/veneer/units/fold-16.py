#!/usr/bin/env python3
"""Roadmap fold 16: B-PASSIVE-E landed as 70a7487. Rewrites the B-PASSIVE row's status clause."""
p='/home/user/veneer/ROADMAP.md'
s=open(p).read()
old="D landed as `bcf938c` and B as `7b922b6` (each audited by `analyst` on Astra, `reviewer` on Opus 5, and `checker`, its fix round by `analyst`); A, C, and E are in their fix rounds; B-SWEEP landed as `71b7388` under D15"
new="D landed as `bcf938c`, B as `7b922b6`, and E as `70a7487` (each audited by `analyst` on Astra, `reviewer` on Opus 5, and `checker`, its fix rounds by `analyst`); A and C returned from their fix rounds and are under audit; B-SWEEP landed as `71b7388` under D15"
assert s.count(old)==1, s.count(old)
open(p,'w').write(s.replace(old,new))
print('fold 16 applied')
