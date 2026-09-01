#!/bin/bash
# Pack (or reuse) every package in a consumer's @orkestrel closure from committed tips and stage the
# whole set into the consumer in ONE install, then verify file by file.
# Usage: stage-closure.sh <consumer> [--runtime-only]
set -e
C=${1:?consumer}; shift
W=/home/user/work; T=/home/user/scaffold/tmp/tarballs
SET=$(node $W/stage-set.mjs "$C" "$@")
[ -n "$SET" ] || { echo "$C: empty closure, nothing to stage"; exit 0; }
TARBALLS=""
for p in $SET; do
	tb=$($W/pack-dep.sh "$p") || { echo "PACK FAILED for $p" >&2; exit 1; }
	TARBALLS="$TARBALLS $tb"
done
$W/stage-deps.sh "$C" $TARBALLS
node $W/verify-stage.mjs "$C"
