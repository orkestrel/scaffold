#!/usr/bin/env bash
# Phase B of the bootstrap: for each named package in order, stage its runtime-only closure from the
# packed tips of earlier layers, then build and pack it. scaffold is staged but never packed.
# Usage: phaseB.sh <pkg>...   Log: /home/user/work/logs/phaseB.log
LOG=/home/user/work/logs/phaseB.log
for p in "$@"; do
  start=$(date +%s)
  if [ "$p" != codec ] && [ "$p" != contract ] && [ "$p" != msg ] && [ "$p" != sse ] && [ "$p" != test ]; then
    if /home/user/work/stage-closure.sh "$p" --runtime-only > /home/user/work/logs/stageB-$p.log 2>&1; then echo "$p staged(runtime) $(grep -c ' OK ' /home/user/work/logs/stageB-$p.log) rows" >> $LOG; else echo "$p STAGE FAILED: $(tail -2 /home/user/work/logs/stageB-$p.log | tr '\n' ' ')" >> $LOG; continue; fi
  fi
  if [ "$p" = scaffold ]; then echo "scaffold not packed (tooling)" >> $LOG; continue; fi
  if tb=$(/home/user/work/pack-dep.sh "$p" 2>/home/user/work/logs/packB-$p.err); then echo "$p packed $(basename $tb) $(( $(date +%s) - start ))s" >> $LOG; else echo "$p PACK FAILED: $(cat /home/user/work/logs/packB-$p.err | tail -2 | tr '\n' ' ')" >> $LOG; fi
done
echo "DONE $* $(date -u +%FT%TZ)" >> $LOG
