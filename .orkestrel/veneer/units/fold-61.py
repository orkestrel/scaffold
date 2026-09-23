# fold-61.py: the TOGGLES landing (1adc7af over 72e97e2, the roadmap re-pad d0c1eff): record the landing in the ROADMAP's
# B-COLLAPSE … B-SCROLLSPY routing row, add the CLOSE-OUT carrier row for the duplicated obligation-ledger row the
# UTIL-PLACEMENT landing probe found, and move the plan's in-flight line from "round 3 runs" to landed. Anchor-refusing.
import sys
def edit(path, old, new):
    s=open(path).read(); n=s.count(old)
    if n!=1: sys.exit(f'integration refused: anchor count {n} in {path} for {old[:60]!r}')
    open(path,'w').write(s.replace(old,new))
R='/home/user/veneer/ROADMAP.md'; P='/home/user/scaffold/.orkestrel/veneer/plan.md'
edit(R, "the Accordion region constructed after Carousel; the base and flush frames read at 1280 and 390 at the landing)",
        "the Accordion region constructed after Carousel; the base and flush frames read at 1280 and 390 at the landing); TOGGLES landed as `1adc7af` (the split toggle and the grouped dropdown toggle corners with their specimens, proofs, and guide rows; a first round and a fix round on `opus`, each audited by `analyst` on Astra, `reviewer` on Opus 5.5, and `checker`, and a mechanical round on `builder` audited by `analyst` and `checker`; the guide's deferral table merged three-way from the unit's base at the landing)")
print('fold-61: routing row updated')
s=open(R).read(); lines=s.split('\n')
idx=[i for i,l in enumerate(lines) if l.startswith("| Bare field tokens as sentence subjects in the older TSDoc blocks of `tests/setupStyles.ts`")]
if len(idx)!=1: sys.exit(f'integration refused: carrier anchor count {len(idx)}')
lines[idx[0]+1:idx[0]+1]=["| The obligation ledger in `guides/veneer.md` (the `| Component | Kind | Obligation |` table) carries the `btn | accessibility | A toggle announces the button role and its pressed state, rather than a checkbox role.` row twice (the UTIL-PLACEMENT landing probe's row-sequence merge) | CLOSE-OUT deletes the second copy and adds a uniqueness assertion over the ledger's rows to the guide proof |"]
open(R,'w').write('\n'.join(lines)); print('fold-61: carrier row added')
edit(P, "TOGGLES round 2 reconciled at 18:40 UTC (`units/tg-audit-2-verdict.md`: FAIL 3, 4, 7 with `caret-side-name` and `REPORT-COUNTS`; the empty-toggle probe is adopted as a case, the `side` field becomes `margin`, and the prose findings are carried) and round 3 runs on `builder` on Sonnet in `/home/user/veneer-tg` on `units/tg-brief-3.md`; its audit is `checker` and `analyst`.",
        "TOGGLES round 3 (`units/tg-brief-3.md`, `builder` on Sonnet, after round 2's `units/tg-audit-2-verdict.md`) is accepted (`units/tg-audit-3-verdict.md`) and landed as `1adc7af` on the session branch over `72e97e2` (`units/tg-landing.diff`, `units/tg-resolve.py`, `units/land-seams.py`, and `units/table-merge3.py` for the deferral table, `units/tg-landing-table.txt`; the landing checker `units/tg-landing-checker-verdict.md`; the fast gates `units/tg-fast-gates.log.txt`; the roadmap re-pad `d0c1eff`, `units/tg-format-fix.log.txt`; the chain `units/main-tg-gates.log.txt`).")
print('fold-61: plan in-flight line updated')
