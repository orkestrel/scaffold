#!/usr/bin/env bash
# J-ORACLE-FIX-OFFCANVAS round 2 acceptance run (successor of accept.sh, which writes round 1's census
# folder): the read-only checks, the three scoped browser files one at a time, and the offcanvas and
# modal census written to census-after-2 and compared with round 1's through compare-2.py, each with
# its exit code and its log under this folder.
set -u
cd /c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas || exit 2
OUT=tmp/j-oracle-fix-offcanvas

npm run check > "$OUT/accept-2-check.log.txt" 2>&1
echo "npm run check exit $?"
npm run lint:check > "$OUT/accept-2-lint-check.log.txt" 2>&1
echo "npm run lint:check exit $?"
npm run format:check > "$OUT/accept-2-format-check.log.txt" 2>&1
echo "npm run format:check exit $?"
for file in Offcanvas Isolation Modal; do
	npx vitest run --config vite.config.ts --no-cache --project src:browser "tests/src/browser/$file.test.ts" > "$OUT/accept-2-$file.log.txt" 2>&1
	echo "$file.test.ts exit $?"
	grep -E "Test Files|Tests +[0-9]" "$OUT/accept-2-$file.log.txt"
done
ORACLE_PLUGINS=offcanvas,modal npx vitest run --config vite.config.ts --no-cache --project probe tmp/probe/census.test.ts > "$OUT/census-after-2.log.txt" 2>&1
echo "census exit $?"
mkdir -p "$OUT/census-after-2"
cp tmp/j-oracle/census/*.json "$OUT/census-after-2/"
python "$OUT/compare-2.py" > "$OUT/compare-2.log.txt" 2>&1
echo "compare exit $?"
cat "$OUT/compare-2.log.txt"
