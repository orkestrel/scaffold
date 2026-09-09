#!/usr/bin/env bash
# Successor after the root artifact-membership correction; logs to guides-test-file-gates-verified.
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
out="$SCR/guides-test-file-gates-verified"
test ! -e "$out"
mkdir -p "$out"
cd "$SCAFFOLD"

run_gate() {
  local name="$1"
  local script="$2"
  local status=0
  timeout --kill-after=15s 1800 npm run "$script" > "$out/$name.log.txt" 2>&1 || status=$?
  printf '%s\n' "$status" > "$out/$name.exit.txt"
  printf '%s exit %s\n' "$script" "$status"
  test "$status" -eq 0
}

git -C "$SCAFFOLD" ls-files --stage -- package.json package-lock.json > "$out/index-before.txt"
sha256sum package.json package-lock.json > "$out/manifests-before.sha256"
run_gate format-check format:check
run_gate lint-check lint:check
run_gate check check
run_gate build build
git -C "$SCAFFOLD" diff HEAD -- . ':(exclude).orkestrel/campaign/docs-parity' > "$out/before-test.diff.txt"
run_gate test test
git -C "$SCAFFOLD" diff HEAD -- . ':(exclude).orkestrel/campaign/docs-parity' > "$out/after-test.diff.txt"
cmp "$out/before-test.diff.txt" "$out/after-test.diff.txt"
sha256sum --check "$out/manifests-before.sha256" > "$out/manifest-preservation.log.txt"
git -C "$SCAFFOLD" ls-files --stage -- package.json package-lock.json > "$out/index-after.txt"
cmp "$out/index-before.txt" "$out/index-after.txt"
git -C "$SCAFFOLD" diff --check
git -C "$SCAFFOLD" rev-parse HEAD > "$out/head.txt"
git -C "$SCAFFOLD" status --short > "$out/status.txt"
printf 'direct gate chain and default-test preservation passed\n'
