#!/bin/bash
# dist-compare.sh — wave.md § Visit a repository step 9 and orchestration § What a bump obliges:
# fetch the target's published tarball and compare the rebuilt dist/ against it for material
# content only (maps excluded, whitespace ignored). A material diff means a bump is owed.
set -u
t="$1"; v="$2"
W=/tmp/claude-0/-home-user/488431e0-a918-55f9-9e40-378c151c8130/scratchpad/distcmp-$t
rm -rf "$W"; mkdir -p "$W/pub"; cd "$W/pub" || exit 1
npm pack "@orkestrel/$t@$v" --silent >/dev/null 2>&1 || { echo "FETCH FAILED for @orkestrel/$t@$v"; exit 1; }
tar xzf "$(ls *.tgz | head -1)"
echo "### @orkestrel/$t@$v published dist vs /home/user/$t/dist (maps excluded, whitespace ignored)"
( cd package/dist && find . -type f ! -name '*.map' | sort ) > "$W/published-paths.txt"
( cd "/home/user/$t/dist" && find . -type f ! -name '*.map' | sort ) > "$W/local-paths.txt"
echo "--- paths only in published ---"; comm -23 "$W/published-paths.txt" "$W/local-paths.txt"
echo "--- paths only in local ---";     comm -13 "$W/published-paths.txt" "$W/local-paths.txt"
diff -rq -x '*.map' -w -B "$W/pub/package/dist" "/home/user/$t/dist" > "$W/material.diff" 2>&1
echo "material differing entries: $(wc -l < "$W/material.diff")"
cat "$W/material.diff" | head -20
echo "DIST-COMPARE-DONE $t"
