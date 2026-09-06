#!/bin/bash
BASE="$(cd "$(dirname "$0")" && pwd)"
CASES="$BASE/cases"
RESULTS="$BASE/results"
TSC6="node /home/user/scaffold/node_modules/typescript/bin/tsc"
TSC7="node $BASE/package/bin/tsc"

rm -rf "$RESULTS"

run_case() {
  local major="$1" tsc="$2" case="$3" projdir="$4" cwd="$5" suffix="$6"
  local outdir="$RESULTS/$major/$case$suffix"
  mkdir -p "$outdir"
  ( cd "$cwd" && $tsc --noEmit --pretty false -p "$projdir/tsconfig.json" > "$outdir/out.txt" 2> "$outdir/err.txt" )
  echo "exit=$?" > "$outdir/exit.txt"
  ( cd "$cwd" && $tsc --showConfig -p "$projdir/tsconfig.json" > "$outdir/cfg.txt" 2> "$outdir/cfgerr.txt" )
  echo "exit=$?" > "$outdir/cfgexit.txt"
}

CASE_LIST="plain elaborated related nonbmp crlf noinputs malformed unknownoption missingextends mixed"

for major in 6.0.3 7.0.2; do
  if [ "$major" = "6.0.3" ]; then tsc="$TSC6"; else tsc="$TSC7"; fi
  for c in $CASE_LIST; do
    run_case "$major" "$tsc" "$c" "$CASES/$c" "$CASES/$c" ""
  done
  # twofiles: cwd = case folder, and cwd = scratch (BASE)
  run_case "$major" "$tsc" "twofiles" "$CASES/twofiles" "$CASES/twofiles" "-cwdcase"
  run_case "$major" "$tsc" "twofiles" "$CASES/twofiles" "$BASE" "-cwdscratch"
  # missingproject
  outdir="$RESULTS/$major/missingproject"
  mkdir -p "$outdir"
  ( cd "$BASE" && $tsc --noEmit --pretty false -p "$CASES/absent/tsconfig.json" > "$outdir/out.txt" 2> "$outdir/err.txt" )
  echo "exit=$?" > "$outdir/exit.txt"
  ( cd "$BASE" && $tsc --showConfig -p "$CASES/absent/tsconfig.json" > "$outdir/cfg.txt" 2> "$outdir/cfgerr.txt" )
  echo "exit=$?" > "$outdir/cfgexit.txt"
done

echo "done"
