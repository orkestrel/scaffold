#!/bin/bash
# Post-publish visit for one target, in wave.md's order, run ONLY after the
# registry serves scaffold 0.0.65. Writes into the REAL checkout. The
# Orchestrator commits at the two points wave.md names; the script stops before
# each commit and prints what it would stage.
#   1 re-pin every @orkestrel range to the registry caret and install
#   2 [Orchestrator commits the preparation commit]
#   3 scaffold overwrite (online: repair + catalog mirror refresh + declare)
#   4 scaffold audit -> exit 0
#   5 full install (overwrite re-declared ranges; lockfile must follow)
#   6 mutating format to converge generated writes
#   7 quality gates, every project singly
#   8 [Orchestrator commits the visit]
set -u
t="$1"; stage="$2"   # stage: prep | visit
cd "/home/user/$t" || exit 1
S="/tmp/claude-0/-home-user/488431e0-a918-55f9-9e40-378c151c8130/scratchpad/logs/visit-$t-$stage.status.txt"; : > "$S"
g() { local l="$1"; shift; echo ""; echo "##### $t $l #####"; timeout 1800 "$@"; local c=$?; printf '%s\texit=%s\n' "$l" "$c" >> "$S"; echo "##### $t $l exit=$c #####"; }
echo "registry scaffold: $(npm view @orkestrel/scaffold version)"
if [ "$stage" = "prep" ]; then
  g "re-pin" npm install --save-dev --no-audit --no-fund "@orkestrel/scaffold@^0.0.65"
  node -p "'pinned: '+require('./package.json').devDependencies['@orkestrel/scaffold']"
  echo ""; echo "PREP-DONE $t — commit package.json and package-lock.json as the preparation commit, then run stage visit"
  git status --porcelain
  exit 0
fi
g "overwrite" npm run scaffold -- overwrite
g "audit"     npm run scaffold -- audit
g "install"   npm install --no-audit --no-fund
g "format"    npm run format
g "format:check" npm run format:check
g "lint:check" npm run lint:check
g "check"     npm run check
g "build"     npm run build
for p in $(node -p "Object.keys(require('./package.json').scripts).filter(k=>/^test:(src|setup|policy|config|guides|conformance)/.test(k)).join(' ')"); do g "$p" npm run "$p"; done
g "distribution(release)" npm run test:distribution -- --mode release
echo ""; echo "VISIT-DONE $t"; cat "$S"; echo "--- tree ---"; git status --porcelain | head -30
