#!/bin/bash
# Prepare a slice of packages serially with prep-one-2.sh, reporting each as it finishes.
# Usage: layer.sh <slice-name> <pkg>...; log /home/user/work/wave/layer-<slice>.log; ends LAYER-<slice>-DONE.
set -u
export PATH=/opt/npm11/bin:$PATH
S=${1:?slice}; shift
W=/home/user/work/wave; LOG=$W/layer-$S.log; : > "$LOG"
for p in "$@"; do
  bash "$W/prep-one-2.sh" "$p"; rc=$?
  echo "$(date -u +%H:%M:%S) $p prep exit=$rc: $(tail -n 1 "$W/prep-$p.log" | cut -c1-140)" >> "$LOG"
done
echo "LAYER-$S-DONE" >> "$LOG"
