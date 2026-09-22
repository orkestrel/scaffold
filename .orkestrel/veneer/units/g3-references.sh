#!/bin/bash
# Unit G3 launcher: Cursor Grok 4.7 absorbs Elements and Mailbox as Veneer's references.
# Brief: tmp/cursor/g3-references-brief.md  Journal: tmp/cursor/g3-references.jsonl  Errors: tmp/cursor/g3-references.err
# Cap: 2700 s (two repositories; G1 took about 9 min and G2 about 16 min of bench time).
cd /home/user/elements
timeout 2700 agent -p --trust --mode=ask --model "grok-4.7-high" --output-format stream-json "Read and execute the brief at /home/user/scaffold/tmp/cursor/g3-references-brief.md exactly. The second repository is at /home/user/mailbox; read it by absolute path. Your final message must be the answer that brief's Output section specifies, under exactly its headings." > /home/user/scaffold/tmp/cursor/g3-references.jsonl 2> /home/user/scaffold/tmp/cursor/g3-references.err
echo "exit=$?" >> /home/user/scaffold/tmp/cursor/g3-references.err
