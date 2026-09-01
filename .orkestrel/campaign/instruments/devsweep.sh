#!/bin/bash
# W-DEV sweep: stage every checkout's @orkestrel closure (development and runtime, from committed
# tips) in one install each, then run `npm run check` and `npm run test:guides`. Reports one row per
# checkout as it finishes; fixes nothing.
# Usage: devsweep.sh [consumer...]   (every fleet checkout plus scaffold when none given)
set -u
W=/home/user/work
OUT=/home/user/work/logs/devsweep
mkdir -p "$OUT"
if [ $# -gt 0 ]; then LIST="$*"; else LIST="$(ls /home/user/fleet) scaffold"; fi
for c in $LIST; do
	[ "$c" = supervisor ] && continue
	d=/home/user/fleet/$c; [ "$c" = scaffold ] && d=/home/user/scaffold
	[ -f "$d/package.json" ] || continue
	s=$(date +%s)
	if ! $W/stage-closure.sh "$c" >"$OUT/$c.stage.log" 2>&1; then
		echo "$c STAGE-FAILED $(tail -1 "$OUT/$c.stage.log")"
		continue
	fi
	(cd "$d" && npm run check >"$OUT/$c.check.log" 2>&1); ck=$?
	(cd "$d" && npm run test:guides >"$OUT/$c.guides.log" 2>&1); tg=$?
	echo "$c check=$ck guides=$tg $(( $(date +%s) - s ))s $( [ $ck -ne 0 ] && grep -m1 'error TS' "$OUT/$c.check.log" ) $( [ $tg -ne 0 ] && grep -m1 -E 'FAIL|✗|×|Error' "$OUT/$c.guides.log" )"
done
echo "DEVSWEEP-DONE"
