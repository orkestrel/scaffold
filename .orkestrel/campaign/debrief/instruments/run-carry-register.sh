#!/usr/bin/env bash
set -euo pipefail

CURSOR_GROK_MODEL="cursor-grok-4.6-high"

RESOLVED_ENTRY="agent"
if ! command -v "$RESOLVED_ENTRY" >/dev/null 2>&1; then
  echo "deviation: agent CLI not found on PATH" >&2
  exit 1
fi

cd /home/user/scaffold

"$RESOLVED_ENTRY" -p --trust --mode=ask --model "$CURSOR_GROK_MODEL" \
  "Read /home/user/scaffold/tmp/cursor/carry-register-brief.md and follow it exactly. Return only the Markdown output shape it specifies." \
  | tee /home/user/scaffold/tmp/cursor/carry-register.log
