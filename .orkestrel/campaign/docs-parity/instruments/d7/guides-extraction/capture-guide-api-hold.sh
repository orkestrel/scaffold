#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

guide="$FLEET/guide"
out="$SCR/d7n-guide-api-hold"

fail() {
  printf '%s\n' "$1" >&2
  exit 1
}

allowed_changed() {
  case "$1" in
    guides/guide.md|src/core/Parity.ts|src/core/constants.ts|src/core/factories.ts|src/core/helpers.ts|src/core/index.ts|src/core/shapers.ts|src/core/types.ts|src/core/validators.ts|tests/guides.test.ts|tests/setup.ts|tests/src/core/Parity.test.ts|tests/src/core/factories.test.ts|tests/src/core/helpers.test.ts|tests/src/core/shapers.test.ts|tests/src/core/validators.test.ts|tsconfig.json|vite.config.ts)
      return 0
      ;;
    *)
      return 1
      ;;
  esac
}

validate_changed() {
  local inventory=$1
  local path
  while IFS= read -r -d '' path; do
    allowed_changed "$path" || fail "Changed path is outside the admitted population: $path"
  done < "$inventory"
}

capture_state() {
  local suffix=$1
  git -C "$guide" diff --name-only -z HEAD > "$out/changed-$suffix.bin"
  validate_changed "$out/changed-$suffix.bin"
  git -C "$guide" rev-parse HEAD > "$out/head-$suffix.txt"
  git -C "$guide" branch --show-current > "$out/branch-$suffix.txt"
  git -C "$guide" diff HEAD > "$out/diff-$suffix.txt"
  git -C "$guide" status --short --untracked-files=all > "$out/status-$suffix.txt"
  git -C "$guide" ls-files --others --exclude-standard > "$out/untracked-$suffix.txt"
}

copy_source() {
  local path=$1
  local destination="$out/source/$path"
  test -f "$guide/$path" || fail "Missing draft source: $path"
  mkdir -p "$(dirname "$destination")"
  cp "$guide/$path" "$destination"
  sha256sum "$destination" "$guide/$path" >> "$out/source.sha256"
  cmp "$destination" "$guide/$path"
}

test -d "$guide/.git" || fail "Missing Guide checkout: $guide"
test ! -e "$out" || fail "Evidence directory exists: $out"
mkdir "$out"

capture_state before

for path in \
  src/server/types.ts \
  src/server/index.ts \
  src/server/helpers.ts \
  src/server/parsers.ts \
  src/server/GuideCommand.ts \
  tests/setupServer.ts \
  tests/src/server/GuideCommand.test.ts \
  package.json \
  guides/README.md; do
  copy_source "$path"
done

capture_state after
cmp "$out/diff-before.txt" "$out/diff-after.txt"
cmp "$out/status-before.txt" "$out/status-after.txt"
cmp "$out/untracked-before.txt" "$out/untracked-after.txt"
