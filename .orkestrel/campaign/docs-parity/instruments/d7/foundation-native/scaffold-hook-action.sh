#!/usr/bin/env bash
# Successor to scaffold-service-action.sh: hook-specific proof and inventory selectors.
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
action=${1-}
label=${2-}
cap=${3-}
target="$SCAFFOLD"
out="$SCR/$label"
case "$action" in
  regression) command=(node node_modules/vitest/vitest.mjs run --config vite.config.ts --no-cache --reporter=verbose --project src:server tests/src/server/helpers.test.ts -t 'Ollama setup');;
  syntax) command=(bash -n scripts/ollama.sh);;
  inventory) command=(npm run build:inventory);;
  check) command=(npm run check);;
  guides) command=(npm run test:guides);;
  format) command=(npm run format);;
  lint) command=(npm run lint);;
  prepublish) command=(npm run prepublishOnly);;
  live) command=(bash scripts/ollama.sh);;
  *) printf '%s\n' 'Unknown hook action' >&2; exit 1;;
esac
[[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]]
[[ "$cap" =~ ^[1-9][0-9]*s$ ]]
test ! -e "$out"
mkdir "$out"
capture() {
  local suffix="$1"
  git -C "$target" rev-parse HEAD > "$out/head-$suffix.txt"
  git -C "$target" branch --show-current > "$out/branch-$suffix.txt"
  git -C "$target" status --porcelain=v1 --untracked-files=all > "$out/status-$suffix.txt"
  git -C "$target" diff HEAD --binary > "$out/diff-$suffix.txt"
  git -C "$target" ls-files --stage > "$out/index-$suffix.txt"
  sha256sum "$target/package.json" "$target/package-lock.json" > "$out/manifests-$suffix.sha256"
}
capture before
printf '%q ' "${command[@]}" > "$out/command.txt"
printf '\n' >> "$out/command.txt"
status=0
if (cd "$target" && timeout --kill-after=15s "$cap" "${command[@]}") > "$out/action.stdout.txt" 2> "$out/action.stderr.txt"; then status=0; else status=$?; fi
printf '%s\n' "$status" > "$out/action.exit.txt"
capture after
printf '%s %s %s\n' "$out" "$action" "$status"
exit "$status"
