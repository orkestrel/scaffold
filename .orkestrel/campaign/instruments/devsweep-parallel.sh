#!/bin/bash
# Parallel dev sweep: pack every fleet package once (serially, so no two packs race on one
# tarball), then stage each checkout's closure and run `npm run check` and `npm run test:guides`,
# three checkouts at a time. One row per checkout as it finishes; fixes nothing.
# Usage: devsweep-parallel.sh [consumer...]
set -u
W=/home/user/work
OUT=/home/user/work/logs/devsweep
mkdir -p "$OUT"
if [ $# -gt 0 ]; then LIST="$*"; else LIST="$(ls /home/user/fleet | grep -v supervisor) scaffold"; fi
echo "### packing every package from its committed tip"
for p in $(ls /home/user/fleet | grep -v supervisor); do
	[ -f "/home/user/fleet/$p/package.json" ] || continue
	$W/pack-dep.sh "$p" >/dev/null 2>&1 || echo "PACK-FAILED $p"
done
echo "### sweeping"
sweep_one() {
	c=$1
	d=/home/user/fleet/$c; [ "$c" = scaffold ] && d=/home/user/scaffold
	[ -f "$d/package.json" ] || return 0
	s=$(date +%s)
	if ! $W/stage-closure.sh "$c" >"$OUT/$c.stage.log" 2>&1; then
		echo "$c STAGE-FAILED $(tail -1 "$OUT/$c.stage.log")"
		return 0
	fi
	(cd "$d" && npm run check >"$OUT/$c.check.log" 2>&1); ck=$?
	(cd "$d" && npm run test:guides >"$OUT/$c.guides.log" 2>&1); tg=$?
	echo "$c check=$ck guides=$tg $(( $(date +%s) - s ))s $( [ $ck -ne 0 ] && grep -m1 'error TS' "$OUT/$c.check.log" ) $( [ $tg -ne 0 ] && grep -m1 -E 'FAIL|Error' "$OUT/$c.guides.log" )"
}
export -f sweep_one
export W OUT
printf '%s\n' $LIST | xargs -P 3 -I{} bash -c 'sweep_one {}'
echo "DEVSWEEP-DONE"
