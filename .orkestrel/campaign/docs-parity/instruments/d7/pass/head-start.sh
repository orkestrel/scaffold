#!/usr/bin/env bash
# head-start.sh <pkg>: the P.1 precondition — install the guide's packed tip (0.0.18 at the branch tip after U4) into the checkout --no-save.
# Orchestrator-owned tracked command; log at headstart/<pkg>.log.txt. Generalizes a1/head-start-abort.sh.
set -u
n=$1; A=/home/user/fleet/$n
SCR=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass
TGZ=$SCR/packed/orkestrel-guide-0.0.18.tgz
# A checkout that consumes another unpublished tip installs it in the same command, or npm reverts it to the lockfile's registry copy.
EXTRA=""; [ "$n" = database ] && EXTRA=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts6/pack/orkestrel-probe-0.0.12.tgz
LOG=$SCR/headstart/$n.log.txt
cd "$A" || exit 9
{
echo "== $n $(date -u +%FT%TZ) tarball sha256 $(sha256sum "$TGZ" | cut -c1-16)"
echo "== before"; node -p "require('$A/node_modules/@orkestrel/guide/package.json').version"; git status --short; echo "(status end)"
echo "== replaced range"; grep -n '"@orkestrel/guide"' package.json
echo "== install"; PATH=/opt/npm11/bin:$PATH npm install --no-save --ignore-scripts --no-audit --no-fund "$TGZ" $EXTRA 2>&1 | tail -2; echo "EXIT ${PIPESTATUS[0]}"
echo "== after"; node -p "require('$A/node_modules/@orkestrel/guide/package.json').version"; [ -n "$EXTRA" ] && echo "probe scanDiagnostics exports: $(grep -c scanDiagnostics node_modules/@orkestrel/probe/dist/src/server/index.d.ts)"; grep -c 'findDrift' node_modules/@orkestrel/guide/dist/src/core/index.d.ts; git status --short; echo "(status end)"
} | tee "$LOG"
