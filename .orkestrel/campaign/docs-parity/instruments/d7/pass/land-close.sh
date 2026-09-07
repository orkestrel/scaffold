#!/usr/bin/env bash
# land-close.sh <pkg> [n]: after a closing unit returns — the retained diff and status captured, the commit by path.
# Log at land/<pkg>-close[-n].log.txt; diff and status beside it.
set -u
n=$1; suffix=${2:-}; tag=close${suffix:+-$suffix}; d=/home/user/fleet/$n
SCR=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass
LOG=$SCR/land/$n-$tag.log.txt
cd "$d" || exit 9
{
echo "== $n $tag landing $(date -u +%FT%TZ) over $(git rev-parse --short HEAD)"
echo "== status"; git status --short | tee "$SCR/land/$n-$tag.status.txt"
git diff > "$SCR/land/$n-$tag.diff.txt"; git diff --stat | tail -3
echo "== stage by path"; git status --short | awk '{print $2}' | while read -r p; do git add -- "$p"; done; git diff --cached --stat | tail -1
git -c user.name=Claude -c user.email=noreply@anthropic.com commit -q -F - <<MSG
Close $n under the final guide tarball

The closing sweep: the guide's Shape cells in the fleet's one idiom under
their convention sentences, every fence introduced by a sentence, and the
guides drop-in on the pilot's bytes outside this package's own constants
and executed cases; the gate stays at zero disagreements.

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01V28La253kW5DDvGA5wGKtB
MSG
echo "== committed"; git log --oneline -1; git status --short; echo "(status end)"
} | tee "$LOG"
