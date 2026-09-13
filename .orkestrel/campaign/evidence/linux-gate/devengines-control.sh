#!/bin/bash
# An instrument that always fails is not evidence. devEngines must REFUSE the
# crashing npm and ADMIT the clean one, installing normally in the admit case.
set -u
R=/tmp/claude-0/-home-user/488431e0-a918-55f9-9e40-378c151c8130/scratchpad/devcontrol
rm -rf "$R"; mkdir -p "$R"
MANIFEST='{"name":"dev-control","version":"0.0.1","private":true,"type":"module",
 "engines":{"node":">=22.18.0"},
 "devEngines":{"packageManager":{"name":"npm","version":">=11.6.0","onFail":"error"}},
 "devDependencies":{"vite":"^8.2.2","vitest":"^4.1.11"}}'
for v in 10.9.7 11.5.0 11.6.0 12.0.2; do
  d="$R/v$v"; mkdir -p "$d/cache" "$d/p"; cd "$d/p"
  printf '%s\n' "$MANIFEST" > package.json
  if [ "$v" = "10.9.7" ]; then
    npm_config_cache="$d/cache" timeout 420 npm install --ignore-scripts --no-audit --no-fund >i.log 2>&1
  else
    npm_config_cache="$d/cache" timeout 600 npx -y "npm@$v" install --ignore-scripts --no-audit --no-fund >i.log 2>&1
  fi
  code=$?
  crash="no"; grep -q edgesOut i.log && crash="yes"
  refused="no"; grep -q EBADDEVENGINES i.log && refused="yes"
  added=$(grep -oE "added [0-9]+ packages" i.log | head -1)
  printf 'npm %-8s exit=%-3s refused=%-4s crash=%-4s %s\n' "$v" "$code" "$refused" "$crash" "${added:-–}"
done
echo "DEV-CONTROL-DONE"
