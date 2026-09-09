#!/usr/bin/env bash
set -uo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

pack_label=${1-}
evidence_label=${2-}
guide="$FLEET/guide"
pack="$SCR/packed/$pack_label"
output="$SCR/$evidence_label"

fail() {
  printf '%s\n' "$*" >&2
  exit 1
}

capture() {
  local suffix=$1
  sha256sum "$guide/package.json" "$guide/package-lock.json" >"$output/guide-metadata-$suffix.sha256" || return $?
  git -C "$guide" ls-files -s >"$output/guide-index-$suffix.txt" || return $?
  sha256sum "$SCAFFOLD/package.json" "$SCAFFOLD/package-lock.json" >"$output/scaffold-metadata-$suffix.sha256" || return $?
  git -C "$SCAFFOLD" ls-files -s >"$output/scaffold-index-$suffix.txt" || return $?
}

case "$pack_label" in
  ''|*[!A-Za-z0-9._-]*) fail 'Pack label must use letters, digits, dot, underscore, or hyphen.' ;;
esac

case "$evidence_label" in
  ''|*[!A-Za-z0-9._-]*) fail 'Evidence label must use letters, digits, dot, underscore, or hyphen.' ;;
esac

[ -d "$guide/.git" ] || fail "Missing Guide checkout: $guide"
[ -d "$pack" ] || fail "Missing pack evidence: $pack"
[ ! -e "$output" ] || fail "Evidence output exists: $output"
mkdir "$output" || fail "Cannot create evidence output: $output"

capture before || fail 'Cannot capture state before the artifact comparison.'

set +e
timeout 120s node "$SCR/verify-guide-server-artifact.mjs" "$pack" "$output" >"$output/instrument.log.txt" 2>&1
instrument=$?
set -e
printf '%s\n' "$instrument" >"$output/instrument.exit.txt"

capture after || fail 'Cannot capture state after the artifact comparison.'
cmp -s "$output/guide-metadata-before.sha256" "$output/guide-metadata-after.sha256" || fail 'Guide metadata changed.'
cmp -s "$output/guide-index-before.txt" "$output/guide-index-after.txt" || fail 'Guide index changed.'
cmp -s "$output/scaffold-metadata-before.sha256" "$output/scaffold-metadata-after.sha256" || fail 'Scaffold metadata changed.'
cmp -s "$output/scaffold-index-before.txt" "$output/scaffold-index-after.txt" || fail 'Scaffold index changed.'

exit "$instrument"
