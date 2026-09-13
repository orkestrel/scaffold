#!/bin/bash
# remedy-control.sh — does the documented remedy `npm install --global npm@11.6.0` install an npm
# that self-reports 11.6.0, when run by an ambient npm beneath the floor? Installs into a scratch
# prefix so the host's npm is untouched.
set -u
P=/tmp/claude-0/-home-user/488431e0-a918-55f9-9e40-378c151c8130/scratchpad/remedy-prefix
rm -rf "$P"; mkdir -p "$P"
echo "ambient npm $(npm --version) on node $(node --version)"
npm_config_prefix="$P" timeout 300 npm install --global --no-audit --no-fund npm@11.6.0 2>&1 | tail -2
echo "exit=${PIPESTATUS[0]}"
echo "installed npm self-reports: $("$P/bin/npm" --version)"
echo "REMEDY-DONE"
