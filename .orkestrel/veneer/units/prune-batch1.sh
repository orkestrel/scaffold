#!/bin/bash
# prune-batch1.sh: lists, then removes with git rm, the scaffold records of the first wave-2/3 landing batch
# (TOAST, UTIL-EFFECT, UTIL-FLOW, MODAL, TIP, UTIL-FONT) once batch1-fold.py's roadmap fold is on Veneer
# main. Usage: prune-batch1.sh list | prune-batch1.sh remove. Keeps every template, queue, and open record.
cd /home/user/scaffold/.orkestrel/veneer/units || exit 1
files=$(ls -d to[-.]* ue[-.]* ufl[-.]* md[-.]* tp[-.]* uf[-.]* to-instruments ue-instruments ufl-instruments \
  md-instruments tp-instruments uf-instruments b-modal-to-* b-modal-md-* b-modal-tp-* b-utilities-ue-* \
  b-utilities-uf-* b-utilities-ufl-* land-to.log.txt land-ue.log.txt land-ufl.log.txt land-md.log.txt \
  land-tp.log.txt land-uf.log.txt land-check-to.log.txt land-check-ue.log.txt land-check-ufl.log.txt \
  land-check-md.log.txt land-check-tp.log.txt land-check-uf.log.txt batch1-land-verify.sh \
  batch1-capture-rerun.sh batch1-gates.sh batch1-merge-gates.sh batch1-fold.py prune-batch1.sh resting-key-measure.sh 2>/dev/null | sort -u)
case "$1" in
  list) echo "$files";;
  remove) git rm -rq --ignore-unmatch $files && echo "removed $(echo "$files" | wc -l) paths";;
  *) echo "usage: $0 list|remove"; exit 2;;
esac
