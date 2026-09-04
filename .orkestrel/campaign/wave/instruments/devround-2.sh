#!/bin/bash
# Run repin-dev-2.sh over a slice serially. Usage: devround.sh <slice> <pkg>...; log devround-<slice>.log; ends DEVROUND-<slice>-DONE
set -u
export PATH=/opt/npm11/bin:$PATH
S=${1:?slice}; shift; W=/home/user/work/wave; LOG=$W/devround-$S.log; : > "$LOG"
for p in "$@"; do bash "$W/repin-dev-2.sh" "$p"; echo "$(date -u +%H:%M:%S) $p: $(tail -n 1 "$W/devrepin-$p.log" | cut -c1-140)" >> "$LOG"; done
echo "DEVROUND-$S-DONE" >> "$LOG"
