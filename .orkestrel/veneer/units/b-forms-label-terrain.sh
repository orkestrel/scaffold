#!/bin/bash
# B-FORMS-LABEL terrain on Cursor Grok (grok-4.7-high), read-only, rooted at /home/user/veneer.
# Command in the form the grok driver resolved for the X-RETENTION-CARRY lane (tmp/cursor/x-retention-carry.sh); the Orchestrator sized the cap (2100 s: the earlier terrain passes over this tree ran 10 to 40 min, the one reading dist/ was cap-killed at 2400 s, and this brief names its files; the close terrain over eight obligations ran 8 min).
# Brief: tmp/cursor/b-forms-label-terrain-brief.md (byte-identical to .orkestrel/veneer/units/b-forms-label-terrain-brief.md)  Journal: tmp/cursor/b-forms-label-terrain.jsonl  Errors: tmp/cursor/b-forms-label-terrain.err
cd /home/user/veneer
timeout 2100 agent -p --trust --mode=ask --model "grok-4.7-high" --output-format stream-json "Read and follow the brief at /home/user/scaffold/tmp/cursor/b-forms-label-terrain-brief.md" > /home/user/scaffold/tmp/cursor/b-forms-label-terrain.jsonl 2> /home/user/scaffold/tmp/cursor/b-forms-label-terrain.err
echo "exit=$?" >> /home/user/scaffold/tmp/cursor/b-forms-label-terrain.err
