# fold-60.py: the UTIL-DISPLAY landing (47aab1d over 7d9d415): record the landing in the ROADMAP's B-UTILITIES routing row and
# move the plan's in-flight line from "lands next" to landed. Anchor-refusing.
import sys
def edit(path, old, new):
    s=open(path).read(); n=s.count(old)
    if n!=1: sys.exit(f'integration refused: anchor count {n} in {path} for {old[:60]!r}')
    open(path,'w').write(s.replace(old,new))
R='/home/user/veneer/ROADMAP.md'; P='/home/user/scaffold/.orkestrel/veneer/plan.md'
edit(R, "UTIL-SPACER landed as `746d3e9` (the `utility` and `utility-variable` mixins with `$state`, the gap keys)",
        "UTIL-SPACER landed as `746d3e9` (the `utility` and `utility-variable` mixins with `$state`, the gap keys); UTIL-DISPLAY landed as `47aab1d` (the display, flex, vertical-alignment, and stacks keys with the Display and Flex regions after Accordion and the `CaptureStem` type change; a first round and a fix round on `opus`, each audited by `analyst` on Astra, `reviewer` on Opus 5.5, and `checker`, and a mechanical round on `builder` audited by `analyst` and `checker`)")
print('fold-60: routing row updated')
edit(P, "UTIL-DISPLAY round 3 is accepted (`units/ud-audit-3-verdict.md`: the code confirmed by `analyst` on Astra and `checker`; the reverse-application reading settled in `units/ud-audit-3-settling.txt`) and lands next.",
        "UTIL-DISPLAY round 3 is accepted (`units/ud-audit-3-verdict.md`) and landed as `47aab1d` on the session branch over `7d9d415` (`units/ud-landing.diff`, `units/ud-resolve.py`, `units/land-seams.py`; the landing checker `units/ud-landing-checker-verdict.md`; the fast gates `units/ud-fast-gates.log.txt`; the chain `units/main-ud-gates.log.txt`).")
print('fold-60: plan in-flight line updated')
