#!/usr/bin/env python3
"""Roadmap fold 23: F8c (F8b SHARED-PREFLIGHT, F8c-A READERS, F8c-B MOVE) landed; the merge's duplicated F8 row is folded into one; F8d IMPORTANCE-LONGHANDS is added; the dangling campaign paths point at the records that exist."""
import subprocess
sha=subprocess.check_output(['git','-C','/home/user/veneer','rev-parse','--short','HEAD']).decode().strip()
p='/home/user/veneer/ROADMAP.md'; s=open(p).read()
def sub(old,new,count=1):
    global s
    n=s.count(old); assert n==count,(n,old[:80]); s=s.replace(old,new)
lines=s.split('\n'); rows=[i for i,l in enumerate(lines) if l.startswith('| F8 TAILWIND ')]; assert len(rows)==2,rows
first,second=rows
row=lines[second]
old="F8a PROFILES and F8b SHARED-PREFLIGHT returned; F8c SERVICE moves their proofs into the `service` project under `tests/service/tailwind/`"
assert row.count(old)==1
row=row.replace(old,f"F8a PROFILES landed as `0783b2b` after a round audited by `analyst` on Astra and `reviewer` on Opus 5 and two fix rounds on Opus 5 each audited by `analyst` on Astra; F8b SHARED-PREFLIGHT, F8c-A READERS, and F8c-B MOVE landed together as `{sha}` (each audited by `analyst` on Astra and `reviewer` on Opus 5, each fix round audited by the engine that did not write it; the proofs run in Node under `tests/service/tailwind/` through the `test:service` script, which `prepublishOnly` runs); F8d IMPORTANCE-LONGHANDS follows")
lines[first]=row; del lines[second]; s='\n'.join(lines)
sub("| T1 TEST-SCOPED           |",
    "| F8d IMPORTANCE-LONGHANDS | `opus` on Opus 5 after F8c (the service proof drives Chromium, which the bench sandbox denies); audited by `analyst` on Astra and `reviewer` on Opus 5 | Veneer | F8 | `collectImportantNames` and the shared-name equality in the consumer proof compute importance over the longhands Tailwind's rule declares, so the equality and the branch case enforce one rule |\n| T1 TEST-SCOPED           |")
sub("""These bind every unit. The standing set is recorded in
`/home/user/scaffold/.orkestrel/veneer/units/g1-record-report.md` § C. The design set is recorded
in `/home/user/scaffold/.orkestrel/veneer/realign-design-verdict.md`, which wins wherever the two
disagree.""",
"""These bind every unit. The design verdicts under `/home/user/scaffold/.orkestrel/veneer/`
(`f8-design-verdict.md` amended by `f8c-design-verdict.md`, `b-passive-design-verdict.md`,
`b-sweep-design-verdict.md`, and `b-forms-design-verdict.md`) and `units/decisions-round-2.md`
there carry the rulings each family executes, and a design ruling wins wherever it and a standing
ruling disagree; git history archives every pruned record.""")
sub("""Each `B` family owns the keys listed here, taken from the assignment in
`/home/user/scaffold/.orkestrel/veneer/research/ledger.md` § Units and grouped by the reading in
`/home/user/scaffold/.orkestrel/veneer/units/remaining-surface.md`. Read which keys already ship
from the conformance run, never from this queue.""",
"""Each `B` family owns the keys listed here; the assignment's source records were pruned at their
families' close, and the scaffold repository's git history archives them. Read which keys already
ship from the conformance run, never from this queue.""")
sub("Closed: Elements carries no Bootstrap-style grid (`/home/user/scaffold/.orkestrel/veneer/units/elements-grid-search.md`). E-ELEMENTS records the closure with the search pattern",
    "Closed: Elements carries no Bootstrap-style grid; the search of 2026-09-22 ran `grid-template|display:\\s*grid|\\.row\\b|\\.col-|inline-size:\\s*min\\(|--set-container|--set-width|max-inline-size` over its `src/styles/**/*.scss` and found page, description-list, and local grids and no `.row`, `.col-*`, container-width, or gutter class. E-ELEMENTS records the closure with that pattern")
sub("""`/home/user/scaffold/.orkestrel/veneer/realign-design-verdict.md` for the rulings this file
  carries. `/home/user/scaffold/.orkestrel/veneer/plan.md` is a bridge to this file.""",
"""the design verdicts at that folder's root with `units/decisions-round-2.md` for the rulings
  this file carries. `/home/user/scaffold/.orkestrel/veneer/plan.md` indexes that folder and
  records the landing procedure.""")
sub("| The ledger readers' repeated default guide path",
    "| `collectImportantNames` and the shared-name equality in the consumer proof compute importance per name where the proof's branch case reads it per longhand (F8c-B round 5) | F8d IMPORTANCE-LONGHANDS computes importance over the longhands Tailwind's rule declares, so the equality and the branch case enforce one rule |\n| The ledger readers' repeated default guide path")
open(p,'w').write(s); print('fold 23 applied with F8c',sha)
