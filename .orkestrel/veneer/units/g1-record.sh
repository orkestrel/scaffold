#!/bin/bash
# Unit G1 launcher: Cursor Grok 4.7 absorbs the Veneer campaign record against the tenets.
# Brief: tmp/cursor/g1-record-brief.md  Journal: tmp/cursor/g1-record.jsonl  Errors: tmp/cursor/g1-record.err
# Cap: 2400 s (probe-2 API time 27.7 s for one word; absorption of ~250 KB plus a 450-line answer budgeted at 20 min, plus slack).
cd /home/user/scaffold
timeout 2400 agent -p --trust --mode=ask --model "grok-4.7-high" --output-format stream-json "Read and execute the brief at /home/user/scaffold/tmp/cursor/g1-record-brief.md exactly. Your final message must be the answer that brief's Output section specifies, under exactly its headings." > tmp/cursor/g1-record.jsonl 2> tmp/cursor/g1-record.err
echo "exit=$?" >> tmp/cursor/g1-record.err
