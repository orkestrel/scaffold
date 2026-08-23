#!/usr/bin/env bash
# One propagation visit: drive the UNPUBLISHED scaffold's packed artifact against one
# real target, converge its generated writes, and run its own gates. Reports per stage
# so a failure surfaces where it happened rather than at the end.
#
# Usage: visit.sh <target-dir> <runner-dir> [--with-distribution]
set -uo pipefail
TARGET="$1"; RUNNER="$2"; WITH_DIST="${3:-}"
CLI="$RUNNER/node_modules/@orkestrel/scaffold/dist/bin/main.js"
NAME="$(basename "$TARGET")"
say() { printf '%s | %-14s | %s\n' "$NAME" "$1" "$2"; }
step() { # step <label> <command...>
  local label="$1"; shift
  local out; out="$("$@" 2>&1)"; local code=$?
  if [ $code -eq 0 ]; then say "$label" "exit 0"
  else
    say "$label" "exit $code"
    printf '%s\n' "$out" | tail -25 | sed "s/^/    $NAME > /"
  fi
  return $code
}

cd "$TARGET" || { say setup "cannot enter $TARGET"; exit 1; }
say start "scaffold range before: $(node -p "require('./package.json').devDependencies['@orkestrel/scaffold']" 2>/dev/null)"

step install-pre npm install --no-audit --no-fund || exit 1
# overwrite refuses a dirty tree because git is its rollback mechanism, and npm install
# prunes the lockfile. Check the pre-write state in so the verb has a clean baseline and a
# revert point, which is what a real release visit does before any writing step.
if [ -n "$(git status --porcelain)" ]; then
  git add -A >/dev/null 2>&1
  git -c user.email=campaign@local -c user.name=campaign commit -q -m "checkpoint before scaffold overwrite" >/dev/null 2>&1
  say checkpoint "committed pre-write state"
fi
step overwrite node "$CLI" overwrite --target "$TARGET" || say overwrite "NON-ZERO — continuing to read the tree it left"
say wrote "$(git status --porcelain | wc -l) path(s) changed by overwrite"
step install-post npm install --no-audit --no-fund
step format npm run format
step format-check npm run format:check
step lint npm run lint:check
step check npm run check
step build npm run build
step test npm test
if [ "$WITH_DIST" = "--with-distribution" ]; then
  if node -p "require('./package.json').scripts['test:distribution']?1:0" 2>/dev/null | grep -q 1; then
    step distribution npm run test:distribution
  else
    say distribution "no test:distribution script declared"
  fi
fi
say done "scaffold range after: $(node -p "require('./package.json').devDependencies['@orkestrel/scaffold']" 2>/dev/null)"
