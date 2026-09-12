#!/usr/bin/env bash
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
target="$FLEET/ollama"
out="$SCR/d7n-ollama-hook-candidate-landing"
gate="$SCR/d7n-ollama-hook-tarball-prepublish"
test ! -e "$out"
mkdir "$out"
run() {
  local name="$1"
  shift
  local status=0
  if timeout --kill-after=15s 120s git -C "$target" "$@" > "$out/$name.stdout.txt" 2> "$out/$name.stderr.txt"; then status=0; else status=$?; fi
  printf '%s\n' "$status" > "$out/$name.exit.txt"
  return "$status"
}
test "$(<"$gate/action.exit.txt")" = 0
run branch branch --show-current
test "$(<"$out/branch.stdout.txt")" = claude/orkestrel-npm-audit-deps-14ibta
run head rev-parse HEAD
test "$(<"$out/head.stdout.txt")" = 653b186bf8ffa3a67db926afd557adad436f0c61
run staged diff --cached --quiet
run untracked ls-files --others --exclude-standard
test ! -s "$out/untracked.stdout.txt"
run diff diff HEAD --binary
cmp "$gate/diff-after.txt" "$out/diff.stdout.txt"
run changed diff --name-only
while IFS= read -r path; do
  case "$path" in .claude/settings.json|package.json|scripts/docs.ts|scripts/ollama.sh|scripts/service.sh|vite.config.ts) ;; *) printf 'Unexpected path: %s\n' "$path" >&2; exit 1;; esac
done < "$out/changed.stdout.txt"
run fetch fetch origin
run ancestry merge-base --is-ancestor origin/main HEAD
run add add -- .claude/settings.json package.json scripts/docs.ts scripts/ollama.sh scripts/service.sh vite.config.ts
run commit -c user.name=Claude -c user.email=noreply@anthropic.com commit -m 'Apply shared Ollama setup for cloud and CI' -m 'Keep registry-resolvable tooling pins while the Scaffold tarball receives downstream proof.' -m 'Co-Authored-By: Claude <noreply@anthropic.com>' -m 'Claude-Session: codex:01a0810d-21bf-7f60-8534-488348e05743'
run landed rev-parse HEAD
run status status --porcelain=v1 --untracked-files=all
test ! -s "$out/status.stdout.txt"
run push push -u origin claude/orkestrel-npm-audit-deps-14ibta
run remote ls-remote origin refs/heads/claude/orkestrel-npm-audit-deps-14ibta
head=$(<"$out/landed.stdout.txt")
awk -v head="$head" '$1 == head { found = 1 } END { exit found ? 0 : 1 }' "$out/remote.stdout.txt"
printf 'CANDIDATE: %s\n' "$head"
