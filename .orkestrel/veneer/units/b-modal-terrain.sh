#!/bin/bash
# b-modal-terrain on Cursor Grok (grok-4.7-high), read-only, rooted at /home/user/veneer; launched through units/cursor-queue.sh, one lane at a time.
# Command in the form the grok driver resolved for the X-RETENTION-CARRY lane; the Orchestrator sized the cap (2400 s: the B-COLLAPSE terrain ran 607 s and the B-UTILITIES terrain 654 s over comparable briefs, plus slack for web reads).
# Brief: tmp/cursor/b-modal-terrain-brief.md (byte-identical to .orkestrel/veneer/units/b-modal-terrain-brief.md)  Journal: tmp/cursor/b-modal-terrain.jsonl  Errors: tmp/cursor/b-modal-terrain.err
cd /home/user/veneer
timeout 2400 agent -p --trust --mode=ask --model "grok-4.7-high" --output-format stream-json "Read and follow the brief at /home/user/scaffold/tmp/cursor/b-modal-terrain-brief.md" > /home/user/scaffold/tmp/cursor/b-modal-terrain.jsonl 2> /home/user/scaffold/tmp/cursor/b-modal-terrain.err
echo "exit=$?" >> /home/user/scaffold/tmp/cursor/b-modal-terrain.err
