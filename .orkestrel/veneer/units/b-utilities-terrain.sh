#!/bin/bash
# B-UTILITIES terrain on Cursor Grok (grok-4.7-high), read-only, rooted at /home/user/veneer.
# Command in the form the grok driver resolved for the X-RETENTION-CARRY lane; the Orchestrator sized the cap (2400 s: the same bound as the B-COLLAPSE terrain; this brief reads one 806-line map, three small API files, the helpers, and one history-path JSON, and bars dist/ and lockfiles).
# Brief: tmp/cursor/b-utilities-terrain-brief.md (byte-identical to .orkestrel/veneer/units/b-utilities-terrain-brief.md)  Journal: tmp/cursor/b-utilities-terrain.jsonl  Errors: tmp/cursor/b-utilities-terrain.err
cd /home/user/veneer
timeout 2400 agent -p --trust --mode=ask --model "grok-4.7-high" --output-format stream-json "Read and follow the brief at /home/user/scaffold/tmp/cursor/b-utilities-terrain-brief.md" > /home/user/scaffold/tmp/cursor/b-utilities-terrain.jsonl 2> /home/user/scaffold/tmp/cursor/b-utilities-terrain.err
echo "exit=$?" >> /home/user/scaffold/tmp/cursor/b-utilities-terrain.err
