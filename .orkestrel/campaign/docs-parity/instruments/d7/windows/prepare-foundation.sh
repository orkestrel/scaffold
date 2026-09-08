#!/usr/bin/env bash
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
set -euo pipefail

SLUG=${1-}
EXPECTED=${2-}
VERSION=${3-}
GUIDE_TARBALL=${4-}
GUIDE_HASH=${5-}
BRANCH='claude/orkestrel-npm-audit-deps-14ibta'
PILOT="$SCR/path-artifact-pilot"
HOST="$PILOT/node_modules/@orkestrel/scaffold/dist/host"

case "$SLUG" in
  codec|contract|msg|sse|test) ;;
  *) printf '%s\n' 'Expected foundation package slug.' >&2; exit 1 ;;
esac

[[ "$EXPECTED" =~ ^[0-9a-fA-F]{40}$ ]] || { printf '%s\n' 'Expected full commit SHA.' >&2; exit 1; }
[ -n "$VERSION" ] || { printf '%s\n' 'Expected package version.' >&2; exit 1; }
[ -f "$GUIDE_TARBALL" ] || { printf '%s\n' 'Missing Guide tarball.' >&2; exit 1; }
[[ "$GUIDE_HASH" =~ ^[0-9a-fA-F]{64}$ ]] || { printf '%s\n' 'Expected Guide tarball SHA-256.' >&2; exit 1; }

TARGET="$FLEET/$SLUG"
LOGS=$(mktemp -d "$SCR/d7n-foundation-$SLUG.XXXXXX")
REPAIR="$LOGS/repair"
BASE_MANIFEST="$LOGS/manifest-before.sha256"
BASE_LOCK="$LOGS/lock-before.sha256"
printf '%s\n' "$LOGS"

run() {
  local name=$1
  shift
  local status
  {
    printf '+'
    printf ' %q' "$@"
    printf '\n'
    if "$@"; then status=0; else status=$?; fi
    printf 'exit=%s\n' "$status"
  } >"$LOGS/$name.log.txt" 2>&1
  return "$status"
}

finish() {
  local status=$1
  set +e
  git -C "$TARGET" status --porcelain=v1 --untracked-files=all >"$LOGS/status-after.txt"
  git -C "$TARGET" diff --binary >"$LOGS/diff-after.txt"
  printf 'logs: %s\n' "$LOGS"
  exit "$status"
}

trap 'finish "$?"' EXIT

[ -d "$TARGET/.git" ] || { printf '%s\n' "Missing package checkout: $TARGET" >&2; exit 1; }
[ -z "$(git -C "$TARGET" status --porcelain=v1 --untracked-files=all)" ] || { printf '%s\n' 'Package checkout is dirty.' >&2; exit 1; }
[ "$(git -C "$TARGET" branch --show-current)" = "$BRANCH" ] || { printf '%s\n' 'Unexpected package branch.' >&2; exit 1; }
[ "$(git -C "$TARGET" rev-parse HEAD)" = "$EXPECTED" ] || { printf '%s\n' 'Package HEAD differs from expected SHA.' >&2; exit 1; }

run fetch git -C "$TARGET" fetch origin
git -C "$TARGET" merge-base --is-ancestor origin/main HEAD || { printf '%s\n' 'origin/main is not an ancestor of package HEAD.' >&2; exit 1; }
[ -z "$(git -C "$TARGET" status --porcelain=v1 --untracked-files=all)" ] || { printf '%s\n' 'Package checkout changed after fetch.' >&2; exit 1; }
[ "$(git -C "$TARGET" branch --show-current)" = "$BRANCH" ] || { printf '%s\n' 'Package branch changed after fetch.' >&2; exit 1; }
[ "$(git -C "$TARGET" rev-parse HEAD)" = "$EXPECTED" ] || { printf '%s\n' 'Package HEAD changed after fetch.' >&2; exit 1; }

NAME=$(node "$SCR/read-package-field.mjs" "$TARGET/package.json" name)
PACKAGE_VERSION=$(node "$SCR/read-package-field.mjs" "$TARGET/package.json" version)
[ "$NAME" = "@orkestrel/$SLUG" ] || { printf '%s\n' 'Unexpected package name.' >&2; exit 1; }
[ "$PACKAGE_VERSION" = "$VERSION" ] || { printf '%s\n' 'Unexpected package version.' >&2; exit 1; }
run view npm view "@orkestrel/$SLUG" version versions --json

printf '%s  %s\n' "$GUIDE_HASH" "$GUIDE_TARBALL" | sha256sum --check --status
printf '%s  %s\n' "60f6f1612933be6c5eb022e803e0b0fdf0d50452de8307d2688a3b832df0cf78" "$HOST/manifest.json" | sha256sum --check --status
printf '%s  %s\n' "ebe2777780193eed9d8d0641d6326535a6b5084d88aee0b6361d0b2409281ded" "$HOST/tests/setupPolicy.ts" | sha256sum --check --status
printf '%s  %s\n' "b880877803d909f83bc2ba4110d795cfecf620402696272e967bb55b90b66578" "$HOST/tests/config.test.ts" | sha256sum --check --status
sha256sum "$TARGET/package.json" >"$BASE_MANIFEST"
sha256sum "$TARGET/package-lock.json" >"$BASE_LOCK"
git -C "$TARGET" status --porcelain=v1 --untracked-files=all >"$LOGS/status-before.txt"
git -C "$TARGET" diff --binary >"$LOGS/diff-before.txt"

cd "$TARGET"
run repair node "$PILOT/foundation.mjs" "$SLUG" "$REPAIR"
run guide-install npm install --no-save --ignore-scripts --package-lock=false "$GUIDE_TARBALL"
sha256sum --check "$BASE_MANIFEST"
sha256sum --check "$BASE_LOCK"
GUIDE_NAME=$(node "$SCR/read-package-field.mjs" "$TARGET/node_modules/@orkestrel/guide/package.json" name)
GUIDE_VERSION=$(node "$SCR/read-package-field.mjs" "$TARGET/node_modules/@orkestrel/guide/package.json" version)
[ "$GUIDE_NAME" = '@orkestrel/guide' ] || { printf '%s\n' 'Unexpected installed Guide name.' >&2; exit 1; }
[ "$GUIDE_VERSION" = '0.0.18' ] || { printf '%s\n' 'Unexpected installed Guide version.' >&2; exit 1; }
sha256sum "$TARGET/node_modules/@orkestrel/guide/dist/src/core/index.js" >"$LOGS/guide-dist.sha256"

run prepublish npm run prepublishOnly
run docs npm run docs
PACKED=$(mktemp -d "$SCR/packed/d7n-foundation-$SLUG.XXXXXX")
EXTRACTED=$(mktemp -d "$PACKED/extract.XXXXXX")
TARBALL="$PACKED/orkestrel-$SLUG-$VERSION.tgz"
run pack npm pack --ignore-scripts --pack-destination "$PACKED"
[ -f "$TARBALL" ] || { printf '%s\n' 'Expected package tarball is missing.' >&2; exit 1; }
sha256sum "$TARBALL" >"$LOGS/artifact.sha256"
tar -tf "$TARBALL" >"$LOGS/artifact-members.txt"
run extract tar -xzf "$TARBALL" -C "$EXTRACTED"
cmp "$EXTRACTED/package/package.json" "$TARGET/package.json"
diff -qr "$EXTRACTED/package/dist" "$TARGET/dist" >"$LOGS/dist-diff.txt"
{
  printf 'commit: %s\n' "$(git -C "$TARGET" rev-parse HEAD)"
  printf 'version: %s\n' "$VERSION"
  printf 'artifact: %s\n' "$TARBALL"
  cat "$LOGS/artifact.sha256"
} >"$LOGS/metadata.txt"
sha256sum --check "$BASE_MANIFEST"
sha256sum --check "$BASE_LOCK"
[ "$(git -C "$TARGET" rev-parse HEAD)" = "$EXPECTED" ] || { printf '%s\n' 'Package HEAD changed during visit.' >&2; exit 1; }
[ "$(git -C "$TARGET" branch --show-current)" = "$BRANCH" ] || { printf '%s\n' 'Package branch changed during visit.' >&2; exit 1; }
