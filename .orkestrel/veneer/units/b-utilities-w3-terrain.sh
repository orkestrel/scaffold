#!/bin/bash
# b-utilities-w3-terrain on Cursor Grok (grok-4.7-high), read-only, rooted at /home/user/veneer; launched through units/cursor-queue.sh, one lane at a time.
# The Orchestrator sized the cap (2400 s: the earlier family terrains ran 607 s to 654 s over comparable briefs, plus slack).
# Brief: tmp/cursor/b-utilities-w3-terrain-brief.md (byte-identical to .orkestrel/veneer/units/b-utilities-w3-terrain-brief.md)  Journal: tmp/cursor/b-utilities-w3-terrain.jsonl  Errors: tmp/cursor/b-utilities-w3-terrain.err
cd /home/user/veneer
timeout 2400 agent -p --trust --mode=ask --model "grok-4.7-high" --output-format stream-json "Read and follow the brief at /home/user/scaffold/tmp/cursor/b-utilities-w3-terrain-brief.md" > /home/user/scaffold/tmp/cursor/b-utilities-w3-terrain.jsonl 2> /home/user/scaffold/tmp/cursor/b-utilities-w3-terrain.err
echo "exit=$?" >> /home/user/scaffold/tmp/cursor/b-utilities-w3-terrain.err
