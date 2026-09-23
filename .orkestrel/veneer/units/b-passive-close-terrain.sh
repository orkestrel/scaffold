#!/bin/bash
# B-PASSIVE-CLOSE terrain on Cursor Grok (grok-4.7-high), read-only, rooted at /home/user/veneer.
# Command in the form the grok driver resolved for the X-RETENTION-CARRY lane; the Orchestrator sized the cap (1800 s: the label terrain over a comparable brief ran under 20 min, the close terrain over eight obligations ran 8 min).
# Brief: tmp/cursor/b-passive-close-terrain-brief.md (byte-identical to .orkestrel/veneer/units/b-passive-close-terrain-brief.md)  Journal: tmp/cursor/b-passive-close-terrain.jsonl  Errors: tmp/cursor/b-passive-close-terrain.err
cd /home/user/veneer
timeout 1800 agent -p --trust --mode=ask --model "grok-4.7-high" --output-format stream-json "Read and follow the brief at /home/user/scaffold/tmp/cursor/b-passive-close-terrain-brief.md" > /home/user/scaffold/tmp/cursor/b-passive-close-terrain.jsonl 2> /home/user/scaffold/tmp/cursor/b-passive-close-terrain.err
echo "exit=$?" >> /home/user/scaffold/tmp/cursor/b-passive-close-terrain.err
