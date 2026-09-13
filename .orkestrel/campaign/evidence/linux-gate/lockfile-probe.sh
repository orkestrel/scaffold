#!/bin/bash
# Does a committed lockfile immunise the install? That fixes the blast radius:
# the three packages all ship lockfiles; a scaffold-generated workspace does not.
set -u
W=/tmp/claude-0/-home-user/488431e0-a918-55f9-9e40-378c151c8130/scratchpad/distrepro
P="$W/lockprobe"; rm -rf "$P"; mkdir -p "$P"
export npm_config_cache="$W/cache" npm_config_legacy_peer_deps=false npm_config_strict_peer_deps=false
echo "npm $(npm -v)"

echo "### minimal pair: vite + vitest only, no lockfile"
mkdir -p "$P/pair" && cd "$P/pair"
cat > package.json <<'J'
{ "name":"pair-probe","version":"0.0.1","private":true,"type":"module",
  "devDependencies": { "vite":"^8.2.2","vitest":"^4.1.11" } }
J
timeout 420 npm install --ignore-scripts --no-audit --no-fund >install.log 2>&1; echo "exit=$?"
grep -qE "edgesOut" install.log && echo "crash=yes" || echo "crash=no"
grep -E "added [0-9]+ packages" install.log | head -2

echo "### the three real packages: npm install with their committed lockfiles"
for r in scaffold toolbox ollama; do
  cd "/home/user/$r" || continue
  # --dry-run resolves the ideal tree without writing node_modules or the lockfile.
  timeout 420 npm install --ignore-scripts --no-audit --no-fund --dry-run > "$P/$r-dryrun.log" 2>&1
  code=$?
  crash="no"; grep -q edgesOut "$P/$r-dryrun.log" && crash="yes"
  printf '%-10s dry-run exit=%s crash=%s\n' "$r" "$code" "$crash"
done
echo "LOCK-PROBE-DONE"
