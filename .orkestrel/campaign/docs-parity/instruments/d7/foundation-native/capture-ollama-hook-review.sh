#!/usr/bin/env bash
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
out="$SCR/d7n-ollama-hook-ready-review-input"
test ! -e "$out"
mkdir "$out"
for package in scaffold ollama; do
  target="$FLEET/$package"
  git -C "$target" rev-parse HEAD > "$out/$package-head.txt"
  git -C "$target" branch --show-current > "$out/$package-branch.txt"
  git -C "$target" status --porcelain=v1 --untracked-files=all > "$out/$package-status.txt"
  git -C "$target" diff HEAD --binary -- . ':(exclude).orkestrel/campaign/docs-parity' > "$out/$package-diff.patch"
  git -C "$target" merge-base --is-ancestor origin/main HEAD
done
sha256sum "$SCR/commit-scaffold-hook-release.sh" > "$out/carrier.sha256"
status=0
diff -u "$SCR/commit-scaffold-upper-release-final.sh" "$SCR/commit-scaffold-hook-release.sh" > "$out/carrier.patch" || status=$?
test "$status" -le 1
bash -n "$SCR/commit-scaffold-hook-release.sh"
printf '0\n' > "$out/capture.exit.txt"
