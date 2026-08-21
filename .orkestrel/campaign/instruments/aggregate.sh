#!/usr/bin/env bash
# Fold every landed lane report into one row table + derived piles.
cd /home/user/scaffold/tmp/fleet
: > rows.tsv
for l in A1 A2 A3 A4 B1 B2 C1 C2 D1; do
  [ -s "reports/$l.md" ] || continue
  awk -F' \\| ' -v lane="$l" '/^[a-z0-9-]+ \| /{
    for(i=1;i<=NF;i++){gsub(/^[ \t]+|[ \t]+$/,"",$i)}
    if(NF>=9) print lane"\t"$1"\t"$2"\t"$3"\t"$4"\t"$5"\t"$6"\t"$7"\t"$8"\t"$9
  }' "reports/$l.md" >> rows.tsv
done
echo "rows: $(wc -l < rows.tsv)"
# columns: 1 lane 2 repo 3 file:line 4 name 5 kind 6 signature 7 behavior 8 host 9 general 10 duplicate
echo "--- general/specific split ---"; cut -f9 rows.tsv | sort | uniq -c
echo "--- host split ---"; cut -f8 rows.tsv | sort | uniq -c
echo "--- duplicate flags ---"; awk -F'\t' '{print ($10 ~ /^exists:/) ? "exists-upstream" : "none"}' rows.tsv | sort | uniq -c
