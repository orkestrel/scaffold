#!/usr/bin/env bash
# npm ci in one fleet checkout (registry copies from the committed lockfile). Usage: ci-one.sh <pkg>
p=$1; d=/home/user/fleet/$p; LOG=/home/user/work/logs/ci-$p.log
start=$(date +%s)
if (cd $d && npm ci --no-audit --no-fund > $LOG 2>&1); then echo "$p ci OK $(( $(date +%s) - start ))s" >> /home/user/work/logs/ci-fleet.log; else echo "$p ci FAILED $(tail -1 $LOG)" >> /home/user/work/logs/ci-fleet.log; fi
