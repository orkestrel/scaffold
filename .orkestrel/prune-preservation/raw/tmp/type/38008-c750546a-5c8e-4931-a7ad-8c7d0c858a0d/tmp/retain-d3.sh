#!/usr/bin/env bash
set -u
cd "C:/Users/mikes/WebstormProjects/scaffold" || exit 1
dest=".orkestrel/scaffold"
mkdir -p "${dest}/d3-instruments" tmp/audit

cp tmp/units/d3-report.md "${dest}/d3-report.md"

for f in d3-probe-predicate.sh d3-plant.mjs d3-probe-diagnostics.mjs; do
	cp "tmp/units/${f}" "${dest}/d3-instruments/${f}" 2>/dev/null || echo "missing ${f}"
done

for f in d3-predicate d3-diagnostics d3-distribution d3-test d3-format d3-lint; do
	cp "tmp/units/${f}.log.txt" "${dest}/${f}.log.txt" 2>/dev/null || echo "missing ${f}.log.txt"
done

git diff -- tests/config.test.ts tests/distribution.test.ts tests/setupServer.ts \
	tests/setupServer.test.ts host.json > tmp/audit/d3-diff.patch
git status --short > tmp/audit/d3-status.txt
git rev-parse --short HEAD > tmp/audit/d3-head.txt

echo "diff bytes: $(wc -c < tmp/audit/d3-diff.patch)"
cat tmp/audit/d3-status.txt
echo "HEAD: $(cat tmp/audit/d3-head.txt)"

node tmp/rewrite-d3-paths.mjs
