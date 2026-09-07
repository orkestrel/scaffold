#!/usr/bin/env bash
# A.1 precondition: install the guide's packed tip (0.0.18 at c25c689) into abort's checkout --no-save. Orchestrator-owned.
set -u
A=/home/user/fleet/abort
TGZ=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/p19/packed/orkestrel-guide-0.0.18.tgz
cd "$A" || exit 9
echo "== before"; node -p "require('$A/node_modules/@orkestrel/guide/package.json').version"; git status --short; echo "(status end)"
echo "== replaced range"; grep -n '"@orkestrel/guide"' package.json
echo "== install"; PATH=/opt/npm11/bin:$PATH npm install --no-save --ignore-scripts --no-audit --no-fund "$TGZ" 2>&1 | tail -2; echo "EXIT ${PIPESTATUS[0]}"
echo "== after"; node -p "require('$A/node_modules/@orkestrel/guide/package.json').version"; grep -c 'findDrift' node_modules/@orkestrel/guide/dist/src/core/index.d.ts; git status --short; echo "(status end)"
