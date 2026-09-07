#!/usr/bin/env bash
# land-p2.sh <pkg> [fix]: after a P.2 (or P.2-fix) unit returns — the retained diff and status captured, the commit by path.
# Log at land/<pkg>-p2[-fix].log.txt; diff and status at land/<pkg>-p2[-fix].diff.txt and .status.txt.
set -u
n=$1; suffix=${2:-}; tag=p2${suffix:+-$suffix}; d=/home/user/fleet/$n
SCR=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass
LOG=$SCR/land/$n-$tag.log.txt
cd "$d" || exit 9
{
echo "== $n $tag landing $(date -u +%FT%TZ) over $(git rev-parse --short HEAD)"
echo "== status"; git status --short | tee "$SCR/land/$n-$tag.status.txt"
git diff > "$SCR/land/$n-$tag.diff.txt"; git diff --stat | tail -3
echo "== stage by path"; git status --short | awk '{print $2}' | while read -r p; do git add -- "$p"; done; git diff --cached --stat | tail -1
if [ -z "$suffix" ]; then
git -c user.name=Claude -c user.email=noreply@anthropic.com commit -q -F - <<MSG
Converge $n under the equality gate

Every Surface and Methods table heads Summary and each cell equals its
declaration's description paragraph; one example is titled with its fence's
heading and equals its body; the guide's tagline and the README's pitch are
one noun phrase; the guides suite carries the equality case, the title pin,
and the README case, each read red before its convergence.

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01V28La253kW5DDvGA5wGKtB
MSG
else
git -c user.name=Claude -c user.email=noreply@anthropic.com commit -q -F - <<MSG
Refine $n's convergence on the audit's findings

The fix round carries the audit's findings into the guide, the README, the
doc blocks, and the guides suite; the gate stays at zero disagreements.

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01V28La253kW5DDvGA5wGKtB
MSG
fi
echo "== committed"; git log --oneline -1; git status --short; echo "(status end)"
} | tee "$LOG"
