#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
out="$SCR/campaign-branches"
mkdir -p "$out"
expected=claude/orkestrel-npm-audit-deps-14ibta
printf 'package\tbranch\thead\tlocal-main\tcached-origin-main\tbranch-check\n' > "$out/branches.tsv"
for package in scaffold abort agent brief browser budget codec console contract csv database emitter form guide html indexeddb interpret lsp markdown mcp middleware msg ndjson ollama pool probe process program qualifier queue rater reason relation router sea server sqlite sse table template terminal test timeout tool toolbox websocket worker workflow workspace; do
  target="$FLEET/$package"
  if test ! -d "$target/.git"; then
    printf '%s\tmissing checkout\n' "$package" >> "$out/branches.tsv"
    printf '%s: missing checkout\n' "$package"
    continue
  fi
  branch=$(git -C "$target" branch --show-current)
  head=$(git -C "$target" rev-parse --short HEAD)
  localmain=$(git -C "$target" rev-parse --verify --short refs/heads/main 2>/dev/null || true)
  originmain=$(git -C "$target" rev-parse --verify --short refs/remotes/origin/main 2>/dev/null || true)
  result=expected
  if test "$branch" != "$expected"; then result=mismatch; fi
  printf '%s\t%s\t%s\t%s\t%s\t%s\n' "$package" "$branch" "$head" "$localmain" "$originmain" "$result" >> "$out/branches.tsv"
  printf '%s: %s at %s (%s)\n' "$package" "$branch" "$head" "$result"
done
printf 'Read-only branch audit: %s/branches.tsv\n' "$out"
