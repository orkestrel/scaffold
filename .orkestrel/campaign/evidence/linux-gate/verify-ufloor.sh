#!/bin/bash
# Authoritative host verification of U-floor. The unit's own readings are evidence
# about what it changed; these are the gate. build runs FIRST because the change
# edits a vendored file and host.json digests it — a gate reading the generated
# artifact before regeneration reads stale bytes.
set -u
cd /home/user/scaffold || exit 1
S=/tmp/claude-0/-home-user/488431e0-a918-55f9-9e40-378c151c8130/scratchpad/logs/ufloor.status.txt
: > "$S"
gate() {
  local label="$1"; shift
  echo ""; echo "########## $label ##########"
  local start=$SECONDS
  timeout 1800 "$@"
  local code=$?
  printf '%s\texit=%s\telapsed=%ss\n' "$label" "$code" "$((SECONDS-start))" >> "$S"
  echo "########## $label exit=$code ##########"
}
gate "build(regenerates host.json)" npm run build
gate "format:check" npm run format:check
gate "lint:check"   npm run lint:check
gate "check"        npm run check
for p in test:src:core test:src:server test:src:bin test:policy test:config test:setup test:guides; do
  gate "$p" npm run "$p"
done
echo ""; echo "UFLOOR-VERIFY-DONE"; cat "$S"
