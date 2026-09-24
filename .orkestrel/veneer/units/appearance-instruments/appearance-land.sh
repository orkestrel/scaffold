#!/bin/bash
# Lands APPEARANCE (AP-COLOR round 4 and AP-TYPE round 4) on Veneer's session branch. Successor to apc-land.sh: it
# lands both units in one chain, fast-forwards or merges origin/main (the merge carries the trailers), cherry-picks
# unit/apc and then unit/apt as their own commits, and runs the chain once over both: the fast gates, the styles,
# setup, conformance, guides, and policy projects, then the journey with CAPTURE=1 and again with it unset (the
# landing procedure's portfolio regeneration). Stops at the first red; nothing is pushed here. Log: appearance-land.log.txt.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$S/appearance-land.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
unset CAPTURE
step() { local name=$1; shift; echo "=== $name ($(date -u +%H:%M:%S))" >> $LOG; "$@" >> $LOG 2>&1; local code=$?; echo "=== $name exit=$code" >> $LOG; [ $code -eq 0 ] || { echo "=== stopped at $name" >> $LOG; exit $code; }; }
[ "$(git -C /home/user/veneer-apc status --porcelain | wc -l)" = "15" ] || { echo "=== veneer-apc status is not the audited 15 files; refusing" >> $LOG; exit 2; }
[ "$(git -C /home/user/veneer-apt status --porcelain | wc -l)" = "14" ] || { echo "=== veneer-apt status is not the audited 14 files; refusing" >> $LOG; exit 2; }
cd /home/user/veneer || exit 1
[ -z "$(git status --porcelain)" ] || { echo "=== session tree dirty; refusing" >> $LOG; exit 2; }
git -C /home/user/veneer-apc add -A && git -C /home/user/veneer-apc commit -q -F $S/apc-landing-message.txt && echo "=== unit/apc $(git -C /home/user/veneer-apc rev-parse --short HEAD)" >> $LOG
git -C /home/user/veneer-apt add -A && git -C /home/user/veneer-apt commit -q -F $S/apt-landing-message.txt && echo "=== unit/apt $(git -C /home/user/veneer-apt rev-parse --short HEAD)" >> $LOG
git fetch -q origin main
if git merge-base --is-ancestor HEAD origin/main; then step "fast-forward to origin/main" git merge --ff-only origin/main
elif ! git merge-base --is-ancestor origin/main HEAD; then step "merge origin/main" git merge --no-ff origin/main -m "Merge origin/main into the session branch" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_016FizZRKTTm49XXhLB8eGTK"; fi
echo "=== base $(git rev-parse --short HEAD)" >> $LOG
step "cherry-pick unit/apc" git cherry-pick unit/apc
step "cherry-pick unit/apt" git cherry-pick unit/apt
echo "=== landed commits: $(git log --oneline -2 | tr '\n' ';')" >> $LOG
rm -rf node_modules/.vite
step "format:check" npm run format:check
step "lint:check" npm run lint:check
step "check" npm run check
step "test:src:styles" npm run test:src:styles
step "test:setup" npm run test:setup
step "test:conformance" npm run test:conformance
step "test:guides" npm run test:guides
step "test:policy" npm run test:policy
step "journey, CAPTURE=1" env CAPTURE=1 npm run test:journey
step "journey, CAPTURE unset" npm run test:journey
echo "=== status after chain: [$(git status --porcelain | tr '\n' ' ')] ($(date -u +%H:%M:%S))" >> $LOG
echo "=== appearance land done" >> $LOG
