#!/bin/bash
# Successor of veneer-deps-2.sh: install npm@11 into the scratchpad prefix with the host npm 10,
# then run veneer's locked install with that npm 11 binary (devEngines requires npm >= 11.6.0).
SCRATCH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11
mkdir -p "$SCRATCH" && cd "$SCRATCH" || exit 1
timeout 300 npm install --no-audit --no-fund --loglevel=error npm@11 2>&1 | tail -5
NPM11="$SCRATCH/node_modules/npm/bin/npm-cli.js"
echo "npm11 version: $(node "$NPM11" --version)"
cd /home/user/veneer || exit 1
timeout 900 node "$NPM11" ci --ignore-scripts 2>&1 | grep -v '^npm warn'
status=${PIPESTATUS[0]}
if [ "$status" = "0" ]; then
  sha256sum package-lock.json | cut -d' ' -f1 > node_modules/.orkestrel-lock.sha256
  echo "marker: $(cat node_modules/.orkestrel-lock.sha256)"
  echo "packages: $(ls node_modules | wc -l)"
fi
echo "npm-ci-exit=$status"
