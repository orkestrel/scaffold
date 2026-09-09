#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

package=${1-}
label=${2-}

fail() {
  printf '%s\n' "$1" >&2
  exit 1
}

case "$package" in
  guide)
    target="$FLEET/guide"
    exclude=()
    ;;
  scaffold)
    target="$SCAFFOLD"
    exclude=(':(exclude).orkestrel/campaign/docs-parity')
    ;;
  *)
    fail 'package must be guide or scaffold'
    ;;
esac

test -n "$label" || fail 'evidence label is required'
[[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]] || fail 'evidence label must be a safe filename segment'
out="$SCR/$label"
test ! -e "$out" || fail "evidence directory exists: $out"
mkdir -p "$out"

capture_diff() {
  local path="$1"
  git -C "$target" diff HEAD -- . "${exclude[@]}" > "$path"
}

run_gate() {
  local name="$1"
  local script="$2"
  local status=0
  timeout --kill-after=15s 1800 npm --prefix "$target" run "$script" > "$out/$name.log.txt" 2>&1 || status=$?
  printf '%s\n' "$status" > "$out/$name.exit.txt"
  printf '%s exit %s\n' "$script" "$status"
  test "$status" -eq 0
}

git -C "$target" ls-files --stage -- package.json package-lock.json > "$out/index-before.txt"
sha256sum "$target/package.json" "$target/package-lock.json" > "$out/manifests-before.sha256"
run_gate format-check format:check
run_gate lint-check lint:check
run_gate check check
run_gate build build
capture_diff "$out/before-test.diff.txt"
run_gate test test
capture_diff "$out/after-test.diff.txt"
cmp "$out/before-test.diff.txt" "$out/after-test.diff.txt"
sha256sum --check "$out/manifests-before.sha256" > "$out/manifest-preservation.log.txt"
git -C "$target" ls-files --stage -- package.json package-lock.json > "$out/index-after.txt"
cmp "$out/index-before.txt" "$out/index-after.txt"
git -C "$target" diff --check > "$out/diff-check.txt"
git -C "$target" rev-parse HEAD > "$out/head.txt"
git -C "$target" status --short > "$out/status.txt"
capture_diff "$out/diff-final.txt"
printf 'parity gate chain passed: %s\n' "$out"
