#!/bin/bash
# Lands E-ID-FLOW-2 on Veneer's session branch; E-ID-BUTTON-CASCADE follows in its own landing after its fix round.
# Successor to eid-land-2.sh, which landed the E-ID units at dbc7e0f. What changed: the unit list and base (the unit is
# cut from e07b3a6), the messages and log names, and the merge now takes the engine session's 4cd56a8 (J-INTEGRATION
# and J-SAMEWAY). The mechanism is unchanged: it commits each worktree on its unit branch, merges origin/main into the
# session branch (the merge carries the trailers), then integrates each unit as its own commit: every changed file merges
# three-way (base: the unit's cut; ours: the session tree; theirs: the unit's committed file) with git merge-file --diff3,
# a conflict resolves through resolve-diff3.py, and oxfmt formats the unit's files before the commit. The chain then runs
# once over the whole landing, the journey with CAPTURE=1 and again with it unset, and stops at the first red; nothing is
# pushed here. Messages: $S/eid-msg-<unit>.txt. Log: $S/eid-land-3.log.txt.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$S/eid-land-3.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH" PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers; unset CAPTURE
TRAILER="Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_016FizZRKTTm49XXhLB8eGTK"
step() { local name=$1; shift; echo "=== $name ($(date -u +%H:%M:%S))" >> $LOG; "$@" >> $LOG 2>&1; local code=$?; echo "=== $name exit=$code" >> $LOG; [ $code -eq 0 ] || { echo "=== stopped at $name" >> $LOG; exit $code; }; }
UNITS="flow2:e07b3a6"
for spec in $UNITS; do U=${spec%%:*}; [ -s $S/eid-msg-$U.txt ] || { echo "=== no message for $U; refusing" >> $LOG; exit 2; }; done
cd /home/user/veneer || exit 1
[ -z "$(git status --porcelain)" ] || { echo "=== session tree dirty; refusing" >> $LOG; exit 2; }
for spec in $UNITS; do U=${spec%%:*}; W=/home/user/veneer-$U
  if [ -n "$(git -C $W status --porcelain -- . ':!tmp')" ]; then
    git -C $W add -A . >> $LOG 2>&1 || { echo "=== add failed in $U; stopped" >> $LOG; exit 3; }
    git -C $W commit -q -F $S/eid-msg-$U.txt >> $LOG 2>&1 || { echo "=== commit failed in $U; stopped" >> $LOG; exit 3; }
    echo "=== unit/$U $(git -C $W rev-parse --short HEAD)" >> $LOG
  else echo "=== unit/$U already committed at $(git -C $W rev-parse --short HEAD)" >> $LOG; fi
done
git fetch -q origin main
if git merge-base --is-ancestor HEAD origin/main; then step "fast-forward to origin/main" git merge --ff-only origin/main
elif ! git merge-base --is-ancestor origin/main HEAD; then step "merge origin/main" git merge --no-ff origin/main -m "Merge origin/main into the session branch" -m "$TRAILER"; fi
echo "=== base $(git rev-parse --short HEAD)" >> $LOG
rm -rf $S/land4; mkdir -p $S/land4
for spec in $UNITS; do U=${spec%%:*}; B=${spec##*:}; W=/home/user/veneer-$U; T=$(git -C $W rev-parse HEAD)
  echo "=== integrate $U over $B (unit tip $(git -C $W rev-parse --short HEAD))" >> $LOG
  [ "$(git -C $W rev-parse $B)" != "$T" ] || { echo "=== $U tip is its base $B; stopped" >> $LOG; exit 3; }
  files=$(git -C $W diff --name-only $B $T)
  [ -n "$files" ] || { echo "=== $U changes no file; stopped" >> $LOG; exit 3; }
  for f in $files; do n=$U-$(echo "$f" | tr '/' '_')
    git -C $W show $B:$f > $S/land4/$n.base 2>/dev/null || : > $S/land4/$n.base
    git -C $W show $T:$f > $S/land4/$n.theirs
    if [ -e "$f" ]; then cp "$f" $S/land4/$n.merged; else cp $S/land4/$n.base $S/land4/$n.merged; fi
    git merge-file --diff3 -L ours -L base -L theirs $S/land4/$n.merged $S/land4/$n.base $S/land4/$n.theirs; c=$?
    if [ $c -ne 0 ]; then echo "  $f: $c conflict(s)" >> $LOG; python3 $S/resolve-diff3.py $S/land4/$n.merged "$f" >> $LOG 2>&1
    else mkdir -p "$(dirname "$f")"; cp $S/land4/$n.merged "$f"; fi
    if grep -qE '^(<<<<<<<|>>>>>>>|\|\|\|\|\|\|\|) ' "$f"; then echo "=== markers remain in $f; stopped" >> $LOG; exit 4; fi
  done
  ./node_modules/.bin/oxfmt --config .oxfmtrc.json $files >> $LOG 2>&1
  git add -- $files >> $LOG 2>&1 || { echo "=== session add failed for $U; stopped" >> $LOG; exit 3; }
  git commit -q -F $S/eid-msg-$U.txt >> $LOG 2>&1 || { echo "=== session commit failed for $U; stopped" >> $LOG; exit 3; }
  echo "=== landed $U as $(git rev-parse --short HEAD)" >> $LOG
done
rm -rf node_modules/.vite
step "format:check" npm run format:check
step "lint:check" npm run lint:check
step "check" npm run check
step "build:src" npm run build:src
step "test:src:styles" npm run test:src:styles
step "test:setup" npm run test:setup
step "test:conformance" npm run test:conformance
step "test:guides" npm run test:guides
step "test:policy" npm run test:policy
step "app:browser" npx vitest run --config vite.config.ts --no-cache --project app:browser
step "setup:browser" npx vitest run --config vite.config.ts --no-cache --project setup:browser
step "journey, CAPTURE=1" env CAPTURE=1 npm run test:journey
step "journey, CAPTURE unset" npm run test:journey
echo "=== status after chain: [$(git status --porcelain | tr '\n' ' ')] ($(date -u +%H:%M:%S))" >> $LOG
echo "=== eid land 3 done" >> $LOG
