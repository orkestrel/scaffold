#!/bin/bash
# X-RETENTION-CARRY absorption on Cursor Grok (grok-4.7-high), read-only, rooted at /home/user/scaffold.
# Command as the grok driver resolved it (tmp/cursor/run-x-retention-carry.sh); the Orchestrator sized the cap
# (1800 s: the brief reads register files, not the tree; the earlier terrain passes ran 10 to 40 min, the one reading dist/ was cap-killed at 2400 s).
# Brief: tmp/cursor/x-retention-carry-brief.md  Journal: tmp/cursor/x-retention-carry.jsonl  Errors: tmp/cursor/x-retention-carry.err
cd /home/user/scaffold
timeout 1800 agent -p --trust --mode=ask --model "grok-4.7-high" --output-format stream-json "Read and follow the brief at /home/user/scaffold/tmp/cursor/x-retention-carry-brief.md" > /home/user/scaffold/tmp/cursor/x-retention-carry.jsonl 2> /home/user/scaffold/tmp/cursor/x-retention-carry.err
echo "exit=$?" >> /home/user/scaffold/tmp/cursor/x-retention-carry.err
