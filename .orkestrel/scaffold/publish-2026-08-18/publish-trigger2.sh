#!/usr/bin/env bash
# Bump trigger 2: does a package's CURRENT runtime dependency set differ from the
# set in its PUBLISHED packument? A re-pinned runtime range is published surface —
# without a bump a consumer installs two copies of the moved dependency.
#
# Tests the final set against the packument, never "did my step move a pin": overwrite's
# declare re-pins before any later check, so a step-local reading reports nothing moved
# while the manifest surface did.
set -u
OUT=/home/user/scaffold/tmp/trigger2.txt
: > "$OUT"

for d in /workspace/*/; do
	r=$(basename "$d")
	[ -f "$d/package.json" ] || continue
	[ "$r" = "supervisor" ] && continue
	node -e "
const m = require('$d/package.json');
if (m.private) { console.log('PRIVATE ' + m.name); process.exit(0) }
console.log('PKG ' + m.name + ' ' + m.version);
const deps = m.dependencies ?? {};
for (const k of Object.keys(deps).sort()) console.log('LOCAL ' + k + ' ' + deps[k]);
" >> "$OUT" 2>/dev/null
done

echo "=== comparing against published packuments ===" >> "$OUT"
for d in /workspace/*/; do
	r=$(basename "$d")
	[ -f "$d/package.json" ] || continue
	[ "$r" = "supervisor" ] && continue
	name=$(node -p "require('$d/package.json').name" 2>/dev/null) || continue
	ver=$(node -p "require('$d/package.json').version" 2>/dev/null) || continue
	published=$(npm view "$name@$ver" dependencies --json 2>/dev/null)
	local_deps=$(node -e "
const m = require('$d/package.json');
const deps = m.dependencies ?? {};
const sorted = {};
for (const k of Object.keys(deps).sort()) sorted[k] = deps[k];
console.log(JSON.stringify(sorted));
" 2>/dev/null)
	norm_pub=$(node -e "
let raw = process.argv[1];
let o = {};
try { o = raw && raw !== 'undefined' ? JSON.parse(raw) : {} } catch { o = {} }
if (o === null) o = {};
const sorted = {};
for (const k of Object.keys(o).sort()) sorted[k] = o[k];
console.log(JSON.stringify(sorted));
" "$published" 2>/dev/null)
	if [ "$local_deps" = "$norm_pub" ]; then
		echo "SAME $name@$ver" >> "$OUT"
	else
		echo "MOVED $name@$ver" >> "$OUT"
		echo "   published: $norm_pub" >> "$OUT"
		echo "   local:     $local_deps" >> "$OUT"
	fi
done
echo "=== done ===" >> "$OUT"
