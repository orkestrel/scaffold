#!/usr/bin/env bash
# J-ORACLE-FIX-OFFCANVAS acceptance run: the read-only checks, the three scoped browser files one at a
# time, and the offcanvas and modal census, each with its exit code and its log under this folder.
set -u
cd /c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas || exit 2
OUT=tmp/j-oracle-fix-offcanvas

npm run check > "$OUT/accept-check.log.txt" 2>&1
echo "npm run check exit $?"
npm run lint:check > "$OUT/accept-lint-check.log.txt" 2>&1
echo "npm run lint:check exit $?"
npm run format:check > "$OUT/accept-format-check.log.txt" 2>&1
echo "npm run format:check exit $?"
for file in Offcanvas Isolation Modal; do
	npx vitest run --config vite.config.ts --no-cache --project src:browser "tests/src/browser/$file.test.ts" > "$OUT/accept-$file.log.txt" 2>&1
	echo "$file.test.ts exit $?"
	grep -E "Test Files|Tests +[0-9]" "$OUT/accept-$file.log.txt"
done
ORACLE_PLUGINS=offcanvas,modal npx vitest run --config vite.config.ts --no-cache --project probe tmp/probe/census.test.ts > "$OUT/census-after.log.txt" 2>&1
echo "census exit $?"
mkdir -p "$OUT/census-after"
cp tmp/j-oracle/census/*.json "$OUT/census-after/"
