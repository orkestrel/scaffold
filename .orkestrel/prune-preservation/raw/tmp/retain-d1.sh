#!/usr/bin/env bash
# Retain unit D1 and capture the evidence the audit lanes need. Read-only roles
# carry no shell, so the Orchestrator supplies the diff and the status.
set -u
cd "C:/Users/mikes/WebstormProjects/scaffold" || exit 1
dest=".orkestrel/scaffold"
mkdir -p "${dest}/d1-instruments" tmp/audit

cp tmp/units/d1-report.md "${dest}/d1-report.md"

for f in d1-probe-appshape.mjs d1-run-apponly.sh d1-repin.mjs \
	d1-probe-skipreport.sh d1-probe-skipreport-2.sh d1-probe-skipreport-3.sh; do
	cp "tmp/units/${f}" "${dest}/d1-instruments/${f}" 2>/dev/null || echo "missing ${f}"
done

for f in d1-red d1-green d1-green-2 d1-skipreport; do
	cp "tmp/units/${f}.log.txt" "${dest}/${f}.log.txt" 2>/dev/null || echo "missing ${f}.log.txt"
done

git diff -- tests/config.test.ts tests/distribution.test.ts host.json > tmp/audit/d1-diff.patch
echo "diff bytes: $(wc -c < tmp/audit/d1-diff.patch)"

git status --short > tmp/audit/d1-status.txt
cat tmp/audit/d1-status.txt

node tmp/rewrite-d1-paths.mjs

echo "===== retained ====="
ls "${dest}"
