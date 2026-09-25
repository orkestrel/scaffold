#!/usr/bin/env bash
# J-ORACLE-FIX-OFFCANVAS round 5 acceptance run (successor of accept-3.sh, which writes round 3's
# census folder and compares it with round 2's): the read-only checks, the policy, guides, and
# setup:browser gates, the five scoped browser files one at a time, the offcanvas and modal census
# written to census-after-5 and compared with round 3's through compare-5.py, and the `test:app`
# observation, each with its exit code and its log under this folder.
set -u
cd /c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas || exit 2
OUT=tmp/j-oracle-fix-offcanvas

for script in check lint:check format:check test:policy test:guides test:setup:browser; do
	log=$OUT/accept-5-${script//:/-}.log.txt
	npm run "$script" > "$log" 2>&1
	echo "npm run $script exit $?"
done
grep -E "Test Files|Tests +[0-9]" "$OUT/accept-5-test-policy.log.txt" "$OUT/accept-5-test-setup-browser.log.txt"
tail -n 5 "$OUT/accept-5-test-guides.log.txt"
for file in helpers Offcanvas Isolation Modal index; do
	npx vitest run --config vite.config.ts --no-cache --project src:browser "tests/src/browser/$file.test.ts" > "$OUT/accept-5-$file.log.txt" 2>&1
	echo "$file.test.ts exit $?"
	grep -E "Test Files|Tests +[0-9]" "$OUT/accept-5-$file.log.txt"
done
ORACLE_PLUGINS=offcanvas,modal npx vitest run --config vite.config.ts --no-cache --project probe tmp/probe/census.test.ts > "$OUT/census-after-5.log.txt" 2>&1
echo "census exit $?"
mkdir -p "$OUT/census-after-5"
cp tmp/j-oracle/census/*.json "$OUT/census-after-5/"
python "$OUT/compare-5.py" > "$OUT/compare-5.log.txt" 2>&1
echo "compare exit $?"
cat "$OUT/compare-5.log.txt"
npm run test:app > "$OUT/accept-5-test-app.log.txt" 2>&1
echo "npm run test:app exit $? (observation)"
grep -E "Test Files|Tests +[0-9]" "$OUT/accept-5-test-app.log.txt"
