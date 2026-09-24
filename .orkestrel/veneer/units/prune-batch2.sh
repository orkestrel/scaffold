#!/bin/bash
# prune-batch2.sh: lists, then removes with git rm, the scaffold records of the second wave-2/3 landing batch
# (UTIL-PAINT, UTIL-TEXT, UTIL-SPACING, RESIDUE, OFFCANVAS, BACKGROUND-SIZE, JOURNEY-BUDGET, BARE-BUTTON) and of
# RAMP-DOWN, LEDGER, FADE, and PAGE-FRAME, once batch2-fold-2.py's roadmap fold is on Veneer main. A successor of
# prune-batch1.sh. Usage: prune-batch2.sh list | prune-batch2.sh remove. Keeps every template, queue, and open
# record: BCF, THEME, FOCUS-FRAME, CLOSE-OUT, the design verdicts, the decisions, and the notes. The PAGE-FRAME
# design records stay: the BCF and THEME briefs in flight name pf-design-verdict.md, and its R7 scopes FOCUS-FRAME.
cd /home/user/scaffold/.orkestrel/veneer/units || exit 1
units="up ut usp dr oc bz jb cb rd cl cf pf"
pat=""
for u in $units; do pat="$pat ${u}[-.]* ${u}-instruments land-${u}.log.txt land-check-${u}*.log.txt"; done
files=$(ls -d $pat b-utilities-up-* b-utilities-ut-* b-utilities-usp-* b-cross-dr-* b-modal-oc-* b-cross-bz-* \
  b-cross-jb-* b-cross-cb-* b-modal-rd-* b-cross-cl-* b-cross-cf-* b-cross-pf-* \
  batch2-verify.sh batch2-verify-2.sh batch2-verify-1.log.txt batch2-fold.py batch2-fold-2.py jb-integrate.py \
  rd-audit-briefs.py cl-audit-briefs.py cf-audit-briefs.py cb-audit-briefs.py \
  prune-batch2.sh merge-main-7e96cf8.log.txt 2>/dev/null | grep -v '^pf-design-' | sort -u)
case "$1" in
  list) echo "$files";;
  remove) git rm -rq --ignore-unmatch $files && echo "removed the listed paths";;
  *) echo "usage: $0 list|remove"; exit 2;;
esac
