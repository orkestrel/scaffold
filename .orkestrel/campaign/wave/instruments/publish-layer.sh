#!/bin/bash
# Upload a prepared layer back-to-back on one one-time code, serially, stopping at the first upload the registry
# does not confirm. Usage: publish-layer.sh <otp> <pkg>...; log /home/user/work/wave/publish-layer-<first pkg>.log
set -u
export PATH=/opt/npm11/bin:$PATH
OTP=${1:?otp}; shift
W=/home/user/work/wave; LOG=$W/publish-layer-$1.log; : > "$LOG"
for p in "$@"; do
  line=$(bash "$W/publish-one.sh" "$p" "$OTP" 2>&1 | tail -n 1 | tr -d '\r' | sed 's/\x1b\[[0-9;]*[A-Za-z]//g')
  echo "$(date -u +%H:%M:%S) $line" | tee -a "$LOG"
  if ! tr -d "\r" < "$(ls -t $W/publish-$p-*.log | head -1)" | grep -qE "\+ @orkestrel/$p@"; then echo "STOP at $p (no acceptance line)" | tee -a "$LOG"; exit 1; fi
done
echo "LAYER-PUBLISHED" | tee -a "$LOG"
