#!/bin/bash
# Lands E-IDENTITY (E-ID-RECORD, E-ID-LAYOUT, E-ID-CODE), E-ID-FLOW, and J-FIXTURES on Veneer's session branch.
# Successor to appearance-land.sh. It commits each worktree on its unit branch, merges origin/main into the session
# branch (the merge carries the trailers), then integrates each unit as its own commit: every changed file merges
# three-way (base: the unit's cut; ours: the session tree; theirs: the unit's committed file) with git merge-file --diff3,
# a conflict resolves through resolve-diff3.py, and oxfmt formats the unit's files before the commit. The chain then runs
# once over the whole landing: the static gates, the builds, the styles, setup, conformance, guides, policy, app:browser,
# and setup:browser projects, then the journey with CAPTURE=1 and again with it unset. Stops at the first red; nothing is
# pushed here. Messages: $S/eid-msg-<unit>.txt. Log: $S/eid-land-2.log.txt.
# Successor to eid-land.sh, whose run stopped at the first unit: `git add -A -- . ':!tmp'` exits 1 because the pathspec
# names the ignored tmp directory, so the && skipped every unit commit and the integration read empty diffs; and oxfmt
# with an empty file list formats the whole tree. This copy stages with `git add -A .` (tmp is ignored anyway), refuses a
# unit whose tip is still its base, refuses an empty file list, and checks each commit's exit.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$S/eid-land-2.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH" PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers; unset CAPTURE
TRAILER="Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_016FizZRKTTm49XXhLB8eGTK"
step() { local name=$1; shift; echo "=== $name ($(date -u +%H:%M:%S))" >> $LOG; "$@" >> $LOG 2>&1; local code=$?; echo "=== $name exit=$code" >> $LOG; [ $code -eq 0 ] || { echo "=== stopped at $name" >> $LOG; exit $code; }; }
UNITS="eir:ca83afb eil:ca83afb eic:ca83afb flow:6882751 jf:6882751"
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
rm -rf $S/land3; mkdir -p $S/land3
for spec in $UNITS; do U=${spec%%:*}; B=${spec##*:}; W=/home/user/veneer-$U; T=$(git -C $W rev-parse HEAD)
  echo "=== integrate $U over $B (unit tip $(git -C $W rev-parse --short HEAD))" >> $LOG
  [ "$(git -C $W rev-parse $B)" != "$T" ] || { echo "=== $U tip is its base $B; stopped" >> $LOG; exit 3; }
  files=$(git -C $W diff --name-only $B $T)
  [ -n "$files" ] || { echo "=== $U changes no file; stopped" >> $LOG; exit 3; }
  for f in $files; do n=$U-$(echo "$f" | tr '/' '_')
    git -C $W show $B:$f > $S/land3/$n.base 2>/dev/null || : > $S/land3/$n.base
    git -C $W show $T:$f > $S/land3/$n.theirs
    if [ -e "$f" ]; then cp "$f" $S/land3/$n.merged; else cp $S/land3/$n.base $S/land3/$n.merged; fi
    git merge-file --diff3 -L ours -L base -L theirs $S/land3/$n.merged $S/land3/$n.base $S/land3/$n.theirs; c=$?
    if [ $c -ne 0 ]; then echo "  $f: $c conflict(s)" >> $LOG; python3 $S/resolve-diff3.py $S/land3/$n.merged "$f" >> $LOG 2>&1
    else mkdir -p "$(dirname "$f")"; cp $S/land3/$n.merged "$f"; fi
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
echo "=== eid land done" >> $LOG
