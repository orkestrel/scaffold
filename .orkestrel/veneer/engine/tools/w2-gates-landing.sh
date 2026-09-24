#!/usr/bin/env bash
# The Orchestrator's own gate run over one W2 unit's worktree after its writer returns, for the audit
# briefs' "Already established": the scoped typecheck, lint, format, the browser suite, guide parity,
# policy, the three builds then conformance and the setup proof, the review evidence (`git diff HEAD`
# with new files intent-to-add, the status), and the tree-wide typecheck as an observation. Derived
# from collapse-gates-4.sh. Usage: bash w2-gates.sh <unit> [round]
set -u
UNIT="$1"
ROUND="${2:-1}"
S="$(dirname "$0")"
LOG="$S/w2-gates-$UNIT-$ROUND.log"
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/$UNIT
SUFFIX=""; [ "$ROUND" != "1" ] && SUFFIX="-$ROUND"
: > "$LOG"
cd "$TREE" || exit 1
echo "# J-${UNIT^^} round $ROUND — the Orchestrator's own gate run (2026-09-24)" >> "$LOG"
git log --oneline -1 >> "$LOG" 2>&1
git status --short >> "$LOG" 2>&1
npm run check:src:browser >> "$LOG" 2>&1; echo "check:src:browser exit=$?" >> "$LOG"
npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser >> "$LOG" 2>&1; echo "oxlint exit=$?" >> "$LOG"
npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md >> "$LOG" 2>&1; echo "oxfmt exit=$?" >> "$LOG"
npm run test:src:browser >> "$LOG" 2>&1; echo "test:src:browser exit=$?" >> "$LOG"
npm run test:guides >> "$LOG" 2>&1; echo "test:guides exit=$?" >> "$LOG"
npm run test:policy >> "$LOG" 2>&1; echo "test:policy exit=$?" >> "$LOG"
npm run build:src:core >> "$LOG" 2>&1; echo "build:src:core exit=$?" >> "$LOG"
npm run build:src:styles >> "$LOG" 2>&1; echo "build:src:styles exit=$?" >> "$LOG"
npm run build:src:browser >> "$LOG" 2>&1; echo "build:src:browser exit=$?" >> "$LOG"
npm run test:conformance >> "$LOG" 2>&1; echo "test:conformance exit=$?" >> "$LOG"
npm run test:setup >> "$LOG" 2>&1; echo "test:setup exit=$?" >> "$LOG"
echo "--- the unit's greps" >> "$LOG"
grep -rn "\.bs\.\|data-bs-" src/browser/*.ts | grep -v "constants.ts\|data-bs-" | head -5 >> "$LOG" 2>&1; echo "bs-wire-grep listed (a .bs. wire name outside constants.ts is a finding)" >> "$LOG"
grep -n "| plugin " guides/veneer.md | cut -c1-200 >> "$LOG" 2>&1; echo "plugin-rows listed" >> "$LOG"
awk 'length > 100 {print FILENAME":"FNR": "length}' src/browser/*.ts >> "$LOG" 2>&1; echo "long-lines listed" >> "$LOG"
echo "--- review evidence" >> "$LOG"
git rev-parse HEAD MERGE_HEAD >> "$LOG" 2>&1
git diff --cached MERGE_HEAD -- src/browser tests/src/browser guides/veneer.md > "$U/j-$UNIT$SUFFIX.diff"; echo "diff lines: $(grep -c '' "$U/j-$UNIT$SUFFIX.diff")" >> "$LOG"
git status --short > "$U/j-$UNIT$SUFFIX-status.txt"; cat "$U/j-$UNIT$SUFFIX-status.txt" >> "$LOG"
echo "--- tree-wide typecheck (observation)" >> "$LOG"
npm run check >> "$LOG" 2>&1; echo "check exit=$?" >> "$LOG"
sed 's/\x1b\[[0-9;]*m//g' "$LOG" > "$U/j-$UNIT-gates$SUFFIX.log.txt"
sed 's/\x1b\[[0-9;]*m//g' "$LOG" | grep -n "exit=\|Tests \|Test Files\|FAIL \|error TS\|✗\|×\|diff lines\|listed\|^[0-9]*:[ AM?][ AMD?] " | head -70
