#!/bin/bash
# Can a test provision an admitted npm and make NESTED `npm run` calls inside a
# devEngines-guarded workspace use it too? The distribution proof needs this,
# because the generated workspace's prepublishOnly chains `npm run` calls.
set -u
R=/tmp/claude-0/-home-user/488431e0-a918-55f9-9e40-378c151c8130/scratchpad/pathprepend
rm -rf "$R"; mkdir -p "$R/npm" "$R/ws"
echo "ambient: npm $(npm -v)"
npm install --silent --no-audit --no-fund --prefix "$R/npm" npm@11.6.0 >/dev/null 2>&1
echo "provisioned bin dir contents:"; ls "$R/npm/node_modules/.bin/" 2>&1 | head
cd "$R/ws"
cat > package.json <<'J'
{ "name":"nested","version":"0.0.1","private":true,
  "devEngines":{"packageManager":{"name":"npm","version":">=11.6.0","onFail":"error"}},
  "scripts": { "outer": "npm run inner", "inner": "npm --version" } }
J
echo ""; echo "### ambient npm, nested run (expect EBADDEVENGINES)"
npm run outer 2>&1 | grep -E "EBADDEVENGINES|^[0-9]+\.[0-9]+\.[0-9]+$" | head -2; echo "exit=${PIPESTATUS[0]}"
echo ""; echo "### provisioned npm via PATH prepend, nested run (expect 11.6.0 twice-deep, exit 0)"
PATH="$R/npm/node_modules/.bin:$PATH" npm run outer 2>&1 | grep -vE "^$|^>" | head -4; echo "exit=${PIPESTATUS[0]}"
echo ""; echo "### which npm does the shim resolve to, and does it self-report truthfully?"
PATH="$R/npm/node_modules/.bin:$PATH" sh -c 'command -v npm; npm --version'
echo "PATH-PREPEND-DONE"
