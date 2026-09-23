#!/usr/bin/env python3
"""Roadmap fold 29: L2 LEDGER-PRIORITY (D39, D39a) landed; its carrier row enters closed."""
import subprocess
sha=subprocess.check_output(['git','-C','/home/user/veneer','rev-parse','--short','HEAD']).decode().strip()
p='/home/user/veneer/ROADMAP.md'; s=open(p).read()
old="; CONTROL is under audit"
new=f"; L2 LEDGER-PRIORITY landed as `{sha}` (`builder` on Sonnet, D39 and D39a; the Orchestrator's reading of its retained probe as the review); CONTROL is under audit"
assert s.count(old)==1; s=s.replace(old,new)
anchor="| The ledger readers' repeated default guide path"
i=s.index(anchor); j=s.index("\n",i)+1
row=(f"| The `readCascadeBlocks` function stores a declaration's value without its priority, so the cascade comparison and the ledger rows cannot see a dropped or added `!important` value (D39) "
     f"| Closed: L2 LEDGER-PRIORITY at `{sha}` (`builder` on Sonnet, D39a) holds every shared declaration's priority equal to the release's through a conformance case that reads the compiled release and the built cascade through `SheetReader`; the ledger rows keep comparing values, and the oracle fixture records none |\n")
s=s[:j]+row+s[j:]
open(p,'w').write(s); print('fold 29 applied with L2',sha)
