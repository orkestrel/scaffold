#!/bin/bash
# E-ID-MOTION-TERRAIN on Cursor Grok, read-only (ask mode), rooted at /home/user/veneer-probe (detached at Veneer main 0865c67). Derived from e-identity-terrain.sh. Brief: tmp/cursor/e-id-motion-terrain-brief.md; journal: tmp/cursor/e-id-motion-terrain.jsonl; cap 2100 s.
set -euo pipefail
cd /home/user/veneer-probe
timeout 2100 agent -p --trust --mode=ask --model "grok-4.7-high" --output-format stream-json "Read the file /home/user/scaffold/tmp/cursor/e-id-motion-terrain-brief.md and follow it exactly as your instructions." > /home/user/scaffold/tmp/cursor/e-id-motion-terrain.jsonl 2> /home/user/scaffold/tmp/cursor/e-id-motion-terrain.err
