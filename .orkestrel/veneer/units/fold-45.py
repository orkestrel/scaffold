#!/usr/bin/env python3
"""Roadmap fold 45: CLOSE-GUIDE landed; the § Showcase, § Customization, barrel-neighbour, stem-table, and token-noun rows close, and the B-PASSIVE status sentence records the family close."""
import subprocess,re
sha=subprocess.check_output(['git','-C','/home/user/veneer','rev-parse','--short','HEAD']).decode().strip()
p='/home/user/veneer/ROADMAP.md'; s=open(p).read()
def close(opening, text):
    global s
    m=re.search(r'^\| '+re.escape(opening)+r'[^\n]*$', s, re.M); assert m, opening
    cells=m.group(0).split('|'); cells[2]=' '+text+' '
    s=s[:m.start()]+'|'.join(cells)+s[m.end():]
close("The guide's § Showcase region paragraph enumerates", f"Closed: CLOSE-GUIDE at `{sha}` states the rule that the regions render in the order the `Showcase` class constructs them, pinned by the showcase proof, and enumerates none (R5; D35's alphabetical order superseded)")
close("§ Customization's claim that every derived tier", f"Closed: CLOSE-GUIDE at `{sha}` bounds the claim to the tiers and aliases derived from the retuned token, names the palette-blue reads in their sections, and proves them under the recipe's retune (R4)")
close("The component-section sentences naming a barrel neighbour", f"Closed: CLOSE-GUIDE at `{sha}` removes every barrel-neighbour sentence and gives the forms order one home in § Styles pinned by the conformance order case (R6)")
close("The guide's § Tests stem table omits", f"Closed: CLOSE-GUIDE at `{sha}` states the stem rule with gated examples and links the capture registry as every stem's home, under a parity case in the guides proof (R1, re-baselined on the cost of a second gated copy)")
close("The guide-wide token-noun sweep", f"Closed: CLOSE-GUIDE at `{sha}` sweeps the whole guide with every hit ruled in a retained ledger (R7)")
open(p,'w').write(s); print('fold 45 applied with CLOSE-GUIDE',sha)
