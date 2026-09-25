#!/usr/bin/env bash
# J-ORACLE-FIX-OFFCANVAS round 3 acceptance run (successor of accept-2.sh, which writes round 2's
# census folder and runs neither the policy, guides, and setup:browser gates nor helpers.test.ts and
# index.test.ts): the read-only checks, those three gates, the five scoped browser files one at a
# time, and the offcanvas and modal census written to census-after-3 and compared with round 2's
# through compare-3.py, each with its exit code and its log under this folder.
set -u
cd /c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas || exit 2
OUT=tmp/j-oracle-fix-offcanvas

for script in check lint:check format:check test:policy test:guides test:setup:browser; do
	log=$OUT/accept-3-${script//:/-}.log.txt
	npm run "$script" > "$log" 2>&1
	echo "npm run $script exit $?"
done
grep -E "Test Files|Tests +[0-9]" "$OUT/accept-3-test-policy.log.txt" "$OUT/accept-3-test-setup-browser.log.txt"
tail -n 5 "$OUT/accept-3-test-guides.log.txt"
for file in helpers Offcanvas Isolation Modal index; do
	npx vitest run --config vite.config.ts --no-cache --project src:browser "tests/src/browser/$file.test.ts" > "$OUT/accept-3-$file.log.txt" 2>&1
	echo "$file.test.ts exit $?"
	grep -E "Test Files|Tests +[0-9]" "$OUT/accept-3-$file.log.txt"
done
ORACLE_PLUGINS=offcanvas,modal npx vitest run --config vite.config.ts --no-cache --project probe tmp/probe/census.test.ts > "$OUT/census-after-3.log.txt" 2>&1
echo "census exit $?"
mkdir -p "$OUT/census-after-3"
cp tmp/j-oracle/census/*.json "$OUT/census-after-3/"
python "$OUT/compare-3.py" > "$OUT/compare-3.log.txt" 2>&1
echo "compare exit $?"
cat "$OUT/compare-3.log.txt"
