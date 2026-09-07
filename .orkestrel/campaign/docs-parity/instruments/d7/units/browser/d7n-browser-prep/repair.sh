#!/usr/bin/env bash
# d7n-browser-prep item 1: run the extracted scaffold tip's `repair --offline` in this
# checkout and record its summary line and the resulting git status.
set -uo pipefail
cd /home/user/fleet/browser
CLI=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js
echo "== repair --offline"
node "$CLI" repair --offline
echo "EXIT $?"
echo "== git status --short"
git status --short
