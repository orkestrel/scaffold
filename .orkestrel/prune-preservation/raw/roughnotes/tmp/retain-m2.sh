#!/usr/bin/env bash
# Retain unit M2 and the independent gate evidence into the campaign folder.
set -u
cd "C:/Users/mikes/WebstormProjects/roughnotes" || exit 1
dest=".orkestrel/roughnotes"
mkdir -p "${dest}/m2-instruments" "${dest}/verify"

cp tmp/units/m2-report.md "${dest}/m2-report.md"
cp tmp/units/m2-summaries.mjs "${dest}/m2-instruments/m2-summaries.mjs" 2>/dev/null || echo "missing m2-summaries.mjs"

for f in m2-lint m2-check m2-appbrowser m2-journey m2-policy m2-control; do
	cp "tmp/units/${f}.log.txt" "${dest}/${f}.log.txt" 2>/dev/null || echo "missing ${f}.log.txt"
done

for f in tmp/verify/*.log.txt; do
	[ -e "$f" ] || continue
	cp "$f" "${dest}/verify/$(basename "$f")"
done

node tmp/rewrite-m2-paths.mjs

echo "===== campaign folder ====="
ls "${dest}"
echo "===== verify ====="
ls "${dest}/verify"
