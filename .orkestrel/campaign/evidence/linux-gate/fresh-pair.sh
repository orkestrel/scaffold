#!/bin/bash
# Rule out cache corruption: minimal vite+vitest pair on a PRISTINE cache,
# under npm 10.9.7 and then npm 12.0.2, same directory contents each time.
set -u
R=/tmp/claude-0/-home-user/488431e0-a918-55f9-9e40-378c151c8130/scratchpad/freshpair
rm -rf "$R"; mkdir -p "$R/c10" "$R/c12" "$R/p10" "$R/p12"
for d in p10 p12; do
cat > "$R/$d/package.json" <<'J'
{ "name":"fresh-pair","version":"0.0.1","private":true,"type":"module",
  "devDependencies": { "vite":"^8.2.2","vitest":"^4.1.11" } }
J
done
export npm_config_legacy_peer_deps=false npm_config_strict_peer_deps=false

echo "### npm 10.9.7, pristine cache"
cd "$R/p10" && npm_config_cache="$R/c10" timeout 420 npm install --ignore-scripts --no-audit --no-fund >i.log 2>&1
echo "exit=$?"; grep -q edgesOut i.log && echo "crash=yes" || echo "crash=no"; grep -E "added [0-9]+ packages|npm error" i.log | head -3

echo "### npm 12.0.2, pristine cache"
cd "$R/p12" && npm_config_cache="$R/c12" timeout 600 npx -y npm@12.0.2 install --ignore-scripts --no-audit --no-fund >i.log 2>&1
echo "exit=$?"; grep -q edgesOut i.log && echo "crash=yes" || echo "crash=no"; grep -E "added [0-9]+ packages|npm error" i.log | head -3
echo "FRESH-PAIR-DONE"
