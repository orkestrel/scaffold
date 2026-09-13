#!/bin/bash
# The crash boundary sits inside npm 11.x: 11.0.0 crashes, 11.6.2 does not.
# Find the first npm that resolves the graph, so an engines.npm floor names a
# version that actually works rather than a memorable major.
set -u
R=/tmp/claude-0/-home-user/488431e0-a918-55f9-9e40-378c151c8130/scratchpad/npmbisect
rm -rf "$R"; mkdir -p "$R"
export npm_config_legacy_peer_deps=false npm_config_strict_peer_deps=false
for v in 11.1.0 11.2.0 11.3.0 11.4.0 11.5.0 11.6.0; do
  d="$R/v$v"; mkdir -p "$d/cache" "$d/p"
  cat > "$d/p/package.json" <<'J'
{ "name":"pair-probe","version":"0.0.1","private":true,"type":"module",
  "devDependencies": { "vite":"^8.2.2","vitest":"^4.1.11" } }
J
  cd "$d/p" || continue
  npm_config_cache="$d/cache" timeout 600 npx -y "npm@$v" install --ignore-scripts --no-audit --no-fund >i.log 2>&1
  code=$?
  crash="no"; grep -q edgesOut i.log && crash="yes"
  printf 'npm %-8s exit=%-3s edgesOut_crash=%s\n' "$v" "$code" "$crash"
done
echo "NPM-BISECT-DONE"
