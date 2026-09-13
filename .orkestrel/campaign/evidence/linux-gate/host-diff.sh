#!/bin/bash
# Did scaffold's vendored dist/host surface move between published 0.0.64 and
# the local 0.0.65 build? The contract bumps scaffold on any vendored byte change,
# and obliges each target to re-run `repair` and re-prove its gates after such a release.
set -u
W=/tmp/claude-0/-home-user/488431e0-a918-55f9-9e40-378c151c8130/scratchpad/hostdiff
rm -rf "$W"; mkdir -p "$W/pub"
cd "$W/pub" || exit 1
echo "### fetch published 0.0.64"
npm pack @orkestrel/scaffold@0.0.64 --silent >/dev/null 2>&1 || { echo "FETCH FAILED"; exit 1; }
TGZ=$(ls *.tgz | head -1); echo "fetched=$TGZ"
tar xzf "$TGZ"
echo "### path-set comparison"
( cd package/dist/host && find . -type f | sort ) > "$W/published-paths.txt"
( cd /home/user/scaffold/dist/host && find . -type f | sort ) > "$W/local-paths.txt"
echo "published host files: $(wc -l < "$W/published-paths.txt")"
echo "local host files:     $(wc -l < "$W/local-paths.txt")"
echo "--- paths only in published (removed) ---"; comm -23 "$W/published-paths.txt" "$W/local-paths.txt" | head -20
echo "--- paths only in local (added) ---";      comm -13 "$W/published-paths.txt" "$W/local-paths.txt" | head -20
echo "### content comparison of shared paths"
diff -rq "$W/pub/package/dist/host" /home/user/scaffold/dist/host > "$W/host-content.diff" 2>&1
echo "differing-or-unique entries: $(wc -l < "$W/host-content.diff")"
head -25 "$W/host-content.diff"
echo "### dist/src material comparison (excluding maps)"
diff -rq -x '*.map' "$W/pub/package/dist/src" /home/user/scaffold/dist/src > "$W/src.diff" 2>&1
echo "dist/src differing entries: $(wc -l < "$W/src.diff")"
head -15 "$W/src.diff"
echo "HOST-DIFF-DONE"
