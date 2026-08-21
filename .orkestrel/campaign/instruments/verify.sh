#!/usr/bin/env bash
# Verify a lane report covers every (repo,name) pair its brief's files declare.
lane="$1"
exp=/tmp/${lane}.exp; got=/tmp/${lane}.got
: > "$exp"
while read -r p; do
  repo="${p%%/*}"
  awk -v r="$repo" '/^export (async )?(function|const|interface|type|class|abstract class) [A-Za-z0-9_]+/{ \
    l=$0; sub(/^export +/,"",l); sub(/^async +/,"",l); sub(/^[a-z]+ +/,"",l); \
    split(l,b,/[ (<:={]/); print r"\t"b[1] }' "/home/user/$p" >> "$exp"
done < <(grep '^- /home' briefs/${lane}-brief.md | sed 's|^- /home/user/||')
sort -u "$exp" -o "$exp"
awk -F' \\| ' '/^[a-z0-9-]+ \| /{gsub(/^[ \t]+|[ \t]+$/,"",$1); gsub(/^[ \t]+|[ \t]+$/,"",$3); print $1"\t"$3}' reports/${lane}.md | sort -u > "$got"
miss=$(comm -23 "$exp" "$got" | wc -l)
extra=$(comm -13 "$exp" "$got" | wc -l)
printf "%s expected=%s reported=%s missing=%s extra=%s\n" "$lane" "$(wc -l < "$exp")" "$(wc -l < "$got")" "$miss" "$extra"
[ "$miss" -gt 0 ] && { echo "  MISSING:"; comm -23 "$exp" "$got" | head -20 | sed 's/^/    /'; }
[ "$extra" -gt 0 ] && { echo "  EXTRA:"; comm -13 "$exp" "$got" | head -10 | sed 's/^/    /'; }
exit 0
