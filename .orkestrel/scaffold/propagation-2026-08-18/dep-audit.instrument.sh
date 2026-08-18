#!/usr/bin/env bash
# Audit every @orkestrel dependency and devDependency in every target against the
# version the registry currently serves. Reports drift; writes nothing.
set -u
cd /workspace || exit 1

# One registry read per package, cached.
declare -A LATEST
for pkg in $(for d in */; do
	r=${d%/}
	[ -f "$r/package.json" ] || continue
	node -e "
const m=require('/workspace/$r/package.json');
for (const s of ['dependencies','devDependencies']) {
  for (const k of Object.keys(m[s]??{})) if (k.startsWith('@orkestrel/')) console.log(k)
}" 2>/dev/null
done | sort -u); do
	v=$(npm view "$pkg" version 2>/dev/null | tail -1)
	[ -n "$v" ] && LATEST["$pkg"]="$v"
done

echo "=== registry latest ==="
for k in $(echo "${!LATEST[@]}" | tr ' ' '\n' | sort); do echo "  $k ${LATEST[$k]}"; done

echo
echo "=== drift (target :: package :: declared :: latest) ==="
DRIFT=0
for d in */; do
	r=${d%/}
	[ -f "$r/package.json" ] || continue
	while IFS='|' read -r section name range; do
		[ -n "$name" ] || continue
		latest="${LATEST[$name]:-}"
		[ -n "$latest" ] || continue
		# A caret pin is current when it names the exact published version.
		if [ "$range" != "^$latest" ]; then
			echo "$r :: $name :: $range :: ^$latest ($section)"
			DRIFT=$((DRIFT + 1))
		fi
	done < <(node -e "
const m=require('/workspace/$r/package.json');
for (const s of ['dependencies','devDependencies']) {
  for (const [k,v] of Object.entries(m[s]??{})) if (k.startsWith('@orkestrel/')) console.log(s+'|'+k+'|'+v)
}" 2>/dev/null)
done
echo "=== $DRIFT drifted range(s) ==="
