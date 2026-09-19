#!/usr/bin/env bash
# Retain unit D2 and capture the evidence the second audit round needs.
set -u
cd "C:/Users/mikes/WebstormProjects/scaffold" || exit 1
dest=".orkestrel/scaffold"
mkdir -p "${dest}/d2-instruments" tmp/audit

cp tmp/units/d2-report.md "${dest}/d2-report.md"

for f in d2-probe-predicate.sh d2-generate.mjs d2-repin.mjs d2-gates.sh; do
	cp "tmp/units/${f}" "${dest}/d2-instruments/${f}" 2>/dev/null || echo "missing ${f}"
done

for f in d2-prefix d2-postfix d2-build d2-distribution d2-gates; do
	cp "tmp/units/${f}.log.txt" "${dest}/${f}.log.txt" 2>/dev/null || echo "missing ${f}.log.txt"
done

# The whole change under audit: D1's work, D2's corrections, and the Orchestrator's
# integration of D2's returned shared-file patch.
git diff -- tests/config.test.ts tests/distribution.test.ts tests/setupServer.ts \
	tests/setupServer.test.ts host.json > tmp/audit/d2-diff.patch
echo "diff bytes: $(wc -c < tmp/audit/d2-diff.patch)"

git status --short > tmp/audit/d2-status.txt
git rev-parse --short HEAD > tmp/audit/d2-head.txt
cat tmp/audit/d2-status.txt
echo "HEAD: $(cat tmp/audit/d2-head.txt)"

node tmp/rewrite-d2-paths.mjs

echo "===== retained ====="
ls "${dest}"
