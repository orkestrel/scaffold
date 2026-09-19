#!/usr/bin/env bash
# Repair only the `tests` group. The `configs` group holds `vite.config.ts`,
# which is permanently stale here by design: it carries the four-variant journey
# fan-out and the showcase factory the plan does not know about, and a repair
# over that group would delete both.
set -u
cd "C:/Users/mikes/WebstormProjects/roughnotes" || exit 1
mkdir -p tmp/visit

echo "===== journey surface before ====="
grep -c "JourneyVariant\|JOURNEY_INCLUDE\|appShowcase" vite.config.ts

echo "===== repair tests ====="
npx scaffold repair --groups tests > tmp/visit/repair.log.txt 2>&1
echo "repair_EXIT=$?"
cat tmp/visit/repair.log.txt

echo "===== journey surface after ====="
grep -c "JourneyVariant\|JOURNEY_INCLUDE\|appShowcase" vite.config.ts

step() {
	local name="$1"; shift
	echo "===== ${name} ====="
	"$@" > "tmp/visit/${name}.log.txt" 2>&1
	echo "${name}_EXIT=$?"
	tail -5 "tmp/visit/${name}.log.txt"
}

step formatcheck npm run format:check
step lintcheck npm run lint:check
step check npm run check
step build npm run build
step test npm test

echo "===== audit after ====="
npx scaffold audit > tmp/visit/audit-after.log.txt 2>&1
echo "audit_EXIT=$?"
grep "planned paths drifted" tmp/visit/audit-after.log.txt

echo "===== status ====="
git status --short
