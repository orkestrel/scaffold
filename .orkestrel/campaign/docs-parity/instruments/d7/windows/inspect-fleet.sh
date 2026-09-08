#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
exec > >(tee "$SCR/bootstrap/fleet-state.log.txt") 2>&1
for pkg in abort agent brief browser budget codec console contract csv database emitter form guide html indexeddb interpret lsp markdown mcp middleware msg ndjson ollama pool probe process program qualifier queue rater reason relation router sea server sqlite sse table template terminal test timeout tool toolbox websocket worker workflow workspace; do
  printf '%s ' "$pkg"
  git -C "$FLEET/$pkg" rev-parse --short HEAD
  git -C "$FLEET/$pkg" status --short
  if git -C "$FLEET/$pkg" merge-base --is-ancestor origin/main HEAD; then
    printf 'main is an ancestor\n'
  else
    printf 'main needs a merge\n'
    git -C "$FLEET/$pkg" log --oneline HEAD..origin/main
  fi
done
if rg 'FAILED|fatal:|error:' "$SCR/bootstrap/clone.log.txt"; then exit 1; fi
