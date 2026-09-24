#!/bin/bash
# E-IDENTITY-TERRAIN on Cursor Grok, read-only (ask mode), rooted at /home/user/veneer-read. Derived from run.sh (the APPEARANCE sites run). Brief: tmp/cursor/e-identity-terrain-brief.md; journal: tmp/cursor/e-identity-terrain.jsonl.
set -euo pipefail
cd /home/user/veneer-read
agent -p --trust --mode=ask --model "grok-4.7-high" --output-format stream-json "Read the file /home/user/scaffold/tmp/cursor/e-identity-terrain-brief.md and follow it exactly as your instructions." > /home/user/scaffold/tmp/cursor/e-identity-terrain.jsonl 2> /home/user/scaffold/tmp/cursor/e-identity-terrain.err
