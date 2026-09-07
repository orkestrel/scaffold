#!/usr/bin/env bash
# Print selected columns of a Markdown table region: cols.sh FILE START END COL...
file="$1"; start="$2"; end="$3"; shift 3
sed -n "${start},${end}p" "$file" | sed 's/\\|/\x01/g' | awk -F'|' -v cols="$*" '
/^\|/ {
  n = split(cols, want, " ")
  out = ""
  for (i = 1; i <= n; i++) {
    c = $(want[i] + 1)
    gsub(/^[ \t]+|[ \t]+$/, "", c)
    gsub(/\x01/, "\\|", c)
    out = out (i > 1 ? " ~~ " : "") c
  }
  print NR + '"$start"' - 1 ": " out
}'
