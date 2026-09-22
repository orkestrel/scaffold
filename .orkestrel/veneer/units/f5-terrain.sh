#!/bin/bash
# Unit F5-TERRAIN launcher: Cursor Grok 4.7 absorbs Veneer's accounting surface for the F5 ACCOUNTING brief.
# Brief: tmp/cursor/f5-terrain-brief.md  Journal: tmp/cursor/f5-terrain.jsonl  Errors: tmp/cursor/f5-terrain.err
# Cap: 2700 s (read set comparable to G2, which ran under that cap on this host on 2026-09-22).
cd /home/user/veneer
timeout 2700 agent -p --trust --mode=ask --model "grok-4.7-high" --output-format stream-json "Read and execute the brief at /home/user/scaffold/tmp/cursor/f5-terrain-brief.md exactly. Your final message must be the answer that brief's Output section specifies, under exactly its headings." > /home/user/scaffold/tmp/cursor/f5-terrain.jsonl 2> /home/user/scaffold/tmp/cursor/f5-terrain.err
echo "exit=$?" >> /home/user/scaffold/tmp/cursor/f5-terrain.err
