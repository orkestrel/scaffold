#!/usr/bin/env bash
# Deciding read: each red file of the whole-suite run alone, sequentially, on the idle host.
set -u
S=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts6
cd /home/user/fleet/probe || exit 9
echo "node-count=$(ps -eo comm | grep -c '^node$') load=$(cut -d' ' -f1 /proc/loadavg) start=$(date '+%H:%M:%S')"
for spec in 'src:bin tests/src/bin/main.test.ts' 'src:server tests/src/server/Probe.test.ts'; do
  set -- $spec
  echo "== $2 alone ($(date '+%H:%M:%S'))"
  npx vitest run --config vite.config.ts --no-cache --reporter=dot --project "$1" "$2" > "$S/solo-$(basename "$2" .test.ts).log" 2>&1
  code=$?
  echo "exit=$code"; grep -E '^ +(Test Files|Tests|Duration)' "$S/solo-$(basename "$2" .test.ts).log"
done
echo "end=$(date '+%H:%M:%S')"
