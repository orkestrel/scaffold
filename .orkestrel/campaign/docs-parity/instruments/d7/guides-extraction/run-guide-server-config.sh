#!/usr/bin/env bash
set -uo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

label=${1-}
mode=${2-}
target="$FLEET/guide"
output="$SCR/$label"

fail() {
  printf '%s\n' "$*" >&2
  exit 1
}

capture() {
  local suffix=$1
  git -C "$target" rev-parse HEAD >"$output/head-$suffix.txt" || return $?
  git -C "$target" status --porcelain=v1 --untracked-files=all >"$output/status-$suffix.txt" || return $?
  git -C "$target" diff --binary >"$output/diff-$suffix.txt" || return $?
  git -C "$target" diff --cached --binary >"$output/diff-cached-$suffix.txt" || return $?
  git -C "$target" diff --cached --name-status >"$output/staged-$suffix.txt" || return $?
  git -C "$target" ls-files -s >"$output/index-$suffix.txt" || return $?
  sha256sum "$target/package.json" "$target/package-lock.json" >"$output/metadata-$suffix.sha256" || return $?
}

case "$label" in
  ''|*[!A-Za-z0-9._-]*) fail 'Evidence label must use letters, digits, dot, underscore, or hyphen.' ;;
esac

case "$mode" in
  preview|apply) ;;
  *) fail 'Mode must be preview or apply.' ;;
esac

[ -d "$target/.git" ] || fail "Missing Guide checkout: $target"
[ ! -e "$output" ] || fail "Evidence output exists: $output"
mkdir "$output" || fail "Cannot create evidence output: $output"

capture before || fail 'Cannot capture Guide state before the carrier run.'

set +e
timeout 120s node "$SCR/guide-server-config.mjs" "$target" "$output" "$mode" >"$output/instrument.log.txt" 2>&1
instrument=$?
set -e
printf '%s\n' "$instrument" >"$output/instrument.exit.txt"

after=0
capture after || after=$?
if [ "$after" -ne 0 ]; then
  printf '%s\n' "$after" >"$output/after.exit.txt"
  exit "$after"
fi

if [ "$instrument" -eq 0 ]; then
  cmp -s "$output/metadata-before.sha256" "$output/metadata-after.sha256" || fail 'Guide package metadata changed.'
  cmp -s "$output/index-before.txt" "$output/index-after.txt" || fail 'Guide index changed.'
  cmp -s "$output/staged-before.txt" "$output/staged-after.txt" || fail 'Guide staged entries changed.'
fi

exit "$instrument"
