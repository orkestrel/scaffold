#!/bin/bash
# PRUNE-CARRY on Cursor Grok, read-only (ask mode), rooted at /home/user/veneer-probe (detached at Veneer main 0865c67). Derived from e-id-motion-terrain.sh. Brief: tmp/cursor/prune-carry-brief.md; journal: tmp/cursor/prune-carry.jsonl; cap 2100 s.
set -euo pipefail
cd /home/user/veneer-probe
timeout 2100 agent -p --trust --mode=ask --model "grok-4.7-high" --output-format stream-json "Read the file /home/user/scaffold/tmp/cursor/prune-carry-brief.md and follow it exactly as your instructions." > /home/user/scaffold/tmp/cursor/prune-carry.jsonl 2> /home/user/scaffold/tmp/cursor/prune-carry.err
