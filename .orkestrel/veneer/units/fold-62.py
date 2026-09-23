# fold-62.py: the UTIL-PLACEMENT landing (725ac07 over 51a8fa0): record the landing in the ROADMAP's B-UTILITIES routing
# row and move the plan's in-flight line from "round 4 runs" to landed. Anchor-refusing.
import sys
def edit(path, old, new):
    s=open(path).read(); n=s.count(old)
    if n!=1: sys.exit(f'integration refused: anchor count {n} in {path} for {old[:60]!r}')
    open(path,'w').write(s.replace(old,new))
R='/home/user/veneer/ROADMAP.md'; P='/home/user/scaffold/.orkestrel/veneer/plan.md'
edit(R, "and a mechanical round on `builder` audited by `analyst` and `checker`)",
        "and a mechanical round on `builder` audited by `analyst` and `checker`); UTIL-PLACEMENT landed as `725ac07` (the position, sizing, visibility, and visually-hidden keys with the Position, Sizing, and Visibility regions after Flex, the focused start control in the browser setup, and the offset names on the Tailwind exclusion line; a first round and a fix round on `opus`, each audited by `analyst` on Astra, `reviewer` on Opus 5.5, and `checker`, and a mechanical round and an evidence round on `builder`, each audited by `analyst` and `checker`; the guide's file table and obligation ledger merged three-way from the unit's base at the landing)")
print('fold-62: routing row updated')
edit(P, "UTIL-PLACEMENT round 3 (`units/upl-audit-3-verdict.md`) needs an evidence round: round 4 runs on `builder` on `units/upl-brief-4.md`.",
        "UTIL-PLACEMENT round 4 (`units/upl-brief-4.md`, `builder` on Sonnet, the evidence round after round 3's `units/upl-audit-3-verdict.md`) is accepted (`units/upl-audit-4-verdict.md`) and landed as `725ac07` on the session branch over `51a8fa0` (`units/upl-land.sh` and `units/upl-land.txt`, `units/upl-resolve-2.py`, `units/table-merge3.py`, `units/land-seams.py`; the landing checker `units/upl-landing-checker-verdict.md`; the fast gates `units/upl-fast-gates.log.txt`; the chain `units/main-upl-gates.log.txt`).")
print('fold-62: plan in-flight line updated')
