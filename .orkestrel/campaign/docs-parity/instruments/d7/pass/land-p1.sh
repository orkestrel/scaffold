#!/usr/bin/env bash
# land-p1.sh <pkg>: after a P.1 unit returns green — the Orchestrator's lockfile-only install (npm 11) carrying the bump,
# the retained diff and status captured AFTER that install, then the commit by path on the package's branch.
# Log at land/<pkg>-p1.log.txt; diff and status at land/<pkg>-p1.diff.txt and land/<pkg>-p1.status.txt.
set -u
n=$1; d=/home/user/fleet/$n
SCR=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass
LOG=$SCR/land/$n-p1.log.txt
cd "$d" || exit 9
ver=$(node -p "require('./package.json').version")
{
echo "== $n P.1 landing $(date -u +%FT%TZ), version $ver"
echo "== status before install"; git status --short
echo "== lockfile-only install"; PATH=/opt/npm11/bin:$PATH npm install --package-lock-only --ignore-scripts --no-audit --no-fund 2>&1 | tail -2; echo "EXIT ${PIPESTATUS[0]}"
echo "== lockfile root version"; node -p "const l=require('./package-lock.json'); l.version+' / '+l.packages[''].version"
echo "== guide in lockfile"; node -p "require('./package-lock.json').packages['node_modules/@orkestrel/guide'].version"
echo "== installed guide (head start, untouched)"; node -p "require('$d/node_modules/@orkestrel/guide/package.json').version"
[ -f node_modules/.orkestrel-lock.sha256 ] && { sha256sum package-lock.json | cut -d' ' -f1 > node_modules/.orkestrel-lock.sha256; echo "== deps marker rewritten"; }
echo "== status after install"; git status --short | tee "$SCR/land/$n-p1.status.txt"
git diff > "$SCR/land/$n-p1.diff.txt"; git diff --stat | tail -3
echo "== stage by path"; git status --short | awk '{print $2}' | while read -r p; do git add -- "$p"; done; git diff --cached --stat | tail -1
git -c user.name=Claude -c user.email=noreply@anthropic.com commit -q -F - <<MSG
Prepare $n for the equality gate

Repair the vendored delta and the docs seed from scaffold's tip, adapt the
guides drop-in to the 0.0.18 record shapes, fix the sites the vendored voice
rule and the prose sweep report, and bump to $ver with the lockfile. The
guide head start is installed without saving; the range re-pins after the
guide's release.

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01V28La253kW5DDvGA5wGKtB
MSG
echo "== committed"; git log --oneline -1; git status --short; echo "(status end)"
} | tee "$LOG"
