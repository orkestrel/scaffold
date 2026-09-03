#!/usr/bin/env bash
# Phase A of the bootstrap: registry copies into every fleet checkout except test (merged first) and form (merge pending), 3 at a time.
S=/home/user/scaffold/tmp/work
: > /home/user/work/logs/ci-fleet.log
printf '%s\n' codec contract msg sse abort budget csv emitter html indexeddb ndjson sqlite timeout tool console database markdown middleware pool process reason router table template websocket browser guide interpret lsp mcp qualifier queue rater relation sea server terminal workspace brief probe program worker workflow agent ollama toolbox | xargs -P 3 -I{} bash $S/ci-one.sh {}
echo "DONE $(date -u +%FT%TZ)" >> /home/user/work/logs/ci-fleet.log
