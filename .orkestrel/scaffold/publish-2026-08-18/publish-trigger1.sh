#!/usr/bin/env bash
# Bump trigger 1: does the REBUILT published artifact differ MATERIALLY from the
# PUBLISHED tarball?
#
# The law fixes the method: prove the direction with the build, not the diff of sources.
# A toolchain that re-emits declarations moves the artifact with no source edit, so every
# writer can correctly report an unmoved surface while the published contract has changed.
#
# Both sides are `npm pack` tarballs, so the package's own `files` rule filters both
# identically and a repo-only build output cannot read as a difference.
#
# Material = tokens, declarations, logic. Excluded: sourcemaps (*.map) and whitespace-only
# differences. A superfluous diff moves nothing and obliges nothing.
#
# Instrument controls (run separately, recorded): identical published tarballs report
# material=0; two different packages report material=4. It detects what it claims to.
set -u
WORK=/home/user/scaffold/tmp/trigger1
OUT=$WORK/results.txt
mkdir -p "$WORK"

normalize() {
	sed -e 's|//# sourceMappingURL=.*||' "$1" | tr -s '[:space:]' ' ' | sed -e 's/^ //' -e 's/ $//'
}

visit() {
	repo_name="$1"
	dir="/workspace/$repo_name"
	detail="$WORK/$repo_name.detail"
	: > "$detail"
	[ -f "$dir/package.json" ] || { echo "RESULT $repo_name NOPKG" >> "$OUT"; return; }
	name=$(node -p "require('$dir/package.json').name" 2>/dev/null)
	ver=$(node -p "require('$dir/package.json').version" 2>/dev/null)
	priv=$(node -p "String(require('$dir/package.json').private === true)" 2>/dev/null)
	[ "$priv" = "true" ] && { echo "RESULT $repo_name PRIVATE" >> "$OUT"; return; }

	pubdir="$WORK/$repo_name/pub"
	locdir="$WORK/$repo_name/loc"
	rm -rf "$WORK/$repo_name"; mkdir -p "$pubdir" "$locdir"

	if ! ( cd "$pubdir" && npm pack "$name@$ver" --silent >/dev/null 2>pack.err ); then
		echo "RESULT $repo_name PACK_PUBLISHED_FAIL" >> "$OUT"; return
	fi
	ptar=$(ls "$pubdir"/*.tgz 2>/dev/null | head -1)
	[ -n "$ptar" ] || { echo "RESULT $repo_name NO_PUBLISHED_TARBALL" >> "$OUT"; return; }
	( cd "$pubdir" && tar xzf "$ptar" ) || { echo "RESULT $repo_name UNTAR_PUB_FAIL" >> "$OUT"; return; }

	if ! ( cd "$dir" && npm run build > "$WORK/$repo_name.build.log" 2>&1 ); then
		echo "RESULT $repo_name BUILD_FAIL" >> "$OUT"; return
	fi
	if ! ( cd "$dir" && npm pack --pack-destination "$locdir" --silent >/dev/null 2>"$locdir/pack.err" ); then
		echo "RESULT $repo_name PACK_LOCAL_FAIL" >> "$OUT"; return
	fi
	ltar=$(ls "$locdir"/*.tgz 2>/dev/null | head -1)
	[ -n "$ltar" ] || { echo "RESULT $repo_name NO_LOCAL_TARBALL" >> "$OUT"; return; }
	( cd "$locdir" && tar xzf "$ltar" ) || { echo "RESULT $repo_name UNTAR_LOC_FAIL" >> "$OUT"; return; }

	pub="$pubdir/package"; loc="$locdir/package"
	material=0; only_pub=0; only_loc=0
	while read -r f; do
		[ -n "$f" ] || continue
		if [ ! -f "$loc/$f" ]; then only_pub=$((only_pub + 1)); echo "  ONLY_PUBLISHED $f" >> "$detail"; continue; fi
		if ! diff -q <(normalize "$pub/$f") <(normalize "$loc/$f") > /dev/null 2>&1; then
			material=$((material + 1)); echo "  MATERIAL $f" >> "$detail"
		fi
	done < <(cd "$pub" && find . -type f ! -name '*.map' | sed 's|^\./||' | sort)
	while read -r f; do
		[ -n "$f" ] || continue
		[ -f "$pub/$f" ] || { only_loc=$((only_loc + 1)); echo "  ONLY_REBUILT $f" >> "$detail"; }
	done < <(cd "$loc" && find . -type f ! -name '*.map' | sed 's|^\./||' | sort)

	if [ "$material" -eq 0 ] && [ "$only_pub" -eq 0 ] && [ "$only_loc" -eq 0 ]; then
		echo "RESULT $repo_name UNMOVED" >> "$OUT"
	else
		echo "RESULT $repo_name MOVED material=$material only_published=$only_pub only_rebuilt=$only_loc" >> "$OUT"
	fi
}

slice=0
for r in "$@"; do
	visit "$r" &
	slice=$((slice + 1))
	if [ "$slice" -ge 4 ]; then wait; slice=0; fi
done
wait
