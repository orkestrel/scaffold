# fold-54.py: the UTIL-SPACER landing (746d3e9): fill the CL8b carrier row's landing hash, record the landing in the
# B-UTILITIES row, and carry the round-2 Showcase clause (the gap steps' home) into the Showcase paragraph's own
# "X sits in Y" form, the site the landing checker named (claim 3). Anchor-refusing.
import sys
def edit(path, old, new):
    s=open(path).read(); n=s.count(old)
    if n!=1: sys.exit(f'integration refused: anchor count {n} in {path} for {old[:50]!r}')
    open(path,'w').write(s.replace(old,new))
R='/home/user/veneer/ROADMAP.md'; G='/home/user/veneer/guides/veneer.md'
edit(R, "closed: UTIL-SPACER landed (`<landing hash>`) with the `gap` and `column-gap` keys", "closed: UTIL-SPACER landed (`746d3e9`) with the `gap` and `column-gap` keys")
edit(R, "| B-UTILITIES              | `opus` on Opus 5.5, one unit per mechanism ", "| B-UTILITIES              | `opus` on Opus 5.5, one unit per mechanism; UTIL-SPACER landed as `746d3e9` (the `utility` and `utility-variable` mixins with `$state`, the gap keys) ")
edit(G, "the vertical rule sits in Layout, and the list and quotation classes sit in Type.", "the vertical rule and the gap steps sit in Layout beside the gutters, and the list and quotation classes sit in Type.")
print('fold-54 applied')
