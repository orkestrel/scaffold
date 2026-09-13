#!/bin/bash
# U1: does an unsatisfied engines.npm floor actually stop a default `npm install`,
#     or only warn? This decides whether direction A prevents or merely documents.
# U2: does pinning the peer graph to exact versions avoid the crash without a lockfile?
set -u
R=/tmp/claude-0/-home-user/488431e0-a918-55f9-9e40-378c151c8130/scratchpad/enginesprobe
rm -rf "$R"; mkdir -p "$R"
export npm_config_legacy_peer_deps=false npm_config_strict_peer_deps=false
echo "host npm: $(npm -v)"

echo ""
echo "### U1a: engines.npm floor no running npm can satisfy, DEFAULT settings"
mkdir -p "$R/u1a/cache" && cd "$R/u1a"
cat > package.json <<'J'
{ "name":"engines-probe","version":"0.0.1","private":true,
  "engines": { "node": ">=22.18.0", "npm": ">=11.6.0" },
  "devDependencies": { "@orkestrel/contract": "^0.0.17" } }
J
npm_config_cache="$R/u1a/cache" timeout 300 npm install --ignore-scripts --no-audit --no-fund >i.log 2>&1
echo "exit=$?"
grep -iE "EBADENGINE|Unsupported engine|added [0-9]+ packages" i.log | head -4

echo ""
echo "### U1b: same manifest, engine-strict=true"
mkdir -p "$R/u1b/cache" && cd "$R/u1b"
cp "$R/u1a/package.json" .
printf 'engine-strict=true\n' > .npmrc
npm_config_cache="$R/u1b/cache" timeout 300 npm install --ignore-scripts --no-audit --no-fund >i.log 2>&1
echo "exit=$?"
grep -iE "EBADENGINE|Unsupported engine|added [0-9]+ packages" i.log | head -4

echo ""
echo "### U2: the crashing pair pinned to EXACT versions, no lockfile, npm 10.9.7"
mkdir -p "$R/u2/cache" && cd "$R/u2"
cat > package.json <<'J'
{ "name":"exact-probe","version":"0.0.1","private":true,"type":"module",
  "devDependencies": { "vite":"8.2.2","vitest":"4.1.11" } }
J
npm_config_cache="$R/u2/cache" timeout 420 npm install --ignore-scripts --no-audit --no-fund >i.log 2>&1
echo "exit=$?"
grep -q edgesOut i.log && echo "crash=yes" || echo "crash=no"
grep -E "added [0-9]+ packages" i.log | head -2
echo ""
echo "ENGINES-PROBE-DONE"
