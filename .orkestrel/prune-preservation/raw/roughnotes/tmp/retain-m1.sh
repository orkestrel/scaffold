#!/usr/bin/env bash
# Retain unit M1 into the campaign folder, rewriting every tmp/ path inside the
# copied artifacts to the retained path it now names.
set -u
cd "C:/Users/mikes/WebstormProjects/roughnotes" || exit 1
dest=".orkestrel/roughnotes"
mkdir -p "${dest}/m1-instruments"

cp tmp/units/m1-report.md "${dest}/m1-report.md"

for f in m1-vite-config-capture.ts m1-package-json-capture.json m1-oxlintrc-capture.json \
	m1-prettierignore-capture.txt m1-restore.mjs m1-restore-showcase.mjs m1-restore-script.mjs \
	m1-drop-journey.mjs m1-fix-summary.mjs m1-offlimits-lint.txt; do
	cp "tmp/units/${f}" "${dest}/m1-instruments/${f}" 2>/dev/null || echo "missing ${f}"
done

for f in m1-overwrite m1-config-before m1-config-after m1-journey m1-check m1-format m1-lint \
	m1-build m1-test m1-audit-after; do
	cp "tmp/units/${f}.log.txt" "${dest}/${f}.log.txt" 2>/dev/null || echo "missing ${f}.log.txt"
done

# Rewrite tmp/units paths inside the retained prose to the retained homes.
node tmp/rewrite-m1-paths.mjs

echo "===== retained ====="
ls "${dest}"
echo "===== instruments ====="
ls "${dest}/m1-instruments"
