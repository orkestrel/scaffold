#!/bin/bash
# Unit F7-TERRAIN launcher: Cursor Grok 4.7 absorbs Veneer's capture surface for the F7 CAPTURE brief.
# Brief: tmp/cursor/f7-terrain-brief.md  Journal: tmp/cursor/f7-terrain.jsonl  Errors: tmp/cursor/f7-terrain.err
# Cap: 2700 s (the F5 and F6 terrain reads returned in 506 s and 463 s on this host on 2026-09-22).
cd /home/user/veneer
timeout 2700 agent -p --trust --mode=ask --model "grok-4.7-high" --output-format stream-json "Read and execute the brief at /home/user/scaffold/tmp/cursor/f7-terrain-brief.md exactly. Your final message must be the answer that brief's Output section specifies, under exactly its headings." > /home/user/scaffold/tmp/cursor/f7-terrain.jsonl 2> /home/user/scaffold/tmp/cursor/f7-terrain.err
echo "exit=$?" >> /home/user/scaffold/tmp/cursor/f7-terrain.err
