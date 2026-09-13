#!/bin/bash
# The authoritative release-readiness run for scaffold on this host, after all
# units land. Every project singly, then the LITERAL prepublishOnly script,
# which is the gate wave.md requires green.
set -u
cd /home/user/scaffold || exit 1
S=/tmp/claude-0/-home-user/488431e0-a918-55f9-9e40-378c151c8130/scratchpad/logs/final2.status.txt
: > "$S"
g() { local l="$1"; shift; echo ""; echo "########## $l ##########"; local t=$SECONDS; timeout 2400 "$@"; local c=$?; printf '%s\texit=%s\telapsed=%ss\n' "$l" "$c" "$((SECONDS-t))" >> "$S"; echo "########## $l exit=$c ##########"; }
g build         npm run build
g format:check  npm run format:check
g lint:check    npm run lint:check
g check         npm run check
for p in test:src:core test:src:server test:src:bin test:policy test:config test:setup test:guides; do g "$p" npm run "$p"; done
g "distribution(release)" npm run test:distribution -- --mode release
g "prepublishOnly(literal)" npm run prepublishOnly
echo ""; echo "FINAL-VERIFY-DONE"; cat "$S"
