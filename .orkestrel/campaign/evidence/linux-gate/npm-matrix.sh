#!/bin/bash
# Which npm majors resolve the generated workspace's peer graph without a lockfile?
# This decides whether an `engines.npm` floor is a sufficient fix, and at which version.
set -u
R=/tmp/claude-0/-home-user/488431e0-a918-55f9-9e40-378c151c8130/scratchpad/npmmatrix
rm -rf "$R"; mkdir -p "$R"
export npm_config_legacy_peer_deps=false npm_config_strict_peer_deps=false
for v in 10.9.7 11.0.0 11.6.2 12.0.2; do
  d="$R/v$v"; mkdir -p "$d/cache" "$d/p"
  cat > "$d/p/package.json" <<'J'
{ "name":"pair-probe","version":"0.0.1","private":true,"type":"module",
  "devDependencies": { "vite":"^8.2.2","vitest":"^4.1.11" } }
J
  cd "$d/p" || continue
  if [ "$v" = "10.9.7" ]; then
    npm_config_cache="$d/cache" timeout 420 npm install --ignore-scripts --no-audit --no-fund >i.log 2>&1
  else
    npm_config_cache="$d/cache" timeout 600 npx -y "npm@$v" install --ignore-scripts --no-audit --no-fund >i.log 2>&1
  fi
  code=$?
  crash="no"; grep -q edgesOut i.log && crash="yes"
  printf 'npm %-8s exit=%-3s edgesOut_crash=%s\n' "$v" "$code" "$crash"
done
echo "NPM-MATRIX-DONE"
