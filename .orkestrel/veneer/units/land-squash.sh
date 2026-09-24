#!/bin/bash
# land-squash.sh <unit> <shared patch> <landing message>: lands a frames-wave unit on the Veneer session branch.
# Commits the unit's owned changes (the files its status lists) on unit/<unit>, applies its shared patch there over
# the same base the patch was written against, then squash-merges unit/<unit> three-way onto the session head with
# diff3 conflict markers. It stops on a conflict and prints each conflicted file; the Orchestrator resolves each
# hunk and commits with the landing message. Clean merges commit, then run the formatter check on the touched files,
# oxlint, and check. Log: .orkestrel/veneer/units/land-<unit>.log.txt
U=$1; P=$2; MSG=$3
R=/home/user/scaffold/.orkestrel/veneer/units; S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$R/land-$U.log.txt; : > "$LOG"; export PATH="$S/npm11/node_modules/.bin:$PATH"
{
W=/home/user/veneer-$U; cd "$W" || exit 1
N="$(git log -1 --format=%an)"; M="$(git log -1 --format=%ae)"
files=$(git status --porcelain | grep -v '^?? tmp/' | sed -E 's/^.. //')
echo "=== unit files: $(echo $files)"
git add -- $files && git -c user.name="$N" -c user.email="$M" commit -q -m "$U (unit branch checkpoint)" && echo "=== unit/$U $(git rev-parse --short HEAD)"
git apply "$R/$P" && git add -A app tests guides src && git -c user.name="$N" -c user.email="$M" commit -q -m "$U shared patch (unit branch checkpoint)" && echo "=== unit/$U with $P $(git rev-parse --short HEAD)" || { echo "=== SHARED PATCH FAILED"; exit 3; }
[ -z "$(git status --porcelain | grep -v '^?? tmp/')" ] || { echo "=== $U worktree dirty"; git status --short; exit 2; }
cd /home/user/veneer || exit 1
[ -z "$(git status --porcelain)" ] || { echo "=== session tree dirty"; exit 2; }
echo "=== session head $(git rev-parse --short HEAD)"
git -c merge.conflictStyle=diff3 merge --squash "unit/$U"; echo "=== squash merge exit=$?"
conflicted=$(git diff --name-only --diff-filter=U)
if [ -n "$conflicted" ]; then echo "=== CONFLICTS: $(echo $conflicted)"; exit 4; fi
git -c user.name="$N" -c user.email="$M" commit -q -F "$R/$MSG" && echo "=== landed $(git rev-parse --short HEAD)"
touched=$(git diff --name-only HEAD~1 HEAD)
./node_modules/.bin/oxfmt --config .oxfmtrc.json --check $touched; echo "=== oxfmt check exit=$?"
./node_modules/.bin/oxlint --deny-warnings $(echo "$touched" | grep '\.ts$'); echo "=== oxlint exit=$?"
npm run check > /dev/null 2>&1; echo "=== check exit=$?"
git status --porcelain
} >> "$LOG" 2>&1
grep '^===' "$LOG"
