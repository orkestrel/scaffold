#!/bin/bash
# Unit G2 launcher: Cursor Grok 4.7 absorbs the Veneer checkout.
# Brief: tmp/cursor/g2-veneer-brief.md  Journal: tmp/cursor/g2-veneer.jsonl  Errors: tmp/cursor/g2-veneer.err
# Cap: 2700 s (larger read set than G1: src, tests, a 160 KB guide; G1 observed wall time about 10 min for a 250 KB read set).
cd /home/user/veneer
timeout 2700 agent -p --trust --mode=ask --model "grok-4.7-high" --output-format stream-json "Read and execute the brief at /home/user/scaffold/tmp/cursor/g2-veneer-brief.md exactly. Your final message must be the answer that brief's Output section specifies, under exactly its headings." > /home/user/scaffold/tmp/cursor/g2-veneer.jsonl 2> /home/user/scaffold/tmp/cursor/g2-veneer.err
echo "exit=$?" >> /home/user/scaffold/tmp/cursor/g2-veneer.err
