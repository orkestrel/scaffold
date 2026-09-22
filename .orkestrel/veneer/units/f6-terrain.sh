#!/bin/bash
# Unit F6-TERRAIN launcher: Cursor Grok 4.7 absorbs Veneer's foundation surface for the F6 FOUNDATION brief.
# Brief: tmp/cursor/f6-terrain-brief.md  Journal: tmp/cursor/f6-terrain.jsonl  Errors: tmp/cursor/f6-terrain.err
# Cap: 2700 s (read set comparable to F5-TERRAIN, which returned in 506 s on this host on 2026-09-22).
cd /home/user/veneer
timeout 2700 agent -p --trust --mode=ask --model "grok-4.7-high" --output-format stream-json "Read and execute the brief at /home/user/scaffold/tmp/cursor/f6-terrain-brief.md exactly. Your final message must be the answer that brief's Output section specifies, under exactly its headings." > /home/user/scaffold/tmp/cursor/f6-terrain.jsonl 2> /home/user/scaffold/tmp/cursor/f6-terrain.err
echo "exit=$?" >> /home/user/scaffold/tmp/cursor/f6-terrain.err
